import { Popup as MapGlPopup } from "react-map-gl";
import styled from "styled-components";
/**
 * Adds a box shadow and tweaks border radius to make popups easier to read.
 */

export var Popup = styled(MapGlPopup).withConfig({
  displayName: "styled__Popup",
  componentId: "sc-12kjso7-0"
})(["& > .maplibregl-popup-content,& > .mapboxgl-popup-content{border-radius:10px;box-shadow:0 3px 14px 4px rgb(0 0 0 / 20%);}"]);
export var MapOverlayPopup = styled.div.withConfig({
  displayName: "styled__MapOverlayPopup",
  componentId: "sc-12kjso7-1"
})(["font-size:12px;line-height:1.5;min-width:250px;"]);
export var PopupRow = styled.p.withConfig({
  displayName: "styled__PopupRow",
  componentId: "sc-12kjso7-2"
})(["margin-top:6px;"]);
export var PopupTitle = styled.header.withConfig({
  displayName: "styled__PopupTitle",
  componentId: "sc-12kjso7-3"
})(["font-size:18px;font-weight:500;margin-bottom:6px;"]);

/**
 * @deprecated this marker was created to make the transition from Leaflet more manageable,
 * but in most cases this marker should not be used -- use a MapLibreGL Circle instead
 *
 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
 */
export var LeafletStyleMarker = styled.div.withConfig({
  displayName: "styled__LeafletStyleMarker",
  componentId: "sc-12kjso7-4"
})(["background:", "50;border-radius:", "px;border:", "px solid ", ";content:\"\";cursor:pointer;display:block;height:", "px;width:", "px;"], function (props) {
  return (props === null || props === void 0 ? void 0 : props.color) || "#0000ff";
}, function (props) {
  return (props === null || props === void 0 ? void 0 : props.size) || 10;
}, function (props) {
  return (props === null || props === void 0 ? void 0 : props.stroke) || 2;
}, function (props) {
  return (props === null || props === void 0 ? void 0 : props.strokeColor) || "".concat(props === null || props === void 0 ? void 0 : props.color, "f0") || "#0000fffo";
}, function (props) {
  return (props === null || props === void 0 ? void 0 : props.size) || 10;
}, function (props) {
  return (props === null || props === void 0 ? void 0 : props.size) || 10;
});
export var LayerSelector = styled.aside.withConfig({
  displayName: "styled__LayerSelector",
  componentId: "sc-12kjso7-5"
})(["display:flex;justify-content:end;margin:10px;position:relative;right:0;top:0;&:not(:last-of-type){display:none;}.layers-list{background:rgba(255,255,255,0.95);list-style-type:none;padding:1em;position:absolute;right:0;z-index:1000;label{display:block;height:0;overflow:hidden;width:0;input{margin-right:1ch;}}&::after{display:block;content:\"\uD83C\uDF10\";cursor:pointer;}&:hover,&.fake-mobile-hover{box-shadow:0px -1px 15px -3px rgba(0,0,0,0.1);label{height:unset;overflow:unset;width:unset;}li:first-child{margin-right:2em;}&::after{display:none;}}}"]);
/**
 * Map container for use with storybook across various packages in this repo.
 */

export var StoryMapContainer = styled.div.withConfig({
  displayName: "styled__StoryMapContainer",
  componentId: "sc-12kjso7-6"
})(["height:90vh;"]);
//# sourceMappingURL=styled.js.map