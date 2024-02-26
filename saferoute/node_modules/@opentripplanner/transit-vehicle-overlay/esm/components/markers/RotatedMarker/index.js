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

import React from "react";
import { Marker as LeafletMarker } from "leaflet";
import { LeafletProvider, MapLayer, withLeaflet } from "react-leaflet";
import "leaflet-rotatedmarker";
/**
 * @see https://github.com/verdie-g/react-leaflet-rotatedmarker/issues/1
 * TODO: maybe move to either base-map and/or utils and/or own npm & repo
 */

var RotatedMarker = /*#__PURE__*/function (_MapLayer) {
  _inherits(RotatedMarker, _MapLayer);

  var _super = _createSuper(RotatedMarker);

  function RotatedMarker() {
    _classCallCheck(this, RotatedMarker);

    return _super.apply(this, arguments);
  }

  _createClass(RotatedMarker, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      var el = new LeafletMarker(props.position, this.getOptions(props));
      this.contextValue = _objectSpread(_objectSpread({}, props.leaflet), {}, {
        keyboard: props.keyboard,
        popupContainer: el
      });
      return el;
    }
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setLatLng(toProps.position);
      }

      if (toProps.icon !== fromProps.icon) {
        this.leafletElement.setIcon(toProps.icon);
      }

      if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
      }

      if (toProps.opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(toProps.opacity);
      }

      if (toProps.draggable !== fromProps.draggable) {
        if (toProps.draggable === true) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }

      if (toProps.rotationAngle !== fromProps.rotationAngle) {
        this.leafletElement.setRotationAngle(toProps.rotationAngle);
      }

      if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
        this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children == null || this.contextValue == null ? null : /*#__PURE__*/React.createElement(LeafletProvider, {
        value: this.contextValue
      }, children);
    }
  }]);

  return RotatedMarker;
}(MapLayer);

RotatedMarker.defaultProps = {
  keyboard: false,
  rotationOrigin: "center"
};
export default withLeaflet(RotatedMarker);
//# sourceMappingURL=index.js.map