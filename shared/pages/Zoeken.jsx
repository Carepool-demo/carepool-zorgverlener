import { showToast } from '@shared/components/Toast'
import { useState } from 'react'
import { BackArrowIcon, ChevronDownIcon, LocationOutlineIcon, CertificateIcon, InfoIcon, CalendarSmallIcon, CareHandIcon, FilterIcon, IndividualCareIcon, LocationFilledIcon, RepeatIcon, GroupCareIcon, CancelIcon, EuroIcon, UserIcon, MortarboardIcon, ThumbsUpIcon, AddIcon } from '@shared/components/Icons'
import { zoekenResultaten, zoekenBuitenZoekopdracht, zoekenConfig } from '@app/data/dummyData'
import './Zoeken.css'

/* Zorg category labels */
const zorgLabels = {
  persoonlijkeVerzorging: 'Persoonlijke verzorging',
  verpleging: 'Verpleging',
  huishoudelijkeHulp: 'Huishoudelijke hulp',
  begeleidingIndividueel: 'Begeleiding individueel',
}

function Zoeken({ onBack, onSelectResult }) {
  const [showTopSheet, setShowTopSheet] = useState(zoekenConfig.initialShowTopSheet)
  const [activeBottomSheet, setActiveBottomSheet] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({})
  const [expandedSubFilters, setExpandedSubFilters] = useState({})
  const [filterSelections, setFilterSelections] = useState({
    geslacht: [],
    [zoekenConfig.filterKey]: [],
    leeftijd: [],
    taal: [],
    ervaringZorg: [],
    diploma: [],
    ervaringMet: [],
    certCertificaten: [],
    certRegistraties: [],
    roken: [],
    vervoer: [],
    huisdieren: [],
    hygiene: [],
    specifiekeWensen: [],
  })
  const [tariefMin, setTariefMin] = useState(0)
  const [tariefMax, setTariefMax] = useState(100)

  /* Bottom sheet state */
  const [afstand, setAfstand] = useState(10)
  const [wanneerMode, setWanneerMode] = useState('terugkerend')
  const [selectedDays, setSelectedDays] = useState(['di', 'do'])
  const [zorgToggles, setZorgToggles] = useState({
    persoonlijkeVerzorging: true,
    verpleging: false,
    huishoudelijkeHulp: true,
    begeleidingIndividueel: false,
  })

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const toggleZorg = (key) => {
    setZorgToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const openBottomSheet = (sheet) => {
    setActiveBottomSheet(sheet)
  }

  const closeBottomSheet = () => {
    setActiveBottomSheet(null)
  }

  const profielSubCategories = [
    { key: zoekenConfig.filterKey, label: zoekenConfig.filterLabel, options: zoekenConfig.filterOptions },
    { key: 'geslacht', label: 'Geslacht', options: ['Man', 'Vrouw', 'Non-binair'] },
    { key: 'leeftijd', label: 'Leeftijd', options: ['18-30 jaar', '31-40 jaar', '41-55 jaar', '56+ jaar'] },
    { key: 'taal', label: 'Taal', options: ['Nederlands', 'Engels'] },
  ]

  const ervaringSubCategories = [
    { key: 'ervaringZorg', label: 'Ervaring in de zorg', options: ['0-3 jaar (Starter)', '3-7 jaar (Ervaren)', '7+ jaar (Expert)'] },
    { key: 'diploma', label: 'Diploma', options: ['Geen', 'MBO', 'HBO'] },
    { key: 'ervaringMet', label: 'Ervaring met', options: ['Cerebrale parese (CP)', 'Dwarsleasie', 'Multiple Sclerose (MS)', 'Spina bifida', 'Duchenne', 'Autisme Spectrum Stoornis (ASS)', 'Niet-aangeboren hersenletsel (NAH/CVA)', 'Downsyndroom', 'Dementie/ouderenzorg'] },
  ]

  const certificatenSubCategories = [
    { key: 'certCertificaten', label: 'Certificaten', options: ['BHV en/of EHBO', 'Reanimatie & AED', 'Tracheacanule verzorging', 'Medicijnbeheer', 'Agressiehantering en De-escalatie', 'Positieve Gedragsondersteuning (PBS)', 'Tillen en verplaatsen (transfer)', 'Autisme begeleiding', 'Epilepsie', 'Blaas- en darmzorg', 'Sondevoeding', 'Wondverzorging', 'Diabetes', 'Decubituspreventie'] },
    { key: 'certRegistraties', label: 'Registraties', options: ['AGB', 'KVK', 'BIG', 'Registerplein', 'Wmo kennisplein'] },
  ]

  const voorkeurenSubCategories = [
    { key: 'roken', label: 'Roken', options: ['Heeft geen bezwaar tegen roken', 'Rookt niet'] },
    { key: 'vervoer', label: 'Vervoer', options: ['Beschikt over rijbewijs', 'Beschikt over eigen vervoer', 'Is bereid tot vervoeren', 'Is bereid tot vervoer begeleiden'] },
    { key: 'huisdieren', label: 'Huisdieren', options: ['Heeft huisdieren', 'Heeft geen bezwaar tegen huisdieren'] },
    { key: 'hygiene', label: 'Hygiëne', options: ['Werkt alleen met handschoenen', 'Bereid tot het afdoen van sieraden', 'Bereid tot het verwijderen van nepnagels'] },
  ]

  const specifiekeWensenOptions = [
    'Alleen met gezamelijke connecties',
    'Flexibel in taken',
    'Loyaal',
    'Werkt graag in teams',
  ]

  const profielPills = [
    ...filterSelections.geslacht,
    ...(filterSelections[zoekenConfig.filterKey] || []),
    ...filterSelections.leeftijd,
    ...filterSelections.taal,
  ]

  const ervaringPills = [
    ...filterSelections.ervaringZorg,
    ...filterSelections.diploma,
    ...filterSelections.ervaringMet,
  ]

  const certificatenPills = [
    ...filterSelections.certCertificaten,
    ...filterSelections.certRegistraties,
  ]

  const voorkeurenPills = [
    ...filterSelections.roken,
    ...filterSelections.vervoer,
    ...filterSelections.huisdieren,
    ...filterSelections.hygiene,
  ]

  const specifiekeWensenPills = filterSelections.specifiekeWensen

  const tariefPills = (tariefMin !== 0 || tariefMax !== 100)
    ? [`€ ${tariefMin} - € ${tariefMax}`]
    : []

  const toggleFilterExpand = (key) => {
    if (expandedFilters[key]) {
      setExpandedSubFilters({})
    }
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleSubFilterExpand = (key) => {
    setExpandedSubFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleFilterOption = (category, option) => {
    setFilterSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter(o => o !== option)
        : [...prev[category], option]
    }))
  }

  const resetFilters = () => {
    setExpandedFilters({})
    setExpandedSubFilters({})
    setFilterSelections(prev => {
      const reset = {}
      Object.keys(prev).forEach(k => { reset[k] = [] })
      return reset
    })
    setTariefMin(0)
    setTariefMax(100)
  }

  /* Helper: render a multi-level expandable filter row */
  const renderExpandableFilter = (filterKey, icon, label, subCategories, pills) => (
    <div className={`zoeken__filter-row zoeken__filter-row--expandable${expandedFilters[filterKey] || pills.length > 0 ? ' zoeken__filter-row--expanded' : ''}`}>
      <button
        className="zoeken__filter-row-header"
        onClick={() => toggleFilterExpand(filterKey)}
      >
        <span className="zoeken__filter-row-icon">{icon}</span>
        <span className="zoeken__filter-row-label">{label}</span>
        <span className={`zoeken__filter-row-action${expandedFilters[filterKey] ? ' zoeken__filter-row-action--close' : ''}`}>
          {expandedFilters[filterKey] ? <CancelIcon /> : <AddIcon />}
        </span>
      </button>
      {expandedFilters[filterKey] && (
        <div className="zoeken__filter-sub">
          {subCategories.map(sub => (
            <div key={sub.key} className="zoeken__filter-sub-group">
              <button
                className="zoeken__filter-sub-row"
                onClick={() => toggleSubFilterExpand(sub.key)}
              >
                <span className="zoeken__filter-sub-label">{sub.label}</span>
                <span className="zoeken__filter-sub-action">
                  {expandedSubFilters[sub.key] ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedSubFilters[sub.key] && (
                <div className="zoeken__filter-options">
                  {sub.options.map(option => (
                    <button
                      key={option}
                      className="zoeken__filter-option"
                      onClick={() => toggleFilterOption(sub.key, option)}
                    >
                      <span className={`zoeken__filter-option-box${filterSelections[sub.key]?.includes(option) ? ' zoeken__filter-option-box--checked' : ''}`} />
                      <span className="zoeken__filter-option-label">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!expandedFilters[filterKey] && pills.length > 0 && (
        <div className="zoeken__filter-pills">
          {pills.map(option => (
            <span key={option} className="zoeken__filter-pill zoeken__filter-pill--selected">
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="zoeken">
      {/* Header area */}
      <header className="zoeken__header">
        <div
          className="zoeken__header-card"
          onClick={() => setShowTopSheet(true)}
          role="button"
          tabIndex={0}
          aria-label="Zoekcriteria aanpassen"
        >
          <div className="zoeken__header-top">
            <button className="zoeken__back" onClick={(e) => { e.stopPropagation(); onBack(); }} aria-label="Terug">
              <BackArrowIcon />
            </button>
            <span className="zoeken__postcode">1098 WC</span>
          </div>
          <div className="zoeken__header-tags">
            <CareHandIcon />
            <span className="zoeken__care-types">Persoonlijke verzorging, Huisho...</span>
            <span className="zoeken__care-count">+2</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="zoeken__filter-bar">
          <button
            className="zoeken__filter-btn"
            onClick={() => setShowFilter(true)}
            aria-label="Filter"
          >
            <FilterIcon />
            Filter
          </button>
          <button
            className="zoeken__sort-btn"
            onClick={() => showToast('Sorteer op (nog niet geïmplementeerd)')}
            aria-label="Sorteer op"
          >
            Sorteer op
            <ChevronDownIcon />
          </button>
        </div>
      </header>

      {/* Results count */}
      <p className="zoeken__results-count">
        {zoekenConfig.resultCountLabel(zoekenResultaten.length)}
      </p>

      {/* Results list */}
      <div className="zoeken__list">
        {zoekenResultaten.map((result) => (
          <button
            key={result.id}
            className="zoeken__card"
            onClick={() => onSelectResult ? onSelectResult(result) : showToast(`${result.name} (nog niet geïmplementeerd)`)}
            aria-label={`Bekijk profiel van ${result.name}`}
          >
            <div className="zoeken__card-avatar">
              {result.initials}
            </div>
            <div className="zoeken__card-content">
              <div className="zoeken__card-top">
                <span className="zoeken__card-name">{result.name}</span>
                <span className="zoeken__card-age">{result.age} jr</span>
                {result.careTypes.length > 0 && (
                  <span className="zoeken__card-icons">
                    {result.careTypes.map((type) => (
                      <span key={type} className="zoeken__card-care-icon">
                        {type === 'individual' ? <IndividualCareIcon /> : <GroupCareIcon />}
                      </span>
                    ))}
                  </span>
                )}
                <span className="zoeken__card-distance">
                  <LocationOutlineIcon size={12} />
                  {result.distance}
                </span>
              </div>
              <p className="zoeken__card-bio">{result.bio}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Near-miss results */}
      {zoekenBuitenZoekopdracht && zoekenBuitenZoekopdracht.length > 0 && (
        <>
          <p className="zoeken__results-count zoeken__results-count--secondary">
            {zoekenBuitenZoekopdracht.length} zorgverleners net buiten je zoekopdracht
          </p>
          <div className="zoeken__list zoeken__list--secondary">
            {zoekenBuitenZoekopdracht.map((result) => (
              <button
                key={result.id}
                className="zoeken__card zoeken__card--secondary"
                onClick={() => onSelectResult ? onSelectResult(result) : showToast(`${result.name} (nog niet geïmplementeerd)`)}
                aria-label={`Bekijk profiel van ${result.name}`}
              >
                <div className="zoeken__card-avatar">
                  {result.initials}
                </div>
                <div className="zoeken__card-content">
                  <div className="zoeken__card-top">
                    <span className="zoeken__card-name">{result.name}</span>
                    <span className="zoeken__card-age">{result.age} jr</span>
                    {result.careTypes.length > 0 && (
                      <span className="zoeken__card-icons">
                        {result.careTypes.map((type) => (
                          <span key={type} className="zoeken__card-care-icon">
                            {type === 'individual' ? <IndividualCareIcon /> : <GroupCareIcon />}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className="zoeken__card-distance">
                      <LocationOutlineIcon size={12} />
                      {result.distance}
                    </span>
                  </div>
                  {result.reden && (
                    <p className="zoeken__card-reden">{result.reden}</p>
                  )}
                  <p className="zoeken__card-bio">{result.bio}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Filter overlay */}
      {showFilter && (
        <div className="zoeken__filter-overlay">
          <div className="zoeken__filter-header">
            <button
              className="zoeken__filter-close"
              onClick={() => setShowFilter(false)}
              aria-label="Sluiten"
            >
              <CancelIcon />
            </button>
            <span className="zoeken__filter-title">Filter</span>
            <button
              className="zoeken__filter-reset"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <div className="zoeken__filter-list">
            {/* ---- Tarief (bruto) ---- */}
            <div className={`zoeken__filter-row zoeken__filter-row--expandable${expandedFilters.tarief ? ' zoeken__filter-row--expanded' : ''}`}>
              <button
                className="zoeken__filter-row-header"
                onClick={() => toggleFilterExpand('tarief')}
              >
                <span className="zoeken__filter-row-icon"><EuroIcon /></span>
                <span className="zoeken__filter-row-label">Tarief (bruto)</span>
                <span className={`zoeken__filter-row-action${expandedFilters.tarief ? ' zoeken__filter-row-action--close' : ''}`}>
                  {expandedFilters.tarief ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedFilters.tarief && (
                <div className="zoeken__filter-tarief">
                  <div className="zoeken__filter-tarief-values">
                    <div className="zoeken__filter-tarief-box">€ {tariefMin}</div>
                    <div className="zoeken__filter-tarief-box">€ {tariefMax}</div>
                  </div>
                  <div className="zoeken__filter-tarief-track">
                    <div
                      className="zoeken__filter-tarief-fill"
                      style={{ left: `${tariefMin}%`, width: `${tariefMax - tariefMin}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tariefMin}
                      className="zoeken__filter-tarief-input"
                      onChange={e => setTariefMin(Math.min(Number(e.target.value), tariefMax - 5))}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tariefMax}
                      className="zoeken__filter-tarief-input"
                      onChange={e => setTariefMax(Math.max(Number(e.target.value), tariefMin + 5))}
                    />
                  </div>
                  <div className="zoeken__filter-tarief-labels">
                    <span>€ 0</span>
                    <span>€ 100</span>
                  </div>
                  <div className="zoeken__filter-tarief-help">
                    <span>Welk tarief past bij mij zorg?</span>
                    <InfoIcon />
                  </div>
                </div>
              )}
              {!expandedFilters.tarief && tariefPills.length > 0 && (
                <div className="zoeken__filter-pills">
                  {tariefPills.map(p => (
                    <span key={p} className="zoeken__filter-pill zoeken__filter-pill--selected">{p}</span>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Zorgverlener profiel ---- */}
            {renderExpandableFilter('profiel', <UserIcon />, 'Zorgverlener profiel', profielSubCategories, profielPills)}

            {/* ---- Diploma's en werkervaring ---- */}
            {renderExpandableFilter('ervaring', <MortarboardIcon />, "Diploma's en werkervaring", ervaringSubCategories, ervaringPills)}

            {/* ---- Certificaten en registraties ---- */}
            {renderExpandableFilter('certificaten', <CertificateIcon />, 'Certificaten en registraties', certificatenSubCategories, certificatenPills)}

            {/* ---- Voorkeuren ---- */}
            {renderExpandableFilter('voorkeuren', <ThumbsUpIcon />, 'Voorkeuren', voorkeurenSubCategories, voorkeurenPills)}

            {/* ---- Specifieke wensen ---- */}
            <div className={`zoeken__filter-row zoeken__filter-row--expandable zoeken__filter-row--plain${expandedFilters.specifiek || specifiekeWensenPills.length > 0 ? ' zoeken__filter-row--expanded' : ''}`}>
              <button
                className="zoeken__filter-row-header"
                onClick={() => toggleFilterExpand('specifiek')}
              >
                <span className="zoeken__filter-row-label">Specifieke wensen</span>
                <span className={`zoeken__filter-row-action${expandedFilters.specifiek ? ' zoeken__filter-row-action--close' : ''}`}>
                  {expandedFilters.specifiek ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedFilters.specifiek && (
                <div className="zoeken__filter-options zoeken__filter-options--direct">
                  {specifiekeWensenOptions.map(option => (
                    <button
                      key={option}
                      className="zoeken__filter-option"
                      onClick={() => toggleFilterOption('specifiekeWensen', option)}
                    >
                      <span className={`zoeken__filter-option-box${filterSelections.specifiekeWensen.includes(option) ? ' zoeken__filter-option-box--checked' : ''}`} />
                      <span className="zoeken__filter-option-label">{option}</span>
                    </button>
                  ))}
                </div>
              )}
              {!expandedFilters.specifiek && specifiekeWensenPills.length > 0 && (
                <div className="zoeken__filter-pills">
                  {specifiekeWensenPills.map(option => (
                    <span key={option} className="zoeken__filter-pill zoeken__filter-pill--selected">
                      {option}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="zoeken__filter-footer">
            <label className="zoeken__filter-checkbox-wrap">
              <span className="zoeken__filter-checkbox">
                <span className="zoeken__filter-checkbox-box" />
              </span>
              <span className="zoeken__filter-checkbox-label">Zoekopdracht opslaan</span>
            </label>
            <button
              className="zoeken__filter-cta"
              onClick={() => setShowFilter(false)}
            >
              {zoekenResultaten.length} Zorgverleners gevonden
            </button>
          </div>
        </div>
      )}

      {/* Top sheet overlay */}
      {showTopSheet && (
        <div className="zoeken__overlay" onClick={() => setShowTopSheet(false)}>
          <div className="zoeken__topsheet" onClick={(e) => e.stopPropagation()}>
            <div className="zoeken__topsheet-card">
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('locatie')}>
                <LocationFilledIcon />
                <span className="zoeken__topsheet-label">1098 WC</span>
                <span className="zoeken__topsheet-meta">+ 10 km</span>
              </div>
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('wanneer')}>
                <RepeatIcon />
                <span className="zoeken__topsheet-label">Wekelijks op di, do</span>
              </div>
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('zorgtype')}>
                <CareHandIcon />
                <span className="zoeken__topsheet-label zoeken__topsheet-label--truncate">Persoonlijke verzorging, Huisho...</span>
                <span className="zoeken__topsheet-meta">+2</span>
              </div>
            </div>
            <div className="zoeken__topsheet-actions">
              <button
                className="zoeken__topsheet-back"
                onClick={() => setShowTopSheet(false)}
                aria-label="Sluiten"
              >
                <BackArrowIcon />
              </button>
              <button
                className="zoeken__topsheet-cta"
                onClick={() => setShowTopSheet(false)}
              >
                Zoeken
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom sheet overlay */}
      {activeBottomSheet && (
        <div className="zoeken__bs-overlay" onClick={closeBottomSheet}>
          <div className="zoeken__bs" onClick={(e) => e.stopPropagation()}>
            <div className="zoeken__bs-handle" />

            {/* ---- Locatie (Waar) ---- */}
            {activeBottomSheet === 'locatie' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Waar</span>
                </div>

                <div className="zoeken__bs-input-wrap">
                  <LocationFilledIcon />
                  <input
                    type="text"
                    className="zoeken__bs-input"
                    placeholder="Typ een postcode"
                    defaultValue="1098 WC"
                  />
                </div>

                <div className="zoeken__bs-quick-pills">
                  <button className="zoeken__bs-quick-pill">Thuis</button>
                  <button className="zoeken__bs-quick-pill">Werk</button>
                </div>

                <label className="zoeken__bs-label">Welke afstand?</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={afstand}
                  onChange={(e) => setAfstand(Number(e.target.value))}
                  className="zoeken__bs-slider"
                  style={{ '--slider-pct': `${((afstand - 1) / 99) * 100}%` }}
                />
                <div className="zoeken__bs-slider-labels">
                  <span>1 km</span>
                  <span>100 km</span>
                </div>
              </>
            )}

            {/* ---- Wanneer ---- */}
            {activeBottomSheet === 'wanneer' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Wanneer?</span>
                </div>

                <label className="zoeken__bs-label">Hoe vaak?</label>
                <div className="zoeken__bs-freq-pills">
                  <button
                    className={`zoeken__bs-freq-pill ${wanneerMode === 'terugkerend' ? 'zoeken__bs-freq-pill--active' : ''}`}
                    onClick={() => setWanneerMode('terugkerend')}
                  >
                    {wanneerMode === 'terugkerend' && <span className="zoeken__bs-check">✓</span>}
                    Terugkerend
                  </button>
                  <button
                    className={`zoeken__bs-freq-pill ${wanneerMode === 'eenmalig' ? 'zoeken__bs-freq-pill--active' : ''}`}
                    onClick={() => setWanneerMode('eenmalig')}
                  >
                    {wanneerMode === 'eenmalig' && <span className="zoeken__bs-check">✓</span>}
                    Eenmalig of tijdelijk
                  </button>
                </div>

                {wanneerMode === 'terugkerend' ? (
                  <>
                    <label className="zoeken__bs-label">Beschikbaar op:</label>
                    <div className="zoeken__bs-days">
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                        <button
                          key={day}
                          className={`zoeken__bs-day ${selectedDays.includes(day.toLowerCase()) ? 'zoeken__bs-day--active' : ''}`}
                          onClick={() => toggleDay(day.toLowerCase())}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="zoeken__bs-beschikbaar-row">
                      <span className="zoeken__bs-label">Beschikbaar op:</span>
                      <label className="zoeken__bs-switch-wrap">
                        <span className="zoeken__bs-switch">
                          <span className="zoeken__bs-switch-thumb" />
                        </span>
                        <span className="zoeken__bs-switch-text">Meerdere dagen</span>
                      </label>
                    </div>
                    <div className="zoeken__bs-input-wrap">
                      <input
                        type="text"
                        className="zoeken__bs-input zoeken__bs-input--date"
                        placeholder="Datum"
                      />
                      <CalendarSmallIcon />
                    </div>
                  </>
                )}

                <button className="zoeken__bs-add-link" onClick={() => showToast('Voeg tijden toe (nog niet geïmplementeerd)')}>
                  + Voeg tijden toe
                </button>
              </>
            )}

            {/* ---- Zorgtype ---- */}
            {activeBottomSheet === 'zorgtype' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Welke zorg zoek je?</span>
                </div>

                <div className="zoeken__bs-section-head">
                  <h3 className="zoeken__bs-section-title">Jouw zorgcategorieën</h3>
                  <p className="zoeken__bs-section-sub">Je kunt meerdere categorieën kiezen</p>
                </div>

                {Object.entries(zorgToggles).map(([key, value]) => (
                  <div key={key} className="zoeken__bs-toggle-row">
                    <button
                      className={`zoeken__bs-toggle ${value ? 'zoeken__bs-toggle--on' : ''}`}
                      onClick={() => toggleZorg(key)}
                      aria-label={`${zorgLabels[key]} ${value ? 'uitschakelen' : 'inschakelen'}`}
                    >
                      <span className="zoeken__bs-toggle-thumb" />
                    </button>
                    <span className="zoeken__bs-toggle-label">{zorgLabels[key]}</span>
                  </div>
                ))}

                <button className="zoeken__bs-expand" onClick={() => showToast('Alle zorgcategorieën (nog niet geïmplementeerd)')}>
                  Bekijk alle zorgcategorieën
                  <ChevronDownIcon />
                </button>
              </>
            )}

            <button className="zoeken__bs-save" onClick={closeBottomSheet}>
              Opslaan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Zoeken
