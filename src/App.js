import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactDOM from "react-dom";
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

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/aud-dreams/clwmm6n3200vc01q17qorbayl',
      center: [-117.838914978, 33.6405407712], // Initial center [lng, lat]
      zoom: 14, // Initial zoom
    });

    // Add geolocate control to the map
    mapRef.current.addControl(
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
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    if (geoJson && geoJson.features) {
      geoJson.features.forEach((feature) => {
      const ref = React.createRef();
      ref.current = document.createElement("div");
      ReactDOM.render(
        <Marker onClick={markerClicked} feature={feature} />,
        ref.current
      );
      new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(mapRef.current);
      });
    }

    // Initialize the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {
        color: 'orange',
      },
      placeholder: 'Search for places',
    });

    // Add the geocoder to the map
    mapRef.current.addControl(geocoder, 'top-left');

    // Event listener for when a result is selected
    geocoder.on('result', (e) => {
      const { result } = e;
      if (result && result.geometry && result.geometry.coordinates) {
        const [lng, lat] = result.geometry.coordinates;
        // Fly to the selected location
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 14,
        });
      }
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const markerClicked = (title) => (
    window.alert(title)
  );

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
