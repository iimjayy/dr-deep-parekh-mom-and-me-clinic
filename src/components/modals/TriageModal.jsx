import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn, telUrl } from '../../lib/utils';
import { Modal, Button, Icon, Badge, ProgressBar } from '../ui';

const TONE_CARD = {
  good: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-100',
  ok: 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800/50 dark:text-sky-100',
  warn: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-100',
  danger: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800/50 dark:text-red-100',
};

const TONE_ICON = { good: 'CheckCircle2', ok: 'Info', warn: 'AlarmClock', danger: 'Ambulance' };

export default function TriageModal() {
  const { config, modal, closeModal, openBooking, track } = useApp();
  const open = modal.name === 'triage';
  const tool = config.tools?.triage || {};
  const questions = tool.questions || [];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (open) {
      setIndex(0);
      setAnswers({});
    }
  }, [open]);

  const finished = index >= questions.length;

  const outcome = useMemo(() => {
    if (!finished) return null;
    const chosen = questions.map((question) => {
      const value = answers[question.id];
      return question.options.find((option) => option.value === value);
    });

    const emergency = chosen.some((option) => option?.emergency);
    const score = chosen.reduce((sum, option) => sum + (option?.weight || 0), 0);
    const band = emergency
      ? (tool.outcomes || []).slice(-1)[0]
      : (tool.outcomes || []).find((o) => score <= o.max) || (tool.outcomes || []).slice(-1)[0];

    return { band, score, emergency, chosen };
  }, [finished, answers, questions, tool.outcomes]);

  useEffect(() => {
    if (outcome?.band) track('triage_result', { tone: outcome.band.tone, score: outcome.score });
  }, [outcome?.band?.tone]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!tool.enabled) return null;

  const question = questions[index];

  const pick = (option) => {
    setAnswers((prev) => ({ ...prev, [question.id]: option.value }));
    // A short beat so the selection is visible before the panel advances.
    setTimeout(() => setIndex((i) => i + 1), 180);
  };

  const summaryNote = outcome
    ? questions
        .map((q) => `${q.question} ${answers[q.id] || '—'}`)
        .join('\n')
    : '';

  return (
    <Modal
      open={open}
      onClose={closeModal}
      size="md"
      icon="Activity"
      title={tool.title}
      description={finished ? 'Your result' : `Question ${index + 1} of ${questions.length} — ${tool.sub}`}
    >
      {!finished && question ? (
        <div className="space-y-5">
          <ProgressBar value={(index / questions.length) * 100} label="Symptom check progress" />

          <div className="flex items-start gap-3.5">
            <span className="w-11 h-11 rounded-md bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 flex items-center justify-center flex-shrink-0">
              <Icon name={question.icon} className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-extrabold text-lg text-ink leading-snug pt-1.5">{question.question}</h3>
          </div>

          <div className="space-y-2">
            {question.options.map((option) => {
              const active = answers[question.id] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => pick(option)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 p-4 rounded-md border text-left transition-all cursor-pointer press',
                    active
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'bg-surface-2 border-line text-ink hover:border-brand-300 hover:bg-surface',
                  )}
                >
                  <span className="text-sm font-semibold">{option.label}</span>
                  <Icon name={active ? 'Check' : 'ChevronRight'} className="w-4 h-4 flex-shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>

          {index > 0 && (
            <Button onClick={() => setIndex((i) => i - 1)} variant="ghost" size="sm" icon="ArrowLeft">
              Previous question
            </Button>
          )}
        </div>
      ) : (
        outcome?.band && (
          <div className="space-y-5">
            <div className={cn('rounded-lg border p-5 space-y-2.5', TONE_CARD[outcome.band.tone])}>
              <div className="flex items-start gap-3">
                <Icon name={TONE_ICON[outcome.band.tone]} className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-extrabold text-lg leading-snug">{outcome.band.title}</h3>
                  <p className="text-[13px] opacity-85 leading-relaxed mt-1">
                    {outcome.emergency ? tool.emergencyText : outcome.band.advice}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-line bg-surface-2 p-4 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink-muted">What you told us</p>
              <ul className="space-y-1.5">
                {questions.map((q) => (
                  <li key={q.id} className="flex items-start gap-2 text-[12px]">
                    <Icon name={q.icon} className="w-3.5 h-3.5 text-ink-muted flex-shrink-0 mt-0.5" />
                    <span className="text-ink-soft">
                      <span className="text-ink-muted">{q.question.replace(/\?$/, '')}: </span>
                      <strong className="text-ink">{answers[q.id] || '—'}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              {(outcome.band.tone === 'danger' || outcome.emergency) && (
                <Button as="a" href={telUrl(config.business.contact?.phone)} variant="danger" full icon="PhoneCall">
                  Call now — {config.business.contact?.phone}
                </Button>
              )}
              <Button
                onClick={() => {
                  closeModal();
                  setTimeout(
                    () => openBooking({ source: 'triage', reason: answers.concern || undefined, age: answers.age, note: summaryNote }),
                    150,
                  );
                }}
                full
                icon="CalendarCheck"
                variant={outcome.band.tone === 'danger' ? 'outline' : 'primary'}
              >
                Book an appointment
              </Button>
              <Button
                onClick={() => {
                  setIndex(0);
                  setAnswers({});
                }}
                variant="ghost"
                size="sm"
                full
                icon="RefreshCw"
              >
                Start over
              </Button>
            </div>

            <p className="text-[11px] text-ink-muted leading-relaxed flex items-start gap-2">
              <Icon name="Info" className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
              This is a guide to urgency, not a diagnosis. It cannot examine your child. If your instinct says something is
              wrong, act on it — parents are usually right.
            </p>
          </div>
        )
      )}
    </Modal>
  );
}
