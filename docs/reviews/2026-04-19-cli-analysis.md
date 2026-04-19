# Softuq CLI — analýza v0.8.4

Datum: 2026-04-19
Zdroj: npm tarball `softuq@0.8.4` (1358 řádků v `dist/index.js`, 39 komponent v registry, skill bundled uvnitř).

## Celkový dojem

Solidně odvedená práce — čistý shadcn-style CLI s promyšleným vlastním spinem (vlastní tokeny + design skill pro Claude Code). Ne další wrapper. Kód čitelný, závislosti minimální (4 runtime), framework detekce a import rewrite fungují. `SKILL.md` je upřímně nejsilnější kus celého balíčku a diferenciátor, na který stojí za to leanovat marketingově.

## Fakta z npm

- Verze: `0.8.4` (latest)
- Publikováno: 2026-04-18
- Maintainer: `metawear` (info@metawear.cz)
- Licence: MIT
- Velikost tarballu: 332 625 B unpacked, 61 souborů
- Stažení: 998 / last-week, 998 / last-month → balíček je úplně čerstvý
- Runtime závislosti (4): `commander`, `fs-extra`, `picocolors`, `prompts`
- Dev: `tsup`, `typescript ^6.0.2`, types for `fs-extra` / `prompts`

## Architektura (jak to je)

- Bundle je jeden ESM soubor `dist/index.js` přes `tsup`
- Commands: `init`, `add`, `list`, `diff`, `update`, `skill`
- Registry: `src/registry/react.json` je zapečený do bundlu jako JS konstanta
- Templates bundlovány přes `scripts/sync-templates.mjs` do `packages/cli/templates/*` + `packages/cli/skill/*` (gitignored, zahrnuto ve `files`)
- `getSourceDir()` / `getSkillSource()` preferují bundled cesty, fallback do monorepo zdrojů (dev vs prod)
- `detectProject()` rozpozná framework (React/Svelte), package manager (pnpm/yarn/npm/bun), Next vs Vite, `src/` vs flat layout, hlavní CSS soubor
- `rewriteImports()` mění `../../lib/utils` → `@/lib/utils` při kopírování, `normalizeForDiff()` dělá opačnou normalizaci pro `diff`/`update` porovnání

## P0 — bugy a chyby

### 1. `softuq --version` lže

`dist/index.js:1351` resp. `src/index.ts`:

```ts
program.name("softuq").description("...").version("0.1.0");
```

Verze je hardcoded zatímco balíček je `0.8.4`. Fix — načíst z `package.json`:

```ts
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
// ...
program.version(pkg.version);
```

### 2. Chybí `engines` field

`README.md` říká Node.js 20+, ale `package.json` to nevynucuje. Přidat:

```json
"engines": { "node": ">=20" }
```

### 3. Svelte volba v promptu, ale neexistuje registry

`src/commands/init.ts` nabízí v promptu React + Svelte (disabled), ale `detectProject()` detekuje Svelte projekty a vrátí `framework: "svelte"`. Pokud uživatel spustí `init --yes` ve Svelte projektu, propadne do `loadRegistry("svelte")` který throwne `No registry for framework: svelte`.

Fix: buď odstranit Svelte z detekce dokud neexistuje registry, nebo přidat explicit error message s odkazem na roadmap.

### 4. `execSync` polyká chyby install commandů

`src/utils/deps.ts`:

```ts
execSync(cmd, { cwd, stdio: "pipe" });
```

Když `pnpm add` padne na peer conflict nebo síťový timeout, uživatel nevidí nic — CLI jen pokračuje a vypíše „Done". Fix: `stdio: "inherit"` nebo try/catch s `console.error(err.stderr?.toString())` a `process.exit(1)`.

## P1 — architektonická omezení

### 5. Registry je zamčený v bundlu

`src/registry/react.json` je importovaný staticky, baked do JS. Důsledek: každý nový komponent = nutný nový release CLI + `npm i -g softuq@latest` u všech uživatelů, jinak `list` / `add` / `update` neví, že komponent existuje.

Shadcn to má jako **remote JSON registry** (např. `https://registry.shadcn.com/index.json`) — CLI fetchuje za runtime, komponenty se updatují bez nutnosti nové verze CLI.

Návrh schema:

```json
{
  "version": 1,
  "frameworks": {
    "react": {
      "components": {
        "button": {
          "version": "1.2.0",
          "files": [{ "name": "button.tsx", "url": "https://softuq.com/r/react/button.tsx" }],
          "dependencies": ["class-variance-authority"],
          "registryDeps": []
        }
      }
    }
  }
}
```

CLI fetchne `https://softuq.com/registry.json` s `If-None-Match` / ETag, cachuje do `~/.softuq/cache/`, padne do bundled registry jako fallback offline.

