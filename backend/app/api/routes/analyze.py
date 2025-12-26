import os
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.config import settings
from app.models.analysis import Analysis
from app.models.participant import Participant
from app.services.openai_service import openai_service
from app.services.audio_service import audio_service

router = APIRouter()

os.makedirs(settings.upload_dir, exist_ok=True)


@router.post("/")
async def analyze_audio(
    participant_id: int = Form(...),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    # Dosya formatı kontrolü
    if not file.filename.endswith(('.wav', '.mp3', '.m4a', '.webm')):
        raise HTTPException(
            status_code=400, 
            detail="Desteklenmeyen dosya formatı. wav, mp3, m4a veya webm olmalı."
        )
    
    # Dosya boyutu kontrolü
    file_content = await file.read()
    if len(file_content) > settings.max_file_size:
        raise HTTPException(
            status_code=400,
            detail=f"Dosya boyutu {settings.max_file_size / 1024 / 1024}MB'dan büyük olamaz."
        )
    
    # Katılımcı kontrolü
    result = await db.execute(
        select(Participant).where(Participant.id == participant_id)
    )
    participant = result.scalar_one_or_none()
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
    
    # Dosyayı kaydet
    file_ext = os.path.splitext(file.filename)[1]
    file_name = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(settings.upload_dir, file_name)
    
    with open(file_path, "wb") as f:
        f.write(file_content)
    
    try:
        # 1. Akustik özellikleri çıkar
        acoustic_features = audio_service.extract_features(file_path)
        
        # 2. Transkripsiyon
        transcript = await openai_service.transcribe_audio(file_path, language="tr")
        
        # 3. GPT-4 ile analiz
        analysis_result = await openai_service.analyze_content_and_emotion(
            transcript, acoustic_features
        )
        
        # 4. Veritabanına kaydet
        db_analysis = Analysis(
            participant_id=participant_id,
            audio_path=file_path,
            transcript=transcript,
            acoustic_features=acoustic_features,
            emotion_analysis=analysis_result.get("emotion_analysis"),
            content_analysis=analysis_result.get("content_analysis")
        )
        db.add(db_analysis)
        await db.commit()
        await db.refresh(db_analysis)
        
        return {
            "id": db_analysis.id,
            "participant_id": participant_id,
            "transcript": transcript,
            "acoustic_features": acoustic_features,
            "emotion_analysis": analysis_result.get("emotion_analysis"),
            "content_analysis": analysis_result.get("content_analysis"),
            "created_at": db_analysis.created_at.isoformat()
        }
    
    except Exception as e:
        # Hata durumunda dosyayı sil
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Analiz hatası: {str(e)}")

