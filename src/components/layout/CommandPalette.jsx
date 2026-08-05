import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { cn, telUrl, whatsappUrl, directionsUrl } from '../../lib/utils';
import { useBodyLock, useFocusTrap } from '../../lib/hooks';
import { Icon } from '../ui';

/**
 * ⌘K palette.
 *
 * On a site this dense — six tools, six services, eight FAQs — search is the
 * fastest route to an answer, and it doubles as a keyboard-only navigation
 * path for accessibility.
 */
export default function CommandPalette({ open, onClose }) {
  const { config, openBooking, openModal, setAppearance, mode, track } = useApp();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useBodyLock(open);
  useFocusTrap(open, panelRef, onClose);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const { business, content, sections, tools } = config;
  const address = business.contact?.address || {};
  const fullAddress = [address.street, address.locality, address.postalCode].filter(Boolean).join(', ');

  const commands = useMemo(() => {
    const scrollTo = (id) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const items = [
      {
        id: 'act-book', group: 'Actions', icon: 'CalendarCheck', title: 'Book an appointment',
        subtitle: 'Send your details to the clinic on WhatsApp',
        run: () => openBooking({ source: 'palette' }),
      },
      {
        id: 'act-call', group: 'Actions', icon: 'PhoneCall', title: `Call ${business.contact?.phone}`,
        subtitle: 'Ring the clinic desk directly',
        run: () => {
          window.location.href = telUrl(business.contact?.phone);
        },
      },
      {
        id: 'act-whatsapp', group: 'Actions', icon: 'MessageSquare', title: 'Message on WhatsApp',
        subtitle: 'Open a chat with the clinic',
        run: () => window.open(whatsappUrl(business.contact?.whatsapp, 'Hello, I have a question about an appointment.'), '_blank', 'noopener'),
      },
      {
        id: 'act-directions', group: 'Actions', icon: 'Navigation', title: 'Get directions',
        subtitle: business.contact?.landmark || address.locality,
        run: () => window.open(directionsUrl(fullAddress), '_blank', 'noopener'),
      },
      {
        id: 'act-theme', group: 'Actions', icon: mode === 'dark' ? 'Sun' : 'Moon',
        title: `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`,
        subtitle: 'Change the appearance of this site',
        run: () => setAppearance(mode === 'dark' ? 'light' : 'dark'),
      },
      {
        id: 'act-print', group: 'Actions', icon: 'Printer', title: 'Print this page',
        subtitle: 'Clinic details, hours and services',
        run: () => window.print(),
      },
    ];

    for (const section of sections) {
      if (section.enabled === false || !section.nav) continue;
      items.push({
        id: `sec-${section.id}`, group: 'Go to', icon: 'ArrowRight',
        title: section.nav, subtitle: 'Jump to this section', run: scrollTo(section.id),
      });
    }

    for (const tool of tools.hub?.items || []) {
      items.push({
        id: `tool-${tool.id}`, group: 'Tools', icon: tool.icon, title: tool.title,
        subtitle: tool.desc,
        run: tool.action === 'modal' ? () => openModal(tool.target, { source: 'palette' }) : scrollTo(tool.target),
      });
    }

    for (const service of content.services || []) {
      items.push({
        id: `svc-${service.id}`, group: 'Services', icon: service.icon, title: service.title,
        subtitle: service.shortDesc,
        run: () => {
          scrollTo('services')();
          setTimeout(() => openBooking({ source: 'palette', reason: service.title }), 400);
        },
      });
    }

    (content.faqs || []).forEach((faq, index) => {
      items.push({
        id: `faq-${index}`, group: 'Answers', icon: 'MessageCircle', title: faq.q,
        subtitle: faq.a, run: scrollTo('faq'),
      });
    });

    return items;
  }, [config, business, content, sections, tools, mode, openBooking, openModal, setAppearance, fullAddress]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.slice(0, 12);
    const words = q.split(/\s+/);
    return commands
      .map((item) => {
        const haystack = `${item.title} ${item.subtitle || ''} ${item.group}`.toLowerCase();
        let score = 0;
        for (const word of words) {
          const at = haystack.indexOf(word);
          if (at === -1) return null;
          score += at === 0 ? 3 : at < 24 ? 2 : 1;
        }
        return { ...item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14);
  }, [query, commands]);

  useEffect(() => setCursor(0), [query]);

  // Keep the highlighted row inside the scroll container.
  useEffect(() => {
    listRef.current?.querySelectorAll('[data-row]')[cursor]?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const runCommand = (item) => {
    track('palette_run', { command: item.id });
    onClose();
    setTimeout(() => item.run(), 60);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (event.key === 'Enter' && results[cursor]) {
      event.preventDefault();
      runCommand(results[cursor]);
    }
  };

  let lastGroup = null;

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-start justify-center p-4 sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-neutral-950/55 backdrop-blur-[3px] animate-fade-in" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="relative w-full max-w-xl bg-surface border border-line rounded-lg shadow-pop overflow-hidden animate-pop-in outline-none"
      >
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <Icon name="Search" className="w-4 h-4 text-ink-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services, answers, tools…"
            className="flex-1 bg-transparent py-4 text-sm font-semibold text-ink placeholder:text-ink-muted placeholder:font-normal focus:outline-none"
            aria-label="Search"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="text-[10px] font-bold bg-surface-3 border border-line rounded px-1.5 py-0.5 text-ink-muted">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[54vh] overflow-y-auto overscroll-contain py-2" role="listbox">
          {results.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-ink-muted">
              Nothing matched “{query}”. Try “vaccine”, “fee” or “timings”.
            </p>
          )}

          {results.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            const active = index === cursor;

            return (
              <React.Fragment key={item.id}>
                {showGroup && (
                  <p className="px-4 pt-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-ink-muted">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  data-row
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => runCommand(item)}
                  className={cn(
                    'w-full flex items-start gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors',
                    active ? 'bg-brand-50 dark:bg-brand-950/40' : 'hover:bg-surface-2',
                  )}
                >
                  <span
                    className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-px border',
                      active
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-surface-3 text-ink-muted border-line',
                    )}
                  >
                    <Icon name={item.icon} className="w-4 h-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn('block text-sm font-bold truncate', active ? 'text-brand-900 dark:text-brand-100' : 'text-ink')}>
                      {item.title}
                    </span>
                    {item.subtitle && <span className="block text-[11px] text-ink-muted line-clamp-2 leading-snug">{item.subtitle}</span>}
                  </span>
                  {active && <Icon name="ArrowRight" className="w-4 h-4 text-brand-500 flex-shrink-0 mt-2" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="px-4 py-2.5 border-t border-line bg-surface-2 flex items-center gap-4 text-[10px] font-semibold text-ink-muted">
          <span className="flex items-center gap-1">
            <kbd className="bg-surface border border-line rounded px-1">↑</kbd>
            <kbd className="bg-surface border border-line rounded px-1">↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface border border-line rounded px-1">↵</kbd> select
          </span>
          <span className="ml-auto hidden sm:inline">{results.length} results</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
