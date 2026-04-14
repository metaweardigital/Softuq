import { Check, Copy } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "text-xs bg-surface-elevated px-1.5 py-0.5 rounded-[var(--ds-radius-checkbox)] text-fg-primary font-mono border border-edge-subtle",
        "transition-colors duration-fast ease-soft hover:bg-surface-hover hover:border-edge-default",
        className,
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";

/* === Syntax highlighting === */

const HIGHLIGHT_RE =
  // 1: comments          2: strings                                                          3: tag open  4: tag name  5: attributes                                                                                                       6: keywords                                                                                      7: CLI tools
  /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(&lt;\/?)([\w.]+)|\s(className|style|href|src|alt|type|placeholder|value|onChange|onClick|disabled|ref|key|id|name|lang|data-[\w-]+)=|\b(import|export|from|const|let|var|function|return|default|if|else|async|await|new|class|extends)\b|\b(npx|npm|pnpm|yarn|node|git)\b/gm;

function highlight(code: string): string {
  const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(HIGHLIGHT_RE, (match, comment, str, tagOpen, tagName, attr, keyword, cli) => {
    if (comment) return `<span class="text-fg-dimmed">${comment}</span>`;
    if (str) return `<span class="text-success">${str}</span>`;
    if (tagOpen && tagName) return `${tagOpen}<span class="text-destructive">${tagName}</span>`;
    if (attr) return ` <span class="text-warning">${attr}</span>=`;
    if (keyword) return `<span class="text-accent">${keyword}</span>`;
    if (cli) return `<span class="text-accent">${cli}</span>`;
    return match;
  });
}

/* === CodeBlock === */

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  copyable?: boolean;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, title, copyable = true, children, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const codeText = typeof children === "string" ? children : "";

    const handleCopy = React.useCallback(() => {
      if (!codeText) return;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [codeText]);

    return (
      <div
        ref={ref}
        data-theme="dark"
        className={cn("group relative rounded-[var(--ds-radius-card)] border overflow-hidden", className)}
        style={{ borderColor: "var(--border-subtle)" }}
        {...props}
      >
        {(title || copyable) && (
          <div
            className="flex items-center justify-between px-[var(--ds-space-card)] py-2"
            style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
          >
            {title ? (
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                {title}
              </span>
            ) : (
              <span />
            )}
            {copyable && codeText && (
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "relative flex items-center gap-1.5 text-xs transition-all duration-normal ease-soft",
                  copied
                    ? "text-success hover:text-success"
                    : "[color:var(--text-dimmed)] hover:[color:var(--text-primary)]",
                )}
                aria-label={copied ? "Copied" : "Copy code"}
              >
                <span className="relative size-3.5">
                  <Copy
                    className={cn(
                      "absolute inset-0 size-3.5 transition-all duration-normal ease-soft",
                      copied ? "opacity-0 scale-50" : "opacity-100 scale-100",
                    )}
                  />
                  <Check
                    className={cn(
                      "absolute inset-0 size-3.5 transition-all duration-normal ease-soft",
                      copied ? "opacity-100 scale-100" : "opacity-0 scale-50",
                    )}
                  />
                </span>
                <span
                  className={cn("transition-opacity duration-normal ease-soft", copied ? "opacity-0" : "opacity-100")}
                >
                  Copy
                </span>
                <span
                  className={cn(
                    "absolute left-5 transition-opacity duration-normal ease-soft",
                    copied ? "opacity-100" : "opacity-0",
                  )}
                >
                  Copied
                </span>
              </button>
            )}
          </div>
        )}
        {codeText ? (
          <pre
            className="p-[var(--ds-space-card)] overflow-x-auto text-xs leading-relaxed font-mono scrollbar-thin selection:[background:var(--accent-muted)] selection:[color:var(--text-primary)]"
            style={{ background: "var(--bg-base)", color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: highlight(codeText) }}
          />
        ) : (
          <pre
            className="p-[var(--ds-space-card)] overflow-x-auto text-xs leading-relaxed font-mono scrollbar-thin selection:[background:var(--accent-muted)] selection:[color:var(--text-primary)]"
            style={{ background: "var(--bg-base)", color: "var(--text-secondary)" }}
          >
            {children}
          </pre>
        )}
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export type { CodeBlockProps, CodeProps };
export { Code, CodeBlock };
