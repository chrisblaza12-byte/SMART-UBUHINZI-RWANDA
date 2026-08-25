import { ChevronUp, Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react";
import { FormEvent, useState } from "react";

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
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });
  const [status, setStatus] = useState("");

  const navigate = (target: string) => {
    if (target === "marketplace") onGoToMarketplace();
    else if (target === "dashboard") onGoToDashboard();
    else onGoToSection(target);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("Please fill in your name, email, and message.");
      return;
    }

    const subject = encodeURIComponent(`Contact request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.website || "Not provided"}\n\nMessage:\n${form.message}`,
    );

    window.location.href = `mailto:ndayisabapatrick75@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Your email app is opening. You can also send directly to ndayisabapatrick75@gmail.com.");
    setForm({ name: "", email: "", website: "", message: "" });
  };

  const logoPath = `${import.meta.env.BASE_URL}smart-ubuhinzi-logo.svg`;

  return (
    <footer className="relative bg-[#0a1123] px-4 pb-6 pt-8 text-[#e5ecff]">
      <div className="mx-auto max-w-6xl">
        <section
          id="contact"
          className="relative overflow-hidden rounded-[30px] border border-[#1b503d]/60 bg-[radial-gradient(circle_at_top,#1e4d3d,#122c27_44%,#0b1715_100%)] px-4 py-6 shadow-[0_35px_60px_rgba(2,24,18,0.7)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(120,255,190,0.18),transparent_52%)] before:blur-3xl"
        >
          <div className="relative grid gap-6 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-white/8 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#d6ffe9]">Contact Info Section</p>
              <h3 className="mt-4 text-5xl font-extrabold tracking-tight text-white">Get in Touch</h3>
              <p className="mt-4 max-w-md text-lg text-[#dff9ee]">
                We&apos;re here to discuss your project and bring your ideas to life with premium design &amp; development.
              </p>

              <div className="mt-8 space-y-4 text-base text-[#edf3ff]">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1bbf7a]/15 text-[#7ff0b8]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>ndayisabapatrick75@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1bbf7a]/15 text-[#7ff0b8]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>Rwanda, Kigali</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1bbf7a]/15 text-[#7ff0b8]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>+250786540493</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[26px] border border-white/10 bg-white/8 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#c9d8ff]">Contact Form</p>

              <div className="mt-5 space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your Name*"
                  className="w-full rounded-full border border-white/10 bg-[#eaf2ff]/10 px-4 py-3 text-base text-white placeholder:text-[#b8c7f5] outline-none transition focus:border-[#76d1ff] focus:ring-2 focus:ring-[#76d1ff]/30"
                  aria-label="Your name"
                  required
                />

                <div className="relative">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder="Email Address*"
                    className="w-full rounded-full border border-white/10 bg-[#eaf2ff]/10 px-4 py-3 pr-11 text-base text-white placeholder:text-[#b8c7f5] outline-none transition focus:border-[#76d1ff] focus:ring-2 focus:ring-[#76d1ff]/30"
                    aria-label="Email address"
                    required
                  />
                  <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8c7f5]" />
                </div>

                <input
                  type="url"
                  value={form.website}
                  onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
                  placeholder="Your Website (Optional)"
                  className="w-full rounded-full border border-white/10 bg-[#eaf2ff]/10 px-4 py-3 text-base text-white placeholder:text-[#b8c7f5] outline-none transition focus:border-[#76d1ff] focus:ring-2 focus:ring-[#76d1ff]/30"
                  aria-label="Website"
                />

                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Write your message..."
                  rows={5}
                  className="w-full resize-none rounded-[24px] border border-white/10 bg-[#eaf2ff]/10 px-4 py-3 text-base text-white placeholder:text-[#b8c7f5] outline-none transition focus:border-[#76d1ff] focus:ring-2 focus:ring-[#76d1ff]/30"
                  aria-label="Message"
                  required
                />
              </div>

              {status && <p className="mt-3 text-sm text-[#cfe7ff]">{status}</p>}

              <button
                type="submit"
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1abf7a] via-[#38d79a] to-[#7ae6ba] px-5 py-3 text-base font-bold text-[#062b20] shadow-[0_15px_35px_rgba(26,191,122,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </section>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoPath} alt="Smart Ubuhinzi Rwanda logo" className="h-10 w-10 rounded-full bg-white p-1" />
              <div>
                <p className="text-xl font-bold text-white">Smart Ubuhinzi Rwanda</p>
                <p className="text-xs text-[#9aa6c9]">Grow smarter. Sell faster.</p>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#dfe7ff]">
              <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-[#7ff0b8]" /> +250786540493</p>
              <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-[#7ff0b8]" /> ndayisabapatrick75@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Blog</h4>
            <p className="mt-3 text-sm text-[#b9c6f0]">Easier your biggest wins with smart agricultural updates.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">About</h4>
            <p className="mt-3 text-sm text-[#b9c6f0]">Learn how farmers are using climate-smart tools to improve yields.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <p className="mt-3 text-sm text-[#b9c6f0]">Weather insights, crop testing, and market intelligence in one place.</p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
              <button
                key={index}
                type="button"
                aria-label="social link"
                className="cursor-pointer rounded-full bg-white/10 p-2 text-white transition-transform duration-200 hover:scale-110 hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <p className="text-xs text-[#aebce8]">2026 © Smart Ubuhinzi Rwanda. All Rights Reserved.</p>
        </div>
      </div>

      <a
        href="#hero"
        aria-label="Scroll to top"
        className="absolute right-6 top-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-[#f59e0b] p-2 text-[#1c1917] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <ChevronUp className="h-4 w-4" />
      </a>
    </footer>
  );
}
