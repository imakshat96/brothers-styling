// ─────────────────────────────────────────────────────────────────────────────
// Maps website service names (src/lib/services-data.ts) to real Square
// catalog item/variation IDs in the client's live Square account, pulled via
// netlify/functions/debug-square-explore.mts?prod=1 on 2026-08-09.
//
// Decisions made with the client (Akshat) while building this:
//  - Fade styles: the website lists 3 named men's fades (Burst/Taper/Drop)
//    and 2 named kids fades, but Square only has one generic "Fade" and one
//    generic "Kid's Fade" service. All variants map to Square's generic item;
//    the specific style requested is written into the booking's customer
//    note (via `styleNote`) so staff still see what the client asked for.
//  - Variable-priced services (Women's Haircut, Head Wash + Blow Dry,
//    Balayage) have no fixed price in Square — the client prices these in
//    person based on hair length. The website's listed/starting price is
//    still used to calculate the online deposit (marked `variablePrice: true`
//    below as a reminder that Square's own price_money is not authoritative
//    for these).
//  - "Head Wash + Styling" doesn't exist in Square's catalog yet. Client is
//    adding it himself — until then it's intentionally left out of this map.
//    Code that creates real Square bookings must treat a missing map entry
//    as "can't auto-book — fall back to email notification only."
// ─────────────────────────────────────────────────────────────────────────────

export interface SquareServiceMapping {
  catalogItemId: string;
  catalogVariationId: string;
  /** Service duration in milliseconds, as configured in Square. */
  durationMs: number;
  /** True if Square has no fixed price for this variation (priced in person). */
  variablePrice?: boolean;
  /**
   * Set when multiple website service names map to one generic Square
   * catalog item. Written into the booking's customer note so staff know
   * which specific style was requested.
   */
  styleNote?: string;
}

