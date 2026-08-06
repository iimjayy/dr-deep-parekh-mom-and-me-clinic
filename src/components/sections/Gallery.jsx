import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Button, Icon, Reveal, Section, SectionHeader, Lightbox } from '../ui';

/* ------------------------------------------------------------------ */
/* Exact 3-Card Asymmetric Layout + Horizontal Page Carousel          */
/* ------------------------------------------------------------------ */

export default function Gallery({ section }) {
  const { config, openBooking, track } = useApp();
  const allItems = config.content.gallery || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const scrollRef = useRef(null);

  if (!allItems.length) return null;

  // Custom ordered items for Set 1 as explicitly requested by user:
  // 1 (Big Left): Dr. Deep Parekh Consultation Chamber (unnamed-2.jpg)
  // 2 (Top Right): Piano Reception & Soft Play Lawn (unnamed.jpg)
  // 3 (Bottom Right): Clinic Interior & Ambient Lighting (unnamed-3.jpg)
  const set1 = [
    allItems.find((i) => i.src.includes('unnamed-2.jpg')) || allItems[0],
    allItems.find((i) => i.src.includes('unnamed.jpg')) || allItems[1],
    allItems.find((i) => i.src.includes('unnamed-3.jpg')) || allItems[2],
  ];

  const remainingItems = allItems.filter((i) => !set1.some((s) => s.src === i.src));

  // Chunk all remaining items into sets of 3
  const slides = [set1];
  for (let i = 0; i < remainingItems.length; i += 3) {
    const chunk = remainingItems.slice(i, i + 3);
    if (chunk.length === 3) {
      slides.push(chunk);
    } else if (chunk.length > 0) {
      // Fill incomplete chunk to 3 items using items from set1 if needed
      slides.push([...chunk, ...set1.slice(0, 3 - chunk.length)]);
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    track('gallery_slide_next', { slide: currentSlide + 1 });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    track('gallery_slide_prev', { slide: currentSlide - 1 });
  };

  const openLightbox = (item) => {
    const originalIndex = allItems.findIndex((i) => i.src === item.src);
    setLightbox(originalIndex >= 0 ? originalIndex : 0);
  };

  const activeSet = slides[currentSlide];

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader
        eyebrow="Inside the clinic"
        eyebrowIcon="Camera"
        title="A space children"
        titleAccent="do not dread"
        sub="Clean, calm and built at a child's scale. Have a look before you arrive — it makes the first visit easier for everyone."
      />

      {/* Main Container with Relative Arrow Navigation */}
      <div className="relative group/carousel max-w-6xl mx-auto">
        {/* Horizontal Sliding Sets Track */}
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slideItems, slideIdx) => (
              <div key={'slide-' + slideIdx} className="w-full shrink-0">
                {/* Exact 3-Card Grid: 1 Big Left + 2 Stacked Right */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch min-h-[380px] sm:min-h-[460px]">
                  {/* Big Featured Left Card (Spans 2 columns, 2 rows) */}
                  <Reveal className="md:col-span-2 md:row-span-2 h-full">
                    <button
                      type="button"
                      onClick={() => openLightbox(slideItems[0])}
                      className="group relative w-full h-full min-h-[260px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-line bg-neutral-900 cursor-pointer text-left card-hover shadow-md"
                    >
                      <img
                        src={slideItems[0].src}
                        alt={slideItems[0].title?.en || slideItems[0].title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                      <span className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="Maximize2" className="w-4 h-4" />
                      </span>

                      <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <span className="block font-heading font-extrabold text-xl sm:text-2xl leading-snug">
                          {slideItems[0].title?.en || slideItems[0].title}
                        </span>
                        {(slideItems[0].caption?.en || slideItems[0].caption) && (
                          <span className="block text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed line-clamp-2">
                            {slideItems[0].caption?.en || slideItems[0].caption}
                          </span>
                        )}
                      </span>
                    </button>
                  </Reveal>

                  {/* Top Right Card */}
                  <Reveal delay={80} className="h-full min-h-[180px] sm:min-h-[215px]">
                    <button
                      type="button"
                      onClick={() => openLightbox(slideItems[1])}
                      className="group relative w-full h-full rounded-2xl overflow-hidden border border-line bg-neutral-900 cursor-pointer text-left card-hover shadow-md"
                    >
                      <img
                        src={slideItems[1].src}
                        alt={slideItems[1].title?.en || slideItems[1].title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                      <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="Maximize2" className="w-3.5 h-3.5" />
                      </span>

                      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                        <span className="block font-heading font-extrabold text-base sm:text-lg leading-snug">
                          {slideItems[1].title?.en || slideItems[1].title}
                        </span>
                        {(slideItems[1].caption?.en || slideItems[1].caption) && (
                          <span className="block text-[11px] text-white/75 mt-1 leading-relaxed line-clamp-1">
                            {slideItems[1].caption?.en || slideItems[1].caption}
                          </span>
                        )}
                      </span>
                    </button>
                  </Reveal>

                  {/* Bottom Right Card */}
                  <Reveal delay={140} className="h-full min-h-[180px] sm:min-h-[215px]">
                    <button
                      type="button"
                      onClick={() => openLightbox(slideItems[2])}
                      className="group relative w-full h-full rounded-2xl overflow-hidden border border-line bg-neutral-900 cursor-pointer text-left card-hover shadow-md"
                    >
                      <img
                        src={slideItems[2].src}
                        alt={slideItems[2].title?.en || slideItems[2].title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                      <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="Maximize2" className="w-3.5 h-3.5" />
                      </span>

                      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                        <span className="block font-heading font-extrabold text-base sm:text-lg leading-snug">
                          {slideItems[2].title?.en || slideItems[2].title}
                        </span>
                        {(slideItems[2].caption?.en || slideItems[2].caption) && (
                          <span className="block text-[11px] text-white/75 mt-1 leading-relaxed line-clamp-1">
                            {slideItems[2].caption?.en || slideItems[2].caption}
                          </span>
                        )}
                      </span>
                    </button>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous photos"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-line text-ink flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
        >
          <Icon name="ChevronLeft" className="w-6 h-6" />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next photos"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-line text-ink flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
        >
          <Icon name="ChevronRight" className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={'dot-' + idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide set ${idx + 1}`}
              className={cn(
                'h-2.5 rounded-full transition-all cursor-pointer',
                currentSlide === idx ? 'w-8 bg-brand-600' : 'w-2.5 bg-line hover:bg-ink-muted'
              )}
            />
          ))}
        </div>
      </div>

      <Reveal delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <Button onClick={() => openBooking({ source: 'gallery' })} icon="CalendarCheck">
          Book your first visit
        </Button>
        <p className="text-xs text-ink-muted">Step-free entry · elevator access · 8th floor G Square Building</p>
      </Reveal>

      <Lightbox items={allItems} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after comparison                                           */
/* ------------------------------------------------------------------ */

export function BeforeAfter({ section }) {
  const { config, openBooking } = useApp();
  const data = config.content.beforeAfter || {};
  if (!data.cases?.length) return null;

  return (
    <Section id={section?.id} tone="inset">
      <SectionHeader eyebrow="Real results" eyebrowIcon="Sparkles" title={data.title} sub={data.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.cases.map((item, index) => (
          <Reveal key={item.id} delay={index * 110}>
            <div className="p-5 space-y-1 bg-surface border border-line rounded-2xl">
              <h3 className="font-heading font-extrabold text-base text-ink">{item.title}</h3>
              {item.detail && <p className="text-[13px] text-ink-soft leading-relaxed">{item.detail}</p>}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={180} className="flex flex-col items-center gap-3 mt-9">
        <Button onClick={() => openBooking({ source: 'before_after' })} icon="CalendarCheck">
          Discuss your case
        </Button>
      </Reveal>
    </Section>
  );
}
