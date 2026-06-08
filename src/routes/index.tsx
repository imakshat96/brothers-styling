import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { OurWork } from "@/components/OurWork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingCall } from "@/components/FloatingCall";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Brother's Styling — Premium Barbershop & Hair Salon in New Lambton" },
      { name: "description", content: "Men's barbering, women's haircuts, brunette colour, balayage, nanoplasty, botox and facials in New Lambton NSW. Book today — 4.6★ on Google." },
      { property: "og:title", content: "The Brother's Styling — Premium Barbershop & Hair Salon" },
      { property: "og:description", content: "New Lambton's home for modern barbering and hair transformations. Skin fades, colour, balayage, nanoplasty and more." },
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
      <TrustBar />
      <Marquee />
      <Services />
      <About />
      <Reviews />
      <OurWork />
      <Contact />
      <Footer />
      <FloatingCall />
    </div>
  );
}
