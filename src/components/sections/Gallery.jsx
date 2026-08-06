import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn, clamp } from '../../lib/utils';
import { Button, Icon, Card, Reveal, Section, SectionHeader, Lightbox, Badge } from '../ui';

/* ------------------------------------------------------------------ */
/* Horizontal Scroll Gallery                                           */
/* ------------------------------------------------------------------ */

export default function Gallery({ section }) {
  const { config, openBooking, track } = useApp();
  const items = config.content.gallery || [];
  const [lightbox, setLightbox] = useState(null);
  const scrollRef = useRef(null);

  if (!items.length) return null;

  const open = (index) => {
    setLightbox(index);
    track('gallery_open', { index });
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <Section id={section?.id} tone="base">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionHeader
          eyebrow="Inside the clinic"
          eyebrowIcon="Camera"
          title="A space children"
          titleAccent="do not dread"
          sub="Take a tour of Dr. Deep Parekh's Mom & Me Clinic in Ghatkopar East. Clean, calm, equipped with child-friendly piano reception and soft play area."
          className="mb-0"
        />

        {/* Carousel Scroll Controls */}
        <div className="flex items-center gap-2 self-start md:self-end shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-line bg-surface hover:bg-surface-elevated hover:border-brand-300 text-ink flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Icon name="ChevronLeft" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-line bg-surface hover:bg-surface-elevated hover:border-brand-300 text-ink flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Icon name="ChevronRight" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <Reveal
            key={item.src + index}
            delay={index * 60}
            className="snap-start shrink-0 w-[280px] sm:w-[340px] md:w-[380px]"
          >
            <button
              type="button"
              onClick={() => open(index)}
              className="group relative w-full h-[260px] sm:h-[300px] rounded-xl overflow-hidden border border-line bg-neutral-900 cursor-pointer text-left card-hover shadow-sm"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

              <span className="absolute top-3 right-3 w-9 h-9 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Maximize2" className="w-4 h-4" />
              </span>

              <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="block font-heading font-extrabold text-base sm:text-lg leading-snug">{item.title}</span>
                {item.caption && (
                  <span className="block text-[12px] text-white/75 mt-1 leading-relaxed line-clamp-2">{item.caption}</span>
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
        <Button onClick={() => openBooking({ source: 'gallery' })} icon="CalendarCheck">
          Book your first visit
        </Button>
        <p className="text-xs text-ink-muted">Step-free entry · elevator access · 8th floor G Square Building</p>
      </Reveal>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after comparison                                           */
/* ------------------------------------------------------------------ */

function CompareSlider({ item }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  }, []);

  useEffect(() => {
    if (!dragging) return undefined;
    const onMove = (event) => {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updateFromClientX]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setPosition((p) => clamp(p - 4, 0, 100));
    if (event.key === 'ArrowRight') setPosition((p) => clamp(p + 4, 0, 100));
  };

  return (
    <Card className="overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] sm:aspect-[16/10] select-none overflow-hidden bg-neutral-900 touch-none"
        onMouseDown={(event) => {
          setDragging(true);
          updateFromClientX(event.clientX);
        }}
        onTouchStart={(event) => {
          setDragging(true);
          updateFromClientX(event.touches[0].clientX);
        }}
      >
        <img src={item.after} alt={`${item.title} — after`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={item.before}
            alt={`${item.title} — before`}
            className="absolute inset-0 h-full object-cover max-w-none"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
            loading="lazy"
          />
        </div>

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-neutral-950/70 backdrop-blur-sm text-white text-[10px] font-extrabold border border-white/15">
          {item.beforeLabel || 'Before'}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-500 text-brand-950 text-[10px] font-extrabold">
          {item.afterLabel || 'After'}
        </span>

        <div className="absolute inset-y-0 w-1 bg-white shadow-pop pointer-events-none" style={{ left: `${position}%` }} />

        <button
          type="button"
          role="slider"
          aria-label={`Compare ${item.title}`}
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-pop border-2 border-brand-500 flex items-center justify-center cursor-ew-resize text-brand-700"
          style={{ left: `${position}%` }}
        >
          <Icon name="ChevronLeft" className="w-3.5 h-3.5 -mr-1" />
          <Icon name="ChevronRight" className="w-3.5 h-3.5 -ml-1" />
        </button>
      </div>

      <div className="p-5 space-y-1">
        <h3 className="font-heading font-extrabold text-base text-ink">{item.title}</h3>
        {item.detail && <p className="text-[13px] text-ink-soft leading-relaxed">{item.detail}</p>}
      </div>
    </Card>
  );
}

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
            <CompareSlider item={item} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={180} className="flex flex-col items-center gap-3 mt-9">
        <Badge tone="neutral" icon="Info">Published with patient consent · results vary between individuals</Badge>
        <Button onClick={() => openBooking({ source: 'before_after' })} icon="CalendarCheck">
          Discuss your case
        </Button>
      </Reveal>
    </Section>
  );
}
