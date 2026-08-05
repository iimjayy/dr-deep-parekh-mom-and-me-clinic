/**
 * WHO Child Growth Standards — z-score and percentile engine (0–60 months).
 *
 * Method: the WHO LMS transform. For a measurement y at a given age/sex,
 *
 *     z = ((y / M)^L − 1) / (L · S)        when L ≠ 0
 *     z = ln(y / M) / S                    when L = 0
 *
 * The reference tables below are condensed to anchor ages and interpolated
 * linearly in between, which keeps the bundle small while staying within a few
 * hundredths of a z-score of the full monthly tables. This is a *screening*
 * aid — the UI states plainly that it does not replace a clinical assessment.
 *
 * Source: WHO Child Growth Standards (weight-for-age, length/height-for-age,
 * BMI-for-age), 2006.
 */

/* age in months → [L, M, S] */
const WFA = {
  boy: [
    [0, 0.3487, 3.3464, 0.14602], [1, 0.2297, 4.4709, 0.13395], [2, 0.1970, 5.5675, 0.12385],
    [3, 0.1738, 6.3762, 0.11727], [4, 0.1553, 7.0023, 0.11316], [5, 0.1395, 7.5105, 0.11080],
    [6, 0.1257, 7.9340, 0.10958], [9, 0.0917, 8.9014, 0.10885], [12, 0.0666, 9.6479, 0.11080],
    [15, 0.0465, 10.3050, 0.11361], [18, 0.0299, 10.9385, 0.11678], [21, 0.0159, 11.5432, 0.12007],
    [24, 0.0037, 12.1515, 0.12336], [30, -0.0182, 13.3037, 0.12988], [36, -0.0369, 14.3384, 0.13594],
    [42, -0.0530, 15.3216, 0.14181], [48, -0.0670, 16.3005, 0.14760], [54, -0.0791, 17.3140, 0.15335],
    [60, -0.0896, 18.3366, 0.15900],
  ],
  girl: [
    [0, 0.3809, 3.2322, 0.14171], [1, 0.1714, 4.1873, 0.13724], [2, 0.0962, 5.1282, 0.13000],
    [3, 0.0402, 5.8458, 0.12619], [4, -0.0050, 6.4237, 0.12402], [5, -0.0430, 6.8985, 0.12274],
    [6, -0.0756, 7.2970, 0.12204], [9, -0.1507, 8.2254, 0.12200], [12, -0.1972, 8.9481, 0.12327],
    [15, -0.2291, 9.5951, 0.12503], [18, -0.2521, 10.2315, 0.12703], [21, -0.2693, 10.8534, 0.12915],
    [24, -0.2826, 11.4775, 0.13130], [30, -0.3017, 12.6989, 0.13561], [36, -0.3141, 13.8506, 0.13972],
    [42, -0.3224, 14.9382, 0.14367], [48, -0.3277, 16.0263, 0.14762], [54, -0.3306, 17.1517, 0.15170],
    [60, -0.3315, 18.2400, 0.15580],
  ],
};

const LFA = {
  boy: [
    [0, 1, 49.8842, 0.03795], [1, 1, 54.7244, 0.03557], [2, 1, 58.4249, 0.03424],
    [3, 1, 61.4292, 0.03328], [4, 1, 63.8860, 0.03257], [5, 1, 65.9026, 0.03204],
    [6, 1, 67.6236, 0.03165], [9, 1, 72.0002, 0.03093], [12, 1, 75.7488, 0.03068],
    [15, 1, 79.1458, 0.03068], [18, 1, 82.2587, 0.03082], [21, 1, 85.1348, 0.03105],
    [24, 1, 87.1161, 0.03408], [30, 1, 91.9327, 0.03476], [36, 1, 96.0835, 0.03544],
    [42, 1, 99.8938, 0.03613], [48, 1, 103.3273, 0.03684], [54, 1, 106.7025, 0.03756],
    [60, 1, 110.0000, 0.03826],
  ],
  girl: [
    [0, 1, 49.1477, 0.03790], [1, 1, 53.6872, 0.03640], [2, 1, 57.0673, 0.03568],
    [3, 1, 59.8029, 0.03518], [4, 1, 62.0899, 0.03486], [5, 1, 64.0301, 0.03463],
    [6, 1, 65.7311, 0.03448], [9, 1, 70.1435, 0.03432], [12, 1, 74.0150, 0.03462],
    [15, 1, 77.5000, 0.03502], [18, 1, 80.7079, 0.03547], [21, 1, 83.7100, 0.03589],
    [24, 1, 85.7153, 0.03764], [30, 1, 90.7000, 0.03855], [36, 1, 95.0515, 0.03941],
    [42, 1, 98.9200, 0.04022], [48, 1, 102.7312, 0.04099], [54, 1, 106.2000, 0.04173],
    [60, 1, 109.4000, 0.04243],
  ],
};

