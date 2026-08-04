'use client';

import React, { useState } from 'react';
import { Award, Trophy, Star, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import { Achievement } from '@/lib/types';
import { IslamicPattern, IslamicStarOrnament } from '../IslamicPattern';

interface PrestasiSectionProps {
  achievements: Achievement[];
}

export const PrestasiSection: React.FC<PrestasiSectionProps> = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const categories = ['SEMUA', 'Keagamaan', 'Akademik', 'Seni & Olahraga', 'Pramuka'];

  const filtered = selectedCategory === 'SEMUA'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <IslamicPattern className="opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-extrabold text-xs tracking-wider uppercase border border-amber-300 dark:border-amber-700">
            <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Prestasi & Penghargaan Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Jejak Karya & Kebanggaan Madrasah
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Berbagai prestasi gemilang santri MI Syuriyah Pebatan di tingkat Kecamatan, Kabupaten Brebes, hingga Provinsi Jawa Tengah.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-400/40 uppercase flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Tingkat {item.level}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    {item.category} • {item.winner_name}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
