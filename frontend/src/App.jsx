import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import DriverMap from "./components/DriverMap";

const DRIVER_LOCATION_UPDATE = "driver:location:update";
const DRIVER_LOCATION_SNAPSHOT = "driver:location:snapshot";

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };

const App = () => {
  const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const driverId = import.meta.env.VITE_DRIVER_ID || "driver-001";
  const simulationEnabled = import.meta.env.VITE_SIMULATE_DRIVER !== "false";

  const [drivers, setDrivers] = useState([]);

  const myLocation = useMemo(() => {
    const me = drivers.find((driver) => driver.driverId === driverId);
    return me ? { lat: me.lat, lng: me.lng } : DEFAULT_CENTER;
  }, [driverId, drivers]);

  useEffect(() => {
    const socket = io(socketUrl, { transports: ["websocket"] });

    socket.on(DRIVER_LOCATION_SNAPSHOT, (snapshotDrivers) => {
      if (!Array.isArray(snapshotDrivers)) {
        return;
      }
      setDrivers(snapshotDrivers);
    });

    socket.on(DRIVER_LOCATION_UPDATE, (driver) => {
      if (!driver?.driverId) {
        return;
      }

      setDrivers((prev) => {
        const index = prev.findIndex((item) => item.driverId === driver.driverId);
        if (index === -1) {
          return [...prev, driver];
        }
        const next = [...prev];
        next[index] = driver;
        return next;
      });
    });

    if (simulationEnabled) {
      socket.emit(DRIVER_LOCATION_UPDATE, {
        driverId,
        ...DEFAULT_CENTER
      });
    }

    const interval = setInterval(() => {
      if (!simulationEnabled) {
        return;
      }

      setDrivers((prev) => {
        const currentDriver = prev.find((item) => item.driverId === driverId);
        const base = currentDriver || { driverId, ...DEFAULT_CENTER };

        const nextLocation = {
          lat: base.lat + (Math.random() - 0.5) * 0.0018,
          lng: base.lng + (Math.random() - 0.5) * 0.0018
        };

        socket.emit(DRIVER_LOCATION_UPDATE, {
          driverId,
          ...nextLocation
        });

        return prev;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [driverId, simulationEnabled, socketUrl]);

  return (
    <main className="app">
      <header className="app__header">
        <h1>Uber-style Live Driver Tracking</h1>
        <div className="badge-row">
          <span className="badge">Tracking: {driverId}</span>
          <span className="badge">Active drivers: {drivers.length}</span>
        </div>
      </header>
      <DriverMap center={myLocation} drivers={drivers} trackedDriverId={driverId} />
    </main>
  );
};

export default App;
