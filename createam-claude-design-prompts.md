# Createam — Prompti za Claude Design

Uputstvo za korištenje ovih promptova nalazi se na dnu fajla. Kopiraj prompt po prompt, redoslijedom kako su navedeni — ne sve odjednom.

---

## 1. Master style prompt (POKRENI OVAJ PRVI, uvijek)

Ovaj prompt šalješ prvi, prije bilo koje konkretne stranice. On postavlja vizuelni smjer za cijeli projekat, tako da svaka sljedeća stranica bude dosljedna.

```
Radim na web sajtu za Createam — tim koji radi web dizajn, development, WordPress, custom aplikacije, grafički dizajn, fotografiju, copywriting, prevođenje i SEO/marketing.

Vizuelni smjer: kombinacija Locomotive.agency i Koto.studio pristupa — čisto, samouvjereno, editorial osjećaj. Generozan prazan prostor, jaka ali ne agresivna tipografija, minimalna dekoracija. Bez gradijenata, bez sjenki, bez neona. Flat dizajn sa jasnom hijerarhijom.

Tipografija: jedan sans-serif font za sve (moderan, geometrijski, npr. u stilu Inter/Neue Montreal/Söhne — predloži konkretan Google Fonts par ako nemaš pristup tim fontovima). Naslovi veliki i samouvjereni, tekst čitljiv i smiren.

Boje: neutralna paleta (crna/tamno siva na bijeloj/svijetlo sivoj pozadini) sa jednom akcentnom bojom po izboru (predlažem toplu, ne plavu korporativnu — npr. tamno narandžastu, tamno zelenu ili burgundy) koja se koristi rijetko i namjerno (CTA dugmići, akcentne linije, hover stanja).

Layout princip: sekcije se nižu vertikalno sa jasnim razdvajanjem, grid sistem sa dosljednim razmacima, kartice bez sjenki (samo tanka linija border-a ili razlika u pozadinskoj boji).

Ton cijelog sajta: profesionalan, direktan, samouvjeren — bez korporativnog žargona.

Prije nego počneš praviti stranice, predloži mi: 1) konkretan font par, 2) konkretnu akcentnu boju (hex kod), 3) osnovni grid/spacing sistem koji ćeš koristiti na svim stranicama. Čekam potvrdu prije nastavka.
```

**Nakon što dobiješ predlog fontova/boja — potvrdi ili traži izmjenu, pa nastavi na prompt 2.**

---

## 2. Homepage

```
Napravi homepage za Createam koristeći dogovoreni vizuelni smjer (fontovi, boje, spacing iz prethodnog dogovora). Struktura stranice, tačnim redoslijedom:

1. HERO
Naslov (H1): "Sve što vašem brendu treba, od jednog tima."
Podnaslov: "Web sajtovi, aplikacije, brend, sadržaj i marketing — dizajnirano i izgrađeno od strane ljudi koji stvarno razumiju kako se to radi, ne samo kako se o tome priča."
Dva CTA dugmeta: "Zakaži besplatan poziv" (primarno, ispunjeno akcentnom bojom) i "Pogledaj radove" (sekundarno, outline).
Mikro-tekst ispod dugmića: "Bez dugih ugovora. Bez nejasnih ponuda. Samo jasan plan i rok."

2. PROBLEMI KOJE RJEŠAVAMO
Naslov sekcije: "Ne prodajemo usluge. Rješavamo probleme."
Podnaslov: "Imamo pun spektar usluga, ali suština je jednostavna — prepoznati pravi problem i riješiti ga pravim pristupom."
Grid od 6 kartica (2 reda x 3 kolone na desktopu, 1 kolona na mobilnom), svaka sa malom ikonicom i kratkim naslovom:
- Vaš sajt vas ne predstavlja kako treba
- Ne znate da li vas AI alati uopšte "vide"
- Vaš katalog proizvoda nije vidljiv gdje ljudi kupuju
- Brend izgleda drugačije na svakom kanalu
- Nemate vremena da koordinirate pet različitih izvođača
- Imate ideju za aplikaciju, ali ne znate odakle početi

3. USLUGE
Naslov: "Usluge"
Tri kartice jedna pored druge (kategorije):
- "Digital" — Web dizajn, Web development, WordPress dizajn & development, Custom funkcionalnosti & pluginovi, App development
- "Brend & sadržaj" — Grafički dizajn, Fotografija, Copywriting, Prevođenje
- "Rast" — SEO & Marketing (uklj. AI optimizaciju i feed management)

4. TIM (kratka teaser sekcija, ne cijela stranica)
Naslov: "Tim koji stoji iza svakog projekta"
Tekst: "Createam je tim ljudi koji zajedno pokrivaju cijeli put od ideje do lansiranja. Za svaki projekat okupljamo tačno one članove tima koji su najbolji za taj posao."
Link "Upoznajte tim →"

5. IZDVOJENI RADOVI
Naslov: "Radovi koji govore više od riječi"
Grid od 3 kartice projekta (placeholder slike, nazivi klijenata, kratke oznake usluga)
Link "Svi projekti →"

6. FINALNI CTA
Naslov: "Spremni da počnemo?"
Tekst: "Zakažite besplatan poziv od 20 minuta. Bez obaveza, bez pritiska."
CTA dugme: "Zakaži poziv"

7. FOOTER
Kratak opis brenda, kolone linkova (Usluge / Agencija / Pravno), copyright.

Napravi desktop verziju prve, pa mi pokaži prije nego radiš mobilnu verziju.
```

