import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticatedNotDemo } from '../access/authenticatedNotDemo'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticatedNotDemo,
    delete: authenticatedNotDemo,
    read: anyone,
    update: authenticatedNotDemo,
  },
  admin: {
    defaultColumns: ['clientName', 'company', 'updatedAt'],
    useAsTitle: 'clientName',
    components: {
      beforeListTable: [
        {
          path: '@/components/AdminListCreateBanner',
          clientProps: { collectionSlug: 'testimonials', label: 'Testimonial' },
        },
      ],
    },
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: { description: 'e.g. "Founder"' },
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Optionally show this testimonial on specific service pages.',
      },
    },
  ],
}
