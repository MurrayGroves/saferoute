import "./App.css";

import "maplibre-gl/dist/maplibre-gl.css";

import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import MapPage from "./pages/map";
import { Button } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map/:start/:end" element={<MapPage />} />
        <Route path="/" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
