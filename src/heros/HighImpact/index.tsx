import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const hasMedia = media && typeof media === 'object'

  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground">
      {hasMedia ? (
        <>
          <Media fill imgClassName="absolute inset-0 object-cover" priority resource={media} />
          <div className="absolute inset-0 bg-primary/70" />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(60% 60% at 15% 10%, rgba(61,90,254,0.35), transparent), radial-gradient(50% 50% at 90% 30%, rgba(124,58,237,0.35), transparent)',
          }}
        />
      )}

      <div className="container relative z-10 py-28 md:py-40">
        <div className="max-w-3xl">
          {richText && (
            <RichText
              className="[&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:leading-[1.05] md:[&_h1]:text-7xl [&_p]:mt-6 [&_p]:max-w-xl [&_p]:text-lg [&_p]:text-primary-foreground/75"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} size="lg" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
