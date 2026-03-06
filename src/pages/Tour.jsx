import { useState } from 'react'
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
    id: 'zorgverleners',
    title: 'Al je zorgverleners op één plek!',
    description: 'Voeg je zorgverleners toe en verstuur gemakkelijk berichten naar personen of teams.',
    illustration: '/tour/tour1.svg',
    illustrationHeight: 256,
    illustrationFit: 'contain',
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'instellingen',
    title: 'Stel alles één keer in',
    description: 'Selecteer je pgb-wet en kies de zorgcategorieën waarvoor je de administratie wilt bijhouden.',
    illustration: '/tour/tour2-hand.svg',
    illustrationHeight: 340,
    illustrationFit: 'contain',
    illustrationNoMargin: true,
    buttonText: 'Starten',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'agenda',
    title: 'Plan jouw zorgmomenten',
    description: 'Via de agenda plan je eenvoudig afspraken in met beschikbare zorgverleners.',
    illustration: '/tour/tour3-illustration.svg',
    illustrationHeight: 320,
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'sjablonen',
    title: 'Sjablonen voor snelheid',
    description: 'Sjablonen besparen tijd bij zorg die vaak voorkomt. Stel ze eenmalig in, activeer ze wanneer nodig.',
    illustration: '/tour/tour4.svg',
    illustrationHeight: 268,
    illustrationFit: 'contain',
    illustrationPosition: 'right bottom',
    buttonText: 'Volgende',
    showSkip: true,
    showDots: true,
  },
  {
    id: 'administratie',
    title: 'Administratie',
    description: 'Uren en kosten worden automatisch bijgehouden in een gedeelde administratie. Zorgverleners zien hierbij alleen hun eigen uren en tarieven.',
    illustration: '/tour/tour5.svg',
    illustrationHeight: 294,
    illustrationFit: 'contain',
    illustrationPosition: 'left bottom',
    buttonText: 'Volgende',
    showSkip: false,
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

const TOTAL_DOTS = 6 // Steps 1-6 have dots (step 0 has none)

/* ---- Rocket icon for welcome screen (from Illustrations/Raket.svg) ---- */
function RocketIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.3691 18.9617C26.6972 10.0896 34.1026 2.74543 42.9839 0.5C43.2657 10.7506 38.2779 21.2769 28.4615 25.3293" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.7274 11.0396C22.325 8.03015 17.2643 12.717 15.3242 17.6795C17.6954 14.5605 22.8756 13.7201 24.6266 17.8523" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37.1541 20.0811C37.8571 24.6417 36.5041 29.4813 33.5426 33.0155C34.8393 29.9164 34.1296 25.2894 32.7168 23.5023" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32.0565 14.577C33.572 15.6831 40.7287 7.3591 38.6726 6.23971C36.6165 5.12031 30.5409 13.4709 32.0565 14.577Z" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.8091 19.3042C16.0164 19.834 18.5676 25.0256 15.0059 28.334C15.9577 28.1712 18.6617 28.8123 19.5007 28.334C19.5671 30.6492 16.863 32.1143 15.0059 33.4961C22.0007 33.4961 26.5007 29.998 28.0872 25.5124" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24.2422 19.334C26.6598 20.1677 28.2251 22.9546 27.6779 25.4558C28.0162 25.3661 28.3545 25.2797 28.6927 25.19" stroke="#6100FF" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 32.998C7.5 32.998 10.146 32.1753 12.5 29.498" stroke="#6100FF" strokeLinecap="round"/>
      <path d="M0.5 41.498C8 38.998 13 34.498 13 34.498" stroke="#6100FF" strokeLinecap="round"/>
    </svg>
  )
}

/* ---- Video play button ---- */
function PlayCircleIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="48" fill="white" fillOpacity="0.85"/>
      <path d="M40 33L64 48L40 63V33Z" fill="#6100FF"/>
    </svg>
  )
}

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
