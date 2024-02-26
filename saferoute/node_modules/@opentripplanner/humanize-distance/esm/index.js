function roundToOneDecimalPlace(number) {
  return Math.round(number * 10) / 10;
}

export function humanizeDistanceStringImperial(meters, abbreviate, intl) {
  var feet = meters * 3.28084;
  var unit = "mile";
  var unitIfNoIntl = abbreviate ? "mi" : "miles";
  var value = roundToOneDecimalPlace(feet / 5280);

  if (feet < 528) {
    unit = "foot";
    unitIfNoIntl = abbreviate ? "ft" : "feet";
    value = Math.round(feet);
  }

  return intl ? intl.formatNumber(value, {
    style: "unit",
    unit: unit,
    unitDisplay: abbreviate ? "short" : "long"
  }) : "".concat(value, " ").concat(unitIfNoIntl);
}
export function humanizeDistanceStringMetric(meters, intl) {
  var km = meters / 1000;
  var unit = "meter";
  var shortUnit = "m";
  var value = Math.round(meters);

  if (km > 1) {
    unit = "kilometer";
    shortUnit = "km";
    value = km > 100 ? // 100 km and over
    Math.round(km) : // 1.1 km => 99.9 km
    roundToOneDecimalPlace(km);
  }

  return intl ? intl.formatNumber(value, {
    style: "unit",
    unit: unit,
    unitDisplay: "short"
  }) : "".concat(value, " ").concat(shortUnit);
}
export function humanizeDistanceString(meters) {
  var outputMetricUnits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var intl = arguments.length > 2 ? arguments[2] : undefined;
  return outputMetricUnits ? humanizeDistanceStringMetric(meters, intl) : humanizeDistanceStringImperial(meters, null, intl);
}
//# sourceMappingURL=index.js.map