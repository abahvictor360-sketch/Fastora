import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    description:
      'Global brand assets, contact details, and footer content shared across every page.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Fastora',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Digital services and social media, engineered for speed.',
            },
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (for light backgrounds)',
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (for dark backgrounds, e.g. footer)',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Colors',
          description:
            'Recolor the entire public website from here. Use hex values (e.g. #C8642F). Leave a field blank to keep its built-in default. Changes apply site-wide after saving.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'accentColor',
                  type: 'text',
                  defaultValue: '#C8642F',
                  admin: {
                    width: '50%',
                    description: 'Brand accent — buttons, links, highlights, CTAs.',
                  },
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  defaultValue: '#08080A',
                  admin: { width: '50%', description: 'Page background.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'textColor',
                  type: 'text',
                  defaultValue: '#ECEAE4',
                  admin: { width: '50%', description: 'Body text color.' },
                },
                {
                  name: 'surfaceColor',
                  type: 'text',
                  defaultValue: '#121216',
                  admin: { width: '50%', description: 'Cards and raised surfaces.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'borderColor',
                  type: 'text',
                  defaultValue: '#26262C',
                  admin: { width: '50%', description: 'Borders and dividers.' },
                },
                {
                  name: 'mutedTextColor',
                  type: 'text',
                  defaultValue: '#9D9A92',
                  admin: { width: '50%', description: 'Secondary / muted text.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  // Reuses the existing `primary_color` column.
                  name: 'primaryColor',
                  type: 'text',
                  defaultValue: '#101014',
                  label: 'Dark panel background',
                  admin: {
                    width: '50%',
                    description: 'Hero, footer, and feature bands.',
                  },
                },
                {
                  name: 'darkPanelTextColor',
                  type: 'text',
                  defaultValue: '#F4F2EC',
                  admin: { width: '50%', description: 'Text on dark panels.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
            },
            {
              name: 'contactPhone',
              type: 'text',
            },
            {
              name: 'address',
              type: 'text',
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'X / Twitter', value: 'twitter' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Facebook', value: 'facebook' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              defaultValue: `© ${new Date().getFullYear()} Fastora. All rights reserved.`,
            },
            {
              name: 'newsletterHeading',
              type: 'text',
              defaultValue: 'Get speed tips in your inbox',
            },
            {
              name: 'newsletterSubheading',
              type: 'text',
              defaultValue: 'One email a month. No fluff.',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
