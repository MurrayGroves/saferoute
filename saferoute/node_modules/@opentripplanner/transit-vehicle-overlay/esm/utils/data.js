/** utility functions for converting and manipulating vehicle data */

/** this function is used to have props that are not used w/out lint errors */
export function linterIgnoreTheseProps() {}
/** simple (python-esque) conversion of an int to a string */

export function str(val) {
  var retVal = "";

  try {
    retVal = "".concat(val);
  } catch (e) {
    console.error(e);
  }

  return retVal;
}
/** gets best appropriate vehicle tracker id from input parameter based on type and data */

export function getVehicleId(vehicleObjectOrString) {
  var queryId = null;

  if (vehicleObjectOrString) {
    if (typeof vehicleObjectOrString === "string" || vehicleObjectOrString instanceof String) queryId = vehicleObjectOrString;else if (vehicleObjectOrString.blockId) queryId = vehicleObjectOrString.blockId;else if (vehicleObjectOrString.tripId) queryId = vehicleObjectOrString.tripId;
  }

  return queryId;
}
/** find a vehicle by block or trip id from a list of vehicles */

export function findVehicleById(vehicleList, queryId) {
  var defVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var retVal = defVal;

  try {
    if (vehicleList && queryId) {
      vehicleList.some(function (v) {
        if (queryId === v.blockId || queryId === v.tripId) {
          retVal = v;
          return true;
        }

        return false;
      });
    }
  } catch (e) {
    console.error(e);
  }

  return retVal;
}
/**
 * make a short name (good for tooltips)
 * this routine used for converting a developer.trimet.org response (see below)
 */

export function triMetRouteToShortName(route) {
  var retVal = "";

  switch (route) {
    case 90:
      retVal = "MAX Red";
      break;

    case 100:
      retVal = "MAX Blue";
      break;

    case 190:
      retVal = "MAX Yellow";
      break;

    case 200:
      retVal = "MAX Green";
      break;

    case 290:
      retVal = "MAX Orange";
      break;

    case 203:
      retVal = "WES";
      break;

    case 193:
      retVal = "PSC NS Line";
      break;

    case 194:
      retVal = "PSC A-Loop";
      break;

    case 195:
      retVal = "PSC B-Loop";
      break;

    default:
      retVal = str(route);
      break;
  }

  return retVal;
}
/**
 * convert a developer.trimet.org vehicle object to the
 * @opentripplanner/core-utils/types/transitVehicleType object format
 */

export function convertTriMetRecord(rec, qt) {
  var secs = Math.round((qt - rec.time) / 1000);
  var date = new Date(rec.time).toLocaleString();
  var retVal = {
    agencyId: "TRIMET",
    id: "".concat(rec.vehicleID, "+").concat(rec.blockID),
    vehicleId: str(rec.vehicleID),
    routeId: str(rec.routeNumber),
    blockId: str(rec.blockID),
    shapeId: null,
    tripId: str(rec.tripID),
    directionId: str(rec.direction),
    stopId: str(rec.nextLocID),
    stopSequence: rec.nextStopSeq,
    lat: rec.latitude,
    lon: rec.longitude,
    heading: rec.bearing,
    routeType: rec.type === "rail" ? "TRAM" : "BUS",
    routeShortName: triMetRouteToShortName(rec.routeNumber),
    routeLongName: rec.signMessage,
    reportDate: date,
    seconds: secs,
    status: "IN_TRANSIT_TO"
  };
  return retVal;
}
/**
 * convert list of developer.trimet.org vehicle objects to format used in this component
 * curl "https://developer.trimet.org/ws/v2/vehicles/appid/B393B2CE96A258A72BAB481CA"
 */

export function convertAltData(feed) {
  var retVal = [];

  if (feed && feed.resultSet && feed.resultSet.vehicle) {
    var qt = feed.resultSet.queryTime;
    retVal = feed.resultSet.vehicle.map(function (rec) {
      return convertTriMetRecord(rec, qt);
    });
  }

  return retVal;
}
//# sourceMappingURL=data.js.map