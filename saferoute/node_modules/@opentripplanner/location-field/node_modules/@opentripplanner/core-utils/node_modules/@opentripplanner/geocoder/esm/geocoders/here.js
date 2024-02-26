import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier
import Geocoder from "./abstract-geocoder";
var hereResultTypeToPeliasLayerMap = {
  houseNumber: "address",
  place: "venue"
};

var convertHereToGeojson = function convertHereToGeojson(hereFeature) {
  var scoring = hereFeature.scoring,
      categories = hereFeature.categories,
      address = hereFeature.address,
      resultType = hereFeature.resultType,
      title = hereFeature.title,
      position = hereFeature.position;
  var extraFields = {};

  if (scoring) {
    extraFields.confidence = scoring.queryScore;
  }

  if (categories) {
    extraFields.addendum = {
      categories: categories
    };
  }

  return {
    geometry: {
      type: "Point",
      coordinates: [position.lng, position.lat]
    },
    properties: _objectSpread(_objectSpread({
      country: address.countryName,
      country_a: address.countryCode,
      country_code: address.countryCode,
      county: address.county,
      housenumber: address.houseNumber,
      label: address.label,
      layer: hereResultTypeToPeliasLayerMap[resultType] ? hereResultTypeToPeliasLayerMap[resultType] : resultType
    }, extraFields), {}, {
      locality: address.city,
      name: title,
      neighbourhood: address.district,
      postalcode: address.postalCode,
      region: address.state,
      source: "here",
      street: address.street
    }),
    type: "Feature"
  };
};

var HereGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(HereGeocoder, _Geocoder);

  var _super = _createSuper(HereGeocoder);

  function HereGeocoder() {
    _classCallCheck(this, HereGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(HereGeocoder, [{
    key: "rewriteReverseResponse",
    value: function rewriteReverseResponse(_ref) {
      var _this$geocoderConfig;

      var items = _ref.items,
          point = _ref.point;

      if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) {
        return {
          features: items.map(convertHereToGeojson),
          type: "FeatureCollection"
        };
      } // Render the result as a single geocoder response


      var firstItem = items[0];
      return _objectSpread(_objectSpread({}, point), {}, {
        name: firstItem.title,
        rawGeocodedFeature: convertHereToGeojson(firstItem)
      });
    }
  }, {
    key: "rewriteAutocompleteResponse",
    value: function rewriteAutocompleteResponse(response) {
      var items = response.items;
      return {
        features: items // Here has various types of responses, some of which are not locations.
        // We only want the actual places, so throw out any without a position.
        === null || items // Here has various types of responses, some of which are not locations.
        // We only want the actual places, so throw out any without a position.
        === void 0 ? void 0 : items // Here has various types of responses, some of which are not locations.
        // We only want the actual places, so throw out any without a position.
        .filter(function (item) {
          return !!item.position;
        }).map(convertHereToGeojson),
        type: "FeatureCollection"
      };
    }
  }, {
    key: "rewriteSearchResponse",
    value: function rewriteSearchResponse(_ref2) {
      var items = _ref2.items;
      return {
        features: items.map(convertHereToGeojson),
        type: "FeatureCollection"
      };
    }
  }]);

  return HereGeocoder;
}(Geocoder);

export { HereGeocoder as default };
//# sourceMappingURL=here.js.map