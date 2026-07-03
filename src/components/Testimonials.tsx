import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import { firebaseApi } from "../lib/firebaseApi";

interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  designation?: string;
  rating?: number;
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [quotes, setQuotes] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useReveal<HTMLHeadingElement>();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await firebaseApi.getTestimonials();
        if (response.success && response.data) {
          setQuotes(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 6500);
      return () => clearInterval(t);
    }
  }, [quotes.length]);

  if (loading || quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[i];

  return (
    <section id="testimonials" className="relative bg-[#141414] py-32 md:py-48 overflow-hidden noise">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="eyebrow justify-center">Words From Our Brides</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl mx-auto"
          >
            The <em className="italic font-light text-[#d4af37]">stories</em> behind the beauty.
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[340px] glass p-10 md:p-16">
          <div className="absolute -top-4 -left-4 text-[#d4af37] text-7xl font-display leading-none">"</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-[#f8f5f0]/90">
                {currentQuote.review}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <span className="w-12 h-px bg-[#d4af37]" />
                <div>
                  <div className="text-sm tracking-wider text-[#f8f5f0]">{currentQuote.customerName}</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/80 mt-1">
                    {currentQuote.designation || 'Verified Customer'}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-end gap-2">
            {quotes.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Quote ${n + 1}`}
                className={`h-px transition-all duration-500 ${
                  n === i ? "w-12 bg-[#d4af37]" : "w-6 bg-[#f8f5f0]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
