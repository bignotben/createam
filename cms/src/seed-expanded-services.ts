import { getPayload } from 'payload'

import config from './payload.config'
import { lexicalFromText } from './lib/lexical'

type ExpandedServiceSeed = {
  slug: string
  expertQuote: { text: string; attribution: string }
  contextTitle: string
  contextBody: string
  differentiators: { title: string; description: string }[]
  whatWeDo: { title: string; description: string }[]
  proofTitle: string
  proofBody: string
  processSteps: { stepTitle: string; stepDescription: string }[]
  faq: { question: string; answer: string }[]
}

// The 5 key services on a fresh install, per createam-services-v2-copy.md.
// Run after `seed` (which creates the 8 base services). Matches by slug and
// updates in place — safe to re-run.
const expandedServicesData: ExpandedServiceSeed[] = [
  {
    slug: 'web-dizajn-i-development',
    expertQuote: {
      text: 'Lijep sajt koji je spor je promašaj. Brz sajt koji izgleda loše je isto promašaj. Dizajn i development moraju nastati zajedno — inače jedno kvari drugo.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Dizajn i kod nisu dvije faze. To je jedan posao.',
    contextBody:
      'Kad dizajn radi jedna firma a development druga, gubi se nešto u prevodu — dizajn koji izgleda sjajno u Figmi ispadne spor ili nemoguć za izvedbu, a developer "približno" pogodi ono što je dizajner zamislio. Rezultat je sajt koji nije ni lijep ni brz kako je trebao biti.\n\nMi radimo oboje, zajedno, od početka. Dizajn nastaje znajući kako će se graditi; kod nastaje čuvajući svaki detalj dizajna. Ishod je sajt koji izgleda tačno kako je zamišljen — i učitava se brzinom koju Google i vaši posjetioci traže.',
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
      { title: 'Optimizacija brzine', description: 'Core Web Vitals, učitavanje, keširanje.' },
      { title: 'Tehnički SEO temelj', description: 'Struktura i čitljivost za pretraživače i AI.' },
    ],
    proofTitle: 'Iz prakse',
    proofBody: 'Svaki sajt prolazi kroz iste standarde — dizajn koji predstavlja brend i kod koji izdrži rast.',
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
  {
    slug: 'wordpress',
    expertQuote: {
      text: 'WordPress je moćan tačno onoliko koliko je dobro postavljen. Nagomilani pluginovi ga uspore i razbiju; pravi custom pristup ga čini brzim i vašim.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Većina WordPress sajtova je zbir tuđih pluginova.',
    contextBody:
      'Lako je sastaviti WordPress sajt od desetak gotovih pluginova — dok se ne uspori, ne razbije nakon apdejta, ili ne udari u zid jer nijedan plugin ne radi baš ono što vam treba. Tada počinje muka.\n\nMi pristupamo drugačije: koristimo WordPress tamo gdje je najjači (lako upravljanje sadržajem), a kad gotov plugin ne odgovara — napišemo vlastiti, tačno za vaš proces. Rezultat je sajt koji je brz, stabilan, i radi baš ono što treba, a vi ga i dalje sami ažurirate.',
    differentiators: [
      {
        title: 'Custom umjesto nagomilanog',
        description: 'Pišemo vlastite pluginove kad gotovi ne valjaju, ne krpimo desetak tuđih.',
      },
      { title: 'Brzina i stabilnost', description: 'Čist setup koji ne puca nakon svakog apdejta.' },
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
      { title: 'Custom pluginovi', description: 'Funkcionalnost koju gotovi pluginovi ne pokrivaju.' },
      { title: 'WooCommerce', description: 'Online prodaja, prilagođena vašem katalogu.' },
      { title: 'JetEngine dinamički sadržaj', description: 'Nekretnine, katalozi, oglasi.' },
      { title: 'Elementor setup', description: 'Da sami lako mijenjate stranice.' },
      { title: 'Održavanje', description: 'Apdejti, sigurnost, backup.' },
    ],
    proofTitle: 'Kad gotovo ne odgovara',
    proofBody:
      'Kad standardni plugin skoro pa radi posao ali ne baš — tu napišemo vlastito rješenje, tačno za vaš tok rada.',
    processSteps: [
      { stepTitle: 'Analiza sadržaja i procesa', stepDescription: 'Kako i koliko često mijenjate sadržaj.' },
      { stepTitle: 'Postavka', stepDescription: 'Biramo teme, pluginove, i šta treba custom.' },
      { stepTitle: 'Development', stepDescription: 'Izrada template-a i vlastitih pluginova.' },
      { stepTitle: 'Testiranje', stepDescription: 'Brzina, stabilnost, ponašanje nakon apdejta.' },
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
  {
    slug: 'app-development',
    expertQuote: {
      text: 'Bilo da je riječ o cijeloj aplikaciji ili jednoj funkcionalnosti koja fali — posao je isti: napraviti nešto što ne postoji gotovo, tačno kako treba.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Kad gotovo rješenje ne postoji.',
    contextBody:
      'Ponekad vam treba cijela aplikacija. Ponekad samo jedna funkcionalnost koju nijedan gotov alat ne pokriva. U oba slučaja, klasičan razvoj znači mjesece čekanja i veliko ulaganje prije nego uopšte vidite radi li stvar.\n\nAI-ubrzan razvoj mijenja računicu. Prototip ili custom funkcionalnost koja je nekad trajala mjesece sad se pravi u sedmicama — dovoljno brzo da testirate prije nego uložite u puno. Brzina, ali uz kod koji prolazi kroz ljudsku kontrolu i standarde kvaliteta.',
    differentiators: [
      {
        title: 'MVP prvo',
        description: 'Najmanja verzija koja dokazuje ideju, pa nadogradnja na osnovu stvarnih korisnika.',
      },
      { title: 'AI-ubrzan, ne AI-nemaran', description: 'Brzina od AI alata, kvalitet od ljudske kontrole.' },
      {
        title: 'Aplikacija ili funkcionalnost',
        description: 'Isti pristup za cijeli proizvod ili jedan dio koji fali.',
      },
      { title: 'Građeno za rast', description: 'Prototip je temelj pune verzije, ne bačen posao.' },
    ],
    whatWeDo: [
      { title: 'Definisanje MVP-a', description: 'Ključna funkcionalnost vrijedna testiranja.' },
      { title: 'Brzi prototip', description: 'Funkcionalna verzija za rane korisnike.' },
      { title: 'Web i mobilne aplikacije', description: 'Prema tome gdje su vaši korisnici.' },
      { title: 'Custom funkcionalnosti', description: 'Pojedinačne funkcije koje gotovi alati ne pokrivaju.' },
      { title: 'Integracije', description: 'Povezivanje sa postojećim sistemima i podacima.' },
      { title: 'Skaliranje', description: 'Priprema za veći broj korisnika kad ideja proradi.' },
    ],
    proofTitle: 'Kako to izgleda',
    proofBody:
      'Isti pristup bez obzira na obim — brzo do funkcionalnog, pa pametna nadogradnja na osnovu stvarnog korištenja.',
    processSteps: [
      { stepTitle: 'Razgovor', stepDescription: 'Razumijemo problem koji treba riješiti.' },
      { stepTitle: 'Definisanje obima', stepDescription: 'Cijela aplikacija ili konkretna funkcionalnost.' },
      { stepTitle: 'Prototip / izrada', stepDescription: 'Brzi razvoj funkcionalne verzije.' },
      { stepTitle: 'Testiranje', stepDescription: 'Sa stvarnim korisnicima ili u stvarnom procesu.' },
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
        answer: 'Ovisi o obimu. Cilj je da prva verzija bude dovoljno mala da brzo testirate bez velikog ulaganja.',
      },
      {
        question: 'Šta ako prototip pokaže da ideja ne radi?',
        answer: 'To je uspjeh — saznali ste za sedmice i malo novca umjesto za godinu i puno.',
      },
    ],
  },
  {
    slug: 'graficki-dizajn',
    expertQuote: {
      text: 'Brend nije logo. Logo je samo prvi znak. Brend je osjećaj koji ostaje kad se sve — boje, tipografija, ton — slože u istu priču.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Ljudi vide vaš brend prije nego pročitaju šta radite.',
    contextBody:
      'Prvi utisak se stvara u sekundi — prije nego iko pročita ijednu riječ. Logo, boje, tipografija govore o vama prije vas samih. Ako izgledaju neuredno ili nedosljedno (jedno na sajtu, drugo na Instagramu, treće na vizit karti), poruka je nesvjesna ali jasna: "ovdje se ne pazi na detalje".\n\nDobar vizuelni identitet radi suprotno — gradi povjerenje prije prvog razgovora, i ostaje dosljedan svuda gdje vas neko sretne.',
    differentiators: [
      { title: 'Identitet, ne samo logo', description: 'Gradimo cijeli sistem, ne jednu sličicu.' },
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
    proofBody:
      'Svaki identitet gradimo kao sistem — tako da izgleda jednako dobro na ekranu i na papiru, danas i za dvije godine.',
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
        answer: 'Oboje — ali preporučujemo cijeli identitet, jer logo sam bez sistema brzo postane nedosljedan.',
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
        answer: 'Ovisi o obimu — od logotipa do kompletnog identiteta sa materijalima. Rok uz ponudu.',
      },
      {
        question: 'Radite li i dizajn sajta?',
        answer: 'Da, i često ide zajedno — grafički identitet i web dizajn se prirodno nadovezuju.',
      },
    ],
  },
  {
    slug: 'seo-marketing',
    expertQuote: {
      text: 'Sve više ljudi ne klika na deset plavih linkova — pitaju AI i dobiju jedan odgovor. Pitanje je jednostavno: jeste li vi u tom odgovoru ili niste.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Način na koji ljudi pretražuju se mijenja. Brzo.',
    contextBody:
      'Godinama je SEO značio jedno: rangirati se visoko na Google-u. To i dalje vrijedi — ali sad se dešava nešto novo. Ljudi sve češće postavljaju pitanje ChatGPT-u, Perplexity-ju ili Google AI Overviews-u i dobiju jedan sažet odgovor, bez klikanja na sajtove.\n\nAko vas ti alati ne prepoznaju kao pouzdan izvor, ne pojavljujete se u tom odgovoru — i gubite kupce koje nikad nećete ni vidjeti u svojoj analitici, jer nikad nisu ni stigli do vašeg sajta. Aktivnost AI botova na sajtovima raste iz mjeseca u mjesec; oni čitaju, indeksiraju i odlučuju ko je vrijedan citata.',
    differentiators: [
      {
        title: 'SEO + AI, ne jedno ili drugo',
        description: 'Optimizujemo za klasične pretraživače I za AI alate, jer ljudi koriste oboje.',
      },
      {
        title: 'Sadržaj kao izvor, ne kao punjenje',
        description:
          'Pišemo tako da vas AI prepozna kao autoritet vrijedan citiranja, ne samo kao gomilu ključnih riječi.',
      },
      { title: 'Mjerljivo', description: 'Pratimo rezultate brojevima, ne obećanjima i "impresijama".' },
      {
        title: 'Tehnika + sadržaj + feed',
        description: 'Pokrivamo cijeli lanac vidljivosti, od brzine sajta do product feed-ova.',
      },
    ],
    whatWeDo: [
      {
        title: 'Tehnički SEO',
        description: 'Brzina, struktura, indeksiranje — temelj bez kojeg ništa ne rangira.',
      },
      {
        title: 'Sadržajni SEO',
        description: 'Teme i tekstovi koji odgovaraju na stvarna pitanja vaših kupaca.',
      },
      {
        title: 'AI optimizacija',
        description: 'Struktuiranje sadržaja da vas AI alati prepoznaju i citiraju kao izvor.',
      },
      {
        title: 'Feed management (nova usluga)',
        description: 'Optimizacija product feed-ova za Google Shopping, Meta katalog i marketplace-ove.',
      },
      { title: 'Marketinške kampanje', description: 'Plaćene kampanje mjerene prodajom, ne klikovima.' },
      { title: 'Izvještavanje', description: 'Redovni, jasni izvještaji o tome šta se mijenja i zašto.' },
    ],
    proofTitle: 'Vidljivost koja se mjeri',
    proofBody:
      'Bilo da vas kupac traži na Google-u ili pita AI asistenta, cilj je isti — da se pojavite kao odgovor. Pratimo i jedno i drugo, i izvještavamo brojevima.',
    processSteps: [
      {
        stepTitle: 'Audit',
        stepDescription: 'Gdje trenutno stojite, tehnički i sadržajno, na Google-u i kod AI alata.',
      },
      { stepTitle: 'Strategija', stepDescription: 'Prioriteti i plan prilagođen vašem tržištu.' },
      {
        stepTitle: 'Tehnička optimizacija',
        stepDescription: 'Popravljamo temelj (brzina, struktura, indeksiranje).',
      },
      { stepTitle: 'Sadržaj', stepDescription: 'Kreiramo/optimizujemo sadržaj za pretraživače i AI.' },
      { stepTitle: 'Kampanje', stepDescription: 'Pokrećemo plaćene kampanje gdje ima smisla.' },
      { stepTitle: 'Mjerenje i dorada', stepDescription: 'Pratimo, izvještavamo, prilagođavamo.' },
    ],
    faq: [
      {
        question: 'Šta je "AI optimizacija" i razlikuje li se od SEO-a?',
        answer:
          'SEO vas rangira na pretraživačima. AI optimizacija čini da vas AI alati (ChatGPT, Perplexity, Google AI Overviews) prepoznaju i citiraju kao izvor. Povezani su, ali nisu isto.',
      },
      {
        question: 'Koliko treba da se vide rezultati?',
        answer:
          'SEO je dugoročan — prvi pomaci obično za nekoliko mjeseci. Plaćene kampanje daju brže, ali kratkoročnije rezultate. Iskren plan dobijate na početku.',
      },
      {
        question: 'Radite li feed management?',
        answer: 'Da, to je usluga koju upravo uvodimo — pristupamo joj pažljivo, projekat po projekat.',
      },
      {
        question: 'Garantujete li prvo mjesto na Google-u?',
        answer: 'Ne, i budite oprezni prema svakome ko to garantuje. Radimo na mjerljivom, održivom rastu vidljivosti.',
      },
      {
        question: 'Kako izvještavate o rezultatima?',
        answer: 'Redovnim, jasnim izvještajima — šta se promijenilo, šta radimo dalje, i šta to znači za vas.',
      },
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  for (const s of expandedServicesData) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })
    const existing = docs[0]
    if (!existing) {
      payload.logger.warn(`Service with slug "${s.slug}" not found — skipping.`)
      continue
    }

    payload.logger.info(`Updating expanded content for "${s.slug}"...`)
    await payload.update({
      collection: 'services',
      id: existing.id,
      data: {
        expertQuote: s.expertQuote,
        contextTitle: s.contextTitle,
        contextBody: lexicalFromText(s.contextBody),
        differentiators: s.differentiators,
        whatWeDo: s.whatWeDo,
        proofTitle: s.proofTitle,
        proofBody: lexicalFromText(s.proofBody),
        processSteps: s.processSteps,
        faq: s.faq,
      },
    })
  }

  payload.logger.info('Done seeding expanded services.')
  process.exit(0)
}

await run()
