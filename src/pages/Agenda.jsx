import { useState, useRef } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { SmallCareIcon, CalendarSmallIcon } from '../components/Icons'
import { agendaWeeks as WEEKS } from '../data/dummyData'
import NieuweAfspraak from './NieuweAfspraak'
import './Agenda.css'

/* ---- Page-specific icons ---- */
function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.58301 9.16699C9.14189 9.16699 11.167 11.359 11.167 14C11.167 14.276 10.943 14.4998 10.667 14.5H1.33301C1.05702 14.4998 0.833008 14.276 0.833008 14C0.833008 11.359 2.85811 9.16699 5.41699 9.16699H6.58301ZM11.0537 9.16992C13.3908 9.42141 15.167 11.5253 15.167 14C15.167 14.276 14.943 14.4998 14.667 14.5H12.667C12.3909 14.5 12.167 14.2761 12.167 14C12.167 13.7239 12.3909 13.5 12.667 13.5H14.1367C13.9219 11.7222 12.5779 10.3396 10.9463 10.1641C10.6719 10.1344 10.4734 9.88774 10.5029 9.61328C10.5325 9.33872 10.7792 9.14039 11.0537 9.16992ZM5.41699 10.167C3.61993 10.167 2.09349 11.598 1.86328 13.5H10.1367C9.90651 11.598 8.38007 10.167 6.58301 10.167H5.41699ZM6 2.16699C7.56481 2.16699 8.83301 3.43519 8.83301 5C8.83301 6.56481 7.56481 7.83301 6 7.83301C4.43519 7.83301 3.16699 6.56481 3.16699 5C3.16699 3.43519 4.43519 2.16699 6 2.16699ZM10 2.16699C11.5648 2.16699 12.833 3.43519 12.833 5C12.833 6.56481 11.5648 7.83301 10 7.83301C9.72386 7.83301 9.5 7.60915 9.5 7.33301C9.50018 7.05701 9.72397 6.83301 10 6.83301C11.0125 6.83301 11.833 6.01252 11.833 5C11.833 3.98748 11.0125 3.16699 10 3.16699C9.72397 3.16699 9.50018 2.94298 9.5 2.66699C9.5 2.39085 9.72386 2.16699 10 2.16699ZM6 3.16699C4.98748 3.16699 4.16699 3.98748 4.16699 5C4.16699 6.01252 4.98748 6.83301 6 6.83301C7.01252 6.83301 7.83301 6.01252 7.83301 5C7.83301 3.98748 7.01252 3.16699 6 3.16699Z" fill="currentColor"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.80872 13.308C6.05281 13.0641 6.44849 13.064 6.69251 13.308C6.93641 13.552 6.93637 13.9477 6.69251 14.1918L2.52552 18.3588C2.28146 18.6027 1.88576 18.6027 1.64173 18.3588C1.3977 18.1147 1.39779 17.7191 1.64173 17.475L5.80872 13.308ZM8.30872 15.808C8.55281 15.5641 8.94849 15.564 9.19251 15.808C9.43641 16.052 9.43637 16.4477 9.19251 16.6918L7.52552 18.3588C7.28146 18.6027 6.88576 18.6027 6.64173 18.3588C6.3977 18.1147 6.39779 17.7191 6.64173 17.475L8.30872 15.808ZM16.2345 1.47693C16.5734 1.46027 16.9031 1.44349 17.1837 1.47888C17.5158 1.5208 17.8242 1.63887 18.0929 1.90759C18.3614 2.17619 18.4787 2.48394 18.5206 2.8158C18.556 3.09634 18.5402 3.42616 18.5236 3.76502C18.5229 3.77906 18.5223 3.79391 18.5216 3.80798C18.422 5.84196 17.8083 7.83383 16.2726 9.36951L15.0343 10.6068C14.4941 11.147 14.2564 11.3958 14.1388 11.6254C14.0573 11.7846 14.017 11.9693 14.1075 12.4457C14.1091 12.4517 14.1109 12.4582 14.1124 12.4642C14.2118 12.8611 14.3312 13.3401 14.3322 13.8041C14.3331 14.3154 14.1914 14.8481 13.7404 15.2992C13.31 15.7295 12.8041 16.0412 12.214 16.0414C11.6237 16.0414 11.1171 15.7296 10.6866 15.2992L4.70032 9.31287C4.27005 8.88251 3.95915 8.37661 3.95911 7.7865C3.9591 7.19621 4.26987 6.68961 4.70032 6.25916C5.15137 5.80815 5.68421 5.66644 6.19544 5.66736C6.65965 5.66824 7.13924 5.7887 7.53626 5.88806C7.5421 5.88952 7.54803 5.89052 7.55384 5.89197C8.02982 5.98244 8.21504 5.94306 8.37415 5.86169C8.6037 5.74415 8.85243 5.50548 9.3927 4.96521L10.631 3.72791C12.1667 2.19214 14.1584 1.57839 16.1925 1.47888C16.2065 1.4782 16.2205 1.47762 16.2345 1.47693ZM16.2531 2.72693C14.4246 2.81644 12.7668 3.35968 11.5148 4.61169L10.215 5.9115C9.76239 6.3645 9.37178 6.75515 8.94446 6.974C8.42923 7.23783 7.91834 7.23605 7.30091 7.11658C7.2899 7.11445 7.27858 7.11148 7.2677 7.10877C6.8268 6.99853 6.48925 6.91795 6.19348 6.91736C5.93112 6.91686 5.74718 6.97992 5.58411 7.14294C5.26947 7.45759 5.20911 7.66442 5.20911 7.7865C5.20915 7.90856 5.26982 8.1147 5.58411 8.42908L11.5704 14.4154C11.8851 14.73 12.0919 14.7914 12.214 14.7914C12.3361 14.7912 12.5423 14.7297 12.8566 14.4154C13.0195 14.2524 13.0826 14.0692 13.0822 13.807C13.0816 13.5111 13.001 13.1729 12.8907 12.7318C12.8881 12.7212 12.886 12.7104 12.8839 12.6996C12.7644 12.0822 12.7619 11.5712 13.0255 11.056C13.2444 10.6287 13.6359 10.2382 14.089 9.78552C14.1095 9.76504 14.1298 9.74376 14.1505 9.72302L15.3888 8.48572C16.6409 7.23362 17.1831 5.57504 17.2726 3.74646C17.292 3.34941 17.3004 3.1316 17.2804 2.97302C17.2654 2.85449 17.2414 2.82376 17.2091 2.79138C17.1766 2.75891 17.1463 2.73412 17.0275 2.71912C16.8689 2.69909 16.6505 2.70749 16.2531 2.72693ZM3.30872 10.808C3.55281 10.5641 3.94849 10.564 4.19251 10.808C4.43641 11.052 4.43637 11.4477 4.19251 11.6918L2.52552 13.3588C2.28146 13.6027 1.88576 13.6027 1.64173 13.3588C1.3977 13.1147 1.39779 12.7191 1.64173 12.475L3.30872 10.808ZM14.171 5.00037C14.6312 5.00048 15.004 5.37321 15.004 5.83337C15.004 6.29349 14.6311 6.66626 14.171 6.66638H14.1632C13.7031 6.66632 13.3303 6.29353 13.3302 5.83337C13.3302 5.37317 13.703 5.00043 14.1632 5.00037H14.171Z" fill="currentColor"/>
    </svg>
  )
}

function ZorglogBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="10.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3.5 10.5V9C3.5 7.61929 4.61929 6.5 6 6.5H18C19.3807 6.5 20.5 7.61929 20.5 9V10.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 6.5V5C5.5 3.61929 6.61929 2.5 8 2.5H16C17.3807 2.5 18.5 3.61929 18.5 5V6.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.5 16C10 17 10.8 17.5 12 17.5C13.2 17.5 14 17 14.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function OverviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3691 6.83301C12.1242 6.83299 12.7413 6.83296 13.2285 6.89844C13.7378 6.96691 14.1798 7.11531 14.5322 7.46777C14.8847 7.82023 15.0331 8.2622 15.1016 8.77148C15.167 9.25864 15.167 9.94719 15.167 10.7021C15.167 11.4574 15.1671 12.0753 15.1016 12.5625C15.0331 13.0716 14.8845 13.5129 14.5322 13.8652C14.1798 14.2177 13.7378 14.3661 13.2285 14.4346C12.7413 14.5001 12.1242 14.5 11.3691 14.5H4.63086C3.87577 14.5 3.25869 14.5 2.77148 14.4346C2.26218 14.3661 1.82024 14.2177 1.46777 13.8652C1.1155 13.5129 0.966918 13.0716 0.898438 12.5625C0.832939 12.0753 0.832978 11.4574 0.833008 10.7021C0.833008 9.9472 0.832971 9.25865 0.898438 8.77148C0.966918 8.26221 1.11534 7.82022 1.46777 7.46777C1.82023 7.11532 2.26219 6.96691 2.77148 6.89844C3.25868 6.83296 3.87578 6.83299 4.63086 6.83301H11.3691ZM10.9668 9.59961C10.7459 9.43405 10.4323 9.47933 10.2666 9.7002L10.0664 9.9668C9.6442 10.5297 9.524 10.6695 9.37305 10.7451C9.2219 10.8207 9.03748 10.833 8.33301 10.833H7.66699C6.96252 10.833 6.7781 10.8207 6.62695 10.7451C6.47602 10.6695 6.35577 10.5297 5.93359 9.9668L5.7334 9.7002C5.56774 9.47931 5.25411 9.43401 5.0332 9.59961C4.8123 9.76529 4.76794 10.0789 4.93359 10.2998L5.13379 10.5664C5.15344 10.5926 5.17225 10.6189 5.19141 10.6445C5.52541 11.0909 5.79042 11.4449 6.17969 11.6396C6.56919 11.8344 7.01162 11.8336 7.56934 11.833H8.43066C8.98838 11.8336 9.43081 11.8344 9.82031 11.6396C10.2096 11.4449 10.4746 11.0909 10.8086 10.6445C10.8277 10.6189 10.8466 10.5926 10.8662 10.5664L11.0664 10.2998C11.2321 10.0789 11.1877 9.76529 10.9668 9.59961ZM10.6885 4.16699C11.1373 4.16699 11.5044 4.16705 11.8027 4.19141C12.1115 4.21663 12.3909 4.26967 12.6514 4.40234C13.0591 4.61007 13.3909 4.94192 13.5986 5.34961C13.7259 5.59939 13.7801 5.86635 13.8066 6.16016C13.6502 6.12136 13.494 6.09384 13.3408 6.07324C12.7978 6.00023 12.1335 5.99995 11.418 6H4.58398C3.86844 5.99995 3.20418 6.00023 2.66113 6.07324C2.50795 6.09384 2.35178 6.12136 2.19531 6.16016C2.22185 5.86625 2.27697 5.59946 2.4043 5.34961C2.61198 4.94214 2.94312 4.61101 3.35059 4.40332C3.6111 4.27057 3.89036 4.21664 4.19922 4.19141C4.49757 4.16704 4.86464 4.16699 5.31348 4.16699H10.6885ZM9.35449 1.5C9.80322 1.49999 10.1705 1.50004 10.4688 1.52441C10.7774 1.54965 11.056 1.60372 11.3164 1.73633C11.724 1.944 12.0559 2.27507 12.2637 2.68262C12.3851 2.92097 12.4409 3.17512 12.4688 3.45312C12.2621 3.40188 12.0597 3.37592 11.8691 3.36035C11.5366 3.3332 11.1405 3.33299 10.7148 3.33301H5.28418C4.85849 3.33299 4.4624 3.3332 4.12988 3.36035C3.93952 3.37591 3.73761 3.40199 3.53125 3.45312C3.55913 3.17509 3.61486 2.92098 3.73633 2.68262C3.94403 2.27523 4.2752 1.94398 4.68262 1.73633C4.94312 1.60358 5.22239 1.54965 5.53125 1.52441C5.82959 1.50005 6.19668 1.49999 6.64551 1.5H9.35449Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Main component ---- */
function Agenda({ initialSubPage = null, onNavigate, zorgCategorieen }) {
  const [subPage, setSubPage] = useState(initialSubPage)
  const [weekIndex, setWeekIndex] = useState(1)
  const [selectedDay, setSelectedDay] = useState(2)
  const [toast, setToast] = useState(null)
  const dayRefs = useRef([])
  const toastTimer = useRef(null)
  const dateInputRef = useRef(null)

  const showToast = (message, action) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ message, action })
    toastTimer.current = setTimeout(() => setToast(null), 4000)
  }

  const week = WEEKS[weekIndex]

  // Current date value for the date picker (from selected day's isoDate)
  const dateInputValue = week.days[selectedDay]?.isoDate || week.days[0].isoDate

  const handleDateChange = (e) => {
    const picked = e.target.value // "YYYY-MM-DD"
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

  const prevWeek = () => {
    setWeekIndex(Math.max(0, weekIndex - 1))
    setSelectedDay(0)
  }
  const nextWeek = () => {
    setWeekIndex(Math.min(WEEKS.length - 1, weekIndex + 1))
    setSelectedDay(0)
  }
  const goToToday = () => {
    setWeekIndex(1)
    setSelectedDay(0)
  }

  if (subPage === SUB_PAGES.NIEUWE_AFSPRAAK) {
    return <NieuweAfspraak onBack={() => setSubPage(null)} zorgCategorieen={zorgCategorieen} />
  }

  return (
    <div className="agenda">
      {/* Sticky header */}
      <div className="agenda__sticky-header">
        {/* Header */}
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
              <button className="agenda__pin-btn" onClick={() => onNavigate(PAGES.SJABLONEN)} aria-label="Sjablonen">
                <PinIcon />
              </button>
            </div>
          </div>
          <p className="agenda__week-label">Week {week.weekNr}</p>
        </div>

        {/* Day selector */}
        <div className="agenda__day-selector">
          <button
            className="agenda__nav-arrow"
            onClick={prevWeek}
            disabled={weekIndex === 0}
            aria-label="Vorige week"
          >
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
          <button
            className="agenda__nav-arrow"
            onClick={nextWeek}
            disabled={weekIndex === WEEKS.length - 1}
            aria-label="Volgende week"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Sub-header: selecteren label, overview banner, or toast */}
        <div className="agenda__sub-header">
          {toast ? (
            <div className="agenda__toast">
              <span className="agenda__toast-check">✓</span>
              <span className="agenda__toast-message">{toast.message}</span>
              {toast.action && (
                <button className="agenda__toast-action" onClick={() => { toast.action.onClick?.(); setToast(null) }}>
                  {toast.action.label}
                </button>
              )}
              <button className="agenda__toast-close" onClick={() => setToast(null)} aria-label="Sluiten">×</button>
            </div>
          ) : week.type === 'past' && week.overviewBanner ? (
            <button className="agenda__overview-banner" onClick={() => onNavigate(PAGES.ADMIN, SUB_PAGES.OVERZICHTEN, week.month)} aria-label={week.overviewBanner}>
              <OverviewIcon />
              <span>{week.overviewBanner}</span>
            </button>
          ) : (
            <p className="agenda__selecteren">Selecteren</p>
          )}
        </div>
      </div>

      {/* Day list */}
      <div className="agenda__days">
        {week.days.map((day, i) => {
          const hasAppointments = day.appointments.length > 0

          return (
            <div
              key={day.isoDate}
              ref={el => dayRefs.current[i] = el}
              className={`agenda__day ${hasAppointments ? 'agenda__day--has-appointments' : ''}`}
            >
              {/* Day header */}
              <div className="agenda__day-header">
                <h3 className="agenda__day-label">{day.label}</h3>
                <div className="agenda__day-meta">
                  {!hasAppointments && (
                    <span className="agenda__no-appointments">geen afspraken</span>
                  )}
                  <span className="agenda__people-count">
                    <PeopleIcon />
                    <span>2</span>
                  </span>
                </div>
              </div>

              {/* Appointment cards */}
              {day.appointments.map((apt) => (
                <div key={apt.id} className="agenda__card">
                  <div className="agenda__card-header">
                    <span className="agenda__card-time">{apt.time}</span>
                    {apt.hasZorglog && (
                      <span className="agenda__zorglog-badge">
                        Zorglog
                        <ZorglogBadgeIcon />
                      </span>
                    )}
                  </div>
                  <div className="agenda__card-type">
                    <SmallCareIcon type={apt.icon} />
                    <span>{apt.type}</span>
                  </div>
                  <div className="agenda__card-footer">
                    <span className="agenda__card-caregiver">{apt.caregiver}</span>
                    {apt.price && <span className="agenda__card-price">{apt.price}</span>}
                  </div>
                </div>
              ))}

              {/* Action buttons */}
              <div className="agenda__actions hide-scrollbar">
                {week.type === 'past' && (
                  <button className="agenda__action-btn" onClick={() => showToast('Toegevoegd', { label: 'Hele week toevoegen', onClick: () => {} })} aria-label="Zorglog toevoegen">+ Zorglog</button>
                )}
                {week.type === 'current' && (
                  <>
                    {hasAppointments && (
                      <button className="agenda__action-btn" onClick={() => showToast('Toegevoegd', { label: 'Hele week toevoegen', onClick: () => {} })} aria-label="Zorglog toevoegen">+ Zorglog</button>
                    )}
                    <button className="agenda__action-btn" onClick={() => setSubPage(SUB_PAGES.NIEUWE_AFSPRAAK)} aria-label="Nieuwe afspraak">+ Nieuw</button>
                  </>
                )}
                {week.type === 'empty' && (
                  <>
                    <button className="agenda__action-btn" onClick={() => setSubPage(SUB_PAGES.NIEUWE_AFSPRAAK)} aria-label="Nieuwe afspraak">+ Nieuw</button>
                    {day.templates?.map((tpl, j) => (
                      <button key={j} className="agenda__action-btn agenda__action-btn--template" onClick={() => alert(`${tpl} toevoegen (nog niet geïmplementeerd)`)} aria-label={`${tpl} toevoegen`}>
                        + {tpl}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Agenda
