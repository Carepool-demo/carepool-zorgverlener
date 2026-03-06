import ZorgverlenerSelector from '../components/ZorgverlenerSelector'
import { PlusIcon } from '../components/Icons'
import { tarievenData } from '../data/dummyData'

function TarievenTab() {
  return (
    <div className="admin__tab-content">
      <ZorgverlenerSelector className="admin__selector-spacing" />

      <div className="tarieven">
        <div className="tarieven__header">
          <h3 className="tarieven__title">Julia's tarieven</h3>
          <button className="tarieven__add-btn" aria-label="Nieuw tarief toevoegen">
            <PlusIcon />
            Nieuw tarief
          </button>
        </div>

        {tarievenData.map((group) => (
          <div key={group.id} className="tarieven__card">
            <div className="tarieven__card-top">
              <h4 className="tarieven__card-title">{group.category}</h4>
              <button className="tarieven__card-link" aria-label={`${group.category} tarieven aanpassen`}>
                Aanpassen
              </button>
            </div>
            <div className="tarieven__rates">
              {group.rates.map((rate) => (
                <div key={rate.id} className="tarieven__rate-row">
                  <span className="tarieven__rate-label">
                    {rate.label}
                    {rate.tag && <span className="tarieven__rate-tag"> {rate.tag}</span>}
                  </span>
                  <span className="tarieven__rate-price">{rate.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="tarieven__footer">Zorgverleners zien alleen hun eigen tarieven</p>
      </div>
    </div>
  )
}

export default TarievenTab
