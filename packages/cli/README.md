# Softuq

CLI for **Softuq** — a soft UI / neumorphic design system with copy-paste component distribution.

> **v0.5.0** — now ships the Softuq design skill for Claude Code / AI agents. Run `npx softuq skill` to install it.

Tokens ship as an npm package. Components are copied into your project so you own the code.

## Requirements

- Node.js 18+
- A React project (Next.js or Vite). Tailwind CSS v4 is recommended.

## Quick start

```bash
# 1. Set up tokens, utils, provider, globals.css
npx softuq init

# 2. Add components
npx softuq add button card dialog

# 3. Teach your AI agent the Softuq design rules
npx softuq skill
```

## Commands

| Command | Description |
| --- | --- |
| `init` | Set up tokens, utilities, provider and `globals.css` |
| `add <components…>` | Copy component files + install npm deps |
| `add --all` | Copy every component |
| `list` | List available components |
| `diff` | Show which local components differ from upstream |
| `update` | Pull updated components (with confirmation) |
| `skill` | Install the Softuq design skill for Claude Code / AI agents |

Run any command with `--help` for options.

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

- `init` detects your framework (React), package manager, and project structure, then writes `softuq.json`.
- `add` resolves transitive dependencies between components (e.g. `select` pulls `tag`), copies the files into `components/ui/`, and installs any missing npm dependencies.
- Import paths are rewritten on copy (`../../lib/utils` → `@/lib/utils`).
- `skill` installs a Claude Code skill that teaches AI coding agents the Softuq design rules (typography, spacing, tokens, component patterns). Use `--global` for `~/.claude/skills/`, default is project-level at `.claude/skills/softuq/`.

## Links

- Website: <https://softuq.com>

## License

MIT
