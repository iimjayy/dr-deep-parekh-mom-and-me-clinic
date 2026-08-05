/**
 * Tenant: Dr. Mete's Children's Clinic — Nalasopara East, Vasai-Virar.
 *
 * This single file describes the entire site: brand, palette, copy, sections,
 * ordering, tools and translations. Nothing here is referenced by filename
 * anywhere in `src/components` — swap this object out and the same codebase
 * renders a completely different practice. See `src/config/README.md`.
 *
 * LOCALISATION
 * Any user-visible string may be written as `{ en, hi, mr }` instead of a plain
 * string. AppContext resolves the whole tree for the active locale before the
 * components ever see it, so a half-translated config degrades to English
 * rather than breaking. Structural values (ids, icons, colours) stay plain.
 */

const WHATSAPP = '918080118958';

export default {
  id: 'dr-mete-pediatrics',
  vertical: 'pediatrics',

  /* ---------------------------------------------------------------- */
  /* Brand & appearance                                                */
  /* ---------------------------------------------------------------- */
  brand: {
    name: "Dr. Mete's",
    nameAccent: { en: "Children's Clinic", hi: 'चिल्ड्रन्स क्लिनिक', mr: 'चिल्ड्रन्स क्लिनिक' },
    legalName: "Dr. Mete's Children's Clinic",
    tagline: {
      en: 'Expert pediatric & neonatal care in Nalasopara East',
      hi: 'नालासोपारा ईस्ट में विशेषज्ञ शिशु एवं नवजात चिकित्सा',
      mr: 'नालासोपारा ईस्टमध्ये तज्ज्ञ बालरोग व नवजात शिशु उपचार',
    },
    logo: { type: 'icon', icon: 'Stethoscope' },
    colors: {
      primary: '#0e8f6f',
      accent: '#0b7fc4',
      highlight: '#f0a325',
      neutralTint: 0.006,
    },
    fonts: { heading: 'Outfit', body: 'Plus Jakarta Sans' },
    radius: 'rounded',
    // Light by default for every first-time visitor, regardless of their OS
    // setting. A visitor who picks dark from the toggle keeps it.
    appearance: 'light',
  },

  meta: {
    title: "Dr. Mete's Children's Clinic | Pediatrician & Neonatologist, Nalasopara East",
    description:
      'Dr. Mahesh Mete — MBBS, DNB Pediatrics, MRCPCH (London). Newborn care, painless WHO/IAP vaccination, growth tracking and childhood illness treatment in Nalasopara East, Vasai-Virar. 4.9★ from 633+ reviews.',
    keywords: [
      'pediatrician in Nalasopara East', 'child specialist Vasai Virar', 'neonatologist Nalasopara',
      'painless vaccination Nalasopara', 'baby doctor near me', 'child growth chart clinic',
      'Dr Mahesh Mete', 'newborn care Vasai', 'MRCPCH pediatrician Mumbai',
      'बाल रोग विशेषज्ञ नालासोपारा', 'बालरोगतज्ज्ञ नालासोपारा',
    ],
    ogImage: '/clinic_hero.jpg',
    canonical: '',
  },

  /* ---------------------------------------------------------------- */
  /* The business                                                      */
  /* ---------------------------------------------------------------- */
  business: {
    schemaType: 'MedicalClinic',
    professionalSchemaType: 'Physician',
    serviceSchemaType: 'MedicalProcedure',
    areaServed: ['Nalasopara East', 'Nalasopara West', 'Vasai', 'Virar', 'Nallasopara', 'Achole', 'Tulinj'],

    professional: {
      name: { en: 'Dr. Mahesh Mete', hi: 'डॉ. महेश मेटे', mr: 'डॉ. महेश मेटे' },
      title: {
        en: 'Senior Pediatrician & Neonatologist',
        hi: 'वरिष्ठ बाल रोग एवं नवजात शिशु विशेषज्ञ',
        mr: 'ज्येष्ठ बालरोग व नवजात शिशुतज्ज्ञ',
      },
      shortName: { en: 'Dr. Mete', hi: 'डॉ. मेटे', mr: 'डॉ. मेटे' },
      photo: '/doctor_portrait.jpg',
      experienceYears: 18,
      registration: 'Maharashtra Medical Council',
      credentials: [
        { label: 'MBBS', issuer: 'Maharashtra University of Health Sciences', icon: 'GraduationCap' },
        { label: 'DNB Pediatrics', issuer: 'National Board of Examinations, Mumbai', icon: 'Award' },
        { label: 'MRCPCH', issuer: 'Royal College of Paediatrics & Child Health, London', icon: 'Crown' },
      ],
      bio: {
        en: 'Dr. Mahesh Mete has spent 18 years caring for newborns, infants and growing children across Mumbai and London. Trained in DNB Pediatrics in Mumbai and holding MRCPCH from the Royal College in London, he is known locally for two things: a genuinely painless vaccination technique, and a strict no-unnecessary-antibiotics policy.',
        hi: 'डॉ. महेश मेटे ने मुंबई और लंदन में 18 वर्षों तक नवजात शिशुओं, छोटे बच्चों और बढ़ते बच्चों की देखभाल की है। मुंबई से DNB बाल रोग और लंदन के रॉयल कॉलेज से MRCPCH प्राप्त डॉ. मेटे दो बातों के लिए जाने जाते हैं — वास्तव में दर्द रहित टीकाकरण तकनीक, और बिना ज़रूरत एंटीबायोटिक न देने की सख़्त नीति।',
        mr: 'डॉ. महेश मेटे यांनी मुंबई आणि लंडनमध्ये १८ वर्षे नवजात बालके, लहान मुले आणि वाढत्या मुलांची काळजी घेतली आहे. मुंबईतून DNB बालरोग आणि लंडनच्या रॉयल कॉलेजमधून MRCPCH मिळवलेले डॉ. मेटे दोन गोष्टींसाठी ओळखले जातात — खरोखर वेदनारहित लसीकरण पद्धत, आणि अनावश्यक अँटिबायोटिक्स कधीही न देण्याचे कठोर धोरण.',
      },
      philosophy: [
        {
          en: 'Explain first, prescribe second — parents leave understanding what is happening.',
          hi: 'पहले समझाना, फिर दवा — माता-पिता यह समझकर जाते हैं कि हो क्या रहा है।',
          mr: 'आधी समजावून सांगणे, नंतर औषध — पालक नेमके काय होत आहे हे समजून घेऊन जातात.',
        },
        {
          en: 'Antibiotics only when clinically justified, never "just in case".',
          hi: 'एंटीबायोटिक तभी जब चिकित्सकीय रूप से ज़रूरी हो — कभी "एहतियात के लिए" नहीं।',
          mr: 'अँटिबायोटिक्स फक्त वैद्यकीयदृष्ट्या आवश्यक असतील तेव्हाच — "काळजी म्हणून" कधीच नाही.',
        },
        {
          en: 'The child should not dread the next visit.',
          hi: 'बच्चे को अगली विज़िट से डर नहीं लगना चाहिए।',
          mr: 'मुलाला पुढच्या भेटीची भीती वाटता कामा नये.',
        },
      ],
      timeline: [
        { year: '2007', title: { en: 'MBBS', hi: 'MBBS', mr: 'MBBS' }, detail: { en: 'Completed undergraduate medical training and internship.', hi: 'स्नातक चिकित्सा शिक्षा एवं इंटर्नशिप पूर्ण की।', mr: 'पदवीपूर्व वैद्यकीय शिक्षण व इंटर्नशिप पूर्ण.' } },
        { year: '2011', title: { en: 'DNB Pediatrics, Mumbai', hi: 'DNB बाल रोग, मुंबई', mr: 'DNB बालरोग, मुंबई' }, detail: { en: 'Specialist training across tertiary pediatric and neonatal units.', hi: 'उच्च स्तरीय बाल एवं नवजात इकाइयों में विशेषज्ञ प्रशिक्षण।', mr: 'उच्चस्तरीय बालरोग व नवजात विभागांत तज्ज्ञ प्रशिक्षण.' } },
        { year: '2014', title: { en: 'MRCPCH, London', hi: 'MRCPCH, लंदन', mr: 'MRCPCH, लंडन' }, detail: { en: 'Membership of the Royal College of Paediatrics & Child Health, UK.', hi: 'रॉयल कॉलेज ऑफ़ पीडियाट्रिक्स एंड चाइल्ड हेल्थ, यूके की सदस्यता।', mr: 'रॉयल कॉलेज ऑफ पीडियाट्रिक्स अँड चाइल्ड हेल्थ, यूकेचे सदस्यत्व.' } },
        { year: '2016', title: { en: 'NICU practice', hi: 'NICU अनुभव', mr: 'NICU अनुभव' }, detail: { en: 'Neonatal intensive care experience — preterm, low birth weight and jaundice management.', hi: 'नवजात गहन चिकित्सा अनुभव — समय-पूर्व जन्म, कम वज़न और पीलिया प्रबंधन।', mr: 'नवजात अतिदक्षता अनुभव — अकाली जन्म, कमी वजन आणि कावीळ व्यवस्थापन.' } },
        { year: '2018', title: { en: 'Clinic founded', hi: 'क्लिनिक की स्थापना', mr: 'क्लिनिकची स्थापना' }, detail: { en: "Opened Dr. Mete's Children's Clinic in Nalasopara East.", hi: 'नालासोपारा ईस्ट में डॉ. मेटे चिल्ड्रन्स क्लिनिक की शुरुआत।', mr: 'नालासोपारा ईस्टमध्ये डॉ. मेटे चिल्ड्रन्स क्लिनिकची सुरुवात.' } },
        { year: 'Today', title: { en: '25,000+ children', hi: '25,000+ बच्चे', mr: '२५,०००+ मुले' }, detail: { en: 'A second generation of local families now visits the same clinic.', hi: 'स्थानीय परिवारों की दूसरी पीढ़ी अब उसी क्लिनिक में आती है।', mr: 'स्थानिक कुटुंबांची दुसरी पिढी आता याच क्लिनिकमध्ये येते.' } },
      ],
      languages: ['English', 'हिन्दी', 'मराठी'],
    },

    contact: {
      phone: '08080118958',
      altPhone: '09890028928',
      whatsapp: WHATSAPP,
      email: '',
      address: {
        street: 'B-13, PNB Lane, Vasai-Nalasopara Link Road, Agrawal Nagri',
        locality: 'Nalasopara East, Vasai-Virar',
        region: 'Maharashtra',
        postalCode: '401209',
        country: 'IN',
        geoRegion: 'IN-MH',
        lat: 19.4184,
        lng: 72.8397,
      },
      landmark: {
        en: 'Opposite Punjab National Bank (PNB) lane, Agrawal Nagri',
        hi: 'पंजाब नेशनल बैंक (PNB) लेन के सामने, अग्रवाल नगरी',
        mr: 'पंजाब नॅशनल बँक (PNB) लेनसमोर, अग्रवाल नगरी',
      },
      mapUrl: "https://maps.google.com/?q=Dr.+Mete's+Children's+Clinic+Nalasopara+East",
      mapEmbed:
        'https://www.google.com/maps?q=Nalasopara+East,+Vasai-Virar,+Maharashtra+401209&output=embed',
      travel: [
        {
          icon: 'Navigation',
          label: { en: 'Nalasopara railway station', hi: 'नालासोपारा रेलवे स्टेशन', mr: 'नालासोपारा रेल्वे स्थानक' },
          detail: { en: '≈ 1.8 km — 8 min by auto', hi: '≈ 1.8 किमी — ऑटो से 8 मिनट', mr: '≈ १.८ किमी — रिक्षाने ८ मिनिटे' },
        },
        {
          icon: 'Car',
          label: { en: 'Parking', hi: 'पार्किंग', mr: 'पार्किंग' },
          detail: { en: 'Two-wheeler parking in the lane; four-wheeler on the link road', hi: 'लेन में दोपहिया पार्किंग; चारपहिया लिंक रोड पर', mr: 'गल्लीत दुचाकी पार्किंग; चारचाकी लिंक रोडवर' },
        },
        {
          icon: 'Building2',
          label: { en: 'Landmark', hi: 'पहचान चिह्न', mr: 'खूण' },
          detail: { en: 'PNB lane, Agrawal Nagri — ground floor, step-free entry', hi: 'PNB लेन, अग्रवाल नगरी — ग्राउंड फ्लोर, बिना सीढ़ी प्रवेश', mr: 'PNB लेन, अग्रवाल नगरी — तळमजला, पायऱ्यांशिवाय प्रवेश' },
        },
      ],
    },

    hours: {
      mon: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      tue: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      wed: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      thu: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      fri: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      sat: [{ open: '11:00', close: '13:30' }, { open: '18:30', close: '21:00' }],
      sun: [],
      note: {
        en: 'Sunday closed. Existing patients can call for genuine emergencies at any hour.',
        hi: 'रविवार बंद। पुराने मरीज़ वास्तविक आपात स्थिति में किसी भी समय कॉल कर सकते हैं।',
        mr: 'रविवार बंद. जुने रुग्ण खऱ्या आणीबाणीत कोणत्याही वेळी फोन करू शकतात.',
      },
    },

    pricing: {
      consultationFee: 500,
      currency: 'INR',
      range: '₹₹',
      methods: ['Cash', 'UPI', 'Card'],
      note: {
        en: 'Same fee for walk-in and booked appointments. Vaccine cost is billed separately at MRP.',
        hi: 'वॉक-इन और बुक की गई अपॉइंटमेंट — दोनों के लिए समान शुल्क। टीके का मूल्य MRP पर अलग से।',
        mr: 'वॉक-इन आणि बुक केलेल्या अपॉइंटमेंटसाठी समान शुल्क. लसीचा खर्च MRP नुसार वेगळा.',
      },
    },

    emergency: {
      enabled: true,
      title: { en: 'Is it an emergency?', hi: 'क्या यह आपात स्थिति है?', mr: 'ही आणीबाणी आहे का?' },
      text: {
        en: 'Breathing difficulty, a seizure, unresponsiveness, or a fever in a baby under 3 months needs immediate attention — call now instead of booking.',
        hi: 'साँस लेने में कठिनाई, दौरा, बेहोशी, या 3 महीने से छोटे शिशु में बुखार — तुरंत ध्यान देने की ज़रूरत है। बुकिंग के बजाय अभी कॉल करें।',
        mr: 'श्वास घेण्यास त्रास, फेफरे, बेशुद्धी, किंवा ३ महिन्यांखालील बाळाला ताप — तातडीने लक्ष देणे आवश्यक. बुकिंगऐवजी लगेच फोन करा.',
      },
      signs: [
        { en: 'Fast, laboured or noisy breathing, or the chest pulling in', hi: 'तेज़, कठिन या आवाज़ वाली साँस, या छाती अंदर धँसना', mr: 'जलद, कष्टाचा किंवा आवाज करणारा श्वास, किंवा छाती आत ओढली जाणे' },
        { en: 'A fever of 100.4°F / 38°C or higher in a baby under 3 months', hi: '3 महीने से छोटे शिशु में 100.4°F / 38°C या अधिक बुखार', mr: '३ महिन्यांखालील बाळाला १००.४°F / ३८°C किंवा जास्त ताप' },
        { en: 'A seizure, or a child who cannot be woken properly', hi: 'दौरा, या बच्चा ठीक से जाग न रहा हो', mr: 'फेफरे, किंवा मूल नीट जागे होत नसेल' },
        { en: 'No wet nappy for 8+ hours, sunken eyes, or no tears when crying', hi: '8+ घंटे से गीला डायपर नहीं, आँखें धँसी हुई, या रोते समय आँसू न आना', mr: '८+ तास ओले लंगोट नाही, डोळे खोल गेलेले, किंवा रडताना अश्रू न येणे' },
        { en: 'A rash that does not fade when pressed with a glass', hi: 'ऐसे दाने जो काँच से दबाने पर हल्के न पड़ें', mr: 'काचेने दाबल्यावर फिकट न होणारे पुरळ' },
      ],
    },

    social: {
      google: "https://maps.google.com/?q=Dr.+Mete's+Children's+Clinic+Nalasopara+East",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Section order — drag entries around to restructure the page       */
  /* ---------------------------------------------------------------- */
  sections: [
    { id: 'home', component: 'hero', enabled: true },
    { id: 'trust', component: 'logoStrip', enabled: true },
    { id: 'stats', component: 'stats', enabled: true },
    { id: 'services', component: 'services', enabled: true, nav: { en: 'Care', hi: 'सेवाएँ', mr: 'सेवा' } },
    { id: 'about', component: 'about', enabled: true, nav: { en: 'The doctor', hi: 'डॉक्टर', mr: 'डॉक्टर' } },
    { id: 'tools', component: 'toolsHub', enabled: true, nav: { en: 'Free tools', hi: 'मुफ़्त टूल', mr: 'मोफत साधने' } },
    { id: 'growth', component: 'growthTool', enabled: true },
    { id: 'vaccines', component: 'vaccineTracker', enabled: true, nav: { en: 'Vaccines', hi: 'टीके', mr: 'लसी' } },
    { id: 'milestones', component: 'milestones', enabled: true },
    { id: 'visit', component: 'process', enabled: true, nav: { en: 'Your visit', hi: 'आपकी विज़िट', mr: 'तुमची भेट' } },
    { id: 'clinic', component: 'gallery', enabled: true },
    { id: 'reviews', component: 'reviews', enabled: true, nav: { en: 'Reviews', hi: 'समीक्षाएँ', mr: 'अभिप्राय' } },
    { id: 'guides', component: 'resources', enabled: true },
    { id: 'faq', component: 'faq', enabled: true },
    { id: 'location', component: 'location', enabled: true, nav: { en: 'Visit us', hi: 'पता', mr: 'पत्ता' } },
    { id: 'book', component: 'cta', enabled: true },
  ],

  /* ---------------------------------------------------------------- */
  /* Content                                                           */
  /* ---------------------------------------------------------------- */
  content: {
    hero: {
      eyebrow: {
        en: '4.9 ★ from 633+ Google reviews',
        hi: '633+ गूगल समीक्षाओं में 4.9 ★',
        mr: '६३३+ गूगल अभिप्रायांमधून ४.९ ★',
      },
      headline: { en: 'Gentle, unhurried care for your', hi: 'आपके बच्चे के लिए', mr: 'तुमच्या मुलासाठी' },
      headlineAccent: { en: "child's health", hi: 'सौम्य और भरोसेमंद देखभाल', mr: 'सौम्य आणि विश्वासार्ह काळजी' },
      sub: {
        en: 'Newborn checks, genuinely painless WHO/IAP vaccination, growth tracking and childhood illness care — from a pediatrician trained in Mumbai and London.',
        hi: 'नवजात जाँच, वास्तव में दर्द रहित WHO/IAP टीकाकरण, विकास ट्रैकिंग और बचपन की बीमारियों का इलाज — मुंबई और लंदन में प्रशिक्षित बाल रोग विशेषज्ञ द्वारा।',
        mr: 'नवजात तपासणी, खरोखर वेदनारहित WHO/IAP लसीकरण, वाढीचा मागोवा आणि बालपणीच्या आजारांवर उपचार — मुंबई आणि लंडनमध्ये प्रशिक्षित बालरोगतज्ज्ञांकडून.',
      },
      primaryCta: { en: 'Book an appointment', hi: 'अपॉइंटमेंट बुक करें', mr: 'अपॉइंटमेंट बुक करा' },
      secondaryCta: { en: 'Check symptoms — 60 sec', hi: 'लक्षण जाँचें — 60 सेकंड', mr: 'लक्षणे तपासा — ६० सेकंद' },
      badges: [
        {
          icon: 'ShieldCheck',
          title: { en: 'Cold-chain vaccines', hi: 'कोल्ड-चेन टीके', mr: 'कोल्ड-चेन लसी' },
          detail: { en: 'Logged 2–8°C storage', hi: '2–8°C भंडारण, रिकॉर्ड सहित', mr: '२–८°C साठवण, नोंदीसह' },
        },
        {
          icon: 'HeartHandshake',
          title: { en: 'Painless technique', hi: 'दर्द रहित तकनीक', mr: 'वेदनारहित पद्धत' },
          detail: { en: 'Most babies do not cry', hi: 'ज़्यादातर शिशु रोते नहीं', mr: 'बहुतेक बाळे रडत नाहीत' },
        },
        {
          icon: 'Award',
          title: { en: 'London qualified', hi: 'लंदन से योग्यता', mr: 'लंडनमधून पात्रता' },
          detail: { en: 'MRCPCH • 18 years', hi: 'MRCPCH • 18 वर्ष', mr: 'MRCPCH • १८ वर्षे' },
        },
      ],
      highlights: [
        { en: 'No unnecessary antibiotics — ever', hi: 'बिना ज़रूरत एंटीबायोटिक कभी नहीं', mr: 'अनावश्यक अँटिबायोटिक्स कधीच नाहीत' },
        { en: 'Average wait under 20 minutes when booked', hi: 'बुकिंग पर औसत प्रतीक्षा 20 मिनट से कम', mr: 'बुकिंग केल्यास सरासरी प्रतीक्षा २० मिनिटांपेक्षा कमी' },
        { en: 'English • हिन्दी • मराठी', hi: 'English • हिन्दी • मराठी', mr: 'English • हिन्दी • मराठी' },
      ],
    },

    logoStrip: {
      title: { en: 'Protocols we follow', hi: 'हम जिन मानकों का पालन करते हैं', mr: 'आम्ही पाळत असलेली मानके' },
      items: [
        { icon: 'ShieldCheck', label: { en: 'WHO immunisation standards', hi: 'WHO टीकाकरण मानक', mr: 'WHO लसीकरण मानके' } },
        { icon: 'BadgeCheck', label: { en: 'IAP schedule (India)', hi: 'IAP शेड्यूल (भारत)', mr: 'IAP वेळापत्रक (भारत)' } },
        { icon: 'Crown', label: { en: 'MRCPCH, London', hi: 'MRCPCH, लंदन', mr: 'MRCPCH, लंडन' } },
        { icon: 'Award', label: { en: 'DNB Pediatrics', hi: 'DNB बाल रोग', mr: 'DNB बालरोग' } },
        { icon: 'HeartPulse', label: { en: 'NICU-trained neonatal care', hi: 'NICU-प्रशिक्षित नवजात देखभाल', mr: 'NICU-प्रशिक्षित नवजात काळजी' } },
        { icon: 'Thermometer', label: { en: 'Cold-chain logged storage', hi: 'कोल्ड-चेन रिकॉर्डेड भंडारण', mr: 'कोल्ड-चेन नोंदीसह साठवण' } },
      ],
    },

    stats: [
      {
        label: { en: 'Google rating', hi: 'गूगल रेटिंग', mr: 'गूगल रेटिंग' },
        value: '4.9 ★',
        subtext: { en: 'From 633+ verified reviews', hi: '633+ सत्यापित समीक्षाओं से', mr: '६३३+ पडताळलेल्या अभिप्रायांतून' },
        icon: 'Star',
      },
      {
        label: { en: 'Children cared for', hi: 'बच्चों का इलाज', mr: 'उपचार केलेली मुले' },
        value: '25,000+',
        subtext: { en: 'Across Vasai-Virar since 2018', hi: '2018 से वसई-विरार में', mr: '२०१८ पासून वसई-विरारमध्ये' },
        icon: 'Baby',
      },
      {
        label: { en: 'Clinical experience', hi: 'चिकित्सकीय अनुभव', mr: 'वैद्यकीय अनुभव' },
        value: '18+ yrs',
        subtext: { en: 'Mumbai & London trained', hi: 'मुंबई और लंदन में प्रशिक्षित', mr: 'मुंबई व लंडनमध्ये प्रशिक्षित' },
        icon: 'Stethoscope',
      },
      {
        label: { en: 'Vaccines administered', hi: 'लगाए गए टीके', mr: 'दिलेल्या लसी' },
        value: '40,000+',
        subtext: { en: '100% cold-chain logged', hi: '100% कोल्ड-चेन रिकॉर्डेड', mr: '१००% कोल्ड-चेन नोंदीसह' },
        icon: 'Syringe',
      },
    ],

    services: [
      {
        id: 'newborn-care',
        category: { en: 'Newborn', hi: 'नवजात', mr: 'नवजात' },
        title: { en: 'Newborn & infant health checks', hi: 'नवजात एवं शिशु स्वास्थ्य जाँच', mr: 'नवजात व अर्भक आरोग्य तपासणी' },
        icon: 'Baby',
        shortDesc: {
          en: 'Neonatal screening, jaundice assessment, feeding support and weight tracking in the critical first weeks.',
          hi: 'शुरुआती महत्वपूर्ण हफ़्तों में नवजात स्क्रीनिंग, पीलिया जाँच, दूध पिलाने में मदद और वज़न ट्रैकिंग।',
          mr: 'सुरुवातीच्या महत्त्वाच्या आठवड्यांत नवजात तपासणी, कावीळ मूल्यांकन, स्तनपान मदत आणि वजन नोंद.',
        },
        details: [
          { en: 'Jaundice (bilirubin) assessment and follow-up', hi: 'पीलिया (बिलीरुबिन) जाँच और फ़ॉलो-अप', mr: 'कावीळ (बिलिरुबिन) तपासणी व फॉलो-अप' },
          { en: 'Lactation and feeding-pattern counselling for mothers', hi: 'माताओं के लिए स्तनपान एवं फीडिंग परामर्श', mr: 'मातांसाठी स्तनपान व आहार पद्धती समुपदेशन' },
          { en: 'Weight, length and head-circumference plotting', hi: 'वज़न, लंबाई और सिर की परिधि का चार्ट', mr: 'वजन, लांबी व डोक्याचा घेर आलेख' },
          { en: 'Umbilical cord and newborn skin care guidance', hi: 'नाभि और नवजात त्वचा देखभाल मार्गदर्शन', mr: 'नाळ व नवजात त्वचेची काळजी मार्गदर्शन' },
        ],
        duration: { en: '20–30 min', hi: '20–30 मिनट', mr: '२०–३० मिनिटे' },
        aftercare: { en: 'Nothing needed afterwards', hi: 'बाद में कुछ नहीं चाहिए', mr: 'नंतर काहीही आवश्यक नाही' },
        popular: true,
      },
      {
        id: 'vaccination',
        category: { en: 'Prevention', hi: 'रोकथाम', mr: 'प्रतिबंध' },
        title: { en: 'Painless WHO & IAP vaccination', hi: 'दर्द रहित WHO एवं IAP टीकाकरण', mr: 'वेदनारहित WHO व IAP लसीकरण' },
        icon: 'Syringe',
        shortDesc: {
          en: 'The complete national schedule, given with a technique most babies sleep through.',
          hi: 'पूरा राष्ट्रीय शेड्यूल, ऐसी तकनीक से जिसमें ज़्यादातर शिशु सोते ही रह जाते हैं।',
          mr: 'संपूर्ण राष्ट्रीय वेळापत्रक, अशा पद्धतीने की बहुतेक बाळे झोपेतच राहतात.',
        },
        details: [
          { en: 'Full WHO and Indian Academy of Pediatrics schedule', hi: 'संपूर्ण WHO और इंडियन एकेडमी ऑफ़ पीडियाट्रिक्स शेड्यूल', mr: 'संपूर्ण WHO व इंडियन अकॅडमी ऑफ पीडियाट्रिक्स वेळापत्रक' },
          { en: 'Painless technique — distraction, positioning, rapid delivery', hi: 'दर्द रहित तकनीक — ध्यान बँटाना, सही पोज़िशन, तेज़ इंजेक्शन', mr: 'वेदनारहित पद्धत — लक्ष विचलित करणे, योग्य स्थिती, जलद इंजेक्शन' },
          { en: 'Temperature-logged 2–8°C cold-chain storage', hi: 'तापमान रिकॉर्ड सहित 2–8°C कोल्ड-चेन भंडारण', mr: 'तापमान नोंदीसह २–८°C कोल्ड-चेन साठवण' },
          { en: 'Free WhatsApp reminders before every due date', hi: 'हर ड्यू डेट से पहले मुफ़्त व्हाट्सएप रिमाइंडर', mr: 'प्रत्येक तारखेपूर्वी मोफत व्हॉट्सअॅप स्मरणपत्र' },
        ],
        duration: { en: '15 min', hi: '15 मिनट', mr: '१५ मिनिटे' },
        aftercare: { en: 'Watch for mild fever for 24h', hi: '24 घंटे हल्के बुखार पर नज़र रखें', mr: '२४ तास सौम्य तापावर लक्ष ठेवा' },
        popular: true,
      },
      {
        id: 'growth-milestones',
        category: { en: 'Development', hi: 'विकास', mr: 'विकास' },
        title: { en: 'Growth & milestone screening', hi: 'विकास एवं माइलस्टोन जाँच', mr: 'वाढ व विकासाचे टप्पे तपासणी' },
        icon: 'TrendingUp',
        shortDesc: {
          en: 'WHO percentile plotting plus speech, motor and social development review.',
          hi: 'WHO पर्सेंटाइल चार्ट के साथ बोलने, चलने-फिरने और सामाजिक विकास की समीक्षा।',
          mr: 'WHO पर्सेंटाईल आलेखासह बोलणे, हालचाल व सामाजिक विकासाचा आढावा.',
        },
        details: [
          { en: 'Weight, height and head-circumference percentile plotting', hi: 'वज़न, लंबाई और सिर परिधि का पर्सेंटाइल चार्ट', mr: 'वजन, उंची व डोक्याच्या घेराचा पर्सेंटाईल आलेख' },
          { en: 'Speech, walking and social milestone assessment', hi: 'बोलने, चलने और सामाजिक माइलस्टोन का आकलन', mr: 'बोलणे, चालणे व सामाजिक टप्प्यांचे मूल्यांकन' },
          { en: 'Appetite and nutrition planning', hi: 'भूख और पोषण की योजना', mr: 'भूक व पोषण नियोजन' },
          { en: 'Vitamin D, calcium and iron deficiency screening', hi: 'विटामिन डी, कैल्शियम और आयरन की कमी की जाँच', mr: 'व्हिटॅमिन डी, कॅल्शियम व लोह कमतरता तपासणी' },
        ],
        duration: { en: '20 min', hi: '20 मिनट', mr: '२० मिनिटे' },
        aftercare: { en: 'Nothing needed afterwards', hi: 'बाद में कुछ नहीं चाहिए', mr: 'नंतर काहीही आवश्यक नाही' },
      },
      {
        id: 'pediatric-illnesses',
        category: { en: 'Treatment', hi: 'इलाज', mr: 'उपचार' },
        title: { en: 'Fever, cough & infection treatment', hi: 'बुखार, खाँसी एवं संक्रमण का इलाज', mr: 'ताप, खोकला व संसर्ग उपचार' },
        icon: 'Thermometer',
        shortDesc: {
          en: 'Evidence-based diagnosis for seasonal fevers, throat infections and stomach bugs.',
          hi: 'मौसमी बुखार, गले के संक्रमण और पेट की बीमारियों का प्रमाण-आधारित निदान।',
          mr: 'हंगामी ताप, घशाचे संसर्ग व पोटाच्या तक्रारींचे पुराव्यावर आधारित निदान.',
        },
        details: [
          { en: 'Judicious antibiotic policy — no "just in case" prescriptions', hi: 'विवेकपूर्ण एंटीबायोटिक नीति — "एहतियात के लिए" कोई दवा नहीं', mr: 'विवेकी अँटिबायोटिक धोरण — "काळजी म्हणून" औषध नाही' },
          { en: 'Rapid fever management and dehydration prevention', hi: 'तेज़ बुखार प्रबंधन और निर्जलीकरण से बचाव', mr: 'जलद ताप व्यवस्थापन व निर्जलीकरण प्रतिबंध' },
          { en: 'Stomach infection, vomiting and diarrhoea care', hi: 'पेट संक्रमण, उल्टी और दस्त की देखभाल', mr: 'पोटाचा संसर्ग, उलटी व जुलाब उपचार' },
          { en: 'Ear infection and throat evaluation', hi: 'कान संक्रमण और गले की जाँच', mr: 'कानाचा संसर्ग व घशाची तपासणी' },
        ],
        duration: { en: '15–20 min', hi: '15–20 मिनट', mr: '१५–२० मिनिटे' },
        aftercare: { en: 'Typically 1–3 days recovery', hi: 'आमतौर पर 1–3 दिन में ठीक', mr: 'सहसा १–३ दिवसांत बरे' },
        popular: true,
      },
      {
        id: 'asthma-allergy',
        category: { en: 'Respiratory', hi: 'श्वसन', mr: 'श्वसन' },
        title: { en: 'Childhood asthma & nebulisation', hi: 'बचपन का अस्थमा एवं नेबुलाइज़ेशन', mr: 'बालदमा व नेब्युलायझेशन' },
        icon: 'Wind',
        shortDesc: {
          en: 'In-clinic sterile nebulisation, wheeze management and allergy care.',
          hi: 'क्लिनिक में स्टेराइल नेबुलाइज़ेशन, साँस की घरघराहट का प्रबंधन और एलर्जी देखभाल।',
          mr: 'क्लिनिकमध्ये निर्जंतुक नेब्युलायझेशन, घरघर व्यवस्थापन आणि अ‍ॅलर्जी उपचार.',
        },
        details: [
          { en: 'In-clinic sterile aerosol nebulisation', hi: 'क्लिनिक में स्टेराइल एरोसोल नेबुलाइज़ेशन', mr: 'क्लिनिकमध्ये निर्जंतुक एरोसोल नेब्युलायझेशन' },
          { en: 'Allergic rhinitis and wheeze relief', hi: 'एलर्जिक राइनाइटिस और घरघराहट से राहत', mr: 'अ‍ॅलर्जिक नासिकाशोथ व घरघरीपासून आराम' },
          { en: 'Infant eczema and sensitive-skin protocols', hi: 'शिशु एक्ज़िमा और संवेदनशील त्वचा प्रोटोकॉल', mr: 'बालकांचा एक्झिमा व संवेदनशील त्वचेसाठी उपचार' },
          { en: 'Dust and seasonal allergy prevention planning', hi: 'धूल और मौसमी एलर्जी से बचाव की योजना', mr: 'धूळ व हंगामी अ‍ॅलर्जी प्रतिबंध नियोजन' },
        ],
        duration: { en: '15–25 min', hi: '15–25 मिनट', mr: '१५–२५ मिनिटे' },
        aftercare: { en: 'Breathing relief is usually immediate', hi: 'साँस में राहत आमतौर पर तुरंत', mr: 'श्वासात आराम सहसा लगेच' },
      },
      {
        id: 'nutrition-diet',
        category: { en: 'Nutrition', hi: 'पोषण', mr: 'पोषण' },
        title: { en: 'Diet & feeding counselling', hi: 'आहार एवं फीडिंग परामर्श', mr: 'आहार व स्तनपान समुपदेशन' },
        icon: 'Apple',
        shortDesc: {
          en: 'Practical plans for picky eaters, low weight gain and anaemia prevention.',
          hi: 'नखरे करके खाने वाले बच्चों, कम वज़न बढ़ने और खून की कमी से बचाव की व्यावहारिक योजना।',
          mr: 'खाण्यास नखरे करणारी मुले, कमी वजनवाढ आणि रक्तक्षय प्रतिबंधासाठी व्यावहारिक योजना.',
        },
        details: [
          { en: 'Weaning and solid-food transition plans (6 months+)', hi: 'ऊपरी आहार शुरू करने की योजना (6 महीने+)', mr: 'वरचे अन्न सुरू करण्याची योजना (६ महिने+)' },
          { en: 'Behavioural strategy for picky eaters', hi: 'नखरे करने वाले बच्चों के लिए व्यवहार रणनीति', mr: 'नखरे करणाऱ्या मुलांसाठी वर्तन धोरण' },
          { en: 'Iron-deficiency anaemia screening and diet charts', hi: 'आयरन की कमी से खून की कमी की जाँच और डाइट चार्ट', mr: 'लोहाच्या कमतरतेमुळे रक्तक्षय तपासणी व आहार तक्ता' },
          { en: 'Healthy weight-gain protocols for toddlers', hi: 'छोटे बच्चों के लिए स्वस्थ वज़न बढ़ाने के तरीके', mr: 'लहान मुलांसाठी निरोगी वजनवाढ पद्धती' },
        ],
        duration: { en: '20 min', hi: '20 मिनट', mr: '२० मिनिटे' },
        aftercare: { en: 'Nothing needed afterwards', hi: 'बाद में कुछ नहीं चाहिए', mr: 'नंतर काहीही आवश्यक नाही' },
      },
    ],

    process: {
      title: { en: 'What a visit actually looks like', hi: 'विज़िट असल में कैसी होती है', mr: 'भेट प्रत्यक्षात कशी असते' },
      sub: {
        en: 'No mystery, no surprise charges. Four steps from message to follow-up.',
        hi: 'कोई उलझन नहीं, कोई छिपा शुल्क नहीं। संदेश से फ़ॉलो-अप तक चार चरण।',
        mr: 'कोणताही गोंधळ नाही, छुपे शुल्क नाही. संदेशापासून फॉलो-अपपर्यंत चार पायऱ्या.',
      },
      steps: [
        {
          icon: 'MessageSquare',
          title: { en: 'Message us', hi: 'हमें संदेश भेजें', mr: 'आम्हाला संदेश पाठवा' },
          detail: {
            en: 'Send your child’s age and the concern on WhatsApp. You get a slot confirmation, usually within the hour during clinic times.',
            hi: 'व्हाट्सएप पर बच्चे की उम्र और समस्या भेजें। क्लिनिक समय में आमतौर पर एक घंटे के भीतर स्लॉट की पुष्टि मिल जाती है।',
            mr: 'व्हॉट्सअॅपवर मुलाचे वय आणि तक्रार पाठवा. क्लिनिक वेळेत सहसा एका तासात स्लॉटची पुष्टी मिळते.',
          },
          meta: { en: 'About 2 minutes', hi: 'लगभग 2 मिनट', mr: 'सुमारे २ मिनिटे' },
        },
        {
          icon: 'Clock',
          title: { en: 'Arrive & settle', hi: 'पहुँचें और बैठें', mr: 'पोहोचा व बसा' },
          detail: {
            en: 'Booked appointments are seen within about 20 minutes. There are toys, books and a changing area while you wait.',
            hi: 'बुक की गई अपॉइंटमेंट लगभग 20 मिनट में देखी जाती है। इंतज़ार के दौरान खिलौने, किताबें और चेंजिंग एरिया उपलब्ध है।',
            mr: 'बुक केलेल्या अपॉइंटमेंट सुमारे २० मिनिटांत पाहिल्या जातात. प्रतीक्षेदरम्यान खेळणी, पुस्तके व चेंजिंग एरिया आहे.',
          },
          meta: { en: 'Under 20 min wait', hi: '20 मिनट से कम प्रतीक्षा', mr: '२० मिनिटांपेक्षा कमी प्रतीक्षा' },
        },
        {
          icon: 'Stethoscope',
          title: { en: 'Unhurried consultation', hi: 'बिना जल्दबाज़ी परामर्श', mr: 'घाई नसलेला सल्ला' },
          detail: {
            en: 'Full examination, growth plotting, and a clear explanation of what is happening and why — before any prescription is written.',
            hi: 'पूरी जाँच, विकास चार्ट, और यह स्पष्ट समझाना कि क्या और क्यों हो रहा है — दवा लिखने से पहले।',
            mr: 'संपूर्ण तपासणी, वाढीचा आलेख, आणि काय व का होत आहे याचे स्पष्ट स्पष्टीकरण — औषध लिहिण्यापूर्वी.',
          },
          meta: { en: '15–30 minutes', hi: '15–30 मिनट', mr: '१५–३० मिनिटे' },
        },
        {
          icon: 'HeartHandshake',
          title: { en: 'Follow-up that follows you', hi: 'फ़ॉलो-अप जो साथ चलता है', mr: 'सोबत राहणारा फॉलो-अप' },
          detail: {
            en: 'Written instructions, a WhatsApp line for the next 48 hours, and an automatic reminder before the next vaccine is due.',
            hi: 'लिखित निर्देश, अगले 48 घंटे के लिए व्हाट्सएप सहायता, और अगले टीके से पहले स्वतः रिमाइंडर।',
            mr: 'लेखी सूचना, पुढील ४८ तासांसाठी व्हॉट्सअॅप मदत, आणि पुढील लसीपूर्वी स्वयंचलित स्मरणपत्र.',
          },
          meta: { en: 'Included, no charge', hi: 'शामिल, कोई शुल्क नहीं', mr: 'समाविष्ट, कोणतेही शुल्क नाही' },
        },
      ],
    },

    gallery: [
      {
        src: '/clinic_hero.jpg',
        title: { en: 'Consultation room', hi: 'परामर्श कक्ष', mr: 'सल्ला कक्ष' },
        caption: {
          en: 'Warm, child-scaled and quiet — designed so children are not frightened of the visit.',
          hi: 'गर्मजोशी भरा, बच्चों के अनुकूल और शांत — ताकि बच्चे विज़िट से न डरें।',
          mr: 'उबदार, मुलांसाठी अनुकूल आणि शांत — जेणेकरून मुले भेटीला घाबरणार नाहीत.',
        },
      },
      {
        src: '/clinic_exterior.jpg',
        title: { en: 'Clinic entrance', hi: 'क्लिनिक प्रवेश', mr: 'क्लिनिक प्रवेशद्वार' },
        caption: {
          en: 'Ground floor on PNB lane, Agrawal Nagri. Step-free access with a pram.',
          hi: 'PNB लेन, अग्रवाल नगरी में ग्राउंड फ्लोर। प्रैम के साथ बिना सीढ़ी प्रवेश।',
          mr: 'PNB लेन, अग्रवाल नगरी येथे तळमजला. प्रॅमसह पायऱ्यांशिवाय प्रवेश.',
        },
      },
      {
        src: '/doctor_portrait.jpg',
        title: { en: 'Dr. Mahesh Mete', hi: 'डॉ. महेश मेटे', mr: 'डॉ. महेश मेटे' },
        caption: {
          en: 'MBBS • DNB Pediatrics • MRCPCH (London) • 18 years in practice.',
          hi: 'MBBS • DNB बाल रोग • MRCPCH (लंदन) • 18 वर्ष का अनुभव।',
          mr: 'MBBS • DNB बालरोग • MRCPCH (लंडन) • १८ वर्षांचा अनुभव.',
        },
      },
    ],

    reviews: [
      {
        id: 1, author: 'Pooja Sharma', rating: 5,
        date: { en: '2 weeks ago', hi: '2 हफ़्ते पहले', mr: '२ आठवड्यांपूर्वी' },
        relation: { en: 'Mother of an 8-month-old', hi: '8 महीने के बच्चे की माँ', mr: '८ महिन्यांच्या बाळाची आई' },
        tags: [{ en: 'Vaccination', hi: 'टीकाकरण', mr: 'लसीकरण' }, { en: 'Painless', hi: 'दर्द रहित', mr: 'वेदनारहित' }],
        verified: true, helpfulCount: 24,
        text: {
          en: 'Hands down the best pediatrician in Vasai-Nalasopara. He gave my baby her vaccination without her crying at all. He explains everything in detail and never prescribes heavy medicines unnecessarily.',
          hi: 'वसई-नालासोपारा के सबसे अच्छे बाल रोग विशेषज्ञ। उन्होंने मेरी बेटी को टीका लगाया और वह बिल्कुल नहीं रोई। वे हर बात विस्तार से समझाते हैं और बिना ज़रूरत भारी दवाइयाँ कभी नहीं देते।',
          mr: 'वसई-नालासोपाऱ्यातील सर्वोत्तम बालरोगतज्ज्ञ. त्यांनी माझ्या मुलीला लस दिली आणि ती अजिबात रडली नाही. ते प्रत्येक गोष्ट सविस्तर समजावून सांगतात आणि विनाकारण जड औषधे कधीच देत नाहीत.',
        },
      },
      {
        id: 2, author: 'Rahul Verma', rating: 5,
        date: { en: '1 month ago', hi: '1 महीने पहले', mr: '१ महिन्यापूर्वी' },
        relation: { en: 'Father of a 3-year-old', hi: '3 साल के बच्चे के पिता', mr: '३ वर्षांच्या मुलाचे वडील' },
        tags: [{ en: 'Fever', hi: 'बुखार', mr: 'ताप' }, { en: 'After hours', hi: 'समय के बाद', mr: 'वेळेनंतर' }],
        verified: true, helpfulCount: 19,
        text: {
          en: 'Very calm and knowledgeable. My son had a high viral fever at night. Dr. Mete guided us over the phone, and when we visited the clinic his treatment brought the fever down within hours.',
          hi: 'बहुत शांत और जानकार डॉक्टर। रात में मेरे बेटे को तेज़ वायरल बुखार था। डॉ. मेटे ने फ़ोन पर मार्गदर्शन किया, और क्लिनिक जाने पर उनके इलाज से कुछ ही घंटों में बुखार उतर गया।',
          mr: 'अतिशय शांत आणि ज्ञानी डॉक्टर. रात्री माझ्या मुलाला जोरदार व्हायरल ताप होता. डॉ. मेटे यांनी फोनवर मार्गदर्शन केले, आणि क्लिनिकला गेल्यावर त्यांच्या उपचाराने काही तासांतच ताप उतरला.',
        },
      },
      {
        id: 3, author: 'Anjali Gupta', rating: 5,
        date: { en: '2 months ago', hi: '2 महीने पहले', mr: '२ महिन्यांपूर्वी' },
        relation: { en: 'Mother of a newborn', hi: 'नवजात की माँ', mr: 'नवजात बाळाची आई' },
        tags: [{ en: 'Newborn', hi: 'नवजात', mr: 'नवजात' }, { en: 'Hygiene', hi: 'स्वच्छता', mr: 'स्वच्छता' }],
        verified: true, helpfulCount: 31,
        text: {
          en: 'We have been visiting since my daughter was born. His London training really shows in the diagnosis. The clinic is clean, child-friendly and very hygienic.',
          hi: 'मेरी बेटी के जन्म से ही हम यहाँ आ रहे हैं। उनके निदान में लंदन की ट्रेनिंग साफ़ झलकती है। क्लिनिक साफ़, बच्चों के अनुकूल और बहुत स्वच्छ है।',
          mr: 'माझ्या मुलीच्या जन्मापासून आम्ही येथे येत आहोत. त्यांच्या निदानात लंडनचे प्रशिक्षण स्पष्ट दिसते. क्लिनिक स्वच्छ, मुलांसाठी अनुकूल आणि अतिशय आरोग्यदायी आहे.',
        },
      },
      {
        id: 4, author: 'Vikram Patil', rating: 5,
        date: { en: '3 months ago', hi: '3 महीने पहले', mr: '३ महिन्यांपूर्वी' },
        relation: { en: 'Father of a 5-year-old', hi: '5 साल के बच्चे के पिता', mr: '५ वर्षांच्या मुलाचे वडील' },
        tags: [{ en: 'Waiting time', hi: 'प्रतीक्षा समय', mr: 'प्रतीक्षा वेळ' }, { en: 'Value', hi: 'किफ़ायती', mr: 'किफायतशीर' }],
        verified: true, helpfulCount: 15,
        text: {
          en: 'Proper guidance on vaccination and growth. No long waiting if you book an appointment. Extremely polite staff and a reasonable ₹500 consultation fee.',
          hi: 'टीकाकरण और विकास पर सही मार्गदर्शन। अपॉइंटमेंट बुक करने पर लंबा इंतज़ार नहीं। बेहद विनम्र स्टाफ़ और ₹500 का उचित परामर्श शुल्क।',
          mr: 'लसीकरण व वाढीबाबत योग्य मार्गदर्शन. अपॉइंटमेंट बुक केल्यास लांब प्रतीक्षा नाही. अतिशय नम्र कर्मचारी आणि ₹५०० चे रास्त सल्ला शुल्क.',
        },
      },
      {
        id: 5, author: 'Sneha Kulkarni', rating: 5,
        date: { en: '4 months ago', hi: '4 महीने पहले', mr: '४ महिन्यांपूर्वी' },
        relation: { en: 'Mother of twins', hi: 'जुड़वाँ बच्चों की माँ', mr: 'जुळ्या मुलांची आई' },
        tags: [{ en: 'Growth', hi: 'विकास', mr: 'वाढ' }, { en: 'Nutrition', hi: 'पोषण', mr: 'पोषण' }],
        verified: true, helpfulCount: 22,
        text: {
          en: 'One of my twins was not gaining weight. Instead of pushing supplements, Dr. Mete worked through the feeding pattern with us. Three months later both are on the same curve.',
          hi: 'मेरे जुड़वाँ बच्चों में से एक का वज़न नहीं बढ़ रहा था। सप्लीमेंट देने के बजाय डॉ. मेटे ने हमारे साथ मिलकर फीडिंग पैटर्न सुधारा। तीन महीने बाद दोनों एक ही ग्रोथ कर्व पर हैं।',
          mr: 'माझ्या जुळ्यांपैकी एकाचे वजन वाढत नव्हते. सप्लिमेंट देण्याऐवजी डॉ. मेटे यांनी आमच्यासोबत आहाराची पद्धत सुधारली. तीन महिन्यांनंतर दोघेही एकाच वाढीच्या रेषेवर आहेत.',
        },
      },
      {
        id: 6, author: 'Imran Shaikh', rating: 5,
        date: { en: '5 months ago', hi: '5 महीने पहले', mr: '५ महिन्यांपूर्वी' },
        relation: { en: 'Father of a 2-year-old', hi: '2 साल के बच्चे के पिता', mr: '२ वर्षांच्या मुलाचे वडील' },
        tags: [{ en: 'Asthma', hi: 'अस्थमा', mr: 'दमा' }, { en: 'Nebulisation', hi: 'नेबुलाइज़ेशन', mr: 'नेब्युलायझेशन' }],
        verified: true, helpfulCount: 17,
        text: {
          en: 'My son gets a wheeze every winter. The nebulisation here is quick and the doctor took time to show us how to use the inhaler correctly at home. Fewer episodes this year.',
          hi: 'हर सर्दी में मेरे बेटे को घरघराहट होती है। यहाँ नेबुलाइज़ेशन तेज़ है और डॉक्टर ने समय निकालकर घर पर इनहेलर सही तरीके से इस्तेमाल करना सिखाया। इस साल कम बार दिक़्क़त हुई।',
          mr: 'दरवर्षी हिवाळ्यात माझ्या मुलाला घरघर होते. इथले नेब्युलायझेशन जलद आहे आणि डॉक्टरांनी वेळ काढून घरी इनहेलर योग्य पद्धतीने कसा वापरायचा हे शिकवले. यावर्षी त्रास कमी झाला.',
        },
      },
    ],

    resources: {
      title: { en: 'Parent guides', hi: 'माता-पिता के लिए गाइड', mr: 'पालकांसाठी मार्गदर्शक' },
      sub: {
        en: 'The questions asked most often at the clinic, answered properly.',
        hi: 'क्लिनिक में सबसे ज़्यादा पूछे जाने वाले सवाल, विस्तार से जवाब सहित।',
        mr: 'क्लिनिकमध्ये सर्वाधिक विचारले जाणारे प्रश्न, सविस्तर उत्तरांसह.',
      },
      items: [
        {
          icon: 'Thermometer',
          tag: { en: 'Fever', hi: 'बुखार', mr: 'ताप' },
          title: { en: 'When a fever actually needs a doctor', hi: 'बुखार में डॉक्टर की ज़रूरत कब होती है', mr: 'तापासाठी डॉक्टरांची गरज कधी असते' },
          summary: {
            en: 'Most fevers are the immune system doing its job. These are the specific signs that change the answer.',
            hi: 'ज़्यादातर बुखार शरीर की रोग प्रतिरोधक क्षमता का काम है। ये वे लक्षण हैं जो जवाब बदल देते हैं।',
            mr: 'बहुतेक ताप म्हणजे शरीराची प्रतिकारशक्ती काम करत असते. ही ती लक्षणे आहेत जी उत्तर बदलतात.',
          },
          points: [
            { en: 'Under 3 months old with any fever ≥ 100.4°F / 38°C — same day, always.', hi: '3 महीने से छोटा शिशु और बुखार ≥ 100.4°F / 38°C — उसी दिन, हमेशा।', mr: '३ महिन्यांखालील बाळ आणि ताप ≥ १००.४°F / ३८°C — त्याच दिवशी, नेहमी.' },
            { en: 'Fever past 5 days, or one that settles and returns after 24 hours.', hi: '5 दिन से ज़्यादा बुखार, या उतरकर 24 घंटे बाद फिर आ जाना।', mr: '५ दिवसांपेक्षा जास्त ताप, किंवा उतरून २४ तासांनी पुन्हा येणे.' },
            { en: 'Drowsiness, a stiff neck, or a rash that does not fade under a pressed glass.', hi: 'सुस्ती, गर्दन में अकड़न, या काँच से दबाने पर न मिटने वाले दाने।', mr: 'सुस्ती, मानेत ताठरपणा, किंवा काचेने दाबल्यावर न मिटणारे पुरळ.' },
            { en: 'Fewer than 3–4 wet nappies in 24 hours.', hi: '24 घंटे में 3–4 से कम गीले डायपर।', mr: '२४ तासांत ३–४ पेक्षा कमी ओले लंगोट.' },
          ],
        },
        {
          icon: 'Droplet',
          tag: { en: 'Hydration', hi: 'पानी की कमी', mr: 'पाण्याची कमतरता' },
          title: { en: 'Dehydration: the home check', hi: 'निर्जलीकरण: घर पर जाँच', mr: 'निर्जलीकरण: घरच्या घरी तपासणी' },
          summary: {
            en: 'With vomiting or loose motions, fluid loss matters far more than the infection itself.',
            hi: 'उल्टी या दस्त में, संक्रमण से कहीं ज़्यादा मायने रखता है शरीर से पानी का निकलना।',
            mr: 'उलटी किंवा जुलाबात, संसर्गापेक्षा शरीरातून पाणी कमी होणे जास्त महत्त्वाचे असते.',
          },
          points: [
            { en: 'ORS in small, frequent sips beats large drinks that come straight back up.', hi: 'थोड़ा-थोड़ा बार-बार ORS पिलाना, एक साथ ज़्यादा पिलाने से बेहतर है।', mr: 'थोडे थोडे वारंवार ORS देणे, एकदम जास्त देण्यापेक्षा चांगले.' },
            { en: 'Keep breastfeeding throughout — it is fluid and nutrition at once.', hi: 'स्तनपान जारी रखें — यह पानी और पोषण दोनों है।', mr: 'स्तनपान सुरू ठेवा — ते पाणी आणि पोषण दोन्ही आहे.' },
            { en: 'Warning signs: no tears, sunken eyes, unusual sleepiness, dry nappy for 8 hours.', hi: 'चेतावनी: आँसू न आना, आँखें धँसना, असामान्य नींद, 8 घंटे सूखा डायपर।', mr: 'धोक्याची चिन्हे: अश्रू न येणे, डोळे खोल जाणे, अतिझोप, ८ तास कोरडे लंगोट.' },
            { en: 'Avoid fizzy drinks and packaged juice — the sugar worsens loose motions.', hi: 'सोडा और पैकेट जूस न दें — चीनी दस्त बढ़ाती है।', mr: 'सोडा व पॅकेट ज्यूस देऊ नका — साखर जुलाब वाढवते.' },
          ],
        },
        {
          icon: 'Syringe',
          tag: { en: 'Vaccines', hi: 'टीके', mr: 'लसी' },
          title: { en: 'After the vaccine: what is normal', hi: 'टीके के बाद: क्या सामान्य है', mr: 'लसीनंतर: काय सामान्य आहे' },
          summary: {
            en: 'Mild reactions mean the vaccine is working. Here is where the line sits.',
            hi: 'हल्की प्रतिक्रिया का मतलब है टीका काम कर रहा है। सीमा यहाँ है।',
            mr: 'सौम्य प्रतिक्रिया म्हणजे लस काम करत आहे. मर्यादा इथे आहे.',
          },
          points: [
            { en: 'Mild fever, fussiness and a sore leg for up to 48 hours are expected.', hi: '48 घंटे तक हल्का बुखार, चिड़चिड़ापन और पैर में दर्द सामान्य है।', mr: '४८ तासांपर्यंत सौम्य ताप, चिडचिड आणि पायात दुखणे अपेक्षित आहे.' },
            { en: 'A firm lump at the injection site can persist for weeks — harmless.', hi: 'इंजेक्शन की जगह सख़्त गाँठ हफ़्तों रह सकती है — हानिरहित।', mr: 'इंजेक्शनच्या जागी टणक गाठ आठवडे राहू शकते — निरुपद्रवी.' },
            { en: 'Paracetamol at the dose we noted on your card is fine; do not pre-medicate.', hi: 'कार्ड पर लिखी मात्रा में पैरासिटामोल ठीक है; पहले से दवा न दें।', mr: 'कार्डवर लिहिलेल्या मात्रेत पॅरासिटामॉल ठीक; आधीच औषध देऊ नका.' },
            { en: 'Call us for a fever above 102°F, a fit, or any swelling of the face or lips.', hi: '102°F से ऊपर बुखार, दौरा, या चेहरे-होंठों में सूजन पर हमें कॉल करें।', mr: '१०२°F वरील ताप, फेफरे, किंवा चेहरा-ओठ सुजल्यास आम्हाला फोन करा.' },
          ],
        },
        {
          icon: 'Utensils',
          tag: { en: 'Feeding', hi: 'आहार', mr: 'आहार' },
          title: { en: 'Starting solids at six months', hi: 'छह महीने पर ऊपरी आहार शुरू करना', mr: 'सहा महिन्यांनी वरचे अन्न सुरू करणे' },
          summary: {
            en: 'Weaning goes better with a plan and worse with pressure. A simple first month.',
            hi: 'योजना के साथ ऊपरी आहार आसान होता है, दबाव से मुश्किल। पहला महीना सरल रखें।',
            mr: 'नियोजनाने वरचे अन्न सोपे होते, दबावाने कठीण. पहिला महिना साधा ठेवा.',
          },
          points: [
            { en: 'Start with a single soft food; wait 3 days before adding the next.', hi: 'एक नरम चीज़ से शुरू करें; अगली चीज़ 3 दिन बाद जोड़ें।', mr: 'एका मऊ पदार्थाने सुरुवात करा; पुढचा पदार्थ ३ दिवसांनी घाला.' },
            { en: 'Iron matters most — dal, ragi, egg yolk, well-mashed meat if you eat it.', hi: 'आयरन सबसे ज़रूरी — दाल, रागी, अंडे की ज़र्दी, अच्छी तरह मसला मांस।', mr: 'लोह सर्वात महत्त्वाचे — डाळ, नाचणी, अंड्याचा बलक, नीट कुस्करलेले मांस.' },
            { en: 'Refusal is normal. A new food can take 10–15 exposures before acceptance.', hi: 'मना करना सामान्य है। नई चीज़ स्वीकारने में 10–15 बार लग सकते हैं।', mr: 'नकार देणे सामान्य आहे. नवीन पदार्थ स्वीकारायला १०–१५ वेळा लागू शकतात.' },
            { en: 'No added salt, sugar or honey before the first birthday.', hi: 'पहले जन्मदिन से पहले नमक, चीनी या शहद न दें।', mr: 'पहिल्या वाढदिवसापूर्वी मीठ, साखर किंवा मध देऊ नका.' },
          ],
        },
      ],
    },

    faqs: [
      {
        q: { en: 'What are the clinic hours?', hi: 'क्लिनिक का समय क्या है?', mr: 'क्लिनिकची वेळ काय आहे?' },
        a: {
          en: 'Monday to Saturday in two sessions — 11:00 AM to 1:30 PM and 6:30 PM to 9:00 PM. Sunday is closed, though existing patients can call for genuine emergencies at any time.',
          hi: 'सोमवार से शनिवार, दो सत्रों में — सुबह 11:00 से दोपहर 1:30 और शाम 6:30 से रात 9:00। रविवार बंद, लेकिन पुराने मरीज़ वास्तविक आपात स्थिति में कभी भी कॉल कर सकते हैं।',
          mr: 'सोमवार ते शनिवार, दोन सत्रांत — सकाळी ११:०० ते दुपारी १:३० आणि संध्याकाळी ६:३० ते रात्री ९:००. रविवार बंद, परंतु जुने रुग्ण खऱ्या आणीबाणीत कधीही फोन करू शकतात.',
        },
      },
      {
        q: { en: 'What does a consultation cost?', hi: 'परामर्श शुल्क कितना है?', mr: 'सल्ला शुल्क किती आहे?' },
        a: {
          en: '₹500, the same for a walk-in or a booked appointment. Vaccines are billed separately at MRP, and we will always tell you the cost before administering.',
          hi: '₹500 — वॉक-इन और बुक की गई अपॉइंटमेंट दोनों के लिए समान। टीके MRP पर अलग से, और लगाने से पहले हम हमेशा कीमत बता देते हैं।',
          mr: '₹५०० — वॉक-इन आणि बुक केलेल्या अपॉइंटमेंटसाठी समान. लसी MRP नुसार वेगळ्या, आणि देण्यापूर्वी आम्ही नेहमी किंमत सांगतो.',
        },
      },
      {
        q: { en: 'Do I need an appointment, or can I walk in?', hi: 'क्या अपॉइंटमेंट ज़रूरी है, या सीधे आ सकते हैं?', mr: 'अपॉइंटमेंट आवश्यक आहे का, की थेट येऊ शकतो?' },
        a: {
          en: 'Both work. Walk-ins are welcome and seen in turn; booking on WhatsApp usually brings the wait under 20 minutes, which matters a great deal with an unwell toddler.',
          hi: 'दोनों ठीक हैं। बिना अपॉइंटमेंट आने वालों को बारी से देखा जाता है; व्हाट्सएप पर बुकिंग से प्रतीक्षा आमतौर पर 20 मिनट से कम रहती है — बीमार बच्चे के साथ यह बहुत मायने रखता है।',
          mr: 'दोन्ही चालते. थेट येणाऱ्यांना क्रमाने पाहिले जाते; व्हॉट्सअॅपवर बुकिंग केल्यास प्रतीक्षा सहसा २० मिनिटांपेक्षा कमी असते — आजारी मुलासोबत हे खूप महत्त्वाचे ठरते.',
        },
      },
      {
        q: { en: 'Are the vaccines genuinely painless?', hi: 'क्या टीके वाक़ई दर्द रहित हैं?', mr: 'लसी खरोखर वेदनारहित आहेत का?' },
        a: {
          en: 'No injection is literally painless, but the combination of positioning, distraction and rapid delivery means most infants settle within seconds and many sleep through it. Parents consistently mention this in reviews.',
          hi: 'कोई भी इंजेक्शन पूरी तरह दर्द रहित नहीं होता, लेकिन सही पोज़िशन, ध्यान बँटाने और तेज़ी के मेल से ज़्यादातर शिशु कुछ ही सेकंड में शांत हो जाते हैं और कई तो सोते ही रहते हैं। माता-पिता समीक्षाओं में यह लगातार बताते हैं।',
          mr: 'कोणतेही इंजेक्शन पूर्णपणे वेदनारहित नसते, पण योग्य स्थिती, लक्ष विचलित करणे आणि जलदपणा यामुळे बहुतेक बाळे काही सेकंदांत शांत होतात आणि अनेक झोपेतच राहतात. पालक अभिप्रायांत हे सातत्याने नमूद करतात.',
        },
      },
      {
        q: { en: 'How are the vaccines stored?', hi: 'टीके कैसे रखे जाते हैं?', mr: 'लसी कशा साठवल्या जातात?' },
        a: {
          en: 'In a dedicated medical refrigerator held between 2°C and 8°C, with the temperature logged. Vaccines are sourced only through authorised cold-chain distribution.',
          hi: 'एक अलग मेडिकल रेफ्रिजरेटर में 2°C से 8°C के बीच, तापमान रिकॉर्ड के साथ। टीके केवल अधिकृत कोल्ड-चेन वितरण से ही लिए जाते हैं।',
          mr: 'स्वतंत्र वैद्यकीय रेफ्रिजरेटरमध्ये २°C ते ८°C दरम्यान, तापमान नोंदीसह. लसी फक्त अधिकृत कोल्ड-चेन वितरणातूनच घेतल्या जातात.',
        },
      },
      {
        q: { en: 'Which languages does Dr. Mete speak?', hi: 'डॉ. मेटे कौन सी भाषाएँ बोलते हैं?', mr: 'डॉ. मेटे कोणत्या भाषा बोलतात?' },
        a: {
          en: 'English, Hindi and Marathi — the consultation happens in whichever you are most comfortable with.',
          hi: 'अंग्रेज़ी, हिन्दी और मराठी — परामर्श उसी भाषा में होता है जिसमें आप सहज हों।',
          mr: 'इंग्रजी, हिंदी आणि मराठी — सल्ला तुम्हाला सोयीच्या असलेल्या भाषेत होतो.',
        },
      },
      {
        q: { en: 'Can I get advice over the phone?', hi: 'क्या फ़ोन पर सलाह मिल सकती है?', mr: 'फोनवर सल्ला मिळू शकतो का?' },
        a: {
          en: 'For an existing patient with a follow-up question, yes. A first assessment always needs an in-person examination — a child cannot be examined over a phone line.',
          hi: 'पुराने मरीज़ के फ़ॉलो-अप सवाल के लिए, हाँ। पहली जाँच के लिए हमेशा प्रत्यक्ष परीक्षण ज़रूरी है — बच्चे की जाँच फ़ोन पर नहीं हो सकती।',
          mr: 'जुन्या रुग्णाच्या फॉलो-अप प्रश्नासाठी, होय. पहिल्या तपासणीसाठी नेहमी प्रत्यक्ष तपासणी आवश्यक — मुलाची तपासणी फोनवर होऊ शकत नाही.',
        },
      },
      {
        q: { en: 'Where exactly is the clinic?', hi: 'क्लिनिक वास्तव में कहाँ है?', mr: 'क्लिनिक नेमके कुठे आहे?' },
        a: {
          en: 'B-13, PNB Lane, Vasai-Nalasopara Link Road, Agrawal Nagri, Nalasopara East 401209 — on the ground floor, opposite the Punjab National Bank lane. Roughly 8 minutes by auto from Nalasopara station.',
          hi: 'B-13, PNB लेन, वसई-नालासोपारा लिंक रोड, अग्रवाल नगरी, नालासोपारा ईस्ट 401209 — ग्राउंड फ्लोर, पंजाब नेशनल बैंक लेन के सामने। नालासोपारा स्टेशन से ऑटो द्वारा लगभग 8 मिनट।',
          mr: 'B-13, PNB लेन, वसई-नालासोपारा लिंक रोड, अग्रवाल नगरी, नालासोपारा ईस्ट ४०१२०९ — तळमजला, पंजाब नॅशनल बँक लेनसमोर. नालासोपारा स्थानकापासून रिक्षाने सुमारे ८ मिनिटे.',
        },
      },
    ],

    cta: {
      title: { en: 'Book a visit for your child', hi: 'अपने बच्चे के लिए विज़िट बुक करें', mr: 'तुमच्या मुलासाठी भेट बुक करा' },
      sub: {
        en: 'Send the details on WhatsApp and the clinic desk confirms your slot — usually within the hour during clinic times.',
        hi: 'व्हाट्सएप पर विवरण भेजें और क्लिनिक डेस्क आपका स्लॉट पक्का कर देगा — क्लिनिक समय में आमतौर पर एक घंटे के भीतर।',
        mr: 'व्हॉट्सअॅपवर तपशील पाठवा आणि क्लिनिक डेस्क तुमचा स्लॉट निश्चित करेल — क्लिनिक वेळेत सहसा एका तासात.',
      },
      primary: { en: 'Book on WhatsApp', hi: 'व्हाट्सएप पर बुक करें', mr: 'व्हॉट्सअॅपवर बुक करा' },
      secondary: { en: 'Call the clinic', hi: 'क्लिनिक को कॉल करें', mr: 'क्लिनिकला फोन करा' },
    },
  },

  /* ---------------------------------------------------------------- */
  /* Interactive tools                                                 */
  /* ---------------------------------------------------------------- */
  tools: {
    hub: {
      title: { en: 'Free tools for parents', hi: 'माता-पिता के लिए मुफ़्त टूल', mr: 'पालकांसाठी मोफत साधने' },
      sub: {
        en: 'Built from the questions asked most often in the consulting room. Everything runs in your browser — nothing is uploaded, nothing is stored on a server.',
        hi: 'क्लिनिक में सबसे ज़्यादा पूछे जाने वाले सवालों से बने। सब कुछ आपके ब्राउज़र में चलता है — कुछ भी अपलोड या सर्वर पर सेव नहीं होता।',
        mr: 'क्लिनिकमध्ये सर्वाधिक विचारल्या जाणाऱ्या प्रश्नांतून तयार. सर्व काही तुमच्या ब्राउझरमध्ये चालते — काहीही अपलोड किंवा सर्व्हरवर साठवले जात नाही.',
      },
      items: [
        {
          id: 'growth', icon: 'TrendingUp',
          title: { en: 'Growth percentile checker', hi: 'ग्रोथ पर्सेंटाइल जाँच', mr: 'वाढ पर्सेंटाईल तपासणी' },
          desc: { en: 'Plot weight, height and BMI against WHO standards for 0–5 years.', hi: '0–5 वर्ष के लिए WHO मानकों पर वज़न, लंबाई और BMI देखें।', mr: '०–५ वर्षांसाठी WHO मानकांवर वजन, उंची व BMI पहा.' },
          action: 'scroll', target: 'growth',
          badge: { en: 'WHO data', hi: 'WHO डेटा', mr: 'WHO डेटा' },
        },
        {
          id: 'vaccines', icon: 'Syringe',
          title: { en: 'Vaccination planner', hi: 'टीकाकरण प्लानर', mr: 'लसीकरण नियोजक' },
          desc: { en: 'Enter a date of birth for a dated IAP schedule with overdue alerts.', hi: 'जन्म तिथि डालें और तारीख़ों सहित IAP शेड्यूल व छूटे टीकों की चेतावनी पाएँ।', mr: 'जन्मतारीख टाका आणि तारखांसह IAP वेळापत्रक व राहिलेल्या लसींचा इशारा मिळवा.' },
          action: 'scroll', target: 'vaccines',
          badge: { en: 'IAP schedule', hi: 'IAP शेड्यूल', mr: 'IAP वेळापत्रक' },
        },
        {
          id: 'milestones', icon: 'ListChecks',
          title: { en: 'Milestone checklist', hi: 'माइलस्टोन चेकलिस्ट', mr: 'विकास टप्पे चेकलिस्ट' },
          desc: { en: 'Track speech, motor and social development stage by stage.', hi: 'बोलने, चलने-फिरने और सामाजिक विकास को चरण दर चरण ट्रैक करें।', mr: 'बोलणे, हालचाल व सामाजिक विकास टप्प्याटप्प्याने तपासा.' },
          action: 'scroll', target: 'milestones',
        },
        {
          id: 'triage', icon: 'Activity',
          title: { en: 'Symptom checker', hi: 'लक्षण जाँच', mr: 'लक्षण तपासणी' },
          desc: { en: 'Six questions to help you judge how urgently your child needs to be seen.', hi: 'छह सवाल, जिनसे पता चले कि बच्चे को कितनी जल्दी दिखाना ज़रूरी है।', mr: 'सहा प्रश्न, ज्यातून मुलाला किती तातडीने दाखवायचे हे कळेल.' },
          action: 'modal', target: 'triage',
          badge: { en: '60 sec', hi: '60 सेकंड', mr: '६० सेकंद' },
        },
        {
          id: 'dose', icon: 'Calculator',
          title: { en: 'Fever dose reference', hi: 'बुखार की दवा की मात्रा', mr: 'तापाच्या औषधाची मात्रा' },
          desc: { en: 'Weight-based paracetamol and ibuprofen ranges, with safety limits.', hi: 'वज़न के अनुसार पैरासिटामोल और इबुप्रोफेन की मात्रा, सुरक्षा सीमा सहित।', mr: 'वजनानुसार पॅरासिटामॉल व आयबुप्रोफेनची मात्रा, सुरक्षा मर्यादेसह.' },
          action: 'modal', target: 'dose',
        },
        {
          id: 'kit', icon: 'Bandage',
          title: { en: 'Home medicine kit', hi: 'घर की दवा पेटी', mr: 'घरची औषध पेटी' },
          desc: { en: 'What is genuinely worth keeping at home for a small child — and what is not.', hi: 'छोटे बच्चे के लिए घर में क्या रखना वाक़ई ज़रूरी है — और क्या नहीं।', mr: 'लहान मुलासाठी घरात खरोखर काय ठेवावे — आणि काय नाही.' },
          action: 'modal', target: 'kit',
        },
      ],
    },

    growth: {
      enabled: true,
      title: { en: 'WHO growth percentile checker', hi: 'WHO ग्रोथ पर्सेंटाइल जाँच', mr: 'WHO वाढ पर्सेंटाईल तपासणी' },
      sub: {
        en: 'Enter your child’s measurements to see where they sit against WHO Child Growth Standards, plotted on the real reference curves.',
        hi: 'अपने बच्चे के माप डालें और देखें कि वे WHO चाइल्ड ग्रोथ स्टैंडर्ड्स के असली रेफ़रेंस कर्व पर कहाँ हैं।',
        mr: 'तुमच्या मुलाची मापे टाका आणि ते WHO चाइल्ड ग्रोथ स्टँडर्ड्सच्या खऱ्या संदर्भ रेषांवर कुठे आहेत ते पहा.',
      },
      disclaimer: {
        en: 'This is a screening aid using WHO Child Growth Standards (0–5 years), not a diagnosis. A single reading matters far less than the trend over time — bring your growth card to a visit for a proper assessment.',
        hi: 'यह WHO चाइल्ड ग्रोथ स्टैंडर्ड्स (0–5 वर्ष) पर आधारित एक स्क्रीनिंग सहायता है, निदान नहीं। एक बार का माप, समय के साथ बनने वाले रुझान से कहीं कम मायने रखता है — सही आकलन के लिए अपना ग्रोथ कार्ड लेकर आएँ।',
        mr: 'हे WHO चाइल्ड ग्रोथ स्टँडर्ड्स (०–५ वर्षे) वर आधारित तपासणी साधन आहे, निदान नाही. एकदाचे माप, कालांतराने दिसणाऱ्या कलापेक्षा खूप कमी महत्त्वाचे — योग्य मूल्यांकनासाठी तुमचे ग्रोथ कार्ड घेऊन या.',
      },
    },

    vaccines: {
      enabled: true,
      title: { en: 'Personalised vaccination planner', hi: 'व्यक्तिगत टीकाकरण प्लानर', mr: 'वैयक्तिक लसीकरण नियोजक' },
      sub: {
        en: 'Enter a date of birth and get every due date calculated, with overdue doses flagged and a calendar file you can import.',
        hi: 'जन्म तिथि डालें और हर ड्यू डेट पाएँ — छूटी खुराकें चिह्नित, साथ ही कैलेंडर फ़ाइल भी।',
        mr: 'जन्मतारीख टाका आणि प्रत्येक तारीख मिळवा — राहिलेल्या मात्रा चिन्हांकित, सोबत कॅलेंडर फाइलही.',
      },
      protocol: { en: 'IAP / WHO schedule followed in India', hi: 'भारत में प्रचलित IAP / WHO शेड्यूल', mr: 'भारतात वापरले जाणारे IAP / WHO वेळापत्रक' },
      graceDays: 30,
      schedule: [
        { id: 'birth', label: { en: 'At birth', hi: 'जन्म के समय', mr: 'जन्माच्या वेळी' }, ageDays: 0, vaccines: ['BCG', 'OPV-0', 'Hepatitis B-1'], importance: { en: 'BCG protects against severe childhood tuberculosis and is most effective given in the first days of life.', hi: 'BCG गंभीर बचपन टीबी से बचाता है और जीवन के पहले दिनों में सबसे प्रभावी है।', mr: 'BCG गंभीर बालपणीच्या क्षयरोगापासून संरक्षण देते आणि आयुष्याच्या पहिल्या दिवसांत सर्वाधिक प्रभावी असते.' } },
        { id: 'w6', label: { en: '6 weeks', hi: '6 सप्ताह', mr: '६ आठवडे' }, ageWeeks: 6, vaccines: ['DTwP/DTaP-1', 'IPV-1', 'Hep B-2', 'Hib-1', 'Rotavirus-1', 'PCV-1'], importance: { en: 'The first big visit. Protects against diphtheria, tetanus, whooping cough, polio, meningitis and the commonest causes of infant diarrhoea and pneumonia.', hi: 'पहली बड़ी विज़िट। डिप्थीरिया, टिटनेस, काली खाँसी, पोलियो, मेनिन्जाइटिस और शिशु दस्त व निमोनिया के मुख्य कारणों से बचाव।', mr: 'पहिली मोठी भेट. घटसर्प, धनुर्वात, डांग्या खोकला, पोलिओ, मेंदुज्वर आणि बालकांच्या जुलाब व न्यूमोनियाच्या मुख्य कारणांपासून संरक्षण.' } },
        { id: 'w10', label: { en: '10 weeks', hi: '10 सप्ताह', mr: '१० आठवडे' }, ageWeeks: 10, vaccines: ['DTwP/DTaP-2', 'IPV-2', 'Hib-2', 'Rotavirus-2', 'PCV-2'], importance: { en: 'The second dose is what builds durable immunity — a delayed or skipped dose leaves a real gap.', hi: 'दूसरी खुराक ही टिकाऊ प्रतिरोधक क्षमता बनाती है — देरी या छूटना असली कमी छोड़ देता है।', mr: 'दुसरी मात्राच टिकाऊ प्रतिकारशक्ती तयार करते — उशीर किंवा वगळणे खरी पोकळी ठेवते.' } },
        { id: 'w14', label: { en: '14 weeks', hi: '14 सप्ताह', mr: '१४ आठवडे' }, ageWeeks: 14, vaccines: ['DTwP/DTaP-3', 'IPV-3', 'Hib-3', 'Rotavirus-3', 'PCV-3'], importance: { en: 'Completes the primary series. Rotavirus in particular must be finished before 8 months of age.', hi: 'प्राथमिक शृंखला पूरी। रोटावायरस विशेष रूप से 8 महीने से पहले पूरा होना चाहिए।', mr: 'प्राथमिक मालिका पूर्ण. रोटाव्हायरस विशेषतः ८ महिन्यांपूर्वी पूर्ण झाला पाहिजे.' } },
        { id: 'm6', label: { en: '6 months', hi: '6 महीने', mr: '६ महिने' }, ageMonths: 6, vaccines: ['OPV-1', 'Hep B-3', 'Influenza-1 (optional)'], importance: { en: 'Hepatitis B protection is completed here. The first flu shot can also be given from six months.', hi: 'हेपेटाइटिस बी सुरक्षा यहाँ पूरी होती है। पहला फ़्लू टीका भी छह महीने से दिया जा सकता है।', mr: 'हिपॅटायटीस बी संरक्षण इथे पूर्ण होते. पहिली फ्लू लसही सहा महिन्यांपासून देता येते.' } },
        { id: 'm9', label: { en: '9 months', hi: '9 महीने', mr: '९ महिने' }, ageMonths: 9, vaccines: ['OPV-2', 'MMR-1', 'Typhoid conjugate (9–12m)'], importance: { en: 'Measles protection begins here. Measles remains one of the most dangerous illnesses for an Indian infant.', hi: 'खसरे से सुरक्षा यहाँ शुरू होती है। खसरा भारतीय शिशुओं के लिए सबसे ख़तरनाक बीमारियों में से एक है।', mr: 'गोवरापासून संरक्षण इथे सुरू होते. गोवर भारतीय बालकांसाठी सर्वात धोकादायक आजारांपैकी एक आहे.' } },
        { id: 'm12', label: { en: '12 months', hi: '12 महीने', mr: '१२ महिने' }, ageMonths: 12, vaccines: ['Hepatitis A-1'], importance: { en: 'Hepatitis A spreads through contaminated food and water — relevant in every Indian city.', hi: 'हेपेटाइटिस ए दूषित भोजन और पानी से फैलता है — हर भारतीय शहर में प्रासंगिक।', mr: 'हिपॅटायटीस ए दूषित अन्न व पाण्यातून पसरतो — प्रत्येक भारतीय शहरात महत्त्वाचे.' } },
        { id: 'm15', label: { en: '15 months', hi: '15 महीने', mr: '१५ महिने' }, ageMonths: 15, vaccines: ['MMR-2', 'Varicella-1', 'PCV booster'], importance: { en: 'The second MMR closes the gap for the small percentage who did not respond to the first.', hi: 'दूसरा MMR उन थोड़े बच्चों की कमी पूरी करता है जिन पर पहला असर नहीं करता।', mr: 'दुसरा MMR ज्या थोड्या मुलांवर पहिला परिणाम करत नाही त्यांची पोकळी भरतो.' } },
        { id: 'm18', label: { en: '16–18 months', hi: '16–18 महीने', mr: '१६–१८ महिने' }, ageMonths: 17, vaccines: ['DTwP booster-1', 'IPV booster', 'Hib booster'], importance: { en: 'Whooping cough immunity fades without this booster, and it is the age at which children start mixing widely.', hi: 'इस बूस्टर के बिना काली खाँसी की प्रतिरोधक क्षमता कम हो जाती है, और इसी उम्र में बच्चे ज़्यादा घुलने-मिलने लगते हैं।', mr: 'या बूस्टरशिवाय डांग्या खोकल्याची प्रतिकारशक्ती कमी होते, आणि याच वयात मुले जास्त मिसळू लागतात.' } },
        { id: 'm19', label: { en: '18–19 months', hi: '18–19 महीने', mr: '१८–१९ महिने' }, ageMonths: 18, vaccines: ['Hepatitis A-2', 'Varicella-2'], importance: { en: 'Completes both the hepatitis A and chickenpox courses.', hi: 'हेपेटाइटिस ए और चिकनपॉक्स दोनों कोर्स पूरे करता है।', mr: 'हिपॅटायटीस ए आणि कांजिण्या दोन्ही कोर्स पूर्ण करते.' } },
        { id: 'y2', label: { en: '2 years', hi: '2 साल', mr: '२ वर्षे' }, ageYears: 2, vaccines: ['Typhoid booster'], importance: { en: 'Typhoid remains endemic; the conjugate vaccine booster extends protection through the school years.', hi: 'टाइफ़ॉइड अब भी आम है; कंजुगेट बूस्टर स्कूल के वर्षों तक सुरक्षा बढ़ाता है।', mr: 'विषमज्वर अजूनही सामान्य आहे; कंजुगेट बूस्टर शालेय वर्षांपर्यंत संरक्षण वाढवते.' } },
        { id: 'y5', label: { en: '4–6 years', hi: '4–6 साल', mr: '४–६ वर्षे' }, ageYears: 5, vaccines: ['DTwP booster-2', 'OPV-3', 'MMR-3'], importance: { en: 'The school-entry booster. Most schools ask for this record at admission.', hi: 'स्कूल प्रवेश बूस्टर। ज़्यादातर स्कूल दाख़िले के समय यह रिकॉर्ड माँगते हैं।', mr: 'शाळाप्रवेश बूस्टर. बहुतेक शाळा प्रवेशाच्या वेळी ही नोंद मागतात.' } },
        { id: 'y10', label: { en: '10–12 years', hi: '10–12 साल', mr: '१०–१२ वर्षे' }, ageYears: 10, vaccines: ['Tdap', 'HPV (2 doses)'], importance: { en: 'HPV vaccination is most effective when given well before any exposure, and is recommended for girls and boys.', hi: 'HPV टीका किसी भी संपर्क से काफ़ी पहले देने पर सबसे प्रभावी है, और लड़कियों व लड़कों दोनों के लिए सुझाया जाता है।', mr: 'HPV लस कोणत्याही संपर्काच्या खूप आधी दिल्यास सर्वाधिक प्रभावी, आणि मुली व मुले दोघांसाठी शिफारस केली जाते.' } },
      ],
    },

    milestones: {
      enabled: true,
      title: { en: 'Development milestone checklist', hi: 'विकास माइलस्टोन चेकलिस्ट', mr: 'विकास टप्पे चेकलिस्ट' },
      sub: {
        en: 'Tick off what your child is already doing. Children vary widely — this is a guide for conversation, not a test.',
        hi: 'जो आपका बच्चा पहले से कर रहा है उस पर निशान लगाएँ। बच्चों में काफ़ी अंतर होता है — यह बातचीत के लिए गाइड है, परीक्षा नहीं।',
        mr: 'तुमचे मूल जे आधीच करते त्यावर खूण करा. मुलांमध्ये खूप फरक असतो — हे चर्चेसाठी मार्गदर्शक आहे, परीक्षा नाही.',
      },
      redFlagNote: {
        en: 'A missed milestone is common and usually resolves. Persistent gaps, or the loss of a skill your child previously had, are worth a proper developmental review.',
        hi: 'कोई माइलस्टोन छूट जाना आम है और आमतौर पर ठीक हो जाता है। लगातार पीछे रहना, या पहले से आने वाली क्षमता खो देना — इसके लिए विकास जाँच ज़रूरी है।',
        mr: 'एखादा टप्पा राहणे सामान्य आहे व सहसा ठीक होते. सातत्याने मागे राहणे, किंवा आधी असलेले कौशल्य गमावणे — यासाठी विकास तपासणी आवश्यक.',
      },
      stages: [
        {
          id: 's2m', stage: { en: '2 months', hi: '2 महीने', mr: '२ महिने' }, badge: { en: 'Newborn', hi: 'नवजात', mr: 'नवजात' },
          title: { en: 'First smiles and focus', hi: 'पहली मुस्कान और नज़र टिकना', mr: 'पहिले हसू आणि नजर स्थिरावणे' },
          items: [
            { id: 'a', text: { en: 'Smiles back at you', hi: 'आपको देखकर मुस्कुराता है', mr: 'तुम्हाला पाहून हसते' } },
            { id: 'b', text: { en: 'Briefly calms when picked up or spoken to', hi: 'गोद लेने या बोलने पर थोड़ा शांत होता है', mr: 'उचलल्यावर किंवा बोलल्यावर थोडे शांत होते' } },
            { id: 'c', text: { en: 'Follows a moving face or object with the eyes', hi: 'चलते चेहरे या चीज़ को आँखों से देखता है', mr: 'हलणारा चेहरा किंवा वस्तू डोळ्यांनी पाहते' } },
            { id: 'd', text: { en: 'Lifts the head when placed on the tummy', hi: 'पेट के बल लिटाने पर सिर उठाता है', mr: 'पोटावर ठेवल्यावर डोके उचलते' } },
            { id: 'e', text: { en: 'Makes sounds other than crying', hi: 'रोने के अलावा भी आवाज़ें निकालता है', mr: 'रडण्याव्यतिरिक्त आवाज काढते' } },
          ],
          redFlags: [
            { en: 'Does not respond to loud sounds', hi: 'तेज़ आवाज़ पर प्रतिक्रिया नहीं', mr: 'मोठ्या आवाजाला प्रतिसाद नाही' },
            { en: 'Eyes do not follow a moving object', hi: 'आँखें चलती चीज़ का पीछा नहीं करतीं', mr: 'डोळे हलणाऱ्या वस्तूचा मागोवा घेत नाहीत' },
            { en: 'Cannot hold the head up at all during tummy time', hi: 'पेट के बल सिर बिल्कुल नहीं उठा पाता', mr: 'पोटावर डोके अजिबात उचलू शकत नाही' },
          ],
        },
        {
          id: 's6m', stage: { en: '6 months', hi: '6 महीने', mr: '६ महिने' }, badge: { en: 'Infant', hi: 'शिशु', mr: 'अर्भक' },
          title: { en: 'Rolling, reaching and babbling', hi: 'करवट, पकड़ना और बोलने की कोशिश', mr: 'कूस बदलणे, पकडणे व बोबडे बोलणे' },
          items: [
            { id: 'a', text: { en: 'Rolls from tummy to back', hi: 'पेट से पीठ के बल पलटता है', mr: 'पोटावरून पाठीवर वळते' } },
            { id: 'b', text: { en: 'Reaches out to grab a toy', hi: 'खिलौना पकड़ने के लिए हाथ बढ़ाता है', mr: 'खेळणे पकडायला हात पुढे करते' } },
            { id: 'c', text: { en: 'Babbles — "ba", "ma", "da" sounds', hi: '"बा", "मा", "दा" जैसी आवाज़ें निकालता है', mr: '"बा", "मा", "दा" असे आवाज काढते' } },
            { id: 'd', text: { en: 'Recognises familiar faces', hi: 'जाने-पहचाने चेहरे पहचानता है', mr: 'ओळखीचे चेहरे ओळखते' } },
            { id: 'e', text: { en: 'Sits with support', hi: 'सहारे से बैठता है', mr: 'आधाराने बसते' } },
            { id: 'f', text: { en: 'Brings objects to the mouth', hi: 'चीज़ें मुँह तक ले जाता है', mr: 'वस्तू तोंडाकडे नेते' } },
          ],
          redFlags: [
            { en: 'Very stiff or very floppy muscle tone', hi: 'शरीर बहुत सख़्त या बहुत ढीला', mr: 'शरीर खूप ताठ किंवा खूप सैल' },
            { en: 'Does not reach for objects', hi: 'चीज़ों की ओर हाथ नहीं बढ़ाता', mr: 'वस्तूंकडे हात पुढे करत नाही' },
            { en: 'Shows no affection toward caregivers', hi: 'देखभाल करने वालों से लगाव नहीं दिखाता', mr: 'काळजी घेणाऱ्यांबद्दल जिव्हाळा दाखवत नाही' },
            { en: 'Does not laugh or make squealing sounds', hi: 'हँसता नहीं या चीख़ जैसी आवाज़ नहीं निकालता', mr: 'हसत नाही किंवा किंचाळण्यासारखा आवाज काढत नाही' },
          ],
        },
        {
          id: 's12m', stage: { en: '12 months', hi: '12 महीने', mr: '१२ महिने' }, badge: { en: 'One year', hi: 'एक साल', mr: 'एक वर्ष' },
          title: { en: 'First words and first steps', hi: 'पहले शब्द और पहले क़दम', mr: 'पहिले शब्द आणि पहिली पावले' },
          items: [
            { id: 'a', text: { en: 'Pulls to stand, or cruises along furniture', hi: 'पकड़कर खड़ा होता है या फ़र्नीचर के सहारे चलता है', mr: 'धरून उभे राहते किंवा फर्निचरच्या आधाराने चालते' } },
            { id: 'b', text: { en: 'Says "mama" or "dada" meaningfully', hi: '"मामा" या "दादा" अर्थपूर्ण ढंग से बोलता है', mr: '"मामा" किंवा "दादा" अर्थपूर्णपणे बोलते' } },
            { id: 'c', text: { en: 'Waves bye-bye or points at things', hi: 'बाय-बाय करता है या चीज़ों की ओर इशारा करता है', mr: 'बाय-बाय करते किंवा वस्तूंकडे बोट दाखवते' } },
            { id: 'd', text: { en: 'Picks up small items with finger and thumb', hi: 'उँगली और अंगूठे से छोटी चीज़ें उठाता है', mr: 'बोट व अंगठ्याने लहान वस्तू उचलते' } },
            { id: 'e', text: { en: 'Looks for a hidden object', hi: 'छिपी हुई चीज़ ढूँढता है', mr: 'लपवलेली वस्तू शोधते' } },
            { id: 'f', text: { en: 'Drinks from a cup with help', hi: 'मदद से कप से पीता है', mr: 'मदतीने कपातून पिते' } },
          ],
          redFlags: [
            { en: 'Does not crawl or bear weight on the legs', hi: 'रेंगता नहीं या पैरों पर वज़न नहीं लेता', mr: 'रांगत नाही किंवा पायांवर वजन घेत नाही' },
            { en: 'Says no single words', hi: 'एक भी शब्द नहीं बोलता', mr: 'एकही शब्द बोलत नाही' },
            { en: 'Does not point or gesture', hi: 'इशारा नहीं करता', mr: 'खूण किंवा इशारा करत नाही' },
            { en: 'Loses a skill previously acquired', hi: 'पहले सीखी हुई क्षमता खो देता है', mr: 'आधी शिकलेले कौशल्य गमावते' },
          ],
        },
        {
          id: 's18m', stage: { en: '18 months', hi: '18 महीने', mr: '१८ महिने' }, badge: { en: 'Toddler', hi: 'छोटा बच्चा', mr: 'लहान मूल' },
          title: { en: 'Walking, pointing, copying', hi: 'चलना, इशारा करना, नक़ल करना', mr: 'चालणे, इशारा करणे, नक्कल करणे' },
          items: [
            { id: 'a', text: { en: 'Walks independently', hi: 'ख़ुद चलता है', mr: 'स्वतः चालते' } },
            { id: 'b', text: { en: 'Says several single words', hi: 'कई अलग-अलग शब्द बोलता है', mr: 'अनेक सुटे शब्द बोलते' } },
            { id: 'c', text: { en: 'Points to show you something interesting', hi: 'कुछ दिलचस्प दिखाने के लिए इशारा करता है', mr: 'काहीतरी मजेशीर दाखवायला बोट करते' } },
            { id: 'd', text: { en: 'Copies household activities — sweeping, phone to ear', hi: 'घर के काम की नक़ल करता है — झाड़ू, कान पर फ़ोन', mr: 'घरातील कामांची नक्कल करते — झाडू, कानाला फोन' } },
            { id: 'e', text: { en: 'Scribbles with a crayon', hi: 'क्रेयॉन से लकीरें खींचता है', mr: 'क्रेयॉनने रेघोट्या मारते' } },
            { id: 'f', text: { en: 'Eats some food with a spoon', hi: 'चम्मच से कुछ खाना खाता है', mr: 'चमच्याने थोडे अन्न खाते' } },
          ],
          redFlags: [
            { en: 'Not walking at all', hi: 'बिल्कुल नहीं चलता', mr: 'अजिबात चालत नाही' },
            { en: 'Fewer than six words', hi: 'छह से कम शब्द बोलता है', mr: 'सहापेक्षा कमी शब्द बोलते' },
            { en: 'Does not notice or mind when a caregiver leaves', hi: 'देखभाल करने वाले के जाने पर ध्यान नहीं देता', mr: 'काळजी घेणारा गेल्यावर लक्ष देत नाही' },
          ],
        },
        {
          id: 's2y', stage: { en: '2 years', hi: '2 साल', mr: '२ वर्षे' }, badge: { en: 'Toddler', hi: 'छोटा बच्चा', mr: 'लहान मूल' },
          title: { en: 'Two-word sentences', hi: 'दो शब्दों के वाक्य', mr: 'दोन शब्दांची वाक्ये' },
          items: [
            { id: 'a', text: { en: 'Joins two words — "more milk", "go out"', hi: 'दो शब्द जोड़ता है — "और दूध", "बाहर जाना"', mr: 'दोन शब्द जोडते — "आणखी दूध", "बाहेर जाऊ"' } },
            { id: 'b', text: { en: 'Follows a simple two-step instruction', hi: 'दो चरणों वाला सरल निर्देश समझता है', mr: 'दोन पायऱ्यांची साधी सूचना पाळते' } },
            { id: 'c', text: { en: 'Runs, and kicks a ball', hi: 'दौड़ता है और गेंद को लात मारता है', mr: 'धावते आणि चेंडूला लाथ मारते' } },
            { id: 'd', text: { en: 'Plays alongside other children', hi: 'दूसरे बच्चों के साथ खेलता है', mr: 'इतर मुलांसोबत खेळते' } },
            { id: 'e', text: { en: 'Names familiar things in a picture book', hi: 'चित्र पुस्तक में जानी-पहचानी चीज़ों के नाम बताता है', mr: 'चित्रपुस्तकातील ओळखीच्या वस्तूंची नावे सांगते' } },
            { id: 'f', text: { en: 'Climbs onto and off furniture', hi: 'फ़र्नीचर पर चढ़ता-उतरता है', mr: 'फर्निचरवर चढते-उतरते' } },
          ],
          redFlags: [
            { en: 'No two-word phrases', hi: 'दो शब्दों के वाक्य नहीं बोलता', mr: 'दोन शब्दांची वाक्ये बोलत नाही' },
            { en: 'Cannot follow simple instructions', hi: 'सरल निर्देश नहीं समझता', mr: 'साध्या सूचना पाळू शकत नाही' },
            { en: 'Unsteady walking or frequent falls', hi: 'लड़खड़ाकर चलना या बार-बार गिरना', mr: 'डगमगत चालणे किंवा वारंवार पडणे' },
            { en: 'Loss of previous skills', hi: 'पहले की क्षमताएँ खो देना', mr: 'आधीची कौशल्ये गमावणे' },
          ],
        },
        {
          id: 's3y', stage: { en: '3 years', hi: '3 साल', mr: '३ वर्षे' }, badge: { en: 'Pre-school', hi: 'प्री-स्कूल', mr: 'पूर्वप्राथमिक' },
          title: { en: 'Conversation and play', hi: 'बातचीत और खेल', mr: 'संवाद आणि खेळ' },
          items: [
            { id: 'a', text: { en: 'Speaks in short sentences strangers can mostly understand', hi: 'छोटे वाक्य बोलता है जो बाहर वाले भी ज़्यादातर समझ लें', mr: 'लहान वाक्ये बोलते जी बाहेरचेही बहुतांश समजतात' } },
            { id: 'b', text: { en: 'Plays make-believe with dolls or toys', hi: 'गुड़ियों या खिलौनों से कल्पना का खेल खेलता है', mr: 'बाहुल्या किंवा खेळण्यांशी कल्पनेचा खेळ खेळते' } },
            { id: 'c', text: { en: 'Pedals a tricycle', hi: 'तिपहिया साइकिल चलाता है', mr: 'तीनचाकी सायकल चालवते' } },
            { id: 'd', text: { en: 'Copies a circle with a crayon', hi: 'क्रेयॉन से गोला बनाता है', mr: 'क्रेयॉनने वर्तुळ काढते' } },
            { id: 'e', text: { en: 'Takes turns in a simple game', hi: 'सरल खेल में बारी लेता है', mr: 'साध्या खेळात पाळी घेते' } },
            { id: 'f', text: { en: 'Dresses with a little help', hi: 'थोड़ी मदद से कपड़े पहनता है', mr: 'थोड्या मदतीने कपडे घालते' } },
          ],
          redFlags: [
            { en: 'Speech unclear to people outside the family', hi: 'परिवार के बाहर लोगों को बोली समझ नहीं आती', mr: 'कुटुंबाबाहेरील लोकांना बोलणे समजत नाही' },
            { en: 'No interest in other children', hi: 'दूसरे बच्चों में रुचि नहीं', mr: 'इतर मुलांमध्ये रस नाही' },
            { en: 'Frequent falling or difficulty with stairs', hi: 'बार-बार गिरना या सीढ़ियों में दिक़्क़त', mr: 'वारंवार पडणे किंवा जिन्यांवर अडचण' },
            { en: 'Cannot work simple toys', hi: 'सरल खिलौने नहीं चला पाता', mr: 'साधी खेळणी हाताळू शकत नाही' },
          ],
        },
        {
          id: 's5y', stage: { en: '5 years', hi: '5 साल', mr: '५ वर्षे' }, badge: { en: 'School ready', hi: 'स्कूल के लिए तैयार', mr: 'शाळेसाठी तयार' },
          title: { en: 'Ready for school', hi: 'स्कूल के लिए तैयार', mr: 'शाळेसाठी तयार' },
          items: [
            { id: 'a', text: { en: 'Tells a simple story in full sentences', hi: 'पूरे वाक्यों में सरल कहानी सुनाता है', mr: 'पूर्ण वाक्यांत साधी गोष्ट सांगते' } },
            { id: 'b', text: { en: 'Counts ten or more objects', hi: 'दस या उससे ज़्यादा चीज़ें गिनता है', mr: 'दहा किंवा अधिक वस्तू मोजते' } },
            { id: 'c', text: { en: 'Hops, and stands on one foot for several seconds', hi: 'उछलता है और कई सेकंड एक पैर पर खड़ा रहता है', mr: 'उड्या मारते व काही सेकंद एका पायावर उभे राहते' } },
            { id: 'd', text: { en: 'Draws a person with at least six body parts', hi: 'कम से कम छह अंगों वाला व्यक्ति बनाता है', mr: 'किमान सहा अवयवांची व्यक्ती काढते' } },
            { id: 'e', text: { en: 'Uses the toilet independently', hi: 'ख़ुद टॉयलेट इस्तेमाल करता है', mr: 'स्वतः शौचालय वापरते' } },
            { id: 'f', text: { en: 'Wants to play with other children rather than alone', hi: 'अकेले के बजाय दूसरे बच्चों के साथ खेलना चाहता है', mr: 'एकट्यापेक्षा इतर मुलांसोबत खेळू इच्छिते' } },
          ],
          redFlags: [
            { en: 'Extremely withdrawn or unusually fearful', hi: 'बहुत चुप-चुप या असामान्य रूप से डरा हुआ', mr: 'खूप अलिप्त किंवा असामान्यपणे घाबरलेले' },
            { en: 'Cannot give first and last name', hi: 'अपना पूरा नाम नहीं बता पाता', mr: 'स्वतःचे पूर्ण नाव सांगू शकत नाही' },
            { en: 'Does not respond to people generally', hi: 'आम तौर पर लोगों को जवाब नहीं देता', mr: 'सर्वसाधारणपणे लोकांना प्रतिसाद देत नाही' },
            { en: 'Loses skills previously mastered', hi: 'पहले सीखी क्षमताएँ खो देता है', mr: 'आधी शिकलेली कौशल्ये गमावते' },
          ],
        },
      ],
    },

    triage: {
      enabled: true,
      title: { en: 'Symptom checker', hi: 'लक्षण जाँच', mr: 'लक्षण तपासणी' },
      sub: {
        en: 'Six quick questions. This helps you judge urgency — it never replaces an examination.',
        hi: 'छह छोटे सवाल। ये आपको तात्कालिकता समझने में मदद करते हैं — जाँच का विकल्प नहीं हैं।',
        mr: 'सहा छोटे प्रश्न. हे तातडी समजण्यास मदत करतात — तपासणीचा पर्याय नाहीत.',
      },
      emergencyText: {
        en: 'Based on what you have described, your child should be seen straight away. Please call the clinic now, or go to the nearest emergency department.',
        hi: 'आपने जो बताया है, उसके आधार पर बच्चे को तुरंत दिखाना चाहिए। अभी क्लिनिक को कॉल करें, या निकटतम आपातकालीन विभाग जाएँ।',
        mr: 'तुम्ही सांगितलेल्यावरून, मुलाला ताबडतोब दाखवावे. आत्ताच क्लिनिकला फोन करा, किंवा जवळच्या आपत्कालीन विभागात जा.',
      },
      questions: [
        {
          id: 'age', question: { en: 'How old is your child?', hi: 'आपका बच्चा कितने साल का है?', mr: 'तुमचे मूल किती वयाचे आहे?' }, icon: 'Baby',
          options: [
            { value: 'newborn', label: { en: 'Under 3 months', hi: '3 महीने से कम', mr: '३ महिन्यांखाली' }, weight: 3 },
            { value: 'infant', label: { en: '3–12 months', hi: '3–12 महीने', mr: '३–१२ महिने' }, weight: 1 },
            { value: 'toddler', label: { en: '1–5 years', hi: '1–5 साल', mr: '१–५ वर्षे' }, weight: 0 },
            { value: 'child', label: { en: 'Over 5 years', hi: '5 साल से ऊपर', mr: '५ वर्षांवर' }, weight: 0 },
          ],
        },
        {
          id: 'concern', question: { en: 'What is the main concern?', hi: 'मुख्य समस्या क्या है?', mr: 'मुख्य तक्रार काय आहे?' }, icon: 'Stethoscope',
          options: [
            { value: 'Fever', label: { en: 'Fever', hi: 'बुखार', mr: 'ताप' }, weight: 1 },
            { value: 'Cough or breathing', label: { en: 'Cough or breathing trouble', hi: 'खाँसी या साँस की तकलीफ़', mr: 'खोकला किंवा श्वासाचा त्रास' }, weight: 2 },
            { value: 'Vomiting or loose motions', label: { en: 'Vomiting or loose motions', hi: 'उल्टी या दस्त', mr: 'उलटी किंवा जुलाब' }, weight: 1 },
            { value: 'Rash or skin', label: { en: 'Rash or skin problem', hi: 'दाने या त्वचा की समस्या', mr: 'पुरळ किंवा त्वचेची तक्रार' }, weight: 0 },
            { value: 'Feeding or growth', label: { en: 'Feeding, weight or growth', hi: 'खाना, वज़न या विकास', mr: 'आहार, वजन किंवा वाढ' }, weight: 0 },
            { value: 'Routine check or vaccine', label: { en: 'Routine check or vaccine', hi: 'नियमित जाँच या टीका', mr: 'नियमित तपासणी किंवा लस' }, weight: -1 },
          ],
        },
        {
          id: 'duration', question: { en: 'How long has this been going on?', hi: 'यह कब से चल रहा है?', mr: 'हे किती दिवसांपासून सुरू आहे?' }, icon: 'Clock',
          options: [
            { value: 'Under 24 hours', label: { en: 'Less than a day', hi: 'एक दिन से कम', mr: 'एका दिवसापेक्षा कमी' }, weight: 0 },
            { value: '1–3 days', label: { en: '1–3 days', hi: '1–3 दिन', mr: '१–३ दिवस' }, weight: 1 },
            { value: '4–7 days', label: { en: '4–7 days', hi: '4–7 दिन', mr: '४–७ दिवस' }, weight: 2 },
            { value: 'Over a week', label: { en: 'More than a week', hi: 'एक हफ़्ते से ज़्यादा', mr: 'एका आठवड्यापेक्षा जास्त' }, weight: 2 },
          ],
        },
        {
          id: 'breathing', question: { en: 'Is breathing affected?', hi: 'क्या साँस पर असर है?', mr: 'श्वासावर परिणाम आहे का?' }, icon: 'Wind',
          options: [
            { value: 'Normal', label: { en: 'Breathing normally', hi: 'साँस सामान्य है', mr: 'श्वास सामान्य आहे' }, weight: 0 },
            { value: 'Slight wheeze or blocked nose', label: { en: 'Slight wheeze or blocked nose', hi: 'हल्की घरघराहट या बंद नाक', mr: 'सौम्य घरघर किंवा नाक बंद' }, weight: 1 },
            { value: 'Fast or noisy breathing', label: { en: 'Fast or noisy breathing', hi: 'तेज़ या आवाज़ वाली साँस', mr: 'जलद किंवा आवाज करणारा श्वास' }, weight: 3 },
            { value: 'Struggling to breathe', label: { en: 'Visibly struggling', hi: 'साफ़ दिख रहा है कि साँस लेने में तकलीफ़ है', mr: 'स्पष्ट दिसणारा श्वासाचा त्रास' }, weight: 5, emergency: true },
          ],
        },
        {
          id: 'intake', question: { en: 'Is your child feeding and drinking?', hi: 'क्या बच्चा खा-पी रहा है?', mr: 'मूल खात-पीत आहे का?' }, icon: 'Droplet',
          options: [
            { value: 'Normally', label: { en: 'Normally', hi: 'सामान्य रूप से', mr: 'सामान्यपणे' }, weight: 0 },
            { value: 'A bit less than usual', label: { en: 'A bit less than usual', hi: 'रोज़ से थोड़ा कम', mr: 'नेहमीपेक्षा थोडे कमी' }, weight: 1 },
            { value: 'Much less, fewer wet nappies', label: { en: 'Much less — fewer wet nappies', hi: 'काफ़ी कम — गीले डायपर भी कम', mr: 'खूप कमी — ओले लंगोटही कमी' }, weight: 3 },
            { value: 'Refusing all fluids', label: { en: 'Refusing everything', hi: 'कुछ भी नहीं ले रहा', mr: 'काहीही घेत नाही' }, weight: 5, emergency: true },
          ],
        },
        {
          id: 'alertness', question: { en: 'How alert does your child seem?', hi: 'बच्चा कितना सचेत लग रहा है?', mr: 'मूल किती सजग वाटते?' }, icon: 'Eye',
          options: [
            { value: 'Playful as usual', label: { en: 'Playful as usual', hi: 'रोज़ की तरह खेल रहा है', mr: 'नेहमीप्रमाणे खेळकर' }, weight: 0 },
            { value: 'Clingy and tired', label: { en: 'Clingy and tired', hi: 'चिपका हुआ और थका हुआ', mr: 'बिलगणारे व थकलेले' }, weight: 1 },
            { value: 'Very drowsy, hard to rouse', label: { en: 'Very drowsy, hard to rouse', hi: 'बहुत सुस्त, जगाना मुश्किल', mr: 'खूप सुस्त, जागे करणे कठीण' }, weight: 5, emergency: true },
            { value: 'Had a fit or seizure', label: { en: 'Had a fit or seizure', hi: 'दौरा पड़ा है', mr: 'फेफरे आले आहेत' }, weight: 6, emergency: true },
          ],
        },
      ],
      outcomes: [
        {
          max: 2, tone: 'good',
          title: { en: 'Routine — book when convenient', hi: 'सामान्य — सुविधा अनुसार बुक करें', mr: 'नियमित — सोयीनुसार बुक करा' },
          advice: { en: 'Nothing here suggests urgency. Book a normal appointment, keep fluids up, and watch for any change.', hi: 'यहाँ कुछ भी तत्काल नहीं लगता। सामान्य अपॉइंटमेंट बुक करें, तरल पदार्थ देते रहें, और बदलाव पर नज़र रखें।', mr: 'इथे काहीही तातडीचे वाटत नाही. सामान्य अपॉइंटमेंट बुक करा, द्रवपदार्थ देत रहा, आणि बदलावर लक्ष ठेवा.' },
        },
        {
          max: 5, tone: 'ok',
          title: { en: 'Worth being seen in the next day or two', hi: 'अगले एक-दो दिन में दिखाना ठीक रहेगा', mr: 'पुढील एक-दोन दिवसांत दाखवणे योग्य' },
          advice: { en: 'These symptoms deserve a proper look, but not an emergency dash. Book the next available slot and call sooner if anything worsens.', hi: 'इन लक्षणों को ठीक से देखना चाहिए, पर आपात स्थिति नहीं है। अगला उपलब्ध स्लॉट बुक करें और हालत बिगड़े तो पहले कॉल करें।', mr: 'ही लक्षणे नीट पाहायला हवीत, पण आणीबाणी नाही. पुढील उपलब्ध स्लॉट बुक करा आणि त्रास वाढल्यास आधी फोन करा.' },
        },
        {
          max: 9, tone: 'warn',
          title: { en: 'Please be seen today', hi: 'कृपया आज ही दिखाएँ', mr: 'कृपया आजच दाखवा' },
          advice: { en: 'The combination you have described should be examined today. Call the clinic — if we are closed, contact the nearest pediatric emergency service.', hi: 'आपने जो बताया है उसे आज ही जाँचना चाहिए। क्लिनिक को कॉल करें — बंद हो तो निकटतम बाल आपातकालीन सेवा से संपर्क करें।', mr: 'तुम्ही सांगितलेले आजच तपासले पाहिजे. क्लिनिकला फोन करा — बंद असल्यास जवळच्या बाल आपत्कालीन सेवेशी संपर्क साधा.' },
        },
        {
          max: Infinity, tone: 'danger',
          title: { en: 'Seek care immediately', hi: 'तुरंत चिकित्सा सहायता लें', mr: 'ताबडतोब वैद्यकीय मदत घ्या' },
          advice: { en: 'Do not wait for an appointment. Call the clinic now or go to the nearest emergency department.', hi: 'अपॉइंटमेंट का इंतज़ार न करें। अभी क्लिनिक को कॉल करें या निकटतम आपातकालीन विभाग जाएँ।', mr: 'अपॉइंटमेंटची वाट पाहू नका. आत्ताच क्लिनिकला फोन करा किंवा जवळच्या आपत्कालीन विभागात जा.' },
        },
      ],
    },

    dose: {
      enabled: true,
      title: { en: 'Fever medicine dose reference', hi: 'बुखार की दवा की मात्रा', mr: 'तापाच्या औषधाची मात्रा' },
      sub: {
        en: 'Children are dosed by weight, not by age — which is why the number on the bottle is so often wrong for your child.',
        hi: 'बच्चों की दवा उम्र नहीं, वज़न के हिसाब से तय होती है — इसीलिए बोतल पर लिखी मात्रा अक्सर आपके बच्चे के लिए ग़लत होती है।',
        mr: 'मुलांचे औषध वयानुसार नव्हे तर वजनानुसार ठरते — म्हणूनच बाटलीवरील मात्रा अनेकदा तुमच्या मुलासाठी चुकीची असते.',
      },
      disclaimer: {
        en: 'This is a reference for medicines already prescribed for your child, based on standard pediatric weight-based dosing. It is not a prescription. Never give ibuprofen to a baby under 3 months, or to a dehydrated child, without medical advice. Confirm the dose with Dr. Mete at your next visit.',
        hi: 'यह उन दवाओं के लिए संदर्भ है जो पहले से आपके बच्चे के लिए लिखी जा चुकी हैं, मानक वज़न-आधारित बाल खुराक पर आधारित। यह प्रिस्क्रिप्शन नहीं है। 3 महीने से छोटे शिशु या पानी की कमी वाले बच्चे को बिना डॉक्टरी सलाह इबुप्रोफेन कभी न दें। अगली विज़िट पर डॉ. मेटे से मात्रा की पुष्टि करें।',
        mr: 'हे आधीच तुमच्या मुलासाठी लिहून दिलेल्या औषधांसाठी संदर्भ आहे, प्रमाणित वजन-आधारित बालमात्रेवर आधारित. हे प्रिस्क्रिप्शन नाही. ३ महिन्यांखालील बाळाला किंवा निर्जलीकरण झालेल्या मुलाला वैद्यकीय सल्ल्याशिवाय आयबुप्रोफेन कधीही देऊ नका. पुढील भेटीत डॉ. मेटे यांच्याकडून मात्रा निश्चित करा.',
      },
      drugs: [
        {
          id: 'paracetamol', name: { en: 'Paracetamol (Crocin, Calpol, Dolo)', hi: 'पैरासिटामोल (क्रोसिन, कैलपोल, डोलो)', mr: 'पॅरासिटामॉल (क्रोसिन, कॅलपॉल, डोलो)' },
          perKg: 15, unit: 'mg', maxDosesPerDay: 4, intervalHours: '4–6', minAgeMonths: 0, maxSingleMg: 1000,
          strengths: [
            { label: { en: 'Drops 100 mg/ml', hi: 'ड्रॉप्स 100 mg/ml', mr: 'ड्रॉप्स १०० mg/ml' }, mgPerMl: 100 },
            { label: { en: 'Syrup 125 mg/5 ml', hi: 'सिरप 125 mg/5 ml', mr: 'सिरप १२५ mg/५ ml' }, mgPerMl: 25 },
            { label: { en: 'Syrup 250 mg/5 ml', hi: 'सिरप 250 mg/5 ml', mr: 'सिरप २५० mg/५ ml' }, mgPerMl: 50 },
          ],
          note: {
            en: 'The most common error is using the 250 mg/5 ml syrup with the dose worked out for 125 mg/5 ml — check the bottle strength every time.',
            hi: 'सबसे आम ग़लती है 125 mg/5 ml के हिसाब से निकाली मात्रा को 250 mg/5 ml सिरप में देना — हर बार बोतल की स्ट्रेंथ जाँचें।',
            mr: 'सर्वात सामान्य चूक म्हणजे १२५ mg/५ ml साठी काढलेली मात्रा २५० mg/५ ml सिरपमध्ये देणे — दरवेळी बाटलीची स्ट्रेंथ तपासा.',
          },
        },
        {
          id: 'ibuprofen', name: { en: 'Ibuprofen (Brufen, Ibugesic)', hi: 'इबुप्रोफेन (ब्रुफेन, इबुजेसिक)', mr: 'आयबुप्रोफेन (ब्रुफेन, आयबुजेसिक)' },
          perKg: 10, unit: 'mg', maxDosesPerDay: 3, intervalHours: '6–8', minAgeMonths: 3, maxSingleMg: 400,
          strengths: [
            { label: { en: 'Syrup 100 mg/5 ml', hi: 'सिरप 100 mg/5 ml', mr: 'सिरप १०० mg/५ ml' }, mgPerMl: 20 },
            { label: { en: 'Syrup 200 mg/5 ml', hi: 'सिरप 200 mg/5 ml', mr: 'सिरप २०० mg/५ ml' }, mgPerMl: 40 },
          ],
          note: {
            en: 'Give with food. Avoid if your child is vomiting, dehydrated, or has chickenpox or dengue.',
            hi: 'खाने के साथ दें। उल्टी, पानी की कमी, चिकनपॉक्स या डेंगू होने पर न दें।',
            mr: 'जेवणासोबत द्या. उलटी, निर्जलीकरण, कांजिण्या किंवा डेंग्यू असल्यास देऊ नका.',
          },
        },
      ],
    },

    kit: {
      enabled: true,
      title: { en: 'What to keep at home', hi: 'घर में क्या रखें', mr: 'घरात काय ठेवावे' },
      sub: {
        en: 'A small child’s medicine box needs less than most people think — and a few things it usually lacks.',
        hi: 'छोटे बच्चे की दवा पेटी में उतना नहीं चाहिए जितना लोग सोचते हैं — पर कुछ चीज़ें अक्सर छूट जाती हैं।',
        mr: 'लहान मुलाच्या औषध पेटीत लोक समजतात तितके लागत नाही — पण काही गोष्टी अनेकदा राहून जातात.',
      },
      groups: [
        {
          title: { en: 'Genuinely worth having', hi: 'वाक़ई ज़रूरी', mr: 'खरोखर आवश्यक' }, tone: 'good', icon: 'CheckCircle2',
          items: [
            { en: 'A digital thermometer — a real one, not a forehead strip', hi: 'डिजिटल थर्मामीटर — असली, माथे की पट्टी नहीं', mr: 'डिजिटल थर्मामीटर — खरा, कपाळाची पट्टी नाही' },
            { en: 'ORS sachets (at least four)', hi: 'ORS पैकेट (कम से कम चार)', mr: 'ORS पाकिटे (किमान चार)' },
            { en: 'Paracetamol at the right strength for your child’s weight', hi: 'बच्चे के वज़न के अनुसार सही स्ट्रेंथ का पैरासिटामोल', mr: 'मुलाच्या वजनानुसार योग्य स्ट्रेंथचे पॅरासिटामॉल' },
            { en: 'Saline nasal drops for blocked noses', hi: 'बंद नाक के लिए सलाइन नेज़ल ड्रॉप्स', mr: 'नाक बंद असल्यास सलाईन नेझल ड्रॉप्स' },
            { en: 'Zinc supplement for diarrhoea episodes', hi: 'दस्त के लिए ज़िंक सप्लीमेंट', mr: 'जुलाबासाठी झिंक सप्लिमेंट' },
            { en: 'Antiseptic solution, gauze and child-sized plasters', hi: 'एंटीसेप्टिक घोल, गॉज़ और बच्चों के साइज़ की पट्टियाँ', mr: 'अँटिसेप्टिक द्रावण, गॉझ व मुलांच्या आकाराच्या पट्ट्या' },
            { en: 'Your child’s vaccination card, kept somewhere findable', hi: 'बच्चे का टीकाकरण कार्ड, ऐसी जगह जहाँ मिल जाए', mr: 'मुलाचे लसीकरण कार्ड, सापडेल अशा ठिकाणी' },
          ],
        },
        {
          title: { en: 'Skip these', hi: 'ये न रखें', mr: 'हे ठेवू नका' }, tone: 'danger', icon: 'X',
          items: [
            { en: 'Leftover antibiotics — never reuse a previous prescription', hi: 'बची हुई एंटीबायोटिक — पुरानी दवा दोबारा कभी न दें', mr: 'उरलेली अँटिबायोटिक्स — जुने औषध पुन्हा कधीही देऊ नका' },
            { en: 'Cough syrups for children under 4; they do not work and can sedate', hi: '4 साल से छोटे बच्चों के लिए खाँसी सिरप; असर नहीं करते और नींद ला सकते हैं', mr: '४ वर्षांखालील मुलांसाठी खोकल्याचे सिरप; परिणाम करत नाहीत व झोप आणू शकतात' },
            { en: 'Aspirin at any age, unless a doctor has specifically prescribed it', hi: 'किसी भी उम्र में एस्पिरिन, जब तक डॉक्टर ने ख़ास तौर पर न लिखी हो', mr: 'कोणत्याही वयात अ‍ॅस्पिरिन, डॉक्टरांनी खास लिहून दिल्याशिवाय' },
            { en: 'Adult tablets cut in half to guess a child’s dose', hi: 'बड़ों की गोली आधी करके बच्चे की मात्रा का अंदाज़ा लगाना', mr: 'मोठ्यांची गोळी अर्धी करून मुलाची मात्रा अंदाजे ठरवणे' },
            { en: 'Home nebulisation without a doctor telling you when to use it', hi: 'डॉक्टर के बताए बिना घर पर नेबुलाइज़ेशन', mr: 'डॉक्टरांनी सांगितल्याशिवाय घरी नेब्युलायझेशन' },
          ],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  /* Booking                                                           */
  /* ---------------------------------------------------------------- */
  booking: {
    channel: 'whatsapp',
    title: { en: 'Book an appointment', hi: 'अपॉइंटमेंट बुक करें', mr: 'अपॉइंटमेंट बुक करा' },
    sub: {
      en: 'Three short steps. The details go straight to the clinic desk on WhatsApp.',
      hi: 'तीन छोटे चरण। विवरण सीधे क्लिनिक डेस्क के व्हाट्सएप पर जाता है।',
      mr: 'तीन छोट्या पायऱ्या. तपशील थेट क्लिनिक डेस्कच्या व्हॉट्सअॅपवर जातो.',
    },
    successTitle: { en: 'Details ready to send', hi: 'विवरण भेजने के लिए तैयार', mr: 'तपशील पाठवण्यास तयार' },
    successBody: {
      en: 'WhatsApp is opening with your appointment request. The clinic desk normally confirms within the hour during clinic times.',
      hi: 'आपकी अपॉइंटमेंट रिक्वेस्ट के साथ व्हाट्सएप खुल रहा है। क्लिनिक समय में डेस्क आमतौर पर एक घंटे में पुष्टि कर देता है।',
      mr: 'तुमच्या अपॉइंटमेंट विनंतीसह व्हॉट्सअॅप उघडत आहे. क्लिनिक वेळेत डेस्क सहसा एका तासात पुष्टी करतो.',
    },
    subjectPrefix: { en: 'Appointment request', hi: 'अपॉइंटमेंट अनुरोध', mr: 'अपॉइंटमेंट विनंती' },
    fields: {
      subjectLabel: { en: 'Who is the appointment for?', hi: 'अपॉइंटमेंट किसके लिए है?', mr: 'अपॉइंटमेंट कोणासाठी आहे?' },
      subjectPlaceholder: { en: "Child's name", hi: 'बच्चे का नाम', mr: 'मुलाचे नाव' },
      agePlaceholder: { en: 'e.g. 8 months', hi: 'जैसे 8 महीने', mr: 'उदा. ८ महिने' },
    },
    reasons: [
      { en: 'General consultation (fever, cough, cold)', hi: 'सामान्य परामर्श (बुखार, खाँसी, ज़ुकाम)', mr: 'सामान्य सल्ला (ताप, खोकला, सर्दी)' },
      { en: 'Newborn check & jaundice screening', hi: 'नवजात जाँच एवं पीलिया स्क्रीनिंग', mr: 'नवजात तपासणी व कावीळ तपासणी' },
      { en: 'Vaccination (WHO / IAP schedule)', hi: 'टीकाकरण (WHO / IAP शेड्यूल)', mr: 'लसीकरण (WHO / IAP वेळापत्रक)' },
      { en: 'Growth & milestone review', hi: 'विकास एवं माइलस्टोन समीक्षा', mr: 'वाढ व विकास टप्पे आढावा' },
      { en: 'Asthma, wheeze or nebulisation', hi: 'अस्थमा, घरघराहट या नेबुलाइज़ेशन', mr: 'दमा, घरघर किंवा नेब्युलायझेशन' },
      { en: 'Nutrition & feeding advice', hi: 'पोषण एवं आहार सलाह', mr: 'पोषण व आहार सल्ला' },
      { en: 'Follow-up visit', hi: 'फ़ॉलो-अप विज़िट', mr: 'फॉलो-अप भेट' },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Integrations & legal                                              */
  /* ---------------------------------------------------------------- */
  integrations: {
    analytics: { provider: 'local', url: null, debug: false, enabled: true },
    exitIntent: {
      enabled: true,
      title: { en: 'One thing before you go', hi: 'जाने से पहले एक बात', mr: 'जाण्यापूर्वी एक गोष्ट' },
      body: {
        en: 'Enter your child’s date of birth and we will WhatsApp you a reminder before every vaccine is due. No cost, and you can stop it with one message.',
        hi: 'बच्चे की जन्म तिथि डालें और हर टीके से पहले हम व्हाट्सएप पर याद दिला देंगे। कोई शुल्क नहीं, एक संदेश से बंद भी कर सकते हैं।',
        mr: 'मुलाची जन्मतारीख टाका आणि प्रत्येक लसीपूर्वी आम्ही व्हॉट्सअॅपवर आठवण करून देऊ. कोणतेही शुल्क नाही, एका संदेशाने बंदही करता येते.',
      },
      cta: { en: 'Set up free reminders', hi: 'मुफ़्त रिमाइंडर चालू करें', mr: 'मोफत स्मरणपत्रे सुरू करा' },
    },
    pwa: true,
  },

  legal: {
    disclaimer: {
      en: 'Everything on this site is general health information for parents in Vasai-Virar. It is not a diagnosis and does not replace an examination. In an emergency, call the clinic or go to the nearest hospital.',
      hi: 'इस साइट की सारी जानकारी वसई-विरार के माता-पिता के लिए सामान्य स्वास्थ्य जानकारी है। यह निदान नहीं है और जाँच का विकल्प नहीं है। आपात स्थिति में क्लिनिक को कॉल करें या निकटतम अस्पताल जाएँ।',
      mr: 'या साइटवरील सर्व माहिती वसई-विरारमधील पालकांसाठी सामान्य आरोग्य माहिती आहे. हे निदान नाही व तपासणीचा पर्याय नाही. आणीबाणीत क्लिनिकला फोन करा किंवा जवळच्या रुग्णालयात जा.',
    },
    privacyNote: {
      en: 'The tools on this page run entirely in your browser. Measurements, dates of birth and checklist answers stay on your device and are never uploaded.',
      hi: 'इस पेज के सभी टूल पूरी तरह आपके ब्राउज़र में चलते हैं। माप, जन्म तिथि और चेकलिस्ट के जवाब आपके डिवाइस पर ही रहते हैं, कहीं अपलोड नहीं होते।',
      mr: 'या पानावरील सर्व साधने पूर्णपणे तुमच्या ब्राउझरमध्ये चालतात. मापे, जन्मतारखा व चेकलिस्टची उत्तरे तुमच्याच उपकरणावर राहतात, कुठेही अपलोड होत नाहीत.',
    },
    credits: 'Site by Practice OS',
  },

  /* ---------------------------------------------------------------- */
  /* UI strings (chrome that lives in components, not content)         */
  /* ---------------------------------------------------------------- */
  i18n: {
    default: 'en',
    available: ['en', 'hi', 'mr'],
    strings: {
      hi: {
        'nav.book': 'अपॉइंटमेंट बुक करें',
        'nav.bookShort': 'बुक करें',
        'nav.call': 'कॉल करें',
        'nav.menu': 'मेन्यू',
        'nav.directions': 'रास्ता देखें',
        'nav.search': 'खोजें',
        'status.open': 'अभी खुला है',
        'status.closed': 'अभी बंद है',
        'cta.whatsapp': 'व्हाट्सएप पर बुक करें',
        'cta.explore': 'सेवाएँ देखें',
        'common.close': 'बंद करें',
        'common.next': 'आगे',
        'common.back': 'पीछे',
        'common.continue': 'जारी रखें',
        'common.reset': 'रीसेट',
        'common.free': 'निःशुल्क',
        'common.print': 'प्रिंट करें',
        'common.share': 'साझा करें',
        'common.copy': 'कॉपी करें',
        'common.all': 'सभी',
        'common.today': 'आज',
        'common.tomorrow': 'कल',
        'common.optional': 'वैकल्पिक',
        'common.required': 'आवश्यक',
        'section.services': 'हमारी सेवाएँ',
        'section.reviews': 'माता-पिता की राय',
        'section.faq': 'सामान्य प्रश्न',
        'section.location': 'क्लिनिक का पता',
        'section.tools': 'माता-पिता के लिए मुफ़्त टूल',
        'fee.label': 'परामर्श शुल्क',
        'hours.label': 'समय',
        'emergency.call': 'अभी कॉल करें',

        /* Section headings authored in components — keyed by their English text. */
        'Meet the specialist': 'विशेषज्ञ से मिलिए',
        'do not dread': 'जिससे डर न लगे',
        'Inside the clinic': 'क्लिनिक के अंदर',
        'A space children': 'एक ऐसी जगह',
        "Clean, calm and built at a child's scale. Have a look before you arrive — it makes the first visit easier for everyone.":
          'साफ़, शांत और बच्चों के हिसाब से बनी। आने से पहले एक नज़र डालें — इससे पहली विज़िट सबके लिए आसान हो जाती है।',
        'Real results': 'वास्तविक परिणाम',
        'Answers to what': 'जो सबसे ज़्यादा',
        'parents ask most': 'माता-पिता पूछते हैं',
        'Fees, timings, walk-ins and vaccines — the practical things, answered plainly.':
          'शुल्क, समय, बिना अपॉइंटमेंट आना और टीके — व्यावहारिक बातें, सीधे-सादे जवाब।',
        'Parent guides': 'माता-पिता के लिए गाइड',
        'How it works': 'यह कैसे काम करता है',
        'Transparent pricing': 'पारदर्शी शुल्क',
        'Development check': 'विकास जाँच',
        'Trusted by families': 'परिवारों का भरोसा',
        'across Vasai-Virar': 'पूरे वसई-विरार में',
        'Unedited reviews from parents who have brought their children here — the good and the specific.':
          'उन माता-पिता की बिना बदली गई समीक्षाएँ जो अपने बच्चों को यहाँ लाए हैं — अच्छी और विस्तृत।',
        'Getting here is': 'यहाँ पहुँचना',
        'straightforward': 'बहुत आसान है',
        'Everything your child needs,': 'आपके बच्चे को जो चाहिए,',
        'under one roof': 'सब एक ही जगह',
        'From the first newborn check to the school-entry booster — each visit unhurried, explained, and priced the same whether you walk in or book ahead.':
          'पहली नवजात जाँच से लेकर स्कूल प्रवेश बूस्टर तक — हर विज़िट बिना जल्दबाज़ी, पूरी समझ के साथ, और शुल्क एक समान चाहे आप सीधे आएँ या पहले से बुक करें।',
        'WHO growth standards': 'WHO ग्रोथ मानक',
      },
      mr: {
        'nav.book': 'अपॉइंटमेंट बुक करा',
        'nav.bookShort': 'बुक करा',
        'nav.call': 'कॉल करा',
        'nav.menu': 'मेनू',
        'nav.directions': 'दिशा दाखवा',
        'nav.search': 'शोधा',
        'status.open': 'सध्या उघडे',
        'status.closed': 'सध्या बंद',
        'cta.whatsapp': 'व्हॉट्सअॅपवर बुक करा',
        'cta.explore': 'सेवा पहा',
        'common.close': 'बंद करा',
        'common.next': 'पुढे',
        'common.back': 'मागे',
        'common.continue': 'सुरू ठेवा',
        'common.reset': 'रीसेट',
        'common.free': 'मोफत',
        'common.print': 'प्रिंट करा',
        'common.share': 'शेअर करा',
        'common.copy': 'कॉपी करा',
        'common.all': 'सर्व',
        'common.today': 'आज',
        'common.tomorrow': 'उद्या',
        'common.optional': 'ऐच्छिक',
        'common.required': 'आवश्यक',
        'section.services': 'आमच्या सेवा',
        'section.reviews': 'पालकांचे अभिप्राय',
        'section.faq': 'नेहमीचे प्रश्न',
        'section.location': 'क्लिनिकचा पत्ता',
        'section.tools': 'पालकांसाठी मोफत साधने',
        'fee.label': 'सल्ला शुल्क',
        'hours.label': 'वेळ',
        'emergency.call': 'आत्ताच कॉल करा',

        /* Section headings authored in components — keyed by their English text. */
        'Meet the specialist': 'तज्ज्ञांची ओळख',
        'do not dread': 'ज्याची भीती वाटणार नाही',
        'Inside the clinic': 'क्लिनिकच्या आत',
        'A space children': 'अशी जागा',
        "Clean, calm and built at a child's scale. Have a look before you arrive — it makes the first visit easier for everyone.":
          'स्वच्छ, शांत आणि मुलांच्या मापाची. येण्यापूर्वी एक नजर टाका — त्यामुळे पहिली भेट सर्वांसाठी सोपी होते.',
        'Real results': 'खरे परिणाम',
        'Answers to what': 'पालक सर्वाधिक',
        'parents ask most': 'विचारतात त्याची उत्तरे',
        'Fees, timings, walk-ins and vaccines — the practical things, answered plainly.':
          'शुल्क, वेळ, थेट येणे आणि लसी — व्यावहारिक गोष्टी, सरळ उत्तरांसह.',
        'Parent guides': 'पालकांसाठी मार्गदर्शक',
        'How it works': 'हे कसे चालते',
        'Transparent pricing': 'पारदर्शक शुल्क',
        'Development check': 'विकास तपासणी',
        'Trusted by families': 'कुटुंबांचा विश्वास',
        'across Vasai-Virar': 'संपूर्ण वसई-विरारमध्ये',
        'Unedited reviews from parents who have brought their children here — the good and the specific.':
          'आपल्या मुलांना इथे आणलेल्या पालकांचे न बदललेले अभिप्राय — चांगले आणि तपशीलवार.',
        'Getting here is': 'इथे पोहोचणे',
        'straightforward': 'अगदी सोपे आहे',
        'Everything your child needs,': 'तुमच्या मुलाला लागणारे सर्व,',
        'under one roof': 'एकाच ठिकाणी',
        'From the first newborn check to the school-entry booster — each visit unhurried, explained, and priced the same whether you walk in or book ahead.':
          'पहिल्या नवजात तपासणीपासून शाळाप्रवेश बूस्टरपर्यंत — प्रत्येक भेट घाईशिवाय, समजावून सांगत, आणि शुल्क समानच — तुम्ही थेट या किंवा आधी बुक करा.',
        'WHO growth standards': 'WHO वाढ मानके',
      },
    },
  },
};
