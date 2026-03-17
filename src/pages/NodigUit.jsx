import { showToast } from '@shared/components/Toast'
import { useState, useRef, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { BackArrowIcon, ShareIcon, CopyIcon, QrCodeIcon } from '@shared/components/Icons'
import './NodigUit.css'

function NodigUit({ onBack }) {
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const inviteLink = 'carepool.io/1223JSq20'
  const copyTimer = useRef(null)

  useEffect(() => {
    return () => { if (copyTimer.current) clearTimeout(copyTimer.current) }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="nodig-uit">
      {/* Header */}
      <header className="sub-header nodig-uit__header">
        <button className="sub-header__back-btn nodig-uit__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="sub-header__title">Nodig iemand uit</h1>
      </header>

      <div className="nodig-uit__body">
        {/* Illustration */}
        <div className="nodig-uit__illustration">
          <img src="./icons/invite-illustration.svg" alt="" className="nodig-uit__illustration-img" />
        </div>

        {/* Content */}
        <h2 className="nodig-uit__heading">Nodig jouw zorgvragers uit</h2>
        <p className="nodig-uit__description">
          Stuur zorgvragers onderstaande link. Zodra ze zich aanmelden, verschijnen ze in je Carepool.
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
            onClick={() => showToast('Deel link (nog niet geïmplementeerd)')}
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
                fgColor="var(--color-cta, #6100FF)"
                bgColor="transparent"
                level="M"
              />
            </div>
            <button
              className="nodig-uit__modal-close"
              onClick={() => setShowQr(false)}
              aria-label="Sluit QR-code"
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
