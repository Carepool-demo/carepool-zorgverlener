import { useState } from 'react'
import { BackArrowIcon, PlusIcon, ChevronRightIcon, CloseSmallIcon, CheckIcon, InfoIcon, ChevronDownIcon } from '@shared/components/Icons'
import './RegistratiesBewerken.css'

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

/* ---- Predefined organisations ---- */
const ORGANISATIE_OPTIONS = [
  'ActiZ', 'BOink', 'BPSW', 'BVKZ', 'BVOP',
  'Federatie Landbouw en Zorg', 'LVT',
  'NBEC', 'NBPO', 'Nevep', 'NFG', 'NVA',
  'OSB', 'SoloPartners',
  'V&VN', 'VGN', 'VGOB', 'VHG', 'VVvE',
  'Zorgthuisnl',
]

/* ---- Add modal for aangesloten bij ---- */
function AddModal({ onSave, onCancel, alreadySelected }) {
  const available = ORGANISATIE_OPTIONS.filter(o => !alreadySelected.includes(o))

  return (
    <div className="reg-edit__modal-overlay" onClick={onCancel}>
      <div className="reg-edit__modal reg-edit__modal--list" onClick={e => e.stopPropagation()}>
        <h2 className="reg-edit__modal-title">Organisatie toevoegen</h2>
        <div className="reg-edit__org-list-wrap">
          <div className="reg-edit__org-list">
            {available.map(org => (
              <button
                key={org}
                className="reg-edit__org-item"
                onClick={() => onSave(org)}
              >
                {org}
              </button>
            ))}
          </div>
          <div className="reg-edit__org-list-fade" />
        </div>
        <div className="reg-edit__modal-actions">
          <button className="reg-edit__btn reg-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
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
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Registraties</h1>
      </header>

      <div className="reg-edit__body">
        <p className="reg-edit__intro">
          Op basis van je type zorgverlener (in te stellen bij Tarieven) laten we zien welke registraties voor jou relevant zijn.
        </p>

        {/* Info card per geselecteerd type */}
        {selectedTypeInfos.length > 0 && (
          <div className="reg-edit__type-info">
            <InfoIcon />
            <div className="reg-edit__type-info-text">
              {selectedTypeInfos.map(t => (
                <p key={t.key}><strong>{t.label}:</strong> {t.info}</p>
              ))}
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
          alreadySelected={reg.aangeslotenBij || []}
        />
      )}
    </div>
  )
}
