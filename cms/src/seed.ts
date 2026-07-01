import { getPayload } from 'payload'
import sharp from 'sharp'

import config from './payload.config'

const lexicalFromText = (text: string) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: text
      .split('\n\n')
      .filter(Boolean)
      .map((paragraph) => ({
        type: 'paragraph',
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text: paragraph,
            version: 1,
          },
        ],
      })),
  },
})

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding placeholder image...')
  const imageBuffer = await sharp({
    create: {
      width: 1600,
      height: 900,
      channels: 3,
      background: { r: 194, g: 92, b: 51 },
    },
  })
    .png()
    .toBuffer()

  const media = await payload.create({
    collection: 'media',
    data: { alt: 'Placeholder slika' },
    file: {
      data: imageBuffer,
      mimetype: 'image/png',
      name: 'placeholder.png',
      size: imageBuffer.length,
    },
  })

  payload.logger.info('Seeding team members...')
  const member1 = await payload.create({
    collection: 'team-members',
    data: {
      name: 'Ime Prezime',
      photo: media.id,
      role: 'Developer',
      bio: 'Kratka rečenica o pristupu radu.',
      order: 1,
    },
  })
  const member2 = await payload.create({
    collection: 'team-members',
    data: {
      name: 'Ime Prezime',
      photo: media.id,
      role: 'Grafički dizajner',
      bio: 'Kratka rečenica o pristupu radu.',
      order: 2,
    },
  })

  payload.logger.info('Seeding a service...')
  const service = await payload.create({
    collection: 'services',
    data: {
      title: 'Web dizajn',
      slug: 'web-dizajn',
      category: 'digital',
      order: 1,
      heroTitle: 'Dizajn koji radi prije nego progovorite',
      heroSubtitle: 'Prvi utisak se stvara u tri sekunde. Pobrinimo se da bude dobar.',
      intro: lexicalFromText(
        'Dizajn nije samo "da bude lijepo". Dizajn je prvi utisak koji vaš klijent stvori o vama u tri sekunde. Radimo sajtove koji vode posjetioca kroz jasnu priču — od prve slike do klika na "Kontaktirajte nas" — uz vizuelni identitet koji ostaje u glavi.',
      ),
      whatYouGet: [
        { item: 'Wireframe i vizuelni koncept' },
        { item: 'Responsive dizajn za sve uređaje' },
        { item: 'Dizajn sistem koji možete koristiti i dalje' },
      ],
      forWhom:
        'Za brendove koji imaju sajt, ali osjećaju da ne izgleda kao "oni" — ili nemaju sajt uopšte i žele da krenu ispravno od početka.',
      howWeWork: [
        { stepTitle: 'Istražujemo', stepDescription: 'Istražimo vaš brend, konkurenciju i ciljnu publiku' },
        { stepTitle: 'Predlažemo', stepDescription: 'Predlažemo vizuelni koncept i strukturu stranica' },
        { stepTitle: 'Finaliziramo', stepDescription: 'Finaliziramo dizajn spreman za development' },
      ],
      ctaText: 'Zakaži poziv i pokažimo ti kako bi tvoj sajt mogao izgledati.',
      seo: {
        metaTitle: 'Web dizajn — Createam',
        metaDescription: 'Dizajn koji radi prije nego progovorite.',
      },
    },
  })

  payload.logger.info('Seeding a case study...')
  const caseStudy = await payload.create({
    collection: 'case-studies',
    data: {
      title: 'Klijent X — redizajn sajta',
      slug: 'klijent-x-redizajn-sajta',
      client: 'Klijent X',
      servicesUsed: [service.id],
      year: '2026',
      category: 'web-design',
      featured: true,
      heroImage: media.id,
      gallery: [{ image: media.id }],
      problem: lexicalFromText(
        'Klijent je imao sajt koji nije odražavao kvalitet njihovih usluga, sa sporim učitavanjem i zastarjelim dizajnom.',
      ),
      approach: lexicalFromText(
        'Predložili smo potpuni redizajn sa fokusom na brzinu i jasnu strukturu stranica koja vodi posjetioca ka kontaktu.',
      ),
      result: lexicalFromText(
        'Novi sajt je brži, jasniji i donosi više upita nego prije.',
      ),
      stats: [
        { value: '40%', label: 'brži sajt' },
        { value: '2x', label: 'više upita' },
      ],
      quote: {
        text: 'Createam je razumio tačno šta nam treba.',
        author: 'Ime Prezime, direktor, Klijent X',
      },
      seo: {
        metaTitle: 'Klijent X — redizajn sajta — Createam',
        metaDescription: 'Kako smo redizajnirali sajt za Klijenta X.',
      },
    },
  })

  payload.logger.info('Seeding a blog post...')
  await payload.create({
    collection: 'blog-posts',
    data: {
      title: 'Zašto je brzina sajta bitna za SEO',
      slug: 'zasto-je-brzina-sajta-bitna-za-seo',
      excerpt: 'Kratak pregled zašto brzina učitavanja direktno utiče na vašu vidljivost na Google-u.',
      coverImage: media.id,
      body: lexicalFromText(
        'Brzina sajta je jedan od ključnih faktora rangiranja na Google-u. Sajt koji se sporo učitava gubi posjetioce i poziciju u pretrazi.\n\nZato od prvog dana radimo na optimizaciji brzine, ne dodajemo je naknadno.',
      ),
      author: member1.id,
      publishedDate: new Date().toISOString(),
      tags: [{ tag: 'seo' }, { tag: 'brzina' }],
      seo: {
        metaTitle: 'Zašto je brzina sajta bitna za SEO — Createam',
        metaDescription: 'Kratak pregled zašto brzina učitavanja direktno utiče na vašu vidljivost na Google-u.',
      },
    },
  })

  payload.logger.info('Seeding globals...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      // No logo image seeded on purpose: the design's header uses a text
      // wordmark + accent dot when no logo upload is set.
      navItems: [
        { label: 'Usluge', href: '/usluge' },
        { label: 'Radovi', href: '/radovi' },
        { label: 'Tim', href: '/tim' },
      ],
      ctaLabel: 'Zakaži poziv',
      ctaHref: '/kontakt',
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        'Createam je tim koji radi web dizajn, development, WordPress, custom aplikacije, grafički dizajn, fotografiju, copywriting, prevođenje i SEO/marketing.',
      linkColumns: [
        {
          heading: 'Usluge',
          links: [
            { label: 'Web dizajn', href: '/usluge/web-dizajn' },
            { label: 'Sve usluge', href: '/usluge' },
          ],
        },
        {
          heading: 'Agencija',
          links: [
            { label: 'Tim', href: '/tim' },
            { label: 'Radovi', href: '/radovi' },
          ],
        },
        {
          heading: 'Pravno',
          links: [{ label: 'Kontakt', href: '/kontakt' }],
        },
      ],
      copyright: '© 2026 Createam. Sva prava zadržana.',
      socialLinks: [{ platform: 'Instagram', href: 'https://instagram.com' }],
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'Sve što vašem brendu treba, od jednog tima.',
      heroSubtitle:
        'Web sajtovi, aplikacije, brend, sadržaj i marketing — dizajnirano i izgrađeno od strane ljudi koji stvarno razumiju kako se to radi, ne samo kako se o tome priča.',
      heroCtaPrimary: 'Zakaži besplatan poziv',
      heroCtaSecondary: 'Pogledaj radove',
      heroMicrocopy: 'Bez dugih ugovora. Bez nejasnih ponuda. Samo jasan plan i rok.',
      problemsSectionTitle: 'Ne prodajemo usluge. Rješavamo probleme.',
      problemsSectionSubtitle:
        'Imamo pun spektar usluga, ali suština je jednostavna — prepoznati pravi problem i riješiti ga pravim pristupom.',
      problems: [
        { icon: 'monitor', title: 'Vaš sajt vas ne predstavlja kako treba' },
        { icon: 'eye', title: 'Ne znate da li vas AI alati uopšte "vide"' },
        { icon: 'grid', title: 'Vaš katalog proizvoda nije vidljiv gdje ljudi kupuju' },
        { icon: 'diamond', title: 'Brend izgleda drugačije na svakom kanalu' },
        { icon: 'coordinate', title: 'Nemate vremena da koordinirate pet različitih izvođača' },
        { icon: 'target', title: 'Imate ideju za aplikaciju, ali ne znate odakle početi' },
      ],
      featuredCaseStudies: [caseStudy.id],
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contactEmail: 'info@createam.ba',
      contactPhone: '+387 60 000 000',
      defaultSeo: {
        metaTitle: 'Createam — Web dizajn, development i marketing',
        metaDescription:
          'Createam je tim koji radi web dizajn, development, WordPress, custom aplikacije, grafički dizajn, fotografiju, copywriting, prevođenje i SEO/marketing.',
        ogImage: media.id,
      },
    },
  })

  payload.logger.info('Seed complete.')
  process.exit(0)
}

await run()
