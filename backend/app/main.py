from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from . import models
from .routers import game_sessions, reminders, patients

# Creates ner_care.db and all tables on first run if they don't exist yet.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NER Cognitive Care API")

# Wide open for local development so the React dashboard (localhost:5173)
# and the Flutter app (emulator/device) can both call this freely.
# TODO: lock this down to specific origins before any real deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(game_sessions.router)
app.include_router(reminders.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "NER Cognitive Care API"}


def seed_demo_patients():
    """
    Seeds the same 2 patients used in the dashboard's demoData.js,
    so the moment this backend is live, the dashboard's real fetch
    calls return matching data instead of 404ing.
    """
    db = SessionLocal()
    try:
        if db.query(models.Patient).count() == 0:
            db.add_all([
                models.Patient(id="p1", name="Ambika Devi", age=74, region="Guwahati, Assam"),
                models.Patient(id="p2", name="Tenzin Norbu", age=79, region="Itanagar, Arunachal Pradesh"),
            ])
            db.commit()
    finally:
        db.close()


seed_demo_patients()
