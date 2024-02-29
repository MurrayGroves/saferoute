import csv
import os
from flask_cors import CORS, cross_origin
import osmnx as ox
import networkx as nx
import osmnx.utils_graph as utils_graph
import numpy as np
from scipy.spatial import KDTree

import flask

def add_combined_index(G, precision=None):
    if precision is None:
        precision = 1
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["combined_index"] = np.clip(a=(edges["travel_time"] + edges["safety"] - edges["streetlight"]), a_min=0, a_max=None)
    nx.set_edge_attributes(G, values=edges["combined_index"], name="combined_index")
    return G

def add_edge_safety_index(G, precision=None):
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["safety"] = 1
    nx.set_edge_attributes(G, values=edges["safety"], name="safety")
    return G

def add_streetlight_index(G, precision=None):
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["streetlight"] = 1
    nx.set_edge_attributes(G, values=edges["streetlight"], name="streetlight")
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


ox.settings.all_oneway=False
if not os.path.exists("bristol.graphml"):
    print("Downloading graph")
    G = ox.graph_from_place("Bristol, UK", network_type="walk")
    ox.save_graphml(G, "bristol.graphml")
    print("Graph saved!")
else:
    print("Loading graph")
    G = ox.load_graphml("bristol.graphml")
    print("Graph loaded!")

nx.set_edge_attributes(G, values=4, name="speed_kph")
G = ox.add_edge_travel_times(G)
G = add_edge_safety_index(G)
G = add_streetlight_index(G)

def add_node(G, connectingNodes, x, y, direction):
    newId = f"{len(G.nodes) + 1}-custom"
    G.add_node(newId, x=x, y=y)
    for node in connectingNodes:
        print("Adding edge ", newId, node)
        distance = 40
        travelTime = distance / 4
        if direction:
            G.add_edge(newId, node, length=distance, travel_time=travelTime, safety=1, combined_index=travelTime+1, speed_kph=4, oneway=False)
        else:
            G.add_edge(node, newId, length=distance, travel_time=travelTime, safety=1, combined_index=travelTime+1, speed_kph=4, oneway=False)

    return newId


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

with open("streetlights.csv", newline='') as f:
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
        streetlight = G[edges[index][0]][edges[index][1]][0]["streetlight"]
        G[edges[index][0]][edges[index][1]][0]["streetlight"] = streetlight + 1



G = add_combined_index(G)


app = flask.Flask(__name__)

cors = CORS(app, resources={r"/api/route": {"origins": "*"}})

def myFunc(x, y, atts):
    print(x, y, atts)
    return atts.get("travel_time", 1)

@app.route("/api/route")
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def get_route():
    start = flask.request.args.get("start")
    startLat, startLong = start.split(",")
    end = flask.request.args.get("end")
    endLat, endLong = end.split(",")
    weight = flask.request.args.get("weight")

    _, startIndex = kd_tree.query((float(startLong), float(startLat)))
    _, endIndex = kd_tree.query((float(endLong), float(endLat)))

    startNodes = edges[startIndex]
    endNodes = edges[endIndex]

    startNode = add_node(G, startNodes, float(startLong), float(startLat), True)
    endNode = add_node(G, endNodes, float(endLong), float(endLat), False)

    route = nx.shortest_path(G, startNode, endNode, weight=weight)
    coords = []
    for r in route:
        x = G.nodes[r]['x']
        y = G.nodes[r]['y']
        coords.append((y,x))

    print(coords)

    return {"route": coords}


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)




