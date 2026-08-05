# Practice OS

A config-driven website platform for local healthcare practices. One codebase,
one config file per business — swap the config and the entire site re-skins:
palette, fonts, copy, section order, and which interactive tools exist.

**Live:** https://dr-mete-childrens-clinic.vercel.app
**Second tenant (proof of reusability):** https://dr-mete-childrens-clinic.vercel.app/?tenant=aurora-dental

---

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```

Deploy (already wired to Vercel under your account):

```bash
npx vercel deploy --prod
```

---

## Reusing this for another practice

Read [`src/config/README.md`](src/config/README.md). Short version:

1. Open the site with `?studio=1`, or press <kbd>⌘/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>.
2. Change colours, fonts, corners, section order and headline copy live.
3. **Export config** → drop the file into `src/config/tenants/` and register it.

Studio is invisible to normal visitors — it only appears with the query string
or the keyboard shortcut, and it is code-split out of the main bundle.

---

## What is in here

### Config-driven architecture

| Layer | Where | What it does |
| --- | --- | --- |
| Tenant configs | `src/config/tenants/` | Everything a business needs, in one file |
| Resolver | `src/config/index.js` | `?tenant=` → localStorage → `VITE_TENANT` → default, deep-merged over sane defaults |
| Section registry | `src/components/registry.js` | Maps a config string to a React component, so page structure is data |
| Colour engine | `src/lib/color.js` | One brand hex → a full OKLCH 50–950 ramp, tinted neutrals, dark-mode inversions |
| Theme | `src/lib/theme.js` | Writes CSS variables at runtime; Tailwind utilities read them via `@theme` |

Nothing in `src/components` references any specific business by name.

### Interactive tools (all client-side; no data leaves the browser)

- **WHO growth percentile checker** — real LMS z-scores (`src/lib/growth.js`),
  plotted on live-drawn WHO reference curves with the child's point on the chart.
- **Vaccination planner** — enter a date of birth, get the whole IAP schedule
  dated, with due/overdue flags, progress ring, `.ics` calendar export and a
  WhatsApp summary. The schedule itself is config, so another country's
  protocol is a data change.
- **Milestone checklist** — persistent per-stage ticks, progress, red flags.
- **Symptom triage** — weighted six-question flow with emergency short-circuits.
- **Weight-based dose reference** — paracetamol/ibuprofen by kg and bottle
  strength, with caps and prominent disclaimers.
- **Home medicine kit** — what to keep, what to bin.

### Conversion & business surface

Three-step booking wizard (validated, remembers your contact details, generates
a WhatsApp message plus `.ics`/email/copy fallbacks) · live open/closed status
computed from configured hours · sticky mobile call/WhatsApp/book dock ·
exit-intent reminder offer · ⌘K command palette across services, answers and
tools · share and copy-address actions.

### Technical

- **SEO** — runtime JSON-LD graph (`MedicalClinic` + `Physician` + `FAQPage` +
  `WebSite`), Open Graph, geo meta, canonical. This is what produces the rich
  result on a "pediatrician near me" search.
- **i18n** — English / हिन्दी / मराठी, with graceful fallback for untranslated keys.
- **Dark mode** — derived from the brand colour, follows the OS, user-overridable.
- **PWA** — manifest, app shortcuts, network-first service worker so hours and
  the phone number load on a weak signal.
- **Accessibility** — skip link, focus traps, ARIA on every custom control,
  keyboard-navigable tabs/palette/lightbox, `prefers-reduced-motion` respected.
- **Analytics** — privacy-first local collector, visible in Studio → Insights;
  point it at an endpoint or GA when you want.

Motion is hand-rolled CSS + IntersectionObserver — no animation library.
Reveal-on-scroll fails *open*: if the observer never fires, content is shown
rather than hidden.

---

## Notes

- `.legacy/` holds the superseded first-version components and the original
  uncompressed images. Nothing imports from it — delete it whenever you like.
- Verified domain logic (growth z-scores, schedule dating, opening hours,
  colour ramps) with a 31-check script during the build; all passing.
- The growth tool is a screening aid built on the WHO Child Growth Standards,
  not a diagnostic. Disclaimers are configurable per tenant and shown in-context.
