import { useEffect, useRef, useState } from "react";
import { CheckCircle, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Square deposit card payment widget.
//
// ACTION REQUIRED before going live — set these in your .env (see .env.example):
//   VITE_SQUARE_APP_ID       — Square "Application ID" (public, safe to expose)
//   VITE_SQUARE_LOCATION_ID  — Square "Location ID" (public, safe to expose)
//   VITE_SQUARE_ENV          — "sandbox" while testing, "production" to go live
//
// The actual charge is processed server-side by the Netlify function at
// netlify/functions/create-payment.ts using SQUARE_ACCESS_TOKEN (kept secret,
// never exposed to the browser). See that file + .env.example for setup.
// ─────────────────────────────────────────────────────────────────────────────

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID as string | undefined;
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID as string | undefined;
const SQUARE_ENV = (import.meta.env.VITE_SQUARE_ENV as string | undefined) ?? "sandbox";

const SQUARE_SDK_URL =
  SQUARE_ENV === "production" ? "https://web.squarecdn.com/v1/square.js" : "https://sandbox.web.squarecdn.com/v1/square.js";

declare global {
  interface Window {
    Square?: any;
  }
}

let sdkLoadPromise: Promise<void> | null = null;
function loadSquareSdk(): Promise<void> {
  if (window.Square) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;
  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SQUARE_SDK_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Square payment SDK"));
    document.head.appendChild(script);
  });
  return sdkLoadPromise;
}

interface SquareDepositProps {
  /** Deposit amount in whole/decimal dollars, e.g. 20 for $20.00 */
  amount: number;
  /** Human label of the service the deposit is for, sent to the payment function for records */
  serviceName: string;
  paid: boolean;
  onPaid: (paymentId: string) => void;
}

export function SquareDeposit({ amount, serviceName, paid, onPaid }: SquareDepositProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<any>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "paying" | "error" | "config-missing">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paid) return;

    if (!SQUARE_APP_ID || !SQUARE_LOCATION_ID) {
      setStatus("config-missing");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await loadSquareSdk();
        if (cancelled || !window.Square) return;
        const payments = window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
        const card = await payments.card();
        if (cancelled) return;
        if (cardContainerRef.current) {
          await card.attach(cardContainerRef.current);
        }
        cardRef.current = card;
        setStatus("ready");
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Couldn't load the payment form. Please refresh and try again, or call us directly.");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      cardRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  const payDeposit = async () => {
    if (!cardRef.current) return;
    setStatus("paying");
    setError(null);
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK") {
        throw new Error(result.errors?.[0]?.message || "Card details couldn't be verified.");
      }

      const res = await fetch("/.netlify/functions/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: result.token,
          amount, // dollars — converted to cents server-side
          serviceName,
          idempotencyKey: crypto.randomUUID(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Payment failed. Please check your card details and try again.");
      }

      onPaid(data.paymentId as string);
    } catch (err: any) {
      setError(err.message || "Something went wrong processing your deposit.");
      setStatus("ready");
    }
  };

  if (paid) {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
        <CheckCircle size={16} className="shrink-0" />
        ${amount.toFixed(2)} deposit paid — your booking is secured.
      </div>
    );
  }

  if (status === "config-missing") {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
        <AlertCircle size={16} className="shrink-0" />
        Online deposit payment isn't configured yet (missing Square credentials). Please call us at (02) 4969 8123 to
        confirm this booking.
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-sm border border-gold/30 bg-gold/5 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
        <ShieldCheck size={16} className="text-gold" />
        ${amount.toFixed(2)} deposit required to confirm this booking
      </div>
      <p className="mb-4 text-xs text-white/50">
        This service is $100 or more, so a 20% deposit is taken now to secure your appointment. The remaining balance
        is paid in-salon.
      </p>

      <div ref={cardContainerRef} className="rounded-sm bg-white p-3" style={{ minHeight: 90 }} />

      {status === "loading" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
          <Loader2 size={14} className="animate-spin" /> Loading secure payment form…
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <AlertCircle size={14} className="shrink-0" /> {error}
        </div>
      )}

      <button
        type="button"
        onClick={payDeposit}
        disabled={status !== "ready" && status !== "error"}
        className="mt-4 w-full rounded-sm bg-gold py-3 text-xs font-bold uppercase tracking-[0.25em] text-obsidian transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "paying" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Processing…
          </span>
        ) : (
          `Pay $${amount.toFixed(2)} Deposit`
        )}
      </button>
    </div>
  );
}
