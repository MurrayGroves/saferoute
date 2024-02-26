import * as StyledCircle from "./styled";
import * as utils from "../../../utils";
export var Circle = utils.makeRotatedMarker(utils.makeBasicVehicleShape(StyledCircle.Shape, StyledCircle.TrackedShape, function (zoom) {
  var midZoom = 12;
  var midSize = 13.0;
  var farSize = 7.0;
  return zoom >= midZoom ? midSize : farSize;
}));
export var CircledVehicle = utils.makeRotatedMarker(function (_ref) {
  var color = _ref.color,
      highlightColor = _ref.highlightColor,
      isTracked = _ref.isTracked,
      routeType = _ref.routeType;
  return utils.makeVehicleIcon(StyledCircle, routeType, color, highlightColor, isTracked);
}); // Rename styled components for export

export { StyledCircle as Styled };
//# sourceMappingURL=index.js.map