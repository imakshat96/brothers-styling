import { Instagram, Facebook, MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-obsidian px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl uppercase tracking-tight text-foreground">
            The Brother's <span className="text-gold">Styling</span>
          </div>
          <p className="mt-4 max-w-xs text-xs uppercase tracking-[0.25em] text-white/50">
            New Lambton's Premier Barbershop · Est NSW
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#" aria-label="Instagram" className="border border-white/15 p-2.5 text-white/70 transition hover:border-gold hover:text-gold"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="border border-white/15 p-2.5 text-white/70 transition hover:border-gold hover:text-gold"><Facebook size={16} /></a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Index</h4>
          <ul className="mt-5 space-y-3 text-sm font-medium uppercase tracking-wider">
            {[["Services", "#services"], ["The House", "#about"], ["Reviews", "#reviews"], ["Book", "#book"]].map(([l, h]) => (
              <li key={l}><a href={h} className="text-white/70 transition hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Find Us</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin size={14} className="mt-1 shrink-0 text-gold" /> Shop 2/74 Orchardtown Road, New Lambton NSW 2305</li>
            <li className="flex gap-3"><Clock size={14} className="mt-1 shrink-0 text-gold" /> Open daily 11am – 9pm</li>
            <li className="flex gap-3"><Phone size={14} className="mt-1 shrink-0 text-gold" /> <a href="tel:0249698123" className="hover:text-gold">(02) 4969 8123</a></li>
            <li>
              <a href="https://maps.google.com/?q=Shop+2%2F74+Orchardtown+Road,+New+Lambton+NSW+2305" target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                View on Google Maps →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
        <span>© 2025 The Brother's Styling</span>
        <span>Built in Newcastle · NSW</span>
      </div>
    </footer>
  );
}
