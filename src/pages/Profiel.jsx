import { BackArrowIcon, ChevronRightIcon } from '../components/Icons'
import { profielData } from '../data/dummyData'
import './Profiel.css'

/* ---- Page-specific icons ---- */
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM5.51859 6L12 11.6712L18.4814 6H5.51859ZM20 7.32877L12.6585 13.7526C12.2815 14.0825 11.7185 14.0825 11.3415 13.7526L4 7.32877V18H20V7.32877Z" fill="currentColor"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
    </svg>
  )
}

function CakeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C13.11 6 14 5.1 14 4C14 3.62 13.9 3.27 13.71 2.97L12 0L10.29 2.97C10.1 3.27 10 3.62 10 4C10 5.1 10.9 6 12 6ZM16.6 16L15.53 14.92L14.45 16C13.15 17.29 10.87 17.3 9.56 16L8.49 14.92L7.4 16C6.75 16.64 5.88 17 4.96 17C4.23 17 3.56 16.77 3 16.39V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V16.39C20.44 16.77 19.77 17 19.04 17C18.12 17 17.25 16.64 16.6 16ZM18 9H13V7H11V9H6C4.34 9 3 10.34 3 12V13.54C3 14.62 3.88 15.5 4.96 15.5C5.48 15.5 5.98 15.3 6.34 14.93L8.48 12.8L10.61 14.93C11.35 15.67 12.64 15.67 13.38 14.93L15.52 12.8L17.66 14.93C18.02 15.3 18.51 15.5 19.04 15.5C20.12 15.5 21 14.62 21 13.54V12C21 10.34 19.66 9 18 9Z" fill="currentColor"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor"/>
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Profiel page ---- */
function Profiel({ onBack, onNavigate }) {
  const profile = profielData

  return (
    <div className="profiel">
      {/* Header */}
      <header className="profiel__header">
        <button className="profiel__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="profiel__title">Profiel</h1>
      </header>

      {/* Avatar & name */}
      <section className="profiel__hero">
        <div className="profiel__avatar">
          {profile.initials}
        </div>
        <h2 className="profiel__name">{profile.name}</h2>
      </section>

      {/* Contact info */}
      <section className="profiel__section">
        <h3 className="profiel__section-title">Contactgegevens</h3>
        <div className="profiel__card">
          <div className="profiel__row">
            <div className="profiel__row-icon"><EmailIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">E-mail</span>
              <span className="profiel__row-value">{profile.email}</span>
            </div>
          </div>
          <div className="profiel__row">
            <div className="profiel__row-icon"><PhoneIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Telefoon</span>
              <span className="profiel__row-value">{profile.phone}</span>
            </div>
          </div>
          <div className="profiel__row">
            <div className="profiel__row-icon"><LocationIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Adres</span>
              <span className="profiel__row-value">{profile.address}</span>
            </div>
          </div>
          <div className="profiel__row profiel__row--last">
            <div className="profiel__row-icon"><CakeIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Geboortedatum</span>
              <span className="profiel__row-value">{profile.birthDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Zorg info */}
      <section className="profiel__section">
        <h3 className="profiel__section-title">Zorginformatie</h3>
        <div className="profiel__card">
          <div className="profiel__row">
            <div className="profiel__row-icon"><HeartIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Indicatie</span>
              <span className="profiel__row-value">{profile.indicatie}</span>
            </div>
          </div>
          <div className="profiel__row">
            <div className="profiel__row-icon"><WalletIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Budget</span>
              <span className="profiel__row-value">{profile.budget}</span>
            </div>
          </div>
          <div className="profiel__row">
            <div className="profiel__row-icon"><ShieldIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">Zorgkantoor</span>
              <span className="profiel__row-value">{profile.zorgkantoor}</span>
            </div>
          </div>
          <div className="profiel__row profiel__row--last">
            <div className="profiel__row-icon"><ShieldIcon /></div>
            <div className="profiel__row-content">
              <span className="profiel__row-label">BSN</span>
              <span className="profiel__row-value">{profile.bsn}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="profiel__section profiel__section--last">
        <h3 className="profiel__section-title">Instellingen</h3>
        <div className="profiel__card">
          <button className="profiel__link-row" onClick={() => alert('Notificatie-instellingen (nog niet geïmplementeerd)')}>
            <span>Notificaties</span>
            <ChevronRightIcon />
          </button>
          <button className="profiel__link-row profiel__link-row--last" onClick={() => alert('Privacy-instellingen (nog niet geïmplementeerd)')}>
            <span>Privacy</span>
            <ChevronRightIcon />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profiel
