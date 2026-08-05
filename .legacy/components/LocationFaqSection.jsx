import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function LocationFaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Location & Actual Storefront Card */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>Clinic Location & Directions</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 tracking-tight">
                Visit Dr. Mete's Children's Clinic
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Conveniently located in Nalasopara East, easily accessible from Vasai-Nalasopara Link Road.
              </p>
            </div>

            {/* Actual Exterior Storefront Photo Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
              
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-100">
                <img 
                  src="/clinic_exterior.jpg" 
                  alt="Dr. Mete's Children's Clinic Storefront" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded w-max mb-1 uppercase">
                    Actual Clinic Storefront
                  </span>
                  <h4 className="font-heading font-extrabold text-lg text-white">
                    Dr. Mete's Children's Clinic
                  </h4>
                  <p className="text-xs text-slate-200">
                    B-13, PNB Lane, Agrawal Nagri, Nalasopara East
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Full Address
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 leading-relaxed">
                    {clinicData.contact.address}
                  </p>
                  <p className="text-xs text-emerald-700 font-bold mt-1">
                    Landmark: {clinicData.contact.landmark}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-400 uppercase">
                      Morning Session
                    </h5>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {clinicData.timings.morning}
                    </p>
                    <p className="text-[10px] text-slate-500">{clinicData.timings.days}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-400 uppercase">
                      Evening Session
                    </h5>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {clinicData.timings.evening}
                    </p>
                    <p className="text-[10px] text-slate-500">{clinicData.timings.days}</p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`tel:${clinicData.contact.phone}`}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call {clinicData.contact.phone}</span>
                </a>

                <a
                  href={clinicData.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 text-xs font-bold bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full border border-sky-200">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Parent FAQs</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Quick answers regarding consultations, vaccines, and clinic procedures.
              </p>
            </div>

            <div className="space-y-3">
              {clinicData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
