import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, MapPin, Clock, Phone, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { FloatingCall } from "./FloatingCall";

// ─────────────────────────────────────────────────────────────────────────────
// ACTION REQUIRED: Replace these placeholders with real values from your
// EmailJS dashboard at https://dashboard.emailjs.com/
//
// To send to two recipients (barber + receptionist), add a CC field in your
// EmailJS template settings under "To email" and "CC" using template variables.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const SERVICES = [
  // Men's
  "Fade",
  "Skin Fade",
  "Beard Trim",
  "Haircut + Beard",
  "Perming",
  "Grey Coverage",
  "Face Cleanup",
  // Women's
  "Brunette Transformations",
  "Balayage & Foilyage",
  "Toner & Colour Correction",
  "Women's Haircut",
  "Nanoplasty",
  "Hair Botox",
  // Other
  "Other",
];

const TIMES = ["Morning (9am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–9pm)"];

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const EMPTY: FormState = { fullName: "", phone: "", email: "", service: "", date: "", time: "", notes: "" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-white/10 bg-obsidian-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/20";

export function BookingPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const today = new Date().toISOString().split("T")[0];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // EmailJS template variables — configure your template to map these fields.
      // Add a CC in your template to notify both the barber and receptionist.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.fullName,
          phone: form.phone,
          from_email: form.email,
          service: form.service,
          preferred_date: form.date,
          preferred_time: form.time,
          notes: form.notes || "None provided",
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-white">
      <CustomCursor />
      <Navbar />
      <FloatingCall />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">

        {/* Back link — FIX 3: SPA navigation, no full reload */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition hover:text-gold"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr]">

          {/* ─── Left info panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pt-4"
          >
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: "left" }}
              className="mb-6 h-px w-16 bg-gold"
            />

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/8 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">New Lambton</span>
            </div>

            <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              REQUEST AN<br />
              <span className="font-serif italic text-gradient-gold">Appointment</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Fill in your details below and we'll call you to confirm a time that works for you. Walk-ins always welcome when available.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/8 pt-8">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <div className="text-sm">
                  <p className="font-medium text-white">Shop 2/74 Orchardtown Road</p>
                  <p className="text-white/50">New Lambton NSW 2305</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                <div className="space-y-0.5 text-sm text-white/50">
                  <p>Mon, Wed – Sat <span className="text-white">· 11am – 9pm</span></p>
                  <p>Sunday <span className="text-white">· 11am – 7:20pm</span></p>
                  <p>Tuesday <span className="text-red-400/70">· Closed</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:0249698123" className="text-sm text-white transition hover:text-gold">(02) 4969 8123</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={16} className="shrink-0 text-gold" />
                <a
                  href="https://instagram.com/thebrothersstyling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 transition hover:text-gold"
                >
                  @thebrothersstyling
                </a>
              </div>
            </div>
          </motion.div>

          {/* ─── Right form panel ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[500px] flex-col items-center justify-center rounded-md border border-gold/20 bg-obsidian-2 p-12 text-center"
              >
                <CheckCircle size={48} className="text-gold" strokeWidth={1.5} />
                <h2 className="mt-6 font-display text-3xl tracking-wide">Booking Received!</h2>
                <p className="mt-3 max-w-xs text-base text-white/60">
                  Thanks! We'll give you a call shortly to confirm your booking.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-block rounded-sm bg-gold px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-obsidian transition hover:bg-gold-soft"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-md border border-white/8 bg-obsidian-2 p-8 md:p-10">

                {/* Row 1: Name */}
                <Field label="Full Name *">
                  <input
                    name="fullName" type="text" required placeholder="Your full name"
                    value={form.fullName} onChange={onChange}
                    className={inputClass}
                  />
                </Field>

                {/* Row 2: Phone + Email */}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Phone Number *">
                    <input
                      name="phone" type="tel" required placeholder="04XX XXX XXX"
                      value={form.phone} onChange={onChange}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address *">
                    <input
                      name="email" type="email" required placeholder="you@email.com"
                      value={form.email} onChange={onChange}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Row 3: Service */}
                <div className="mt-5">
                  <Field label="Preferred Service *">
                    <select
                      name="service" required
                      value={form.service} onChange={onChange}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>Select a service…</option>
                      <optgroup label="── Men's Services">
                        {SERVICES.slice(0, 7).map((s) => <option key={s} value={s}>{s}</option>)}
                      </optgroup>
                      <optgroup label="── Women's Services">
                        {SERVICES.slice(7, 13).map((s) => <option key={s} value={s}>{s}</option>)}
                      </optgroup>
                      <optgroup label="── Other">
                        <option value="Other">Other</option>
                      </optgroup>
                    </select>
                  </Field>
                </div>

                {/* Row 4: Date + Time */}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred Date *">
                    <input
                      name="date" type="date" required min={today}
                      value={form.date} onChange={onChange}
                      className={inputClass}
                      style={{ colorScheme: "dark" }}
                    />
                  </Field>
                  <Field label="Preferred Time *">
                    <select
                      name="time" required
                      value={form.time} onChange={onChange}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>Select a time…</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Row 5: Notes */}
                <div className="mt-5">
                  <Field label="Additional Notes (optional)">
                    <textarea
                      name="notes" rows={3} placeholder="Any details or requests…"
                      value={form.notes} onChange={onChange}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    Something went wrong. Please try calling us directly at (02) 4969 8123.
                  </motion.div>
                )}

                {/* Submit */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-sm bg-gold py-4 text-xs font-bold uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(200,169,81,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </span>
                    ) : (
                      "Request Appointment"
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs italic text-white/35">
                    We'll call you to confirm your time.
                  </p>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
