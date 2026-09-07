/**
 * Hero backdrop.
 *
 * The reference design uses a photograph of a car on a hill road. No licensed
 * photography exists for this project yet, and inventing one is not an option,
 * so this is a designed scene in the brand palette: layered ridges, mist and a
 * road receding into the valley. It is decorative and hidden from assistive
 * technology. When real photography arrives it can replace this element.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0C3350" />
            <stop offset="46%" stopColor="#17527A" />
            <stop offset="100%" stopColor="#1E6E8C" />
          </linearGradient>
          <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4E8FAC" />
            <stop offset="100%" stopColor="#2C6285" />
          </linearGradient>
          <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A6484" />
            <stop offset="100%" stopColor="#17415F" />
          </linearGradient>
          <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#123F5A" />
            <stop offset="100%" stopColor="#0B2537" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E6A83" />
            <stop offset="100%" stopColor="#17384A" />
          </linearGradient>
          <linearGradient id="hero-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F8B8D" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0F8B8D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-warm" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4B942" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F4B942" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1440" height="820" fill="url(#hero-sky)" />

        {/* Light bloom behind the headline and a warm one near the horizon */}
        <circle cx="250" cy="180" r="420" fill="url(#hero-glow)" />
        <circle cx="1180" cy="360" r="380" fill="url(#hero-warm)" />

        {/* Far ridge line */}
        <path
          fill="url(#ridge-far)"
          d="M0 470 L120 402 L215 448 L330 356 L420 415 L520 330 L628 404 L742 322 L858 398 L968 344 L1090 420 L1210 360 L1320 424 L1440 372 L1440 820 L0 820 Z"
        />
        {/* Snow caps on the far ridge */}
        <path
          fill="#E8F1F5"
          opacity="0.85"
          d="M520 330 L556 360 L540 362 L520 352 L500 366 L484 362 Z M742 322 L780 356 L760 358 L742 346 L722 360 L706 356 Z"
        />

        {/* Mid ridge */}
        <path
          fill="url(#ridge-mid)"
          d="M0 566 L138 500 L268 552 L396 476 L520 540 L648 486 L788 548 L916 494 L1052 556 L1188 500 L1320 552 L1440 508 L1440 820 L0 820 Z"
        />

        {/* Mist band between ridges */}
        <rect x="0" y="530" width="1440" height="72" fill="#CDE4EE" opacity="0.16" />

        {/* Near ridge */}
        <path
          fill="url(#ridge-near)"
          d="M0 672 L160 622 L320 668 L470 606 L640 664 L800 614 L960 668 L1120 620 L1290 672 L1440 628 L1440 820 L0 820 Z"
        />

        {/* Valley road curving out of frame */}
        <path
          fill="url(#road)"
          d="M596 820 C 660 726, 742 690, 858 672 C 962 656, 1052 664, 1130 690 L1180 704 L1092 726 C 1006 706, 930 702, 852 714 C 760 728, 704 762, 668 820 Z"
        />
        {/* Centre line */}
        <path
          stroke="#F4B942"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeDasharray="16 20"
          fill="none"
          d="M636 820 C 700 736, 780 706, 886 692 C 980 680, 1058 686, 1128 706"
        />

        {/* Sparse conifers along the near ridge */}
        <g fill="#08202F" opacity="0.9">
          <path d="M214 646 l11 30 h-22 Z" />
          <path d="M240 654 l9 26 h-18 Z" />
          <path d="M1236 650 l11 30 h-22 Z" />
          <path d="M1262 658 l9 24 h-18 Z" />
          <path d="M406 622 l10 28 h-20 Z" />
        </g>
      </svg>

      {/* Readability scrim: keeps headline contrast well above 4.5:1 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07223A]/88 via-[#0A3050]/55 to-[#0A3050]/10" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07223A]/80 to-transparent" />
    </div>
  );
}
