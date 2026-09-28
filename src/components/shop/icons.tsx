import type { FeatureIcon } from "@/data/categoryMeta";

type IconProps = { className?: string };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURE_PATHS: Record<FeatureIcon, React.ReactNode> = {
  leaf: (
    <>
      <path {...line} d="M5 19C4 11 9 4 20 4c0 11-6 16-13 15" />
      <path {...line} d="M5 19c3-5 7-9 11-11" />
    </>
  ),
  paw: (
    <>
      <ellipse {...line} cx="12" cy="16" rx="4.5" ry="3.8" />
      <circle {...line} cx="6" cy="10.5" r="2" />
      <circle {...line} cx="9.5" cy="6.5" r="2" />
      <circle {...line} cx="14.5" cy="6.5" r="2" />
      <circle {...line} cx="18" cy="10.5" r="2" />
    </>
  ),
  gift: (
    <>
      <rect {...line} x="4" y="9" width="16" height="11" rx="1" />
      <path {...line} d="M3 9h18v-3H3zM12 6v14M12 6c-1-3-5-4-5-1.5S12 6 12 6zm0 0c1-3 5-4 5-1.5S12 6 12 6z" />
    </>
  ),
  feather: (
    <>
      <path {...line} d="M20 4C11 4 6 10 6 18l-2 2" />
      <path {...line} d="M20 4c0 9-5 14-14 14M9 15h5M11 11h6" />
    </>
  ),
  check: (
    <>
      <path {...line} d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path {...line} d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  home: (
    <>
      <path {...line} d="M3 11l9-7 9 7" />
      <path {...line} d="M5 10v10h14V10M10 20v-5h4v5" />
    </>
  ),
  truck: (
    <>
      <path {...line} d="M2 6h12v10H2zM14 10h4l3 3v3h-7" />
      <circle {...line} cx="6" cy="17.5" r="1.8" />
      <circle {...line} cx="17" cy="17.5" r="1.8" />
    </>
  ),
  bulb: (
    <>
      <path {...line} d="M9 17h6M10 20h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.6 1 2.5h6c0-.9.2-1.7 1-2.5A6 6 0 0012 3z" />
    </>
  ),
  sun: (
    <>
      <circle {...line} cx="12" cy="12" r="4" />
      <path {...line} d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  star: <path {...line} d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
};

export function Feature({ icon, className = "" }: IconProps & { icon: FeatureIcon }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {FEATURE_PATHS[icon]}
    </svg>
  );
}

export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...line} strokeWidth={1.8} d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Chevron({ className = "", dir = "right" }: IconProps & { dir?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...line} strokeWidth={1.8} d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
    </svg>
  );
}

export function Heart({ className = "", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        {...line}
        strokeWidth={1.7}
        fill={filled ? "currentColor" : "none"}
        d="M12 20s-7-4.4-9-9a4.8 4.8 0 019-3 4.8 4.8 0 019 3c-2 4.6-9 9-9 9z"
      />
    </svg>
  );
}

export function Cart({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...line} strokeWidth={1.8} d="M2.5 3.5h2.2l2.3 11.2a1.5 1.5 0 001.5 1.2h8.9a1.5 1.5 0 001.5-1.1L21 7H6" />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Check({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...line} strokeWidth={2.2} d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Eucalyptus-style leaf spray used to decorate panels */
export function LeafSpray({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path d="M20 190C60 140 100 90 180 20" stroke="#5b7f5a" strokeWidth="2.5" fill="none" />
      {[
        [40, 165, -35],
        [62, 138, 20],
        [80, 118, -40],
        [102, 95, 15],
        [120, 76, -45],
        [142, 55, 10],
        [160, 38, -50],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="26"
          ry="9"
          transform={`rotate(${r} ${x} ${y})`}
          fill={i % 2 ? "#6f9a6b" : "#8fb58a"}
          opacity=".9"
        />
      ))}
    </svg>
  );
}
