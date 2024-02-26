import React from "react";
import styled from "styled-components";
var StyledTable = styled.table.withConfig({
  displayName: "icon-renderer__StyledTable",
  componentId: "sc-epf3ui-0"
})(["border-collapse:collapse;border-spacing:0;font-family:system-ui;vertical-align:middle;div{width:50px;}td,th{padding:10px;}tr{border:1px solid gray;}tbody tr:nth-child(even){background-color:#eaeaea;}"]);
export default function IconRenderer(_ref) {
  var examples = _ref.examples,
      renderComponentFn = _ref.renderComponentFn,
      typeTitle = _ref.typeTitle;
  return /*#__PURE__*/React.createElement(StyledTable, null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, typeTitle), /*#__PURE__*/React.createElement("th", null, "Result"))), /*#__PURE__*/React.createElement("tbody", null, examples.map(function (example, index) {
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", null, example.type || example), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, renderComponentFn(example))));
  })));
}
//# sourceMappingURL=icon-renderer.js.map