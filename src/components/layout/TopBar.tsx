import { Facebook, Globe, Instagram, Languages, MessageCircle, Youtube } from "lucide-react";
import { Language, translations } from "../../lib/translations";

type TopBarProps = {
  onOpenAuth: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function TopBar({ onOpenAuth, language, onLanguageChange }: TopBarProps) {
  const t = translations[language];

  return (
    <div className="hidden md:block border-b border-[#334155]/40 bg-[#0F172A] text-[#F8FAFC]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="rounded border border-[#22C55E]/40 px-2 py-0.5 text-xs text-[#22C55E]">RW</span>
          <span>{t.topBarWelcome}</span>
          <div className="flex items-center gap-2 text-[#66BB6A]">
            <Languages className="h-4 w-4" />
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`cursor-pointer ${language === "en" ? "text-white" : "text-[#66BB6A]"}`}
            >
              English
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onLanguageChange("rw")}
              className={`cursor-pointer ${language === "rw" ? "text-white" : "text-[#66BB6A]"}`}
            >
              Kinyarwanda
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#CBD5E1]">
            <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-[#22C55E]" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-[#22C55E]" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-[#22C55E]" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-[#22C55E]" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-[#22C55E]" aria-label="Language Selector">
              <Globe className="h-4 w-4" />
            </a>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="cursor-pointer rounded-md border border-[#334155] px-3 py-1 transition-all duration-200 hover:border-[#22C55E] hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]"
          >
            {t.loginRegister}
          </button>
        </div>
      </div>
    </div>
  );
}
