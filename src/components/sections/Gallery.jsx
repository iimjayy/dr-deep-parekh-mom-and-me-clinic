import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Button, Icon, Reveal, Section, SectionHeader, Lightbox, Badge } from '../ui';

/* ------------------------------------------------------------------ */
/* World-Class Asymmetric Featured Grid + Category Filter Gallery     */
/* ------------------------------------------------------------------ */

export default function Gallery({ section }) {
  const { config, openBooking, track } = useApp();
  const allItems = config.content.gallery || [];
  const [activeTab, setActiveTab] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  if (!allItems.length) return null;

  // Categorize items dynamically for smooth filtering
  const categories = [
    { id: 'all', label: `All Facilities (${allItems.length})`, icon: 'LayoutGrid' },
    { id: 'reception', label: 'Reception & Play Lawn', icon: 'Sparkles' },
    { id: 'chambers', label: 'Doctor Chambers', icon: 'Stethoscope' },
    { id: 'facility', label: 'Building & Amenities', icon: 'Building2' },
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reception') return item.src.includes('unnamed.jpg') || item.src.includes('reception') || item.src.includes('6926c46f64fb3') || item.src.includes('unnamed-5.jpg') || item.src.includes('unnamed-8.jpg');
    if (activeTab === 'chambers') return item.src.includes('unnamed-2.jpg') || item.src.includes('doctor_consultation') || item.src.includes('unnamed-4.jpg') || item.src.includes('unnamed-6.jpg');
    if (activeTab === 'facility') return item.src.includes('g_square') || item.src.includes('unnamed-7.jpg') || item.src.includes('unnamed-3.jpg');
    return true;
  });

  const openLightbox = (index) => {
    setLightbox(index);
    track('gallery_open', { index });
  };

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader
        eyebrow="Inside the clinic"
        eyebrowIcon="Camera"
        title="A space children"
        titleAccent="do not dread"
        sub="Clean, calm and built at a child's scale. Explore Dr. Deep Parekh's Mom & Me Clinic in Ghatkopar East — featuring a piano-themed reception, soft grass play lawn, and sterile consultation chambers."
      />

      {/* Category Filter Tabs & Reel Header */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 shrink-0">
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer shrink-0',
                  isActive
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-surface border-line text-ink-soft hover:text-ink hover:border-line-elevated'
                )}
              >
                <Icon name={tab.icon} className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <Badge tone="brand" icon="Sparkles" className="hidden lg:flex shrink-0">
          Click any photo for 4K Zoom
        </Badge>
      </div>

      {/* Signature Asymmetric Hero Grid (1 Large Featured + 3-4 Supporting Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, index) => {
          const isFeatured = index === 0;
          const originalIndex = allItems.findIndex((i) => i.src === item.src);

          return (
            <Reveal
              key={item.src + index}
              delay={index * 70}
              className={cn(
                isFeatured
                  ? 'md:col-span-2 md:row-span-2 min-h-[320px] sm:min-h-[420px]'
                  : 'min-h-[190px] sm:min-h-[220px]'
              )}
            >
              <button
                type="button"
                onClick={() => openLightbox(originalIndex >= 0 ? originalIndex : index)}
                className="group relative w-full h-full rounded-2xl overflow-hidden border border-line bg-neutral-900 cursor-pointer text-left card-hover shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.title?.en || item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t via-transparent to-transparent',
                    isFeatured ? 'from-neutral-950/90 via-neutral-950/20' : 'from-neutral-950/85'
                  )}
                />

                {/* Featured Badge for Hero Card */}
                {isFeatured && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-600/90 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20 shadow-md flex items-center gap-1.5">
                    <Icon name="Star" className="w-3 h-3 fill-current" />
                    Featured Clinic Tour
                  </span>
                )}

                {/* Zoom Icon */}
                <span className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Maximize2" className="w-4 h-4" />
                </span>

                {/* Caption Banner */}
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                  <span className={cn('block font-heading font-extrabold leading-snug', isFeatured ? 'text-xl sm:text-2xl' : 'text-base')}>
                    {item.title?.en || item.title}
                  </span>
                  {item.caption?.en && (
                    <span className={cn('block text-white/80 mt-1 leading-relaxed', isFeatured ? 'text-xs sm:text-sm line-clamp-2' : 'text-[11px] line-clamp-1')}>
                      {item.caption?.en || item.caption}
                    </span>
                  )}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Horizontal Thumbnail Carousel Strip for Quick Scrolling All Photos */}
      <div className="mt-8 pt-6 border-t border-line">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="Images" className="w-3.5 h-3.5 text-brand-500" />
            <span>Complete Photo Gallery ({allItems.length} Original Photos)</span>
          </p>
          <span className="text-[11px] text-ink-muted">Scroll horizontally →</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {allItems.map((item, idx) => (
            <button
              key={'thumb-' + item.src + idx}
              type="button"
              onClick={() => openLightbox(idx)}
              className="group relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden border border-line bg-neutral-900 cursor-pointer hover:border-brand-500 transition-all active:scale-95"
            >
              <img src={item.src} alt={item.title?.en || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors" />
            </button>
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
            <Card className="overflow-hidden">
              <div className="p-5 space-y-1">
                <h3 className="font-heading font-extrabold text-base text-ink">{item.title}</h3>
                {item.detail && <p className="text-[13px] text-ink-soft leading-relaxed">{item.detail}</p>}
              </div>
            </Card>
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
