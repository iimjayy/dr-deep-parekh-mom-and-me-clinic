import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './primitives';
import { useApp } from '../../context/AppContext';

/**
 * Wraps `children` in a scroll-reveal container.
 * `variant` picks the entry direction; `delay` staggers siblings.
 */
export function Reveal({ variant = 'up', delay = 0, as: Component = 'div', className, children, ...rest }) {
  return (
    <Component
      data-reveal={variant}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

const TONE_BG = {
  base: 'bg-surface-2',
  raised: 'bg-surface',
  inset: 'bg-surface-3',
  inverse: 'bg-surface-inverse text-ink-inverse',
  mesh: 'bg-surface-2 mesh-bg',
};

/**
 * Standard page section: consistent vertical rhythm, max width and anchor
 * offset. Every section on the page goes through this.
 */
export function Section({
  id, tone = 'base', size = 'md', className, containerClassName, children, decorated = false, ...rest
}) {
  const padding = {
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-24',
    lg: 'py-20 sm:py-32',
  }[size];

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-28', TONE_BG[tone] || TONE_BG.base, padding, className)}
      {...rest}
    >
      {decorated && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 grid-pattern opacity-[0.55] dark:opacity-25" />
        </div>
      )}
      <div className={cn('relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/**
 * Eyebrow + heading + sub-copy, centred or left-aligned.
 *
 * Section headings are authored in English in the component (they are page
 * chrome, not tenant content), so they are translated here using the English
 * text itself as the lookup key. A locale that has no entry simply keeps the
 * English — the same graceful-degradation rule as everywhere else.
 */
export function SectionHeader({
  eyebrow, eyebrowIcon, eyebrowTone = 'brand', title, titleAccent, sub, align = 'center', className, children,
}) {
  const { t } = useApp();
  const tr = (value) => (typeof value === 'string' ? t(value, value) : value);
  eyebrow = tr(eyebrow);
  title = tr(title);
  titleAccent = tr(titleAccent);
  sub = tr(sub);

  const centered = align === 'center';
  return (
    <div
      className={cn(
        'space-y-4 mb-12 sm:mb-14',
        centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge tone={eyebrowTone} icon={eyebrowIcon}>{eyebrow}</Badge>
        </Reveal>
      )}
      {title && (
        <Reveal delay={60}>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-ink">
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className="text-gradient-brand">{titleAccent}</span>
              </>
            )}
          </h2>
        </Reveal>
      )}
      {sub && (
        <Reveal delay={120}>
          <p className={cn('text-ink-soft text-base leading-relaxed', centered && 'mx-auto')}>{sub}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}

/** Small note used under tools — disclaimers, privacy statements. */
export function FootNote({ icon = 'Info', children, className, tone = 'muted' }) {
  const tones = {
    muted: 'bg-surface-3 border-line text-ink-muted',
    warn: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-200',
  };
  return (
    <p
      className={cn(
        'flex items-start gap-2.5 text-[12px] leading-relaxed border rounded-md px-4 py-3',
        tones[tone] || tones.muted,
        className,
      )}
    >
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-70" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
