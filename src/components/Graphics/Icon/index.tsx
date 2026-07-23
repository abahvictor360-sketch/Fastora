import React from 'react'

/**
 * Admin icon — replaces the Payload mark in the collapsed nav and favicon slots.
 * A Sky Blue rounded square with an "F" monogram.
 */
const Icon: React.FC = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fastora"
    >
      <rect width="28" height="28" rx="7" fill="#2B7FD6" />
      <path
        d="M9 7.5h10v3.2h-6.5v3.1H18v3.1h-5.5V21H9V7.5Z"
        fill="#0B2545"
      />
    </svg>
  )
}

export default Icon
