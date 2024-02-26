import React from "react";
import * as S from "./styled"; // Prettier does not accept typescript in this file
// eslint-disable-next-line prettier/prettier

export default function OptionButton(_ref) {
  var checkboxIcons = _ref.checkboxIcons,
      checked = _ref.checked,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      iconFillOverride = _ref.iconFillOverride,
      image = _ref.image,
      label = _ref.label,
      onClick = _ref.onClick,
      selected = _ref.selected;
  var GreenCheck = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.checked) || S.GreenCheck;
  var PlusIcon = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.unchecked) || S.UncheckedIcon;
  return /*#__PURE__*/React.createElement(S.OptionButton, {
    ariaChecked: selected,
    ariaLabel: label,
    className: className,
    disabled: disabled,
    onClick: onClick,
    selected: selected
  }, /*#__PURE__*/React.createElement(S.OptionImage, {
    title: image && "image for ".concat(label),
    iconFillOverride: iconFillOverride,
    key: label,
    src: image
  }), /*#__PURE__*/React.createElement(S.OptionLabel, null, label), /*#__PURE__*/React.createElement(S.OptionIcon, null, checked ? /*#__PURE__*/React.createElement(GreenCheck, null) : /*#__PURE__*/React.createElement(PlusIcon, null)), children);
}
//# sourceMappingURL=OptionButton.js.map