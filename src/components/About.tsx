import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: "easeOut", onUpdate: v => setVal(v) });
    return () => controls.stop();
  }, [inView, to, mv]);

  return <span ref={ref}>{Math.round(val)}{suffix}</span>;
}

const stats = [
  { display: <Counter to={53} suffix="+" />, label: "Google Reviews" },
  { display: <>4.6<span className="text-gold">★</span></>, label: "Average Rating" },
  { display: <Counter to={5} suffix="+" />, label: "Years on the Block" },
  { display: <>11–9</>, label: "Open Daily (pm)" },
];

export function About() {
  return (
    <section id="about" className="grain relative border-y border-white/5 bg-obsidian-2 px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-8 bg-gold" /> The House
            </div>
            <h2 className="font-display text-6xl uppercase leading-[0.85] tracking-tight md:text-8xl">
              More than <br /> a haircut.
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/60">
              The Brother's Styling is New Lambton's home for modern barbering. Skill, creativity and old-school hospitality — every line, every fade, every trim.
            </p>
            <div className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
              <span className="h-px w-12 bg-white/30" />
              Est · Newcastle · NSW
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-white/10 md:col-span-7">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-obsidian-2 p-10"
              >
                <div className="font-display text-7xl uppercase leading-none tracking-tight text-foreground md:text-8xl">
                  {s.display}
                </div>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
