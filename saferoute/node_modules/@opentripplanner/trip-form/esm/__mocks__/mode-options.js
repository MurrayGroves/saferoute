import React from "react"; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.

import * as Icons from "@opentripplanner/icons";
var modeOptions = {
  primary: {
    id: "PRIMARY",
    title: "Primary Choice",
    text: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icons.Max, null), /*#__PURE__*/React.createElement(Icons.Bus, null), " Primary Choice")
  },
  secondary: [{
    id: "SECONDARY1",
    title: "Secondary 1",
    text: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icons.Bike, null), " Sec. #1")
  }, {
    id: "SECONDARY2",
    title: "Secondary 2",
    selected: true,
    showTitle: false,
    text: /*#__PURE__*/React.createElement("span", null, "Sec. #2 ", /*#__PURE__*/React.createElement(Icons.Micromobility, null))
  }],
  tertiary: [{
    id: "OTHER",
    title: "Other Mode",
    text: /*#__PURE__*/React.createElement("span", null, "Tertiary Mode")
  }]
};
export default modeOptions;
//# sourceMappingURL=mode-options.js.map