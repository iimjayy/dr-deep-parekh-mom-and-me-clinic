import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp, Search } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function ReviewsSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState({ 1: 14, 2: 21, 3: 18, 4: 9 });

  const categories = ['All', 'High Fever Care', 'Painless Vaccination', 'Newborn Care', 'Growth & Nutrition'];

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredReviews = clinicData.reviews.filter(r => {
    const matchesFilter = filter === 'All' || r.tag === filter;
    const matchesSearch = r.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Google Verified Reviews</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Trusted by 25,000+ Local Parents
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Read authentic feedback from families in Nalasopara East, Vasai, & Agrawal Nagri.
          </p>
        </div>

        {/* Rating Summary Header Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between shadow-xl gap-6 border border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="text-4xl sm:text-5xl font-heading font-extrabold text-amber-400">
              4.9
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 font-semibold mt-1">
                Based on 633+ Verified Google Business Reviews
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-stone-50/80 rounded-3xl p-6 border border-slate-200/80 space-y-4 relative flex flex-col justify-between soft-card-hover transition-all"
            >
              <Quote className="w-8 h-8 text-emerald-200 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">{rev.child}</p>
                  <p className="text-[10px] text-slate-400">{rev.location} • {rev.date}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                    {rev.tag}
                  </span>

                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center space-x-1 text-xs text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="font-bold">{likes[rev.id] || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
