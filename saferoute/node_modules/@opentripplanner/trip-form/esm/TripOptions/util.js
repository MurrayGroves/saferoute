import coreUtils from "@opentripplanner/core-utils";
export function getNonTransitModes() {
  var modeString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var modes = (modeString === null || modeString === void 0 ? void 0 : modeString.split(",")) || [];
  return modes.filter(function (m) {
    return !coreUtils.itinerary.isTransit(m);
  });
}
export function accessModeIsWalkOnly() {
  var modeString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var nonTransitModes = getNonTransitModes(modeString);
  return nonTransitModes.length === 0 || nonTransitModes.length === 1 && nonTransitModes[0] === "WALK";
}
export function getSelectedModes(queryParams) {
  var _queryParams$mode;

  return (queryParams === null || queryParams === void 0 ? void 0 : (_queryParams$mode = queryParams.mode) === null || _queryParams$mode === void 0 ? void 0 : _queryParams$mode.split(",")) || [];
}
export var categoryIsActive = function categoryIsActive(category, selectedModes) {
  if (category.mode) {
    return selectedModes.some(function (m) {
      return m === category.mode;
    });
  }

  if (category.options) {
    var isActive = false;
    category.options.forEach(function (o) {
      if (selectedModes.some(function (m) {
        return m === o.mode;
      })) {
        isActive = true;
      }
    });
    return isActive;
  }

  return false;
};
export function getCategoryModes(category) {
  return category.mode ? [category.mode] : category.options.map(function (o) {
    return o.mode;
  });
}
export function getCategoryPrimaryMode(category) {
  return getCategoryModes(category)[0];
}
export var isServerEnv = typeof navigator !== "undefined" ? navigator.userAgent.includes("jsdom") : false;
//# sourceMappingURL=util.js.map