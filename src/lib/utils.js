/** Small, dependency-free helpers shared across the app. */

/** Conditional className joiner. */
export const cn = (...parts) => parts.flat(Infinity).filter(Boolean).join(' ');

export const noop = () => {};

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export function formatMoney(amount, currency = 'INR', locale = 'en-IN') {
  if (amount == null || amount === '') return '';
  if (typeof amount === 'string' && /[^\d.]/.test(amount)) return amount; // already formatted
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `${currency} ${amount}`;
  }
}

export function formatNumber(n, locale = 'en-IN') {
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch {
    return String(n);
  }
}

/** "25000+" / "4.9 ★" / "18 Yrs" → { value: 25000, prefix: '', suffix: '+' } for count-up. */
export function splitNumeric(raw) {
  const str = String(raw ?? '');
  const match = str.match(/-?[\d,]*\.?\d+/);
  if (!match) return { value: null, prefix: str, suffix: '' };
  const numeric = Number(match[0].replace(/,/g, ''));
  return {
    value: Number.isFinite(numeric) ? numeric : null,
    prefix: str.slice(0, match.index),
    suffix: str.slice(match.index + match[0].length),
    decimals: (match[0].split('.')[1] || '').length,
  };
}

export const titleCase = (s = '') =>
  s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());

export const slugify = (s = '') =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ------------------------------------------------------------------ */
/* Dates                                                               */
/* ------------------------------------------------------------------ */

export const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const DAY_LABELS = {
  sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday',
  thu: 'Thursday', fri: 'Friday', sat: 'Saturday',
};

/** "18:30" → 1110 minutes past midnight. */
export const toMinutes = (hhmm) => {
  const [h, m] = String(hhmm).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

/** 1110 → "6:30 PM" */
export function formatTime(minutes) {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export const formatRange = (slot) => `${formatTime(toMinutes(slot.open))} – ${formatTime(toMinutes(slot.close))}`;

export function addMonths(date, months) {
  const d = new Date(date.getTime());
  const targetDay = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < targetDay) d.setDate(0); // clamp Jan-31 + 1mo → Feb-28
  return d;
}

export const addDays = (date, days) => new Date(date.getTime() + days * 86400000);

export function formatDate(date, opts = { day: 'numeric', month: 'short', year: 'numeric' }, locale = 'en-IN') {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, opts).format(date);
  } catch {
    return date.toDateString();
  }
}

export const toISODate = (date) => {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 10);
};

/** Human age from a date of birth, in months and a friendly label. */
export function ageFromDob(dob) {
  if (!dob) return null;
  const birth = dob instanceof Date ? dob : new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  if (birth > now) return null;

  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  const days = Math.floor((now - birth) / 86400000);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  let label;
  if (days < 31) label = `${days} day${days === 1 ? '' : 's'} old`;
  else if (months < 24) label = `${months} month${months === 1 ? '' : 's'} old`;
  else if (remMonths === 0) label = `${years} year${years === 1 ? '' : 's'} old`;
  else label = `${years}y ${remMonths}m old`;

  return { days, months, years, remMonths, label, date: birth };
}

/* ------------------------------------------------------------------ */
/* Opening hours                                                       */
/* ------------------------------------------------------------------ */

/**
 * Resolve live open/closed state from a config `hours` map.
 * Returns { isOpen, label, detail, next, minutesUntil }.
 */
export function openState(hours, now = new Date()) {
  if (!hours) return { isOpen: false, label: 'Hours unavailable', detail: '', next: null, minutesUntil: null };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todayKey = DAY_KEYS[now.getDay()];
  const todaySlots = hours[todayKey] || [];

  for (const slot of todaySlots) {
    const open = toMinutes(slot.open);
    const close = toMinutes(slot.close);
    if (nowMinutes >= open && nowMinutes < close) {
      const until = close - nowMinutes;
      return {
        isOpen: true,
        label: 'Open now',
        detail: until <= 60 ? `Closes in ${until} min` : `Open until ${formatTime(close)}`,
        next: null,
        minutesUntil: until,
        closesAt: close,
      };
    }
  }

  // Find the next opening within the coming week.
  for (let offset = 0; offset < 8; offset += 1) {
    const key = DAY_KEYS[(now.getDay() + offset) % 7];
    for (const slot of hours[key] || []) {
      const open = toMinutes(slot.open);
      if (offset === 0 && open <= nowMinutes) continue;
      const minutesUntil = offset * 1440 + open - nowMinutes;
      const when =
        offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAY_LABELS[key];
      return {
        isOpen: false,
        label: 'Closed',
        detail: `Opens ${when} at ${formatTime(open)}`,
        next: { day: key, open, offset },
        minutesUntil,
      };
    }
  }

  return { isOpen: false, label: 'Closed', detail: 'Contact us for availability', next: null, minutesUntil: null };
}

/** Flatten an hours map into display rows, merging identical consecutive days. */
export function hoursRows(hours) {
  const order = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const sig = (key) =>
    (hours?.[key] || []).map((s) => `${s.open}-${s.close}`).join(',') || 'closed';

  const rows = [];
  for (const key of order) {
    const signature = sig(key);
    const last = rows[rows.length - 1];
    if (last && last.signature === signature) last.days.push(key);
    else rows.push({ signature, days: [key], slots: hours?.[key] || [] });
  }
  return rows.map((row) => ({
    ...row,
    label:
      row.days.length === 1
        ? DAY_LABELS[row.days[0]]
        : `${DAY_LABELS[row.days[0]].slice(0, 3)} – ${DAY_LABELS[row.days[row.days.length - 1]].slice(0, 3)}`,
    text: row.slots.length ? row.slots.map(formatRange).join('  •  ') : 'Closed',
    closed: row.slots.length === 0,
  }));
}

/* ------------------------------------------------------------------ */
/* Outbound links                                                      */
/* ------------------------------------------------------------------ */

export function whatsappUrl(number, message) {
  const clean = String(number || '').replace(/\D/g, '');
  return `https://wa.me/${clean}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export const telUrl = (number) => `tel:${String(number || '').replace(/[^\d+]/g, '')}`;

export function mailtoUrl(email, subject, body) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}${params.length ? `?${params.join('&')}` : ''}`;
}

export function directionsUrl(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/* ------------------------------------------------------------------ */
/* Calendar export (.ics)                                              */
/* ------------------------------------------------------------------ */

const icsStamp = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
const icsEscape = (s = '') => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');

/**
 * Build an .ics payload. Events: [{ title, description, location, start: Date,
 * durationMinutes, allDay, alarmMinutesBefore }]
 */
export function buildICS(events, calendarName = 'Appointments') {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Practice OS//Appointments//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${icsEscape(calendarName)}`,
  ];

  events.forEach((event, index) => {
    const start = event.start instanceof Date ? event.start : new Date(event.start);
    if (Number.isNaN(start.getTime())) return;
    const end = new Date(start.getTime() + (event.durationMinutes ?? 30) * 60000);

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${Date.now()}-${index}@practice-os`);
    lines.push(`DTSTAMP:${icsStamp(new Date())}`);
    if (event.allDay) {
      const ymd = (d) => toISODate(d).replace(/-/g, '');
      lines.push(`DTSTART;VALUE=DATE:${ymd(start)}`);
      lines.push(`DTEND;VALUE=DATE:${ymd(addDays(start, 1))}`);
    } else {
      lines.push(`DTSTART:${icsStamp(start)}`);
      lines.push(`DTEND:${icsStamp(end)}`);
    }
    lines.push(`SUMMARY:${icsEscape(event.title)}`);
    if (event.description) lines.push(`DESCRIPTION:${icsEscape(event.description)}`);
    if (event.location) lines.push(`LOCATION:${icsEscape(event.location)}`);
    if (event.alarmMinutesBefore) {
      lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', `TRIGGER:-PT${event.alarmMinutesBefore}M`,
        `DESCRIPTION:${icsEscape(event.title)}`, 'END:VALARM');
    }
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadFile(filename, content, type = 'text/calendar;charset=utf-8') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; fall back to a hidden textarea.
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      el.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export async function shareOrCopy({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }
  return (await copyText(url)) ? 'copied' : 'failed';
}

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const debounce = (fn, wait = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
