import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

const socialLinks = [
  {
    Icon: FiInstagram,
    href: "#",
    label: "Instagram",
    hoverBg: "#E1306C",
    hoverText: "#fff",
  },
  {
    Icon: FiFacebook,
    href: "#",
    label: "Facebook",
    hoverBg: "#1877F2",
    hoverText: "#fff",
  },
  {
    Icon: FiYoutube,
    href: "#",
    label: "YouTube",
    hoverBg: "#FF0000",
    hoverText: "#fff",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] pt-24 pb-10 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <img
            src="/logo.png"
            alt="Lakshana LP Bridal Atelier logo"
            className="w-40 h-40 object-contain mx-auto"
          />
          <p className="mt-4 text-xs tracking-[0.45em] uppercase text-[#f8f5f0]/40">
            Bridal Studio
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 pb-16 border-b border-[#d4af37]/15">
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-6">Studio</h4>
            <p className="text-sm text-[#f8f5f0]/60 leading-relaxed">
              12, Anna Nagar Main Road,
              <br />
              Mogappair, Chennai 600037
            </p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-6">Navigate</h4>
            <ul className="space-y-3 text-sm text-[#f8f5f0]/60">
              {["About", "Portfolio", "Services", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="link-underline hover:text-[#f8f5f0]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-[#f8f5f0]/60">
              {["HD Bridal Makeup", "Reception Glam", "Hair Styling", "Skin Therapy"].map((l) => (
                <li key={l}>
                  <a href="#services" className="link-underline hover:text-[#f8f5f0]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-6">Newsletter</h4>
            <p className="text-sm text-[#f8f5f0]/60 mb-4">Editorial diaries & bridal inspiration.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-[#f8f5f0]/15 focus-within:border-[#d4af37] transition-colors"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-[#f8f5f0]/30 text-[#f8f5f0]"
              />
              <button className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase px-4">
                Subscribe →
              </button>
            </form>
            <div className="flex gap-4 mt-8">
              {socialLinks.map(({ Icon, href, label, hoverBg, hoverText }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] transition-all duration-300"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = hoverBg;
                    (e.currentTarget as HTMLAnchorElement).style.color = hoverText;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLAnchorElement).style.color = "";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-4 text-xs tracking-[0.3em] uppercase text-[#f8f5f0]/40">
          <span>© {new Date().getFullYear()} Lakshana Bridal Studio</span>
          <span>Crafted in Chennai · With Love</span>
        </div>
      </div>
    </footer>
  );
}
