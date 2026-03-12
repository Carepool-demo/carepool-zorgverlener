import { BackArrowIcon } from '@shared/components/Icons'
import './MijnLocaties.css'

const STRAAL_OPTIES = [5, 10, 15, 20, 25, 30]

function MijnLocaties({ onBack, locaties, onLocatiesChange }) {
  const updateLocatie = (index, field, value) => {
    const updated = locaties.map((loc, i) =>
      i === index ? { ...loc, [field]: value } : loc
    )
    onLocatiesChange(updated)
  }

  const addLocatie = () => {
    if (locaties.length >= 2) return
    onLocatiesChange([
      ...locaties,
      { id: Date.now(), postcode: '', straal: 10 },
    ])
  }

  const removeLocatie = (index) => {
    onLocatiesChange(locaties.filter((_, i) => i !== index))
  }

  return (
    <div className="mloc">
      <header className="mloc__header">
        <button className="mloc__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="mloc__title">Mijn locaties</h1>
      </header>

      <div className="mloc__body">
        <p className="mloc__intro">
          Geef aan waar je beschikbaar bent en hoe ver je bereid bent te reizen.
        </p>

        {locaties.map((loc, index) => (
          <div key={loc.id} className="mloc__card">
            {locaties.length > 1 && (
              <div className="mloc__card-top">
                <button
                  className="mloc__remove-btn"
                  onClick={() => removeLocatie(index)}
                  aria-label="Locatie verwijderen"
                >
                  Verwijderen
                </button>
              </div>
            )}

            <label className="mloc__postcode-label">
              Postcode
              <input
                className="mloc__postcode-input"
                type="text"
                value={loc.postcode || ''}
                onChange={(e) => updateLocatie(index, 'postcode', e.target.value)}
                placeholder="Bijv. 1015 BA"
                maxLength={7}
                inputMode="text"
                autoComplete="postal-code"
              />
            </label>

            <div className="mloc__straal-section">
              <span className="mloc__straal-label">Reisafstand</span>
              <div className="mloc__pill-grid">
                {STRAAL_OPTIES.map((km) => (
                  <button
                    key={km}
                    className={`mloc__pill ${loc.straal === km ? 'mloc__pill--active' : ''}`}
                    onClick={() => updateLocatie(index, 'straal', km)}
                    aria-pressed={loc.straal === km}
                  >
                    {loc.straal === km && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {km} km
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {locaties.length < 2 && (
          <button className="mloc__add-btn" onClick={addLocatie}>
            <PlusIcon />
            Locatie toevoegen
          </button>
        )}
      </div>
    </div>
  )
}

/* ---- Local icons ---- */
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C12.4142 4 12.75 4.33579 12.75 4.75V11.25H19.25C19.6642 11.25 20 11.5858 20 12C20 12.4142 19.6642 12.75 19.25 12.75H12.75V19.25C12.75 19.6642 12.4142 20 12 20C11.5858 20 11.25 19.6642 11.25 19.25V12.75H4.75C4.33579 12.75 4 12.4142 4 12C4 11.5858 4.33579 11.25 4.75 11.25H11.25V4.75C11.25 4.33579 11.5858 4 12 4Z" fill="currentColor" />
    </svg>
  )
}

export default MijnLocaties
