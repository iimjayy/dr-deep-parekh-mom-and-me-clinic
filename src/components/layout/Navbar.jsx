import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn, telUrl, directionsUrl, formatMoney } from '../../lib/utils';
import { useOpenStatus, useScrollInfo, useScrollSpy, useOnClickOutside, useBodyLock } from '../../lib/hooks';
import { LOCALE_META } from '../../lib/i18n';
import { Button, Icon, Badge } from '../ui';

/* ------------------------------------------------------------------ */
/* Live status pill                                                    */
/* ------------------------------------------------------------------ */

export function StatusPill({ hours, compact = false, className }) {
  const status = useOpenStatus(hours);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap',
        compact ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1',
        status.isOpen
          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
          : 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
        className,
      )}
      title={status.detail}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400')} />
      {status.isOpen ? 'Open now' : 'Closed'}
      {!compact && <span className="font-medium opacity-75">• {status.detail}</span>}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Toggles                                                             */
/* ------------------------------------------------------------------ */

function AppearanceToggle({ className }) {
  const { mode, appearance, setAppearance } = useApp();
  const next = mode === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setAppearance(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode${appearance === 'system' ? ' (currently following your system)' : ''}`}
      className={cn(
        'w-9 h-9 rounded-md border border-line bg-surface-2 text-ink-soft',
        'hover:text-ink hover:border-brand-300 transition-colors cursor-pointer',
        'flex items-center justify-center flex-shrink-0',
        className,
      )}
    >
      <Icon name={mode === 'dark' ? 'Sun' : 'Moon'} className="w-4 h-4" />
    </button>
  );
}

function LocaleToggle({ className }) {
  const { locale, setLocale, availableLocales } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false), open);

  if (availableLocales.length < 2) return null;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="h-9 px-2.5 rounded-md border border-line bg-surface-2 text-ink-soft hover:text-ink hover:border-brand-300 transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-bold"
      >
        <Icon name="Languages" className="w-4 h-4" />
        <span className="hidden sm:max-lg:inline 2xl:inline">{LOCALE_META[locale]?.native || locale}</span>
        <Icon name="ChevronDown" className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-40 bg-surface border border-line rounded-md shadow-pop py-1.5 z-50 animate-pop-in"
        >
          {availableLocales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  'w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors',
                  code === locale ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40' : 'text-ink-soft hover:bg-surface-3',
                )}
              >
                <span>{LOCALE_META[code]?.native || code}</span>
                {code === locale && <Icon name="Check" className="w-3.5 h-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function Logo({ onClick, className, compact = false }) {
  const { config } = useApp();
  const { brand } = config;

  return (
    <a
      href="#home"
      onClick={onClick}
      className={cn('flex items-center gap-2.5 group flex-shrink-0 min-w-0', className)}
      aria-label={`${brand.name} ${brand.nameAccent} — home`}
    >
      <span className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white shadow-lift group-hover:scale-105 transition-transform flex-shrink-0">
        {brand.logo?.type === 'image' ? (
          <img src={brand.logo.src} alt="" className="w-full h-full object-cover rounded-md" />
        ) : (
          <Icon name={brand.logo?.icon || 'HeartPulse'} className="w-[18px] h-[18px]" />
        )}
      </span>
      <span className="min-w-0 flex items-baseline gap-1.5 flex-wrap">
        <span className="font-heading font-extrabold text-lg sm:text-xl text-ink tracking-tight leading-none whitespace-nowrap">
          {brand.name}
        </span>
        {brand.nameAccent && !compact && (
          <span className="hidden sm:max-lg:inline 2xl:inline text-[10px] font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800/60 px-2 py-0.5 rounded-full whitespace-nowrap">
            {brand.nameAccent}
          </span>
        )}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar({ onOpenPalette }) {
  const { config, openBooking, t, track } = useApp();
  const { business, sections } = config;
  const { scrolled } = useScrollInfo(40);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useBodyLock(drawerOpen);

  const navItems = useMemo(
    () => sections.filter((section) => section.enabled !== false && section.nav),
    [sections],
  );
  const activeId = useScrollSpy(navItems.map((item) => item.id));

  // Keep the CSS scroll-padding in sync with the real header height.
  const headerRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const height = headerRef.current?.offsetHeight;
      if (height) document.documentElement.style.setProperty('--nav-offset', `${height + 16}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [scrolled]);

  const address = business.contact?.address || {};
  const fullAddress = [address.street, address.locality, address.postalCode].filter(Boolean).join(', ');

  const go = (id) => {
    setDrawerOpen(false);
    track('nav_click', { target: id });
  };

  return (
    <div ref={headerRef} className="sticky top-0 z-50 no-print">
      {/* ---------------------------------------------- utility bar */}
      <div className="bg-surface-inverse text-ink-inverse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href={telUrl(business.contact?.phone)}
              onClick={() => track('call_click', { source: 'topbar' })}
              className="flex items-center gap-1.5 font-extrabold text-brand-300 hover:text-brand-200 transition-colors whitespace-nowrap"
            >
              <Icon name="PhoneCall" className="w-3.5 h-3.5" />
              {business.contact?.phone}
            </a>
            <span className="opacity-25 hidden sm:inline">|</span>
            <StatusPill hours={business.hours} className="hidden sm:inline-flex" />
            <StatusPill hours={business.hours} compact className="sm:hidden" />
          </div>

          <div className="hidden lg:flex items-center gap-3 opacity-80 min-w-0">
            {business.pricing?.consultationFee != null && (
              <>
                <span className="whitespace-nowrap">
                  {t('fee.label', 'Consultation')}{' '}
                  <strong className="font-extrabold">
                    {formatMoney(business.pricing.consultationFee, business.pricing.currency)}
                  </strong>
                </span>
                <span className="opacity-25">|</span>
              </>
            )}
            <a
              href={directionsUrl(fullAddress)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('directions_click', { source: 'topbar' })}
              className="flex items-center gap-1.5 hover:opacity-100 transition-opacity truncate"
            >
              <Icon name="MapPin" className="w-3.5 h-3.5 text-accent-300 flex-shrink-0" />
              <span className="truncate max-w-[280px]">{business.contact?.landmark || address.locality}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- main bar */}
      <header
        className={cn(
          'transition-all duration-300 border-b',
          scrolled ? 'glass border-line shadow-lift py-2' : 'bg-surface border-transparent py-3',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Logo onClick={() => go('home')} />

          <nav className="hidden lg:flex items-center gap-0 xl:gap-1 min-w-0" aria-label="Main">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => go(item.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative px-2 xl:px-3.5 py-2 rounded-md text-xs xl:text-[13px] font-bold transition-colors whitespace-nowrap',
                    active ? 'text-brand-700 dark:text-brand-300' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {item.nav}
                  <span
                    className={cn(
                      'absolute left-2 right-2 xl:left-3.5 xl:right-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500 origin-left transition-transform duration-300',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden md:flex items-center gap-2 h-9 px-2.5 xl:pl-3 xl:pr-2 rounded-md border border-line bg-surface-2 text-ink-muted hover:text-ink hover:border-brand-300 transition-colors cursor-pointer text-xs font-semibold flex-shrink-0"
              aria-label="Search this site"
            >
              <Icon name="Search" className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Search</span>
              <kbd className="hidden 2xl:inline text-[10px] font-bold bg-surface-3 border border-line rounded px-1.5 py-0.5">⌘K</kbd>
            </button>

            <LocaleToggle className="hidden sm:block flex-shrink-0" />
            <AppearanceToggle className="hidden sm:flex" />

            <Button
              onClick={() => openBooking({ source: 'navbar' })}
              size="sm"
              icon="CalendarCheck"
              className="hidden sm:inline-flex rounded-full !px-4 xl:!px-5 whitespace-nowrap"
              magnetic
            >
              <span className="hidden xl:inline">{t('nav.book', 'Book appointment')}</span>
              <span className="xl:hidden">{t('nav.bookShort', 'Book')}</span>
            </Button>

            <a
              href={telUrl(business.contact?.phone)}
              onClick={() => track('call_click', { source: 'navbar_mobile' })}
              className="sm:hidden w-9 h-9 rounded-md border border-line bg-surface-2 text-brand-700 dark:text-brand-300 flex items-center justify-center"
              aria-label={t('nav.call', 'Call the clinic')}
            >
              <Icon name="PhoneCall" className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="lg:hidden w-9 h-9 rounded-md border border-line bg-surface-2 text-ink flex items-center justify-center cursor-pointer"
              aria-label={t('nav.menu', 'Menu')}
              aria-expanded={drawerOpen}
            >
              <Icon name={drawerOpen ? 'X' : 'Menu'} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------- mobile drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-[var(--nav-offset)] bottom-0 z-40 transition-opacity duration-200',
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="absolute inset-0 bg-neutral-950/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
        <nav
          className={cn(
            'relative bg-surface border-b border-line shadow-pop max-h-full overflow-y-auto transition-transform duration-300',
            drawerOpen ? 'translate-y-0' : '-translate-y-4',
          )}
          aria-label="Mobile"
        >
          <div className="px-4 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => go(item.id)}
                  className={cn(
                    'px-4 py-3 rounded-md text-xs font-bold border transition-colors',
                    activeId === item.id
                      ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 text-brand-800 dark:text-brand-200'
                      : 'bg-surface-2 border-line text-ink-soft',
                  )}
                >
                  {item.nav}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <LocaleToggle />
              <AppearanceToggle />
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenPalette();
                }}
                className="flex-1 h-9 rounded-md border border-line bg-surface-2 text-ink-soft text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon name="Search" className="w-3.5 h-3.5" />
                Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  openBooking({ source: 'mobile_drawer' });
                }}
                icon="CalendarCheck"
                full
              >
                {t('nav.book', 'Book appointment')}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button as="a" href={telUrl(business.contact?.phone)} variant="outline" size="sm" icon="PhoneCall">
                  {t('nav.call', 'Call')}
                </Button>
                <Button
                  as="a"
                  href={directionsUrl(fullAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  icon="Navigation"
                >
                  {t('nav.directions', 'Directions')}
                </Button>
              </div>
            </div>

            {business.hours?.note && (
              <p className="text-[11px] text-ink-muted flex items-start gap-2 pt-1">
                <Icon name="Info" className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                {business.hours.note}
              </p>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
