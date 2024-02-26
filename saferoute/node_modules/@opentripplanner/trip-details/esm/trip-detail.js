import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useState } from "react";
import { QuestionCircle } from "@styled-icons/fa-solid/QuestionCircle";
import { TimesCircle } from "@styled-icons/fa-solid/TimesCircle";
import AnimateHeight from "react-animate-height";
import { useIntl } from "react-intl";
import * as S from "./styled";

// TODO: Remove these two helper methods by moving to semantically correct HTML

/**
 * Copied from https://stackoverflow.com/questions/50940640/how-to-determine-if-jest-is-running-the-code-or-not
 */
function isRunningJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

function uuidv4() {
  if (isRunningJest()) return "mocked-random-id";
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    var r = Math.random() * 16 | 0; // eslint-disable-next-line no-bitwise

    var v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var TripDetail = function TripDetail(_ref) {
  var icon = _ref.icon,
      summary = _ref.summary,
      description = _ref.description;
  var intl = useIntl();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var id = uuidv4();

  var toggle = function toggle() {
    setExpanded(!expanded);
  };

  return /*#__PURE__*/React.createElement(S.TripDetail, {
    role: "group"
  }, /*#__PURE__*/React.createElement(S.TripDetailIcon, {
    role: "presentation"
  }, icon), /*#__PURE__*/React.createElement(S.TripDetailSummary, null, summary, description && /*#__PURE__*/React.createElement(S.ExpandButton, {
    "aria-label": expanded ? intl.formatMessage({
      id: "otpUi.TripDetails.hideDetail"
    }) : intl.formatMessage({
      id: "otpUi.TripDetails.showDetail"
    }),
    "aria-controls": id,
    "aria-expanded": expanded,
    id: "expand-button",
    onClick: toggle,
    tabIndex: 0
  }, /*#__PURE__*/React.createElement(QuestionCircle, {
    size: "0.92em"
  }))), /*#__PURE__*/React.createElement(AnimateHeight, {
    duration: 300,
    height: expanded ? "auto" : 0
  }, /*#__PURE__*/React.createElement(S.TripDetailDescription, {
    "aria-labelledby": "expand-button",
    id: id
  }, /*#__PURE__*/React.createElement(S.HideButton, {
    role: "presentation",
    onClick: function onClick() {
      return setExpanded(false);
    }
  }, /*#__PURE__*/React.createElement(TimesCircle, {
    size: "0.92em"
  })), description)));
};

export default TripDetail;
//# sourceMappingURL=trip-detail.js.map