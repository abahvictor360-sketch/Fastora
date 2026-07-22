import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Fastora. Tell us what you want to achieve.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const [{ docs: services }, siteSettings] = await Promise.all([
    payload.find({
      collection: 'services',
      depth: 0,
      limit: 100,
      sort: 'order',
      where: { _status: { equals: 'published' } },
      select: { title: true },
    }),
    getCachedGlobal('site-settings', 0)(),
  ])

  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }))

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Let's start your project"
        description="Tell us where you want to go. We'll come back with how to get there — fast."
      />

      <section className="container grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_18rem]">
        <div data-reveal="up" className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <ContactForm services={serviceOptions} />
        </div>

        <aside className="flex flex-col gap-8" data-reveal="up">
          {siteSettings?.contactEmail && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-secondary">Email</p>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="mt-2 block text-sm hover:text-secondary"
              >
                {siteSettings.contactEmail}
              </a>
            </div>
          )}
          {siteSettings?.contactPhone && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-secondary">Phone</p>
              <a
                href={`tel:${siteSettings.contactPhone}`}
                className="mt-2 block text-sm hover:text-secondary"
              >
                {siteSettings.contactPhone}
              </a>
            </div>
          )}
          {siteSettings?.address && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-secondary">Studio</p>
              <p className="mt-2 text-sm text-muted-foreground">{siteSettings.address}</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}
