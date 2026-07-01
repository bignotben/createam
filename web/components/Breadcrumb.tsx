import Link from "next/link";

export function Breadcrumb({
  items,
  meta,
}: {
  items: { label: string; href?: string }[];
  meta?: string;
}) {
  return (
    <div className="mb-14 flex items-center gap-3 border-b border-border pb-5 text-sm uppercase tracking-[0.04em] text-ink-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 ? <span className="text-border">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="text-ink-muted no-underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
      {meta ? <span className="ml-auto text-ink-faint">{meta}</span> : null}
    </div>
  );
}
