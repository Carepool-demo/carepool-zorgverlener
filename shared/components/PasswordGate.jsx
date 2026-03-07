import { useState, useEffect } from 'react'
import './PasswordGate.css'

const DEMO_PASSWORD = 'demo2026'
const STORAGE_KEY = 'carepool-demo-access'

function PasswordGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsUnlocked(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (isUnlocked) return children

  return (
    <div className="pw-gate">
      <div className="pw-gate__card">
        <div className="pw-gate__logo">Carepool</div>
        <p className="pw-gate__subtitle">Voer de code in om de demo te bekijken</p>
        <form className="pw-gate__form" onSubmit={handleSubmit}>
          <input
            className={`pw-gate__input ${error ? 'pw-gate__input--error' : ''}`}
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            autoFocus
            aria-label="Wachtwoord"
          />
          {error && <p className="pw-gate__error">Onjuist wachtwoord</p>}
          <button className="pw-gate__btn" type="submit">Bekijk demo</button>
        </form>
      </div>
    </div>
  )
}

export default PasswordGate
