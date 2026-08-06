/**
 * Tenant: Dr. Deep Parekh's Mom & Me Clinic — Ghatkopar East, Mumbai.
 *
 * Pediatrician & Neonatologist: Dr. Deep B. Parekh (MBBS, DCH, DNB Paediatrics — 19+ Yrs Exp)
 * Obstetrician & Gynecologist: Dr. Charmi D. Parekh (MBBS, MS/DGO)
 * 808, G Square Building, Jawahar Road, above Kalyan Jewellers, Ghatkopar East, Mumbai.
 * Phone / WhatsApp: +91 98199 75927
 */

const WHATSAPP = '919819975927';

export default {
  id: 'dr-deep-parekh-mom-and-me',
  vertical: 'pediatrics',

  /* ---------------------------------------------------------------- */
  /* Brand & appearance                                                */
  /* ---------------------------------------------------------------- */
  brand: {
    name: "Dr. Deep Parekh's",
    nameAccent: { en: "Mom & Me Clinic", hi: 'मोम एंड मी क्लिनिक', mr: 'मोम अँड मी क्लिनिक' },
    legalName: "Dr. Deep Parekh's Mom & Me Clinic",
    tagline: {
      en: 'Trusted Pediatric, Neonatal & Maternity Care in Ghatkopar East',
      hi: 'घाटकोपर ईस्ट में विश्वसनीय बाल रोग, नवजात एवं मातृ स्वास्थ्य केंद्र',
      mr: 'घाटकोपर ईस्टमध्ये विश्वासार्ह बालरोग, नवजात आणि मातृ आरोग्य केंद्र',
    },
    logo: { type: 'icon', icon: 'Baby' },
    colors: {
      primary: '#0284c7', // Sky Blue / Medical Cyan
      accent: '#0d9488',  // Teal
      highlight: '#f59e0b', // Warm Amber
      neutralTint: 0.008,
    },
    fonts: { heading: 'Outfit', body: 'Plus Jakarta Sans' },
    radius: 'rounded',
    appearance: 'light',
  },

  meta: {
    title: "Dr. Deep Parekh's Mom & Me Clinic | Pediatrician & Neonatologist, Ghatkopar East",
    description:
      "Dr. Deep B. Parekh — MBBS, DCH, DNB Paediatrics (19+ Yrs Exp) & Dr. Charmi D. Parekh. Newborn care, painless WHO/IAP vaccination, WHO growth tracking, pediatric asthma, & child healthcare in Ghatkopar East, Mumbai. 4.8★ from 359+ Google reviews.",
    keywords: [
      'pediatrician in Ghatkopar East', 'child specialist Ghatkopar', 'neonatologist Ghatkopar',
      'Dr Deep Parekh', 'Mom and Me Clinic Ghatkopar', 'Dr Charmi Parekh Gynecologist',
      'painless vaccination Ghatkopar', 'child doctor near Kalyan Jewellers Ghatkopar',
      'G Square Building Ghatkopar East doctor', 'WHO growth chart pediatrician Mumbai',
      'बाल रोग विशेषज्ञ घाटकोपर', 'बालरोगतज्ज्ञ घाटकोपर पूर्व',
    ],
    ogImage: '/hero_clinic_reception.jpg',
    canonical: '',
  },

  /* ---------------------------------------------------------------- */
  /* The business                                                      */
  /* ---------------------------------------------------------------- */
  business: {
    schemaType: 'MedicalClinic',
    professionalSchemaType: 'Physician',
    serviceSchemaType: 'MedicalProcedure',
    areaServed: ['Ghatkopar East', 'Ghatkopar West', 'Pant Nagar', 'Saibaba Nagar', 'Garodia Nagar', 'Vidyavihar', 'Kurla East', 'Chembur', 'Vikhroli'],

    professional: {
      name: { en: 'Dr. Deep B. Parekh', hi: 'डॉ. दीप बी. पारेख', mr: 'डॉ. दीप बी. पारेख' },
      title: {
        en: 'Senior Consultant Pediatrician & Neonatologist',
        hi: 'वरिष्ठ बाल रोग एवं नवजात शिशु विशेषज्ञ',
        mr: 'ज्येष्ठ बालरोग व नवजात शिशुतज्ज्ञ',
      },
      shortName: { en: 'Dr. Deep Parekh', hi: 'डॉ. दीप पारेख', mr: 'डॉ. दीप पारेख' },
      photo: '/doctor_portrait.jpg',
      experienceYears: 19,
      registration: 'Maharashtra Medical Council',
      credentials: [
        { label: 'MBBS', issuer: 'MUHS Nashik (2007)', icon: 'GraduationCap' },
        { label: 'DCH', issuer: 'CPS Mumbai (2008)', icon: 'Award' },
        { label: 'DNB Paediatrics', issuer: 'National Board of Examinations, Delhi (2012)', icon: 'Crown' },
      ],
      bio: {
        en: 'Dr. Deep B. Parekh has spent 19 years caring for newborns, infants and growing children across Mumbai. Trained in DNB Paediatrics in Delhi and holding DCH from Mumbai, he is renowned locally for two core pillars: a genuinely painless vaccination technique, and an evidence-based, zero-unnecessary-antibiotics philosophy.',
        hi: 'डॉ. दीप बी. पारेख ने 19 वर्षों तक नवजात शिशुओं, छोटे बच्चों और बढ़ते बच्चों की देखभाल की है। DNB पीडियाट्रिक्स और DCH धारक, डॉ. पारेख घाटकोपर ईस्ट में दो मुख्य सिद्धांतों के लिए जाने जाते हैं — वास्तव में दर्द रहित टीकाकरण, और बिना ज़रूरत एंटीबायोटिक न देने की सख़्त नीति।',
        mr: 'डॉ. दीप बी. पारेख यांनी १९ वर्षे नवजात बालके, लहान मुले आणि वाढत्या मुलांची काळजी घेतली आहे. DNB बालरोग आणि DCH पदवीधारक, डॉ. पारेख वेदनारहित लसीकरण आणि अनावश्यक अँटिबायोटिक्स न देण्याच्या तत्त्वासाठी प्रसिद्ध आहेत.',
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
        { year: '2007', title: { en: 'MBBS Graduation', hi: 'MBBS स्नातक', mr: 'MBBS पदवी' }, detail: { en: 'Completed medical degree with distinction from MUHS Nashik.', hi: 'एमयूएचएस नासिक से चिकित्सा स्नातक परीक्षा उत्तीर्ण की।', mr: 'एमयूएचएस नाशिकमधून वैद्यकीय पदवी पूर्ण केली.' } },
        { year: '2008', title: { en: 'DCH (Diploma in Child Health)', hi: 'DCH (डिप्लोमा इन चाइल्ड हेल्थ)', mr: 'DCH (डिप्लोमा इन चाइल्ड हेल्थ)' }, detail: { en: 'Specialized postgraduate training at College of Physicians & Surgeons, Mumbai.', hi: 'कॉलेज ऑफ फिजिशियंस एंड सर्जन, मुंबई से स्नातकोत्तर प्रशिक्षण।', mr: 'कॉलेज ऑफ फिजिशियन्स अँड सर्जन्स, मुंबईमधून पदव्युत्तर शिक्षण.' } },
        { year: '2012', title: { en: 'DNB Paediatrics', hi: 'DNB बाल रोग', mr: 'DNB बालरोग' }, detail: { en: 'National Board of Examinations specialist certification in Delhi.', hi: 'नेशनल बोर्ड ऑफ एग्जामिनेशंस, नई दिल्ली से विशेषज्ञता हासिल की।', mr: 'नॅशनल बोर्ड ऑफ एक्झामिनेशन्स, नवी दिल्लीकडून विशेष पदवी.' } },
        { year: '2015', title: { en: 'Mom & Me Clinic Founded', hi: 'मोम एंड मी क्लिनिक की स्थापना', mr: 'मोम अँड मी क्लिनिकची स्थापना' }, detail: { en: 'Established premier mother & child healthcare facility in Ghatkopar East.', hi: 'घाटकोपर ईस्ट में प्रीमियर मदर एंड चाइल्ड हेल्थकेयर सेंटर की शुरुआत।', mr: 'घाटकोपर पूर्वमध्ये अत्याधुनिक माता व बाल आरोग्य केंद्राची स्थापना.' } },
        { year: 'Today', title: { en: '35,000+ Happy Children', hi: '35,000+ खुशहाल बच्चे', mr: '३५,०००+ समाधानी मुले' }, detail: { en: 'Over 359+ 5-star Google reviews and 1,200+ Practo recommendations.', hi: '359+ 5-स्टार गूगल समीक्षाएं और 1200+ प्राक्टो प्रशंसापत्र।', mr: '३५९+ ५-स्टार गूगल रिव्ह्यूज आणि १,२००+ प्राक्टो शिफारसी.' } },
      ],
      languages: ['English', 'हिन्दी', 'मराठी', 'ગુજરાતી'],
    },

    contact: {
      phone: '09819975927',
      altPhone: '09819975927',
      whatsapp: WHATSAPP,
      email: 'contact@drdeepparekhclinic.com',
      address: {
        street: '808, 8th Floor, G Square Building, Jawahar Road',
        locality: 'Ghatkopar East',
        region: 'Maharashtra',
        postalCode: '400077',
        country: 'IN',
        geoRegion: 'IN-MH',
        lat: 19.0860,
        lng: 72.9081,
      },
      landmark: {
        en: 'Above Kalyan Jewellers, Near BMC Office & Ghatkopar Railway Station',
        hi: 'कल्याण ज्वेलर्स के ऊपर, बीएमसी कार्यालय एवं रेलवे स्टेशन के पास',
        mr: 'कल्याण ज्वेलर्सच्या वर, बीएमसी कार्यालय व रेल्वे स्टेशनजवळ',
      },
      mapUrl: "https://maps.google.com/?q=Dr.+Deep+Parekh+Mom+and+Me+Clinic+Ghatkopar+East+Mumbai",
      mapEmbed: "https://www.google.com/maps?q=Ghatkopar+East,+Mumbai,+Maharashtra+400077&output=embed",
      travel: [
        {
          icon: 'Navigation',
          label: { en: 'Ghatkopar Railway Station', hi: 'घाटकोपर रेलवे स्टेशन', mr: 'घाटकोपर रेल्वे स्टेशन' },
          detail: { en: '≈ 200m — 2 min walk from East exit', hi: '≈ 200 मीटर — ईस्ट निकास से 2 मिनट पैदल', mr: '≈ २०० मीटर — पूर्व बाहेरून २ मिनिटे चालत' },
        },
        {
          icon: 'Car',
          label: { en: 'Parking', hi: 'पार्किंग', mr: 'पार्किंग' },
          detail: { en: 'G Square Building parking & Jawahar Road visitor bays', hi: 'जी स्क्वायर बिल्डिंग और जवाहर रोड पार्किंग', mr: 'जी स्क्वेअर बिल्डिंग व जवाहर रोड पार्किंग' },
        },
        {
          icon: 'Building2',
          label: { en: 'Elevator & Landmark', hi: 'लिफ्ट एवं लैंडमार्क', mr: 'लिफ्ट व लँडमार्क' },
          detail: { en: '8th Floor elevator access above Kalyan Jewellers', hi: 'कल्याण ज्वेलर्स के ऊपर 8वीं मंजिल (लिफ्ट उपलब्ध)', mr: 'कल्याण ज्वेलर्सच्या वर ८ वा मजला (लिफ्ट उपलब्ध)' },
        },
      ],
    },

    hours: {
      mon: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      tue: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      wed: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      thu: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      fri: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      sat: [{ open: '10:30', close: '13:30' }, { open: '17:00', close: '21:00' }],
      sun: [],
      note: {
        en: 'Sunday closed. Existing patients can call for genuine emergencies at any hour.',
        hi: 'रविवार बंद। पुराने मरीज़ वास्तविक आपात स्थिति में किसी भी समय कॉल कर सकते हैं।',
        mr: 'रविवार बंद. जुने रुग्ण खऱ्या आणीबाणीत कोणत्याही वेळी फोन करू शकतात.',
      },
    },

    pricing: {
      consultationFee: 800,
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
      google: "https://maps.google.com/?q=Dr.+Deep+Parekh+Mom+and+Me+Clinic+Ghatkopar+East+Mumbai",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Section order                                                    */
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
    { id: 'beforeAfter', component: 'beforeAfter', enabled: true },
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
        en: '4.8 ★ from 359+ Google reviews • Ghatkopar East',
        hi: '359+ गूगल समीक्षाओं में 4.8 ★ • घाटकोपर ईस्ट',
        mr: '३५९+ गूगल अभिप्रायांमधून ४.८ ★ • घाटकोपर पूर्व',
      },
      headline: { en: 'Gentle, unhurried care for your', hi: 'आपके बच्चे के लिए', mr: 'तुमच्या मुलासाठी' },
      headlineAccent: { en: "child's health", hi: 'सौम्य और भरोसेमंद देखभाल', mr: 'सौम्य आणि विश्वासार्ह काळजी' },
      sub: {
        en: 'Newborn checks, genuinely painless WHO/IAP vaccination, growth tracking and pediatric care — by Dr. Deep B. Parekh (MBBS, DCH, DNB Paediatrics) & Dr. Charmi D. Parekh at Mom & Me Clinic, Ghatkopar East.',
        hi: 'नवजात जाँच, वास्तव में दर्द रहित WHO/IAP टीकाकरण, विकास ट्रैकिंग और बाल रोग इलाज — डॉ. दीप बी. पारेख (DNB, DCH) एवं डॉ. चारमी पारेख द्वारा मोम एंड मी क्लिनिक में।',
        mr: 'नवजात तपासणी, खरोखर वेदनारहित WHO/IAP लसीकरण आणि बालरोग काळजी — डॉ. दीप बी. पारेख (DNB, DCH) व डॉ. चारमी पारेख यांच्याकडून मोम अँड मी क्लिनिकमध्ये.',
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
          title: { en: 'DNB & DCH Qualified', hi: 'DNB एवं DCH योग्य', mr: 'DNB व DCH पात्र' },
          detail: { en: '19 years in practice', hi: '19 वर्ष का अनुभव', mr: '१९ वर्षांचा अनुभव' },
        },
      ],
      highlights: [
        { en: 'No unnecessary antibiotics — ever', hi: 'बिना ज़रूरत एंटीबायोटिक कभी नहीं', mr: 'अनावश्यक अँटिबायोटिक्स कधीच नाहीत' },
        { en: 'Average wait under 20 minutes when booked', hi: 'बुकिंग पर औसत प्रतीक्षा 20 मिनट से कम', mr: 'बुकिंग केल्यास सरासरी प्रतीक्षा २० मिनिटांपेक्षा कमी' },
        { en: 'English • हिन्दी • मराठी • ગુજરાતી', hi: 'English • हिन्दी • मराठी • ગુજરાતી', mr: 'English • हिन्दी • मराठी • ગુજરાતી' },
      ],
    },

    logoStrip: {
      title: { en: 'Protocols we follow', hi: 'हम जिन मानकों का पालन करते हैं', mr: 'आम्ही पाळत असलेली मानके' },
      items: [
        { icon: 'ShieldCheck', label: { en: 'WHO immunisation standards', hi: 'WHO टीकाकरण मानक', mr: 'WHO लसीकरण मानके' } },
        { icon: 'BadgeCheck', label: { en: 'IAP schedule (India)', hi: 'IAP शेड्यूल (भारत)', mr: 'IAP वेळापत्रक (भारत)' } },
        { icon: 'Crown', label: { en: 'DNB Paediatrics, New Delhi', hi: 'DNB बाल रोग, नई दिल्ली', mr: 'DNB बालरोग, नवी दिल्ली' } },
        { icon: 'Award', label: { en: 'DCH (CPS Mumbai)', hi: 'DCH (CPS मुंबई)', mr: 'DCH (CPS मुंबई)' } },
        { icon: 'HeartPulse', label: { en: 'Neonatal & Child Intensive Care', hi: 'नवजात एवं बाल गहन चिकित्सा', mr: 'नवजात व बाल अतिदक्षता' } },
        { icon: 'Thermometer', label: { en: 'Cold-chain logged storage', hi: 'कोल्ड-चेन रिकॉर्डेड भंडारण', mr: 'कोल्ड-चेन नोंदीसह साठवण' } },
      ],
    },

    stats: [
      {
        label: { en: 'Google rating', hi: 'गूगल रेटिंग', mr: 'गूगल रेटिंग' },
        value: '4.8 ★',
        subtext: { en: 'From 359+ verified reviews', hi: '359+ सत्यापित समीक्षाओं से', mr: '३५९+ पडताळलेल्या अभिप्रायांतून' },
        icon: 'Star',
      },
      {
        label: { en: 'Children cared for', hi: 'बच्चों का इलाज', mr: 'उपचार केलेली मुले' },
        value: '35,000+',
        subtext: { en: 'Across Ghatkopar since 2015', hi: '2015 से घाटकोपर में', mr: '२०१५ पासून घाटकोपरमध्ये' },
        icon: 'Baby',
      },
      {
        label: { en: 'Clinical experience', hi: 'चिकित्सकीय अनुभव', mr: 'वैद्यकीय अनुभव' },
        value: '19+ yrs',
        subtext: { en: 'DNB & DCH Paediatrics', hi: 'DNB एवं DCH बाल रोग', mr: 'DNB व DCH बालरोग' },
        icon: 'Stethoscope',
      },
      {
        label: { en: 'Practo recommendation', hi: 'प्राक्टो शिफारस', mr: 'प्राक्टो शिफारस' },
        value: '100%',
        subtext: { en: 'From 1,200+ patient stories', hi: '1200+ मरीज़ों के अनुभव से', mr: '१,२००+ रुग्णांच्या अनुभवातून' },
        icon: 'Award',
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
        id: 'maternity-gynae',
        category: { en: 'Maternity', hi: 'मातृ स्वास्थ्य', mr: 'मातृ आरोग्य' },
        title: { en: 'Mother & Maternity Care (Dr. Charmi Parekh)', hi: 'मातृ एवं स्त्री रोग सेवा', mr: 'मातृ व स्त्रीरोग सेवा' },
        icon: 'HeartHandshake',
        shortDesc: {
          en: 'Complete antenatal care, post-natal guidance, and gynecology consultations by Dr. Charmi D. Parekh.',
          hi: 'डॉ. चारमी डी. पारेख द्वारा गर्भावस्था देखभाल, प्रसव पूर्व एवं प्रसव पश्चात परामर्श।',
          mr: 'डॉ. चारमी डी. पारेख यांच्याद्वारे गरोदरपण काळजी आणि प्रसुतीपूर्व/नंतरचे मार्गदर्शन.',
        },
        details: [
          { en: 'Antenatal care and high-risk pregnancy counselling', hi: 'गर्भावस्था देखभाल और परामर्श', mr: 'गरोदरपण काळजी आणि समुपदेशन' },
          { en: 'Post-natal recovery and lactation guidance', hi: 'प्रसव पश्चात रिकवरी एवं स्तनपान मार्गदर्शन', mr: 'प्रसुतीनंतरची काळजी व स्तनपान मार्गदर्शन' },
          { en: 'Comprehensive mother & child wellness umbrella', hi: 'मां और बच्चे की संपूर्ण देखभाल', mr: 'आई आणि बाळाची संपूर्ण काळजी' },
          { en: 'Routine gynecological evaluation', hi: 'सामान्य स्त्री रोग जाँच', mr: 'सामान्य स्त्रीरोग तपासणी' },
        ],
        duration: { en: '20 min', hi: '20 मिनट', mr: '२० मिनिटे' },
        aftercare: { en: 'Follow-up as recommended', hi: 'सलाह के अनुसार फ़ॉलो-अप', mr: 'सल्ल्यानुसार फॉलो-अप' },
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
            en: 'Send your child’s age and concern on WhatsApp. You get a slot confirmation within session hours.',
            hi: 'व्हाट्सएप पर बच्चे की उम्र और समस्या भेजें। क्लिनिक समय में तुरंत पुष्टि मिलती है।',
            mr: 'व्हॉट्सअॅपवर मुलाचे वय आणि तक्रार पाठवा. सत्राच्या वेळेत लगेच पुष्टी मिळते.',
          },
          meta: { en: 'About 2 minutes', hi: 'लगभग 2 मिनट', mr: 'सुमारे २ मिनिटे' },
        },
        {
          icon: 'Clock',
          title: { en: 'Arrive & settle', hi: 'पहुँचें और बैठें', mr: 'पोहोचा व बसा' },
          detail: {
            en: '8th Floor G Square building clinic with elevator access. Play reception while you wait under 20 minutes.',
            hi: 'जी स्क्वायर 8वीं मंजिल पर लिफ्ट सुविधा। 20 मिनट से कम समय में खिलौनेदार वेटिंग एरिया।',
            mr: 'जी स्क्वेअर ८ व्या मजल्यावर लिफ्ट सोय. २० मिनिटांपेक्षा कमी वेळेत खेळांची जागा.',
          },
          meta: { en: 'Under 20 min wait', hi: '20 मिनट से कम प्रतीक्षा', mr: '२० मिनिटांपेक्षा कमी प्रतीक्षा' },
        },
        {
          icon: 'Stethoscope',
          title: { en: 'Unhurried consultation', hi: 'बिना जल्दबाज़ी परामर्श', mr: 'घाई नसलेला सल्ला' },
          detail: {
            en: 'Full examination, growth plotting, and a clear explanation of what is happening and why — before any prescription.',
            hi: 'पूरी जाँच, विकास चार्ट, और यह स्पष्ट समझाना कि क्या और क्यों हो रहा है — दवा लिखने से पहले।',
            mr: 'संपूर्ण तपासणी, वाढीचा आलेख, आणि काय व का होत आहे याचे स्पष्ट स्पष्टीकरण — औषध लिहिण्यापूर्वी.',
          },
          meta: { en: '15–30 minutes', hi: '15–30 मिनट', mr: '१५–३० मिनिटे' },
        },
        {
          icon: 'HeartHandshake',
          title: { en: 'Follow-up that follows you', hi: 'फ़ॉलो-अप जो साथ चलता है', mr: 'सोबत राहणारा फॉलो-अप' },
          detail: {
            en: 'Written instructions, WhatsApp support line, and automatic reminders before the next vaccine is due.',
            hi: 'लिखित निर्देश, व्हाट्सएप सहायता, और अगले टीके से पहले स्वतः रिमाइंडर।',
            mr: 'लेखी सूचना, व्हॉट्सअॅप मदत, आणि पुढील लसीपूर्वी स्वयंचलित स्मरणपत्र.',
          },
          meta: { en: 'Included, no charge', hi: 'शामिल, कोई शुल्क नहीं', mr: 'समाविष्ट, कोणतेही शुल्क नाही' },
        },
      ],
    },

    gallery: [
      {
        src: '/gallery/unnamed.jpg',
        title: { en: 'Piano Reception & Soft Play Lawn', hi: 'पियानो रिसेप्शन एवं सॉफ्ट प्ले एरिया', mr: 'पियानो रिसेप्शन व मऊ खेळण्याची जागा' },
        caption: {
          en: 'Child-centric piano counter with a soft grass play area to soothe young patients before consultation.',
          hi: 'छोटे बच्चों के तनाव को दूर करने के लिए डिज़ाइन किया गया पियानो काउंटर और सॉफ्ट प्ले एरिया।',
          mr: 'तपासणीपूर्वी बालकांचा ताण दूर करण्यासाठी बनवलेले पियानो काउंटर व मऊ खेळण्याची जागा.',
        },
      },
      {
        src: '/gallery/unnamed-2.jpg',
        title: { en: 'Dr. Deep Parekh Consultation Chamber', hi: 'डॉ. दीप पारेख परामर्श कक्ष', mr: 'डॉ. दीप पारेख तपासणी कक्ष' },
        caption: {
          en: 'Fully equipped pediatric examination room with comfortable seating and growth measurement tools.',
          hi: 'सुसज्जित बाल रोग जाँच कक्ष, जहाँ डॉक्टर दीप पारेख बच्चों का इलाज करते हैं।',
          mr: 'सर्व सोयींनी युक्त बालरोग तपासणी कक्ष जिथे डॉ. दीप पारेख बालकांवर उपचार करतात.',
        },
      },
      {
        src: '/gallery/unnamed-8.jpg',
        title: { en: 'Patient Waiting Lounge', hi: 'मरीज़ प्रतीक्षा लाउंज', mr: 'रुग्ण प्रतीक्षा लाउंज' },
        caption: {
          en: 'Air-conditioned, spacious lounge designed for comfortable waiting under 20 minutes.',
          hi: 'आरामदायक एयर-कंडीशन्ड वेटिंग एरिया, जहाँ औसतन 20 मिनट से कम समय में नंबर आता है।',
          mr: '२० मिनिटांपेक्षा कमी प्रतीक्षेसाठी वातानुकूलित व प्रशस्त प्रतीक्षा क्षेत्र.',
        },
      },
      {
        src: '/gallery/unnamed-3.jpg',
        title: { en: 'Clinic Interior & Ambient Lighting', hi: 'क्लिनिक इंटीरियर एवं लाइट व्यवस्था', mr: 'क्लिनिक इंटीरियर व प्रकाश व्यवस्था' },
        caption: {
          en: 'Warm, glare-free ceiling illumination and glass partitions for a clean, non-hospital feel.',
          hi: 'बच्चों को अस्पताल जैसे डर से बचाने के लिए शांत और सुंदर लाइट व्यवस्था।',
          mr: 'बालकांना रुग्णालयाची भीती वाटू नये म्हणून बनवलेली शांत व सुंदर प्रकाश सोय.',
        },
      },
      {
        src: '/gallery/unnamed-4.jpg',
        title: { en: 'Diagnostic & Growth Monitoring Station', hi: 'निदान एवं विकास माप स्टेशन', mr: 'निदान व वाढ मोजणी स्टेशन' },
        caption: {
          en: 'Digital infant weighing scales and pediatric growth trackers calibrated for precise readings.',
          hi: 'शिशुओं के सटीक वज़न और लंबाई मापन के लिए आधुनिक डिजिटल उपकरण।',
          mr: 'बाळांच्या अचूक वजन व उंची मोजणीसाठी अत्याधुनिक डिजिटल साधने.',
        },
      },
      {
        src: '/gallery/unnamed-5.jpg',
        title: { en: 'Children Activity & Play Area', hi: 'बाल गतिविधि एवं खिलौना ज़ोन', mr: 'बाल उपक्रम व खेळणी क्षेत्र' },
        caption: {
          en: 'Safe, disinfected toys and books to keep toddlers engaged during their visit.',
          hi: 'बच्चों के लिए सुरक्षित, सेनेटाइज किए गए खिलौने और किताबें।',
          mr: 'बालकांसाठी सुरक्षित व निर्जंतुक केलेली खेळणी आणि पुस्तके.',
        },
      },
      {
        src: '/gallery/unnamed-6.jpg',
        title: { en: 'Sterile Consultation Corridor', hi: 'स्टेराइल परामर्श गलियारा', mr: 'निर्जंतुक तपासणी मार्ग' },
        caption: {
          en: 'Surgically clean, well-ventilated corridor connecting waiting lounge to doctor chambers.',
          hi: 'स्वच्छ, हवादार गलियारा जो प्रतीक्षा कक्ष को डॉक्टर के चेंबर से जोड़ता है।',
          mr: 'प्रतीक्षा कक्षाला डॉक्टरांच्या कक्षाशी जोडणारा स्वच्छ व हवेशीर मार्ग.',
        },
      },
      {
        src: '/gallery/dr-deep-parekh-s-mom-me-clinic-mumbai-6926c46f64fb3.jpeg',
        title: { en: 'Mom & Me Main Reception Counter', hi: 'मोम एंड मी मुख्य रिसेप्शन काउंटर', mr: 'मोम अँड मी मुख्य रिसेप्शन काउंटर' },
        caption: {
          en: 'Welcoming front desk for instant check-in, appointments and vaccine queries.',
          hi: 'अपॉइंटमेंट और पूछताछ के लिए मुख्य रिसेप्शन काउंटर।',
          mr: 'अपॉइंटमेंट व चौकशीसाठी स्वागत कक्ष.',
        },
      },
      {
        src: '/gallery/unnamed-7.jpg',
        title: { en: 'Clinic Entrance & Landmark Signage', hi: 'क्लिनिक प्रवेश द्वार एवं साइनबोर्ड', mr: 'क्लिनिक प्रवेशद्वार व फलक' },
        caption: {
          en: 'Prominent 8th Floor entry above Kalyan Jewellers on Jawahar Road, Ghatkopar East.',
          hi: 'घाटकोपर ईस्ट, कल्याण ज्वेलर्स के ऊपर 8वीं मंजिल पर मुख्य प्रवेश द्वार।',
          mr: 'घाटकोपर पूर्व, कल्याण ज्वेलर्सच्या वर ८ व्या मजल्यावर मुख्य प्रवेशद्वार.',
        },
      },
      {
        src: '/gallery/g_square_building.jpg',
        title: { en: 'G Square Building Facade', hi: 'जी स्क्वायर बिल्डिंग बाहरी दृश्य', mr: 'जी स्क्वेअर बिल्डिंग बाह्य देखावा' },
        caption: {
          en: 'Modern commercial tower with elevator access, visitor parking and step-free entry.',
          hi: 'लिफ्ट, आगंतुक पार्किंग और आसान प्रवेश सुविधा के साथ आधुनिक जी स्क्वायर टावर।',
          mr: 'लिफ्ट, पार्किंग आणि सोप्या प्रवेशासह अत्याधुनिक जी स्क्वेअर इमारत.',
        },
      },
      {
        src: '/gallery/reception_play_area.jpg',
        title: { en: 'Soft Waiting & Toddler Zone', hi: 'सॉफ्ट वेटिंग एवं शिशु ज़ोन', mr: 'मऊ प्रतीक्षा व बाल क्षेत्र' },
        caption: {
          en: 'Spacious child-friendly seating with vibrant decor to make visits pleasant.',
          hi: 'बच्चों के अनुकूल रंगीन सजावट और आरामदायक बैठने की जगह।',
          mr: 'बालकांसाठी रंगीबेरंगी सजावट आणि आरामदायक बसण्याची सोय.',
        },
      },
      {
        src: '/gallery/doctor_consultation_room.jpg',
        title: { en: 'Pediatric Care Chamber', hi: 'बाल स्वास्थ्य देखभाल कक्ष', mr: 'बाल आरोग्य काळजी कक्ष' },
        caption: {
          en: 'Private examination setup ensuring complete privacy and comfort for mothers & babies.',
          hi: 'माता-पिता और शिशुओं के लिए पूर्ण गोपनीयता और आराम के साथ निजी परामर्श कक्ष।',
          mr: 'पालक व बाळांसाठी पूर्ण गोपनीयता आणि आरामासह खाजगी तपासणी कक्ष.',
        },
      },
    ],

    reviews: [
      {
        id: 1, author: 'Priya & Rahul Shah', rating: 5,
        date: { en: '2 weeks ago', hi: '2 हफ़्ते पहले', mr: '२ आठवड्यांपूर्वी' },
        relation: { en: 'Parents of an 8-month-old', hi: '8 महीने के बच्चे के माता-पिता', mr: '८ महिन्यांच्या बाळाचे पालक' },
        tags: [{ en: 'Vaccination', hi: 'टीकाकरण', mr: 'लसीकरण' }, { en: 'Painless', hi: 'दर्द रहित', mr: 'वेदनारहित' }],
        verified: true, helpfulCount: 28,
        text: {
          en: 'Dr. Deep Parekh is hands down the best pediatrician in Ghatkopar East! He gave our baby her vaccination without her crying at all. He explains everything in detail and never prescribes heavy medicines unnecessarily.',
          hi: 'डॉ. दीप पारेख घाटकोपर ईस्ट के सबसे अच्छे बाल रोग विशेषज्ञ हैं! उन्होंने हमारी बेटी को टीका लगाया और वह बिल्कुल नहीं रोई। वे हर बात विस्तार से समझाते हैं और बिना ज़रूरत भारी दवाइयाँ नहीं देते।',
          mr: 'डॉ. दीप पारेख घाटकोपर पूर्वमधील सर्वोत्तम बालरोगतज्ज्ञ आहेत. त्यांनी आमच्या मुलीला लस दिली आणि ती अजिबात रडली नाही. ते प्रत्येक गोष्ट सविस्तर समजावून सांगतात.',
        },
      },
      {
        id: 2, author: 'Mehta Family', rating: 5,
        date: { en: '1 month ago', hi: '1 महीने पहले', mr: '१ महिन्यापूर्वी' },
        relation: { en: 'Parents of a 4-year-old', hi: '4 साल के बच्चे के माता-पिता', mr: '४ वर्षांच्या मुलाचे पालक' },
        tags: [{ en: 'No Antibiotics', hi: 'नो एंटीबायोटिक', mr: 'नो अँटिबायोटिक्स' }, { en: 'Ghatkopar East', hi: 'घाटकोपर ईस्ट', mr: 'घाटकोपर पूर्व' }],
        verified: true, helpfulCount: 21,
        text: {
          en: 'We have been visiting Dr. Deep Parekh for 4 years now. His no-unnecessary-antibiotic stance gives us huge confidence. The Mom & Me clinic at G Square building is super clean and child-friendly.',
          hi: 'हम पिछले 4 वर्षों से डॉ. दीप पारेख के पास आ रहे हैं। बिना वजह एंटीबायोटिक न देने की उनकी नीति पर हमें पूरा भरोसा है। क्लिनिक बहुत ही साफ़ और बच्चों के लिए अनुकूल है।',
          mr: 'आम्ही गेल्या ४ वर्षांपासून डॉ. दीप पारेख यांच्याकडे येत आहोत. विनाकारण अँटिबायोटिक्स न देण्याच्या त्यांच्या धोरणावर आमचा पूर्ण विश्वास आहे.',
        },
      },
      {
        id: 3, author: 'Aniket Deshmukh', rating: 5,
        date: { en: '2 months ago', hi: '2 महीने पहले', mr: '२ महिन्यांपूर्वी' },
        relation: { en: 'Father of a newborn', hi: 'नवजात के पिता', mr: 'नवजात बाळाचे वडील' },
        tags: [{ en: 'Newborn Care', hi: 'नवजात देखभाल', mr: 'नवजात काळजी' }, { en: 'Diagnosis', hi: 'सटीक निदान', mr: 'अचूक निदान' }],
        verified: true, helpfulCount: 35,
        text: {
          en: 'Dr. Deep Parekh diagnosed our infant’s milk allergy when two other doctors missed it. Within 3 days of following his dietary changes, our baby stopped crying at night. Eternal gratitude to Mom & Me clinic!',
          hi: 'डॉ. दीप पारेख ने हमारे नवजात शिशु की दूध एलर्जी का तुरंत सही निदान किया। उनकी सलाह के 3 दिनों में ही बच्चा रात में आराम से सोने लगा। बहुत धन्यवाद!',
          mr: 'डॉ. दीप पारेख यांनी आमच्या बाळाच्या दुधाच्या ॲलर्जीचे अचूक निदान केले. ३ दिवसांतच बाळ शांत झोपू लागले. खूप खूप धन्यवाद!',
        },
      },
      {
        id: 4, author: 'Kinjal & Bhavin Patel', rating: 5,
        date: { en: '3 months ago', hi: '3 महीने पहले', mr: '३ महिन्यांपूर्वी' },
        relation: { en: 'Parents of a 3-year-old', hi: '3 साल के बच्चे के माता-पिता', mr: '३ वर्षांच्या मुलाचे पालक' },
        tags: [{ en: 'Painless Vaccine', hi: 'दर्द रहित टीका', mr: 'वेदनारहित लस' }, { en: 'G Square', hi: 'जी स्क्वायर', mr: 'जी स्क्वेअर' }],
        verified: true, helpfulCount: 19,
        text: {
          en: 'Very polite, calm and knowledgeable doctor. The painless vaccine delivery is 100% real. The clinic location right above Kalyan Jewellers near Ghatkopar station is super convenient.',
          hi: 'बहुत शांत और जानकार डॉक्टर। दर्द रहित टीकाकरण 100% सच है। कल्याण ज्वेलर्स के ऊपर क्लिनिक का स्थान बहुत ही सुविधाजनक है।',
          mr: 'अतिशय शांत आणि ज्ञानी डॉक्टर. वेदनारहित लसीकरण १००% खरे आहे. कल्याण ज्वेलर्सच्या वरील ठिकाण अत्यंत सोयीचे आहे.',
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
      ],
    },

    faqs: [
      {
        q: { en: 'What are the clinic hours for Dr. Deep Parekh?', hi: 'डॉ. दीप पारेख के क्लिनिक का समय क्या है?', mr: 'डॉ. दीप पारेख यांच्या क्लिनिकची वेळ काय आहे?' },
        a: {
          en: 'Monday to Saturday in two sessions — Morning Session 10:30 AM to 1:30 PM and Evening Session 5:00 PM to 9:00 PM. Sunday is closed for routine visits.',
          hi: 'सोमवार से शनिवार दो सत्रों में — सुबह 10:30 से 1:30 और शाम 5:00 से 9:00 बजे तक। रविवार बंद।',
          mr: 'सोमवार ते शनिवार दोन सत्रांत — सकाळी १०:३० ते १:३० आणि संध्याकाळी ५:०० ते ९:००. रविवारी बंद.',
        },
      },
      {
        q: { en: 'What does a consultation cost?', hi: 'परामर्श शुल्क कितना है?', mr: 'सल्ला शुल्क किती आहे?' },
        a: {
          en: '₹800, the same for a walk-in or a booked appointment. Vaccines are billed separately at MRP.',
          hi: '₹800 — वॉक-इन और बुक की गई अपॉइंटमेंट दोनों के लिए समान। टीके MRP पर अलग से।',
          mr: '₹८०० — वॉक-इन आणि बुक केलेल्या अपॉइंटमेंटसाठी समान. लसी MRP नुसार वेगळ्या.',
        },
      },
      {
        q: { en: 'Where is Mom & Me Clinic located in Ghatkopar East?', hi: 'मोम एंड मी क्लिनिक घाटकोपर ईस्ट में कहाँ स्थित है?', mr: 'मोम अँड मी क्लिनिक घाटकोपर पूर्वमध्ये कुठे आहे?' },
        a: {
          en: 'Office 808, 8th Floor, G Square Building, Jawahar Road, Ghatkopar East (Above Kalyan Jewellers, right near Ghatkopar Railway Station). Elevator available.',
          hi: '808, 8वीं मंजिल, जी स्क्वायर बिल्डिंग, जवाहर रोड, घाटकोपर ईस्ट (कल्याण ज्वेलर्स के ठीक ऊपर, रेलवे स्टेशन के पास)। लिफ्ट उपलब्ध है।',
          mr: '८०८, ८ वा मजला, जी स्क्वेअर बिल्डिंग, जवाहर रोड, घाटकोपर पूर्व (कल्याण ज्वेलर्सच्या वर, रेल्वे स्टेशनजवळ). लिफ्ट उपलब्ध आहे.',
        },
      },
      {
        q: { en: 'Are the vaccines genuinely painless?', hi: 'क्या टीके वाक़ई दर्द रहित हैं?', mr: 'लसी खरोखर वेदनारहित आहेत का?' },
        a: {
          en: 'No injection is literally painless, but the combination of positioning, distraction and rapid delivery means most infants settle within seconds and many sleep through it.',
          hi: 'कोई भी इंजेक्शन पूरी तरह दर्द रहित नहीं होता, लेकिन सही पोज़िशन, ध्यान बँटाने और तेज़ी के मेल से ज़्यादातर शिशु कुछ ही सेकंड में शांत हो जाते हैं।',
          mr: 'कोणतेही इंजेक्शन पूर्णपणे वेदनारहित नसते, पण योग्य स्थिती, लक्ष विचलित करणे आणि जलदपणा यामुळे बहुतेक बाळे काही सेकंदांत शांत होतात.',
        },
      },
    ],

    cta: {
      eyebrow: { en: 'Easy booking', hi: 'आसान बुकिंग', mr: 'सोपे बुकिंग' },
      title: { en: 'Give your child the care they deserve', hi: 'अपने बच्चे को दें सर्वोत्तम देखभाल', mr: 'तुमच्या मुलाला द्या सर्वोत्तम काळजी' },
      sub: {
        en: 'Walk in during clinic hours, or book on WhatsApp to bring your waiting time under 20 minutes.',
        hi: 'क्लिनिक समय में सीधे आएं, या 20 मिनट से कम प्रतीक्षा के लिए व्हाट्सएप पर बुक करें।',
        mr: 'क्लिनिक वेळेत थेट या, किंवा २० मिनिटांपेक्षा कमी प्रतीक्षेसाठी व्हॉट्सअॅपवर बुक करा.',
      },
      primaryCta: { en: 'Book an appointment', hi: 'अपॉइंटमेंट बुक करें', mr: 'अपॉइंटमेंट बुक करा' },
      secondaryCta: { en: 'Call 098199 75927', hi: 'कॉल करें 098199 75927', mr: 'कॉल करा 098199 75927' },
    },
  },
};
