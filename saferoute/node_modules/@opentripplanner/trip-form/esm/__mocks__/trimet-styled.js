import React from "react";
import styled from "styled-components";
import * as TripFormClasses from "../styled";
/**
 * This file is provided as an illustrative example for custom styling.
 */

import "./trimet-mock.css"; // Downloads the font.

var TriMetStyled = styled.div.withConfig({
  displayName: "trimet-styled__TriMetStyled",
  componentId: "buwk9d-0"
})(["font-family:Hind,sans-serif;background-color:#333;padding:15px;", "{background:#eee;}", "{color:#eee;font-size:18px;margin:16px 0px;}", "{margin-bottom:16px;}", "{padding-top:8px;color:#fff;font-weight:100;}", "{background:#eee;}", "{border:1px solid rgb(187,187,187);padding:3px;border-radius:3px;font-size:inherit;font-family:inherit;font-weight:inherit;background:none;outline:none;&.active{border:2px solid rgb(0,0,0);background-color:rgb(173,216,230);font-weight:600;box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);}}", "{padding:4px 0px 0px;font-size:10px;line-height:12px;&.active{text-decoration:underline;}}", "{margin:15px 0px;input{padding:6px 12px;text-align:center;font-size:inherit;font-family:inherit;font-weight:inherit;border:0;border-bottom:1px solid #000;}}", "{select{-webkit-appearance:none;font-size:inherit;font-family:inherit;font-weight:inherit;margin-bottom:15px;background:none;padding:6px 12px;border:none;border-bottom:1px solid #fff;height:34px;box-shadow:none;line-height:1.42857;color:#fff;}> div:last-child::after{content:\"\u25BC\";font-size:75%;color:#fff;right:8px;top:10px;position:absolute;pointer-events:none;box-sizing:border-box;}}", "{font-size:85%;> *{padding:3px 5px 3px 0px;}>:last-child{padding-right:0px;}button{padding:6px 12px;}svg,img{margin-left:0px;}}", "{margin:-3px 0px;}", "{div{button{color:#eee;}button.active{background-color:navy;}}}", "{padding:0px 5px;font-size:200%;margin-bottom:18px;box-sizing:border-box;> *{width:100%;height:55px;}}", "{margin-bottom:10px;> *{font-size:150%;height:46px;}}", "{font-size:90%;margin-bottom:10px;text-align:center;> *{height:36px;}}"], TripFormClasses.ModeSelector, TripFormClasses.SettingsHeader, TripFormClasses.SettingsSection, TripFormClasses.SettingLabel, TripFormClasses.ModeButton, TripFormClasses.ModeButton.Button, TripFormClasses.ModeButton.Title, TripFormClasses.DateTimeSelector.DateTimeRow, TripFormClasses.DropdownSelector, TripFormClasses.SubmodeSelector.Row, TripFormClasses.SubmodeSelector.InlineRow, TripFormClasses.DateTimeSelector, TripFormClasses.ModeSelector.MainRow, TripFormClasses.ModeSelector.SecondaryRow, TripFormClasses.ModeSelector.TertiaryRow);

var trimet = function trimet(contents) {
  return /*#__PURE__*/React.createElement(TriMetStyled, null, contents);
};

export default trimet;
//# sourceMappingURL=trimet-styled.js.map