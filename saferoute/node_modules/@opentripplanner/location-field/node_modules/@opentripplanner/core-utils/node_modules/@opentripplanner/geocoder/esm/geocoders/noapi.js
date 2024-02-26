import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import { toCoordinates, fromLatFirstString } from "@conveyal/lonlat"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

import Geocoder from "./abstract-geocoder";
/**
 * An implementation that doesn't use an API for geocoding. Merely allows
 * clicking on the map and finding GPS coordinates by typing them in.
 *
 * @extends Geocoder
 */

var NoApiGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(NoApiGeocoder, _Geocoder);

  var _super = _createSuper(NoApiGeocoder);

  function NoApiGeocoder() {
    _classCallCheck(this, NoApiGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(NoApiGeocoder, [{
    key: "autocomplete",
    value:
    /**
     * Use coordinate string parser.
     */
    function autocomplete(query) {
      return this.parseCoordinateString(query.text);
    }
    /**
     * Always return the lat/lon.
     */

  }, {
    key: "reverse",
    value: function reverse(query) {
      var _this$geocoderConfig;

      var _query$point = query.point,
          lat = _query$point.lat,
          lon = _query$point.lon;
      lat = this.roundGPSDecimal(lat);
      lon = this.roundGPSDecimal(lon);
      var feature = {
        geometry: {
          coordinates: [lat, lon],
          type: "Point"
        },
        properties: {
          name: "".concat(lat, ", ").concat(lon)
        },
        type: "Feature"
      };

      if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) {
        return Promise.resolve({
          type: "FeatureCollection",
          features: [feature],
          rawGeocodedFeature: feature
        });
      }

      return Promise.resolve({
        lat: lat,
        lon: lon,
        name: feature.properties.name,
        rawGeocodedFeature: feature
      });
    }
    /**
     * Use coordinate string parser.
     */

  }, {
    key: "search",
    value: function search(query) {
      return this.parseCoordinateString(query.text);
    }
    /**
     * Attempt to parse the input as a GPS coordinate. If parseable, return a
     * feature.
     */

  }, {
    key: "parseCoordinateString",
    value: function parseCoordinateString(string) {
      var feature;

      try {
        feature = {
          geometry: {
            coordinates: toCoordinates(fromLatFirstString(string)),
            type: "Point"
          },
          properties: {
            label: string
          }
        };
      } catch (e) {
        return Promise.resolve({
          features: [],
          type: "FeatureCollection"
        });
      }

      return Promise.resolve({
        features: [feature],
        type: "FeatureCollection"
      });
    }
  }, {
    key: "roundGPSDecimal",
    value: function roundGPSDecimal(number) {
      var roundFactor = 100000;
      return Math.round(number * roundFactor) / roundFactor;
    }
  }]);

  return NoApiGeocoder;
}(Geocoder);

export { NoApiGeocoder as default };
//# sourceMappingURL=noapi.js.map