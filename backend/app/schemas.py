from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PatientOut(BaseModel):
    id: str
    name: str
    age: Optional[int] = None
    region: Optional[str] = None

    class Config:
        from_attributes = True


class GameSessionIn(BaseModel):
    id: str
    patient_id: Optional[str] = "p1"  # defaults to the demo patient if not sent
    game_type: str
    score: int
    accuracy: float
    avg_response_time_ms: float
    difficulty_level: int
    timestamp: datetime


class GameSessionOut(BaseModel):
    id: str
    game_type: str
    score: int
    accuracy: float
    avg_response_time_ms: float
    difficulty_level: int
    timestamp: datetime

    class Config:
        from_attributes = True


class ReminderIn(BaseModel):
    id: str
    patient_id: Optional[str] = "p1"
    type: str
    time: str
    status: Optional[str] = "pending"


class ReminderOut(BaseModel):
    id: str
    type: str
    time: str
    status: str

    class Config:
        from_attributes = True
