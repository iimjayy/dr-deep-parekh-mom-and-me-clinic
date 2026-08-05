import React from 'react';
import { Award, CheckCircle2, Heart, Shield, Stethoscope, Sparkles, BookOpen } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function DoctorSection({ onOpenBooking }) {
  const { doctor } = clinicData;

  return (
    <section id="about" className="py-16 sm:py-24 bg-stone-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            <span>Meet Your Child's Doctor</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Trusted & Expert Child Care
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Combining London & Mumbai clinical excellence with a gentle, child-first approach.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photorealistic AI Doctor Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200 space-y-5">
              
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                <img 
                  src="/doctor_portrait.jpg" 
                  alt="Dr. Mahesh Mete" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {doctor.experience}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-emerald-300 font-medium mt-0.5">
                    {doctor.title}
                  </p>
                </div>
              </div>

              {/* Qualification Badges */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Qualifications & Degrees
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.degrees.map((degree, idx) => (
                    <span 
                      key={idx} 
                      className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      {degree}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Action */}
              <button
                onClick={onOpenBooking}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book Consultation with Dr. Mete</span>
              </button>

            </div>
          </div>

          {/* Right Column: Bio & Core Standards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                18+ Years of Dedicated Service in Child Healthcare
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Grid of Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MRCPCH London Standard</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Adhering to international UK pediatric clinical guidelines for diagnosis and care.
                </p>
              </div>

              <div className="bg-sky-50/80 border border-sky-200 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center space-x-2 text-sky-900 font-extrabold text-sm">
                  <Shield className="w-4 h-4 text-sky-600" />
                  <span>100% Sterile & Child-Safe</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Strictly sanitized environment with zero-wait priority triage for infants.
                </p>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Judicious Medication Policy</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Non-commercial approach — avoiding unnecessary heavy medicines or antibiotics.
                </p>
              </div>

              <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center space-x-2 text-rose-900 font-extrabold text-sm">
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  <span>Detailed Parent Counseling</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Patient guidance on child nutrition, growth milestones, and fever protocols.
                </p>
              </div>

            </div>

            {/* Quick Fee Notice */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">
                  Consultation Fee: ₹500
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Walk-in consultations & pre-booked WhatsApp appointments available
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                Reserve Slot →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
