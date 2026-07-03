import { FiMapPin, FiPhone, FiMail, FiInstagram, FiMessageCircle } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";

// Per-icon brand colours applied on hover
const contactItems = [
  {
    I: FiMapPin,
    l: "Studio",
    v: "12, Anna Nagar Main Road,\nMogappair, Chennai 600037",
    hoverBg: "#34A853",      // Google Maps green
    hoverText: "#fff",
  },
  {
    I: FiPhone,
    l: "Phone",
    v: "+91 98765 43210",
    hoverBg: "#4CAF50",      // Phone green
    hoverText: "#fff",
  },
  {
    I: FiMail,
    l: "Email",
    v: "hello@lakshanabridal.com",
    hoverBg: "#EA4335",      // Gmail red
    hoverText: "#fff",
  },
  {
    I: FiInstagram,
    l: "Instagram",
    v: "@lakshana.bridal",
    hoverBg: "#E1306C",      // Instagram pink
    hoverText: "#fff",
  },
  {
    I: FiMessageCircle,
    l: "WhatsApp",
    v: "+91 98765 43210",
    hoverBg: "#25D366",      // WhatsApp green
    hoverText: "#fff",
  },
];

export function Contact() {
  const titleRef = useReveal<HTMLHeadingElement>();
  return (
    <section id="contact" className="relative bg-[#141414] py-32 md:py-40">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="eyebrow justify-center">Visit The Studio</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05]"
          >
            Find <em className="italic font-light text-[#d4af37]">Lakshana</em>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            {contactItems.map((c) => (
              <div key={c.l} className="flex gap-6 group">
                <span
                  className="w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 transition-all duration-500"
                  style={{
                    ["--hover-bg" as string]: c.hoverBg,
                    ["--hover-text" as string]: c.hoverText,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = c.hoverBg;
                    (e.currentTarget as HTMLElement).style.color = c.hoverText;
                    (e.currentTarget as HTMLElement).style.borderColor = c.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <c.I />
                </span>
                <div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37]/80 mb-1">{c.l}</div>
                  <div className="text-[#f8f5f0]/85 whitespace-pre-line leading-relaxed">{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 h-[60vh] lg:h-auto border border-[#d4af37]/20 overflow-hidden">
            <iframe
              title="Lakshana Studio Map"
              className="w-full h-full grayscale contrast-125 brightness-75"
              loading="lazy"
              src="https://www.google.com/maps?q=Mogappair,Chennai&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
