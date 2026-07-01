"use client";

import { useState } from "react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-[860px]">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className="border-t border-border-soft">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-xl font-medium tracking-[-0.01em] text-ink">{item.q}</span>
              <span className="shrink-0 text-2xl leading-none text-accent">
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? (
              <p className="max-w-[68ch] pb-7 text-[17px] leading-relaxed text-ink-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
