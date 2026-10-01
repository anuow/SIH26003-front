from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite: the whole database is just one file (ner_care.db) that
# appears in this folder once the app runs. No install, no server,
# no password — perfect for a prototype/demo. Swapping to Postgres
# later only means changing this one line (see README).
DATABASE_URL = "sqlite:///./ner_care.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # needed for SQLite + FastAPI
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
