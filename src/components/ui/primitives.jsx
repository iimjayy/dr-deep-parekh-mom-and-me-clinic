import React, { forwardRef, useCallback, useRef } from 'react';
import { cn } from '../../lib/utils';
import { getIcon } from '../../lib/icons';
import { useMediaQuery, useReducedMotion, useCountUp } from '../../lib/hooks';

/* ------------------------------------------------------------------ */
/* Icon                                                                */
/* ------------------------------------------------------------------ */

/** Renders a lucide icon by config name. */
export function Icon({ name, className = 'w-5 h-5', ...rest }) {
  const Component = getIcon(name);
  return <Component className={className} aria-hidden="true" {...rest} />;
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const VARIANTS = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-lift hover:shadow-float border border-brand-700/20',
  accent:
    'bg-accent-600 text-white hover:bg-accent-700 shadow-lift border border-accent-700/20',
  dark:
    'bg-surface-inverse text-ink-inverse hover:opacity-90 shadow-lift border border-transparent',
  outline:
    'bg-surface text-ink border border-line hover:border-brand-400 hover:bg-brand-50/60 dark:hover:bg-brand-950/30',
  ghost:
    'bg-transparent text-ink-soft hover:text-ink hover:bg-surface-3 border border-transparent',
  soft:
    'bg-brand-50 text-brand-800 hover:bg-brand-100 border border-brand-200 dark:bg-brand-950/40 dark:text-brand-200 dark:border-brand-800/60',
  whatsapp:
    'bg-[#25D366] text-[#04301b] hover:bg-[#1fbe5a] shadow-lift border border-[#1fbe5a]/30 font-extrabold',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-lift border border-red-700/20',
};

const SIZES = {
  xs: 'text-[11px] px-3 py-1.5 gap-1.5 rounded-full',
  sm: 'text-xs px-4 py-2.5 gap-2 rounded-md',
  md: 'text-sm px-5 py-3 gap-2 rounded-md',
  lg: 'text-sm sm:text-base px-7 py-4 gap-2.5 rounded-lg',
};

/**
 * The one button in the system. `magnetic` adds a subtle cursor pull on
 * pointer-fine devices — used sparingly, on primary CTAs only.
 */
export const Button = forwardRef(function Button(
  {
    as, variant = 'primary', size = 'md', icon, iconRight, magnetic = false,
    loading = false, full = false, className, children, ...rest
  },
  forwardedRef,
) {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const enableMagnet = magnetic && fine && !reduced;

  const onMouseMove = useCallback(
    (event) => {
      if (!enableMagnet) return;
      const node = event.currentTarget;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
      node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    },
    [enableMagnet],
  );

  const onMouseLeave = useCallback((event) => {
    event.currentTarget.style.transform = '';
  }, []);

  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      onMouseMove={enableMagnet ? onMouseMove : undefined}
      onMouseLeave={enableMagnet ? onMouseLeave : undefined}
      className={cn(
        'inline-flex items-center justify-center font-bold tracking-tight cursor-pointer press',
        'transition-[background-color,box-shadow,border-color,transform,opacity] duration-200',
        'disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        full && 'w-full',
        className,
      )}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Icon name="Loader2" className="w-4 h-4 animate-spin" />
      ) : (
        icon && <Icon name={icon} className={size === 'lg' ? 'w-[18px] h-[18px]' : 'w-4 h-4'} />
      )}
      {children}
      {iconRight && <Icon name={iconRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </Component>
  );
});

/* ------------------------------------------------------------------ */
/* Badge / Pill                                                        */
/* ------------------------------------------------------------------ */

const TONES = {
  brand: 'bg-brand-50 text-brand-800 border-brand-200 dark:bg-brand-950/50 dark:text-brand-200 dark:border-brand-800/60',
  accent: 'bg-accent-50 text-accent-800 border-accent-200 dark:bg-accent-950/50 dark:text-accent-200 dark:border-accent-800/60',
  highlight: 'bg-highlight-50 text-highlight-900 border-highlight-200 dark:bg-highlight-950/50 dark:text-highlight-200 dark:border-highlight-800/60',
  neutral: 'bg-surface-3 text-ink-soft border-line',
  good: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800/60',
  ok: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800/60',
  warn: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800/60',
  danger: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800/60',
  muted: 'bg-surface-3 text-ink-muted border-line-soft',
  inverse: 'bg-surface-inverse text-ink-inverse border-transparent',
};

export function Badge({ tone = 'brand', icon, children, className, size = 'sm' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-bold border rounded-full whitespace-nowrap',
        size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        TONES[tone] || TONES.brand,
        className,
      )}
    >
      {icon && <Icon name={icon} className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      {children}
    </span>
  );
}

export const toneClass = (tone) => TONES[tone] || TONES.neutral;

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({ as: Component = 'div', hover = false, glow = false, inset = false, className, children, ...rest }) {
  return (
    <Component
      className={cn(
        'rounded-lg border border-line',
        inset ? 'bg-surface-2' : 'bg-surface',
        hover && 'card-hover',
        glow && 'glow-border',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Circular icon chip used throughout — keeps sizing consistent. */
export function IconBubble({ name, tone = 'brand', size = 'md', className }) {
  const sizes = {
    sm: 'w-9 h-9 rounded-md',
    md: 'w-11 h-11 rounded-md',
    lg: 'w-14 h-14 rounded-lg',
  };
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center border flex-shrink-0',
        sizes[size], TONES[tone] || TONES.brand, className,
      )}
    >
      <Icon name={name} className={iconSizes[size]} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stat                                                                */
/* ------------------------------------------------------------------ */

export function StatValue({ value, className }) {
  const [display, ref] = useCountUp(value);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Rating                                                              */
/* ------------------------------------------------------------------ */

export function Stars({ rating = 5, size = 'w-4 h-4', className }) {
  return (
    <span className={cn('inline-flex text-highlight-500', className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="Star"
          className={cn(size, n <= Math.round(rating) ? 'fill-current' : 'opacity-25')}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

export function ProgressBar({ value = 0, tone = 'brand', className, label }) {
  const pct = Math.max(0, Math.min(100, value));
  const fill = {
    brand: 'bg-brand-500', accent: 'bg-accent-500', good: 'bg-emerald-500',
    warn: 'bg-amber-500', danger: 'bg-red-500',
  }[tone] || 'bg-brand-500';

  return (
    <div className={cn('w-full', className)}>
      <div
        className="h-2 rounded-full bg-surface-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-700 ease-out', fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ProgressRing({ value = 0, size = 96, stroke = 8, tone = 'brand', children }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const strokeColor = {
    brand: 'var(--brand-500)', accent: 'var(--accent-500)',
    good: 'var(--brand-500)', warn: 'var(--highlight-500)',
  }[tone] || 'var(--brand-500)';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={strokeColor} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (pct / 100) * circumference}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee({ children, className, speed = 42 }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn('flex w-max', !reduced && 'animate-marquee')}
        style={reduced ? undefined : { animationDuration: `${speed}s` }}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">{children}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-2 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export const Divider = ({ className }) => <div className={cn('h-px w-full bg-line', className)} />;

export function Skeleton({ className }) {
  return <div className={cn('bg-surface-3 rounded-md shimmer', className)} />;
}

/** Screen-reader-only text. */
export const SrOnly = ({ children }) => <span className="sr-only">{children}</span>;
