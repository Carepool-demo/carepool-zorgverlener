import { useRef, useEffect, useState } from 'react'
import { showToast } from '../components/Toast'
import { BackArrowIcon, PhoneIcon, SendIcon, SmileIcon, PersonIcon, MoreVerticalIcon, ClockIcon, AgreementIcon, CloseIcon } from '../components/Icons'
import { chatGesprekken } from '@app/data/dummyData'
import './ChatGesprek.css'

/* Local icon for group avatar */
function GroupIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7002 2.00549C11.2616 2.00549 10.8274 2.08903 10.4222 2.25133C10.017 2.41363 9.64887 2.65151 9.33876 2.9514C9.02866 3.25129 8.78266 3.60732 8.61483 3.99914C8.44701 4.39097 8.36063 4.81092 8.36063 5.23503C8.36063 5.65914 8.44701 6.0791 8.61483 6.47092C8.78266 6.86275 9.02866 7.21877 9.33876 7.51866C9.64887 7.81855 10.017 8.05644 10.4222 8.21874C10.8274 8.38104 11.2616 8.46457 11.7002 8.46457C12.5859 8.46457 13.4353 8.12432 14.0616 7.51866C14.6879 6.91301 15.0398 6.09156 15.0398 5.23503C15.0398 4.37851 14.6879 3.55706 14.0616 2.9514C13.4353 2.34575 12.5859 2.00549 11.7002 2.00549ZM19.2217 3.61865C18.5568 3.61865 17.9191 3.87409 17.4489 4.32879C16.9787 4.78349 16.7146 5.40019 16.7146 6.04323C16.7146 6.68626 16.9787 7.30297 17.4489 7.75766C17.9191 8.21236 18.5568 8.46781 19.2217 8.46781C19.8867 8.46781 20.5244 8.21236 20.9946 7.75766C21.4648 7.30297 21.7289 6.68626 21.7289 6.04323C21.7289 5.40019 21.4648 4.78349 20.9946 4.32879C20.5244 3.87409 19.8867 3.61865 19.2217 3.61865ZM4.17864 3.61865C3.5137 3.61865 2.87598 3.87409 2.40579 4.32879C1.93561 4.78349 1.67146 5.40019 1.67146 6.04323C1.67146 6.68626 1.93561 7.30297 2.40579 7.75766C2.87598 8.21236 3.5137 8.46781 4.17864 8.46781C4.84359 8.46781 5.4813 8.21236 5.95149 7.75766C6.42168 7.30297 6.68583 6.68626 6.68583 6.04323C6.68583 5.40019 6.42168 4.78349 5.95149 4.32879C5.4813 3.87409 4.84359 3.61865 4.17864 3.61865ZM6.68583 11.6893C6.68891 11.2625 6.86638 10.8543 7.1795 10.5536C7.49263 10.2529 7.916 10.0842 8.35728 10.0842H15.0431C15.4864 10.0842 15.9115 10.2545 16.225 10.5576C16.5385 10.8608 16.7146 11.2719 16.7146 11.7006V16.5497C16.715 17.0585 16.6327 17.5641 16.4705 18.0481C16.1004 19.1452 15.338 20.0787 14.3202 20.6811C13.3024 21.2834 12.0959 21.5152 10.9173 21.3347C9.73875 21.1542 8.6653 20.5733 7.88975 19.6963C7.11419 18.8193 6.68733 17.7037 6.68583 16.5497V11.6893ZM5.01437 11.7006C5.01437 10.9537 4.51106 10.0842 3.7642 10.0842H1.67146C1.22816 10.0842 0.803017 10.2545 0.489558 10.5576C0.1761 10.8608 0 11.2719 0 11.7006V15.7415C-0.000227 16.4031 0.167523 17.0547 0.488521 17.6389C0.809519 18.2232 1.27394 18.7223 1.84101 19.0924C2.40808 19.4625 3.06044 19.6923 3.74081 19.7616C4.82253 19.8718 5.27203 18.6379 5.09649 17.5648C5.04165 17.2296 5.01402 16.8897 5.01437 16.5481V11.7006ZM18.386 11.7006V16.5497C18.386 16.8952 18.3581 17.2343 18.3042 17.5651C18.1296 18.6379 18.5783 19.8718 19.6596 19.7616C20.3399 19.6923 20.9923 19.4625 21.5594 19.0924C22.1264 18.7223 22.5909 18.2232 22.9119 17.6389C23.2329 17.0547 23.4006 16.4031 23.4004 15.7415V11.7006C23.4004 11.2719 23.2243 10.8608 22.9108 10.5576C22.5974 10.2545 22.1722 10.0842 21.7289 10.0842H19.636C18.8881 10.0842 18.386 10.9527 18.386 11.7006Z" fill="currentColor"/>
    </svg>
  )
}

