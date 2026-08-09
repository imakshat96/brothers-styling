import { createFileRoute } from "@tanstack/react-router";
import { ManageBookingPage } from "@/components/ManageBookingPage";

interface ManageBookingSearch {
  bookingId?: string;
  paymentId?: string;
}

export const Route = createFileRoute("/manage-booking")({
  component: ManageBookingPage,
  validateSearch: (search: Record<string, unknown>): ManageBookingSearch => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : undefined,
    paymentId: typeof search.paymentId === "string" ? search.paymentId : undefined,
  }),
  head: () => ({
    meta: [{ title: "Manage Your Booking — The Brother's Styling" }],
  }),
});
