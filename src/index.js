import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import Posts from "./Posts";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
    {/* <Posts name="Hollywood" address="Highland Ave, Los Angeles, CA" /> */}
  </React.StrictMode>
);
