import csv
import json
import os
import time
import numpy as np
import osmnx as ox
import networkx as nx
import osmnx.utils_graph as utils_graph
from scipy.spatial import Voronoi, voronoi_plot_2d
import matplotlib.pyplot as plt
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon


def build_voronoi(G):
    midToEdge = []
    myList = []
    for (start, end, _) in G.edges:
        x = (G.nodes[start]["x"] - G.nodes[end]["x"])/2 + G.nodes[end]["x"]
        y = (G.nodes[start]["y"] - G.nodes[end]["y"])/2 + G.nodes[end]["y"]
        myList.append((x, y))
        midToEdge.append((start, end))

    vor = Voronoi(myList)
    vor.close()
    return (vor, midToEdge)

class VoronoiSection():
    def __init__(self, xBounds, yBounds, regions: dict[int, list[int]]):
        self.xBounds = xBounds
        self.yBounds = yBounds
        self.regions = regions

    def contains(self, point: tuple[int, int]):
        return point[0] >= self.xBounds[0] and point[0] <= self.xBounds[1] and point[1] >= self.yBounds[0] and point[1] <= self.yBounds[1]
    
    def get_region(self, point: tuple[int, int]):
        if not self.contains(point):
            return None

        for (i, region) in self.regions.items():
            if not -1 in region:
                polygon = [vor.vertices[i] for i in region]
                if Polygon(polygon).contains(Point(point)):
                    return i
        raise ValueError("Point should be here, but isn't")
  
def region_index_to_edge(index: int, pointToEdge: list[tuple[int, int]]):
    return pointToEdge[index]

def generate_voronoi_lookups(vor: Voronoi, divisions: int):
    lowestX = min(vor.vertices, key=lambda x: x[0])[0]
    highestX = max(vor.vertices, key=lambda x: x[0])[0]
    lowestY = min(vor.vertices, key=lambda x: x[1])[1]
    highestY = max(vor.vertices, key=lambda x: x[1])[1]

    lowestY, lowestX = 51.452680, -2.681976
    highestY, highestX = 51.463163, -2.466026

    print(lowestX, highestX, lowestY, highestY)

    xRange = highestX - lowestX
    yRange = highestY - lowestY 

    xStep = xRange / divisions
    yStep = yRange / divisions

    sections = []
    for i in range(divisions):
        xBounds = (lowestX + xStep * i, lowestX + xStep * (i + 1))
        for j in range(divisions):
            yBounds = (lowestY + yStep * j, lowestY + yStep * (j + 1))
            sectionRegion = {}
            for (i, region) in enumerate(vor.regions):
                if region == []:
                    continue

                regionStartX = vor.vertices[min(region, key=lambda x: vor.vertices[x][0])][0]
                regionStartY = vor.vertices[min(region, key=lambda x: vor.vertices[x][1])][1]
                if (regionStartX >= xBounds[0] and regionStartX <= xBounds[1] and regionStartY >= yBounds[0] and regionStartY <= yBounds[1]):
                    sectionRegion[i] = region

            sections.append(VoronoiSection(xBounds, yBounds, sectionRegion))

    return sections

def find_nearest(regions: dict[int, list[int]], point: tuple[int, int]):
    for (i, region) in regions:
        if not -1 in region:
            polygon = [vor.vertices[i] for i in region]
            if Polygon(polygon).contains(Point(point)):
                return vor.points[np.where(vor.point_region==i)]
            

def add_combined_index(G, precision=None):
    if precision is None:
        precision = 1
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["combinedIndex"] = edges["travel_time"] + edges["safety"]
    nx.set_edge_attributes(G, values=edges["combinedIndex"], name="combinedIndex")
    return G

def add_edge_safety_index(G, precision=None):
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["safety"] = 1
    nx.set_edge_attributes(G, values=edges["safety"], name="safety")
    return G

def crime_score(crime, score):
    if crime == "Anti-social behaviour":
        score += 2
    elif crime == "Theft from the person":
        score += 15
    elif crime == "Violence and sexual offences":
        score += 25
    elif crime == "Robbery":
        score += 15
    else:
        score += 1
    return score


ox.settings.all_oneway=True
G = ox.graph_from_place("Bristol, UK", network_type="walk")
vor, pointToEdge = build_voronoi(G)

lookups = []
if os.path.exists("lookups.json"):
    jsons = json.load(open("lookups.json"))
    lookups = [VoronoiSection(lookup["xBounds"], lookup["yBounds"], lookup["regions"]) for lookup in jsons]
    print("Lookups loaded!")
else:
    print("Loading graph")
    print("Building Voronoi diagram")
    print("Building lookups")
    now = time.time()
    lookups = generate_voronoi_lookups(vor, 50)
    print("Time taken: ", time.time() - now)
    json.dump(lookups, open("lookups.json", "w"), default=vars)

print(len(list(filter(lambda x: x != [], vor.regions))))
print([len(lookup.regions) for lookup in lookups])
print(sum([len(lookup.regions) for lookup in lookups]))
print("Lookups built!")
now = time.time()
for lookup in lookups:
    if point := lookup.get_region((-2.579862, 51.464354)) is not None:
        print(region_index_to_edge(point, pointToEdge))
        break

print("Time taken: ", time.time() - now)
if G is None:
    G = ox.graph_from_place("Bristol, UK", network_type="walk")

G = ox.add_edge_speeds(G)
G = ox.add_edge_travel_times(G)
G = add_edge_safety_index(G)
G = add_combined_index(G)
rounded_edge = {}
with open("crime_data.csv", newline='') as f:
    reader = csv.reader(f, delimiter=',')
    linecount = 1
    for row in reader:
        if linecount == 1:
            linecount += 1
            continue
        longitude = float(row[0])
        longitude = round(longitude, 3)
        latitude = float(row[1])
        latitude = round(latitude, 3)
        pair = str(longitude) + str(latitude)
        if not pair in rounded_edge.keys():
            edges = ox.nearest_edges(G, longitude, latitude)
            rounded_edge[pair] = edges
        else:
            edges = rounded_edge[pair]
        safety = G[edges[0]][edges[1]][0]["safety"]
        G[edges[0]][edges[1]][0]["safety"] = crime_score(row[2], safety)
        print(linecount)
        linecount += 1
ox.save_graphml(G, "anotherone.graphml")

        
        

