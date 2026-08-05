import React, { useMemo, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { useLocalStorage } from '../../../lib/hooks';
import {
  Button, Icon, Badge, Card, Reveal, Section, SectionHeader, FootNote,
  Tabs, Checkbox, ProgressBar,
} from '../../ui';

export default function Milestones({ section }) {
  const { config, openBooking, track } = useApp();
  const tool = config.tools?.milestones || {};
  const stages = tool.stages || [];

  const [checked, setChecked] = useLocalStorage('practice-os:milestones', {});
  const [activeStage, setActiveStage] = useState(stages[0]?.id);

  const current = useMemo(
    () => stages.find((stage) => stage.id === activeStage) || stages[0],
    [stages, activeStage],
  );

  if (!tool.enabled || !stages.length || !current) return null;

  const stageChecks = checked[current.id] || {};
  const doneCount = current.items.filter((item) => stageChecks[item.id]).length;
  const total = current.items.length;
  const pct = total ? (doneCount / total) * 100 : 0;
  const missing = total - doneCount;

  const toggle = (itemId, value) => {
    setChecked((prev) => ({
      ...prev,
      [current.id]: { ...(prev[current.id] || {}), [itemId]: value },
    }));
    track('milestone_toggle', { stage: current.id });
  };

  const clearStage = () => setChecked((prev) => ({ ...prev, [current.id]: {} }));

  const verdict =
    doneCount === 0
      ? { tone: 'neutral', text: 'Tick off what your child is already doing.' }
      : missing === 0
        ? { tone: 'good', text: `Every ${current.stage} milestone ticked — right on track.` }
        : missing <= 2
          ? { tone: 'ok', text: `${missing} still to come. Perfectly normal at this stage — children vary by weeks.` }
          : { tone: 'warn', text: `${missing} not yet ticked. Worth mentioning at the next visit so we can look properly.` };

  return (
    <Section id={section?.id} tone="base">
      <SectionHeader eyebrow="Development check" eyebrowIcon="ListChecks" title={tool.title} sub={tool.sub} />

      <Reveal className="flex justify-center mb-8">
        <Tabs
          tabs={stages.map((stage) => {
            const stageDone = Object.values(checked[stage.id] || {}).filter(Boolean).length;
            return {
              value: stage.id,
              label: stage.stage,
              count: stageDone || undefined,
            };
          })}
          value={current.id}
          onChange={setActiveStage}
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ------------------------------------------ checklist */}
        <div className="lg:col-span-8">
          <Reveal>
            <Card className="p-6 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-line">
                <div>
                  <Badge tone="brand" size="xs">{current.badge}</Badge>
                  <h3 className="font-heading font-extrabold text-2xl text-ink mt-2">{current.title}</h3>
                  <p className="text-[13px] text-ink-muted mt-0.5">Typical at around {current.stage}</p>
                </div>
                <div className="text-right">
                  <span className="font-heading font-extrabold text-3xl text-ink tabular-nums leading-none">
                    {doneCount}
                    <span className="text-ink-muted text-xl">/{total}</span>
                  </span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wide text-ink-muted mt-1">
                    ticked
                  </span>
                </div>
              </div>

              <ProgressBar
                value={pct}
                tone={missing === 0 ? 'good' : missing <= 2 ? 'brand' : 'warn'}
                label={`${current.stage} milestones completed`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.items.map((item) => (
                  <Checkbox
                    key={item.id}
                    checked={!!stageChecks[item.id]}
                    onChange={(value) => toggle(item.id, value)}
                    label={item.text}
                  />
                ))}
              </div>

              <div
                className={cn(
                  'rounded-md border p-4 flex items-start gap-3 text-[13px] leading-relaxed',
                  {
                    neutral: 'bg-surface-2 border-line text-ink-muted',
                    good: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-100',
                    ok: 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800/50 dark:text-sky-100',
                    warn: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-100',
                  }[verdict.tone],
                )}
              >
                <Icon name={verdict.tone === 'good' ? 'PartyPopper' : 'Info'} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{verdict.text}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  onClick={() => openBooking({ source: 'milestones', reason: 'Growth & milestone review' })}
                  icon="CalendarCheck"
                  className="flex-1"
                >
                  Book a development review
                </Button>
                {doneCount > 0 && (
                  <Button onClick={clearStage} variant="ghost" size="md" icon="RefreshCw">
                    Clear stage
                  </Button>
                )}
              </div>
            </Card>
          </Reveal>
        </div>

        {/* ------------------------------------------ red flags */}
        <div className="lg:col-span-4 space-y-4">
          <Reveal variant="right">
            <Card className="p-6 space-y-4 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/15">
              <h3 className="font-heading font-extrabold text-base text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Icon name="Info" className="w-4 h-4 flex-shrink-0" />
                Bring these up with us
              </h3>
              <ul className="space-y-2.5">
                {(current.redFlags || []).map((flag) => (
                  <li key={flag} className="flex items-start gap-2.5 text-[13px] text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                    {flag}
                  </li>
                ))}
              </ul>
              {tool.redFlagNote && (
                <p className="text-[12px] text-amber-800/70 dark:text-amber-300/70 leading-relaxed pt-3 border-t border-amber-200/60 dark:border-amber-800/40">
                  {tool.redFlagNote}
                </p>
              )}
            </Card>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <FootNote icon="Lock">
              Your ticks are saved in this browser so you can come back to them. Nothing is sent anywhere.
            </FootNote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
