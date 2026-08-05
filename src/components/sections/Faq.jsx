import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn, whatsappUrl } from '../../lib/utils';
import { Accordion, Button, Icon, Card, Reveal, Section, SectionHeader, Input, Badge } from '../ui';

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export default function Faq({ section }) {
  const { config, t, track } = useApp();
  const faqs = config.content.faqs || [];
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((faq) => `${faq.q} ${faq.a}`.toLowerCase().includes(q));
  }, [faqs, query]);

  if (!faqs.length) return null;

  return (
    <Section id={section?.id} tone="raised">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start space-y-6">
          <SectionHeader
            align="left"
            eyebrow={t('section.faq', 'Common questions')}
            eyebrowIcon="MessageCircle"
            title="Answers to what"
            titleAccent="parents ask most"
            sub="Fees, timings, walk-ins and vaccines — the practical things, answered plainly."
            className="mb-0"
          />

          <Reveal delay={120}>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the answers…"
              icon="Search"
              aria-label="Search frequently asked questions"
            />
          </Reveal>

          <Reveal delay={180}>
            <Card inset className="p-5 space-y-3">
              <h3 className="font-heading font-extrabold text-sm text-ink flex items-center gap-2">
                <Icon name="MessageSquare" className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Still not answered?
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed">
                Send the question on WhatsApp. The clinic desk replies during clinic hours, usually within the hour.
              </p>
              <Button
                as="a"
                href={whatsappUrl(config.business.contact?.whatsapp, 'Hello, I have a question about the clinic:')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { source: 'faq' })}
                variant="whatsapp"
                size="sm"
                icon="MessageSquare"
                full
              >
                Ask on WhatsApp
              </Button>
            </Card>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          {filtered.length ? (
            <Reveal>
              <Accordion items={filtered} defaultOpen={query ? [0] : [0]} />
            </Reveal>
          ) : (
            <Card inset className="p-10 text-center space-y-2">
              <Icon name="Search" className="w-8 h-8 text-ink-muted mx-auto" />
              <p className="text-sm font-bold text-ink">No answer matched “{query}”</p>
              <p className="text-xs text-ink-muted">Try “fee”, “timings”, “vaccine” or “walk-in”.</p>
            </Card>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Parent guides                                                       */
/* ------------------------------------------------------------------ */

export function Resources({ section }) {
  const { config, openBooking } = useApp();
  const resources = config.content.resources || {};
  const [active, setActive] = useState(0);
  const items = resources.items || [];

  if (!items.length) return null;
  const current = items[active];

  return (
    <Section id={section?.id} tone="inset" decorated>
      <SectionHeader eyebrow="Parent guides" eyebrowIcon="BookOpen" title={resources.title} sub={resources.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* selector */}
        <div className="lg:col-span-5 space-y-2.5">
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <Reveal key={item.title} delay={index * 70}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  className={cn(
                    'w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3.5',
                    selected
                      ? 'bg-surface border-brand-300 dark:border-brand-700 shadow-float'
                      : 'bg-surface/60 border-line hover:border-brand-200 dark:hover:border-brand-800 hover:bg-surface',
                  )}
                >
                  <span
                    className={cn(
                      'w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 border transition-colors',
                      selected
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-surface-3 text-ink-muted border-line',
                    )}
                  >
                    <Icon name={item.icon} className="w-4 h-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 mb-1">
                      <Badge tone={selected ? 'brand' : 'neutral'} size="xs">{item.tag}</Badge>
                    </span>
                    <span className={cn('block font-bold text-sm leading-snug', selected ? 'text-brand-800 dark:text-brand-200' : 'text-ink')}>
                      {item.title}
                    </span>
                    <span className="block text-[12px] text-ink-muted leading-relaxed mt-1">{item.summary}</span>
                  </span>
                  <Icon
                    name="ChevronRight"
                    className={cn('w-4 h-4 flex-shrink-0 mt-2.5 transition-transform', selected ? 'text-brand-500 translate-x-0.5' : 'text-ink-muted')}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* detail */}
        <div className="lg:col-span-7">
          <Reveal variant="right">
            <Card className="p-6 sm:p-8 h-full flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-white flex items-center justify-center flex-shrink-0 shadow-lift">
                  <Icon name={current.icon} className="w-5 h-5" />
                </span>
                <div>
                  <Badge tone="highlight" size="xs">{current.tag}</Badge>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-ink leading-snug mt-1.5">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-ink-soft leading-relaxed">{current.summary}</p>

              <ul className="space-y-3">
                {(current.points || []).map((point, index) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-md bg-surface-2 border border-line animate-slide-up"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0 mt-px">
                      {index + 1}
                    </span>
                    <span className="text-[13px] text-ink-soft leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-line flex flex-col sm:flex-row items-center gap-3">
                <p className="text-[12px] text-ink-muted flex-1 leading-relaxed">
                  General guidance only — if you are worried about your own child, have them seen.
                </p>
                <Button onClick={() => openBooking({ source: 'resources', reason: current.tag })} size="sm" icon="CalendarCheck" className="flex-shrink-0">
                  Book a visit
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
