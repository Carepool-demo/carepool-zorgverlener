import { useState } from 'react'
import { BackArrowIcon, CheckIcon, InfoIcon } from '@shared/components/Icons'
import './MijnTarieven.css'

/* ---- Type zorgverlener config ---- */
const TYPE_ZORGVERLENER = [
  {
    key: 'formeel',
    label: 'Formele zorgverlener',
    description: 'Je biedt beroepsmatig zorg, als zzp\'er of in dienst van een zorgorganisatie.',
    info: 'AGB-code, KvK-inschrijving en een VOG zijn meestal vereist. BIG- of SKJ-registratie hangt af van je beroep.',
  },
  {
    key: 'informeel',
    label: 'Informele zorgverlener',
    description: 'Je biedt zorg aan een naaste, bijvoorbeeld als mantelzorger of familielid.',
    info: 'Registraties zijn niet verplicht. Een VOG kan het vertrouwen van zorgvragers vergroten.',
  },
  {
    key: 'vrijwilliger',
    label: 'Vrijwilliger',
    description: 'Je biedt onbetaald zorg als vrijwilliger.',
    info: 'Geen registraties vereist. Je kunt ze optioneel invullen.',
  },
]

/* ---- MijnTarieven page ---- */
function MijnTarieven({ onBack, isBespreekbaar, onBespreekbaarChange, voorwaarden, onVoorwaardenChange, registraties, onRegistratiesChange }) {
  const [tariefMin, setTariefMin] = useState(30)
  const [tariefMax, setTariefMax] = useState(40)

  const reg = registraties || {}
  const selectedTypes = reg.typeZorgverlener || []

  const toggleType = (typeKey) => {
    const newTypes = selectedTypes.includes(typeKey)
      ? selectedTypes.filter(t => t !== typeKey)
      : [...selectedTypes, typeKey]
    onRegistratiesChange?.({ ...reg, typeZorgverlener: newTypes })
  }

  const selectedTypeInfos = TYPE_ZORGVERLENER.filter(t => selectedTypes.includes(t.key))

  const handleMinChange = (val) => {
    const clamped = Math.max(0, Math.min(999, val))
    setTariefMin(clamped)
  }

  const handleMaxChange = (val) => {
    const clamped = Math.max(0, Math.min(999, val))
    setTariefMax(clamped)
  }

  const handleToggleVoorwaarde = (id) => {
    onVoorwaardenChange?.(voorwaarden.map(v =>
      v.id === id ? { ...v, enabled: !v.enabled } : v
    ))
  }

  return (
    <div className="mt">
      {/* Header */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn tarieven</h1>
      </header>

      <div className="mt__body">
        {/* Type zorgverlener */}
        <h3 className="mt__section-label">Type zorgverlener</h3>
        <div className="mt__type-list">
          {TYPE_ZORGVERLENER.map(type => {
            const active = selectedTypes.includes(type.key)
            return (
              <button
                key={type.key}
                className={`mt__type-card${active ? ' mt__type-card--active' : ''}`}
                onClick={() => toggleType(type.key)}
              >
                <span className={`mt__type-checkbox${active ? ' mt__type-checkbox--active' : ''}`}>
                  {active && <CheckIcon />}
                </span>
                <span className="mt__type-content">
                  <span className="mt__type-label">{type.label}</span>
                  <span className="mt__type-desc">{type.description}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Tarief input card */}
        <h3 className="mt__section-label">Uurtarief</h3>
        <p className="mt__hint" style={{ marginTop: 0, marginBottom: 'var(--space-3)' }}>
          Geef aan voor welk uurtarief je beschikbaar bent. Zorgvragers zien dit op je profiel.
        </p>
        <section className="mt__card">
          <div className="mt__tarief-range">
            <div className="mt__tarief-input-wrap mt__tarief-input-wrap--large">
              <span className="mt__tarief-euro">€</span>
              <input
                className="mt__tarief-input"
                type="number"
                min={0}
                max={999}
                value={tariefMin}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                aria-label="Minimum uurtarief"
              />
            </div>
            <span className="mt__tarief-dash">–</span>
            <div className="mt__tarief-input-wrap mt__tarief-input-wrap--large">
              <span className="mt__tarief-euro">€</span>
              <input
                className="mt__tarief-input"
                type="number"
                min={0}
                max={999}
                value={tariefMax}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                aria-label="Maximum uurtarief"
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