const BFA = {
  boy: [
    [0, -0.3053, 13.4069, 0.09560], [3, -0.4551, 16.8987, 0.08488], [6, -0.6010, 17.2528, 0.08326],
    [9, -0.7226, 16.8896, 0.08321], [12, -0.8171, 16.5714, 0.08359], [18, -0.9539, 16.0490, 0.08511],
    [24, -1.0464, 16.3195, 0.08429], [36, -1.1735, 15.7629, 0.08551], [48, -1.2481, 15.4364, 0.08813],
    [60, -1.2870, 15.2641, 0.09150],
  ],
  girl: [
    [0, -0.0631, 13.3363, 0.09272], [3, -0.2422, 16.4499, 0.08840], [6, -0.3646, 16.8834, 0.08782],
    [9, -0.4570, 16.6320, 0.08858], [12, -0.5300, 16.3646, 0.08948], [18, -0.6395, 15.8916, 0.09141],
    [24, -0.7183, 16.1130, 0.09164], [36, -0.8339, 15.5424, 0.09515], [48, -0.9058, 15.2620, 0.09933],
    [60, -0.9532, 15.1755, 0.10345],
  ],
};

const TABLES = { weight: WFA, height: LFA, bmi: BFA };

/* ------------------------------------------------------------------ */
/* Maths                                                               */
/* ------------------------------------------------------------------ */

function interpolate(rows, ageMonths) {
  const age = Math.max(rows[0][0], Math.min(rows[rows.length - 1][0], ageMonths));
  for (let i = 0; i < rows.length - 1; i += 1) {
    const [a0, l0, m0, s0] = rows[i];
    const [a1, l1, m1, s1] = rows[i + 1];
    if (age >= a0 && age <= a1) {
      const ratio = a1 === a0 ? 0 : (age - a0) / (a1 - a0);
      return {
        L: l0 + (l1 - l0) * ratio,
        M: m0 + (m1 - m0) * ratio,
        S: s0 + (s1 - s0) * ratio,
      };
    }
  }
  const [, L, M, S] = rows[rows.length - 1];
  return { L, M, S };
}

/** Abramowitz & Stegun 7.1.26 — accurate to ~1.5e-7, plenty for percentiles. */
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

export const zToPercentile = (z) => 50 * (1 + erf(z / Math.SQRT2));

export function zScore(metric, sex, ageMonths, value) {
  const table = TABLES[metric]?.[sex === 'girl' ? 'girl' : 'boy'];
  if (!table || !Number.isFinite(value) || value <= 0) return null;
  const { L, M, S } = interpolate(table, ageMonths);
  const z = L === 0 ? Math.log(value / M) / S : (Math.pow(value / M, L) - 1) / (L * S);
  return Number.isFinite(z) ? z : null;
}

/** Value at a given z — used to draw the reference curves on the chart. */
export function valueAtZ(metric, sex, ageMonths, z) {
  const table = TABLES[metric]?.[sex === 'girl' ? 'girl' : 'boy'];
  if (!table) return null;
  const { L, M, S } = interpolate(table, ageMonths);
  return L === 0 ? M * Math.exp(S * z) : M * Math.pow(1 + L * S * z, 1 / L);
}

export const medianAt = (metric, sex, ageMonths) => valueAtZ(metric, sex, ageMonths, 0);

/* ------------------------------------------------------------------ */
/* Interpretation                                                      */
/* ------------------------------------------------------------------ */

const BANDS = [
  { max: -3, key: 'severe-low', tone: 'danger' },
  { max: -2, key: 'low', tone: 'warn' },
  { max: -1, key: 'low-normal', tone: 'ok' },
  { max: 1, key: 'normal', tone: 'good' },
  { max: 2, key: 'high-normal', tone: 'ok' },
  { max: 3, key: 'high', tone: 'warn' },
  { max: Infinity, key: 'severe-high', tone: 'danger' },
];

