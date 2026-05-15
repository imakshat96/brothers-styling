const items = [
  "FRESH FADES", "BEARD GROOMING", "HAIR COLOUR", "SKIN FADE",
  "FACIALS", "PREMIUM STYLING", "NEW LAMBTON'S FINEST", "WALK-INS WELCOME",
];

export function Marquee() {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-obsidian py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap font-display text-3xl uppercase tracking-wide text-foreground md:text-5xl">
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{t}</span>
            <span className="text-gold">✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}
