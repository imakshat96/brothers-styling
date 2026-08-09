// ─────────────────────────────────────────────────────────────────────────────
// Netlify serverless function — creates a real appointment directly in the
// client's Square Appointments calendar (replacing the old "we'll call you
// to confirm" flow for any service mapped to a real Square catalog item).
//
// Always calls Square's PRODUCTION API — same reasoning as
// search-availability.mts: sandbox has no Bookings/Appointments support at
// all, so this has to be built and tested against the real account from
// day one. Uses SQUARE_PROD_ACCESS_TOKEN (same credential already used
// read-only elsewhere; this is the first function that also writes with it).
//
// Flow:
//   1. Look up the service's Square catalog variation + fetch its current
//      version (required by CreateBooking; a stale version is rejected).
//   2. Find or create the Square Customer record for this person (search by
//      email first, then by phone, else create new).
//   3. Create the booking with a single appointment segment.
// ─────────────────────────────────────────────────────────────────────────────

import { SQUARE_SERVICE_MAP, SQUARE_LOCATION_ID_PROD } from "../../src/lib/square-catalog-map";

const SQUARE_VERSION = "2024-10-17";
const SQUARE_API_BASE = "https://connect.squareup.com";

interface CreateBookingBody {
  serviceName?: string;
  startAt?: string;
  teamMemberId?: string;
  durationMinutes?: number;
  fullName?: string;
  phone?: string;
  email?: string;
  notes?: string;
  depositPaymentId?: string;
  idempotencyKey?: string;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  const accessToken = process.env.SQUARE_PROD_ACCESS_TOKEN;
  if (!accessToken) {
    return json({ success: false, error: "Online booking isn't configured yet." }, 500);
  }

  let body: CreateBookingBody;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid request body." }, 400);
  }

  const { serviceName, startAt, teamMemberId, fullName, phone, email, notes, depositPaymentId, idempotencyKey } = body;
  if (!serviceName || !startAt || !teamMemberId || !fullName || !phone || !email) {
    return json({ success: false, error: "Missing required booking details." }, 400);
  }

  const mapping = SQUARE_SERVICE_MAP[serviceName];
  if (!mapping) {
    return json({ success: false, reason: "not_bookable_online" }, 200);
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Square-Version": SQUARE_VERSION,
  };

  try {
    // 1. Current catalog variation version (CreateBooking rejects stale versions).
    const catalogRes = await fetch(`${SQUARE_API_BASE}/v2/catalog/object/${mapping.catalogVariationId}`, { headers });
    const catalogData = await catalogRes.json();
    if (!catalogRes.ok) {
      const message = catalogData?.errors?.[0]?.detail || "Couldn't verify service details.";
      return json({ success: false, error: message }, 502);
    }
    const serviceVariationVersion = catalogData.object?.version;

    // 2. Find or create the customer.
    const [givenName, ...rest] = fullName.trim().split(/\s+/);
    const familyName = rest.join(" ") || undefined;

    let customerId: string | undefined;
    const searchRes = await fetch(`${SQUARE_API_BASE}/v2/customers/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: { filter: { email_address: { exact: email } } } }),
    });
    const searchData = await searchRes.json();
    if (searchRes.ok && searchData.customers?.length) {
      customerId = searchData.customers[0].id;
    }

    if (!customerId) {
      const createCustomerRes = await fetch(`${SQUARE_API_BASE}/v2/customers`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          given_name: givenName,
          family_name: familyName,
          email_address: email,
          phone_number: phone,
        }),
      });
      const createCustomerData = await createCustomerRes.json();
      if (!createCustomerRes.ok) {
        const message = createCustomerData?.errors?.[0]?.detail || "Couldn't create customer record.";
        return json({ success: false, error: message }, 502);
      }
      customerId = createCustomerData.customer?.id;
    }

    // 3. Create the booking.
    const noteParts = [
      mapping.styleNote ? `Requested style: ${mapping.styleNote}` : null,
      mapping.variablePrice ? "Price is variable — confirm final price with client in person." : null,
      depositPaymentId ? `Deposit paid online (Square payment ${depositPaymentId}).` : null,
      notes ? `Customer notes: ${notes}` : null,
    ].filter(Boolean);

    const bookingRes = await fetch(`${SQUARE_API_BASE}/v2/bookings`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        idempotency_key: idempotencyKey || crypto.randomUUID(),
        booking: {
          location_id: SQUARE_LOCATION_ID_PROD,
          start_at: startAt,
          location_type: "BUSINESS_LOCATION",
          customer_id: customerId,
          customer_note: noteParts.join(" "),
          appointment_segments: [
            {
              team_member_id: teamMemberId,
              service_variation_id: mapping.catalogVariationId,
              service_variation_version: serviceVariationVersion,
              duration_minutes: Math.round(mapping.durationMs / 60000),
            },
          ],
        },
      }),
    });

    const bookingData = await bookingRes.json();
    if (!bookingRes.ok) {
      const message = bookingData?.errors?.[0]?.detail || "Couldn't create the booking. That time may have just been taken.";
      return json({ success: false, error: message }, 409);
    }

    return json({ success: true, bookingId: bookingData.booking?.id, customerId });
  } catch (err) {
    console.error("Square booking creation error:", err);
    return json({ success: false, error: "Unexpected error creating your booking." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
