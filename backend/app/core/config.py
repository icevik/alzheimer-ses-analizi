from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://voiceanalyzer:voiceanalyzer_pass@postgres:5432/voiceanalyzer_db")
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    upload_dir: str = "uploads"
    max_file_size: int = 25 * 1024 * 1024  # 25MB
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()

