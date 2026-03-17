import { BackArrowIcon } from '@shared/components/Icons'
import './Zorgcategorieen.css'

/* ---- Zorgcategorieën page ---- */
function Zorgcategorieen({ onBack, categories, onCategoriesChange }) {
  const handleToggle = (itemId) => {
    onCategoriesChange(categories.map(item =>
      item.id === itemId ? { ...item, enabled: !item.enabled } : item
    ))
  }

  return (
    <div className="zorgcat">
      {/* Header */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Zorgcategorieën</h1>
      </header>

      {/* Intro */}
      <p className="zorgcat__intro">
        Selecteer de categorieën zorg die jij kan leveren.
      </p>

      {/* Category list */}
      <div className="zorgcat__list">
        {categories.map((item) => (
          <label key={item.id} className="zorgcat__toggle-row">
            <div className={`zorgcat__toggle ${item.enabled ? 'zorgcat__toggle--on' : ''}`} onClick={() => handleToggle(item.id)}>
              <div className="zorgcat__toggle-knob" />
            </div>
            <span className={`zorgcat__toggle-label ${item.enabled ? 'zorgcat__toggle-label--on' : ''}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Zorgcategorieen
