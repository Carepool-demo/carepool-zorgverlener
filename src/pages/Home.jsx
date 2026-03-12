import { showToast } from '@shared/components/Toast'
import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import TopBar from '@shared/components/TopBar'
import { SmallCareIcon, LinkIcon, PlusIcon, LocationIcon, TimeHalfPassIcon, UserSearchIcon } from '@shared/components/Icons'
import ConnectionRow from '@shared/components/ConnectionRow'
import { homeAppointments as appointments, openstaandeVerzoeken, homeConnections as connections } from '../data/dummyData'
import NodigUit from './NodigUit'
import AlleVerzoeken from './AlleVerzoeken'
import VerzoekItem from '../components/VerzoekItem'
import './Home.css'

/* ---- Arrow right icon (small) ---- */
function ArrowRightSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3.33301L10.6667 7.99967L6 12.6663" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ---- Note/log icon (for card log button) ---- */
function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.333 0.75C11.7012 0.75 12 1.0488 12 1.41699V1.67188C12.5684 1.75662 13.0495 1.93038 13.4346 2.31543C13.8358 2.71671 14.0082 3.22219 14.0889 3.82227C14.1666 4.40023 14.167 5.13519 14.167 6.04688V10.7861C14.167 11.6976 14.1665 12.4328 14.0889 13.0107C14.0082 13.6107 13.8357 14.1163 13.4346 14.5176C13.0333 14.9189 12.5278 15.0912 11.9277 15.1719C11.3498 15.2496 10.6148 15.25 9.70312 15.25H8.01172L6.78027 12.9326L6.75195 12.8867C6.42514 12.3663 6.15159 11.9322 5.88965 11.6201C5.61365 11.2913 5.29704 11.0326 4.8623 10.9541C4.24628 10.8429 3.55575 11.0975 3.01074 11.376C2.6074 11.582 2.22421 11.8336 1.91309 12.0645C1.89052 11.9662 1.87205 11.8663 1.86133 11.7627C1.83376 11.4961 1.833 11.1729 1.83301 10.793V6.04688C1.83299 5.1352 1.83344 4.40023 1.91113 3.82227C1.99181 3.22219 2.16415 2.71671 2.56543 2.31543C2.95048 1.93038 3.43155 1.75662 4 1.67188V1.41699C4 1.0488 4.2988 0.75 4.66699 0.75C5.03503 0.750176 5.33301 1.04891 5.33301 1.41699V1.58789C5.6295 1.58355 5.95043 1.583 6.29688 1.58301H7.33301V1.41699C7.33301 1.0488 7.63181 0.75 8 0.75C8.36819 0.75 8.66699 1.0488 8.66699 1.41699V1.58301H9.70312C10.0496 1.583 10.3705 1.58355 10.667 1.58789V1.41699C10.667 1.04891 10.965 0.750176 11.333 0.75ZM4.68457 11.9375C4.79386 11.9572 4.92093 12.0208 5.12402 12.2627C5.33431 12.5132 5.56825 12.884 5.91406 13.4346L6.84473 15.1865C6.65462 15.1345 6.47342 15.0464 6.25 14.9346L6.21289 14.916L3.56152 13.5898C3.22177 13.42 2.93311 13.2757 2.70703 13.1318C2.60792 13.0688 2.51676 12.9997 2.43066 12.9258C2.71503 12.7087 3.08367 12.4618 3.46582 12.2666C3.98217 12.0028 4.4147 11.8888 4.68457 11.9375ZM5.33301 8.91699C5.05702 8.91717 4.83301 9.14096 4.83301 9.41699C4.83318 9.69288 5.05712 9.91682 5.33301 9.91699H10.667C10.9429 9.91682 11.1668 9.69288 11.167 9.41699C11.167 9.14096 10.943 8.91717 10.667 8.91699H5.33301ZM5.33301 5.58301C5.05712 5.58318 4.83318 5.80712 4.83301 6.08301C4.83301 6.35904 5.05702 6.58283 5.33301 6.58301H8C8.27614 6.58301 8.5 6.35915 8.5 6.08301C8.49982 5.80702 8.27603 5.58301 8 5.58301H5.33301Z" fill="currentColor" />
    </svg>
  )
}


