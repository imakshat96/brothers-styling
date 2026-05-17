import { Phone } from "lucide-react";

export function FloatingCall() {
  return (
    <a
      href="tel:+61249698123"
      aria-label="Call The Brother's Styling"
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-obsidian shadow-[0_0_30px_rgba(200,169,81,0.6)] transition hover:scale-110 hover:bg-gold-soft"
      style={{ zIndex: 9999 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
      <Phone size={22} className="relative" strokeWidth={2.5} />
    </a>
  );
}
