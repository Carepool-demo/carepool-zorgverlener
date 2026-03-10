import { showToast } from '../components/Toast'
import { useEffect, useState } from 'react'
import { PAGES } from '../constants/routes'
import TopBar from '../components/TopBar'
import { ChevronRightIcon, PlusIcon } from '../components/Icons'
import { berichtenChats, berichtenVerzoeken } from '@app/data/dummyData'
import NieuwBericht from './NieuwBericht'
import ChatGesprek from './ChatGesprek'
import './Berichten.css'

/* Local icons for group and carepool chat types */
function GroupIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7002 2.00549C11.2616 2.00549 10.8274 2.08903 10.4222 2.25133C10.017 2.41363 9.64887 2.65151 9.33876 2.9514C9.02866 3.25129 8.78266 3.60732 8.61483 3.99914C8.44701 4.39097 8.36063 4.81092 8.36063 5.23503C8.36063 5.65914 8.44701 6.0791 8.61483 6.47092C8.78266 6.86275 9.02866 7.21877 9.33876 7.51866C9.64887 7.81855 10.017 8.05644 10.4222 8.21874C10.8274 8.38104 11.2616 8.46457 11.7002 8.46457C12.5859 8.46457 13.4353 8.12432 14.0616 7.51866C14.6879 6.91301 15.0398 6.09156 15.0398 5.23503C15.0398 4.37851 14.6879 3.55706 14.0616 2.9514C13.4353 2.34575 12.5859 2.00549 11.7002 2.00549ZM19.2217 3.61865C18.5568 3.61865 17.9191 3.87409 17.4489 4.32879C16.9787 4.78349 16.7146 5.40019 16.7146 6.04323C16.7146 6.68626 16.9787 7.30297 17.4489 7.75766C17.9191 8.21236 18.5568 8.46781 19.2217 8.46781C19.8867 8.46781 20.5244 8.21236 20.9946 7.75766C21.4648 7.30297 21.7289 6.68626 21.7289 6.04323C21.7289 5.40019 21.4648 4.78349 20.9946 4.32879C20.5244 3.87409 19.8867 3.61865 19.2217 3.61865ZM4.17864 3.61865C3.5137 3.61865 2.87598 3.87409 2.40579 4.32879C1.93561 4.78349 1.67146 5.40019 1.67146 6.04323C1.67146 6.68626 1.93561 7.30297 2.40579 7.75766C2.87598 8.21236 3.5137 8.46781 4.17864 8.46781C4.84359 8.46781 5.4813 8.21236 5.95149 7.75766C6.42168 7.30297 6.68583 6.68626 6.68583 6.04323C6.68583 5.40019 6.42168 4.78349 5.95149 4.32879C5.4813 3.87409 4.84359 3.61865 4.17864 3.61865ZM6.68583 11.6893C6.68891 11.2625 6.86638 10.8543 7.1795 10.5536C7.49263 10.2529 7.916 10.0842 8.35728 10.0842H15.0431C15.4864 10.0842 15.9115 10.2545 16.225 10.5576C16.5385 10.8608 16.7146 11.2719 16.7146 11.7006V16.5497C16.715 17.0585 16.6327 17.5641 16.4705 18.0481C16.1004 19.1452 15.338 20.0787 14.3202 20.6811C13.3024 21.2834 12.0959 21.5152 10.9173 21.3347C9.73875 21.1542 8.6653 20.5733 7.88975 19.6963C7.11419 18.8193 6.68733 17.7037 6.68583 16.5497V11.6893ZM5.01437 11.7006C5.01437 10.9537 4.51106 10.0842 3.7642 10.0842H1.67146C1.22816 10.0842 0.803017 10.2545 0.489558 10.5576C0.1761 10.8608 0 11.2719 0 11.7006V15.7415C-0.000227 16.4031 0.167523 17.0547 0.488521 17.6389C0.809519 18.2232 1.27394 18.7223 1.84101 19.0924C2.40808 19.4625 3.06044 19.6923 3.74081 19.7616C4.82253 19.8718 5.27203 18.6379 5.09649 17.5648C5.04165 17.2296 5.01402 16.8897 5.01437 16.5481V11.7006ZM18.386 11.7006V16.5497C18.386 16.8952 18.3581 17.2343 18.3042 17.5651C18.1296 18.6379 18.5783 19.8718 19.6596 19.7616C20.3399 19.6923 20.9923 19.4625 21.5594 19.0924C22.1264 18.7223 22.5909 18.2232 22.9119 17.6389C23.2329 17.0547 23.4006 16.4031 23.4004 15.7415V11.7006C23.4004 11.2719 23.2243 10.8608 22.9108 10.5576C22.5974 10.2545 22.1722 10.0842 21.7289 10.0842H19.636C18.8881 10.0842 18.386 10.9527 18.386 11.7006Z" fill="currentColor"/>
    </svg>
  )
}

function CarepoolIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7002 2.00549C11.2616 2.00549 10.8274 2.08903 10.4222 2.25133C10.017 2.41363 9.64887 2.65151 9.33876 2.9514C9.02866 3.25129 8.78266 3.60732 8.61483 3.99914C8.44701 4.39097 8.36063 4.81092 8.36063 5.23503C8.36063 5.65914 8.44701 6.0791 8.61483 6.47092C8.78266 6.86275 9.02866 7.21877 9.33876 7.51866C9.64887 7.81855 10.017 8.05644 10.4222 8.21874C10.8274 8.38104 11.2616 8.46457 11.7002 8.46457C12.5859 8.46457 13.4353 8.12432 14.0616 7.51866C14.6879 6.91301 15.0398 6.09156 15.0398 5.23503C15.0398 4.37851 14.6879 3.55706 14.0616 2.9514C13.4353 2.34575 12.5859 2.00549 11.7002 2.00549Z" fill="currentColor"/>
      <path d="M6.68583 11.6893C6.68891 11.2625 6.86638 10.8543 7.1795 10.5536C7.49263 10.2529 7.916 10.0842 8.35728 10.0842H15.0431C15.4864 10.0842 15.9115 10.2545 16.225 10.5576C16.5385 10.8608 16.7146 11.2719 16.7146 11.7006V16.5497C16.715 17.0585 16.6327 17.5641 16.4705 18.0481C16.1004 19.1452 15.338 20.0787 14.3202 20.6811C13.3024 21.2834 12.0959 21.5152 10.9173 21.3347C9.73875 21.1542 8.6653 20.5733 7.88975 19.6963C7.11419 18.8193 6.68733 17.7037 6.68583 16.5497V11.6893Z" fill="currentColor"/>
      <circle cx="8.5" cy="5.5" r="2" fill="currentColor"/>
      <circle cx="15" cy="5.5" r="2" fill="currentColor"/>
    </svg>
  )
}

