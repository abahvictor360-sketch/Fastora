import React from 'react'

/**
 * Admin logo — replaces the Payload logo on the login screen and nav header.
 * The wordmark uses `currentColor` so it stays legible in both the light and
 * dark admin themes; the mark keeps the Fastora terracotta accent.
 */
const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        color: 'currentColor',
      }}
      aria-label="Fastora"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="28" height="28" rx="7" fill="#C8642F" />
        <path d="M9 7.5h10v3.2h-6.5v3.1H18v3.1h-5.5V21H9V7.5Z" fill="#101014" />
      </svg>
      <span
        style={{
          fontSize: '30px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFamily:
            "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        Fastora
      </span>
    </div>
  )
}

export default Logo
