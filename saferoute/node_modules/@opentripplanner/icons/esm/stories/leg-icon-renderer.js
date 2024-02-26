import React from "react";
import IconRenderer from "../icon-renderer"; // import mock itinaries. These are all trip plan outputs from OTP.

var bikeOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-only.json");

var bikeRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-rental.json");

var eScooterRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/e-scooter-rental.json");

var parkAndRideItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/park-and-ride.json");

var tncTransitTncItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/tnc-transit-tnc.json");

var walkOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-only.json");

var walkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk.json");

var walkTransitWalkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk-transit-walk.json");

var exampleLegs = [{
  leg: bikeOnlyItinerary.legs[0],
  type: "Personal bike"
}, {
  leg: bikeRentalItinerary.legs[1],
  type: "Bike rental"
}, {
  leg: walkTransitWalkTransitWalkItinerary.legs[1],
  type: "Bus"
}, {
  leg: eScooterRentalItinerary.legs[1],
  type: "Micromobility (from Razor company)"
}, {
  leg: parkAndRideItinerary.legs[0],
  type: "Park & Ride"
}, {
  leg: tncTransitTncItinerary.legs[0],
  type: "TNC (Uber)"
}, {
  leg: walkTransitWalkItinerary.legs[1],
  type: "Tram"
}, {
  leg: walkOnlyItinerary.legs[0],
  type: "Walk"
}];
export default function LegIconRenderer(_ref) {
  var Component = _ref.component;
  return /*#__PURE__*/React.createElement(IconRenderer, {
    examples: exampleLegs,
    renderComponentFn: function renderComponentFn(example) {
      return /*#__PURE__*/React.createElement(Component, {
        leg: example.leg
      });
    },
    typeTitle: "Leg Type"
  });
}
//# sourceMappingURL=leg-icon-renderer.js.map