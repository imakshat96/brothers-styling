import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/6 bg-obsidian-2 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold/70">Get In Touch</span>
          <h2 className="mt-2 font-display text-5xl tracking-tight md:text-7xl">
            VISIT <span className="text-gradient-gold font-serif italic">Us</span>
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold/30 text-gold">
                <MapPin size={18} />
              </div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">Location</span>
            </div>
            <div className="pl-13 text-white/80">
              <p className="text-base font-medium text-white">Shop 2/74 Orchardtown Road</p>
              <p className="text-sm text-white/55">New Lambton NSW 2305</p>
            </div>
            <a
              href="https://maps.google.com/?q=Shop+2%2F74+Orchardtown+Road,+New+Lambton+NSW+2305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold transition hover:text-gold-soft"
            >
              Open in Maps <ArrowRight size={12} />
            </a>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold/30 text-gold">
                <Clock size={18} />
              </div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">Opening Hours</span>
            </div>
            <ul className="space-y-1.5 text-sm">
              <li className="flex justify-between">
                <span className="text-white/55">Mon, Wed – Sat</span>
                <span className="text-white">11am – 9pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/55">Sunday</span>
                <span className="text-white">11am – 7:20pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/55">Tuesday</span>
                <span className="text-red-400/70">Closed</span>
              </li>
            </ul>
          </motion.div>

          {/* Phone + Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold/30 text-gold">
                <Phone size={18} />
              </div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">Contact</span>
            </div>
            <div className="space-y-2 text-sm">
              <a
                href="tel:0249698123"
                className="block text-base font-medium text-white transition hover:text-gold"
              >
                (02) 4969 8123
              </a>
              <a
                href="https://instagram.com/thebrothersstyling"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/55 transition hover:text-gold"
              >
                <Instagram size={14} />
                @thebrothersstyling
              </a>
            </div>
          </motion.div>

        </div>

        {/* Book Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-start gap-5 rounded-md border border-gold/20 bg-obsidian p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-2xl tracking-wide md:text-3xl">
              Ready to <span className="font-serif italic text-gradient-gold">book?</span>
            </h3>
            <p className="mt-1 text-sm text-white/50">Walk-ins welcome when available. Call us to check.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0249698123"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:border-gold hover:text-gold"
            >
              <Phone size={14} /> Call Now
            </a>
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(200,169,81,0.4)]"
            >
              Book Now
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
