import type { GlobalConfig } from 'payload'

import { seoFields } from '@/fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'contactEmail', type: 'text' },
    { name: 'contactPhone', type: 'text' },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [...seoFields, { name: 'ogImage', type: 'upload', relationTo: 'media' }],
    },
  ],
}
