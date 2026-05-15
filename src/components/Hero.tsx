import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

const line1 = "EVERY".split("");
const line2 = "CUT IS A".split(" ");

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const imgY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-obsidian pt-24">
      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="absolute left-0 right-0 top-24 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 text-[11px] uppercase tracking-[0.35em] text-white/50"
      >
        <span>N° 001 — New Lambton</span>
        <span className="hidden md:inline">Est. Newcastle · NSW 2305</span>
        <span className="flex items-center gap-2 text-gold">
          <Star size={12} fill="#c8a951" stroke="#c8a951" /> 4.6 / 53 Reviews
        </span>
      </motion.div>

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 gap-8 px-6 pt-16 md:grid-cols-12 md:gap-10 md:pt-10">
        {/* Left: typography */}
        <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col justify-center md:col-span-7">
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mb-8 h-px w-24 bg-gold"
          />

          <h1 className="font-display leading-[0.82] tracking-tight">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
                className="text-[18vw] md:text-[10vw]"
              >
                {line1.join("")}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
                className="flex flex-wrap items-baseline gap-x-[0.18em] text-[11vw] md:text-[6.2vw]"
              >
                {line2.map((w) => <span key={w}>{w}</span>)}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.75 }}
                className="font-serif italic text-gradient-gold text-[16vw] leading-[0.95] md:text-[9vw]"
              >
                Masterpiece.
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 max-w-md text-base leading-relaxed text-white/65 md:text-lg"
          >
            Premium fades, beard grooming & styling — New Lambton's finest barbershop, crafted by hands that care about the details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#book" className="rounded-sm bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(200,169,81,0.5)]">
              Book Appointment
            </a>
            <a href="#services" className="group flex items-center gap-3 px-2 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/80 transition hover:text-gold">
              View Services
              <span className="h-px w-10 bg-current transition-all group-hover:w-16" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: editorial image with barber pole */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
          className="relative z-10 hidden md:col-span-5 md:block"
        >
          <motion.div style={{ y: imgY }} className="relative h-full min-h-[560px]">
            {/* Frame */}
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/40" />
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={heroImg}
                alt="Precision skin fade haircut"
                width={1024}
                height={1280}
                className="h-full w-full object-cover grayscale-[20%] contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-transparent" />
            </div>

            {/* Vertical barber pole */}
            <div className="absolute -right-3 top-0 h-full w-2 overflow-hidden rounded-full">
              <div className="barber-pole h-full w-full" />
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
              className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-white/70"
            >
              <span>Skin Fade · Signature Cut</span>
              <span className="text-gold">/ 01</span>
            </motion.div>
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
