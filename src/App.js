import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultsList from './components/SearchBar/SearchResultsList';
import ReactDOM from "react-dom";
import SearchBar from './components/SearchBar';
import geoJson from "./chicago-parks.json";
import "./index.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXVkLWRyZWFtcyIsImEiOiJjbHdtazk1eTkwaDUxMmlwb2d1ZzM1N3ZtIn0.fK_tYF0yFBfCum4y4LXtSA';

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.838914978);
  const [lat, setLat] = useState(33.6405407712);
  const [zoom, setZoom] = useState(14);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aud-dreams/clwmm6n3200vc01q17qorbayl',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Add geolocate control to the map
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl());

    if (geoJson && geoJson.features) {
      geoJson.features.forEach((feature) => {
      const ref = React.createRef();
      ref.current = document.createElement("div");
      ReactDOM.render(
        <Marker onClick={markerClicked} feature={feature} />,
        ref.current
      );
      new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(map.current);
      });
    }

    
  });

  const markerClicked = (title) => {
    window.alert(title);
  };


  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}