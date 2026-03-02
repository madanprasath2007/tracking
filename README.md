# Uber-style Live Driver Tracking System

A full-stack real-time tracking app with:
- **Backend:** Node.js + Express + Socket.io
- **Frontend:** React + Google Maps + socket.io-client
- In-memory location storage
- Real-time broadcasts to all clients
- Env-based configuration
- Deployment configuration for **Render** (backend) and **Vercel** (frontend)

## Production-ready structure

```bash
.
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── render.yaml
│   └── src/
│       ├── config/env.js
│       ├── routes/
│       │   ├── drivers.js
│       │   └── health.js
│       ├── sockets/driverSocket.js
│       ├── store/driverStore.js
│       └── server.js
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
│   └── src/
│       ├── components/DriverMap.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── package.json
└── render.yaml
```

## Environment variables

### Backend (`backend/.env`)
- `NODE_ENV=development`
- `PORT=4000`
- `CLIENT_URL=http://localhost:5173`
- `CORS_ORIGINS=http://localhost:5173` (comma-separated origins)

### Frontend (`frontend/.env`)
- `VITE_API_URL=http://localhost:4000`
- `VITE_GOOGLE_MAPS_API_KEY=<key>`
- `VITE_DRIVER_ID=driver-001`
- `VITE_SIMULATE_DRIVER=true`

## Run locally

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

## Realtime flow
1. Client connects to Socket.io.
2. Backend emits `driver:location:snapshot` with all currently known drivers.
3. Every 3 seconds, frontend simulates movement and emits `driver:location:update`.
4. Backend updates in-memory store and broadcasts updated driver payload to all connected clients.
5. Frontend updates live markers on Google Maps.

## API endpoints
- `GET /api/health`
- `GET /api/drivers`
- `GET /api/drivers/:driverId`

## Deploy on GitHub + hosting

### 1) Push to GitHub
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2) Deploy backend on Render
- Connect GitHub repository in Render.
- Use root `render.yaml` (or `backend/render.yaml`).
- Set `CLIENT_URL` to frontend production URL.
- Set `CORS_ORIGINS` to allowed frontend origins.

### 3) Deploy frontend on Vercel
- Import same GitHub repository into Vercel.
- Set project root to `frontend`.
- Framework preset: Vite.
- Env vars: `VITE_API_URL`, `VITE_GOOGLE_MAPS_API_KEY`, `VITE_DRIVER_ID`, `VITE_SIMULATE_DRIVER`.

