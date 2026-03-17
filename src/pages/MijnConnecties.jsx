import { showToast } from '@shared/components/Toast'
import { BackArrowIcon, LinkIcon, PlusIcon, UserGroupIcon } from '@shared/components/Icons'
import ConnectionRow from '@shared/components/ConnectionRow'
import { teams, mijnConnecties as connections } from '../data/dummyData'
import './MijnConnecties.css'

/* ---- Page ---- */
function MijnConnecties({ onBack, onInvite }) {
  return (
    <div className="mijn-connecties">
      {/* Header */}
      <header className="sub-header mijn-connecties__header">
        <button className="sub-header__back-btn mijn-connecties__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Mijn connecties</h1>
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
