import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const HeatLayer = ({ map, heatData }) => {
  useEffect(() => {
    console.log(map);

    if (!map) return; // If map is not initialized, do nothing

    map.on("load", () => {
      console.log("plotting heatmap");
      if (!map.getSource("points")) {
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: heatData.map((point) => ({
              type: "Feature",
              properties: {
                score: point.score,
              },
              geometry: {
                type: "Point",
                coordinates: [point.lon, point.lat],
              },
            })),
          },
        });
      }
      if (!map.getLayer("points-layer")) {
        map.addLayer({
          id: "points-layer",
          type: "circle",
          source: "points",
          paint: {
            "circle-radius": 30,
            "circle-color": [
              "match",
              ["get", "score"],
              1,
              "#edb081",
              2,
              "#de5d5c",
              3,
              "#c24167",
              4,
              "#8d3271",
              5,
              "#582766",
              /* default */ "#ccc",
            ],
            "circle-opacity": 0.35,
          },
        });
      }
    });

    return () => {
      console.log("done with layer");
    };
  }, [map, heatData]);

  return null;
};

export default HeatLayer;
