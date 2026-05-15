import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import { OpenStatus } from "./OpenStatus";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const imgY = useTransform(scrollY, [0, 800], [0, -120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" ref={ref} className="grain relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* Full-bleed background image, asymmetric crop right */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 md:left-[35%]">
          <img
            src={heroImg}
            alt="The Brother's Styling — barbershop"
            className="h-full w-full object-cover object-center grayscale-[15%] contrast-125 brightness-90"
            style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
        </div>
        {/* Heavy left fade so headline reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/30 md:via-obsidian/70" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian to-transparent" />
      </motion.div>

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="absolute left-0 right-0 top-24 z-20 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 text-[10px] uppercase tracking-[0.35em] text-white/50"
      >
        <span>Est · New Lambton · NSW</span>
        <OpenStatus />
        <span className="hidden items-center gap-2 text-gold md:flex">
          <Star size={12} fill="currentColor" stroke="currentColor" /> 4.6 / 53 Reviews
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-44 md:pb-32"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
            Chapter 01 / The Brother's Styling
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display leading-[0.82] tracking-tight">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
              className="text-[24vw] uppercase md:text-[18vw] lg:text-[14rem]"
            >
              SHARP.
            </motion.div>
          </div>
          <div className="-mt-2 overflow-hidden md:-mt-6">
            <motion.div
              initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
              className="flex items-baseline gap-4 text-[18vw] uppercase md:text-[12vw] lg:text-[10rem]"
            >
              <span>NEAT.</span>
              <span className="text-gold">/</span>
              <span className="font-serif italic text-gradient-gold">honest.</span>
            </motion.div>
          </div>
        </h1>

        {/* Subline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 grid items-end gap-10 md:grid-cols-12"
        >
          <p className="md:col-span-6 max-w-md text-xs font-medium uppercase tracking-[0.3em] text-white/70">
            Premium fades · beard · colour — <br className="hidden md:block" />
            New Lambton's barbershop, built on craft.
          </p>

          <div className="md:col-span-6 flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href="#book"
              className="group relative inline-flex items-center gap-3 border border-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-gold transition-colors duration-300 hover:bg-gold hover:text-obsidian"
            >
              <span className="relative z-10">Book a Cut</span>
              <span className="relative z-10 h-px w-6 bg-current transition-all group-hover:w-10" />
            </a>
            <a
              href="#services"
              className="group flex items-center gap-3 px-2 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/70 transition hover:text-gold"
            >
              The Drop
              <ArrowDown size={14} className="transition group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Side label */}
      <div className="absolute bottom-12 right-4 z-10 hidden -rotate-90 origin-bottom-right text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 md:block">
        Skin Fade · Signature Series — N° 001
      </div>
    </section>
  );
}
