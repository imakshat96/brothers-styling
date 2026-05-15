import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense, lazy } from "react";
import { ChevronDown } from "lucide-react";

const HeroBackground = lazy(() => import("./HeroBackground").then(m => ({ default: m.HeroBackground })));

const line1 = "WHERE EVERY CUT".split(" ");
const line2a = "IS A".split(" ");

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={null}><HeroBackground /></Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian" />
      </div>

      {/* Vertical barber pole accent */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[60vh] w-3 -translate-y-1/2 overflow-hidden rounded-full opacity-70 md:block">
        <div className="barber-pole h-full w-full" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-6 pt-24"
      >
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-gold"
        >
          <span className="h-px w-8 bg-gold" /> New Lambton · Est. Newcastle
        </motion.span>

        <h1 className="font-display text-[14vw] leading-[0.9] tracking-tight md:text-[8.5vw]">
          <div className="flex flex-wrap gap-x-[0.18em]">
            {line1.map((w, i) => (
              <motion.span key={w} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-x-[0.18em]">
            {line2a.map((w, i) => (
              <motion.span key={w} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (line1.length + i) * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (line1.length + line2a.length) * 0.12, duration: 0.7 }}
              className="font-serif italic text-gradient-gold"
            >
              Masterpiece
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 max-w-xl text-base text-white/70 md:text-lg"
        >
          Premium fades, beard grooming & styling — New Lambton's finest barbershop.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#book" className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(200,169,81,0.5)]">
            Book Appointment
          </a>
          <a href="#services" className="rounded-sm border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:text-gold">
            View Services
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
