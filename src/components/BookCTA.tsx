import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { lazy, Suspense as RSuspense } from "react";

const HeroBackground = lazy(() => import("./HeroBackground").then(m => ({ default: m.HeroBackground })));

export function BookCTA() {
  return (
    <section id="book" className="relative overflow-hidden border-y border-gold/20 py-32 md:py-48">
      <div className="absolute inset-0 opacity-60">
        <RSuspense fallback={null}><HeroBackground /></RSuspense>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <h2 className="font-display text-6xl leading-[0.95] tracking-tight md:text-9xl">
          READY TO LOOK <br />
          <span className="text-gradient-gold font-serif italic">your best?</span>
        </h2>
        <p className="mt-8 text-lg text-white/70">Walk-ins welcome. Bookings preferred.</p>

        <a
          href="tel:0249698123"
          className="mt-12 inline-block rounded-sm bg-gold px-12 py-5 text-sm font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_50px_rgba(200,169,81,0.6)]"
        >
          Book Your Appointment
        </a>

        <a href="tel:0249698123" className="mt-10 flex items-center justify-center gap-3 text-gold transition hover:text-gold-soft">
          <Phone size={18} />
          <span className="font-display text-3xl tracking-wider md:text-4xl">(02) 4969 8123</span>
        </a>
      </motion.div>
    </section>
  );
}
