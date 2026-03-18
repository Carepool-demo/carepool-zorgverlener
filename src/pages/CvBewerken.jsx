import { useState, useEffect } from 'react'
import { BackArrowIcon, PlusIcon, ChevronRightIcon, GraduationIcon, BriefcaseIcon, AwardIcon, ExperienceIcon, CloseSmallIcon, EditPencilIcon, LeerIcon, CheckIcon } from '@shared/components/Icons'
import './CvBewerken.css'

/* ---- Suggested experience tags ---- */
const SUGGESTED_ERVARING = [
  'ADHD', 'Angststoornissen', 'Astma', 'Autisme',
  'Begeleiding', 'Beroerte', 'Blindheid / slechtziendheid',
  'Chronische ziekte', 'COPD',
  'Dagbesteding', 'Dementie', 'Depressie', 'Diabetes',
  'Doofheid / slechthorendheid', 'Down-syndroom',
  'Drugs-, alcohol-, middelenafhankelijkheid', 'Dwarslaesie', 'Dyslexie',
  'Epilepsie',
  'Fibromyalgie',
  'Gedragsproblemen', 'GGZ', 'Gewrichtsklachten',
  'Hartaandoeningen', 'Hartfalen', 'Huidaandoeningen', 'Huishoudelijke hulp',
  'Jeugdzorg',
  'Kanker',
  'Leerproblemen', 'Lichamelijke beperking', 'Longaandoeningen', 'Longemfyseem/COPD',
  'Maag-darmaandoeningen', 'Medicatiebeheer', 'Mobiliteitsproblemen', 'MS (Multiple Sclerose)',
  'NAH (niet-aangeboren hersenletsel)', 'Nek- en rugklachten',
  'Ontwikkelingsachterstand', 'Ouderenzorg', 'Overspanning/burn-out',
  'Palliatieve zorg', 'Parkinson', 'Persoonlijke verzorging', 'Persoonlijkheidsstoornissen',
  'Psychotische stoornissen',
  'Revalidatie',
  'Schizofrenie', 'Sociaal-emotionele problemen', 'Spierziekte',
  'Spraak-taal problemen', 'Stemmingsstoornissen', 'Stofwisselingsziekte', 'Stomazorg',
  'Taaislijmziekte', 'Terminale ziekte',
  'Verstandelijke beperking',
  'Wondzorg',
  'Ziekte van Parkinson',
]

/* ---- Dutch month options ---- */
const MAANDEN = [
  { value: '', label: 'Maand' },
  { value: 'jan', label: 'Jan' },
  { value: 'feb', label: 'Feb' },
  { value: 'mrt', label: 'Mrt' },
  { value: 'apr', label: 'Apr' },
  { value: 'mei', label: 'Mei' },
  { value: 'jun', label: 'Jun' },
  { value: 'jul', label: 'Jul' },
  { value: 'aug', label: 'Aug' },
  { value: 'sep', label: 'Sep' },
  { value: 'okt', label: 'Okt' },
  { value: 'nov', label: 'Nov' },
  { value: 'dec', label: 'Dec' },
]

/* ---- Year options (current year down to 50 years ago) ---- */
const HUIDIG_JAAR = new Date().getFullYear()
const JAREN = [
  { value: '', label: 'Jaar' },
  ...Array.from({ length: 51 }, (_, i) => {
    const y = String(HUIDIG_JAAR - i)
    return { value: y, label: y }
  }),
]

/* ---- Helper: parse "mrt 2021 - Huidig" or "2021 - Huidig" into parts ---- */
function parsePeriode(str) {
  if (!str) return { vanMaand: '', vanJaar: '', totMaand: '', totJaar: '', huidig: false }
  const parts = str.split(/\s*[-–]\s*/)
  const parseHalf = (s) => {
    if (!s) return { maand: '', jaar: '' }
    const trimmed = s.trim()
    // Check for "Huidig"
    if (trimmed.toLowerCase() === 'huidig') return { maand: '', jaar: '', isHuidig: true }
    // Try "mrt 2021" format
    const match = trimmed.match(/^([a-z]{3})\s+(\d{4})$/i)
    if (match) return { maand: match[1].toLowerCase(), jaar: match[2] }
    // Just a year "2021"
    if (/^\d{4}$/.test(trimmed)) return { maand: '', jaar: trimmed }
    return { maand: '', jaar: trimmed }
  }
  const van = parseHalf(parts[0])
  const tot = parseHalf(parts[1])
  return {
    vanMaand: van.maand || '',
    vanJaar: van.jaar || '',
    totMaand: tot.maand || '',
    totJaar: tot.jaar || '',
    huidig: tot.isHuidig || false,
  }
}

