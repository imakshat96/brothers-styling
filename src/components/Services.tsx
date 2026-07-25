import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  name: string;
  desc: string;
  price: string;
  duration?: string;
  tiers?: string;
}

interface Subcategory {
  label: string;
  disclaimer?: string;
  items: ServiceItem[];
}

// ─── Men's Data ───────────────────────────────────────────────────────────────

const MEN: Subcategory[] = [
  {
    label: "Men's Haircuts",
    items: [
      { name: "Men's Basic Haircut", price: "$35", desc: "Classic cut tailored to your preferred style" },
      { name: "Buzz Cut", price: "$25", desc: "Clean clipper cut for a sharp, low-maintenance look" },
      { name: "Pensioners Haircut", price: "$30", desc: "Comfortable and tidy, specially priced for pensioners" },
    ],
  },
  {
    label: "Fades",
    items: [
      { name: "Burst Fade", price: "$40", desc: "Curves around the ear for a stylish, balanced finish" },
      { name: "Taper Fade", price: "$40", desc: "Subtle fade around neckline and sideburns" },
      { name: "Drop Fade", price: "$40", desc: "Drops behind the ear for a smooth blended finish" },
    ],
  },
  {
    label: "Kids Haircuts",
    items: [
      { name: "Kid's Skin Fade", price: "$35", desc: "Clean skin fade blended smoothly for a fresh look" },
      { name: "Kid's Basic Haircut", price: "$25", desc: "Simple and neat, keeping kids looking tidy" },
      { name: "Kid's Zero Fade", price: "$30", desc: "Sharp zero-length fade for a modern kids cut" },
    ],
  },
  {
    label: "Beard Trims",
    items: [
      { name: "Basic Beard Trim", price: "$30", desc: "Clean shaping that trims and tidies the beard" },
      { name: "Italian Style Beard", price: "$40", desc: "Sharp lines and balanced shaping, classic Italian grooming" },
      { name: "Beard Fade Style", price: "$35", desc: "Blends the beard seamlessly into the haircut" },
    ],
  },
  {
    label: "Haircut & Beard Combos",
    items: [
      { name: "Basic Haircut + Basic Beard Trim", price: "$65", desc: "Complete grooming: clean cut and shaped beard" },
      { name: "Fade Haircut + Italian Style Beard", price: "$75", desc: "Sharp fade paired with premium beard shaping" },
    ],
  },
  {
    label: "Hair Colours & Highlights",
    items: [
      { name: "Full Head Highlights", price: "$199", desc: "Customised highlights adding brightness and dimension" },
      { name: "Grey Coverage", price: "$59", desc: "Covers grey roots and restores a natural-looking tone" },
      { name: "Fashion Color", price: "$99", desc: "Modern shades and trendy tones for a creative look" },
    ],
  },
  {
    label: "Chemical & Hair Treatments",
    items: [
      { name: "Nanoplasty", price: "$199", desc: "Reduces frizz, leaves hair silky and naturally shiny", duration: "1.5–2 hrs" },
      { name: "Hair Botox Treatment", price: "$189", desc: "Repairs damaged hair and restores moisture", duration: "1–1.5 hrs" },
      { name: "Hair Perming", price: "$199", desc: "Long-lasting curls or waves for a textured look", duration: "1.5–2 hrs" },
    ],
  },
  {
    label: "Skin Treatments",
    items: [
      { name: "D-Tan", price: "$20", desc: "Reduces sun tan and restores the skin's natural glow", duration: "10–15 min" },
      { name: "D-Tan with Charcoal Mask", price: "$30", desc: "Detoxifies skin and removes impurities", duration: "15–20 min" },
      { name: "Face Cleanup with Blackhead Removal", price: "$60", desc: "Exfoliation and blackhead removal for clear skin", duration: "20 min" },
      { name: "Deep Clean Facial", price: "$80", desc: "Cleans pores and revitalises skin for a healthy glow", duration: "30 min" },
      { name: "Face Scrub with Steam", price: "$25", desc: "Removes dead skin cells and refreshes the complexion", duration: "10 min" },
    ],
  },
];

// ─── Women's Data ─────────────────────────────────────────────────────────────

const WOMEN: Subcategory[] = [
  {
    label: "Haircuts",
    items: [
      { name: "Baby Girl's Haircut (Under 10)", price: "$65", desc: "Gentle cut with light shampoo and soft styling" },
      { name: "Women's Haircut", price: "$90", desc: "Precision cut tailored to your texture and natural fall" },
      { name: "Bang Trim", price: "$25", desc: "Quick fringe or curtain bang trim to maintain shape" },
    ],
  },
  {
    label: "Wash & Styling",
    items: [
      { name: "Head Wash", price: "$15", desc: "Professional shampoo with relaxing scalp cleanse" },
      {
        name: "Head Wash + Blow Dry",
        price: "from $45",
        desc: "Shampoo and professional blow-dry for smooth, voluminous hair",
        tiers: "Short $45 · Medium $55 · Long $65",
      },
      {
        name: "Head Wash + Styling",
        price: "from $55",
        desc: "Shampoo and styling with irons or straighteners",
        tiers: "Short $55 · Medium $65 · Long $75",
      },
    ],
  },
  {
    label: "Colour Services",
    disclaimer: "Bleach charges may vary depending on shade and hair length.",
    items: [
      {
        name: "Balayage",
        price: "from $249",
        desc: "Hand-painted highlights for soft, natural dimension",
        tiers: "Short $249 · Medium $349 · Long $449",
        duration: "2.5–3.5 hrs",
      },
      { name: "Toner", price: "$50", desc: "Tone and refresh your colour between appointments" },
    ],
  },
  {
    label: "Chemical & Hair Treatments",
    items: [
      { name: "Nanoplasty", price: "$199", desc: "Reduces frizz, leaves hair silky and naturally shiny", duration: "1.5–2 hrs" },
      { name: "Hair Botox Treatment", price: "$189", desc: "Repairs damaged hair and restores moisture", duration: "1–1.5 hrs" },
      { name: "Hair Perming", price: "$199", desc: "Long-lasting curls or waves for a textured look", duration: "1.5–2 hrs" },
    ],
  },
];

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
