import { cn } from "@/lib/utils";

/**
 * Destination artwork for route cards.
 *
 * The reference design shows photographs of each destination. None are
 * licensed for this project, and generating fake "photos" of real places is
 * not acceptable, so each route gets a designed silhouette scene instead.
 * `RouteData.image` remains the slot for real photography later.
 */
export type RouteMotif =
  | "snow-peaks"
  | "hill-town"
  | "monument"
  | "golden-temple"
  | "river-ghats"
  | "palace"
  | "valley";

const PALETTES: Record<RouteMotif, { from: string; to: string; accent: string }> = {
  "snow-peaks": { from: "#3E86A8", to: "#17415F", accent: "#F2F8FB" },
  "hill-town": { from: "#2F8189", to: "#164A63", accent: "#F4B942" },
  monument: { from: "#4A7EA0", to: "#1B3E58", accent: "#F7C860" },
  "golden-temple": { from: "#39759B", to: "#143751", accent: "#F4B942" },
  "river-ghats": { from: "#2C8E93", to: "#134C63", accent: "#BDEDEE" },
  palace: { from: "#5A7FA2", to: "#22405C", accent: "#F7C860" },
  valley: { from: "#2D7F92", to: "#154961", accent: "#BFE7E8" },
};

function Scene({ motif, accent }: { motif: RouteMotif; accent: string }) {
  switch (motif) {
    case "snow-peaks":
      return (
        <>
          <path
            fill="#FFFFFF"
            opacity="0.12"
            d="M0 168 L74 96 L128 140 L196 62 L268 132 L330 92 L400 150 L400 260 L0 260 Z"
          />
          <path
            fill="#FFFFFF"
            opacity="0.85"
            d="M196 62 L226 92 L210 94 L196 84 L180 98 L166 94 Z M74 96 L98 120 L86 122 L74 114 L62 124 L50 120 Z"
          />
          <path
            fill="#06263A"
            opacity="0.65"
            d="M0 196 L84 158 L164 194 L248 152 L330 196 L400 164 L400 260 L0 260 Z"
          />
          <g fill="#06263A" opacity="0.9">
            <path d="M52 214 l10 26 h-20 Z" />
            <path d="M74 220 l8 20 h-16 Z" />
            <path d="M330 210 l10 28 h-20 Z" />
          </g>
        </>
      );

    case "hill-town":
      return (
        <>
          <path
            fill="#FFFFFF"
            opacity="0.1"
            d="M0 150 L96 88 L188 142 L286 84 L400 146 L400 260 L0 260 Z"
          />
          {/* Terraced houses stepping down the slope */}
          <g fill="#06263A" opacity="0.72">
            <rect x="58" y="176" width="42" height="34" rx="3" />
            <rect x="106" y="192" width="36" height="30" rx="3" />
            <rect x="150" y="168" width="46" height="40" rx="3" />
            <rect x="204" y="188" width="34" height="30" rx="3" />
            <rect x="246" y="174" width="44" height="38" rx="3" />
            <rect x="298" y="196" width="34" height="28" rx="3" />
          </g>
          <g fill={accent} opacity="0.8">
            <rect x="68" y="186" width="7" height="8" rx="1" />
            <rect x="160" y="180" width="7" height="8" rx="1" />
            <rect x="256" y="186" width="7" height="8" rx="1" />
            <rect x="118" y="202" width="6" height="7" rx="1" />
          </g>
          <path fill="#06263A" opacity="0.9" d="M0 222 L400 210 L400 260 L0 260 Z" />
        </>
      );

    case "monument":
      return (
        <>
          <path fill="#FFFFFF" opacity="0.08" d="M0 190 L400 190 L400 260 L0 260 Z" />
          {/* Triumphal arch */}
          <g fill="#06263A" opacity="0.78">
            <rect x="150" y="94" width="100" height="126" rx="4" />
          </g>
          <path
            fill={accent}
            opacity="0.16"
            d="M178 220 L178 146 a22 22 0 0 1 44 0 L222 220 Z"
          />
          <rect x="142" y="86" width="116" height="14" rx="4" fill="#06263A" opacity="0.85" />
          <rect x="134" y="216" width="132" height="10" rx="3" fill="#06263A" opacity="0.9" />
          <g fill="#06263A" opacity="0.45">
            <rect x="52" y="168" width="46" height="52" rx="3" />
            <rect x="306" y="158" width="48" height="62" rx="3" />
          </g>
          <path fill="#06263A" opacity="0.92" d="M0 226 L400 226 L400 260 L0 260 Z" />
        </>
      );

    case "golden-temple":
      return (
        <>
          <path fill="#FFFFFF" opacity="0.08" d="M0 186 L400 186 L400 260 L0 260 Z" />
          {/* Domed sanctum on a plinth, reflected in water */}
          <g fill={accent} opacity="0.9">
            <path d="M170 150 a30 26 0 0 1 60 0 Z" />
            <rect x="168" y="150" width="64" height="52" rx="3" />
            <rect x="196" y="112" width="8" height="20" rx="2" />
            <circle cx="200" cy="108" r="6" />
          </g>
          <g fill={accent} opacity="0.55">
            <path d="M132 168 a17 15 0 0 1 34 0 Z" />
            <rect x="132" y="168" width="34" height="34" rx="2" />
            <path d="M234 168 a17 15 0 0 1 34 0 Z" />
            <rect x="234" y="168" width="34" height="34" rx="2" />
          </g>
          <rect x="118" y="202" width="164" height="10" rx="3" fill="#06263A" opacity="0.75" />
          {/* Water */}
          <rect x="0" y="212" width="400" height="48" fill="#0A2E44" opacity="0.85" />
          <g fill={accent} opacity="0.22">
            <rect x="168" y="216" width="64" height="26" rx="3" />
          </g>
          <g stroke="#9FD3D5" strokeOpacity="0.3" strokeWidth="2" fill="none">
            <path d="M60 228 h70" />
            <path d="M268 236 h74" />
            <path d="M96 248 h58" />
          </g>
        </>
      );

    case "river-ghats":
      return (
        <>
          <path fill="#FFFFFF" opacity="0.1" d="M0 150 L110 104 L210 150 L320 108 L400 152 L400 260 L0 260 Z" />
          {/* Stepped ghats down to the river */}
          <g fill="#06263A" opacity="0.7">
            <rect x="40" y="176" width="120" height="12" />
            <rect x="52" y="188" width="108" height="12" />
            <rect x="64" y="200" width="96" height="12" />
            <rect x="240" y="182" width="112" height="12" />
            <rect x="250" y="194" width="102" height="12" />
          </g>
          {/* Riverside shrine */}
          <g fill={accent} opacity="0.85">
            <path d="M186 176 l20 -34 l20 34 Z" />
            <rect x="190" y="176" width="32" height="36" rx="2" />
          </g>
          <rect x="0" y="212" width="400" height="48" fill="#0B3348" opacity="0.9" />
          <g stroke="#8ED4D6" strokeOpacity="0.35" strokeWidth="2" fill="none">
            <path d="M28 226 h84" />
            <path d="M150 238 h120" />
            <path d="M296 224 h76" />
          </g>
        </>
      );

    case "palace":
      return (
        <>
          <path fill="#FFFFFF" opacity="0.08" d="M0 184 L400 184 L400 260 L0 260 Z" />
          {/* Tiered facade with arched windows */}
          <g fill="#06263A" opacity="0.78">
            <rect x="96" y="126" width="208" height="96" rx="4" />
            <rect x="132" y="98" width="136" height="30" rx="4" />
            <rect x="172" y="76" width="56" height="24" rx="4" />
          </g>
          <g fill={accent} opacity="0.4">
            <rect x="116" y="150" width="18" height="30" rx="9" />
            <rect x="148" y="150" width="18" height="30" rx="9" />
            <rect x="180" y="150" width="18" height="30" rx="9" />
            <rect x="212" y="150" width="18" height="30" rx="9" />
            <rect x="244" y="150" width="18" height="30" rx="9" />
            <rect x="276" y="150" width="18" height="30" rx="9" />
            <rect x="152" y="108" width="14" height="16" rx="7" />
            <rect x="192" y="108" width="14" height="16" rx="7" />
            <rect x="232" y="108" width="14" height="16" rx="7" />
          </g>
          <rect x="84" y="218" width="232" height="10" rx="3" fill="#06263A" opacity="0.9" />
          <path fill="#06263A" opacity="0.92" d="M0 228 L400 228 L400 260 L0 260 Z" />
        </>
      );

    case "valley":
    default:
      return (
        <>
          <path fill="#FFFFFF" opacity="0.1" d="M0 158 L92 100 L182 154 L276 96 L400 156 L400 260 L0 260 Z" />
          <path fill="#06263A" opacity="0.6" d="M0 190 L96 150 L196 192 L300 148 L400 190 L400 260 L0 260 Z" />
          {/* Road winding through the valley floor */}
          <path
            fill="#0A2E44"
            opacity="0.95"
            d="M156 260 C 176 226, 214 210, 268 202 C 316 195, 360 198, 400 208 L400 226 C 356 216, 314 214, 272 220 C 224 227, 196 240, 184 260 Z"
          />
          <path
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="2.5"
            strokeDasharray="10 12"
            fill="none"
            d="M170 260 C 190 230, 226 216, 276 210 C 322 204, 362 206, 400 214"
          />
        </>
      );
  }
}

export function RouteArt({
  motif,
  label,
  className,
}: {
  motif: RouteMotif;
  /** Used only for the accessible description of the card image. */
  label: string;
  className?: string;
}) {
  const palette = PALETTES[motif];
  const gradientId = `route-${motif}`;

  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gradientId})`} />
      <Scene motif={motif} accent={palette.accent} />
    </svg>
  );
}
