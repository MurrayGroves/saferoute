import React from "react";
import ModeButton from "../ModeButton";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

/**
 * SubmodeSelector is the control container where the OTP user selects
 * the submodes (e.g. train, bus) for transit, or the providers for TNC and rental companies.
 */
export default function SubmodeSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label,
      _ref$modes = _ref.modes,
      modes = _ref$modes === void 0 ? null : _ref$modes,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style;
  var LabelType = inline ? S.FloatingSettingLabel : S.SettingLabel;
  var RowType = inline ? S.SubmodeSelector.InlineRow : S.SubmodeSelector.Row;
  return /*#__PURE__*/React.createElement(S.SubmodeSelector, {
    className: className,
    style: style
  }, label && /*#__PURE__*/React.createElement(LabelType, null, label), /*#__PURE__*/React.createElement(RowType, null, modes && modes.map(function (option) {
    return /*#__PURE__*/React.createElement(ModeButton, {
      key: option.id,
      selected: option.selected,
      showTitle: false,
      title: option.title,
      onClick: function onClick() {
        return onChange(option.id);
      }
    }, option.text);
  })));
}
//# sourceMappingURL=index.js.map