import { useState } from 'react'
import { BackArrowIcon } from '@shared/components/Icons'
import './VasteBeschikbaarheid.css'

/* ---- Icons (from Iconen/ folder) ---- */

/* tick-02.svg — checkmark for active days */
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5179 5.95748C19.8175 6.24349 19.8285 6.71823 19.5425 7.01786L9.04252 18.0179C8.90308 18.1639 8.71064 18.2476 8.50872 18.25C8.3068 18.2523 8.11246 18.1731 7.96967 18.0303L4.46967 14.5303C4.17678 14.2374 4.17678 13.7626 4.46967 13.4697C4.76256 13.1768 5.23744 13.1768 5.53033 13.4697L8.48752 16.4269L18.4575 5.98214C18.7435 5.68252 19.2182 5.67148 19.5179 5.95748Z" fill="currentColor"/>
    </svg>
  )
}

/* unavailable icon for inactive days */
function BanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

/* add-01.svg — plus icon for add slot */
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.29199C10.5752 2.29199 11.0418 2.75786 11.042 3.33301V8.95801H16.667C17.2421 8.95818 17.708 9.42481 17.708 10C17.708 10.5752 17.2421 11.0418 16.667 11.042H11.042V16.667C11.0418 17.2421 10.5752 17.708 10 17.708C9.42481 17.708 8.95818 17.2421 8.95801 16.667V11.042H3.33301C2.75786 11.0418 2.29199 10.5752 2.29199 10C2.29199 9.42481 2.75786 8.95818 3.33301 8.95801H8.95801V3.33301C8.95818 2.75786 9.42481 2.29199 10 2.29199Z" fill="currentColor"/>
    </svg>
  )
}

/* delete-02.svg — trash icon */
function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.1025 1.04234C10.4875 1.04276 10.8342 1.04314 11.1225 1.06898C11.5933 1.1111 12.0367 1.25481 12.4167 1.53826C12.6975 1.74791 12.8925 2.00452 13.0592 2.28245C13.2142 2.53999 13.37 2.86109 13.5467 3.22534L13.9017 3.95834H17.5C17.96 3.95892 18.3333 4.33202 18.3333 4.79225C18.3333 5.2525 17.96 5.62559 17.5 5.62559H16.7733L16.3183 13.047C16.255 14.0913 16.2042 14.9201 16.1 15.582C15.9933 16.2609 15.8225 16.8263 15.4817 17.3208C15.1692 17.7732 14.7667 18.155 14.3008 18.4419C13.7908 18.7556 13.2217 18.8928 12.5442 18.9583H7.43917C6.76167 18.8925 6.19166 18.7551 5.68166 18.4408C5.21499 18.1534 4.81249 17.7709 4.49999 17.3178C4.15916 16.8224 3.98917 16.2563 3.88333 15.5764C3.78 14.9135 3.73 14.0836 3.6675 13.0378L3.22499 5.62559H2.5C2.04 5.62559 1.66666 5.2525 1.66666 4.79225C1.66666 4.33202 2.04 3.95892 2.5 3.95892L6.175 3.95834L6.47167 3.30847C6.64334 2.93081 6.795 2.59819 6.9475 2.33129C7.11167 2.0434 7.30583 1.77698 7.59083 1.55872C7.97499 1.26356 8.42667 1.11391 8.90833 1.07008C9.23583 1.04022 9.56666 1.0411 9.89583 1.04196L10.1025 1.04234ZM7.91666 8.71742C7.57166 8.71742 7.29166 8.99726 7.29166 9.34242V14.3424C7.29166 14.6877 7.57166 14.9674 7.91666 14.9674C8.26166 14.9674 8.54166 14.6877 8.54166 14.3424V9.34242C8.54166 8.99726 8.26166 8.71742 7.91666 8.71742ZM12.0833 8.71742C11.7383 8.71742 11.4583 8.99726 11.4583 9.34242V14.3424C11.4583 14.6877 11.7383 14.9674 12.0833 14.9674C12.4283 14.9674 12.7083 14.6877 12.7083 14.3424V9.34242C12.7083 8.99726 12.4283 8.71742 12.0833 8.71742ZM10.1894 2.70899L10.0292 2.70892C9.57 2.70892 9.28083 2.70972 9.05917 2.72988C8.7475 2.75826 8.55333 2.87974 8.395 3.15722C8.29083 3.33897 8.17833 3.58223 8.00667 3.95834H12.0492C11.8608 3.56918 11.74 3.32247 11.6308 3.14017C11.47 2.87323 11.2783 2.75621 10.9742 2.72902C10.7853 2.71211 10.5461 2.70941 10.1894 2.70899Z" fill="currentColor"/>
    </svg>
  )
}

