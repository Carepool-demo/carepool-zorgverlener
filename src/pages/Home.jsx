import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import TopBar from '../components/TopBar'
import { SmallCareIcon, CareIcon, LinkIcon, PlusIcon } from '../components/Icons'
import ConnectionRow from '../components/ConnectionRow'
import { homeAppointments as appointments, careTemplates, homeConnections as connections } from '../data/dummyData'
import NodigUit from './NodigUit'
import './Home.css'

/* ---- Location icon (filled) ---- */
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.833008C11.5897 0.833008 14.4998 3.74331 14.5 7.33301C14.5 9.89002 12.8596 11.851 11.3203 13.1338C10.5423 13.7821 9.76648 14.2774 9.18652 14.6104C8.89597 14.7772 8.65299 14.9045 8.48145 14.9902C8.3957 15.0331 8.32762 15.0656 8.28027 15.0879C8.25822 15.0983 8.22146 15.115 8.20605 15.1221L8.20312 15.124C8.07391 15.1814 7.92609 15.1804 7.79688 15.123L7.79297 15.1221C7.74218 15.0982 7.60224 15.0321 7.51855 14.9902C7.34701 14.9045 7.10403 14.7772 6.81348 14.6104C6.23352 14.2774 5.4577 13.7821 4.67969 13.1338C3.14037 11.851 1.5 9.89002 1.5 7.33301C1.50018 3.74331 4.41026 0.833008 8 0.833008ZM8 4.66699C6.52735 4.66699 5.33318 5.8604 5.33301 7.33301C5.33301 8.80577 6.52724 10 8 10C9.47276 10 10.667 8.80577 10.667 7.33301C10.6668 5.8604 9.47265 4.66699 8 4.66699Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- User search icon (user-search-01.svg) ---- */
function UserSearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5624 10.7295C16.6795 10.7295 18.3954 12.4454 18.3954 14.5625C18.3954 15.3165 18.1776 16.0194 17.8017 16.6123L18.8212 17.6436C19.1447 17.9707 19.1422 18.4976 18.8153 18.8213C18.4882 19.1449 17.9603 19.1425 17.6366 18.8154L16.6259 17.7939C16.0302 18.1751 15.3221 18.3955 14.5624 18.3955C12.4453 18.3955 10.7294 16.6796 10.7294 14.5625C10.7294 12.4454 12.4453 10.7295 14.5624 10.7295ZM7.7255 11.0312C8.61181 10.9063 9.51302 10.9063 10.3993 11.0312C10.5901 11.0582 10.6681 11.2894 10.5497 11.4414C9.87873 12.3028 9.47941 13.386 9.47941 14.5625C9.47941 15.7502 9.88664 16.8426 10.5693 17.708C11.0233 18.2835 11.2503 18.5718 11.1825 18.7129C11.1142 18.8538 10.7827 18.8545 10.12 18.8545H5.38859C3.87337 18.8545 2.7017 18.1087 1.7255 17.1787C1.15973 16.6397 0.877586 16.0332 0.948161 15.3867C1.01462 14.7788 1.37984 14.2818 1.76457 13.9053C2.3797 13.3032 3.27801 12.797 3.87199 12.4619C4.00747 12.3855 4.12764 12.3175 4.22453 12.2598C5.31176 11.6125 6.5053 11.2033 7.7255 11.0312ZM14.5624 12.3955C13.3658 12.3955 12.3954 13.3659 12.3954 14.5625C12.3954 15.7591 13.3658 16.7295 14.5624 16.7295C15.759 16.7295 16.7294 15.7591 16.7294 14.5625C16.7294 13.3659 15.759 12.3955 14.5624 12.3955ZM9.06242 0.9375C11.4787 0.9375 13.4374 2.89625 13.4374 5.3125C13.4374 7.72874 11.4787 9.6875 9.06242 9.6875C6.64628 9.68737 4.68742 7.72866 4.68742 5.3125C4.68742 2.89633 6.64628 0.93763 9.06242 0.9375Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Home page ---- */
function Home({ onNavigate, onSubPageChange }) {
  const [subPage, setSubPage] = useState(null)

  useEffect(() => {
    onSubPageChange?.(subPage)
  }, [subPage, onSubPageChange])

  if (subPage === SUB_PAGES.NODIG_UIT) return <NodigUit onBack={() => setSubPage(null)} />

  return (
    <div className="home">
      <TopBar title="Home" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} />

      {/* Greeting */}
      <section className="home__greeting">
        <div className="home__greeting-content">
          <img src="./icons/handje.svg" alt="wave" className="home__wave-img" width="36" height="36" />
          <h2 className="home__greeting-text">Hi, Julie!</h2>
        </div>
      </section>

      {/* Komende afspraken */}
      <section className="home__section">
        <h3 className="home__section-title">Komende afspraken</h3>
        <div className="home__appointments hide-scrollbar">
          {appointments.map((apt) => (
            <article key={apt.id} className="appointment-card">
              <div className="appointment-card__header">
                <span className="appointment-card__date">{apt.date}</span>
                <span className="appointment-card__location">
                  <LocationIcon />
                  {apt.location}
                </span>
              </div>
              <div className="appointment-card__body">
                <SmallCareIcon type={apt.icon} />
                <span className="appointment-card__type">{apt.type}</span>
              </div>
              <div className="appointment-card__time">{apt.time}</div>
              <div className="appointment-card__caregiver">{apt.caregiver}</div>
            </article>
          ))}
        </div>
        <button className="home__section-link" onClick={() => onNavigate(PAGES.AGENDA)}>Bekijk je agenda →</button>
      </section>

      {/* Plan een zorgmoment */}
      <section className="home__section">
        <div className="home__section-header">
          <h3 className="home__section-title">Plan een zorgmoment</h3>
          <button className="home__add-btn" onClick={() => onNavigate(PAGES.AGENDA, SUB_PAGES.NIEUWE_AFSPRAAK)}>
            <PlusIcon />
            Nieuw
          </button>
        </div>
        <div className="home__templates hide-scrollbar">
          {careTemplates.map((tpl) => (
            <button key={tpl.id} className="template-item" onClick={() => onNavigate(PAGES.AGENDA, SUB_PAGES.NIEUWE_AFSPRAAK)}>
              <div className="template-item__icon">
                <CareIcon type={tpl.icon} />
              </div>
              <span className="template-item__label">{tpl.label}</span>
              {tpl.sublabel && (
                <span className="template-item__sublabel">{tpl.sublabel}</span>
              )}
            </button>
          ))}
        </div>
        <button className="home__section-link" onClick={() => onNavigate(PAGES.SJABLONEN)}>Alle sjablonen →</button>
      </section>

      {/* Mijn connecties */}
      <section className="home__section">
        <div className="home__section-header">
          <h3 className="home__section-title">Mijn connecties</h3>
          <button className="home__invite-link" onClick={() => setSubPage(SUB_PAGES.NODIG_UIT)}>
            <LinkIcon />
            Nodig iemand uit
          </button>
        </div>
        <div className="home__connections">
          {connections.map((conn) => (
            <ConnectionRow key={conn.id} size="lg" {...conn} />
          ))}
        </div>
        <button className="home__section-link" onClick={() => onNavigate(PAGES.CAREPOOL, SUB_PAGES.MIJN_CONNECTIES)}>Alle connecties →</button>
      </section>

      {/* Zoek een zorgverlener */}
      <section className="home__section home__section--last">
        <h3 className="home__section-title">Zoek een zorgverlener</h3>
        <div className="home__search">
          <div className="home__search-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="home__search-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0015 1.25C15.8275 1.25016 19.4775 3.51344 21.0054 7.08496C22.4254 10.4047 21.6589 13.2365 20.0581 15.6611C18.7303 17.6723 16.7865 19.4628 15.0386 21.0732C14.7282 21.3592 14.4239 21.6392 14.1304 21.9141C13.5554 22.4523 12.7917 22.7499 12.0015 22.75C11.2111 22.75 10.4466 22.4524 9.87158 21.9141L9.87061 21.9131C9.56 21.6205 9.23646 21.3215 8.90674 21.0166C7.17772 19.4177 5.26078 17.645 3.94678 15.6592C2.34427 13.2371 1.57487 10.4086 2.99658 7.08496C4.5245 3.51331 8.1753 1.25 12.0015 1.25ZM12.0015 2.75C8.74208 2.75 5.65431 4.68544 4.37549 7.6748C3.20207 10.418 3.79544 12.7127 5.19775 14.832C6.40233 16.6525 8.15829 18.278 9.88916 19.8809C10.2277 20.1944 10.5656 20.5072 10.8979 20.8203C11.1902 21.0935 11.5857 21.25 12.0015 21.25C12.4175 21.2499 12.8127 21.093 13.105 20.8193C13.4171 20.527 13.7336 20.2345 14.0513 19.9414C15.8045 18.3238 17.5886 16.6781 18.8062 14.834C20.207 12.7121 20.7983 10.4143 19.6265 7.6748C18.3477 4.68557 15.2607 2.75016 12.0015 2.75ZM12.0005 6.75C14.3475 6.75026 16.2505 8.65295 16.2505 11C16.2505 13.347 14.3475 15.2497 12.0005 15.25C9.65328 15.25 7.75049 13.3472 7.75049 11C7.75049 8.65279 9.65328 6.75 12.0005 6.75ZM12.0005 8.25C10.4817 8.25 9.25049 9.48122 9.25049 11C9.25049 12.5188 10.4817 13.75 12.0005 13.75C13.519 13.7497 14.7505 12.5186 14.7505 11C14.7505 9.48138 13.519 8.25026 12.0005 8.25Z" fill="#BFAAEE"/>
            </svg>
            <input type="text" placeholder="Plaats of postcode" />
          </div>
          <button className="home__search-btn" onClick={() => alert('Zoeken (nog niet geïmplementeerd)')}>
            <UserSearchIcon />
            Zoek
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
