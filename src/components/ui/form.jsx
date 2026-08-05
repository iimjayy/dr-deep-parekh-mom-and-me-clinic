import React, { useId } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './primitives';

const CONTROL = cn(
  'w-full bg-surface-2 border border-line rounded-md px-3.5 py-3 text-sm font-semibold text-ink',
  'placeholder:text-ink-muted placeholder:font-normal',
  'focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12',
  'transition-[border-color,box-shadow] duration-150',
);

export function Field({ label, hint, error, required, children, className, htmlFor }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-xs font-bold text-ink-soft">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
          <Icon name="Info" className="w-3 h-3" />
          {error}
        </p>
      ) : (
        hint && <p className="text-[11px] text-ink-muted">{hint}</p>
      )}
    </div>
  );
}

export function Input({ label, hint, error, icon, className, required, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} required={required} htmlFor={id}>
      <div className="relative">
        {icon && (
          <Icon name={icon} className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        )}
        <input
          id={id}
          className={cn(CONTROL, icon && 'pl-10', error && 'border-red-400 focus:border-red-400 focus:ring-red-500/12', className)}
          aria-invalid={error ? 'true' : undefined}
          required={required}
          {...rest}
        />
      </div>
    </Field>
  );
}

export function Select({ label, hint, error, options = [], className, required, children, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} required={required} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          className={cn(CONTROL, 'appearance-none pr-10 cursor-pointer', error && 'border-red-400', className)}
          required={required}
          {...rest}
        >
          {children ||
            options.map((option) => {
              const value = typeof option === 'string' ? option : option.value;
              const text = typeof option === 'string' ? option : option.label;
              return (
                <option key={value} value={value}>
                  {text}
                </option>
              );
            })}
        </select>
        <Icon name="ChevronDown" className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
      </div>
    </Field>
  );
}

export function Textarea({ label, hint, error, className, rows = 3, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} htmlFor={id}>
      <textarea id={id} rows={rows} className={cn(CONTROL, 'resize-none leading-relaxed', className)} {...rest} />
    </Field>
  );
}

/** Two-to-four mutually exclusive choices, rendered as a pill group. */
export function SegmentedControl({ value, onChange, options = [], label, className, size = 'md' }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <span className="block text-xs font-bold text-ink-soft">{label}</span>}
      <div
        role="radiogroup"
        aria-label={typeof label === 'string' ? label : undefined}
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-md border font-bold transition-all cursor-pointer press flex items-center justify-center gap-1.5',
                size === 'sm' ? 'py-2 text-[11px]' : 'py-2.5 text-xs',
                active
                  ? 'bg-brand-600 text-white border-brand-600 shadow-lift'
                  : 'bg-surface-2 text-ink-soft border-line hover:border-brand-300 hover:text-ink',
              )}
            >
              {option.icon && <Icon name={option.icon} className="w-3.5 h-3.5" />}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Numeric input with -/+ buttons — far easier on a phone than a bare number field. */
export function Stepper({ value, onChange, min = 0, max = 999, step = 1, label, unit, hint, decimals = 1 }) {
  const numeric = Number(value);
  const set = (next) => {
    const clamped = Math.min(max, Math.max(min, Number(next.toFixed(decimals))));
    onChange(String(clamped));
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-stretch rounded-md border border-line bg-surface-2 overflow-hidden focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/12 transition-[border-color,box-shadow]">
        <button
          type="button"
          onClick={() => set((Number.isFinite(numeric) ? numeric : min) - step)}
          className="px-3.5 text-ink-muted hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer"
          aria-label={`Decrease ${label || 'value'}`}
        >
          <Icon name="Minus" className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center justify-center gap-1 py-2.5">
          <input
            type="number"
            inputMode="decimal"
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-center text-base font-extrabold text-ink focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label={label}
          />
          {unit && <span className="text-xs font-bold text-ink-muted pr-1">{unit}</span>}
        </div>
        <button
          type="button"
          onClick={() => set((Number.isFinite(numeric) ? numeric : min) + step)}
          className="px-3.5 text-ink-muted hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer"
          aria-label={`Increase ${label || 'value'}`}
        >
          <Icon name="Plus" className="w-4 h-4" />
        </button>
      </div>
    </Field>
  );
}

export function Checkbox({ checked, onChange, label, description, className }) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 p-3.5 rounded-md border cursor-pointer transition-all select-none',
        checked
          ? 'bg-brand-50 border-brand-300 dark:bg-brand-950/40 dark:border-brand-700'
          : 'bg-surface-2 border-line hover:border-brand-200 dark:hover:border-brand-800',
        className,
      )}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-px transition-all',
          checked ? 'bg-brand-600 border-brand-600 text-white' : 'border-line bg-surface',
        )}
      >
        {checked && <Icon name="Check" className="w-3.5 h-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0">
        <span className={cn('block text-sm font-semibold leading-snug', checked ? 'text-brand-900 dark:text-brand-100' : 'text-ink')}>
          {label}
        </span>
        {description && <span className="block text-xs text-ink-muted mt-0.5">{description}</span>}
      </span>
    </label>
  );
}
