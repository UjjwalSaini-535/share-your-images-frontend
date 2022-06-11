import React, { useRef, useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidWpqd2FsLXNhaW5pIiwiYSI6ImNsM2xpZ2g5dTB0cDIzZm83ZDJvNDZuMXIifQ.PxI3mezdBVohXOfSVEuK-A";

const Map = (props) => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);

  const { center, zoom } = props;

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current);
  }, [center, zoom]);

  return (
    <div className="map">
      <div className="sidebar">
        Longitude: {center.lng} | Latitude: {center.lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className={`map ${props.className}`}
        style={props.style}
      ></div>
    </div>
  );
};

export default Map;
