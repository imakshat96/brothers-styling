import { useEffect, useState } from "react";

// 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
// null = closed all day; otherwise open/close in total minutes from midnight
const SCHEDULE: Record<number, { open: number; close: number } | null> = {
  0: { open: 11 * 60,       close: 19 * 60 + 20 }, // Sun  11am – 7:20pm
  1: { open: 11 * 60,       close: 21 * 60 },       // Mon  11am – 9pm
  2: null,                                            // Tue  Closed
  3: { open: 11 * 60,       close: 21 * 60 },       // Wed  11am – 9pm
  4: { open: 11 * 60,       close: 21 * 60 },       // Thu  11am – 9pm
  5: { open: 11 * 60,       close: 21 * 60 },       // Fri  11am – 9pm
  6: { open: 11 * 60,       close: 21 * 60 },       // Sat  11am – 9pm
};

function getSydneyParts() {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value ?? 0);
  const weekday = parts.find(p => p.type === "weekday")?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return { h: get("hour"), m: get("minute"), s: get("second"), day: dayIndex };
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

  const todaySchedule = SCHEDULE[now.day];
  const totalMin = now.h * 60 + now.m;
  const isOpen = todaySchedule !== null &&
    totalMin >= todaySchedule.open &&
    totalMin < todaySchedule.close;

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
