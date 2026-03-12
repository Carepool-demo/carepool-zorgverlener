import { useState } from 'react'
import { BackArrowIcon } from '@shared/components/Icons'
import './MijnTalen.css'

/* ---- Small icons ---- */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25C14.2279 17.25 17.25 14.2279 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75ZM2.25 10.5C2.25 5.94365 5.94365 2.25 10.5 2.25C15.0563 2.25 18.75 5.94365 18.75 10.5C18.75 12.5078 18.032 14.3491 16.8399 15.7793L21.5303 20.4697C21.8232 20.7626 21.8232 21.2374 21.5303 21.5303C21.2374 21.8232 20.7626 21.8232 20.4697 21.5303L15.7793 16.8399C14.3491 18.032 12.5078 18.75 10.5 18.75C5.94365 18.75 2.25 15.0563 2.25 10.5Z" fill="currentColor"/>
    </svg>
  )
}

function CloseSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="currentColor"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H12.75V19.5C12.75 19.9142 12.4142 20.25 12 20.25C11.5858 20.25 11.25 19.9142 11.25 19.5V12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Mijn Talen page ---- */
function MijnTalen({ onBack, talen, onTalenChange }) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedTalen = talen.filter(t => t.enabled)
  const popularTalen = talen.filter(t => t.popular)

  const handleToggle = (id) => {
    onTalenChange(talen.map(t =>
      t.id === id
        ? { ...t, enabled: !t.enabled, level: !t.enabled ? 'vloeiend' : null }
        : t
    ))
  }

  const handleLevelChange = (id, level) => {
    onTalenChange(talen.map(t =>
      t.id === id ? { ...t, level } : t
    ))
  }

  const handleRemoveChip = (id) => {
    onTalenChange(talen.map(t =>
      t.id === id ? { ...t, enabled: false, level: null } : t
    ))
  }

  /* ---- Search sub-view ---- */
  if (showSearch) {
    const nonPopularTalen = talen.filter(t => !t.popular)
    const isSearching = searchQuery.trim().length > 0

    // When searching: flat list of all matches. When browsing: two sections.
    const allTalen = [...popularTalen, ...nonPopularTalen]
    const filteredAll = isSearching
      ? allTalen.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : null
    const filteredPopular = isSearching ? null : popularTalen
    const filteredOther = isSearching ? null : nonPopularTalen

    const renderToggleRow = (taal) => (
      <div key={taal.id} className="mjt__toggle-group">
        <label className="mjt__toggle-row">
          <div
            className={`mjt__toggle ${taal.enabled ? 'mjt__toggle--on' : ''}`}
            onClick={() => handleToggle(taal.id)}
          >
            <div className="mjt__toggle-knob" />
          </div>
          <span className={`mjt__toggle-label ${taal.enabled ? 'mjt__toggle-label--on' : ''}`}>
            {taal.label}
          </span>
        </label>
        {taal.enabled && (
          <div className="mjt__level-picker">
            <button
              className={`mjt__level-btn ${taal.level === 'vloeiend' ? 'mjt__level-btn--active' : ''}`}
              onClick={() => handleLevelChange(taal.id, 'vloeiend')}
            >
              Vloeiend
            </button>
            <button
              className={`mjt__level-btn ${taal.level === 'basis' ? 'mjt__level-btn--active' : ''}`}
              onClick={() => handleLevelChange(taal.id, 'basis')}
            >
              Basis
            </button>
          </div>
        )}
      </div>
    )

    return (
      <div className="mjt">
        <header className="mjt__header">
          <button className="mjt__back-btn" onClick={() => { setShowSearch(false); setSearchQuery('') }} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <h1 className="mjt__title">Taal toevoegen</h1>
        </header>

        <div className="mjt__search-bar">
          <SearchIcon />
          <input
            className="mjt__search-input"
            type="text"
            placeholder="Zoek een taal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mjt__search-list">
          {isSearching ? (
            /* Flat search results */
            filteredAll.length === 0 ? (
              <p className="mjt__empty">Geen talen gevonden</p>
            ) : (
              <div className="mjt__card">
                {filteredAll.map(renderToggleRow)}
              </div>
            )
          ) : (
            /* Browse mode: two sections */
            <>
              <div className="mjt__card">
                <h3 className="mjt__card-title">Veelgekozen</h3>
                {filteredPopular.map(renderToggleRow)}
              </div>
              <div className="mjt__card mjt__card--other">
                <h3 className="mjt__card-title">Overige talen</h3>
                {filteredOther.map(renderToggleRow)}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  /* ---- Main view ---- */
  return (
    <div className="mjt">
      <header className="mjt__header">
        <button className="mjt__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="mjt__title">Mijn talen</h1>
      </header>

      <p className="mjt__intro">
        Selecteer de talen die je spreekt.
      </p>

      {/* Selected chips — Vloeiend */}
      {selectedTalen.filter(t => t.level === 'vloeiend').length > 0 && (
        <div className="mjt__chips-area">
          <h3 className="mjt__chips-title">Vloeiend</h3>
          <div className="mjt__chips">
            {selectedTalen.filter(t => t.level === 'vloeiend').map(taal => (
              <button key={taal.id} className="mjt__chip" onClick={() => handleRemoveChip(taal.id)}>
                <span>{taal.label}</span>
                <CloseSmallIcon />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected chips — Basis */}
      {selectedTalen.filter(t => t.level === 'basis').length > 0 && (
        <div className="mjt__chips-area">
          <h3 className="mjt__chips-title">Basis</h3>
          <div className="mjt__chips">
            {selectedTalen.filter(t => t.level === 'basis').map(taal => (
              <button key={taal.id} className="mjt__chip" onClick={() => handleRemoveChip(taal.id)}>
                <span>{taal.label}</span>
                <CloseSmallIcon />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add language button */}
      <div className="mjt__add-area">
        <button className="mjt__add-btn" onClick={() => setShowSearch(true)}>
          <PlusIcon />
          <span>Taal toevoegen</span>
        </button>
      </div>
    </div>
  )
}

export default MijnTalen
