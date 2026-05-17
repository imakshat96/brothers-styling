import { motion } from "framer-motion";

export function ScissorsArt() {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d78c" />
          <stop offset="50%" stopColor="#c8a951" />
          <stop offset="100%" stopColor="#8a6f2a" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8a951" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#c8a951" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c8a951" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="200" cy="300" rx="180" ry="260" fill="url(#goldGlow)" />

      <motion.g
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "200px 380px" }}
        filter="url(#softGlow)"
        stroke="url(#goldStroke)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top blade */}
        <path d="M 200 380 L 110 90 C 90 60 110 30 145 40 C 175 50 195 95 215 160 L 230 220 Z" />
        {/* Bottom blade */}
        <path d="M 200 380 L 290 90 C 310 60 290 30 255 40 C 225 50 205 95 185 160 L 170 220 Z" />

        {/* Blade highlights / inner lines */}
        <path d="M 200 380 L 150 200" opacity="0.55" />
        <path d="M 200 380 L 250 200" opacity="0.55" />

        {/* Pivot screw */}
        <circle cx="200" cy="380" r="14" />
        <circle cx="200" cy="380" r="5" />
        <line x1="193" y1="380" x2="207" y2="380" />
        <line x1="200" y1="373" x2="200" y2="387" />

        {/* Bottom handles (finger loops) */}
        <path d="M 200 380 L 170 450 C 140 470 130 510 155 535 C 180 560 220 545 230 510 C 235 490 222 470 210 460 Z" />
        <path d="M 200 380 L 230 450 C 260 470 270 510 245 535 C 220 560 180 545 170 510 C 165 490 178 470 190 460 Z" opacity="0.85" />

        {/* Decorative tail / handle accent */}
        <path d="M 200 555 L 200 590" opacity="0.4" />
      </motion.g>

      {/* Sparkle accents */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        fill="#f0d78c"
      >
        <circle cx="120" cy="180" r="1.5" />
        <circle cx="290" cy="240" r="1.2" />
        <circle cx="150" cy="500" r="1.4" />
        <circle cx="280" cy="120" r="1" />
      </motion.g>
    </svg>
  );
}
