// ─────────────────────────────────────────────────────────────────────────────
// Shared services + pricing data.
// Used by both the Services section (src/components/Services.tsx) and the
// booking form (src/components/BookingPage.tsx) so pricing only lives in one
// place — this is what the deposit/payment logic reads from.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  name: string;
  desc: string;
  price: string; // display string, e.g. "$35" or "from $249"
  duration?: string;
  tiers?: string;
  /**
   * Numeric AUD amount used for the online deposit calculation.
   * - For flat-priced services this is the price in dollars.
   * - For tiered/"from" services this is the LOWEST tier (the minimum
   *   guaranteed charge) — staff can collect any balance in-salon.
   * - `null` means "no fixed price" (custom quote) — these are never
   *   charged a deposit online; booking proceeds as request-only.
   */
  basePrice: number | null;
}

export interface Subcategory {
  label: string;
  disclaimer?: string;
  items: ServiceItem[];
}

// ─── Men's Data ───────────────────────────────────────────────────────────────

export const MEN: Subcategory[] = [
  {
    label: "Men's Haircuts",
    items: [
      { name: "Men's Basic Haircut", price: "$35", basePrice: 35, desc: "Classic cut tailored to your preferred style" },
      { name: "Buzz Cut", price: "$25", basePrice: 25, desc: "Clean clipper cut for a sharp, low-maintenance look" },
      { name: "Pensioners Haircut", price: "$30", basePrice: 30, desc: "Comfortable and tidy, specially priced for pensioners" },
    ],
  },
  {
    label: "Fades",
    items: [
      { name: "Burst Fade", price: "$40", basePrice: 40, desc: "Curves around the ear for a stylish, balanced finish" },
      { name: "Taper Fade", price: "$40", basePrice: 40, desc: "Subtle fade around neckline and sideburns" },
      { name: "Drop Fade", price: "$40", basePrice: 40, desc: "Drops behind the ear for a smooth blended finish" },
    ],
  },
  {
    label: "Kids Haircuts",
    items: [
      { name: "Kid's Skin Fade", price: "$35", basePrice: 35, desc: "Clean skin fade blended smoothly for a fresh look" },
      { name: "Kid's Basic Haircut", price: "$25", basePrice: 25, desc: "Simple and neat, keeping kids looking tidy" },
      { name: "Kid's Zero Fade", price: "$30", basePrice: 30, desc: "Sharp zero-length fade for a modern kids cut" },
    ],
  },
  {
    label: "Beard Trims",
    items: [
      { name: "Basic Beard Trim", price: "$30", basePrice: 30, desc: "Clean shaping that trims and tidies the beard" },
      { name: "Italian Style Beard", price: "$40", basePrice: 40, desc: "Sharp lines and balanced shaping, classic Italian grooming" },
      { name: "Beard Fade Style", price: "$35", basePrice: 35, desc: "Blends the beard seamlessly into the haircut" },
    ],
  },
  {
    label: "Haircut & Beard Combos",
    items: [
      // ACTION REQUIRED: these two combos aren't priced on the public Services
      // page — basePrice is null so no deposit is charged online until you
      // confirm the real price and fill it in here.
      { name: "Basic Haircut + Basic Beard Trim", price: "Ask in salon", basePrice: null, desc: "Complete grooming: clean cut and shaped beard" },
      { name: "Fade Haircut + Italian Style Beard", price: "Ask in salon", basePrice: null, desc: "Sharp fade paired with premium beard shaping" },
    ],
  },
  {
    label: "Hair Colours & Highlights",
    items: [
      { name: "Full Head Highlights", price: "$199", basePrice: 199, desc: "Customised highlights adding brightness and dimension" },
      { name: "Grey Coverage", price: "$59", basePrice: 59, desc: "Covers grey roots and restores a natural-looking tone" },
      { name: "Fashion Color", price: "$99", basePrice: 99, desc: "Modern shades and trendy tones for a creative look" },
    ],
  },
  {
    label: "Chemical & Hair Treatments",
    items: [
      { name: "Nanoplasty", price: "$199", basePrice: 199, desc: "Reduces frizz, leaves hair silky and naturally shiny", duration: "1.5–2 hrs" },
      { name: "Hair Botox Treatment", price: "$189", basePrice: 189, desc: "Repairs damaged hair and restores moisture", duration: "1–1.5 hrs" },
      { name: "Hair Perming", price: "$199", basePrice: 199, desc: "Long-lasting curls or waves for a textured look", duration: "1.5–2 hrs" },
    ],
  },
  {
    label: "Skin Treatments",
    items: [
      { name: "D-Tan", price: "$20", basePrice: 20, desc: "Reduces sun tan and restores the skin's natural glow", duration: "10–15 min" },
      { name: "D-Tan with Charcoal Mask", price: "$30", basePrice: 30, desc: "Detoxifies skin and removes impurities", duration: "15–20 min" },
      { name: "Face Cleanup with Blackhead Removal", price: "$60", basePrice: 60, desc: "Exfoliation and blackhead removal for clear skin", duration: "20 min" },
      { name: "Deep Clean Facial", price: "$80", basePrice: 80, desc: "Cleans pores and revitalises skin for a healthy glow", duration: "30 min" },
      { name: "Face Scrub with Steam", price: "$25", basePrice: 25, desc: "Removes dead skin cells and refreshes the complexion", duration: "10 min" },
    ],
  },
];

