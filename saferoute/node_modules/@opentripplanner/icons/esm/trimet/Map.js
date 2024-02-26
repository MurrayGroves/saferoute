import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";

var SvgMap = function SvgMap(_ref) {
  var title = _ref.title,
      props = _objectWithoutProperties(_ref, ["title"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 390 390"
  }, props), title ? /*#__PURE__*/React.createElement("title", null, title) : null, /*#__PURE__*/React.createElement("path", {
    d: "M260.4 54.2L129.6 0 6.6 50.9v335.8l123-50.9L260.4 390l123-50.9V3.3l-123 50.9zM139.2 25l111.5 46.2v294L139.2 319V25zM25.9 63.9l94.1-39v294l-94.1 39v-294zm338.2 262.2l-94.1 39V71.2l94.1-39v293.9z"
  }));
};

export default SvgMap;
//# sourceMappingURL=Map.js.map