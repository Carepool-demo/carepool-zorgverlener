import { useState } from 'react'
import ZorgverlenerSelector from '@app/components/ZorgverlenerSelector'
import MonthRow from '../components/MonthRow'
import { BackArrowIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon } from '../components/Icons'
import { DAY_LABELS, DUTCH_MONTHS, CARE_TYPES } from '@app/data/dummyData'
import './SvbDeclaratie.css'

/* ---- Date helpers ---- */
function getWeeksOfMonth(year, month) {
  const weeks = []
  const firstDay = new Date(year, month, 1)
  const dayOfWeek = firstDay.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const startMonday = new Date(year, month, 1 + mondayOffset)

  let current = new Date(startMonday)
  const lastDay = new Date(year, month + 1, 0)

  while (true) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
    if (current > lastDay && current.getMonth() !== month) break
  }

  return weeks
}

/* ---- Sub-components ---- */
function WeekNav({ onPrev, onNext, canGoPrev, canGoNext }) {
  return (
    <div className="svb__week-nav">
      <button
        className="svb__week-btn svb__week-btn--prev"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Ga naar vorige week"
      >
        <ChevronLeftIcon />
        Vorige week
      </button>
      <button
        className="svb__week-btn svb__week-btn--next"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Ga naar volgende week"
      >
        Volgende week
        <ChevronRightIcon />
      </button>
    </div>
  )
}

function CareTypeRow({ careType, days, currentMonth }) {
  return (
    <div className="svb__care-row">
      <div className="svb__care-label">
        <span className="svb__care-category">{careType.category}</span>
        <div className="svb__care-desc">
          <span>{careType.description}: {careType.rate} {careType.rateUnit}</span>
        </div>
      </div>
      <div className="svb__input-grid" role="row">
        {days.map((date, i) => {
          const isInMonth = date.getMonth() === currentMonth
          const dayOfMonth = date.getDate()
          const value = isInMonth ? (careType.hours[dayOfMonth] || '') : ''
          const dayLabel = DAY_LABELS[i]
          const dateStr = `${dayOfMonth} ${DUTCH_MONTHS[date.getMonth()]}`

          return (
            <div key={date.toISOString()} className="svb__input-cell">
              <input
                type="text"
                className={`svb__input ${!isInMonth ? 'svb__input--disabled' : ''}`}
                value={value}
                disabled={!isInMonth}
                readOnly
                aria-label={
                  isInMonth
                    ? `Uren ${dayLabel} ${dateStr}, ${careType.description}`
                    : `${dayLabel} ${dateStr} niet beschikbaar`
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---- Main component ---- */
function SvbDeclaratie({ onBack }) {
  const [year] = useState(2025)
  const [month] = useState(0)
  const [weekIndex, setWeekIndex] = useState(0)

  const weeks = getWeeksOfMonth(year, month)
  const currentWeek = weeks[weekIndex] || weeks[0]

  const canGoPrev = weekIndex > 0
  const canGoNext = weekIndex < weeks.length - 1

  const monthLabel = DUTCH_MONTHS[month].charAt(0).toUpperCase() + DUTCH_MONTHS[month].slice(1)

  return (
    <div className="svb">
      {/* Custom TopBar with back arrow */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug naar administratie">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">SVB-declaratieoverzicht</h1>
      </header>

      {/* Info banner */}
      <div className="svb__banner" role="note">
        <div className="svb__banner-icon">
          <InfoIcon />
        </div>
        <div className="svb__banner-text">
          <strong>SVB-declaratieoverzicht</strong>
          <span>Deze weergave toont de uren in hetzelfde format als het PGB-portaal van de SVB, zodat je ze makkelijk kunt overtypen.</span>
        </div>
      </div>

      {/* Zorgverlener selector */}
      <ZorgverlenerSelector className="svb__selector-spacing" />

      {/* Month picker + download */}
      <MonthRow month={monthLabel} year={String(year)} className="svb__month-spacing" />

      {/* Week indicator */}
      <div className="svb__week-indicator" aria-live="polite">
        Week {weekIndex + 1} van {weeks.length}
      </div>

      {/* Day column headers */}
      <div className="svb__day-header" role="row" aria-label="Dagen van de week">
        {currentWeek.map((date, i) => {
          const isInMonth = date.getMonth() === month
          return (
            <div key={date.toISOString()} className={`svb__day-col ${!isInMonth ? 'svb__day-col--disabled' : ''}`}>
              <span className="svb__day-num">
                {String(date.getDate()).padStart(2, '0')}
              </span>
              <span className="svb__day-label">{DAY_LABELS[i]}</span>
            </div>
          )
        })}
      </div>

      {/* Care type rows */}
      {CARE_TYPES.map((careType) => (
        <CareTypeRow
          key={careType.id}
          careType={careType}
          days={currentWeek}
          currentMonth={month}
        />
      ))}

      {/* Bottom week navigation */}
      <div className="svb__footer-nav">
        <WeekNav
          onPrev={() => canGoPrev && setWeekIndex((w) => w - 1)}
          onNext={() => canGoNext && setWeekIndex((w) => w + 1)}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
        />
      </div>
    </div>
  )
}

export default SvbDeclaratie
