# NER Cognitive Care — Backend (FastAPI + SQLite)

This is the missing middle piece: your React dashboard and Flutter app
both talk to this over HTTP, and this is what actually holds the database.
Neither frontend should ever connect to a database directly — that's
what a backend is for.

## Database
Using **SQLite** — the entire database is one file (`ner_care.db`) that
gets created automatically the first time you run the server. No install,
no server process, no password. Good enough for a hackathon/prototype.
(To move to Postgres later, you'd only change the one line in
`app/database.py` — the rest of the code doesn't need to change.)

## Setup

1. Install Python 3.10+ if you don't have it: https://www.python.org/downloads/
   (On Windows, tick "Add python.exe to PATH" during install.)

2. In this folder, create a virtual environment and install dependencies:
   ```
   python -m venv venv
   venv\Scripts\activate        (Windows)
   source venv/bin/activate     (Mac/Linux)

   pip install -r requirements.txt
   ```

3. Run the server:
   ```
   uvicorn app.main:app --reload
   ```
   You should see it start on `http://127.0.0.1:8000`.

4. Open `http://127.0.0.1:8000/docs` in a browser — FastAPI auto-generates
   an interactive page where you can test every endpoint by clicking
   "Try it out", no separate tool needed. Use this to confirm things work
   before wiring up the frontends.

## Endpoints

| Method | Path | Used by |
|---|---|---|
| GET | `/api/patients` | (list all patients) |
| GET | `/api/patients/{id}` | (one patient) |
| POST | `/api/game-sessions` | Flutter app, after each game round |
| GET | `/api/patients/{id}/game-sessions` | React dashboard |
| POST | `/api/reminders` | Flutter app, when a reminder is added |
| GET | `/api/patients/{id}/reminders` | React dashboard |

## Connecting the two frontends

- **React dashboard**: `src/api.js` already points at `http://localhost:8000`.
  Just run this backend and `npm run dev` in the dashboard at the same time —
  it'll pick up real data instead of the seeded demo data automatically.
- **Flutter app**: `lib/services/api_service.dart` points at `http://10.0.2.2:8000`,
  which is the special address an Android emulator uses to reach your
  computer. If you're using a physical phone instead, change this to your
  computer's LAN IP (e.g. `http://192.168.1.42:8000`) and make sure the
  phone is on the same Wi-Fi.

## What's seeded

Two demo patients (`p1` = Ambika Devi, `p2` = Tenzin Norbu) get created
automatically on first run — same ones the dashboard's `demoData.js` uses,
so IDs match up.

## What's not built yet
- Auth (any client can currently read/write any patient's data — fine for
  a demo, not for anything real)
- Data validation beyond basic types (e.g. nothing stops accuracy > 1.0)
- Deployment config — this only runs locally right now. For your demo day,
  either run it live from a laptop on the same network as the judges, or
  deploy it to Render/Railway (free tier) beforehand.
