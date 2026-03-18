import { BackArrowIcon, CheckIcon, InfoIcon } from '@shared/components/Icons'
import './MijnTarieven.css'

/* ---- Type zorgverlener config ---- */
const TYPE_ZORGVERLENER = [
  {
    key: 'formeel',
    label: 'Formele zorgverlener',
    description: 'Je werkt beroepsmatig in de pgb-zorg (bijv. ZZP\'er met BIG-registratie).',
    info: 'AGB-code, KvK-inschrijving en een VOG zijn meestal vereist. BIG- of SKJ-registratie hangt af van je beroep.',
    tariefHint: 'Gebruikelijk tarief: €50\u2009–\u2009€80 per uur. Het maximale tarief verschilt per wet en per gemeente.',
    tariefRange: { min: 0, gebruikelijkMin: 50, gebruikelijkMax: 80, warningMax: 100, scaleMax: 120 },
  },
  {
    key: 'informeel',
    label: 'Informele zorgverlener',
    description: 'Je verleent betaalde zorg of ondersteuning zonder zorgdiploma, bijv. als mantelzorger, student of naast je werk.',
    info: 'Registraties zijn niet verplicht. Een VOG kan het vertrouwen van zorgvragers vergroten.',
    tariefHint: 'Gebruikelijk tarief: €20\u2009–\u2009€26 per uur. Het maximale tarief verschilt per wet en per gemeente.',
    tariefRange: { min: 0, gebruikelijkMin: 20, gebruikelijkMax: 26, warningMax: 35, scaleMax: 50 },
  },
  {
    key: 'vrijwilliger',
    label: 'Vrijwilliger',
    description: 'Je biedt onbetaalde hulp.',
    info: 'Geen registraties vereist. Je kunt ze optioneel invullen.',
    tariefHint: null,
    tariefRange: null,
  },
]

/* ---- MijnTarieven page ---- */
function MijnTarieven({ onBack, isBespreekbaar, onBespreekbaarChange, voorwaarden, onVoorwaardenChange, registraties, onRegistratiesChange, tariefMin, tariefMax, onTariefMinChange, onTariefMaxChange }) {

  const reg = registraties || {}
  const selectedTypes = reg.typeZorgverlener || []

  const toggleType = (typeKey) => {
    const newTypes = selectedTypes.includes(typeKey)
      ? selectedTypes.filter(t => t !== typeKey)
      : [...selectedTypes, typeKey]
    onRegistratiesChange?.({ ...reg, typeZorgverlener: newTypes })
  }

  const selectedTypeInfos = TYPE_ZORGVERLENER.filter(t => selectedTypes.includes(t.key))
  const onlyVrijwilliger = selectedTypes.length === 1 && selectedTypes[0] === 'vrijwilliger'
  const showTarief = selectedTypes.length > 0 && !onlyVrijwilliger

  // Get the active tarief hint and range (use the first non-vrijwilliger type)
  const activeType = selectedTypeInfos.find(t => t.tariefRange) || null
  const activeTariefHint = activeType?.tariefHint || null
  const activeTariefRange = activeType?.tariefRange || null

  // Validation: check if tarief exceeds warning max
  const showWarning = activeTariefRange && tariefMax > activeTariefRange.warningMax

  const handleMinChange = (val) => {
    const clamped = Math.max(0, Math.min(999, val))
    onTariefMinChange(clamped)
  }

  const handleMaxChange = (val) => {
    const clamped = Math.max(0, Math.min(999, val))
    onTariefMaxChange(clamped)
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

        {/* Vrijwilliger-only message */}
        {onlyVrijwilliger && (
          <>
            <h3 className="mt__section-label">Uurtarief</h3>
            <div className="mt__type-info">
              <InfoIcon />
              <div className="mt__type-info-text">
                <p>Als vrijwilliger zijn tarieven niet van toepassing.</p>
              </div>
            </div>
          </>
        )}

        {/* Tarief input card */}
        {showTarief && (
          <>
            <h3 className="mt__section-label">Uurtarief</h3>
            {/* Contextgevoelige tariefhint */}
            {activeTariefHint && (
              <div className="mt__type-info">
                <InfoIcon />
                <div className="mt__type-info-text">
                  <p>{activeTariefHint}</p>
                  <button
                    className="mt__meer-info-link"
                    onClick={() => alert('Meer info over maximale tarieven (nog niet geïmplementeerd)')}
                  >
                    Hoe wordt het maximale tarief bepaald?
                  </button>
                </div>
              </div>
            )}

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

              {/* Visuele tariefbalk */}
              {activeTariefRange && (
                <div className="mt__tarief-bar-wrap">
                  <div className="mt__tarief-bar">
                    <div
                      className="mt__tarief-bar-segment mt__tarief-bar-segment--green"
                      style={{ width: `${((activeTariefRange.gebruikelijkMax - activeTariefRange.min) / activeTariefRange.scaleMax) * 100}%` }}
                    />
                    <div
                      className="mt__tarief-bar-segment mt__tarief-bar-segment--orange"
                      style={{ width: `${((activeTariefRange.warningMax - activeTariefRange.gebruikelijkMax) / activeTariefRange.scaleMax) * 100}%` }}
                    />
                    <div
                      className="mt__tarief-bar-segment mt__tarief-bar-segment--red"
                      style={{ width: `${((activeTariefRange.scaleMax - activeTariefRange.warningMax) / activeTariefRange.scaleMax) * 100}%` }}
                    />
                    {/* Indicator for current max tarief */}
                    <div
                      className="mt__tarief-bar-indicator"
                      style={{ left: `${Math.min(100, (tariefMax / activeTariefRange.scaleMax) * 100)}%` }}
                    />
                  </div>
                  <div className="mt__tarief-bar-labels">
                    <span>€0</span>
                    <span>€{activeTariefRange.gebruikelijkMax}</span>
                    <span>€{activeTariefRange.warningMax}</span>
                    <span>€{activeTariefRange.scaleMax}+</span>
                  </div>
                </div>
              )}

              {/* Waarschuwing bij hoog tarief */}
              {showWarning && (
                <div className="mt__tarief-warning">
                  Let op: dit tarief ligt boven het gebruikelijke maximum voor {activeType.label.toLowerCase()}s. Controleer het maximale tarief bij je gemeente of zorgverzekeraar.
                </div>
              )}
            </section>
          </>
        )}


        {/* Info text */}
        {showTarief && (
          <p className="mt__hint">
            Dit tarief geldt als richtlijn voor alle zorgcategorieën. Specifieke tarieven per cliënt spreek je af met de zorgvrager nadat je een connectie bent.
          </p>
        )}
      </div>
    </div>
  )
}

export default MijnTarieven
