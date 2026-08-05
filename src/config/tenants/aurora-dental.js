/**
 * Tenant: Aurora Dental Studio (demo).
 *
 * This file exists to prove the point of the architecture — a completely
 * different vertical, palette, section order and tool set, with zero component
 * changes. Load it with `?tenant=aurora-dental`.
 *
 * Note what changes versus the pediatric tenant: the pediatric-only sections
 * (vaccines, growth, milestones) are simply absent from `sections`, and two
 * sections the clinic does not use (pricing, beforeAfter) appear instead.
 */

export default {
  id: 'aurora-dental',
  vertical: 'dental',

  brand: {
    name: 'Aurora',
    nameAccent: 'Dental Studio',
    legalName: 'Aurora Dental Studio',
    tagline: 'Calm, modern dentistry in Bandra West',
    logo: { type: 'icon', icon: 'Sparkles' },
    colors: { primary: '#6d5ce7', accent: '#e0447c', highlight: '#f2b33d' },
    fonts: { heading: 'Outfit', body: 'Plus Jakarta Sans' },
    radius: 'soft',
    appearance: 'light',
  },

  meta: {
    title: 'Aurora Dental Studio | Cosmetic & Family Dentistry, Bandra West',
    description:
      'Aurora Dental Studio — Dr. Naina Rao, MDS Prosthodontics. Aligners, veneers, implants and anxiety-free family dentistry in Bandra West, Mumbai.',
    keywords: ['dentist in Bandra', 'invisible aligners Mumbai', 'dental implants Bandra West', 'cosmetic dentist Mumbai'],
    ogImage: '/clinic_hero.jpg',
  },

  business: {
    schemaType: 'Dentist',
    professionalSchemaType: 'Dentist',
    areaServed: ['Bandra West', 'Khar', 'Santacruz', 'Juhu'],

    professional: {
      name: 'Dr. Naina Rao',
      title: 'Cosmetic & Restorative Dentist',
      shortName: 'Dr. Rao',
      photo: '/doctor_portrait.jpg',
      experienceYears: 12,
      credentials: [
        { label: 'BDS', issuer: 'Nair Hospital Dental College', icon: 'GraduationCap' },
        { label: 'MDS Prosthodontics', issuer: 'Manipal University', icon: 'Award' },
        { label: 'Invisalign Certified', issuer: 'Align Technology', icon: 'BadgeCheck' },
      ],
      bio: 'Dr. Naina Rao has spent twelve years rebuilding smiles and, just as often, rebuilding the confidence of patients who have avoided a dental chair for years. The studio is built around one idea: nothing hurts, and nothing is done without you understanding why.',
      philosophy: [
        'No treatment is started before you have seen the plan and the price.',
        'Anxiety is a clinical problem, and it gets treated like one.',
        'Keep the natural tooth wherever keeping it is possible.',
      ],
      timeline: [
        { year: '2013', title: 'BDS', detail: 'Nair Hospital Dental College, Mumbai.' },
        { year: '2016', title: 'MDS Prosthodontics', detail: 'Specialist training in crowns, bridges and full-mouth rehabilitation.' },
        { year: '2019', title: 'Invisalign certification', detail: 'Clear aligner therapy for adults and teenagers.' },
        { year: '2021', title: 'Aurora opens', detail: 'A studio designed around low-anxiety dentistry in Bandra West.' },
      ],
      languages: ['English', 'हिन्दी', 'मराठी'],
    },

    contact: {
      phone: '02226400000',
      whatsapp: '919000000000',
      email: 'hello@auroradental.example',
      address: {
        street: '2nd Floor, Linking Road, Khar Danda Junction',
        locality: 'Bandra West, Mumbai',
        region: 'Maharashtra',
        postalCode: '400050',
        country: 'IN',
        geoRegion: 'IN-MH',
      },
      landmark: 'Above the Linking Road bookstore, lift access',
      mapUrl: 'https://maps.google.com/?q=Bandra+West+Mumbai',
      mapEmbed: 'https://www.google.com/maps?q=Bandra+West,+Mumbai&output=embed',
      travel: [
        { icon: 'Navigation', label: 'Bandra station', detail: '≈ 2.4 km — 10 min by cab' },
        { icon: 'Car', label: 'Parking', detail: 'Valet available on the Linking Road side' },
      ],
    },

    hours: {
      mon: [{ open: '10:00', close: '19:00' }],
      tue: [{ open: '10:00', close: '19:00' }],
      wed: [{ open: '10:00', close: '19:00' }],
      thu: [{ open: '10:00', close: '19:00' }],
      fri: [{ open: '10:00', close: '19:00' }],
      sat: [{ open: '10:00', close: '16:00' }],
      sun: [],
      note: 'Sunday by prior appointment only.',
    },

    pricing: {
      consultationFee: 800,
      currency: 'INR',
      range: '₹₹₹',
      methods: ['Cash', 'UPI', 'Card', 'EMI'],
      note: 'Consultation is waived if you proceed with treatment on the same day.',
    },

    emergency: {
      enabled: true,
      title: 'Dental emergency?',
      text: 'A knocked-out tooth is a genuine emergency — the first 30 minutes decide whether it can be saved. Call rather than book.',
      signs: [
        'A permanent tooth knocked out — keep it in milk and call now',
        'Facial swelling, especially with fever or difficulty swallowing',
        'Uncontrolled bleeding after an extraction',
        'Severe pain that wakes you at night',
      ],
    },

    social: { instagram: 'https://instagram.com' },
  },

  sections: [
    { id: 'home', component: 'hero', enabled: true },
    { id: 'trust', component: 'logoStrip', enabled: true },
    { id: 'stats', component: 'stats', enabled: true },
    { id: 'services', component: 'services', enabled: true, nav: 'Treatments' },
    { id: 'results', component: 'beforeAfter', enabled: true, nav: 'Results' },
    { id: 'about', component: 'about', enabled: true, nav: 'The dentist' },
    { id: 'visit', component: 'process', enabled: true },
    { id: 'pricing', component: 'pricing', enabled: true, nav: 'Pricing' },
    { id: 'clinic', component: 'gallery', enabled: true },
    { id: 'reviews', component: 'reviews', enabled: true, nav: 'Reviews' },
    { id: 'faq', component: 'faq', enabled: true },
    { id: 'location', component: 'location', enabled: true, nav: 'Visit us' },
    { id: 'book', component: 'cta', enabled: true },
  ],

  content: {
    hero: {
      eyebrow: '4.8 ★ from 410+ Google reviews',
      headline: 'Dentistry you stop',
      headlineAccent: 'dreading',
      sub: 'Clear aligners, veneers, implants and honest family dentistry — with a written plan and a fixed price before anything begins.',
      primaryCta: 'Book a consultation',
      secondaryCta: 'See treatments',
      badges: [
        { icon: 'Shield', title: 'Fixed quotes', detail: 'Priced before we start' },
        { icon: 'Smile', title: 'Anxiety-friendly', detail: 'Sedation available' },
        { icon: 'BadgeCheck', title: 'Invisalign certified', detail: '12 years experience' },
      ],
      highlights: ['Same-day emergency slots', 'EMI from ₹2,500/month', 'Digital scans — no gag-inducing trays'],
    },

    logoStrip: {
      title: 'Certifications & technology',
      items: [
        { icon: 'BadgeCheck', label: 'Invisalign certified' },
        { icon: 'Award', label: 'MDS Prosthodontics' },
        { icon: 'Monitor', label: 'Digital intraoral scanning' },
        { icon: 'Shield', label: 'Class-B autoclave sterilisation' },
        { icon: 'Zap', label: 'Single-visit CAD/CAM crowns' },
      ],
    },

    stats: [
      { label: 'Google rating', value: '4.8 ★', subtext: 'From 410+ reviews', icon: 'Star' },
      { label: 'Smiles restored', value: '6,200+', subtext: 'Since 2021', icon: 'Smile' },
      { label: 'Aligner cases', value: '450+', subtext: 'Invisalign certified', icon: 'Sparkles' },
      { label: 'Implant success', value: '98%', subtext: 'Five-year survival', icon: 'ShieldCheck' },
    ],

    services: [
      { id: 'aligners', category: 'Orthodontics', title: 'Clear aligners', icon: 'Sparkles', popular: true,
        shortDesc: 'Straighten teeth without visible braces, with a 3D preview of the result before you commit.',
        details: ['Digital scan and 3D outcome simulation', 'Removable for meals and photographs', 'Typically 6–18 months', 'Retainers included in every plan'],
        duration: '45 min consult', aftercare: 'Weekly tray changes at home' },
      { id: 'implants', category: 'Restorative', title: 'Dental implants', icon: 'Crown',
        shortDesc: 'A permanent replacement for a missing tooth that behaves like the real thing.',
        details: ['CBCT-guided placement planning', 'Titanium implant with a ceramic crown', 'Single tooth to full-arch', '98% five-year survival rate'],
        duration: '90 min', aftercare: '3–6 months to integrate' },
      { id: 'veneers', category: 'Cosmetic', title: 'Veneers & smile design', icon: 'Star', popular: true,
        shortDesc: 'Reshape colour, length and alignment — previewed on your own teeth before any drilling.',
        details: ['Digital smile design mock-up', 'Minimal-preparation ceramic veneers', 'Shade matched in natural light', 'Trial smile you can wear home'],
        duration: '2 visits', aftercare: 'Immediate' },
      { id: 'rct', category: 'Treatment', title: 'Painless root canal', icon: 'Zap',
        shortDesc: 'Single-sitting endodontics under a microscope, usually with no post-operative pain.',
        details: ['Rotary single-sitting technique', 'Operating microscope for accuracy', 'Crown planned in the same appointment', 'Most patients return to work the same day'],
        duration: '60–90 min', aftercare: 'Mild tenderness for 1–2 days' },
      { id: 'hygiene', category: 'Preventive', title: 'Cleaning & gum care', icon: 'Droplet',
        shortDesc: 'Ultrasonic scaling, polishing and a gum-health assessment that actually gets explained to you.',
        details: ['Ultrasonic scaling and air polishing', 'Full periodontal charting', 'Stain removal for tea, coffee and tobacco', 'Home technique coaching'],
        duration: '45 min', aftercare: 'Immediate' },
      { id: 'kids', category: 'Family', title: 'Children’s dentistry', icon: 'Baby',
        shortDesc: 'First visits, fluoride, sealants and habit counselling — in a room built to be unscary.',
        details: ['Tell-show-do introduction visits', 'Fluoride varnish and fissure sealants', 'Thumb-sucking and grinding guidance', 'Sports mouthguards'],
        duration: '30 min', aftercare: 'Immediate' },
    ],

    pricing: {
      title: 'What things cost',
      sub: 'Indicative ranges, published up front. Your written quote after the consultation is the number that holds.',
      note: 'EMI available from ₹2,500/month on treatments above ₹25,000. Consultation is waived if you begin treatment the same day.',
      plans: [
        { name: 'Consultation & X-ray', price: '₹800', cadence: 'one-off', desc: 'Full examination, digital X-ray and a written treatment plan.',
          features: ['Complete oral examination', 'Digital X-ray as needed', 'Written plan with fixed pricing', 'Waived if you start treatment that day'] },
        { name: 'Cleaning & polishing', price: '₹1,800', cadence: 'per session', desc: 'Ultrasonic scaling, polishing and gum-health charting.', featured: true,
          features: ['Ultrasonic scaling', 'Air-flow stain removal', 'Periodontal charting', 'Home technique coaching'] },
        { name: 'Clear aligners', price: '₹1,20,000+', cadence: 'full course', desc: 'Complete aligner therapy including scans, trays and retainers.',
          features: ['3D outcome simulation', 'All aligner trays', 'Review visits throughout', 'Retainers included'] },
      ],
    },

    beforeAfter: {
      title: 'Before & after',
      sub: 'Real cases, unretouched, published with patient consent. Drag the handle to compare.',
      cases: [
        { id: 'c1', title: 'Clear aligners — 11 months', detail: 'Crowding of the lower arch corrected without extraction.',
          before: '/clinic_exterior.jpg', after: '/clinic_hero.jpg', beforeLabel: 'Week 0', afterLabel: 'Month 11' },
        { id: 'c2', title: 'Veneers — 2 visits', detail: 'Chipped upper incisors reshaped with minimal-preparation ceramic.',
          before: '/clinic_hero.jpg', after: '/clinic_exterior.jpg', beforeLabel: 'Before', afterLabel: 'After' },
      ],
    },

    process: {
      title: 'How treatment works here',
      sub: 'You will always know the plan and the price before anything begins.',
      steps: [
        { icon: 'MessageSquare', title: 'Book a consultation', detail: 'Tell us what is bothering you. Emergencies get a same-day slot.', meta: '2 minutes' },
        { icon: 'Search', title: 'Examination & scan', detail: 'Full examination, digital X-rays and an intraoral scan where relevant.', meta: '45 minutes' },
        { icon: 'FileText', title: 'Written plan & fixed quote', detail: 'Options, trade-offs and prices in writing. No pressure to decide in the chair.', meta: 'Same visit' },
        { icon: 'Smile', title: 'Treatment & review', detail: 'Treatment at your pace, with review appointments included in the quoted price.', meta: 'Included' },
      ],
    },

    gallery: [
      { src: '/clinic_hero.jpg', title: 'Treatment suite', caption: 'Natural light, noise-dampened, and a ceiling screen for anxious patients.' },
      { src: '/clinic_exterior.jpg', title: 'Reception', caption: 'Second floor on Linking Road, with lift access.' },
    ],

    reviews: [
      { id: 1, author: 'Farah Q.', rating: 5, date: '3 weeks ago', relation: 'Aligner patient', verified: true, helpfulCount: 18,
        tags: ['Aligners', 'Anxiety'], text: 'I avoided dentists for nine years. Dr. Rao talked me through every step before touching anything. Eleven months of aligners later I actually smile in photographs.' },
      { id: 2, author: 'Rohan M.', rating: 5, date: '2 months ago', relation: 'Implant patient', verified: true, helpfulCount: 12,
        tags: ['Implant', 'Painless'], text: 'Implant placed in ninety minutes and I was back at work the next morning. The written quote at the start was exactly what I paid at the end.' },
      { id: 3, author: 'Divya S.', rating: 5, date: '4 months ago', relation: 'Parent', verified: true, helpfulCount: 9,
        tags: ['Children'], text: 'My six-year-old asked when we are going back. I did not think that sentence was possible about a dentist.' },
    ],

    faqs: [
      { q: 'Does a root canal hurt?', a: 'The procedure itself is done under full local anaesthesia, so you should feel pressure but not pain. Most patients report mild tenderness for a day or two afterwards, managed with ordinary painkillers.' },
      { q: 'How much do clear aligners cost?', a: 'A complete course typically starts at ₹1,20,000 including scans, all trays and retainers. You get a fixed written quote after the consultation — the number does not move afterwards.' },
      { q: 'Do you offer EMI?', a: 'Yes, from ₹2,500 a month on treatments above ₹25,000, through standard card EMI or a no-cost partner plan depending on the amount.' },
      { q: 'I am extremely anxious about dentists. What can you do?', a: 'Quite a lot. We can book a talk-only first visit with no instruments at all, use topical numbing before any injection, agree a stop signal, and offer oral or IV sedation for longer treatments.' },
      { q: 'How often should I actually come in?', a: 'Every six months for most adults. If you have gum disease, smoke, or wear aligners, three to four months is more appropriate.' },
    ],

    cta: {
      title: 'Book your consultation',
      sub: 'Send a message and the front desk will confirm a slot, usually the same day.',
      primary: 'Book on WhatsApp',
      secondary: 'Call the studio',
    },
  },

  tools: {
    hub: { title: '', sub: '', items: [] },
    growth: { enabled: false },
    vaccines: { enabled: false },
    milestones: { enabled: false },
    triage: { enabled: false },
    dose: { enabled: false },
    kit: { enabled: false },
  },

  booking: {
    channel: 'whatsapp',
    title: 'Book a consultation',
    sub: 'Two short steps. The details go straight to the front desk.',
    subjectPrefix: 'Consultation request',
    fields: { subjectLabel: 'Who is this for?', subjectPlaceholder: 'Your name', agePlaceholder: 'e.g. 32' },
    reasons: ['General check-up & cleaning', 'Clear aligners', 'Dental implant', 'Veneers / smile design', 'Root canal or toothache', 'Children’s dentistry', 'Emergency'],
  },

  integrations: {
    analytics: { provider: 'local', enabled: true },
    exitIntent: { enabled: false },
    pwa: true,
  },

  legal: {
    disclaimer: 'Information on this site is general and not a substitute for a clinical examination. Treatment outcomes vary between patients.',
    privacyNote: 'Anything you enter into the tools on this site stays in your browser.',
    credits: 'Site by Practice OS',
  },

  i18n: { default: 'en', available: ['en'], strings: {} },
};
