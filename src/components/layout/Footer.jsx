import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn, telUrl, whatsappUrl, directionsUrl, mailtoUrl, hoursRows, formatMoney, copyText } from '../../lib/utils';
import { Icon, Button } from '../ui';
import { Logo, StatusPill } from './Navbar';

export default function Footer() {
  const { config, openBooking, openModal, toast, track } = useApp();
  const { brand, business, sections, content, legal, tools } = config;
  const address = business.contact?.address || {};
  const fullAddress = [address.street, address.locality, address.region, address.postalCode]
    .filter(Boolean)
    .join(', ');
  const rows = hoursRows(business.hours);
  const year = new Date().getFullYear();

  const navSections = sections.filter((s) => s.enabled !== false && s.nav);
  const toolItems = (tools.hub?.items || []).slice(0, 5);

  const copyAddress = async () => {
    const ok = await copyText(fullAddress);
    toast(ok ? 'Address copied' : 'Could not copy — long-press to select', { tone: ok ? 'good' : 'warn', icon: ok ? 'Check' : 'Info' });
    track('address_copy');
  };

  return (
    <footer className="bg-surface-inverse text-ink-inverse relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" aria-hidden="true" />

      {/* ------------------------------------------------ main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* brand + contact */}
          <div className="lg:col-span-4 space-y-5">
            <div className="[&_span]:text-current">
              <Logo />
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-sm">{brand.tagline}</p>

            <div className="space-y-2.5">
              <a
                href={telUrl(business.contact?.phone)}
                onClick={() => track('call_click', { source: 'footer' })}
                className="flex items-center gap-3 text-sm font-bold hover:opacity-80 transition-opacity"
              >
                <span className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="PhoneCall" className="w-4 h-4 text-brand-300" />
                </span>
                <span>
                  {business.contact?.phone}
                  {business.contact?.altPhone && (
                    <span className="block text-[11px] font-medium opacity-55">Alt: {business.contact.altPhone}</span>
                  )}
                </span>
              </a>

              <a
                href={whatsappUrl(business.contact?.whatsapp, `Hello ${brand.name}, I would like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { source: 'footer' })}
                className="flex items-center gap-3 text-sm font-bold hover:opacity-80 transition-opacity"
              >
                <span className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageSquare" className="w-4 h-4 text-[#25D366]" />
                </span>
                WhatsApp the clinic
              </a>

              {business.contact?.email && (
                <a
                  href={mailtoUrl(business.contact.email, `Enquiry — ${brand.name}`)}
                  className="flex items-center gap-3 text-sm font-bold hover:opacity-80 transition-opacity"
                >
                  <span className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="w-4 h-4 text-accent-300" />
                  </span>
                  {business.contact.email}
                </a>
              )}

              <button
                type="button"
                onClick={copyAddress}
                className="w-full flex items-start gap-3 text-left text-sm hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="w-4 h-4 text-highlight-300" />
                </span>
                <span className="opacity-70 leading-relaxed pt-1.5">
                  {fullAddress}
                  <span className="block text-[11px] font-bold text-brand-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to copy
                  </span>
                </span>
              </button>
            </div>

            {Object.entries(business.social || {}).length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {Object.entries(business.social).map(([key, url]) => {
                  if (!url) return null;
                  const iconName = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'Linkedin', google: 'MapPin' }[key] || 'Link';
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Icon name={iconName} className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* hours */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2.5">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider">Opening hours</h3>
              <StatusPill hours={business.hours} compact />
            </div>
            <ul className="space-y-1.5">
              {rows.map((row) => (
                <li key={row.label} className="flex items-start justify-between gap-3 text-[12px] py-1.5 border-b border-white/10 last:border-0">
                  <span className="font-bold opacity-90 whitespace-nowrap">{row.label}</span>
                  <span className={cn('text-right', row.closed ? 'opacity-40' : 'opacity-70')}>{row.text}</span>
                </li>
              ))}
            </ul>
            {business.hours?.note && <p className="text-[11px] opacity-50 leading-relaxed">{business.hours.note}</p>}
            {business.pricing?.consultationFee != null && (
              <div className="rounded-md bg-white/5 border border-white/10 p-3.5">
                <p className="text-[10px] uppercase tracking-wider opacity-50 font-bold">Consultation</p>
                <p className="font-heading font-extrabold text-xl text-brand-300">
                  {formatMoney(business.pricing.consultationFee, business.pricing.currency)}
                </p>
                {business.pricing.note && <p className="text-[11px] opacity-55 mt-1 leading-relaxed">{business.pricing.note}</p>}
              </div>
            )}
          </div>

          {/* links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-[13px] opacity-70 hover:opacity-100 hover:text-brand-300 transition-all">
                    {section.nav}
                  </a>
                </li>
              ))}
            </ul>
            {toolItems.length > 0 && (
              <>
                <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider pt-2">Free tools</h3>
                <ul className="space-y-2">
                  {toolItems.map((tool) => (
                    <li key={tool.id}>
                      <button
                        type="button"
                        onClick={() =>
                          tool.action === 'modal'
                            ? openModal(tool.target, { source: 'footer' })
                            : document.getElementById(tool.target)?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="text-[13px] opacity-70 hover:opacity-100 hover:text-brand-300 transition-all text-left cursor-pointer"
                      >
                        {tool.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* services + CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider">
              {business.professional?.title || 'Services'}
            </h3>
            <ul className="space-y-2">
              {(content.services || []).slice(0, 6).map((service) => (
                <li key={service.id} className="flex items-start gap-2 text-[13px] opacity-70">
                  <Icon name="Check" className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                  {service.title}
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-2">
              <Button onClick={() => openBooking({ source: 'footer' })} full icon="CalendarCheck">
                Book an appointment
              </Button>
              <Button
                as="a"
                href={directionsUrl(fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                full
                icon="Navigation"
                className="!bg-white/5 !border-white/15 !text-current hover:!bg-white/10"
              >
                Get directions
              </Button>
            </div>
          </div>
        </div>

        {/* disclaimer */}
        {legal?.disclaimer && (
          <div className="mt-12 rounded-lg bg-white/5 border border-white/10 p-5 flex items-start gap-3.5">
            <Icon name="Info" className="w-4 h-4 text-highlight-300 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-[11px] leading-relaxed opacity-60">{legal.disclaimer}</p>
              {legal.privacyNote && <p className="text-[11px] leading-relaxed opacity-45">{legal.privacyNote}</p>}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------ bottom */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] opacity-55">
          <p>
            © {year} {brand.legalName || brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {business.professional?.registration && <span>Reg: {business.professional.registration}</span>}
            <button type="button" onClick={() => window.print()} className="hover:opacity-100 transition-opacity cursor-pointer">
              Print details
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
