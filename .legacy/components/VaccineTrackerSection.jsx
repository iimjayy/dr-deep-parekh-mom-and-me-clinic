import React, { useState } from 'react';
import { Syringe, Calendar, ShieldCheck, CheckCircle2, Info, MessageSquare } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function VaccineTrackerSection({ onOpenBooking }) {
  const [selectedAge, setSelectedAge] = useState(clinicData.vaccineSchedule[0].age);

  const currentSchedule = clinicData.vaccineSchedule.find(s => s.age === selectedAge) || clinicData.vaccineSchedule[0];

  return (
    <section id="vaccines" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            <Syringe className="w-3.5 h-3.5 text-amber-700" />
            <span>WHO & IAP Immunization Chart</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Painless Vaccine Schedule
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Select your baby's age stage below to see recommended vaccines and book a 100% cold-chain safe visit.
          </p>
        </div>

        {/* Outer Container Grid */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Age Selector Tabs */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Select Child's Age Stage:
              </h3>

              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
                {clinicData.vaccineSchedule.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAge(item.age)}
                    className={`p-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                      selectedAge === item.age
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                        : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.age}</span>
                    <span className="text-[10px] opacity-80">{item.vaccines.length} Shots</span>
                  </button>
                ))}
              </div>

              {/* Cold Chain Guarantee Card */}
              <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-1.5 mt-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>100% Certified Cold-Chain Storage</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Stored under constant temperature-monitored medical refrigeration for maximum safety and efficacy.
                </p>
              </div>
            </div>

            {/* Right Column: Vaccine Details Card */}
            <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Vaccination Window
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white mt-0.5">
                      {currentSchedule.age} Immunization
                    </h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    WHO / IAP Approved
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Vaccines:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentSchedule.vaccines.map((v, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-200">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/80 flex items-start space-x-3">
                  <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Clinical Importance</h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {currentSchedule.importance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Painless combination options available
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book {currentSchedule.age} Vaccine Visit</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