const LABELS = {
  weight: {
    'severe-low': 'Severely underweight for age',
    low: 'Underweight for age',
    'low-normal': 'Lower end of the healthy range',
    normal: 'Healthy weight for age',
    'high-normal': 'Upper end of the healthy range',
    high: 'Above the expected range',
    'severe-high': 'Well above the expected range',
  },
  height: {
    'severe-low': 'Severe stunting indicated',
    low: 'Shorter than expected for age',
    'low-normal': 'Lower end of the healthy range',
    normal: 'Healthy height for age',
    'high-normal': 'Upper end of the healthy range',
    high: 'Taller than expected for age',
    'severe-high': 'Well above the expected range',
  },
  bmi: {
    'severe-low': 'Severe thinness indicated',
    low: 'Thinness indicated',
    'low-normal': 'Lower end of the healthy range',
    normal: 'Healthy body proportion',
    'high-normal': 'Upper end of the healthy range',
    high: 'Overweight range',
    'severe-high': 'Obesity range',
  },
};

const ADVICE = {
  'severe-low': 'This reading is well outside the WHO reference range. Please book a clinical assessment soon — early nutritional support makes a large difference.',
  low: 'This reading sits below the WHO reference band. A short consultation can rule out feeding, absorption or infection causes and set a catch-up plan.',
  'low-normal': 'Within the healthy band, on the lower side. Worth tracking at the next routine visit.',
  normal: 'Comfortably within the WHO healthy band. Keep up routine check-ups and the current feeding pattern.',
  'high-normal': 'Within the healthy band, on the higher side. Routine tracking is enough.',
  high: 'Above the WHO reference band. A consultation can review diet, activity and any underlying causes.',
  'severe-high': 'Well above the WHO reference band. Please book an assessment so we can review this properly.',
};

export function interpret(metric, z) {
  if (z == null) return null;
  const band = BANDS.find((b) => z < b.max) || BANDS[BANDS.length - 1];
  return {
    key: band.key,
    tone: band.tone,
    label: LABELS[metric]?.[band.key] || band.key,
    advice: ADVICE[band.key],
  };
}

export const ordinal = (n) => {
  const rounded = Math.round(n);
  const suffix = ['th', 'st', 'nd', 'rd'][((rounded % 100) - 20) % 10] || ['th', 'st', 'nd', 'rd'][rounded % 100] || 'th';
  return `${rounded}${suffix}`;
};

/**
 * Full assessment for one child.
 * @returns { ageMonths, results: { weight|height|bmi: {...} }, bmi, headline }
 */
export function assess({ sex = 'boy', ageMonths, weightKg, heightCm }) {
  if (!Number.isFinite(ageMonths) || ageMonths < 0) return null;
  const results = {};

  if (Number.isFinite(weightKg) && weightKg > 0) {
    const z = zScore('weight', sex, ageMonths, weightKg);
    results.weight = {
      z, percentile: z == null ? null : zToPercentile(z),
      median: medianAt('weight', sex, ageMonths),
      ...(interpret('weight', z) || {}),
    };
  }

  if (Number.isFinite(heightCm) && heightCm > 0) {
    const z = zScore('height', sex, ageMonths, heightCm);
    results.height = {
      z, percentile: z == null ? null : zToPercentile(z),
      median: medianAt('height', sex, ageMonths),
      ...(interpret('height', z) || {}),
    };
  }

  let bmi = null;
  if (Number.isFinite(weightKg) && Number.isFinite(heightCm) && heightCm > 0) {
    bmi = weightKg / Math.pow(heightCm / 100, 2);
    const z = zScore('bmi', sex, ageMonths, bmi);
    results.bmi = {
      z, percentile: z == null ? null : zToPercentile(z),
      median: medianAt('bmi', sex, ageMonths),
      value: bmi,
      ...(interpret('bmi', z) || {}),
    };
  }

  // The most clinically-relevant flag wins the headline.
  const priority = ['weight', 'height', 'bmi'];
  const concerning = priority
    .map((k) => results[k])
    .find((r) => r && (r.tone === 'danger' || r.tone === 'warn'));

  return {
    ageMonths,
    sex,
    bmi,
    results,
    headline: concerning || results.weight || results.height || results.bmi || null,
    outOfRange: ageMonths > 60,
  };
}

export const MAX_AGE_MONTHS = 60;
