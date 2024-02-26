import { ExternalLinkAlt } from "@styled-icons/fa-solid/ExternalLinkAlt";
import React from "react";
import * as S from "./styled";
import { getCategoryModes, getCategoryPrimaryMode } from "./util";

var FeaturedOptionOverlay = function FeaturedOptionOverlay(_ref) {
  var featuredOption = _ref.featuredOption,
      setFeaturedOption = _ref.setFeaturedOption,
      showBackButton = _ref.showBackButton,
      supportedModes = _ref.supportedModes,
      CompanyIcon = _ref.CompanyIcon,
      DetailedModeIcon = _ref.DetailedModeIcon;
  // Find the mode that matches the selected category
  var category = supportedModes.categories.find(function (c) {
    return (// Each supported mode may have "sub-modes". We need to identify the correct one to match the category correctly
      featuredOption === getCategoryModes(c).find(function (mode) {
        return featuredOption === mode;
      })
    );
  });

  var defaultImageRender = function defaultImageRender(o) {
    return o.image ? /*#__PURE__*/React.createElement("img", {
      src: o.image,
      alt: o.label
    }) : o.label;
  };

  return /*#__PURE__*/React.createElement(S.OverlayContainer, null, showBackButton && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setFeaturedOption(null);
    },
    type: "button"
  }, "Back"), /*#__PURE__*/React.createElement(S.FeaturedOptionImageWrapper, null, DetailedModeIcon && /*#__PURE__*/React.createElement(DetailedModeIcon, {
    mode: getCategoryPrimaryMode(category)
  }) || /*#__PURE__*/React.createElement(S.MaxHeightImage, {
    src: category.image
  })), /*#__PURE__*/React.createElement(S.OverlayHeader, null, category.label), /*#__PURE__*/React.createElement("p", null, category.description), /*#__PURE__*/React.createElement(S.OverlayOptions, null, category.options.map(function (o) {
    // Don't show non-company options (e.g., park and ride)
    if (!o.company) return null;
    return /*#__PURE__*/React.createElement("li", {
      key: o.label
    }, /*#__PURE__*/React.createElement("a", {
      href: o.url
    }, /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, CompanyIcon && /*#__PURE__*/React.createElement(CompanyIcon, {
      company: o.company
    }) || defaultImageRender(o)), /*#__PURE__*/React.createElement("span", {
      className: "open-link"
    }, "Open app", /*#__PURE__*/React.createElement(ExternalLinkAlt, {
      style: {
        height: "1em",
        width: "1em",
        marginLeft: "1ch"
      }
    }))));
  })));
};

export default FeaturedOptionOverlay;
//# sourceMappingURL=FeaturedOptionOverlay.js.map