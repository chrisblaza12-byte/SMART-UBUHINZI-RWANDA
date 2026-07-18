import { ChevronUp, Facebook, Instagram, Mail, Phone, Twitter, Youtube } from "lucide-react";

const informationLinks = [
  { label: "About Smart Ubuhinzi", target: "about" },
  { label: "Farmer News", target: "news" },
  { label: "Weather updates", target: "weather" },
  { label: "Contact us", target: "contact" },
];
const helpfulLinks = [
  { label: "Services", target: "services" },
  { label: "AI Detection", target: "ai-detection" },
  { label: "Marketplace", target: "marketplace" },
  { label: "Farmer Dashboard", target: "dashboard" },
];

type HomeFooterProps = {
  onGoToSection: (sectionId: string) => void;
  onGoToMarketplace: () => void;
  onGoToDashboard: () => void;
};

export function HomeFooter({ onGoToSection, onGoToMarketplace, onGoToDashboard }: HomeFooterProps) {
  const navigate = (target: string) => {
    if (target === "marketplace") onGoToMarketplace();
    else if (target === "dashboard") onGoToDashboard();
    else onGoToSection(target);
  };
  const logoPath = `${import.meta.env.BASE_URL}smart-ubuhinzi-logo.svg`;
  return (
    <footer className="relative bg-[#0A0A0A] px-4 pb-6 pt-12 text-[#E5E7EB]">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoPath} alt="Smart Ubuhinzi Rwanda logo" className="h-10 w-10 rounded-full bg-white p-1" />
            <div>
              <p className="text-lg font-semibold text-white">Smart Ubuhinzi Rwanda</p>
              <p className="text-xs text-[#9CA3AF]">Grow smarter. Sell faster.</p>
            </div>
          </div>

          <h4 className="mt-6 text-sm font-semibold text-[#F59E0B]">About Us</h4>
          <p className="mt-2 max-w-xs text-sm text-[#D1D5DB]">
            We want to help bring farmers, buyers, and agriculture experts together on one digital platform.
          </p>

          <h4 className="mt-6 text-sm font-semibold text-[#F59E0B]">Contact Us</h4>
          <div className="mt-2 space-y-1 text-sm text-[#D1D5DB]">
            <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-[#F59E0B]" /> +250 7XX XXX XXX</p>
            <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-[#F59E0B]" /> info@smartubuhinzi.rw</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#F59E0B]">Information</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
            {informationLinks.map((link) => (
              <li key={link.target}>
                <button type="button" onClick={() => navigate(link.target)} className="cursor-pointer transition-colors duration-200 hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#F59E0B]">Helpful Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
            {helpfulLinks.map((link) => (
              <li key={link.target}>
                <button type="button" onClick={() => navigate(link.target)} className="cursor-pointer transition-colors duration-200 hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Subscribe More Info</h4>
          <div className="mt-3 flex overflow-hidden rounded-md border border-[#374151]">
            <input
              placeholder="Enter your Email"
              className="w-full bg-white px-3 py-2 text-sm text-[#0F172A] outline-none"
            />
          </div>
          <button
            type="button"
            className="mt-3 cursor-pointer rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-[#1C1917] transition-colors duration-200 hover:bg-[#FBBF24]"
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-4 border-t border-[#1F2937] pt-6 sm:flex-row sm:justify-between">
        <div className="flex gap-3">
          {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
            <button
              key={index}
              type="button"
              aria-label="social link"
              className="cursor-pointer rounded-full bg-[#F59E0B] p-2 text-[#1C1917] transition-transform duration-200 hover:scale-110"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF]">2026 © Smart Ubuhinzi Rwanda. All Rights Reserved. Developed by Mucyo Creativity</p>
      </div>

      <a
        href="#hero"
        aria-label="Scroll to top"
        className="absolute right-6 top-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-[#F59E0B] p-2 text-[#1C1917] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <ChevronUp className="h-4 w-4" />
      </a>
    </footer>
  );
}
