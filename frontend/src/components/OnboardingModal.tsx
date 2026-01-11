import { useState, useEffect } from 'react'
import './OnboardingModal.css'

interface OnboardingModalProps {
    isOpen: boolean
    onClose: () => void
}

const ONBOARDING_STEPS = [
    {
        id: 'welcome',
        title: 'Hoş Geldiniz! 👋',
        icon: '🎯',
        content: (
            <>
                <p className="onboarding-text">
                    <strong>Alzheimer Ses Analizi Platformu</strong>'na hoş geldiniz.
                </p>
                <p className="onboarding-text">
                    Bu sistem, ses kayıtlarını analiz ederek <strong>Alzheimer</strong> ve <strong>MCI (Hafif Bilişsel Bozukluk)</strong>
                    belirtilerini tespit etmenize yardımcı olur.
                </p>
                <div className="onboarding-highlight">
                    <span className="highlight-icon">💡</span>
                    <span>Size adım adım nasıl kullanacağınızı göstereceğiz.</span>
                </div>
            </>
        )
    },
    {
        id: 'workflow',
        title: 'Nasıl Çalışır?',
        icon: '📋',
        content: (
            <>
                <p className="onboarding-text">Sistem 3 basit adımda çalışır:</p>
                <div className="workflow-steps">
                    <div className="workflow-step">
                        <div className="workflow-step-number">1</div>
                        <div className="workflow-step-content">
                            <h4>Katılımcı Ekle</h4>
                            <p>Analiz yapılacak kişinin bilgilerini girin (Ad, yaş, grup vb.)</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="workflow-step-number">2</div>
                        <div className="workflow-step-content">
                            <h4>Ses Kaydı Yükle</h4>
                            <p>Aşağıdaki görevleri içeren bir ses kaydı yükleyin</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="workflow-step-number">3</div>
                        <div className="workflow-step-content">
                            <h4>Sonuçları İncele</h4>
                            <p>AI destekli analiz sonuçlarını ve raporları görüntüleyin</p>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'recording',
        title: 'Ses Kaydı Nasıl Olmalı?',
        icon: '🎤',
        content: (
            <>
                <p className="onboarding-text">
                    Doğru analiz için ses kaydının <strong>aşağıdaki görevleri</strong> içermesi önerilir:
                </p>
                <div className="recording-tasks">
                    <div className="recording-task">
                        <span className="task-icon">👤</span>
                        <div className="task-content">
                            <strong>Kendini Tanıtma</strong>
                            <p>"Adım ..., ... yaşındayım, ... şehrinde yaşıyorum."</p>
                        </div>
                    </div>
                    <div className="recording-task">
                        <span className="task-icon">📅</span>
                        <div className="task-content">
                            <strong>Günleri Geriye Sayma</strong>
                            <p>Pazar'dan Pazartesi'ye: "Pazar, Cumartesi, Cuma, Perşembe, Çarşamba, Salı, Pazartesi"</p>
                        </div>
                    </div>
                    <div className="recording-task">
                        <span className="task-icon">🔢</span>
                        <div className="task-content">
                            <strong>Sayı Sayma (Opsiyonel)</strong>
                            <p>20'den 1'e kadar geriye doğru sayma</p>
                        </div>
                    </div>
                    <div className="recording-task">
                        <span className="task-icon">💬</span>
                        <div className="task-content">
                            <strong>Serbest Konuşma</strong>
                            <p>Dün ne yaptığınızı veya bir anınızı anlatın (30 saniye)</p>
                        </div>
                    </div>
                </div>
                <div className="onboarding-note">
                    <span className="note-icon">📝</span>
                    <span>Tüm bu görevleri <strong>tek bir ses kaydında</strong> toplayabilirsiniz.</span>
                </div>
            </>
        )
    },
    {
        id: 'tips',
        title: 'Kayıt İpuçları',
        icon: '✨',
        content: (
            <>
                <p className="onboarding-text">En iyi sonuçlar için şu önerilere dikkat edin:</p>
                <div className="tips-grid">
                    <div className="tip-item">
                        <div className="tip-icon">🔇</div>
                        <div className="tip-content">
                            <strong>Sessiz Ortam</strong>
                            <p>Arka plan gürültüsünden uzak bir ortamda kayıt yapın</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <div className="tip-icon">🎙️</div>
                        <div className="tip-content">
                            <strong>Mikrofon Mesafesi</strong>
                            <p>Mikrofonu ağzınıza 15-30 cm uzaklıkta tutun</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <div className="tip-icon">🗣️</div>
                        <div className="tip-content">
                            <strong>Net Konuşma</strong>
                            <p>Rahat ve doğal bir şekilde, net konuşun</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <div className="tip-icon">⏱️</div>
                        <div className="tip-content">
                            <strong>Süre</strong>
                            <p>Minimum 30 saniye, ideal 1-3 dakika</p>
                        </div>
                    </div>
                </div>
                <div className="supported-formats">
                    <p><strong>Desteklenen Formatlar:</strong> WAV, MP3, M4A, WEBM</p>
                </div>
            </>
        )
    },
    {
        id: 'ready',
        title: 'Hazırsınız! 🚀',
        icon: '🎉',
        content: (
            <>
                <p className="onboarding-text">
                    Artık sistemi kullanmaya hazırsınız!
                </p>
                <div className="ready-actions">
                    <div className="ready-action">
                        <span className="action-icon">➕</span>
                        <div className="action-content">
                            <strong>İlk Adım:</strong> Sol menüden <em>"Yeni Katılımcı"</em> ekleyin
                        </div>
                    </div>
                    <div className="ready-action">
                        <span className="action-icon">🎤</span>
                        <div className="action-content">
                            <strong>Sonra:</strong> <em>"Ses Analizi"</em> sayfasından kayıt yükleyin
                        </div>
                    </div>
                </div>
                <div className="onboarding-highlight success">
                    <span className="highlight-icon">💡</span>
                    <span>Bu rehbere istediğiniz zaman üst menüden ulaşabilirsiniz.</span>
                </div>
            </>
        )
    }
]

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [dontShowAgain, setDontShowAgain] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0)
        }
    }, [isOpen])

    const handleNext = () => {
        if (currentStep < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem('onboarding_completed', 'true')
        }
        onClose()
    }

    const handleFinish = () => {
        localStorage.setItem('onboarding_completed', 'true')
        onClose()
    }

    if (!isOpen) return null

    const step = ONBOARDING_STEPS[currentStep]
    const isLastStep = currentStep === ONBOARDING_STEPS.length - 1
    const isFirstStep = currentStep === 0

    return (
        <div className="onboarding-overlay" onClick={handleClose}>
            <div className="onboarding-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="onboarding-header">
                    <div className="onboarding-step-indicator">
                        {ONBOARDING_STEPS.map((_, index) => (
                            <div
                                key={index}
                                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                                onClick={() => setCurrentStep(index)}
                            />
                        ))}
                    </div>
                    <button className="onboarding-close" onClick={handleClose} title="Kapat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" x2="6" y1="6" y2="18" />
                            <line x1="6" x2="18" y1="6" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="onboarding-content">
                    <div className="onboarding-icon">{step.icon}</div>
                    <h2 className="onboarding-title">{step.title}</h2>
                    <div className="onboarding-body">{step.content}</div>
                </div>

                {/* Footer */}
                <div className="onboarding-footer">
                    <div className="onboarding-nav">
                        {isFirstStep ? (
                            <label className="dont-show-checkbox">
                                <input
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                />
                                <span>Bir daha gösterme</span>
                            </label>
                        ) : (
                            <button className="onboarding-btn secondary" onClick={handlePrev}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15,18 9,12 15,6" />
                                </svg>
                                Geri
                            </button>
                        )}

                        {isLastStep ? (
                            <button className="onboarding-btn primary" onClick={handleFinish}>
                                🚀 Başlayalım!
                            </button>
                        ) : (
                            <button className="onboarding-btn primary" onClick={handleNext}>
                                Devam Et
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,6 15,12 9,18" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="step-progress-text">
                        Adım {currentStep + 1} / {ONBOARDING_STEPS.length}
                    </div>
                </div>
            </div>
        </div>
    )
}
