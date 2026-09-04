import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import {
  getPageBySlug,
  getPageSlugs,
  getTeamMemberBySlug,
  getTeamMembers,
  safely,
} from '@/lib/api'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { TeamMemberProfile } from '@/components/TeamMemberProfile'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveOrDefer } from '@/utilities/resolveOrDefer'

// Slugs owned by dedicated route files (app/(frontend)/<slug>/page.tsx),
// which need real logic — live collection queries, a form — that the
// block-based layout can't express. Their Pages documents exist only to
// make the header copy CMS-editable; this catch-all must never render them.
const RESERVED_SLUGS = ['home', 'services', 'case-studies', 'contact', 'insights', 'login']

export async function generateStaticParams() {
  const [slugs, members] = await Promise.all([
    safely(() => getPageSlugs(), []),
    safely(() => getTeamMembers(), []),
  ])

  // Team profiles live at the top level too — /kator, not /team/kator — so a
  // person is one of the things this route can be asked for.
  return [...slugs, ...members.map((member) => member.slug)]
    .filter((slug) => Boolean(slug) && !RESERVED_SLUGS.includes(slug))
    .map((slug) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params

  // Reserved slugs are served by their own dedicated route files.
  if (RESERVED_SLUGS.includes(slug)) notFound()

  const page = await queryPageBySlug({ slug })

  // No Pages document by that name: it may still be somebody's profile.
  if (!page) {
    const member = await queryTeamMemberBySlug({ slug })
    if (member) return <TeamMemberProfile member={member} />

    notFound()
  }

  const { hero, layout } = page

  return (
    <article>
      <RenderHero
        type={hero.type}
        eyebrow={hero.eyebrow}
        richText={hero.richText}
        links={hero.links}
        media={hero.media}
      />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug({ slug })

  if (page) return generateMeta({ doc: page, path: `/${slug}` })

  const member = await queryTeamMemberBySlug({ slug })
  if (!member) return generateMeta({ doc: null, path: `/${slug}` })

  // An editor's SEO fields win; otherwise the person's own name and bio are
  // better than the generic fallback generateMeta would produce from an empty
  // meta block.
  return generateMeta({
    doc: {
      slug: member.slug,
      meta: {
        ...member.meta,
        title: member.meta.title || [member.name, member.role].filter(Boolean).join(', '),
        description: member.meta.description || member.bio,
        image: member.meta.image ?? member.photo,
      },
    },
    path: `/${slug}`,
  })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) =>
  resolveOrDefer(() => getPageBySlug(slug)),
)

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) =>
  resolveOrDefer(() => getTeamMemberBySlug(slug)),
)
