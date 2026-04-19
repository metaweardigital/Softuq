# Softuq

CLI for **Softuq** — a soft UI design system with copy-paste component distribution.

Tokens ship as an npm package. Components are copied into your project so you own the code.

## Requirements

- Node.js 20+
- A React project — Next.js (App Router, ships with Tailwind v4) or Vite (`react-ts`, `init` installs & wires Tailwind v4 for you)

## Quick start

```bash
# 1. Scaffold tokens, provider, fonts, @ alias, and a live starter page
npx softuq init

# 2. Add more components as you need them
npx softuq add dialog input tabs tooltip

# 3. Teach your AI agent the Softuq design rules
npx softuq skill
```

`npm run dev` after `init` and the starter landing page renders immediately — a live playground that exercises all 6 theme axes (palette / accent / radius / spacing / font / headingFont) plus dark / light mode.

## Commands

| Command | Description |
| --- | --- |
| `init` | Scaffold tokens, provider, fonts, `@` alias, and a starter page |
| `init --no-starter` | Same as `init` but skip the landing page (provider still wired) |
| `add <components…>` | Copy component files + install npm deps |
| `add --all` | Copy every component |
| `remove <components…>` | Delete component files and clear them from `softuq.json` |
| `list` | List available components (installed entries marked with `✓`) |
| `list --installed` | List only components tracked in `softuq.json` |
| `diff` | Show which local components differ from upstream |
| `update [components…]` | Pull updates for all changed components, or only the named ones |
| `doctor` | Diagnose your setup (alias, Tailwind, CSS order, provider, theme attr, fonts) |
| `skill` | Install the Softuq design skill for Claude Code / AI agents |
| `skill -g` | Install the skill globally (`~/.claude/skills/`) |

Run any command with `--help` for the full option list.

## What `init` sets up

- **CSS** — writes `softuq-tokens.css`, `softuq-theme.css`, and (Vite only) `softuq-fonts.css` next to your globals, imported in the correct order.
- **Lib** — `cn()` helper, JS token values, `SoftuqProvider`, and `presets.ts` into `src/lib/` and `src/`.
- **Provider wiring** — mounts `SoftuqProvider` in `layout.tsx` (Next) or `main.tsx` (Vite), adds `data-theme="dark"` to `<html>`.
- **Fonts** — generates `src/softuq-fonts.ts` with `next/font/google` for Next.js, or installs `@fontsource-variable/*` packages and imports them in `main.tsx` for Vite.
- **Vite setup** — installs `tailwindcss` + `@tailwindcss/vite` if missing, registers the plugin in `vite.config.ts`, and adds the `@/*` path alias to both `tsconfig.app.json` and `vite.config.ts`.
- **Starter page** — scaffolds `app/page.tsx` (Next) or `App.tsx` (Vite) with a live theme playground and pulls in `button`, `card`, `form-text`, `label`, `select`, `separator`. Opt out with `--no-starter`.

## Design skill

A Claude Code / AI-agent skill that teaches coding assistants the Softuq design-system rules **before** they write any UI — typography, spacing, tokens, icons, component patterns. Same copy-paste philosophy as the components: install it, own it, fork it.

```bash
# Project-level — active in this repo only
npx softuq skill

# Global — active in every project on the machine
npx softuq skill --global

# Custom path
npx softuq skill --dir path/to/skills
```

Once installed, the agent picks it up automatically whenever you ask it to touch UI. Full details and a live preview at <https://softuq.com/skill>.

## How it works

- `init` detects your framework (Next.js vs. Vite), package manager, and project structure, then writes `softuq.json`.
- `softuq.json` tracks installed components under `components` (`{ [name]: { installedAt } }`) — powers `remove` and `list --installed`.
- `add` resolves transitive dependencies between components (e.g. `select` pulls `tag`), copies the files into `components/ui/`, installs any missing npm dependencies, and records the components in `softuq.json`.
- `remove` deletes the component files, clears them from `softuq.json`, and refuses to drop a component another installed component still depends on (`--force` to override). npm dependencies stay — remove them manually if they're no longer used.
- Import paths are rewritten on copy (`../../lib/utils` → `@/lib/utils`).
- `diff` normalizes import paths, so local `@/lib/utils` rewrites don't show as changes.
- `update` pulls changed components with a confirmation prompt; pass specific names to limit the update scope.
- `doctor` inspects your project without modifying files — ideal when something "just stopped working" after a manual edit.
- `skill` installs a Claude Code skill at `.claude/skills/softuq/` (or `~/.claude/skills/softuq/` with `--global`).
- Remote registry — the manifest and raw files are fetched from `https://softuq.com` (cached 1 h in `~/.softuq/cache/`), with the bundled templates as an offline fallback. New components published to the docs site reach users without a CLI republish. Override the host via `SOFTUQ_REGISTRY_URL` for testing.

## Links

- Website: <https://softuq.com>
- Getting started: <https://softuq.com/getting-started>

## License

MIT
