import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "70vh"
};

const DriverMap = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  });

  if (!apiKey) {
    return <p className="status">Missing VITE_GOOGLE_MAPS_API_KEY in .env.</p>;
  }

  if (loadError) {
    return <p className="status">Failed to load Google Maps.</p>;
  }

  if (!isLoaded) {
    return <p className="status">Loading map...</p>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default DriverMap;
