import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroCtaPrimary', type: 'text' },
    { name: 'heroCtaSecondary', type: 'text' },
    { name: 'heroMicrocopy', type: 'text' },
    { name: 'problemsSectionTitle', type: 'text' },
    { name: 'problemsSectionSubtitle', type: 'text' },
    {
      name: 'problems',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'title', type: 'text', required: true },
      ],
    },
    {
      name: 'featuredCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
    },
  ],
}
