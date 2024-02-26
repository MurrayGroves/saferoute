import csv
import osmnx as ox
import networkx as nx
import osmnx.utils_graph as utils_graph
import numpy as np
from scipy.spatial import KDTree
import time
import matplotlib.pyplot as plt

import flask

def add_combined_index(G, precision=None):
    if precision is None:
        precision = 1
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["combinedIndex"] = edges["travel_time"] + edges["safety"] / 1000
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
G = ox.add_edge_speeds(G)
G = ox.add_edge_travel_times(G)
G = add_edge_safety_index(G)


def get_reference_points(G):
    references = []
    edges = []
    for source, destination, _ in G.edges:
        x = (G.nodes[source]['x'] - G.nodes[destination]["x"])/2 + G.nodes[destination]['x']
        y = (G.nodes[source]['y'] - G.nodes[destination]['y'])/2 + G.nodes[destination]['y']
        references.append((x, y))
        edges.append((source, destination))
    return references, edges

references, edges = get_reference_points(G)
references = np.array(references)
kd_tree = KDTree(references)
with open("crime_data.csv", newline='') as f:
    reader = csv.reader(f, delimiter=',')
    linecount = 1
    for row in reader:
        if linecount == 1:
            linecount += 1
            continue
        longitude = float(row[0])
        latitude = float(row[1])
        if longitude < -2.642410 or longitude > -2.463330 or latitude < 51.401792 or latitude > 51.523830:
            continue
        _, index = kd_tree.query((longitude, latitude))
        safety = G[edges[index][0]][edges[index][1]][0]["safety"]
        G[edges[index][0]][edges[index][1]][0]["safety"] = crime_score(row[2], safety)

G = add_combined_index(G)


app = flask.Flask(__name__)

@app.route("/route")
def get_route():
    start = flask.request.args.get("start")
    startLat, startLong = start.split(",")
    end = flask.request.args.get("end")
    endLat, endLong = end.split(",")

    _, startIndex = kd_tree.query((float(startLong), float(startLat)))
    _, endIndex = kd_tree.query((float(endLong), float(endLat)))

    startNode = edges[startIndex][0]
    endNode = edges[endIndex][1]

    route = nx.shortest_path(G, startNode, endNode, weight='combinedIndex')
    coords = []
    for r in route:
        x = G.nodes[r]['x']
        y = G.nodes[r]['y']
        coords.append((y,x))

    return {"route": coords}


if __name__ == '__main__':
    app.run(host="localhost", port=8080, debug=True)




