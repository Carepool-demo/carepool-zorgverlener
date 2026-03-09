import { showToast } from '../components/Toast';
import { useState } from 'react'
import { BackArrowIcon, DownloadIcon, ChevronDownIcon } from '../components/Icons'
import { mijnConnecties } from '@app/data/dummyData'
import './DownloadZorglogs.css'

/* ---- Local icons ---- */
function CheckSmallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5179 5.95748C19.8175 6.24349 19.8285 6.71823 19.5425 7.01786L9.04252 18.0179C8.90308 18.1639 8.71064 18.2476 8.50872 18.25C8.3068 18.2523 8.11246 18.1731 7.96967 18.0303L4.46967 14.5303C4.17678 14.2374 4.17678 13.7626 4.46967 13.4697C4.76256 13.1768 5.23744 13.1768 5.53033 13.4697L8.48752 16.4269L18.4575 5.98214C18.7435 5.68252 19.2182 5.67148 19.5179 5.95748Z" fill="currentColor"/>
    </svg>
  )
}

function CalendarInputIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1.11133C16.368 1.11133 16.6668 1.40935 16.667 1.77734V2.34473C17.3818 2.54747 17.9854 2.87448 18.4873 3.41699C19.1788 4.16453 19.4866 5.10934 19.6338 6.29297C19.778 7.45278 19.7774 8.93947 19.7773 10.8359V11.3867C19.7774 13.2832 19.778 14.7699 19.6338 15.9297C19.4866 17.1131 19.1787 18.0572 18.4873 18.8047C17.789 19.5596 16.8951 19.9019 15.7764 20.0645C14.6938 20.2218 13.3107 20.2227 11.5654 20.2227H9.76855C8.02305 20.2227 6.63934 20.2218 5.55664 20.0645C4.43801 19.9018 3.54399 19.5596 2.8457 18.8047C2.15446 18.0573 1.8474 17.113 1.7002 15.9297C1.55596 14.7699 1.55565 13.2832 1.55566 11.3867V10.8359C1.55565 8.93944 1.55596 7.45278 1.7002 6.29297C1.8474 5.10934 2.15423 4.16453 2.8457 3.41699C3.34784 2.87417 3.95174 2.54649 4.66699 2.34375V1.77734C4.66723 1.40946 4.96511 1.1115 5.33301 1.11133C5.70105 1.11133 5.99977 1.40935 6 1.77734V2.10254C7.00982 1.9995 8.25283 1.99999 9.76855 2H11.5654C13.0809 1.99999 14.3233 1.99954 15.333 2.10254V1.77734C15.3332 1.40935 15.632 1.11133 16 1.11133ZM2.92383 7.77734C2.8897 8.62799 2.88867 9.6449 2.88867 10.8828V11.3389C2.88867 13.2928 2.88967 14.6967 3.02246 15.7646C3.15348 16.8182 3.40288 17.4437 3.82422 17.8994C4.23883 18.3476 4.79743 18.6069 5.74805 18.7451C6.7238 18.8869 8.0106 18.8887 9.82227 18.8887H11.5107C13.3224 18.8887 14.6092 18.8869 15.585 18.7451C16.5358 18.6069 17.0941 18.3477 17.5088 17.8994C17.9302 17.4437 18.1795 16.8183 18.3105 15.7646C18.4433 14.6967 18.4443 13.2928 18.4443 11.3389V10.8828C18.4443 9.6449 18.4433 8.62799 18.4092 7.77734H2.92383ZM9.82227 3.33301C8.16207 3.33301 6.94314 3.33594 6 3.44531V3.55566C5.99994 3.9238 5.70116 4.22266 5.33301 4.22266C5.02897 4.22251 4.77531 4.0176 4.69531 3.73926C4.33201 3.88343 4.05528 4.07247 3.82422 4.32227C3.40446 4.77607 3.15589 5.3985 3.02441 6.44434H18.3086C18.1771 5.39851 17.9286 4.77606 17.5088 4.32227C17.2775 4.07228 17.0005 3.88346 16.6367 3.73926C16.5566 4.01752 16.3041 4.22266 16 4.22266C15.6318 4.22266 15.3331 3.9238 15.333 3.55566V3.44531C14.3899 3.33598 13.1707 3.33301 11.5107 3.33301H9.82227Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Period options ---- */
const PERIOD_OPTIONS = [
  { id: 'vorige-maand', label: 'Vorige maand' },
  { id: 'deze-maand', label: 'Deze maand' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
]

/* ---- Main component ---- */
function DownloadZorglogs({ onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState('vorige-maand')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedZorgverlener, setSelectedZorgverlener] = useState('iedereen')
  const [showDropdown, setShowDropdown] = useState(false)

  const zorgverlenerLabel = selectedZorgverlener === 'iedereen'
    ? 'Iedereen'
    : mijnConnecties.find(c => c.id === selectedZorgverlener)?.name || 'Iedereen'

  return (
    <div className="dlz">
      {/* Header */}
      <header className="dlz__top-bar">
        <button className="dlz__back-btn" onClick={onBack} aria-label="Terug naar administratie">
          <BackArrowIcon />
        </button>
        <h1 className="dlz__top-bar-title">Download zorglogs</h1>
      </header>

      <div className="dlz__content">
        {/* Periode pills */}
        <section className="dlz__section">
          <h2 className="dlz__label dlz__label--bold">Periode</h2>
          <div className="dlz__pills">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.id}
                className={`dlz__pill ${selectedPeriod === option.id ? 'dlz__pill--active' : ''}`}
                onClick={() => setSelectedPeriod(option.id)}
                aria-pressed={selectedPeriod === option.id}
              >
                {selectedPeriod === option.id && (
                  <span className="dlz__pill-check"><CheckSmallIcon /></span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Vanaf date input */}
        <section className="dlz__section">
          <label className="dlz__label" htmlFor="dlz-start">Vanaf</label>
          <div className="dlz__input-wrapper">
            <span className="dlz__input-icon"><CalendarInputIcon /></span>
            <input
              id="dlz-start"
              type="date"
              className="dlz__input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Vul startdatum in"
              aria-label="Startdatum"
            />
            {!startDate && <span className="dlz__input-placeholder">Vul startdatum in</span>}
          </div>
        </section>

        {/* Tot en met date input */}
        <section className="dlz__section">
          <label className="dlz__label" htmlFor="dlz-end">Tot en met</label>
          <div className="dlz__input-wrapper">
            <span className="dlz__input-icon"><CalendarInputIcon /></span>
            <input
              id="dlz-end"
              type="date"
              className="dlz__input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Vul einddatum in"
              aria-label="Einddatum"
            />
            {!endDate && <span className="dlz__input-placeholder">Vul einddatum in</span>}
          </div>
        </section>

        {/* Zorgverlener dropdown */}
        <section className="dlz__section">
          <label className="dlz__label">Zorgverlener</label>
          <div className="dlz__dropdown-wrapper">
            <button
              className="dlz__dropdown"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-haspopup="listbox"
              aria-expanded={showDropdown}
              aria-label={`Zorgverlener: ${zorgverlenerLabel}`}
            >
              <span className="dlz__dropdown-text">{zorgverlenerLabel}</span>
              <ChevronDownIcon />
            </button>
            {showDropdown && (
              <ul className="dlz__dropdown-list" role="listbox">
                <li role="option" aria-selected={selectedZorgverlener === 'iedereen'}>
                  <button
                    className={`dlz__dropdown-option ${selectedZorgverlener === 'iedereen' ? 'dlz__dropdown-option--active' : ''}`}
                    onClick={() => { setSelectedZorgverlener('iedereen'); setShowDropdown(false) }}
                  >
                    Iedereen
                  </button>
                </li>
                {mijnConnecties.map((c) => (
                  <li key={c.id} role="option" aria-selected={selectedZorgverlener === c.id}>
                    <button
                      className={`dlz__dropdown-option ${selectedZorgverlener === c.id ? 'dlz__dropdown-option--active' : ''}`}
                      onClick={() => { setSelectedZorgverlener(c.id); setShowDropdown(false) }}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Download button */}
        <div className="dlz__action">
          <button
            className="dlz__download-btn"
            onClick={() => showToast('Download CSV (nog niet geïmplementeerd)')}
            aria-label="Download CSV"
          >
            <DownloadIcon />
            Download CSV
          </button>
        </div>

        {/* Helper text */}
        <p className="dlz__helper">113 zorglogs gevonden</p>
      </div>
    </div>
  )
}

export default DownloadZorglogs
