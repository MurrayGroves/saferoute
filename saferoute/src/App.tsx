import React from 'react';
import logo from './logo.svg';
import BaseMap from '@opentripplanner/base-map'

import Autocomplete from '@mui/material/Autocomplete';

import './App.css';
import { TextField } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)"
    }
  }
}));

function App() {
  return (
    <div className="App">
      <Autocomplete renderInput={(params) => <TextField {...params} label="Movie"/>} options={[]} freeSolo={true}
        style={{margin: '5%'}}
      />

      <BaseMap center={[51.49350, -2.57634]} style={{ position: 'absolute', top: '0%', height: '70vh', zIndex: '-1' }} mapLibreProps={{ attributionControl: false }}>

      </BaseMap>
    </div>
  );
}

export default App;
