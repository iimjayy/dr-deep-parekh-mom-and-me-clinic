export const clinicData = {
  name: "Dr. Mete's Children's Clinic",
  tagline: "Expert Pediatric & Neonatal Healthcare in Nalasopara East",
  doctor: {
    name: "Dr. Mahesh Mete",
    title: "Senior Pediatrician & Neonatologist",
    degrees: ["MBBS", "DNB Pediatrics (Mumbai)", "MRCPCH (London, UK)"],
    experience: "18+ Years Experience",
    consultationFee: "₹500",
    bio: "Dr. Mahesh Mete is a highly respected Senior Pediatrician and Neonatologist with over 18 years of clinical expertise across Mumbai and London. Qualified with DNB Pediatrics from Mumbai and MRCPCH from London, UK, he provides gentle, evidence-based care for newborns, infants, and growing children."
  },
  contact: {
    address: "B-13, PNB Lane, Vasai-Nalasopara Link Road, Agrawal Nagri, Nalasopara East, Vasai-Virar, Maharashtra 401209",
    landmark: "Punjab National Bank (PNB) Lane, Agrawal Nagri",
    phone: "08080118958",
    altPhone: "09890028928",
    whatsapp: "918080118958",
    googleMapsUrl: "https://maps.google.com/?q=Dr.+Mete's+Children's+Clinic+Nalasopara+East"
  },
  timings: {
    morning: "11:00 AM – 1:30 PM",
    evening: "6:30 PM – 9:00 PM",
    days: "Monday to Saturday (Sunday Closed / Emergency on Call)"
  },
  stats: [
    { label: "Google Rating", value: "4.9 ★", subtext: "From 633+ Verified Reviews" },
    { label: "Happy Children", value: "25,000+", subtext: "Healed & Treated" },
    { label: "Clinical Expertise", value: "18+ Yrs", subtext: "Mumbai & London Trained" },
    { label: "WHO Vaccines", value: "40,000+", subtext: "100% Cold-Chain Administered" }
  ],
  services: [
    {
      id: "newborn-care",
      category: "Newborn Care",
      title: "Newborn & Infant Health Monitoring",
      icon: "Baby",
      badgeColor: "bg-emerald-100 text-emerald-900 border border-emerald-300",
      shortDesc: "Complete neonatal screening, jaundice check, feeding assessment, and weight tracking.",
      details: [
        "Infant jaundice (Bilirubin) assessment & guidance",
        "Lactation & feeding pattern counseling for mothers",
        "Head circumference & physiological weight checks",
        "Umbilical cord hygiene & skin care guidance"
      ],
      duration: "20-30 mins",
      downtime: "Immediate"
    },
    {
      id: "vaccination",
      category: "Vaccination",
      title: "WHO & IAP Certified Painless Vaccination",
      icon: "Syringe",
      badgeColor: "bg-sky-100 text-sky-900 border border-sky-300",
      shortDesc: "100% digital cold-chain vaccine administration with gentle painless techniques.",
      details: [
        "Complete WHO & Indian Academy of Pediatrics (IAP) immunization schedule",
        "Painless injection technique minimizing infant discomfort",
        "Temperature-monitored 2°C-8°C cold storage assurance",
        "Digital WhatsApp vaccination reminders for parents"
      ],
      duration: "15 mins",
      downtime: "Mild fever monitoring (24h)"
    },
    {
      id: "growth-milestones",
      category: "Growth & Nutrition",
      title: "Child Growth & Milestone Screening",
      icon: "TrendingUp",
      badgeColor: "bg-amber-100 text-amber-900 border border-amber-300",
      shortDesc: "WHO growth percentile chart tracking, speech/motor milestones, and pediatric nutrition.",
      details: [
        "WHO Growth Percentile (Height, Weight, Head Circumference) plotting",
        "Developmental milestone assessment (Speech, Walking, Social)",
        "Appetite loss & pediatric nutrition planning",
        "Vitamin & Calcium deficiency screening"
      ],
      duration: "20 mins",
      downtime: "Immediate"
    },
    {
      id: "pediatric-illnesses",
      category: "Clinical Consultation",
      title: "Acute Fever, Cough & Infection Treatment",
      icon: "Stethoscope",
      badgeColor: "bg-purple-100 text-purple-900 border border-purple-300",
      shortDesc: "Evidence-based diagnosis for seasonal viral fevers, throat infections, and stomach bugs.",
      details: [
        "Judicious antibiotic policy — avoiding unnecessary medicines",
        "Rapid fever management & dehydration prevention",
        "Stomach infection, vomiting & diarrhea care",
        "Ear infection & throat swab evaluation"
      ],
      duration: "15-20 mins",
      downtime: "1-3 days recovery"
    },
    {
      id: "asthma-allergy",
      category: "Asthma & Allergy",
      title: "Childhood Asthma & Nebulization Care",
      icon: "Wind",
      badgeColor: "bg-teal-100 text-teal-900 border border-teal-300",
      shortDesc: "In-clinic sterile nebulization, wheezing management, and skin allergy treatment.",
      details: [
        "In-clinic sterile aerosol nebulization therapy",
        "Childhood allergic rhinitis & wheezing relief",
        "Infant eczema & sensitive skin rash protocols",
        "Dust & seasonal allergy preventive guidance"
      ],
      duration: "15-25 mins",
      downtime: "Immediate breathing relief"
    },
    {
      id: "nutrition-diet",
      category: "Growth & Nutrition",
      title: "Pediatric Diet & Feeding Counseling",
      icon: "Apple",
      badgeColor: "bg-rose-100 text-rose-900 border border-rose-300",
      shortDesc: "Tailored dietary plans for picky eaters, underweight infants, and anemia prevention.",
      details: [
        "Customized weaning & solid food transition plans (6+ months)",
        "Picky eater behavioral nutrition strategy",
        "Iron deficiency anemia screening & diet charts",
        "Healthy weight gain protocols for toddlers"
      ],
      duration: "20 mins",
      downtime: "Immediate"
    }
  ],
  reviews: [
    {
      id: 1,
      author: "Pooja Sharma",
      rating: 5,
      date: "2 weeks ago",
      relation: "Mother of 8-month-old",
      text: "Dr. Mahesh Mete is hands down the best pediatrician in Vasai-Nalasopara! He gave my baby vaccination without her crying at all. He explains everything in detail and never prescribes heavy medicines unnecessarily.",
      helpfulCount: 24,
      verified: true
    },
    {
      id: 2,
      author: "Rahul Verma",
      rating: 5,
      date: "1 month ago",
      relation: "Father of 3-year-old",
      text: "Very calm and knowledgeable doctor. My son had high viral fever at night. Dr. Mete guided us over call and when we visited the clinic, his treatment brought down the fever within hours. Highly recommended!",
      helpfulCount: 19,
      verified: true
    },
    {
      id: 3,
      author: "Anjali Gupta",
      rating: 5,
      date: "2 months ago",
      relation: "Mother of newborn",
      text: "We have been visiting Dr. Mete since my daughter was born. His MRCPCH London experience really shows in his diagnosis. The clinic is clean, child-friendly, and very hygienic.",
      helpfulCount: 31,
      verified: true
    },
    {
      id: 4,
      author: "Vikram Patil",
      rating: 5,
      date: "3 months ago",
      relation: "Father of 5-year-old",
      text: "Proper guidance for child vaccination and growth. No long waiting times if you book an appointment. Extremely polite staff and reasonable consultation fee of ₹500.",
      helpfulCount: 15,
      verified: true
    }
  ],
  faqs: [
    {
      q: "What are Dr. Mete's clinic operating hours?",
      a: "The clinic operates Monday to Saturday in two sessions: Morning 11:00 AM – 1:30 PM and Evening 6:30 PM – 9:00 PM. Sunday is closed."
    },
    {
      q: "What is the consultation fee at Dr. Mete's Children's Clinic?",
      a: "The consultation fee is ₹500 for both walk-in visits and pre-booked appointments."
    },
    {
      q: "Are painless WHO vaccinations available?",
      a: "Yes, 100% WHO and IAP certified vaccines are available under strict 2°C–8°C cold-chain storage with painless administration techniques."
    },
    {
      q: "Where is the clinic located in Nalasopara East?",
      a: "The clinic is located at B-13, PNB Lane, Vasai-Nalasopara Link Road, Agrawal Nagri, Nalasopara East, Maharashtra 401209."
    },
    {
      q: "Can I book an appointment via WhatsApp?",
      a: "Yes, you can click the 'Book Appointment' button on the website to generate a pre-formatted WhatsApp consultation request directly."
    }
  ]
};
