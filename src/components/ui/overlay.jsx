import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { useBodyLock, useFocusTrap } from '../../lib/hooks';
import { Icon } from './primitives';

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

const WIDTHS = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[min(96rem,96vw)]',
};

/**
 * Accessible modal: focus trap, body lock, Escape to close, backdrop click,
 * and a mobile-first sheet presentation that becomes a centred dialog on
 * larger screens.
 */
export function Modal({
  open, onClose, title, description, icon, size = 'md', children, footer,
  hideClose = false, className, contentClassName,
}) {
  const panelRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useBodyLock(open);
  useFocusTrap(open, panelRef, onClose);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={cn('fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6', className)}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === 'string' ? title : undefined}
    >
      <div
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-[3px] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-surface border border-line shadow-pop',
          'rounded-t-2xl sm:rounded-lg',
          'max-h-[92vh] sm:max-h-[88vh] flex flex-col outline-none',
          'animate-slide-up sm:animate-pop-in',
          WIDTHS[size] || WIDTHS.md,
          contentClassName,
        )}
      >
        {/* Grab handle — signals the sheet is dismissible on touch. */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center flex-shrink-0">
          <span className="w-10 h-1 rounded-full bg-line" />
        </div>

        {(title || !hideClose) && (
          <div className="flex items-start gap-4 px-5 sm:px-7 pt-4 sm:pt-6 pb-4 border-b border-line flex-shrink-0">
            {icon && (
              <span className="w-10 h-10 rounded-md bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 flex items-center justify-center flex-shrink-0">
                <Icon name={icon} className="w-5 h-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              {title && <h2 className="font-heading font-extrabold text-lg sm:text-xl text-ink leading-tight">{title}</h2>}
              {description && <p className="text-xs text-ink-muted mt-1 leading-relaxed">{description}</p>}
            </div>
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 -mr-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer flex-shrink-0"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="overflow-y-auto overscroll-contain flex-1 px-5 sm:px-7 py-5 sm:py-6">{children}</div>

        {footer && (
          <div className="px-5 sm:px-7 py-4 border-t border-line bg-surface-2 rounded-b-lg flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Toaster                                                             */
/* ------------------------------------------------------------------ */

const TOAST_TONES = {
  default: 'bg-surface-inverse text-ink-inverse border-transparent',
  good: 'bg-emerald-600 text-white border-emerald-500',
  warn: 'bg-amber-500 text-amber-950 border-amber-400',
  danger: 'bg-red-600 text-white border-red-500',
};

export function Toaster({ toasts, onDismiss }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed z-[120] bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 px-4 w-full max-w-sm no-print"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => onDismiss(toast.id)}
          className={cn(
            'w-full flex items-center gap-2.5 px-4 py-3 rounded-md border shadow-pop',
            'text-xs font-bold text-left animate-pop-in cursor-pointer',
            TOAST_TONES[toast.tone] || TOAST_TONES.default,
          )}
        >
          {toast.icon && <Icon name={toast.icon} className="w-4 h-4 flex-shrink-0" />}
          <span className="flex-1">{toast.message}</span>
          <Icon name="X" className="w-3.5 h-3.5 opacity-50" />
        </button>
      ))}
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

export function Lightbox({ items = [], index, onClose, onNavigate }) {
  const containerRef = useRef(null);
  const open = index != null && index >= 0;
  useBodyLock(open);
  useFocusTrap(open, containerRef, onClose);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowRight') onNavigate((index + 1) % items.length);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onNavigate]);

  if (!open) return null;
  const item = items[index];
  if (!item) return null;

  return createPortal(
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-[110] bg-neutral-950/92 backdrop-blur-sm flex flex-col animate-fade-in outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white/90">
        <span className="text-xs font-bold tracking-wide">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Icon name="X" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 min-h-0">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors cursor-pointer"
        >
          <Icon name="ChevronLeft" className="w-5 h-5" />
        </button>

        <figure className="max-h-full flex flex-col items-center gap-4">
          <img
            src={item.src}
            alt={item.title}
            className="max-h-[68vh] w-auto rounded-lg shadow-pop object-contain animate-pop-in"
          />
          <figcaption className="text-center max-w-xl">
            <h3 className="font-heading font-bold text-white text-lg">{item.title}</h3>
            {item.caption && <p className="text-white/65 text-xs mt-1 leading-relaxed">{item.caption}</p>}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          aria-label="Next image"
          className="hidden sm:flex absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors cursor-pointer"
        >
          <Icon name="ChevronRight" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex sm:hidden items-center justify-center gap-3 pb-6">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold cursor-pointer"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>,
    document.body,
  );
}
