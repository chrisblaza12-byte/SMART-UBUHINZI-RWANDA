import { ArrowRight, Newspaper } from "lucide-react";
import { farmerNewsItems } from "../../content/siteContent";

export function FarmerNewsSection() {
  return (
    <section id="farmer-news" className="mx-auto max-w-7xl px-4">
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
            <button className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm text-[#166534] dark:text-[#22C55E]">
              Read Full Story <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
