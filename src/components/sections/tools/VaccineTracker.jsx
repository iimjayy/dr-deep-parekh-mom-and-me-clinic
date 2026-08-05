import React, { useMemo, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { buildPlan, planToICS, planToText, STATUS, STATUS_META } from '../../../lib/vaccines';
import { ageFromDob, cn, downloadFile, formatDate, toISODate, whatsappUrl } from '../../../lib/utils';
import { useLocalStorage } from '../../../lib/hooks';
import {
  Button, Icon, Badge, Card, Reveal, Section, SectionHeader, FootNote,
  Input, ProgressRing, Tabs,
} from '../../ui';

const FILTERS = [
  { value: 'all', label: 'Full schedule' },
  { value: 'action', label: 'Needs action', icon: 'Bell' },
  { value: STATUS.UPCOMING, label: 'Upcoming', icon: 'CalendarClock' },
  { value: STATUS.DONE, label: 'Done', icon: 'CheckCircle2' },
];

const STATUS_STYLES = {
  [STATUS.DONE]: 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20',
  [STATUS.DUE]: 'border-amber-300 dark:border-amber-700 bg-amber-50/70 dark:bg-amber-950/25',
  [STATUS.OVERDUE]: 'border-red-300 dark:border-red-800 bg-red-50/70 dark:bg-red-950/25',
  [STATUS.UPCOMING]: 'border-line bg-surface',
};

const STATUS_TONE = {
  [STATUS.DONE]: 'good',
  [STATUS.DUE]: 'warn',
  [STATUS.OVERDUE]: 'danger',
  [STATUS.UPCOMING]: 'neutral',
};

export default function VaccineTracker({ section }) {
  const { config, openBooking, toast, track } = useApp();
  const tool = config.tools?.vaccines || {};
  const schedule = tool.schedule || [];

  const [state, setState] = useLocalStorage('practice-os:vaccines', { dob: '', childName: '', done: [] });
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const plan = useMemo(
    () => buildPlan(schedule, state.dob || null, state.done || [], tool.graceDays ?? 30),
    [schedule, state.dob, state.done, tool.graceDays],
  );

  const age = state.dob ? ageFromDob(state.dob) : null;

  if (!tool.enabled || !schedule.length) return null;

  const toggleDone = (id) => {
    setState((prev) => {
      const done = new Set(prev.done || []);
      if (done.has(id)) done.delete(id);
      else done.add(id);
      return { ...prev, done: [...done] };
    });
    track('vaccine_toggle', { id });
  };

  const visible = plan.entries.filter((entry) => {
    if (filter === 'all') return true;
    if (filter === 'action') return entry.status === STATUS.DUE || entry.status === STATUS.OVERDUE;
    return entry.status === filter;
  });

  const counts = {
    all: plan.entries.length,
    action: plan.counts.due + plan.counts.overdue,
    [STATUS.UPCOMING]: plan.counts.upcoming,
    [STATUS.DONE]: plan.counts.done,
  };

  const childName = state.childName?.trim() || 'my child';
  const address = config.business.contact?.address || {};

  const exportCalendar = () => {
    const { ics, count } = planToICS(plan, {
      childName,
      clinicName: `${config.brand.name} ${config.brand.nameAccent || ''}`.trim(),
      location: [address.street, address.locality].filter(Boolean).join(', '),
    });
    if (!count) {
      toast('No upcoming doses left to export', { tone: 'warn', icon: 'Info' });
      return;
    }
    downloadFile(`vaccination-plan-${toISODate(new Date())}.ics`, ics);
    toast(`${count} reminders downloaded — open the file to add them`, { tone: 'good', icon: 'Download' });
    track('vaccine_ics_export', { count });
  };

  const sendToClinic = () => {
    const text = `Hello ${config.brand.name}!\n\n${planToText(plan, {
      childName,
      dobLabel: state.dob ? formatDate(new Date(state.dob)) : '',
    })}\n\nCould we book the next due dose?`;
    window.open(whatsappUrl(config.business.contact?.whatsapp, text), '_blank', 'noopener');
    track('vaccine_whatsapp', {});
  };

  return (
    <Section id={section?.id} tone="inset">
      <SectionHeader eyebrow={tool.protocol} eyebrowIcon="Syringe" title={tool.title} sub={tool.sub} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ------------------------------------------ control panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start space-y-4">
          <Reveal variant="left">
            <Card className="p-6 space-y-5">
              <div className="space-y-4">
                <Input
                  label="Child's date of birth"
                  type="date"
                  value={state.dob}
                  max={toISODate(new Date())}
                  onChange={(event) => setState((prev) => ({ ...prev, dob: event.target.value }))}
                  hint={age ? `${age.label} — every due date below is calculated from this` : 'Stays on your device'}
                  icon="Calendar"
                />
                <Input
                  label="Child's name (optional)"
                  value={state.childName}
                  onChange={(event) => setState((prev) => ({ ...prev, childName: event.target.value }))}
                  placeholder="Used only in the reminders you export"
                  icon="Baby"
                />
              </div>

              {plan.hasDob && (
                <div className="flex items-center gap-5 pt-1">
                  <ProgressRing
                    value={plan.progress}
                    tone={plan.counts.overdue ? 'warn' : 'brand'}
                    size={92}
                    stroke={9}
                  >
                    <span className="font-heading font-extrabold text-xl text-ink leading-none tabular-nums">
                      {plan.progress}%
                    </span>
                    <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wide mt-0.5">on track</span>
                  </ProgressRing>

                  <div className="space-y-1.5 text-[12px] min-w-0">
                    <p className="flex items-center gap-2 text-ink-soft">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <strong className="text-ink tabular-nums">{plan.counts.done}</strong> completed
                    </p>
                    <p className="flex items-center gap-2 text-ink-soft">
                      <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                      <strong className="text-ink tabular-nums">{plan.counts.due}</strong> due now
                    </p>
                    <p className="flex items-center gap-2 text-ink-soft">
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      <strong className="text-ink tabular-nums">{plan.counts.overdue}</strong> overdue
                    </p>
                    <p className="flex items-center gap-2 text-ink-muted">
                      <span className="w-2 h-2 rounded-full bg-line flex-shrink-0" />
                      <strong className="text-ink-soft tabular-nums">{plan.counts.upcoming}</strong> upcoming
                    </p>
                  </div>
                </div>
              )}

              {plan.nextUp && plan.hasDob && (
                <div
                  className={cn(
                    'rounded-md border p-4 space-y-1',
                    plan.nextUp.status === STATUS.OVERDUE
                      ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/25'
                      : 'border-brand-200 dark:border-brand-800/60 bg-brand-50 dark:bg-brand-950/30',
                  )}
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink-muted">Next up</p>
                  <p className="font-heading font-extrabold text-base text-ink">{plan.nextUp.label}</p>
                  <p className="text-[12px] text-ink-soft">
                    {plan.nextUp.dueDate ? formatDate(plan.nextUp.dueDate) : '—'}
                    {plan.nextUp.daysAway != null && (
                      <> · {plan.nextUp.daysAway === 0 ? 'today' : plan.nextUp.daysAway > 0 ? `in ${plan.nextUp.daysAway} days` : `${Math.abs(plan.nextUp.daysAway)} days ago`}</>
                    )}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2">
                <Button
                  onClick={() => openBooking({ source: 'vaccines', reason: 'Vaccination (WHO / IAP schedule)' })}
                  full
                  icon="CalendarCheck"
                >
                  Book the next dose
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={exportCalendar} variant="outline" size="sm" icon="Download" disabled={!plan.hasDob}>
                    Calendar
                  </Button>
                  <Button onClick={sendToClinic} variant="outline" size="sm" icon="Send" disabled={!plan.hasDob}>
                    Send plan
                  </Button>
                </div>
              </div>

              {(state.done?.length > 0 || state.dob) && (
                <button
                  type="button"
                  onClick={() => setState({ dob: '', childName: '', done: [] })}
                  className="w-full text-[11px] font-bold text-ink-muted hover:text-ink transition-colors cursor-pointer"
                >
                  Clear everything from this device
                </button>
              )}
            </Card>
          </Reveal>
        </div>

        {/* ------------------------------------------ schedule */}
        <div className="lg:col-span-8 space-y-4">
          {!plan.hasDob && (
            <Reveal>
              <div className="rounded-lg border border-dashed border-line bg-surface p-5 flex items-start gap-3.5">
                <Icon name="Info" className="w-5 h-5 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-ink-soft leading-relaxed">
                  Add a date of birth on the left and every entry below gets a real date, with overdue doses flagged in red.
                  Without it, this is the standard schedule by age.
                </p>
              </div>
            </Reveal>
          )}

          <Reveal>
            <Tabs
              tabs={FILTERS.map((f) => ({ ...f, count: counts[f.value] }))}
              value={filter}
              onChange={setFilter}
              size="sm"
            />
          </Reveal>

          <div className="space-y-2.5">
            {visible.length === 0 && (
              <Card inset className="p-10 text-center space-y-2">
                <Icon name="CheckCircle2" className="w-8 h-8 text-brand-500 mx-auto" />
                <p className="font-bold text-sm text-ink">Nothing in this list</p>
                <p className="text-xs text-ink-muted">Try another filter.</p>
              </Card>
            )}

            {visible.map((entry, index) => {
              const meta = STATUS_META[entry.status];
              const isOpen = expanded === entry.id;
              const done = entry.status === STATUS.DONE;

              return (
                <Reveal key={entry.id} delay={Math.min(index, 6) * 55}>
                  <div className={cn('rounded-lg border transition-all', STATUS_STYLES[entry.status])}>
                    <div className="flex items-start gap-3.5 p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={() => toggleDone(entry.id)}
                        aria-pressed={done}
                        aria-label={done ? `Mark ${entry.label} as not done` : `Mark ${entry.label} as done`}
                        className={cn(
                          'w-9 h-9 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer',
                          done
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-surface border-line text-transparent hover:border-brand-400',
                        )}
                      >
                        <Icon name="Check" className="w-4 h-4" strokeWidth={3} />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={cn('font-heading font-extrabold text-base', done ? 'text-ink-muted line-through' : 'text-ink')}>
                            {entry.label}
                          </h3>
                          <Badge tone={STATUS_TONE[entry.status]} size="xs" icon={meta.icon}>
                            {meta.label}
                          </Badge>
                          {entry.dueDate && (
                            <span className="text-[11px] font-bold text-ink-muted tabular-nums">
                              {formatDate(entry.dueDate)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(entry.vaccines || []).map((vaccine) => (
                            <span
                              key={vaccine}
                              className={cn(
                                'text-[11px] font-bold px-2 py-0.5 rounded-md border',
                                done
                                  ? 'bg-surface-2 border-line text-ink-muted'
                                  : 'bg-surface border-line text-ink-soft',
                              )}
                            >
                              {vaccine}
                            </span>
                          ))}
                        </div>

                        {isOpen && entry.importance && (
                          <p className="text-[12px] text-ink-soft leading-relaxed mt-3 pt-3 border-t border-line animate-fade-in">
                            <strong className="text-ink">Why it matters: </strong>
                            {entry.importance}
                          </p>
                        )}

                        <div className="flex items-center gap-4 mt-3">
                          {entry.importance && (
                            <button
                              type="button"
                              onClick={() => setExpanded(isOpen ? null : entry.id)}
                              className="text-[11px] font-bold text-ink-muted hover:text-ink transition-colors cursor-pointer flex items-center gap-1"
                            >
                              {isOpen ? 'Hide' : 'Why this matters'}
                              <Icon name="ChevronDown" className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
                            </button>
                          )}
                          {!done && (
                            <button
                              type="button"
                              onClick={() =>
                                openBooking({
                                  source: 'vaccine_entry',
                                  reason: 'Vaccination (WHO / IAP schedule)',
                                  note: `${entry.label}: ${(entry.vaccines || []).join(', ')}`,
                                })
                              }
                              className="text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              Book this visit
                              <Icon name="ArrowRight" className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <FootNote icon="Lock">
            Dates of birth and ticked doses stay in this browser only. Nothing is uploaded, and clearing your browser data removes them.
            Always confirm the schedule against your child's official vaccination card.
          </FootNote>
        </div>
      </div>
    </Section>
  );
}
