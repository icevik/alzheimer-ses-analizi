import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStatistics, Statistics } from '../api/reports'
import HistoryModal from '../components/HistoryModal'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const data = await getStatistics()
      setStats(data)
    } catch (error) {
      console.error('Istatistikler yuklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <span>Veriler yukleniyor...</span>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="dashboard-error">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
        <span>Veri yuklenemedi. Lutfen tekrar deneyin.</span>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Hos Geldiniz</h1>
        <p className="dashboard-subtitle">Ses analizi platformunuzun genel gorunumu</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <p className="stat-label">Toplam Katilimci</p>
          <p className="stat-value">{stats.total_participants}</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
          </div>
          <p className="stat-label">Toplam Analiz</p>
          <p className="stat-value">{stats.total_analyses}</p>
        </div>
      </div>

      <div className="group-stats">
        <div className="section-header">
          <div>
            <h2 className="section-title">Grup Istatistikleri</h2>
            <p className="section-subtitle">Katilimci gruplari ve MMSE skorlari</p>
          </div>
        </div>
        
        <div className="group-cards">
          <div className="group-card">
            <div className="group-card-header">
              <span className="group-indicator alzheimer"></span>
              <h3 className="group-name">Alzheimer</h3>
            </div>
            <div className="group-stats-content">
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                  Katilimci Sayisi
                </span>
                <span className="group-stat-value">{stats.group_counts.alzheimer}</span>
              </div>
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  Ortalama MMSE
                </span>
                <span className={`group-stat-value ${!stats.average_mmse_scores.alzheimer ? 'na' : ''}`}>
                  {stats.average_mmse_scores.alzheimer?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="group-card">
            <div className="group-card-header">
              <span className="group-indicator mci"></span>
              <h3 className="group-name">MCI</h3>
            </div>
            <div className="group-stats-content">
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                  Katilimci Sayisi
                </span>
                <span className="group-stat-value">{stats.group_counts.mci}</span>
              </div>
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  Ortalama MMSE
                </span>
                <span className={`group-stat-value ${!stats.average_mmse_scores.mci ? 'na' : ''}`}>
                  {stats.average_mmse_scores.mci?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="group-card">
            <div className="group-card-header">
              <span className="group-indicator control"></span>
              <h3 className="group-name">Kontrol</h3>
            </div>
            <div className="group-stats-content">
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                  Katilimci Sayisi
                </span>
                <span className="group-stat-value">{stats.group_counts.control}</span>
              </div>
              <div className="group-stat-item">
                <span className="group-stat-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  Ortalama MMSE
                </span>
                <span className={`group-stat-value ${!stats.average_mmse_scores.control ? 'na' : ''}`}>
                  {stats.average_mmse_scores.control?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/participants/new" className="quick-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" x2="19" y1="8" y2="14"/>
            <line x1="22" x2="16" y1="11" y2="11"/>
          </svg>
          Yeni Katilimci Ekle
        </Link>
        <Link to="/analyze" className="quick-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
          Yeni Ses Analizi
        </Link>
        <button 
          className="quick-action-btn"
          onClick={() => setShowHistory(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
          </svg>
          Gecmis Kayitlar
        </button>
      </div>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onViewDetails={(analysisId) => navigate(`/results/${analysisId}`)}
      />
    </div>
  )
}
