import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactDOM from "react-dom";
// import geoJson from "./data.json";
import Modal from "./Modal";
import "./index.css";
import HeatMapToggle from "./components/HeatMapToggle";
import HeatLayer from "./components/HeatLayer";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXVkLWRyZWFtcyIsImEiOiJjbHdtazk1eTkwaDUxMmlwb2d1ZzM1N3ZtIn0.fK_tYF0yFBfCum4y4LXtSA";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(
      feature.properties.name,
      feature.properties.address,
      feature.properties.safety,
      feature.geometry.coordinates
    );
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

// Initialize the geocoder
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    color: "#b1282d",
  },
  placeholder: "Search",
});

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [modalDescription, setModalDescription] = useState([]);
  const [modalStartCoords, setModalStartCoords] = useState([]);
  const [modalEndCoords, setModalEndCoords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const markersRef = useRef([]);
  const [originalLocation, setOriginalLocation] = useState(null);

  useEffect(() => {
    console.log("Initializing the map");

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/aud-dreams/clwmm6n3200vc01q17qorbayl",
      center: [-118.23965907096863, 34.055922765889704], // Initial center [lng, lat]
      zoom: 14, // Initial zoom
    });

    // Add geolocate control to the map
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // Add navigation control (the +/- zoom buttons)
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Add the geocoder to the map
    mapRef.current.addControl(geocoder, "top-left");

    // Event listener for when a result is selected
    geocoder.on("result", (e) => {
      const { result } = e;
      if (result && result.geometry && result.geometry.coordinates) {
        const [lng, lat] = result.geometry.coordinates;
        setModalStartCoords([lng, lat]);
        const currentHour = new Date().getHours();

        setOriginalLocation({
          name: result.place_name,
          address: result.text,
          coordinates: [lng, lat],
        });
        console.log(originalLocation);

        clearMarkers();

        fetch(
          `http://127.0.0.1:5000/map/nearby?lat=${lat}&lon=${lng}&time=${currentHour}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setFetchedData(json);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

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

  useEffect(() => {
    if (fetchedData && fetchedData.data && fetchedData.data.features) {
      clearMarkers();

      fetchedData.data.features.forEach((feature) => {
        const ref = React.createRef();
        ref.current = document.createElement("div");
        ReactDOM.render(
          <Marker onClick={markerClicked} feature={feature} />,
          ref.current
        );
        const marker = new mapboxgl.Marker(ref.current)
          .setLngLat(feature.geometry.coordinates)
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      });
    }
    if (originalLocation) {
      const originalMarker = new mapboxgl.Marker({ color: "#b1282d" })
        .setLngLat(originalLocation.coordinates)
        .addTo(mapRef.current);

      // event listener for original location marker
      originalMarker.getElement().addEventListener("click", () => {
        markerClicked(originalLocation.address, originalLocation.name, -1);
      });

      markersRef.current.push(originalMarker);
    }
  }, [fetchedData, originalLocation]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/map/heatmap?user_id=3995e0eb01af4714b3724b0e8a65661f",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setHeatmapData(json.data);
      });
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  const markerClicked = (name, address, safety, coords) => {
    setModalDescription({ name, address, safety });
    setModalEndCoords(coords);
    setIsModalOpen(true);
  };

  const handleHeatmapToggle = () => {
    setShowHeatmap(!showHeatmap);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      <Link to="/signup">
        <UserCircleIcon
          style={{
            position: "absolute",
            top: "87px",
            bottom: "auto",
            right: "20px",
            left: "auto",
            height: "40px",
          }}
        />
      </Link>
      <HeatMapToggle onClick={handleHeatmapToggle} />
      {showHeatmap && heatmapData && (
        <HeatLayer map={mapRef.current} heatData={heatmapData} />
      )}
      <Modal
        isOpen={isModalOpen}
        description={modalDescription}
        onClose={closeModal}
        map={mapRef.current}
        endCoords={modalEndCoords}
        startCoords={modalStartCoords}
      />
    </div>
  );
};

export default MapComponent;
