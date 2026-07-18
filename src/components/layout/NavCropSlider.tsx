import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navSlides } from "../../content/siteContent";

export function NavCropSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % navSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => setIndex((prev) => (prev - 1 + navSlides.length) % navSlides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % navSlides.length);

  return (
    <div className="border-b border-[#334155]/40 bg-[#020617] px-3 py-2 sm:px-4 sm:py-3">
      <div className="relative mx-auto h-[88px] max-w-7xl overflow-hidden rounded-xl shadow-lg sm:h-28 lg:h-32">
        {navSlides.map((slide, slideIndex) => (
          <div
            key={slide.title}
            className={`absolute inset-0 flex items-center justify-center bg-cover bg-center transition-opacity duration-700 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(${slide.tint}, ${slide.tint}), url('${slide.image}')`,
            }}
          >
            <div className="text-center text-white">
              <p className="text-[10px] uppercase tracking-widest text-[#DCFCE7] sm:text-xs">{slide.tag}</p>
              <h3 className="mt-1 text-base font-bold sm:text-lg md:text-xl">{slide.title}</h3>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1.5 text-white transition-colors duration-200 hover:bg-black/50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1.5 text-white transition-colors duration-200 hover:bg-black/50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {navSlides.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to ${slide.title}`}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-all duration-200 ${
                slideIndex === index ? "w-4 bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
