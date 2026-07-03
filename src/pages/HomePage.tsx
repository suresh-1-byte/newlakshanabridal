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

function HomePage() {
  console.log('🏠 HomePage rendering...');
  
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

export default HomePage;
