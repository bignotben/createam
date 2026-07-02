type HeroLinesProps = {
  /** Stroke color. Accepts any CSS color, including var(--color-*) tokens. */
  color?: string;
  /** Overall opacity of the whole motif (the lines stay thin regardless). */
  opacity?: number;
  /** Which side of the hero the motif sits on. */
  side?: "left" | "right";
  className?: string;
};

// Hand-authored flowing vertical curves — an original contour-like motif,
// not derived from any existing brand asset. Each path is a single smooth
// bezier chain, roughly vertical, drifting gently left/right as it descends.
const PATHS = [
  "M32,0 C60,90 6,170 42,270 C72,350 14,430 48,530 C76,610 20,690 44,790 C58,845 34,875 40,900",
  "M92,0 C54,88 122,166 82,258 C50,336 108,414 70,512 C40,592 98,672 74,772 C60,832 90,864 80,900",
  "M152,0 C190,108 132,186 164,284 C194,362 140,440 168,538 C194,616 146,694 166,792 C180,846 156,876 160,900",
  "M212,0 C176,96 234,174 200,266 C170,344 224,422 196,520 C170,600 220,680 200,776 C190,838 210,868 205,900",
  "M264,0 C232,92 286,170 252,262 C226,340 276,418 248,516 C222,596 266,676 248,772 C238,834 256,864 252,900",
];

// A couple of small nodes along two of the paths for a subtle circuit-like
// accent, echoing the reference without copying it.
const NODES = [
  { cx: 42, cy: 270, r: 2.6 },
  { cx: 48, cy: 530, r: 2.6 },
  { cx: 168, cy: 538, r: 2.6 },
  { cx: 166, cy: 792, r: 2.6 },
];

export function HeroLines({
  color = "var(--color-ink)",
  opacity = 0.14,
  side = "right",
  className = "",
}: HeroLinesProps) {
  return (
    <div
      aria-hidden="true"
      className={`hero-lines pointer-events-none absolute inset-y-0 hidden w-[140px] overflow-hidden sm:block sm:w-[180px] md:w-[240px] lg:w-[300px] ${
        side === "left" ? "left-0" : "right-0"
      } ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 300 900"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={side === "left" ? { transform: "scaleX(-1)" } : undefined}
        fill="none"
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            pathLength={1}
            className="hero-lines-path"
            style={{ animationDelay: `${i * 0.22}s`, animationDuration: `${2.4 + i * 0.3}s` }}
          />
        ))}
        {NODES.map((node, i) => (
          <circle key={i} cx={node.cx} cy={node.cy} r={node.r} fill={color} />
        ))}
      </svg>
    </div>
  );
}
