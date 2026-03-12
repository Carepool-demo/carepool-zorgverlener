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

function CheckSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5179 5.95748C19.8175 6.24349 19.8285 6.71823 19.5425 7.01786L9.04252 18.0179C8.90308 18.1639 8.71064 18.2476 8.50872 18.25C8.3068 18.2523 8.11246 18.1731 7.96967 18.0303L4.46967 14.5303C4.17678 14.2374 4.17678 13.7626 4.46967 13.4697C4.76256 13.1768 5.23744 13.1768 5.53033 13.4697L8.48752 16.4269L18.4575 5.98214C18.7435 5.68252 19.2182 5.67148 19.5179 5.95748Z" fill="currentColor"/>
    </svg>
  )
}

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
  const [editModal, setEditModal] = useState(null) // { key, label, value, placeholder }
  const [showAddModal, setShowAddModal] = useState(false)

  const reg = registraties || {}

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
    // Also update the array format for the read-only view
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
          Vul je professionele registraties aan zodat zorgvragers kunnen zien dat je gekwalificeerd bent.
        </p>

        {/* Professionele gegevens */}
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
