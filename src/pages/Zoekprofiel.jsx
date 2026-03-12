import { useState } from 'react'
import { BackArrowIcon, TimeHalfPassIcon } from '@shared/components/Icons'
import { PAGES } from '../constants/routes'
import './Zoekprofiel.css'

/* ---- Page-specific icons ---- */
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.001 8C13.001 7.44772 12.5533 7 12.001 7H11.9922C11.4399 7 10.9922 7.44772 10.9922 8C10.9922 8.55228 11.4399 9 11.9922 9H12.001C12.5533 9 13.001 8.55228 13.001 8ZM12.2422 10.25C12.6564 10.25 12.9922 10.5858 12.9922 11V17C12.9922 17.4142 12.6564 17.75 12.2422 17.75C11.828 17.75 11.4922 17.4142 11.4922 17V11C11.4922 10.5858 11.828 10.25 12.2422 10.25Z" fill="currentColor"/>
    </svg>
  )
}

function HealthcareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.97034 8.83325C3.68179 8.83322 3.41699 8.83362 3.20178 8.86255C2.96488 8.89442 2.71437 8.96916 2.50842 9.17505C2.30252 9.38095 2.22782 9.63154 2.19592 9.86841C2.16699 10.0836 2.16659 10.3485 2.16663 10.637V12.3762C2.1666 12.5948 2.16621 12.7997 2.18616 12.9709C2.20837 13.1615 2.26005 13.3621 2.39807 13.5471C2.53616 13.7321 2.71386 13.8388 2.89026 13.9143C3.04881 13.9822 3.24595 14.0406 3.45569 14.1028L6.78772 15.0911C7.27069 15.2344 7.78856 15.1721 8.22522 14.9202L13.236 12.0295C13.8579 11.6705 14.0174 10.8425 13.6031 10.2688C13.1412 9.62938 12.3342 9.34797 11.5807 9.58228H11.5797L10.1627 10.0178C9.99709 10.0687 9.91427 10.0941 9.88831 10.1418C9.86239 10.1897 9.89372 10.299 9.95569 10.5168C10.0028 10.6828 10.0077 10.8422 9.99963 10.9319C9.99959 11.586 9.55418 12.1143 8.97815 12.2737L7.28381 12.7415C6.66948 12.9113 6.0114 12.8537 5.43616 12.5754L4.35608 12.052C4.14893 11.9518 4.06152 11.7025 4.16174 11.4954C4.26196 11.2885 4.51136 11.2021 4.71838 11.302L5.79846 11.8245C6.19087 12.0143 6.64179 12.0549 7.06213 11.9387L8.75549 11.47C8.98886 11.4054 9.16658 11.1926 9.16663 10.9319C9.16663 9.98997 8.38246 9.75031 7.44983 9.75025H6.75452C6.63334 9.75025 6.51391 9.72294 6.40686 9.67114L5.04553 9.01294C4.80185 8.89507 4.53425 8.83326 4.26331 8.83325H3.97034ZM8.25745 1.30982C7.60191 0.834181 6.51883 0.556231 5.33459 1.25806C4.48885 1.75947 4.0418 2.78565 4.19983 3.92407C4.35938 5.07288 5.12422 6.34125 6.69299 7.46314C7.20731 7.83159 7.67486 8.16724 8.33459 8.16724C8.99424 8.16718 9.46192 7.83156 9.9762 7.46314C11.5448 6.34127 12.3098 5.07284 12.4694 3.92407C12.6274 2.78551 12.1796 1.7594 11.3336 1.25806C10.1494 0.556345 9.06725 0.834202 8.41174 1.30982L8.33459 1.36548L8.25745 1.30982Z" fill="currentColor"/>
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.417 4.79146C13.7162 4.57694 14.1331 4.64554 14.3477 4.94478C14.9672 5.80904 15.332 6.86294 15.332 7.99947C15.332 10.9621 12.8689 13.3325 9.86914 13.3325H5.74023V13.9995C5.74026 14.1671 5.67689 14.3347 5.55078 14.4643C5.29401 14.7282 4.87227 14.7338 4.6084 14.477L3.93945 13.8266C3.81218 13.7029 3.64558 13.5409 3.54785 13.4145C3.46195 13.3034 3.2139 12.9558 3.39551 12.5288C3.57331 12.1111 3.98591 12.0398 4.12305 12.021C4.28179 11.9991 4.48139 11.9994 4.66211 11.9995H9.86914C12.1671 11.9995 13.999 10.1915 13.999 7.99947C13.999 7.15317 13.7278 6.36857 13.2637 5.72115C13.0496 5.42209 13.1183 5.006 13.417 4.79146ZM10.4492 1.53463C10.706 1.27081 11.1277 1.26519 11.3916 1.52193L12.0605 2.17232C12.1878 2.29599 12.3544 2.458 12.4521 2.58443C12.538 2.69553 12.786 3.04323 12.6045 3.47017C12.4267 3.88784 12.0141 3.95912 11.877 3.97799C11.7184 3.99976 11.5194 3.99956 11.3389 3.99947H6.13086C3.83291 3.99947 2.001 5.80743 2.00098 7.99947C2.00098 8.84582 2.27218 9.63034 2.73633 10.2778C2.95071 10.577 2.88219 10.994 2.58301 11.2085C2.28377 11.423 1.86686 11.3534 1.65234 11.0542C1.03287 10.1899 0.667969 9.13598 0.667969 7.99947C0.667988 5.03689 3.13116 2.66646 6.13086 2.66646H10.2598V1.99947C10.2598 1.83191 10.3231 1.66421 10.4492 1.53463Z" fill="currentColor"/>
    </svg>
  )
}

function TickSmallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5179 5.95748C19.8175 6.24349 19.8285 6.71823 19.5425 7.01786L9.04252 18.0179C8.90308 18.1639 8.71064 18.2476 8.50872 18.25C8.3068 18.2523 8.11246 18.1731 7.96967 18.0303L4.46967 14.5303C4.17678 14.2374 4.17678 13.7626 4.46967 13.4697C4.76256 13.1768 5.23744 13.1768 5.53033 13.4697L8.48752 16.4269L18.4575 5.98214C18.7435 5.68252 19.2182 5.67148 19.5179 5.95748Z" fill="currentColor"/>
    </svg>
  )
}

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

/* ---- Zoekprofiel page ---- */
function Zoekprofiel({ onBack, onNavigate }) {
  // Type hulp
  const [eenmaligeHulp, setEenmaligeHulp] = useState(true)
  const [vasteHulp, setVasteHulp] = useState(true)

  // Beschikbaarheid
  const [actueleToggle, setActueleToggle] = useState(true)
  const [andereToggle, setAndereToggle] = useState(false)

  // Uren
  const [urenMin, setUrenMin] = useState(2)
  const [urenMax, setUrenMax] = useState(8)

  return (
    <div className="zp">
      {/* Header */}
      <header className="zp__header">
        <button className="zp__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="zp__title">Mijn zoekprofiel</h1>
      </header>

      <p className="zp__intro">Geef aan voor welk type hulp je beschikbaar bent, wanneer en voor hoeveel uur.</p>

      <div className="zp__body">
        {/* Card 1: Type hulp */}
        <section className="zp__card">
          <div className="zp__hulp-option">
            <div className="zp__card-header">
              <div className="zp__row-icon">
                <HealthcareIcon />
              </div>
              <h2 className="zp__card-title">Eenmalige of tijdelijke hulp</h2>
              <Toggle checked={eenmaligeHulp} onChange={() => setEenmaligeHulp(v => !v)} label="Eenmalige of tijdelijke hulp" />
            </div>
            <p className="zp__hulp-desc">
              Werk flexibel en help iemand uit de brand. Zoals begeleiding tijdens vakantie of invaller bij ziekte
            </p>
          </div>
          <div className="zp__divider" />
          <div className="zp__hulp-option">
            <div className="zp__card-header">
              <div className="zp__row-icon">
                <RepeatIcon />
              </div>
              <h2 className="zp__card-title">Vaste hulp</h2>
              <Toggle checked={vasteHulp} onChange={() => setVasteHulp(v => !v)} label="Vaste hulp" />
            </div>
            <p className="zp__hulp-desc">
              Bouw vertrouwde relaties op. Zoals wekelijks helpen bij aankleden of deel van vast zorgteam
            </p>
          </div>
        </section>

        {/* Card 2: Beschikbaarheid & uren */}
        <section className="zp__card">
          <div className="zp__row">
            <span className="zp__row-label">Gebruik mijn actuele beschikbaarheid</span>
            <Toggle checked={actueleToggle} onChange={() => setActueleToggle(v => !v)} label="Gebruik mijn actuele beschikbaarheid" />
          </div>
          <button className="zp__beschikbaarheid-btn" onClick={() => onNavigate(PAGES.BESCHIKBAARHEID)}>
            <TimeHalfPassIcon />
            Beschikbaarheid
          </button>
          <div className="zp__divider" />
          <div className="zp__row">
            <span className="zp__row-label">Andere tijden opgeven</span>
            <Toggle checked={andereToggle} onChange={() => setAndereToggle(v => !v)} label="Andere tijden opgeven" />
          </div>
        </section>

        {/* Card 3: Aantal uur per week */}
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
