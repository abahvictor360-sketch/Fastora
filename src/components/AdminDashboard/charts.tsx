import React from 'react'

const ACCENT = '#C8642F'
const ACCENT_SOFT = 'rgba(200,100,47,0.16)'
const GRID = '#2A2A30'
const MUTED = '#8A8790'

/** Simple area/line chart for a small time series. No client JS needed — pure SVG. */
export const AreaChart: React.FC<{ data: { label: string; count: number }[]; height?: number }> = ({
  data,
  height = 220,
}) => {
  const width = 640
  const padding = 28
  const max = Math.max(1, ...data.map((d) => d.count))
  const stepX = (width - padding * 2) / Math.max(1, data.length - 1)

  const points = data.map((d, i) => {
    const x = padding + i * stepX
    const y = height - padding - (d.count / max) * (height - padding * 2)
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="fastora-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={padding + f * (height - padding * 2)}
          y2={padding + f * (height - padding * 2)}
          stroke={GRID}
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill="url(#fastora-area-fill)" />
      <path d={linePath} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={ACCENT} />
      ))}
      {data.map((d, i) => (
        <text
          key={d.label}
          x={points[i].x}
          y={height - 6}
          textAnchor="middle"
          fontSize={11}
          fill={MUTED}
        >
          {d.label}
        </text>
      ))}
    </svg>
  )
}

/** Horizontal set of vertical bars, each with its own percentage-of-max height. */
export const BarStat: React.FC<{
  items: { label: string; value: number; color?: string }[]
}> = ({ items }) => {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', height: 140 }}>
      {items.map((item) => {
        const pct = Math.round((item.value / max) * 100)
        return (
          <div
            key={item.label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <div
              style={{
                width: 34,
                height: 96,
                borderRadius: 8,
                background: '#232227',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${Math.max(6, pct)}%`,
                  background: item.color || ACCENT,
                  borderRadius: 8,
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: MUTED }}>{item.value}</span>
            <span style={{ fontSize: 11, color: MUTED, textAlign: 'center' }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/** Circular progress ring — used for the small metric cards. */
export const ProgressRing: React.FC<{
  percent: number
  color?: string
  size?: number
  strokeWidth?: number
  label?: string
}> = ({ percent, color = ACCENT, size = 64, strokeWidth = 6, label }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={GRID}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {label && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: '#ECEAE4',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

/** Donut chart with a center label — used for the Inquiries-by-status breakdown. */
export const DonutChart: React.FC<{
  segments: { label: string; value: number; color: string }[]
  centerLabel: string
  centerSublabel?: string
  size?: number
}> = ({ segments, centerLabel, centerSublabel, size = 140 }) => {
  const total = Math.max(
    1,
    segments.reduce((sum, s) => sum + s.value, 0),
  )
  const strokeWidth = 16
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  let offsetAccum = 0

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={GRID} strokeWidth={strokeWidth} />
        {segments.map((seg) => {
          const fraction = seg.value / total
          const dash = fraction * circumference
          const gap = circumference - dash
          const rotation = (offsetAccum / total) * 360 - 90
          offsetAccum += seg.value
          if (seg.value === 0) return null
          return (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            />
          )
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: '#ECEAE4' }}>{centerLabel}</span>
        {centerSublabel && <span style={{ fontSize: 11, color: MUTED }}>{centerSublabel}</span>}
      </div>
    </div>
  )
}

export { ACCENT, ACCENT_SOFT, GRID, MUTED }
