import osmnx as ox
import osmnx.utils_graph as utils_graph
import networkx as nx
import numpy as np

def add_edge_safety_index(G, precision=None):
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["safety"] = 1
    nx.set_edge_attributes(G, values=edges["safety"], name="safety")
    return G

def add_combined_index(G, precision=None):
    if precision is None:
        precision = 1
    edges = utils_graph.graph_to_gdfs(G, nodes=False, fill_edge_geometry=False)
    edges["combinedIndex"] = edges["length"] + edges["safety"]
    nx.set_edge_attributes(G, values=edges["combinedIndex"], name="combinedIndex")
    return G

ox.settings.all_oneway=True
utw = ox.settings.useful_tags_way
ox.settings.useful_tags_way = utw + ["testfield"]

G = ox.graph_from_place("Bristol, UK", network_type="walk")
G = ox.add_edge_speeds(G)
G = ox.add_edge_travel_times(G)
G = add_edge_safety_index(G)
G = add_combined_index(G)
ox.save_graphml(G, "anotherone.graphml")
orig, dest = list(G)[0], list(G)[-1]
route = nx.shortest_path(G, orig, dest, weight='combinedIndex')





