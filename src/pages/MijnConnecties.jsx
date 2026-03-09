import { showToast } from '@shared/components/Toast'
import { BackArrowIcon, LinkIcon, PlusIcon } from '@shared/components/Icons'
import ConnectionRow from '@shared/components/ConnectionRow'
import { teams, mijnConnecties as connections } from '../data/dummyData'
import './MijnConnecties.css'

/* ---- Page-specific icons ---- */
function UserGroupIcon() {
  return (
    <svg width="28" height="26" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6389 19.2979C14.2885 17.1231 18.9171 17.1231 22.5667 19.2979C22.6742 19.3619 22.8106 19.4382 22.9671 19.5264C23.6758 19.926 24.8018 20.5604 25.5696 21.3125C26.0517 21.7848 26.5326 22.4289 26.6204 23.2314C26.7142 24.0903 26.3352 24.8862 25.6135 25.5742C24.4215 26.7106 22.9449 27.6659 21.009 27.666H12.1965C10.2607 27.6659 8.78404 26.7106 7.59205 25.5742C6.87042 24.8862 6.49238 24.0903 6.58619 23.2314C6.67403 22.4289 7.15486 21.7848 7.63698 21.3125C8.40472 20.5606 9.52988 19.926 10.2385 19.5264C10.395 19.4382 10.5314 19.3619 10.6389 19.2979ZM3.55592 17.7373C5.60005 16.4178 8.03823 16.0284 10.3147 16.5693C10.8511 16.6968 11.1191 16.7607 11.1428 16.9424C11.1662 17.124 10.9046 17.2599 10.3811 17.5303C9.98414 17.7353 9.59483 17.9497 9.30885 18.1201C8.62452 18.5057 7.33568 19.2325 6.40455 20.1445C5.80366 20.7332 5.01354 21.7117 4.86647 23.0576C4.82113 23.473 4.84109 23.8712 4.9153 24.249C4.98955 24.6269 5.02701 24.8167 4.92799 24.916C4.82868 25.0151 4.66286 24.9909 4.33229 24.9424C2.91588 24.7346 1.95768 23.991 1.17213 23.1797C0.584903 22.5732 0.281724 21.875 0.356702 21.1289C0.427347 20.4282 0.816612 19.8637 1.20533 19.4512C1.81888 18.8001 2.72327 18.2484 3.2649 17.918C3.38057 17.8474 3.47971 17.7865 3.55592 17.7373ZM22.8919 16.5693C25.1682 16.0285 27.6057 16.4179 29.6497 17.7373C29.7259 17.7865 29.826 17.8474 29.9417 17.918C30.4834 18.2485 31.3879 18.8003 32.0012 19.4512C32.3899 19.8637 32.7783 20.4284 32.8489 21.1289C32.9239 21.875 32.6207 22.5731 32.0335 23.1797C31.248 23.9909 30.2905 24.7346 28.8743 24.9424C28.5435 24.9909 28.3779 25.015 28.2786 24.916C28.1793 24.8168 28.216 24.6271 28.2903 24.249C28.3645 23.8712 28.3854 23.473 28.3401 23.0576C28.1931 21.7118 27.4029 20.7332 26.802 20.1445C25.871 19.2325 24.5821 18.5057 23.8977 18.1201C23.6117 17.9497 23.2217 17.7354 22.8245 17.5303C22.3011 17.2599 22.0394 17.124 22.0628 16.9424C22.0865 16.7606 22.3553 16.6969 22.8919 16.5693ZM8.30104 7C8.53023 7 8.75588 7.01695 8.97584 7.04883C9.23801 7.08683 9.36939 7.10593 9.43678 7.21094C9.50366 7.31594 9.45735 7.45581 9.36354 7.73438C9.1233 8.44783 8.99342 9.20938 8.99342 10C8.9935 11.6531 9.56106 13.1788 10.5188 14.4053C10.7013 14.639 10.7921 14.7566 10.7639 14.877C10.7355 14.9969 10.6184 15.0566 10.384 15.1748C9.76142 15.4889 9.05254 15.667 8.30104 15.667C5.81777 15.6669 3.80513 13.7261 3.80494 11.333C3.80513 8.93996 5.81777 7.00006 8.30104 7ZM24.9046 7C27.3879 7 29.4014 8.93992 29.4016 11.333C29.4014 13.7261 27.3879 15.667 24.9046 15.667C24.1531 15.667 23.4441 15.4889 22.8215 15.1748C22.5872 15.0566 22.4701 14.9969 22.4417 14.877C22.4135 14.7566 22.5052 14.6391 22.6878 14.4053C23.6454 13.1789 24.2131 11.653 24.2131 10C24.2131 9.20946 24.0832 8.44777 23.843 7.73438C23.7492 7.4559 23.702 7.31593 23.7688 7.21094C23.8362 7.10588 23.9683 7.08686 24.2307 7.04883C24.4505 7.01699 24.6755 7.00001 24.9046 7ZM16.6028 4.33301C19.8503 4.33309 22.4827 6.87044 22.4827 10C22.4825 13.1294 19.8502 15.6659 16.6028 15.666C13.3553 15.666 10.7221 13.1295 10.7219 10C10.7219 6.87039 13.3552 4.33301 16.6028 4.33301Z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Page ---- */
function MijnConnecties({ onBack, onInvite }) {
  return (
    <div className="mijn-connecties">
      {/* Header */}
      <header className="mijn-connecties__header">
        <button className="mijn-connecties__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="mijn-connecties__title">Mijn connecties</h1>
      </header>

      {/* Teams section */}
      <section className="mijn-connecties__section">
        <div className="mijn-connecties__section-header">
          <h3 className="mijn-connecties__section-title">Teams</h3>
          <button className="mijn-connecties__action-btn" onClick={() => showToast('Nieuw team (nog niet geïmplementeerd)')}>
            <PlusIcon />
            Nieuw team
          </button>
        </div>
        <div className="mijn-connecties__teams">
          {teams.map((team) => (
            <button key={team.id} className="team-item" onClick={() => showToast(`Team "${team.name}" (nog niet geïmplementeerd)`)}>
              <div className="team-item__icon">
                <UserGroupIcon />
              </div>
              <span className="team-item__name">{team.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Connections list */}
      <section className="mijn-connecties__section">
        <div className="mijn-connecties__section-header">
          <h3 className="mijn-connecties__section-title">Mijn connecties</h3>
          <button className="mijn-connecties__invite-link" onClick={() => onInvite?.()}>
            <LinkIcon />
            Nodig iemand uit
          </button>
        </div>
        <div className="mijn-connecties__list">
          {connections.map((conn) => (
            <ConnectionRow key={conn.id} {...conn} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default MijnConnecties
