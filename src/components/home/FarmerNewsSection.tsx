import { ArrowRight, BookOpen, Newspaper, X } from "lucide-react";
import { useState } from "react";
import { farmerNewsItems } from "../../content/siteContent";

export function FarmerNewsSection() {
  const [selectedStory, setSelectedStory] = useState<(typeof farmerNewsItems)[number] | null>(null);
  return (
    <section id="farmer-news" className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8 2xl:max-w-[1800px] 2xl:px-12">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Farmer & Crop News</h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#22C55E]/15 px-3 py-1 text-xs text-[#166534] dark:text-[#4ADE80]">
          <Newspaper className="h-3.5 w-3.5" /> Updated regularly
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {farmerNewsItems.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-[#CBD5E1] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#22C55E] dark:border-[#334155] dark:bg-[#0F172A]"
          >
            <p className="text-xs text-[#166534] dark:text-[#4ADE80]">
              {item.category} • {item.date}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{item.summary}</p>
            <button type="button" onClick={() => setSelectedStory(item)} className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm text-[#166534] dark:text-[#22C55E]">
              Read Full Story <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
      {selectedStory && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#020617]/80 p-3 backdrop-blur-sm sm:p-6">
          <article role="dialog" aria-modal="true" aria-labelledby="story-title" className="relative my-auto max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#334155] bg-[#F8FAFC] shadow-2xl dark:bg-[#0F172A]">
            <button type="button" onClick={() => setSelectedStory(null)} aria-label="Close story" className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[#020617]/70 text-white transition hover:bg-[#22C55E]"><X className="h-4 w-4" /></button>
            <img loading="lazy" decoding="async" src={selectedStory.image} alt="Rwandan agriculture" className="h-52 w-full object-cover sm:h-72" />
            <div className="mx-auto max-w-2xl px-5 py-7 sm:px-10 sm:py-9">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#166534] dark:text-[#4ADE80]"><BookOpen className="h-4 w-4" /> {selectedStory.category} • {selectedStory.date}</div>
              <h2 id="story-title" className="mt-3 font-serif text-3xl font-bold leading-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">{selectedStory.title}</h2>
              <p className="mt-5 border-l-4 border-[#22C55E] pl-4 text-base font-medium leading-7 text-[#475569] dark:text-[#CBD5E1]">{selectedStory.summary}</p>
              <div className="mt-6 space-y-5 font-serif text-[17px] leading-8 text-[#334155] dark:text-[#CBD5E1]">
                {selectedStory.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 border-t border-[#CBD5E1] pt-5 text-sm font-semibold text-[#166534] dark:border-[#334155] dark:text-[#4ADE80]">Smart Ubuhinzi Rwanda • Practical knowledge for every district</div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
