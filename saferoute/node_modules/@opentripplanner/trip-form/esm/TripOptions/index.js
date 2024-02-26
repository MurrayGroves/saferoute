import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import coreUtils from "@opentripplanner/core-utils";
import React, { useEffect, useState } from "react";
import GeneralSettingsPanel from "../GeneralSettingsPanel";
import FeaturedOption from "./FeaturedOption";
import FeaturedOptionOverlay from "./FeaturedOptionOverlay";
import { getSelectedModes } from "./util";
import ModeRow from "./ModeRow";
import TransitOptions from "./TransitOptions";
import * as S from "./styled";

/**
 * This component renders the custom TriMet Mode Selector
 */
export default function TripOptions(props) {
  var checkboxIcons = props.checkboxIcons,
      className = props.className,
      CompanyIcon = props.CompanyIcon,
      DetailedModeIcon = props.DetailedModeIcon,
      featuredItemOverlayBackButton = props.featuredItemOverlayBackButton,
      featuredItemOverlayEnabled = props.featuredItemOverlayEnabled,
      featuredItemOverlayShown = props.featuredItemOverlayShown,
      footer = props.footer,
      updateQueryParams = props.onQueryParamChange,
      queryParams = props.queryParams,
      QuestionIcon = props.QuestionIcon,
      SimpleModeIcon = props.SimpleModeIcon,
      supportedCompanies = props.supportedCompanies,
      supportedModes = props.supportedModes,
      tripOptionIconFillOverride = props.tripOptionIconFillOverride;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      featuredOption = _useState2[0],
      setFeaturedOption = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      queryParamOverrides = _useState4[0],
      setQueryParamOverrides = _useState4[1]; // Populate the transit query param override if initial query params
  // include transit modes


  useEffect(function () {
    var initialTransitModes = getSelectedModes(queryParams).filter(coreUtils.itinerary.isTransit);

    if (initialTransitModes.length > 0) {
      setQueryParamOverrides({
        transit: {
          mode: initialTransitModes.join(",")
        }
      });
    }
  }, []); // Allow external closing

  useEffect(function () {
    if (featuredItemOverlayEnabled === false) {
      setFeaturedOption(null);
    }
  }, [featuredItemOverlayEnabled]); // Update callback when featuredItemOverlay changes

  useEffect(function () {
    featuredItemOverlayShown && featuredItemOverlayShown(!!featuredOption);
  }, [featuredOption]); // FIXME: move all query param handling to hook (object with category to queryParam mapping)
  // THis will involve refactoring all sub-components to send category along with
  // query param update. The refactor will be complex but the end result will be
  // cleaner and simpler. Only this index component will handle queryParam generation,
  // all others could work in only React space.

  var onQueryParamChange = function onQueryParamChange(newQueryParams) {
    var categoryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var newParams = _objectSpread({}, newQueryParams); // Update transit override if changes are made to transit submodes


    var updatedSelectedModes = getSelectedModes(newParams);
    var updatedSelectedTransit = updatedSelectedModes.filter(coreUtils.itinerary.isTransit); // Only update if the updated transit isn't "TRANSIT", since that would reset things
    // when the user doesn't want them to be reset.

    if (updatedSelectedTransit.length > 0 && updatedSelectedTransit[0] !== "TRANSIT") {
      setQueryParamOverrides(_objectSpread(_objectSpread({}, queryParamOverrides), {}, {
        transit: {
          mode: updatedSelectedTransit.join(",")
        }
      }));
    } // Update category override


    if (categoryId) {
      // If custom transit is set, un-set it here (it will be replaced later)
      if ("transit" in queryParamOverrides) {
        newQueryParams.mode = newQueryParams.mode.replace(queryParamOverrides.transit.mode, "TRANSIT");
      }

      var companies = newQueryParams.companies,
          mode = newQueryParams.mode;
      setQueryParamOverrides(_objectSpread(_objectSpread({}, queryParamOverrides), {}, _defineProperty({}, categoryId, {
        companies: companies,
        mode: mode
      })));
    } // Override transit if transit override is present


    if (updatedSelectedTransit[0] === "TRANSIT" && "transit" in queryParamOverrides) {
      newParams.mode = newParams.mode.replace("TRANSIT", queryParamOverrides.transit.mode);
    }

    updateQueryParams(newParams);
  };

  if (featuredOption) {
    return /*#__PURE__*/React.createElement(S.TripOptionsContainer, {
      className: className
    }, /*#__PURE__*/React.createElement(FeaturedOptionOverlay, {
      CompanyIcon: CompanyIcon,
      DetailedModeIcon: DetailedModeIcon,
      featuredOption: featuredOption,
      setFeaturedOption: setFeaturedOption,
      showBackButton: featuredItemOverlayBackButton,
      supportedCompanies: supportedCompanies,
      supportedModes: supportedModes
    }));
  }

  return /*#__PURE__*/React.createElement(S.TripOptionsContainer, {
    className: className
  }, /*#__PURE__*/React.createElement(ModeRow, {
    checkboxIcons: checkboxIcons,
    onQueryParamChange: onQueryParamChange,
    queryParamOverrides: queryParamOverrides,
    queryParams: queryParams,
    SimpleModeIcon: SimpleModeIcon,
    supportedModes: supportedModes
  }), /*#__PURE__*/React.createElement(S.TripOptionsSubContainer, null, /*#__PURE__*/React.createElement(FeaturedOption, {
    checkboxIcons: checkboxIcons,
    DetailedModeIcon: DetailedModeIcon,
    iconFillOverride: tripOptionIconFillOverride,
    onQueryParamChange: onQueryParamChange,
    queryParams: queryParams,
    questionIcon: QuestionIcon,
    setFeaturedOption: setFeaturedOption,
    supportedModes: supportedModes
  }), /*#__PURE__*/React.createElement(GeneralSettingsPanel, {
    onQueryParamChange: onQueryParamChange,
    query: queryParams,
    supportedModes: supportedModes
  }), /*#__PURE__*/React.createElement(TransitOptions, {
    checkboxIcons: checkboxIcons,
    DetailedModeIcon: DetailedModeIcon,
    onQueryParamChange: onQueryParamChange,
    queryParams: queryParams,
    supportedModes: supportedModes
  }), footer));
}
export { S as Styled };
//# sourceMappingURL=index.js.map