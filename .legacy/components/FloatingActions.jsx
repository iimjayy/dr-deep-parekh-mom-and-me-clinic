import React from 'react';
import { MessageSquare, Phone, Calendar } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function FloatingActions({ onOpenBooking }) {
  return (
    <>
      {/* Desktop Floating WhatsApp Badge (Bottom Right) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end space-y-3">
        <button
          onClick={onOpenBooking}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-600/30 flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 group border-2 border-white"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-bold">
              Instant Booking
            </div>
            <div className="text-xs">
              Chat on WhatsApp
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-lg">
        <a
          href={`tel:${clinicData.contact.phone}`}
          className="w-1/2 bg-slate-100 text-slate-800 font-bold py-2.5 rounded-full text-xs flex items-center justify-center space-x-2 border border-slate-200"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Call Clinic</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="w-1/2 bg-emerald-600 text-white font-bold py-2.5 rounded-full text-xs flex items-center justify-center space-x-2 shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book WhatsApp</span>
        </button>
      </div>
    </>
  );
}
