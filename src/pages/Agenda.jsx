import { useState, useRef } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { SmallCareIcon, CareIcon, CalendarSmallIcon, ClockIcon, LocationOutlineIcon, ChevronLeftIcon, MailOpenIcon, ClockSmallIcon, AcceptIcon, DeclineIcon, ArchiveSmallIcon, TimerIcon, NoteSolidIcon, DeleteIcon, ChevronDownSmallIcon } from '@shared/components/Icons'
import { agendaWeeks as WEEKS, agendaVerzoeken, alleVerzoeken } from '../data/dummyData'
import AlleVerzoeken from './AlleVerzoeken'
import './Agenda.css'

/* ---- Template defaults ---- */
const TEMPLATE_DEFAULTS = {
  'Ochtendhulp': { time: '08:00 - 09:00', icon: 'morning', durations: [{ name: 'Persoonlijke verzorging', duration: '45 min' }, { name: 'Huishoudelijke hulp', duration: '15 min' }] },
  'Avondhulp': { time: '21:30 - 23:00', icon: 'evening', durations: [{ name: 'Persoonlijke verzorging', duration: '1 uur' }, { name: 'Huishoudelijke hulp', duration: '30 min' }] },
  'Toilet': { time: '10:00 - 10:30', icon: 'toilet', durations: [{ name: 'Persoonlijke verzorging', duration: '30 min' }] },
  'Huishoudelijke hulp': { time: '12:00 - 13:00', icon: 'household', durations: [{ name: 'Huishoudelijke hulp', duration: '1 uur' }] },
  'Persoonlijke verzorging': { time: '10:00 - 12:00', icon: 'morning', durations: [{ name: 'Persoonlijke verzorging', duration: '2 uur' }] },
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
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const dayRefs = useRef([])
  const dateInputRef = useRef(null)

  const openAppointmentSheet = (apt, day) => {
    setSelectedAppointment({ ...apt, isoDate: day.isoDate, dayLabel: day.label })
  }

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
                        <div className={`agenda__card ${isRequest ? 'agenda__card--request' : ''}`} onClick={() => openAppointmentSheet(apt, day)} role="button" tabIndex={0} aria-label={`${apt.type} openen`} style={{ cursor: 'pointer' }}>
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

      {/* Appointment bottom sheet */}
      {selectedAppointment && (() => {
        const defaults = TEMPLATE_DEFAULTS[selectedAppointment.type] || { durations: [] }
        const [startTime, endTime] = selectedAppointment.time.split(' - ')
        const clientName = selectedAppointment.client
        const clientInitials = clientName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

        // Calculate total duration from start/end
        const [sh, sm] = startTime.split(':').map(Number)
        const [eh, em] = endTime.split(':').map(Number)
        const totalMin = (eh * 60 + em) - (sh * 60 + sm)
        const durationStr = totalMin >= 60
          ? `${Math.floor(totalMin / 60)}u${totalMin % 60 > 0 ? ` ${totalMin % 60} min` : ''}`
          : `${totalMin} min`

        const isVerzoek = selectedAppointment.status === 'verzoek'

        return (
          <div className="agenda__bs-overlay" onClick={() => setSelectedAppointment(null)}>
            <div className="agenda__bs" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="agenda__bs-header">
                <button className="agenda__bs-close" onClick={() => setSelectedAppointment(null)} aria-label="Sluiten">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <div className="agenda__bs-header-right">
                  <span className="agenda__bs-verzoek-badge">
                    <MailOpenIcon size={16} /> Verzoek
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="agenda__bs-title">
                <span className="agenda__bs-icon-circle">
                  <CareIcon type={selectedAppointment.icon} />
                </span>
                <h2 className="agenda__bs-title-text">{selectedAppointment.type}</h2>
              </div>

              {/* Date row */}
              <div className="agenda__bs-row">
                <span className="agenda__bs-icon-sm">
                  <CalendarSmallIcon />
                </span>
                <span className="agenda__bs-row-text">{selectedAppointment.dayLabel}</span>
              </div>

              {/* Time row */}
              <div className="agenda__bs-row">
                <span className="agenda__bs-icon-sm">
                  <ClockIcon size={20} />
                </span>
                <span className="agenda__bs-row-text">{selectedAppointment.time}</span>
                <span className="agenda__bs-row-meta">({durationStr})</span>
              </div>

              {/* Location row */}
              <div className="agenda__bs-row agenda__bs-row--bottom-border">
                <span className="agenda__bs-icon-sm">
                  <LocationOutlineIcon size={20} />
                </span>
                <span className="agenda__bs-row-text">Dorpsstraat 30</span>
              </div>

              {/* Note */}
              <div className="agenda__bs-note">
                <div className="agenda__bs-note-header">
                  <NoteSolidIcon size={16} /> <span>Notitie</span>
                </div>
                <p className="agenda__bs-note-body">To do vandaag: bed verschonen, planten water geven, vuilnis buiten zetten</p>
              </div>

              {/* Duration breakdown */}
              <div className="agenda__bs-durations">
                <div className="agenda__bs-row agenda__bs-row--top">
                  <span className="agenda__bs-icon-sm">
                    <TimerIcon size={16} />
                  </span>
                  <div className="agenda__bs-duration-list">
                    {(defaults.durations || []).map((d, i) => (
                      <div key={i} className="agenda__bs-duration-row">
                        <span>{d.name}</span>
                        <span className="agenda__bs-duration-value">{d.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client */}
              <div className="agenda__bs-caregiver">
                <span className="agenda__bs-initials">{clientInitials}</span>
                <span className="agenda__bs-caregiver-name">{clientName}</span>
                <button className="agenda__bs-tarieven" onClick={() => alert('Tarieven (nog niet geïmplementeerd)')}>
                  Tarieven <ChevronDownSmallIcon />
                </button>
              </div>

              {/* Historie */}
              <button className="agenda__bs-historie" onClick={() => alert('Historie (nog niet geïmplementeerd)')}>
                Historie <ChevronDownSmallIcon />
              </button>

              {/* Actions — no Dupliceer, only Annuleren */}
              <div className="agenda__bs-actions">
                <button className="agenda__bs-delete" onClick={() => alert('Afspraak annuleren (nog niet geïmplementeerd)')}>
                  <DeleteIcon size={20} /> Afspraak annuleren
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default Agenda
