import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * various different strategies for moving the map when a tracked vehicle is moved
 * note, the 'offset' routine is for when you have something like a left nav hovering over your map,
 * and so the center of the map you like to use is offset from said left nav (e.g., true center
 * of the would be look skewed to the floating nav)
 *
 * About the 'doRecenter' parameter.  This boolean, when false, will not execute the map.panTo of
 * the tracked vehicle's coordinates.  Tracking a vehicle involves highlighting the vehicle on the
 * map, showing the pattern geometry of the vehicle and current progress along that pattern , and
 * optionally pan/zooms the map to that tracked vehicle.
 *
 * The 'doRecenter' param can be used to switch control the map.panTo on/off.  Once the
 * TransitVehicleOverlay component is mounted, the onRecenterMap (PropType.func) needs to be locked
 * in place, else Leaflet (or ReactLeaflet) throws a bunch of errors. So the doRecenter param to
 * this onRecenterMap function will control whether to map.panTo() or not call map.panTo().
 */
import { useState } from "react";
import L from "leaflet";
import { compareCoords } from "./coordinates";
var VIEW_RADIUS = 1000;
/** callback used to fly (zoom) the map to some coordinates (e.g., selected vehicle) */

export function recenterFlyTo(boundOptions) {
  var viewRadius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VIEW_RADIUS;
  var doRecenter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var pause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;

  var _useState = useState([0, 0]),
      _useState2 = _slicedToArray(_useState, 2),
      coord = _useState2[0],
      setCoord = _useState2[1]; // function that is being returned and able to be used to zoom to points


  var onRecenterMap = function onRecenterMap(map, lat, lon) {
    var newCoord = [lat, lon];

    if (doRecenter && !compareCoords(coord, newCoord)) {
      setCoord(newCoord);
      var newBounds = L.latLng(lat, lon).toBounds(viewRadius); // note: there is a slight pause, so that other fetch then re-paint work can happen

      setTimeout(function () {
        if (map) map.flyToBounds(newBounds, boundOptions);
      }, pause);
    }
  };

  return onRecenterMap;
}
/** callback used to move the map to coordinates -- offsets of UI panes can be specified */

export function recenterPanToOffset() {
  var panOffsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var panOffsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var doRecenter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var pause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;

  var _useState3 = useState([0, 0]),
      _useState4 = _slicedToArray(_useState3, 2),
      coord = _useState4[0],
      setCoord = _useState4[1]; // function that is being returned and able to be used to zoom to points


  var onRecenterMap = function onRecenterMap(map, lat, lon) {
    var newCoord = [lat, lon];

    if (doRecenter && !compareCoords(coord, newCoord)) {
      setCoord(newCoord); // note: there is a slight pause, so that other fetch then re-paint work can happen

      setTimeout(function () {
        if (map) map.panToOffset(newCoord, panOffsetX, panOffsetY);
      }, pause);
    }
  };

  return onRecenterMap;
}
/** callback used to move the map to some coordinates (e.g., selected vehicle) */

export function recenterPanTo() {
  var doRecenter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var pause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;

  var _useState5 = useState([0, 0]),
      _useState6 = _slicedToArray(_useState5, 2),
      coord = _useState6[0],
      setCoord = _useState6[1]; // function that is being returned and able to be used to zoom to points


  var onRecenterMap = function onRecenterMap(map, lat, lon) {
    var newCoord = [lat, lon];

    if (doRecenter && !compareCoords(coord, newCoord)) {
      setCoord(newCoord); // note: there is a slight pause, so that other fetch then re-paint work can happen

      setTimeout(function () {
        if (map) map.panTo(newCoord);
      }, pause);
    }
  };

  return onRecenterMap;
}
//# sourceMappingURL=recenter.js.map