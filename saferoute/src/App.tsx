import React, { useEffect } from "react";
import { Layer, Source, Map } from "react-map-gl/maplibre";
import Autocomplete from "@mui/material/Autocomplete";

import "./App.css";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ClickableMap } from "./ClickableMap";
import "maplibre-gl/dist/maplibre-gl.css";
import { LatLong, PatchedItinerary, PathFindingResponse } from "./types";
import { routeToFeature } from "./routeUtils";
import type { LineLayer } from "react-map-gl/maplibre";
import type { FeatureCollection, Feature } from "geojson";

const pathFindingURL =
  "http://100.86.237.92:8080/otp/routers/default/plan?fromPlace={from}&toPlace={to}}&time=2:05pm&date=25-02-24&MODE=BICYCLE&arriveBy=FALSE&showIntermediateStops=true&wheelchair=FALSE";

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)",
    },
  },
}));

function App() {
  const [start, setStart] = React.useState<LatLong|undefined>([ 51.47132767219449,-2.6145690679550175]);
  const [end, setEnd] = React.useState<LatLong|undefined>([51.46420297562347,-2.594809234142304]);
  const [route, setRoute] = React.useState<PatchedItinerary[]>();

  useEffect(() => {
    if (start && end) {
      fetch(
        pathFindingURL
          .replace("{from}", encodeURIComponent(start.join(",")))
          .replace("{to}", encodeURIComponent(end.join(",")))
      )
        .then((response) => response.json() as Promise<PathFindingResponse>)
        .then((response) => {
          console.log(routeToFeature(response.plan.itineraries));
          setRoute(response.plan.itineraries);
        });
    }
  }, [start, end]);
  return (
    <div className="App">
      <Autocomplete
        renderInput={(params) => <TextField {...params} label="Movie" />}
        options={[]}
        freeSolo={true}
      />
      <ClickableMap
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        initialViewState={{ latitude: 51.4935, longitude: -2.57634, zoom: 12 }}
        attributionControl={false}
        style={{ width: "100vw", height: "100vh" }}
      >
        {route && (
          <Source id="route" type="geojson" data={routeToFeature(route)}>
            <Layer
              id="route"
              type="line"
              source="route"
              paint={{ "line-width": 3 }}
            />
          </Source>
        )}
      </ClickableMap>
    </div>
  );
}

export default App;
