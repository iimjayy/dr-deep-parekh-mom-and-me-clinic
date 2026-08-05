import React from 'react';
import { Star, Calendar, Activity, ArrowRight, ShieldCheck, Heart, Award, Stethoscope } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Hero({ onOpenBooking, onOpenQuiz }) {
  return (
    <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-stone-50 overflow-hidden">
      
      {/* Subtle Ambient Embellishments */}
      <div className="absolute top-10 left-6 text-3xl opacity-25 animate-float pointer-events-none select-none">
        🎈
      </div>
      <div className="absolute top-20 right-10 text-3xl opacity-20 animate-float-delayed pointer-events-none select-none">
        🧸
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Rating Pill */}
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 shadow-2xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-slate-900">4.9 / 5.0</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold">633+ Verified Google Reviews</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
              Gentle & Expert Care for Your <span className="text-gradient-teal">Child’s Health</span>
            </h1>

            {/* Credentials Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-md">
                Dr. Mahesh Mete
              </span>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-md border border-emerald-200">
                MBBS, DNB Pediatrics (Mumbai), MRCPCH (London)
              </span>
            </div>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Specialized newborn care, painless WHO vaccinations, and complete pediatric illness care in a warm, comforting environment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-102 active:scale-98 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Take 60-Sec Symptom Quiz</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">WHO Cold-Chain</h4>
                  <p className="text-[11px] text-slate-500">100% Safe Vaccines</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-700 flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Child-Friendly</h4>
                  <p className="text-[11px] text-slate-500">Zero-Stress Clinic</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-800 flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">London Qualified</h4>
                  <p className="text-[11px] text-slate-500">18+ Yrs Experience</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Zoomed-out Standing Doctor Portrait Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200 space-y-5 relative group">
              
              {/* Doctor Image Showcase (Full Standing Pose & Pediatric Background) */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-900">
                <img 
                  src="/doctor_portrait.jpg" 
                  alt="Dr. Mahesh Mete - Senior Pediatrician" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded">
                      Lead Specialist
                    </span>
                    <span className="text-[11px] font-semibold text-slate-200">
                      Nalasopara East
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white mt-0.5">
                    Dr. Mahesh Mete
                  </h3>
                  <p className="text-xs text-emerald-300 font-medium">
                    MBBS • DNB Pediatrics • MRCPCH London
                  </p>
                </div>
              </div>

              {/* Consultation Info Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium uppercase block">Consultation Fee</span>
                  <span className="font-extrabold text-emerald-700">₹500 (Walk-in / Appt)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium uppercase block">Location</span>
                  <span className="font-extrabold text-slate-900 truncate block">PNB Lane, Agrawal Nagri</span>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Book Visit with Dr. Mete</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
