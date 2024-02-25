import React from "react";

import Autocomplete from "@mui/material/Autocomplete";

import "./App.css";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ClickableMap } from "./ClickableMap";
import "maplibre-gl/dist/maplibre-gl.css";
import { LatLong } from "./types";

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)",
    },
  },
}));

function App() {
  const [start, setStart] = React.useState<LatLong>();
  const [end, setEnd] = React.useState<LatLong>();
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
        initialViewState={{ latitude: 51.4935, longitude: -2.57634, zoom: 12 }}
        attributionControl={false}
        style={{ width: "100vw", height: "100vw" }}
      ></ClickableMap>
    </div>
  );
}

export default App;
