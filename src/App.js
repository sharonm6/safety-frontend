import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ReactDOM from "react-dom";
import geoJson from "./chicago-parks.json";
import Modal from './Modal';
import "./index.css";
import HeatMapToggle from './components/HeatMapToggle';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXVkLWRyZWFtcyIsImEiOiJjbHdtazk1eTkwaDUxMmlwb2d1ZzM1N3ZtIn0.fK_tYF0yFBfCum4y4LXtSA';

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.title, feature.properties.address);
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
  const [modalDescription, setModalDescription] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        color: '#512589',
      },
      placeholder: 'Search',
    });

    // Add the geocoder to the map
    mapRef.current.addControl(geocoder, 'top-left');

    // Event listener for when a result is selected
    geocoder.on('result', (e) => {
      const { result } = e;
      if (result && result.geometry && result.geometry.coordinates) {
        const [lng, lat] = result.geometry.coordinates;
        const currentHour = new Date().getHours();
        const fetchData = () => {
        console.log("flying and sending");
        fetch(`http://127.0.0.1:5000/map/nearby?lat=${lat}&lon=${lng}&time=${currentHour}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
              })
              .catch((error) => {
                  console.error('Error fetching data:', error);
              });
        };
        fetchData();

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

  const markerClicked = (title, address) => {
    setModalDescription({title, address});
    setIsModalOpen(true);
  };

  const handleHeatmapToggle = () => {
    const fetchData = () => {
        fetch("http://127.0.0.1:5000/map/heatmap?user_id=3995e0eb01af4714b3724b0e8a65661f", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          });
      };
      fetchData();
  };    
    
  const closeModal = () => {
    setIsModalOpen(false);
  };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        <HeatMapToggle onClick={handleHeatmapToggle} />
        <Modal isOpen={isModalOpen} description={modalDescription} onClose={closeModal} />
        </div>
    );
};

export default MapComponent;