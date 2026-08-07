/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { Calendar, Tag, X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface GaleriSectionProps {
  galleryList: GalleryItem[];
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({ galleryList }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    'Semua',
    'Keagamaan',
    'Prestasi',
    'Pembelajaran',
    'Ekstrakurikuler',
    'Fasilitas',
    'PHBI',
  ];

  const filteredGallery = galleryList.filter(
    (img) => activeCategory === 'Semua' || img.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/40">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
            <span>DOKUMENTASI FOTO & KEGIATAN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Galeri MI Syuriyah Pebatan
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            Dokumentasi foto kegiatan ibadah, pembelajaran, ekstrakurikuler, lomba prestasi, dan peringatan hari besar Islam.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-emerald-800 text-amber-300 shadow border border-amber-400/40'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredGallery.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col"
          >
            <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={img.image_url || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="bg-emerald-900/90 border border-amber-400 text-amber-300 p-2.5 rounded-full shadow-lg">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-emerald-900 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-md shadow uppercase tracking-wider border border-amber-400/40">
                {img.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                {img.title}
              </h3>
              {img.description && (
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{img.description}</p>
              )}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {img.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Belum ada foto dalam kategori ini.</p>
        </div>
      )}

      {/* LIGHTBOX PREVIEW MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-emerald-950 border-2 border-amber-400 text-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl relative my-8 animate-fadeIn"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-emerald-900 text-amber-300 hover:text-white border border-amber-400/40 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedImage.image_url || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-gradient-to-t from-emerald-950 to-emerald-900">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-emerald-950 font-bold text-[10px] px-2.5 py-0.5 rounded uppercase">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-emerald-300 font-mono">{selectedImage.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
