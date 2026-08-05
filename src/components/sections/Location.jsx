import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  cn, telUrl, whatsappUrl, directionsUrl, hoursRows, copyText, shareOrCopy, DAY_KEYS,
} from '../../lib/utils';
import { useOpenStatus } from '../../lib/hooks';
import { Button, Icon, Card, Badge, Reveal, Section, SectionHeader } from '../ui';

export default function Location({ section }) {
  const { config, openBooking, toast, t, track } = useApp();
  const { business, brand } = config;
  const contact = business.contact || {};
  const address = contact.address || {};
  const status = useOpenStatus(business.hours);
  const rows = hoursRows(business.hours);
  const todayKey = DAY_KEYS[new Date().getDay()];

  const fullAddress = [address.street, address.locality, address.region, address.postalCode]
    .filter(Boolean)
    .join(', ');

  const onCopy = async () => {
    const ok = await copyText(fullAddress);
    toast(ok ? 'Address copied to clipboard' : 'Could not copy the address', {
      tone: ok ? 'good' : 'warn',
      icon: ok ? 'Check' : 'Info',
    });
    track('address_copy', { source: 'location' });
  };

  const onShare = async () => {
    const result = await shareOrCopy({
      title: `${brand.name} ${brand.nameAccent || ''}`.trim(),
      text: `${brand.tagline} — ${fullAddress}`,
      url: window.location.href,
    });
    if (result === 'copied') toast('Link copied to clipboard', { tone: 'good', icon: 'Check' });
    if (result === 'failed') toast('Sharing is not available on this device', { tone: 'warn', icon: 'Info' });
    track('share_click', { result });
  };

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader
        eyebrow={t('section.location', 'Find us')}
        eyebrowIcon="MapPin"
        title="Getting here is"
        titleAccent="straightforward"
        sub={contact.landmark}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ------------------------------------------ map */}
        <div className="lg:col-span-7 space-y-5">
          <Reveal variant="left">
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/11] sm:aspect-[16/9] bg-surface-3">
                {contact.mapEmbed ? (
                  <iframe
                    src={contact.mapEmbed}
                    title={`Map to ${brand.name}`}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-ink-muted">
                    <Icon name="MapPin" className="w-10 h-10" />
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-extrabold text-base text-ink">
                      {brand.name} {brand.nameAccent}
                    </h3>
                    <p className="text-[13px] text-ink-soft leading-relaxed mt-0.5">{fullAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    as="a"
                    href={directionsUrl(fullAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('directions_click', { source: 'location' })}
                    size="sm"
                    icon="Navigation"
                  >
                    {t('nav.directions', 'Directions')}
                  </Button>
                  <Button as="a" href={telUrl(contact.phone)} variant="outline" size="sm" icon="PhoneCall">
                    {t('nav.call', 'Call')}
                  </Button>
                  <Button onClick={onCopy} variant="outline" size="sm" icon="Copy">
                    Copy
                  </Button>
                  <Button onClick={onShare} variant="outline" size="sm" icon="Share2">
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>

          {(contact.travel || []).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contact.travel.map((item, index) => (
                <Reveal key={item.label} delay={index * 80}>
                  <Card hover className="p-4 h-full flex items-start gap-3">
                    <span className="w-9 h-9 rounded-md bg-accent-50 dark:bg-accent-950/50 border border-accent-200 dark:border-accent-800/60 text-accent-700 dark:text-accent-300 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-extrabold text-ink">{item.label}</span>
                      <span className="block text-[11px] text-ink-muted leading-snug mt-0.5">{item.detail}</span>
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* ------------------------------------------ hours + contact */}
        <div className="lg:col-span-5 space-y-5">
          <Reveal variant="right">
            <Card className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading font-extrabold text-lg text-ink flex items-center gap-2">
                  <Icon name="Clock" className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400" />
                  Opening hours
                </h3>
                <Badge tone={status.isOpen ? 'good' : 'warn'} size="xs">
                  {status.isOpen ? t('status.open', 'Open now') : t('status.closed', 'Closed')}
                </Badge>
              </div>

              <p
                className={cn(
                  'text-[13px] font-bold rounded-md px-3.5 py-2.5 border',
                  status.isOpen
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800/50 dark:text-emerald-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-200',
                )}
              >
                {status.detail}
              </p>

              <ul className="space-y-0.5">
                {rows.map((row) => {
                  const isToday = row.days.includes(todayKey);
                  return (
                    <li
                      key={row.label}
                      className={cn(
                        'flex items-start justify-between gap-3 text-[13px] px-3 py-2.5 rounded-md',
                        isToday ? 'bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60' : '',
                      )}
                    >
                      <span className={cn('font-bold whitespace-nowrap', isToday ? 'text-brand-800 dark:text-brand-200' : 'text-ink')}>
                        {row.label}
                        {isToday && <span className="ml-1.5 text-[10px] font-extrabold uppercase opacity-70">today</span>}
                      </span>
                      <span className={cn('text-right', row.closed ? 'text-ink-muted' : 'text-ink-soft')}>{row.text}</span>
                    </li>
                  );
                })}
              </ul>

              {business.hours?.note && (
                <p className="text-[11px] text-ink-muted leading-relaxed flex items-start gap-2 pt-1">
                  <Icon name="Info" className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                  {business.hours.note}
                </p>
              )}

              <div className="grid grid-cols-1 gap-2 pt-1">
                <Button onClick={() => openBooking({ source: 'location' })} full icon="CalendarCheck">
                  Book an appointment
                </Button>
                <Button
                  as="a"
                  href={whatsappUrl(contact.whatsapp, 'Hello, I would like to check availability today.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'location' })}
                  variant="whatsapp"
                  full
                  icon="MessageSquare"
                >
                  Check today's availability
                </Button>
              </div>
            </Card>
          </Reveal>

          {business.emergency?.enabled && (
            <Reveal variant="right" delay={110}>
              <Card className="p-6 space-y-4 border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/20">
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-md bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                    <Icon name="Ambulance" className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-red-900 dark:text-red-200">
                      {business.emergency.title}
                    </h3>
                    <p className="text-[13px] text-red-800/80 dark:text-red-300/80 leading-relaxed mt-1">
                      {business.emergency.text}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {(business.emergency.signs || []).map((sign) => (
                    <li key={sign} className="flex items-start gap-2.5 text-[12px] text-red-900/85 dark:text-red-200/85 leading-relaxed">
                      <Icon name="Zap" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {sign}
                    </li>
                  ))}
                </ul>

                <Button as="a" href={telUrl(contact.phone)} variant="danger" full icon="PhoneCall">
                  Call now — {contact.phone}
                </Button>
              </Card>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
