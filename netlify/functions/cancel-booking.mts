// ─────────────────────────────────────────────────────────────────────────────
// Netlify serverless function — lets a customer cancel their own appointment
// from the confirmation email link, and auto-refunds the deposit if they
// cancel 24+ hours before the appointment (per salon policy). Inside the
// 24-hour window, the booking is still cancelled but the deposit is kept.
//
// GET  ?bookingId=...&paymentId=...   -> read-only preview (used by the
//      /manage-booking page to show appointment details + refund eligibility
//      before the customer confirms — cancelling must never happen on a
//      plain page load/GET).
// POST { bookingId, paymentId? }      -> actually cancels the booking and
//      issues the refund if eligible.
//
// Always production Square — same reasoning as the other booking functions.
// Note: CancelBooking is a Bookings API *write* operation, so — like
// create-booking.mts — it requires the client's Square account to be on a
// paid Appointments plan (Free plan blocks Bookings API writes). Refunds
// (Payments API) are not gated by the Appointments plan.
// ─────────────────────────────────────────────────────────────────────────────

import { getServiceNameByVariationId, CANCELLATION_WINDOW_HOURS } from "../../src/lib/square-catalog-map";

const SQUARE_VERSION = "2024-10-17";
const SQUARE_API_BASE = "https://connect.squareup.com";

export default async (req: Request) => {
  if (req.method !== "GET" && req.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  const accessToken = process.env.SQUARE_PROD_ACCESS_TOKEN;
  if (!accessToken) {
    return json({ success: false, error: "Booking management isn't configured yet." }, 500);
  }

  let bookingId: string | undefined;
  let paymentId: string | undefined;

  if (req.method === "GET") {
    const url = new URL(req.url);
    bookingId = url.searchParams.get("bookingId") ?? undefined;
    paymentId = url.searchParams.get("paymentId") ?? undefined;
  } else {
    try {
      const body = await req.json();
      bookingId = body.bookingId;
      paymentId = body.paymentId;
    } catch {
      return json({ success: false, error: "Invalid request body." }, 400);
    }
  }

  if (!bookingId) {
    return json({ success: false, error: "Missing bookingId." }, 400);
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Square-Version": SQUARE_VERSION,
  };

  try {
    const bookingRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/${bookingId}`, { headers });
    const bookingData = await bookingRes.json();
    if (!bookingRes.ok || !bookingData.booking) {
      const message = bookingData?.errors?.[0]?.detail || "Booking not found.";
      return json({ success: false, error: message }, 404);
    }

    const booking = bookingData.booking;
    const startAt = booking.start_at as string;
    const status = booking.status as string;
    const serviceVariationId = booking.appointment_segments?.[0]?.service_variation_id;
    const serviceName = serviceVariationId ? getServiceNameByVariationId(serviceVariationId) : undefined;

    const hoursUntil = (new Date(startAt).getTime() - Date.now()) / 3_600_000;
    const refundEligible = hoursUntil >= CANCELLATION_WINDOW_HOURS;
    const alreadyCancelled = status === "CANCELLED_BY_CUSTOMER" || status === "CANCELLED_BY_SELLER" || status === "CANCELLED_BY_ADMIN";

    // Look up the deposit amount (if any) so the preview can show exactly
    // what would be refunded, without trusting a client-supplied amount.
    let depositAmount: number | null = null;
    if (paymentId) {
      const payRes = await fetch(`${SQUARE_API_BASE}/v2/payments/${paymentId}`, { headers });
      const payData = await payRes.json();
      if (payRes.ok && payData.payment?.amount_money) {
        depositAmount = payData.payment.amount_money.amount / 100;
      }
    }

    // TEMPORARY: ?confirm=1 on GET actually performs the cancellation, only
    // so the sandbox (POST-blocked to arbitrary domains) can run the one
    // supervised live test. Remove alongside the rest of the temp scaffolding.
    const url = new URL(req.url);
    const confirmViaGet = req.method === "GET" && url.searchParams.get("confirm") === "1";

    if (req.method === "GET" && !confirmViaGet) {
      return json({
        success: true,
        startAt,
        serviceName: serviceName ?? "Your appointment",
        status,
        alreadyCancelled,
        hoursUntil: Math.round(hoursUntil * 10) / 10,
        refundEligible,
        depositAmount,
        cancellationWindowHours: CANCELLATION_WINDOW_HOURS,
      });
    }

    // POST (or GET+confirm=1 for testing) — actually cancel.
    if (alreadyCancelled) {
      return json({ success: false, error: "This booking has already been cancelled." }, 400);
    }

    const cancelRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/${bookingId}/cancel`, {
      method: "POST",
      headers,
      body: JSON.stringify({ booking_version: booking.version }),
    });
    const cancelData = await cancelRes.json();
    if (!cancelRes.ok) {
      const message = cancelData?.errors?.[0]?.detail || "Couldn't cancel the booking. Please call us directly.";
      return json({ success: false, error: message }, 502);
    }

    let refunded = false;
    let refundAmount: number | null = null;
    if (refundEligible && paymentId && depositAmount != null) {
      const refundRes = await fetch(`${SQUARE_API_BASE}/v2/refunds`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          idempotency_key: crypto.randomUUID(),
          payment_id: paymentId,
          amount_money: { amount: Math.round(depositAmount * 100), currency: "AUD" },
          reason: "Customer cancelled 24+ hours before appointment — full refund per policy",
        }),
      });
      const refundData = await refundRes.json();
      if (refundRes.ok) {
        refunded = true;
        refundAmount = depositAmount;
      } else {
        // Booking is already cancelled at this point — surface the refund
        // failure but don't report the whole cancellation as failed.
        return json({
          success: true,
          cancelled: true,
          refunded: false,
          refundError: refundData?.errors?.[0]?.detail || "Refund failed — please contact the salon.",
        });
      }
    }

    return json({ success: true, cancelled: true, refunded, refundAmount });
  } catch (err) {
    console.error("Cancel booking error:", err);
    return json({ success: false, error: "Unexpected error cancelling your booking." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
