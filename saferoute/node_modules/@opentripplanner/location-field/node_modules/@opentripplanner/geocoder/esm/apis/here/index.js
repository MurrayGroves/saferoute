import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { normalize } from "@conveyal/lonlat";
import { stringify } from "querystring"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

var AUTOCOMPLETE_URL = "https://autosuggest.search.hereapi.com/v1/autosuggest";
var GEOCODE_URL = "https://geocode.search.hereapi.com/v1/geocode";
var REVERSE_URL = "https://revgeocode.search.hereapi.com/v1/revgeocode";

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

var checkItemInBoundary = function checkItemInBoundary(_ref2) {
  var rect = _ref2.rect;
  return function (_ref3) {
    var position = _ref3.position;
    if (!position) return true; // Chain queries might not have position, ignore them

    var maxLat = rect.maxLat,
        maxLon = rect.maxLon,
        minLat = rect.minLat,
        minLon = rect.minLon;
    var lat = position.lat,
        lng = position.lng;
    return lng <= maxLon && lng >= minLon && lat <= maxLat && lat >= minLat;
  };
};
/**
 * Search for an address using
 * Here's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Autocomplete}
 * service.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                     The Here API Key
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
 * HERE's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Search}
 * service. NOTE: Here does not support a boundary for Search queries, unlike Pelias.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                    The Here API key
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=10]
 * @param  {string} $0.text                      The address text to query for
 * @return {Promise}                            A Promise that'll get resolved with search result
 */


function _autocomplete() {
  _autocomplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref4) {
    var apiKey, boundary, focusPoint, options, _ref4$size, size, text, query, _normalize3, lat, lon, res, country, rect;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiKey = _ref4.apiKey, boundary = _ref4.boundary, focusPoint = _ref4.focusPoint, options = _ref4.options, _ref4$size = _ref4.size, size = _ref4$size === void 0 ? 20 : _ref4$size, text = _ref4.text;
            // build query
            query = {
              apiKey: apiKey,
              limit: size,
              q: text,
              show: "details"
            };

            if (!focusPoint) {
              _context.next = 10;
              break;
            }

            _normalize3 = normalize(focusPoint), lat = _normalize3.lat, lon = _normalize3.lon;
            query.at = "".concat(lat, ",").concat(lon);
            _context.next = 7;
            return run({
              options: options,
              query: query,
              url: AUTOCOMPLETE_URL
            });

          case 7:
            res = _context.sent;

            if (boundary !== null && boundary !== void 0 && boundary.rect) {
              // HERE does not support a boundary when you use a focus point
              // This workaround filters the results internally to the boundary
              res.items = res.items.filter(checkItemInBoundary(boundary));
            }

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

function search(_ref5) {
  var apiKey = _ref5.apiKey,
      focusPoint = _ref5.focusPoint,
      options = _ref5.options,
      _ref5$size = _ref5.size,
      size = _ref5$size === void 0 ? 10 : _ref5$size,
      text = _ref5.text;
  if (!text) return Promise.resolve({
    items: []
  });
  var query = {
    apiKey: apiKey,
    limit: size,
    q: text
  };

  if (focusPoint) {
    var _normalize = normalize(focusPoint),
        lat = _normalize.lat,
        lon = _normalize.lon;

    query.at = "".concat(lat, ",").concat(lon);
  }

  return run({
    options: options,
    query: query,
    url: GEOCODE_URL
  });
}
/**
 * Search for an address using
 * HERE's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Search}
 * service.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                   The Here API key
 * @param  {Object} $0.point
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @return {Promise}                            A Promise that'll get resolved with search result
 */


function reverse(_ref6) {
  var apiKey = _ref6.apiKey,
      options = _ref6.options,
      point = _ref6.point;
  var query = {
    apiKey: apiKey
  };

  if (point) {
    var _normalize2 = normalize(point),
        lat = _normalize2.lat,
        lon = _normalize2.lon;

    query.at = "".concat(lat, ",").concat(lon);
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