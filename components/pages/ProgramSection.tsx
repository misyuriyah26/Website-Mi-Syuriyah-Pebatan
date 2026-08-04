'use client';

import React from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Award,
  CheckCircle,
  GraduationCap,
  Calendar,
  Layers,
  Heart,
  Music,
  Code,
  Flame,
} from 'lucide-react';
import { StaticPagesContent, SchoolSettings } from '@/lib/types';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface ProgramSectionProps {
  pages?: StaticPagesContent;
  settings?: SchoolSettings;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ pages, settings }) => {
  const schoolName = settings?.school_name || 'MI Syuriyah Pebatan';
  const programs = pages?.program_unggulan && pages.program_unggulan.length > 0
    ? pages.program_unggulan
    : [
        {
          id: '1',
          title: 'Program Tahfidz Al-Qur\'an',
          description: 'Target hafalan Juz 30 dengan tajwid & makhroj yang benar menggunakan metode Yanbu\'a.',
        },
        {
          id: '2',
          title: 'Pembiasaan Akhlak & Karakter',
          description: 'Sholat Dhuha dan Dzuhur berjamaah, pembacaan Asmaul Husna, Mudarosah, serta 5S.',
        },
        {
          id: '3',
          title: 'Smart Digital Classroom',
          description: 'Pembelajaran berbasis CBT online, laboratorium komputer multimedia, serta ujian berbasis tablet.',
        },
        {
          id: '4',
          title: 'Seni Keagamaan Hadroh & Rebana',
          description: 'Ekstrakurikuler seni sholawat rebana modern yang aktif tampil di ajang Porseni.',
        },
        {
          id: '5',
          title: 'Prestasi Sains & Kaligrafi',
          description: 'Bimbingan intensif Kompetisi Sains Madrasah (KSM) serta Sanggar Kaligrafi.',
        },
        {
          id: '6',
          title: 'Tenaga Pendidik Profesional',
          description: 'Guru-guru berijazah S1/S2 lulusan Perguruan Tinggi Islam terkemuka.',
        },
      ];

  const badgeKurikulum = pages?.kurikulum_info?.badge_kurikulum || 'STANDAR NASIONAL & KEMENAG';
  const judulKurikulum = pages?.kurikulum_info?.judul_kurikulum || 'Kurikulum Terpadu Kurikulum Merdeka + KMA 183';
  const kurikulumDesc = pages?.kurikulum_info?.deskripsi_kurikulum ||
    'MI Syuriyah Pebatan mengimplementasikan Kurikulum Merdeka yang disempurnakan dengan muatan lokal pendidikan keagamaan khas Nahdlatul Ulama.';

  const matpelAgama = pages?.kurikulum_info?.matpel_agama || [
    'Al-Qur\'an Hadits (Membaca, Menghafal, Memahami)',
    'Aqidah Akhlaq (Pembentukan Karakter Terpuji)',
    'Fiqih & Praktek Ibadah Harian',
    'Sejarah Kebudayaan Islam (SKI)',
    'Bahasa Arab Dasar & Muhadatsah',
  ];

  const matpelAkademik = pages?.kurikulum_info?.matpel_akademik || [
    'Pendidikan Pancasila & Kewarganegaraan',
    'Bahasa Indonesia & Literasi Digital',
    'Matematika Logis & Numerasi',
    'Ilmu Pengetahuan Alam & Sosial (IPAS)',
    'Bahasa Inggris & Muatan Lokal TIK/Komputer',
  ];

  const scheduleData = pages?.jadwal_kbm && pages.jadwal_kbm.length > 0
    ? pages.jadwal_kbm
    : [
        { id: '1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' },
        { id: '2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' },
        { id: '3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' },
        { id: '4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' },
        { id: '5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' },
        { id: '6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' },
        { id: '7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' },
      ];

  const ekstrakurikuler = pages?.ekstrakurikuler && pages.ekstrakurikuler.length > 0
    ? pages.ekstrakurikuler
    : [
        { id: '1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
        { id: '2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
        { id: '3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
        { id: '4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
        { id: '5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
        { id: '6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/40">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
            <span>KURIKULUM & PROGRAM PENDIDIKAN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Program & Kurikulum {schoolName}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            Struktur Kurikulum Merdeka Terpadu KMA 183 & 184 Kementerian Agama RI, dikombinasikan dengan Program Unggulan Keagamaan dan Ekstrakurikuler.
          </p>
        </div>
      </div>

      {/* 0. PROGRAM UNGGULAN DARI KELOLA HALAMAN STATIS */}
      <section className="space-y-6">
        <IslamicDivider
          title="Program Unggulan Utama"
          subtitle="Program Pilihan Terpadu Pembentukan Karakter & Prestasi Santri"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group hover:border-amber-400 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors shadow">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. KURIKULUM PENGAJARAN */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            {badgeKurikulum}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-emerald-400 mt-2">
            {judulKurikulum}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            {kurikulumDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Kelompok Pendidikan Agama Islam (PAI) */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Kelompok Agama Islam (KMA 183)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {matpelAgama.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2: Kelompok Umum & Sains */}
          <div className="bg-amber-50/60 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-3">
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Kelompok Akademik & Sains
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {matpelAkademik.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM EKSTRAKURIKULER UNGGULAN */}
      <section className="space-y-8">
        <IslamicDivider
          title="Ekstrakurikuler & Pengembangan Bakat"
          subtitle="Wadah Pengembangan Minat, Bakat, Seni, dan Kepemimpinan Santri"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekstrakurikuler.map((ekstra, idx) => (
            <div
              key={ekstra.id || idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group hover:border-amber-400 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors shadow">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400">{ekstra.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ekstra.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. JADWAL KBM & PEMBIASAAN */}
      <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Aktivitas Harian
          </span>
          <h2 className="text-2xl font-bold text-emerald-950 mt-2">
            Jadwal Kegiatan Belajar Mengajar (KBM)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Rutinitas pembelajaran sehari-hari di MI Syuriyah Pebatan
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-amber-300 border-b-2 border-amber-400">
                <th className="p-3 font-bold rounded-tl-xl">Waktu (WIB)</th>
                <th className="p-3 font-bold">Kegiatan / Aktivitas</th>
                <th className="p-3 font-bold rounded-tr-xl">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scheduleData.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}>
                  <td className="p-3 font-mono font-bold text-emerald-950 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{item.time}</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{item.activity}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.type === 'Pembiasaan'
                          ? 'bg-emerald-100 text-emerald-900'
                          : item.type === 'Akademik'
                          ? 'bg-blue-100 text-blue-900'
                          : item.type === 'Istirahat'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
