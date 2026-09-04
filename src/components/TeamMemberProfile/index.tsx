import Link from 'next/link'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa6'

import type { TeamMember } from '@/lib/api'
import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'
import { socialIcons, socialLabels } from '@/config/socials'
import { buildBreadcrumbs } from '@/utilities/breadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'

/** "Kator Tarkaa" -> "KT", the same fallback avatar the team grid uses. */
function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

/**
 * One person's page, at /<slug>. Everything on it — name, role, bio, photo and
 * which social buttons appear — is edited under Team in the admin.
 */
export const TeamMemberProfile: React.FC<{ member: TeamMember }> = ({ member }) => {
  const url = getServerSideURL()

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    ...(member.role ? { jobTitle: member.role } : {}),
    ...(member.bio ? { description: member.bio } : {}),
    url: `${url}/${member.slug}`,
    worksFor: { '@type': 'ProfessionalService', name: 'Fastora', url },
    ...(member.photo?.url ? { image: member.photo.url } : {}),
    ...(member.socials.length ? { sameAs: member.socials.map((social) => social.url) } : {}),
  }

  const breadcrumbJsonLd = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: member.name },
  ])

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader eyebrow="Team" title={member.name} description={member.role || undefined} />

      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div data-reveal="up" className="shrink-0">
            {member.photo ? (
              <div className="h-40 w-40 overflow-hidden rounded-full md:h-48 md:w-48">
                <Media resource={member.photo} imgClassName="h-full w-full object-cover" />
              </div>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-40 w-40 items-center justify-center rounded-full bg-secondary/15 text-4xl font-semibold text-secondary md:h-48 md:w-48"
              >
                {initials(member.name)}
              </span>
            )}
          </div>

          <div data-reveal-group="90">
            {member.bio && (
              <p data-reveal="up" className="max-w-2xl text-lg text-muted-foreground">
                {member.bio}
              </p>
            )}

            {(member.socials.length > 0 || member.email) && (
              <div data-reveal="up" className="mt-10">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Connect
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {member.socials.map((social) => {
                    const Icon = socialIcons[social.platform]
                    const label = socialLabels[social.platform] || social.platform

                    return (
                      <a
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${label}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {label}
                      </a>
                    )
                  })}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                    >
                      <FaEnvelope className="h-4 w-4" />
                      Email
                    </a>
                  )}
                </div>
              </div>
            )}

            <div data-reveal="up" className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Work with us
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-card"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
