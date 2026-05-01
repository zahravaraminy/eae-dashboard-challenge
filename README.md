# EAE Full-Stack Vehicle Dashboard Challenge

This project recreates a vehicle dashboard interface with a React frontend, Node/Express backend, and MongoDB database.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: MongoDB
- Real-time behavior: simple polling every 1 second from the frontend
- Backend simulation: updates RPM, power, battery, temperature, and indicators periodically

## Features

- Dashboard values are fetched from backend/database
- Motor RPM and power update dynamically
- Battery level changes over time
- Battery low indicator reacts to battery percentage
- Motor status indicator reacts to high RPM
- Slider updates motor speed setting in backend
- Charging button toggles charging state in backend
- Frontend polls backend every 1 second

## Project Structure

```text
eae-dashboard-challenge/
  backend/
    src/
      config/
      controllers/
      models/
      routes/
      services/
      server.ts
    .env.example
    package.json
    tsconfig.json

  frontend/
    src/
      components/
      services/
      types/
      App.tsx
      main.tsx
      index.css
    package.json
    vite.config.ts
    tsconfig.json
```

---

# 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/eae_dashboard
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

API health check:

```text
http://localhost:5000/health
```

---

# 2. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 3. API Endpoints

## Get dashboard state

```http
GET /api/dashboard
```

## Update motor speed

```http
PATCH /api/dashboard/speed
Content-Type: application/json

{
  "motorSpeedSetting": 3
}
```

## Toggle charging

```http
PATCH /api/dashboard/charging
Content-Type: application/json

{
  "isCharging": true
}
```

## Generic dashboard update

```http
PATCH /api/dashboard
Content-Type: application/json

{
  "parkingBrake": true,
  "checkEngine": false
}
```

---

# 4. MongoDB

The app automatically creates the first dashboard document when the backend starts or when the dashboard API is first called.

Collection:

```text
dashboardstates
```

