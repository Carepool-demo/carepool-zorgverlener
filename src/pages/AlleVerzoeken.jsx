import { BackArrowIcon } from '@shared/components/Icons'
import { alleVerzoeken } from '../data/dummyData'
import VerzoekItem from '../components/VerzoekItem'
import './AlleVerzoeken.css'

function AlleVerzoeken({ onBack }) {
  return (
    <div className="alle-verzoeken">
      {/* Header */}
      <header className="alle-verzoeken__header">
        <button className="alle-verzoeken__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="alle-verzoeken__title">Openstaande verzoeken</h1>
        <div className="alle-verzoeken__badge">{alleVerzoeken.length}</div>
      </header>

      {/* Verzoeken list */}
      <div className="alle-verzoeken__list">
        {alleVerzoeken.map((verzoek) => (
          <VerzoekItem key={verzoek.id} verzoek={verzoek} />
        ))}
      </div>
    </div>
  )
}

export default AlleVerzoeken
