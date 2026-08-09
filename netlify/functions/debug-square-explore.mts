// ─────────────────────────────────────────────────────────────────────────────
// TEMPORARY diagnostic endpoint — NOT for production use.
// Lets us see what's already configured in the connected Square account
// (catalog services, bookable staff, locations) so we can map the website's
// services to real Square catalog IDs before building the real booking flow.
//
// Delete this file once the Square Appointments integration is finished.
// ─────────────────────────────────────────────────────────────────────────────

const SQUARE_ENV = process.env.SQUARE_ENV ?? "sandbox";
const SQUARE_API_BASE =
  SQUARE_ENV === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
const SQUARE_VERSION = "2024-10-17";

export default async (req: Request) => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID || process.env.VITE_SQUARE_LOCATION_ID;

  if (!accessToken) {
    return json({ error: "SQUARE_ACCESS_TOKEN not set" }, 500);
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Square-Version": SQUARE_VERSION,
    "Content-Type": "application/json",
  };

  const results: Record<string, unknown> = { env: SQUARE_ENV, locationId };

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
