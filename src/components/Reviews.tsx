import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { text: "Had quality haircut, good service, friendly staff — always offer some freebies.", name: "Aman Malik" },
  { text: "Beyond the exceptional haircuts, the atmosphere is top-notch and the staff are friendly.", name: "Aman Sharma" },
  { text: "Ash did an amazing job with my colour and gave great advice. Very friendly staff.", name: "Hamu Jawanda" },
  { text: "Best fade and cut I've had in a long time! Super clean fade, sharp lines.", name: "Abhishek Saini" },
  { text: "After a long time since coming to Australia, I finally found a good barber.", name: "Mirza Imran" },
  { text: "Ash is KING 👑", name: "Maulik Parmar" },
];

function ReviewCard({ r, i }: { r: typeof reviews[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (i % reviews.length) * 0.1 }}
      className="w-[340px] shrink-0 rounded-md border border-white/10 bg-obsidian-2 p-8 md:w-[420px]"
    >
      <div className="flex gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={16} fill="#c8a951" stroke="#c8a951" />
        ))}
      </div>
      <p className="mt-5 min-h-[100px] text-base leading-relaxed text-white/85">"{r.text}"</p>
      <div className="mt-6 border-t border-white/10 pt-4 font-serif italic text-gold">— {r.name}</div>
    </motion.div>
  );
}

export function Reviews() {
  const list = [...reviews, ...reviews];
  return (
    <section id="reviews" className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto mb-16 max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl tracking-tight md:text-7xl"
        >
          WHAT THE <span className="text-gradient-gold font-serif italic">Clients</span> SAY
        </motion.h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
        <div className="flex w-max animate-marquee gap-6 px-6">
          {list.map((r, i) => <ReviewCard key={i} r={r} i={i} />)}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="mx-auto mt-16 flex max-w-fit items-center gap-4 rounded-full border border-gold/30 bg-obsidian-2 px-6 py-3"
      >
        <span className="font-bold text-lg">
          <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
        </span>
        <span className="h-4 w-px bg-white/20" />
        <span className="text-sm tracking-widest text-white/80">4.6 ★ Google Rating</span>
      </motion.div>
    </section>
  );
}
