import { motion } from "framer-motion";

const items = [
  { emoji: "📍", text: "Local salon in New Lambton" },
  { emoji: "✂️", text: "Barber + hairstylist services" },
  { emoji: "👤", text: "Men's and women's services" },
  { emoji: "🎨", text: "Professional colour work" },
  { emoji: "💬", text: "Friendly consultation before every service" },
];

export function TrustBar() {
  return (
    <div className="border-y border-white/8 bg-obsidian-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center divide-y divide-white/8 px-6 md:divide-y-0 md:divide-x md:flex-nowrap"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-center gap-3 px-6 py-4 text-center md:w-auto md:py-5"
          >
            <span className="text-lg leading-none" role="img" aria-hidden="true">{item.emoji}</span>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
