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
  { val: 53, suffix: "+", label: "Google Reviews" },
  { val: 4.6, suffix: "★", label: "Rating", float: true },
  { val: 5, suffix: "+", label: "Years Experience" },
  { val: 11, suffix: "–9pm", label: "Daily Hours", prefix: "" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="mb-20 h-px w-full bg-gold"
        />

        <div className="grid items-start gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              MORE THAN <br /> JUST A <span className="text-gradient-gold font-serif italic">Haircut</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/70">
              The Brother's Styling is New Lambton's home for modern barbering. We combine skill, creativity and old-school hospitality to make every client leave looking — and feeling — their best. Our team is passionate about the craft, and it shows in every line, every fade, every trim.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="rounded-md border border-white/10 bg-obsidian-2 p-8"
              >
                <div className="font-display text-5xl text-gold md:text-6xl">
                  {s.label === "Daily Hours" ? "11am–9pm" : (
                    s.float ? <>4.6{s.suffix}</> : <Counter to={s.val} suffix={s.suffix} />
                  )}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
