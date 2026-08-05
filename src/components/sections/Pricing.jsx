import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Button, Icon, Badge, Card, Reveal, Section, SectionHeader, FootNote } from '../ui';

export default function Pricing({ section }) {
  const { config, openBooking } = useApp();
  const pricing = config.content.pricing || {};
  const plans = pricing.plans || [];
  if (!plans.length) return null;

  return (
    <Section id={section?.id} tone="raised">
      <SectionHeader eyebrow="Transparent pricing" eyebrowIcon="Wallet" title={pricing.title} sub={pricing.sub} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 100}>
            <Card
              hover
              glow={plan.featured}
              className={cn(
                'p-6 sm:p-7 h-full flex flex-col gap-5 relative',
                plan.featured && 'border-brand-300 dark:border-brand-700 shadow-float',
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge tone="brand" icon="Star">Most chosen</Badge>
                </span>
              )}

              <div className="space-y-1.5">
                <h3 className="font-heading font-extrabold text-lg text-ink">{plan.name}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tabular-nums">{plan.price}</span>
                {plan.cadence && <span className="text-xs font-semibold text-ink-muted">/ {plan.cadence}</span>}
              </div>

              <ul className="space-y-2.5 flex-1">
                {(plan.features || []).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink-soft leading-relaxed">
                    <Icon name="Check" className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => openBooking({ source: 'pricing', reason: plan.name })}
                variant={plan.featured ? 'primary' : 'outline'}
                full
                icon="CalendarCheck"
              >
                Book this
              </Button>
            </Card>
          </Reveal>
        ))}
      </div>

      {pricing.note && (
        <Reveal delay={200} className="mt-8 max-w-3xl mx-auto">
          <FootNote>{pricing.note}</FootNote>
        </Reveal>
      )}
    </Section>
  );
}
