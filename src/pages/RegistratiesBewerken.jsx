import { useState } from 'react'
import { BackArrowIcon, PlusIcon, ChevronRightIcon } from '@shared/components/Icons'
import './RegistratiesBewerken.css'

/* ---- Small icons ---- */
function CloseSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5179 5.95748C19.8175 6.24349 19.8285 6.71823 19.5425 7.01786L9.04252 18.0179C8.90308 18.1639 8.71064 18.2476 8.50872 18.25C8.3068 18.2523 8.11246 18.1731 7.96967 18.0303L4.46967 14.5303C4.17678 14.2374 4.17678 13.7626 4.46967 13.4697C4.76256 13.1768 5.23744 13.1768 5.53033 13.4697L8.48752 16.4269L18.4575 5.98214C18.7435 5.68252 19.2182 5.67148 19.5179 5.95748Z" fill="currentColor"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 16V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

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

/* ---- Predefined options ---- */
const PROFESSIONEEL_ITEMS = [
  { key: 'agb', label: 'AGB', placeholder: 'Bijv. 12345678' },
  { key: 'kvk', label: 'KvK', placeholder: 'Bijv. 12345678' },
  { key: 'vog', label: 'VOG', placeholder: 'Bijv. VOG NP' },
  { key: 'skj', label: 'SKJ', placeholder: 'Bijv. 12345678' },
  { key: 'big', label: 'BIG', placeholder: 'Bijv. 12345678' },
]

const BESCHIKT_OVER_OPTIONS = [
  'Privacybeleid (conform AVG)',
  'Veiligheidsprotocol',
  'Calamiteitenprotocol',
]

const VERZEKERING_OPTIONS = [
  'Beroepsaansprakelijkheid',
  'Bedrijfsaansprakelijkheid',
]

/* ---- Section relevance per type ---- */
function getSectionRelevance(types) {
  const hasFormeel = types.includes('formeel')
  const hasInformeel = types.includes('informeel')
  const hasVrijwilliger = types.includes('vrijwilliger')
  const noSelection = types.length === 0

  // If no selection or formeel is selected, everything is relevant
  if (noSelection || hasFormeel) {
    return { professioneel: true, vog: true, beschiktOver: true, verzekeringen: true, aangeslotenBij: true }
  }

  // Informeel and/or vrijwilliger only
  return {
    professioneel: false,  // AGB, KvK, SKJ, BIG not relevant
    vog: true,             // VOG is always optionally relevant
    beschiktOver: false,
    verzekeringen: false,
    aangeslotenBij: true,  // optionally relevant
  }
}

/* ---- Edit modal for professioneel item ---- */
function EditModal({ label, value, placeholder, onSave, onCancel }) {
  const [text, setText] = useState(value || '')

  return (
    <div className="reg-edit__modal-overlay" onClick={onCancel}>
      <div className="reg-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="reg-edit__modal-title">{label} invullen</h2>
        <label className="reg-edit__form-label">{label}-nummer of code</label>
        <input
          className="reg-edit__form-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          autoFocus
        />
        <div className="reg-edit__modal-actions">
          <button className="reg-edit__btn reg-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button className="reg-edit__btn reg-edit__btn--primary" onClick={() => onSave(text)}>Opslaan</button>
        </div>
      </div>
    </div>
  )
}

