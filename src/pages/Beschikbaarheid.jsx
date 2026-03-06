import { useState } from 'react'
import { BackArrowIcon, ChevronLeftIcon, ChevronRightIcon, CalendarSmallIcon } from '../components/Icons'
import { BESCHIKBAARHEID_DAY_LABELS as DAY_LABELS, beschikbaarheidWeeks as WEEKS, caregiversData } from '../data/dummyData'
import './Beschikbaarheid.css'

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 6C11.4477 6 11 6.44772 11 7V12C11 12.3788 11.214 12.7251 11.5528 12.8944L14.5528 14.3944C15.0468 14.6414 15.6474 14.4412 15.8944 13.9472C16.1414 13.4532 15.9412 12.8526 15.4472 12.6056L13 11.382V7C13 6.44772 12.5523 6 12 6Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Beschikbaarheid detail overlay ---- */
function BeschikbaarheidOverlay({ caregiver, onClose, initialWeekIndex }) {
  const [weekIndex, setWeekIndex] = useState(initialWeekIndex)
  const week = WEEKS[weekIndex]
  const weekData = caregiver.weeks[week.weekNr]
  const days = week.dayLabelsLong.map((label, i) => [label, weekData.schedule[i]])

  return (
    <div className="beschikbaarheid-overlay" onClick={onClose}>
      <div className="beschikbaarheid-overlay__panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="beschikbaarheid-overlay__close" onClick={onClose} aria-label="Sluiten">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Profile header */}
        <div className="beschikbaarheid-overlay__profile">
          <div className="beschikbaarheid-overlay__avatar">
            {caregiver.initials}
          </div>
          <h3 className="beschikbaarheid-overlay__name">{caregiver.name}</h3>
          <div className="beschikbaarheid-overlay__tags">
            {caregiver.tags.map((tag) => (
              <span key={tag} className="beschikbaarheid-overlay__tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Week header */}
        <div className="beschikbaarheid-overlay__week-header">
          <button
            className="beschikbaarheid-overlay__nav"
            aria-label="Vorige week"
            onClick={() => setWeekIndex((i) => Math.max(0, i - 1))}
            disabled={weekIndex === 0}
          >
            <ChevronLeftIcon />
          </button>
          <div className="beschikbaarheid-overlay__week-info">
            <span className="beschikbaarheid-overlay__week-title">Beschikbaarheid</span>
            <span className="beschikbaarheid-overlay__week-label">
              <CalendarSmallIcon />
              Week {week.weekNr}
            </span>
          </div>
          <button
            className="beschikbaarheid-overlay__nav"
            aria-label="Volgende week"
            onClick={() => setWeekIndex((i) => Math.min(WEEKS.length - 1, i + 1))}
            disabled={weekIndex === WEEKS.length - 1}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Day schedule */}
        <div className="beschikbaarheid-overlay__schedule">
          {days.map(([day, slots]) => (
            <div key={day} className="schedule-day">
              <span className="schedule-day__label">{day}</span>
              <div className="schedule-day__slots">
                {slots.length === 0 ? (
                  <span className="schedule-day__empty">
                    <ClockIcon />
                    Niet beschikbaar
                  </span>
                ) : (
                  slots.map((slot) => (
                    <span key={slot} className="schedule-day__slot">
                      <ClockIcon />
                      {slot}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="beschikbaarheid-overlay__footer">
          Laatst bijgewerkt: {caregiver.lastUpdated}
        </div>
      </div>
    </div>
  )
}

/* ---- Main page ---- */
function Beschikbaarheid({ onBack }) {
  const [weekIndex, setWeekIndex] = useState(1) // Start at week 23
  const [selectedCaregiver, setSelectedCaregiver] = useState(null)

  const week = WEEKS[weekIndex]

  return (
    <div className="beschikbaarheid">
      {/* Header */}
      <header className="beschikbaarheid__header">
        <button className="beschikbaarheid__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="beschikbaarheid__title">Beschikbaarheid</h1>
      </header>

      {/* Month / week navigation */}
      <div className="beschikbaarheid__nav">
        <button
          className="beschikbaarheid__nav-arrow"
          aria-label="Vorige week"
          onClick={() => setWeekIndex((i) => Math.max(0, i - 1))}
          disabled={weekIndex === 0}
        >
          <ChevronLeftIcon />
        </button>
        <div className="beschikbaarheid__nav-center">
          <span className="beschikbaarheid__month">
            {week.month} <CalendarSmallIcon />
          </span>
          <span className="beschikbaarheid__week">Week {week.weekNr}</span>
        </div>
        <button
          className="beschikbaarheid__nav-arrow"
          aria-label="Volgende week"
          onClick={() => setWeekIndex((i) => Math.min(WEEKS.length - 1, i + 1))}
          disabled={weekIndex === WEEKS.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Grid */}
      <div className="beschikbaarheid__grid">
        {/* Day headers */}
        <div className="beschikbaarheid__row beschikbaarheid__row--header">
          <div className="beschikbaarheid__name-col" />
          {DAY_LABELS.map((day, i) => (
            <div key={day} className="beschikbaarheid__day-col">
              <span className="beschikbaarheid__day-label">{day}</span>
              <span className="beschikbaarheid__day-date">{week.dates[i]}</span>
            </div>
          ))}
        </div>

        {/* Caregiver rows */}
        {caregiversData.map((cg) => {
          const weekData = cg.weeks[week.weekNr]
          return (
            <button
              key={cg.id}
              className="beschikbaarheid__row beschikbaarheid__row--data"
              onClick={() => setSelectedCaregiver(cg)}
            >
              <div className="beschikbaarheid__name-col">
                <span className="beschikbaarheid__cg-name">{cg.name}</span>
              </div>
              {weekData.hours.map((h, i) => (
                <div key={i} className="beschikbaarheid__day-col">
                  <span className={`beschikbaarheid__hour ${h !== '-' ? 'beschikbaarheid__hour--active' : ''}`}>
                    {h}
                  </span>
                </div>
              ))}
            </button>
          )
        })}
      </div>

      {/* Detail overlay */}
      {selectedCaregiver && (
        <BeschikbaarheidOverlay
          caregiver={selectedCaregiver}
          onClose={() => setSelectedCaregiver(null)}
          initialWeekIndex={weekIndex}
        />
      )}
    </div>
  )
}

export default Beschikbaarheid
