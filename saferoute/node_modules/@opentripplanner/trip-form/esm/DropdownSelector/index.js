import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { useCallback } from "react";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

/**
 * A wrapper that includes a <select> dropdown control and a <label> for the dropdown control.
 */
export default function DropdownSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? null : _ref$name,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? null : _ref$options,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? null : _ref$value;
  var handleChange = useCallback(function (evt) {
    if (typeof onChange === "function") {
      var val = evt.target.value;
      var floatVal = parseFloat(val);
      onChange(_defineProperty({}, name, Number.isNaN(floatVal) ? val : floatVal));
    }
  }, [onChange]);
  var id = "id-query-param-".concat(name);
  return /*#__PURE__*/React.createElement(S.DropdownSelector, {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.SettingLabel, {
    htmlFor: id
  }, label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("select", {
    id: id,
    value: value,
    onChange: handleChange
  }, options && options.map(function (o, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i,
      value: o.value
    }, o.text);
  }))));
}
//# sourceMappingURL=index.js.map