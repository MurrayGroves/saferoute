import React, { RefObject } from "react";

import './App.css';
import { Input, Paper, TextField } from '@mui/material';
import {makeStyles} from '@mui/styles';

import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import { ClickableMap } from "./ClickableMap";
import { LatLong } from "./types";

function App() {
  const [search, setSearch] = React.useState('');
  const [mapsValue, setMapsValue] = React.useState(null);
  const [start, setStart] = React.useState<LatLong>();
  const [end, setEnd] = React.useState<LatLong>();

  let refs = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    onPlaceSelected: (place) => {
      if(place.geometry?.location?.lat() === undefined) return console.log('no location')
      if(place.geometry?.location?.lng() === undefined) return console.log('no location')
      let loc: LatLong = [place.geometry?.location?.lat(), place.geometry?.location?.lng()]
      setStart(loc)
    },
    options: {types: []}
  })

  const fromRef = refs.ref;

  refs = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    onPlaceSelected: (place) => {
      if(place.geometry?.location?.lat() === undefined) return console.log('no location')
      if(place.geometry?.location?.lng() === undefined) return console.log('no location')
      let loc: LatLong = [place.geometry?.location?.lat(), place.geometry?.location?.lng()]
      setEnd(loc)
    },
    options: { types: [] }
  })

  const toRef = refs.ref;

  return (
    <div className="App" style={{justifyContent: 'center', display: 'flex'}}>
      <Paper sx={{borderRadius: "10px", width: '90%', marginTop: '5%', height: '5vh', position: 'absolute', top: '1%', zIndex: '100'}}>
        <input ref={fromRef as unknown as RefObject<HTMLInputElement>} placeholder="From"
          style={{border: 'none', width: '90%', height: '100%', fontSize: '120%'
          , backgroundColor: 'rgba(0, 0, 0, 0)', outline: 'none', borderColor: 'transparent'}}
          />
      </Paper>

      <Paper sx={{borderRadius: "10px", width: '90%', marginTop: '5%', height: '5vh', position: 'absolute', top: '7%', zIndex: '100'}}>
        <input ref={toRef as unknown as RefObject<HTMLInputElement>} placeholder="To"
          style={{border: 'none', width: '90%', height: '100%', fontSize: '120%'
          , backgroundColor: 'rgba(0, 0, 0, 0)', outline: 'none', borderColor: 'transparent'}}
          />
      </Paper>
      

      <ClickableMap
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        initialViewState={{ latitude: 51.4935, longitude: -2.57634, zoom: 12 }}
        attributionControl={false}
        style={{ width: "100vw", height: "100vh" }}
      ></ClickableMap>
    </div>
  );
}

export default App;
