import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './Toast.css'

/* ---- Global event bus for toast ---- */
const listeners = new Set()

export function showToast(message) {
  listeners.forEach(fn => fn(message))
}

/* ---- Toast component (render once in App shell) ---- */
export default function Toast() {
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(0)

  const handleToast = useCallback((msg) => {
    setMessage(msg)
    setVisible(true)
    setKey(k => k + 1)
  }, [])

  useEffect(() => {
    listeners.add(handleToast)
    return () => listeners.delete(handleToast)
  }, [handleToast])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [visible, key])

  if (!visible) return null

  return createPortal(
    <div className="toast" key={key} role="status" aria-live="polite">
      <span className="toast__message">{message}</span>
    </div>,
    document.body
  )
}
