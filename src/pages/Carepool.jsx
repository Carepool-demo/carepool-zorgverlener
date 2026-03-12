import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { berichtenVerzoeken, berichtenChats } from '../data/dummyData'
import { ChevronRightIcon, AgreementIcon } from '@shared/components/Icons'
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.12686 15.4502C7.11278 13.85 10.887 13.8501 13.8729 15.4502C13.9661 15.5001 14.0829 15.5595 14.2157 15.627C14.8081 15.9275 15.7266 16.3935 16.3563 16.9482C16.7446 17.2903 17.1612 17.7784 17.2382 18.4121C17.3225 19.106 16.9775 19.7168 16.3944 20.2168C15.3996 21.0698 14.2079 21.7499 12.6747 21.75H5.32607C3.79292 21.75 2.60121 21.0698 1.60635 20.2168C1.02324 19.7168 0.678323 19.106 0.762598 18.4121C0.839594 17.7786 1.25529 17.2903 1.64346 16.9482C2.2733 16.3934 3.19265 15.9275 3.78506 15.627C3.91776 15.5596 4.03381 15.5 4.12686 15.4502ZM17.4999 14.25C18.0268 14.25 18.7296 14.3911 19.4237 14.6064C20.1291 14.8253 20.8912 15.1413 21.5409 15.5303C22.1626 15.9025 22.8033 16.4136 23.0927 17.0723C23.2477 17.4254 23.3036 17.8278 23.1903 18.2451C23.0798 18.6523 22.8272 19.0039 22.4911 19.3037C21.5973 20.101 20.5115 20.75 19.1063 20.75H18.6161C18.2019 20.75 17.8661 20.4142 17.8661 20C17.8661 19.5858 18.2019 19.25 18.6161 19.25H19.1063C20.0007 19.25 20.7446 18.8513 21.4931 18.1836C21.6781 18.0184 21.729 17.9034 21.7431 17.8516C21.7542 17.81 21.7558 17.7594 21.7187 17.6748C21.6228 17.4571 21.3228 17.1482 20.7704 16.8174C20.2458 16.5033 19.5989 16.2313 18.9794 16.0391C18.3484 15.8433 17.8101 15.75 17.4999 15.75C17.0858 15.7499 16.7499 15.4142 16.7499 15C16.7499 14.5858 17.0858 14.2501 17.4999 14.25ZM13.1649 16.7725C10.6216 15.4095 7.37923 15.4095 4.83584 16.7725C4.69103 16.8501 4.5341 16.9303 4.371 17.0137C3.77873 17.3162 3.10494 17.6599 2.63564 18.0732C2.33955 18.3341 2.262 18.5107 2.25186 18.5928V18.6377C2.26162 18.7063 2.31701 18.8509 2.58193 19.0781C3.42643 19.8022 4.28374 20.25 5.32607 20.25H12.6747C13.7169 20.2499 14.5735 19.8021 15.4179 19.0781C15.7713 18.7751 15.7521 18.6188 15.7489 18.5938V18.5928C15.7388 18.5107 15.6613 18.3341 15.3651 18.0732C14.8959 17.6599 14.2221 17.3162 13.6298 17.0137C13.4668 16.9304 13.3097 16.85 13.1649 16.7725ZM8.9999 2.75C11.6233 2.75 13.7499 4.87665 13.7499 7.5C13.7499 10.1234 11.6233 12.25 8.9999 12.25C6.37669 12.2498 4.2499 10.1233 4.2499 7.5C4.2499 4.87675 6.37669 2.75016 8.9999 2.75ZM16.205 4.25C18.3712 4.25009 20.2499 5.86429 20.2499 8C20.2499 10.1357 18.3712 11.7499 16.205 11.75C15.9141 11.75 15.6293 11.7215 15.3544 11.667C14.9481 11.5864 14.684 11.1915 14.7646 10.7852C14.8452 10.379 15.2401 10.1147 15.6464 10.1953C15.8254 10.2308 16.0123 10.25 16.205 10.25C17.6784 10.2499 18.7499 9.17789 18.7499 8C18.7499 6.82211 17.6784 5.75008 16.205 5.75C16.0123 5.75 15.8254 5.7692 15.6464 5.80469C15.2401 5.88527 14.8452 5.62104 14.7646 5.21484C14.684 4.80855 14.9481 4.4136 15.3544 4.33301C15.6293 4.2785 15.9141 4.25 16.205 4.25ZM8.9999 4.25C7.20511 4.25016 5.7499 5.70517 5.7499 7.5C5.7499 9.29483 7.20511 10.7498 8.9999 10.75C10.7948 10.75 12.2499 9.29493 12.2499 7.5C12.2499 5.70507 10.7948 4.25 8.9999 4.25Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Bookmark icon (outline) for Opgeslagen card ---- */
function BookmarkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.03623 1.833C9.25 1.833 10.2 1.833 10.93 1.927C11.67 2.023 12.17 2.2 12.55 2.56C12.93 2.92 13.11 3.41 13.2 4.08C13.29 4.73 13.29 5.58 13.29 6.65V12.03C13.29 12.73 13.29 13.28 13.22 13.67C13.16 14.05 13.04 14.32 12.8 14.45C12.57 14.57 12.3 14.55 12.03 14.47C11.76 14.38 11.46 14.22 11.15 14.03C10.84 13.83 10.5 13.58 10.22 13.37C9.94 13.17 9.72 13 9.55 12.9C9.31 12.75 9.16 12.66 9.04 12.6C8.88 12.53 8.79 12.5 8 12.5C7.21 12.5 7.12 12.53 6.96 12.6C6.84 12.66 6.69 12.75 6.45 12.9C6.28 13 6.06 13.17 5.78 13.37C5.5 13.58 5.16 13.83 4.85 14.03C4.54 14.22 4.24 14.38 3.97 14.47C3.7 14.55 3.43 14.57 3.2 14.45C2.96 14.32 2.84 14.05 2.78 13.67C2.71 13.28 2.71 12.73 2.71 12.03V6.65C2.71 5.58 2.71 4.73 2.8 4.08C2.89 3.41 3.07 2.92 3.45 2.56C3.83 2.2 4.33 2.023 5.07 1.927C5.8 1.833 6.75 1.833 7.96 1.833H8.04Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )
}

