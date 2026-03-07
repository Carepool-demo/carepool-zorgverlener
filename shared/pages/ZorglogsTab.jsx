import ZorgverlenerSelector from '@app/components/ZorgverlenerSelector'
import MonthRow from '../components/MonthRow'
import { LogIcon, EditIcon, UndoIcon } from '../components/Icons'
import { zorglogs } from '@app/data/dummyData'

function ZorglogsTab({ onDownload }) {
  return (
    <div className="admin__tab-content">
      <ZorgverlenerSelector className="admin__selector-spacing" />
      <MonthRow className="admin__month-spacing" onDownload={onDownload} />

      <div className="zorglogs">
        {zorglogs.map((group, gi) => (
          <div key={gi} className="zorglogs__group">
            <div className="zorglogs__date">{group.date}</div>
            <div className="zorglogs__entries">
              {group.entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`zorglogs__entry ${entry.deleted ? 'zorglogs__entry--deleted' : ''}`}
                >
                  {entry.deleted ? (
                    <>
                      <span className="zorglogs__entry-icon">
                        <LogIcon type={entry.icon} />
                      </span>
                      <span className="zorglogs__entry-type zorglogs__entry-type--deleted">{entry.type}</span>
                      <span className="zorglogs__entry-price zorglogs__entry-price--deleted">{entry.price}</span>
                      <span className="zorglogs__entry-duration zorglogs__entry-duration--deleted">{entry.duration}</span>
                      <button className="zorglogs__restore-btn" onClick={() => alert(`${entry.type} terugzetten (nog niet geïmplementeerd)`)} aria-label={`${entry.type} terugzetten`}>
                        <UndoIcon />
                        Terugzetten
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="zorglogs__entry-icon">
                        <LogIcon type={entry.icon} />
                      </span>
                      <span className="zorglogs__entry-type">{entry.type}</span>
                      <span className="zorglogs__entry-duration">{entry.duration}</span>
                      <span className="zorglogs__entry-price">{entry.price}</span>
                      <button className="zorglogs__edit-btn" onClick={() => alert(`${entry.type} bewerken (nog niet geïmplementeerd)`)} aria-label={`${entry.type} bewerken`}>
                        <EditIcon />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ZorglogsTab
