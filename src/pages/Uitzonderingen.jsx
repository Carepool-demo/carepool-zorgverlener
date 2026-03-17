import { useState } from 'react'
import { BackArrowIcon, UnavailableIcon, TimeIcon, ArrowLeftIcon, ArrowRightIcon } from '@shared/components/Icons'
import './Uitzonderingen.css'

/* ---- Calendar helpers ---- */
const DAY_LABELS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const MONTH_NAMES = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
const SHORT_MONTH_NAMES = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'dec']
const SHORT_DAY_NAMES = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Get day of week for first day (0=Sun, convert to Mon=0)
  let startDow = firstDay.getDay() - 1
  if (startDow < 0) startDow = 6

  const days = []

  // Fill leading days from previous month
  if (startDow > 0) {
    const prevMonthLast = new Date(year, month, 0).getDate()
    for (let i = startDow - 1; i >= 0; i--) {
      days.push({ day: prevMonthLast - i, inMonth: false })
    }
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, inMonth: true })
  }

  // Fill trailing days from next month
  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, inMonth: false })
    }
  }

  return days
}

/* ---- Dummy data ---- */
// Days of week with vaste beschikbaarheid (0=Ma, 1=Di, ..., 6=Zo)
const VASTE_DAGEN = {
  0: [{ start: '13:00', end: '17:00' }, { start: '19:00', end: '23:00' }], // Ma
  1: [{ start: '09:00', end: '13:00' }], // Di
  3: [{ start: '13:00', end: '17:00' }, { start: '19:00', end: '23:00' }], // Do
  4: [{ start: '09:00', end: '17:00' }], // Vr
}

// Exceptions for September 2024 (day number → exception info)
const EXCEPTIONS_DATA = {
  '2024-8-8': { type: 'unavailable' },  // Di 8 sept
  '2024-8-25': { type: 'modified', times: [{ start: '10:00', end: '14:00' }] }, // Vr 25 sept
}

function getDateType(year, month, day, dow) {
  const key = `${year}-${month}-${day}`
  const exception = EXCEPTIONS_DATA[key]
  if (exception) return 'uitzondering'
  // Check if this day of week has vaste beschikbaarheid
  if (VASTE_DAGEN[dow]) return 'beschikbaar'
  return 'niet-beschikbaar'
}

function getExceptionCount(year, month) {
  return Object.keys(EXCEPTIONS_DATA).filter(k => {
    const [y, m] = k.split('-').map(Number)
    return y === year && m === month
  }).length
}

