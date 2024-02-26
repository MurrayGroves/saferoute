import React from "react";
import * as S from "./styled";

/**
 * LocationIcon provides a consistent icon for rendering from, to, or generic
 * place icons in form components like LocationField and in map overlays/popups.
 */
export function LocationIcon(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 10 : _ref$size,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "" : _ref$type;

  switch (type) {
    case "from":
      return /*#__PURE__*/React.createElement(S.FromIcon, {
        className: className,
        size: size
      });

    case "to":
      return /*#__PURE__*/React.createElement(S.ToIcon, {
        className: className,
        size: size
      });

    default:
      return /*#__PURE__*/React.createElement(S.PlaceIcon, {
        className: className,
        size: size
      });
  }
}
export default LocationIcon; // Rename styled components for export

export { S as Styled };
//# sourceMappingURL=index.js.map