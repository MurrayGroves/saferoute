import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { normalize } from "@conveyal/lonlat";
import { stringify } from "querystring"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

var AUTOCOMPLETE_URL = "https://photon.komoot.io/api";
var GEOCODE_URL = "https://photon.komoot.io/api";
var REVERSE_URL = "https://photon.komoot.io/reverse";

function GeocoderException(message) {
  this.message = message;
  this.name = "GeocoderException";
}

function run(_ref) {
  var options = _ref.options,
      query = _ref.query,
      url = _ref.url;
  return fetch("".concat(url, "?").concat(stringify(query)), options).then(function (res) {
    return res.json();
  });
}
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon}
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.boundary
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                    options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=20]
 * @param  {string} $0.text                       query text
 * @return {Promise}                              A Promise that'll get resolved with the autocomplete result
 */


function autocomplete(_x) {
  return _autocomplete.apply(this, arguments);
}
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon}
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=10]
 * @param  {string} $0.text                      The address text to query for
 * @return {Promise}                            A Promise that'll get resolved with search result
 */


function _autocomplete() {
  _autocomplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
    var boundary, focusPoint, options, _ref2$size, size, text, query, _normalize3, lat, lon, res, country, rect;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boundary = _ref2.boundary, focusPoint = _ref2.focusPoint, options = _ref2.options, _ref2$size = _ref2.size, size = _ref2$size === void 0 ? 20 : _ref2$size, text = _ref2.text;
            // build query
            query = {
              limit: size,
              q: text
            };

            if (!focusPoint) {
              _context.next = 10;
              break;
            }

            _normalize3 = normalize(focusPoint), lat = _normalize3.lat, lon = _normalize3.lon;
            query.lat = lat.toString();
            query.lon = lon.toString();
            _context.next = 8;
            return run({
              options: options,
              query: query,
              url: AUTOCOMPLETE_URL
            });

          case 8:
            res = _context.sent;
            return _context.abrupt("return", res);

          case 10:
            if (boundary) {
              country = boundary.country, rect = boundary.rect;
              if (country) query["in"] = "countryCode:".concat(country);

              if (rect) {
                query["in"] = "bbox:".concat([rect.minLon, rect.minLat, rect.maxLon, rect.maxLat].join(","));
              }
            }

            return _context.abrupt("return", run({
              options: options,
              query: query,
              url: AUTOCOMPLETE_URL
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _autocomplete.apply(this, arguments);
}

function search(_ref3) {
  var focusPoint = _ref3.focusPoint,
      options = _ref3.options,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 10 : _ref3$size,
      text = _ref3.text;
  if (!text) return Promise.resolve({
    items: []
  });
  var query = {
    limit: size,
    q: text
  };

  if (focusPoint) {
    var _normalize = normalize(focusPoint),
        lat = _normalize.lat,
        lon = _normalize.lon;

    query.lat = lat.toString();
    query.lon = lon.toString();
  }

  return run({
    options: options,
    query: query,
    url: GEOCODE_URL
  });
}
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon} reverse
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.point
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @return {Promise}                            A Promise that'll get resolved with search result
 */


function reverse(_ref4) {
  var options = _ref4.options,
      point = _ref4.point;
  var query = {};

  if (point) {
    var _normalize2 = normalize(point),
        lat = _normalize2.lat,
        lon = _normalize2.lon;

    query.lat = lat.toString();
    query.lon = lon.toString();
  } else {
    throw new GeocoderException("No point provided for reverse geocoder.");
  }

  return run({
    options: options,
    query: query,
    url: REVERSE_URL
  }).then(function (res) {
    return _objectSpread(_objectSpread({}, res), {}, {
      point: point
    });
  });
}

export { autocomplete, reverse, search };
//# sourceMappingURL=index.js.map