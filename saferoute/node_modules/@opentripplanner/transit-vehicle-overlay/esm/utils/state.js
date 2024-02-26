import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useState, useRef, useEffect, useCallback } from "react";
import { checkRefreshInteval } from "./fetch";
import * as data from "./data";
/**
 * Use the state variable returned by this hook when you want the vehicle component to
 * re-paint after otp-ui map zoom events.
 *
 * e.g., send the mapZoom down to the vehicles component as a prop, and the component will
 * then redraw every time the map's zoom level changes.
 *
 * @return zoom level (state variable) and the onViewportChanged cb for base-map
 */

export function useZoomState() {
  var initialZoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;

  var _useState = useState(initialZoom),
      _useState2 = _slicedToArray(_useState, 2),
      mapZoom = _useState2[0],
      setMapZoom = _useState2[1];

  var onViewportChanged = function onViewportChanged(_ref) {
    var zoom = _ref.zoom;
    // console.info(`zoom level ${zoom}`);
    setMapZoom(zoom);
  };

  return [mapZoom, onViewportChanged];
}
/**
 * Use the state variables returned by this hook when you want the vehicle component to
 * re-paint after otp-ui map and pan zoom events.
 *
 * e.g., you can send mapZoom and mapCenter down to the vehicles component as props, which
 * will then make React redraw the vehicles component
 *
 * @return zoom level, center [x,y] (state variables) and the onViewportChanged cb for base-map
 */

export function useViewState() {
  var initialZoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;

  var _useState3 = useState(initialZoom),
      _useState4 = _slicedToArray(_useState3, 2),
      mapZoom = _useState4[0],
      setMapZoom = _useState4[1];

  var _useState5 = useState([0.0, 0.0]),
      _useState6 = _slicedToArray(_useState5, 2),
      mapCenter = _useState6[0],
      setMapCenter = _useState6[1];

  var onViewportChanged = function onViewportChanged(_ref2) {
    var zoom = _ref2.zoom,
        center = _ref2.center;
    // console.info(`zoom level ${zoom}`);
    setMapZoom(zoom);
    setMapCenter(center);
  };

  return [mapZoom, mapCenter, onViewportChanged];
}
/**
 * useTrackedVehicleState
 *
 * use this hook when you want your layer to track a vehicle
 * (and potentially show the route geometry of this vehicle)
 *
 * NOTE: about the useState, useRef, useEffect, etc... mumbo jumbo
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/#refs-to-the-rescue
 *
 * @param fetchPatternCallback -  used to fetch a vehicles' pattern geom
 * @param initVehicle
 * @param initPattern
 * @return [getRoutePattern(), getTrackedVehicle(), updateTrackedVehicle()]
 */

export function useTrackedVehicleState() {
  var fetchPatternCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var initVehicle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var initPattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var _useState7 = useState(initVehicle),
      _useState8 = _slicedToArray(_useState7, 2),
      trackedVehicle = _useState8[0],
      setTrackedVehicle = _useState8[1];

  var _useState9 = useState(initPattern),
      _useState10 = _slicedToArray(_useState9, 2),
      routePattern = _useState10[0],
      setRoutePattern = _useState10[1];

  var trackedVehicleRef = useRef(trackedVehicle);
  var routePatternRef = useRef(routePattern); // a ref + useEffect give a handle on the current trackedVehicle state in util functions, etc...

  useEffect(function () {
    trackedVehicleRef.current = trackedVehicle;
  }, [trackedVehicle]);
  useEffect(function () {
    routePatternRef.current = routePattern;
  }, [routePattern]);

  var getRoutePattern = function getRoutePattern(vehicle) {
    if (fetchPatternCallback && vehicle) {
      var patternId = routePatternRef.current ? routePatternRef.current.id : null;
      var cached = vehicle.tripId === patternId;
      if (!cached) fetchPatternCallback(vehicle, setRoutePattern);
    }

    return routePatternRef.current;
  };
  /**
   * accept a vehicle record and two booleans to control how state is updated
   *
   * @param vehicle - tracked vehicle record
   * @param stopTracking - boolean (e.g., 'stop tracking' - if this vehicle is tracking, then stop)
   * @param updatePattern - boolean (default true)
   */


  var updateTrackedVehicle = function updateTrackedVehicle(vehicle, stopTracking) {
    var updatePattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (stopTracking) {
      setTrackedVehicle(null);
      setRoutePattern(null);
    } else if (vehicle) {
      setTrackedVehicle(vehicle);
      if (updatePattern) getRoutePattern(vehicle);
    }
  };
  /**
   * return both the tracked vehicle state variable (using will cause a redraw)
   * and the ref to that vehicle.
   *
   * Note: the ref is a handle to the most recent state of the tracked vehicle, which can be used
   * by routines outside of the react tree (don't ask me ... it's strange, hacky stuff).
   */


  var getTrackedVehicle = function getTrackedVehicle() {
    return [trackedVehicle, trackedVehicleRef.current];
  };

  return [getRoutePattern, getTrackedVehicle, updateTrackedVehicle];
}
/**
 * useVehicleListUpdater - get vehicles from a service based on a refresh interval
 *
 * @param fetchVehiclesCallback
 * @param getTrackedVehicle
 * @param updateTrackedVehicle
 * @param refreshDelay
 * @return vehicleList[] (state variable)
 */

export function useVehicleListUpdater(fetchVehiclesCallback, getTrackedVehicle, updateTrackedVehicle) {
  var refreshDelay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var _useState11 = useState([]),
      _useState12 = _slicedToArray(_useState11, 2),
      vehicleList = _useState12[0],
      setVehicleList = _useState12[1];

  refreshDelay = checkRefreshInteval(refreshDelay);
  var fetchData = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var vehicles, _getTrackedVehicle, _getTrackedVehicle2, trackedVehicle, trackedRef, queryId, t;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchVehiclesCallback();

          case 2:
            vehicles = _context.sent;

            if (vehicles) {
              // todo: could maybe DQ vehicles data here before updating our vehicles list
              setVehicleList(vehicles);
              _getTrackedVehicle = getTrackedVehicle(), _getTrackedVehicle2 = _slicedToArray(_getTrackedVehicle, 2), trackedVehicle = _getTrackedVehicle2[0], trackedRef = _getTrackedVehicle2[1];
              data.linterIgnoreTheseProps(trackedVehicle); // update the tracked vehicle with latest position

              queryId = data.getVehicleId(trackedRef);

              if (queryId && updateTrackedVehicle) {
                t = data.findVehicleById(vehicles, queryId);
                if (t) updateTrackedVehicle(t, false, true);
              }
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [fetchVehiclesCallback]);
  useEffect(function () {
    var onInterval = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var newVehicles;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchData();

              case 2:
                newVehicles = _context2.sent;
                data.linterIgnoreTheseProps(newVehicles);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function onInterval() {
        return _ref4.apply(this, arguments);
      };
    }();

    onInterval();
    var intervalId = setInterval(onInterval, refreshDelay);
    return function () {
      return clearInterval(intervalId);
    };
  }, [fetchData, refreshDelay]);
  return vehicleList;
}
//# sourceMappingURL=state.js.map