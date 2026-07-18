import { BookOpenText, ChevronDown, ChevronUp, Clock3, Leaf, ShieldCheck, Sprout, Wheat } from "lucide-react";
import { useState } from "react";
import { aboutBookImages, cropGuides, cropTopicTabs, CropTopicKey } from "../../content/siteContent";

function cropIcon(icon: string) {
  if (icon === "beans") return Leaf;
  if (icon === "coffee") return Sprout;
  return Wheat;
}

function CropGallery({ crop, images }: { crop: string; images: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((image, index) => (
        <figure key={`${crop}-${index}`} className="rounded-lg border border-[#334155] bg-white/5 p-2">
          <div
            className="h-28 rounded-md bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(130deg, rgba(46,125,50,0.${(index % 5) + 3}), rgba(15,23,42,0.65)), url('${image}')`,
            }}
            aria-hidden="true"
          />
          <figcaption className="mt-2 text-xs text-[#94A3B8]">
            {crop} field photo {index + 1} — replace with real photo
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function CropGuideCard({ guide }: { guide: (typeof cropGuides)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<CropTopicKey>("Overview");
  const Icon = cropIcon(guide.icon);

  return (
    <article
      className={`rounded-xl border border-[#D6D3C4] bg-white p-4 transition-all duration-300 dark:border-[#334155] dark:bg-[#020617] ${
        expanded ? "md:col-span-3" : ""
      }`}
    >
      <div>
        <Icon className="h-6 w-6 text-[#166534] dark:text-[#22C55E]" />
        <h3 className="mt-2 text-lg font-semibold text-[#1C1917] dark:text-[#F8FAFC]">{guide.title}</h3>
        <p className="mt-2 text-sm text-[#57534E] dark:text-[#94A3B8]">{guide.summary}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          setExpanded((prev) => !prev);
          setActiveTab("Overview");
        }}
        className="mt-3 inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#166534]/40 px-3 py-1.5 text-xs font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#166534]/10 dark:border-[#22C55E]/40 dark:text-[#22C55E]"
      >
        {expanded ? "Read Less" : "Read More"}
        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {expanded && (
        <div className="mt-5 space-y-4 border-t border-[#E7E5E4] pt-4 dark:border-[#1E293B]">
          <h4 className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{guide.title} — Full Information Center</h4>

          <div className="flex flex-wrap gap-2">
            {cropTopicTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-[#22C55E]/20 text-[#166534] dark:text-[#4ADE80]"
                    : "border border-[#CBD5E1] text-[#334155] dark:border-[#334155] dark:text-[#94A3B8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-sm text-[#334155] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#CBD5E1]">
            {guide.topics[activeTab]}
          </p>

          <CropGallery crop={guide.title} images={guide.galleryImages} />
        </div>
      )}
    </article>
  );
}

export function CropKnowledgeSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4">
      <div className="overflow-hidden rounded-3xl border border-[#D6D3C4] bg-[#FBF7EC] shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:border-[#334155] dark:bg-[#0F172A]">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[320px] border-b border-[#D6D3C4] dark:border-[#334155] lg:border-b-0 lg:border-r">
            <img
              src={aboutBookImages.cover}
              alt="Rwandan farmland — about Smart Ubuhinzi Rwanda"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#052E16]/60 via-[#052E16]/50 to-[#052E16]/80" />
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                <BookOpenText className="h-3.5 w-3.5" /> Chapter 01 — Smart Ubuhinzi Rwanda
              </div>
              <div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  About Smart
                  <br />
                  Ubuhinzi Rwanda
                </h2>
                <p className="mt-3 max-w-md text-sm text-[#DCFCE7]">
                  A digital field guide for Rwandan farmers — combining crop protection knowledge, weather intelligence, and marketplace
                  access in one trusted book-like experience.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-[#BBF7D0]">
                <ShieldCheck className="h-4 w-4" /> Protecting crops through knowledge and technology
              </div>
            </div>
          </div>

          <div className="p-8">
            <img
              src={aboutBookImages.inline}
              alt="Farmers protecting healthy crops"
              className="float-right ml-4 mb-3 h-32 w-40 rounded-lg border border-[#D6D3C4] object-cover shadow-md dark:border-[#334155] sm:h-36 sm:w-48"
            />
            <p className="font-serif text-lg leading-relaxed text-[#292524] dark:text-[#E7E5E4]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              <span className="float-left mr-2 mt-1 text-6xl font-bold leading-none text-[#166534] dark:text-[#4ADE80]">S</span>
              mart Ubuhinzi Rwanda exists to help every farmer protect their crops before problems become losses. We combine simple
              digital tools with proven agriculture practice: early disease detection, weather-aware planning, and direct access to
              buyers — so that healthy crops reach the market at fair prices.
            </p>
            <p className="mt-4 font-serif leading-relaxed text-[#44403C] dark:text-[#CBD5E1]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Protecting crops starts with prevention: clean seeds, correct spacing, and early scouting for pests. When signs of disease
              appear, our AI detection and expert network help farmers act quickly with the right treatment — reducing loss and
              protecting income across all 30 districts of Rwanda.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-[#166534] dark:text-[#4ADE80]">
              <Clock3 className="h-3.5 w-3.5" /> Read the full crop guides below
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-3">
          {cropGuides.map((guide) => (
            <CropGuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}
