import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import heroImg from "@/assets/hero-trial2.jpg";
import { OpenStatus } from "./OpenStatus";
import { HeroBackground } from "./HeroBackground";

const line1 = "PREMIUM".split("");
const line2 = "BARBERING &".split(" ");

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
          <Star size={12} fill="#c8a951" stroke="#c8a951" /> 4.6 Google Rating
        </span>
      </motion.div>

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 gap-8 px-6 pt-16 md:pt-10">
        {/* Left: typography */}
        <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col justify-center">

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mb-4 h-px w-20 bg-gold"
          />

          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Brunette Colour Specialist</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display leading-[0.88] tracking-tight">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
              >
                {line1.join("")}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.7 }}
                className="flex flex-wrap items-baseline gap-x-[0.15em] text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                {line2.map((w) => <span key={w}>{w}</span>)}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.85 }}
                className="font-serif italic text-gradient-gold text-4xl leading-[1.05] md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Hair Transformations.
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 1.0 }}
                className="text-xl text-white/60 md:text-2xl lg:text-3xl xl:text-4xl"
              >
                in New Lambton
              </motion.div>
            </div>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
          >
            Men's barbering, women's haircuts, brunette colour, balayage, nanoplasty, botox, facials and private hair services — all in one modern salon.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a href="/booking" className="rounded-sm bg-gold px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(200,169,81,0.5)]">
              Book Appointment
            </a>
            <a href="#services" className="group flex items-center justify-center gap-3 px-2 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/70 transition hover:text-gold sm:justify-start">
              View Services
              <span className="h-px w-10 bg-current transition-all group-hover:w-16" />
            </a>
          </motion.div>

          {/* Walk-ins text */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.5 }}
            className="mt-3 text-xs italic text-white/40"
          >
            Walk-ins welcome when available
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
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
