import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { berichtenVerzoeken, berichtenChats } from '../data/dummyData'
import { ChevronRightIcon, AgreementIcon, SearchIcon, ConnectionsIcon, BookmarkOutlineIcon, ChattingIcon, PersonIcon } from '@shared/components/Icons'
import TopBar from '@shared/components/TopBar'
import MijnConnecties from './MijnConnecties'
import Beschikbaarheid from './Beschikbaarheid'
import NodigUit from './NodigUit'
import Zoeken from '@shared/pages/Zoeken'
import NogInOntwikkeling from './NogInOntwikkeling'
import ZorgverlenerProfiel from '@shared/pages/ZorgverlenerProfiel'
import './Carepool.css'

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
        onNavigate={onNavigate}
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

  if (subPage === SUB_PAGES.OPGESLAGEN) {
    return (
      <NogInOntwikkeling
        title="Opgeslagen"
        subtitle="Hier kan je in de toekomst profielen opslaan"
        onBack={() => setSubPage(null)}
      />
    )
  }

  if (subPage === SUB_PAGES.VIND_ZORGVRAGERS) {
    return (
      <NogInOntwikkeling
        title="Vind zorgvragers"
        subtitle="Hier kan je in de toekomst nieuwe zorgvragers vinden in je buurt"
        onBack={() => setSubPage(null)}
      />
    )
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
            Vind mensen die zorg nodig hebben in je buurt en bied je hulp aan.
          </p>
          <button className="carepool__cta-btn" onClick={() => setSubPage(SUB_PAGES.VIND_ZORGVRAGERS)}>
            <SearchIcon />
            Vind nieuwe zorgvragers
          </button>
        </div>
      </section>

      {/* Quick access cards — 2×2 grid */}
      <section className="carepool__cards">
        <button className="carepool__card" onClick={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)}>
          <div className="carepool__card-icon">
            <AgreementIcon size={24} />
          </div>
          <span className="carepool__card-label">Mijn Connecties</span>
        </button>
        <button className="carepool__card carepool__card--profiel" onClick={() => onNavigate(PAGES.PROFIEL)}>
          <span className={`carepool__card-vindbaar-label ${isVindbaar ? 'carepool__card-vindbaar-label--active' : ''}`}>
            <span className="carepool__card-vindbaar-dot" />
            {isVindbaar ? 'Vindbaar' : 'Niet vindbaar'}
          </span>
          <div className="carepool__card-icon">
            <PersonIcon />
          </div>
          <span className="carepool__card-label">Mijn profiel</span>
        </button>
        <button className="carepool__card" onClick={() => setSubPage(SUB_PAGES.OPGESLAGEN)}>
          <div className="carepool__card-icon">
            <BookmarkOutlineIcon />
          </div>
          <span className="carepool__card-label">Opgeslagen</span>
        </button>
        <button className="carepool__card carepool__card--reacties" onClick={() => onNavigate(PAGES.BERICHTEN, 'verzoeken')}>
          {(() => {
            const overigeChats = berichtenChats.filter(c => !c.isConnectie)
            const count = berichtenVerzoeken.length + overigeChats.length
            if (count === 0) return null
            return <span className="carepool__card-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.77965 1.82273C11.2369 1.72586 12.7601 1.72566 14.2204 1.82273C18.787 2.12629 22.4103 5.81258 22.7082 10.4224C22.7639 11.2848 22.7639 12.1768 22.7082 13.0392C22.4103 17.649 18.787 21.3353 14.2204 21.6389C12.7601 21.7359 11.2369 21.7357 9.77965 21.6389C9.21472 21.6013 8.59978 21.4677 8.05839 21.2448C7.8203 21.1467 7.65868 21.0804 7.54041 21.037C7.45909 21.0929 7.35108 21.1723 7.1938 21.2883C6.40136 21.8726 5.40092 22.2825 3.98117 22.248L3.93544 22.2469C3.66155 22.2403 3.36961 22.2334 3.13152 22.1873C2.84475 22.1318 2.48996 21.9931 2.26791 21.6145C2.02623 21.2025 2.12313 20.7858 2.21688 20.5234C2.30536 20.2757 2.45874 19.9852 2.61542 19.6885L2.6369 19.6478C3.10323 18.7641 3.23314 18.0419 2.98381 17.5604C2.15148 16.304 1.40272 14.7556 1.2918 13.0392C1.23607 12.1768 1.23607 11.2848 1.2918 10.4224C1.58972 5.81258 5.213 2.12629 9.77965 1.82273ZM7.75 9.5C7.75 9.91421 8.08579 10.25 8.5 10.25H12C12.4142 10.25 12.75 9.91421 12.75 9.5C12.75 9.08579 12.4142 8.75 12 8.75H8.5C8.08579 8.75 7.75 9.08579 7.75 9.5ZM7.75 14.5C7.75 14.9142 8.08579 15.25 8.5 15.25H15.5C15.9142 15.25 16.25 14.9142 16.25 14.5C16.25 14.0858 15.9142 13.75 15.5 13.75H8.5C8.08579 13.75 7.75 14.0858 7.75 14.5Z" fill="currentColor"/></svg>{count}</span>
          })()}
          <div className="carepool__card-icon">
            <ChattingIcon />
          </div>
          <span className="carepool__card-label">Verkennende gesprekken</span>
        </button>
      </section>

    </div>
  )
}

export default Carepool
