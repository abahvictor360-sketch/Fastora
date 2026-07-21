import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="mb-6">
      <Banner type="success">
        <h4 style={{ margin: 0 }}>Welcome to the Fastora admin</h4>
      </Banner>
      <p>Here&apos;s what to do next:</p>
      <ul style={{ listStyle: 'decimal', marginBottom: '0.75rem', paddingLeft: '1.25rem' }}>
        <li>
          <SeedButton />
          {' to seed Site Settings, sample services, case studies, and a blog post, then '}
          <a href="/" target="_blank">
            visit your website
          </a>
          {' to see the results.'}
        </li>
        <li>
          Upload your logo (light + dark) and favicon under <strong>Site Settings</strong>, then
          fill in your contact details and social links.
        </li>
        <li>
          Edit the Home, About, and Contact pages under <strong>Pages</strong>, and manage
          Services, Case Studies, and Insights from the sidebar.
        </li>
        <li>Commit and push your changes to trigger a redeployment on Vercel.</li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
