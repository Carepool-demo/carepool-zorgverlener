import { useState } from 'react'
import { BackArrowIcon } from '@shared/components/Icons'
import './MijnTarieven.css'

/* ---- MijnTarieven page ---- */
function MijnTarieven({ onBack, tarief: initialTarief = 35, onTariefChange, isBespreekbaar, onBespreekbaarChange, voorwaarden, onVoorwaardenChange }) {
  const [tarief, setTarief] = useState(initialTarief)

  const handleTariefChange = (val) => {
    const clamped = Math.max(0, Math.min(999, val))
    setTarief(clamped)
    onTariefChange?.(clamped)
  }

  const handleToggleVoorwaarde = (id) => {
    onVoorwaardenChange?.(voorwaarden.map(v =>
      v.id === id ? { ...v, enabled: !v.enabled } : v
    ))
  }

  return (
    <div className="mt">
      {/* Header */}
      <header className="mt__header">
        <button className="mt__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="mt__title">Mijn tarieven</h1>
      </header>

      <p className="mt__intro">
        Geef aan voor welk uurtarief je beschikbaar bent. Zorgvragers zien dit op je profiel.
      </p>

      <div className="mt__body">
        {/* Tarief input card */}
        <section className="mt__card">
          <h3 className="mt__section-label">Uurtarief (incl. BTW)</h3>

          <div className="mt__tarief-single">
            <div className="mt__tarief-input-wrap mt__tarief-input-wrap--large">
              <span className="mt__tarief-euro">€</span>
              <input
                className="mt__tarief-input"
                type="number"
                min={0}
                max={999}
                value={tarief}
                onChange={(e) => handleTariefChange(Number(e.target.value))}
                aria-label="Uurtarief"
              />
            </div>
            <span className="mt__tarief-unit">per uur</span>
          </div>
        </section>

        {/* Bespreekbaar toggle + voorwaarden */}
        <section className="mt__card">
          <div className="mt__toggle-row">
            <span className="mt__toggle-label">Mijn tarief is bespreekbaar</span>
            <button
              className={`mt__toggle ${isBespreekbaar ? 'mt__toggle--on' : ''}`}
              onClick={() => onBespreekbaarChange?.(!isBespreekbaar)}
              role="switch"
              aria-checked={isBespreekbaar}
              aria-label="Tarief bespreekbaar"
            >
              <span className="mt__toggle-thumb" />
            </button>
          </div>

          {isBespreekbaar && voorwaarden && (
            <div className="mt__voorwaarden">
              <p className="mt__voorwaarden-label">Onder welke voorwaarden?</p>
              <div className="mt__checkbox-list">
                {voorwaarden.map((v) => (
                  <label key={v.id} className="mt__checkbox-row">
                    <button
                      className={`mt__checkbox ${v.enabled ? 'mt__checkbox--checked' : ''}`}
                      onClick={() => handleToggleVoorwaarde(v.id)}
                      role="checkbox"
                      aria-checked={v.enabled}
                    >
                      {v.enabled && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="mt__checkbox-label">{v.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Info text */}
        <p className="mt__hint">
          Dit tarief geldt als richtlijn voor alle zorgcategorieën. Specifieke tarieven per cliënt spreek je af met de zorgvrager nadat je een connectie bent.
        </p>
      </div>
    </div>
  )
}

export default MijnTarieven
