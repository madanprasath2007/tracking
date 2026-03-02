const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const toOrigins = (raw) =>
  (raw || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const port = Number(process.env.PORT || 4000);

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number.isFinite(port) ? port : 4000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  corsOrigins: toOrigins(process.env.CORS_ORIGINS)
};
