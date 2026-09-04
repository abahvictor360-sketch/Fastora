/**
 * The people with a profile page of their own, at /<slug>.
 *
 * Deliberately a file rather than CMS content: these are three stable pages
 * whose URLs are handed out on business cards and in email signatures, so they
 * should not be one accidental unpublish away from 404ing. The About page's
 * team grid still comes from the CMS — this only adds the deeper page behind a
 * name, and matches the two by name so the grid links here automatically.
 *
 * Roles and bios are the same copy the About page carries, kept in step by
 * hand. To add a member: add an entry, then a route file at
 * src/app/(frontend)/<slug>/page.tsx re-exporting the shared profile page.
 */
export type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'threads'
  | 'tiktok'
  | 'youtube'
  | 'whatsapp'

export type TeamMember = {
  /** The URL: /kator, /genesis, /ndidiamaka. */
  slug: string
  /** Full name, matched against the CMS team grid to link the two together. */
  name: string
  role: string
  bio: string
  /**
   * Headshot served from /public, e.g. '/team/kator.jpg'. Optional: without
   * one the page shows initials on a brand-tinted circle, the same fallback
   * the About page's team grid uses.
   */
  photo?: string
  /** Rendered as icon buttons, in the order listed. */
  socials: { platform: SocialPlatform; url: string }[]
  /** Shown as a "Get in touch" button when set. */
  email?: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'kator',
    name: 'Kator Tarkaa',
    role: 'Founder & Digital Communications Strategist',
    bio:
      "Kator leads Fastora's strategy, helping businesses communicate more effectively through " +
      'brand positioning, communications, content, and digital strategy. His work focuses on ' +
      'helping businesses present themselves with confidence and build stronger connections with ' +
      'the people they serve.',
    socials: [],
  },
  {
    // Emmanuel goes by Genesis, so the URL is /genesis while the page and the
    // About grid both carry the name his colleagues and clients see in writing.
    slug: 'genesis',
    name: 'Emmanuel Akaluese',
    role: 'Operations Associate',
    bio:
      'Emmanuel helps keep projects moving from idea to delivery. He supports internal ' +
      'operations, coordinates workflows, and ensures client projects stay organised, ' +
      'efficient, and on schedule.',
    socials: [],
  },
  {
    slug: 'ndidiamaka',
    name: 'Eya Ndidiamaka',
    role: 'Digital Communications Associate',
    bio:
      'Ndidiamaka supports the planning, coordination, and delivery of digital communications ' +
      'across client accounts. She helps ensure content is published consistently and that ' +
      'day-to-day communication reflects the quality and direction of each brand.',
    socials: [],
  },
]

/** A member is publishable once there is something to say about them. */
export const isPublished = (member: TeamMember): boolean =>
  Boolean(member.role.trim() || member.bio.trim())

export const getTeamMember = (slug: string): TeamMember | undefined =>
  TEAM.find((member) => member.slug === slug)

/** The published profile path for a name from the CMS grid, if there is one. */
export const profilePathForName = (name: string): string | null => {
  const match = TEAM.find(
    (member) => member.name.toLowerCase() === name.trim().toLowerCase() && isPublished(member),
  )
  return match ? `/${match.slug}` : null
}

/** Slugs the catch-all [slug] route must not try to render from the CMS. */
export const TEAM_SLUGS = TEAM.map((member) => member.slug)
