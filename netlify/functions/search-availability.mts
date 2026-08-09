// ─────────────────────────────────────────────────────────────────────────────
// Netlify serverless function — returns real open appointment slots from the
// client's live Square Appointments calendar for a given service.
//
// Square's sandbox does NOT support the Bookings/Appointments API at all
// (confirmed: "Merchant not onboarded to Appointments" in sandbox), so this
// always calls Square's PRODUCTION API using SQUARE_PROD_ACCESS_TOKEN — the
// same isolated production credential already used read-only by
// debug-square-explore.mts. This function only ever performs a read
// (SearchAvailability), never a write, so it's safe to use in production
// from day one, even before the "create booking" step goes live.
// ─────────────────────────────────────────────────────────────────────────────

import { SQUARE_SERVICE_MAP, SQUARE_TEAM_MEMBER_IDS, SQUARE_LOCATION_ID_PROD } from "../../src/lib/square-catalog-map";

const SQUARE_VERSION = "2024-10-17";
const SQUARE_API_BASE = "https://connect.squareup.com";

export default async (req: Request) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  const accessToken = process.env.SQUARE_PROD_ACCESS_TOKEN;
  if (!accessToken) {
    return json({ success: false, error: "Booking availability isn't configured yet." }, 500);
  }

  // GET + query params is supported alongside the real POST+JSON path purely
  // as a manual testing convenience (the sandbox we develop from can only
  // reach this site via GET). The live site always uses POST.
  let body: { serviceName?: string; daysAhead?: number };
  if (req.method === "GET") {
    const url = new URL(req.url);
    body = {
      serviceName: url.searchParams.get("serviceName") ?? undefined,
      daysAhead: url.searchParams.get("daysAhead") ? Number(url.searchParams.get("daysAhead")) : undefined,
    };
  } else {
    try {
      body = await req.json();
    } catch {
      return json({ success: false, error: "Invalid request body." }, 400);
    }
  }

  const { serviceName } = body;
  if (!serviceName) {
    return json({ success: false, error: "Missing serviceName." }, 400);
  }

  const mapping = SQUARE_SERVICE_MAP[serviceName];
  if (!mapping) {
    // Not yet mapped to a real Square catalog service (e.g. "Other", or a
    // service pending the client's own Square setup, like "Head Wash +
    // Styling"). Caller should fall back to the request-only booking flow.
    return json({ success: false, reason: "not_bookable_online" }, 200);
  }

  const daysAhead = Math.min(Math.max(body.daysAhead ?? 14, 1), 31);
  const now = new Date();
  const startAt = now.toISOString();
  const endAt = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000).toISOString();

  try {
    const squareRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/availability/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
      },
      body: JSON.stringify({
        query: {
          filter: {
            start_at_range: { start_at: startAt, end_at: endAt },
            location_id: SQUARE_LOCATION_ID_PROD,
            segment_filters: [
              {
                service_variation_id: mapping.catalogVariationId,
                team_member_id_filter: { any: SQUARE_TEAM_MEMBER_IDS },
              },
            ],
          },
        },
      }),
    });

    const squareData = await squareRes.json();

    if (!squareRes.ok) {
      const message = squareData?.errors?.[0]?.detail || "Couldn't load availability.";
      return json({ success: false, error: message }, 502);
    }

    const slots = (squareData.availabilities ?? []).map((a: any) => ({
      startAt: a.start_at,
      teamMemberId: a.appointment_segments?.[0]?.team_member_id,
      durationMinutes: a.appointment_segments?.[0]?.duration_minutes ?? Math.round(mapping.durationMs / 60000),
    }));

    return json({
      success: true,
      serviceName,
      durationMinutes: Math.round(mapping.durationMs / 60000),
      variablePrice: mapping.variablePrice ?? false,
      styleNote: mapping.styleNote ?? null,
      slots,
    });
  } catch (err) {
    console.error("Square availability search error:", err);
    return json({ success: false, error: "Unexpected error loading availability." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
