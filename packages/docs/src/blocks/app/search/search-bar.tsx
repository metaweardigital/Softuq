"use client";

import { Badge, Search, SearchContent, SearchGroup, SearchInput, SearchItem } from "@designystem/react";
import { Clock, Search as SearchLucide, X } from "lucide-react";
import * as React from "react";

const RECENT = [
  { label: "tiktok", meta: "2:3" },
  { label: "tiktits", meta: "16:9" },
  { label: "tiktok dance", meta: "1:1" },
];

const SUGGESTIONS = ["toktok 2025", "bbc", "indian food", "bonsai"];

export default function SearchBar() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="min-h-[480px] bg-bg-base flex items-start justify-center p-[var(--ds-space-section-x)] pt-20">
      <div className="w-full max-w-md">
        <Search value={query} onValueChange={setQuery}>
          <SearchInput placeholder="Search anything..." />
          <SearchContent>
            {query.length === 0 && (
              <SearchGroup heading="Recent">
                {RECENT.map((item) => (
                  <SearchItem
                    key={item.label}
                    icon={<Clock className="h-4 w-4" />}
                    onSelect={() => setQuery(item.label)}
                  >
                    <span className="flex flex-1 items-center justify-between gap-2">
                      <span className="font-medium truncate">{item.label}</span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        {item.meta && (
                          <Badge variant="secondary" size="sm">
                            {item.meta}
                          </Badge>
                        )}
                        <button
                          type="button"
                          className="text-text-muted hover:text-text-primary transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          aria-label={`Remove ${item.label}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </span>
                  </SearchItem>
                ))}
              </SearchGroup>
            )}
            {query.length === 0 && (
              <SearchGroup heading="Suggestions">
                {SUGGESTIONS.map((s) => (
                  <SearchItem key={s} icon={<SearchLucide className="h-4 w-4" />} onSelect={() => setQuery(s)}>
                    {s}
                  </SearchItem>
                ))}
              </SearchGroup>
            )}
            {query.length > 0 && (
              <>
                {RECENT.filter((r) => r.label.toLowerCase().includes(query.toLowerCase())).map((item) => (
                  <SearchItem
                    key={item.label}
                    icon={<Clock className="h-4 w-4" />}
                    onSelect={() => setQuery(item.label)}
                  >
                    <span className="flex flex-1 items-center justify-between gap-2">
                      <span className="font-medium truncate">{item.label}</span>
                      {item.meta && (
                        <Badge variant="secondary" size="sm">
                          {item.meta}
                        </Badge>
                      )}
                    </span>
                  </SearchItem>
                ))}
                {SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase())).map((s) => (
                  <SearchItem key={s} icon={<SearchLucide className="h-4 w-4" />} onSelect={() => setQuery(s)}>
                    {s}
                  </SearchItem>
                ))}
              </>
            )}
            {query.length > 0 && (
              <SearchItem
                icon={<SearchLucide className="h-4 w-4" />}
                onSelect={() => {}}
                className="bg-[color-mix(in_oklch,var(--accent)_10%,transparent)] text-accent-text mt-1"
              >
                Show all results for: {query}
              </SearchItem>
            )}
          </SearchContent>
        </Search>
      </div>
    </div>
  );
}
