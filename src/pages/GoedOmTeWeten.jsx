import { BackArrowIcon } from '@shared/components/Icons'
import './GoedOmTeWeten.css'

function GoedOmTeWeten({ onBack, items, onItemsChange }) {
  const handleToggle = (groupId, itemId) => {
    onItemsChange(items.map(group => {
      if (group.id !== groupId) return group
      return {
        ...group,
        items: group.items.map(item =>
          item.id === itemId ? { ...item, enabled: !item.enabled } : item
        ),
      }
    }))
  }

  return (
    <div className="gotw">
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Goed om te weten</h1>
      </header>

      <div className="gotw__body">
        <p className="gotw__intro">
          Selecteer wat zorgvragers over jou mogen weten.
        </p>

        {items.map((group) => (
          <div key={group.id} className="gotw__section">
            <h3 className="gotw__section-title">{group.title}</h3>
            <div className="gotw__pill-grid">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`gotw__pill ${item.enabled ? 'gotw__pill--active' : ''}`}
                  onClick={() => handleToggle(group.id, item.id)}
                  aria-pressed={item.enabled}
                >
                  {item.enabled && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GoedOmTeWeten
