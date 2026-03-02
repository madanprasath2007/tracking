import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import DriverMap from "./components/DriverMap";

const DRIVER_LOCATION_UPDATE = "driver:location:update";
const DRIVER_LOCATION_SNAPSHOT = "driver:location:snapshot";

const App = () => {
  const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const driverId = import.meta.env.VITE_DRIVER_ID || "driver-001";

  const initialLocation = useMemo(
    () => ({ lat: 37.7749, lng: -122.4194 }),
    []
  );

  const [location, setLocation] = useState(initialLocation);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  useEffect(() => {
    const socket = io(socketUrl, { transports: ["websocket"] });

    socket.on(DRIVER_LOCATION_SNAPSHOT, (drivers) => {
      const existingDriver = drivers.find((driver) => driver.driverId === driverId);
      if (existingDriver) {
        setLocation({ lat: existingDriver.lat, lng: existingDriver.lng });
        setLastUpdatedAt(existingDriver.updatedAt);
      }
    });

    socket.on(DRIVER_LOCATION_UPDATE, (driver) => {
      if (driver.driverId === driverId) {
        setLocation({ lat: driver.lat, lng: driver.lng });
        setLastUpdatedAt(driver.updatedAt);
      }
    });

    const interval = setInterval(() => {
      setLocation((prev) => {
        const nextLocation = {
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        };

        socket.emit(DRIVER_LOCATION_UPDATE, {
          driverId,
          ...nextLocation
        });

        return nextLocation;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [driverId, socketUrl]);

  return (
    <main className="app">
      <h1>Uber-style Live Driver Tracking</h1>
      <p>
        Driver: <strong>{driverId}</strong>
      </p>
      <p>Last update: {lastUpdatedAt || "Waiting for updates..."}</p>
      <DriverMap location={location} />
    </main>
  );
};

export default App;
