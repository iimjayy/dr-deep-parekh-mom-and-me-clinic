import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X, Heart, Clock, MapPin, PhoneCall, ShieldAlert } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clinicStatus, setClinicStatus] = useState({ isOpenNow: false, statusText: 'Checking...' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMins = hours * 60 + minutes;

      const morningStart = 11 * 60;       // 11:00 AM
      const morningEnd = 13 * 60 + 30;   // 01:30 PM
      const eveningStart = 18 * 60 + 30; // 06:30 PM
      const eveningEnd = 21 * 60;        // 09:00 PM

      if ((timeInMins >= morningStart && timeInMins < morningEnd) || 
          (timeInMins >= eveningStart && timeInMins < eveningEnd)) {
        setClinicStatus({ isOpenNow: true, statusText: 'Open Now • Walk-in Available' });
      } else if (timeInMins < morningStart) {
        setClinicStatus({ isOpenNow: false, statusText: 'Closed • Opens 11:00 AM' });
      } else if (timeInMins >= morningEnd && timeInMins < eveningStart) {
        setClinicStatus({ isOpenNow: false, statusText: 'Closed • Evening Session Opens 06:30 PM' });
      } else {
        setClinicStatus({ isOpenNow: false, statusText: 'Closed • Opens Tomorrow 11:00 AM' });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white shadow-xs">
      
      {/* Top Essential Header Bar (Left: Phone & Status | Center: Verified Timings | Right: Location) */}
      <div className="bg-slate-950 text-slate-100 text-[11px] font-medium py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Side: Phone Numbers & Live Status Indicator */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <a 
              href={`tel:${clinicData.contact.phone}`}
              className="flex items-center space-x-1.5 text-emerald-400 font-extrabold hover:text-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{clinicData.contact.phone}</span>
            </a>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
              <span className={`w-2 h-2 rounded-full ${clinicStatus.isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="font-bold text-slate-300 text-[10px] uppercase tracking-wide">{clinicStatus.statusText}</span>
            </div>
          </div>

          {/* Center: Verified Operating Hours */}
          <div className="hidden lg:flex items-center space-x-2 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-slate-200">
              Hours: <span className="text-white font-bold">11:00 AM – 1:30 PM</span> &amp; <span className="text-white font-bold">6:30 PM – 9:00 PM</span> (Mon–Sat)
            </span>
          </div>

          {/* Right Side: Exact Location Landmark */}
          <div className="flex items-center space-x-1.5 text-slate-300 flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="font-bold text-white truncate max-w-[220px] sm:max-w-none">
              PNB Lane, Agrawal Nagri, Nalasopara East
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className={`transition-all duration-200 ${
        scrolled ? 'py-3 bg-white/95 backdrop-blur-md' : 'py-3.5 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight whitespace-nowrap">
                  Dr. Mete's
                </span>
                <span className="bg-emerald-100 text-emerald-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                  Children's Clinic
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links - Single Line */}
            <nav className="hidden lg:flex items-center space-x-7">
              <a href="#about" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                About Doctor
              </a>
              <a href="#services" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Specialized Care
              </a>
              <a href="#vaccines" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap flex items-center gap-1">
                <span>Vaccine Tracker</span>
                <span className="bg-amber-100 text-amber-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded">WHO</span>
              </a>
              <a href="#milestones" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Growth Milestones
              </a>
              <a href="#reviews" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Reviews (4.9★)
              </a>
              <a href="#location" className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Location & Hours
              </a>
            </nav>

            {/* Header Right Action - Single Clean CTA */}
            <div className="hidden sm:flex items-center flex-shrink-0">
              <button
                onClick={onOpenBooking}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2 rounded-full text-xs shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-full text-xs"
              >
                Book
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2">
              <a 
                href="#about" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                About Dr. Mahesh Mete
              </a>
              <a 
                href="#services" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Specialized Care
              </a>
              <a 
                href="#vaccines" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Vaccine Tracker</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">WHO Chart</span>
              </a>
              <a 
                href="#milestones" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Growth Milestones
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Reviews (4.9★)
              </a>
              <a 
                href="#location" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Location & Hours
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => { setIsOpen(false); onOpenBooking(); }}
                className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Appointment via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
