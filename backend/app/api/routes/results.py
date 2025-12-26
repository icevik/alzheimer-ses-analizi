from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.core.database import get_db
from app.models.analysis import Analysis

router = APIRouter()


@router.get("/")
async def get_all_analyses(
    db: AsyncSession = Depends(get_db),
    limit: int = 100,
    offset: int = 0
):
    """Tüm analizleri listele"""
    from sqlalchemy import func
    
    # Toplam sayı
    total_result = await db.execute(select(func.count(Analysis.id)))
    total = total_result.scalar() or 0
    
    # Analizleri getir
    result = await db.execute(
        select(Analysis)
        .order_by(desc(Analysis.created_at))
        .limit(limit)
        .offset(offset)
    )
    analyses = result.scalars().all()
    
    return {
        "total": total,
        "items": [
            {
                "id": a.id,
                "participant_id": a.participant_id,
                "transcript": (a.transcript[:100] + "...") if a.transcript and len(a.transcript) > 100 else (a.transcript or ""),
                "emotion_analysis": a.emotion_analysis,
                "content_analysis": a.content_analysis,
                "created_at": a.created_at.isoformat()
            }
            for a in analyses
        ]
    }


@router.get("/{analysis_id}")
async def get_analysis_result(
    analysis_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Analysis).where(Analysis.id == analysis_id)
    )
    analysis = result.scalar_one_or_none()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return {
        "id": analysis.id,
        "participant_id": analysis.participant_id,
        "transcript": analysis.transcript,
        "acoustic_features": analysis.acoustic_features,
        "emotion_analysis": analysis.emotion_analysis,
        "content_analysis": analysis.content_analysis,
        "created_at": analysis.created_at.isoformat()
    }


@router.get("/participant/{participant_id}")
async def get_participant_analyses(
    participant_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Analysis).where(Analysis.participant_id == participant_id)
    )
    analyses = result.scalars().all()
    
    return [
        {
            "id": a.id,
            "transcript": a.transcript,
            "acoustic_features": a.acoustic_features,
            "emotion_analysis": a.emotion_analysis,
            "content_analysis": a.content_analysis,
            "created_at": a.created_at.isoformat()
        }
        for a in analyses
    ]

