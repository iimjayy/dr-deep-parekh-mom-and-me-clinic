import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn, telUrl, whatsappUrl, directionsUrl } from '../../lib/utils';
import { Button, Icon, Card, Marquee, Reveal, Section, SectionHeader, StatValue } from '../ui';

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

export function LogoStrip({ section }) {
  const { config } = useApp();
  const strip = config.content.logoStrip || {};
  if (!strip.items?.length) return null;

  return (
    <section id={section?.id} className="bg-surface border-y border-line py-6 overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-muted">
          {strip.title}
        </p>
      </div>
      <Marquee className="[--gap:0px]" speed={38}>
        {strip.items.map((item, index) => (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-2.5 px-6 sm:px-8 text-ink-soft whitespace-nowrap"
          >
            <Icon name={item.icon} className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
            <span className="text-sm font-bold">{item.label}</span>
            <span className="w-1 h-1 rounded-full bg-line ml-4" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export function Stats({ section }) {
  const { config } = useApp();
  const stats = config.content.stats || [];
  if (!stats.length) return null;

  return (
    <Section id={section?.id} tone="raised" size="sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80}>
            <Card hover className="p-5 sm:p-6 h-full flex flex-col gap-2.5 group">
              <span className="w-10 h-10 rounded-md bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon name={stat.icon || 'Sparkles'} className="w-5 h-5" />
              </span>
              <StatValue
                value={stat.value}
                className="font-heading font-extrabold text-2xl sm:text-[2rem] text-ink leading-none tabular-nums"
              />
              <span className="text-xs font-extrabold text-ink-soft">{stat.label}</span>
              {stat.subtext && <span className="text-[11px] text-ink-muted leading-snug mt-auto">{stat.subtext}</span>}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export function Process({ section }) {
  const { config, openBooking } = useApp();
  const process = config.content.process || {};
  if (!process.steps?.length) return null;

  return (
    <Section id={section?.id} tone="inset" decorated>
      <SectionHeader eyebrow="How it works" eyebrowIcon="Compass" title={process.title} sub={process.sub} />

      <div className="relative">
        {/* connecting rail on desktop */}
        <div
          className="hidden lg:block absolute top-[3.25rem] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-brand-300 dark:via-brand-800 to-transparent"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 110} as="li">
              <Card hover className="p-6 h-full flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-lift">
                    <Icon name={step.icon} className="w-5 h-5" />
                  </span>
                  <span className="font-heading font-extrabold text-4xl text-line select-none leading-none" aria-hidden="true">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg text-ink">{step.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed flex-1">{step.detail}</p>
                {step.meta && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60 rounded-full px-2.5 py-1 self-start">
                    <Icon name="Clock" className="w-3 h-3" />
                    {step.meta}
                  </span>
                )}
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal delay={200} className="flex justify-center mt-10">
        <Button onClick={() => openBooking({ source: 'process' })} size="lg" icon="CalendarCheck" magnetic>
          Start with step one
        </Button>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA                                                         */
/* ------------------------------------------------------------------ */

export function Cta({ section }) {
  const { config, openBooking, track } = useApp();
  const { content, business, brand } = config;
  const cta = content.cta || {};
  const address = business.contact?.address || {};
  const fullAddress = [address.street, address.locality, address.postalCode].filter(Boolean).join(', ');

  return (
    <section id={section?.id} className="relative overflow-hidden bg-surface-inverse text-ink-inverse py-20 sm:py-28 scroll-mt-28">
      <div className="absolute inset-0 dot-pattern opacity-[0.07]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-brand-500/20 blur-3xl animate-float-slow" aria-hidden="true" />
      <div className="absolute -bottom-32 right-1/4 w-[26rem] h-[26rem] rounded-full bg-accent-500/15 blur-3xl animate-drift" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
            <Icon name="Sparkles" className="w-3.5 h-3.5 text-brand-300" />
            {brand.tagline}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl leading-[1.1]">{cta.title}</h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-base opacity-70 max-w-2xl mx-auto leading-relaxed">{cta.sub}</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button onClick={() => openBooking({ source: 'cta' })} variant="whatsapp" size="lg" icon="MessageSquare" magnetic className="w-full sm:w-auto">
              {cta.primary}
            </Button>
            <Button
              as="a"
              href={telUrl(business.contact?.phone)}
              onClick={() => track('call_click', { source: 'cta' })}
              variant="outline"
              size="lg"
              icon="PhoneCall"
              className="w-full sm:w-auto !bg-white/5 !border-white/20 !text-current hover:!bg-white/10"
            >
              {cta.secondary} · {business.contact?.phone}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-[12px] opacity-60">
            <a
              href={directionsUrl(fullAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"
            >
              <Icon name="MapPin" className="w-3.5 h-3.5" />
              {business.contact?.landmark || address.locality}
            </a>
            <a
              href={whatsappUrl(business.contact?.whatsapp, 'Hello, I would like to ask a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"
            >
              <Icon name="MessageSquare" className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            {business.hours?.note && (
              <span className="flex items-center gap-1.5">
                <Icon name="Clock" className="w-3.5 h-3.5" />
                {business.hours.note}
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
