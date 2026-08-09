// ─────────────────────────────────────────────────────────────────────────────
// Netlify serverless function — charges the Square deposit server-side.
//
// The Square Access Token is a secret and must NEVER be sent to the browser,
// so the actual payment call happens here, not in the React app. The client
// (src/components/SquareDeposit.tsx) only ever sees a one-time card token
// (`sourceId`) produced by Square's Web Payments SDK, which is safe to send
// over the network but can't be reused to charge anything else.
//
// ACTION REQUIRED — set these in Netlify (Site settings → Environment
// variables) before going live:
//   SQUARE_ACCESS_TOKEN      — secret, from Square Developer Dashboard
//   SQUARE_ENV                — "sandbox" while testing, "production" to go live
//   VITE_SQUARE_LOCATION_ID   — same Location ID used on the client
// See .env.example for the full list (client + server) and where to find each value.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICE_PRICE_MAP, DEPOSIT_THRESHOLD, DEPOSIT_RATE } from "../../src/lib/services-data";

const SQUARE_ENV = process.env.SQUARE_ENV ?? "sandbox";
const SQUARE_API_BASE =
  SQUARE_ENV === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
const SQUARE_VERSION = "2024-10-17";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID || process.env.VITE_SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return json(
      { success: false, error: "Online payments aren't configured yet. Please call the salon to confirm your booking." },
      500,
    );
  }

  let body: { sourceId?: string; amount?: number; serviceName?: string; idempotencyKey?: string };
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid request body." }, 400);
  }

  const { sourceId, amount, serviceName, idempotencyKey } = body;
  if (!sourceId || !serviceName || !idempotencyKey) {
    return json({ success: false, error: "Missing required fields." }, 400);
  }

  // Never trust the client-supplied amount — recompute the deposit from the
  // known service price so a tampered request can't undercharge.
  const price = SERVICE_PRICE_MAP[serviceName];
  if (price == null || price < DEPOSIT_THRESHOLD) {
    return json({ success: false, error: "This service doesn't require an online deposit." }, 400);
  }
  const expectedDeposit = Math.round(price * DEPOSIT_RATE * 100) / 100;
  if (typeof amount === "number" && Math.abs(expectedDeposit - amount) > 0.01) {
    return json({ success: false, error: "Deposit amount mismatch." }, 400);
  }
  const amountCents = Math.round(expectedDeposit * 100);

  try {
    const squareRes = await fetch(`${SQUARE_API_BASE}/v2/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: { amount: amountCents, currency: "AUD" },
        location_id: locationId,
        note: `Deposit — ${serviceName} — The Brother's Styling booking`,
      }),
    });

    const squareData = await squareRes.json();

    if (!squareRes.ok) {
      const message = squareData?.errors?.[0]?.detail || "Payment declined. Please check your card and try again.";
      return json({ success: false, error: message }, 402);
    }

    return json({ success: true, paymentId: squareData.payment?.id });
  } catch (err) {
    console.error("Square payment error:", err);
    return json({ success: false, error: "Unexpected error processing payment. Please try again." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
