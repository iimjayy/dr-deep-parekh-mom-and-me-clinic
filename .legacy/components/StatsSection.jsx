import React from 'react';
import { clinicData } from '../data/clinicData';

export default function StatsSection() {
  return (
    <section className="py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {clinicData.stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-900">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
