import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import Geocoder from "./abstract-geocoder"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

var DEFAULT_LAYERS = "address,venue,street,intersection";
/**
 * Geocoder implementation for the Pelias geocoder.
 * See https://pelias.io
 *
 * @extends Geocoder
 */

var PeliasGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(PeliasGeocoder, _Geocoder);

  var _super = _createSuper(PeliasGeocoder);

  function PeliasGeocoder() {
    _classCallCheck(this, PeliasGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(PeliasGeocoder, [{
    key: "getAutocompleteQuery",
    value:
    /**
     * Generate an autocomplete query specifically for the Pelias API. The
     * `sources` parameter is a Pelias-specific option.
     * This function fills in some more fields of the query
     * from the existing values in the GeocoderConfig. 
     */
    function getAutocompleteQuery(query) {
      var _this$geocoderConfig = this.geocoderConfig,
          apiKey = _this$geocoderConfig.apiKey,
          baseUrl = _this$geocoderConfig.baseUrl,
          boundary = _this$geocoderConfig.boundary,
          focusPoint = _this$geocoderConfig.focusPoint,
          _this$geocoderConfig$ = _this$geocoderConfig.layers,
          layers = _this$geocoderConfig$ === void 0 ? DEFAULT_LAYERS : _this$geocoderConfig$,
          options = _this$geocoderConfig.options,
          sources = _this$geocoderConfig.sources;
      return _objectSpread({
        apiKey: apiKey,
        boundary: boundary,
        focusPoint: focusPoint,
        layers: layers,
        options: options,
        // explicitly send over null for sources if provided sources is not truthy
        // in order to avoid default isomorphic-mapzen-search sources form being
        // applied
        sources: sources || null,
        url: baseUrl ? "".concat(baseUrl, "/autocomplete") : undefined
      }, query);
    }
    /**
     * Generate a search query specifically for the Pelias API. The
     * `sources` parameter is a Pelias-specific option.
     * This function fills in some more fields of the query
     * from the existing values in the GeocoderConfig. 
     */

  }, {
    key: "getSearchQuery",
    value: function getSearchQuery(query) {
      var _this$geocoderConfig2 = this.geocoderConfig,
          apiKey = _this$geocoderConfig2.apiKey,
          baseUrl = _this$geocoderConfig2.baseUrl,
          boundary = _this$geocoderConfig2.boundary,
          _this$geocoderConfig3 = _this$geocoderConfig2.layers,
          layers = _this$geocoderConfig3 === void 0 ? DEFAULT_LAYERS : _this$geocoderConfig3,
          focusPoint = _this$geocoderConfig2.focusPoint,
          options = _this$geocoderConfig2.options,
          sources = _this$geocoderConfig2.sources;
      return _objectSpread({
        apiKey: apiKey,
        boundary: boundary,
        layers: layers,
        focusPoint: focusPoint,
        options: options,
        // explicitly send over null for sources if provided sources is not truthy
        // in order to avoid default isomorphic-mapzen-search sources form being
        // applied
        sources: sources || null,
        url: baseUrl ? "".concat(baseUrl, "/search") : undefined,
        format: false
      }, query);
    }
    /**
     * Rewrite the response into an application-specific data format using the
     * first feature returned from the geocoder.
     */

  }, {
    key: "rewriteReverseResponse",
    value: function rewriteReverseResponse(response) {
      var _this$geocoderConfig4;

      if ((_this$geocoderConfig4 = this.geocoderConfig) !== null && _this$geocoderConfig4 !== void 0 && _this$geocoderConfig4.reverseUseFeatureCollection) return response;
      var _response$isomorphicM = response.isomorphicMapzenSearchQuery.point,
          lat = _response$isomorphicM.lat,
          lon = _response$isomorphicM.lon;
      var firstFeature = response[0];
      return {
        lat: lat,
        lon: lon,
        name: firstFeature.label,
        rawGeocodedFeature: firstFeature
      };
    }
  }]);

  return PeliasGeocoder;
}(Geocoder);

export { PeliasGeocoder as default };
//# sourceMappingURL=pelias.js.map