/* ---- Add modal for aangesloten bij ---- */
function AddModal({ onSave, onCancel }) {
  const [text, setText] = useState('')

  return (
    <div className="reg-edit__modal-overlay" onClick={onCancel}>
      <div className="reg-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="reg-edit__modal-title">Organisatie toevoegen</h2>
        <label className="reg-edit__form-label">Naam organisatie</label>
        <input
          className="reg-edit__form-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Bijv. V&VN, Klachtenregeling"
          autoFocus
        />
        <div className="reg-edit__modal-actions">
          <button className="reg-edit__btn reg-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button
            className="reg-edit__btn reg-edit__btn--primary"
            onClick={() => onSave(text.trim())}
            disabled={!text.trim()}
          >
            Toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Main component ---- */
export default function RegistratiesBewerken({ onBack, registraties, onRegistratiesChange }) {
  const [editModal, setEditModal] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showOptionalSections, setShowOptionalSections] = useState(false)

  const reg = registraties || {}
  const selectedTypes = reg.typeZorgverlener || []
  const relevance = getSectionRelevance(selectedTypes)

  // Toggle type selection
  const toggleType = (typeKey) => {
    const newTypes = selectedTypes.includes(typeKey)
      ? selectedTypes.filter(t => t !== typeKey)
      : [...selectedTypes, typeKey]
    onRegistratiesChange({ ...reg, typeZorgverlener: newTypes })
    // Reset optional sections visibility when changing types
    setShowOptionalSections(false)
  }

  // Get the info texts for selected types
  const selectedTypeInfos = TYPE_ZORGVERLENER.filter(t => selectedTypes.includes(t.key))

  // Helper to convert old array format to key/value map
  const profData = (() => {
    if (reg.professioneel && Array.isArray(reg.professioneel)) {
      const map = {}
      reg.professioneel.forEach(item => {
        const key = item.label.toLowerCase()
        map[key] = item.waarde || ''
      })
      return map
    }
    return reg.professioneelMap || {}
  })()

  const updateProfessioneel = (key, value) => {
    const newMap = { ...profData, [key]: value }
    const newArray = PROFESSIONEEL_ITEMS.map(item => ({
      label: item.label,
      waarde: newMap[item.key] || null,
      link: !!newMap[item.key],
    }))
    onRegistratiesChange({
      ...reg,
      professioneel: newArray,
      professioneelMap: newMap,
    })
  }

  const toggleBeschiktOver = (item) => {
    const current = reg.beschiktOver || []
    const newList = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item]
    onRegistratiesChange({ ...reg, beschiktOver: newList })
  }

  const toggleVerzekering = (item) => {
    const current = reg.verzekeringen || []
    const newList = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item]
    onRegistratiesChange({ ...reg, verzekeringen: newList })
  }

  const addAangeslotenBij = (name) => {
    const current = reg.aangeslotenBij || []
    if (!current.includes(name)) {
      onRegistratiesChange({ ...reg, aangeslotenBij: [...current, name] })
    }
    setShowAddModal(false)
  }

  const removeAangeslotenBij = (idx) => {
    const current = reg.aangeslotenBij || []
    onRegistratiesChange({ ...reg, aangeslotenBij: current.filter((_, i) => i !== idx) })
  }

  // Which professioneel items to show based on relevance
  const profItemsMain = relevance.professioneel
    ? PROFESSIONEEL_ITEMS
    : PROFESSIONEEL_ITEMS.filter(i => i.key === 'vog')

  const profItemsOptional = relevance.professioneel
    ? []
    : PROFESSIONEEL_ITEMS.filter(i => i.key !== 'vog')

  const hasOptionalSections = !relevance.professioneel

  return (
    <div className="reg-edit">
      <header className="reg-edit__header">
        <button className="reg-edit__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="reg-edit__title">Registraties</h1>
      </header>

      <div className="reg-edit__body">
        <p className="reg-edit__intro">
          Geef aan welk type zorgverlener je bent. Op basis daarvan laten we zien welke registraties voor jou relevant zijn.
        </p>

        {/* Type zorgverlener keuze */}
        <h3 className="reg-edit__section-label">Type zorgverlener</h3>
        <div className="reg-edit__type-list">
          {TYPE_ZORGVERLENER.map(type => {
            const active = selectedTypes.includes(type.key)
            return (
              <button
                key={type.key}
                className={`reg-edit__type-card${active ? ' reg-edit__type-card--active' : ''}`}
                onClick={() => toggleType(type.key)}
              >
                <span className={`reg-edit__type-checkbox${active ? ' reg-edit__type-checkbox--active' : ''}`}>
                  {active && <CheckIcon />}
                </span>
                <span className="reg-edit__type-content">
                  <span className="reg-edit__type-label">{type.label}</span>
                  <span className="reg-edit__type-desc">{type.description}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Info card per geselecteerd type */}
        {selectedTypeInfos.length > 0 && (
          <div className="reg-edit__type-info">
            <InfoIcon />
            <div className="reg-edit__type-info-text">
              {selectedTypeInfos.map(t => (
                <p key={t.key}><strong>{t.label}:</strong> {t.info}</p>
              ))}
              <p className="reg-edit__type-info-disclaimer">Let op: exacte eisen kunnen verschillen per gemeente en zorgverzekeraar. Controleer altijd de voorwaarden die voor jouw situatie gelden.</p>
            </div>
          </div>
        )}

        {/* VOG (altijd zichtbaar als er een selectie is) */}
        {!relevance.professioneel && (
          <>
            <h3 className="reg-edit__section-label">Aanbevolen</h3>
            <div className="reg-edit__card">
              {profItemsMain.map(item => (
                <div
                  key={item.key}
                  className="reg-edit__row"
                  onClick={() => setEditModal({
                    key: item.key,
                    label: item.label,
                    value: profData[item.key] || '',
                    placeholder: item.placeholder,
                  })}
                >
                  <span className="reg-edit__row-label">{item.label}</span>
                  {profData[item.key] ? (
                    <span className="reg-edit__row-value">{profData[item.key]}</span>
                  ) : (
                    <span className="reg-edit__row-placeholder">Invullen</span>
                  )}
                  <span className="reg-edit__row-chevron">
                    <ChevronRightIcon />
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Professionele gegevens (volledig als formeel of geen selectie) */}
        {relevance.professioneel && (
          <>
            <h3 className="reg-edit__section-label">Professionele gegevens</h3>
            <div className="reg-edit__card">
              {PROFESSIONEEL_ITEMS.map(item => (
                <div
                  key={item.key}
                  className="reg-edit__row"
                  onClick={() => setEditModal({
                    key: item.key,
                    label: item.label,
                    value: profData[item.key] || '',
                    placeholder: item.placeholder,
                  })}
                >
                  <span className="reg-edit__row-label">{item.label}</span>
                  {profData[item.key] ? (
                    <span className="reg-edit__row-value">{profData[item.key]}</span>
                  ) : (
                    <span className="reg-edit__row-placeholder">Invullen</span>
                  )}
                  <span className="reg-edit__row-chevron">
                    <ChevronRightIcon />
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Beschikt over */}
        {relevance.beschiktOver && (
          <>
            <h3 className="reg-edit__section-label">Beschikt over</h3>
            <div className="reg-edit__card">
              {BESCHIKT_OVER_OPTIONS.map(item => {
                const active = (reg.beschiktOver || []).includes(item)
                return (
                  <div
                    key={item}
                    className="reg-edit__toggle-row"
                    onClick={() => toggleBeschiktOver(item)}
                  >
                    <span className="reg-edit__toggle-label">{item}</span>
                    <span className={`reg-edit__switch${active ? ' reg-edit__switch--active' : ''}`}>
                      <span className="reg-edit__switch-thumb" />
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Aangesloten bij */}
        <h3 className="reg-edit__section-label">Aangesloten bij</h3>
        <div className="reg-edit__card">
          {(reg.aangeslotenBij || []).map((item, idx) => (
            <div key={idx} className="reg-edit__list-row">
              <span className="reg-edit__list-label">{item}</span>
              <button
                className="reg-edit__list-delete"
                onClick={() => removeAangeslotenBij(idx)}
                aria-label={`Verwijder ${item}`}
              >
                <CloseSmallIcon />
              </button>
            </div>
          ))}
          <button className="reg-edit__add-btn" onClick={() => setShowAddModal(true)}>
            <PlusIcon /> Voeg organisatie toe
          </button>
        </div>

        {/* Verzekeringen */}
        {relevance.verzekeringen && (
          <>
            <h3 className="reg-edit__section-label">Verzekeringen</h3>
            <div className="reg-edit__card">
              {VERZEKERING_OPTIONS.map(item => {
                const active = (reg.verzekeringen || []).includes(item)
                return (
                  <div
                    key={item}
                    className="reg-edit__toggle-row"
                    onClick={() => toggleVerzekering(item)}
                  >
                    <span className="reg-edit__toggle-label">{item}</span>
                    <span className={`reg-edit__switch${active ? ' reg-edit__switch--active' : ''}`}>
                      <span className="reg-edit__switch-thumb" />
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Optionele secties (voor informeel/vrijwilliger) */}
        {hasOptionalSections && !showOptionalSections && (
          <button
            className="reg-edit__show-optional"
            onClick={() => setShowOptionalSections(true)}
          >
            <ChevronDownIcon />
            Toon alle optionele velden
          </button>
        )}

        {hasOptionalSections && showOptionalSections && (
          <div className="reg-edit__optional-section">
            <h3 className="reg-edit__section-label">
              Optioneel
              <span className="reg-edit__optional-badge">niet vereist voor jouw type</span>
            </h3>

            {/* Overige professionele gegevens */}
            <div className="reg-edit__card">
              {profItemsOptional.map(item => (
                <div
                  key={item.key}
                  className="reg-edit__row"
                  onClick={() => setEditModal({
                    key: item.key,
                    label: item.label,
                    value: profData[item.key] || '',
                    placeholder: item.placeholder,
                  })}
                >
                  <span className="reg-edit__row-label">{item.label}</span>
                  {profData[item.key] ? (
                    <span className="reg-edit__row-value">{profData[item.key]}</span>
                  ) : (
                    <span className="reg-edit__row-placeholder">Invullen</span>
                  )}
                  <span className="reg-edit__row-chevron">
                    <ChevronRightIcon />
                  </span>
                </div>
              ))}
            </div>

            {/* Beschikt over */}
            <h3 className="reg-edit__section-label">Beschikt over</h3>
            <div className="reg-edit__card">
              {BESCHIKT_OVER_OPTIONS.map(item => {
                const active = (reg.beschiktOver || []).includes(item)
                return (
                  <div
                    key={item}
                    className="reg-edit__toggle-row"
                    onClick={() => toggleBeschiktOver(item)}
                  >
                    <span className="reg-edit__toggle-label">{item}</span>
                    <span className={`reg-edit__switch${active ? ' reg-edit__switch--active' : ''}`}>
                      <span className="reg-edit__switch-thumb" />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Verzekeringen */}
            <h3 className="reg-edit__section-label">Verzekeringen</h3>
            <div className="reg-edit__card">
              {VERZEKERING_OPTIONS.map(item => {
                const active = (reg.verzekeringen || []).includes(item)
                return (
                  <div
                    key={item}
                    className="reg-edit__toggle-row"
                    onClick={() => toggleVerzekering(item)}
                  >
                    <span className="reg-edit__toggle-label">{item}</span>
                    <span className={`reg-edit__switch${active ? ' reg-edit__switch--active' : ''}`}>
                      <span className="reg-edit__switch-thumb" />
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Edit modal for professioneel items */}
      {editModal && (
        <EditModal
          label={editModal.label}
          value={editModal.value}
          placeholder={editModal.placeholder}
          onSave={(val) => {
            updateProfessioneel(editModal.key, val)
            setEditModal(null)
          }}
          onCancel={() => setEditModal(null)}
        />
      )}

      {/* Add modal for aangesloten bij */}
      {showAddModal && (
        <AddModal
          onSave={addAangeslotenBij}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}
