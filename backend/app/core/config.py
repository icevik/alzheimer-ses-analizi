from pydantic_settings import BaseSettings
import os
from urllib.parse import quote_plus


class Settings(BaseSettings):
    # Database settings from env
    postgres_user: str = os.getenv("POSTGRES_USER", "knowhy")
    postgres_password: str = os.getenv("POSTGRES_PASSWORD", "knowhy_pass")
    postgres_db: str = os.getenv("POSTGRES_DB", "knowhy_db")
    postgres_host: str = os.getenv("POSTGRES_HOST", "postgres")
    postgres_port: str = os.getenv("POSTGRES_PORT", "5432")

    @property
    def database_url(self) -> str:
        # Check if explicit URL is set
        url = os.getenv("DATABASE_URL")
        if url:
             return url
        
        # Otherwise construct safely
        password_encoded = quote_plus(self.postgres_password)
        return f"postgresql+asyncpg://{self.postgres_user}:{password_encoded}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    # OpenAI
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    openai_base_url: str | None = os.getenv("OPENAI_BASE_URL") or None
    openai_chat_model: str = os.getenv("OPENAI_CHAT_MODEL", "gpt-4o")
    openai_whisper_model: str = os.getenv("OPENAI_WHISPER_MODEL", "whisper-1")
    openai_timeout_seconds: int = int(os.getenv("OPENAI_TIMEOUT_SECONDS", "900"))

    # OpenRouter (AI Model Provider)
    openrouter_api_key: str = os.getenv("OPENROUTER_API_KEY", "")
    openrouter_model: str = os.getenv("OPENROUTER_MODEL", "google/gemini-2.0-flash-exp:free")
    openrouter_base_url: str = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
    openrouter_timeout_seconds: int = int(os.getenv("OPENROUTER_TIMEOUT_SECONDS", "900"))

    upload_dir: str = "uploads"
    PROJECT_NAME: str = "KNOWHY Alzheimer Analiz"
    reports_dir: str = "reports"
    max_file_size: int = 25 * 1024 * 1024  # 25MB
    
    # JWT Authentication
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "dev-secret-key-change-in-production")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))  # 24 saat
    
    # Email Webhook
    email_webhook_url: str = os.getenv("EMAIL_WEBHOOK_URL", "")
    
    # Rate Limiting
    login_max_attempts: int = int(os.getenv("LOGIN_MAX_ATTEMPTS", "5"))
    login_window_minutes: int = int(os.getenv("LOGIN_WINDOW_MINUTES", "15"))
    email_max_sends: int = int(os.getenv("EMAIL_MAX_SENDS", "3"))
    email_window_minutes: int = int(os.getenv("EMAIL_WINDOW_MINUTES", "60"))
    account_lock_minutes: int = int(os.getenv("ACCOUNT_LOCK_MINUTES", "60"))
    max_failed_attempts_before_lock: int = int(os.getenv("MAX_FAILED_ATTEMPTS_BEFORE_LOCK", "10"))
    
    # Verification Code
    verification_code_expire_minutes: int = int(os.getenv("VERIFICATION_CODE_EXPIRE_MINUTES", "3"))
    
    # CORS
    cors_enabled: bool = os.getenv("CORS_ENABLED", "True").lower() == "true"
    cors_origins: str = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
    )
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()