function ChatGesprek({ chat, onBack }) {
  const gesprek = chatGesprekken[chat.id]
  const messagesEndRef = useRef(null)
  const isGroup = chat.type === 'group'
  const isVerzoek = gesprek?.isVerzoek
  const [status, setStatus] = useState(gesprek?.status || null)
  const [showConnectiePopup, setShowConnectiePopup] = useState(false)
  const isAccepted = isVerzoek && status === 'accepted'
  const isVerzoekVerstuurd = isVerzoek && status === 'verzoek-verstuurd'

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' })
    }
  }, [])

  return (
    <div className="chat-gesprek">
      {/* Header */}
      {isVerzoek ? (
        <header className="chat-gesprek__header chat-gesprek__header--verzoek">
          <button className="chat-gesprek__back" onClick={onBack} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <div className="chat-gesprek__contact-avatar chat-gesprek__contact-avatar--small">
            <span className="chat-gesprek__contact-initials">{chat.initials}</span>
          </div>
          <span className="chat-gesprek__header-title">{chat.name}</span>
          <div className="chat-gesprek__header-spacer" />
        </header>
      ) : (
        <>
          <header className="chat-gesprek__header">
            <button className="chat-gesprek__back" onClick={onBack} aria-label="Terug">
              <BackArrowIcon />
            </button>
            <span className="chat-gesprek__header-title">Berichten</span>
          </header>

          {/* Contact bar */}
          <div className="chat-gesprek__contact">
            {isGroup ? (
              <div className="chat-gesprek__contact-avatar chat-gesprek__contact-avatar--group">
                <GroupIcon />
              </div>
            ) : (
              <div className="chat-gesprek__contact-avatar">
                <span className="chat-gesprek__contact-initials">{chat.initials}</span>
              </div>
            )}
            <div className="chat-gesprek__contact-info">
              <span className="chat-gesprek__contact-name">{chat.name}</span>
              {gesprek?.subtitle && (
                <span className="chat-gesprek__contact-tag">{gesprek.subtitle}</span>
              )}
            </div>
            {isGroup && gesprek?.members ? (
              <div className="chat-gesprek__members-badge">
                <PersonIcon />
                <span>{gesprek.members}</span>
              </div>
            ) : (
              <button
                className="chat-gesprek__phone-btn"
                onClick={() => showToast('Bellen (nog niet geimplementeerd)')}
                aria-label="Bellen"
              >
                <PhoneIcon />
              </button>
            )}
          </div>
        </>
      )}

      {/* Messages */}
      <div className="chat-gesprek__messages">
        {/* Connection banner (after accepting verzoek) */}
        {isAccepted && (
          <div className="chat-gesprek__connection-banner">
            <AgreementIcon size={16} />
            <span className="chat-gesprek__connection-banner-text">Jullie zijn geen connectie</span>
            <button className="chat-gesprek__connection-banner-link" onClick={() => setShowConnectiePopup(true)}>
              Connectieverzoek
            </button>
          </div>
        )}

        {gesprek?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-gesprek__bubble-wrap ${msg.sender === 'self' ? 'chat-gesprek__bubble-wrap--self' : 'chat-gesprek__bubble-wrap--other'}`}
          >
            {msg.sender === 'other' && isGroup && (
              <div className="chat-gesprek__bubble-avatar">
                <span className="chat-gesprek__bubble-avatar-initials">{msg.initials}</span>
              </div>
            )}
            <div className={`chat-gesprek__bubble ${msg.sender === 'self' ? 'chat-gesprek__bubble--self' : 'chat-gesprek__bubble--other'}`}>
              {msg.sender === 'other' && isGroup && (
                <span className="chat-gesprek__bubble-sender">{msg.name}</span>
              )}
              {msg.hasOproep && gesprek?.oproep && (
                <div className="chat-gesprek__oproep-card">
                  <span className="chat-gesprek__oproep-label">{gesprek.oproep.label}</span>
                  <p className="chat-gesprek__oproep-text">{gesprek.oproep.text}</p>
                </div>
              )}
              <p className="chat-gesprek__bubble-text">{msg.text}</p>
              <span className="chat-gesprek__bubble-time">{msg.time}</span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Request acceptance card */}
      {isVerzoek && status === 'pending' && (
        <div className="chat-gesprek__request-card">
          <div className="chat-gesprek__request-icon">
            <ClockIcon size={40} />
          </div>
          <p className="chat-gesprek__request-title">Berichtverzoek van {chat.name.split(' ')[0]} accepteren?</p>
          <p className="chat-gesprek__request-desc">Je kan berichten sturen wanneer je het berichtverzoek geaccepteerd hebt.</p>
          <div className="chat-gesprek__request-actions">
            <button className="chat-gesprek__request-btn chat-gesprek__request-btn--outline" onClick={() => showToast('Afwijzen (nog niet geimplementeerd)')}>
              Afwijzen
            </button>
            <button className="chat-gesprek__request-btn chat-gesprek__request-btn--primary" onClick={() => setStatus('accepted')}>
              Accepteren
            </button>
          </div>
        </div>
      )}

      {/* Connectieverzoek verstuurd card */}
      {isVerzoekVerstuurd && (
        <div className="chat-gesprek__verzoek-verstuurd">
          <AgreementIcon size={40} />
          <p className="chat-gesprek__verzoek-verstuurd-title">
            Je hebt {chat.name.split(' ')[0]} een connectieverzoek gestuurd.
          </p>
          <p className="chat-gesprek__verzoek-verstuurd-desc">
            Wacht tot {chat.name.split(' ')[0]} je verzoek heeft geaccepteerd.
          </p>
        </div>
      )}

      {/* Footer */}
      {isVerzoek ? (
        <div className="chat-gesprek__footer">
          <div className="chat-gesprek__input-wrap chat-gesprek__input-wrap--pill">
            <input
              type="text"
              className="chat-gesprek__input"
              placeholder="Start met typen..."
              readOnly
              onClick={() => showToast('Berichten versturen (nog niet geimplementeerd)')}
            />
            <button className={`chat-gesprek__send-btn ${isAccepted || isVerzoekVerstuurd ? '' : 'chat-gesprek__send-btn--outline'}`} aria-label="Verstuur">
              <SendIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-gesprek__footer">
          <div className="chat-gesprek__input-wrap">
            <input
              type="text"
              className="chat-gesprek__input"
              placeholder="Typ je bericht..."
              readOnly
              onClick={() => showToast('Berichten versturen (nog niet geimplementeerd)')}
            />
            <button className="chat-gesprek__emoji-btn" aria-label="Emoji">
              <SmileIcon />
            </button>
          </div>
          <button className="chat-gesprek__send-btn" aria-label="Verstuur">
            <SendIcon />
          </button>
        </div>
      )}

      {/* Connectieverzoek popup */}
      {showConnectiePopup && (
        <div className="chat-gesprek__overlay" onClick={() => setShowConnectiePopup(false)}>
          <div className="chat-gesprek__popup" onClick={(e) => e.stopPropagation()}>
            <div className="chat-gesprek__popup-close">
              <button onClick={() => setShowConnectiePopup(false)} aria-label="Sluiten">
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="chat-gesprek__popup-content">
              <div className="chat-gesprek__popup-icon">
                <AgreementIcon size={40} />
              </div>
              <h2 className="chat-gesprek__popup-title">Connectieverzoek</h2>
              <p className="chat-gesprek__popup-intro">Als je een connectie wordt, betekent dit:</p>
              <div className="chat-gesprek__popup-items">
                <div className="chat-gesprek__popup-item">
                  <span className="chat-gesprek__popup-number">1</span>
                  <p>{chat.name.split(' ')[0]} kan afspraken bij jou inplannen en jij bij {chat.name.split(' ')[0]}.</p>
                </div>
                <div className="chat-gesprek__popup-item">
                  <span className="chat-gesprek__popup-number">2</span>
                  <p>Jullie kunnen elkaars profiel en contactgegevens bekijken.</p>
                </div>
                <div className="chat-gesprek__popup-item">
                  <span className="chat-gesprek__popup-number">3</span>
                  <p>Je kunt de connectie op elk moment weer verwijderen.</p>
                </div>
              </div>
            </div>
            <div className="chat-gesprek__popup-footer">
              <button className="chat-gesprek__popup-btn" onClick={() => { setShowConnectiePopup(false); setStatus('verzoek-verstuurd') }}>
                Verzoek versturen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatGesprek
