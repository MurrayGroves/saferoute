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

const x: PatchedItinerary = {
  duration: 645,
  startTime: 1740434700000,
  endTime: 1740435345000,
  walkTime: 645,
  transitTime: 0,
  waitingTime: 0,
  walkDistance: 580.19,
  walkLimitExceeded: false,
  generalizedCost: 1060,
  elevationLost: 0.0,
  elevationGained: 0.0,
  transfers: 0,
  fare: { fare: {}, details: {} },
  legs: [
    {
      startTime: 1740434700000,
      endTime: 1740435345000,
      departureDelay: 0,
      arrivalDelay: 0,
      realTime: false,
      distance: 580.19,
      generalizedCost: 1060,
      pathway: false,
      mode: "WALK",
      transitLeg: false,
      route: "",
      agencyTimeZoneOffset: -28800000,
      interlineWithPreviousLeg: false,
      from: {
        name: "Origin",
        lon: -122.68021,
        lat: 45.51693,
        departure: 1740434700000,
        vertexType: "NORMAL",
      },
      to: {
        name: "Destination",
        lon: -122.67815,
        lat: 45.52138,
        arrival: 1740435345000,
        vertexType: "NORMAL",
      },
      legGeometry: {
        points:
          "e_ytGd|wkVe@SKGMEiB{@KEMGEPkBy@IECAICu@_@u@]IEEAGEmB{@AFIEKEm@WOIs@[AAECKEDUkB{@KEET]lB",
        length: 32,
      },
      steps: [
        {
          distance: 348.17,
          relativeDirection: "DEPART",
          streetName: "Southwest 6th Avenue",
          absoluteDirection: "NORTH",
          stayOn: false,
          area: false,
          bogusName: false,
          lon: -122.6798609,
          lat: 45.5168376,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 2.8,
          relativeDirection: "LEFT",
          streetName: "path",
          absoluteDirection: "WEST",
          stayOn: false,
          area: false,
          bogusName: true,
          lon: -122.6783872,
          lat: 45.5197179,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 12.69,
          relativeDirection: "RIGHT",
          streetName: "path",
          absoluteDirection: "NORTH",
          stayOn: true,
          area: false,
          bogusName: true,
          lon: -122.6784206,
          lat: 45.5197272,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 67.48,
          relativeDirection: "CONTINUE",
          streetName: "Southwest 6th Avenue",
          absoluteDirection: "NORTH",
          stayOn: false,
          area: false,
          bogusName: false,
          lon: -122.678363,
          lat: 45.5198339,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 5.5,
          relativeDirection: "CONTINUE",
          streetName: "path",
          absoluteDirection: "NORTH",
          stayOn: false,
          area: false,
          bogusName: true,
          lon: -122.6780538,
          lat: 45.5204008,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 16.42,
          relativeDirection: "RIGHT",
          streetName: "path",
          absoluteDirection: "EAST",
          stayOn: true,
          area: false,
          bogusName: true,
          lon: -122.6780283,
          lat: 45.5204469,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 71.77,
          relativeDirection: "LEFT",
          streetName: "Southwest 6th Avenue",
          absoluteDirection: "NORTH",
          stayOn: false,
          area: false,
          bogusName: false,
          lon: -122.6778825,
          lat: 45.5204769,
          elevation: "",
          walkingBike: false,
        },
        {
          distance: 55.38,
          relativeDirection: "LEFT",
          streetName: "Southwest Harvey Milk Street",
          absoluteDirection: "WEST",
          stayOn: false,
          area: false,
          bogusName: false,
          lon: -122.677553,
          lat: 45.5210796,
          elevation: "",
          walkingBike: false,
        },
      ],
      rentedBike: false,
      walkingBike: false,
      duration: 645.0,
    },
  ],
  tooSloped: false,
  arrivedAtDestinationWithRentedBicycle: false,
};
