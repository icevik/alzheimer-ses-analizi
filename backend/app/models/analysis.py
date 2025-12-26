from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(Integer, ForeignKey("participants.id"), nullable=False)
    audio_path = Column(String, nullable=False)
    transcript = Column(Text, nullable=True)
    acoustic_features = Column(JSON, nullable=True)
    emotion_analysis = Column(JSON, nullable=True)
    content_analysis = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    participant = relationship("Participant", back_populates="analyses")

