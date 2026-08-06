'use client';

import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Eye,
  ArrowRight,
  User,
  Share2,
  X,
  Tag,
  MessageSquare,
} from 'lucide-react';
import { NewsItem } from '@/lib/types';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface BeritaSectionProps {
  newsList: NewsItem[];
  selectedNews: NewsItem | null;
  onOpenNewsDetail: (news: NewsItem) => void;
  onCloseNewsDetail: () => void;
}

export const BeritaSection: React.FC<BeritaSectionProps> = ({
  newsList,
  selectedNews,
  onOpenNewsDetail,
  onCloseNewsDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Pengumuman', 'Berita', 'Prestasi', 'PPDB', 'Kegiatan'];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/40">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
            <span>KABAR MADRASAH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Berita & Pengumuman Sekolah
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            Pusat Informasi, Pengumuman Resmi, Prestasi Siswa, serta Artikel Kegiatan MI Syuriyah Pebatan.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Cari berita atau pengumuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-800 text-amber-300 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-emerald-900 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-md shadow uppercase tracking-wider border border-amber-400/40">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {item.views || 100} views
                  </span>
                </div>

                <h3
                  onClick={() => onOpenNewsDetail(item)}
                  className="text-base font-bold text-emerald-950 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Oleh: {item.author}</span>
                <button
                  onClick={() => onOpenNewsDetail(item)}
                  className="text-xs font-bold text-emerald-800 dark:text-amber-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  Baca Selengkapnya <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-2">
          <p className="text-slate-600 font-semibold">Tidak ditemukan berita dengan kata kunci ini.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('Semua');
            }}
            className="text-xs text-emerald-800 underline font-bold"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* READ DETAIL MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 animate-fadeIn max-h-[90vh] flex flex-col">
            {/* Header modal */}
            <div className="bg-emerald-950 text-white p-6 relative flex justify-between items-start border-b-2 border-amber-400 shrink-0">
              <div className="space-y-1 pr-8">
                <span className="bg-amber-500 text-emerald-950 font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedNews.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                  {selectedNews.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-emerald-200 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    {selectedNews.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {new Date(selectedNews.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={onCloseNewsDetail}
                className="p-1.5 rounded-full bg-emerald-900 text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={selectedNews.image_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="whitespace-pre-line space-y-3 font-serif sm:font-sans">
                {selectedNews.content}
              </div>

              {/* Share box */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-600" /> MI Syuriyah Pebatan Brebes
                </div>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedNews.title,
                        url: window.location.href,
                      });
                    } else {
                      alert('Tautan berita disalin ke clipboard!');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Bagikan Berita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
