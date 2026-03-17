import { useState } from 'react'
import { showToast } from '@shared/components/Toast'
import { BackArrowIcon, ChevronRightIcon, ChevronDownIcon, LocationIcon, TimeHalfPassIcon, EditPencilIcon, HoldIcon, EuroIcon, ChattingIcon, TickIcon, BriefcaseIcon, CheckmarkBadgeIcon, EyeIcon } from '@shared/components/Icons'
import { profielData } from '../data/dummyData'
import { PAGES } from '../constants/routes'
import './Profiel.css'

/* ---- List item component ---- */
function ProfielListItem({ icon: Icon, label, badge, onClick }) {
  return (
    <button className="profiel__list-item" onClick={onClick}>
      <div className="profiel__list-icon">
        <Icon />
      </div>
      <span className="profiel__list-label">{label}</span>
      <div className="profiel__list-right">
        {badge != null && (
          <span className="profiel__list-badge">{badge}</span>
        )}
        <ChevronRightIcon />
      </div>
    </button>
  )
}

/* ---- Profiel page ---- */

function Profiel({ onBack, onNavigate, isVindbaar, onToggleVindbaar, talenCount }) {
  const profile = profielData
  const [showFullBio, setShowFullBio] = useState(false)
  const [showVindbaarInfo, setShowVindbaarInfo] = useState(false)
  const [showVindbaarToggle, setShowVindbaarToggle] = useState(false)

  const handleToggleVindbaar = () => {
    setShowVindbaarToggle(true)
  }

  const confirmToggle = () => {
    onToggleVindbaar()
    setShowVindbaarToggle(false)
  }

  return (
    <div className="profiel">
      {/* Header */}
      <header className="sub-header profiel__header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title profiel__title">{profile.firstName}&apos;s profiel</h1>
      </header>

      {/* Hero: avatar + name + vindbaar */}
      <section className="profiel__hero">
        <div className="profiel__avatar">
          {profile.initials}
        </div>
        <h2 className="profiel__name">{profile.name}</h2>
        <p className="profiel__subtitle">{profile.subtitle}</p>

        {/* Vindbaar toggle + preview — two pills side by side */}
        <div className="profiel__vindbaar-hero profiel__vindbaar-hero--split">
          <div className="profiel__vindbaar-row">
            <span className={`profiel__vindbaar-status ${isVindbaar ? 'profiel__vindbaar-status--active' : ''}`}>
              <span className="profiel__vindbaar-dot" />
              {isVindbaar ? 'Vindbaar' : 'Niet vindbaar'}
            </span>
            <button
              className={`profiel__toggle ${isVindbaar ? 'profiel__toggle--on' : ''}`}
              onClick={handleToggleVindbaar}
              role="switch"
              aria-checked={isVindbaar}
              aria-label="Vindbaar voor budgethouders"
            >
              <span className="profiel__toggle-thumb" />
            </button>
          </div>
          <button className="profiel__preview-pill" onClick={() => onNavigate?.(PAGES.PROFIEL_PREVIEW)}>
            <EyeIcon />
            <span>Bekijk profiel</span>
          </button>
        </div>
      </section>

      {/* Bio card */}
      <div className="profiel__bio-area">
        <div className="profiel__bio-card">
          <h3 className="profiel__bio-title">Over mij</h3>
          <p className="profiel__bio-text">
            {showFullBio ? profile.bio : profile.bio.length > 108 ? profile.bio.slice(0, 108).trimEnd() + '…' : profile.bio}
            {profile.bio.length > 108 && (
              <button className={`profiel__bio-more${showFullBio ? ' profiel__bio-more--expanded' : ''}`} onClick={() => setShowFullBio(!showFullBio)}>{showFullBio ? '\u00A0Minder' : '\u00A0Meer'} <ChevronDownIcon /></button>
            )}
          </p>
          <button
            className="profiel__edit-btn"
            onClick={() => alert('Bewerk over mij (nog niet geimplementeerd)')}
            aria-label="Bewerk over mij"
          >
            <EditPencilIcon /> Bewerk over mij
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="profiel__sections">
        {/* Belangrijke informatie */}
        <section className="profiel__section">
          <h3 className="profiel__section-title">Mijn aanbod</h3>
          <div className="profiel__card">
            <ProfielListItem
              icon={HoldIcon}
              label="Mijn zorgcategorieën"
              onClick={() => onNavigate?.(PAGES.ZORGCATEGORIEEN)}
            />
            <ProfielListItem
              icon={LocationIcon}
              label="Mijn locaties"
              onClick={() => onNavigate?.(PAGES.MIJN_LOCATIES)}
            />
            <ProfielListItem
              icon={TimeHalfPassIcon}
              label="Mijn beschikbaarheid"
              onClick={() => onNavigate?.(PAGES.ZOEKPROFIEL)}
            />
            <ProfielListItem
              icon={EuroIcon}
              label="Mijn tarieven"
              onClick={() => onNavigate?.(PAGES.MIJN_TARIEVEN)}
            />
          </div>
        </section>

        {/* Werkervaring en registraties */}
        <section className="profiel__section">
          <h3 className="profiel__section-title">Werkervaring en registraties</h3>
          <div className="profiel__card">
            <ProfielListItem
              icon={BriefcaseIcon}
              label="Vul je CV aan"
              onClick={() => onNavigate(PAGES.CV_BEWERKEN)}
            />
            <ProfielListItem
              icon={CheckmarkBadgeIcon}
              label="Vul je registraties aan"
              onClick={() => onNavigate(PAGES.REGISTRATIES_BEWERKEN)}
            />
          </div>
        </section>

        {/* Overige */}
        <section className="profiel__section profiel__section--last">
          <h3 className="profiel__section-title">Overige</h3>
          <div className="profiel__card">
            <ProfielListItem
              icon={ChattingIcon}
              label="Mijn talen"
              onClick={() => onNavigate?.(PAGES.MIJN_TALEN)}
            />
            <ProfielListItem
              icon={TickIcon}
              label="Goed om te weten"
              onClick={() => onNavigate?.(PAGES.GOED_OM_TE_WETEN)}
            />
          </div>
        </section>
      </div>

      {/* Vindbaar toggle confirmation popup */}
      {showVindbaarToggle && (
        <div className="profiel__info-overlay" onClick={() => setShowVindbaarToggle(false)}>
          <div className="profiel__info-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="profiel__info-title">
              {isVindbaar ? 'Niet meer vindbaar?' : 'Vindbaar worden?'}
            </h3>
            <p className="profiel__info-text">
              {isVindbaar
                ? 'Als je niet vindbaar bent, kunnen nieuwe zorgvragers je niet meer vinden via Zoeken. Je bestaande connecties kunnen je profiel nog steeds zien.'
                : 'Als je vindbaar bent, kunnen nieuwe zorgvragers je vinden via Zoeken. Ze kunnen je profiel bekijken en contact met je opnemen.'}
            </p>
            <div className="profiel__info-actions">
              <button className="profiel__info-btn--secondary" onClick={() => setShowVindbaarToggle(false)}>
                Annuleren
              </button>
              <button className="profiel__info-btn" onClick={confirmToggle}>
                {isVindbaar ? 'Uitzetten' : 'Aanzetten'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vindbaar info popup */}
      {showVindbaarInfo && (
        <div className="profiel__info-overlay" onClick={() => setShowVindbaarInfo(false)}>
          <div className="profiel__info-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="profiel__info-title">Wat betekent vindbaar?</h3>
            <p className="profiel__info-text">
              Als je vindbaar bent, kunnen nieuwe zorgvragers je vinden via Zoeken. Ze kunnen je profiel bekijken en contact met je opnemen.
            </p>
            <p className="profiel__info-text">
              Als je niet vindbaar bent, ben je verborgen voor nieuwe zorgvragers. Je huidige connecties kunnen je profiel nog steeds zien.
            </p>
            <button className="profiel__info-btn" onClick={() => setShowVindbaarInfo(false)}>
              Begrepen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profiel
