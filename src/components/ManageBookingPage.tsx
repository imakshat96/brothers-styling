import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle, Loader2, Calendar, XCircle, ShieldCheck } from "lucide-react";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { FloatingCall } from "./FloatingCall";

// ─────────────────────────────────────────────────────────────────────────────
// Reached from the "Cancel or manage your booking" link in the confirmation
// email. Shows the real appointment (pulled live from Square) and lets the
// customer cancel it themselves — full deposit refund automatically if it's
// 24+ hours before the appointment, no refund inside that window, per the
// salon's policy. Cancelling only ever happens on the explicit button click,
// never just from loading this page.
// ─────────────────────────────────────────────────────────────────────────────

interface Preview {
  success: boolean;
  startAt?: string;
  serviceName?: string;
  alreadyCancelled?: boolean;
  hoursUntil?: number;
  refundEligible?: boolean;
  depositAmount?: number | null;
  cancellationWindowHours?: number;
  error?: string;
}

interface CancelResult {
  success: boolean;
  cancelled?: boolean;
  refunded?: boolean;
  refundAmount?: number | null;
  refundError?: string;
  error?: string;
}

export function ManageBookingPage() {
  const search = useSearch({ strict: false }) as { bookingId?: string; paymentId?: string };
  const { bookingId, paymentId } = search;

  const [preview, setPreview] = useState<Preview | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "confirming" | "cancelling" | "done" | "error">("loading");
  const [result, setResult] = useState<CancelResult | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setStatus("error");
      return;
    }
    (async () => {
      try {
        const params = new URLSearchParams({ bookingId, ...(paymentId ? { paymentId } : {}) });
        const res = await fetch(`/.netlify/functions/cancel-booking?${params.toString()}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          setPreview(data);
          setStatus("error");
          return;
        }
        setPreview(data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    })();
  }, [bookingId, paymentId]);

  const confirmCancel = async () => {
    if (!bookingId) return;
    setStatus("cancelling");
    try {
      const res = await fetch("/.netlify/functions/cancel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, paymentId }),
      });
      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch {
      setResult({ success: false, error: "Couldn't reach the booking system. Please call us directly." });
      setStatus("done");
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-white">
      <CustomCursor />
      <Navbar />
      <FloatingCall />

      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition hover:text-gold">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-md border border-white/8 bg-obsidian-2 p-8 md:p-10"
        >
          <h1 className="font-display text-3xl tracking-wide">Manage Your Booking</h1>

          {status === "loading" && (
            <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
              <Loader2 size={16} className="animate-spin" /> Loading your appointment…
            </div>
          )}

          {status === "error" && !preview?.success && (
            <div className="mt-6 flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={16} className="shrink-0" />
              {bookingId
                ? preview?.error || "Couldn't find that booking. Please call us at (02) 4969 8123."
                : "This link is missing booking details. Please call us at (02) 4969 8123."}
            </div>
          )}

          {(status === "ready" || status === "confirming" || status === "cancelling") && preview?.success && (
            <>
              <div className="mt-6 flex items-start gap-3 rounded-sm border border-gold/30 bg-gold/5 p-5">
                <Calendar size={18} className="mt-0.5 shrink-0 text-gold" />
                <div className="text-sm">
                  <p className="font-medium text-white">{preview.serviceName}</p>
                  <p className="mt-1 text-white/60">
                    {preview.startAt &&
                      new Date(preview.startAt).toLocaleString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
              </div>

              {preview.alreadyCancelled ? (
                <div className="mt-5 flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                  <XCircle size={16} className="shrink-0" />
                  This booking has already been cancelled.
                </div>
              ) : (
                <>
                  <div className="mt-5 flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
                    <ShieldCheck size={14} className="shrink-0 text-gold" />
                    {preview.refundEligible
                      ? `You're cancelling ${preview.hoursUntil}+ hours ahead — your ${preview.depositAmount != null ? `$${preview.depositAmount.toFixed(2)} ` : ""}deposit will be fully refunded automatically.`
                      : `This is within ${preview.cancellationWindowHours} hours of your appointment, so per our policy the deposit isn't refundable.`}
                  </div>

                  {status === "ready" ? (
                    <button
                      onClick={() => setStatus("confirming")}
                      className="mt-6 w-full rounded-sm border border-red-500/40 py-3 text-xs font-bold uppercase tracking-[0.25em] text-red-400 transition hover:bg-red-500/10"
                    >
                      Cancel This Booking
                    </button>
                  ) : (
                    <div className="mt-6 space-y-3">
                      <p className="text-center text-sm text-white/70">Are you sure you want to cancel?</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setStatus("ready")}
                          className="flex-1 rounded-sm border border-white/15 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white/70 transition hover:bg-white/5"
                        >
                          Keep Booking
                        </button>
                        <button
                          onClick={confirmCancel}
                          disabled={status === "cancelling"}
                          className="flex-1 rounded-sm bg-red-500/90 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {status === "cancelling" ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 size={14} className="animate-spin" /> Cancelling…
                            </span>
                          ) : (
                            "Yes, Cancel"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {status === "done" && result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              {result.success ? (
                <div className="flex items-start gap-3 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  <CheckCircle size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Your booking has been cancelled.{" "}
                    {result.refunded
                      ? `A $${result.refundAmount?.toFixed(2)} refund has been issued to your original payment method.`
                      : result.refundError
                        ? `Note: ${result.refundError}`
                        : "No deposit was refunded, per the 24-hour cancellation policy."}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={16} className="shrink-0" />
                  {result.error || "Something went wrong. Please call us at (02) 4969 8123."}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
