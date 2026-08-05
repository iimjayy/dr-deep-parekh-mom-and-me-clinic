/**
 * Privacy-first event collector.
 *
 * Small practices rarely have an analytics stack, but they *do* want to know
 * which CTA parents actually press. This buffers events in localStorage and
 * optionally forwards them to whatever the tenant configures:
 *
 *   - `provider: 'local'`     → device only (default; nothing leaves the browser)
 *   - `provider: 'endpoint'`  → POST batches to config.integrations.analytics.url
 *   - `provider: 'gtag'`      → forward to an existing GA/GTM install
 *
 * No cookies, no third-party scripts, no personal data — only event names,
 * coarse metadata and timestamps. Booking form values are never recorded.
 */

const KEY = 'practice-os:events';
const SESSION_KEY = 'practice-os:session';
const MAX_EVENTS = 400;

let settings = { provider: 'local', url: null, debug: false, enabled: true };
let queue = [];
let flushTimer = null;

const now = () => Date.now();

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return 's_ephemeral';
  }
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function persist(events) {
  try {
    localStorage.setItem(KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    /* storage full or blocked — analytics is strictly best-effort */
  }
}

export function initAnalytics(options = {}) {
  settings = { ...settings, ...options };
  if (typeof window === 'undefined' || !settings.enabled) return;

  track('session_start', {
    ref: document.referrer ? new URL(document.referrer).hostname : 'direct',
    path: location.pathname + location.search,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    lang: navigator.language,
  });

  // Flush pending batches when the tab goes away.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
}

export function track(event, props = {}) {
  if (typeof window === 'undefined' || !settings.enabled) return;

  const payload = {
    e: event,
    t: now(),
    s: sessionId(),
    ...props,
  };

  const all = readAll();
  all.push(payload);
  persist(all);

  if (settings.debug) console.info('[analytics]', event, props);

  if (settings.provider === 'gtag' && typeof window.gtag === 'function') {
    window.gtag('event', event, props);
  }

  if (settings.provider === 'endpoint' && settings.url) {
    queue.push(payload);
    if (!flushTimer) flushTimer = setTimeout(() => flush(), 4000);
  }

  window.dispatchEvent(new CustomEvent('practice-os:event', { detail: payload }));
}

function flush(useBeacon = false) {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!queue.length || !settings.url) return;

  const body = JSON.stringify({ events: queue });
  queue = [];

  try {
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(settings.url, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(settings.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* offline — events remain in localStorage for the next session */
  }
}

/* ------------------------------------------------------------------ */
/* Local reporting — powers the Studio "Insights" panel                */
/* ------------------------------------------------------------------ */

export function getEvents() {
  return readAll();
}

export function clearEvents() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function summarize(events = readAll()) {
  const byEvent = {};
  const sessions = new Set();
  let firstSeen = null;

  for (const item of events) {
    byEvent[item.e] = (byEvent[item.e] || 0) + 1;
    sessions.add(item.s);
    if (firstSeen == null || item.t < firstSeen) firstSeen = item.t;
  }

  const ranked = Object.entries(byEvent).sort((a, b) => b[1] - a[1]);
  const bookingStarts = byEvent.booking_open || 0;
  const bookingSends = byEvent.booking_submit || 0;

  return {
    total: events.length,
    sessions: sessions.size,
    since: firstSeen,
    ranked,
    conversion: bookingStarts ? Math.round((bookingSends / bookingStarts) * 100) : 0,
    bookingStarts,
    bookingSends,
  };
}
