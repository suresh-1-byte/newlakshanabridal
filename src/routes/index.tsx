import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "../components/SmoothScroll";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { About } from "../components/About";
import { ImageBreak } from "../components/ImageBreak";
import { Transformation } from "../components/Transformation";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { Testimonials } from "../components/Testimonials";
import { WhyUs } from "../components/WhyUs";
import { Book } from "../components/Book";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import breakJewelry from "../assets/break-jewelry.jpg";
import breakVeil from "../assets/break-veil.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lakshana — Luxury Bridal Studio, Beauty Salon & Academy in Chennai" },
      {
        name: "description",
        content:
          "Premium HD bridal makeup, luxury beauty services and certified beauty academy in Chennai. A couture bridal experience by Lakshana — South India's most loved bridal atelier.",
      },
      { name: "keywords", content: "Bridal Makeup Artist Chennai, Luxury Bridal Studio Chennai, Beauty Salon Mogappair, HD Bridal Makeup Chennai, Beauty Academy Chennai" },
      { property: "og:title", content: "Lakshana — Luxury Bridal Studio, Beauty Salon & Academy" },
      { property: "og:description", content: "Couture bridal makeovers, luxury beauty rituals and a certified academy in the heart of Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <ImageBreak
          src={breakJewelry}
          alt="South Indian bridal gold jewelry on red silk"
          eyebrow="Chapter II"
          title={<>The weight of <em className="italic font-light text-[#d4af37]">heritage.</em></>}
          caption="Every ornament tells a story — and we make sure your story shines."
        />
        <Transformation />
        <Services />
        <ImageBreak
          src={breakVeil}
          alt="Red silk bridal veil in cinematic motion"
          eyebrow="Chapter III"
          title={<>Moments that <em className="italic font-light text-[#d4af37]">linger.</em></>}
          caption="Every drape, every glance, every detail — composed for the wedding film of your dreams."
        />
        <Portfolio />
        <Testimonials />
        <WhyUs />
        <Book />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
