import { motion } from "framer-motion";
import { Play, Instagram, ArrowRight } from "lucide-react";

const beforeAfterPairs = [
  { label: "Balayage Transformation" },
  { label: "Skin Fade & Beard" },
  { label: "Brunette Colour" },
  { label: "Women's Restyle" },
];

const reelPlaceholders = [
  { caption: "Fresh skin fade ✂️" },
  { caption: "Balayage reveal 🎨" },
  { caption: "Nanoplasty result ✨" },
];

export function OurWork() {
  return (
    <section id="gallery" className="relative border-t border-white/6 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold/70">Portfolio</span>
          <h2 className="mt-2 font-display text-5xl tracking-tight md:text-7xl">
            OUR <span className="text-gradient-gold font-serif italic">Work</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
            Every cut, colour and transformation — done with precision and care.
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {beforeAfterPairs.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="overflow-hidden rounded-md border border-white/8 bg-obsidian-2"
            >
              <div className="flex">
                {/* Before */}
                <div className="relative flex-1">
                  <div className="aspect-[4/5] w-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-white/20">Photo Coming Soon</span>
                  </div>
                  <div className="absolute left-3 top-3 rounded-sm bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
                    Before
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-gold/20" />

                {/* After */}
                <div className="relative flex-1">
                  <div className="aspect-[4/5] w-full bg-gradient-to-br from-gold/8 to-gold/15 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-white/20">Photo Coming Soon</span>
                  </div>
                  <div className="absolute left-3 top-3 rounded-sm bg-gold/20 px-2.5 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur-sm">
                    After
                  </div>
                </div>
              </div>

              <div className="border-t border-white/8 px-4 py-3">
                <span className="text-xs uppercase tracking-widest text-white/50">{pair.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reels section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-gold/70">Instagram</span>
              <h3 className="mt-1 font-display text-3xl tracking-tight md:text-4xl">
                Reels & Latest <span className="font-serif italic text-gradient-gold">Looks</span>
              </h3>
            </div>
            <a
              href="https://instagram.com/thebrothersstyling"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-xs uppercase tracking-widest text-gold transition hover:text-gold-soft sm:flex"
            >
              View All <ArrowRight size={14} />
            </a>
          </div>

          {/* Reel placeholders */}
          <div className="grid gap-4 grid-cols-3">
            {reelPlaceholders.map((reel, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/thebrothersstyling"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-md border border-white/8 bg-obsidian-2"
              >
                <div className="aspect-[9/16] w-full bg-gradient-to-b from-white/5 via-white/3 to-gold/10 transition-all duration-500 group-hover:from-white/8 group-hover:to-gold/15" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition group-hover:border-gold group-hover:text-gold">
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>

                {/* Instagram icon top right */}
                <div className="absolute right-3 top-3 text-white/40 group-hover:text-gold transition">
                  <Instagram size={16} />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-[11px] text-white/70">{reel.caption}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 rounded-md border border-white/8 bg-obsidian-2 py-8 text-center sm:flex-row sm:justify-center sm:gap-5"
        >
          <Instagram size={20} className="text-gold" />
          <span className="text-sm text-white/60">
            Follow us for daily inspiration and transformation reels
          </span>
          <a
            href="https://instagram.com/thebrothersstyling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gold transition hover:bg-gold/10"
          >
            @thebrothersstyling <ArrowRight size={12} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
