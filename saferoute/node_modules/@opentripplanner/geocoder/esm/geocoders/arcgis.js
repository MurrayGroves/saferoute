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

import { fromCoordinates, normalize } from "@conveyal/lonlat";
import Geocoder from "./abstract-geocoder";
/**
 * Geocoder implementation for the ArcGIS geocoder.
 * See https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm
 *
 * @extends Geocoder
 */

var ArcGISGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(ArcGISGeocoder, _Geocoder);

  var _super = _createSuper(ArcGISGeocoder);

  function ArcGISGeocoder() {
    _classCallCheck(this, ArcGISGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(ArcGISGeocoder, [{
    key: "getLocationFromGeocodedFeature",
    value:
    /**
     * Using the given magicKey and text, perform a search query to get detailed
     * address and GPS data. Return data in an application-specific location
     * format.
     */
    function getLocationFromGeocodedFeature(feature) {
      // If feature was returned from 'search' query, it will already be
      // structured properly.
      if (feature.geometry) {
        return Geocoder.prototype.getLocationFromGeocodedFeature(feature);
      } // If feature returned from autocomplete, we need to use the magicKey to get
      // the location's coordinates.


      return this.api.search({
        magicKey: feature.magicKey,
        text: feature.text
      }).then(function (response) {
        var firstFeature = response.features[0];
        var location = fromCoordinates(firstFeature.geometry.coordinates);
        location.name = firstFeature.properties.label;
        location.rawGeocodedFeature = firstFeature;
        return location;
      });
    }
    /**
     * Rewrite an autocomplete response into an application specific data format.
     * Also, filter out any results that are collections.
     */

  }, {
    key: "rewriteAutocompleteResponse",
    value: function rewriteAutocompleteResponse(response) {
      return {
        // remove any autocomplete results that are collections
        // (eg multiple Starbucks)
        features: response.features.filter(function (feature) {
          return !feature.isCollection;
        }) // add label property so location-field can handle things ok
        .map(function (feature) {
          return _objectSpread(_objectSpread({}, feature), {}, {
            properties: {
              label: feature.text
            }
          });
        })
      };
    }
    /**
     * Rewrite the response into an application-specific data format using the
     * first feature returned from the geocoder.
     */

  }, {
    key: "rewriteReverseResponse",
    value: function rewriteReverseResponse(response) {
      var _this$geocoderConfig;

      if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) return response;
      var features = response.features,
          query = response.query;

      var _normalize = normalize(query),
          lat = _normalize.lat,
          lon = _normalize.lon;

      var firstFeature = features[0];
      return {
        lat: lat,
        lon: lon,
        name: firstFeature.properties.label,
        rawGeocodedFeature: firstFeature
      };
    }
  }]);

  return ArcGISGeocoder;
}(Geocoder);

export { ArcGISGeocoder as default };
//# sourceMappingURL=arcgis.js.map