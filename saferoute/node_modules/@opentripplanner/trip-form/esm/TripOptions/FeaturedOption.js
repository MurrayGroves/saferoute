import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { QuestionCircle } from "@styled-icons/fa-regular/QuestionCircle";
import { accessModeIsWalkOnly, getCategoryModes, getCategoryPrimaryMode, getNonTransitModes, getSelectedModes } from "./util";
import OptionButton from "./OptionButton";
import * as S from "./styled"; // todo: move this string to localization file (and possibly add more exact info on each particular mode)

var modeButtonAriaLabel = "Opens a dialog that describes this mode, with optional links to third party services.";

var FeaturedOption = function FeaturedOption(_ref) {
  var _queryParams$companie;

  var checkboxIcons = _ref.checkboxIcons,
      DetailedModeIcon = _ref.DetailedModeIcon,
      iconFillOverride = _ref.iconFillOverride,
      onQueryParamChange = _ref.onQueryParamChange,
      queryParams = _ref.queryParams,
      questionIcon = _ref.questionIcon,
      setFeaturedOption = _ref.setFeaturedOption,
      supportedModes = _ref.supportedModes;
  // No featured mode to show if walking to transit
  if (accessModeIsWalkOnly(queryParams === null || queryParams === void 0 ? void 0 : queryParams.mode)) return null;
  var nonTransitModes = getNonTransitModes(queryParams === null || queryParams === void 0 ? void 0 : queryParams.mode);
  var selectedCompanies = (queryParams === null || queryParams === void 0 ? void 0 : (_queryParams$companie = queryParams.companies) === null || _queryParams$companie === void 0 ? void 0 : _queryParams$companie.split(",")) || [];
  var selectedModes = getSelectedModes(queryParams);
  var option = nonTransitModes[0];
  var category = supportedModes.categories.find(function (c) {
    return getCategoryModes(c).some(function (o) {
      return o === option;
    });
  });
  var optionsAreCheckboxes = Boolean(category.mode); // FIXME: the entire selectOption method could probably be repalced
  // with a better useEffect hook

  var selectOption = function selectOption(isChecked, o) {
    var mode = selectedModes;
    var company = selectedCompanies;

    if (isChecked) {
      // Un-check the company box if dealing with checkboxes. Otherwise, do nothing.
      if (optionsAreCheckboxes) {
        company = selectedCompanies.filter(function (c) {
          return c !== o.company;
        }); // Do nothing if already radio button is already checked.
      } else {
        return;
      }
    } else {
      // if un checked, set/add company and set mode (FIXME: what about car/walk)
      if (o.mode) {
        mode = selectedModes.filter(coreUtils.itinerary.isTransit).concat([o.mode]);
      }

      if (o.company) {
        company = optionsAreCheckboxes ? selectedCompanies.concat([o.company]) : [o.company];
      } else {
        company = [];
      }
    }

    onQueryParamChange({
      companies: company.join(","),
      mode: mode.join(",")
    }, category.id);
  };

  return /*#__PURE__*/React.createElement(S.FeaturedOptionContainer, null, /*#__PURE__*/React.createElement("div", null, category.options.map(function (o, index) {
    var companyIsSelected = selectedCompanies.some(function (c) {
      return c === o.company;
    });
    var modeIsSelected = selectedModes.some(function (m) {
      return m === o.mode;
    });
    var isChecked = optionsAreCheckboxes ? companyIsSelected : o.company ? companyIsSelected && modeIsSelected : modeIsSelected;
    return /*#__PURE__*/React.createElement(OptionButton, {
      checkboxIcons: checkboxIcons,
      checked: isChecked,
      disabled: isChecked && selectedCompanies.length === 1,
      iconFillOverride: iconFillOverride,
      image: o.image,
      key: index,
      label: o.label,
      onClick: function onClick() {
        return selectOption(isChecked, o);
      },
      selected: isChecked
    });
  })), /*#__PURE__*/React.createElement(S.FeaturedOptionQuestionContainer, {
    "aria-label": modeButtonAriaLabel,
    onClick: function onClick() {
      return setFeaturedOption(option);
    },
    onKeyPress: function onKeyPress() {
      return setFeaturedOption(option);
    },
    role: "link",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement(S.QuestionButton, {
    "aria-label": modeButtonAriaLabel
  }, questionIcon || /*#__PURE__*/React.createElement(QuestionCircle, null)), /*#__PURE__*/React.createElement(S.FeaturedOptionImageWrapper, null, DetailedModeIcon && /*#__PURE__*/React.createElement(DetailedModeIcon, {
    mode: getCategoryPrimaryMode(category)
  }) || /*#__PURE__*/React.createElement(S.Image, {
    src: category.image
  }))));
};

export default FeaturedOption;
//# sourceMappingURL=FeaturedOption.js.map