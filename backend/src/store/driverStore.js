const drivers = new Map();

const upsertDriverLocation = (driverId, location) => {
  drivers.set(driverId, {
    driverId,
    lat: location.lat,
    lng: location.lng,
    updatedAt: new Date().toISOString()
  });

  return drivers.get(driverId);
};

const getDriver = (driverId) => drivers.get(driverId);

const getAllDrivers = () => Array.from(drivers.values());

module.exports = {
  upsertDriverLocation,
  getDriver,
  getAllDrivers
};
