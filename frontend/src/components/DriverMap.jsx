import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "72vh",
  borderRadius: "12px"
};

const DriverMap = ({ center, drivers, trackedDriverId }) => {
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
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      {drivers.map((driver) => (
        <MarkerF
          key={driver.driverId}
          position={{ lat: driver.lat, lng: driver.lng }}
          title={driver.driverId}
          icon={
            driver.driverId === trackedDriverId
              ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              : undefined
          }
          label={driver.driverId === trackedDriverId ? "You" : undefined}
        />
      ))}
    </GoogleMap>
  );
};

export default DriverMap;