---

## 3. Service stranica (template — koristi za sve usluge)

Ovaj prompt koristiš 10 puta, mijenjajući samo dio u zagradama za svaku uslugu (tekst za svaku uslugu je u fajlu createam-remaining-pages-copy.md, sekcija 2).

```
Napravi service stranicu za uslugu "[NAZIV USLUGE]" koristeći dogovoreni vizuelni smjer sa homepage-a. Struktura:

1. HERO
Naslov (H1): "[HERO H1 iz copy dokumenta]"
Podnaslov: "[HERO PODNASLOV iz copy dokumenta]"
CTA dugme: "[CTA iz copy dokumenta]"

2. UVOD
Tekst: "[UVOD iz copy dokumenta]"

3. ŠTA DOBIJATE
Lista sa 2-5 stavki (kratke, sa checkmark ikonicom ispred): "[stavke iz copy dokumenta]"

4. ZA KOGA JE OVO
Kratak paragraf: "[tekst iz copy dokumenta]"

5. KAKO RADIMO
3 numerisana koraka, horizontalno na desktopu: "[koraci iz copy dokumenta]"

6. FINALNI CTA
"[CTA iz copy dokumenta]"

Koristi isti header/footer kao homepage. Zadrži konzistentnu tipografiju i spacing.
```

---

## 4. Tim — stranica

```
Napravi stranicu "Tim" koristeći dogovoreni vizuelni smjer. Struktura:

1. HERO
Naslov: "Tim koji stoji iza svakog projekta"
Podnaslov: "Dizajneri, developeri, copywriteri, fotografi, prevodioci i marketing stručnjaci — okupljeni po projektu, ujedinjeni pod jednim brendom."

2. UVOD
Tekst: "Createam je tim ljudi koji zajedno pokrivaju cijeli put od ideje do lansiranja. Za svaki projekat okupljamo tačno one članove tima koji su najbolji za taj posao, tako da uvijek radite sa pravim ekspertom, ne generalistom koji 'pokriva sve'."

3. KAKO RADIMO ZAJEDNO
3 numerisana koraka:
1. Razgovor o projektu — Definišemo šta je tačno potrebno.
2. Sastavljanje tima — Okupljamo prave ljude za taj konkretan posao.
3. Jedan kontakt za vas — Bez obzira koliko ljudi radi iza scene, vi razgovarate sa jednom osobom.

4. ČLANOVI TIMA
Grid kartica (koristi 4-6 placeholder kartica za sada), svaka sa: okrugla fotografija/avatar placeholder, ime (placeholder "Ime Prezime"), uloga (placeholder "Uloga/specijalnost"), kratka rečenica (placeholder "Kratka rečenica o pristupu radu.")

5. FINALNI CTA
Naslov: "Želite da baš ovi ljudi rade na vašem projektu?"
CTA dugme: "Zakaži poziv"

Koristi isti header/footer kao homepage.
```

---

## 5. Radovi — stranica portfolija (index)

```
Napravi stranicu "Radovi" (portfolio index) koristeći dogovoreni vizuelni smjer. Struktura:

1. HERO
Naslov: "Radovi koji govore više od riječi"
Podnaslov: "Ne pokazujemo samo lijepe slike — pokazujemo probleme koje smo riješili."

2. FILTER
Horizontalna traka dugmića za filtriranje: Svi / Web dizajn / WordPress / App development / Brend & sadržaj / SEO & Marketing

3. GRID PROJEKATA
Grid od 6 placeholder kartica (3 kolone x 2 reda na desktopu), svaka sa: placeholder slika/screenshot, naziv klijenta (placeholder "Naziv klijenta"), oznaka usluga (placeholder "WordPress · Elementor"), hover efekat koji indicira klikabilnost.

4. FINALNI CTA
"Želite da i vaš projekat bude ovdje? Zakaži poziv."

Koristi isti header/footer kao homepage.
```

