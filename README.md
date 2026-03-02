# Uber-style Live Driver Tracking System

A full-stack real-time driver tracking app with:
- **Backend:** Node.js + Express + Socket.io
- **Frontend:** React + Google Maps + socket.io-client
- Real-time location broadcasting
- In-memory driver location store
- Environment variable support
- Deployment configuration for **Render** (backend) and **Vercel** (frontend)

## Folder structure

```bash
.
├── backend
│   ├── render.yaml
│   ├── package.json
│   ├── .env.example
│   └── src
│       ├── config
│       │   └── env.js
│       ├── routes
│       │   └── health.js
│       ├── sockets
│       │   └── driverSocket.js
│       ├── store
│       │   └── driverStore.js
│       └── server.js
├── frontend
│   ├── vercel.json
│   ├── package.json
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── src
│       ├── components
│       │   └── DriverMap.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
└── package.json
```

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set:
- `backend/.env`
  - `PORT` (default `4000`)
  - `CLIENT_URL` (frontend origin)
- `frontend/.env`
  - `VITE_API_URL` (backend URL)
  - `VITE_GOOGLE_MAPS_API_KEY`
  - `VITE_DRIVER_ID`

### 3) Run apps

In separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

Backend health check:

```bash
curl http://localhost:4000/api/health
```

## How it works

1. Frontend connects to backend over Socket.io.
2. Every 3 seconds, frontend simulates driver movement.
3. Frontend emits `driver:location:update` with new coordinates.
4. Backend updates in-memory store and broadcasts to all clients.
5. Map marker updates in real time.

## Deploy

### Backend on Render
- Use `backend/render.yaml` as blueprint.
- Set `CLIENT_URL` to your deployed frontend URL.

### Frontend on Vercel
- Project root: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` and `VITE_GOOGLE_MAPS_API_KEY` in Vercel env settings.

