const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { port, clientUrl, corsOrigins } = require("./config/env");
const healthRoute = require("./routes/health");
const driversRoute = require("./routes/drivers");
const { setupDriverSocket } = require("./sockets/driverSocket");

const app = express();

const allowedOrigins = corsOrigins.length ? corsOrigins : [clientUrl];

const corsConfig = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api", healthRoute);
app.use("/api", driversRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

setupDriverSocket(io);

server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(", ")}`);
});
