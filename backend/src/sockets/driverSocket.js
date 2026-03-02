const { upsertDriverLocation, getAllDrivers } = require("../store/driverStore");

const DRIVER_LOCATION_UPDATE = "driver:location:update";
const DRIVER_LOCATION_SNAPSHOT = "driver:location:snapshot";

const setupDriverSocket = (io) => {
  io.on("connection", (socket) => {
    socket.emit(DRIVER_LOCATION_SNAPSHOT, getAllDrivers());

    socket.on(DRIVER_LOCATION_UPDATE, (payload) => {
      if (!payload || !payload.driverId || typeof payload.lat !== "number" || typeof payload.lng !== "number") {
        return;
      }

      const updatedDriver = upsertDriverLocation(payload.driverId, {
        lat: payload.lat,
        lng: payload.lng
      });

      io.emit(DRIVER_LOCATION_UPDATE, updatedDriver);
    });
  });
};

module.exports = {
  setupDriverSocket,
  DRIVER_LOCATION_UPDATE,
  DRIVER_LOCATION_SNAPSHOT
};
