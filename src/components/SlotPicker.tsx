import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Loader2, AlertCircle, Clock3 } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Real appointment slot picker — replaces the old "Morning/Afternoon/Evening"
// guess with actual open times pulled live from the client's Square
// Appointments calendar (netlify/functions/search-availability.mts).
//
// If the chosen service isn't mapped to a real Square catalog item yet
// (src/lib/square-catalog-map.ts), the search comes back with
// `reason: "not_bookable_online"` and this component tells the parent via
// onNotBookable so BookingPage can fall back to the old request-only flow.
// ─────────────────────────────────────────────────────────────────────────────

export interface SelectedSlot {
  startAt: string; // ISO timestamp
  teamMemberId: string;
  durationMinutes: number;
}

interface Slot {
  startAt: string;
  teamMemberId: string;
  durationMinutes: number;
}

interface SlotPickerProps {
  serviceName: string;
  value: SelectedSlot | null;
  onChange: (slot: SelectedSlot | null) => void;
  onNotBookable: () => void;
}

function dayKey(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
}

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function SlotPicker({ serviceName, value, onChange, onNotBookable }: SlotPickerProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setSlots([]);
    setSelectedDay(null);
    onChange(null);

    (async () => {
      try {
        const res = await fetch("/.netlify/functions/search-availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceName, daysAhead: 21 }),
        });
        const data = await res.json();
        if (cancelled) return;

        if (data.reason === "not_bookable_online") {
          onNotBookable();
          return;
        }
        if (!res.ok || !data.success) {
          setStatus("error");
          return;
        }

        const fetchedSlots: Slot[] = data.slots ?? [];
        setSlots(fetchedSlots);
        if (fetchedSlots.length === 0) {
          setStatus("empty");
        } else {
          setStatus("ready");
          setSelectedDay(dayKey(fetchedSlots[0].startAt));
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceName]);

  const days = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = dayKey(slot.startAt);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(slot);
    }
    return Array.from(map.entries()); // preserves insertion order = chronological
  }, [slots]);

  const timesForSelectedDay = days.find(([key]) => key === selectedDay)?.[1] ?? [];

  if (status === "loading") {
    return (
      <div className="mt-5 flex items-center gap-2 rounded-sm border border-white/10 bg-obsidian-2 px-4 py-4 text-xs text-white/40">
        <Loader2 size={14} className="animate-spin" /> Loading available times…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
        <AlertCircle size={16} className="shrink-0" />
        Couldn't load live availability. Please call us at (02) 4969 8123 to book, or try again shortly.
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
        <AlertCircle size={16} className="shrink-0" />
        No open times in the next 3 weeks. Please call us at (02) 4969 8123 to check other options.
      </div>
    );
  }

  return (
    <div className="mt-5">
      <label className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        <CalendarDays size={13} /> Choose a date *
      </label>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map(([key, daySlots]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedDay(key)}
            className={`shrink-0 rounded-sm border px-4 py-2.5 text-xs font-medium transition ${
              selectedDay === key
                ? "border-gold bg-gold/15 text-gold"
                : "border-white/10 bg-obsidian-2 text-white/60 hover:border-white/25"
            }`}
          >
            {dayLabel(daySlots[0].startAt)}
          </button>
        ))}
      </div>

      <label className="mb-2 mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        <Clock3 size={13} /> Choose a time *
      </label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {timesForSelectedDay.map((slot) => {
          const isSelected = value?.startAt === slot.startAt && value?.teamMemberId === slot.teamMemberId;
          return (
            <button
              key={`${slot.startAt}-${slot.teamMemberId}`}
              type="button"
              onClick={() => onChange({ startAt: slot.startAt, teamMemberId: slot.teamMemberId, durationMinutes: slot.durationMinutes })}
              className={`rounded-sm border px-3 py-2.5 text-xs font-medium transition ${
                isSelected
                  ? "border-gold bg-gold text-obsidian"
                  : "border-white/10 bg-obsidian-2 text-white/70 hover:border-gold/40"
              }`}
            >
              {timeLabel(slot.startAt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
