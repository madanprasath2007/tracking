# Uber-style Live Driver Tracking System

A full-stack real-time tracking app with:
- **Backend:** Node.js + Express + Socket.io
- **Frontend:** React + Google Maps + socket.io-client
- In-memory location storage
- Real-time broadcasts to all clients
- Env-based configuration
- Deployment configuration for **Render** (backend) and **Vercel** (frontend)

## Prerequisites
- Node.js **18+**
- npm
- Google Maps API key for frontend map rendering

## Important: run commands from project folder
Your PowerShell error shows you ran commands in `C:\Users\MADAN UDHAYA`, where this project does not exist.

First, clone or open this repo folder, then run commands **inside that folder**:

```powershell
git clone <your-repo-url>
cd <repo-folder>
```

Verify:
```powershell
dir package.json
```

If that file is not listed, you are still in the wrong directory.

## Quick start (Linux/macOS)
```bash
npm run start:local
```

## Quick start (Windows PowerShell)
```powershell
npm run start:local:win
```

## Manual run (all platforms)

### 1) Install dependencies
```bash
npm install
```

### 2) Create env files
**PowerShell:**
```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

**bash:**
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

## Common issues
- **`ENOENT ... package.json`**: You are not in the repo root. `cd` into the folder containing `package.json`.
- **`Cannot find path backend/.env.example`**: Same root-cause; wrong current directory.
- **`npm install` 403 Forbidden**: npm registry/proxy/network policy is blocking downloads.

## Deploy
### Render (backend)
- Connect repo in Render
- Use root `render.yaml` or `backend/render.yaml`
- Set `CLIENT_URL` and `CORS_ORIGINS`

### Vercel (frontend)
- Import repo in Vercel, set root to `frontend`
- Configure env vars: `VITE_API_URL`, `VITE_GOOGLE_MAPS_API_KEY`, `VITE_DRIVER_ID`, `VITE_SIMULATE_DRIVER`
