'use client';

import React from 'react';
import { Quote, Star, UserCheck } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { IslamicPattern, IslamicStarOrnament } from '../IslamicPattern';

interface TestimoniSectionProps {
  testimonials: Testimonial[];
}

export const TestimoniSection: React.FC<TestimoniSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      <IslamicPattern className="opacity-20 text-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs tracking-wider uppercase">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-emerald-950" />
            <span>Testimoni & Kesan Wali Murid</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apa Kata Mereka Tentang MI Syuriyah?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            Kepercayaan dan apresiasi dari para alumni, wali murid, serta tokoh masyarakat Brebes terhadap kualitas pendidikan di madrasah kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 p-6 rounded-3xl space-y-4 relative hover:border-amber-400/60 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
                  <div className="flex text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-800/60 flex items-center space-x-3">
                <img
                  src={item.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-amber-400" />
                    {item.role} ({item.year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
