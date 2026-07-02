import { getPayload } from 'payload'

import config from './payload.config'
import { lexicalFromText } from './lib/lexical'

// One-time migration: restructures the live (already-seeded) dev database
// from 10 services to 8, per createam-services-v2-copy.md.
//
// - "web-dizajn" doc is kept and becomes the merged "Web dizajn & development"
//   (new slug), so anything referencing it by ID (CaseStudies.servicesUsed)
//   stays valid without remapping.
// - "web-development" and "custom-funkcionalnosti" docs are deleted. Any
//   CaseStudies referencing them are defensively remapped first (none do,
//   as of writing, but this keeps the script correct if that ever changes).
// - "wordpress", "app-development", "graficki-dizajn" are enriched in place.
// - "fotografija", "copywriting", "prevodjenje", "seo-marketing" keep their
//   content, just get renumbered `order`.

const run = async () => {
  const payload = await getPayload({ config })

  const findBySlug = async (slug: string) => {
    const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    return docs[0]
  }

  const webDizajn = await findBySlug('web-dizajn')
  const webDevelopment = await findBySlug('web-development')
  const wordpress = await findBySlug('wordpress')
  const customFunkcionalnosti = await findBySlug('custom-funkcionalnosti')
  const appDevelopment = await findBySlug('app-development')
  const grafickiDizajn = await findBySlug('graficki-dizajn')
  const fotografija = await findBySlug('fotografija')
  const copywriting = await findBySlug('copywriting')
  const prevodjenje = await findBySlug('prevodjenje')
  const seoMarketing = await findBySlug('seo-marketing')

  if (!webDizajn || !wordpress || !appDevelopment || !grafickiDizajn) {
    payload.logger.error('Expected services not found — aborting migration.')
    process.exit(1)
  }

  // --- Defensive remap: point any CaseStudies referencing the two docs
  // that are about to be deleted at their surviving replacements instead.
  const remapPairs: [string | undefined, string][] = [
    [webDevelopment?.id, webDizajn.id],
    [customFunkcionalnosti?.id, appDevelopment.id],
  ]
  for (const [oldId, newId] of remapPairs) {
    if (!oldId) continue
    const { docs: affected } = await payload.find({
      collection: 'case-studies',
      where: { servicesUsed: { in: [oldId] } },
      limit: 100,
    })
    for (const cs of affected) {
      const current: string[] = (cs.servicesUsed ?? []).map((s: unknown) =>
        typeof s === 'string' ? s : (s as { id: string }).id,
      )
      const updated = Array.from(new Set(current.map((id) => (id === oldId ? newId : id))))
      payload.logger.info(`Remapping case study "${cs.slug}" service reference ${oldId} -> ${newId}`)
      await payload.update({ collection: 'case-studies', id: cs.id, data: { servicesUsed: updated } })
    }
  }

  payload.logger.info('Merging "Web dizajn" + "Web development" into "Web dizajn & development"...')
  await payload.update({
    collection: 'services',
    id: webDizajn.id,
    data: {
      title: 'Web dizajn & development',
      slug: 'web-dizajn-i-development',
      order: 1,
      heroTitle: 'Sajtovi koji izgledaju sjajno i rade posao',
      heroSubtitle:
        'Dizajn i development pod istim krovom — od prvog vizuelnog koncepta do brzog, sigurnog sajta koji raste s vama.',
      whatYouGet: [
        { item: 'Dizajn i development pod jednim krovom, bez koordinacije dvije firme' },
        { item: 'Brz, siguran sajt građen po mjeri' },
        { item: 'WordPress ili custom rješenje — birate vi' },
      ],
      forWhom:
        'Za brendove kojima treba i dizajn i development usklađeni od početka, ne dvije odvojene firme koje "približno" pogode jedna drugu.',
      howWeWork: [
        { stepTitle: 'Istražujemo', stepDescription: 'Brend, ciljeve, konkurenciju i publiku' },
        { stepTitle: 'Dizajniramo i gradimo', stepDescription: 'Paralelno, uz redovne preglede' },
        { stepTitle: 'Testiramo i lansiramo', stepDescription: 'Brzina, SEO i sigurnost prije lansiranja' },
      ],
      ctaText: 'Spremni za sajt koji izgleda i radi kako treba?',
      seo: {
        metaTitle: 'Web dizajn & development',
        metaDescription:
          'Dizajn i development pod istim krovom — od prvog vizuelnog koncepta do brzog, sigurnog sajta koji raste s vama.',
      },
      expertQuote: {
        text: 'Lijep sajt koji je spor je promašaj. Brz sajt koji izgleda loše je isto promašaj. Dizajn i development moraju nastati zajedno — inače jedno kvari drugo.',
        attribution: 'Createam tim',
      },
      contextTitle: 'Dizajn i kod nisu dvije faze. To je jedan posao.',
      contextBody: lexicalFromText(
        'Kad dizajn radi jedna firma a development druga, gubi se nešto u prevodu — dizajn koji izgleda sjajno u Figmi ispadne spor ili nemoguć za izvedbu, a developer "približno" pogodi ono što je dizajner zamislio. Rezultat je sajt koji nije ni lijep ni brz kako je trebao biti.\n\nMi radimo oboje, zajedno, od početka. Dizajn nastaje znajući kako će se graditi; kod nastaje čuvajući svaki detalj dizajna. Ishod je sajt koji izgleda tačno kako je zamišljen — i učitava se brzinom koju Google i vaši posjetioci traže.',
      ),
      differentiators: [
        {
          title: 'Jedan tim, od skice do koda',
          description: 'Nema gubitka u prevodu između dizajnera i developera.',
        },
        {
          title: 'Dizajn koji se može izvesti',
          description: 'Svaki vizuelni detalj je promišljen s obzirom na brzinu i izvedbu.',
        },
        {
          title: 'SEO i brzina od prvog dana',
          description: 'Ne dodajemo ih na kraju, ugrađeni su u temelj.',
        },
        {
          title: 'WordPress ili custom',
          description:
            'Biramo pristup prema tome trebate li sami upravljati sadržajem ili vam treba maksimalna sloboda.',
        },
      ],
      whatWeDo: [
        { title: 'Vizuelni dizajn', description: 'Koncept, tipografija, boje, dizajn sistem.' },
        { title: 'Responsive izrada', description: 'Savršeno na desktopu, tabletu i telefonu.' },
        { title: 'Custom development', description: 'Sajt građen po mjeri, ne šablon.' },
        { title: 'WordPress opcija', description: 'Kad želite sami upravljati sadržajem.' },
        {
          title: 'Optimizacija brzine',
          description: 'Core Web Vitals, učitavanje, keširanje.',
        },
        {
          title: 'Tehnički SEO temelj',
          description: 'Struktura i čitljivost za pretraživače i AI.',
        },
      ],
      proofTitle: 'Iz prakse',
      proofBody: lexicalFromText(
        'Svaki sajt prolazi kroz iste standarde — dizajn koji predstavlja brend i kod koji izdrži rast.',
      ),
      processSteps: [
        { stepTitle: 'Razgovor i istraživanje', stepDescription: 'Brend, ciljevi, konkurencija, publika.' },
        { stepTitle: 'Vizuelni koncept', stepDescription: 'Dizajn i struktura stranica na potvrdu.' },
        { stepTitle: 'Development', stepDescription: 'Gradimo u fazama, uz redovne preglede.' },
        { stepTitle: 'Testiranje', stepDescription: 'Brzina, SEO, sigurnost, svi uređaji.' },
        { stepTitle: 'Lansiranje', stepDescription: 'Kontrolisano, sa praćenjem prvih rezultata.' },
        { stepTitle: 'Podrška', stepDescription: 'Održavanje i nadogradnje.' },
      ],
      faq: [
        {
          question: 'Radite li i dizajn i development, ili samo jedno?',
          answer: 'Oboje, zajedno — to je i poenta. Ne morate koordinirati dvije firme.',
        },
        {
          question: 'WordPress ili custom sajt — šta je bolje za mene?',
          answer:
            'Ovisi trebate li sami mijenjati sadržaj (WordPress) ili vam treba maksimalna sloboda i performanse (custom). Savjetujemo na pozivu.',
        },
        {
          question: 'Koliko traje izrada?',
          answer: 'Prezentacioni sajt obično 3-5 sedmica, kompleksniji duže. Tačan rok uz ponudu.',
        },
        {
          question: 'Mogu li kasnije sam mijenjati sadržaj?',
          answer: 'Da, gradimo tako da netehnički ljudi upravljaju sadržajem, uz obuku.',
        },
        {
          question: 'Šta nakon lansiranja?',
          answer: 'Ostajemo dostupni za održavanje, izmjene i rast.',
        },
      ],
    },
  })

  payload.logger.info('Enriching "WordPress dizajn & development" with plugin content...')
  await payload.update({
    collection: 'services',
    id: wordpress.id,
    data: {
      order: 2,
      heroTitle: 'WordPress koji vi kontrolišete — do zadnjeg detalja',
      heroSubtitle:
        'Custom WordPress rješenja sa vlastitim pluginovima kad gotova ne odgovaraju. Sami upravljate sadržajem, mi se brinemo za sve ispod haube.',
      whatYouGet: [
        { item: 'Sajt koji sami ažurirate' },
        { item: 'Custom pluginove kad gotovi ne odgovaraju' },
        { item: 'Obuku za korištenje admin panela' },
      ],
      forWhom:
        'Za biznise koji redovno mijenjaju sadržaj (nekretnine, katalozi proizvoda, oglasi), ili im treba funkcionalnost koju gotovi pluginovi ne pokrivaju.',
      howWeWork: [
        { stepTitle: 'Analiziramo', stepDescription: 'Analiziramo koliko često i kako mijenjate sadržaj' },
        { stepTitle: 'Gradimo', stepDescription: 'Gradimo template-e i custom pluginove po potrebi' },
        { stepTitle: 'Obučavamo', stepDescription: 'Obučavamo vas da sve dalje radite sami' },
      ],
      ctaText: 'Želite WordPress koji radi za vas, ne protiv vas?',
      seo: {
        metaTitle: 'WordPress dizajn & development',
        metaDescription:
          'Custom WordPress rješenja sa vlastitim pluginovima kad gotova ne odgovaraju. Sami upravljate sadržajem.',
      },
      expertQuote: {
        text: 'WordPress je moćan tačno onoliko koliko je dobro postavljen. Nagomilani pluginovi ga uspore i razbiju; pravi custom pristup ga čini brzim i vašim.',
        attribution: 'Createam tim',
      },
      contextTitle: 'Većina WordPress sajtova je zbir tuđih pluginova.',
      contextBody: lexicalFromText(
        'Lako je sastaviti WordPress sajt od desetak gotovih pluginova — dok se ne uspori, ne razbije nakon apdejta, ili ne udari u zid jer nijedan plugin ne radi baš ono što vam treba. Tada počinje muka.\n\nMi pristupamo drugačije: koristimo WordPress tamo gdje je najjači (lako upravljanje sadržajem), a kad gotov plugin ne odgovara — napišemo vlastiti, tačno za vaš proces. Rezultat je sajt koji je brz, stabilan, i radi baš ono što treba, a vi ga i dalje sami ažurirate.',
      ),
      differentiators: [
        {
          title: 'Custom umjesto nagomilanog',
          description: 'Pišemo vlastite pluginove kad gotovi ne valjaju, ne krpimo desetak tuđih.',
        },
        {
          title: 'Brzina i stabilnost',
          description: 'Čist setup koji ne puca nakon svakog apdejta.',
        },
        {
          title: 'Vi upravljate sadržajem',
          description: 'Elementor, JetEngine i custom template-i prilagođeni vama.',
        },
        {
          title: 'Integracije',
          description: 'Povezivanje sa sistemima koje koristite (WooCommerce, plaćanja, vanjski alati).',
        },
      ],
      whatWeDo: [
        { title: 'Custom WordPress izrada', description: 'Teme i template-i po mjeri.' },
        {
          title: 'Custom pluginovi',
          description: 'Funkcionalnost koju gotovi pluginovi ne pokrivaju.',
        },
        { title: 'WooCommerce', description: 'Online prodaja, prilagođena vašem katalogu.' },
        {
          title: 'JetEngine dinamički sadržaj',
          description: 'Nekretnine, katalozi, oglasi.',
        },
        { title: 'Elementor setup', description: 'Da sami lako mijenjate stranice.' },
        { title: 'Održavanje', description: 'Apdejti, sigurnost, backup.' },
      ],
      proofTitle: 'Kad gotovo ne odgovara',
      proofBody: lexicalFromText(
        'Kad standardni plugin skoro pa radi posao ali ne baš — tu napišemo vlastito rješenje, tačno za vaš tok rada.',
      ),
      processSteps: [
        {
          stepTitle: 'Analiza sadržaja i procesa',
          stepDescription: 'Kako i koliko često mijenjate sadržaj.',
        },
        { stepTitle: 'Postavka', stepDescription: 'Biramo teme, pluginove, i šta treba custom.' },
        { stepTitle: 'Development', stepDescription: 'Izrada template-a i vlastitih pluginova.' },
        {
          stepTitle: 'Testiranje',
          stepDescription: 'Brzina, stabilnost, ponašanje nakon apdejta.',
        },
        { stepTitle: 'Obuka', stepDescription: 'Pokazujemo vam kako da sve sami radite.' },
        { stepTitle: 'Podrška', stepDescription: 'Održavanje i dalji razvoj.' },
      ],
      faq: [
        {
          question: 'Zašto custom plugin umjesto gotovog?',
          answer:
            'Kad gotov plugin ne radi baš ono što treba, ili usporava sajt — vlastiti plugin je brži, čistiji i radi tačno za vaš proces.',
        },
        {
          question: 'Hoće li se sajt pokvariti nakon WordPress apdejta?',
          answer: 'Zato radimo čist setup i testiramo — cilj je stabilnost, ne kula od gotovih pluginova.',
        },
        {
          question: 'Mogu li sam mijenjati sadržaj?',
          answer: 'Da — to je glavna prednost WordPress-a, i postavljamo ga tačno za to, uz obuku.',
        },
        {
          question: 'Radite li WooCommerce prodavnice?',
          answer: 'Da, uključujući prilagodbe za specifične kataloge i procese.',
        },
        {
          question: 'Možete li preuzeti postojeći WordPress sajt?',
          answer: 'Da — radimo audit i predlažemo šta popraviti ili prepraviti.',
        },
      ],
    },
  })

  payload.logger.info('Enriching "App development" with custom-functionality content...')
  await payload.update({
    collection: 'services',
    id: appDevelopment.id,
    data: {
      order: 3,
      heroTitle: 'Od ideje do aplikacije — i svake funkcionalnosti koja joj treba',
      heroSubtitle:
        'AI-ubrzan razvoj aplikacija i custom funkcionalnosti po mjeri. Testirajte ideju u sedmicama, ne godinama.',
      whatYouGet: [
        { item: 'Brz prototip za testiranje ideje' },
        { item: 'Custom funkcionalnosti koje gotovi alati ne pokrivaju' },
        { item: 'Plan za dalji rast i nadogradnju' },
      ],
      forWhom:
        'Za poduzetnike i biznise sa idejom za aplikaciju, ili specifičnom funkcionalnošću koju gotovi alati i pluginovi ne pokrivaju.',
      howWeWork: [
        { stepTitle: 'Definišemo', stepDescription: 'Definišemo obim — cijela aplikacija ili funkcionalnost' },
        { stepTitle: 'Gradimo', stepDescription: 'Gradimo prototip ili funkcionalnost uz AI-ubrzan development' },
        { stepTitle: 'Testiramo', stepDescription: 'Testiramo sa stvarnim korisnicima i nadograđujemo' },
      ],
      ctaText: 'Imate ideju ili funkcionalnost koja fali? Pretvorimo je u plan.',
      seo: {
        metaTitle: 'App development',
        metaDescription:
          'AI-ubrzan razvoj aplikacija i custom funkcionalnosti po mjeri. Testirajte ideju u sedmicama, ne godinama.',
      },
      expertQuote: {
        text: 'Bilo da je riječ o cijeloj aplikaciji ili jednoj funkcionalnosti koja fali — posao je isti: napraviti nešto što ne postoji gotovo, tačno kako treba.',
        attribution: 'Createam tim',
      },
      contextTitle: 'Kad gotovo rješenje ne postoji.',
      contextBody: lexicalFromText(
        'Ponekad vam treba cijela aplikacija. Ponekad samo jedna funkcionalnost koju nijedan gotov alat ne pokriva. U oba slučaja, klasičan razvoj znači mjesece čekanja i veliko ulaganje prije nego uopšte vidite radi li stvar.\n\nAI-ubrzan razvoj mijenja računicu. Prototip ili custom funkcionalnost koja je nekad trajala mjesece sad se pravi u sedmicama — dovoljno brzo da testirate prije nego uložite u puno. Brzina, ali uz kod koji prolazi kroz ljudsku kontrolu i standarde kvaliteta.',
      ),
      differentiators: [
        {
          title: 'MVP prvo',
          description:
            'Najmanja verzija koja dokazuje ideju, pa nadogradnja na osnovu stvarnih korisnika.',
        },
        {
          title: 'AI-ubrzan, ne AI-nemaran',
          description: 'Brzina od AI alata, kvalitet od ljudske kontrole.',
        },
        {
          title: 'Aplikacija ili funkcionalnost',
          description: 'Isti pristup za cijeli proizvod ili jedan dio koji fali.',
        },
        {
          title: 'Građeno za rast',
          description: 'Prototip je temelj pune verzije, ne bačen posao.',
        },
      ],
      whatWeDo: [
        { title: 'Definisanje MVP-a', description: 'Ključna funkcionalnost vrijedna testiranja.' },
        { title: 'Brzi prototip', description: 'Funkcionalna verzija za rane korisnike.' },
        {
          title: 'Web i mobilne aplikacije',
          description: 'Prema tome gdje su vaši korisnici.',
        },
        {
          title: 'Custom funkcionalnosti',
          description: 'Pojedinačne funkcije koje gotovi alati ne pokrivaju.',
        },
        { title: 'Integracije', description: 'Povezivanje sa postojećim sistemima i podacima.' },
        {
          title: 'Skaliranje',
          description: 'Priprema za veći broj korisnika kad ideja proradi.',
        },
      ],
      proofTitle: 'Kako to izgleda',
      proofBody: lexicalFromText(
        'Isti pristup bez obzira na obim — brzo do funkcionalnog, pa pametna nadogradnja na osnovu stvarnog korištenja.',
      ),
      processSteps: [
        { stepTitle: 'Razgovor', stepDescription: 'Razumijemo problem koji treba riješiti.' },
        {
          stepTitle: 'Definisanje obima',
          stepDescription: 'Cijela aplikacija ili konkretna funkcionalnost.',
        },
        { stepTitle: 'Prototip / izrada', stepDescription: 'Brzi razvoj funkcionalne verzije.' },
        {
          stepTitle: 'Testiranje',
          stepDescription: 'Sa stvarnim korisnicima ili u stvarnom procesu.',
        },
        { stepTitle: 'Iteracija', stepDescription: 'Dorada na osnovu povratnih informacija.' },
        { stepTitle: 'Rast', stepDescription: 'Nadogradnja i skaliranje.' },
      ],
      faq: [
        {
          question: 'Radite li i cijele aplikacije i pojedinačne funkcionalnosti?',
          answer: 'Da — isti pristup, samo različit obim. Od jedne funkcije do cijelog proizvoda.',
        },
        {
          question: 'Šta znači "AI-ubrzan razvoj"?',
          answer:
            'Koristimo AI alate da ubrzamo razvoj, ali kod prolazi kroz ljudsku kontrolu — brzina bez gubitka kvaliteta.',
        },
        {
          question: 'Imam samo ideju, bez tehničkog znanja. Problem?',
          answer: 'Ne. Vi donosite ideju i poznavanje problema; tehnički dio je na nama.',
        },
        {
          question: 'Koliko košta?',
          answer:
            'Ovisi o obimu. Cilj je da prva verzija bude dovoljno mala da brzo testirate bez velikog ulaganja.',
        },
        {
          question: 'Šta ako prototip pokaže da ideja ne radi?',
          answer: 'To je uspjeh — saznali ste za sedmice i malo novca umjesto za godinu i puno.',
        },
      ],
    },
  })

  payload.logger.info('Expanding "Grafički dizajn"...')
  await payload.update({
    collection: 'services',
    id: grafickiDizajn.id,
    data: {
      order: 4,
      heroTitle: 'Identitet koji ostaje u glavi',
      heroSubtitle:
        'Od logotipa do kompletnog vizuelnog identiteta — brend koji izgleda dosljedno i prepoznatljivo na svakoj tački dodira.',
      ctaText: 'Spremni za brend koji se pamti?',
      seo: {
        metaTitle: 'Grafički dizajn',
        metaDescription:
          'Od logotipa do kompletnog vizuelnog identiteta — brend koji izgleda dosljedno na svakoj tački dodira.',
      },
      expertQuote: {
        text: 'Brend nije logo. Logo je samo prvi znak. Brend je osjećaj koji ostaje kad se sve — boje, tipografija, ton — slože u istu priču.',
        attribution: 'Createam tim',
      },
      contextTitle: 'Ljudi vide vaš brend prije nego pročitaju šta radite.',
      contextBody: lexicalFromText(
        'Prvi utisak se stvara u sekundi — prije nego iko pročita ijednu riječ. Logo, boje, tipografija govore o vama prije vas samih. Ako izgledaju neuredno ili nedosljedno (jedno na sajtu, drugo na Instagramu, treće na vizit karti), poruka je nesvjesna ali jasna: "ovdje se ne pazi na detalje".\n\nDobar vizuelni identitet radi suprotno — gradi povjerenje prije prvog razgovora, i ostaje dosljedan svuda gdje vas neko sretne.',
      ),
      differentiators: [
        {
          title: 'Identitet, ne samo logo',
          description: 'Gradimo cijeli sistem, ne jednu sličicu.',
        },
        {
          title: 'Dosljednost svuda',
          description: 'Smjernice koje drže brend istim na sajtu, mrežama i štampi.',
        },
        {
          title: 'Strategija prije estetike',
          description: 'Dizajn koji odražava ko ste, ne samo šta je trenutno u modi.',
        },
        {
          title: 'Upotrebljivo',
          description: 'Dobijate materijale i smjernice koje stvarno možete koristiti dalje.',
        },
      ],
      whatWeDo: [
        { title: 'Logotip', description: 'Glavni znak i varijacije.' },
        { title: 'Vizuelni identitet', description: 'Boje, tipografija, elementi.' },
        { title: 'Brend smjernice', description: 'Pravila koja drže brend dosljednim.' },
        { title: 'Materijali za štampu', description: 'Vizit karte, leci, ambalaža.' },
        { title: 'Digitalni materijali', description: 'Za sajt i društvene mreže.' },
        { title: 'Redizajn', description: 'Osvježavanje postojećeg brenda.' },
      ],
      proofTitle: 'Dosljednost na djelu',
      proofBody: lexicalFromText(
        'Svaki identitet gradimo kao sistem — tako da izgleda jednako dobro na ekranu i na papiru, danas i za dvije godine.',
      ),
      processSteps: [
        { stepTitle: 'Istraživanje', stepDescription: 'Brend, vrijednosti, konkurencija, publika.' },
        { stepTitle: 'Koncept', stepDescription: 'Vizuelni pravci na izbor.' },
        { stepTitle: 'Razrada', stepDescription: 'Finaliziranje odabranog pravca.' },
        { stepTitle: 'Sistem', stepDescription: 'Boje, tipografija, varijacije, smjernice.' },
        { stepTitle: 'Materijali', stepDescription: 'Priprema za štampu i digitalne kanale.' },
        { stepTitle: 'Predaja', stepDescription: 'Svi fajlovi i smjernice, spremni za korištenje.' },
      ],
      faq: [
        {
          question: 'Radite li samo logo ili cijeli identitet?',
          answer:
            'Oboje — ali preporučujemo cijeli identitet, jer logo sam bez sistema brzo postane nedosljedan.',
        },
        {
          question: 'Imam stari logo, treba mi osvježenje. Može?',
          answer: 'Da, redizajn postojećeg brenda je česta usluga.',
        },
        {
          question: 'Dobijam li fajlove za štampu?',
          answer: 'Da — sve u odgovarajućim formatima, plus smjernice za korištenje.',
        },
        {
          question: 'Koliko traje?',
          answer:
            'Ovisi o obimu — od logotipa do kompletnog identiteta sa materijalima. Rok uz ponudu.',
        },
        {
          question: 'Radite li i dizajn sajta?',
          answer: 'Da, i često ide zajedno — grafički identitet i web dizajn se prirodno nadovezuju.',
        },
      ],
    },
  })

  payload.logger.info('Renumbering remaining short-format services...')
  if (fotografija) await payload.update({ collection: 'services', id: fotografija.id, data: { order: 5 } })
  if (copywriting) await payload.update({ collection: 'services', id: copywriting.id, data: { order: 6 } })
  if (prevodjenje) await payload.update({ collection: 'services', id: prevodjenje.id, data: { order: 7 } })
  if (seoMarketing) await payload.update({ collection: 'services', id: seoMarketing.id, data: { order: 8 } })

  if (webDevelopment) {
    payload.logger.info('Deleting "Web development" (merged into web-dizajn-i-development)...')
    await payload.delete({ collection: 'services', id: webDevelopment.id })
  }
  if (customFunkcionalnosti) {
    payload.logger.info('Deleting "Custom funkcionalnosti & pluginovi" (merged into app-development)...')
    await payload.delete({ collection: 'services', id: customFunkcionalnosti.id })
  }

  payload.logger.info('Regenerating footer "Usluge" links from the final 8 services...')
  const { docs: finalServices } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })
  const footer = await payload.findGlobal({ slug: 'footer' })
  const updatedLinkColumns = (footer.linkColumns ?? []).map((column) =>
    column.heading === 'Usluge'
      ? { heading: column.heading, links: finalServices.map((s) => ({ label: s.title, href: `/usluge/${s.slug}` })) }
      : { heading: column.heading, links: column.links },
  )
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: footer.description,
      linkColumns: updatedLinkColumns,
      copyright: footer.copyright,
      socialLinks: footer.socialLinks,
    },
  })

  payload.logger.info('Updating site-settings default SEO description...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      defaultSeo: {
        metaTitle: 'Createam — Web dizajn, development i marketing',
        metaDescription:
          'Createam je tim koji radi web dizajn i development, WordPress, aplikacije i custom funkcionalnosti, grafički dizajn, fotografiju, copywriting, prevođenje i SEO/marketing.',
      },
    },
  })

  payload.logger.info('Migration to 8 services complete.')
  process.exit(0)
}

await run()
