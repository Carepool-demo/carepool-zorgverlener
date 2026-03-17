import { useState } from 'react'
import { BackArrowIcon, SearchIcon, CloseSmallIcon, PlusIcon } from '@shared/components/Icons'
import './MijnTalen.css'

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
        <header className="sub-header">
          <button className="sub-header__back-btn" onClick={() => { setShowSearch(false); setSearchQuery('') }} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <h1 className="sub-header__title">Taal toevoegen</h1>
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
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn talen</h1>
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
