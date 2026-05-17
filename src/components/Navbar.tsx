import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book Now", href: "#book" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-2xl tracking-wider">
          <span className="text-gold italic font-serif font-semibold">The</span> BROTHER'S <span className="text-gold italic font-serif font-semibold">Styling</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm uppercase tracking-widest text-white/80 transition hover:text-gold">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-soft md:inline-block"
        >
          Book Now
        </a>

        <button onClick={() => setOpen(true)} className="md:hidden text-white" aria-label="Menu">
          <Menu size={28} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-obsidian md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-xl"><span className="text-gold italic font-serif">The</span> BROTHER'S <span className="text-gold italic font-serif">Styling</span></span>
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={28} /></button>
            </div>
            <nav className="flex flex-col gap-6 px-8 pt-12">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl tracking-wide text-white hover:text-gold">
                  {l.label}
                </a>
              ))}
              <a href="#book" onClick={() => setOpen(false)} className="mt-6 inline-block w-fit rounded-sm bg-gold px-6 py-3 font-semibold uppercase tracking-widest text-obsidian">
                Book Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
