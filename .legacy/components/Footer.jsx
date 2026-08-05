import React from 'react';
import { Heart, Phone, MapPin, Award, ShieldCheck, ArrowUp } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Doctor Profile */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  Dr. Mete's
                </span>
                <span className="ml-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Children's Clinic
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dr. Mahesh Mete (MBBS, DNB Pediatrics Mumbai, MRCPCH London). Dedicated to providing gentle, compassionate, and world-class healthcare for infants, toddlers, and young children in Nalasopara East and Vasai-Virar.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {clinicData.doctor.badges.map((badge, idx) => (
                <span key={idx} className="bg-slate-800 text-emerald-400 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-700">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Dr. Mahesh Mete</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Pediatric Care Services</a></li>
              <li><a href="#vaccines" className="hover:text-emerald-400 transition-colors">WHO/IAP Vaccine Tracker</a></li>
              <li><a href="#milestones" className="hover:text-emerald-400 transition-colors">Child Growth Milestones</a></li>
              <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">Parent Reviews (4.9★)</a></li>
              <li><a href="#location" className="hover:text-emerald-400 transition-colors">Location & Operating Hours</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{clinicData.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{clinicData.contact.phone} / {clinicData.contact.altPhone}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-md w-full"
                >
                  Book Consultation via WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. Mete's Children's Clinic. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
