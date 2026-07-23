import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticatedNotDemo } from '../../access/authenticatedNotDemo'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ServicesOverview } from '../../blocks/ServicesOverview/config'
import { WhyFastora } from '../../blocks/WhyFastora/config'
import { OurProcess } from '../../blocks/OurProcess/config'
import { SelectedWork } from '../../blocks/SelectedWork/config'
import { TestimonialsBlock } from '../../blocks/TestimonialsBlock/config'
import { FAQ } from '../../blocks/FAQ/config'
import { LatestInsights } from '../../blocks/LatestInsights/config'
import { heroFields } from '@/heros/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticatedNotDemo,
    delete: authenticatedNotDemo,
    read: authenticatedOrPublished,
    update: authenticatedNotDemo,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // NOTE: the slug generic (CollectionConfig<'pages'>) is dropped to work around a TypeScript 6
  // regression where a slug-typed config's defaultPopulate is not assignable to buildConfig's
  // collections array. defaultPopulate falls back to SelectType (keys no longer field-checked);
  // restore the generic once the core types are fixed.
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    components: {
      beforeListTable: [
        {
          path: '@/components/AdminListCreateBanner',
          clientProps: { collectionSlug: 'pages', label: 'Page' },
        },
      ],
    },
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: heroFields,
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'pageHeaderEyebrow',
              type: 'text',
              label: 'Eyebrow',
              admin: {
                description:
                  'Used by utility pages (Services, Case Studies, Contact) that render their own listing/form below a simple header instead of the block-based Content layout.',
              },
            },
            {
              name: 'pageHeaderHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'pageHeaderDescription',
              type: 'textarea',
              label: 'Description',
            },
          ],
          label: 'Page Header',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                ServicesOverview,
                WhyFastora,
                OurProcess,
                SelectedWork,
                TestimonialsBlock,
                FAQ,
                LatestInsights,
              ],
              admin: {
                initCollapsed: true,
                description:
                  'Optional for utility pages that use the Page Header tab instead (Services, Case Studies, Contact).',
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
