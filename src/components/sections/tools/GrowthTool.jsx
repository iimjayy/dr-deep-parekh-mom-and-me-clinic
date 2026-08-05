import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../../context/AppContext';
import { assess, valueAtZ, ordinal, MAX_AGE_MONTHS } from '../../../lib/growth';
import { ageFromDob, cn, toISODate } from '../../../lib/utils';
import { useLocalStorage, useReducedMotion } from '../../../lib/hooks';
import {
  Button, Icon, Badge, Card, Reveal, Section, SectionHeader, FootNote,
  SegmentedControl, Input, Stepper, Tabs,
} from '../../ui';

const METRICS = [
  { value: 'weight', label: 'Weight', icon: 'Scale', unit: 'kg', axis: 'Weight (kg)' },
  { value: 'height', label: 'Height', icon: 'Ruler', unit: 'cm', axis: 'Length / height (cm)' },
  { value: 'bmi', label: 'BMI', icon: 'Gauge', unit: '', axis: 'BMI (kg/m²)' },
];

const TONE_STYLES = {
  good: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/50 dark:text-emerald-100',
  ok: 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-800/50 dark:text-sky-100',
  warn: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-100',
  danger: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800/50 dark:text-red-100',
};

/* ------------------------------------------------------------------ */
/* WHO reference chart                                                 */
/* ------------------------------------------------------------------ */

const BANDS = [
  { z: 3, label: '+3 SD', dim: true },
  { z: 2, label: '+2 SD' },
  { z: 0, label: 'Median' },
  { z: -2, label: '-2 SD' },
  { z: -3, label: '-3 SD', dim: true },
];

function GrowthChart({ metric, sex, ageMonths, value }) {
  const width = 560;
  const height = 340;
  const pad = { top: 16, right: 16, bottom: 34, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const series = useMemo(() => {
    const ages = [];
    for (let m = 0; m <= MAX_AGE_MONTHS; m += 2) ages.push(m);
    return BANDS.map((band) => ({
      ...band,
      points: ages.map((m) => ({ m, v: valueAtZ(metric, sex, m, band.z) })),
    }));
  }, [metric, sex]);

  const { yMin, yMax } = useMemo(() => {
    const all = series.flatMap((s) => s.points.map((p) => p.v)).filter(Number.isFinite);
    if (Number.isFinite(value)) all.push(value);
    const min = Math.min(...all);
    const max = Math.max(...all);
    const padding = (max - min) * 0.08;
    return { yMin: min - padding, yMax: max + padding };
  }, [series, value]);

  const x = (m) => pad.left + (m / MAX_AGE_MONTHS) * plotW;
  const y = (v) => pad.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

  const path = (points) =>
    points
      .filter((p) => Number.isFinite(p.v))
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.m).toFixed(1)},${y(p.v).toFixed(1)}`)
      .join(' ');

  const areaPath = (upper, lower) => {
    const up = upper.filter((p) => Number.isFinite(p.v));
    const down = [...lower].reverse().filter((p) => Number.isFinite(p.v));
    if (!up.length || !down.length) return '';
    return (
      up.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.m).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ') +
      ' ' +
      down.map((p) => `L${x(p.m).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ') +
      ' Z'
    );
  };

  const upper2 = series.find((s) => s.z === 2)?.points || [];
  const lower2 = series.find((s) => s.z === -2)?.points || [];

  const xTicks = [0, 12, 24, 36, 48, 60];
  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) * i) / 4);

  const plotted = Number.isFinite(value) && Number.isFinite(ageMonths) && ageMonths <= MAX_AGE_MONTHS;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={`WHO ${metric}-for-age reference chart with your child plotted`}
    >
      {/* healthy corridor between -2 and +2 SD */}
      <path d={areaPath(upper2, lower2)} fill="var(--brand-500)" opacity="0.08" />

      {/* grid */}
      {yTicks.map((tick, i) => (
        <g key={`y${i}`}>
          <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="var(--line)" strokeWidth="1" />
          <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fontSize="10" fill="var(--ink-muted)" fontWeight="600">
            {tick >= 100 ? tick.toFixed(0) : tick.toFixed(1)}
          </text>
        </g>
      ))}
      {xTicks.map((tick) => (
        <g key={`x${tick}`}>
          <line x1={x(tick)} x2={x(tick)} y1={pad.top} y2={pad.top + plotH} stroke="var(--line-soft)" strokeWidth="1" />
          <text x={x(tick)} y={height - 12} textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontWeight="600">
            {tick === 0 ? 'Birth' : `${tick / 12}y`}
          </text>
        </g>
      ))}

      {/* reference curves */}
      {series.map((band) => (
        <path
          key={band.z}
          d={path(band.points)}
          fill="none"
          stroke={band.z === 0 ? 'var(--brand-600)' : 'var(--ink-muted)'}
          strokeWidth={band.z === 0 ? 2.2 : 1.2}
          strokeDasharray={band.z === 0 ? undefined : band.dim ? '2 5' : '5 4'}
          opacity={band.z === 0 ? 1 : band.dim ? 0.35 : 0.55}
          strokeLinecap="round"
        />
      ))}

      {/* band labels */}
      {series.map((band) => {
        const last = band.points[band.points.length - 1];
        if (!Number.isFinite(last?.v)) return null;
        return (
          <text
            key={`l${band.z}`}
            x={width - pad.right - 2}
            y={y(last.v) - 5}
            textAnchor="end"
            fontSize="9"
            fontWeight="700"
            fill={band.z === 0 ? 'var(--brand-600)' : 'var(--ink-muted)'}
            opacity={band.dim ? 0.5 : 0.85}
          >
            {band.label}
          </text>
        );
      })}

      {/* the child */}
      {plotted && (
        <g>
          <line
            x1={x(ageMonths)} x2={x(ageMonths)} y1={pad.top} y2={pad.top + plotH}
            stroke="var(--accent-500)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"
          />
          <circle cx={x(ageMonths)} cy={y(value)} r="9" fill="var(--accent-500)" opacity="0.22" />
          <circle cx={x(ageMonths)} cy={y(value)} r="5" fill="var(--accent-600)" stroke="var(--surface)" strokeWidth="2.5" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function GrowthTool({ section }) {
  const { config, openBooking, track } = useApp();
  const tool = config.tools?.growth || {};
  const reduced = useReducedMotion();

  const [form, setForm] = useLocalStorage('practice-os:growth', {
    sex: 'boy', mode: 'dob', dob: '', ageMonths: 12, weight: '9.5', height: '75',
  });
  const [metric, setMetric] = useState('weight');
  const [celebrated, setCelebrated] = useState(false);
  // The tool ships with sensible defaults, so a result exists before anyone has
  // touched it. Only celebrate once the parent has actually entered something.
  const [touched, setTouched] = useState(false);

  const update = (patch) => {
    setTouched(true);
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const derivedAge = useMemo(() => {
    if (form.mode === 'dob' && form.dob) {
      const age = ageFromDob(form.dob);
      return age ? age.months + (age.days % 30) / 30 : null;
    }
    return Number(form.ageMonths);
  }, [form.mode, form.dob, form.ageMonths]);

  const result = useMemo(() => {
    if (!Number.isFinite(derivedAge)) return null;
    return assess({
      sex: form.sex,
      ageMonths: derivedAge,
      weightKg: parseFloat(form.weight),
      heightCm: parseFloat(form.height),
    });
  }, [derivedAge, form.sex, form.weight, form.height]);

  const headline = result?.headline;

  // A single, gentle celebration the first time a healthy result appears.
  useEffect(() => {
    if (!headline || !touched || celebrated || reduced) return;
    if (headline.tone !== 'good') return;
    setCelebrated(true);
    confetti({ particleCount: 45, spread: 62, origin: { y: 0.7 }, disableForReducedMotion: true });
    track('growth_result', { band: headline.key });
  }, [headline, touched, celebrated, reduced, track]);

  if (!tool.enabled) return null;

  const metricValue =
    metric === 'weight' ? parseFloat(form.weight)
      : metric === 'height' ? parseFloat(form.height)
        : result?.bmi;

  const ageLabel =
    form.mode === 'dob' && form.dob
      ? ageFromDob(form.dob)?.label || '—'
      : `${Math.round(derivedAge || 0)} months`;

  const overAge = Number.isFinite(derivedAge) && derivedAge > MAX_AGE_MONTHS;

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader eyebrow="WHO growth standards" eyebrowIcon="TrendingUp" title={tool.title} sub={tool.sub} />

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ------------------------------------------ inputs */}
          <div className="lg:col-span-4 p-6 sm:p-7 bg-surface-2 border-b lg:border-b-0 lg:border-r border-line space-y-5">
            <SegmentedControl
              label="Child"
              value={form.sex}
              onChange={(sex) => update({ sex })}
              options={[
                { value: 'boy', label: 'Boy', icon: 'Baby' },
                { value: 'girl', label: 'Girl', icon: 'Baby' },
              ]}
            />

            <SegmentedControl
              label="Age entered as"
              size="sm"
              value={form.mode}
              onChange={(mode) => update({ mode })}
              options={[
                { value: 'dob', label: 'Date of birth' },
                { value: 'months', label: 'Months' },
              ]}
            />

            {form.mode === 'dob' ? (
              <Input
                type="date"
                label="Date of birth"
                value={form.dob}
                max={toISODate(new Date())}
                onChange={(event) => update({ dob: event.target.value })}
                hint={form.dob ? ageLabel : 'Used only to work out the age'}
              />
            ) : (
              <Stepper
                label="Age in months"
                value={String(form.ageMonths)}
                onChange={(ageMonths) => update({ ageMonths })}
                min={0}
                max={60}
                step={1}
                decimals={0}
                unit="mo"
                hint="WHO standards cover birth to 5 years"
              />
            )}

            <Stepper
              label="Weight"
              value={form.weight}
              onChange={(weight) => update({ weight })}
              min={0.5}
              max={40}
              step={0.1}
              unit="kg"
            />

            <Stepper
              label="Height / length"
              value={form.height}
              onChange={(height) => update({ height })}
              min={30}
              max={140}
              step={0.5}
              unit="cm"
            />

            <div className="pt-1">
              <Button
                onClick={() => {
                  setForm({ sex: 'boy', mode: 'dob', dob: '', ageMonths: 12, weight: '9.5', height: '75' });
                  setCelebrated(false);
                }}
                variant="ghost"
                size="sm"
                icon="RefreshCw"
                full
              >
                Reset
              </Button>
            </div>
          </div>

          {/* ------------------------------------------ results */}
          <div className="lg:col-span-8 p-6 sm:p-7 space-y-5">
            {overAge ? (
              <div className="rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 p-6 text-center space-y-2">
                <Icon name="Info" className="w-7 h-7 text-amber-600 mx-auto" />
                <p className="font-bold text-sm text-amber-900 dark:text-amber-200">
                  WHO Child Growth Standards cover birth to 5 years
                </p>
                <p className="text-[13px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  For older children we use a different reference chart during the consultation — book a growth review and bring the growth card.
                </p>
              </div>
            ) : !result || !headline ? (
              <div className="rounded-lg border border-dashed border-line bg-surface-2 p-10 text-center space-y-2">
                <Icon name="TrendingUp" className="w-8 h-8 text-ink-muted mx-auto" />
                <p className="font-bold text-sm text-ink">Enter an age and measurements</p>
                <p className="text-xs text-ink-muted">Results appear here as you type.</p>
              </div>
            ) : (
              <>
                {/* headline verdict */}
                <div className={cn('rounded-lg border p-5 space-y-2', TONE_STYLES[headline.tone])}>
                  <div className="flex items-start gap-3">
                    <Icon
                      name={headline.tone === 'good' ? 'CheckCircle2' : headline.tone === 'danger' ? 'Info' : 'Info'}
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="font-heading font-extrabold text-base leading-snug">{headline.label}</p>
                      <p className="text-[13px] opacity-85 leading-relaxed mt-1">{headline.advice}</p>
                    </div>
                  </div>
                </div>

                {/* metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {METRICS.map((item) => {
                    const data = result.results[item.value];
                    if (!data || data.z == null) return null;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setMetric(item.value)}
                        className={cn(
                          'text-left p-4 rounded-md border transition-all cursor-pointer',
                          metric === item.value
                            ? 'bg-surface border-brand-300 dark:border-brand-700 shadow-lift'
                            : 'bg-surface-2 border-line hover:border-brand-200',
                        )}
                      >
                        <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-ink-muted uppercase tracking-wide">
                          <Icon name={item.icon} className="w-3.5 h-3.5" />
                          {item.label}
                        </span>
                        <span className="block font-heading font-extrabold text-2xl text-ink mt-1.5 tabular-nums">
                          {ordinal(data.percentile)}
                        </span>
                        <span className="block text-[11px] text-ink-muted">
                          percentile · z {data.z >= 0 ? '+' : ''}{data.z.toFixed(2)}
                        </span>
                        <span
                          className={cn(
                            'inline-flex mt-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold border',
                            TONE_STYLES[data.tone],
                          )}
                        >
                          {data.tone === 'good' ? 'Healthy range' : data.tone === 'ok' ? 'Within range' : data.tone === 'warn' ? 'Watch' : 'Review needed'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* chart */}
                <div className="rounded-lg border border-line bg-surface-2 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-extrabold text-sm text-ink">
                        {METRICS.find((m) => m.value === metric)?.axis} · {form.sex === 'girl' ? 'girls' : 'boys'}
                      </h3>
                      <p className="text-[11px] text-ink-muted">
                        Your child is the blue dot. The shaded band is the healthy −2 to +2 SD corridor.
                      </p>
                    </div>
                    <Tabs
                      tabs={METRICS.map((m) => ({ value: m.value, label: m.label, icon: m.icon }))}
                      value={metric}
                      onChange={setMetric}
                      size="sm"
                    />
                  </div>

                  <GrowthChart metric={metric} sex={form.sex} ageMonths={derivedAge} value={metricValue} />

                  {result.results[metric]?.median != null && (
                    <p className="text-[11px] text-ink-muted text-center">
                      Median for this age: <strong className="text-ink-soft">
                        {result.results[metric].median.toFixed(1)}{METRICS.find((m) => m.value === metric)?.unit}
                      </strong>
                      {Number.isFinite(metricValue) && (
                        <> · your child: <strong className="text-accent-600 dark:text-accent-400">
                          {metricValue.toFixed(1)}{METRICS.find((m) => m.value === metric)?.unit}
                        </strong></>
                      )}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => openBooking({ source: 'growth_tool', reason: 'Growth & milestone review' })}
                    icon="CalendarCheck"
                    className="flex-1"
                  >
                    Discuss this with {config.business.professional?.shortName || 'the doctor'}
                  </Button>
                  <Button onClick={() => window.print()} variant="outline" icon="Printer" className="sm:flex-none">
                    Print
                  </Button>
                </div>
              </>
            )}

            {tool.disclaimer && <FootNote tone="warn">{tool.disclaimer}</FootNote>}
          </div>
        </div>
      </Card>
    </Section>
  );
}
