import type { Block } from 'payload'

export const SelectedWork: Block = {
  slug: 'selectedWork',
  interfaceName: 'SelectedWorkBlock',
  labels: {
    singular: 'Selected Work',
    plural: 'Selected Work Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Selected work',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Results, not just deliverables',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
