import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChildGrowthToolSection({ onOpenBooking }) {
  const [ageYears, setAgeYears] = useState('2');
  const [gender, setGender] = useState('boy');
  const [weightKg, setWeightKg] = useState('12.5');
  const [heightCm, setHeightCm] = useState('88');
  const [result, setResult] = useState(null);

  const calculateGrowth = (e) => {
    e.preventDefault();
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;

    if (!w || !h || h <= 0) return;

    const bmi = (w / (h * h)).toFixed(1);
    let status = 'Healthy Growth (Normal Percentile)';
    let color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let advice = 'Your child is progressing wonderfully within standard WHO growth percentiles. Keep up balanced nutrition and routine vaccine visits!';

    if (bmi < 14) {
      status = 'Mildly Underweight (Consult Advised)';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
      advice = 'Growth appears slightly below average for age. Dr. Mete can provide a tailored nutrition & protein plan to boost healthy weight gain.';
    } else if (bmi > 18) {
      status = 'Above Average Growth Window';
      color = 'text-sky-700 bg-sky-50 border-sky-200';
      advice = 'Child growth is above average. Routine physical activity and balanced toddler nutrition are recommended.';
    }

    setResult({ bmi, status, color, advice });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-emerald-50/40 via-sky-50/30 to-amber-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>Interactive WHO Health Tool</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Child Growth & BMI Calculator
          </h2>
          <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Enter your child's measurements to instantly check their WHO growth percentile status and receive Dr. Mete's clinical recommendations.
          </p>
        </div>

        {/* Outer Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Form */}
            <form onSubmit={calculateGrowth} className="lg:col-span-6 space-y-4 text-xs">
              
              {/* Gender Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Child Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('boy')}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                      gender === 'boy'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Little Boy
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('girl')}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                      gender === 'girl'
                        ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Little Girl
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Child's Age (Years)</label>
                <select
                  value={ageYears}
                  onChange={(e) => setAgeYears(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="0.5">6 Months</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                  <option value="6">6+ Years</option>
                </select>
              </div>

              {/* Weight & Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 12.5"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    step="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 88"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Growth Percentile</span>
              </button>

            </form>

            {/* Result Showcase Column */}
            <div className="lg:col-span-6 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              {result ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className={`p-4 rounded-2xl border ${result.color} space-y-2`}>
                    <div className="flex items-center space-x-2 font-extrabold text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{result.status}</span>
                    </div>
                    <div className="text-xs font-bold">
                      Calculated BMI Index: <span className="text-sm font-extrabold">{result.bmi}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Dr. Mete's Clinical Assessment:</span>
                    </div>
                    <p className="leading-relaxed font-medium text-slate-600">
                      {result.advice}
                    </p>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <span>Discuss Growth Plan with Dr. Mete</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3 bg-slate-50/80 rounded-2xl p-6 border border-dashed border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    📈
                  </div>
                  <h4 className="font-heading font-extrabold text-slate-900 text-base">
                    WHO Growth Standard Check
                  </h4>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                    Fill in your child's age, weight, and height on the left to see instant percentile calculations.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
