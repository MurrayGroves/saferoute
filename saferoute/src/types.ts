import { Place, Itinerary, Leg, Step } from "@opentripplanner/types";
export type UnwrapForwardRefExoticComponent<T> =
  T extends React.ForwardRefExoticComponent<infer P> ? P : never;

export type LatLong = [number, number];

// Replace<T, R, I> replaces all properties of type T with R in I
type Replace<T, R, I> = {
  [K in keyof I]: K extends T ? R : I[K];
};

export type PatchedItinerary = Replace<"legs", PatchedLeg[], Itinerary> & {
  generalizedCost: number;
  fare: { fare: {}; details: {} };
  arrivedAtDestinationWithRentedBicycle: boolean;
};

export type PatchedLeg = Omit<
  Replace<"steps", PatchedStep[], Leg> & {
    generalizedCost: number;
  },
  "rentedCar" | "rentedVehicle" | "intermediateStops"
>;

type PatchedStep = Omit<Step, "elevation"> & {
  elevation: string;
  walkingBike: boolean;
};

export type PathFindingResponse = {
  debugOutput: any;
  requestParameters: any;
  plan: {
    date: number;
    from: Place;
    to: Place;
    itineraries: Array<PatchedItinerary>;
  };
  error?: {
    id: number;
    msg: string;
    message: string;
  };
  elevationMetadata: {
    ellipsoidToGeoidDifference: number;
    geoidElevation: boolean;
  };
};
