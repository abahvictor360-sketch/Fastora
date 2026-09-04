import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa6'

import { getTeamMember, isPublished } from '@/config/team'
import { socialIcons, socialLabels } from '@/config/socials'
import { PageHeader } from '@/components/PageHeader'
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
 * One person's page, rendered by the thin route file at /<slug>.
 *
 * Everything is local data, so unlike the rest of the site this page cannot be
 * taken down by the API being unreachable — which is rather the point of giving
 * someone a URL to put on a business card.
 */
export const TeamMemberProfile: React.FC<{ slug: string }> = ({ slug }) => {
  const member = getTeamMember(slug)

  // A member with no role and no bio has nothing to show; 404 rather than
  // publish an empty profile. Filling in src/config/team.ts turns it on.
  if (!member || !isPublished(member)) notFound()

  const url = getServerSideURL()

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: `${url}/${member.slug}`,
    worksFor: { '@type': 'ProfessionalService', name: 'Fastora', url },
    ...(member.photo ? { image: `${url}${member.photo}` } : {}),
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

      <PageHeader eyebrow="Team" title={member.name} description={member.role} />

      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div data-reveal="up" className="shrink-0">
            {member.photo ? (
              <div className="h-40 w-40 overflow-hidden rounded-full md:h-48 md:w-48">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                  priority
                />
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
            <p data-reveal="up" className="max-w-2xl text-lg text-muted-foreground">
              {member.bio}
            </p>

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
                        key={social.platform}
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

/** Metadata for a profile route, kept next to the page it describes. */
export function teamMemberMetadata(slug: string) {
  const member = getTeamMember(slug)
  if (!member || !isPublished(member)) return { title: { absolute: 'Fastora' } }

  const title = `${member.name}, ${member.role} | Fastora`
  const description = member.bio

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${getServerSideURL()}/${member.slug}` },
    openGraph: {
      title,
      description,
      url: `/${member.slug}`,
      type: 'profile' as const,
      ...(member.photo ? { images: [{ url: `${getServerSideURL()}${member.photo}` }] } : {}),
    },
  }
}
