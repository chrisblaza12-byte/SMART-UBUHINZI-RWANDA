import { ChevronRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Language, translations } from "../../lib/translations";
import { NavCropSlider } from "./NavCropSlider";

type MainNavProps = {
  activeSection: string; currentView: "home" | "marketplace" | "dashboard"; isLoggedIn: boolean;
  onGoToSection: (sectionId: string) => void; onGoToMarketplace: () => void; onGoToDashboard: () => void;
  onGoToHome: () => void; onOpenAuth: () => void; isDark: boolean; onToggleTheme: () => void; language: Language;
};

const navKeys = ["home", "about", "services", "marketplace", "weather", "aiDetection", "news", "contact", "dashboard"] as const;
type NavKey = (typeof navKeys)[number];
const keyToSection: Record<Exclude<NavKey, "marketplace" | "dashboard">, string> = { home: "hero", about: "about", services: "services", weather: "weather", aiDetection: "ai-detection", news: "news", contact: "contact" };

export function MainNav(props: MainNavProps) {
  const { activeSection, currentView, isLoggedIn, onGoToSection, onGoToMarketplace, onGoToDashboard, onGoToHome, onOpenAuth, isDark, onToggleTheme, language } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];
  const logoPath = `${import.meta.env.BASE_URL}smart-ubuhinzi-logo.svg`;
  const shell = isDark ? "border-[#26435b] bg-[#071827]/95 text-white" : "border-[#d9e4df] bg-[#fbfdfb]/95 text-[#123429]";
  const quiet = isDark ? "text-[#c7d8d1] hover:bg-white/10 hover:text-white" : "text-[#38564a] hover:bg-[#e7f1eb] hover:text-[#0e3e2c]";
  const isActive = (key: NavKey) => (key === "marketplace" && currentView === "marketplace") || (key === "dashboard" && currentView === "dashboard") || (currentView === "home" && key !== "marketplace" && key !== "dashboard" && activeSection === keyToSection[key]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);
  const navigate = (key: NavKey) => {
    if (key === "marketplace") onGoToMarketplace();
    else if (key === "dashboard") isLoggedIn ? onGoToDashboard() : onOpenAuth();
    else onGoToSection(keyToSection[key]);
    setMenuOpen(false);
  };

  return <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${shell}`}>
    <div className="mx-auto flex h-[72px] max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
      <button type="button" onClick={onGoToHome} className="flex min-w-0 cursor-pointer items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] sm:gap-3">
        <img src={logoPath} alt="Smart Ubuhinzi Rwanda logo" className="h-10 w-10 shrink-0 rounded-full border border-[#e7b64a]/50 bg-white p-1 object-contain sm:h-11 sm:w-11" />
        <span className="min-w-0"><strong className="block truncate text-xs tracking-[.08em] sm:text-sm">SMART UBUHINZI</strong><small className="hidden text-xs opacity-65 min-[520px]:block">Modern Agriculture Platform</small></span>
      </button>
      <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
        {navKeys.map((key) => <button key={key} type="button" onClick={() => navigate(key)} className={`cursor-pointer whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] ${isActive(key) ? "bg-[#1c7a52] text-white shadow-sm" : quiet}`}>{t.nav[key]}</button>)}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className={`grid h-10 w-10 cursor-pointer place-items-center rounded-xl border transition hover:border-[#e7b64a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] ${isDark ? "border-[#35576a]" : "border-[#d8e3dc]"}`}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
        {!isLoggedIn && <button type="button" onClick={onOpenAuth} className="hidden cursor-pointer rounded-xl bg-[#e7b64a] px-4 py-2.5 text-sm font-extrabold text-[#18352b] transition hover:bg-[#f4cc6f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] min-[680px]:inline-flex">{t.getStarted}</button>}
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl bg-[#1c7a52] text-white shadow-md transition hover:bg-[#146341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] xl:hidden"><Menu className="h-5 w-5" /></button>
      </div>
    </div>
    {menuOpen && <button aria-label="Close navigation overlay" type="button" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-[#03110c]/70 backdrop-blur-[2px] xl:hidden" />}
    <aside aria-label="Navigation menu" aria-hidden={!menuOpen} className={`fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#06271d] text-white shadow-[-20px_0_55px_rgba(0,0,0,.35)] transition-transform duration-300 ease-out sm:inset-y-0 sm:left-auto sm:w-[min(88vw,430px)] sm:border-l sm:border-white/10 xl:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="relative shrink-0 overflow-hidden border-b border-white/10 bg-[#155c42] px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] text-white sm:px-6 sm:pb-7 sm:pt-6">
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full border-[24px] border-[#e7b64a]/25" />
        <div className="relative flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.2em] text-[#f6d57f]">Explore</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/25 bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a]"><X className="h-5 w-5" /></button></div>
        <p className="relative mt-3 font-[var(--font-display)] text-2xl font-bold leading-none sm:mt-4 sm:text-3xl">Grow with confidence.</p>
      </div>
      <nav className="grid min-h-0 flex-1 content-start gap-2 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5" aria-label="Responsive navigation">
        {navKeys.map((key, index) => <button key={key} type="button" onClick={() => navigate(key)} style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }} className={`group flex min-h-12 cursor-pointer items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left text-[15px] font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a] ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"} ${isActive(key) ? "border-[#6bc790]/40 bg-[#1c7a52] text-white shadow-sm" : "bg-white/[.06] text-white hover:bg-white/[.13]"}`}><span>{t.nav[key]}</span><ChevronRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" /></button>)}
      </nav>
      {!isLoggedIn && <div className="shrink-0 border-t border-white/10 bg-[#06271d] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5"><button type="button" onClick={() => { onOpenAuth(); setMenuOpen(false); }} className="w-full cursor-pointer rounded-xl bg-[#e7b64a] px-4 py-3 text-sm font-extrabold text-[#17392d] transition hover:bg-[#f4cc6f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7b64a]">Create your farmer account</button></div>}
    </aside>
    {currentView === "home" && <NavCropSlider />}
  </header>;
}
