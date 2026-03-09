import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { berichtenVerzoeken } from '../data/dummyData'
import { ChevronRightIcon } from '@shared/components/Icons'
import TopBar from '@shared/components/TopBar'
import MijnConnecties from './MijnConnecties'
import Beschikbaarheid from './Beschikbaarheid'
import NodigUit from './NodigUit'
import Zoeken from './Zoeken'
import ZorgverlenerProfiel from '@shared/pages/ZorgverlenerProfiel'
import './Carepool.css'

/* ---- Search icon (search-01.svg from Iconen) ---- */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.0001 1C5.47723 1 1.00008 5.47715 1.00008 11C1.00008 16.5228 5.47723 21 11.0001 21C13.4016 21 15.6052 20.1532 17.3292 18.7422L21.293 22.707C21.6836 23.0976 22.3166 23.0976 22.7071 22.707C23.0976 22.3165 23.0976 21.6835 22.7071 21.293L18.7432 17.3281C20.1537 15.6043 21.0001 13.4011 21.0001 11C21.0001 5.47715 16.5229 1 11.0001 1ZM11.0001 3C15.4184 3 19.0001 6.58172 19.0001 11C19.0001 15.4183 15.4184 19 11.0001 19C6.5818 19 3.00008 15.4183 3.00008 11C3.00008 6.58172 6.5818 3 11.0001 3Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Connections icon (user-multiple.svg from Iconen) ---- */
function ConnectionsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.12686 15.4502C7.11278 13.85 10.887 13.8501 13.8729 15.4502C13.9661 15.5001 14.0829 15.5595 14.2157 15.627C14.8081 15.9275 15.7266 16.3935 16.3563 16.9482C16.7446 17.2903 17.1612 17.7784 17.2382 18.4121C17.3225 19.106 16.9775 19.7168 16.3944 20.2168C15.3996 21.0698 14.2079 21.7499 12.6747 21.75H5.32607C3.79292 21.75 2.60121 21.0698 1.60635 20.2168C1.02324 19.7168 0.678323 19.106 0.762598 18.4121C0.839594 17.7786 1.25529 17.2903 1.64346 16.9482C2.2733 16.3934 3.19265 15.9275 3.78506 15.627C3.91776 15.5596 4.03381 15.5 4.12686 15.4502ZM17.4999 14.25C18.0268 14.25 18.7296 14.3911 19.4237 14.6064C20.1291 14.8253 20.8912 15.1413 21.5409 15.5303C22.1626 15.9025 22.8033 16.4136 23.0927 17.0723C23.2477 17.4254 23.3036 17.8278 23.1903 18.2451C23.0798 18.6523 22.8272 19.0039 22.4911 19.3037C21.5973 20.101 20.5115 20.75 19.1063 20.75H18.6161C18.2019 20.75 17.8661 20.4142 17.8661 20C17.8661 19.5858 18.2019 19.25 18.6161 19.25H19.1063C20.0007 19.25 20.7446 18.8513 21.4931 18.1836C21.6781 18.0184 21.729 17.9034 21.7431 17.8516C21.7542 17.81 21.7558 17.7594 21.7187 17.6748C21.6228 17.4571 21.3228 17.1482 20.7704 16.8174C20.2458 16.5033 19.5989 16.2313 18.9794 16.0391C18.3484 15.8433 17.8101 15.75 17.4999 15.75C17.0858 15.7499 16.7499 15.4142 16.7499 15C16.7499 14.5858 17.0858 14.2501 17.4999 14.25ZM13.1649 16.7725C10.6216 15.4095 7.37923 15.4095 4.83584 16.7725C4.69103 16.8501 4.5341 16.9303 4.371 17.0137C3.77873 17.3162 3.10494 17.6599 2.63564 18.0732C2.33955 18.3341 2.262 18.5107 2.25186 18.5928V18.6377C2.26162 18.7063 2.31701 18.8509 2.58193 19.0781C3.42643 19.8022 4.28374 20.25 5.32607 20.25H12.6747C13.7169 20.2499 14.5735 19.8021 15.4179 19.0781C15.7713 18.7751 15.7521 18.6188 15.7489 18.5938V18.5928C15.7388 18.5107 15.6613 18.3341 15.3651 18.0732C14.8959 17.6599 14.2221 17.3162 13.6298 17.0137C13.4668 16.9304 13.3097 16.85 13.1649 16.7725ZM8.9999 2.75C11.6233 2.75 13.7499 4.87665 13.7499 7.5C13.7499 10.1234 11.6233 12.25 8.9999 12.25C6.37669 12.2498 4.2499 10.1233 4.2499 7.5C4.2499 4.87675 6.37669 2.75016 8.9999 2.75ZM16.205 4.25C18.3712 4.25009 20.2499 5.86429 20.2499 8C20.2499 10.1357 18.3712 11.7499 16.205 11.75C15.9141 11.75 15.6293 11.7215 15.3544 11.667C14.9481 11.5864 14.684 11.1915 14.7646 10.7852C14.8452 10.379 15.2401 10.1147 15.6464 10.1953C15.8254 10.2308 16.0123 10.25 16.205 10.25C17.6784 10.2499 18.7499 9.17789 18.7499 8C18.7499 6.82211 17.6784 5.75008 16.205 5.75C16.0123 5.75 15.8254 5.7692 15.6464 5.80469C15.2401 5.88527 14.8452 5.62104 14.7646 5.21484C14.684 4.80855 14.9481 4.4136 15.3544 4.33301C15.6293 4.2785 15.9141 4.25 16.205 4.25ZM8.9999 4.25C7.20511 4.25016 5.7499 5.70517 5.7499 7.5C5.7499 9.29483 7.20511 10.7498 8.9999 10.75C10.7948 10.75 12.2499 9.29493 12.2499 7.5C12.2499 5.70507 10.7948 4.25 8.9999 4.25Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Chat bubble icon for chatverzoeken ---- */
function ChatBubbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 13.643 2.647 15.193 3.355 16.567L2.278 20.284C2.154 20.713 2.263 21.176 2.564 21.502C2.865 21.829 3.319 21.974 3.756 21.884L7.694 21.072C9.006 21.669 10.464 22 12 22C17.385 22 21.75 17.635 21.75 12.25C21.75 6.865 17.385 2.25 12 2.25ZM8 10.75C8 10.336 8.336 10 8.75 10H15.25C15.664 10 16 10.336 16 10.75C16 11.164 15.664 11.5 15.25 11.5H8.75C8.336 11.5 8 11.164 8 10.75ZM8.75 13C8.336 13 8 13.336 8 13.75C8 14.164 8.336 14.5 8.75 14.5H12.25C12.664 14.5 13 14.164 13 13.75C13 13.336 12.664 13 12.25 13H8.75Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Person icon for profile card ---- */
function PersonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C9.65279 2.75 7.75 4.65279 7.75 7C7.75 9.34721 9.65279 11.25 12 11.25C14.3472 11.25 16.25 9.34721 16.25 7C16.25 4.65279 14.3472 2.75 12 2.75ZM9.25 7C9.25 5.48122 10.4812 4.25 12 4.25C13.5188 4.25 14.75 5.48122 14.75 7C14.75 8.51878 13.5188 9.75 12 9.75C10.4812 9.75 9.25 8.51878 9.25 7ZM4.25 19.5C4.25 16.0482 7.04822 13.25 10.5 13.25H13.5C16.9518 13.25 19.75 16.0482 19.75 19.5C19.75 20.7426 18.7426 21.75 17.5 21.75H6.5C5.25736 21.75 4.25 20.7426 4.25 19.5ZM10.5 14.75C7.87665 14.75 5.75 16.8766 5.75 19.5C5.75 19.9142 6.08579 20.25 6.5 20.25H17.5C17.9142 20.25 18.25 19.9142 18.25 19.5C18.25 16.8766 16.1234 14.75 13.5 14.75H10.5Z" fill="currentColor"/>
    </svg>
  )
}

