/** some shared styles used in the popups and tooltips */
import styled from "styled-components";
export var TooltipStyle = styled.span.withConfig({
  displayName: "styled__TooltipStyle",
  componentId: "sc-17tnvr-0"
})([""]);
TooltipStyle.Title = styled.span.withConfig({
  displayName: "styled__Title",
  componentId: "sc-17tnvr-1"
})(["font-size:110%;font-weight:bold;&::after{content:\"\";margin:0 0.125em;}"]);
export var PopupStyle = styled.div.withConfig({
  displayName: "styled__PopupStyle",
  componentId: "sc-17tnvr-2"
})(["display:inline-block;box-sizing:border-box;> *{box-sizing:border-box;overflow:hidden;white-space:nowrap;}"]);
PopupStyle.Title = styled.div.withConfig({
  displayName: "styled__Title",
  componentId: "sc-17tnvr-3"
})(["font-size:110%;font-weight:bold;text-align:center;"]);
PopupStyle.Span = styled.span.withConfig({
  displayName: "styled__Span",
  componentId: "sc-17tnvr-4"
})(["font-size:90%;display:block;"]);
PopupStyle.Button = styled.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-17tnvr-5"
})(["cursor:pointer;width:100%;height:100%;svg,img{vertical-align:middle;max-width:1.25em;margin:0 0.25em;height:1.25em;}&.active{font-weight:600;box-shadow:0 0 2px 2px rgba(0,64,255,0.5);}&.disabled{cursor:default;}&.disabled svg{fill:#ccc;}"]);
//# sourceMappingURL=styled.js.map