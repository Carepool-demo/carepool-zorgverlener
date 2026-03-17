import { useState } from 'react'
import { BackArrowIcon, PlusIcon, CheckIcon, BanIcon, TrashIcon, ArrowIcon, ClockIcon } from '@shared/components/Icons'
import './VasteBeschikbaarheid.css'

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
      <header className="sub-header vb__header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Vaste beschikbaarheid</h1>
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
