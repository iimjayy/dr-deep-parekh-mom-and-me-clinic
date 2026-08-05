# Adding a new practice

This codebase is a **template, not a one-off site**. Every visible thing —
palette, fonts, copy, section order, which interactive tools exist — is data in
one config file. No component knows the name "Dr. Mete".

---

## The fastest route: Studio

1. Run the site and open it with `?studio=1`, or press <kbd>⌘/Ctrl</kbd> +
   <kbd>Shift</kbd> + <kbd>S</kbd>.
2. Change colours, fonts, corner style, section order and headline copy live.
3. Hit **Export config** — you get a ready-to-use tenant file.
4. Drop it into `src/config/tenants/` and register it (step 3 below).

Studio edits are stored in `localStorage` only. They never touch the repo until
you export.

---

## The manual route

### 1. Copy an existing tenant

```bash
cp src/config/tenants/dr-mete-pediatrics.js src/config/tenants/my-practice.js
```

`dr-mete-pediatrics.js` is the fullest example (every tool switched on).
`aurora-dental.js` is a leaner one in a different vertical — useful to see what
changes when the pediatric tools are turned off and pricing/before-after are
turned on.

### 2. Edit the fields

Only `brand`, `business` and `sections` are really mandatory. Everything else
falls back to `DEFAULTS` in `src/config/index.js`, so a partial config is a
valid config.

```js
export default {
  id: 'my-practice',
  vertical: 'physiotherapy',

  brand: {
    name: 'Kinetic',
    nameAccent: 'Physio',
    colors: { primary: '#2563eb', accent: '#0891b2', highlight: '#f59e0b' },
    fonts:  { heading: 'Outfit', body: 'Plus Jakarta Sans' },
    radius: 'soft',            // sharp | soft | rounded | pill
  },

  business: {
    schemaType: 'MedicalBusiness',   // drives the JSON-LD type
    professional: { name: '…', title: '…', credentials: […] },
    contact: { phone, whatsapp, address: { street, locality, postalCode, lat, lng } },
    hours: { mon: [{ open: '09:00', close: '18:00' }], /* … */ sun: [] },
    pricing: { consultationFee: 700, currency: 'INR' },
  },

  sections: [
    { id: 'home',     component: 'hero',     enabled: true },
    { id: 'services', component: 'services', enabled: true, nav: 'Treatments' },
    // …
  ],
};
```

**You only supply one to three brand hex values.** The full 50→950 ramp, the
tinted neutrals, the dark-mode inversions, the focus rings and the gradients are
all derived in OKLCH at runtime (`src/lib/color.js`), so any brand colour
produces a coherent, accessible scale.

### 3. Register it

```js
// src/config/index.js
import myPractice from './tenants/my-practice';

export const TENANTS = {
  'dr-mete-pediatrics': drMete,
  'aurora-dental': auroraDental,
  'my-practice': myPractice,          // ← add
};

export const DEFAULT_TENANT = 'my-practice';   // ← or set VITE_TENANT at build time
```

### 4. Swap the images

Replace the files in `public/` (`doctor_portrait.jpg`, `clinic_hero.jpg`,
`clinic_exterior.jpg`) and point `business.professional.photo` and
`content.gallery[].src` at whatever you name them.

---

## Which tenant loads, and when

Highest priority first:

1. `?tenant=aurora-dental` in the URL — handy for sending a client a preview link
2. `localStorage['practice-os:tenant']` — set by Studio's tenant switcher
3. `VITE_TENANT` — the per-deployment default

   ```bash
   VITE_TENANT=my-practice npm run build
   ```
4. `DEFAULT_TENANT` in `src/config/index.js`

---

## Sections

`config.sections` is an ordered list. Each entry maps a `component` string to a
React component through `src/components/registry.js`. Reorder the array and the
page reorders. Set `enabled: false` and the section disappears — including from
the nav, the command palette and the footer, because those all read the same
array.

Give a section a `nav` label to put it in the navigation; omit it to keep the
section on the page but out of the menu.

| component        | What it renders                                            |
| ---------------- | ---------------------------------------------------------- |
| `hero`           | Headline, CTAs, practitioner card with live open/closed     |
| `logoStrip`      | Scrolling credentials / protocol marquee                    |
| `stats`          | Animated count-up figures                                   |
| `services`       | Filterable, expandable service cards                        |
| `about`          | Practitioner bio, credentials, career timeline              |
| `process`        | Numbered "what a visit looks like" steps                    |
| `pricing`        | Plan comparison cards                                       |
| `gallery`        | Masonry gallery with a keyboard-navigable lightbox          |
| `beforeAfter`    | Draggable before/after comparison slider                    |
| `reviews`        | Ratings breakdown, tag filters, helpful votes               |
| `resources`      | Long-form guide explorer                                    |
| `faq`            | Searchable accordion (also feeds FAQPage schema)            |
| `location`       | Map, hours table with today highlighted, emergency card     |
| `toolsHub`       | Grid linking to every interactive tool                      |
| `growthTool`     | WHO percentile calculator + SVG reference chart             |
| `vaccineTracker` | Date-of-birth-driven immunisation planner with .ics export  |
| `milestones`     | Development checklist with red flags                        |
| `cta`            | Closing conversion block                                    |

Adding a new section type is three lines: build the component, add it to
`SECTION_REGISTRY`, reference it from a tenant.

---

## Tools

Each entry under `config.tools` has an `enabled` flag. Turn a tool off and it
vanishes from the page, the tools hub, the command palette and the footer.

The pediatric tools carry real domain logic that is worth knowing about:

- **`growth`** — WHO LMS z-scores (`src/lib/growth.js`). Condensed WHO reference
  tables, linearly interpolated between anchor ages. Screening aid, not a
  diagnosis; the disclaimer text is configurable.
- **`vaccines`** — the *schedule itself is config* (`tools.vaccines.schedule`),
  so a different country or academy protocol is a data change. The engine
  (`src/lib/vaccines.js`) turns a date of birth into dated visits with
  due/overdue status and a calendar export.
- **`milestones`, `triage`, `dose`, `kit`** — entirely config-driven; the
  questions, weights, outcome bands and drug tables all live in the tenant file.

Everything runs client-side. No measurement, date of birth or checklist answer
ever leaves the browser.

---

## Localisation

```js
i18n: {
  default: 'en',
  available: ['en', 'hi', 'mr'],
  strings: { hi: { 'nav.book': 'अपॉइंटमेंट बुक करें' } },
}
```

Two mechanisms, both optional:

- UI strings — `t('nav.book', 'Book appointment')`. The second argument is the
  English default, so an untranslated key still renders correctly.
- Content — any config *value* may be `{ en: '…', hi: '…' }` instead of a
  string, and it resolves for the active locale.

A half-translated config degrades to the default locale rather than rendering
blanks. Drop `available` to `['en']` and the language switcher disappears.

---

## Analytics

`integrations.analytics.provider`:

- `'local'` (default) — buffered in `localStorage`, visible in Studio →
  Insights. Nothing leaves the device.
- `'endpoint'` — batched `POST` to `integrations.analytics.url`.
- `'gtag'` — forwarded to an existing GA/GTM install.

Only event names and coarse metadata are recorded. Booking form values are
never captured.
