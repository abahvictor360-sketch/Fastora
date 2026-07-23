import type { GlobalConfig } from 'payload'

import { authenticatedNotDemo } from '../../access/authenticatedNotDemo'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticatedNotDemo,
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
              defaultValue: 'Communication that earns attention.',
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
                  defaultValue: '#2B7FD6',
                  admin: {
                    width: '50%',
                    description: 'Brand accent (Sky Blue) — buttons, links, highlights, CTAs.',
                  },
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  defaultValue: '#FFFFFF',
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
                  defaultValue: '#111827',
                  admin: { width: '50%', description: 'Body text color.' },
                },
                {
                  name: 'surfaceColor',
                  type: 'text',
                  defaultValue: '#F7F9FC',
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
                  defaultValue: '#E3E8EF',
                  admin: { width: '50%', description: 'Borders and dividers.' },
                },
                {
                  name: 'mutedTextColor',
                  type: 'text',
                  defaultValue: '#5B6472',
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
                  defaultValue: '#0B2545',
                  label: 'Dark panel background (Navy)',
                  admin: {
                    width: '50%',
                    description: 'Hero, footer, and feature bands.',
                  },
                },
                {
                  name: 'darkPanelTextColor',
                  type: 'text',
                  defaultValue: '#FFFFFF',
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
                    { label: 'WhatsApp', value: 'whatsapp' },
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