function Berichten({ initialSubPage = null, onNavigate, onSubPageChange, notificationCount }) {
  const [subPage, setSubPage] = useState(initialSubPage)
  const [activeChat, setActiveChat] = useState(null)
  useEffect(() => {
    if (onSubPageChange) onSubPageChange(subPage)
  }, [subPage, onSubPageChange])

  const overigeChats = berichtenChats.filter(c => !c.isConnectie)
  const overigeCount = berichtenVerzoeken.length + overigeChats.length
  const overigeNames = [...berichtenVerzoeken, ...overigeChats].map(v => v.name).join(', ')

  const renderAvatar = (chat) => {
    if (chat.type === 'group') {
      return (
        <div className="berichten__avatar berichten__avatar--group">
          <GroupIcon />
        </div>
      )
    }
    if (chat.type === 'carepool') {
      return (
        <div className="berichten__avatar berichten__avatar--carepool">
          <span className="berichten__initials">{chat.initials}</span>
        </div>
      )
    }
    return (
      <div className="berichten__avatar">
        <span className="berichten__initials">{chat.initials}</span>
      </div>
    )
  }

  const openChat = (chat) => {
    setActiveChat(chat)
    setSubPage('chat')
  }

  /* ---- Sub-pages ---- */
  if (subPage === 'chat' && activeChat) {
    return <ChatGesprek chat={activeChat} onBack={() => { setSubPage(null); setActiveChat(null) }} />
  }

  if (subPage === 'nieuwBericht') {
    return <NieuwBericht onBack={() => setSubPage(null)} />
  }

  if (subPage === 'verzoeken') {
    return (
      <div className="berichten">
        <header className="berichten__sub-header">
          <button className="berichten__back" onClick={() => setSubPage(null)} aria-label="Terug">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="berichten__sub-title">Reacties op jouw profiel</h1>
        </header>

        {/* Chatverzoeken section */}
        {berichtenVerzoeken.length > 0 && (
          <>
            <div className="berichten__section-row">
              <h2 className="berichten__section-header">Chatverzoeken</h2>
            </div>
            <ul className="berichten__list">
              {berichtenVerzoeken.map((chat) => (
                <li key={chat.id}>
                  <div className="berichten__verzoek-item">
                    <button
                      className="berichten__item"
                      onClick={() => openChat(chat)}
                      aria-label={`Verzoek van ${chat.name}`}
                    >
                      <div className="berichten__avatar">
                        <span className="berichten__initials">{chat.initials}</span>
                      </div>
                      <div className="berichten__content">
                        <div className="berichten__header">
                          <span className="berichten__name">{chat.name}</span>
                          {chat.timestamp && (
                            <span className="berichten__time">{chat.timestamp}</span>
                          )}
                        </div>
                        <p className="berichten__preview berichten__preview--multiline">{chat.preview}</p>
                      </div>
                    </button>
                    <div className="berichten__verzoek-actions">
                      <button className="berichten__verzoek-btn berichten__verzoek-btn--decline" onClick={() => showToast('Afwijzen (nog niet geimplementeerd)')}>
                        Afwijzen
                      </button>
                      <button className="berichten__verzoek-btn berichten__verzoek-btn--accept" onClick={() => showToast('Accepteren (nog niet geimplementeerd)')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Accepteren
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Non-connection chats section */}
        {overigeChats.length > 0 && (
          <>
            <div className="berichten__section-row">
              <h2 className="berichten__section-header">Chats</h2>
            </div>
            <ul className="berichten__list">
              {overigeChats.map((chat) => (
                <li key={chat.id}>
                  <button
                    className="berichten__item"
                    onClick={() => openChat(chat)}
                    aria-label={`Chat met ${chat.name}`}
                  >
                    {renderAvatar(chat)}
                    <div className="berichten__content">
                      <div className="berichten__header">
                        <span className="berichten__name">{chat.name}</span>
                        {chat.timestamp && (
                          <span className={`berichten__time ${chat.unread > 0 ? 'berichten__time--unread' : ''}`}>
                            {chat.timestamp}
                          </span>
                        )}
                      </div>
                      <div className="berichten__preview-row">
                        <p className="berichten__preview">{chat.preview}</p>
                        {chat.unread > 0 && (
                          <span className="berichten__unread-badge">{chat.unread}</span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  /* ---- Main view ---- */
  return (
    <div className="berichten">
      <TopBar title="Berichten" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} notificationCount={notificationCount} />

      {/* Overige berichten card */}
      {overigeCount > 0 && (
        <button className="berichten__verzoeken-card" onClick={() => setSubPage('verzoeken')}>
          <div className="berichten__verzoeken-left">
            <div className="berichten__verzoeken-top">
              <span className="berichten__verzoeken-title">Reacties op jouw profiel</span>
              <span className="berichten__verzoeken-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.77965 1.82273C11.2369 1.72586 12.7601 1.72566 14.2204 1.82273C18.787 2.12629 22.4103 5.81258 22.7082 10.4224C22.7639 11.2848 22.7639 12.1768 22.7082 13.0392C22.4103 17.649 18.787 21.3353 14.2204 21.6389C12.7601 21.7359 11.2369 21.7357 9.77965 21.6389C9.21472 21.6013 8.59978 21.4677 8.05839 21.2448C7.8203 21.1467 7.65868 21.0804 7.54041 21.037C7.45909 21.0929 7.35108 21.1723 7.1938 21.2883C6.40136 21.8726 5.40092 22.2825 3.98117 22.248L3.93544 22.2469C3.66155 22.2403 3.36961 22.2334 3.13152 22.1873C2.84475 22.1318 2.48996 21.9931 2.26791 21.6145C2.02623 21.2025 2.12313 20.7858 2.21688 20.5234C2.30536 20.2757 2.45874 19.9852 2.61542 19.6885L2.6369 19.6478C3.10323 18.7641 3.23314 18.0419 2.98381 17.5604C2.15148 16.304 1.40272 14.7556 1.2918 13.0392C1.23607 12.1768 1.23607 11.2848 1.2918 10.4224C1.58972 5.81258 5.213 2.12629 9.77965 1.82273ZM7.75 9.5C7.75 9.91421 8.08579 10.25 8.5 10.25H12C12.4142 10.25 12.75 9.91421 12.75 9.5C12.75 9.08579 12.4142 8.75 12 8.75H8.5C8.08579 8.75 7.75 9.08579 7.75 9.5ZM7.75 14.5C7.75 14.9142 8.08579 15.25 8.5 15.25H15.5C15.9142 15.25 16.25 14.9142 16.25 14.5C16.25 14.0858 15.9142 13.75 15.5 13.75H8.5C8.08579 13.75 7.75 14.0858 7.75 14.5Z" fill="currentColor"/></svg>
                {overigeCount}
              </span>
            </div>
            <p className="berichten__verzoeken-preview">
              {overigeNames}
            </p>
          </div>
          <ChevronRightIcon />
        </button>
      )}

      {/* Chats section (connections only) */}
      <div className="berichten__section-row">
        <h2 className="berichten__section-header">Chats</h2>
        <button className="berichten__new-btn" onClick={() => setSubPage('nieuwBericht')}>
          <PlusIcon />
          Nieuw bericht
        </button>
      </div>

      <ul className="berichten__list">
        {berichtenChats.filter(c => c.isConnectie).map((chat) => (
          <li key={chat.id}>
            <button
              className="berichten__item"
              onClick={() => openChat(chat)}
              aria-label={`Chat met ${chat.name}`}
            >
              {renderAvatar(chat)}
              <div className="berichten__content">
                <div className="berichten__header">
                  <span className="berichten__name">{chat.name}</span>
                  {chat.timestamp && (
                    <span className={`berichten__time ${chat.unread > 0 ? 'berichten__time--unread' : ''}`}>
                      {chat.timestamp}
                    </span>
                  )}
                </div>
                <div className="berichten__preview-row">
                  <p className="berichten__preview">{chat.preview}</p>
                  {chat.unread > 0 && (
                    <span className="berichten__unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Berichten
