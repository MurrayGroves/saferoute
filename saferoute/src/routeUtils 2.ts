import { PatchedItinerary } from "./types";
import { Feature, LineString } from "geojson";

export function routeToFeature(route: PatchedItinerary[]): Feature<LineString> {
  const coordinates = route.flatMap((itinerary) =>
    itinerary.legs.flatMap((leg) =>
      leg.steps.map((step) => [step.lat, step.lon])
    )
  );
  console.log(coordinates);
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}
