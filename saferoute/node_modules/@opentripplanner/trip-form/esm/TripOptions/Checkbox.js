import React from "react"; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.

import { TriMetModeIcon2021 as TriMetModeIcon } from "@opentripplanner/icons";
import * as S from "./styled";
export default function Checkbox(props) {
  var ariaChecked = props.ariaChecked,
      ariaLabel = props.ariaLabel,
      checkboxIcons = props.checkboxIcons,
      checked = props.checked,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      innerRef = props.innerRef,
      inset = props.inset,
      mode = props.mode,
      onClick = props.onClick,
      selected = props.selected,
      _props$SimpleModeIcon = props.SimpleModeIcon,
      SimpleModeIcon = _props$SimpleModeIcon === void 0 ? TriMetModeIcon : _props$SimpleModeIcon;
  var modeIcon = mode && /*#__PURE__*/React.createElement(SimpleModeIcon, {
    mode: mode
  });
  var GreenCheck = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.checked) || S.GreenCheck;
  var PlusIcon = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.unchecked) || S.UncheckedIcon;
  return /*#__PURE__*/React.createElement(S.Checkbox, {
    ariaChecked: ariaChecked,
    ariaLabel: ariaLabel,
    className: className,
    disabled: disabled,
    inset: inset,
    mode: mode,
    ref: innerRef,
    onClick: onClick,
    selected: selected
  }, mode && /*#__PURE__*/React.createElement(S.ModeIconWrapper, null, modeIcon), checked ? /*#__PURE__*/React.createElement(GreenCheck, null) : /*#__PURE__*/React.createElement(PlusIcon, null), children);
}
//# sourceMappingURL=Checkbox.js.map