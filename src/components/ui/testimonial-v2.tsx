'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface Testimonial {
  text: string
  image?: string
  name: string
  role: string
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

// Full literal class strings (not template-interpolated) so Tailwind's
// static scanner can find them — a dynamically built `animate-[...]`
// string would silently get purged from the production build.
const SCROLL_ANIMATION_CLASSES = [
  'motion-safe:animate-[fastora-testimonial-scroll_15s_linear_infinite]',
  'motion-safe:animate-[fastora-testimonial-scroll_19s_linear_infinite]',
  'motion-safe:animate-[fastora-testimonial-scroll_17s_linear_infinite]',
]

const TestimonialsColumn = ({
  className,
  testimonials,
  animationClass,
}: {
  className?: string
  testimonials: Testimonial[]
  animationClass: string
}) => {
  return (
    <div className={className}>
      <ul className={`m-0 flex list-none flex-col gap-6 p-0 pb-6 ${animationClass}`}>
        {[...new Array(2).fill(0)].map((_, dupeIndex) => (
          <React.Fragment key={dupeIndex}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${dupeIndex}-${i}`}
                aria-hidden={dupeIndex === 1 ? 'true' : 'false'}
                tabIndex={dupeIndex === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="group w-full max-w-xs cursor-default select-none rounded-3xl border border-border bg-card p-8 shadow-lg shadow-black/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 leading-relaxed text-muted-foreground">{text}</p>
                  <footer className="mt-6 flex items-center gap-3">
                    {image ? (
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-border transition-all duration-300 ease-in-out group-hover:ring-secondary/40"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-sm font-semibold text-secondary ring-2 ring-border transition-all duration-300 ease-in-out group-hover:ring-secondary/40"
                      >
                        {initials(name)}
                      </span>
                    )}
                    <div className="flex flex-col">
                      <cite className="not-italic font-semibold leading-5 tracking-tight text-foreground">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 tracking-tight text-muted-foreground">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

/**
 * Auto-scrolling testimonial columns. Column count adapts to how much real
 * content there is (1 column for a handful of quotes, up to 3 once there's
 * enough to fill them) rather than always rendering 3, which would leave
 * near-empty columns scrolling on a mostly-blank space. The scroll loop
 * itself is a plain CSS animation (GPU-composited, respects
 * prefers-reduced-motion via `motion-safe:` automatically) — only the
 * per-card hover/focus lift uses framer-motion, where its spring physics
 * actually add something a CSS transition can't.
 */
export const ScrollingTestimonials: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  if (!testimonials.length) return null

  const columnCount = testimonials.length <= 3 ? 1 : testimonials.length <= 6 ? 2 : 3
  const columns: Testimonial[][] = Array.from({ length: columnCount }, () => [])
  testimonials.forEach((t, i) => columns[i % columnCount].push(t))

  const responsiveClasses = ['', 'hidden md:block', 'hidden lg:block']

  return (
    <div
      className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      role="region"
      aria-label="Scrolling testimonials"
    >
      {columns.map((col, i) => (
        <TestimonialsColumn
          key={i}
          testimonials={col}
          animationClass={SCROLL_ANIMATION_CLASSES[i]}
          className={columnCount > 1 ? responsiveClasses[i] : undefined}
        />
      ))}
    </div>
  )
}
