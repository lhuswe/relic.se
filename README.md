# relic.se

Personlig startsida och nav för hobbyprojekt, experiment och verktyg.
Statiskt exporterad Next.js-app, byggd för att hostas på GitHub Pages.

```
Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Motion · Lucide
```

---

## Kom igång

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Gör                                                        |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Utvecklingsserver                                           |
| `npm run build`     | Statisk export till `out/`                                  |
| `npm run preview`   | Serverar `out/` lokalt — testar exakt det som deployas      |
| `npm run check`     | `tsc --noEmit` + ESLint (samma som körs i CI)               |
| `npm run format`    | Prettier med Tailwind-klasssortering                        |

---

## Lägga till ett projekt

Redigera **`src/data/projects.ts`** och lägg till ett objekt. Inget annat behöver ändras —
sortering, kategoriräknare, antal i hero och tomt-läge följer automatiskt.

```ts
{
  slug: "chapter-tracker",
  name: "Chapter Tracker",
  description: "Håller reda på var jag är i varje webbnovell, över alla plattformar.",
  icon: "book",          // autocomplete från src/lib/icons.ts
  status: "beta",        // live | beta | in-progress | planned | archived
  category: "Web app",
  url: "https://…",      // valfri — utan url renderas kortet utan länk
  repo: "https://…",     // valfri
  featured: true,        // valfri — sorteras först, bredare kort på desktop
  tags: ["nextjs"],      // valfri — reserverat för framtida taggfilter
  year: 2026,            // valfri
  hidden: false,         // valfri — behåll posten men dölj den
}
```

Ny ikon behövs? En rad i `src/lib/icons.ts`, sedan finns namnet i autocomplete.

**Tom lista?** Ta bort alla objekt så visas "coming soon"-läget i stället. Det är ett
designat läge, inte ett fel: rubrik, förklaring och en väg vidare till GitHub.

---

## Arkitektur

```
src/
├── app/                    Next.js App Router
│   ├── layout.tsx          <html>, typsnitt, metadata, header + footer
│   ├── page.tsx            Startsidan — läser data, renderar sektioner
│   ├── not-found.tsx       404 (exporteras till 404.html)
│   ├── sitemap.ts          → /sitemap.xml vid build
│   ├── robots.ts           → /robots.txt vid build
│   └── globals.css         Designtokens + signaturkomponenter
├── config/site.ts          Sanningen om sajten: namn, url, länkar, mail
├── data/projects.ts        ← ENDA filen du redigerar för innehåll
├── lib/
│   ├── projects.ts         Dataåtkomst: sortering, filter, kategorier, statistik
│   ├── icons.ts            Ikonregister (namn → komponent)
│   └── utils.ts            cn()
├── types/project.ts        Project-typen + status-metadata
└── components/
    ├── ui/                 Primitiver i shadcn-stil (Button, Badge, Card, Container)
    ├── layout/             SiteHeader, SiteFooter
    ├── sections/           Hero, ProjectsSection
    ├── projects/           ProjectCard, ProjectGrid, EmptyState, StatusBadge
    └── motion/             Reveal (scroll-animation)
```

**Tre principer styr strukturen:**

1. **Data är data.** `data/projects.ts` innehåller bara serialiserbara värden — ikonen är
   ett *namn*, inte en komponent. Därför kan filen bytas mot JSON, MDX eller ett CMS-svar
   utan att en enda komponent ändras.
2. **Komponenter läser aldrig data direkt.** All åtkomst går via `lib/projects.ts`.
   Sökfunktion, kategori­filter eller GitHub-API blir ändringar i *en* fil.
3. **Server som standard, klient bara där det behövs.** Bara `Hero`, `ProjectCard` och
   `Reveal` är `"use client"` — allt annat renderas vid build och skickar noll JS.

### Designsystem

Färger ligger som CSS-variabler på `:root` och exponeras till Tailwind via `@theme inline`.
`bg-surface` betyder alltså `var(--surface)` i runtime — inte ett hårdkodat värde.
Ljusa temavärden finns redan skrivna under `[data-theme="light"]`; sajten frågar bara
aldrig efter dem ännu.

| Token                    | Roll                                  |
| ------------------------ | ------------------------------------- |
| `--background` `#08090a` | Sidbakgrund                           |
| `--surface` `#0d0f11`    | Kort, header                          |
| `--border` `#1e2225`     | Hårfina linjer                        |
| `--foreground` `#f2f5f7` | Text                                  |
| `--muted` `#8b959e`      | Sekundär text, mono-etiketter         |
| `--accent` `#22d3ee`     | Cyan — används sparsamt, aldrig som yta |

**Typografi:** Geist Sans för rubriker och brödtext (tight tracking, medium vikt),
Geist Mono som *nyttotypsnitt* för status, kategori, räknare och footer. Mono-detaljerna
är det som får sidan att läsa som en verkstad snarare än en portfolio.

