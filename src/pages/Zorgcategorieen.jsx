import { BackArrowIcon } from '@shared/components/Icons'
import './Zorgcategorieen.css'

/* ---- Zorgcategorieën page ---- */
function Zorgcategorieen({ onBack, categories, onCategoriesChange }) {
  const handleToggle = (groupId, itemId) => {
    onCategoriesChange(categories.map(group => {
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
    <div className="zorgcat">
      {/* Header */}
      <header className="zorgcat__header">
        <button className="zorgcat__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="zorgcat__title">Zorgcategorieën</h1>
      </header>

      {/* Intro */}
      <p className="zorgcat__intro">
        Selecteer de categorieën zorg die jij kan leveren.
      </p>

      {/* Category groups */}
      <div className="zorgcat__groups">
        {categories.map((group) => (
          <div key={group.id} className="zorgcat__group-card">
            <h3 className="zorgcat__group-title">{group.title}</h3>
            {group.items.map((item) => (
              <label key={item.id} className="zorgcat__toggle-row">
                <div className={`zorgcat__toggle ${item.enabled ? 'zorgcat__toggle--on' : ''}`} onClick={() => handleToggle(group.id, item.id)}>
                  <div className="zorgcat__toggle-knob" />
                </div>
                <span className={`zorgcat__toggle-label ${item.enabled ? 'zorgcat__toggle-label--on' : ''}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Zorgcategorieen
