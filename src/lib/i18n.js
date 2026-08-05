/**
 * Minimal localisation layer.
 *
 * Two mechanisms, both optional — a tenant that ships English only works
 * unchanged:
 *
 *   1. UI strings   → config.i18n.strings[locale][key]
 *   2. Content      → any config value may be `{ en: '…', hi: '…' }` instead of
 *                     a plain string; `localize()` resolves it.
 *
 * Missing translations fall back to the default locale, then to the key itself,
 * so a half-translated config degrades gracefully instead of rendering blanks.
 */

export const LOCALE_META = {
  en: { label: 'English', native: 'English', dir: 'ltr', intl: 'en-IN' },
  hi: { label: 'Hindi', native: 'हिन्दी', dir: 'ltr', intl: 'hi-IN' },
  mr: { label: 'Marathi', native: 'मराठी', dir: 'ltr', intl: 'mr-IN' },
  gu: { label: 'Gujarati', native: 'ગુજરાતી', dir: 'ltr', intl: 'gu-IN' },
  ta: { label: 'Tamil', native: 'தமிழ்', dir: 'ltr', intl: 'ta-IN' },
  bn: { label: 'Bengali', native: 'বাংলা', dir: 'ltr', intl: 'bn-IN' },
  es: { label: 'Spanish', native: 'Español', dir: 'ltr', intl: 'es-ES' },
  ar: { label: 'Arabic', native: 'العربية', dir: 'rtl', intl: 'ar' },
};

/** True when a value is a `{ en, hi, … }` translation bag rather than content. */
export function isLocalizedBag(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((k) => k in LOCALE_META);
}

/** Resolve a possibly-localized value to a string for the active locale. */
export function localize(value, locale = 'en', fallbackLocale = 'en') {
  if (!isLocalizedBag(value)) return value;
  return value[locale] ?? value[fallbackLocale] ?? Object.values(value)[0] ?? '';
}

/** Deeply resolve every localized bag inside an object/array tree. */
export function localizeDeep(node, locale = 'en', fallbackLocale = 'en') {
  if (Array.isArray(node)) return node.map((item) => localizeDeep(item, locale, fallbackLocale));
  if (isLocalizedBag(node)) return localize(node, locale, fallbackLocale);
  if (node && typeof node === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(node)) out[key] = localizeDeep(value, locale, fallbackLocale);
    return out;
  }
  return node;
}

/**
 * Build a translator bound to a locale.
 * `t('nav.book', 'Book Appointment')` — the second argument is the English
 * default, so components stay readable even with no strings table at all.
 */
export function makeTranslator(strings = {}, locale = 'en', fallbackLocale = 'en') {
  const table = strings[locale] || {};
  const fallbackTable = strings[fallbackLocale] || {};

  return function t(key, defaultValue, vars) {
    let out = table[key] ?? fallbackTable[key] ?? defaultValue ?? key;
    if (vars && typeof out === 'string') {
      out = out.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
    }
    return out;
  };
}

export const localeDir = (locale) => LOCALE_META[locale]?.dir || 'ltr';
export const intlTag = (locale) => LOCALE_META[locale]?.intl || 'en-IN';
