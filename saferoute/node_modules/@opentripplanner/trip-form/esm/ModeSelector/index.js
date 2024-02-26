import React, { useCallback } from "react";
import * as S from "../styled";
import ModeButton from "../ModeButton";

/**
 * ModeSelector is the control container where the OTP user selects
 * the transportation modes for a trip query, e.g. transit+bike, walk, micromobility...
 */
export default function ModeSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$modes = _ref.modes,
      modes = _ref$modes === void 0 ? null : _ref$modes,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style;

  var _ref2 = modes || {
    primary: null,
    secondary: null,
    tertiary: null
  },
      primary = _ref2.primary,
      secondary = _ref2.secondary,
      tertiary = _ref2.tertiary;

  var handleClick = useCallback(function (option) {
    if (!option.selected && typeof onChange === "function") {
      onChange(option.id);
    }
  }, [onChange]);

  var makeButton = function makeButton(option) {
    return /*#__PURE__*/React.createElement(ModeButton, {
      key: option.id,
      selected: option.selected,
      showTitle: option.showTitle,
      title: option.title,
      onClick: function onClick() {
        return handleClick(option);
      }
    }, option.text);
  };

  return /*#__PURE__*/React.createElement(S.ModeSelector, {
    className: className,
    style: style
  }, primary && /*#__PURE__*/React.createElement(S.ModeSelector.MainRow, null, makeButton(primary)), secondary && /*#__PURE__*/React.createElement(S.ModeSelector.SecondaryRow, null, secondary.map(makeButton)), tertiary && /*#__PURE__*/React.createElement(S.ModeSelector.TertiaryRow, null, tertiary.map(makeButton)));
}
//# sourceMappingURL=index.js.map