import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn, telUrl, whatsappUrl } from '../../lib/utils';
import { useScrollInfo } from '../../lib/hooks';
import { Icon } from '../ui';

/** Thin reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { progress } = useScrollInfo();
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] pointer-events-none no-print" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-brand-500 via-accent-500 to-brand-400 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/**
 * Persistent conversion surface.
 *
 * Mobile gets a thumb-reachable bar (call / WhatsApp / book) because that is
 * where the overwhelming majority of a local clinic's traffic converts.
 * Desktop gets a quieter floating pair.
 */
export default function ActionDock() {
  const { config, openBooking, t, track } = useApp();
  const { business } = config;
  const { y, direction } = useScrollInfo();

  const visible = y > 420;
  const waUrl = whatsappUrl(
    business.contact?.whatsapp,
    `Hello ${config.brand.name}, I would like to ask about an appointment.`,
  );

  return (
    <>
      {/* ------------------------------------------ mobile bar */}
      <div
        className={cn(
          'lg:hidden fixed bottom-0 inset-x-0 z-40 no-print transition-transform duration-300',
          visible && direction === 'up' ? 'translate-y-0' : visible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="glass border-t border-line px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-[auto_auto_1fr] gap-2 items-center">
            <a
              href={telUrl(business.contact?.phone)}
              onClick={() => track('call_click', { source: 'dock' })}
              className="w-12 h-12 rounded-md bg-surface border border-line flex items-center justify-center text-brand-700 dark:text-brand-300 press"
              aria-label={t('nav.call', 'Call the clinic')}
            >
              <Icon name="PhoneCall" className="w-5 h-5" />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { source: 'dock' })}
              className="w-12 h-12 rounded-md bg-[#25D366] flex items-center justify-center text-[#04301b] press"
              aria-label="Message on WhatsApp"
            >
              <Icon name="MessageSquare" className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => openBooking({ source: 'dock' })}
              className="h-12 rounded-md bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lift press cursor-pointer"
            >
              <Icon name="CalendarCheck" className="w-4 h-4" />
              {t('nav.book', 'Book appointment')}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------ desktop floats */}
      <div
        className={cn(
          'hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 no-print transition-all duration-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-11 h-11 rounded-md bg-surface border border-line shadow-lift text-ink-soft hover:text-ink hover:border-brand-300 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Back to top"
        >
          <Icon name="ChevronUp" className="w-5 h-5" />
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: 'float' })}
          className="group flex items-center gap-3 h-14 pl-4 pr-5 rounded-full bg-[#25D366] text-[#04301b] font-extrabold text-sm shadow-pop hover:scale-[1.03] transition-transform animate-pulse-ring"
        >
          <Icon name="MessageSquare" className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[10rem] transition-[max-width] duration-500">
            {t('cta.whatsapp', 'Book on WhatsApp')}
          </span>
        </a>
      </div>
    </>
  );
}
