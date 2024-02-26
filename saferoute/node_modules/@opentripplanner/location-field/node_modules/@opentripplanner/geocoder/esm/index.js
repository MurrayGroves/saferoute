import * as arcgis from "@conveyal/geocoder-arcgis-geojson";
import * as pelias from "isomorphic-mapzen-search";
import memoize from "lodash.memoize";
import * as here from "./apis/here";
import * as photon from "./apis/photon";
import * as otp from "./apis/otp";
import ArcGISGeocoder from "./geocoders/arcgis";
import NoApiGeocoder from "./geocoders/noapi";
import PeliasGeocoder from "./geocoders/pelias";
import HereGeocoder from "./geocoders/here";
import PhotonGeocoder from "./geocoders/photon";
import OTPGeocoder from "./geocoders/otp"; // Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

// Create a memoized getter to avoid recreating new geocoders each time.
var getGeocoder = memoize(function (geocoderConfig) {
  if (!geocoderConfig || !geocoderConfig.type) {
    return new NoApiGeocoder();
  }

  var type = geocoderConfig.type;

  switch (type) {
    case "ARCGIS":
      return new ArcGISGeocoder(arcgis, geocoderConfig);

    case "PELIAS":
      return new PeliasGeocoder(pelias, geocoderConfig);

    case "HERE":
      return new HereGeocoder(here, geocoderConfig);

    case "PHOTON":
      return new PhotonGeocoder(photon, geocoderConfig);

    case "OTP":
      return new OTPGeocoder(otp, geocoderConfig);

    default:
      console.error("Unknown geocoder type: \"".concat(type, "\". Using NoApiGeocoder."));
      return new NoApiGeocoder();
  }
});
export default getGeocoder;
//# sourceMappingURL=index.js.map