import { BackArrowIcon, ExternalLinkIcon } from '../components/Icons'
import './MeldingMaken.css'

function MeldingMaken({ onBack }) {
  return (
    <div className="melding">
      <header className="melding__header">
        <button className="melding__back-btn" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="melding__title">Melding maken</h1>
      </header>

      <div className="melding__body">
        <div className="melding__intro">
          <h2 className="melding__heading">Fraude of misbruik melden</h2>
          <p className="melding__text">
            Je kunt vermoedens van fraude of misbruik op verschillende plekken melden, vaak ook anoniem.
          </p>
        </div>

        {/* SVB card */}
        <div className="melding__card">
          <div className="melding__card-content">
            <h3 className="melding__card-title">SVB</h3>
            <p className="melding__card-text">
              In de meeste gevallen kun je het beste melden bij de SVB. Zij zorgen ervoor dat je melding bij de juiste instantie terechtkomt.
            </p>
          </div>
          <div className="melding__card-action">
            <a
              href="https://www.svb.nl/nl/pgb/fraude-melden"
              target="_blank"
              rel="noopener noreferrer"
              className="melding__cta"
            >
              <ExternalLinkIcon size={24} />
              Meld bij de SVB
            </a>
          </div>
        </div>

        {/* Andere meldpunten */}
        <div className="melding__card">
          <div className="melding__card-header">
            <h3 className="melding__card-title">Andere meldpunten</h3>
          </div>
          <a
            href="https://www.amsterdam.nl/zorg-ondersteuning/meldpunt-zorg/"
            target="_blank"
            rel="noopener noreferrer"
            className="melding__link-row"
          >
            <span className="melding__link-label">Gemeente Amsterdam - Meldpunt Zorg en jeugd (Wmo)</span>
            <ExternalLinkIcon size={16} />
          </a>
          <a
            href="https://www.zilverenkruis.nl/zorgkantoor/fraude-melden"
            target="_blank"
            rel="noopener noreferrer"
            className="melding__link-row"
          >
            <span className="melding__link-label">Zilveren Kruis zorgkantoor (Wlz)</span>
            <ExternalLinkIcon size={16} />
          </a>
          <a
            href="https://www.nza.nl/melden"
            target="_blank"
            rel="noopener noreferrer"
            className="melding__link-row"
          >
            <span className="melding__link-label">Nederlandse Zorgautoriteit (NZa)</span>
            <ExternalLinkIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MeldingMaken
