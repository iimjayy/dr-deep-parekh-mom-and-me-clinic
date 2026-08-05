/**
 * Runtime theming.
 *
 * Every colour, font and radius used by the UI resolves through a CSS variable,
 * so a tenant switch (or a live edit in Studio) re-skins the entire site without
 * a rebuild. Tailwind utilities are wired to these vars in index.css via @theme.
 */

import { buildScale, buildNeutralScale, STEPS, hexToOklch, oklch } from './color';

const STORAGE_KEY = 'practice-os:appearance';

/* ------------------------------------------------------------------ */
/* Variable generation                                                 */
/* ------------------------------------------------------------------ */

export function themeVariables(brand, mode = 'light') {
  const primary = brand?.colors?.primary || '#0d9488';
  const accent = brand?.colors?.accent || '#0284c7';
  const highlight = brand?.colors?.highlight || '#f59e0b';
  const neutralSeed = brand?.colors?.neutral || primary;

  const b = buildScale(primary);
  const a = buildScale(accent);
  const hl = buildScale(highlight);
  const n = buildNeutralScale(neutralSeed, brand?.colors?.neutralTint ?? 0.008);

  const vars = {};
  for (const s of STEPS) {
    vars[`--brand-${s}`] = b[s];
    vars[`--accent-${s}`] = a[s];
    vars[`--highlight-${s}`] = hl[s];
    vars[`--neutral-${s}`] = n[s];
  }

  const { h } = hexToOklch(primary);
  const dark = mode === 'dark';

  /* Semantic surface + ink tokens flip wholesale between modes. */
  Object.assign(vars, dark
    ? {
        '--surface': oklch(0.168, 0.012, h),
        '--surface-2': oklch(0.213, 0.014, h),
        '--surface-3': oklch(0.262, 0.016, h),
        '--surface-inset': oklch(0.135, 0.012, h),
        '--surface-inverse': oklch(0.97, 0.006, h),
        '--ink': oklch(0.968, 0.006, h),
        '--ink-soft': oklch(0.83, 0.012, h),
        '--ink-muted': oklch(0.66, 0.014, h),
        '--ink-inverse': oklch(0.16, 0.014, h),
        '--line': oklch(0.32, 0.016, h),
        '--line-soft': oklch(0.26, 0.014, h),
        '--glass': 'oklch(0.168 0.012 ' + h.toFixed(2) + ' / 0.72)',
        '--shadow-color': '0deg 0% 0%',
        '--shadow-strength': '0.6',
        '--mesh-1': oklch(0.42, 0.11, h, 0.5),
        '--mesh-2': oklch(0.4, 0.1, (h + 45) % 360, 0.42),
        '--mesh-3': oklch(0.38, 0.09, (h + 300) % 360, 0.36),
      }
    : {
        '--surface': oklch(1, 0, h),
        '--surface-2': oklch(0.985, 0.005, h),
        '--surface-3': oklch(0.962, 0.009, h),
        '--surface-inset': oklch(0.975, 0.008, h),
        '--surface-inverse': oklch(0.19, 0.016, h),
        '--ink': oklch(0.212, 0.018, h),
        '--ink-soft': oklch(0.395, 0.016, h),
        '--ink-muted': oklch(0.552, 0.013, h),
        '--ink-inverse': oklch(0.99, 0.004, h),
        '--line': oklch(0.906, 0.008, h),
        '--line-soft': oklch(0.945, 0.006, h),
        '--glass': 'oklch(1 0 0 / 0.76)',
        '--shadow-color': `${h.toFixed(0)}deg 22% 34%`,
        '--shadow-strength': '0.1',
        '--mesh-1': oklch(0.88, 0.09, h, 0.55),
        '--mesh-2': oklch(0.9, 0.08, (h + 45) % 360, 0.45),
        '--mesh-3': oklch(0.92, 0.07, (h + 300) % 360, 0.4),
      });

  const radiusScale = {
    sharp: ['0.25rem', '0.375rem', '0.5rem', '0.625rem'],
    soft: ['0.5rem', '0.75rem', '1rem', '1.25rem'],
    rounded: ['0.75rem', '1rem', '1.5rem', '1.75rem'],
    pill: ['1rem', '1.5rem', '2rem', '2.5rem'],
  };
  const r = radiusScale[brand?.radius] || radiusScale.rounded;
  vars['--r-sm'] = r[0];
  vars['--r-md'] = r[1];
  vars['--r-lg'] = r[2];
  vars['--r-xl'] = r[3];

  const heading = brand?.fonts?.heading || 'Outfit';
  const body = brand?.fonts?.body || 'Plus Jakarta Sans';
  vars['--font-heading-stack'] = `'${heading}', 'Outfit', ui-sans-serif, system-ui, sans-serif`;
  vars['--font-body-stack'] = `'${body}', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif`;

  return vars;
}

/* ------------------------------------------------------------------ */
/* Application                                                         */
/* ------------------------------------------------------------------ */

export function applyTheme(brand, mode = 'light') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const vars = themeVariables(brand, mode);
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
  root.classList.toggle('dark', mode === 'dark');
  root.dataset.brand = brand?.id || 'default';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', mode === 'dark' ? '#151a19' : brand?.colors?.primary || '#0d9488');
}

/** Load webfonts declared by the tenant, once, without blocking first paint. */
export function loadFonts(brand) {
  if (typeof document === 'undefined') return;
  const families = [brand?.fonts?.heading, brand?.fonts?.body].filter(Boolean);
  if (!families.length) return;
  const id = 'tenant-fonts';
  const href =
    'https://fonts.googleapis.com/css2?' +
    [...new Set(families)]
      .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@300;400;500;600;700;800;900`)
      .join('&') +
    '&display=swap';

  let link = document.getElementById(id);
  if (link && link.href === href) return;
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = href;
}

/* ------------------------------------------------------------------ */
/* Appearance preference (light / dark / system)                       */
/* ------------------------------------------------------------------ */

export function systemMode() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function readAppearance(fallback = 'system') {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    return localStorage.getItem(STORAGE_KEY) || fallback;
  } catch {
    return fallback;
  }
}

export function writeAppearance(pref) {
  try {
    localStorage.setItem(STORAGE_KEY, pref);
  } catch {
    /* private mode — preference simply won't persist */
  }
}

export const resolveMode = (pref) => (pref === 'system' ? systemMode() : pref);
