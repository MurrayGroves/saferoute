import React, { useEffect, RefObject, useState } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

import "./App.css";
import { Marker } from "react-map-gl/maplibre";
import { Paper, Switch, ToggleButton } from "@mui/material";

import { usePlacesWidget } from "react-google-autocomplete";
import { ClickableMap } from "./ClickableMap";
import "maplibre-gl/dist/maplibre-gl.css";
import { LatLong } from "./types";
import { Feature, LineString } from "geojson";

function coordsToFeature(coords: LatLong[]): Feature<LineString> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coords.map((coord) => [coord[1], coord[0]]),
    },
  };
}

function App() {
  const [start, setStart] = React.useState<LatLong>();
  const [end, setEnd] = React.useState<LatLong>();
  const [markers, setMarkers] = React.useState<LatLong[]>([]);
  const [newRoute, setNewRoute] = useState<LatLong[]>();
  const [weight, setWeight] = useState(true);

  useEffect(() => {
    if (!start || !end) {
      setNewRoute(undefined);
      return;
    }
    fetch(`http://localhost:8080/route?start=${start}&end=${end}&weight=${weight ? 'combinedIndex': 'travel_time'}`).then(
      (response) => {
        response.json().then((data) => {
          let coordsList = data["route"];
          console.log(coordsList);
          setNewRoute(coordsList);
          let coordsString = "";
          for (let i = 0; i < coordsList.length; i++) {
            coordsString += coordsList[i][0] + "," + coordsList[i][1] + ";";
          }
          coordsString = coordsString.slice(0, -1);
          let radiuses = "";
          for (let i = 0; i < coordsList.length; i++) {
            radiuses += "50;";
          }
          radiuses = radiuses.slice(0, -1);
          fetch(
            `https://api.mapbox.com/matching/v5/mapbox/walking/${coordsString}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&radiuses=${radiuses}`
          ).then((response) =>
            response.json().then((data) => {
              console.log(data);
            })
          );
        });
      }
    );
  }, [start, end, weight]);

  useEffect(() => {
    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      body:
        "data=" +
        encodeURIComponent(`
        [out:json];
        node(51.4935,-2.57634,51.5935,-2.67634);
out;
        `),
    })
      .then((response) => response.json())
      .then((x) =>
        setMarkers(
          x.elements
            .filter((e: any) => e.tags?.amenity)
            .map((e: any) => [e.lon, e.lat])
        )
      );
  }, [start, end]);

  let refs = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    onPlaceSelected: (place) => {
      if (place.geometry?.location?.lat() === undefined)
        return console.log("no location");
      if (place.geometry?.location?.lng() === undefined)
        return console.log("no location");
      let loc: LatLong = [
        place.geometry?.location?.lat(),
        place.geometry?.location?.lng(),
      ];
      setStart(loc);
    },
    options: { types: [] },
  });

  const fromRef = refs.ref;

  refs = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    onPlaceSelected: (place) => {
      if (place.geometry?.location?.lat() === undefined)
        return console.log("no location");
      if (place.geometry?.location?.lng() === undefined)
        return console.log("no location");
      let loc: LatLong = [
        place.geometry?.location?.lat(),
        place.geometry?.location?.lng(),
      ];
      setEnd(loc);
    },
    options: { types: [] },
  });

  const toRef = refs.ref;

  return (
    <div className="App" style={{ justifyContent: "center", display: "flex" }}>
      <Paper
        sx={{
          borderRadius: "10px",
          width: "90%",
          marginTop: "5%",
          height: "5vh",
          position: "absolute",
          top: "1%",
          zIndex: "100",
        }}
      >
        <input
          ref={fromRef as unknown as RefObject<HTMLInputElement>}
          placeholder="From"
          style={{
            border: "none",
            width: "90%",
            height: "100%",
            fontSize: "120%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            outline: "none",
            borderColor: "transparent",
          }}
        />
      </Paper>

      <Paper
        sx={{
          borderRadius: "10px",
          width: "90%",
          marginTop: "5%",
          height: "5vh",
          position: "absolute",
          top: "7%",
          zIndex: "100",
        }}
      >
        <input
          ref={toRef as unknown as RefObject<HTMLInputElement>}
          placeholder="To"
          style={{
            border: "none",
            width: "90%",
            height: "100%",
            fontSize: "120%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            outline: "none",
            borderColor: "transparent",
          }}
        />
      </Paper>

      <Switch sx={{position: 'absolute', bottom: '1%', zIndex: '5'}} checked={weight} onChange={(e) => setWeight(e.target.checked)}></Switch>

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
        {newRoute && (
          <Source id="route" type="geojson" data={coordsToFeature(newRoute)}>
            <Layer
              id="route-layer"
              type="line"
              source="route"
              paint={{ "line-width": 3 }}
            />
          </Source>
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            // id={`marker-${index}`}
            latitude={marker[0]}
            longitude={marker[1]}
          ></Marker>
        ))}
      </ClickableMap>
    </div>
  );
}

export default App;
