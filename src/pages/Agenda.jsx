import { useState, useRef } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { SmallCareIcon, CalendarSmallIcon } from '@shared/components/Icons'
import { agendaWeeks as WEEKS, agendaVerzoeken, alleVerzoeken } from '../data/dummyData'
import AlleVerzoeken from './AlleVerzoeken'
import './Agenda.css'

/* ---- Page-specific icons ---- */
function MailOpenIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5435 1.04199C13.292 1.04197 13.9161 1.04183 14.4117 1.1084C14.9348 1.17874 15.4081 1.33333 15.7877 1.71289C16.1671 2.09241 16.3218 2.56483 16.3922 3.08789C16.4588 3.58354 16.4586 4.2083 16.4586 4.95703V5.49707L17.2193 6.00488C17.5636 6.23441 17.857 6.43019 18.0865 6.61621C18.3311 6.81459 18.5386 7.02958 18.69 7.31348C18.8412 7.59712 18.9048 7.88829 18.9332 8.20117C18.9598 8.49443 18.958 8.84617 18.9566 9.25781V9.28516C18.9531 10.3348 18.9437 11.407 18.9166 12.4932L18.9156 12.542C18.8847 13.7814 18.8592 14.7813 18.7174 15.5859C18.5684 16.4304 18.2826 17.1183 17.6959 17.7051C17.1079 18.2931 16.4148 18.5788 15.5631 18.7275C14.7504 18.8695 13.7379 18.8944 12.481 18.9258L12.4322 18.9268C10.8063 18.9674 9.19476 18.9674 7.56891 18.9268L7.52008 18.9258C6.26319 18.8944 5.25076 18.8695 4.43805 18.7275C3.58638 18.5788 2.8932 18.293 2.30524 17.7051C1.71849 17.1183 1.4327 16.4304 1.28376 15.5859C1.1419 14.7813 1.11643 13.7815 1.08551 12.542L1.08454 12.4932C1.05743 11.407 1.04802 10.3348 1.0445 9.28516L1.04352 9.25781C1.04212 8.84616 1.04133 8.49443 1.06794 8.20117C1.09635 7.8883 1.15894 7.59711 1.31012 7.31348C1.46156 7.02945 1.66895 6.81465 1.91364 6.61621C2.14318 6.43006 2.43721 6.2346 2.7818 6.00488C2.78932 5.99987 2.7967 5.9943 2.80426 5.98926L3.54157 5.49805V4.95703C3.54154 4.2083 3.54134 3.58354 3.60797 3.08789C3.67831 2.56473 3.83388 2.09245 4.21344 1.71289C4.59296 1.3335 5.06538 1.17872 5.58844 1.1084C6.084 1.04182 6.70814 1.04197 7.45661 1.04199H12.5435ZM12.8658 12.3447C12.2627 12.7066 11.7699 13.0017 11.3414 13.2031C10.8935 13.4137 10.4699 13.5449 9.99958 13.5449C9.5292 13.5449 9.1057 13.4137 8.65778 13.2031C8.22913 13.0016 7.73582 12.7068 7.13239 12.3447L2.29547 9.44141C2.29943 10.4348 2.30911 11.4433 2.33454 12.4619C2.36698 13.7617 2.39055 14.6678 2.51422 15.3691C2.63276 16.0412 2.83378 16.466 3.18903 16.8213C3.54303 17.1753 3.9708 17.3769 4.6529 17.4961C5.36352 17.6202 6.28315 17.6448 7.60016 17.6777C9.20518 17.7178 10.7959 17.7178 12.4009 17.6777C13.718 17.6448 14.6376 17.6202 15.3482 17.4961C16.0303 17.3769 16.4581 17.1753 16.8121 16.8213C17.1673 16.466 17.3674 16.0412 17.4859 15.3691C17.6096 14.6678 17.6341 13.7618 17.6666 12.4619C17.692 11.4426 17.7007 10.4335 17.7047 9.43945L12.8658 12.3447ZM7.50055 2.29199C6.69721 2.29199 6.15699 2.29256 5.75446 2.34668C5.37023 2.39835 5.20582 2.48819 5.09723 2.59668C4.98863 2.70528 4.89893 2.87033 4.84723 3.25488C4.79316 3.65737 4.79157 4.19691 4.79157 5V9.48145L7.7486 11.2559C8.38582 11.6382 8.82442 11.9008 9.18903 12.0723C9.54089 12.2377 9.7775 12.2949 9.99958 12.2949C10.2216 12.2949 10.4575 12.2376 10.8091 12.0723C11.1738 11.9008 11.6131 11.6383 12.2506 11.2559L15.2086 9.48047V5C15.2086 4.1969 15.207 3.65737 15.1529 3.25488C15.1012 2.87033 15.0115 2.70528 14.9029 2.59668C14.7943 2.4882 14.6299 2.39834 14.2457 2.34668C13.8432 2.29257 13.3036 2.29199 12.5006 2.29199H7.50055ZM11.6666 7.70801C12.0116 7.70801 12.2914 7.98798 12.2916 8.33301C12.2916 8.67819 12.0117 8.95801 11.6666 8.95801H8.33356C7.98838 8.95801 7.70856 8.67819 7.70856 8.33301C7.70874 7.98798 7.98849 7.70801 8.33356 7.70801H11.6666ZM3.49762 7.0293C3.12413 7.2783 2.88045 7.44295 2.70172 7.58789C2.53311 7.72463 2.45948 7.81635 2.41364 7.90234C2.39496 7.93743 2.37859 7.97677 2.36383 8.02539L3.54157 8.73145V7L3.49762 7.0293ZM16.4586 8.73047L17.6363 8.02442C17.6216 7.97635 17.606 7.93713 17.5875 7.90234C17.5416 7.81637 17.4679 7.72456 17.2994 7.58789C17.1206 7.44293 16.8761 7.27836 16.5025 7.0293L16.4586 7V8.73047ZM11.6666 4.375C12.0117 4.375 12.2916 4.65482 12.2916 5C12.2916 5.34518 12.0117 5.625 11.6666 5.625H8.33356C7.98838 5.625 7.70856 5.34518 7.70856 5C7.70856 4.65482 7.98838 4.375 8.33356 4.375H11.6666Z" fill="currentColor"/>
    </svg>
  )
}

function ClockSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AcceptIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DeclineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArchiveSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H18.5C19.8807 4 21 5.11929 21 6.5V7.5C21 8.32843 20.3284 9 19.5 9H4.5C3.67157 9 3 8.32843 3 7.5V6.5Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.5 9V17.5C4.5 18.8807 5.61929 20 7 20H17C18.3807 20 19.5 18.8807 19.5 17.5V9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.5 13H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ---- Status badge component ---- */
function StatusBadge({ status }) {
  const labels = {
    bevestigd: null,
    actief: 'Actief',
    verzoek: 'Verzoek',
    geannuleerd: 'Geannuleerd',
    administratie: 'Administratie',
    over30min: 'Over 30 min',
  }
  const label = labels[status]
  if (!label) return null
  return (
    <span className={`agenda__badge agenda__badge--${status}`}>
      {label}
      {status === 'administratie' && <ArchiveSmallIcon />}
      {status === 'verzoek' && <MailOpenIcon size={16} />}
    </span>
  )
}

/* ---- Openstaande verzoeken sub-page ---- */
function OpenstaandeVerzoeken({ onBack, verzoeken }) {
  return (
    <div className="agenda-verzoeken">
      <header className="agenda-verzoeken__header">
        <button className="agenda-verzoeken__back" onClick={onBack} aria-label="Terug">
          <ChevronLeftIcon />
        </button>
        <h1 className="agenda-verzoeken__title">Openstaande verzoeken</h1>
        <span className="agenda-verzoeken__count">{verzoeken.length}</span>
      </header>

      <div className="agenda-verzoeken__list">
        {verzoeken.map(v => (
          <div key={v.id} className="agenda-verzoeken__item">
            <div className="agenda-verzoeken__item-left">
              <p className="agenda-verzoeken__item-date">{v.date}</p>
              <div className="agenda-verzoeken__item-time">
                <ClockSmallIcon />
                <span>{v.time}</span>
              </div>
            </div>
            <div className="agenda-verzoeken__item-center">
              <p className="agenda-verzoeken__item-client">{v.client}</p>
              <p className="agenda-verzoeken__item-type">{v.type}</p>
            </div>
            <div className="agenda-verzoeken__item-actions">
              <button className="agenda-verzoeken__decline" aria-label="Afwijzen">
                <DeclineIcon />
              </button>
              <button className="agenda-verzoeken__accept" aria-label="Accepteren">
                <AcceptIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Main component ---- */
function Agenda({ initialSubPage = null, onNavigate }) {
  const [subPage, setSubPage] = useState(initialSubPage)
  const [weekIndex, setWeekIndex] = useState(1)
  const [selectedDay, setSelectedDay] = useState(0)
  const [hiddenCards, setHiddenCards] = useState({})
  const dayRefs = useRef([])
  const dateInputRef = useRef(null)

  const week = WEEKS[weekIndex]
  const dateInputValue = week.days[selectedDay]?.isoDate || week.days[0].isoDate

  const handleDateChange = (e) => {
    const picked = e.target.value
    for (let wi = 0; wi < WEEKS.length; wi++) {
      const dayIdx = WEEKS[wi].days.findIndex(d => d.isoDate === picked)
      if (dayIdx !== -1) {
        setWeekIndex(wi)
        setSelectedDay(dayIdx)
        setTimeout(() => {
          dayRefs.current[dayIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
        return
      }
    }
  }

  const prevWeek = () => { setWeekIndex(Math.max(0, weekIndex - 1)); setSelectedDay(0) }
  const nextWeek = () => { setWeekIndex(Math.min(WEEKS.length - 1, weekIndex + 1)); setSelectedDay(0) }
  const goToToday = () => {
    // Find the week and day index with isToday
    for (let wi = 0; wi < WEEKS.length; wi++) {
      const dayIdx = WEEKS[wi].days.findIndex(d => d.isToday)
      if (dayIdx !== -1) {
        setWeekIndex(wi)
        setSelectedDay(dayIdx)
        setTimeout(() => {
          dayRefs.current[dayIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
        return
      }
    }
  }

  const handleAccept = (id) => setHiddenCards(prev => ({ ...prev, [id]: 'accepted' }))
  const handleDecline = (id) => setHiddenCards(prev => ({ ...prev, [id]: 'declined' }))

  const verzoekCount = alleVerzoeken.length

  if (subPage === SUB_PAGES.ALLE_VERZOEKEN) {
    return <AlleVerzoeken onBack={() => setSubPage(null)} />
  }

  return (
    <div className="agenda">
      {/* Sticky header */}
      <div className="agenda__sticky-header">
        {/* Header — matches zorgvrager layout */}
        <div className="agenda__header">
          <div className="agenda__header-top">
            <div className="agenda__month-row" onClick={() => dateInputRef.current?.showPicker()} role="button" tabIndex={0} aria-label="Datum selecteren">
              <h1 className="agenda__month">{week.month}</h1>
              <span className="agenda__month-icon"><CalendarSmallIcon /></span>
              <input
                ref={dateInputRef}
                type="date"
                className="agenda__month-input"
                value={dateInputValue}
                onChange={handleDateChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            <div className="agenda__header-actions">
              <button className="agenda__vandaag-btn" onClick={goToToday} aria-label="Ga naar vandaag">
                Vandaag
              </button>
              <button className="agenda__inbox-btn" onClick={() => setSubPage(SUB_PAGES.ALLE_VERZOEKEN)} aria-label="Openstaande verzoeken">
                <MailOpenIcon />
                {verzoekCount > 0 && <span className="agenda__inbox-badge">{verzoekCount}</span>}
              </button>
            </div>
          </div>
          <p className="agenda__week-label">Week {week.weekNr}</p>
        </div>

        {/* Day selector — matches zorgvrager layout */}
        <div className="agenda__day-selector">
          <button className="agenda__nav-arrow" onClick={prevWeek} disabled={weekIndex === 0} aria-label="Vorige week">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="agenda__day-btns">
            {week.days.map((day, i) => {
              const btnClasses = [
                'agenda__day-btn',
                i === selectedDay && 'agenda__day-btn--active',
                day.isToday && 'agenda__day-btn--today',
                day.appointments.length === 0 && 'agenda__day-btn--no-appointments',
              ].filter(Boolean).join(' ')
              return (
                <button
                  key={day.isoDate}
                  className={btnClasses}
                  onClick={() => {
                    setSelectedDay(i)
                    dayRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  aria-label={day.label}
                >
                  <span className="agenda__day-btn-abbr">{day.dayAbbr}</span>
                  <span className="agenda__day-btn-date">{day.date}</span>
                </button>
              )
            })}
          </div>
          <button className="agenda__nav-arrow" onClick={nextWeek} disabled={weekIndex === WEEKS.length - 1} aria-label="Volgende week">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Beschikbaarheid sub-header */}
        <div className="agenda__sub-header">
          <button className="agenda__beschikbaarheid-link" onClick={() => onNavigate(PAGES.BESCHIKBAARHEID)}>
            Beschikbaarheid
          </button>
        </div>
      </div>

      {/* Day list */}
      <div className="agenda__days">
        {week.days.map((day, i) => {
          const visibleAppointments = day.appointments.filter(a => !hiddenCards[a.id])
          const hasAppointments = visibleAppointments.length > 0
          const requestCount = visibleAppointments.filter(a => a.status === 'verzoek').length

          return (
            <div
              key={day.isoDate}
              ref={el => dayRefs.current[i] = el}
              className="agenda__day"
            >
              {/* Day header with left border */}
              <div className={`agenda__datum ${hasAppointments ? 'agenda__datum--has-appointments' : 'agenda__datum--empty'}`}>
                <h3 className="agenda__datum-label">{day.label}</h3>
                <span className="agenda__datum-meta">
                  {hasAppointments ? (
                    <>
                      {day.workingHours || ''}
                      {requestCount > 0 && <span className="agenda__datum-extra"> +{requestCount}</span>}
                    </>
                  ) : (
                    'geen afspraken'
                  )}
                </span>
              </div>

              {/* Appointment cards */}
              {hasAppointments && (
                <div className="agenda__card-list">
                  {visibleAppointments.map(apt => {
                    const isRequest = apt.status === 'verzoek'
                    return (
                      <div key={apt.id} className={`agenda__card-wrapper ${isRequest ? 'agenda__card-wrapper--request' : ''}`}>
                        <div className={`agenda__card ${isRequest ? 'agenda__card--request' : ''}`}>
                          <div className="agenda__card-top">
                            <span className="agenda__card-time">{apt.time}</span>
                            <StatusBadge status={apt.status} />
                          </div>
                          <div className="agenda__card-name">
                            <span className="agenda__card-client">{apt.client}</span>
                          </div>
                          <div className="agenda__card-type">
                            <SmallCareIcon type={apt.icon} />
                            <span>{apt.type}</span>
                          </div>
                        </div>

                        {isRequest && (
                          <div className="agenda__card-actions">
                            <button className="agenda__card-decline" onClick={() => handleDecline(apt.id)}>
                              <DeclineIcon /> Afwijzen
                            </button>
                            <button className="agenda__card-accept" onClick={() => handleAccept(apt.id)}>
                              <AcceptIcon /> Accepteren
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Agenda
