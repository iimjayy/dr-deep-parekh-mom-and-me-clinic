import React, { useState } from 'react';
import { Baby, Syringe, TrendingUp, Stethoscope, Wind, Apple, CheckCircle, Clock, ChevronRight, X } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function ServicesSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const serviceImages = {
    'newborn-care': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop',
    'vaccination': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?q=80&w=600&auto=format&fit=crop',
    'growth-milestones': 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop',
    'pediatric-illnesses': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop',
    'asthma-allergy': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600&auto=format&fit=crop',
    'nutrition-diet': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop'
  };

  const categories = ['All', 'Newborn Care', 'Vaccination', 'Growth & Nutrition', 'Clinical Consultation', 'Asthma & Allergy'];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Baby': return <Baby className="w-5 h-5 text-emerald-600" />;
      case 'Syringe': return <Syringe className="w-5 h-5 text-sky-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-purple-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-600" />;
      case 'Apple': return <Apple className="w-5 h-5 text-rose-600" />;
      default: return <Baby className="w-5 h-5 text-emerald-600" />;
    }
  };

  const filteredServices = activeCategory === 'All'
    ? clinicData.services
    : clinicData.services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-sky-300">
            <Baby className="w-4 h-4 text-sky-700" />
            <span>Specialized Child Treatments</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Complete Pediatric Care Services
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            From Day-1 newborn care to painless WHO vaccinations, fever relief, and growth tracking.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-stone-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid with Real Human Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs soft-card-hover transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                {/* Real Human Service Photography Card Header */}
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-100">
                  <img 
                    src={serviceImages[service.id]} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-between p-3.5 text-white">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${service.badgeColor}`}>
                        {service.category}
                      </span>
                      <div className="p-1.5 rounded-lg bg-white/90 shadow-2xs">
                        {getIcon(service.icon)}
                      </div>
                    </div>
                    <h3 className="font-heading font-extrabold text-lg text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {service.details.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-1.5 rounded-full text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  Book Visit
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                {getIcon(selectedService.icon)}
              </div>
              <div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${selectedService.badgeColor}`}>
                  {selectedService.category}
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {selectedService.shortDesc}
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                What's Included:
              </h4>
              <div className="space-y-2">
                {selectedService.details.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs font-bold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2">
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Duration: {selectedService.duration}</span>
              </div>
              <span>Recovery: {selectedService.downtime}</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenBooking();
                }}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
