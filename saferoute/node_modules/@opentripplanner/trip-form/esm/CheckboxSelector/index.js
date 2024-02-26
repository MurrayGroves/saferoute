import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { useCallback } from "react";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

/**
 * A wrapper that includes an <input type="select" /> control and a <label> for the input control.
 */
export default function CheckboxSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? null : _ref$name,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      style = _ref.style,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? null : _ref$value;
  var handleChange = useCallback(function (evt) {
    if (typeof onChange === "function") {
      onChange(_defineProperty({}, name, evt.target.checked));
    }
  }, [onChange]);
  var id = "id-query-param-".concat(name);
  var finalValue = typeof value === "string" ? value === "true" : value;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: finalValue,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement(S.SettingLabel, {
    htmlFor: id
  }, label));
}
//# sourceMappingURL=index.js.map