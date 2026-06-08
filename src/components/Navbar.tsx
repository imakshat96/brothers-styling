import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import logo from "../assets/logo.webp";

const NAV_LINKS = [
  { label: "Services", hash: "services" },
  { label: "Gallery", hash: "gallery" },
  { label: "Reviews", hash: "reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isBooking = location.pathname === "/booking";

  // When landing on / with a hash (e.g. navigating from /booking → /#services),
  // wait for the page to render then smooth-scroll to the target section.
  useEffect(() => {
    if (!isHome || !location.hash) return;
    const id = location.hash.slice(1); // strip the leading #
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(t);
  }, [isHome, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Anchor section links — scroll directly on home, navigate with hash from other routes.
  const handleAnchor = (hash: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ to: "/", hash });
    }
  };

  // Book Now — scroll to top if already on /booking, otherwise navigate there.
  const handleBookNow = () => {
    setOpen(false);
    if (isBooking) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/booking" });
    }
  };

  const linkClass =
    "text-sm uppercase tracking-widest text-white/80 transition hover:text-gold bg-transparent border-0 cursor-pointer p-0";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass" : "bg-transparent"}`}
    >
      <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between px-6 py-3">

        {/* FIX 3 — Logo: always SPA-navigates to / without a full page reload */}
        <Link to="/">
          <img src={logo} alt="The Brother's Styling" className="h-16 md:h-20 object-contain" />
        </Link>

        {/* Desktop nav — section links as buttons, Book Now handled separately */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => handleAnchor(l.hash)}
              className={linkClass}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* FIX 1 & 4 — Gold Book Now button: proper SPA nav + top-scroll if already on /booking */}
        <button
          onClick={handleBookNow}
          className="hidden rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-soft md:inline-block"
        >
          Book Now
        </button>

        <button onClick={() => setOpen(true)} className="md:hidden text-white" aria-label="Menu">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-obsidian md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <img src={logo} alt="The Brother's Styling" className="h-14 object-contain" />
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={28} /></button>
            </div>

            <nav className="flex flex-col gap-6 px-8 pt-12">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleAnchor(l.hash)}
                  className="font-display text-4xl tracking-wide text-white hover:text-gold text-left bg-transparent border-0 cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={handleBookNow}
                className="mt-6 inline-block w-fit rounded-sm bg-gold px-6 py-3 font-semibold uppercase tracking-widest text-obsidian"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
