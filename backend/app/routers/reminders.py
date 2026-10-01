from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api", tags=["reminders"])


@router.post("/reminders", response_model=schemas.ReminderOut)
def create_reminder(reminder: schemas.ReminderIn, db: Session = Depends(get_db)):
    # Auto-create the patient if they don't exist yet
    patient = db.query(models.Patient).filter(
        models.Patient.id == reminder.patient_id
    ).first()
    if not patient:
        db.add(models.Patient(
            id=reminder.patient_id,
            name=reminder.patient_id.capitalize(),
        ))
        db.commit()

    db_reminder = models.Reminder(**reminder.model_dump())
    db.merge(db_reminder)
    db.commit()
    db.refresh(db_reminder)
    return db_reminder


@router.get("/patients/{patient_id}/reminders", response_model=list[schemas.ReminderOut])
def get_reminders(patient_id: str, db: Session = Depends(get_db)):
    """Called by the React dashboard's fetchReminders()."""
    return (
        db.query(models.Reminder)
        .filter(models.Reminder.patient_id == patient_id)
        .all()
    )
