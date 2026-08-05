import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import {
  cn, whatsappUrl, mailtoUrl, telUrl, copyText, formatMoney, formatDate, formatRange,
  toISODate, addDays, DAY_KEYS, DAY_LABELS, buildICS, downloadFile, toMinutes,
} from '../../lib/utils';
import { useLocalStorage, useReducedMotion } from '../../lib/hooks';
import { Modal, Button, Icon, Badge, Input, Select, Textarea, ProgressBar } from '../ui';

const STEPS = [
  { id: 'reason', title: 'What is the visit for?', icon: 'Stethoscope' },
  { id: 'who', title: 'Who is coming in?', icon: 'Baby' },
  { id: 'when', title: 'When suits you?', icon: 'CalendarClock' },
];

/** Next 14 days that the practice is actually open, with their sessions. */
function useAvailableDays(hours, count = 14) {
  return useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let offset = 0; offset < 30 && days.length < count; offset += 1) {
      const date = addDays(today, offset);
      const slots = hours?.[DAY_KEYS[date.getDay()]] || [];
      if (!slots.length) continue;
      days.push({
        date,
        iso: toISODate(date),
        slots,
        label: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : DAY_LABELS[DAY_KEYS[date.getDay()]].slice(0, 3),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-IN', { month: 'short' }),
      });
    }
    return days;
  }, [hours, count]);
}

