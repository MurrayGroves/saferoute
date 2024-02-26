import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";
import { ClassicCar, ClassicFerry, ClassicMicromobility } from "./classic";
import { StandardBike, StandardBus, StandardGondola, StandardRail, StandardTram, StandardWalk } from "./standard";
/**
 * Icons for all standard MOD-UI modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */

function StandardModeIcon(_ref) {
  var mode = _ref.mode,
      props = _objectWithoutProperties(_ref, ["mode"]);

  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/React.createElement(StandardBike, props);

    case "bus":
      return /*#__PURE__*/React.createElement(StandardBus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/React.createElement(ClassicCar, props);

    case "ferry":
      return /*#__PURE__*/React.createElement(ClassicFerry, props);

    case "gondola":
      return /*#__PURE__*/React.createElement(StandardGondola, props);

    case "micromobility":
    case "micromobility_rent":
    case "scooter":
      return /*#__PURE__*/React.createElement(ClassicMicromobility, props);

    case "rail":
      return /*#__PURE__*/React.createElement(StandardRail, props);

    case "subway":
    case "tram":
      return /*#__PURE__*/React.createElement(StandardTram, props);

    case "transit":
      return /*#__PURE__*/React.createElement(StandardBus, props);

    case "walk":
      return /*#__PURE__*/React.createElement(StandardWalk, props);

    default:
      return null;
  }
}

export default StandardModeIcon;
//# sourceMappingURL=standard-mode-icon.js.map