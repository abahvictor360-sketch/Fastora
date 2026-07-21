import type { Block } from 'payload'

export const ServicesOverview: Block = {
  slug: 'servicesOverview',
  interfaceName: 'ServicesOverviewBlock',
  labels: {
    singular: 'Services Overview',
    plural: 'Services Overview Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'What we do',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Services that move at your speed',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: { description: 'Max number of services to show (pulls from Services marked "Featured on Home").' },
    },
  ],
}
