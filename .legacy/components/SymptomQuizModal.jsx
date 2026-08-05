import React, { useState } from 'react';
import { Activity, X, ChevronRight, ArrowLeft, CheckCircle2, AlertCircle, HeartHandshake } from 'lucide-react';

export default function SymptomQuizModal({ isOpen, onClose, onFinishQuiz }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    concern: '',
    childAge: '',
    duration: '',
    feverLevel: ''
  });

  if (!isOpen) return null;

  const handleSelectConcern = (concern) => {
    setAnswers({ ...answers, concern });
    setStep(2);
  };

  const handleSelectAge = (childAge) => {
    setAnswers({ ...answers, childAge });
    setStep(3);
  };

  const handleFinish = () => {
    onClose();
    onFinishQuiz(answers);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Step {step} of 3 • 60-Sec Symptom Check
            </span>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Child Health Guidance Assistant
            </h3>
          </div>
        </div>

        {/* Step 1: Main Concern */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              What is your primary concern for your child today?
            </h4>
            <div className="space-y-2.5">
              {[
                { label: '🤒 High Fever, Cold or Cough', desc: 'Fever above 100°F, runny nose, or chest congestion' },
                { label: '👶 Newborn Care & Feeding', desc: 'Jaundice check, breastfeeding issues, or umbilical cord care' },
                { label: '💉 Routine Vaccination Due', desc: 'Upcoming WHO/IAP painless vaccine requirement' },
                { label: '📈 Growth & Milestone Check', desc: 'Speech delays, height/weight concerns, fussy eater' },
                { label: '🤢 Vomiting, Stomach Ache or Diarrhea', desc: 'Loose motions, dehydration symptoms, appetite loss' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectConcern(item.label)}
                  className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Child Age */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              What is your child's age group?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Newborn (0-28 days)',
                'Infant (1-12 months)',
                'Toddler (1-3 years)',
                'Preschooler (3-5 years)',
                'School Age (5-12 years)',
                'Teen (12+ years)'
              ].map((age, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAge(age)}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center text-xs font-bold text-slate-800 transition-all"
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Personalized Guidance Summary */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Personalized Recommendation Generated!</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1.5 border-t border-emerald-200/60 pt-2">
                <p><strong>Primary Concern:</strong> {answers.concern}</p>
                <p><strong>Child's Age Group:</strong> {answers.childAge}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2 font-bold text-slate-900">
                <HeartHandshake className="w-4 h-4 text-sky-600" />
                <span>Dr. Mete's Guidance Note:</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                For {answers.concern.toLowerCase()} in {answers.childAge.toLowerCase()}, an in-person pediatric evaluation by Dr. Mahesh Mete ensures accurate dosage and gentle recovery without delay.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Book Priority Consultation with Dr. Mete</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
