import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@shared/components/Icons'
import { mijnConnecties } from '../data/dummyData'
import './ZorgverlenerSelector.css'

const defaultOptions = mijnConnecties.map(c => ({ name: c.name, initials: c.initials }))

function ZorgverlenerSelector({
  label = 'Zorgvrager',
  options = defaultOptions,
  selectedIndex: controlledIndex,
  onSelectChange,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const [internalIndex, setInternalIndex] = useState(0)
  const ref = useRef(null)

  const selectedIndex = controlledIndex !== undefined ? controlledIndex : internalIndex
  const current = options[selectedIndex] || options[0]

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleSelect = (i) => {
    if (onSelectChange) onSelectChange(i)
    else setInternalIndex(i)
    setOpen(false)
  }

  return (
    <div className={`selector ${className}`} ref={ref}>
      <label className="selector__label">{label}</label>
      <button
        className="selector__dropdown"
        onClick={() => setOpen(!open)}
        aria-label={`${label}: ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="selector__avatar">{current.initials}</div>
        <span className="selector__name">{current.name}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="selector__options" role="listbox">
          {options.map((opt, i) => (
            <button
              key={i}
              className={`selector__option ${i === selectedIndex ? 'selector__option--active' : ''}`}
              onClick={() => handleSelect(i)}
              role="option"
              aria-selected={i === selectedIndex}
            >
              <div className="selector__avatar">{opt.initials}</div>
              <span>{opt.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ZorgverlenerSelector
