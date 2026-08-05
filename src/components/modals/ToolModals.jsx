import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn, whatsappUrl } from '../../lib/utils';
import { useLocalStorage } from '../../lib/hooks';
import { Modal, Button, Icon, Badge, Card, Stepper, Tabs, FootNote } from '../ui';

/* ------------------------------------------------------------------ */
/* Weight-based dose reference                                         */
/* ------------------------------------------------------------------ */

export function DoseModal() {
  const { config, modal, closeModal, openBooking } = useApp();
  const open = modal.name === 'dose';
  const tool = config.tools?.dose || {};
  const drugs = tool.drugs || [];

  const [weight, setWeight] = useLocalStorage('practice-os:dose-weight', '10');
  const [drugId, setDrugId] = useState(drugs[0]?.id);
  const [strengthIndex, setStrengthIndex] = useState(0);

  const drug = useMemo(() => drugs.find((d) => d.id === drugId) || drugs[0], [drugs, drugId]);
  const strength = drug?.strengths?.[strengthIndex] || drug?.strengths?.[0];

  const calc = useMemo(() => {
    const kg = parseFloat(weight);
    if (!drug || !strength || !Number.isFinite(kg) || kg <= 0) return null;

    const rawMg = kg * drug.perKg;
    const mg = Math.min(rawMg, drug.maxSingleMg || rawMg);
    const ml = mg / strength.mgPerMl;
    return {
      mg,
      ml,
      capped: rawMg > (drug.maxSingleMg || Infinity),
      dailyMax: mg * drug.maxDosesPerDay,
    };
  }, [weight, drug, strength]);

  if (!tool.enabled || !drug) return null;

  return (
    <Modal open={open} onClose={closeModal} size="md" icon="Calculator" title={tool.title} description={tool.sub}>
      <div className="space-y-5">
        <Tabs
          tabs={drugs.map((d) => ({ value: d.id, label: d.name.split(' (')[0] }))}
          value={drug.id}
          onChange={(value) => {
            setDrugId(value);
            setStrengthIndex(0);
          }}
          size="sm"
        />

        <Stepper
          label="Your child's weight"
          value={weight}
          onChange={setWeight}
          min={2}
          max={60}
          step={0.5}
          unit="kg"
          hint="Use the most recent weighed value, not an estimate"
        />

        <div className="space-y-2">
          <span className="block text-xs font-bold text-ink-soft">Which bottle do you have?</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {drug.strengths.map((item, index) => {
              const active = index === strengthIndex;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setStrengthIndex(index)}
                  className={cn(
                    'p-3 rounded-md border text-left transition-all cursor-pointer',
                    active
                      ? 'bg-brand-50 border-brand-300 dark:bg-brand-950/40 dark:border-brand-700'
                      : 'bg-surface-2 border-line hover:border-brand-200',
                  )}
                >
                  <span className={cn('block text-[12px] font-bold', active ? 'text-brand-800 dark:text-brand-200' : 'text-ink')}>
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-ink-muted mt-0.5">{item.mgPerMl} mg per ml</span>
                </button>
              );
            })}
          </div>
        </div>

        {calc && (
          <div className="rounded-lg border border-brand-200 dark:border-brand-800/60 bg-brand-50/70 dark:bg-brand-950/30 p-5 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-brand-700 dark:text-brand-300">
              Single dose reference
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-heading font-extrabold text-4xl text-ink tabular-nums leading-none">
                {calc.ml.toFixed(1)}
              </span>
              <span className="font-heading font-extrabold text-xl text-ink-soft">ml</span>
              <span className="text-[13px] text-ink-muted">
                ≈ {Math.round(calc.mg)} mg · {drug.perKg} mg/kg
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-md bg-surface border border-line p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-muted">Repeat every</span>
                <span className="block text-sm font-extrabold text-ink mt-0.5">{drug.intervalHours} hours</span>
              </div>
              <div className="rounded-md bg-surface border border-line p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-muted">Max in 24 hours</span>
                <span className="block text-sm font-extrabold text-ink mt-0.5">{drug.maxDosesPerDay} doses</span>
              </div>
            </div>

            {calc.capped && (
              <p className="text-[12px] font-bold text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <Icon name="Info" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Capped at the adult single-dose ceiling of {drug.maxSingleMg} mg.
              </p>
            )}

            {drug.minAgeMonths > 0 && (
              <p className="text-[12px] text-ink-soft flex items-start gap-2">
                <Icon name="Info" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-ink-muted" />
                Not for babies under {drug.minAgeMonths} months without medical advice.
              </p>
            )}
          </div>
        )}

        {drug.note && (
          <div className="flex items-start gap-2.5 rounded-md bg-surface-2 border border-line p-3.5">
            <Icon name="Lightbulb" className="w-4 h-4 text-highlight-600 dark:text-highlight-400 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-ink-soft leading-relaxed">{drug.note}</p>
          </div>
        )}

        <FootNote tone="warn">{tool.disclaimer}</FootNote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            onClick={() => {
              closeModal();
              setTimeout(() => openBooking({ source: 'dose_tool' }), 150);
            }}
            icon="CalendarCheck"
            full
          >
            Book a consultation
          </Button>
          <Button
            as="a"
            href={whatsappUrl(
              config.business.contact?.whatsapp,
              `Hello, could you confirm the correct dose for my child (${weight} kg)?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            icon="MessageSquare"
            full
          >
            Confirm with the clinic
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Home medicine kit                                                   */
/* ------------------------------------------------------------------ */

export function KitModal() {
  const { config, modal, closeModal } = useApp();
  const open = modal.name === 'kit';
  const tool = config.tools?.kit || {};
  const [ticked, setTicked] = useLocalStorage('practice-os:kit', {});

  if (!tool.enabled) return null;

  const goodGroup = (tool.groups || []).find((group) => group.tone === 'good');
  const total = goodGroup?.items?.length || 0;
  const have = goodGroup ? goodGroup.items.filter((item) => ticked[item]).length : 0;

  return (
    <Modal open={open} onClose={closeModal} size="md" icon="Bandage" title={tool.title} description={tool.sub}>
      <div className="space-y-5">
        {total > 0 && (
          <div className="flex items-center gap-3 rounded-md bg-surface-2 border border-line p-4">
            <span className="font-heading font-extrabold text-2xl text-ink tabular-nums">
              {have}<span className="text-ink-muted text-base">/{total}</span>
            </span>
            <p className="text-[12px] text-ink-soft leading-relaxed">
              {have === total
                ? 'Your kit is complete — check the expiry dates twice a year.'
                : `${total - have} still to pick up. Tick things off as you check the cupboard.`}
            </p>
          </div>
        )}

        {(tool.groups || []).map((group) => (
          <div key={group.title} className="space-y-2.5">
            <h3
              className={cn(
                'font-heading font-extrabold text-sm flex items-center gap-2',
                group.tone === 'danger' ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300',
              )}
            >
              <Icon name={group.icon} className="w-4 h-4" />
              {group.title}
            </h3>

            <ul className="space-y-1.5">
              {group.items.map((item) => {
                const isGood = group.tone === 'good';
                const checked = !!ticked[item];
                return (
                  <li key={item}>
                    {isGood ? (
                      <button
                        type="button"
                        onClick={() => setTicked((prev) => ({ ...prev, [item]: !prev[item] }))}
                        className={cn(
                          'w-full flex items-start gap-3 p-3 rounded-md border text-left transition-all cursor-pointer',
                          checked
                            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50'
                            : 'bg-surface-2 border-line hover:border-emerald-200',
                        )}
                      >
                        <span
                          className={cn(
                            'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-px transition-colors',
                            checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-line',
                          )}
                        >
                          {checked && <Icon name="Check" className="w-3 h-3" strokeWidth={3} />}
                        </span>
                        <span className={cn('text-[13px] leading-relaxed', checked ? 'text-emerald-900 dark:text-emerald-100 font-semibold' : 'text-ink-soft')}>
                          {item}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-start gap-3 p-3 rounded-md border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/20">
                        <Icon name="X" className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-[13px] text-red-900/85 dark:text-red-200/85 leading-relaxed">{item}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <FootNote icon="Lock">
          Your ticks are saved in this browser only. Replace ORS and check expiry dates every six months.
        </FootNote>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Exit intent — vaccination reminder signup                           */
/* ------------------------------------------------------------------ */

export function ExitIntentModal({ open, onClose }) {
  const { config, track } = useApp();
  const offer = config.integrations?.exitIntent || {};
  const [dob, setDob] = useState('');

  if (!offer.enabled) return null;

  const send = () => {
    const message = `Hello ${config.brand.name}! Please set up free WhatsApp vaccination reminders for my child${
      dob ? ` (date of birth ${dob})` : ''
    }.`;
    track('exit_intent_convert', {});
    window.open(whatsappUrl(config.business.contact?.whatsapp, message), '_blank', 'noopener');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" icon="Bell" title={offer.title}>
      <div className="space-y-4">
        <p className="text-sm text-ink-soft leading-relaxed">{offer.body}</p>

        <label className="block space-y-1.5">
          <span className="text-xs font-bold text-ink-soft">Child's date of birth (optional)</span>
          <input
            type="date"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            className="w-full bg-surface-2 border border-line rounded-md px-3.5 py-3 text-sm font-semibold text-ink focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12"
          />
        </label>

        <Button onClick={send} variant="whatsapp" full icon="MessageSquare">
          {offer.cta}
        </Button>

        <button
          type="button"
          onClick={onClose}
          className="w-full text-xs font-bold text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          No thanks
        </button>
      </div>
    </Modal>
  );
}