function Carepool({ initialSubPage = null, onNavigate, onSubPageChange, notificationCount, isVindbaar, onToggleVindbaar }) {
  const [subPage, setSubPage] = useState(initialSubPage)
  const [selectedZorgverlener, setSelectedZorgverlener] = useState(null)

  useEffect(() => {
    onSubPageChange?.(subPage)
  }, [subPage, onSubPageChange])

  if (subPage === SUB_PAGES.ZORGVERLENER_PROFIEL && selectedZorgverlener) {
    return (
      <ZorgverlenerProfiel
        onBack={() => setSubPage(SUB_PAGES.ZOEKEN)}
        zorgverlener={selectedZorgverlener}
      />
    )
  }

  if (subPage === SUB_PAGES.ZOEKEN) {
    return (
      <Zoeken
        onBack={() => setSubPage(null)}
        onSelectResult={(result) => {
          setSelectedZorgverlener(result)
          setSubPage(SUB_PAGES.ZORGVERLENER_PROFIEL)
        }}
      />
    )
  }

  if (subPage === SUB_PAGES.BESCHIKBAARHEID) {
    return <Beschikbaarheid onBack={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)} />
  }

  if (subPage === SUB_PAGES.NODIG_UIT) {
    return <NodigUit onBack={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)} />
  }

  if (subPage === SUB_PAGES.MIJN_CONNECTIES) {
    return (
      <MijnConnecties
        onBack={() => setSubPage(null)}
        onInvite={() => setSubPage(SUB_PAGES.NODIG_UIT)}
      />
    )
  }

  return (
    <div className="carepool">
      <TopBar title="Mijn Carepool" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} notificationCount={notificationCount} />

      {/* Hero section */}
      <section className="carepool__hero">
        <div className="carepool__hero-content">
          <h2 className="carepool__hero-title">
            Zorg die past bij{'\n'}het échte leven
          </h2>
          <p className="carepool__hero-subtitle">
            Vind zorgvragers in je buurt en bied hulp.
          </p>
          <button className="carepool__cta-btn" onClick={() => setSubPage(SUB_PAGES.ZOEKEN)}>
            <SearchIcon />
            Vind nieuwe zorgvragers
          </button>
        </div>
      </section>

      {/* Quick access cards */}
      <section className="carepool__cards">
        <button className="carepool__card" onClick={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)}>
          <div className="carepool__card-icon">
            <ConnectionsIcon />
          </div>
          <span className="carepool__card-label">Mijn Connecties</span>
        </button>
        <div className="carepool__card carepool__card--profiel" onClick={() => onNavigate(PAGES.PROFIEL)}>
          <div className="carepool__card-icon">
            <PersonIcon />
          </div>
          <span className="carepool__card-label">Mijn profiel</span>
          <div className="carepool__card-vindbaar" onClick={(e) => e.stopPropagation()}>
            <span className={`carepool__card-status ${isVindbaar ? 'carepool__card-status--active' : ''}`}>
              <span className="carepool__card-status-dot" />
              {isVindbaar ? 'Vindbaar' : 'Niet vindbaar'}
            </span>
            <button
              className={`carepool__toggle ${isVindbaar ? 'carepool__toggle--on' : ''}`}
              onClick={onToggleVindbaar}
              role="switch"
              aria-checked={isVindbaar}
              aria-label="Vindbaar voor budgethouders"
            >
              <span className="carepool__toggle-thumb" />
            </button>
          </div>
        </div>
      </section>

      {/* Chatverzoeken banner */}
      {berichtenVerzoeken.length > 0 && (
        <section className="carepool__verzoeken">
          <button className="carepool__verzoeken-card" onClick={() => onNavigate(PAGES.BERICHTEN)}>
<div className="carepool__verzoeken-content">
              <div className="carepool__verzoeken-top">
                <span className="carepool__verzoeken-title">Chatverzoeken</span>
                <span className="carepool__verzoeken-badge">{berichtenVerzoeken.length}</span>
              </div>
              <p className="carepool__verzoeken-preview">
                {berichtenVerzoeken.map(v => v.name.split(' ')[0]).join(', ')}
              </p>
            </div>
            <ChevronRightIcon />
          </button>
        </section>
      )}
    </div>
  )
}

export default Carepool