### 6. Instalované komponenty se nikam neevidují

`softuq.json` obsahuje jen `{ framework, componentDir, libDir }`. CLI neumí odpovědět na otázku „co mám nainstalované?". `diff` iteruje celý registry a matchuje podle existence souboru — funguje, ale:

- Nemáš verzi per-component (pro targeted updates / breaking change warnings)
- Nemůžeš implementovat `remove` čistě
- `softuq list --installed` nelze udělat spolehlivě

Návrh:

```json
{
  "framework": "react",
  "componentDir": "src/components/ui",
  "libDir": "src/lib",
  "components": {
    "button": { "version": "1.2.0", "installedAt": "2026-04-19" },
    "card":   { "version": "1.0.1", "installedAt": "2026-04-19" }
  }
}
```

### 7. `rewriteImports` je regex-based

`src/commands/add.ts` a `src/commands/update.ts`:

```ts
content
  .replace(/from\s+["']\.\.\/\.\.\/lib\/utils["']/g, `from "@/lib/utils"`)
  .replace(/from\s+["']\.\.\/\.\.\/lib\/squircle["']/g, `from "@/lib/squircle"`)
  .replace(/from\s+["']\.\/([^"']+)["']/g, `from "./$1"`);
```

Rozbije se na:

- víceřádkových importech (`import {\n  A,\n  B,\n} from "../../lib/utils"`)
- `import type { Foo } from "../../lib/utils"`
- re-exportech (`export { cn } from "../../lib/utils"`)
- dynamických importech (`await import("../../lib/utils")`)

V současných komponentech nejsou — ale jakmile přidáš komponent s type-only importem, silent bug. Fix: buď použít `recast` / `ts-morph`, nebo disciplinovaně držet single-line imports + přidat unit test který na to upozorní.

### 8. Monorepo fallback cesty ve zveřejněném balíčku

`src/utils/registry.ts`:

```ts
function getSourceDir(framework) {
  const bundled = path.resolve(cliRoot, "templates", framework);
  if (existsSync(bundled)) return bundled;
  return path.resolve(cliRoot, `../${framework}/src`);
}
```

V publikovaném tarballu bundled vždy existuje, takže fallback je dead code. Taky v `src/commands/update.ts`:

```ts
const tokensDir = path.resolve(sourceDir, "../../tokens/src");
```

Funguje jen v dev monorepu — v npm instalaci by se ta cesta odkazovala mimo `node_modules/softuq/`. Je to obejité tím, že `update` čte z `sourceDir` (bundled templates), ale `tokensDir` je zvlášť a vypadá jako chyba čekající na reportnutí. Buď přepnout na `getTokensDir()` který už existuje, nebo sjednotit resolution.

## P2 — chybějící funkce

### 9. Chybí `remove` command

