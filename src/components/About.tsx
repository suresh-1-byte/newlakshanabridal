import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import about1 from "../assets/about pic.png";
import about2 from "../assets/about 2.png";
import { useReveal } from "../hooks/useReveal";

function Counter({ to, label, suffix = "+" }: { to: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const duration = 1800;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="font-display text-3xl md:text-4xl text-[#d4af37]">
        {val}
        {suffix}
      </span>
      <span className="text-[10px] tracking-[0.35em] uppercase text-[#f8f5f0]/50">
        {label}
      </span>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const titleRef = useReveal<HTMLHeadingElement>();
  const copyRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="relative bg-[#0d0d0d] py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left collage */}
        <div className="lg:col-span-6 relative h-[80vh] md:h-[100vh]">
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 top-0 w-[65%] h-[60%] overflow-hidden"
          >
            <img
              src={about1}
              alt="Bridal makeup close-up — gold eyes and detail"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute right-0 bottom-0 w-[60%] h-[55%] overflow-hidden border border-[#d4af37]/30"
          >
            <img
              src={about2}
              alt="Bridal hands with mehndi and jasmine"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </motion.div>
          <div className="absolute left-[55%] top-[55%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-center bg-[#0d0d0d]">
            <span className="font-display italic text-sm text-[#d4af37]">
              Since
              <br />
              2014
            </span>
          </div>
        </div>

        {/* Right copy */}
        <div className="lg:col-span-6">
          <span className="eyebrow">The Atelier</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            A sanctuary of
            <br />
            <em className="italic font-light text-[#d4af37]">bridal artistry</em>
            <br />
            in Chennai.
          </h2>
          <div ref={copyRef} className="fade-up mt-10 space-y-6 text-[#f8f5f0]/70 leading-relaxed max-w-lg">
            <p>
              Lakshana is a couture bridal studio devoted to the modern South
              Indian bride — where every brushstroke is intentional, every
              drape is precise, and every transformation feels deeply personal.
            </p>
            <p>
              From the quiet of a pre-wedding consultation to the cinematic moments
              of your reception, our artists craft a look that is unmistakably you —
              luminous, regal, and timeless.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter to={1200} label="Happy Brides" />
            <Counter to={2500} label="Bookings" />
            <Counter to={18} label="Certified Artists" />
            <Counter to={11} label="Years" suffix="" />
          </div>

          <a href="#services" className="btn-ghost mt-12">Discover Services</a>
        </div>
      </div>
    </section>
  );
}
