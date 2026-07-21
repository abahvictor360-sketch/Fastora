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
            {
              name: 'primaryColor',
              type: 'text',
              defaultValue: '#111113',
              admin: { description: 'Hex color. Used for primary text and buttons.' },
            },
            {
              name: 'accentColor',
              type: 'text',
              defaultValue: '#3D5AFE',
              admin: { description: 'Hex color. Used for links, highlights, and CTAs.' },
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
