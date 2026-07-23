import type { Block } from 'payload'

export const SelectedWork: Block = {
  slug: 'selectedWork',
  interfaceName: 'SelectedWorkBlock',
  labels: {
    singular: 'Selected Case Studies',
    plural: 'Selected Case Studies Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Case studies',
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
