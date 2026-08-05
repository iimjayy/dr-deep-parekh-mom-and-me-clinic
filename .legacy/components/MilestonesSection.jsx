import React, { useState } from 'react';
import { TrendingUp, CheckCircle, Heart, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function MilestonesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const currentStage = clinicData.milestones[activeTab];

  return (
    <section id="milestones" className="py-16 sm:py-24 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-300">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Growth & Milestone Screening</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Child Growth Milestones Chart
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Click through your child's age stage to check off key physical, speech, and motor achievements.
          </p>
        </div>

        {/* Stage Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {clinicData.milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-emerald-600 text-white shadow-sm scale-105'
                  : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {m.stage}
            </button>
          ))}
        </div>

        {/* Milestone Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
                {currentStage.badge}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-2">
                {currentStage.title} ({currentStage.stage})
              </h3>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-amber-900 font-extrabold bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>WHO Growth Benchmark</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentStage.items.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-start space-x-3 hover:border-emerald-300 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 p-4 rounded-2xl">
            <div className="flex items-center space-x-3 text-xs text-slate-700 font-medium">
              <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <span>Have questions about your child's speech or motor progress? Dr. Mete provides detailed developmental evaluations.</span>
            </div>
            <a
              href="#location"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-full text-xs transition-colors whitespace-nowrap shadow-xs"
            >
              Consult Dr. Mete →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
