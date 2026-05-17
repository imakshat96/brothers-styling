import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import { OpenStatus } from "./OpenStatus";
import { HeroBackground } from "./HeroBackground";

const line1 = "EVERY".split("");
const line2 = "CUT IS A".split(" ");

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="hero-bg relative min-h-screen w-full overflow-hidden bg-obsidian pt-24"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Gradient overlay */}
      <div className="hero-overlay pointer-events-none absolute inset-0 z-0" />

      {/* Particle field */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <HeroBackground />
      </div>

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="absolute left-0 right-0 top-24 z-20 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 text-[11px] uppercase tracking-[0.35em] text-white/50"
      >
        <span>N° 001 — New Lambton</span>
        <OpenStatus />
        <span className="flex items-center gap-2 text-gold">
          <Star size={12} fill="#c8a951" stroke="#c8a951" /> 4.6 / 53 Reviews
        </span>
      </motion.div>

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 gap-8 px-6 pt-16 md:pt-10">
        {/* Left: typography */}
        <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mb-8 h-px w-24 bg-gold"
          />

          <h1 className="font-display leading-[0.82] tracking-tight">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
                className="text-[16vw] md:text-[10vw]"
              >
                {line1.join("")}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
                className="flex flex-wrap items-baseline gap-x-[0.18em] text-[10vw] md:text-[6.2vw]"
              >
                {line2.map((w) => <span key={w}>{w}</span>)}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.75 }}
                className="font-serif italic text-gradient-gold text-[14vw] leading-[0.95] md:text-[9vw]"
              >
                Masterpiece.
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-white/75 md:mt-10 md:text-lg"
          >
            Premium fades, beard grooming & styling — New Lambton's finest barbershop, crafted by hands that care about the details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.6 }}
            className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center md:mt-10"
          >
            <a href="#book" className="rounded-sm bg-gold px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(200,169,81,0.5)]">
              Book Appointment
            </a>
            <a href="#services" className="group flex items-center justify-center gap-3 px-2 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/80 transition hover:text-gold sm:justify-start">
              View Services
              <span className="h-px w-10 bg-current transition-all group-hover:w-16" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={22} />
        </motion.div>
      </motion.a>

      {/* Subtle grain */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
      }} />
    </section>
  );
}
