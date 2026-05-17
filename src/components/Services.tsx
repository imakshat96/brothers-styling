import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Scissors, Beer, Palette, Sparkles, Droplets, Baby } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

const services: { icon: LucideIcon; name: string; desc: string; price: string }[] = [
  { icon: Scissors, name: "Skin Fade", desc: "The signature cut. Precision faded to perfection.", price: "From $35" },
  { icon: Beer, name: "Beard Grooming", desc: "Shape, line-up and condition your beard.", price: "From $25" },
  { icon: Palette, name: "Hair Colour", desc: "Highlights, full colour, balayage for men.", price: "From $60" },
  { icon: Sparkles, name: "Full Restyle", desc: "New look, new you. Consultation included.", price: "From $55" },
  { icon: Droplets, name: "Facial Treatment", desc: "Deep cleanse, exfoliate & hydrate.", price: "From $45" },
  { icon: Baby, name: "Kids Cut", desc: "Sharp cuts for the young ones.", price: "From $25" },
];

function Card({ s, i }: { s: typeof services[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const Icon = s.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="group relative rounded-md border border-white/10 bg-obsidian-2 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_0_40px_rgba(200,169,81,0.25)]"
    >
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-sm border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-obsidian">
        <Icon size={26} />
      </div>
      <h3 className="font-display text-3xl tracking-wide">{s.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{s.desc}</p>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-serif italic text-gold">{s.price}</span>
        <span className="text-xs uppercase tracking-widest text-white/40 transition group-hover:text-gold">Book →</span>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 font-display text-6xl tracking-tight md:text-8xl"
        >
          OUR <span className="text-gradient-gold font-serif italic">Services</span>
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Card key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
