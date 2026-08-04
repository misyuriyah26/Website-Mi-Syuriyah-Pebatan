'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  History,
  Target,
  Award,
  Search,
  BookOpen,
  Phone,
  Layers,
  Sparkles,
} from 'lucide-react';
import { StaffItem, StaticPagesContent, SchoolSettings } from '@/lib/types';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface ProfilSectionProps {
  pages: StaticPagesContent;
  settings: SchoolSettings;
  staffList: StaffItem[];
}

export const ProfilSection: React.FC<ProfilSectionProps> = ({
  pages,
  settings,
  staffList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Filter staff members
  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.subject && staff.subject.toLowerCase().includes(searchQuery.toLowerCase()));

    if (roleFilter === 'ALL') return matchesSearch;
    if (roleFilter === 'PIMPINAN')
      return matchesSearch && (staff.title.includes('Kepala') || staff.title.includes('Wakil'));
    if (roleFilter === 'GURU') return matchesSearch && staff.title.includes('Guru');
    if (roleFilter === 'STAFF')
      return matchesSearch && (staff.title.includes('TU') || staff.title.includes('Bendahara') || staff.title.includes('Staff'));

    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/40">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
            <span>PROFIL RESMI MADRASAH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Profil {settings.school_name}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            Mengenal Sejarah, Visi Misi, Struktur Organisasi, serta Tenaga Pendidik & Kependidikan MI Syuriyah Pebatan Wanasari Brebes.
          </p>
        </div>
      </div>

      {/* 1. SEJARAH SINGKAT */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold shadow">
            <History className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Berdiri Sejak Tahun {pages.sejarah.tahun_berdiri}
            </span>
            <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-400">{pages.sejarah.judul}</h2>
          </div>
        </div>

        <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 font-normal">
          {pages.sejarah.isi}
        </div>
      </section>

      {/* 2. VISI, MISI & TUJUAN */}
      <section className="space-y-8">
        <IslamicDivider
          title="Visi, Misi & Tujuan Madrasah"
          subtitle="Landasan Utama Pembentukan Karakter Santri Berakhlak Qur'ani dan Unggul Prestasi"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* VISI CARD */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 rounded-2xl border border-amber-500/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-emerald-950 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Visi Madrasah
              </div>
              <blockquote className="text-lg sm:text-xl font-bold leading-relaxed text-amber-300 italic pt-2">
                &ldquo;{pages.visi_misi.visi}&rdquo;
              </blockquote>
            </div>
            <div className="mt-8 pt-4 border-t border-emerald-800 text-xs text-emerald-200/80">
              MI Syuriyah Pebatan • Brebes
            </div>
          </div>

          {/* MISI CARD */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-800 text-amber-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Misi Utama
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {pages.visi_misi.misi.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TUJUAN CARD */}
        <div className="bg-amber-50/70 dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" /> {pages.visi_misi.judul_tujuan || 'Target & Tujuan Capaian Lulusan'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pages.visi_misi.tujuan.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-amber-200/80 dark:border-slate-700 shadow-sm space-y-2">
                <div className="text-amber-600 dark:text-amber-400 font-bold text-sm">Target #{idx + 1}</div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STRUKTUR ORGANISASI */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-amber-200 dark:border-slate-700">
            {pages.struktur_organisasi?.badge || 'PIMPINAN & PENGELOLA'}
          </span>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-400 mt-2">
            {pages.struktur_organisasi?.judul || 'Struktur Organisasi Madrasah'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {pages.struktur_organisasi?.subjudul || 'Bagan kepemimpinan dan manajerial MI Syuriyah Pebatan'}
          </p>
        </div>

        {/* Organizational Chart Representation */}
        <div className="space-y-6">
          {/* Top Level - Kepala Madrasah & Komite */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
            {(pages.struktur_organisasi?.pimpinan_utama && pages.struktur_organisasi.pimpinan_utama.length > 0
              ? pages.struktur_organisasi.pimpinan_utama
              : [
                  { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
                  { id: 'org-2', jabatan: 'Kepala Madrasah', nama: pages.sambutan_kepala.nama || 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
                ]
            ).map((item, idx, arr) => (
              <React.Fragment key={item.id || idx}>
                <div className="bg-emerald-900 dark:bg-emerald-950 text-white p-4 rounded-xl border-2 border-amber-400 text-center w-full sm:w-auto min-w-[220px] max-w-xs shadow-lg">
                  <div className="text-[10px] text-amber-300 uppercase tracking-wider font-bold">{item.jabatan}</div>
                  <div className="text-sm font-bold mt-1">{item.nama}</div>
                  {item.keterangan && (
                    <div className="text-[11px] text-emerald-200 mt-0.5">{item.keterangan}</div>
                  )}
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden sm:block text-amber-500 font-bold text-xl">•</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Line Divider */}
          <div className="w-1/2 h-[2px] bg-amber-400/50 mx-auto" />

          {/* Second Level - Wakasek & TU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {(pages.struktur_organisasi?.pengelola_tambahan && pages.struktur_organisasi.pengelola_tambahan.length > 0
              ? pages.struktur_organisasi.pengelola_tambahan
              : [
                  { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
                  { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
                  { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
                ]
            ).map((item, idx) => (
              <div key={item.id || idx} className="bg-emerald-50 dark:bg-slate-800 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 text-center space-y-0.5">
                <div className="text-[10px] text-emerald-800 dark:text-emerald-400 uppercase font-bold">{item.jabatan}</div>
                <div className="text-xs font-bold text-emerald-950 dark:text-slate-100">{item.nama}</div>
                {item.keterangan && (
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.keterangan}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DATA GURU & STAFF */}
      <section className="space-y-6">
        <IslamicDivider
          title="Data Guru & Tenaga Kependidikan"
          subtitle="Para Pendidik Berdedikasi Pembimbing Santri-Santriwati MI Syuriyah Pebatan"
        />

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama guru atau mata pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            {[
              { id: 'ALL', label: 'Semua Staff' },
              { id: 'PIMPINAN', label: 'Pimpinan' },
              { id: 'GURU', label: 'Guru Pengajar' },
              { id: 'STAFF', label: 'Tata Usaha' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  roleFilter === tab.id
                    ? 'bg-emerald-800 text-amber-300 shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex gap-4 items-center group"
            >
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-emerald-800/20 group-hover:border-amber-400 transition-colors">
                <img
                  src={staff.image_url}
                  alt={staff.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1 overflow-hidden">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-amber-200 dark:border-slate-700 inline-block">
                  {staff.title}
                </span>
                <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-400 truncate">{staff.name}</h3>
                {staff.nip_ntp && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">NIP: {staff.nip_ntp}</p>
                )}
                {staff.subject && (
                  <p className="text-xs text-emerald-800 dark:text-amber-300 font-medium truncate">
                    Mapel: {staff.subject}
                  </p>
                )}
                {staff.education && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{staff.education}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">Tidak ada data guru/staff yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </section>
    </div>
  );
};
