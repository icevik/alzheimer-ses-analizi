from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import participants, analyze, results, reports, auth
from app.core.database import engine, Base
from app.core.config import settings
from app.models import User, EmailVerification, RateLimit, Participant, Analysis

app = FastAPI(
    title="KNOWHY Alzheimer Analiz API",
    description="Ses analizi ile Alzheimer ve MCI tespiti için API (Powered by KNOWHY)",
    version="1.0.0"
)

# Parse CORS origins from settings
if settings.cors_enabled:
    allowed_origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
else:
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(participants.router, prefix="/api/participants", tags=["participants"])
app.include_router(analyze.router, prefix="/api/analyze", tags=["analyze"])
app.include_router(results.router, prefix="/api/results", tags=["results"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])


@app.on_event("startup")
async def startup():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✓ Veritabani tablolari basariyla olusturuldu")
    except Exception as e:
        print(f"✗ Veritabani tablolari olusturulurken hata: {e}")
        import traceback
        traceback.print_exc()
        raise


@app.get("/")
async def root():
    return {"message": "TUBITAK Voice Analyzer API"}


