import { AlertIcon, MessageIcon } from './Icons'
import './ConnectionRow.css'

function ConnectionRow({ name, initials, tags = [], warning, messages, size = 'default' }) {
  return (
    <div className={`conn ${size === 'lg' ? 'conn--lg' : ''}`}>
      <div className="conn__avatar">
        {initials}
      </div>
      <div className="conn__info">
        <span className="conn__name">{name}</span>
        {warning ? (
          <div className="conn__warning">
            <AlertIcon />
            <span>{warning}</span>
          </div>
        ) : (
          <div className="conn__tags hide-scrollbar">
            {tags.map((tag, i) => (
              <span key={tag} className="conn__tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      {messages > 0 && (
        <div className="conn__badge">
          <MessageIcon />
          <span>{messages}</span>
        </div>
      )}
    </div>
  )
}

export default ConnectionRow
