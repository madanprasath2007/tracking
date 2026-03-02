const express = require("express");
const { getAllDrivers, getDriver } = require("../store/driverStore");

const router = express.Router();

router.get("/drivers", (_req, res) => {
  res.json({ drivers: getAllDrivers() });
});

router.get("/drivers/:driverId", (req, res) => {
  const driver = getDriver(req.params.driverId);

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  return res.json({ driver });
});

module.exports = router;
