import React from 'react'

import type { HeroData } from '@/heros/types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/**
 * High-impact hero — dark, editorial, no imagery.
 * A soft terracotta glow sits behind the headline and an oversized
 * "FASTORA" wordmark anchors the section, mirroring the reference layout.
 */
export const HighImpactHero: React.FC<HeroData> = ({ links, richText }) => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* ambient accent glow */}
      <div
        className="animate-float pointer-events-none absolute -top-24 right-[-10%] h-[38rem] w-[38rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(200,100,47,0.32), transparent 62%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div
        className="container relative z-10 pt-32 pb-16 md:pt-44 md:pb-24"
        data-reveal-group="120"
      >
        <div className="flex flex-col gap-6">
          {/* rating row */}
          <div
            data-reveal="up"
            className="flex items-center gap-3 text-sm text-primary-foreground/70"
          >
            <span className="flex gap-0.5 text-secondary" aria-hidden="true">
              {'★★★★★'}
            </span>
            <span>Trusted by teams shipping at speed</span>
          </div>

          {richText && (
            <div data-reveal="up">
              <RichText
                className="max-w-4xl [&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:leading-[1.02] [&_h1]:text-violet-400 md:[&_h1]:text-7xl [&_p]:mt-6 [&_p]:max-w-xl [&_p]:text-lg [&_p]:text-primary-foreground/70"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul data-reveal="up" className="mt-4 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} size="lg" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* oversized wordmark */}
      <div
        data-reveal="mask"
        className="container relative z-10 select-none pb-10 md:pb-16"
        aria-hidden="true"
      >
        <span className="block bg-gradient-to-b from-primary-foreground/90 to-primary-foreground/25 bg-clip-text text-[24vw] font-bold leading-none tracking-tighter text-transparent">
          FASTORA
        </span>
      </div>
    </section>
  )
}
