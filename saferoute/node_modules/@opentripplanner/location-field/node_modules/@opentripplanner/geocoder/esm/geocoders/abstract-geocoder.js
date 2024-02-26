import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { fromCoordinates } from "@conveyal/lonlat"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

/**
 * Create customized geocoder functions given a certain geocoding API, the
 * config for the geocoder and response rewrite functions specific to this
 * application. Any geocoder API that is added is expected to have an API that
 * behaves very closely to https://github.com/conveyal/isomorphic-mapzen-search
 */
var Geocoder = /*#__PURE__*/function () {
  function Geocoder(geocoderApi, geocoderConfig) {
    _classCallCheck(this, Geocoder);

    this.geocoderConfig = void 0;
    this.api = void 0;
    this.api = geocoderApi;
    this.geocoderConfig = geocoderConfig;
  }
  /**
   * Perform an autocomplete query, e.g. using partial text of a possible
   * address or POI, attempt to find possible matches.
   */


  _createClass(Geocoder, [{
    key: "autocomplete",
    value: function autocomplete(query) {
      return this.api.autocomplete(this.getAutocompleteQuery(query)).then(this.rewriteAutocompleteResponse.bind(this));
    }
    /**
     * Get an application-specific data structure from a given feature. The
     * feature is either the result of an autocomplete or a search query. This
     * function returns a Promise because sometimes an asynchronous action
     * needs to be taken to translate a feature into a location. For example,
     * the ArcGIS autocomplete service returns results that lack full address
     * data and GPS and it is expected that an extra call to the `search` API is
     * done to obtain that detailed data.
     */

  }, {
    key: "getLocationFromGeocodedFeature",
    value: function getLocationFromGeocodedFeature(feature) {
      if (feature.geometry.type === "Point") {
        var location = _objectSpread(_objectSpread({}, fromCoordinates(feature.geometry.coordinates)), {}, {
          name: feature.properties.label,
          rawGeocodedFeature: feature
        });

        return Promise.resolve(location);
      }

      return Promise.reject(new Error("Feature is not of type Point."));
    }
    /**
     * Do a reverse-geocode, i.e. get address information and attributes given a
     * GPS coordinate.
     */

  }, {
    key: "reverse",
    value: function reverse(query) {
      return this.api.reverse(this.getReverseQuery(query)).then(this.rewriteReverseResponse.bind(this));
    }
    /**
     * Perform a search query. A search query is different from autocomplete in
     * that it is assumed that the text provided is more or less a complete
     * well-formatted address.
     */

  }, {
    key: "search",
    value: function search(query) {
      return this.api.search(this.getSearchQuery(query)).then(this.rewriteSearchResponse.bind(this));
    }
    /**
     * Default autocomplete query generator
     */

  }, {
    key: "getAutocompleteQuery",
    value: function getAutocompleteQuery(query) {
      var _this$geocoderConfig = this.geocoderConfig,
          apiKey = _this$geocoderConfig.apiKey,
          baseUrl = _this$geocoderConfig.baseUrl,
          boundary = _this$geocoderConfig.boundary,
          focusPoint = _this$geocoderConfig.focusPoint,
          options = _this$geocoderConfig.options;
      return _objectSpread({
        apiKey: apiKey,
        boundary: boundary,
        focusPoint: focusPoint,
        options: options,
        // TODO: Hard coding something like an /autocomplete endpoint path in here is not very abstract.
        url: baseUrl ? "".concat(baseUrl, "/autocomplete") : undefined
      }, query);
    }
    /**
     * Default reverse query generator
     */

  }, {
    key: "getReverseQuery",
    value: function getReverseQuery(query) {
      var _this$geocoderConfig3;

      var _this$geocoderConfig2 = this.geocoderConfig,
          apiKey = _this$geocoderConfig2.apiKey,
          baseUrl = _this$geocoderConfig2.baseUrl,
          options = _this$geocoderConfig2.options;
      return _objectSpread({
        apiKey: apiKey,
        format: !((_this$geocoderConfig3 = this.geocoderConfig) !== null && _this$geocoderConfig3 !== void 0 && _this$geocoderConfig3.reverseUseFeatureCollection),
        // keep result as GeoJSON if we're supposed to have a feature collection
        options: options,
        url: baseUrl ? "".concat(baseUrl, "/reverse") : undefined
      }, query);
    }
    /**
     * Default search query generator.
     */

  }, {
    key: "getSearchQuery",
    value: function getSearchQuery(query) {
      var _this$geocoderConfig4 = this.geocoderConfig,
          apiKey = _this$geocoderConfig4.apiKey,
          baseUrl = _this$geocoderConfig4.baseUrl,
          boundary = _this$geocoderConfig4.boundary,
          focusPoint = _this$geocoderConfig4.focusPoint,
          options = _this$geocoderConfig4.options;
      return _objectSpread({
        apiKey: apiKey,
        boundary: boundary,
        focusPoint: focusPoint,
        options: options,
        url: baseUrl ? "".concat(baseUrl, "/search") : undefined,
        format: false
      }, query);
    }
    /**
     * Default rewriter for autocomplete responses
     * Response type is unknown because it depends on the specific Geocoder implementation.
     */

  }, {
    key: "rewriteAutocompleteResponse",
    value: function rewriteAutocompleteResponse(response) {
      return response;
    }
    /**
     * Default rewriter for reverse responses
     * Response type is unknown because it depends on the specific Geocoder implementation.
     * Reverse response can use either Single or MultiGeocoderResponse based on GeocoderConfig.reverseUseFeatureCollection
     */

  }, {
    key: "rewriteReverseResponse",
    value: function rewriteReverseResponse(response) {
      return response;
    }
    /**
     * Default rewriter for search responses
     * Response type is unknown because it depends on the specific Geocoder implementation.
     */

  }, {
    key: "rewriteSearchResponse",
    value: function rewriteSearchResponse(response) {
      return response;
    }
  }]);

  return Geocoder;
}();

export { Geocoder as default };
//# sourceMappingURL=abstract-geocoder.js.map