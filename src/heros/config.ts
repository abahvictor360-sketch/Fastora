import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

// Flat top-level fields rather than a `hero` group — Payload's admin panel
// silently renders zero child inputs for any `type: 'group'` field nested
// directly inside a `tabs` field's `fields` array (reproducible on this
// exact field before it was flattened), so grouping these would make the
// whole Hero tab uneditable in the admin UI.
export const heroFields: Field[] = [
  {
    name: 'heroType',
    type: 'select',
    defaultValue: 'lowImpact',
    label: 'Type',
    options: [
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'High Impact',
        value: 'highImpact',
      },
      {
        label: 'Medium Impact',
        value: 'mediumImpact',
      },
      {
        label: 'Low Impact',
        value: 'lowImpact',
      },
    ],
    required: true,
  },
  {
    name: 'heroRichText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: 'Text',
  },
  linkGroup({
    overrides: {
      name: 'heroLinks',
      label: 'Links',
      maxRows: 2,
    },
  }),
  {
    name: 'heroMedia',
    type: 'upload',
    admin: {
      condition: (_, siblingData) => ['highImpact', 'mediumImpact'].includes(siblingData?.heroType),
      description: 'Optional. High Impact falls back to a bold gradient when left empty.',
    },
    label: 'Media',
    relationTo: 'media',
  },
]
