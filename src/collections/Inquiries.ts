import type { CollectionConfig } from 'payload'

import { authenticatedNotDemo } from '../access/authenticatedNotDemo'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: {
    singular: 'Inquiry',
    plural: 'Inquiries',
  },
  access: {
    // Inquiries are only ever written by the /api/contact route handler using
    // the Payload Local API with overrideAccess, after server-side validation
    // and a honeypot check. The public REST/GraphQL API cannot create these directly.
    // Demo accounts are excluded from every operation, including read — real
    // customer contact details shouldn't be visible on a shared demo login.
    create: authenticatedNotDemo,
    read: authenticatedNotDemo,
    update: authenticatedNotDemo,
    delete: authenticatedNotDemo,
  },
  admin: {
    defaultColumns: ['name', 'company', 'serviceNeeded', 'status', 'createdAt'],
    useAsTitle: 'name',
    description: 'Contact form submissions from the website.',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'serviceNeeded',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'budgetRange',
      type: 'select',
      options: [
        { label: 'Under $1,000', value: 'under-1k' },
        { label: '$1,000 – $5,000', value: '1k-5k' },
        { label: '$5,000 – $15,000', value: '5k-15k' },
        { label: '$15,000+', value: '15k-plus' },
        { label: 'Not sure yet', value: 'not-sure' },
      ],
    },
    {
      name: 'timeline',
      type: 'select',
      options: [
        { label: 'ASAP', value: 'asap' },
        { label: 'Within 1 month', value: '1-month' },
        { label: '1–3 months', value: '1-3-months' },
        { label: 'Just exploring', value: 'exploring' },
      ],
    },
    {
      name: 'brief',
      type: 'textarea',
      label: 'Project brief',
      required: true,
    },
  ],
  timestamps: true,
}
