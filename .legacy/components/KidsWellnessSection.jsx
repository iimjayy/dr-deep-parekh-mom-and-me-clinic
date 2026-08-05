import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Award, Moon, Apple, Shield, Activity } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function KidsWellnessSection() {
  const [completedRoutines, setCompletedRoutines] = useState([]);

  const toggleRoutine = (id) => {
    if (completedRoutines.includes(id)) {
      setCompletedRoutines(completedRoutines.filter(rId => rId !== id));
    } else {
      setCompletedRoutines([...completedRoutines, id]);
    }
  };

  const getRoutineIcon = (iconName) => {
    switch (iconName) {
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-600" />;
      case 'Apple': return <Apple className="w-6 h-6 text-emerald-600" />;
      case 'Shield': return <Shield className="w-6 h-6 text-sky-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-pink-600" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Interactive Health Tracker</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Child Wellness & Daily Health Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Click on each daily health habit below to track essential routine goals for your child.
          </p>
        </div>

        {/* Routine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {clinicData.kidsRoutines.map((item) => {
            const isDone = completedRoutines.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleRoutine(item.id)}
                className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isDone 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-300' 
                    : 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${isDone ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>
                      {getRoutineIcon(item.iconName)}
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-white fill-emerald-800" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Tap Check
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`font-heading font-extrabold text-sm ${isDone ? 'text-white' : 'text-slate-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[11px] font-bold mt-0.5 ${isDone ? 'text-emerald-100' : 'text-emerald-700'}`}>
                      Goal: {item.goal}
                    </p>
                  </div>

                  <p className={`text-xs ${isDone ? 'text-emerald-50' : 'text-slate-500'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-[11px] font-bold flex items-center justify-between ${
                  isDone ? 'border-emerald-500 text-white' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>{isDone ? 'Completed' : 'Track Habit'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Counter Footer */}
        <div className="mt-8 text-center bg-white max-w-md mx-auto p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Completed Today:</span>
          </div>
          <div className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {completedRoutines.length} / 5 Goals Tracked
          </div>
        </div>

      </div>
    </section>
  );
}
