import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";

var SvgAlert = function SvgAlert(_ref) {
  var title = _ref.title,
      props = _objectWithoutProperties(_ref, ["title"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 390 390"
  }, props), title ? /*#__PURE__*/React.createElement("title", null, title) : null, /*#__PURE__*/React.createElement("path", {
    d: "M195.1 44.9L357.6 370H32.5L195.1 44.9m0-44.9L0 390h390L195.1 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 195.1,
    cy: 317.4,
    r: 18.4
  }), /*#__PURE__*/React.createElement("path", {
    d: "M179.7 143.8h30.6v133.7h-30.6z"
  }));
};

export default SvgAlert;
//# sourceMappingURL=Alert.js.map