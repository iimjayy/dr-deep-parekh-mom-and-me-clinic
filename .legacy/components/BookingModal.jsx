import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clinicData } from '../data/clinicData';

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: initialData.childAge || '',
    parentName: '',
    parentPhone: '',
    service: initialData.concern || 'General Pediatric Consultation',
    preferredDate: '',
    slot: 'Morning (10:30 AM - 01:30 PM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Build pre-formatted WhatsApp Message
    const msg = `Hello Dr. Mete's Children's Clinic! 👋%0A%0AI would like to book a consultation with *Dr. Mahesh Mete*:%0A%0A👶 *Child Name:* ${encodeURIComponent(formData.childName || 'Child')}%0A🎂 *Child Age:* ${encodeURIComponent(formData.childAge || 'Not specified')}%0A🩺 *Reason/Service:* ${encodeURIComponent(formData.service)}%0A📅 *Preferred Date:* ${encodeURIComponent(formData.preferredDate || 'Earliest Available')}%0A⏰ *Preferred Time Slot:* ${encodeURIComponent(formData.slot)}%0A👤 *Parent Name:* ${encodeURIComponent(formData.parentName || 'Parent')}%0A📞 *Contact Phone:* ${encodeURIComponent(formData.parentPhone || clinicData.contact.phone)}%0A📝 *Notes:* ${encodeURIComponent(formData.notes || 'None')}%0A%0APlease confirm the appointment availability. Thank you!`;

    const waUrl = `https://wa.me/${clinicData.contact.whatsapp}?text=${msg}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
              🎉
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">
              Appointment Request Sent!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We are opening WhatsApp to send your booking details directly to Dr. Mete's clinic desk.
            </p>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-medium">
              If WhatsApp didn't open automatically, click below:
            </div>
            <button
              onClick={() => {
                const msg = `Hello Dr. Mete's Children's Clinic! I would like to book an appointment with Dr. Mahesh Mete for my child ${formData.childName}.`;
                window.open(`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open WhatsApp Direct</span>
            </button>
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:underline pt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Booking</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Book Consultation with Dr. Mete
              </h3>
              <p className="text-xs text-slate-500">
                Consultation Fee: ₹500 • Nalasopara East Clinic
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Service Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Service / Concern
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  <option value="General Pediatric Consultation">General Pediatric Consultation (Fever/Cold)</option>
                  <option value="Newborn Care & Jaundice Screening">Newborn Care & Jaundice Screening</option>
                  <option value="Painless Vaccination (WHO/IAP)">Painless Vaccination (WHO/IAP)</option>
                  <option value="Child Growth & Milestone Check">Child Growth & Milestone Check</option>
                  <option value="Childhood Asthma & Nebulization">Childhood Asthma & Nebulization</option>
                  <option value="Child Nutrition & Picky Eater Plan">Child Nutrition & Picky Eater Plan</option>
                </select>
              </div>

              {/* Child Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Child's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Child's Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6 Months / 3 Yrs"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Parent Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Parent's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Slot & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Morning (10:30 AM - 01:30 PM)">Morning (10:30 AM - 01:30 PM)</option>
                    <option value="Evening (06:30 PM - 09:30 PM)">Evening (06:30 PM - 09:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 mt-4"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Send via WhatsApp</span>
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
