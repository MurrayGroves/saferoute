import { PatchedItinerary } from "./types";
import { Feature, LineString } from "geojson";
import { decode } from "@googlemaps/polyline-codec";

export function routeToFeature(route: PatchedItinerary[]): Feature<LineString> {
  console.log(route);
  const coordinates = route
    .flatMap((itinerary) => itinerary.legs)
    .flatMap((leg) => leg.legGeometry.points)
    .flatMap((step) => decode(step))
    .map((pos) => [pos[1], pos[0]]);

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}
