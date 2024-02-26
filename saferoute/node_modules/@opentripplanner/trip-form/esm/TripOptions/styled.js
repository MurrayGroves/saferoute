import ScrollContainer from "react-indiana-drag-scroll";
import SVG from "react-inlinesvg";
import styled, { css } from "styled-components";
import { Check } from "@styled-icons/bootstrap/Check";
import { PlusCircle } from "@styled-icons/boxicons-regular/PlusCircle";
import { isServerEnv } from "./util"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

// todo: move this string to localization file (and possibly add more exact info on each particular mode)
var modeButtonAriaLabel = "Opens a dialog that describes this mode, with optional links to third party services.";
export var TripOptionsContainer = styled.div.withConfig({
  displayName: "styled__TripOptionsContainer",
  componentId: "sc-18bsv9u-0"
})(["background-color:#0d5eac;color:white;font-weight:40;max-width:992px;min-height:400px;"]);
export var TripOptionsSubContainer = styled.div.withConfig({
  displayName: "styled__TripOptionsSubContainer",
  componentId: "sc-18bsv9u-1"
})(["max-width:700px;padding:12px;"]);
export var TransitOptionsContainer = styled.div.withConfig({
  displayName: "styled__TransitOptionsContainer",
  componentId: "sc-18bsv9u-2"
})(["display:flex;gap:20px;> button{flex:1;}"]);
export var buttonIconCss = css(["border-radius:50%;height:2.5em;margin-bottom:10px;width:2.5em;z-index:10;"]);
export var GreenCheck = styled(Check).withConfig({
  displayName: "styled__GreenCheck",
  componentId: "sc-18bsv9u-3"
})(["", " background-color:rgb(84,174,88);color:white;"], buttonIconCss);
export var UncheckedIcon = styled(PlusCircle).withConfig({
  displayName: "styled__UncheckedIcon",
  componentId: "sc-18bsv9u-4"
})(["", ""], buttonIconCss);
export var Image = styled.img.withConfig({
  displayName: "styled__Image",
  componentId: "sc-18bsv9u-5"
})(["max-width:100%;"]);
export var FeaturedOptionImageWrapper = styled.div.withConfig({
  displayName: "styled__FeaturedOptionImageWrapper",
  componentId: "sc-18bsv9u-6"
})(["align-items:center;display:flex;justify-content:center;padding:1em;*{max-height:200px;width:100%;}"]);
export var ModeIconWrapper = styled.span.withConfig({
  displayName: "styled__ModeIconWrapper",
  componentId: "sc-18bsv9u-7"
})(["~ ", ",~ ", "{height:1.5em;margin-bottom:-1em;position:relative;right:-30px;top:-50px;width:1.5em;}& svg{fill:white;height:3em;position:relative;width:3em;}"],
/* sc-selector */
GreenCheck,
/* sc-selector */
UncheckedIcon);
export var QuestionButton = styled.button.attrs({
  "aria-label": modeButtonAriaLabel
}).withConfig({
  displayName: "styled__QuestionButton",
  componentId: "sc-18bsv9u-8"
})(["background-color:rgba(0,0,0,0);border:none;color:white;cursor:pointer;float:right;opacity:0.5;> svg{height:1em;width:1em;}:hover{opacity:1;}"]);
export var FeaturedOptionQuestionContainer = styled.div.attrs({
  "aria-label": modeButtonAriaLabel
}).withConfig({
  displayName: "styled__FeaturedOptionQuestionContainer",
  componentId: "sc-18bsv9u-9"
})(["cursor:pointer;&:hover ", "{opacity:1;}"], QuestionButton);
export var MaxHeightImage = styled(Image).withConfig({
  displayName: "styled__MaxHeightImage",
  componentId: "sc-18bsv9u-10"
})(["max-height:200px;"]);
export var OptionButton = styled.button.attrs(function (props) {
  return {
    "aria-checked": props.ariaChecked || props.selected,
    "aria-label": props.ariaLabel,
    role: "checkbox",
    tabIndex: 0
  };
}).withConfig({
  displayName: "styled__OptionButton",
  componentId: "sc-18bsv9u-11"
})(["align-items:center;background-color:rgba(0,0,0,0);border-color:", ";border-radius:7px;border:solid 1px;color:white;cursor:", ";display:flex;grid-gap:10px;justify-content:space-between;margin-top:7px;min-width:100%;opacity:", ";padding:7px 5px;svg{@media (max-width:768px){max-height:20px;max-width:20px;}}&:hover{opacity:1;}"], function (props) {
  return props.selected ? "white" : "lightgrey";
}, function (props) {
  return props.disabled ? "not-allowed" : "pointer";
}, function (props) {
  return props.selected ? "1" : "0.65";
});
export var OptionLabel = styled.div.withConfig({
  displayName: "styled__OptionLabel",
  componentId: "sc-18bsv9u-12"
})(["flex:2;text-align:left;"]);
export var OptionIcon = styled.div.withConfig({
  displayName: "styled__OptionIcon",
  componentId: "sc-18bsv9u-13"
})(["> svg{margin-bottom:0px;}"]);
export var OptionImage = styled(SVG).withConfig({
  displayName: "styled__OptionImage",
  componentId: "sc-18bsv9u-14"
})(["max-height:20px;width:50px;", ""], function (props) {
  return props.iconFillOverride ? "fill: ".concat(props.iconFillOverride, ";") : "";
});
export var Checkbox = styled.button.attrs(function (props) {
  return {
    "aria-checked": props.ariaChecked || props.selected,
    "aria-label": props.ariaLabel,
    role: "checkbox",
    tabIndex: 0
  };
}).withConfig({
  displayName: "styled__Checkbox",
  componentId: "sc-18bsv9u-15"
})(["align-items:center;background-color:rgba(0,0,0,0);border:none;color:white;cursor:", ";display:flex;flex-direction:column;min-width:", ";opacity:", ";padding:20px 0px;white-space:pre-wrap;", ""], function (props) {
  return props.disabled ? "not-allowed" : "pointer";
}, function (props) {
  return props.mode === "WALK" || props.mode === "BICYCLE" ? "50px" : "77px";
}, function (props) {
  return props.selected ? "1" : "0.65";
}, function (props) {
  return props.inset ? "\n    margin: 20px 0;\n    position: relative;\n\n    ".concat(UncheckedIcon, " {\n      background: #0d5eac;\n    }\n\n    ").concat(GreenCheck, ", ").concat(UncheckedIcon, " {\n      position: absolute;\n      right: 5.5%;\n      top: 11%;\n      @media (max-width: 768px) {\n        max-height: 20px;\n        max-width: 20px;\n      }\n    }\n  ") : "";
});
export var FeaturedOptionContainer = styled.div.withConfig({
  displayName: "styled__FeaturedOptionContainer",
  componentId: "sc-18bsv9u-16"
})(["display:flex;min-height:200px;> div{flex:1;}"]);
export var OverlayContainer = styled.div.withConfig({
  displayName: "styled__OverlayContainer",
  componentId: "sc-18bsv9u-17"
})(["padding:15px;"]);
export var OverlayHeader = styled.h3.withConfig({
  displayName: "styled__OverlayHeader",
  componentId: "sc-18bsv9u-18"
})(["text-align:center;"]);
export var OverlayOptions = styled.ul.withConfig({
  displayName: "styled__OverlayOptions",
  componentId: "sc-18bsv9u-19"
})(["list-style:none;margin-left:0;padding-left:0;li > a{align-items:center;background-color:#fff;border-radius:7px;color:#000;display:flex;height:40px;justify-content:space-between;margin-bottom:10px;padding:10px;padding-bottom:5px;text-decoration:none;.label,.label *{height:40px;}.open-link{color:#777;}}"]); // The ScrollContainer doesn't work in the jsdom/server environment, so replace it with a div

export var ScrollableRow = styled(isServerEnv ? "div" : ScrollContainer).withConfig({
  displayName: "styled__ScrollableRow",
  componentId: "sc-18bsv9u-20"
})(["background-color:#0a4c8d;display:flex;overflow-x:scroll;padding:0 12px;> button{display:flex;flex-direction:column;justify-content:space-between;margin-right:24px;}&:hover > button:hover{opacity:1;}&:hover > button:hover svg{opacity:1;}-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"]);
//# sourceMappingURL=styled.js.map