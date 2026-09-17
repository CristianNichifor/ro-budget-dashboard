# AGENTS.md

Convenții de lucru pentru `ro-budget-dashboard` (aliniate cu hack-for-facts-eb-client / transparenta-eu-ins-loader).

## Comenzi

- `pnpm dev` — dev server
- `pnpm check` — typecheck + lint + test + format:check (rulează întotdeauna înainte de commit)
- `pnpm test` — vitest run
- `pnpm build` — tsc -b && vite build
- `pnpm i18n:extract` — regenerează cataloagele `.po` după modificarea `src/messages.ts`
- Deploy: imaginea se construiește cu `docker build --build-arg VITE_API_BASE_URL=... .`; stack-ul complet pornește cu `docker compose` din repo-ul BFF. CI publică imaginea pe GHCR la push pe `main`/tag-uri `v*` (variabila de repo `VITE_API_BASE_URL`).
- **Deploy Cloudflare (principal, gratis)**: `pnpm build` apoi `pnpm exec wrangler deploy` — site static pe Workers Static Assets (`wrangler.toml`, SPA fallback), publicat la https://buget.cristian-nichifor.com. API-ul bazează pe `VITE_API_BASE_URL` (default: worker-ul BFF pe `api.buget.cristian-nichifor.com`). CI: `deploy-cloudflare.yml` (push pe `main` + manual, rulează doar dacă secretul `CLOUDFLARE_API_TOKEN` e setat).

## Reguli de cod

1. **No floats pentru bani.** Orice calcul monetar folosește `decimal.js` (`Decimal`). Numerele JS apar doar la granița de afișare (charts) sau pentru procente ne-monetare. Sumele traversează granița API ca `string`.
2. **Nucleu funcțional pur.** `src/lib/*` sunt funcții pure, fără I/O, fără throw, testate unitar. `src/api` și componentele sunt shell-ul.
3. **i18n prin Lingui.** UI text prin `i18n._({ id: ... })` / `Trans`; id-urile mesajelor în `src/locales/ro/messages.ts` (sursă) + `en`. Numele proprii din date („Pensii”) rămân în fișierele de date.
4. **Date demo marcate.** Orice valoare statică are `DEMO NOTE` în comentariu sau `SourceBadge` în UI; sumele bugetare sunt `string`, nu `number`.
5. **Conventional Commits** + Husky (lint-staged: eslint --fix + prettier). ESLint: import-x, react-hooks, react-refresh.

## Unde stă ce

- Contract API: `src/api/client.ts` (scheme zod). P0 rezolvă local; P2 înlocuiește corpurile cu `fetch` către BFF — schemele nu se schimbă.
- Date: `src/data/` (seed-uri). Componente vizuale: `src/components/charts/`. Tab-uri: `src/routes/`.


## How this repo is gated

- `dev` is the default branch and where work lands. Pull requests are required, and **no status check is required yet**.
- `main` is production. It is restricted: only an admin can advance it, so an agent can open a pull request against it but cannot merge one.
- This repo ships Cloudflare (Workers or Pages) via wrangler. That fires on a merge to `main`, which is the restricted branch — so an agent's work reaching `dev` deploys nothing.

*(Appended from measured repository settings. Branch rules are enforced by
GitHub; this section describes them, it does not create them.)*
