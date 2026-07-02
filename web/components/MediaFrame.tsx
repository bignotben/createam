const PLACEHOLDER_PATTERN =
  "repeating-linear-gradient(135deg, var(--color-border-soft) 0px, var(--color-border-soft) 1px, transparent 1px, transparent 11px)";

// Renders a real <img> with alt text when a URL is available (so the image
// is actually indexable/accessible), falling back to a decorative CSS
// pattern otherwise. Used anywhere a CMS image fills a fixed-aspect box.
export function MediaFrame({
  src,
  alt,
  aspectClassName,
  className = "",
  bordered = true,
}: {
  src?: string;
  alt: string;
  aspectClassName: string;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden ${bordered ? "border border-border" : ""} ${aspectClassName} ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div
          className="h-full w-full"
          style={{ backgroundImage: PLACEHOLDER_PATTERN }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
