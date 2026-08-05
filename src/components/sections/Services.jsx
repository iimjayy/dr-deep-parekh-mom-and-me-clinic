import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Button, Icon, Badge, Card, Reveal, Section, SectionHeader, Tabs } from '../ui';

function ServiceCard({ service, index, onBook }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={(index % 3) * 90} as="article">
      <Card
        hover
        className={cn(
          'p-6 h-full flex flex-col gap-4 relative overflow-hidden group',
          open && 'border-brand-300 dark:border-brand-700 shadow-float',
        )}
      >
        {service.popular && (
          <span className="absolute top-0 right-0 bg-highlight-500 text-highlight-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-lg">
            Most booked
          </span>
        )}

        <div className="flex items-start gap-3.5">
          <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-white flex items-center justify-center flex-shrink-0 shadow-lift group-hover:scale-105 transition-transform">
            <Icon name={service.icon} className="w-5 h-5" />
          </span>
          <div className="min-w-0 pt-0.5">
            <Badge tone="neutral" size="xs">{service.category}</Badge>
            <h3 className="font-heading font-extrabold text-lg text-ink leading-snug mt-1.5">{service.title}</h3>
          </div>
        </div>

        <p className="text-sm text-ink-soft leading-relaxed">{service.shortDesc}</p>

        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2 pb-1">
              {(service.details || []).map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-[13px] text-ink-soft leading-relaxed">
                  <Icon name="Check" className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink-muted font-semibold mt-auto pt-1">
          {service.duration && (
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" className="w-3.5 h-3.5" />
              {service.duration}
            </span>
          )}
          {service.aftercare && (
            <span className="flex items-center gap-1.5">
              <Icon name="HeartPulse" className="w-3.5 h-3.5" />
              {service.aftercare}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-line">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-ink-soft hover:text-ink transition-colors cursor-pointer py-2"
          >
            {open ? 'Show less' : "What's included"}
            <Icon name="ChevronDown" className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
          </button>
          <Button onClick={() => onBook(service)} size="sm" variant="soft" icon="CalendarCheck" className="flex-shrink-0">
            Book
          </Button>
        </div>
      </Card>
    </Reveal>
  );
}

export default function Services({ section }) {
  const { config, openBooking, t } = useApp();
  const services = config.content.services || [];
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    const unique = [...new Set(services.map((service) => service.category).filter(Boolean))];
    return [
      { value: 'all', label: 'Everything', icon: 'Grid2x2', count: services.length },
      ...unique.map((category) => ({
        value: category,
        label: category,
        count: services.filter((service) => service.category === category).length,
      })),
    ];
  }, [services]);

  const visible = filter === 'all' ? services : services.filter((service) => service.category === filter);

  if (!services.length) return null;

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader
        eyebrow={t('section.services', 'Specialised care')}
        eyebrowIcon="Stethoscope"
        title="Everything your child needs,"
        titleAccent="under one roof"
        sub="From the first newborn check to the school-entry booster — each visit unhurried, explained, and priced the same whether you walk in or book ahead."
      />

      {categories.length > 2 && (
        <Reveal className="flex justify-center mb-9">
          <Tabs tabs={categories} value={filter} onChange={setFilter} />
        </Reveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onBook={(item) => openBooking({ source: 'services', reason: item.title })}
          />
        ))}
      </div>

      <Reveal delay={150} className="mt-10">
        <Card inset className="p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <span className="w-12 h-12 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
            <Icon name="MessageCircle" className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-extrabold text-lg text-ink">Not sure which visit you need?</h3>
            <p className="text-sm text-ink-soft mt-0.5">
              Describe the symptoms and we will tell you whether it needs an appointment today, this week, or not at all.
            </p>
          </div>
          <Button onClick={() => openBooking({ source: 'services_footer' })} icon="MessageSquare" className="flex-shrink-0">
            Ask on WhatsApp
          </Button>
        </Card>
      </Reveal>
    </Section>
  );
}