/* ---- Modal popup for add/edit entries ---- */
function EntryModal({ entry, fields, onSave, onCancel, title }) {
  // Build initial form state, expanding period fields into month/year/huidig
  const buildInitial = () => {
    const base = entry || fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {})
    const result = {}
    fields.forEach(f => {
      if (f.type === 'period') {
        const parsed = parsePeriode(base[f.key])
        result[f.key + 'VanMaand'] = parsed.vanMaand
        result[f.key + 'VanJaar'] = parsed.vanJaar
        result[f.key + 'TotMaand'] = parsed.totMaand
        result[f.key + 'TotJaar'] = parsed.totJaar
        // Default to huidig=true for new entries when defaultHuidig is set
        result[f.key + 'Huidig'] = entry ? parsed.huidig : (f.defaultHuidig ?? false)
      } else if (f.type === 'checkbox') {
        result[f.key] = entry ? (base[f.key] ?? false) : (f.defaultValue ?? false)
      } else {
        result[f.key] = base[f.key] || ''
      }
    })
    return result
  }
  const [form, setForm] = useState(buildInitial)

  const handleSave = () => {
    const output = {}
    fields.forEach(f => {
      if (f.type === 'checkbox') {
        output[f.key] = form[f.key] ?? false
      } else if (f.type === 'period') {
        const vanM = form[f.key + 'VanMaand'] || ''
        const vanJ = form[f.key + 'VanJaar']?.trim() || ''
        const van = vanM && vanJ ? `${vanM} ${vanJ}` : vanJ
        const huidig = form[f.key + 'Huidig']
        let tot = ''
        if (huidig) {
          tot = 'Huidig'
        } else {
          const totM = form[f.key + 'TotMaand'] || ''
          const totJ = form[f.key + 'TotJaar']?.trim() || ''
          tot = totM && totJ ? `${totM} ${totJ}` : totJ
        }
        output[f.key] = van && tot ? `${van} - ${tot}` : van || tot
      } else {
        output[f.key] = form[f.key]
      }
    })
    onSave(output)
  }

  const hasContent = fields.some(f => {
    if (f.type === 'checkbox') return false
    if (f.type === 'period') return (form[f.key + 'VanJaar'] || '').trim()
    return (form[f.key] || '').trim()
  })

  return (
    <div className="cv-edit__modal-overlay" onClick={onCancel}>
      <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="cv-edit__modal-title">{title}</h2>
        {fields.map(f => {
          if (f.type === 'period') {
            const isHuidig = form[f.key + 'Huidig']
            return (
              <div key={f.key} className="cv-edit__form-field">
                {/* Huidig checkbox (hidden for certificaten) */}
                {f.showHuidig !== false && (
                  <label className="cv-edit__huidig-row">
                    <button
                      type="button"
                      className={`cv-edit__huidig-check${isHuidig ? ' cv-edit__huidig-check--active' : ''}`}
                      onClick={() => setForm({ ...form, [f.key + 'Huidig']: !isHuidig })}
                      role="checkbox"
                      aria-checked={isHuidig}
                    >
                      {isHuidig && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="cv-edit__huidig-label">Huidig</span>
                  </label>
                )}

                <label className="cv-edit__form-label">{f.label}</label>

                {/* Van row */}
                <div className="cv-edit__period-row">
                  <select
                    className="cv-edit__form-select"
                    value={form[f.key + 'VanMaand']}
                    onChange={e => setForm({ ...form, [f.key + 'VanMaand']: e.target.value })}
                  >
                    {MAANDEN.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <select
                    className="cv-edit__form-select"
                    value={form[f.key + 'VanJaar']}
                    onChange={e => setForm({ ...form, [f.key + 'VanJaar']: e.target.value })}
                  >
                    {JAREN.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
                  </select>
                </div>

                {/* Tot row — hidden when huidig */}
                {!isHuidig && (
                  <>
                    <label className="cv-edit__form-label">{f.totLabel || 'Tot'}</label>
                    <div className="cv-edit__period-row">
                      <select
                        className="cv-edit__form-select"
                        value={form[f.key + 'TotMaand']}
                        onChange={e => setForm({ ...form, [f.key + 'TotMaand']: e.target.value })}
                      >
                        {MAANDEN.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                      <select
                        className="cv-edit__form-select"
                        value={form[f.key + 'TotJaar']}
                        onChange={e => setForm({ ...form, [f.key + 'TotJaar']: e.target.value })}
                      >
                        {JAREN.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
                      </select>
                    </div>
                  </>
                )}
              </div>
            )
          }
          if (f.type === 'checkbox') {
            const isChecked = form[f.key]
            return (
              <label key={f.key} className="cv-edit__huidig-row">
                <button
                  type="button"
                  className={`cv-edit__huidig-check${isChecked ? ' cv-edit__huidig-check--active' : ''}`}
                  onClick={() => setForm({ ...form, [f.key]: !isChecked })}
                  role="checkbox"
                  aria-checked={isChecked}
                >
                  {isChecked && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="cv-edit__huidig-label">{f.label}</span>
              </label>
            )
          }
          return (
            <div key={f.key} className="cv-edit__form-field">
              <label className="cv-edit__form-label">{f.label}</label>
              <input
                className="cv-edit__form-input"
                type="text"
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
              />
            </div>
          )
        })}
        <div className="cv-edit__modal-actions">
          <button className="cv-edit__btn cv-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button
            className="cv-edit__btn cv-edit__btn--primary"
            onClick={handleSave}
            disabled={!hasContent}
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Rotating placeholder examples for leerbereidheid ---- */
const LEERBEREIDHEID_VOORBEELDEN = [
  'Bijv. Ik sta open om op eigen kosten trainingen te volgen die nodig zijn voor jouw zorg. Denk aan bijv. tilcursus of medicatiebeheer.',
  'Bijv. Ik wil graag bijleren over jouw specifieke zorgvraag, bijvoorbeeld via online cursussen of workshops.',
  'Bijv. Ik volg regelmatig bijscholingen en sta open voor nieuwe trainingen die aansluiten bij jouw situatie.',
  'Bijv. Ik ben bereid om me te verdiepen in specialistische zorg, zoals wondverzorging of palliatieve begeleiding.',
  'Bijv. Ik leer graag bij en ben altijd op zoek naar manieren om betere zorg te bieden.',
]

/* ---- Leerbereidheid edit popup ---- */
function LeerPopup({ value, onSave, onCancel }) {
  const [text, setText] = useState(value || '')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [fading, setFading] = useState(false)

  // Rotate placeholder with fade: fade out → change text → fade in
  useEffect(() => {
    if (text) return
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPlaceholderIdx(i => (i + 1) % LEERBEREIDHEID_VOORBEELDEN.length)
        setFading(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [text])

  return (
    <div className="cv-edit__modal-overlay" onClick={onCancel}>
      <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="cv-edit__modal-title">Leerbereidheid bewerken</h2>
        <textarea
          className={`cv-edit__textarea${fading ? ' cv-edit__textarea--fading' : ''}`}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={LEERBEREIDHEID_VOORBEELDEN[placeholderIdx]}
          rows={4}
          autoFocus
        />
        <div className="cv-edit__modal-actions">
          <button className="cv-edit__btn cv-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button className="cv-edit__btn cv-edit__btn--primary" onClick={() => onSave(text)}>Opslaan</button>
        </div>
      </div>
    </div>
  )
}

/* ---- Section component for list-based sections ---- */
function ListSection({ icon, title, items, fields, metaKey, onUpdate, addLabel, editTitle, addTitle }) {
  const [modal, setModal] = useState(null) // null | { idx: number | 'new', entry? }
  const [deleteConfirm, setDeleteConfirm] = useState(null) // null | { idx, titel }

  const handleSave = (formData) => {
    if (modal.idx === 'new') {
      onUpdate([...items, formData])
    } else {
      onUpdate(items.map((item, i) => i === modal.idx ? formData : item))
    }
    setModal(null)
  }

  const handleDelete = (idx) => {
    setDeleteConfirm({ idx, titel: items[idx].titel })
  }

  const confirmDelete = () => {
    onUpdate(items.filter((_, i) => i !== deleteConfirm.idx))
    setDeleteConfirm(null)
  }

  return (
    <div className="cv-edit__section">
      <div className="cv-edit__section-header">
        <span className="cv-edit__section-icon">{icon}</span>
        <span className="cv-edit__section-title">{title}</span>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="cv-edit__entry" onClick={() => setModal({ idx, entry: item })}>
          <div className="cv-edit__entry-content">
            <span className="cv-edit__entry-title">{item.titel}</span>
            <span className="cv-edit__entry-meta">
              {item.periode} &middot; {item[metaKey]}
              {item.diplomaBehaald !== undefined && ` · Diploma: ${item.diplomaBehaald ? 'ja' : 'nee'}`}
            </span>
          </div>
          <button
            className="cv-edit__entry-delete"
            onClick={e => { e.stopPropagation(); handleDelete(idx) }}
            aria-label={`Verwijder ${item.titel}`}
          >
            <CloseSmallIcon />
          </button>
        </div>
      ))}

      <button className="cv-edit__add-btn" onClick={() => setModal({ idx: 'new' })}>
        <PlusIcon /> {addLabel || 'Voeg toe'}
      </button>

      {modal && (
        <EntryModal
          entry={modal.entry}
          fields={fields}
          title={modal.idx === 'new' ? (addTitle || 'Toevoegen') : (editTitle || 'Bewerken')}
          onSave={handleSave}
          onCancel={() => setModal(null)}
        />
      )}

      {deleteConfirm && (
        <div className="cv-edit__modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
            <h2 className="cv-edit__modal-title">Verwijderen</h2>
            <p className="cv-edit__modal-desc">Weet je zeker dat je dit item wilt verwijderen? Dit kan niet ongedaan worden gemaakt.</p>
            <div className="cv-edit__modal-actions">
              <button className="cv-edit__btn cv-edit__btn--secondary" onClick={() => setDeleteConfirm(null)}>Annuleren</button>
              <button className="cv-edit__btn cv-edit__btn--primary" onClick={confirmDelete}>Verwijderen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---- Ervaring met full-screen sub-page ---- */
function ErvaringMetPage({ items, onUpdate, onBack }) {
  const toggleTag = (tag) => {
    if (items.includes(tag)) {
      onUpdate(items.filter(t => t !== tag))
    } else {
      onUpdate([...items, tag])
    }
  }

  return (
    <div className="cv-edit cv-edit--ervaring">
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Ervaring met</h1>
      </header>

      <div className="cv-edit__body">
        <p className="cv-edit__intro">
          Selecteer waar je ervaring mee hebt.
        </p>

        <div className="cv-edit__ervaring-grid">
          {SUGGESTED_ERVARING.map(tag => {
            const active = items.includes(tag)
            return (
              <button
                key={tag}
                className={`cv-edit__ervaring-pill${active ? ' cv-edit__ervaring-pill--active' : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
              >
                {active && <CheckIcon />}
                {tag}
              </button>
            )
          })}
          {/* Show custom tags not in the suggested list */}
          {items.filter(t => !SUGGESTED_ERVARING.includes(t)).map(tag => (
            <button
              key={tag}
              className="cv-edit__ervaring-pill cv-edit__ervaring-pill--active"
              onClick={() => toggleTag(tag)}
              aria-pressed={true}
            >
              <CheckIcon />
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ---- Main CvBewerken page ---- */
export default function CvBewerken({ onBack, cv, onCvChange }) {
  const [showErvaringPage, setShowErvaringPage] = useState(false)
  const [showLeerPopup, setShowLeerPopup] = useState(false)

  const updateSection = (key, value) => {
    onCvChange({ ...cv, [key]: value })
  }

  // Sub-page: Ervaring met
  if (showErvaringPage) {
    return (
      <ErvaringMetPage
        items={cv.ervaringMet}
        onUpdate={val => updateSection('ervaringMet', val)}
        onBack={() => setShowErvaringPage(false)}
      />
    )
  }

  return (
    <div className="cv-edit">
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn CV</h1>
      </header>

      <div className="cv-edit__body">
        <p className="cv-edit__intro">
          Vul je CV aan zodat zorgvragers een beter beeld krijgen van jouw ervaring en achtergrond.
        </p>

        <div className="cv-edit__card">
          <ListSection
            icon={<GraduationIcon />}
            title="Opleidingen"
            items={cv.opleidingen}
            fields={[
              { key: 'titel', label: 'Opleiding', placeholder: 'Bijv. Helpende Zorg en Welzijn' },
              { key: 'periode', label: 'Van', type: 'period', defaultHuidig: true },
              { key: 'instituut', label: 'Instituut', placeholder: 'Bijv. ROC Amsterdam' },
              { key: 'diplomaBehaald', label: 'Diploma behaald', type: 'checkbox', defaultValue: false },
            ]}
            metaKey="instituut"
            addLabel="Voeg opleiding toe"
            addTitle="Opleiding toevoegen"
            editTitle="Opleiding bewerken"
            onUpdate={val => updateSection('opleidingen', val)}
          />

          <ListSection
            icon={<BriefcaseIcon />}
            title="Werkervaring"
            items={cv.werkervaring}
            fields={[
              { key: 'titel', label: 'Functie', placeholder: 'Bijv. Zorghulp' },
              { key: 'periode', label: 'Van', type: 'period', defaultHuidig: true },
              { key: 'bedrijf', label: 'Bedrijf', placeholder: 'Bijv. Zelfstandig' },
            ]}
            metaKey="bedrijf"
            addLabel="Voeg werkervaring toe"
            addTitle="Werkervaring toevoegen"
            editTitle="Werkervaring bewerken"
            onUpdate={val => updateSection('werkervaring', val)}
          />

          <ListSection
            icon={<AwardIcon />}
            title="Certificaten"
            items={cv.certificaten}
            fields={[
              { key: 'titel', label: 'Certificaat', placeholder: 'Bijv. EHBO' },
              { key: 'periode', label: 'Geldig vanaf', type: 'period', showHuidig: false, totLabel: 'Tot (optioneel)' },
              { key: 'instituut', label: 'Instituut', placeholder: 'Bijv. Het Oranje Kruis' },
            ]}
            metaKey="instituut"
            addLabel="Voeg certificaat toe"
            addTitle="Certificaat toevoegen"
            editTitle="Certificaat bewerken"
            onUpdate={val => updateSection('certificaten', val)}
          />

          {/* Ervaring met — navigates to sub-page */}
          <div className="cv-edit__section">
            <div className="cv-edit__section-header">
              <span className="cv-edit__section-icon"><ExperienceIcon /></span>
              <span className="cv-edit__section-title">Ervaring met</span>
            </div>

            <div className="cv-edit__tags">
              {[...cv.ervaringMet].sort((a, b) => a.localeCompare(b, 'nl')).map((tag, idx) => (
                <span key={idx} className="cv-edit__tag">{tag}</span>
              ))}
            </div>

            <button className="cv-edit__add-btn" onClick={() => setShowErvaringPage(true)}>
              <EditPencilIcon /> Bewerk ervaring
            </button>
          </div>
        </div>

        {/* Leerbereidheid — read-only with edit button */}
        <div className="cv-edit__card">
          <div className="cv-edit__section cv-edit__section--last">
            <div className="cv-edit__section-header">
              <span className="cv-edit__section-icon"><LeerIcon /></span>
              <span className="cv-edit__section-title">Leerbereidheid</span>
            </div>
            <p className="cv-edit__leerbereidheid-text">
              {cv.leerbereidheid || <span className="cv-edit__placeholder">Nog niet ingevuld</span>}
            </p>
            <div className="cv-edit__divider" />
            <button className="cv-edit__add-btn" onClick={() => setShowLeerPopup(true)}>
              {cv.leerbereidheid ? <><EditPencilIcon /> Bewerk leerbereidheid</> : <><PlusIcon /> Voeg leerbereidheid toe</>}
            </button>
          </div>
        </div>
      </div>

      {showLeerPopup && (
        <LeerPopup
          value={cv.leerbereidheid}
          onSave={text => { updateSection('leerbereidheid', text); setShowLeerPopup(false) }}
          onCancel={() => setShowLeerPopup(false)}
        />
      )}
    </div>
  )
}
