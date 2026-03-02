const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { port, clientUrl } = require("./config/env");
const healthRoute = require("./routes/health");
const { setupDriverSocket } = require("./sockets/driverSocket");

const app = express();

app.use(
  cors({
    origin: clientUrl,
    credentials: true
  })
);
app.use(express.json());

app.use("/api", healthRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"]
  }
});

setupDriverSocket(io);

server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