**Signaturelementet:** kortens ljusgloria som följer muspekaren. En radial cyan gradient
maskad till 1px kant, driven av två CSS-variabler som skrivs på `pointermove` — utanför
React-state, så den kostar inga renderingar. På touch och vid `prefers-reduced-motion`
faller den tillbaka till en vanlig hover-kant.

---

## Första pushen

```bash
cd relic-start
git init -b main
git add .
git commit -m "Initial commit: relic.se start page"
git remote add origin git@github.com:lhuswe/relic.se.git   # eller https://github.com/lhuswe/relic.se.git
git push -u origin main
```

Skapa repot på GitHub först (tomt, utan README eller .gitignore).

## Deploy till GitHub Pages

1. Pusha repot till GitHub.
2. **Settings → Pages → Source: GitHub Actions.**
3. Pusha till `main`. Workflowen i `.github/workflows/deploy.yml` kör typecheck, lint,
   build och deploy.
4. **Settings → Pages → Custom domain:** `relic.se`. Filen `public/CNAME` gör att
   domänen överlever varje deploy.

DNS hos din registrar:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
CNAME www lhuswe.github.io
```

Kryssa i "Enforce HTTPS" när certifikatet är utfärdat.

> **Utan egen domän** (`lhuswe.github.io/repo`) behöver `next.config.ts` en
> `basePath: "/repo"` och `assetPrefix: "/repo/"`, och `public/CNAME` tas bort.

### Varför statisk export och inte Vercel?

Sidan har inga server­behov: inga formulär, ingen auth, ingen ISR. Statisk export ger
snabbaste möjliga leverans, noll driftkostnad och gratis hosting. Priset är att
`next/image`-optimering, Route Handlers och middleware inte finns.

Skulle du senare vilja ha t.ex. GitHub-API-hämtning vid request eller OG-bilder per
projekt: ta bort `output: "export"` och `images.unoptimized` ur `next.config.ts` och
deploya till Vercel. Ingen annan kod behöver ändras — det är hela poängen med att
datalagret är isolerat.

---

## SEO och tillgänglighet

- Metadata, OpenGraph och Twitter Card genereras från `src/config/site.ts`
- `sitemap.xml` och `robots.txt` byggs av `app/sitemap.ts` / `app/robots.ts`
- JSON-LD (`WebSite` + `Person`) på startsidan
- Favicon (SVG + ICO), apple-touch-icon, webmanifest, OG-bild `public/og.png`
- Semantisk struktur, "skip to content", synlig fokusring, `aria-label` på ikonlänkar
- Alla animationer respekterar `prefers-reduced-motion`
- Kontrast på brödtext (`--muted` mot `--background`) ligger över WCAG AA

**Byt OG-bild:** ersätt `public/og.png` (1200×630). Filnamnet är refererat en gång, i
`siteConfig.ogImage`.

**Innan du går live:** exempelprojekten i `src/data/projects.ts` pekar på `example.com` —
byt ut dem mot dina riktiga projekt, eller töm listan så visas "coming soon"-läget.

---

## Roadmap — förberedd, inte implementerad

Varje punkt nedan har redan sin plats i arkitekturen:

| Funktion              | Vad som behöver göras                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| Kategorifilter        | `<ProjectFilters />` som klientkomponent mellan header och grid i `projects-section.tsx`. `getCategories()` och `filterProjects()` finns redan. |
| Sökfunktion           | Samma komponent, `filterProjects({ query })`. Söker redan i namn, beskrivning, kategori och taggar.        |
| Taggar                | `tags` finns i typen och i datan. Rendera dem i `ProjectCard` + `getTags()`.                                |
| Featured-sektion      | `getFeaturedProjects()` finns. Rendera som egen sektion ovanför griden.                                     |
| Ljust/mörkt tema      | Ljusa tokens finns i `globals.css`. Lägg till en toggle som skriver `data-theme` på `<html>` (+ ett inline-skript som läser `localStorage` före paint). `suppressHydrationWarning` är redan satt. |
| Blogg                 | `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` med `generateStaticParams`. Lägg till rutterna i `sitemap.ts` och en länk i `SiteHeader`. |
| GitHub-repos          | Hämta i en Server Component vid build och `concat`:a in i `getProjects()`. Datalagret är redan enda källan komponenterna känner till. |
| Statistik             | `getProjectStats()` returnerar redan `total`, `live`, `building`, `categories` — utöka objektet.            |

---

## Kodkonventioner

- TypeScript strict, plus `noUncheckedIndexedAccess` och `verbatimModuleSyntax`
- Importer: typer med `import type`, alias `@/*` mot `src/*`
- Komponenter är rena funktioner; props typas med `ComponentProps<"element">`
- Varianter hanteras med `cva` — inga villkorliga klassträngar utspridda i JSX
- Kommentarer förklarar *varför*, inte *vad*

© 2026 relic.se
