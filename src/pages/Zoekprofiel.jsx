import React, { useState } from 'react'
import { BackArrowIcon, InfoIcon, TickSmallIcon } from '@shared/components/Icons'
import './Zoekprofiel.css'

/* ---- Toggle component ---- */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      className={`zp__toggle ${checked ? 'zp__toggle--on' : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span className="zp__toggle-thumb" />
    </button>
  )
}

/* ---- Info popup button ---- */
function TooltipButton({ text, title }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        className="zp__tooltip-btn"
        onClick={() => setShow(true)}
        aria-label="Meer informatie"
      >
        <InfoIcon />
      </button>
      {show && (
        <div className="zp__popup-overlay" onClick={() => setShow(false)}>
          <div className="zp__popup" onClick={e => e.stopPropagation()}>
            {title && <h3 className="zp__popup-title">{title}</h3>}
            <p className="zp__popup-text">{text}</p>
            <button className="zp__popup-btn" onClick={() => setShow(false)}>Begrepen</button>
          </div>
        </div>
      )}
    </>
  )
}

/* ---- Range slider component ---- */
function RangeSlider({ min, max, valueLow, valueHigh, onChangeLow, onChangeHigh, minLabel, maxLabel }) {
  const range = max - min
  const lowPct = ((valueLow - min) / range) * 100
  const highPct = ((valueHigh - min) / range) * 100

  return (
    <div className="zp__range">
      <div className="zp__range-values">
        <div className="zp__range-value">{valueLow}</div>
        <div className="zp__range-value">{valueHigh}</div>
      </div>
      <div className="zp__range-track">
        <div
          className="zp__range-fill"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueLow}
          onChange={(e) => {
            const val = Number(e.target.value)
            if (val < valueHigh) onChangeLow(val)
          }}
          className="zp__range-input zp__range-input--low"
          aria-label="Minimum uren"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueHigh}
          onChange={(e) => {
            const val = Number(e.target.value)
            if (val > valueLow) onChangeHigh(val)
          }}
          className="zp__range-input zp__range-input--high"
          aria-label="Maximum uren"
        />
      </div>
      <div className="zp__range-labels">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

/* ---- Days / day-parts grid ---- */
const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const DAY_PARTS = [
  { label: 'Ochtend', timeStart: '6:00', timeEnd: '12:00' },
  { label: 'Middag', timeStart: '12:00', timeEnd: '18:00' },
  { label: 'Avond', timeStart: '18:00', timeEnd: '23:00' },
  { label: 'Nacht', timeStart: '23:00', timeEnd: '6:00' },
]

const DEFAULT_AVAILABILITY = {
  Ma: { Ochtend: true, Middag: true, Avond: false, Nacht: false },
  Di: { Ochtend: true, Middag: false, Avond: false, Nacht: false },
  Wo: { Ochtend: false, Middag: true, Avond: false, Nacht: false },
  Do: { Ochtend: true, Middag: true, Avond: false, Nacht: false },
  Vr: { Ochtend: false, Middag: false, Avond: false, Nacht: false },
  Za: { Ochtend: false, Middag: false, Avond: false, Nacht: false },
  Zo: { Ochtend: false, Middag: false, Avond: false, Nacht: false },
}

/* ---- Zoekprofiel page ---- */
function Zoekprofiel({ onBack, onNavigate }) {
  // Beschikbaarheid grid
  const [availability, setAvailability] = useState(DEFAULT_AVAILABILITY)

  const toggleSlot = (day, part) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], [part]: !prev[day][part] }
    }))
  }

  // Uren
  const [urenMin, setUrenMin] = useState(2)
  const [urenMax, setUrenMax] = useState(8)

  return (
    <div className="zp">
      {/* Header */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn zoekprofiel</h1>
      </header>

      <p className="zp__intro">Geef aan wanneer je beschikbaar bent en voor hoeveel uur.</p>

      <div className="zp__body">
        {/* Card: Beschikbaarheid weekrooster */}
        <section className="zp__card">
          <h2 className="zp__section-label">Beschikbaarheid</h2>
          <div className="zp__week-grid">
            {/* Column headers: day parts */}
            <div className="zp__week-corner" />
            {DAY_PARTS.map(({ label, timeStart, timeEnd }) => (
              <div key={label} className="zp__week-col-header">
                <span className="zp__week-col-label">{label}</span>
                <span className="zp__week-col-time">{timeStart}–</span>
                <span className="zp__week-col-time">{timeEnd}</span>
              </div>
            ))}
            {/* Rows: one per day */}
            {DAYS.map(day => (
              <React.Fragment key={day}>
                <div className="zp__week-day">{day}</div>
                {DAY_PARTS.map(({ label }) => (
                  <button
                    key={`${day}-${label}`}
                    className={`zp__week-cell ${availability[day][label] ? 'zp__week-cell--on' : ''}`}
                    onClick={() => toggleSlot(day, label)}
                    aria-label={`${day} ${label.toLowerCase()} ${availability[day][label] ? 'beschikbaar' : 'niet beschikbaar'}`}
                    aria-pressed={availability[day][label]}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Card: Aantal uur per week */}
        <section className="zp__card">
          <h3 className="zp__section-label">Aantal uur per week</h3>
          <div className="zp__uren-inputs">
            <label className="zp__uren-field">
              <span className="zp__uren-field-label">Min</span>
              <input
                className="zp__uren-input"
                type="number"
                min={1}
                max={168}
                value={urenMin}
                onChange={(e) => setUrenMin(Math.min(Number(e.target.value), urenMax))}
                aria-label="Minimum uren per week"
              />
            </label>
            <span className="zp__uren-dash">–</span>
            <label className="zp__uren-field">
              <span className="zp__uren-field-label">Max</span>
              <input
                className="zp__uren-input"
                type="number"
                min={1}
                max={168}
                value={urenMax}
                onChange={(e) => setUrenMax(Math.max(Number(e.target.value), urenMin))}
                aria-label="Maximum uren per week"
              />
            </label>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Zoekprofiel
