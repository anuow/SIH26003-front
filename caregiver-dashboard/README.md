# NER Cognitive Care — Caregiver Dashboard (React)

Reads the same `GameSession` shape the Flutter app posts to the backend
(`{game_type, score, accuracy, avg_response_time_ms, difficulty_level, timestamp}`),
so no data-model translation is needed between the two apps.

## What's working
- Patient selector (2 demo patients seeded)
- Stat cards: recent accuracy, current difficulty, sessions this week, avg response time
- Accuracy-over-time line chart
- Auto-generated alerts (missed reminders, accuracy decline flags)
- Full session log table
- **Falls back to seeded demo data automatically** if the backend isn't deployed or reachable yet — so this is fully demoable standalone before the backend exists

## Setup
```
npm install
npm run dev
```
Runs at `http://localhost:5173`.

Once your FastAPI backend is live, set `BASE_URL` in `src/api.js` to point at it, and add these two endpoints on the backend:
- `GET /api/patients/:id/game-sessions`
- `GET /api/patients/:id/reminders`

Both should return arrays in the same shape used in `src/demoData.js` — match that shape and the dashboard needs zero changes.

## What's not built yet
- Auth / caregiver login (currently no login wall — fine for a demo, not for production)
- Real patient list (currently hardcoded to 2 demo patients in `demoData.js`)
- Editing reminders from the dashboard (currently read-only)

## Design notes
Shares the mobile app's palette (tea-garden green `#2E6F40`, warm off-white background,
amber accent) so the two surfaces read as one product. Headings use Fraunces (serif,
warm), body/data uses Inter — deliberately not a generic SaaS dashboard look.
