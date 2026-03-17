import { showToast } from '@shared/components/Toast'
import { useState, useEffect } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import TopBar from '@shared/components/TopBar'
import { SmallCareIcon, LinkIcon, PlusIcon, TimeHalfPassIcon, UserSearchIcon, ArrowRightSmall } from '@shared/components/Icons'

/* ---- Local icons (only used on appointment cards) ---- */
const LocationFilledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0.833008C11.5897 0.833008 14.4998 3.74331 14.5 7.33301C14.5 9.89002 12.8596 11.851 11.3203 13.1338C10.5423 13.7821 9.76648 14.2774 9.18652 14.6104C8.89597 14.7772 8.65299 14.9045 8.48145 14.9902C8.3957 15.0331 8.32762 15.0656 8.28027 15.0879C8.25822 15.0983 8.22146 15.115 8.20605 15.1221L8.20312 15.124C8.07391 15.1814 7.92609 15.1804 7.79688 15.123L7.79297 15.1221C7.74218 15.0982 7.60224 15.0321 7.51855 14.9902C7.34701 14.9045 7.10403 14.7772 6.81348 14.6104C6.23352 14.2774 5.4577 13.7821 4.67969 13.1338C3.14037 11.851 1.5 9.89002 1.5 7.33301C1.50018 3.74331 4.41026 0.833008 8 0.833008ZM8 4.66699C6.52735 4.66699 5.33318 5.8604 5.33301 7.33301C5.33301 8.80577 6.52724 10 8 10C9.47276 10 10.667 8.80577 10.667 7.33301C10.6668 5.8604 9.47265 4.66699 8 4.66699Z" fill="currentColor"/>
  </svg>
)

const Note02Icon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.1667 0.9375C14.6268 0.9375 14.9995 1.31042 14.9997 1.77051V2.0918C15.7105 2.19773 16.3122 2.41505 16.7936 2.89648C17.2948 3.39793 17.5102 4.02959 17.611 4.7793C17.7081 5.50168 17.7087 6.42121 17.7087 7.56055V13.4854C17.7087 14.6245 17.7081 15.5434 17.611 16.2656C17.5101 17.0154 17.295 17.648 16.7936 18.1494C16.2921 18.6507 15.6597 18.867 14.9098 18.9678C14.1875 19.0648 13.2688 19.0645 12.1296 19.0645H10.0143L8.47527 16.168L8.44011 16.1113C8.03167 15.461 7.69033 14.9175 7.36296 14.5273C7.01785 14.1162 6.62148 13.7925 6.07781 13.6943C5.30781 13.5554 4.44454 13.8737 3.76335 14.2217C3.25893 14.4794 2.77926 14.7944 2.39031 15.083C2.36209 14.9603 2.33927 14.8345 2.32585 14.7051C2.29141 14.372 2.29166 13.9679 2.29167 13.4932V7.56055C2.29166 6.42126 2.29229 5.50166 2.38933 4.7793C2.49015 4.02975 2.70573 3.39787 3.20671 2.89648C3.68782 2.41538 4.28949 2.19782 4.99968 2.0918L5.00066 1.77051C5.00083 1.31042 5.37354 0.9375 5.83366 0.9375C6.29372 0.937588 6.6665 1.31047 6.66667 1.77051V1.9873C7.03709 1.98206 7.43799 1.98144 7.87077 1.98145H9.16667V1.77051C9.16685 1.31058 9.53978 0.937764 9.99968 0.9375C10.4598 0.9375 10.8335 1.31042 10.8337 1.77051V1.98145H12.1296C12.5623 1.98144 12.9633 1.98206 13.3337 1.9873V1.77051C13.3338 1.31047 13.7066 0.937588 14.1667 0.9375ZM5.85613 14.9238C5.99273 14.9485 6.15106 15.0286 6.40495 15.3311C6.66777 15.6442 6.96107 16.1069 7.39324 16.7949L8.55632 18.9844C8.31872 18.9193 8.09239 18.8097 7.81316 18.6699L7.76726 18.6465L4.45281 16.9893C4.02813 16.7769 3.66707 16.5968 3.38445 16.417C3.26037 16.338 3.14552 16.2517 3.03777 16.1592C3.39311 15.8879 3.85407 15.5791 4.33171 15.335C4.97717 15.0052 5.51873 14.863 5.85613 14.9238ZM6.66667 11.1465C6.32175 11.1467 6.04185 11.4266 6.04167 11.7715C6.04185 12.1164 6.32175 12.3963 6.66667 12.3965H13.3337C13.6787 12.3964 13.9585 12.1165 13.9587 11.7715C13.9585 11.4265 13.6787 11.1466 13.3337 11.1465H6.66667ZM6.66667 6.98047C6.32164 6.98064 6.04167 7.2604 6.04167 7.60547C6.04202 7.95024 6.32186 8.23029 6.66667 8.23047H10.0007C10.3454 8.23021 10.6253 7.95019 10.6257 7.60547C10.6257 7.26045 10.3456 6.98073 10.0007 6.98047H6.66667Z" fill="currentColor"/>
  </svg>
)
import ConnectionRow from '@shared/components/ConnectionRow'
import { homeAppointments as appointments, openstaandeVerzoeken, homeConnections as connections } from '../data/dummyData'
import NodigUit from './NodigUit'
import AlleVerzoeken from './AlleVerzoeken'
import VerzoekItem from '../components/VerzoekItem'
import './Home.css'

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
                  <LocationFilledIcon />
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
                  <Note02Icon />
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
