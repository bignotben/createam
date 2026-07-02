import { getPayload } from 'payload'
import sharp from 'sharp'

import config from './payload.config'
import { lexicalFromText } from './lib/lexical'

type ServiceSeed = {
  title: string
  slug: string
  category: 'digital' | 'brand' | 'growth'
  order: number
  heroTitle: string
  heroSubtitle: string
  intro: string
  whatYouGet: string[]
  forWhom: string
  howWeWork: { stepTitle: string; stepDescription: string }[]
  ctaText: string
}

const servicesData: ServiceSeed[] = [
  {
    title: 'Web dizajn & development',
    slug: 'web-dizajn-i-development',
    category: 'digital',
    order: 1,
    heroTitle: 'Sajtovi koji izgledaju sjajno i rade posao',
    heroSubtitle:
      'Dizajn i development pod istim krovom — od prvog vizuelnog koncepta do brzog, sigurnog sajta koji raste s vama.',
    intro:
      'Dizajn nije samo "da bude lijepo", a development nije samo "da radi". Kad dizajn i development rade odvojeno, nešto se izgubi u prevodu. Mi radimo oboje, zajedno, od prvog dana — sajt koji izgleda tačno kako je zamišljen i učitava se brzinom koju Google i vaši posjetioci traže.',
    whatYouGet: [
      'Dizajn i development pod jednim krovom, bez koordinacije dvije firme',
      'Brz, siguran sajt građen po mjeri',
      'WordPress ili custom rješenje — birate vi',
    ],
    forWhom:
      'Za brendove kojima treba i dizajn i development usklađeni od početka, ne dvije odvojene firme koje "približno" pogode jedna drugu.',
    howWeWork: [
      { stepTitle: 'Istražujemo', stepDescription: 'Brend, ciljeve, konkurenciju i publiku' },
      { stepTitle: 'Dizajniramo i gradimo', stepDescription: 'Paralelno, uz redovne preglede' },
      { stepTitle: 'Testiramo i lansiramo', stepDescription: 'Brzina, SEO i sigurnost prije lansiranja' },
    ],
    ctaText: 'Spremni za sajt koji izgleda i radi kako treba?',
  },
  {
    title: 'WordPress dizajn & development',
    slug: 'wordpress',
    category: 'digital',
    order: 2,
    heroTitle: 'WordPress koji vi kontrolišete — do zadnjeg detalja',
    heroSubtitle:
      'Custom WordPress rješenja sa vlastitim pluginovima kad gotova ne odgovaraju. Sami upravljate sadržajem, mi se brinemo za sve ispod haube.',
    intro:
      'Za klijente kojima treba jednostavno upravljanje sadržajem bez pozivanja developera za svaku sitnicu. Radimo custom WordPress rješenja — Elementor za brzu izradu, JetEngine za dinamički sadržaj, WooCommerce za online prodaju, a kad gotov plugin ne odgovara, napišemo vlastiti.',
    whatYouGet: [
      'Sajt koji sami ažurirate',
      'Custom pluginove kad gotovi ne odgovaraju',
      'Obuku za korištenje admin panela',
    ],
    forWhom:
      'Za biznise koji redovno mijenjaju sadržaj (nekretnine, katalozi proizvoda, oglasi), ili im treba funkcionalnost koju gotovi pluginovi ne pokrivaju.',
    howWeWork: [
      { stepTitle: 'Analiziramo', stepDescription: 'Analiziramo koliko često i kako mijenjate sadržaj' },
      { stepTitle: 'Gradimo', stepDescription: 'Gradimo template-e i custom pluginove po potrebi' },
      { stepTitle: 'Obučavamo', stepDescription: 'Obučavamo vas da sve dalje radite sami' },
    ],
    ctaText: 'Želite WordPress koji radi za vas, ne protiv vas?',
  },
  {
    title: 'App development',
    slug: 'app-development',
    category: 'digital',
    order: 3,
    heroTitle: 'Od ideje do aplikacije — i svake funkcionalnosti koja joj treba',
    heroSubtitle:
      'AI-ubrzan razvoj aplikacija i custom funkcionalnosti po mjeri. Testirajte ideju u sedmicama, ne godinama.',
    intro:
      'Ponekad vam treba cijela aplikacija. Ponekad samo jedna funkcionalnost koju nijedan gotov alat ne pokriva. AI-ubrzan razvoj mijenja računicu za oboje — prototip ili custom funkcionalnost koja je nekad trajala mjesece sad se pravi u sedmicama, uz kod koji prolazi kroz ljudsku kontrolu i standarde kvaliteta.',
    whatYouGet: [
      'Brz prototip za testiranje ideje',
      'Custom funkcionalnosti koje gotovi alati ne pokrivaju',
      'Plan za dalji rast i nadogradnju',
    ],
    forWhom:
      'Za poduzetnike i biznise sa idejom za aplikaciju, ili specifičnom funkcionalnošću koju gotovi alati i pluginovi ne pokrivaju.',
    howWeWork: [
      { stepTitle: 'Definišemo', stepDescription: 'Definišemo obim — cijela aplikacija ili funkcionalnost' },
      { stepTitle: 'Gradimo', stepDescription: 'Gradimo prototip ili funkcionalnost uz AI-ubrzan development' },
      { stepTitle: 'Testiramo', stepDescription: 'Testiramo sa stvarnim korisnicima i nadograđujemo' },
    ],
    ctaText: 'Imate ideju ili funkcionalnost koja fali? Pretvorimo je u plan.',
  },
  {
    title: 'Grafički dizajn',
    slug: 'graficki-dizajn',
    category: 'brand',
    order: 4,
    heroTitle: 'Identitet koji ostaje u glavi',
    heroSubtitle:
      'Od logotipa do kompletnog vizuelnog identiteta — brend koji izgleda dosljedno i prepoznatljivo na svakoj tački dodira.',
    intro:
      'Prije nego što vas neko posjeti online, vidi vaš logo, boje, materijale. Radimo vizuelne identitete koji ostavljaju utisak i ostaju dosljedni na svakoj tački dodira — od vizit karte do bilborda.',
    whatYouGet: ['Logotip i vizuelni identitet', 'Brend smjernice (brand guidelines)', 'Materijale za štampu i digitalne kanale'],
    forWhom: 'Za nove brendove koji tek kreću, ili postojeće koje osjećaju da im identitet ne odgovara tome ko su danas.',
    howWeWork: [
      { stepTitle: 'Istražujemo', stepDescription: 'Istražimo brend, vrijednosti i konkurenciju' },
      { stepTitle: 'Predlažemo', stepDescription: 'Predlažemo vizuelne koncepte' },
      { stepTitle: 'Finaliziramo', stepDescription: 'Finaliziramo identitet i smjernice za korištenje' },
    ],
    ctaText: 'Spremni za brend koji se pamti?',
  },
  {
    title: 'Fotografija',
    slug: 'fotografija',
    category: 'brand',
    order: 5,
    heroTitle: 'Sadržaj koji stvarno pripada vama',
    heroSubtitle: 'Profesionalne fotografije, ne generički stock.',
    intro:
      'Loše fotografije mogu potopiti i najbolji dizajn. Radimo profesionalne fotografije proizvoda, prostora, tima i događaja — sadržaj koji stvarno pripada vašem brendu.',
    whatYouGet: [
      'Profesionalnu fotosesiju',
      'Obrađene fotografije spremne za web i društvene mreže',
      'Konzistentan vizuelni stil',
    ],
    forWhom:
      'Za biznise koji trenutno koriste stock fotografije ili fotografije telefonom, i žele sadržaj koji stvarno predstavlja njihov prostor, proizvod ili tim.',
    howWeWork: [
      { stepTitle: 'Definišemo', stepDescription: 'Definišemo šta treba fotografisati i u kojem stilu' },
      { stepTitle: 'Realizujemo', stepDescription: 'Realizujemo fotosesiju na licu mjesta' },
      { stepTitle: 'Obrađujemo', stepDescription: 'Obrađujemo i predajemo fotografije spremne za korištenje' },
    ],
    ctaText: 'Zakaži poziv i dogovorimo termin fotosesije.',
  },
  {
    title: 'Copywriting',
    slug: 'copywriting',
    category: 'brand',
    order: 6,
    heroTitle: 'Riječi koje zvuče kao vi',
    heroSubtitle: 'Tekstovi koji objašnjavaju, ne samo popunjavaju prostor.',
    intro:
      'Svaka riječ na vašem sajtu prodaje ili odbija. Pišemo tekstove koji jasno objašnjavaju šta radite, zašto je to važno, i zašto baš vi — na način koji zvuči kao vaš brend, ne kao šablon.',
    whatYouGet: ['Tekstove za sajt, blog i marketinške materijale', 'Ton glasa (tone of voice) prilagođen vašem brendu'],
    forWhom: 'Za brendove čiji trenutni tekstovi zvuče generički, ili koji nemaju vremena da sami pišu kvalitetan sadržaj.',
    howWeWork: [
      { stepTitle: 'Upoznajemo', stepDescription: 'Upoznamo vaš brend, ciljnu publiku i ton kojim želite da zvučite' },
      { stepTitle: 'Pišemo', stepDescription: 'Pišemo i predlažemo tekstove po sekcijama' },
      { stepTitle: 'Finaliziramo', stepDescription: 'Finaliziramo uz vaše povratne informacije' },
    ],
    ctaText: 'Zakaži poziv i pošalji nam postojeći sadržaj — vidimo šta možemo poboljšati.',
  },
  {
    title: 'Prevođenje',
    slug: 'prevodjenje',
    category: 'brand',
    order: 7,
    heroTitle: 'Vaša poruka, na svakom jeziku',
    heroSubtitle: 'Prevod koji zvuči prirodno, ne mašinski.',
    intro:
      'Za brendove koji rade sa više tržišta. Prevodimo sadržaj tačno i prirodno, uz pažnju na kontekst i ton — ne mašinski, riječ po riječ.',
    whatYouGet: ['Prevod sajta, dokumenata i marketinških materijala', 'Lokalizaciju prilagođenu tržištu'],
    forWhom:
      'Za biznise koji se otvaraju prema novim tržištima ili imaju klijente koji ne govore isti jezik kao njihov trenutni sadržaj.',
    howWeWork: [
      { stepTitle: 'Analiziramo', stepDescription: 'Analiziramo sadržaj i ciljno tržište' },
      { stepTitle: 'Prevodimo', stepDescription: 'Prevodimo uz pažnju na ton i kontekst' },
      { stepTitle: 'Lektorišemo', stepDescription: 'Lektorišemo i finaliziramo' },
    ],
    ctaText: 'Zakaži poziv i pošalji nam sadržaj za prevod.',
  },
  {
    title: 'SEO & Marketing',
    slug: 'seo-marketing',
    category: 'growth',
    order: 8,
    heroTitle: 'Vidljivost koja se mjeri, ne obećava',
    heroSubtitle: 'Google, ali i AI alati koji sve više odlučuju šta ljudi vide.',
    intro:
      'Sajt koji niko ne nađe ne postoji — bilo da vas traže na Google-u ili pitaju ChatGPT. Radimo klasičan SEO od tehničkih osnova do sadržajne strategije, ali i ono što tek postaje standard.',
    whatYouGet: [
      'Tehnički SEO audit i optimizaciju',
      'Sadržajnu i marketinšku strategiju',
      'AI optimizaciju gdje je relevantno (da vas AI alati prepoznaju i citiraju)',
      'Feed management za Google Shopping, Meta katalog i marketplace-ove',
      'Redovne izvještaje o rezultatima',
    ],
    forWhom:
      'Za biznise koji imaju sajt, ali ne dobijaju saobraćaj ili prodaju kroz njega, ili žele biti vidljivi i na AI alatima, ne samo klasičnim pretraživačima.',
    howWeWork: [
      { stepTitle: 'Radimo', stepDescription: 'Radimo tehnički i sadržajni audit trenutnog stanja' },
      { stepTitle: 'Predlažemo', stepDescription: 'Predlažemo strategiju i prioritete' },
      { stepTitle: 'Implementiramo', stepDescription: 'Implementiramo, mjerimo i redovno izvještavamo' },
    ],
    ctaText: 'Zakaži poziv i saznaj gdje trenutno stojiš u odnosu na konkurenciju.',
  },
]

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
  await payload.create({
    collection: 'team-members',
    data: {
      name: 'Ime Prezime',
      photo: media.id,
      role: 'Grafički dizajner',
      bio: 'Kratka rečenica o pristupu radu.',
      order: 2,
    },
  })

  payload.logger.info('Seeding all 8 services...')
  const servicesBySlug: Record<string, { id: string }> = {}
  for (const s of servicesData) {
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: s.title,
        slug: s.slug,
        category: s.category,
        order: s.order,
        heroTitle: s.heroTitle,
        heroSubtitle: s.heroSubtitle,
        intro: lexicalFromText(s.intro),
        whatYouGet: s.whatYouGet.map((item) => ({ item })),
        forWhom: s.forWhom,
        howWeWork: s.howWeWork,
        ctaText: s.ctaText,
        seo: {
          metaTitle: s.title,
          metaDescription: s.heroSubtitle,
        },
      },
    })
    servicesBySlug[s.slug] = doc
  }

  payload.logger.info('Seeding case studies...')
  const caseStudiesData = [
    {
      title: 'Klijent X — redizajn sajta',
      slug: 'klijent-x-redizajn-sajta',
      client: 'Klijent X',
      services: ['web-dizajn-i-development'],
      year: '2026',
      category: 'web-design' as const,
      featured: true,
      problem: 'Klijent je imao sajt koji nije odražavao kvalitet njihovih usluga, sa sporim učitavanjem i zastarjelim dizajnom.',
      approach: 'Predložili smo potpuni redizajn sa fokusom na brzinu i jasnu strukturu stranica koja vodi posjetioca ka kontaktu.',
      result: 'Novi sajt je brži, jasniji i donosi više upita nego prije.',
      stats: [
        { value: '40%', label: 'brži sajt' },
        { value: '2x', label: 'više upita' },
      ],
      quoteText: 'Createam je razumio tačno šta nam treba.',
      quoteAuthor: 'Ime Prezime, direktor, Klijent X',
    },
    {
      title: 'Nekretnine Plus — katalog nekretnina',
      slug: 'nekretnine-plus-katalog',
      client: 'Nekretnine Plus',
      services: ['wordpress'],
      year: '2025',
      category: 'wordpress' as const,
      featured: true,
      problem: 'Klijent je ručno ažurirao oglase za nekretnine kroz developera za svaku izmjenu, što je usporavalo poslovanje.',
      approach: 'Izgradili smo custom WordPress + JetEngine rješenje koje klijent sam ažurira, bez ikakvog koda.',
      result: 'Klijent sada samostalno objavljuje nove oglase u roku od par minuta.',
      stats: [{ value: '90%', label: 'brže objavljivanje oglasa' }],
      quoteText: undefined,
      quoteAuthor: undefined,
    },
    {
      title: 'Vala — aplikacija za rezervacije',
      slug: 'vala-aplikacija-za-rezervacije',
      client: 'Vala',
      services: ['app-development'],
      year: '2025',
      category: 'app' as const,
      featured: true,
      problem: 'Klijent je imao ideju za aplikaciju za rezervacije, ali bez tehničkog tima za razvoj.',
      approach: 'Kreirali smo brz prototip, testirali ga sa stvarnim korisnicima, a zatim izgradili punu aplikaciju.',
      result: 'Aplikacija je lansirana i koristi je rastuća baza korisnika svakog mjeseca.',
      stats: [{ value: '3', label: 'mjeseca do lansiranja' }],
      quoteText: undefined,
      quoteAuthor: undefined,
    },
    {
      title: 'Atelje Nord — vidljivost na Google-u',
      slug: 'atelje-nord-vidljivost',
      client: 'Atelje Nord',
      services: ['seo-marketing'],
      year: '2024',
      category: 'seo-marketing' as const,
      featured: false,
      problem: 'Klijent je imao sajt, ali gotovo nikakav saobraćaj iz pretrage.',
      approach: 'Uradili smo tehnički i sadržajni SEO audit, te implementirali prioritete u fazama.',
      result: 'Organski saobraćaj je znatno porastao u prvih šest mjeseci.',
      stats: [{ value: '5x', label: 'više organskog saobraćaja' }],
      quoteText: undefined,
      quoteAuthor: undefined,
    },
  ]

  const featuredCaseStudyIds: string[] = []
  for (const c of caseStudiesData) {
    const doc = await payload.create({
      collection: 'case-studies',
      data: {
        title: c.title,
        slug: c.slug,
        client: c.client,
        servicesUsed: c.services.map((slug) => servicesBySlug[slug].id),
        year: c.year,
        category: c.category,
        featured: c.featured,
        heroImage: media.id,
        gallery: [{ image: media.id }],
        problem: lexicalFromText(c.problem),
        approach: lexicalFromText(c.approach),
        result: lexicalFromText(c.result),
        stats: c.stats,
        quote: c.quoteText ? { text: c.quoteText, author: c.quoteAuthor } : undefined,
        seo: {
          metaTitle: c.title,
          metaDescription: c.result,
        },
      },
    })
    if (c.featured) featuredCaseStudyIds.push(doc.id)
  }

  payload.logger.info('Seeding blog posts...')
  const blogPostsData = [
    {
      title: 'Zašto je brzina sajta bitna za SEO',
      slug: 'zasto-je-brzina-sajta-bitna-za-seo',
      excerpt: 'Kratak pregled zašto brzina učitavanja direktno utiče na vašu vidljivost na Google-u.',
      body: 'Brzina sajta je jedan od ključnih faktora rangiranja na Google-u. Sajt koji se sporo učitava gubi posjetioce i poziciju u pretrazi.\n\nZato od prvog dana radimo na optimizaciji brzine, ne dodajemo je naknadno.',
      tags: ['seo', 'brzina'],
    },
    {
      title: 'Kako AI alati mijenjaju SEO',
      slug: 'kako-ai-alati-mijenjaju-seo',
      excerpt: 'ChatGPT i Perplexity sve više odlučuju šta ljudi vide prije nego stignu na vaš sajt.',
      body: 'Klasičan SEO više nije dovoljan. AI alati poput ChatGPT-a i Perplexity-ja sažimaju odgovore umjesto da vode ljude na sajtove.\n\nAko vaš sadržaj nije strukturiran tako da ga AI alati mogu razumjeti i citirati, gubite vidljivost koju nikad nećete ni primijetiti u analitici.',
      tags: ['seo', 'ai'],
    },
    {
      title: 'WordPress ili custom rješenje — kako izabrati',
      slug: 'wordpress-ili-custom-rjesenje',
      excerpt: 'Kratak vodič kroz to kada ima smisla WordPress, a kada custom development.',
      body: 'WordPress je odličan izbor kad vam treba brzo upravljanje sadržajem i postoji plugin koji već radi ono što vam treba.\n\nCustom rješenje ima smisla kad vaš proces ne liči na standardni web sajt — tada gotovi alati samo stoje na putu.',
      tags: ['wordpress', 'development'],
    },
  ]

  for (const p of blogPostsData) {
    await payload.create({
      collection: 'blog-posts',
      data: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: media.id,
        body: lexicalFromText(p.body),
        author: member1.id,
        publishedDate: new Date().toISOString(),
        tags: p.tags.map((tag) => ({ tag })),
        seo: {
          metaTitle: p.title,
          metaDescription: p.excerpt,
        },
      },
    })
  }

  payload.logger.info('Seeding legal pages...')
  const legalPagesData = [
    {
      title: 'Politika privatnosti',
      slug: 'politika-privatnosti',
      body: 'Ovo je placeholder tekst za politiku privatnosti. Zamijenite ga stvarnim sadržajem u Payload adminu prije lansiranja sajta.\n\nCreatam prikuplja samo one lične podatke koje nam dobrovoljno pošaljete putem kontakt forme (ime, email, i sadržaj upita), a koristimo ih isključivo za odgovaranje na vaš upit.\n\nVaši podaci se ne dijele sa trećim stranama osim ako je to neophodno za pružanje usluge (npr. servis za slanje email upita).',
    },
    {
      title: 'Uslovi korištenja',
      slug: 'uslovi-koristenja',
      body: 'Ovo je placeholder tekst za uslove korištenja. Zamijenite ga stvarnim sadržajem u Payload adminu prije lansiranja sajta.\n\nKorištenjem ovog sajta prihvatate ove uslove korištenja u cjelosti. Sadržaj sajta je vlasništvo Createam-a i ne smije se kopirati bez dozvole.\n\nCreatam zadržava pravo izmjene ovih uslova u bilo kojem trenutku, o čemu ćete biti obaviješteni objavom nove verzije na ovoj stranici.',
    },
  ]

  for (const p of legalPagesData) {
    await payload.create({
      collection: 'pages',
      data: {
        title: p.title,
        slug: p.slug,
        body: lexicalFromText(p.body),
        seo: {
          metaTitle: p.title,
          metaDescription: `${p.title} — Createam`,
        },
      },
    })
  }

  payload.logger.info('Seeding globals...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      // No logo image seeded on purpose: the design's header uses a text
      // wordmark + accent dot when no logo upload is set.
      navItems: [
        { label: 'Usluge', href: '/usluge' },
        { label: 'Radovi', href: '/radovi' },
        { label: 'Blog', href: '/blog' },
        { label: 'Tim', href: '/tim' },
      ],
      ctaLabel: 'Zakaži poziv',
      ctaHref: '/kontakt',
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: 'Createam — dizajn, development i sadržaj, pod jednim krovom.',
      linkColumns: [
        {
          heading: 'Usluge',
          links: servicesData.map((s) => ({ label: s.title, href: `/usluge/${s.slug}` })),
        },
        {
          heading: 'Agencija',
          links: [
            { label: 'Tim', href: '/tim' },
            { label: 'Radovi', href: '/radovi' },
            { label: 'Blog', href: '/blog' },
            { label: 'Kontakt', href: '/kontakt' },
          ],
        },
        {
          heading: 'Pravno',
          links: [
            { label: 'Politika privatnosti', href: '/politika-privatnosti' },
            { label: 'Uslovi korištenja', href: '/uslovi-koristenja' },
          ],
        },
      ],
      copyright: '© 2026 Createam. Sva prava zadržana.',
      socialLinks: [
        { platform: 'Instagram', href: 'https://instagram.com' },
        { platform: 'LinkedIn', href: 'https://linkedin.com' },
        { platform: 'Behance', href: 'https://behance.net' },
      ],
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
      featuredCaseStudies: featuredCaseStudyIds,
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
          'Createam je tim koji radi web dizajn i development, WordPress, aplikacije i custom funkcionalnosti, grafički dizajn, fotografiju, copywriting, prevođenje i SEO/marketing.',
        ogImage: media.id,
      },
    },
  })

  payload.logger.info('Seed complete.')
  process.exit(0)
}

await run()