Opak `add`. Dnes uživatel musí ručně mazat soubor + dohledat, jestli nějaký jiný komponent neměl registryDep. Triviální na implementaci jakmile `softuq.json` trackuje instalace (P1 #6).

### 10. Chybí `softuq doctor`

Diagnostika: aliasy (`@/*`) jsou v `tsconfig` i `vite.config.ts`, import order v `index.css` (tokens musí být před theme), Tailwind v4 plugin registrován, provider wiring v `layout.tsx` / `main.tsx`, `data-theme` na `<html>`, fonty správně wired. Dnes všechno řeší `init`, ale když uživatel ručně něco rozbije, nemá kam sáhnout.

### 11. Žádné testy v repo ani v published tarballu

`CLAUDE.md` explicitně říká „No test suite". Přitom `normalizeForDiff`, `detectProject`, create-next-app/create-vite default detekce, Vite config AST modifikace — to jsou přesně místa, kde silent breakage bolí nejvíc. Vitest + snapshot testy generovaných souborů (init output) + unit testy pro regexy by to pokrylo s nízkou údržbou.

## P3 — DX / polish

### 12. `console.error` vs `console.log`

Všechny error hlášky jdou na stdout přes `console.log(pc.red(...))`. Správně na stderr:

```ts
process.stderr.write(pc.red("  No softuq.json found.\n"));
process.exit(1);
```

Rozbije se uživateli, který pipuje CLI output (`softuq list | grep button`) a míchá mu se error.

### 13. Component registry metadata

`src/registry/react.json` má jen `files`, `dependencies`, `registryDeps`. Chybí:

- `title` (pro human-readable list)
- `description` (pro `softuq list --verbose`)
- `preview` (URL screenshotu / live embed)
- `since` (verze, kdy přibyl)

Použitelné pro budoucí `softuq.com/components` stránku generovanou z registry.

### 14. Cycle detection v `resolveAllDeps`

`src/utils/registry.ts` `resolve()` je rekurzivní a spoléhá jen na `resolved.has(name)`. Cyklus `A → B → A` sice neskončí v nekonečné smyčce (kvůli `resolved.has`), ale pokud B chybí v registry, tiše se ignoruje:

```ts
const entry = registry.components[name];
if (!entry) return;  // silent
```

Mělo by to warnovat — špatně napsaný `registryDeps` odkaz je snadno uděláná chyba.

## Design skill (`SKILL.md`)

Velmi dobrá práce. Konkrétní pravidla, red flags tabulka, pre-flight checklist. Co bych přidal:

### 15. Accessibility sekce

Soft-UI má historicky problém s kontrastem. Přidat:

- WCAG AA contrast ratio enforcement (`text-fg-muted` nesmí klesnout pod 4.5:1 na `bg-bg-base` při žádné paletě)
- `@media (prefers-reduced-motion: reduce)` guideline — provider transitions, toasts, accordion
- `focus-visible` vs `focus` rule — výjimky pro custom focus rings
- `aria-label` na icon-only buttonech (v SKILL.md se mluví o `<Button variant="ghost" size="icon-sm">` — ale ne že musí mít aria-label)

### 16. Motion tokens

SKILL.md pokrývá typography / spacing / colors / icons, ale ne motion. Pokud existují `--ds-duration-*` / `--ds-ease-*` v tokens, měly by mít pravidlo (např. „modal open = `--ds-duration-md`, toast slide = `--ds-duration-sm`").

## Pozitiva, která bych nešahal

- **Jeden `SoftuqProvider` s 6 osami** (palette / accent / radius / spacing / font / headingFont) + starter page, která je exercisuje = instant „wow" po `init`. Nejsilnější onboarding moment, neměnit.
- **`softuq-flash-prevent` style injection** do `index.html` `<head>` (`dist/index.js:1025`) — přesně ten detail, co rozhoduje, jestli DS vypadá profesionálně vs amatérsky.
- **Token vrstvení primitive → semantic → tailwind-theme** je správná architektura. Nepodléhej pokušení to sloučit.
- **Bundled skill** je diferenciátor. V npm ekosystému to zatím nikdo systematicky nedělá.
- **Create-next-app / create-vite default detekce** (`isCreateNextAppDefault`, `isCreateViteDefault` v `setupCSS`) — drobný ale zásadní DX detail.
- **Fonty per-framework** (`next/font/google` pro Next, `@fontsource-variable/*` pro Vite) — správně rozpoznáno, že jedno řešení nefunguje pro oba.

## Priorizace

| Priorita | Co | Effort |
|---|---|---|
| P0 | Fix `--version` hardcoded value | 5 min |
| P0 | Přidat `engines.node: ">=20"` | 1 min |
| P0 | Neumožnit `loadRegistry("svelte")` crash | 10 min |
| P0 | Neprpolykat install errors (`stdio: "inherit"` nebo try/catch) | 10 min |
| P1 | Trackovat instalované komponenty v `softuq.json` | 1 h |
| P1 | Implementovat `remove` command (po #6) | 30 min |
| P1 | Implementovat `doctor` command | 2–3 h |
| P1 | Remote registry (softuq.com/registry.json + fetch + cache) | 4–6 h |
| P2 | AST-based `rewriteImports` | 1–2 h |
| P2 | A11y sekce do `SKILL.md` | 30 min |
| P2 | `console.error` + exit codes pro pipelines | 20 min |
| P3 | Vitest + snapshot testy pro `init` output | 3–4 h |
| P3 | Component registry metadata (title, description, preview) | 1 h |

## Pozicování / marketing (side note)

- 998 downloads za prvních 7 dní + maintainer odhadem od března 2026 = zdravý launch
- Landing `softuq.com` a npm README říkají „copy-paste component distribution" — to je shadcn rétorika. Co tebe odlišuje **není** copy-paste (to má každý), ale:
  1. **Bundled agent skill** — jediný DS na npm, který učí Claude Code pravidla před psaním UI
  2. **6 axes v provideru bez rebuildu** — shadcn tohle nedělá, vyžaduje úpravy v CSS vars ručně
  3. **Token-driven (OKLCH + `color-mix`)** — technicky čistší než shadcn HSL

  Tři bullety v npm README hero by tohle měly říct dřív než „soft UI".

## Závěr

Je to na 0.8 balíček překvapivě vyzrálé. Největší architektonický dluh je zamčený registry (P1 #5) a chybějící tracking instalovaných komponent (P1 #6) — obojí bude blokovat růst, jakmile bude víc než ~50 komponent a víc než pár set uživatelů. P0 bugy jsou kosmetické a opravitelné za odpoledne. Skill je zlato, nešahat.
