import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import Posts from "./Posts";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
    {/* <Posts name="Nigeria" address="42 westpark" /> */}
  </React.StrictMode>
);
