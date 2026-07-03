import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { firebaseApi } from "../lib/firebaseApi";
import { useReveal } from "../hooks/useReveal";
import g1 from "../assets/gallery-1.png";
import g2 from "../assets/gal 2.png";
import g3 from "../assets/gal3.png";
import g4 from "../assets/gallery-4.jpg";
import g5 from "../assets/gal5.jpeg";
import g6 from "../assets/gal4.png";

// Default static items as fallback
const defaultItems = [
  { src: g1, cat: "Reception", title: "Blush Reverie" },
  { src: g5, cat: "Bridal", title: "Crimson Heirloom" },
  { src: g3, cat: "Hair", title: "Jasmine Braid" },
  { src: g2, cat: "Engagement", title: "Lavender Dawn" },
  { src: g6, cat: "Drape", title: "Emerald Drape" },
  { src: g4, cat: "Academy", title: "The Atelier" },
];

const cats = ["All", "Bridal", "Reception", "Engagement", "Hair", "Academy"];

export function Portfolio() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const [items, setItems] = useState(defaultItems);
  const [loading, setLoading] = useState(true);
  const titleRef = useReveal<HTMLHeadingElement>();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const response = await firebaseApi.getGallery();
      if (response.success && response.data && response.data.length > 0) {
        // Filter only published (isActive: true) images
        const publishedItems = response.data.filter((item: any) => item.isActive === true);
        
        if (publishedItems.length > 0) {
          // Transform Firebase gallery items to match the format
          const galleryItems = publishedItems.map((item: any) => ({
            src: item.imageUrl || item.thumbnailUrl,
            cat: item.categoryName || "Bridal",
            title: item.title
          }));
          setItems(galleryItems);
        }
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      // Keep default items on error
    } finally {
      setLoading(false);
    }
  };

  const filtered = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <section id="portfolio" className="relative bg-[#141414] py-32 md:py-48">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="eyebrow justify-center">The Portfolio</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05]"
          >
            A diary of <em className="italic font-light text-[#d4af37]">unforgettable</em> brides.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 text-[10px] tracking-[0.35em] uppercase transition-all border ${
                active === c
                  ? "bg-[#d4af37] text-[#0d0d0d] border-[#d4af37]"
                  : "border-[#f8f5f0]/15 text-[#f8f5f0]/60 hover:border-[#d4af37] hover:text-[#d4af37]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filtered.map((item, i) => (
            <motion.div
              layout
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 break-inside-avoid group relative overflow-hidden cursor-pointer"
              onClick={() => setOpen(items.indexOf(item))}
              data-cursor="hover"
            >
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={`${item.title} — ${item.cat} portfolio`}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-[1400ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">{item.cat}</span>
                <h3 className="font-display text-2xl text-[#f8f5f0] mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-[#0d0d0d]/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={items[open].src}
              alt={items[open].title}
              className="max-h-[90vh] max-w-[90vw] object-contain border border-[#d4af37]/30"
            />
            <button
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 w-12 h-12 border border-[#d4af37]/50 text-[#f8f5f0] hover:bg-[#d4af37] hover:text-[#0d0d0d] transition"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
