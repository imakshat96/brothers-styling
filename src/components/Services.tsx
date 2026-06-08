import { motion } from "framer-motion";
import {
  Palette, Sparkles, Droplets, Scissors, Zap, Gem,
  Layers, User, Crown, RefreshCcw, Paintbrush, Smile, AlignJustify,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  name: string;
  desc: string;
  price?: string;
}

const womensServices: ServiceItem[] = [
  { icon: Palette, name: "Brunette Transformations", desc: "Rich, dimensional brunette colour crafted to complement your skin tone.", price: "From $120" },
  { icon: Sparkles, name: "Balayage & Foilyage", desc: "Sun-kissed, hand-painted highlights for natural, effortless dimension.", price: "From $180" },
  { icon: Droplets, name: "Toner & Colour Correction", desc: "Neutralise unwanted tones and restore your hair's true colour.", price: "From $80" },
  { icon: Scissors, name: "Women's Haircut", desc: "Precision cut tailored to your face shape and lifestyle.", price: "From $65" },
  { icon: Zap, name: "Nanoplasty", desc: "Frizz-free, glossy smoothing treatment for silky, manageable hair.", price: "From $250" },
  { icon: Gem, name: "Hair Botox", desc: "Deep-conditioning treatment that plumps and revives damaged strands.", price: "From $180" },
];

const mensServices: ServiceItem[] = [
  { icon: Layers, name: "Fade", desc: "Classic tapered fade for a clean, structured finish.", price: "From $35" },
  { icon: Scissors, name: "Skin Fade", desc: "Precision skin fade — the signature cut, faded to perfection.", price: "From $40" },
  { icon: AlignJustify, name: "Beard Trim", desc: "Shape, line-up and condition your beard for a polished look.", price: "From $25" },
  { icon: Crown, name: "Haircut + Beard", desc: "The full package — a fresh cut and a defined beard in one visit.", price: "From $55" },
  { icon: RefreshCcw, name: "Perming", desc: "Add texture and movement with a professional perm service.", price: "From $120" },
  { icon: Paintbrush, name: "Grey Coverage", desc: "Blend or cover greys with a natural-looking colour application.", price: "From $60" },
  { icon: Smile, name: "Face Cleanup", desc: "Deep cleanse, exfoliate and hydrate for fresh, clear skin.", price: "From $45" },
];

function ServiceCard({ s, i }: { s: ServiceItem; i: number }) {
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: i * 0.07 }}
      className="group flex items-start gap-4 rounded-md border-l-4 border-gold bg-obsidian-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,169,81,0.12)]"
    >
      <div className="mt-0.5 shrink-0 rounded-sm border border-gold/30 p-2.5 text-gold transition group-hover:bg-gold/10">
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl tracking-wide text-white">{s.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.desc}</p>
        {s.price && (
          <div className="mt-3 flex items-center justify-between">
            <span className="font-serif italic text-sm text-gold">{s.price}</span>
            <a
              href="#book"
              className="text-[11px] uppercase tracking-widest text-white/35 transition group-hover:text-gold"
              onClick={(e) => e.stopPropagation()}
            >
              Book →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SectionHeading({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <span className="text-[11px] uppercase tracking-[0.35em] text-gold/70">{label}</span>
      <h2 className="mt-2 font-display text-5xl tracking-tight md:text-7xl">
        {title} <span className="text-gradient-gold font-serif italic">{accent}</span>
      </h2>
    </motion.div>
  );
}

export function WomensServices() {
  return (
    <section id="womens-services" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="For Her" title="WOMEN'S" accent="Services" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {womensServices.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

export function MensServices() {
  return (
    <section id="services" className="relative border-t border-white/6 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="For Him" title="MEN'S" accent="Services" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mensServices.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <>
      <WomensServices />
      <MensServices />
    </>
  );
}
