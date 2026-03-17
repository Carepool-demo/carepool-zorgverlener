import { BackArrowIcon, PlusIcon, CheckIcon, DeleteIcon } from '@shared/components/Icons'
import './MijnLocaties.css'

const STRAAL_OPTIES = [5, 10, 15, 25, 40, 60]

function MijnLocaties({ onBack, locaties, onLocatiesChange }) {
  const updateLocatie = (index, field, value) => {
    const updated = locaties.map((loc, i) =>
      i === index ? { ...loc, [field]: value } : loc
    )
    onLocatiesChange(updated)
  }

  const addLocatie = () => {
    if (locaties.length >= 5) return
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
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn locaties</h1>
      </header>

      <div className="mloc__body">
        <p className="mloc__intro">
          Geef aan waar je beschikbaar bent en hoe ver je bereid bent te reizen.
        </p>

        {locaties.map((loc, index) => (
          <div key={loc.id} className="mloc__card">
            {locaties.length > 1 && (
              <button
                className="mloc__remove-btn"
                onClick={() => removeLocatie(index)}
                aria-label="Locatie verwijderen"
              >
                <DeleteIcon size={20} />
              </button>
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
              <span className="mloc__straal-label">Straal</span>
              <div className="mloc__pill-grid">
                {STRAAL_OPTIES.map((km) => (
                  <button
                    key={km}
                    className={`mloc__pill ${loc.straal === km ? 'mloc__pill--active' : ''}`}
                    onClick={() => updateLocatie(index, 'straal', km)}
                    aria-pressed={loc.straal === km}
                  >
                    {loc.straal === km && (
                      <CheckIcon />
                    )}
                    {km === 60 ? '60+ km' : `${km} km`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {locaties.length < 5 && (
          <button className="mloc__add-btn" onClick={addLocatie}>
            <PlusIcon />
            Locatie toevoegen
          </button>
        )}
      </div>
    </div>
  )
}

export default MijnLocaties
