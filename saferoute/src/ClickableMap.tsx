import { Map } from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { LatLong, UnwrapForwardRefExoticComponent } from "./types";

export type Props = {
  start: LatLong | undefined;
  end: LatLong | undefined;
  setStart: (start: LatLong | undefined) => void;
  setEnd: (end: LatLong | undefined) => void;
};

export const ClickableMap = ({
  start,
  end,
  setStart,
  setEnd,
  ...props
}: Props & UnwrapForwardRefExoticComponent<typeof Map>): JSX.Element => {
  return (
    <Map
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      // @ts-expect-error
      onClick={(event: mapboxgl.MapLayerMouseEvent) => {
        if (event.type === "click") {
          if (start && end) {
            setStart([event.lngLat.lat, event.lngLat.lng]);
            setEnd(undefined);
          } else if (start && !end) {
            setEnd([event.lngLat.lat, event.lngLat.lng]);
          } else if (!start) {
            setStart([event.lngLat.lat, event.lngLat.lng]);
          }
        }
      }}
      {...props}
    >
      {start && (
        <Marker
          key="start"
          color="red"
          latitude={start[0]}
          longitude={start[1]}
        ></Marker>
      )}
      {end && (
        <Marker
          key="end"
          color="green"
          latitude={end[0]}
          longitude={end[1]}
        ></Marker>
      )}

      {props.children}
    </Map>
  );
};
