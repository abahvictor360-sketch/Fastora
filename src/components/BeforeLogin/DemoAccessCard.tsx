'use client'

import React, { useState } from 'react'

const DEMO_EMAIL = 'demo@fastora.example'
const DEMO_PASSWORD = 'FastoraDemo2026!'

/** Sets a controlled React input's value the way a real keystroke would, so
 * Payload's login form (which reads state via onChange) actually picks it up
 * — a plain `input.value = x` is invisible to React's controlled inputs. */
function fillControlledInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
  setter?.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

export const DemoAccessCard: React.FC = () => {
  const [filled, setFilled] = useState(false)

  const handleFill = () => {
    const email = document.getElementById('field-email') as HTMLInputElement | null
    const password = document.getElementById('field-password') as HTMLInputElement | null
    if (!email || !password) return

    fillControlledInput(email, DEMO_EMAIL)
    fillControlledInput(password, DEMO_PASSWORD)
    setFilled(true)
  }

  return (
    <div className="fastora-demo-access">
      <div className="fastora-demo-access__text">
        <p className="fastora-demo-access__title">Just here to look around?</p>
        <p className="fastora-demo-access__desc">
          Use the read-only demo account — browse every section, nothing can be changed or deleted.
        </p>
      </div>
      <button type="button" onClick={handleFill} className="fastora-demo-access__button">
        {filled ? 'Credentials filled — hit Login ↓' : 'Fill in demo credentials'}
      </button>
    </div>
  )
}
