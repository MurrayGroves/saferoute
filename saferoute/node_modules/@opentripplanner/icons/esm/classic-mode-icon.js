import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";
import { ClassicBike, ClassicBus, ClassicCar, ClassicFerry, ClassicGondola, ClassicMicromobility, ClassicTram, ClassicWalk } from "./classic";
/**
 * Icons for all classic OTP-react-redux modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */

function ClassicModeIcon(_ref) {
  var mode = _ref.mode,
      props = _objectWithoutProperties(_ref, ["mode"]);

  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/React.createElement(ClassicBike, props);

    case "bus":
      return /*#__PURE__*/React.createElement(ClassicBus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/React.createElement(ClassicCar, props);

    case "ferry":
      return /*#__PURE__*/React.createElement(ClassicFerry, props);

    case "gondola":
      return /*#__PURE__*/React.createElement(ClassicGondola, props);

    case "micromobility":
    case "micromobility_rent":
    case "scooter":
      return /*#__PURE__*/React.createElement(ClassicMicromobility, props);

    case "rail":
    case "subway":
    case "tram":
      return /*#__PURE__*/React.createElement(ClassicTram, props);

    case "transit":
      return /*#__PURE__*/React.createElement(ClassicBus, props);

    case "walk":
      return /*#__PURE__*/React.createElement(ClassicWalk, props);

    default:
      return null;
  }
}

export default ClassicModeIcon;
//# sourceMappingURL=classic-mode-icon.js.map