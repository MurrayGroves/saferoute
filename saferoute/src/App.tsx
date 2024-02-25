import React from "react";

import './App.css';
import { Input, Paper, TextField } from '@mui/material';
import {makeStyles} from '@mui/styles';

import Autocomplete from 'react-google-autocomplete';

function App() {
  const [search, setSearch] = React.useState('');
  const [mapsValue, setMapsValue] = React.useState(null);

  return (
    <div className="App" style={{justifyContent: 'center', display: 'flex'}}>
      <Paper sx={{borderRadius: "25px", width: '90%', marginTop: '5%', height: '5vh'}}>
        <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_KEY} options={{types: []}}
          style={{border: 'none', width: '90%', height: '100%', fontSize: '120%', backgroundColor: 'rgba(0, 0, 0, 0)', outline: 'none', borderColor: 'transparent'}} placeholder="Search" />
      </Paper>

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
