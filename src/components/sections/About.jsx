import React from 'react';
import { useApp } from '../../context/AppContext';
import { useParallax } from '../../lib/hooks';
import { Button, Icon, Badge, Card, Reveal, Section, SectionHeader } from '../ui';

export default function About({ section }) {
  const { config, openBooking } = useApp();
  const { business } = config;
  const professional = business.professional || {};
  const imageRef = useParallax(0.045);

  if (!professional.name) return null;

  return (
    <Section id={section?.id} tone="raised">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* ---------------------------------------- portrait column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal variant="left">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-brand-200/50 to-accent-200/40 dark:from-brand-900/40 dark:to-accent-900/30 rounded-xl blur-xl" aria-hidden="true" />
              <div className="relative rounded-xl overflow-hidden border border-line shadow-pop bg-neutral-900 aspect-[4/5]">
                {professional.photo ? (
                  <img
                    ref={imageRef}
                    src={professional.photo}
                    alt={professional.name}
                    className="w-full h-[112%] object-cover object-center -mt-[6%]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/25">
                    <Icon name="Stethoscope" className="w-20 h-20" />
                  </div>
                )}
              </div>

              {professional.experienceYears && (
                <div className="absolute -bottom-5 -right-3 sm:right-6 bg-surface border border-line rounded-lg shadow-pop px-5 py-3.5 text-center animate-float">
                  <span className="block font-heading font-extrabold text-3xl text-gradient-brand leading-none">
                    {professional.experienceYears}+
                  </span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wide text-ink-muted mt-1">
                    Years in practice
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {professional.languages?.length > 0 && (
            <Reveal delay={120} className="mt-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-ink-muted flex items-center gap-1.5">
                  <Icon name="Languages" className="w-3.5 h-3.5" />
                  Consults in
                </span>
                {professional.languages.map((language) => (
                  <Badge key={language} tone="neutral" size="xs">{language}</Badge>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* ---------------------------------------- copy column */}
        <div className="lg:col-span-7 space-y-8">
          <SectionHeader
            align="left"
            eyebrow="Meet the specialist"
            eyebrowIcon="BadgeCheck"
            title={professional.name}
            sub={professional.bio}
            className="mb-0"
          >
            <Reveal delay={160}>
              <div className="flex flex-wrap gap-2 pt-1">
                {(professional.credentials || []).map((credential) => (
                  <span
                    key={credential.label}
                    className="inline-flex items-center gap-2 bg-surface-2 border border-line rounded-md px-3 py-2"
                    title={credential.issuer}
                  >
                    <Icon name={credential.icon || 'Award'} className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-xs font-extrabold text-ink leading-tight">{credential.label}</span>
                      {credential.issuer && (
                        <span className="block text-[10px] text-ink-muted leading-tight truncate max-w-[13rem]">{credential.issuer}</span>
                      )}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          </SectionHeader>

          {/* practice philosophy */}
          {professional.philosophy?.length > 0 && (
            <Reveal delay={80}>
              <Card inset className="p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-base text-ink flex items-center gap-2">
                  <Icon name="Quote" className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  How this practice works
                </h3>
                <ul className="space-y-3">
                  {professional.philosophy.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          )}

          {/* career timeline */}
          {professional.timeline?.length > 0 && (
            <div className="space-y-4">
              <Reveal>
                <h3 className="font-heading font-extrabold text-base text-ink flex items-center gap-2">
                  <Icon name="Timer" className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  Training & practice
                </h3>
              </Reveal>

              <ol className="relative pl-7 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-line">
                {professional.timeline.map((entry, index) => (
                  <Reveal key={entry.year + entry.title} delay={index * 70} as="li" className="relative">
                    <span
                      className="absolute -left-7 top-1 w-[15px] h-[15px] rounded-full border-[3px] border-surface bg-brand-500 shadow-sm"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-heading font-extrabold text-sm text-brand-700 dark:text-brand-300 tabular-nums">
                        {entry.year}
                      </span>
                      <h4 className="font-bold text-sm text-ink">{entry.title}</h4>
                    </div>
                    <p className="text-[13px] text-ink-muted leading-relaxed mt-0.5">{entry.detail}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}

          <Reveal delay={120}>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={() => openBooking({ source: 'about' })} icon="CalendarCheck" magnetic>
                Book a consultation
              </Button>
              <Button as="a" href="#reviews" variant="outline" icon="Quote">
                Read what parents say
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
