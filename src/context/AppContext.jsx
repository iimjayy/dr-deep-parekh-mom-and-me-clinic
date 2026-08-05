import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getConfig, resolveTenantId, setTenantId as persistTenant, writeOverride } from '../config';
import { applyTheme, loadFonts, readAppearance, resolveMode, systemMode, writeAppearance } from '../lib/theme';
import { applySeo } from '../lib/seo';
import { initAnalytics, track } from '../lib/analytics';
import { makeTranslator, localize, localizeDeep, intlTag, LOCALE_META } from '../lib/i18n';
import { useRevealObserver } from '../lib/hooks';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};

/** Convenience selectors so components do not reach through the whole config. */
export const useConfig = () => useApp().config;
export const useT = () => useApp().t;

const LOCALE_KEY = 'practice-os:locale';

export function AppProvider({ children }) {
  /* -------------------------------------------------- tenant + config */
  const [tenantId, setTenantIdState] = useState(() => resolveTenantId());
  const [configVersion, setConfigVersion] = useState(0);
  const rawConfig = useMemo(() => getConfig(tenantId), [tenantId, configVersion]);

  /* -------------------------------------------------- locale
   * Resolved before `config`, because the localized config depends on it.
   * `rawConfig.i18n` is safe to read here — it is never localized itself. */
  const available = rawConfig.i18n?.available?.length ? rawConfig.i18n.available : ['en'];
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCALE_KEY);
      if (stored && available.includes(stored)) return stored;
    } catch {
      /* ignore */
    }
    return rawConfig.i18n?.default || 'en';
  });

  useEffect(() => {
    if (!available.includes(locale)) setLocaleState(rawConfig.i18n?.default || 'en');
  }, [available.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
    document.documentElement.dir = LOCALE_META[next]?.dir || 'ltr';
    track('locale_change', { locale: next });
  }, []);

  /**
   * Resolve every `{ en, hi, mr }` bag in the config down to plain strings for
   * the active locale, once, here. Components then never deal with translation
   * objects — they receive strings whatever the language is.
   *
   * `i18n` is deliberately excluded: its `strings` map is keyed by locale code,
   * so a deep localize would mistake it for a translation bag and collapse it.
   */
  const config = useMemo(() => {
    const fallback = rawConfig.i18n?.default || 'en';
    const { i18n, ...rest } = rawConfig;
    return { ...localizeDeep(rest, locale, fallback), i18n, __locale: locale };
  }, [rawConfig, locale]);

  /* -------------------------------------------------- appearance */
  const [appearance, setAppearanceState] = useState(
    () => readAppearance(rawConfig.brand?.appearance || 'system'),
  );

  // The OS preference is state, not a one-off read: while `appearance` is
  // 'system' a change to the OS theme has to re-render, or everything derived
  // from `mode` (toggle label, chart stroke colours) goes stale.
  const [systemPref, setSystemPref] = useState(() => systemMode());
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setSystemPref(event.matches ? 'dark' : 'light');
    setSystemPref(mql.matches ? 'dark' : 'light');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const mode = appearance === 'system' ? systemPref : resolveMode(appearance);

  useEffect(() => {
    applyTheme({ ...config.brand, id: config.__tenantId }, mode);
  }, [config, mode]);

  useEffect(() => {
    loadFonts(config.brand);
  }, [config.brand?.fonts?.heading, config.brand?.fonts?.body]);

  const setAppearance = useCallback((next) => {
    setAppearanceState(next);
    writeAppearance(next);
    track('appearance_change', { mode: next });
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearance(mode === 'dark' ? 'light' : 'dark');
  }, [setAppearance, mode]);

  const t = useMemo(
    () => makeTranslator(config.i18n?.strings, locale, config.i18n?.default || 'en'),
    [config.i18n, locale],
  );
  const L = useCallback((value) => localize(value, locale, config.i18n?.default || 'en'), [locale, config.i18n]);
  const intl = intlTag(locale);

  /* -------------------------------------------------- SEO + analytics */
  useEffect(() => {
    applySeo(config);
  }, [config]);

  const analyticsStarted = useRef(false);
  useEffect(() => {
    if (analyticsStarted.current) return;
    analyticsStarted.current = true;
    initAnalytics(config.integrations?.analytics);
  }, [config.integrations?.analytics]);

  useRevealObserver();

  /* -------------------------------------------------- modals */
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = useCallback((name, payload = null) => {
    setModal({ name, payload });
    track(`${name}_open`, payload?.source ? { source: payload.source } : {});
  }, []);

  const closeModal = useCallback(() => setModal({ name: null, payload: null }), []);

  const openBooking = useCallback(
    (payload = {}) => openModal('booking', payload),
    [openModal],
  );

  /* -------------------------------------------------- toasts */
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const toast = useCallback((message, options = {}) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, tone: options.tone || 'default', icon: options.icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), options.duration ?? 3600);
    return id;
  }, []);

  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((item) => item.id !== id)), []);

  /* -------------------------------------------------- tenant switching (Studio) */
  const switchTenant = useCallback((id) => {
    persistTenant(id);
    writeOverride(null); // a tenant switch discards live Studio edits
    setTenantIdState(id);
    setConfigVersion((v) => v + 1);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    track('tenant_switch', { tenant: id });
  }, []);

  const applyOverride = useCallback((patch) => {
    writeOverride(patch);
    setConfigVersion((v) => v + 1);
  }, []);

  const value = useMemo(
    () => ({
      config, tenantId, switchTenant, applyOverride, refreshConfig: () => setConfigVersion((v) => v + 1),
      appearance, mode, setAppearance, toggleAppearance,
      locale, setLocale, availableLocales: available, t, L, intl,
      modal, openModal, closeModal, openBooking,
      toasts, toast, dismissToast,
      track,
    }),
    [config, tenantId, switchTenant, applyOverride, appearance, mode, setAppearance, toggleAppearance,
      locale, setLocale, available, t, L, intl, modal, openModal, closeModal, openBooking,
      toasts, toast, dismissToast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
