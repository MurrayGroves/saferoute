import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";

var SvgStar = function SvgStar(_ref) {
  var title = _ref.title,
      props = _objectWithoutProperties(_ref, ["title"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 50 50"
  }, props), title ? /*#__PURE__*/React.createElement("title", null, title) : null, /*#__PURE__*/React.createElement("path", {
    d: "M25 1l6 17h18L35 29l5 17-15-10-15 10 5-17L1 18h18z"
  }));
};

export default SvgStar;
//# sourceMappingURL=Star.js.map