"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Matches the anti-flash script in layout.tsx: unknown until mounted, so
  // the server-rendered button doesn't flash the wrong icon before hydration.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Deliberate: this component must render identically to the server's
    // "unknown" markup on first paint (the anti-flash script in layout.tsx
    // sets the class outside React's knowledge, before hydration), then sync
    // to the real value right after mount. That's exactly what this effect
    // does — the "avoid setState in effect" lint rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Uključi svijetli način rada" : "Uključi tamni način rada"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted no-underline transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 26 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={isDark === null ? "invisible" : undefined}
      >
        {isDark ? (
          <path d="M21 14.5A8.5 8.5 0 0 1 11.5 5 8.5 8.5 0 1 0 21 14.5Z" />
        ) : (
          <>
            <circle cx="13" cy="13" r="5" />
            <path d="M13 2v3M13 21v3M2 13h3M21 13h3M5.5 5.5l2 2M18.5 18.5l2 2M20.5 5.5l-2 2M7.5 18.5l-2 2" />
          </>
        )}
      </svg>
    </button>
  );
}
