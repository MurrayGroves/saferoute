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

var generateLabel = function generateLabel(properties) {
  var propertyList = [];
  ["name", "street", "district", "state", "postcode", "city", "country"].forEach(function (propertyName) {
    if (typeof properties[propertyName] === "undefined") {
      return;
    }

    var value = "".concat(properties[propertyName]);

    if (value.length > 0) {
      propertyList.push(value);
    }
  });
  return propertyList.join(", ");
};
/**
 * Geocoder implementation for the Photon geocoder.
 * See https://photon.io
 *
 * @extends Geocoder
 */


var PhotonGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(PhotonGeocoder, _Geocoder);

  var _super = _createSuper(PhotonGeocoder);

  function PhotonGeocoder() {
    _classCallCheck(this, PhotonGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(PhotonGeocoder, [{
    key: "getAutocompleteQuery",
    value: function getAutocompleteQuery(query) {
      var _this$geocoderConfig = this.geocoderConfig,
          baseUrl = _this$geocoderConfig.baseUrl,
          boundary = _this$geocoderConfig.boundary,
          focusPoint = _this$geocoderConfig.focusPoint,
          options = _this$geocoderConfig.options,
          size = _this$geocoderConfig.size;
      return _objectSpread({
        boundary: boundary,
        focusPoint: focusPoint,
        options: options,
        size: size,
        url: baseUrl ? "".concat(baseUrl, "/autocomplete") : undefined
      }, query);
    }
  }, {
    key: "getSearchQuery",
    value: function getSearchQuery(query) {
      var _this$geocoderConfig2 = this.geocoderConfig,
          baseUrl = _this$geocoderConfig2.baseUrl,
          boundary = _this$geocoderConfig2.boundary,
          focusPoint = _this$geocoderConfig2.focusPoint,
          options = _this$geocoderConfig2.options,
          size = _this$geocoderConfig2.size;
      return _objectSpread({
        boundary: boundary,
        focusPoint: focusPoint,
        options: options,
        size: size,
        url: baseUrl ? "".concat(baseUrl, "/search") : undefined
      }, query);
    }
  }, {
    key: "rewriteAutocompleteResponse",
    value: function rewriteAutocompleteResponse(response) {
      response.features.forEach(function (value) {
        value.properties.label = generateLabel(value.properties);
      });
      return response;
    }
    /**
     * Rewrite the response into an application-specific data format using the
     * first feature returned from the geocoder.
     */

  }, {
    key: "rewriteReverseResponse",
    value: function rewriteReverseResponse(response) {
      var _this$geocoderConfig3;

      if ((_this$geocoderConfig3 = this.geocoderConfig) !== null && _this$geocoderConfig3 !== void 0 && _this$geocoderConfig3.reverseUseFeatureCollection) {
        response.features.forEach(function (value) {
          value.properties.label = generateLabel(value.properties);
        });
        return response;
      }

      var _response$point = response.point,
          lat = _response$point.lat,
          lon = _response$point.lon;
      var firstFeature = response.features[0];
      return {
        lat: lat,
        lon: lon,
        name: generateLabel(firstFeature.properties),
        rawGeocodedFeature: firstFeature
      };
    }
  }, {
    key: "rewriteSearchResponse",
    value: function rewriteSearchResponse(response) {
      return this.rewriteAutocompleteResponse(response);
    }
  }]);

  return PhotonGeocoder;
}(Geocoder);

export { PhotonGeocoder as default };
//# sourceMappingURL=photon.js.map