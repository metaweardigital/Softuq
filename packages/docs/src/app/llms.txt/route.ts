export function GET() {
  const content = `# Softuq

> A design system for AI-era projects. Components, blocks, and page templates with copy-paste distribution.

## What is Softuq?

Softuq is a React design system with soft UI / neumorphic aesthetic. It ships 37+ accessible components, 40+ pre-composed page sections (blocks), and full page templates. Distribution is copy-paste via CLI — you own every line of code. Tokens are the only runtime dependency.

## Key features

- Copy-paste distribution via \`npx softuq init\` and \`npx softuq add\`
- OKLCH color system with 6 palettes and 8 accent colors
- Theming via CSS variables (palette, accent, radius, spacing, font)
- CVA variants + TypeScript types on all components
- AI coding skill: \`npx softuq skill\` installs design rules for Claude Code
- Dark and light mode via \`data-theme\` attribute
- Tailwind CSS v4

## Pages

- [Home](https://softuq.com): Overview and value proposition
- [Getting Started](https://softuq.com/getting-started): Installation and setup guide
- [Components](https://softuq.com/components): 37+ React primitives (buttons, dialogs, inputs, tables, etc.)
- [Blocks](https://softuq.com/blocks): 40+ pre-composed page sections (heroes, pricing, FAQ, footers)
- [Templates](https://softuq.com/templates): Full page templates (landing pages, dashboards, auth flows)
- [Foundations](https://softuq.com/foundations): Design tokens — colors, typography, spacing, effects, icons, layout
- [Design Skill](https://softuq.com/skill): AI coding agent skill for enforcing design system rules

## Installation

\`\`\`bash
npx softuq init          # setup tokens, utils, provider
npx softuq add button    # copy component files
npx softuq add --all     # add all components
npx softuq skill         # install AI design skill
\`\`\`

## npm

- Package: [softuq](https://www.npmjs.com/package/softuq)

## License

MIT — free for personal and commercial use.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
