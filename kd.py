import numpy as np
import collections
import operator
from sklearn.neighbors import KDTree

BT = collections.namedtuple("BT", ["value", "left", "right"])

def kdtree(points):

    k = len(points[0])

    def build(*, points, depth):
        if len(points == 0):
            return None
        points.sort(key=operator.itemgetter(depth % k))
        middle = len(points) // 2
        
        return BT(
            value = points[middle],
            left = build(
                points=points[:middle],
                depth=depth+1,
            ),
            right = build(
                points=points[middle+1:],
                depth=depth+1,
            ),
        )
    return build(points=list(points), depth=0)


