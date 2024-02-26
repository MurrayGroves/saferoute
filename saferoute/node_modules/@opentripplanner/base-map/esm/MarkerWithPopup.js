import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { LeafletStyleMarker, Popup } from "./styled";

/**
 * A MapLibre marker with a connected popup or tooltip
 */
var MarkerWithPopup = function MarkerWithPopup(_ref) {
  var children = _ref.children,
      popupContents = _ref.popupContents,
      popupProps = _ref.popupProps,
      position = _ref.position,
      tooltipContents = _ref.tooltipContents;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPopup = _useState2[0],
      setShowPopup = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showTooltip = _useState4[0],
      setShowTooltip = _useState4[1];

  return (
    /*#__PURE__*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    React.createElement(Marker, {
      latitude: position[0],
      longitude: position[1],
      onClick: function onClick() {
        return setShowPopup(true);
      },
      style: {
        cursor: popupContents ? "pointer" : "inherit"
      }
    }, /*#__PURE__*/React.createElement("span", {
      onMouseEnter: function onMouseEnter() {
        return setShowTooltip(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowTooltip(false);
      }
    }, children || /*#__PURE__*/React.createElement(LeafletStyleMarker, null)), showTooltip && tooltipContents && /*#__PURE__*/React.createElement(Popup // eslint-disable-next-line react/jsx-props-no-spreading
    , _extends({}, popupProps, {
      anchor: "right",
      closeButton: false,
      closeOnClick: false,
      latitude: position[0],
      longitude: position[1]
    }), tooltipContents), showPopup && popupContents && /*#__PURE__*/React.createElement(Popup // eslint-disable-next-line react/jsx-props-no-spreading
    , _extends({}, popupProps, {
      latitude: position[0],
      longitude: position[1],
      maxWidth: "100%",
      onClose: function onClose() {
        return setShowPopup(false);
      }
    }), popupContents))
  );
};

export default MarkerWithPopup;
//# sourceMappingURL=MarkerWithPopup.js.map