export const SQUARE_SERVICE_MAP: Record<string, SquareServiceMapping> = {
  // ── Men's Haircuts ──────────────────────────────────────────────────────
  "Men's Basic Haircut": { catalogItemId: "6H7NCDSXRE5WJY6QSTWTOLBU", catalogVariationId: "YS2B56VIAPCAF44DJ2X4OJA4", durationMs: 1800000 },
  "Buzz Cut": { catalogItemId: "5ZCJRJZ2DSSX3LN4NYXQFE44", catalogVariationId: "GE6DJGTY2OMF6UBFLTJP7JHZ", durationMs: 1800000 },
  "Pensioners Haircut": { catalogItemId: "RL2U63IAXFFMUI2AXA7T7GR7", catalogVariationId: "U763HT3EOQN24XGXY5SOCXTZ", durationMs: 1800000 },

  // ── Fades (all map to Square's single generic "Fade" service) ─────────
  "Burst Fade": { catalogItemId: "ZZRQLC4RE2DX5KEJEHCDZ7NG", catalogVariationId: "C3BGT2IR5OFC35P4S32F3XXS", durationMs: 1800000, styleNote: "Burst Fade" },
  "Taper Fade": { catalogItemId: "ZZRQLC4RE2DX5KEJEHCDZ7NG", catalogVariationId: "C3BGT2IR5OFC35P4S32F3XXS", durationMs: 1800000, styleNote: "Taper Fade" },
  "Drop Fade": { catalogItemId: "ZZRQLC4RE2DX5KEJEHCDZ7NG", catalogVariationId: "C3BGT2IR5OFC35P4S32F3XXS", durationMs: 1800000, styleNote: "Drop Fade" },

  // ── Kids Haircuts ────────────────────────────────────────────────────────
  // Both "fade" variants map to Square's single generic "Kid's Fade" service.
  "Kid's Skin Fade": { catalogItemId: "3SVWLI4CGRXSGABP6VRHHRXX", catalogVariationId: "LTV5I2YC7VM7MCAJHN5KKB54", durationMs: 1800000, styleNote: "Kid's Skin Fade" },
  "Kid's Basic Haircut": { catalogItemId: "KJ5CONJ5QDAA7I7PWDAG5OCZ", catalogVariationId: "NFKVEV6D7PJ7TD2P4U6TE2GA", durationMs: 1800000 },
  "Kid's Zero Fade": { catalogItemId: "3SVWLI4CGRXSGABP6VRHHRXX", catalogVariationId: "LTV5I2YC7VM7MCAJHN5KKB54", durationMs: 1800000, styleNote: "Kid's Zero Fade" },

  // ── Beard Trims ──────────────────────────────────────────────────────────
  "Basic Beard Trim": { catalogItemId: "M5OTU2CIYQD6CVJLCNQVO7GR", catalogVariationId: "4UM3OTNHDCFZUR74U3P4Z7MV", durationMs: 1800000 },
  "Italian Style Beard": { catalogItemId: "HDRXXHUFH3CQKOMYE2RGA3GE", catalogVariationId: "ME3VR2UNCXWPA3TVUIHB67O3", durationMs: 1800000 },
  "Beard Fade Style": { catalogItemId: "JWOVQZWNUDBXLDAPB3NBGWSE", catalogVariationId: "XHQUGAIUKAXKAQY5DQ4I5P23", durationMs: 1800000 },

  // ── Haircut & Beard Combos ───────────────────────────────────────────────
  // Real prices confirmed from Square (previously unpriced on the website).
  "Basic Haircut + Basic Beard Trim": { catalogItemId: "UVIEVSPPXEZ73AQOM3RNSOH5", catalogVariationId: "VFGDG4T7LWQP2PVW5PXS6FR3", durationMs: 1800000 },
  "Fade Haircut + Italian Style Beard": { catalogItemId: "ESCDOWVXG4J2TIVBY4V4IZL4", catalogVariationId: "4OYFGY2UQJM7VEEMMBOF4UV4", durationMs: 1800000 },

  // ── Hair Colours & Highlights ────────────────────────────────────────────
  "Full Head Highlights": { catalogItemId: "HQF7QSACFPCWNJF3T2XR473M", catalogVariationId: "TKOHNRPEPUQV62L7O64LYYDM", durationMs: 1800000 },
  "Grey Coverage": { catalogItemId: "COA4EWFUQZWRZWW22KE6IPUV", catalogVariationId: "SXJ72HEM3CKAD5HF44O3WFA5", durationMs: 1800000 },
  "Fashion Color": { catalogItemId: "IJCSAYVPQ4MNXN2IP2SX6CAP", catalogVariationId: "KVQZFMGUMB6M763XYZTYICUU", durationMs: 1800000 },

  // ── Chemical & Hair Treatments (shared by Men + Women lists) ────────────
  "Nanoplasty": { catalogItemId: "3XMR4UKJUKSCJM6UHELAZJJX", catalogVariationId: "VSH2E5DVJOVXKLVWDGCJ2CCB", durationMs: 7200000 },
  "Hair Botox Treatment": { catalogItemId: "X4ZIN5HU6NTGBGWPUZZU3SAR", catalogVariationId: "BZUXC5ES3TQDHA7T3GAR3FH3", durationMs: 7200000 },
  "Hair Perming": { catalogItemId: "YP336AOIT5ZZ2NE532MPTYUB", catalogVariationId: "A3CTWOM7SWP4PNX4USBOUTXD", durationMs: 7200000 },

  // ── Skin Treatments ──────────────────────────────────────────────────────
  "D-Tan": { catalogItemId: "66J45HE3RXYKZP6TEWBEPJ4S", catalogVariationId: "2MZYXNYVVMQ72WECZZAHDCD7", durationMs: 900000 },
  "D-Tan with Charcoal Mask": { catalogItemId: "2DWYAYFNEGGZ6RA5IHGM42BI", catalogVariationId: "W6W45ZG32CA7KKB5WYAKKXUA", durationMs: 1800000 },
  "Face Cleanup with Blackhead Removal": { catalogItemId: "DIQX5LO4YN7JGM6JFA5QFHEA", catalogVariationId: "ZOS5KZXVPDO5SUAIL4OO2CBG", durationMs: 1800000 },
  "Deep Clean Facial": { catalogItemId: "DKLXJQASN3AEND74VG6263XW", catalogVariationId: "XI3ID5LV2DO2WB6SXGO742V2", durationMs: 1800000 },
  "Face Scrub with Steam": { catalogItemId: "4MFRTM7KRIVSKFQP7BP33B7H", catalogVariationId: "2H6J5I3RMA6WJOFEFSOOETYW", durationMs: 1800000 },

  // ── Women's Haircuts ─────────────────────────────────────────────────────
  "Baby Girl's Haircut (Under 10)": { catalogItemId: "67DIGTZZU4EA3O42R5TEYKEP", catalogVariationId: "7FA3VZ4AQJBHW3VIGXCDN4X6", durationMs: 1800000 },
  "Women's Haircut": { catalogItemId: "Z4GNMNK7X4YT3VPLCKZZ53V7", catalogVariationId: "HZ776P5F4GUBWJCOMWQLCSF4", durationMs: 2700000, variablePrice: true },
  "Bang Trim": { catalogItemId: "24NVSOPRPRULGXXRILQYPLT5", catalogVariationId: "3NYT4GLWNJGXYH27Q5ZUQ3JV", durationMs: 1800000 },

  // ── Wash & Styling ───────────────────────────────────────────────────────
  "Head Wash": { catalogItemId: "EOPXCEWG75XYCHZUS6XDNCDQ", catalogVariationId: "CEWT5S6LG7IX6TN3ED4F75T6", durationMs: 1800000 },
  "Head Wash + Blow Dry": { catalogItemId: "YNJBUGQF3O3XFB46ALBEFZHR", catalogVariationId: "APVLF3RYYMUAEUSJYXTEJVW3", durationMs: 1800000, variablePrice: true },
  // "Head Wash + Styling" intentionally omitted — not yet in Square's catalog.
  // Once the client adds it, add its item/variation IDs here.

  // ── Colour Services ──────────────────────────────────────────────────────
  "Balayage": { catalogItemId: "E5PFYQLV3QLZAJPUFMHEE5CT", catalogVariationId: "CR3V2HC6AOVQAEFDRIJ6HHT2", durationMs: 12600000, variablePrice: true },
  "Toner": { catalogItemId: "KRUSUAJWJKHT6BNPBCGNNKJP", catalogVariationId: "6WRACGNPYE2RZK5EWUKIPKKF", durationMs: 1800000 },
};

// Square team member IDs bookable for any service.
// Vishnu Bishnoi (TMtF66_uW490dEuw) no longer works here — profile deleted
// in Square 2026-08-09, so removed here too (a deleted team member's ID would
// make SearchAvailability calls fail). Adarsh has a new hire's profile in
// progress; add their team member ID below once it exists.
export const SQUARE_TEAM_MEMBER_IDS = ["TMqIfGpz_Ye4neQt"];

export const SQUARE_LOCATION_ID_PROD = "LDV4PNFQ08GRH";
