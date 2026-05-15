import { useEffect, useState } from "react";

function getSydneyParts() {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value ?? 0);
  return { h: get("hour"), m: get("minute"), s: get("second") };
}

function formatDisplay(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m.toString().padStart(2, "0")} ${period}`;
}

export function OpenStatus() {
  const [now, setNow] = useState(getSydneyParts);

  useEffect(() => {
    const id = setInterval(() => setNow(getSydneyParts()), 1000);
    return () => clearInterval(id);
  }, []);

  // Open daily 11am – 9pm Sydney time
  const isOpen = now.h >= 11 && now.h < 21;

  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em]">
      <span className="tabular-nums text-white/70">{formatDisplay(now.h, now.m)} AEST</span>
      <span className="h-3 w-px bg-white/20" />
      <span className={`flex items-center gap-2 font-semibold ${isOpen ? "text-emerald-400" : "text-red-400"}`}>
        <span className="relative flex h-2 w-2">
          {isOpen && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-500"}`} />
        </span>
        {isOpen ? "Open Now" : "Closed Now"}
      </span>
    </div>
  );
}
