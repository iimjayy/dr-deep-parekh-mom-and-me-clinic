/**
 * Immunisation schedule engine.
 *
 * The schedule *data* lives in the tenant config (so a different country,
 * academy or practice protocol can be dropped in without touching code). This
 * module turns that data plus a date of birth into a personalised, dated plan
 * with status, catch-up flags and calendar export.
 */

import { addDays, addMonths, buildICS, toISODate } from './utils';

export const STATUS = {
  DONE: 'done',
  DUE: 'due',
  OVERDUE: 'overdue',
  UPCOMING: 'upcoming',
};

/** Convert a schedule entry's age spec into a number of days after birth. */
export function offsetDays(entry) {
  if (entry.ageDays != null) return entry.ageDays;
  if (entry.ageWeeks != null) return entry.ageWeeks * 7;
  if (entry.ageMonths != null) return Math.round(entry.ageMonths * 30.4375);
  if (entry.ageYears != null) return Math.round(entry.ageYears * 365.25);
  return 0;
}

function dueDateFor(dob, entry) {
  if (entry.ageMonths != null) return addMonths(dob, entry.ageMonths);
  if (entry.ageYears != null) return addMonths(dob, entry.ageYears * 12);
  return addDays(dob, offsetDays(entry));
}

/**
 * Build the personalised plan.
 *
 * @param schedule  Array of { id, label, ageWeeks|ageMonths|ageYears, vaccines[], note, importance }
 * @param dob       Date | ISO string | null (null → generic, undated schedule)
 * @param completed Set/array of entry ids the parent has ticked off
 * @param graceDays How long after the due date a visit still counts as "due"
 */
export function buildPlan(schedule = [], dob = null, completed = [], graceDays = 30) {
  const done = new Set(completed);
  const birth = dob ? (dob instanceof Date ? dob : new Date(dob)) : null;
  const valid = birth instanceof Date && !Number.isNaN(birth.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const entries = [...schedule]
    .sort((a, b) => offsetDays(a) - offsetDays(b))
    .map((entry) => {
      const dueDate = valid ? dueDateFor(birth, entry) : null;
      const graceEnd = dueDate ? addDays(dueDate, graceDays) : null;

      let status = STATUS.UPCOMING;
      if (done.has(entry.id)) status = STATUS.DONE;
      else if (!dueDate) status = STATUS.UPCOMING;
      else if (today > graceEnd) status = STATUS.OVERDUE;
      else if (today >= dueDate) status = STATUS.DUE;

      const daysAway = dueDate ? Math.round((dueDate - today) / 86400000) : null;

      return {
        ...entry,
        dueDate,
        graceEnd,
        status,
        daysAway,
        doseCount: entry.vaccines?.length || 0,
      };
    });

  const counts = entries.reduce(
    (acc, entry) => {
      acc[entry.status] += 1;
      return acc;
    },
    { done: 0, due: 0, overdue: 0, upcoming: 0 },
  );

  // "Completed" for the progress ring means every dose that is already due.
  const elapsed = entries.filter((e) => e.status !== STATUS.UPCOMING).length;
  const nextUp = entries.find((e) => e.status === STATUS.OVERDUE)
    || entries.find((e) => e.status === STATUS.DUE)
    || entries.find((e) => e.status === STATUS.UPCOMING);

  return {
    entries,
    counts,
    hasDob: valid,
    dob: valid ? birth : null,
    total: entries.length,
    progress: elapsed ? Math.round((counts.done / elapsed) * 100) : 0,
    coverage: entries.length ? Math.round((counts.done / entries.length) * 100) : 0,
    nextUp,
    needsAttention: counts.overdue + counts.due,
  };
}

export const STATUS_META = {
  [STATUS.DONE]: { label: 'Completed', tone: 'good', icon: 'CheckCircle2' },
  [STATUS.DUE]: { label: 'Due now', tone: 'warn', icon: 'Bell' },
  [STATUS.OVERDUE]: { label: 'Overdue', tone: 'danger', icon: 'AlarmClock' },
  [STATUS.UPCOMING]: { label: 'Upcoming', tone: 'muted', icon: 'CalendarClock' },
};

/** Export the outstanding visits as an .ics the parent can import. */
export function planToICS(plan, { childName = 'Child', clinicName = 'Clinic', location = '', reminderDays = 3 } = {}) {
  const pending = plan.entries.filter(
    (entry) => entry.status !== STATUS.DONE && entry.dueDate && entry.dueDate >= addDays(new Date(), -1),
  );

  const events = pending.map((entry) => ({
    title: `${childName}: ${entry.label} vaccination`,
    description: [
      `Recommended doses: ${(entry.vaccines || []).join(', ')}`,
      entry.importance ? `\nWhy it matters: ${entry.importance}` : '',
      `\nBooked through ${clinicName}.`,
    ].join(''),
    location,
    start: entry.dueDate,
    allDay: true,
    alarmMinutesBefore: reminderDays * 24 * 60,
  }));

  return { ics: buildICS(events, `${childName} — immunisation plan`), count: events.length };
}

/** WhatsApp-friendly plain text summary. */
export function planToText(plan, { childName = 'Child', dobLabel = '' } = {}) {
  const lines = [`Immunisation plan for ${childName}${dobLabel ? ` (DOB ${dobLabel})` : ''}:`];
  for (const entry of plan.entries) {
    if (entry.status === STATUS.DONE) continue;
    const when = entry.dueDate ? toISODate(entry.dueDate) : entry.label;
    const flag = entry.status === STATUS.OVERDUE ? ' [OVERDUE]' : entry.status === STATUS.DUE ? ' [DUE NOW]' : '';
    lines.push(`• ${entry.label} — ${when}${flag}: ${(entry.vaccines || []).join(', ')}`);
  }
  if (lines.length === 1) lines.push('All scheduled doses are marked complete. 🎉');
  return lines.join('\n');
}