/* arrow-right-02.svg — arrow between time inputs */
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 7.99998C14 7.70453 13.8701 7.4413 13.7611 7.2604C13.641 7.06119 13.482 6.85949 13.3121 6.66719C12.9709 6.28107 12.5288 5.86956 12.1038 5.50056C11.6754 5.12869 11.2491 4.78668 10.931 4.53845C10.7732 4.41527 10.4941 4.20448 10.3978 4.13178L10.3953 4.12991C10.0989 3.91157 9.68155 3.97491 9.46321 4.27137C9.24489 4.56782 9.3082 4.98512 9.60462 5.20347C9.69338 5.27051 9.95759 5.4701 10.1107 5.58958C10.4176 5.8291 10.8246 6.15571 11.2296 6.50737C11.5486 6.78436 11.8572 7.06892 12.1122 7.33333L2.66667 7.33333C2.29848 7.33333 2 7.63181 2 8C2 8.36819 2.29848 8.66667 2.66667 8.66667H12.1122C11.8572 8.93108 11.5486 9.21564 11.2296 9.49263C10.8246 9.84429 10.4176 10.1709 10.1107 10.4104C9.95759 10.5299 9.69338 10.7295 9.60462 10.7965C9.3082 11.0149 9.24489 11.4322 9.46321 11.7286C9.68155 12.0251 10.0989 12.0884 10.3953 11.8701L10.398 11.8681C10.4943 11.7954 10.7732 11.5847 10.931 11.4616C11.2491 11.2133 11.6754 10.8713 12.1038 10.4994C12.5288 10.1304 12.9709 9.71893 13.3121 9.33281C13.482 9.14051 13.641 8.93881 13.7611 8.7396C13.8701 8.5587 14 8.29541 14 7.99998Z" fill="currentColor"/>
    </svg>
  )
}

/* time-04.svg — clock icon for time inputs */
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99968 1.04163C14.9471 1.04163 18.9585 5.05223 18.9587 9.99963C18.9587 14.9472 14.9472 18.9586 9.99968 18.9586C5.05228 18.9584 1.04167 14.9471 1.04167 9.99963C1.04185 5.05234 5.05239 1.0418 9.99968 1.04163ZM13.9225 6.07776C13.5971 5.75232 13.0693 5.75232 12.7438 6.07776L9.99968 8.82092L8.50554 7.32776C8.1801 7.00234 7.65323 7.00233 7.3278 7.32776C7.00239 7.6532 7.00238 8.18007 7.3278 8.50549L8.82195 9.99963L8.5778 10.2438C8.25237 10.5692 8.25237 11.097 8.5778 11.4225C8.9032 11.7477 9.43014 11.7477 9.75554 11.4225L9.99968 11.1783L10.2438 11.4225C10.5692 11.7478 11.0971 11.7478 11.4225 11.4225C11.7479 11.0971 11.7479 10.5692 11.4225 10.2438L11.1784 9.99963L13.9225 7.25549C14.2478 6.9301 14.2478 6.40315 13.9225 6.07776Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Day names ---- */
const DAYS = [
  { key: 'ma', label: 'Ma', long: 'Maandagen' },
  { key: 'di', label: 'Di', long: 'Dinsdagen' },
  { key: 'wo', label: 'Wo', long: 'Woensdagen' },
  { key: 'do', label: 'Do', long: 'Donderdagen' },
  { key: 'vr', label: 'Vr', long: 'Vrijdagen' },
  { key: 'za', label: 'Za', long: 'Zaterdagen' },
  { key: 'zo', label: 'Zo', long: 'Zondagen' },
]

const DEFAULT_SLOTS = {
  ma: [{ start: '09:00', end: '17:00' }],
  di: [{ start: '13:00', end: '17:00' }],
  wo: [],
  do: [{ start: '09:00', end: '17:00' }],
  vr: [{ start: '09:00', end: '17:00' }],
  za: [],
  zo: [],
}

/* ---- VasteBeschikbaarheid page ---- */
function VasteBeschikbaarheid({ onBack }) {
  const [selectedDay, setSelectedDay] = useState('di')
  const [slots, setSlots] = useState(DEFAULT_SLOTS)

  const addSlot = () => {
    setSlots(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), { start: '09:00', end: '17:00' }],
    }))
  }

  const removeSlot = (index) => {
    setSlots(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((_, i) => i !== index),
    }))
  }

  const daySlots = slots[selectedDay] || []
  const dayInfo = DAYS.find(d => d.key === selectedDay)

  return (
    <div className="vb">
      {/* Header */}
      <header className="vb__header">
        <button className="vb__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="vb__title">Vaste beschikbaarheid</h1>
      </header>

      <div className="vb__body">
        {/* Question */}
        <h2 className="vb__question">Op welke dagen werk je?</h2>

        {/* Day grid */}
        <div className="vb__days">
          {DAYS.map(day => {
            const hasSlots = (slots[day.key] || []).length > 0
            const selected = selectedDay === day.key
            return (
              <button
                key={day.key}
                className={`vb__day ${hasSlots ? 'vb__day--active' : 'vb__day--inactive'} ${selected ? 'vb__day--selected' : ''}`}
                onClick={() => setSelectedDay(day.key)}
              >
                <span className="vb__day-label">{day.label}</span>
                <span className="vb__day-icon">
                  {hasSlots ? <CheckIcon /> : <BanIcon />}
                </span>
              </button>
            )
          })}
        </div>

        {/* Selected day section */}
        <div className="vb__day-section">
          <h3 className="vb__day-title">{dayInfo?.long}</h3>
          <button className="vb__add-slot" onClick={addSlot}>
            <PlusIcon />
            Tijdslot
          </button>
        </div>

        {/* Time slots */}
        {daySlots.map((slot, i) => (
          <div key={i} className="vb__slot-card">
            <div className="vb__slot-header">
              <span className="vb__slot-label">Tijdslot</span>
              <button className="vb__slot-delete" onClick={() => removeSlot(i)} aria-label="Verwijder tijdslot">
                <TrashIcon />
              </button>
            </div>
            <div className="vb__slot-times">
              <div className="vb__time-input">
                <ClockIcon />
                <span>{slot.start}</span>
              </div>
              <ArrowIcon />
              <div className="vb__time-input">
                <ClockIcon />
                <span>{slot.end}</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default VasteBeschikbaarheid
