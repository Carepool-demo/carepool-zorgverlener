import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { BackArrowIcon } from '../components/Icons'
import './NodigUit.css'

/* ---- Page-specific icons ---- */
function ShareIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0205 5.7973C15.1327 5.25657 15.6624 4.90881 16.2031 5.02093C17.1023 5.20736 17.8764 5.5401 18.5186 6.15179C19.3295 6.9242 19.6804 7.90246 19.8438 9.05999C20.0001 10.1675 20 11.5735 20 13.3051V13.4565C20 15.1878 20 16.5932 19.8438 17.7006C19.6804 18.8581 19.3294 19.8364 18.5186 20.6088C17.7146 21.3746 16.708 21.7003 15.5166 21.853C14.3638 22.0006 12.8963 22.0004 11.0703 22.0004H8.92969C7.10398 22.0004 5.63712 22.0005 4.48438 21.853C3.29282 21.7004 2.28555 21.3747 1.48145 20.6088C0.670595 19.8364 0.319633 18.8581 0.156251 17.7006C-3.44395e-05 16.5932 -3.19389e-05 15.1878 9.58856e-07 13.4565V13.3051C-3.19429e-05 11.5735 -7.16992e-05 10.1675 0.156251 9.05999C0.319648 7.90246 0.670515 6.9242 1.48145 6.15179C2.12364 5.5401 2.8977 5.20736 3.79688 5.02093C4.33763 4.90881 4.86733 5.25657 4.97949 5.7973C5.09161 6.33806 4.74388 6.86777 4.20313 6.97991C3.5535 7.1146 3.1583 7.31726 2.86133 7.60003C2.50075 7.94348 2.26623 8.42203 2.13672 9.33929C2.00243 10.2907 2 11.5547 2 13.3803C2 15.206 2.00242 16.4699 2.13672 17.4213C2.26622 18.3388 2.50071 18.8171 2.86133 19.1606C3.2288 19.5106 3.7514 19.7432 4.73828 19.8696C5.74917 19.999 7.08767 20.0004 9 20.0004H11C12.9123 20.0004 14.2508 19.999 15.2617 19.8696C16.2486 19.7432 16.7712 19.5105 17.1387 19.1606C17.4993 18.8171 17.7338 18.3388 17.8633 17.4213C17.9976 16.4699 18 15.206 18 13.3803C18 11.5547 17.9976 10.2907 17.8633 9.33929C17.7338 8.42203 17.4993 7.94348 17.1387 7.60003C16.8417 7.31726 16.4465 7.1146 15.7969 6.97991C15.2561 6.86776 14.9084 6.33806 15.0205 5.7973ZM10.0684 0.00139732C10.4702 0.0177374 10.831 0.175329 11.1172 0.411554C11.6975 0.890633 12.4814 1.75628 13.0342 2.39105C13.1886 2.56835 13.3845 2.79006 13.5137 2.99358C13.6408 3.19392 13.9008 3.68257 13.6348 4.24554C13.3672 4.81166 12.8126 4.93277 12.5771 4.96722C12.3504 5.00037 12.0731 5.00059 11.8408 5.00042C11.5684 5.00022 11.2959 5.00042 11.0234 5.00042V13.0004C11.0234 13.5526 10.5649 14.0004 10 14.0004C9.4351 14.0004 8.97761 13.5526 8.97754 13.0004V5.00042C8.7049 5.00042 8.43182 5.00022 8.15918 5.00042C7.927 5.00059 7.64962 5.00037 7.42285 4.96722C7.18735 4.93276 6.6328 4.81154 6.36524 4.24554C6.0993 3.68274 6.35922 3.19397 6.48633 2.99358C6.6154 2.79018 6.81159 2.5692 6.96582 2.39202C7.51855 1.75707 8.30211 0.889728 8.88281 0.410577C9.20361 0.145914 9.61641 -0.0169038 10.0684 0.00139732Z" fill="currentColor"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.668 6.87988C17.933 6.88077 18.958 7.90689 18.958 9.17188V16.665C18.958 17.9306 17.9325 18.9569 16.667 18.957H9.16699C7.90134 18.957 6.875 17.9307 6.875 16.665V9.16699C6.875 7.90081 7.90183 6.87428 9.16797 6.875L16.668 6.87988ZM12.502 1.04785C13.7668 1.04893 14.792 2.07493 14.792 3.33984V5.83691L9.16895 5.83301C7.32711 5.83175 5.83301 7.32515 5.83301 9.16699V14.79H3.33301C2.06757 14.7899 1.04209 13.7645 1.04199 12.499V3.33301C1.04217 2.06688 2.06879 1.04111 3.33496 1.04199L12.502 1.04785Z" fill="currentColor"/>
    </svg>
  )
}

function QrCodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H11V11H3V3ZM5 5V9H9V5H5ZM13 3H21V11H13V3ZM15 5V9H19V5H15ZM3 13H11V21H3V13ZM5 15V19H9V15H5ZM13 13H15V15H13V13ZM15 15H17V17H15V15ZM17 13H19V15H17V13ZM19 15H21V17H19V15ZM13 17H15V19H13V17ZM15 19H17V21H15V19ZM17 17H19V19H17V17ZM19 19H21V21H19V19Z" fill="currentColor"/>
    </svg>
  )
}

function NodigUit({ onBack }) {
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const inviteLink = 'carepool.io/1223JSq20'

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="nodig-uit">
      {/* Header */}
      <header className="nodig-uit__header">
        <button className="nodig-uit__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="nodig-uit__title">Nodig iemand uit</h1>
      </header>

      <div className="nodig-uit__body">
        {/* Illustration */}
        <div className="nodig-uit__illustration">
          <img src="./icons/invite-illustration.svg" alt="" className="nodig-uit__illustration-img" />
        </div>

        {/* Content */}
        <h2 className="nodig-uit__heading">Nodig jouw zorgverleners uit</h2>
        <p className="nodig-uit__description">
          Stuur vertrouwde zorgverleners en informele zorghulpen onderstaande link. Zodra ze zich aanmelden, verschijnen ze in je Carepool.
        </p>

        {/* Link field */}
        <div className="nodig-uit__link-field">
          <span className="nodig-uit__link-text">{inviteLink}</span>
          <button
            className="nodig-uit__copy-btn"
            onClick={handleCopy}
            aria-label={copied ? 'Link gekopieerd' : 'Kopieer link'}
          >
            <CopyIcon />
          </button>
        </div>

        {/* Actions */}
        <div className="nodig-uit__actions">
          <button
            className="nodig-uit__action-btn nodig-uit__action-btn--primary"
            onClick={() => alert('Deel link (nog niet geimplementeerd)')}
          >
            <ShareIcon />
            Deel link
          </button>
          <button
            className="nodig-uit__action-btn nodig-uit__action-btn--primary"
            onClick={() => setShowQr(true)}
          >
            <QrCodeIcon />
            QR code
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQr && (
        <div className="nodig-uit__overlay" onClick={() => setShowQr(false)}>
          <div className="nodig-uit__modal" onClick={e => e.stopPropagation()}>
            <h2 className="nodig-uit__modal-title">Scan de uitnodigingslink</h2>
            <div className="nodig-uit__qr-wrapper">
              <QRCodeSVG
                value={`https://${inviteLink}`}
                size={260}
                fgColor="#6100FF"
                bgColor="transparent"
                level="M"
              />
            </div>
            <button
              className="nodig-uit__modal-close"
              onClick={() => setShowQr(false)}
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NodigUit
