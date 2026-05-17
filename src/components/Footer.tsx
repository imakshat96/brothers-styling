import { Instagram, Facebook, MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-obsidian-2 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl tracking-wider">
            <span className="font-serif italic font-semibold text-gold">The</span> BROTHER'S <span className="font-serif italic font-semibold text-gold">Styling</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/60">New Lambton's Premier Barbershop.</p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.instagram.com/thebrothersstyling/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-sm border border-white/15 p-2.5 text-white/70 transition hover:border-gold hover:text-gold"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/p/The-Brothers-Styling-61580347974769/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-sm border border-white/15 p-2.5 text-white/70 transition hover:border-gold hover:text-gold"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl tracking-widest text-white">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[["Services", "#services"], ["Gallery", "#gallery"], ["Reviews", "#reviews"], ["Book", "#book"]].map(([l, h]) => (
              <li key={l}><a href={h} className="text-white/60 transition hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl tracking-widest text-white">Find Us</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> Shop 2/74 Orchardtown Road, New Lambton NSW 2305</li>
            <li className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
              <div className="space-y-1">
                <div>Mon, Wed – Sat <span className="text-white/50">· 11am – 9pm</span></div>
                <div>Sunday <span className="text-white/50">· 11am – 7:20pm</span></div>
                <div>Tuesday <span className="text-red-400/70">· Closed</span></div>
              </div>
            </li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /> <a href="tel:0249698123" className="hover:text-gold">(02) 4969 8123</a></li>
            <li>
              <a href="https://maps.google.com/?q=Shop+2%2F74+Orchardtown+Road,+New+Lambton+NSW+2305" target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                View on Google Maps →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © 2025 The Brother's Styling · Built with <span className="text-gold">❤</span> in Newcastle
      </div>
    </footer>
  );
}
