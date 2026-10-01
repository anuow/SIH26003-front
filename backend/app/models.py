from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from .database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    region = Column(String)

    sessions = relationship("GameSession", back_populates="patient")
    reminders = relationship("Reminder", back_populates="patient")


class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    game_type = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    accuracy = Column(Float, nullable=False)
    avg_response_time_ms = Column(Float, nullable=False)
    difficulty_level = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="sessions")


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    type = Column(String, nullable=False)  # medicine / hydration / activity / appointment
    time = Column(String, nullable=False)
    status = Column(String, default="pending")  # pending / completed / missed

    patient = relationship("Patient", back_populates="reminders")
