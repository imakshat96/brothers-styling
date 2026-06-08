import { Instagram, Facebook } from "lucide-react";
import logo from "../assets/logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-obsidian-2 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <img src={logo} alt="The Brother's Styling" className="h-32 md:h-40 object-contain" />
          <p className="mt-3 max-w-xs text-sm text-white/55">New Lambton's premier barbershop & hair salon.</p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.instagram.com/thebrothersstyling/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-sm border border-white/15 p-2.5 text-white/60 transition hover:border-gold hover:text-gold">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/p/The-Brothers-Styling-61580347974769/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-sm border border-white/15 p-2.5 text-white/60 transition hover:border-gold hover:text-gold">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display text-lg tracking-widest text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["Women's Services", "#womens-services"],
              ["Men's Services", "#services"],
              ["Our Work", "#gallery"],
              ["Reviews", "#reviews"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <li key={l}><a href={h} className="text-white/55 transition hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="font-display text-lg tracking-widest text-white">Follow Our Work</h4>
          <p className="mt-4 text-sm text-white/55">See daily transformations on Instagram — reels, before & afters, and more.</p>
          <a
            href="https://www.instagram.com/thebrothersstyling/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition hover:text-gold-soft"
          >
            <Instagram size={15} />
            @thebrothersstyling
          </a>

          <div className="mt-6">
            <a
              href="/booking"
              className="inline-block rounded-sm bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] text-obsidian transition hover:bg-gold-soft"
            >
              Book Now
            </a>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2025 The Brother's Styling · New Lambton NSW · Built with <span className="text-gold">❤</span> in Newcastle
      </div>
    </footer>
  );
}