/* ---- Home page ---- */
function Home({ onNavigate, onSubPageChange, notificationCount }) {
  const [subPage, setSubPage] = useState(null)
  const [waving, setWaving] = useState(true)

  useEffect(() => {
    onSubPageChange?.(subPage)
  }, [subPage, onSubPageChange])

  if (subPage === SUB_PAGES.NODIG_UIT) return <NodigUit onBack={() => setSubPage(null)} />
  if (subPage === SUB_PAGES.ALLE_VERZOEKEN) return <AlleVerzoeken onBack={() => setSubPage(null)} />

  return (
    <div className="home">
      <TopBar title="Home" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} notificationCount={notificationCount} />

      {/* Greeting */}
      <section className="home__greeting">
        <div className="home__greeting-content">
          <img
            src="./icons/handje.svg"
            alt="wave"
            className={`home__wave-img${waving ? ' home__wave-img--waving' : ''}`}
            width="36"
            height="36"
            onClick={() => { setWaving(false); requestAnimationFrame(() => setWaving(true)) }}
            onAnimationEnd={() => setWaving(false)}
            style={{ cursor: 'pointer' }}
          />
          <h2 className="home__greeting-text">Hi, Nisha!</h2>
        </div>
      </section>

      {/* Komende afspraken */}
      <section className="home__section home__section--no-pad-bottom">
        <div className="home__section-header">
          <h3 className="home__section-title">Komende afspraken</h3>
          <button className="home__inline-link" onClick={() => onNavigate(PAGES.AGENDA)}>
            Alle afspraken <ArrowRightSmall />
          </button>
        </div>
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
              <div className="appointment-card__center">
                <div className="appointment-card__time">{apt.time}</div>
                <div className="appointment-card__client">{apt.client}</div>
              </div>
              <div className="appointment-card__footer">
                <div className="appointment-card__care-type">
                  <SmallCareIcon type={apt.icon} />
                  <span>{apt.type}</span>
                </div>
                <button className="appointment-card__log-btn" aria-label="Log zorgmoment">
                  <NoteIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Beschikbaarheid CTA */}
      <section className="home__cta-section">
        <button className="home__beschikbaarheid-btn" onClick={() => onNavigate(PAGES.BESCHIKBAARHEID)}>
          <TimeHalfPassIcon />
          Beschikbaarheid
        </button>
      </section>

      {/* Openstaande verzoeken */}
      <section className="home__section home__section--verzoeken">
        <div className="home__section-header">
          <h3 className="home__section-title">Openstaande verzoeken</h3>
        </div>
        <div className="home__verzoeken-list">
          {openstaandeVerzoeken.map((verzoek) => (
            <VerzoekItem key={verzoek.id} verzoek={verzoek} />
          ))}
        </div>
        <button className="home__section-link" onClick={() => setSubPage(SUB_PAGES.ALLE_VERZOEKEN)}>
          Alle verzoeken <ArrowRightSmall />
        </button>
      </section>

      {/* Mijn Carepool */}
      <section className="home__section">
        <div className="home__section-header">
          <h3 className="home__section-title">Mijn Carepool</h3>
          <button className="home__invite-link" onClick={() => setSubPage(SUB_PAGES.NODIG_UIT)}>
            <PlusIcon />
            Voeg iemand toe
          </button>
        </div>
        <div className="home__connections">
          {connections.map((conn) => (
            <ConnectionRow key={conn.id} size="lg" {...conn} />
          ))}
        </div>
        <button className="home__section-link" onClick={() => onNavigate(PAGES.CAREPOOL, SUB_PAGES.MIJN_CONNECTIES)}>
          Alle connecties <ArrowRightSmall />
        </button>
      </section>

      {/* Zoek een nieuwe zorgvrager */}
      <section className="home__section home__section--last">
        <h3 className="home__section-title">Zoek een nieuwe zorgvrager</h3>
        <div className="home__search">
          <div className="home__search-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="home__search-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0015 1.25C15.8275 1.25016 19.4775 3.51344 21.0054 7.08496C22.4254 10.4047 21.6589 13.2365 20.0581 15.6611C18.7303 17.6723 16.7865 19.4628 15.0386 21.0732C14.7282 21.3592 14.4239 21.6392 14.1304 21.9141C13.5554 22.4523 12.7917 22.7499 12.0015 22.75C11.2111 22.75 10.4466 22.4524 9.87158 21.9141L9.87061 21.9131C9.56 21.6205 9.23646 21.3215 8.90674 21.0166C7.17772 19.4177 5.26078 17.645 3.94678 15.6592C2.34427 13.2371 1.57487 10.4086 2.99658 7.08496C4.5245 3.51331 8.1753 1.25 12.0015 1.25ZM12.0015 2.75C8.74208 2.75 5.65431 4.68544 4.37549 7.6748C3.20207 10.418 3.79544 12.7127 5.19775 14.832C6.40233 16.6525 8.15829 18.278 9.88916 19.8809C10.2277 20.1944 10.5656 20.5072 10.8979 20.8203C11.1902 21.0935 11.5857 21.25 12.0015 21.25C12.4175 21.2499 12.8127 21.093 13.105 20.8193C13.4171 20.527 13.7336 20.2345 14.0513 19.9414C15.8045 18.3238 17.5886 16.6781 18.8062 14.834C20.207 12.7121 20.7983 10.4143 19.6265 7.6748C18.3477 4.68557 15.2607 2.75016 12.0015 2.75ZM12.0005 6.75C14.3475 6.75026 16.2505 8.65295 16.2505 11C16.2505 13.347 14.3475 15.2497 12.0005 15.25C9.65328 15.25 7.75049 13.3472 7.75049 11C7.75049 8.65279 9.65328 6.75 12.0005 6.75ZM12.0005 8.25C10.4817 8.25 9.25049 9.48122 9.25049 11C9.25049 12.5188 10.4817 13.75 12.0005 13.75C13.519 13.7497 14.7505 12.5186 14.7505 11C14.7505 9.48138 13.519 8.25026 12.0005 8.25Z" fill="var(--color-cta-light, #BFAAEE)"/>
            </svg>
            <input type="text" placeholder="Plaats of postcode" />
          </div>
          <button className="home__search-btn" onClick={() => showToast('Zoeken (nog niet geïmplementeerd)')}>
            <UserSearchIcon />
            Zoek
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
