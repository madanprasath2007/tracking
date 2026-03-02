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
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── src/
├── scripts/
│   └── start-local.sh
├── package.json
└── render.yaml
```

## Prerequisites
- Node.js **18+**
- npm
- Google Maps API key for frontend map rendering

## Quick start (recommended)

```bash
npm run start:local
```

This command runs `scripts/start-local.sh`, which:
1. Validates Node.js version
2. Creates `backend/.env` and `frontend/.env` from examples (if missing)
3. Installs dependencies
4. Starts backend and frontend dev servers together

## Manual run

### 1) Install dependencies
```bash
npm install
```

### 2) Configure env files
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3) Set env values
Backend (`backend/.env`):
- `NODE_ENV=development`
- `PORT=4000`
- `CLIENT_URL=http://localhost:5173`
- `CORS_ORIGINS=http://localhost:5173`

Frontend (`frontend/.env`):
- `VITE_API_URL=http://localhost:4000`
- `VITE_GOOGLE_MAPS_API_KEY=<your_key>`
- `VITE_DRIVER_ID=driver-001`
- `VITE_SIMULATE_DRIVER=true`

### 4) Start services (two terminals)
Terminal A:
```bash
npm run dev:backend
```

Terminal B:
```bash
npm run dev:frontend
```

## Verify backend is running
```bash
curl http://localhost:4000/api/health
```

## API endpoints
- `GET /api/health`
- `GET /api/drivers`
- `GET /api/drivers/:driverId`

## Common run issue
If `npm install` fails with `403 Forbidden` to npm registry, your network/proxy/security policy is blocking package downloads. Fix npm registry/proxy access, then rerun installation.

## Deploy
### Render (backend)
- Connect repo in Render
- Use root `render.yaml` or `backend/render.yaml`
- Set `CLIENT_URL` and `CORS_ORIGINS`

### Vercel (frontend)
- Import repo in Vercel, set root to `frontend`
- Configure env vars: `VITE_API_URL`, `VITE_GOOGLE_MAPS_API_KEY`, `VITE_DRIVER_ID`, `VITE_SIMULATE_DRIVER`
