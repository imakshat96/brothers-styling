import { motion } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";

export function BookCTA() {
  return (
    <section id="book" className="grain relative overflow-hidden border-y border-gold/25 bg-obsidian py-32 md:py-48">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(184,137,58,0.18), transparent 60%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        <div className="mb-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" /> Final Call
        </div>

        <h2 className="font-display uppercase leading-[0.82] tracking-tight">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-[22vw] md:text-[16vw] lg:text-[13rem]"
            >
              Book Your
            </motion.div>
          </div>
          <div className="-mt-2 overflow-hidden md:-mt-6">
            <motion.div
              initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
              className="text-[22vw] text-gradient-gold md:text-[16vw] lg:text-[13rem]"
            >
              Cut.
            </motion.div>
          </div>
        </h2>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 md:col-span-5">
            Walk-ins welcome. Bookings preferred. <br />Open daily 11am — 9pm.
          </p>

          <div className="md:col-span-7 flex flex-wrap items-center gap-5 md:justify-end">
            <a
              href="tel:0249698123"
              className="group inline-flex items-center gap-3 border border-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-obsidian"
            >
              <Phone size={14} />
              (02) 4969 8123
            </a>
            <a
              href="tel:0249698123"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft"
            >
              Book Now
              <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
