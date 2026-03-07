import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
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

/* ---- Megaphone icon (megaphone-02.svg from Iconen) ---- */
function MegaphoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6055 3.73539C16.2042 2.96854 17.1688 2.50401 18.3076 2.88676C19.4606 3.27376 19.8636 4.12043 20.4736 5.40043C22.1705 8.95932 22.1705 13.0417 20.4736 16.6006C19.8636 17.8806 19.4606 18.7273 18.3076 19.1143C18.0279 19.2082 17.759 19.251 17.4883 19.251V19.253C16.6563 19.253 15.8105 18.8466 14.6035 18.2676L13.748 17.8565C13.7457 19.0471 13.7206 19.6861 13.4141 20.1827C12.9991 20.8537 12.2799 21.25 11.5039 21.25H11.5029C11.435 21.25 11.3658 21.2472 11.2969 21.2413C10.6619 21.1842 10.0919 20.7572 8.95605 19.9053L7.75 19C6.586 18.127 6.25 17.454 6.25 16V15.0655C6.17518 15.0791 6.10952 15.0924 6.04395 15.0997C5.06608 15.2116 4.14412 14.9342 3.45215 14.3174C2.68815 13.6364 2.25 12.594 2.25 11.458V10.5459C2.25002 9.40997 2.68817 8.36755 3.45215 7.68657C4.14409 7.06978 5.06604 6.79237 6.04785 6.90532C6.23285 6.92532 6.43027 6.96868 6.82227 7.05668C7.21221 7.14464 7.59222 7.10171 7.95117 6.92973L14.6016 3.73637L14.9268 4.41215L14.6055 3.73539ZM7.75 16C7.75 16.988 7.85939 17.2068 8.65039 17.7998L9.84961 18.7002C10.5883 19.254 11.2204 19.7277 11.4316 19.7471C11.7166 19.7731 11.9877 19.6376 12.1377 19.3936C12.2496 19.2122 12.25 18.4187 12.25 17.5V17.1368L7.9502 15.0733C7.88433 15.0418 7.81728 15.015 7.75 14.9922V16ZM17.8301 4.30766C17.2951 4.1277 16.7499 4.36801 15.2529 5.08598L14.9258 4.41118L15.251 5.08696L8.59863 8.28129C8.48465 8.33594 8.36756 8.38036 8.25 8.42094V13.5772C8.368 13.6177 8.48438 13.6653 8.59863 13.7198L15.252 16.9141C16.7509 17.6331 17.2961 17.8734 17.8301 17.6934C18.3571 17.5164 18.5461 17.1611 19.1201 15.9561C20.6211 12.8071 20.6211 9.19396 19.1201 6.04496C18.5461 4.83996 18.3571 4.48466 17.8301 4.30766ZM5.88086 8.3936C5.31009 8.32867 4.82911 8.46695 4.4502 8.80473C4.00521 9.20172 3.75002 9.83599 3.75 10.545V11.4571C3.75001 12.1661 4.0052 12.8003 4.4502 13.1973C4.82913 13.5351 5.30916 13.6734 5.87598 13.6084C5.98598 13.5964 6.17719 13.5535 6.49219 13.4825C6.57807 13.4631 6.66399 13.4469 6.75 13.4346V8.5645C6.66436 8.55227 6.57863 8.53767 6.49316 8.5186C6.17716 8.4476 5.98686 8.4046 5.88086 8.3936Z" fill="currentColor"/>
    </svg>
  )
}

function Carepool({ initialSubPage = null, onNavigate, onSubPageChange }) {
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
      <TopBar title="Mijn Carepool" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} />

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
        <button className="carepool__card" onClick={() => alert('Mijn oproepjes (nog niet geïmplementeerd)')}>
          <div className="carepool__card-icon-wrapper">
            <div className="carepool__card-icon">
              <MegaphoneIcon />
            </div>
            <span className="carepool__card-badge">13</span>
          </div>
          <span className="carepool__card-label">Mijn oproepjes</span>
        </button>
      </section>
    </div>
  )
}

export default Carepool
