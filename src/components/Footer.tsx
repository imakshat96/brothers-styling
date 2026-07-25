import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import logo from "../assets/logo.webp";

const NAV_LINKS = [
  { label: "Services", hash: "services" },
  { label: "Gallery", hash: "gallery" },
  { label: "Reviews", hash: "reviews" },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleAnchor = (hash: string) => {
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ to: "/", hash });
    }
  };

  return (
    <footer
      style={{ background: "#0a0a0a", borderTop: "1px solid #2a2a2a" }}
      className="px-6 py-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-3">

        {/* Left: Logo + tagline */}
        <div>
          <Link to="/">
            <img src={logo} alt="The Brother's Styling" className="h-32 object-contain" />
          </Link>
        </div>

        {/* Centre: Quick nav links */}
        <nav className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 md:justify-center">
          {NAV_LINKS.map(({ label, hash }) => (
            <button
              key={label}
              onClick={() => handleAnchor(hash)}
              className="border-0 bg-transparent p-0 text-xs uppercase tracking-widest text-white/50 transition hover:text-gold cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {label}
            </button>
          ))}
          <Link
            to="/booking"
            className="text-xs uppercase tracking-widest text-white/50 transition hover:text-gold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Book Now
          </Link>
        </nav>

        {/* Right: Instagram + copyright */}
        <div className="flex flex-col items-start gap-2 md:items-end">
          <a
            href="https://instagram.com/thebrothersstyling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gold transition hover:text-gold-soft"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Instagram size={14} />
            @thebrothersstyling
          </a>
          <a
            href="https://facebook.com/thebrothersstyling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gold transition hover:text-gold-soft"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Facebook size={14} />
            The Brother's Styling
          </a>
          <p
            style={{
              color: "#a0a0a0",
              fontSize: 11,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © 2025 The Brother's Styling. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
