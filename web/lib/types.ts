export interface MediaSize {
  url: string
  width?: number
  height?: number
  filename?: string
  mimeType?: string
  filesize?: number
}

export interface Media {
  id: string
  alt: string
  url: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    thumbnail?: MediaSize
    card?: MediaSize
    hero?: MediaSize
  }
}

// Payload's Lexical richText field value. Rendering is deferred until a
// collection that needs it (Services, Phase 6) is actually built.
export type RichText = unknown

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface HeaderGlobal {
  logo?: Media | null
  navItems: NavItem[]
  ctaLabel?: string
  ctaHref?: string
}

export interface LinkItem {
  label: string
  href: string
}

export interface LinkColumn {
  heading: string
  links: LinkItem[]
}

export interface SocialLink {
  platform: string
  href: string
}

export interface FooterGlobal {
  description?: string
  linkColumns: LinkColumn[]
  copyright?: string
  socialLinks?: SocialLink[]
}

export interface Problem {
  icon?: string
  title: string
}

export interface HomePageGlobal {
  heroTitle?: string
  heroSubtitle?: string
  heroCtaPrimary?: string
  heroCtaSecondary?: string
  heroMicrocopy?: string
  problemsSectionTitle?: string
  problemsSectionSubtitle?: string
  problems: Problem[]
  featuredCaseStudies?: CaseStudy[]
}

export interface SiteSettingsGlobal {
  contactEmail?: string
  contactPhone?: string
  defaultSeo?: SeoFields & { ogImage?: Media | null }
}

export type ServiceCategory = 'digital' | 'brand' | 'growth'

export interface Service {
  id: string
  title: string
  slug: string
  category: ServiceCategory
  order?: number
  heroTitle: string
  heroSubtitle?: string
  intro?: RichText
  whatYouGet?: { item: string }[]
  forWhom?: string
  howWeWork?: { stepTitle: string; stepDescription?: string }[]
  ctaText?: string
  seo?: SeoFields
}

export type CaseStudyCategory = 'web-design' | 'wordpress' | 'app' | 'brand-content' | 'seo-marketing'

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  servicesUsed?: Service[]
  year?: string
  category: CaseStudyCategory
  featured?: boolean
  heroImage?: Media | null
  gallery?: { image: Media }[]
  problem?: RichText
  approach?: RichText
  result?: RichText
  stats?: { value: string; label: string }[]
  quote?: { text?: string; author?: string }
  seo?: SeoFields
}

export interface TeamMember {
  id: string
  name: string
  photo?: Media | null
  role?: string
  bio?: string
  order?: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: Media | null
  body?: RichText
  author?: TeamMember
  publishedDate?: string
  tags?: { tag: string }[]
  seo?: SeoFields
}