/* ---- Chatting icon for Reacties card ---- */
function ChattingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.498 10.25C19.944 10.25 22.7479 12.9459 22.748 16.2598C22.748 17.8088 22.1401 19.2785 21.0371 20.3975L21.0283 20.4062C20.9807 20.4529 20.9593 20.4993 20.9551 20.5176C21.0231 20.8706 21.1725 21.1908 21.3975 21.4668C21.5644 21.6718 21.6105 21.9503 21.5205 22.1982C21.4295 22.4462 21.215 22.6277 20.9551 22.6768C20.6941 22.7258 20.43 22.75 20.166 22.75C19.4644 22.7498 18.7663 22.578 18.1416 22.2432L18.0654 22.2031C18.0125 22.1751 17.9541 22.145 17.9102 22.123C17.8842 22.127 17.8541 22.1317 17.8281 22.1357C17.7882 22.1427 17.7432 22.1502 17.6943 22.1582C17.3183 22.2322 16.916 22.2705 16.498 22.2705C13.052 22.2705 10.248 19.5738 10.248 16.2598C10.2482 12.9459 13.0521 10.25 16.498 10.25ZM16.499 11.75C13.8801 11.75 11.7491 13.7729 11.749 16.2598C11.749 18.7468 13.88 20.7705 16.499 20.7705C16.824 20.7705 17.132 20.7406 17.416 20.6836C17.426 20.6816 17.4363 20.6797 17.4463 20.6787C17.4962 20.6707 17.5411 20.6642 17.5811 20.6572C17.783 20.6232 17.9583 20.5939 18.1553 20.6299H18.1562C18.3541 20.6609 18.519 20.7471 18.7598 20.873L18.8389 20.9141C18.8389 20.9141 18.8446 20.9169 18.8477 20.9189C19.0787 21.0429 19.3261 21.1345 19.5801 21.1885C19.5401 21.0575 19.5064 20.924 19.4814 20.7891C19.3855 20.2801 19.5687 19.7389 19.9736 19.3389C20.7956 18.5029 21.249 17.4098 21.249 16.2598C21.2489 13.7729 19.118 11.75 16.499 11.75ZM11.0791 1.25C15.7971 1.25004 19.8583 4.44852 20.7363 8.85449C20.817 9.26019 20.5531 9.6552 20.1475 9.73633C19.7406 9.81531 19.3458 9.55329 19.2646 9.14746C18.5257 5.44148 15.0841 2.751 11.0801 2.75098C6.48708 2.75098 2.75098 6.27733 2.75098 10.6113C2.75105 12.6152 3.55002 14.5225 5.00195 15.9824C5.55877 16.5453 5.80462 17.2538 5.67773 17.9287C5.58973 18.3867 5.44598 18.8282 5.25098 19.2422C6.01198 19.2082 6.7625 19.0074 7.4375 18.6484L7.44824 18.6416L7.55176 18.5889C7.96276 18.3789 8.16939 18.2746 8.40039 18.2266C8.4263 18.2216 8.45359 18.2169 8.47949 18.2139C8.66227 18.196 8.85915 18.2108 9.1377 18.2627C9.54455 18.3397 9.81304 18.7318 9.7373 19.1387C9.66033 19.5456 9.26921 19.8141 8.86133 19.7383C8.76733 19.7203 8.7069 19.713 8.6709 19.709C8.57993 19.748 8.4042 19.8379 8.2334 19.9248L8.13379 19.9766C7.17489 20.4854 6.09845 20.7471 5.0166 20.7471L5.01562 20.7461C4.61485 20.7461 4.21416 20.7097 3.81738 20.6367C3.55544 20.5887 3.33808 20.4062 3.24805 20.1562C3.15705 19.9062 3.205 19.6259 3.375 19.4209C3.7899 18.92 4.0761 18.3073 4.20312 17.6484C4.25113 17.3904 4.03157 17.1351 3.93457 17.0371C2.20375 15.2962 1.25008 13.0122 1.25 10.6104C1.25 5.44935 5.6591 1.25 11.0791 1.25Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Person icon for profile card ---- */
function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            Vind mensen die zorg nodig hebben in je buurt en bied je hulp aan.
          </p>
          <button className="carepool__cta-btn" onClick={() => setSubPage(SUB_PAGES.ZOEKEN)}>
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
        <button className="carepool__card" onClick={() => alert('Opgeslagen (nog niet geimplementeerd)')}>
          <div className="carepool__card-icon">
            <BookmarkIcon />
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
