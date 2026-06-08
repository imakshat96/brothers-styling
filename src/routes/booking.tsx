import { createFileRoute } from "@tanstack/react-router";
import { BookingPage } from "@/components/BookingPage";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book Appointment — The Brother's Styling" },
      {
        name: "description",
        content:
          "Request an appointment at The Brother's Styling in New Lambton. Men's barbering, women's haircuts, colour, balayage, nanoplasty and more.",
      },
    ],
  }),
});
