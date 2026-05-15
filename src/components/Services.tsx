import { motion } from "framer-motion";
import { Scissors, Beer, Palette, Sparkles, Droplets, Baby, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; name: string; desc: string; price: string; n: string }[] = [
  { n: "01", icon: Scissors, name: "Skin Fade", desc: "Precision faded to perfection.", price: "$35" },
  { n: "02", icon: Beer, name: "Beard Grooming", desc: "Shape, line-up, condition.", price: "$25" },
  { n: "03", icon: Palette, name: "Hair Colour", desc: "Highlights · full colour · balayage.", price: "$60" },
  { n: "04", icon: Sparkles, name: "Full Restyle", desc: "New look. Consultation included.", price: "$55" },
  { n: "05", icon: Droplets, name: "Facial Treatment", desc: "Cleanse · exfoliate · hydrate.", price: "$45" },
  { n: "06", icon: Baby, name: "Kids Cut", desc: "Sharp cuts for the young ones.", price: "$25" },
];

function Card({ s, i }: { s: typeof services[number]; i: number }) {
  const Icon = s.icon;
  return (
    <motion.a
      href="#book"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      className="group relative flex flex-col border border-white/10 bg-obsidian p-8 transition-colors duration-300 hover:border-gold"
    >
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-gold">
          N° {s.n}
        </span>
        <Icon size={20} className="text-white/30 transition group-hover:text-gold" />
      </div>

      <h3 className="mt-12 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl">
        {s.name}
      </h3>
      <p className="mt-4 text-sm uppercase tracking-wider text-white/50">{s.desc}</p>

      <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">From</div>
          <div className="font-display text-3xl text-gold">{s.price}</div>
        </div>
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 transition group-hover:text-gold">
          Book
          <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

export function Services() {
  return (
    <section id="services" className="grain relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-8 bg-gold" /> The Drop · 06 Services
            </div>
            <h2 className="font-display text-7xl uppercase leading-[0.85] tracking-tight md:text-9xl">
              Services
            </h2>
          </div>
          <p className="max-w-xs text-xs uppercase tracking-[0.25em] text-white/50">
            Every service hand-finished. <br />Bookings preferred — walk-ins welcome.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Card key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