---

## 6. Case study — template pojedinačnog projekta

```
Napravi template stranicu za case study (pojedinačni projekat u portfoliju) koristeći dogovoreni vizuelni smjer. Struktura:

1. NASLOV
"[Naziv klijenta] — [kratak opis projekta]" (placeholder tekst za sada)
Meta traka ispod naslova: "Klijent: [naziv] · Usluge: [lista] · Godina: [godina]"

2. VELIKA SLIKA/SCREENSHOT PROJEKTA (hero image, placeholder)

3. PROBLEM
Naslov sekcije: "Problem"
Placeholder paragraf teksta (2-4 rečenice)

4. PRISTUP
Naslov sekcije: "Pristup"
Placeholder paragraf teksta, opciono sa pod-naslovima za faze

5. REZULTAT
Naslov sekcije: "Rezultat"
Placeholder paragraf + opciono 2-3 velika broja/statistike u kartici formatu (npr. "40% brži sajt")

6. CITAT KLIJENTA (opciono)
Veliki citat u kurzivu sa imenom i pozicijom ispod (placeholder)

7. FINALNI CTA
"Imate sličan projekat na umu? Zakaži poziv."

Editorial layout — velike slike, generozan prostor, tekst u jednoj čitljivoj koloni (max 65 karaktera po redu). Koristi isti header/footer kao homepage.
```

---

## 7. Kontakt — stranica

```
Napravi stranicu "Kontakt" koristeći dogovoreni vizuelni smjer. Struktura:

1. HERO
Naslov: "Spremni da počnemo?"
Podnaslov: "Zakažite besplatan poziv od 20 minuta. Bez obaveza, bez pritiska."

2. DVOKOLONSKI LAYOUT (forma lijevo, info desno)

Lijevo — forma sa poljima:
- Ime i prezime
- Email
- Kompanija (opciono)
- Koja usluga vas interesuje (dropdown)
- Kratko opišite šta vam treba (textarea)
- Dugme "Pošalji upit"

Desno — alternativni kontakt:
"Više volite direktan kontakt?"
Email: [placeholder]
Telefon/WhatsApp: [placeholder]

3. FAQ SEKCIJA
4 pitanja u accordion/expand formatu:
- Koliko traje izrada sajta?
- Koliko košta izrada sajta ili aplikacije?
- Radite li sa klijentima van Bosne i Hercegovine?
- Kako izgleda prvi korak?

(Odgovori su u copy dokumentu createam-remaining-pages-copy.md, sekcija 6)

Koristi isti header/footer kao homepage.
```

---

## Kako nastaviti u Claude Design

1. **Otvori Claude Design** i prenesi mu ovaj fajl i createam-website-copy.md / createam-remaining-pages-copy.md kao kontekst (upload ili copy/paste).
2. **Zalijepi Master style prompt (sekcija 1)** prvi, samostalno. Sačekaj da ti Claude Design predloži fontove, boju i grid — potvrdi ili traži izmjenu prije nastavka. Ovo je najvažniji korak — sve ostalo se oslanja na ovu odluku.
3. **Zalijepi Homepage prompt (sekcija 2).** Pogledaj rezultat, traži izmjene ako treba (npr. "smanji hero", "promijeni redoslijed sekcija") — Claude Design radi najbolje kroz kratke, konkretne iteracije, ne jedan veliki zahtjev za sve odjednom.
4. Kad si zadovoljan homepage-om, **idi na Service stranicu (sekcija 3)** — probaj prvo sa jednom uslugom (npr. "SEO & Marketing" jer ima najviše sadržaja) da vidiš kako template izgleda, pa ponovi za ostalih devet.
5. Nastavi redoslijedom: **Tim → Radovi → Case study template → Kontakt.**
6. Kad su sve stranice gotove i zadovoljan si vizuelno, to je trenutak za prelazak na tehnički plan (custom development) i pisanje MD fajla za Claude Code — to radimo ovdje, ne u Claude Design.

**Savjet:** ne traži od Claude Design da odmah radi i mobilnu verziju. Prvo zaključi desktop dizajn za sve stranice, pa onda u jednom prolazu radi responsive/mobile verzije — lakše je dosljedno prilagoditi kad je desktop smjer već fiksiran.
