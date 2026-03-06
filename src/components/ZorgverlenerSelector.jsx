import { ChevronDownIcon } from './Icons'
import './ZorgverlenerSelector.css'

function ZorgverlenerSelector({ name = 'Julia Smilde', initials = 'JS', className = '' }) {
  return (
    <div className={`selector ${className}`}>
      <label className="selector__label">Zorgverlener</label>
      <button
        className="selector__dropdown"
        aria-label={`Zorgverlener: ${name}`}
        aria-haspopup="listbox"
      >
        <div className="selector__avatar">{initials}</div>
        <span className="selector__name">{name}</span>
        <ChevronDownIcon />
      </button>
    </div>
  )
}

export default ZorgverlenerSelector
