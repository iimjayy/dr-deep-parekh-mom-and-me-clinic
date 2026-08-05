/**
 * Runtime colour engine.
 *
 * Tenants declare one or two brand hex values; everything else (the full 50→950
 * ramp, tinted surfaces, ring colours, dark-mode inversions) is derived here in
 * OKLCH so that any brand colour produces a perceptually even, accessible scale.
 *
 * No dependencies — this is intentionally portable.
 */

/* ------------------------------------------------------------------ */
/* sRGB <-> OKLCH                                                      */
/* ------------------------------------------------------------------ */

const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export function hexToRgb(hex) {
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

/** Convert a hex string to OKLCH components: { l: 0..1, c: 0..~0.4, h: 0..360 } */
export function hexToOklch(hex) {
  const { r, g, b } = hexToRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

export const oklch = (l, c, h, alpha) =>
  alpha == null
    ? `oklch(${(clamp(l) * 100).toFixed(2)}% ${Math.max(0, c).toFixed(4)} ${h.toFixed(2)})`
    : `oklch(${(clamp(l) * 100).toFixed(2)}% ${Math.max(0, c).toFixed(4)} ${h.toFixed(2)} / ${alpha})`;

/* ------------------------------------------------------------------ */
/* Scale generation                                                    */
/* ------------------------------------------------------------------ */

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** Lightness + chroma envelope per step — tuned to feel like a hand-built ramp. */
const RAMP = [
  { step: 50, l: 0.977, cMul: 0.16 },
  { step: 100, l: 0.949, cMul: 0.3 },
  { step: 200, l: 0.9, cMul: 0.52 },
  { step: 300, l: 0.837, cMul: 0.72 },
  { step: 400, l: 0.755, cMul: 0.9 },
  { step: 500, l: 0.673, cMul: 1.0 },
  { step: 600, l: 0.596, cMul: 1.0 },
  { step: 700, l: 0.512, cMul: 0.92 },
  { step: 800, l: 0.436, cMul: 0.8 },
  { step: 900, l: 0.376, cMul: 0.68 },
  { step: 950, l: 0.264, cMul: 0.55 },
];

/**
 * Build a 50→950 ramp from a single seed colour.
 * The seed's own chroma sets the ceiling so pastel brands stay pastel and
 * saturated brands stay punchy.
 */
export function buildScale(seedHex) {
  const { c, h } = hexToOklch(seedHex);
  // Keep chroma in a sane band: too low reads grey, too high clips on sRGB.
  const peak = clamp(c * 1.06, 0.055, 0.19);
  const out = {};
  for (const stop of RAMP) out[stop.step] = oklch(stop.l, peak * stop.cMul, h);
  return out;
}

/** A very low-chroma neutral ramp, subtly tinted toward the brand hue. */
export function buildNeutralScale(seedHex, tint = 0.012) {
  const { h } = hexToOklch(seedHex);
  const neutralRamp = [
    { step: 50, l: 0.985 },
    { step: 100, l: 0.968 },
    { step: 200, l: 0.929 },
    { step: 300, l: 0.869 },
    { step: 400, l: 0.71 },
    { step: 500, l: 0.556 },
    { step: 600, l: 0.44 },
    { step: 700, l: 0.365 },
    { step: 800, l: 0.28 },
    { step: 900, l: 0.208 },
    { step: 950, l: 0.145 },
  ];
  const out = {};
  for (const stop of neutralRamp) out[stop.step] = oklch(stop.l, tint, h);
  return out;
}

/** Readable foreground (near-black or near-white) for a given background step. */
export function readableOn(seedHex, step) {
  const stop = RAMP.find((s) => s.step === step);
  const { h } = hexToOklch(seedHex);
  if (!stop) return oklch(0.16, 0.01, h);
  return stop.l > 0.72 ? oklch(0.2, 0.03, h) : oklch(0.99, 0.005, h);
}

export default { buildScale, buildNeutralScale, hexToOklch, readableOn, oklch, STEPS };
