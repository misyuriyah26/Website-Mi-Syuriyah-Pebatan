'use client';

import React, { useState } from 'react';
import { Download, FileText, Search, FileDown, CheckCircle2, Calendar } from 'lucide-react';
import { DownloadDocument } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { IslamicPattern } from '../IslamicPattern';

interface DokumenSectionProps {
  documents: DownloadDocument[];
}

export const DokumenSection: React.FC<DokumenSectionProps> = ({ documents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('SEMUA');

  const categories = ['SEMUA', 'Brosur & PPDB', 'Kalender Akademik', 'Formulir', 'Kitab & Panduan'];

  const filtered = documents.filter((doc) => {
    const matchCat = selectedCategory === 'SEMUA' || doc.category === selectedCategory;
    const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (doc: DownloadDocument) => {
    DataStore.incrementDocumentDownload(doc.id);
    alert(`Mengunduh dokumen: ${doc.title}`);
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative transition-colors">
      <IslamicPattern className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-extrabold text-xs tracking-wider uppercase border border-emerald-300 dark:border-emerald-700">
            <FileDown className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Pusat Unduhan / Download Center</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dokumen & Kalender Akademik Publik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Unduh brosur resmi PPDB, kalender pendidikan, formulir pendaftaran offline, dan modul panduan belajar secara gratis.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama dokumen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all flex items-start justify-between gap-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">
                    {doc.file_type} ({doc.file_size})
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    {doc.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>Diunduh: <strong>{doc.download_count}</strong> kali</span>
                  <span>Diperbarui: {doc.created_at}</span>
                </p>
              </div>

              <button
                onClick={() => handleDownload(doc)}
                className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow transition-transform transform active:scale-95 shrink-0 flex items-center justify-center"
                title="Unduh File PDF"
                aria-label="Unduh File PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
