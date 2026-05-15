const items = [
  "FRESH FADES", "BEARD GROOMING", "HAIR COLOUR", "SKIN FADE",
  "FACIALS", "PREMIUM STYLING", "NEW LAMBTON'S FINEST",
];

export function Marquee() {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-obsidian-2 py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl tracking-wider text-gold md:text-5xl">
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t} <span className="text-gold/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
