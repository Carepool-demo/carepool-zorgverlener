/* ---- Verzoek item icons ---- */
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.833008C11.958 0.833008 15.167 4.04196 15.167 8C15.167 11.958 11.958 15.167 8 15.167C4.04196 15.167 0.833008 11.958 0.833008 8C0.833008 4.04196 4.04196 0.833008 8 0.833008ZM8 1.83301C4.59424 1.83301 1.83301 4.59424 1.83301 8C1.83301 11.4058 4.59424 14.167 8 14.167C11.4058 14.167 14.167 11.4058 14.167 8C14.167 4.59424 11.4058 1.83301 8 1.83301ZM8 4.83301C8.27603 4.83301 8.49982 5.05701 8.5 5.33301V7.79297L9.68652 8.97949C9.88179 9.17475 9.88179 9.49126 9.68652 9.68652C9.49126 9.88179 9.17475 9.88179 8.97949 9.68652L7.64648 8.35352C7.55272 8.25975 7.5 8.13261 7.5 8V5.33301C7.50018 5.05701 7.72397 4.83301 8 4.83301Z" fill="currentColor"/>
    </svg>
  )
}

function DeclineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0966 3.4301C15.5034 3.0233 16.1634 3.0233 16.5702 3.4301C16.9768 3.83685 16.9768 4.496 16.5702 4.90275L11.4726 9.99943L16.5702 15.0961C16.977 15.5029 16.977 16.1629 16.5702 16.5697C16.1634 16.9765 15.5034 16.9765 15.0966 16.5697L9.99992 11.4721L4.90324 16.5697C4.49649 16.9763 3.83735 16.9763 3.43059 16.5697C3.02379 16.1629 3.02379 15.5029 3.43059 15.0961L8.52629 9.99943L3.43059 4.90275C3.02379 4.49596 3.02379 3.83689 3.43059 3.4301C3.83738 3.02332 4.49645 3.02331 4.90324 3.4301L9.99992 8.5258L15.0966 3.4301Z" fill="currentColor" />
    </svg>
  )
}

function AcceptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6667 5.83301L7.50004 14.9997L3.33337 10.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ---- Reusable verzoek item component ---- */
function VerzoekItem({ verzoek }) {
  return (
    <div className="verzoek-item">
      <div className="verzoek-item__border" />
      <div className="verzoek-item__content">
        <div className="verzoek-item__info">
          <div className="verzoek-item__top-row">
            <span className="verzoek-item__date">{verzoek.date}</span>
            <span className="verzoek-item__client">{verzoek.client}</span>
          </div>
          <div className="verzoek-item__bottom-row">
            <span className="verzoek-item__time">
              <ClockIcon />
              {verzoek.time}
            </span>
            <span className="verzoek-item__type">{verzoek.type}</span>
          </div>
        </div>
        <div className="verzoek-item__actions">
          <button className="verzoek-item__btn verzoek-item__btn--decline" aria-label="Afwijzen">
            <DeclineIcon />
          </button>
          <button className="verzoek-item__btn verzoek-item__btn--accept" aria-label="Accepteren">
            <AcceptIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerzoekItem
