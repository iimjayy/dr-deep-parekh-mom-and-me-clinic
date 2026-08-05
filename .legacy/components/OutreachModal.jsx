import React, { useState } from 'react';
import { X, Copy, Check, Send, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function OutreachModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const outreachText = `Hi Dr. Mete! 👋

Hope you’re having a great week!

My name is Jaydeepsinh Jadeja, a local web developer & digital growth specialist in Vasai-Virar.

While searching on Google Maps for top pediatric specialists in our area, your clinic immediately caught my eye—4.9★ with 633+ reviews is incredible! 👏

Seeing your clinic's outstanding reputation, I took the initiative to build a custom, high-converting website prototype designed specifically for Dr. Mete's Children's Clinic.

🚀 How this will directly bring more local parents to your clinic:

• 📲 Instant WhatsApp Direct Booking: Parents select their child's concern & age and book directly into your WhatsApp with 1 tap—turning casual site visitors into confirmed consultations faster.
• 💉 Interactive WHO & IAP Vaccine Tracker: Educates parents on upcoming vaccination schedules and prompts them to book timely cold-chain vaccine slots.
• 🩺 60-Second Child Symptom Checker: An interactive quiz that guides parents when their child has fever or milestone concerns before visiting.
• 📍 Dominant Local SEO & Google Maps Presence: Optimized so nearby parents searching for "best pediatrician in Nalasopara" find you first.

I’d love to send you a quick 1-minute video preview of the site—zero pressure at all, just wanted to share what I put together for you!

Would you be open to a quick 5-minute chat or a brief drop-in at your clinic in Agrawal Nagri, PNB Lane when you're free?

Best regards,
Jaydeepsinh Jadeja
📞 Local Web & Growth Developer`;

  const handleCopy = () => {
    navigator.clipboard.writeText(outreachText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Acquisition Outreach Pitch</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900">
            WhatsApp Outreach Script for Dr. Mahesh Mete
          </h3>
          <p className="text-xs text-slate-500">
            High-converting personalized pitch designed for Dr. Mete's Children's Clinic.
          </p>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-sans text-xs space-y-3 relative border border-slate-800 leading-relaxed shadow-inner">
          <pre className="whitespace-pre-wrap font-sans">
            {outreachText}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleCopy}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Pitch to Clipboard!' : 'Copy Outreach Pitch'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