/* ---- Uitzonderingen page ---- */
function Uitzonderingen({ onBack }) {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)

  const baseMonth = 8 // September (0-indexed)
  const baseYear = 2024
  const totalMonths = baseMonth + monthOffset
  const currentMonth = ((totalMonths % 12) + 12) % 12
  const currentYear = baseYear + Math.floor(totalMonths / 12)

  const calendarDays = getCalendarDays(currentYear, currentMonth)
  const exceptionCount = getExceptionCount(currentYear, currentMonth)

  // Split into rows of 7
  const rows = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    rows.push(calendarDays.slice(i, i + 7))
  }

  // Get selected date info
  const selectedInfo = selectedDate ? (() => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    const dow = date.getDay() - 1 < 0 ? 6 : date.getDay() - 1
    const dayName = SHORT_DAY_NAMES[date.getDay()]
    const key = `${currentYear}-${currentMonth}-${selectedDate}`
    const exception = EXCEPTIONS_DATA[key]
    const vasteSlots = VASTE_DAGEN[dow] || []
    return {
      label: `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${selectedDate} ${SHORT_MONTH_NAMES[currentMonth]}`,
      vasteSlots,
      exception,
      dow,
    }
  })() : null

  function handleDateClick(day, inMonth) {
    if (!inMonth) return
    setSelectedDate(prev => prev === day ? null : day)
  }

  function handleMonthChange(delta) {
    setMonthOffset(o => o + delta)
    setSelectedDate(null)
  }

  return (
    <div className="uitz">
      {/* Header */}
      <header className="sub-header uitz__header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Uitzonderingen</h1>
      </header>

      <div className="uitz__body">
        {/* Month navigation */}
        <div className="uitz__month-nav">
          <button
            className="uitz__month-arrow"
            onClick={() => handleMonthChange(-1)}
            aria-label="Vorige maand"
          >
            <ArrowLeftIcon />
          </button>
          <div className="uitz__month-center">
            <span className="uitz__month-name">{MONTH_NAMES[currentMonth]}</span>
            <span className="uitz__month-year">{currentYear}</span>
            {exceptionCount > 0 && (
              <span className="uitz__month-badge">{exceptionCount}</span>
            )}
          </div>
          <button
            className="uitz__month-arrow"
            onClick={() => handleMonthChange(1)}
            aria-label="Volgende maand"
          >
            <ArrowRightIcon />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="uitz__calendar">
          {/* Day headers */}
          <div className="uitz__cal-row">
            {DAY_LABELS.map(label => (
              <div key={label} className="uitz__cal-header">{label}</div>
            ))}
          </div>

          {/* Date rows */}
          {rows.map((row, ri) => (
            <div key={ri} className="uitz__cal-row">
              {row.map((cell, ci) => {
                const dow = ci // 0=Ma, 1=Di, ..., 6=Zo
                const dateType = cell.inMonth
                  ? getDateType(currentYear, currentMonth, cell.day, dow)
                  : null
                const isSelected = cell.inMonth && cell.day === selectedDate

                return (
                  <button
                    key={ci}
                    className={[
                      'uitz__cal-cell',
                      !cell.inMonth && 'uitz__cal-cell--outside',
                      cell.inMonth && dateType === 'beschikbaar' && 'uitz__cal-cell--beschikbaar',
                      cell.inMonth && dateType === 'niet-beschikbaar' && 'uitz__cal-cell--niet-beschikbaar',
                      cell.inMonth && dateType === 'uitzondering' && 'uitz__cal-cell--uitzondering',
                      isSelected && 'uitz__cal-cell--selected',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleDateClick(cell.day, cell.inMonth)}
                    disabled={!cell.inMonth}
                  >
                    <span className="uitz__cal-num">{cell.day}</span>
                    {cell.inMonth && <span className="uitz__cal-dot" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Detail card for selected date */}
        {selectedInfo && (
          <div className="uitz__detail">
            <div className="uitz__detail-top">
              <h3 className="uitz__detail-date">{selectedInfo.label}</h3>

              {selectedInfo.vasteSlots.length > 0 && (
                <div className="uitz__detail-slots">
                  <p className="uitz__detail-label">Vaste beschikbaarheid:</p>
                  {selectedInfo.vasteSlots.map((slot, i) => (
                    <div key={i} className="uitz__detail-time">
                      <TimeIcon size={16} />
                      <span>{slot.start}-{slot.end}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedInfo.vasteSlots.length === 0 && !selectedInfo.exception && (
                <p className="uitz__detail-label">Geen vaste beschikbaarheid deze dag.</p>
              )}

              {selectedInfo.exception && selectedInfo.exception.type === 'unavailable' && (
                <div className="uitz__detail-exception">
                  <div className="uitz__detail-status">
                    <UnavailableIcon size={16} />
                    <span>Niet beschikbaar deze dag</span>
                  </div>
                </div>
              )}

              {selectedInfo.exception && selectedInfo.exception.type === 'modified' && (
                <div className="uitz__detail-exception">
                  <p className="uitz__detail-label">Aangepaste tijden:</p>
                  {selectedInfo.exception.times.map((slot, i) => (
                    <div key={i} className="uitz__detail-time">
                      <TimeIcon size={16} />
                      <span>{slot.start}-{slot.end}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="uitz__detail-bottom">
              <p className="uitz__detail-prompt">Andere beschikbaarheid deze dag?</p>
              <div className="uitz__detail-actions">
                <button className="uitz__action-btn">
                  <UnavailableIcon size={20} />
                  <span>Niet beschikbaar</span>
                </button>
                <button className="uitz__action-btn">
                  <TimeIcon size={20} />
                  <span>Andere tijden</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Uitzonderingen
