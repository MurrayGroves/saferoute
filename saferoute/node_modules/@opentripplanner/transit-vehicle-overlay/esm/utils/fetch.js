import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

/** utility helper functions used alongside proprietary web service calls / data fetch routines */
var DEFAULT_REFRESH_TIME = 7000;
/** get refresh values (default 7 second abs), and convert from secs to millisecs */

export function checkRefreshInteval(interval) {
  var defInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_REFRESH_TIME;
  var retVal = defInterval;

  if (interval) {
    var r = interval;
    if (typeof r === "string") r = parseInt(r, 10);
    if (r > 0 && r <= 100) r *= 1000;
    if (r >= 1000 && r <= 100000) retVal = r;else retVal = defInterval;
  }

  return retVal;
}
export var handleHttpResponse = function handleHttpResponse(response) {
  if (!response.ok) {
    /* TODO: Is there anything special we want to do with server side errors? */
    throw new Error("Error fetching data. Status code: ".concat(response.status));
  }
  /*
    TODO: TriMet services bubble up their own error messages from time to time
    and we'll want to grab those inside the `errorMessage` property
  */


  return response.json();
};
export var handleGlobalError = function handleGlobalError(error) {
  /*
      TODO: More descriptive error handling here...
      maybe dispatch error event, display error message dialog
    */
  throw error;
};
/**
 * get linestring examples (using either pattern id or trip id):
 *
 * https://newplanner.trimet.org/ws/ti/v0/index/patterns/TRIMET:440496/geometry/geojson
 * or
 * https://newplanner.trimet.org/ws/ti/v0/index/patterns/trip/TRIMET:440496/geometry/geojson
 */

export var fetchRouteGeometry = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(config, id) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", fetch("".concat(config.host).concat(config.path, "/").concat(config.agency, ":").concat(id).concat(config.suffix)).then(handleHttpResponse)["catch"](handleGlobalError));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchRouteGeometry(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * get vehicle positions -- example
 * https://maps.trimet.org/gtfs/rt/vehicles/routes/100
 * or
 * https://developer.trimet.org/ws/v2/vehicles/appid/12A1B6835DC871375825C3AD1/routes/100
 */

export var fetchVehicles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(config, query) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch("".concat(config.host).concat(config.path, "/").concat(query.type, "/").concat(
            /* eslint-disable prefer-template */
            query.ids.length ? query.ids.join() : query.defRoutes)).then(handleHttpResponse)["catch"](handleGlobalError));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchVehicles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=fetch.js.map