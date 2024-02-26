/**
 * Computes padding dimensions based on roughly 1/20 of the map's canvas dimensions
 * (under a 2:1 canvas-to-screen pixel ratio).
 * @param map The map where the bounds fitting is to occur.
 * @param paddingRatio The ratio of the canvas dimensions set aside for padding.
 * @returns The object with the computed padding dimensions.
 */
export function getFitBoundsPadding(map) {
  var paddingRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
  var canvas = map.getCanvas(); // @ts-expect-error getPixelRatio not defined in MapRef type.

  var pixelRatio = map.getPixelRatio();
  var horizPadding = canvas.width * paddingRatio / pixelRatio;
  var vertPadding = canvas.height * paddingRatio / pixelRatio;
  return {
    bottom: vertPadding,
    left: horizPadding,
    right: horizPadding,
    top: vertPadding
  };
}
/**
 * Helper function used in several packages to fit a map to the given bounds,
 * using padding based on map canvas size.
 * @param map The map where the bounds fitting is to occur.
 * @param bounds The bounds to be fit.
 */

export function fitMapBounds(map, bounds) {
  map.fitBounds(bounds, {
    duration: 500,
    padding: getFitBoundsPadding(map)
  }); // Often times, the map is not updated right away, so try to force an update.

  map.triggerRepaint();
}
//# sourceMappingURL=util.js.map