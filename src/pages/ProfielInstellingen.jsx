import { showToast } from '@shared/components/Toast'
import { PAGES } from '../constants/routes'
import { BackArrowIcon, ChevronRightIcon, OverMijIcon, ZorgcatIcon, SjablonenIcon, LocatiesIcon, AccountIcon, NotificatiesIcon, BeheerIcon, HelpInfoIcon, HandigeAdressenIcon, QuizIcon, AbonnementIcon } from '@shared/components/Icons'
import './ProfielInstellingen.css'

/* ---- Menu item config ---- */
const PROFIEL_VOORKEUREN = [
  { id: 'profiel', label: 'Mijn profiel', icon: OverMijIcon, navigateTo: PAGES.PROFIEL },
  { id: 'account', label: 'Accountinstellingen', icon: AccountIcon },
  { id: 'notificaties', label: 'Notificaties', icon: NotificatiesIcon, navigateTo: PAGES.NOTIFICATIE_INSTELLINGEN },
]

const SERVICE = [
  { id: 'help', label: 'Help & info', icon: HelpInfoIcon, navigateTo: PAGES.HELP_INFO },
  { id: 'adressen', label: 'Handige adressen', icon: HandigeAdressenIcon },
  { id: 'abonnement', label: 'Abonnement', icon: AbonnementIcon },
  { id: 'quiz', label: 'Test je pgb-kennis', icon: QuizIcon },
]

/* ---- ProfielInstellingen page ---- */
function ProfielInstellingen({ onBack, onNavigate }) {
  const handleItemClick = (item) => {
    if (item.navigateTo) {
      onNavigate(item.navigateTo)
    } else {
      showToast(`${item.label} (nog niet geïmplementeerd)`)
    }
  }

  return (
    <div className="pi">
      {/* Header */}
      <header className="pi__header">
        <button className="pi__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="pi__title">Profiel en instellingen</h1>
      </header>

      {/* Profiel en voorkeuren */}
      <section className="pi__section">
        <h3 className="pi__section-title">Profiel en voorkeuren</h3>
        <div className="pi__card">
          {PROFIEL_VOORKEUREN.map((item, idx) => {
            const Icon = item.icon
            const isLast = idx === PROFIEL_VOORKEUREN.length - 1
            return (
              <button
                key={item.id}
                className={`pi__menu-item ${isLast ? 'pi__menu-item--last' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div className="pi__menu-icon"><Icon /></div>
                <span className="pi__menu-label">{item.label}</span>
                <ChevronRightIcon />
              </button>
            )
          })}
        </div>
      </section>

      {/* Service */}
      <section className="pi__section">
        <h3 className="pi__section-title">Service</h3>
        <div className="pi__card">
          {SERVICE.map((item, idx) => {
            const Icon = item.icon
            const isLast = idx === SERVICE.length - 1
            return (
              <button
                key={item.id}
                className={`pi__menu-item ${isLast ? 'pi__menu-item--last' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div className="pi__menu-icon"><Icon /></div>
                <span className="pi__menu-label">{item.label}</span>
                <ChevronRightIcon />
              </button>
            )
          })}
        </div>
      </section>

      {/* Uitloggen */}
      <div className="pi__logout-wrapper">
        <button className="pi__logout" onClick={() => showToast('Uitloggen (nog niet geïmplementeerd)')}>
          Uitloggen
        </button>
      </div>
    </div>
  )
}

export default ProfielInstellingen
