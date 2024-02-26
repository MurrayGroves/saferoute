import flatten from "flat";
import LocationIcon from "@opentripplanner/location-icon";
import { FormattedMessage } from "react-intl";
import React from "react";
import * as S from "./styled"; // eslint-disable-next-line prettier/prettier

// Load the default messages.
import defaultEnglishMessages from "../i18n/en-US.yml";
var iconSize = "0.9em"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

var defaultMessages = flatten(defaultEnglishMessages);

var FromToLocationPicker = function FromToLocationPicker(_ref) {
  var _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label,
      _ref$location = _ref.location,
      location = _ref$location === void 0 ? null : _ref$location,
      _ref$onFromClick = _ref.onFromClick,
      onFromClick = _ref$onFromClick === void 0 ? null : _ref$onFromClick,
      _ref$onToClick = _ref.onToClick,
      onToClick = _ref$onToClick === void 0 ? null : _ref$onToClick,
      _ref$setLocation = _ref.setLocation,
      setLocation = _ref$setLocation === void 0 ? null : _ref$setLocation,
      _ref$showIcons = _ref.showIcons,
      showIcons = _ref$showIcons === void 0 ? true : _ref$showIcons;

  var handleFromClick = function handleFromClick() {
    if (onFromClick) {
      onFromClick();
      return;
    }

    setLocation({
      location: location,
      locationType: "from",
      reverseGeocode: false
    });
  };

  var handleToClick = function handleToClick() {
    if (onToClick) {
      onToClick();
      return;
    }

    setLocation({
      location: location,
      locationType: "to",
      reverseGeocode: false
    });
  };

  var labelIfAny = label === true ? /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.planATrip"],
    description: "Label to prompt the user to plan a trip",
    id: "otpUi.FromToLocationPicker.planATrip"
  })) : label;
  return /*#__PURE__*/React.createElement(React.Fragment, null, labelIfAny, /*#__PURE__*/React.createElement(S.FromToPickerSpan, null, /*#__PURE__*/React.createElement(S.LocationPickerSpan, null, showIcons && /*#__PURE__*/React.createElement(LocationIcon, {
    type: "from",
    size: iconSize
  }), /*#__PURE__*/React.createElement(S.Button, {
    onClick: handleFromClick
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.from"],
    description: "Text for the 'from' button of the picker",
    id: "otpUi.FromToLocationPicker.from"
  }))), /*#__PURE__*/React.createElement(S.LocationPickerSpan, null, showIcons && /*#__PURE__*/React.createElement(LocationIcon, {
    type: "to",
    size: iconSize
  }), /*#__PURE__*/React.createElement(S.Button, {
    onClick: handleToClick
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.to"],
    description: "Text for the 'to' button of the picker",
    id: "otpUi.FromToLocationPicker.to"
  })))));
};

export default FromToLocationPicker; // Rename styled components for export.

export { S as Styled };
//# sourceMappingURL=index.js.map