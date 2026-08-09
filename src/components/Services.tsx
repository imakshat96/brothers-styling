import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEN, WOMEN, type ServiceItem, type Subcategory } from "@/lib/services-data";

// ─── Types ────────────────────────────────────────────────────────────────────
// MEN / WOMEN pricing data now lives in src/lib/services-data.ts so it can be
// shared with the booking form's deposit-payment logic.

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div
      style={{
        background: "#141414",
        border: "1px solid #2a2a2a",
        borderRadius: 8,
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        transition: "border-color 0.2s ease, transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#b8975a";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Left */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#a0a0a0",
            margin: "4px 0 0",
            lineHeight: 1.45,
          }}
        >
          {item.desc}
        </p>
        {item.tiers && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#a0a0a0",
              margin: "5px 0 0",
              lineHeight: 1.4,
            }}
          >
            {item.tiers}
          </p>
        )}
      </div>

      {/* Right */}
      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: "#b8975a",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {item.price}
        </p>
        {item.duration && (
          <span
            style={{
              display: "inline-block",
              marginTop: 6,
              border: "1px solid rgba(184,151,90,0.45)",
              borderRadius: 20,
              padding: "2px 8px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "#b8975a",
              lineHeight: 1.4,
              letterSpacing: "0.02em",
            }}
          >
            {item.duration}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Subcategory Block ────────────────────────────────────────────────────────

function SubcategoryBlock({ sub }: { sub: Subcategory }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Heading + hairline */}
      <div style={{ marginBottom: 14 }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: "#b8975a",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            margin: "0 0 8px",
          }}
        >
          {sub.label}
        </p>
        <div style={{ height: 1, background: "rgba(184,151,90,0.3)" }} />
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: 12,
        }}
      >
        {sub.items.map((item) => (
          <ServiceCard key={item.name} item={item} />
        ))}
      </div>

      {/* Optional disclaimer */}
      {sub.disclaimer && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "#a0a0a0",
            margin: "12px 0 0",
            lineHeight: 1.5,
          }}
        >
          {sub.disclaimer}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type TabId = "men" | "women";

const TABS: { id: TabId; label: string }[] = [
  { id: "men", label: "Men's Services" },
  { id: "women", label: "Women's Services" },
];

export function Services() {
  const [tab, setTab] = useState<TabId>("men");

  // Switch to Women's tab when navigated to #womens-services
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#womens-services") setTab("women");
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const data = tab === "men" ? MEN : WOMEN;

  return (
    <section
      id="services"
      className="relative border-t border-white/6 px-6 py-24 md:py-32"
    >
      {/* Anchor target for #womens-services deep-links */}
      <span id="womens-services" className="absolute top-0" />

      <div className="mx-auto max-w-7xl">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold/70">What We Offer</span>
          <h2 className="mt-2 font-display text-5xl tracking-tight md:text-7xl">
            OUR <span className="text-gradient-gold font-serif italic">Services</span>
          </h2>
        </motion.div>

        {/* ── Tab buttons ── */}
        <div className="mb-10 flex border-b border-white/10">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative mr-8 pb-3 font-display text-lg tracking-[0.1em] uppercase transition-colors md:text-xl ${
                tab === id ? "text-gold" : "text-white/35 hover:text-white/60"
              }`}
            >
              {label}
              {tab === id && (
                <motion.span
                  layoutId="tab-line"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-gold"
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Card grid content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {data.map((sub) => (
              <SubcategoryBlock key={sub.label} sub={sub} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

// Keep legacy named exports so any existing imports don't break
export { Services as WomensServices, Services as MensServices };
