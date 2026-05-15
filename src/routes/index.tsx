import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { BookCTA } from "@/components/BookCTA";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Brother's Styling — Premium Barbershop in New Lambton" },
      { name: "description", content: "Premium fades, beard grooming and styling at New Lambton's finest barbershop. Book today — 4.6★ on Google." },
      { property: "og:title", content: "The Brother's Styling — Premium Barbershop" },
      { property: "og:description", content: "New Lambton's home for modern barbering. Skin fades, colour, beard grooming and more." },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-obsidian text-white">
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Reviews />
      <BookCTA />
      <Footer />
    </div>
  );
}
