import { useState } from 'react'
import { BackArrowIcon } from '@shared/components/Icons'
import './Uitzonderingen.css'

/* ---- Icons ---- */
function UnavailableIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM4.95117 6.01172C3.57888 7.62547 2.75 9.71568 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C14.2843 21.25 16.3736 20.4201 17.9873 19.0479L4.95117 6.01172ZM12 2.75C9.71568 2.75 7.62547 3.57888 6.01172 4.95117L19.0479 17.9873C20.4201 16.3736 21.25 14.2843 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="currentColor"/>
    </svg>
  )
}

function TimeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.6665 1.11133C15.9439 1.11133 20.2221 5.38963 20.2222 10.667C20.2222 15.9444 15.9439 20.2227 10.6665 20.2227C5.38914 20.2226 1.11084 15.9444 1.11084 10.667C1.11087 5.38964 5.38915 1.11135 10.6665 1.11133ZM14.8511 6.4834C14.5039 6.13627 13.9404 6.13627 13.5933 6.4834L10.6665 9.41016L9.07275 7.81641C8.72562 7.46929 8.16304 7.46928 7.81592 7.81641C7.4688 8.16355 7.46879 8.72612 7.81592 9.07324L9.40967 10.667L9.14893 10.9277C8.80208 11.2749 8.80193 11.8375 9.14893 12.1846C9.49597 12.5316 10.0586 12.5314 10.4058 12.1846L10.6665 11.9238L10.9272 12.1846C11.2744 12.5312 11.8371 12.5314 12.1841 12.1846C12.5312 11.8374 12.5312 11.2739 12.1841 10.9268L11.9233 10.667L14.8511 7.74023C15.198 7.39324 15.1977 6.83053 14.8511 6.4834Z" fill="currentColor"/>
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="currentColor"/>
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289L16.7071 12.2929C17.0976 12.6834 17.0976 13.3166 16.7071 13.7071L10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071C8.90237 19.3166 8.90237 18.6834 9.29289 18.2929L14.5858 13L9.29289 7.70711C8.90237 7.31658 8.90237 6.68342 9.29289 6.29289Z" fill="currentColor"/>
    </svg>
  )
}

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
      <header className="uitz__header">
        <button className="uitz__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="uitz__title">Uitzonderingen</h1>
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
