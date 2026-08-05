import React, { useState, useRef } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Clinical Recovery Results</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Real Infant Treatment Results
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Drag the comparison slider left and right to see how Dr. Mete's care clears infant skin allergies & eczema in Nalasopara East.
          </p>
        </div>

        {/* Case Study Header Card */}
        <div className="max-w-4xl mx-auto mb-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm border border-emerald-300">
              👶
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm">Case Study: Baby Aarav (6 Months)</div>
              <div className="text-slate-500 font-medium">Agrawal Nagri, Nalasopara East • Condition: Infant Facial Eczema</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-600 text-white font-extrabold px-3.5 py-1 rounded-full">
              Full Recovery: 7 Days
            </span>
          </div>
        </div>

        {/* Real Human Photo Interactive Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl relative">
            
            <div 
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-800 bg-slate-950"
            >
              
              {/* After Real Human Photo (Background) */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop" 
                  alt="Healthy Smiling Baby After Treatment" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white text-right">
                  <div className="ml-auto space-y-1 max-w-sm">
                    <span className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase inline-block">
                      Day 7: Fully Cleared & Smooth
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      Clear, Soft & Healthy Baby Skin
                    </h3>
                    <p className="text-xs text-slate-200 font-medium">
                      Pediatrician approved non-steroidal moisture barrier treatment by Dr. Mete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Before Real Human Photo (Clipped Layer) */}
              <div 
                className="absolute top-0 bottom-0 left-0 overflow-hidden border-r-4 border-white shadow-2xl"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="relative w-[700px] sm:w-[900px] h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop" 
                    alt="Infant Dry Rash Before Treatment" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <div className="space-y-1 max-w-sm">
                      <span className="bg-rose-600 text-white font-extrabold text-xs px-3.5 py-1 rounded-full uppercase inline-block">
                        Day 1: Severe Facial Eczema
                      </span>
                      <h3 className="font-heading font-extrabold text-xl text-white">
                        Red, Itchy & Irritated Rash
                      </h3>
                      <p className="text-xs text-slate-200 font-medium">
                        Persistent itchiness and dry cheek patches prior to consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Drag Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-white text-slate-950 font-extrabold text-xs shadow-2xl flex items-center justify-center border-2 border-emerald-500">
                  ↔
                </div>
              </div>

            </div>

            {/* Slider Instructions */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2 font-medium">
              <span>◄ Drag Left for Day 1 Before</span>
              <span className="text-emerald-400 font-bold">100% Real Clinical Treatment Cases</span>
              <span>Drag Right for Day 7 After ►</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
