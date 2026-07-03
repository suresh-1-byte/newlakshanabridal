import { FiPlay, FiInstagram } from "react-icons/fi";
import g1 from "../assets/reel1.jpeg";
import g2 from "../assets/reel6.jpeg";
import g3 from "../assets/reel3.jpeg";
import g5 from "../assets/reel4.jpeg";
import g6 from "../assets/reel5.jpeg";
import about1 from "../assets/reel2.jpeg";
import { useReveal } from "../hooks/useReveal";

const reels = [
  { src: g5, t: "Bridal Transformation", v: "284K" },
  { src: about1, t: "Gold Eye Tutorial", v: "192K" },
  { src: g3, t: "Jasmine Braid", v: "521K" },
  { src: g6, t: "Madisar Drape", v: "78K" },
  { src: g1, t: "Reception Glam", v: "342K" },
  { src: g2, t: "Engagement Look", v: "210K" },
];

export function Reels() {
  const titleRef = useReveal<HTMLHeadingElement>();
  return (
    <section className="relative bg-[#141414] py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="eyebrow"><FiInstagram /> @lakshana.bridal</span>
            <h2
              ref={titleRef}
              className="fade-up mt-6 font-display text-5xl md:text-6xl leading-[1.05] max-w-xl"
            >
              Loved by <em className="italic font-light text-[#d4af37]">2M+</em> on Instagram.
            </h2>
          </div>
          <a href="#" className="btn-ghost shrink-0">Follow Us</a>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide pl-6 md:pl-12 pb-6">
        <div className="flex gap-6 w-max">
          {reels.map((r, i) => (
            <div
              key={i}
              className="group relative w-[260px] md:w-[300px] aspect-[9/16] overflow-hidden cursor-pointer flex-shrink-0 border border-[#d4af37]/15"
              data-cursor="hover"
            >
              <img
                src={r.src}
                alt={r.t}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center backdrop-blur-sm bg-[#0d0d0d]/30 group-hover:bg-[#d4af37] group-hover:text-[#0d0d0d] text-[#d4af37] transition-all duration-500">
                  <FiPlay className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-xl text-[#f8f5f0]">{r.t}</p>
                <p className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mt-1">{r.v} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
