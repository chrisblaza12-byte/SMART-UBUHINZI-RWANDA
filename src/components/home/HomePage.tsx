import { ArrowRight, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CropTestPanel } from "../dashboard/CropTestPanel";
import { heroInfoCards, heroWords } from "../../content/siteContent";
import { aiSteps, learningOptions, quickServices, weatherCards, whyChooseUs } from "../../data/homeData";
import { Language, translations } from "../../lib/translations";
import { CropKnowledgeSection } from "./CropKnowledgeSection";
import { FarmerNewsSection } from "./FarmerNewsSection";
import { HomeFooter } from "./HomeFooter";

type HomePageProps = {
  onOpenAuth: () => void;
  onOpenMarketplace: () => void;
  onGoToSection: (sectionId: string) => void;
  onGoToDashboard: () => void;
  language: Language;
};

export function HomePage({ onOpenAuth, onOpenMarketplace, onGoToSection, onGoToDashboard, language }: HomePageProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const t = translations[language];
  const farmBackground = `${import.meta.env.BASE_URL}rwanda-farm-bg.svg`;
  const logoPath = `${import.meta.env.BASE_URL}smart-ubuhinzi-logo.svg`;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <section
        id="hero"
        className="relative overflow-hidden border-b border-[#CBD5E1] dark:border-[#334155]/50"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,0.82), rgba(15,23,42,0.86)), url('${farmBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <img
              src={logoPath}
              alt="Smart Ubuhinzi Rwanda logo"
              className="h-20 w-20 rounded-full border border-[#22C55E]/40 bg-white/90 p-1"
            />
            <h1 className="text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl">
              Modern Farming Starts Here: <span className="text-[#4ADE80]">{heroWords[wordIndex]}</span>
            </h1>
            <p className="max-w-xl text-lg text-[#CBD5E1]">
              Helping Rwandan farmers with crop testing, weather intelligence, learning modules, and district marketplace access.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#22C55E] px-6 py-3 font-semibold text-[#052E16] transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#4ADE80]"
              >
                {t.getStarted} <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenMarketplace}
                className="inline-flex cursor-pointer items-center rounded-md border border-[#334155] px-6 py-3 font-semibold text-[#F8FAFC] transition-all duration-200 hover:border-[#22C55E] hover:text-[#22C55E]"
              >
                {t.home.openMarketplace}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {heroInfoCards.map((item) => (
              <article key={item} className="rounded-xl border border-[#334155] bg-[#0F172A]/80 p-4 backdrop-blur">
                <h3 className="font-semibold text-[#F8FAFC]">{item}</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">Live smart card data for farmers and agribusiness teams.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{t.home.quickServices}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickServices.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-[#CBD5E1] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#22C55E] dark:border-[#334155] dark:bg-[#0F172A]"
            >
              <service.icon className="h-8 w-8 text-[#22C55E]" />
              <h3 className="mt-3 text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{service.title}</h3>
              <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CropKnowledgeSection />

      <section id="ai-detection" className="mx-auto max-w-7xl rounded-2xl border border-[#CBD5E1] bg-white px-4 py-8 dark:border-[#334155] dark:bg-[#0F172A]">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">AI Disease Detection</h2>
        <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">
          Login, upload a crop photo, and see your result immediately below the form — no waiting.
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <CropTestPanel />
          <article>
            <p className="text-[#334155] dark:text-[#CBD5E1]">How AI works:</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {aiSteps.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-[#0F172A] dark:border-[#334155] dark:bg-[#020617] dark:text-[#F8FAFC]">
                  <p className="mb-2 text-xs text-[#64748B] dark:text-[#94A3B8]">Step {index + 1}</p>
                  <div className="inline-flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-[#22C55E]" />
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenAuth}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#22C55E]/40 px-3 py-2 text-sm font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#22C55E]/10 dark:text-[#22C55E]"
            >
              Not logged in? Sign in to test <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        </div>
      </section>

      <section id="weather" className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Weather Forecast</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {weatherCards.map((card) => (
            <article key={card.label} className="rounded-xl border border-[#CBD5E1] bg-white p-4 dark:border-[#334155] dark:bg-[#0F172A]">
              <card.icon className="h-6 w-6 text-[#22C55E]" />
              <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">{card.label}</p>
              <p className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{card.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="news" className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Learning Center</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningOptions.map((module) => (
            <article key={module.title} className="rounded-xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
              <module.icon className="h-6 w-6 text-[#22C55E]" />
              <h3 className="mt-2 text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{module.title}</h3>
              <button className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm text-[#166534] dark:text-[#22C55E]">
                Start Learning <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <FarmerNewsSection />

      <section className="mx-auto max-w-7xl rounded-2xl border border-[#CBD5E1] bg-white p-6 dark:border-[#334155] dark:bg-[#1A1E2F]">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Why Choose Us</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article key={item.title} className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4 dark:border-[#334155] dark:bg-[#0F172A]">
              <item.icon className="h-6 w-6 text-[#22C55E]" />
              <h3 className="mt-2 font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{item.title}</h3>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <HomeFooter onGoToSection={onGoToSection} onGoToMarketplace={onOpenMarketplace} onGoToDashboard={onGoToDashboard} />

      <a
        href="#hero"
        className="fixed bottom-5 right-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#22C55E] p-3 text-[#052E16] shadow-lg transition-transform duration-200 hover:translate-y-[-2px]"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </a>
    </div>
  );
}
