# Changelog

All notable changes to the `softuq` CLI.

## 0.9.0

- New `softuq remove <component>` — deletes component files, updates `softuq.json`, warns when other installed components depend on the target (`--force` to override, `--yes` to skip confirm).
- New `softuq doctor` — diagnoses a project setup (tsconfig `@/*` alias, Vite Tailwind v4 plugin + alias, CSS import order + softuq imports, provider wiring, `data-theme` attribute, fonts wiring). Prints `✓/!/✗` per check with fix hints; exits non-zero on failures.
- `softuq list --installed` — show only components tracked in `softuq.json`; full list now also marks installed entries with a `✓`.
- `softuq.json` now tracks installed components (`components: { [name]: { installedAt } }`). Backward compatible — existing configs without the field default to `{}`. Written on `init` (for starter components) and `add`, cleared by `remove`.
- Remote registry — CLI fetches `https://softuq.com/registry.json` for the manifest (cached 1 h in `~/.softuq/cache/`) and missing component source files from `https://softuq.com/r/<framework>/...`, falling back to bundled templates offline. New components shipped via the docs deploy reach users without a CLI republish. Override via `SOFTUQ_REGISTRY_URL` env for testing.
- Fix `softuq update` reading tokens from a hardcoded monorepo path (`../../tokens/src`) that only worked in dev — now uses `getTokensDir()` so published installs resolve tokens correctly.
- Fix `softuq --version` reporting `0.1.0` regardless of the installed version — now reads from `package.json`.
- Fix silent crash on Svelte projects — `init` now exits with a clear "not yet available" message instead of propagating `loadRegistry("svelte")`.
- Fix opaque install failures — dependency installs now stream `pnpm`/`npm`/`yarn`/`bun` output live (`stdio: "inherit"`) and exit 1 with a helpful message when the install command returns non-zero.
- Enforce `engines.node: ">=20"` in `package.json` — matches README prerequisite, prevents silent breakage on older Node.
- Error paths now write to `stderr` (not `stdout`) — makes CI/pipe consumers able to separate diagnostics from output. Exit codes unchanged (`1` on failure).
- `resolveAllDeps` warns on unknown `registryDeps` entries instead of silently skipping them — catches registry drift during `add` / `update`.
- Expanded bundled `softuq` skill — new Motion section (duration/ease token usage) and Accessibility section (WCAG AA contrast, focus-visible, icon-only button `aria-label`, `prefers-reduced-motion`, keyboard handlers on non-button interactives). `softuq skill` now installs the richer guidance.

## 0.8.4

- Drop broken relative `CHANGELOG.md` link from README (npm rewrites relative links to `npmjs.com/package/*` and breaks them; repo is private, so no absolute fallback).
- Update README + `/getting-started` to reflect 0.8.3 behavior — Tailwind v4 is no longer a manual prerequisite for Vite (`init` installs `tailwindcss` + `@tailwindcss/vite` and wires the plugin into `vite.config.ts` automatically).

## 0.8.3

- `init` runs end-to-end on a bare `create-vite --template react-ts`:
  - Installs `tailwindcss` + `@tailwindcss/vite` when missing.
  - Wires the Tailwind plugin and `@` alias into `vite.config.ts`.
  - Detects the create-vite demo `index.css` (via `--social-bg` / `#root { width: 1126px`) and replaces it with a DS-minimal version.
  - Detects the create-next-app demo `globals.css` and replaces it with the same minimal template (was a partial fix in 0.8.2).
- Inline `<style id="softuq-flash-prevent">` injected into `index.html` `<head>` — matches `--bg-base` / `--text-primary` on `data-theme` so Vite CSR refresh no longer flashes white.
- Ship static `--ds-space-page-x` / `--ds-space-section-y` / stack / gap fallbacks in `semantic.css` — fixes Next SSR first-paint layout before the provider's `useEffect` runs.

## 0.8.2

- Fix Vite `npm run build` failure — drop deprecated `baseUrl` from `tsconfig.app.json` injection (TS 6+ resolves `paths` without it).
- Fix Vite `tsc -b` failure on `@fontsource-variable/*` side-effect imports under `verbatimModuleSyntax` — import the explicit `/index.css` path instead of the bare package name.

## 0.8.1

- Fix `init` paths for Next.js projects with `--no-src-dir` (app/ at repo root).

## 0.8.0

- Font wiring per framework — `init` generates `src/softuq-fonts.ts` (`next/font/google`) for Next.js, installs `@fontsource-variable/*` packages and imports them in `main.tsx` for Vite.
- Starter landing page — `init` scaffolds `app/page.tsx` / `App.tsx` with a live theme playground exercising all 6 axes (palette / accent / radius / spacing / font / headingFont). Opt out with `--no-starter`.
- Docs refresh (getting-started, skill page).

## 0.7.1

- Fix broken `init` when run from the bundled npm install (template resolution).
- Remove leftover neumorphic branding.

## 0.7.0

- Mobile-first updates shipped to components in the registry (Input, Tabs, ToggleGroup, SidebarNav mobile topbar, etc.).

## 0.6.0

- Add `SectionNav` component to the registry.
- Navbar-mega UX fixes; alphabetized `/components` page.

## 0.5.0

- Add `skill` command — installs the Softuq design skill for Claude Code / AI agents (`.claude/skills/softuq/`, or `~/.claude/skills/` with `--global`).
- Slot-based blocks (NavbarSimple, FaqAccordion, FooterMinimal) added to the showcase.

## 0.4.1

- Scrub GitHub references from public npm metadata (repo is private).
- Fix publish script (avoid pnpm swallowing `--//registry.npmjs.org/:_authToken`).

## 0.4.0

- Rebrand to **Softuq** and prepare the CLI for public npm publish.
- Drop leading `./` from `bin` path (npm strips invalid bin values silently on publish).

## 0.3.0

- Typography scale rework (Major Third, fluid `clamp()`).
- Blocks expansion + race-condition fixes.

## 0.2.2

- Icons foundation — Lucide (UI) + Simple Icons (brand) split.

## 0.2.1

- Add `CodeBlock` component (syntax highlighting, copy-to-clipboard, always-dark theme).

## 0.2.0

- Add `Search` component family to the registry.

## 0.1.0

- Initial release — `init`, `add`, `list` commands. ASCII banner. `tailwind-theme.css` extracted from tokens package.
