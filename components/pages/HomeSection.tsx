/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Building,
  CheckCircle2,
  Calendar,
  Eye,
  ChevronRight,
  Heart,
  Lightbulb,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';
import {
  NewsItem,
  GalleryItem,
  StaticPagesContent,
  SchoolSettings,
} from '@/lib/types';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface HomeSectionProps {
  pages: StaticPagesContent;
  settings: SchoolSettings;
  latestNews: NewsItem[];
  galleryItems: GalleryItem[];
  onOpenNewsDetail: (news: NewsItem) => void;
  onOpenPpdb: () => void;
  setActiveSection: (section: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  pages,
  settings,
  latestNews,
  galleryItems,
  onOpenNewsDetail,
  onOpenPpdb,
  setActiveSection,
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[520px] bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 my-4 mx-2 sm:mx-6">
        {/* Background Overlay Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${settings.hero_banner_url || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600'}')`,
          }}
        />
        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-950/80" />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20 flex flex-col justify-center min-h-[500px]">
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-semibold mb-6 max-w-fit shadow-lg backdrop-blur-sm">
            <IslamicStarOrnament className="w-4 h-4 text-amber-400" />
            <span>MADRASAH IBTIDAIYAH TERAKREDITASI {settings.akreditasi}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              {settings.school_name}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl font-light leading-relaxed mb-8">
            {pages.tagline_hero}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPpdb}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 border border-amber-300"
            >
              <span>Daftar PPDB 2026/2027</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActiveSection('profil');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold text-base border border-emerald-600/50 backdrop-blur-sm transition-all"
            >
              <span>Lihat Profil Sekolah</span>
              <ChevronRight className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="mt-12 pt-8 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-emerald-200 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tahfidz Juz 30</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Kurikulum Merdeka</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Gedung Nyaman & Asri</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ekstrakurikuler Lengkap</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA MADRASAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl bg-emerald-900 mx-auto">
                  <img
                    src={pages.sambutan_kepala.foto_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
                    alt={pages.sambutan_kepala.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-900 text-amber-300 border border-amber-400 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg flex items-center gap-1.5">
                  <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pages.sambutan_kepala.gelar}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300 mt-6">{pages.sambutan_kepala.nama}</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">{settings.school_name}</p>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                <Quote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Sambutan Resmi
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white leading-tight">
                {pages.sambutan_kepala.judul}
              </h2>

              <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {pages.sambutan_kepala.isi}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Brebes, Jawa Tengah • Indonesia
                </div>
                <button
                  onClick={() => {
                    setActiveSection('profil');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <span>Selengkapnya Profil Sekolah</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEUNGGULAN / PROGRAM UNGGULAN */}
      <section className="bg-slate-50 dark:bg-slate-950/60 py-12 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IslamicDivider
            title="Keunggulan & Program Utama"
            subtitle="Memadukan Pendidikan Keagamaan Islam Berkarakter dengan Kurikulum Nasional & Teknologi Digital"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {(pages.program_unggulan && pages.program_unggulan.length > 0
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
                ]
            ).map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group hover:border-amber-400 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-800 dark:bg-emerald-700 text-amber-300 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors shadow-md">
                  {idx % 6 === 0 ? (
                    <BookOpen className="w-6 h-6" />
                  ) : idx % 6 === 1 ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : idx % 6 === 2 ? (
                    <Lightbulb className="w-6 h-6" />
                  ) : idx % 6 === 3 ? (
                    <Star className="w-6 h-6" />
                  ) : idx % 6 === 4 ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <Heart className="w-6 h-6" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATISTIK RINGKAS */}
      <section className="bg-emerald-900 dark:bg-slate-900 text-white py-12 rounded-3xl mx-2 sm:mx-6 shadow-xl relative overflow-hidden border-2 border-amber-500/20 dark:border-slate-800">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-emerald-950/40 dark:bg-slate-950/60 rounded-2xl border border-emerald-700/50 dark:border-slate-800 flex flex-col justify-center items-center">
              <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {settings.total_siswa_aktif || '350+'}
              </div>
              <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1 font-semibold">
                Siswa & Siswi Aktif
              </div>
              {settings.total_siswi_aktif && (
                <div className="text-[11px] text-amber-200/80 mt-0.5 font-normal">
                  {settings.total_siswi_aktif}
                </div>
              )}
            </div>

            <div className="p-4 bg-emerald-950/40 dark:bg-slate-950/60 rounded-2xl border border-emerald-700/50 dark:border-slate-800 flex flex-col justify-center items-center">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {settings.total_guru_staf || '24'}
              </div>
              <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1 font-semibold">
                Guru & Staf Kompeten
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 dark:bg-slate-950/60 rounded-2xl border border-emerald-700/50 dark:border-slate-800 flex flex-col justify-center items-center">
              <Building className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {settings.tingkat_kelulusan || '100%'}
              </div>
              <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1 font-semibold">
                Tingkat Kelulusan
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 dark:bg-slate-950/60 rounded-2xl border border-emerald-700/50 dark:border-slate-800 flex flex-col justify-center items-center">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {settings.nilai_akreditasi_bansm || 'A (Unggul 94)'}
              </div>
              <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1 font-semibold">
                Nilai Akreditasi BAN-S/M
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Informasi Terkini
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white mt-2">
              Berita & Pengumuman Sekolah
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveSection('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-bold text-emerald-800 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
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
                  <div className="flex items-center gap-3 text-xs text-slate-500">
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
                      {item.views || 100} dibaca
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenNewsDetail(item)}
                    className="text-base font-bold text-emerald-950 group-hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">Oleh: {item.author}</span>
                  <button
                    onClick={() => onOpenNewsDetail(item)}
                    className="text-xs font-bold text-emerald-800 hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    Baca <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GALERI HIGHLIGHTS */}
      <section className="bg-slate-50 dark:bg-slate-950/60 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                Dokumentasi Kegiatan
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white mt-2">
                Galeri Foto MI Syuriyah
              </h2>
            </div>

            <button
              onClick={() => {
                setActiveSection('galeri');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-bold text-emerald-800 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua Foto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.slice(0, 4).map((img) => (
              <div
                key={img.id}
                onClick={() => {
                  setActiveSection('galeri');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative h-48 sm:h-56 rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <img
                  src={img.image_url || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                    {img.category}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PPDB BANNER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-amber-400/50">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <span className="inline-block bg-amber-500 text-emerald-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                PENDAFTARAN GELOMBANG 1 DIBUKA
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Bergabunglah Bersama Keluarga Besar MI Syuriyah Pebatan
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Masa depan yang gemilang dimulai dari pendidikan dasar Islam yang kokoh. Dapatkan beasiswa khusus seragam dan keringanan biaya bagi 50 pendaftar pertama!
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenPpdb}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5 border border-amber-300 whitespace-nowrap"
              >
                Daftar Online Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
