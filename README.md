# ro-budget-dashboard

Tablou de bord cetățenesc pentru bugetul consolidat al României (central, social, sănătate), pe modelul [Open Budget 2026](https://openbudget.ro/buget/2026/), cu context INS (salarii, statistici) și BNR (inflație, datorie).

> **Status: P2 — integrare BFF.** Frontend-ul apelează `ro-budget-dashboard-bff` (sursa `static` demo); fără BFF disponibil, cade pe datele locale. Datele rămân seed-uri demo până la P3/P4.

## Tab-uri

| Tab                                          | Vizualizări                                                                                   | Date                                         |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Feliuța ta** (`/felia-ta`)                 | Waterfall salariu, indice salariu real vs. nominal                                            | Rate fiscale 2026 (static), INS + BNR (seed) |
| **Bilanțul național** (`/bilantul-national`) | KPI venituri/cheltuieli/deficit, Sankey flux bugetar, Treemap destinații, gauge deficit % PIB | Open Budget 2026 (static)                    |

## Tech stack

Aliniat cu `hack-for-facts-eb-client` / `transparenta-eu-ins-loader`:

- **React 19 + Vite 8 + TypeScript** (ESM, strict)
- **TanStack Router** (tab-uri) + **TanStack Query** (fetch prin `src/api/client.ts`)
- **Recharts 3** (waterfall compus, treemap, linii) + **d3-sankey**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lingui v6** (`ro` sursă, `en` secundar) — cataloage runtime în `src/locales`
- **Zustand** (stare slider salariu), **zod** (scheme contract API)
- **decimal.js — regula „no floats”**: toate calculele monetare sunt `Decimal`; sumele trec granița API ca `string`
- Quality gates: ESLint (import-x, react-hooks, react-refresh) + Prettier + Husky + lint-staged + commitlint (Conventional Commits)

## Comenzi

```bash
pnpm install
pnpm dev          # Vite dev server
pnpm check        # typecheck + lint + test + format:check
pnpm test         # Vitest (unit, functional core)
pnpm test:coverage
pnpm build        # tsc -b && vite build
```

## Arhitectura

```
src/
├── api/client.ts        # Contract API tipizat (zod); P0 = date locale, P2 = fetch BFF
├── data/                # Seed-uri statice (rate fiscale, buget, BNR)
├── lib/                 # Nucleu funcțional PUR (salary, waterfall, realWage, sankey, format)
├── locales/             # Cataloage Lingui (ro/en)
├── store/               # Zustand
├── components/
│   ├── charts/          # SalaryWaterfall, BudgetSankey, DestinationTreemap, RealWageLine, DebtGauge
│   ├── layout/          # Header, TabNavigation
│   └── shared/          # KpiCard, SourceBadge
└── routes/              # RootLayout, CitizenSlice, NationalBalance
```

Regula din celelalte repo-uri: **nucleul funcțional nu face I/O și nu aruncă** — `src/lib` este pur și testat unitar; componentele și `src/api` sunt „shell-ul”.

## Roadmap

| Fază | Deliverable                                                                                                       | Status |
| ---- | ----------------------------------------------------------------------------------------------------------------- | ------ |
| P0   | Waterfall salariu cu rate 2026 hardcodate                                                                         | ✓      |
| P1   | Sankey + treemap cu date buget static                                                                             | ✓      |
| P2   | Integrare BFF: `fetch*` din `src/api/client.ts` → `ro-budget-dashboard-bff` (`VITE_API_BASE_URL`), fallback local | ✓      |
| P3   | Trenduri INS via transparenta-eu-ins-loader                                                                       | —      |
| P4   | Context BNR: inflație/datorie prin script de actualizare trimestrială sau dataset-uri server                      | —      |
| P5   | Drill-down instituțional (modal + breadcrumb)                                                                     | —      |
| P6   | Harta investițiilor (county heatmap — API există deja în eb-server)                                               | —      |

## Note demo

- Cifrele din `src/data/budget2026.ts` provin din Open Budget 2026; sursele de venit sunt **estimări ilustrative** până la P2.
- Seria BNR din `src/data/bnrInflation.ts` este un seed aproximativ; actualizarea manuală trimestrială este prevăzută în P4.
- i18n folosește cataloage runtime (fără macros/babel). Migrarea la macros + `lingui extract` se face când apar traduceri suplimentare.

## Git workflow

Conventional Commits; hooks-urile Husky rulează lint-staged (ESLint + Prettier) la commit și commitlint la mesaj.
