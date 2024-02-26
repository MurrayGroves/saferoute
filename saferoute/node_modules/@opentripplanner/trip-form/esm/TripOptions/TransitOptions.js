import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import * as S from "./styled";
import Checkbox from "./Checkbox";
import { getSelectedModes } from "./util";

var TransitOptions = function TransitOptions(_ref) {
  var checkboxIcons = _ref.checkboxIcons,
      DetailedModeIcon = _ref.DetailedModeIcon,
      onQueryParamChange = _ref.onQueryParamChange,
      queryParams = _ref.queryParams,
      supportedModes = _ref.supportedModes;
  var transitModes = supportedModes.transitModes;
  var selectedModes = getSelectedModes(queryParams);
  var selectedTransit = selectedModes.filter(coreUtils.itinerary.isTransit);
  var hasTransit = selectedTransit.length > 0;
  if (!hasTransit) return null;
  var selectedAndVisibleTransit = [];
  transitModes.forEach(function (m) {
    if (selectedTransit.some(function (t) {
      return t === m.mode;
    }) && !m.hidden) {
      selectedAndVisibleTransit.push(m);
    }
  });
  return /*#__PURE__*/React.createElement(S.TransitOptionsContainer, null, transitModes.map(function (transitMode) {
    if (transitMode.hidden) return null;
    var allTransitEnabled = selectedModes.some(function (m) {
      return m === "TRANSIT";
    });
    var isChecked = allTransitEnabled || selectedModes.some(function (m) {
      return m === transitMode.mode;
    });
    return /*#__PURE__*/React.createElement(Checkbox, {
      ariaLabel: transitMode.label,
      checkboxIcons: checkboxIcons,
      checked: isChecked
      /* This prevents the user from de-selecting a transit mode when it is the only one selected.
      the selectedModes length being 3 indicates that only one mode is selected. GONDOLA, WALK, and the mode. */
      ,
      disabled: isChecked && selectedModes.length === 3,
      key: transitMode.mode,
      inset: true,
      onClick: function onClick() {
        var mode = selectedModes; // Remove mode from list if all transit is selected.

        if (allTransitEnabled) {
          mode = selectedModes.filter(function (m) {
            return m !== "TRANSIT";
          }).concat(transitModes.filter(function (m) {
            return m.mode !== transitMode.mode;
          }).map(function (m) {
            return m.mode;
          }));
        } else if (isChecked) {
          // Handle unchecking.
          // If this is the last visible transit mode, switch to WALK only.
          mode = selectedAndVisibleTransit.length === 1 ? ["WALK"] : selectedModes.filter(function (m) {
            return m !== transitMode.mode;
          });
        } else {
          // Add mode to list.
          mode = selectedModes.concat([transitMode.mode]);
        }

        onQueryParamChange({
          mode: mode.join(",")
        });
      },
      selected: isChecked
    }, DetailedModeIcon && /*#__PURE__*/React.createElement(DetailedModeIcon, {
      mode: transitMode.mode
    }) || transitMode.image && /*#__PURE__*/React.createElement(S.Image, {
      alt: "Image for ".concat(transitMode.label),
      src: transitMode.image
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        zIndex: 5
      }
    }, transitMode.label));
  }));
};

export default TransitOptions;
//# sourceMappingURL=TransitOptions.js.map