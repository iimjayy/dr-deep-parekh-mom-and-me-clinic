/**
 * Tenant resolution.
 *
 * Priority, highest first:
 *   1. `?tenant=<id>`                       — shareable preview links
 *   2. localStorage `practice-os:tenant`    — sticky choice from Studio
 *   3. `VITE_TENANT` build variable         — per-deployment default
 *   4. DEFAULT_TENANT below
 *
 * Any config is deep-merged over DEFAULTS, so a new tenant only needs to
 * declare what actually differs.
 */

import drDeepParekh from './tenants/dr-deep-parekh-mom-and-me';
import drMete from './tenants/dr-mete-pediatrics';
import auroraDental from './tenants/aurora-dental';

export const TENANTS = {
  'dr-deep-parekh-mom-and-me': drDeepParekh,
  'dr-mete-pediatrics': drMete,
  'aurora-dental': auroraDental,
};

export const DEFAULT_TENANT = 'dr-deep-parekh-mom-and-me';
const TENANT_KEY = 'practice-os:tenant';
const OVERRIDE_KEY = 'practice-os:config-override';

/* ------------------------------------------------------------------ */
/* Defaults                                                            */
/* ------------------------------------------------------------------ */

export const DEFAULTS = {
  vertical: 'generic',
  brand: {
    name: 'Practice',
    nameAccent: '',
    logo: { type: 'icon', icon: 'HeartPulse' },
    colors: { primary: '#0e8f6f', accent: '#0b7fc4', highlight: '#f0a325', neutralTint: 0.008 },
    fonts: { heading: 'Outfit', body: 'Plus Jakarta Sans' },
    radius: 'rounded',
    appearance: 'system',
  },
  meta: { title: '', description: '', keywords: [], ogImage: '', canonical: '' },
  business: {
    schemaType: 'LocalBusiness',
    professionalSchemaType: 'Person',
    serviceSchemaType: 'Service',
    areaServed: [],
    contact: { address: {}, travel: [] },
    hours: {},
    pricing: { currency: 'INR', methods: [] },
    emergency: { enabled: false, signs: [] },
    social: {},
  },
  sections: [],
  content: {
    hero: { badges: [], highlights: [] },
    logoStrip: { items: [] },
    stats: [],
    services: [],
    process: { steps: [] },
    pricing: { plans: [] },
    beforeAfter: { cases: [] },
    gallery: [],
    reviews: [],
    resources: { items: [] },
    faqs: [],
    cta: {},
  },
  tools: {
    hub: { items: [] },
    growth: { enabled: false },
    vaccines: { enabled: false, schedule: [], graceDays: 30 },
    milestones: { enabled: false, stages: [] },
    triage: { enabled: false, questions: [], outcomes: [] },
    dose: { enabled: false, drugs: [] },
    kit: { enabled: false, groups: [] },
  },
  booking: { channel: 'whatsapp', reasons: [], fields: {} },
  integrations: {
    analytics: { provider: 'local', enabled: true, debug: false },
    exitIntent: { enabled: false },
    pwa: false,
  },
  legal: {},
  i18n: { default: 'en', available: ['en'], strings: {} },
};

/* ------------------------------------------------------------------ */
/* Merge                                                               */
/* ------------------------------------------------------------------ */

const isPlainObject = (value) =>
  value != null && typeof value === 'object' && !Array.isArray(value);

/** Arrays replace wholesale — a tenant listing 3 services means 3, not 3 + defaults. */
export function deepMerge(base, override) {
  if (!isPlainObject(base)) return override === undefined ? base : override;
  if (!isPlainObject(override)) return override === undefined ? base : override;

  const out = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isPlainObject(value) && isPlainObject(base[key]) ? deepMerge(base[key], value) : value;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */

export function resolveTenantId() {
  if (typeof window === 'undefined') return DEFAULT_TENANT;

  const fromQuery = new URLSearchParams(window.location.search).get('tenant');
  if (fromQuery && TENANTS[fromQuery]) {
    try {
      localStorage.setItem(TENANT_KEY, fromQuery);
    } catch {
      /* ignore */
    }
    return fromQuery;
  }

  return DEFAULT_TENANT;
}

export function setTenantId(id) {
  try {
    localStorage.setItem(TENANT_KEY, id);
  } catch {
    /* ignore */
  }
}

/** Studio writes a partial config here; it layers on top of the tenant file. */
export function readOverride() {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeOverride(patch) {
  try {
    if (patch == null) localStorage.removeItem(OVERRIDE_KEY);
    else localStorage.setItem(OVERRIDE_KEY, JSON.stringify(patch));
    return true;
  } catch {
    return false;
  }
}

export function getConfig(tenantId = resolveTenantId(), { withOverride = true } = {}) {
  const tenant = TENANTS[tenantId] || TENANTS[DEFAULT_TENANT];
  let config = deepMerge(DEFAULTS, tenant);
  if (withOverride) {
    const override = readOverride();
    if (override && (!override.__tenant || override.__tenant === tenantId)) {
      config = deepMerge(config, override);
    }
  }
  config.__tenantId = tenantId;
  return config;
}

export const tenantList = () =>
  Object.entries(TENANTS).map(([id, tenant]) => ({
    id,
    name: `${tenant.brand?.name || id} ${tenant.brand?.nameAccent || ''}`.trim(),
    vertical: tenant.vertical,
    primary: tenant.brand?.colors?.primary,
  }));
