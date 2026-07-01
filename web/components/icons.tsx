const commonProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 26 26",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export function ProblemIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case "eye":
      return (
        <svg {...commonProps} aria-hidden="true">
          <circle cx="13" cy="13" r="9" />
          <circle cx="13" cy="13" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "grid":
      return (
        <svg {...commonProps} aria-hidden="true">
          <rect x="4" y="4" width="7" height="7" />
          <rect x="15" y="4" width="7" height="7" />
          <rect x="4" y="15" width="7" height="7" />
          <rect x="15" y="15" width="7" height="7" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...commonProps} aria-hidden="true">
          <rect x="7" y="7" width="12" height="12" transform="rotate(45 13 13)" />
        </svg>
      );
    case "coordinate":
      return (
        <svg {...commonProps} aria-hidden="true">
          <line x1="13" y1="4" x2="13" y2="22" />
          <line x1="4" y1="13" x2="22" y2="13" />
        </svg>
      );
    case "target":
      return (
        <svg {...commonProps} aria-hidden="true">
          <circle cx="13" cy="13" r="9" />
          <line x1="13" y1="9" x2="13" y2="17" />
          <line x1="9" y1="13" x2="17" y2="13" />
        </svg>
      );
    case "monitor":
    default:
      return (
        <svg {...commonProps} aria-hidden="true">
          <rect x="3" y="5" width="20" height="16" />
          <line x1="3" y1="10" x2="23" y2="10" />
        </svg>
      );
  }
}
