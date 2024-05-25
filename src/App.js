import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import SearchBar from './components/SearchBar';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXVkLWRyZWFtcyIsImEiOiJjbHdtazk1eTkwaDUxMmlwb2d1ZzM1N3ZtIn0.fK_tYF0yFBfCum4y4LXtSA';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-118.2426);
  const [lat, setLat] = useState(34.0549);
  const [zoom, setZoom] = useState(14);
  const [state, setState] = useState({dataSource: []});

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
  });

  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <SearchBar
        dataSource={state.dataSource}
        onChange={(value) => setState({dataSource: [ value, value+value, value+value+value]})}
        onRequestSearch={() => console.log('onRequestSearch')}
        style={{
            margin: '0 auto',
            maxWidth: 800
        }}
      />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}