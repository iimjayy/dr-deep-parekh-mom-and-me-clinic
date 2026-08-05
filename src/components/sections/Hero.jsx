import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn, formatMoney, telUrl } from '../../lib/utils';
import { useTilt, useParallax, useOpenStatus } from '../../lib/hooks';
import { Button, Icon, Badge, Stars, Card, Reveal } from '../ui';

/** Soft floating shapes behind the hero — decorative, never focusable. */
function AmbientField() {
  const slow = useParallax(0.05);
  return (
    <div ref={slow} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-24 -left-20 w-[26rem] h-[26rem] rounded-full bg-brand-300/25 dark:bg-brand-800/20 blur-3xl animate-float-slow" />
      <div className="absolute top-10 -right-24 w-[22rem] h-[22rem] rounded-full bg-accent-300/25 dark:bg-accent-800/20 blur-3xl animate-drift" />
      <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] rounded-full bg-highlight-300/20 dark:bg-highlight-900/20 blur-3xl animate-float" />
    </div>
  );
}

export default function Hero({ section }) {
  const { config, openBooking, openModal, track } = useApp();
  const { content, business, brand, tools } = config;
  const hero = content.hero || {};
  const professional = business.professional || {};
  const status = useOpenStatus(business.hours);
  const cardRef = useTilt({ max: 5 });

  const hasTriage = tools?.triage?.enabled;
  const primaryStat = (content.stats || [])[1];

  return (
    <section id={section?.id || 'home'} className="relative overflow-hidden bg-surface-2 mesh-bg pt-12 pb-16 sm:pt-16 sm:pb-24 scroll-mt-28">
      <AmbientField />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ------------------------------------------ copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {hero.eyebrow && (
              <Reveal>
                <span className="inline-flex items-center gap-2 bg-surface border border-line shadow-lift px-3.5 py-1.5 rounded-full text-xs font-bold text-ink">
                  <Stars rating={5} size="w-3.5 h-3.5" />
                  <span>{hero.eyebrow}</span>
                </span>
              </Reveal>
            )}

            <Reveal delay={70}>
              <h1 className="font-heading font-extrabold text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl text-ink">
                {hero.headline}{' '}
                <span className="text-gradient-brand">{hero.headlineAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Badge tone="inverse" size="sm">{professional.name}</Badge>
                {(professional.credentials || []).map((credential) => (
                  <Badge key={credential.label} tone="brand" size="sm" icon={credential.icon}>
                    {credential.label}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto lg:mx-0">{hero.sub}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Button
                  onClick={() => openBooking({ source: 'hero' })}
                  size="lg"
                  icon="CalendarCheck"
                  iconRight="ArrowRight"
                  magnetic
                  className="group w-full sm:w-auto"
                >
                  {hero.primaryCta}
                </Button>

                {hasTriage ? (
                  <Button
                    onClick={() => openModal('triage', { source: 'hero' })}
                    variant="outline"
                    size="lg"
                    icon="Activity"
                    className="w-full sm:w-auto"
                  >
                    {hero.secondaryCta}
                  </Button>
                ) : (
                  <Button as="a" href="#services" variant="outline" size="lg" icon="Compass" className="w-full sm:w-auto">
                    {hero.secondaryCta}
                  </Button>
                )}
              </div>
            </Reveal>

            {(hero.highlights || []).length > 0 && (
              <Reveal delay={300}>
                <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1">
                  {hero.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft">
                      <Icon name="Check" className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {(hero.badges || []).length > 0 && (
              <Reveal delay={360}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-line">
                  {hero.badges.map((badge) => (
                    <div
                      key={badge.title}
                      className="flex items-center gap-3 bg-surface/70 backdrop-blur-sm p-3 rounded-md border border-line text-left card-hover"
                    >
                      <span className="w-9 h-9 rounded-md bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 flex items-center justify-center flex-shrink-0">
                        <Icon name={badge.icon} className="w-4 h-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-extrabold text-ink truncate">{badge.title}</span>
                        <span className="block text-[11px] text-ink-muted truncate">{badge.detail}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* ------------------------------------------ practitioner card */}
          <div className="lg:col-span-5">
            <Reveal variant="scale" delay={200}>
              <div ref={cardRef} className="relative">
                <Card className="p-4 sm:p-5 space-y-4 shadow-pop" glow>
                  <div className="relative rounded-lg overflow-hidden bg-neutral-900 aspect-[4/5] sm:aspect-[5/6]">
                    {professional.photo ? (
                      <img
                        src={professional.photo}
                        alt={`${professional.name} — ${professional.title}`}
                        className="w-full h-full object-cover object-center hover:scale-[1.04] transition-transform duration-700"
                        loading="eager"
                        fetchPriority="high"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        <Icon name="Stethoscope" className="w-16 h-16" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/92 via-neutral-950/25 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold backdrop-blur-md border',
                          status.isOpen
                            ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40'
                            : 'bg-amber-500/20 text-amber-100 border-amber-400/40',
                        )}
                      >
                        <span className={cn('w-1.5 h-1.5 rounded-full', status.isOpen ? 'bg-emerald-300 animate-pulse' : 'bg-amber-300')} />
                        {status.isOpen ? 'Open now' : 'Closed'}
                      </span>
                      {professional.experienceYears && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/15 text-white backdrop-blur-md border border-white/20">
                          {professional.experienceYears}+ years
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 text-white space-y-1">
                      <span className="inline-block bg-brand-500 text-brand-950 font-extrabold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
                        {professional.title}
                      </span>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl leading-tight">{professional.name}</h2>
                      <p className="text-[11px] text-brand-200 font-semibold">
                        {(professional.credentials || []).map((c) => c.label).join(' • ')}
                      </p>
                      {professional.languages?.length > 0 && (
                        <p className="text-[11px] text-white/60 flex items-center gap-1.5 pt-0.5">
                          <Icon name="Languages" className="w-3 h-3" />
                          {professional.languages.join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-md bg-surface-2 border border-line">
                      <span className="block text-[10px] uppercase tracking-wide text-ink-muted font-bold">Consultation</span>
                      <span className="block font-heading font-extrabold text-lg text-brand-700 dark:text-brand-300 leading-tight">
                        {formatMoney(business.pricing?.consultationFee, business.pricing?.currency)}
                      </span>
                    </div>
                    <div className="p-3 rounded-md bg-surface-2 border border-line min-w-0">
                      <span className="block text-[10px] uppercase tracking-wide text-ink-muted font-bold">Today</span>
                      <span className="block font-bold text-xs text-ink leading-tight truncate pt-0.5" title={status.detail}>
                        {status.detail}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Button onClick={() => openBooking({ source: 'hero_card' })} variant="dark" size="sm" icon="CalendarCheck">
                      Book with {professional.shortName || professional.name}
                    </Button>
                    <Button
                      as="a"
                      href={telUrl(business.contact?.phone)}
                      onClick={() => track('call_click', { source: 'hero_card' })}
                      variant="outline"
                      size="sm"
                      aria-label="Call the clinic"
                      className="!px-3.5"
                    >
                      <Icon name="PhoneCall" className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Floating proof chip, pinned to the left edge of the photo at
                    roughly shoulder height. The outer element owns the centring
                    transform so it does not fight the float animation. */}
                {primaryStat && (
                  <div className="hidden lg:block absolute -left-5 top-[46%] -translate-y-1/2">
                    <div className="flex items-center gap-2.5 bg-surface border border-line rounded-md shadow-pop px-3.5 py-2.5 animate-float">
                      <span className="w-9 h-9 rounded-md bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
                        <Icon name={primaryStat.icon || 'Heart'} className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="block font-heading font-extrabold text-base text-ink leading-none">{primaryStat.value}</span>
                        <span className="block text-[10px] text-ink-muted font-semibold">{primaryStat.label}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
