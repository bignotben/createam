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

const expandedServicesData: ExpandedServiceSeed[] = [
  {
    slug: 'web-development',
    expertQuote: {
      text: 'Većina sajtova ne pada zbog dizajna — padaju zbog onoga što se ne vidi: sporog koda, lošeg temelja, i prečica koje se osvete kad dođe pravi saobraćaj.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Brzina više nije bonus. To je preduslov.',
    contextBody:
      'Posjetilac odustaje nakon tri sekunde čekanja. Google rangira brže sajtove više. A svaki dodatni plugin, svaka prečica u kodu, svaki "zakrpljeni" dio — usporava vas i gomila tehnički dug koji se plaća kasnije, obično u najgorem trenutku.\n\nSajt izgrađen na čvrstim temeljima ne samo da je brži danas — lakše se održava, sigurniji je, i raste s vama umjesto da ga morate praviti ispočetka za dvije godine.',
    differentiators: [
      {
        title: 'Čist kod, ne prečice',
        description:
          'Pišemo održiv kod od prvog dana, ne krpimo gotova rješenja koja se raspadnu pod opterećenjem.',
      },
      {
        title: 'SEO ugrađen, ne dodat kasnije',
        description:
          'Struktura, brzina i tehnička optimizacija su dio temelja, ne naknadna misao.',
      },
      {
        title: 'Građeno da raste',
        description:
          'Kod koji se lako proširuje kad zatreba nova funkcionalnost, bez rušenja postojećeg.',
      },
      {
        title: 'Dokumentovano',
        description:
          'Dobijate tehničku dokumentaciju, pa niste zaključani za nas ako želite dalje sami ili s drugim timom.',
      },
    ],
    whatWeDo: [
      { title: 'Custom razvoj', description: 'Sajtovi građeni po mjeri, ne šablonizirani.' },
      { title: 'Optimizacija brzine', description: 'Core Web Vitals, učitavanje, keširanje.' },
      {
        title: 'Tehnički SEO temelj',
        description: 'Struktura, indeksiranje, čitljivost za pretraživače i AI.',
      },
      {
        title: 'Sigurnost',
        description: 'Zaštita od uobičajenih ranjivosti, sigurne forme i podaci.',
      },
      {
        title: 'Integracije',
        description: 'Povezivanje sa sistemima koje već koristite (plaćanja, CRM, alati).',
      },
      { title: 'Održavanje i podrška', description: 'Nakon lansiranja ostajemo dostupni.' },
    ],
    proofTitle: 'Iz prakse',
    proofBody:
      'Svaki sajt koji izgradimo prolazi kroz iste standarde brzine i kvaliteta koda — bez obzira je li riječ o prezentacionom sajtu ili kompleksnoj platformi.',
    processSteps: [
      {
        stepTitle: 'Tehnička analiza',
        stepDescription: 'Definišemo zahtjeve, opterećenje, integracije.',
      },
      {
        stepTitle: 'Arhitektura',
        stepDescription: 'Biramo tehnologiju i strukturu prilagođenu projektu.',
      },
      {
        stepTitle: 'Razvoj u fazama',
        stepDescription: 'Gradimo uz redovne preglede, ne "veliki prasak" na kraju.',
      },
      {
        stepTitle: 'Testiranje',
        stepDescription: 'Brzina, sigurnost, SEO, ponašanje na svim uređajima.',
      },
      { stepTitle: 'Lansiranje', stepDescription: 'Kontrolisano, sa praćenjem prvih rezultata.' },
      { stepTitle: 'Podrška', stepDescription: 'Održavanje, nadogradnje, rast.' },
    ],
    faq: [
      {
        question: 'Koliko traje izrada sajta?',
        answer:
          'Ovisi o obimu — prezentacioni sajt obično 3-5 sedmica, kompleksnije platforme duže. Tačan rok dobijate uz ponudu.',
      },
      {
        question: 'Koju tehnologiju koristite?',
        answer: 'Biramo je prema projektu, ne obrnuto. Prioritet su brzina, SEO i lakoća održavanja.',
      },
      {
        question: 'Šta ako već imam sajt koji je spor?',
        answer: 'Radimo audit i predlažemo da li se isplati optimizovati postojeći ili graditi novi.',
      },
      {
        question: 'Mogu li kasnije sam mijenjati sadržaj?',
        answer: 'Da — gradimo tako da netehnički ljudi mogu upravljati sadržajem, uz obuku.',
      },
      {
        question: 'Šta se dešava nakon lansiranja?',
        answer: 'Ostajemo dostupni za održavanje i nadogradnje; niste prepušteni sami sebi.',
      },
    ],
  },
  {
    slug: 'app-development',
    expertQuote: {
      text: 'Najveći trošak kod aplikacija nije razvoj — to je vrijeme potrošeno na pogrešnu ideju. Zato prvo gradimo najmanju verziju koja dokazuje da ideja radi.',
      attribution: 'Createam tim',
    },
    contextTitle: 'Ideje su jeftine. Pogrešno uloženo vrijeme nije.',
    contextBody:
      'Klasičan razvoj aplikacije znači mjesece čekanja i veliko ulaganje prije nego uopšte saznate hoće li ljudi koristiti to što gradite. Do trenutka kad je gotova, tržište se možda već pomjerilo.\n\nAI-ubrzan razvoj mijenja tu računicu. Prototip koji nekad traži mjesece sad se pravi u sedmicama — dovoljno brzo da testirate ideju sa stvarnim korisnicima prije nego uložite u punu verziju. Brzina, ali bez žrtvovanja kvaliteta koda.',
    differentiators: [
      {
        title: 'MVP prvo',
        description:
          'Gradimo najmanju verziju koja dokazuje ideju, pa nadograđujemo na osnovu stvarnih korisnika.',
      },
      {
        title: 'AI-ubrzan, ne AI-nemaran',
        description:
          'Brzina od AI alata, ali kod prolazi kroz ljudsku kontrolu i standarde kvaliteta.',
      },
      {
        title: 'Vi vidite napredak',
        description: 'Radite s nama kroz proces, ne čekate "veliko otkrivanje" na kraju.',
      },
      {
        title: 'Građeno za rast',
        description: 'Prototip nije bačen posao; temelj je na kojem se gradi puna aplikacija.',
      },
    ],
    whatWeDo: [
      {
        title: 'Definisanje MVP-a',
        description: 'Izdvajamo ključnu funkcionalnost vrijednu testiranja.',
      },
      { title: 'Brzi prototip', description: 'Funkcionalna verzija za rane korisnike.' },
      {
        title: 'Web i mobilne aplikacije',
        description: 'Prema tome gdje su vaši korisnici.',
      },
      {
        title: 'Testiranje sa korisnicima',
        description: 'Stvarne povratne informacije prije velikog ulaganja.',
      },
      {
        title: 'Iteracija i nadogradnja',
        description: 'Rast na osnovu podataka, ne pretpostavki.',
      },
      {
        title: 'Skaliranje',
        description: 'Priprema aplikacije za veći broj korisnika kad ideja proradi.',
      },
    ],
    proofTitle: 'Kako to izgleda',
    proofBody:
      'Pristup je isti bez obzira na ideju — brzo do funkcionalnog prototipa, pa pametno nadograđivanje na osnovu onoga što korisnici stvarno rade.',
    processSteps: [
      { stepTitle: 'Razgovor o ideji', stepDescription: 'Razumijemo problem koji aplikacija rješava.' },
      {
        stepTitle: 'Definisanje MVP-a',
        stepDescription: 'Biramo ključnu funkcionalnost za prvu verziju.',
      },
      { stepTitle: 'Prototip', stepDescription: 'Brzi razvoj funkcionalne verzije.' },
      { stepTitle: 'Testiranje', stepDescription: 'Stavljamo je pred stvarne korisnike.' },
      { stepTitle: 'Iteracija', stepDescription: 'Dorađujemo na osnovu povratnih informacija.' },
      { stepTitle: 'Rast', stepDescription: 'Nadograđujemo prema punoj aplikaciji.' },
    ],
    faq: [
      {
        question: 'Koliko košta razvoj aplikacije?',
        answer:
          'Ovisi o obimu MVP-a. Cilj nam je da prva verzija bude dovoljno mala da brzo testirate ideju bez velikog ulaganja.',
      },
      {
        question: 'Šta znači "AI-ubrzan razvoj"?',
        answer:
          'Koristimo AI alate da ubrzamo dijelove razvoja, ali kod prolazi kroz ljudsku kontrolu — brzina bez gubitka kvaliteta.',
      },
      {
        question: 'Imam samo ideju, ne tehničko znanje. Je li to problem?',
        answer: 'Ne. Vi donosite ideju i poznavanje problema; mi se bavimo tehničkim dijelom.',
      },
      {
        question: 'Šta ako prototip pokaže da ideja ne radi?',
        answer:
          'To je uspjeh, ne neuspjeh — saznali ste to za sedmice i mali novac umjesto godine i veliki.',
      },
      {
        question: 'Mogu li kasnije proširiti aplikaciju?',
        answer: 'Da — prototip gradimo kao temelj za punu verziju, ne kao jednokratno rješenje.',
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
        description:
          'Optimizujemo za klasične pretraživače I za AI alate, jer ljudi koriste oboje.',
      },
      {
        title: 'Sadržaj kao izvor, ne kao punjenje',
        description:
          'Pišemo tako da vas AI prepozna kao autoritet vrijedan citiranja, ne samo kao gomilu ključnih riječi.',
      },
      {
        title: 'Mjerljivo',
        description: 'Pratimo rezultate brojevima, ne obećanjima i "impresijama".',
      },
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
        description:
          'Struktuiranje sadržaja da vas AI alati prepoznaju i citiraju kao izvor.',
      },
      {
        title: 'Feed management (nova usluga)',
        description:
          'Optimizacija product feed-ova za Google Shopping, Meta katalog i marketplace-ove.',
      },
      {
        title: 'Marketinške kampanje',
        description: 'Plaćene kampanje mjerene prodajom, ne klikovima.',
      },
      {
        title: 'Izvještavanje',
        description: 'Redovni, jasni izvještaji o tome šta se mijenja i zašto.',
      },
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
      {
        stepTitle: 'Sadržaj',
        stepDescription: 'Kreiramo/optimizujemo sadržaj za pretraživače i AI.',
      },
      { stepTitle: 'Kampanje', stepDescription: 'Pokrećemo plaćene kampanje gdje ima smisla.' },
      {
        stepTitle: 'Mjerenje i dorada',
        stepDescription: 'Pratimo, izvještavamo, prilagođavamo.',
      },
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
        answer:
          'Ne, i budite oprezni prema svakome ko to garantuje. Radimo na mjerljivom, održivom rastu vidljivosti.',
      },
      {
        question: 'Kako izvještavate o rezultatima?',
        answer:
          'Redovnim, jasnim izvještajima — šta se promijenilo, šta radimo dalje, i šta to znači za vas.',
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
