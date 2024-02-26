import React from "react";
import IconRenderer from "../icon-renderer";
var exampleModes = ["BICYCLE", "BICYCLE_RENT", "BUS", "CAR", "CAR_PARK", "FERRY", "GONDOLA", "MICROMOBILITY", "MICROMOBILITY_RENT", "SCOOTER", "RAIL", "STREETCAR", "SUBWAY", "TRAM", "TRANSIT", "WALK", "NONE_OF_THE_ABOVE"];
export default function ModeIconRenderer(_ref) {
  var Component = _ref.component;
  return /*#__PURE__*/React.createElement(IconRenderer, {
    examples: exampleModes,
    renderComponentFn: function renderComponentFn(example) {
      return /*#__PURE__*/React.createElement(Component, {
        mode: example
      });
    },
    typeTitle: "Mode Type"
  });
}
//# sourceMappingURL=mode-icon-renderer.js.map