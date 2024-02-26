import React from "react";
import * as S from "../styled";

/**
 * ModeButton lets the user pick a travel mode.
 * It includes the actual button that supports HTML/React text and graphics,
 * and a title displayed when hovering the mouse over the button, and, optionally, underneath it.
 * A ModeButton can be enabled or disabled, active or inactive.
 */
export default function ModeButton(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? null : _ref$onClick,
      _ref$selected = _ref.selected,
      selected = _ref$selected === void 0 ? false : _ref$selected,
      _ref$showTitle = _ref.showTitle,
      showTitle = _ref$showTitle === void 0 ? true : _ref$showTitle,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? null : _ref$title,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style;
  var activeClassName = selected ? "active" : "";
  var disabledClassName = enabled ? "" : "disabled";
  return /*#__PURE__*/React.createElement(S.ModeButton, {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement(S.ModeButton.Button, {
    "aria-pressed": selected,
    className: "".concat(activeClassName, " ").concat(disabledClassName),
    disabled: !enabled,
    onClick: onClick,
    title: title
  }, children), title && showTitle && /*#__PURE__*/React.createElement(S.ModeButton.Title, {
    className: "".concat(activeClassName, " ").concat(disabledClassName),
    title: title
  }, title));
}
//# sourceMappingURL=index.js.map