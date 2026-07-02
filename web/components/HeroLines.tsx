type HeroLinesProps = {
  /** Additional classes for positioning/sizing/color on the wrapper. */
  className?: string;
  /** Mirror horizontally (for reuse on a left-side placement). */
  flip?: boolean;
};

const PATHS = [
  "M40 -20 L40 150 C40 182 62 188 62 220 L62 400",
  "M48 -20 L48 150 C48 182 70 188 70 220 L70 400",
  "M56 -20 L56 150 C56 182 78 188 78 220 L78 400",
  "M100 -20 L100 400",
  "M110 -20 L110 400",
  "M150 -20 L150 110 C150 142 172 148 172 180 L172 400",
  "M158 -20 L158 110 C158 142 180 148 180 180 L180 400",
  "M166 -20 L166 110 C166 142 188 148 188 180 L188 400",
  "M215 -20 L215 400",
  "M225 -20 L225 400",
  "M265 -20 L265 170 C265 202 287 208 287 240 L287 400",
  "M273 -20 L273 170 C273 202 295 208 295 240 L295 400",
  "M281 -20 L281 170 C281 202 303 208 303 240 L303 400",
  "M340 -20 L340 400",
  "M375 -20 L375 130 C375 162 397 168 397 200 L397 400",
  "M383 -20 L383 130 C383 162 405 168 405 200 L405 400",
  "M391 -20 L391 130 C391 162 413 168 413 200 L413 400",
  "M445 -20 L445 400",
  "M455 -20 L455 400",
  "M500 -20 L500 150 C500 182 522 188 522 220 L522 400",
  "M508 -20 L508 150 C508 182 530 188 530 220 L530 400",
  "M516 -20 L516 150 C516 182 538 188 538 220 L538 400",
  "M575 -20 L575 400",
  "M585 -20 L585 400",
  "M620 -20 L620 140 C620 172 640 178 640 210 L640 400",
  "M628 -20 L628 140 C628 172 648 178 648 210 L648 400",
  "M636 -20 L636 140 C636 172 656 178 656 210 L656 400",
];

const GRADIENT_ID = "hero-lines-fade";

export function HeroLines({ className = "", flip = false }: HeroLinesProps) {
  return (
    <div aria-hidden="true" className={`hero-lines pointer-events-none overflow-hidden ${className}`}>
      <div className={`h-full w-full ${flip ? "scale-x-[-1]" : ""}`}>
        <div className="hero-lines-drift h-full w-full">
          <svg
            viewBox="0 0 680 380"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.03" />
                <stop offset="0.5" stopColor="currentColor" stopOpacity="0.18" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <g fill="none" stroke={`url(#${GRADIENT_ID})`} strokeWidth="5" strokeLinecap="round">
              {PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
