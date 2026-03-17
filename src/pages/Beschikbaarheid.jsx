import { useState } from 'react'
import { BackArrowIcon, ChevronRightIcon, BeschikbaarheidClockIcon, CalendarIcon, InfoIcon } from '@shared/components/Icons'
import VasteBeschikbaarheid from './VasteBeschikbaarheid'
import Uitzonderingen from './Uitzonderingen'
import './Beschikbaarheid.css'

/* ---- Beschikbaarheid hub page ---- */
function Beschikbaarheid({ onBack }) {
  const [subPage, setSubPage] = useState(null)

  if (subPage === 'vaste') {
    return <VasteBeschikbaarheid onBack={() => setSubPage(null)} />
  }
  if (subPage === 'uitzonderingen') {
    return <Uitzonderingen onBack={() => setSubPage(null)} />
  }

  return (
    <div className="beschikbaarheid">
      {/* Header */}
      <header className="sub-header">
        <button className="sub-header__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn beschikbaarheid</h1>
      </header>

      <div className="beschikbaarheid__body">
        {/* Intro */}
        <p className="beschikbaarheid__intro">
          Vul je beschikbaarheid in zodat je verzoeken van zorgvragers kunt ontvangen.
        </p>

        {/* Option cards */}
        <div className="beschikbaarheid__options">
          <button className="beschikbaarheid__option" onClick={() => setSubPage('vaste')}>
            <div className="beschikbaarheid__option-icon">
              <BeschikbaarheidClockIcon />
            </div>
            <div className="beschikbaarheid__option-text">
              <span className="beschikbaarheid__option-title">Vaste beschikbaarheid</span>
              <span className="beschikbaarheid__option-subtitle">Stel je wekelijkse werktijden in</span>
            </div>
            <ChevronRightIcon />
          </button>
          <button className="beschikbaarheid__option" onClick={() => setSubPage('uitzonderingen')}>
            <div className="beschikbaarheid__option-icon">
              <CalendarIcon />
            </div>
            <div className="beschikbaarheid__option-text">
              <span className="beschikbaarheid__option-title">Uitzonderingen</span>
              <span className="beschikbaarheid__option-subtitle">Vakanties, vrije dagen en meer</span>
            </div>
            <ChevronRightIcon />
          </button>
        </div>

        {/* Info link */}
        <button className="beschikbaarheid__info-link">
          <span>Wie kan mijn beschikbaarheid zien?</span>
          <InfoIcon />
        </button>
      </div>
    </div>
  )
}

export default Beschikbaarheid
