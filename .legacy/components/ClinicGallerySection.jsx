import React, { useState } from 'react';
import { Camera, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function ClinicGallerySection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('All');

  const galleryItems = [
    {
      id: 1,
      title: "Dr. Mete's Children's Clinic Entrance",
      category: "Clinic Exterior",
      desc: "Official storefront & reception entrance at PNB Lane, Agrawal Nagri, Nalasopara East.",
      image: "/clinic_exterior.jpg",
      badge: "Actual Clinic Exterior",
      icon: "📍"
    },
    {
      id: 2,
      title: "Sterile Examination Room",
      category: "Consultation Room",
      desc: "Clean, spacious consultation room designed with soft pastel tones to keep infants relaxed.",
      image: "/clinic_hero.jpg",
      badge: "Sterile Environment",
      icon: "🩺"
    },
    {
      id: 3,
      title: "WHO Cold-Chain Vaccine Refrigerator",
      category: "Vaccine Cold Chain",
      desc: "Digital temperature-monitored cold storage guaranteeing 100% vaccine potency.",
      gradient: "from-sky-800 via-indigo-900 to-slate-900",
      badge: "2°C to 8°C Monitored",
      icon: "🛡️"
    }
  ];

  const categories = ['All', 'Clinic Exterior', 'Consultation Room', 'Vaccine Cold Chain'];

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-stone-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-sky-300">
            <Camera className="w-4 h-4 text-sky-700" />
            <span>Clinic Facility Tour</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore Dr. Mete's Children's Clinic
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            View our official clinic entrance, sanitized examination desk, and certified vaccine cold storage in Nalasopara East.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs soft-card-hover transition-all space-y-4 flex flex-col justify-between"
            >
              {/* Visual Card */}
              {item.image ? (
                <div className="relative h-60 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded w-max mb-1 uppercase">
                      {item.badge}
                    </span>
                    <h3 className="font-heading font-extrabold text-base text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className={`h-60 rounded-2xl bg-gradient-to-br ${item.gradient} text-white p-5 flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-200 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500">{item.category}</span>
                <button
                  onClick={onOpenBooking}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Book Visit
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
