import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef } from "react";

const reviews = [
  { text: "Quality haircut, good service, friendly staff — always offer some freebies.", name: "Aman Malik" },
  { text: "Beyond exceptional haircuts, the atmosphere is top-notch and the staff are friendly.", name: "Aman Sharma" },
  { text: "Ash did an amazing job with my colour and gave great advice. Very friendly.", name: "Hamu Jawanda" },
  { text: "Best fade and cut I've had in a long time. Super clean fade, sharp lines.", name: "Abhishek Saini" },
  { text: "After a long time in Australia, I finally found a good barber.", name: "Mirza Imran" },
  { text: "Ash is KING.", name: "Maulik Parmar" },
];

function ReviewCard({ r, i }: { r: typeof reviews[number]; i: number }) {
  return (
    <article className="snap-start w-[300px] shrink-0 border border-white/10 bg-obsidian p-8 transition hover:border-gold md:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} size={14} fill="currentColor" stroke="currentColor" />
          ))}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          N° {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-6 min-h-[110px] text-base leading-snug text-white/85">"{r.text}"</p>
      <div className="mt-6 border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
        {r.name}
      </div>
    </article>
  );
}

export function Reviews() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="reviews" className="grain relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto mb-14 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" /> Word On The Street
          </div>
          <h2 className="font-display text-6xl uppercase leading-[0.85] tracking-tight md:text-8xl">
            53 Reviews. <br />4.6 Stars.
          </h2>
        </motion.div>

        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          <span>← Drag / Scroll →</span>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-obsidian to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-obsidian to-transparent md:w-32" />
        <div
          ref={ref}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4"
        >
          {reviews.map((r, i) => <ReviewCard key={i} r={r} i={i} />)}
          <div className="shrink-0 pr-2" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="mx-auto mt-16 flex max-w-fit items-center gap-4 border border-gold/30 bg-obsidian-2 px-6 py-3"
      >
        <span className="font-bold text-lg">
          <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
        </span>
        <span className="h-4 w-px bg-white/20" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">4.6 ★ · 53 Reviews</span>
      </motion.div>
    </section>
  );
}