export default function BookingModal() {
  const { config, modal, closeModal, toast, track } = useApp();
  const open = modal.name === 'booking';
  const payload = modal.payload || {};

  const { business, brand, booking } = config;
  const reasons = booking.reasons || [];
  const availableDays = useAvailableDays(business.hours);

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const reduced = useReducedMotion();

  // Contact details are remembered so a returning parent does not retype them.
  const [remembered, setRemembered] = useLocalStorage('practice-os:contact', { name: '', phone: '' });

  const [form, setForm] = useState({
    reason: reasons[0] || '',
    subject: '',
    age: '',
    contactName: '',
    contactPhone: '',
    date: '',
    slot: '',
    notes: '',
  });

  // Reset when reopened, honouring any prefill the caller passed in.
  useEffect(() => {
    if (!open) return;
    setStep(0);
    setSent(false);
    setErrors({});
    setForm({
      reason: payload.reason || reasons[0] || '',
      subject: payload.subject || '',
      age: payload.age || '',
      contactName: remembered.name || '',
      contactPhone: remembered.phone || '',
      date: '',
      slot: '',
      notes: payload.note || '',
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
  };

  const selectedDay = availableDays.find((day) => day.iso === form.date);

  const validate = (index) => {
    const found = {};
    if (index === 0 && !form.reason) found.reason = 'Please pick a reason';
    if (index === 1) {
      if (!form.subject.trim()) found.subject = 'Required';
      if (!form.contactName.trim()) found.contactName = 'Required';
      const digits = form.contactPhone.replace(/\D/g, '');
      if (digits.length < 10) found.contactPhone = 'Enter a 10-digit mobile number';
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === 1) setRemembered({ name: form.contactName, phone: form.contactPhone });
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const message = useMemo(() => {
    const lines = [
      `Hello ${brand.name}${brand.nameAccent ? ` ${brand.nameAccent}` : ''}! 👋`,
      '',
      `*${booking.subjectPrefix || 'Appointment request'}*`,
      '',
      `🩺 Reason: ${form.reason}`,
      `👤 For: ${form.subject || '—'}${form.age ? ` (${form.age})` : ''}`,
      `📞 Contact: ${form.contactName || '—'} — ${form.contactPhone || '—'}`,
    ];
    if (form.date) {
      lines.push(`📅 Preferred day: ${formatDate(new Date(form.date), { weekday: 'short', day: 'numeric', month: 'short' })}`);
    }
    if (form.slot) lines.push(`⏰ Preferred session: ${form.slot}`);
    if (form.notes.trim()) lines.push(`📝 Notes: ${form.notes.trim()}`);
    lines.push('', 'Could you confirm a slot please? Thank you!');
    return lines.join('\n');
  }, [form, brand, booking.subjectPrefix]);

  const submit = () => {
    if (!validate(1)) {
      setStep(1);
      return;
    }
    setSent(true);
    track('booking_submit', {
      reason: form.reason,
      hasDate: !!form.date,
      source: payload.source || 'unknown',
    });

    if (!reduced) confetti({ particleCount: 70, spread: 72, origin: { y: 0.65 }, disableForReducedMotion: true });

    setTimeout(() => {
      window.open(whatsappUrl(business.contact?.whatsapp, message), '_blank', 'noopener');
    }, 700);
  };

  const addToCalendar = () => {
    if (!form.date) return;
    const start = new Date(form.date);
    const openMinutes = selectedDay?.slots?.[0] ? toMinutes(selectedDay.slots[0].open) : 11 * 60;
    start.setHours(Math.floor(openMinutes / 60), openMinutes % 60, 0, 0);
    const address = business.contact?.address || {};
    const ics = buildICS(
      [
        {
          title: `${form.subject || 'Appointment'} — ${brand.name}`,
          description: `${form.reason}\n\nRequested via the website. Confirm the exact time with the clinic.`,
          location: [address.street, address.locality, address.postalCode].filter(Boolean).join(', '),
          start,
          durationMinutes: 30,
          alarmMinutesBefore: 120,
        },
      ],
      'Appointment',
    );
    downloadFile(`appointment-${form.date}.ics`, ics);
    toast('Calendar file downloaded', { tone: 'good', icon: 'Download' });
  };

  const copySummary = async () => {
    const ok = await copyText(message);
    toast(ok ? 'Details copied' : 'Could not copy', { tone: ok ? 'good' : 'warn', icon: ok ? 'Check' : 'Info' });
  };

  /* ---------------------------------------------------------------- */

  if (sent) {
    return (
      <Modal open={open} onClose={closeModal} size="sm">
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-300 flex items-center justify-center mx-auto animate-bobble">
            <Icon name="PartyPopper" className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-xl text-ink">{booking.successTitle}</h3>
            <p className="text-[13px] text-ink-soft leading-relaxed">{booking.successBody}</p>
          </div>

          <div className="rounded-md border border-line bg-surface-2 p-4 text-left space-y-2 text-[12px]">
            <p className="flex items-start gap-2">
              <Icon name="Stethoscope" className="w-3.5 h-3.5 text-ink-muted flex-shrink-0 mt-0.5" />
              <span className="text-ink-soft">{form.reason}</span>
            </p>
            <p className="flex items-start gap-2">
              <Icon name="Baby" className="w-3.5 h-3.5 text-ink-muted flex-shrink-0 mt-0.5" />
              <span className="text-ink-soft">{form.subject}{form.age ? ` · ${form.age}` : ''}</span>
            </p>
            {form.date && (
              <p className="flex items-start gap-2">
                <Icon name="Calendar" className="w-3.5 h-3.5 text-ink-muted flex-shrink-0 mt-0.5" />
                <span className="text-ink-soft">
                  {formatDate(new Date(form.date), { weekday: 'long', day: 'numeric', month: 'long' })}
                  {form.slot ? ` · ${form.slot}` : ''}
                </span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Button
              as="a"
              href={whatsappUrl(business.contact?.whatsapp, message)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              full
              icon="MessageSquare"
            >
              Open WhatsApp again
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={copySummary} variant="outline" size="sm" icon="Copy">
                Copy details
              </Button>
              <Button onClick={addToCalendar} variant="outline" size="sm" icon="Calendar" disabled={!form.date}>
                Add to calendar
              </Button>
            </div>
            {business.contact?.email && (
              <Button
                as="a"
                href={mailtoUrl(business.contact.email, `${booking.subjectPrefix} — ${form.subject}`, message)}
                variant="ghost"
                size="sm"
                full
                icon="Mail"
              >
                Send by email instead
              </Button>
            )}
            <Button as="a" href={telUrl(business.contact?.phone)} variant="ghost" size="sm" full icon="PhoneCall">
              Or call {business.contact?.phone}
            </Button>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="text-xs font-bold text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </Modal>
    );
  }

  const currentStep = STEPS[step];

  return (
    <Modal
      open={open}
      onClose={closeModal}
      size="md"
      icon={currentStep.icon}
      title={booking.title}
      description={`Step ${step + 1} of ${STEPS.length} — ${currentStep.title}`}
      footer={
        <div className="flex items-center gap-2.5">
          {step > 0 && (
            <Button onClick={() => setStep((s) => s - 1)} variant="ghost" size="sm" icon="ArrowLeft">
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < STEPS.length - 1 ? (
            <Button onClick={next} icon="ArrowRight" size="sm">
              Continue
            </Button>
          ) : (
            <Button onClick={submit} variant="whatsapp" size="sm" icon="Send">
              Send request
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-5">
        <ProgressBar value={((step + 1) / STEPS.length) * 100} label="Booking progress" />

        {/* ------------------------------------------ step 1: reason */}
        {step === 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              {reasons.map((reason) => {
                const active = form.reason === reason;
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => update({ reason })}
                    className={cn(
                      'w-full flex items-center gap-3 p-3.5 rounded-md border text-left transition-all cursor-pointer',
                      active
                        ? 'bg-brand-50 border-brand-300 dark:bg-brand-950/40 dark:border-brand-700'
                        : 'bg-surface-2 border-line hover:border-brand-200 dark:hover:border-brand-800',
                    )}
                  >
                    <span
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        active ? 'border-brand-600 bg-brand-600' : 'border-line',
                      )}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className={cn('text-sm font-semibold', active ? 'text-brand-900 dark:text-brand-100' : 'text-ink')}>
                      {reason}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.reason && <p className="text-[11px] font-semibold text-red-600">{errors.reason}</p>}

            {business.pricing?.consultationFee != null && (
              <div className="flex items-center gap-3 rounded-md bg-surface-2 border border-line p-3.5">
                <Icon name="Wallet" className="w-4 h-4 text-ink-muted flex-shrink-0" />
                <p className="text-[12px] text-ink-soft leading-relaxed">
                  Consultation is{' '}
                  <strong className="text-ink">
                    {formatMoney(business.pricing.consultationFee, business.pricing.currency)}
                  </strong>
                  {business.pricing.note ? ` — ${business.pricing.note}` : '.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------ step 2: who */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label={booking.fields?.subjectLabel || 'Name'}
                placeholder={booking.fields?.subjectPlaceholder || 'Full name'}
                value={form.subject}
                onChange={(event) => update({ subject: event.target.value })}
                error={errors.subject}
                icon="Baby"
                required
              />
              <Input
                label="Age"
                placeholder={booking.fields?.agePlaceholder || 'e.g. 8 months'}
                value={form.age}
                onChange={(event) => update({ age: event.target.value })}
                icon="Calendar"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Your name"
                placeholder="Parent or guardian"
                value={form.contactName}
                onChange={(event) => update({ contactName: event.target.value })}
                error={errors.contactName}
                icon="Users"
                required
              />
              <Input
                label="Mobile number"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit number"
                value={form.contactPhone}
                onChange={(event) => update({ contactPhone: event.target.value })}
                error={errors.contactPhone}
                icon="Phone"
                required
              />
            </div>

            <Textarea
              label="Anything we should know?"
              placeholder="Symptoms, how long they have lasted, medicines already given…"
              value={form.notes}
              onChange={(event) => update({ notes: event.target.value })}
              rows={3}
              hint="Optional, but it helps us prepare"
            />
          </div>
        )}

        {/* ------------------------------------------ step 3: when */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2.5">
              <span className="block text-xs font-bold text-ink-soft">Preferred day</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                {availableDays.map((day) => {
                  const active = form.date === day.iso;
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => update({ date: active ? '' : day.iso, slot: '' })}
                      className={cn(
                        'flex-shrink-0 w-[4.5rem] py-2.5 rounded-md border text-center transition-all cursor-pointer press',
                        active
                          ? 'bg-brand-600 text-white border-brand-600 shadow-lift'
                          : 'bg-surface-2 border-line text-ink-soft hover:border-brand-300',
                      )}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wide opacity-75">{day.label}</span>
                      <span className="block font-heading font-extrabold text-xl leading-tight tabular-nums">{day.dayNum}</span>
                      <span className="block text-[10px] font-semibold opacity-70">{day.month}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-ink-muted">
                Optional — leave this blank and we will offer the earliest available slot.
              </p>
            </div>

            {selectedDay && (
              <div className="space-y-2.5 animate-fade-in">
                <span className="block text-xs font-bold text-ink-soft">Preferred session</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDay.slots.map((slot) => {
                    const label = formatRange(slot);
                    const active = form.slot === label;
                    const isMorning = toMinutes(slot.open) < 12 * 60;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => update({ slot: active ? '' : label })}
                        className={cn(
                          'flex items-center gap-2.5 p-3.5 rounded-md border transition-all cursor-pointer',
                          active
                            ? 'bg-brand-50 border-brand-300 dark:bg-brand-950/40 dark:border-brand-700'
                            : 'bg-surface-2 border-line hover:border-brand-200',
                        )}
                      >
                        <Icon
                          name={isMorning ? 'Sun' : 'Moon'}
                          className={cn('w-4 h-4 flex-shrink-0', active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-muted')}
                        />
                        <span className="text-left min-w-0">
                          <span className={cn('block text-[11px] font-extrabold uppercase tracking-wide', active ? 'text-brand-700 dark:text-brand-300' : 'text-ink-muted')}>
                            {isMorning ? 'Morning' : 'Evening'}
                          </span>
                          <span className="block text-[13px] font-bold text-ink">{label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* review */}
            <div className="rounded-md border border-line bg-surface-2 p-4 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink-muted">Your request</p>
              <ul className="space-y-1.5 text-[12px] text-ink-soft">
                <li className="flex gap-2">
                  <Icon name="Stethoscope" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-ink-muted" />
                  {form.reason}
                </li>
                <li className="flex gap-2">
                  <Icon name="Baby" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-ink-muted" />
                  {form.subject || '—'}{form.age ? ` · ${form.age}` : ''}
                </li>
                <li className="flex gap-2">
                  <Icon name="Phone" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-ink-muted" />
                  {form.contactName || '—'} · {form.contactPhone || '—'}
                </li>
                <li className="flex gap-2">
                  <Icon name="Calendar" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-ink-muted" />
                  {form.date
                    ? `${formatDate(new Date(form.date), { weekday: 'long', day: 'numeric', month: 'long' })}${form.slot ? ` · ${form.slot}` : ''}`
                    : 'Earliest available'}
                </li>
              </ul>
            </div>

            <p className="text-[11px] text-ink-muted flex items-start gap-2">
              <Icon name="Lock" className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
              Nothing is stored on a server. Pressing send opens WhatsApp with this summary — you choose whether to send it.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
