// ─────────────────────────────────────────────────────────────────────────────
// TEMPORARY diagnostic endpoint — NOT for production use.
// Lets us see what's already configured in the connected Square account
// (catalog services, bookable staff, locations) so we can map the website's
// services to real Square catalog IDs before building the real booking flow.
//
// Delete this file once the Square Appointments integration is finished.
// ─────────────────────────────────────────────────────────────────────────────

const SQUARE_VERSION = "2024-10-17";

export default async (req: Request) => {
  // ?prod=1 uses dedicated, isolated read-only production credentials
  // (SQUARE_PROD_ACCESS_TOKEN / SQUARE_PROD_LOCATION_ID). This is completely
  // separate from SQUARE_ACCESS_TOKEN/SQUARE_ENV used by create-payment.mts,
  // so exploring production here can never affect the live sandbox deposit
  // payment flow.
  const url = new URL(req.url);
  const useProd = url.searchParams.get("prod") === "1";

  const SQUARE_API_BASE = useProd ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
  const accessToken = useProd ? process.env.SQUARE_PROD_ACCESS_TOKEN : process.env.SQUARE_ACCESS_TOKEN;
  const locationId = useProd
    ? process.env.SQUARE_PROD_LOCATION_ID
    : process.env.SQUARE_LOCATION_ID || process.env.VITE_SQUARE_LOCATION_ID;

  if (!accessToken) {
    return json({ error: `${useProd ? "SQUARE_PROD_ACCESS_TOKEN" : "SQUARE_ACCESS_TOKEN"} not set` }, 500);
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Square-Version": SQUARE_VERSION,
    "Content-Type": "application/json",
  };

  // TEMPORARY: cleanup helper for the one supervised live booking test
  // (?cancelBookingId=...&deleteCustomerId=...). Cancels the test booking and
  // deletes the test customer record so nothing fake is left in the client's
  // real Square account. Remove alongside the rest of this file once done.
  const cancelBookingId = url.searchParams.get("cancelBookingId");
  const deleteCustomerId = url.searchParams.get("deleteCustomerId");
  if (cancelBookingId || deleteCustomerId) {
    const cleanup: Record<string, unknown> = {};
    if (cancelBookingId) {
      const getRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/${cancelBookingId}`, { headers });
      const getData = await getRes.json();
      const version = getData.booking?.version ?? 0;
      const cancelRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/${cancelBookingId}/cancel`, {
        method: "POST",
        headers,
        body: JSON.stringify({ booking_version: version }),
      });
      cleanup.cancelResult = await cancelRes.json();
      cleanup.cancelStatus = cancelRes.status;
    }
    if (deleteCustomerId) {
      const delRes = await fetch(`${SQUARE_API_BASE}/v2/customers/${deleteCustomerId}`, {
        method: "DELETE",
        headers,
      });
      cleanup.deleteCustomerStatus = delRes.status;
      cleanup.deleteCustomerResult = delRes.status === 204 ? { ok: true } : await delRes.json();
    }
    return json(cleanup, 200);
  }

  // TEMPORARY: list bookings in a date range, to verify whether the one
  // supervised test booking actually got created (?listFrom=...&listTo=...,
  // ISO timestamps). Remove alongside the rest of this file once done.
  const listFrom = url.searchParams.get("listFrom");
  const listTo = url.searchParams.get("listTo");
  if (listFrom && listTo) {
    const listRes = await fetch(
      `${SQUARE_API_BASE}/v2/bookings?location_id=${locationId}&start_at_min=${listFrom}&start_at_max=${listTo}`,
      { headers },
    );
    const listData = await listRes.json();
    return json(listData, listRes.status);
  }

  const results: Record<string, unknown> = { env: useProd ? "production" : "sandbox", locationId };

  try {
    // Locations
    const locRes = await fetch(`${SQUARE_API_BASE}/v2/locations`, { headers });
    const locData = await locRes.json();
    results.locations = locData.locations?.map((l: any) => ({
      id: l.id,
      name: l.name,
      status: l.status,
      bookingEnabled: l.booking_enabled ?? null,
    })) ?? locData;

    // Catalog items + variations
    const catRes = await fetch(`${SQUARE_API_BASE}/v2/catalog/list?types=ITEM,ITEM_VARIATION`, { headers });
    const catData = await catRes.json();
    results.catalogCount = catData.objects?.length ?? 0;
    results.catalogItems = (catData.objects ?? [])
      .filter((o: any) => o.type === "ITEM")
      .map((o: any) => ({
        id: o.id,
        name: o.item_data?.name,
        variations: o.item_data?.variations?.map((v: any) => ({
          id: v.id,
          name: v.item_variation_data?.name,
          price: v.item_variation_data?.price_money,
          serviceDuration: v.item_variation_data?.service_duration,
        })),
      }));
    results.catalogRaw = catData.errors ?? undefined;

    // Bookable team members
    const teamRes = await fetch(`${SQUARE_API_BASE}/v2/bookings/team-member-booking-profiles`, { headers });
    const teamData = await teamRes.json();
    results.teamMembers = teamData.team_member_booking_profiles?.map((t: any) => ({
      teamMemberId: t.team_member_id,
      displayName: t.display_name,
      bookable: t.is_bookable,
    })) ?? teamData;

    return json(results, 200);
  } catch (err) {
    return json({ error: String(err), partial: results }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
