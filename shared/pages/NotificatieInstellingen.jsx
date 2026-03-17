import { useState } from 'react'
import { BackArrowIcon } from '../components/Icons'
import './NotificatieInstellingen.css'

const INITIAL_SETTINGS = [
  { id: 'persoonlijk', label: 'Nieuw persoonlijk bericht', enabled: true },
  { id: 'team', label: 'Nieuw teambericht', enabled: true },
]

function NotificatieInstellingen({ onBack }) {
  const [settings, setSettings] = useState(INITIAL_SETTINGS)

  const handleToggle = (id) => {
    setSettings(prev => prev.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
  }

  return (
    <div className="ni">
      {/* Header */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Notificaties</h1>
      </header>

      {/* Content */}
      <div className="ni__content">
        <h3 className="ni__section-title">Notificaties</h3>

        <div className="ni__switches">
          {settings.map((item) => (
            <div key={item.id} className="ni__switch-card">
              <span className="ni__switch-label">{item.label}</span>
              <button
                className={`ni__toggle ${item.enabled ? 'ni__toggle--on' : ''}`}
                onClick={() => handleToggle(item.id)}
                role="switch"
                aria-checked={item.enabled}
                aria-label={item.label}
              >
                <div className="ni__toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificatieInstellingen
