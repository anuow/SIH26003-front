from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import asc
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api", tags=["game-sessions"])


@router.post("/game-sessions", response_model=schemas.GameSessionOut)
def create_game_session(session: schemas.GameSessionIn, db: Session = Depends(get_db)):
    # Auto-create the patient if they don't exist yet
    patient = db.query(models.Patient).filter(
        models.Patient.id == session.patient_id
    ).first()
    if not patient:
        db.add(models.Patient(
            id=session.patient_id,
            name=session.patient_id.capitalize(),
        ))
        db.commit()

    db_session = models.GameSession(**session.model_dump())
    db.merge(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.get("/patients/{patient_id}/game-sessions", response_model=list[schemas.GameSessionOut])
def get_game_sessions(patient_id: str, db: Session = Depends(get_db)):
    """Called by the React dashboard's fetchGameSessions()."""
    return (
        db.query(models.GameSession)
        .filter(models.GameSession.patient_id == patient_id)
        .order_by(asc(models.GameSession.timestamp))
        .all()
    )
