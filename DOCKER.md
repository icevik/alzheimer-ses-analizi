# Docker Kullanım Kılavuzu

## Hızlı Başlangıç

### 1. .env Dosyası Oluştur

Proje kök dizininde `.env` dosyası oluştur:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 2. Docker Compose ile Başlat

**Windows PowerShell:**
```powershell
.\docker-start.ps1
```

**Linux/Mac:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

**Veya manuel:**
```bash
docker-compose up -d
```

### 3. Servislere Eriş

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Dokümantasyonu**: http://localhost:8000/docs

## Docker Komutları

### Servisleri Yönetme

```bash
# Servisleri başlat (arka planda)
docker-compose up -d

# Servisleri başlat (logları göster)
docker-compose up

# Servisleri durdur
docker-compose down

# Servisleri durdur ve volume'leri sil (veritabanı verileri silinir)
docker-compose down -v

# Servisleri yeniden başlat
docker-compose restart

# Container durumunu kontrol et
docker-compose ps
```

### Logları Görüntüleme

```bash
# Tüm servislerin logları
docker-compose logs -f

# Sadece backend logları
docker-compose logs -f backend

# Sadece frontend logları
docker-compose logs -f frontend

# Sadece postgres logları
docker-compose logs -f postgres
```

### Container İçine Girme

```bash
# Backend container'ına gir
docker-compose exec backend bash

# Frontend container'ına gir
docker-compose exec frontend sh

# PostgreSQL container'ına gir
docker-compose exec postgres psql -U voiceanalyzer -d voiceanalyzer_db
```

### Veritabanı Yedekleme ve Geri Yükleme

```bash
# Veritabanını yedekle
docker-compose exec postgres pg_dump -U voiceanalyzer voiceanalyzer_db > backup.sql

# Veritabanını geri yükle
docker-compose exec -T postgres psql -U voiceanalyzer voiceanalyzer_db < backup.sql
```

## Sorun Giderme

### Port Zaten Kullanılıyor

Eğer 3000, 8000 veya 5432 portları kullanılıyorsa, `docker-compose.yml` dosyasındaki port numaralarını değiştirin:

```yaml
ports:
  - "3001:3000"  # Frontend için farklı port
  - "8001:8000"  # Backend için farklı port
```

### Container'lar Başlamıyor

1. Logları kontrol edin:
```bash
docker-compose logs
```

2. Container'ları temizleyin ve yeniden başlatın:
```bash
docker-compose down -v
docker-compose up -d --build
```

### OpenAI API Hatası

`.env` dosyasında API anahtarınızın doğru olduğundan emin olun:
```bash
# Backend container içinde kontrol
docker-compose exec backend env | grep OPENAI
```

### Veritabanı Bağlantı Hatası

PostgreSQL'in hazır olmasını bekleyin:
```bash
# PostgreSQL'in hazır olup olmadığını kontrol et
docker-compose exec postgres pg_isready -U voiceanalyzer
```

## Production Kullanımı

Production için:

1. `docker-compose.yml` dosyasında environment variable'ları düzenleyin
2. Frontend için production build kullanın (Dockerfile'ı güncelleyin)
3. HTTPS için reverse proxy (nginx) ekleyin
4. Veritabanı için persistent volume kullanın

