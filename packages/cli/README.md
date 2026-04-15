# Softuq

CLI for **Softuq** — a soft UI / neumorphic design system with copy-paste component distribution.

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

Run any command with `--help` for options.

## How it works

- `init` detects your framework (React), package manager, and project structure, then writes `softuq.json`.
- `add` resolves transitive dependencies between components (e.g. `select` pulls `tag`), copies the files into `components/ui/`, and installs any missing npm dependencies.
- Import paths are rewritten on copy (`../../lib/utils` → `@/lib/utils`).

## Links

- Website: <https://softuq.com>

## License

MIT
