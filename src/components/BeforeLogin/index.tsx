import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { DemoAccessCard } from './DemoAccessCard'

const BeforeLogin: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  // Same brand accent the public site and the rest of the admin use, so the
  // login screen — the one page a visitor sees before ever authenticating —
  // never shows a stale hardcoded color if the accent changes in Site Settings.
  const accent = siteSettings?.accentColor?.trim() || '#C8642F'

  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `:root{--fastora-accent:${accent};--fastora-accent-hover:${accent};}`,
        }}
      />
      <div className="fastora-login-intro">
        <h1>Welcome back.</h1>
        <p>Sign in to manage Fastora&apos;s pages, content, and brand settings.</p>
      </div>
      <DemoAccessCard />
    </>
  )
}

export default BeforeLogin
