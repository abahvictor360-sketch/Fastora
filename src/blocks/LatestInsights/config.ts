import type { Block } from 'payload'

export const LatestInsights: Block = {
  slug: 'latestInsights',
  interfaceName: 'LatestInsightsBlock',
  labels: {
    singular: 'Latest Insights',
    plural: 'Latest Insights Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Insights',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Fresh thinking, shipped weekly',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
