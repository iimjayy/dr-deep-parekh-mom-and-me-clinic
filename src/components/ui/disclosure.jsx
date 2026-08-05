import React, { useId, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './primitives';

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

/**
 * Horizontally scrollable tab strip with an animated indicator.
 * Arrow keys move between tabs, matching the WAI-ARIA tabs pattern.
 */
export function Tabs({ tabs = [], value, onChange, className, tone = 'brand', size = 'md' }) {
  const listRef = useRef(null);

  const onKeyDown = (event) => {
    const index = tabs.findIndex((tab) => tab.value === value);
    if (index < 0) return;
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next == null) return;
    event.preventDefault();
    onChange(tabs[next].value);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  const activeClasses = {
    brand: 'bg-brand-600 text-white border-brand-600 shadow-lift',
    inverse: 'bg-surface text-brand-700 border-surface shadow-lift',
  }[tone];

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={onKeyDown}
      className={cn('flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1', className)}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex-shrink-0 rounded-full border font-bold transition-all cursor-pointer press',
              'flex items-center gap-2 whitespace-nowrap',
              size === 'sm' ? 'px-4 py-2 text-[11px]' : 'px-5 py-2.5 text-xs',
              active
                ? activeClasses
                : tone === 'inverse'
                  ? 'bg-white/10 text-white/70 border-white/15 hover:bg-white/15 hover:text-white'
                  : 'bg-surface text-ink-soft border-line hover:border-brand-300 hover:text-ink',
            )}
          >
            {tab.icon && <Icon name={tab.icon} className="w-3.5 h-3.5" />}
            {tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-extrabold',
                  active ? 'bg-white/20' : 'bg-surface-3 text-ink-muted',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion                                                           */
/* ------------------------------------------------------------------ */

export function AccordionItem({ question, answer, open, onToggle, index }) {
  const id = useId();
  return (
    <div
      className={cn(
        'border rounded-lg transition-all duration-300 overflow-hidden',
        open ? 'border-brand-300 bg-surface shadow-lift dark:border-brand-700' : 'border-line bg-surface hover:border-brand-200 dark:hover:border-brand-800',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="w-full flex items-start gap-4 text-left px-5 sm:px-6 py-5 cursor-pointer"
        >
          <span
            className={cn(
              'flex-shrink-0 w-6 h-6 rounded-md text-[11px] font-extrabold flex items-center justify-center mt-px transition-colors',
              open ? 'bg-brand-600 text-white' : 'bg-surface-3 text-ink-muted',
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={cn('flex-1 font-bold text-sm sm:text-[15px] leading-snug', open ? 'text-brand-800 dark:text-brand-200' : 'text-ink')}>
            {question}
          </span>
          <Icon
            name="ChevronDown"
            className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-300 text-ink-muted', open && 'rotate-180 text-brand-600')}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 pl-[3.4rem] text-sm text-ink-soft leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [0] }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  const toggle = (index) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.q || index}
          index={index}
          question={item.q}
          answer={item.a}
          open={open.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