// ─── Women's Data ─────────────────────────────────────────────────────────────

export const WOMEN: Subcategory[] = [
  {
    label: "Haircuts",
    items: [
      { name: "Baby Girl's Haircut (Under 10)", price: "$65", basePrice: 65, desc: "Gentle cut with light shampoo and soft styling" },
      { name: "Women's Haircut", price: "$90", basePrice: 90, desc: "Precision cut tailored to your texture and natural fall" },
      { name: "Bang Trim", price: "$25", basePrice: 25, desc: "Quick fringe or curtain bang trim to maintain shape" },
    ],
  },
  {
    label: "Wash & Styling",
    items: [
      { name: "Head Wash", price: "$15", basePrice: 15, desc: "Professional shampoo with relaxing scalp cleanse" },
      {
        name: "Head Wash + Blow Dry",
        price: "from $45",
        basePrice: 45,
        desc: "Shampoo and professional blow-dry for smooth, voluminous hair",
        tiers: "Short $45 · Medium $55 · Long $65",
      },
      {
        name: "Head Wash + Styling",
        price: "from $55",
        basePrice: 55,
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
        basePrice: 249,
        desc: "Hand-painted highlights for soft, natural dimension",
        tiers: "Short $249 · Medium $349 · Long $449",
        duration: "2.5–3.5 hrs",
      },
      { name: "Toner", price: "$50", basePrice: 50, desc: "Tone and refresh your colour between appointments" },
    ],
  },
  {
    label: "Chemical & Hair Treatments",
    items: [
      { name: "Nanoplasty", price: "$199", basePrice: 199, desc: "Reduces frizz, leaves hair silky and naturally shiny", duration: "1.5–2 hrs" },
      { name: "Hair Botox Treatment", price: "$189", basePrice: 189, desc: "Repairs damaged hair and restores moisture", duration: "1–1.5 hrs" },
      { name: "Hair Perming", price: "$199", basePrice: 199, desc: "Long-lasting curls or waves for a textured look", duration: "1.5–2 hrs" },
    ],
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

const ALL_SUBCATEGORIES = [...MEN, ...WOMEN];

/** Flat map of service name -> basePrice (dollars) for deposit calculations. */
export const SERVICE_PRICE_MAP: Record<string, number | null> = Object.fromEntries(
  ALL_SUBCATEGORIES.flatMap((sub) => sub.items.map((item) => [item.name, item.basePrice])),
);

// "Other" (custom / not-yet-listed service) — always a manual quote, never charged online.
SERVICE_PRICE_MAP["Other"] = null;

// ─── Deposit policy ───────────────────────────────────────────────────────────

/** Services priced at or above this amount require an online deposit to confirm booking. */
export const DEPOSIT_THRESHOLD = 100;

/** Fraction of the base price collected as a deposit online. */
export const DEPOSIT_RATE = 0.2;

/**
 * Returns the deposit amount (in dollars) required for a given service name,
 * or 0 if no deposit is required (price unknown, or below threshold).
 */
export function getDepositAmount(serviceName: string): number {
  const price = SERVICE_PRICE_MAP[serviceName];
  if (price == null || price < DEPOSIT_THRESHOLD) return 0;
  return Math.round(price * DEPOSIT_RATE * 100) / 100;
}
