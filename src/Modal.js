import React from "react";
import { useState } from "react";
import "./Modal.css";

const Modal = ({
  isOpen,
  description,
  startCoords,
  endCoords,
  onClose,
  map,
}) => {
  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal open") {
      onClose();
    }
  };

  const renderSafetyRating = (safety) => {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      if (i < safety) {
        // Render pink heart
        rating.push(
          <svg
            width="40"
            height="30"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5L8.83809 9L13 5"
              stroke="#DABDFF"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        );
      } else {
        // Render grey heart
        rating.push(
          <svg
            width="40"
            height="30"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5L6.91904 7L8.83809 9L13 5"
              stroke="#DCDCDC"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        );
      }
    }
    return rating;
  };

  async function getRoute(start, end) {
    if (!map) return;

    if (!map.getLayer("routePoints")) {
      map.addLayer({
        id: "routePoints",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
    }

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${
        start[1]
      };${end[0]},${
        end[1]
      }?steps=true&geometries=geojson&access_token=${"pk.eyJ1IjoiYXVkLWRyZWFtcyIsImEiOiJjbHdtazk1eTkwaDUxMmlwb2d1ZzM1N3ZtIn0.fK_tYF0yFBfCum4y4LXtSA"}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    const instructions = document.getElementById("instructions");
    const steps = data.legs[0].steps;

    let tripInstructions = "";
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      data.duration / 60
    )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
  }

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div id="instructions"></div>
      <div className="modal-content" style={{ position: "relative" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="location-name">
            <p style={{ margin: 6, marginTop: 15 }}>{description.name}</p>
          </div>
          <div className="location-address">
            <p style={{ margin: 6, marginTop: 0 }}>{description.address}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <div className="safety-score-text">
              <p style={{ margin: 6 }}>Safety Score: </p>
            </div>
            <div className="safety-hearts">
              {/* Render safety rating hearts */}
              {renderSafetyRating(description.safety)}
            </div>
          </div>
          <div
            className="directions-button"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button
              style={{
                display: "flex", // Ensure flexbox layout for the button content
                alignItems: "center",
                gap: "5px", // Adjust this value to add space between the SVG and the text
                margin: 6,
                marginTop: 10,
                borderRadius: 25,
                border: "none",
                backgroundColor: "rgb(81,37,137)",
                color: "white",
                height: "30px",
                width: "100px",
                justifyContent: "center",
              }}
              onClick={() => {
                getRoute(
                  [startCoords[0], startCoords[1]],
                  [endCoords[0], endCoords[1]]
                );
              }}
            >
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_28_1491)">
                  <path
                    d="M4.52987 0.490738L4.56059 0.511018L8.74376 3.64692L4.56059 6.78283C4.47742 6.84518 4.36249 6.86393 4.25921 6.83199C4.11114 6.7862 4.0285 6.65097 4.0626 6.52022L4.07256 6.49017L4.89113 4.46439H4.45626C3.2723 4.46439 2.31251 5.30386 2.31251 6.33939V9.82153H0.475006V6.33939C0.475006 4.41626 2.25747 2.85725 4.45626 2.85725H4.90246L4.07256 0.803681C4.04061 0.724638 4.05302 0.6378 4.10439 0.56859L4.12877 0.540081C4.23037 0.4364 4.40292 0.417337 4.52987 0.490738ZM11.5 2.32153C12.3457 2.32153 13.0313 2.92115 13.0313 3.66082C13.0313 4.40049 12.3457 5.0001 11.5 5.0001C10.6543 5.0001 9.96876 4.40049 9.96876 3.66082C9.96876 2.92115 10.6543 2.32153 11.5 2.32153Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_28_1491">
                    <rect width="9" height="10" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Directions
            </button>
            <button
              style={{
                margin: 6,
                marginTop: 10,
                borderRadius: 25,
                border: "none",
                backgroundColor: "rgb(81,37,137)",
                color: "white",
                height: "30px",
                width: "100px",
              }}
            >
              Experiences
            </button>
          </div>
        </div>
        {/* <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', right: 70, top: 15 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5397 22.351C11.57 22.3685 11.5937 22.3821 11.6105 22.3915L11.6384 22.4071C11.8613 22.5294 12.1378 22.5285 12.3608 22.4075L12.3895 22.3915C12.4063 22.3821 12.43 22.3685 12.4603 22.351C12.5207 22.316 12.607 22.265 12.7155 22.1982C12.9325 22.0646 13.2388 21.8676 13.6046 21.6091C14.3351 21.0931 15.3097 20.3274 16.2865 19.3273C18.2307 17.3368 20.25 14.3462 20.25 10.5C20.25 5.94365 16.5563 2.25 12 2.25C7.44365 2.25 3.75 5.94365 3.75 10.5C3.75 14.3462 5.76932 17.3368 7.71346 19.3273C8.69025 20.3274 9.66491 21.0931 10.3954 21.6091C10.7612 21.8676 11.0675 22.0646 11.2845 22.1982C11.393 22.265 11.4793 22.316 11.5397 22.351ZM12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
          fill="#DABDFF"
        />
      </svg> */}
      </div>
    </div>
  );
};

export default Modal;
