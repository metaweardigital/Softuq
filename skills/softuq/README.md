# Softuq Design Skill

A Claude Code / Anthropic skill that teaches AI coding agents (Claude, Cursor, Copilot) the rules of the [Softuq](https://softuq.com) design system. Install it once and your AI assistant will automatically follow DS conventions for typography, spacing, tokens, icons, colors, and component structure.

## What it does

Before the agent writes any UI code, it runs through a pre-flight checklist:

- Paragraphs (`<p>`) always have explicit `text-*` classes
- H1/H2 always include `text-balance`
- Spacing uses `var(--ds-space-*)` tokens, not raw Tailwind
- Colors via semantic utilities, never hex or rgba
- Icons from `lucide-react` or `@icons-pack/react-simple-icons` — never inline SVG
- Components follow the CVA + forwardRef pattern

When the agent needs deeper context, it reads on-demand from `references/`:

- `references/typography.md` — body scale, heading rules, input quirks
- `references/spacing.md` — stack/page tokens, decision tree
- `references/tokens.md` — semantic color map, OKLCH rationale
- `references/icons.md` — Lucide vs Simple Icons split
- `references/components.md` — full CVA template

## Install

### Claude Code — project-level (recommended for Softuq projects)

```bash
mkdir -p .claude/skills
cp -r path/to/softuq .claude/skills/
```

The skill activates automatically when you're working in this repo.

### Claude Code — globally

```bash
mkdir -p ~/.claude/skills
cp -r path/to/softuq ~/.claude/skills/
```

Available in every project.

### Via `npx softuq skill` (coming soon)

```bash
npx softuq skill            # install to current project
npx softuq skill --global   # install to ~/.claude/skills/
```

## Activation

The skill has `name: softuq` and triggers when the agent sees work that touches UI: landing pages, hero sections, blocks, templates, cards, forms, inputs, or discussions of styling, CSS, Tailwind, design decisions.

You don't need to invoke it manually. If it's installed, Claude will use it.

## Philosophy

Softuq distributes components by copy-paste — you own the code. This skill extends the same principle to **AI workflow**: you own the rules. Fork it, edit it, add your team's conventions on top. The skill is just a markdown file.

## License

MIT. Same as the rest of Softuq.
