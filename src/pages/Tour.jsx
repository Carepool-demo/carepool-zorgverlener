import { useState } from 'react'
import { RocketIcon, PlayCircleIcon } from '@shared/components/Icons'
import './Tour.css'

/* ---- Tour step data ---- */
const STEPS = [
  {
    id: 'welkom',
    title: 'Welkom!',
    description: 'In de volgende stappen zie je wat je met deze Carepool app kunt doen.',
    illustration: null, // Welcome uses special layout
    buttonText: 'Volgende',
    showSkip: false,
    showDots: false,
  },
  {
    id: 'connecties',
    title: 'Alle zorgvragers en zorgverleners op één plek!',
    description: 'Gemakkelijk berichten sturen naar zorgvragers en zorgteams.',
    illustration: '/tour/tour1.svg',
    illustrationHeight: 256,
    illustrationFit: 'contain',
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'agenda',
    title: 'Afspraken plannen is eenvoudig',
    description: 'Je geeft je beschikbaarheid aan en ontvangt oproepen van zorgvragers.',
    illustration: '/tour/tour2-hand.svg',
    illustrationHeight: 340,
    illustrationFit: 'contain',
    illustrationNoMargin: true,
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'administratie',
    title: 'Administratie',
    description: 'Je werkt samen met de zorgvrager in één gedeelde administratie. Hierin zie je altijd je eigen gewerkte uren en tarieven.',
    illustration: '/tour/tour5.svg',
    illustrationHeight: 294,
    illustrationFit: 'contain',
    illustrationPosition: 'left bottom',
    buttonText: 'Volgende',
    showSkip: false,
    showDots: true,
  },
  {
    id: 'zoeken',
    title: 'Nieuwe zorgvragers vinden',
    description: 'Nog in ontwikkeling! Deze functie komt eind 2026 beschikbaar.',
    illustration: '/tour/tour4.svg',
    illustrationHeight: 268,
    illustrationFit: 'contain',
    illustrationPosition: 'right bottom',
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'filmpje',
    title: 'Ontdek de visie achter Carepool',
    description: 'Carepool is een sociale onderneming die het regelen van zorg een stuk eenvoudiger wil maken. Bekijk het filmpje om meer te horen.',
    illustration: null, // Video step uses special layout
    buttonText: 'Starten',
    showSkip: false,
    showDots: true,
  },
]

const TOTAL_DOTS = 5 // Steps 1-5 have dots (step 0 has none)

const YOUTUBE_ID = 'iqHhl7Q_Ql8'

/* ---- Tour component ---- */
function Tour({ onClose }) {
  const [step, setStep] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function handleNext() {
    if (isLast) {
      onClose()
    } else {
      setStep(step + 1)
    }
  }

  function handleSkip() {
    onClose()
  }

  // Progress dots: steps 1-6 map to dot indices 0-5
  // Current dot index = step - 1 (since step 0 has no dots)
  const dotIndex = step - 1

  return (
    <div className="tour">
      {/* Skip button (top right) */}
      {current.showSkip && (
        <button className="tour__skip" onClick={handleSkip}>
          Sla over
        </button>
      )}

      {/* Content area */}
      <div className="tour__content">
        {step === 0 ? (
          /* Welcome screen — special centered layout */
          <div className="tour__welcome">
            <div className="tour__welcome-title">
              <span>Welkom!</span>
              <RocketIcon />
            </div>
            <p className="tour__welcome-text">{current.description}</p>
          </div>
        ) : step === STEPS.length - 1 ? (
          /* Video screen — special layout */
          <>
            <div className="tour__video-container">
              {videoPlaying ? (
                <div className="tour__video-player">
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                    title="Carepool video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="tour__video-iframe"
                  />
                </div>
              ) : (
                <button
                  className="tour__video-placeholder"
                  onClick={() => setVideoPlaying(true)}
                  aria-label="Speel video af"
                >
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="tour__video-thumb"
                  />
                  <PlayCircleIcon />
                </button>
              )}
            </div>
            <div className="tour__text-block tour__text-block--video">
              <h2 className="tour__heading">{current.title}</h2>
              <p className="tour__description">{current.description}</p>
            </div>
          </>
        ) : (
          /* Regular step with illustration */
          <>
            <div
              className="tour__illustration"
              style={current.illustrationNoMargin ? { marginTop: 0 } : undefined}
            >
              {current.illustration && (
                <img
                  src={current.illustration}
                  alt=""
                  className="tour__illustration-img"
                  style={current.illustrationHeight ? {
                    height: current.illustrationHeight,
                    objectFit: current.illustrationFit || 'cover',
                    objectPosition: current.illustrationPosition || (current.illustrationFit === 'contain' ? 'left bottom' : 'bottom center'),
                  } : current.illustrationFit === 'contain' ? {
                    maxHeight: '100%',
                    objectFit: 'contain',
                    objectPosition: current.illustrationPosition || 'left bottom',
                  } : undefined}
                />
              )}
            </div>
            <div className="tour__text-block">
              <h2 className="tour__heading">{current.title}</h2>
              <p className="tour__description">{current.description}</p>
            </div>
          </>
        )}
      </div>

      {/* Footer: dots + button */}
      <div className="tour__footer">
        {current.showDots && (
          <div className="tour__dots">
            {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
              <div
                key={i}
                className={`tour__dot ${i <= dotIndex ? 'tour__dot--active' : ''}`}
              />
            ))}
          </div>
        )}
        <button className="tour__button" onClick={handleNext}>
          {current.buttonText}
        </button>
      </div>
    </div>
  )
}

export default Tour
