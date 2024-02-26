import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";
import { Bicycle, Car, Micromobility, Walk } from "./trimet-2021";
/**
 * These icons are not an entire set and are only used in the 2021
 * custom TriMet mode selector component
 */

function TriMetModeIcon(_ref) {
  var mode = _ref.mode,
      props = _objectWithoutProperties(_ref, ["mode"]);

  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/React.createElement(Bicycle, props);

    case "car":
    case "car_park":
    case "car_hail":
      return /*#__PURE__*/React.createElement(Car, props);

    case "micromobility":
    case "micromobility_rent":
    case "scooter":
      return /*#__PURE__*/React.createElement(Micromobility, props);

    case "walk":
      return /*#__PURE__*/React.createElement(Walk, props);

    default:
      return null;
  }
}

export default TriMetModeIcon;
//# sourceMappingURL=trimet-mode-icon-2021.js.map