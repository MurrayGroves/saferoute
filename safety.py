import csv
import osmnx as ox
import networkx as nx
import osmnx.utils_graph as utils_graph

G = ox.graph_from_place("Bristol, UK", network_type="walk")
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

        
        

