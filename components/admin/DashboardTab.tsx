'use client';

import React from 'react';
import {
  Newspaper,
  Users,
  Image as ImageIcon,
  MessageSquare,
  UserCheck,
  Database,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Lock,
  Share2,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface DashboardTabProps {
  stats: {
    newsCount: number;
    staffCount: number;
    galleryCount: number;
    messagesCount: number;
    unreadMessages: number;
    ppdbCount: number;
  };
  setActiveTab: (tab: string) => void;
  onExitAdmin: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  stats,
  setActiveTab,
  onExitAdmin,
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-500 text-emerald-950 px-2.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider">
            <span>OPERATOR PANEL CONTROL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Kelola MI Syuriyah Pebatan
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            Pusat pengelolaan konten berita, data guru, galeri kegiatan, halaman statis, pesan masuk, dan pendaftaran PPDB online.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('DATABASE')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-colors flex items-center gap-1.5 border border-amber-300"
          >
            <Database className="w-4 h-4" />
            <span>Skema SQL Supabase</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 text-emerald-100 font-bold text-xs border border-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Kembali ke Web Publik
          </button>
        </div>
      </div>

      {/* Database Status Indicator */}
      <div
        className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between ${
          isSupabaseConfigured()
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold">
              Status Sinkronisasi Database:{' '}
              {isSupabaseConfigured()
                ? 'Terhubung Ke Supabase Cloud'
                : 'Penyimpanan Lokal Aktif (Offline Preview)'}
            </span>
            <p className="text-xs opacity-80 mt-0.5">
              {isSupabaseConfigured()
                ? 'Data otomatis tersimpan di tabel Supabase dan LocalStorage.'
                : 'Gunakan tab "Supabase SQL Exporter" untuk mendapatkan kueri SQL pembuatan tabel database.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('DATABASE')}
          className="text-xs font-bold underline shrink-0 ml-4"
        >
          Lihat SQL
        </button>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Berita */}
        <div
          onClick={() => setActiveTab('BERITA')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Berita</p>
            <h3 className="text-3xl font-extrabold text-emerald-950">{stats.newsCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Kelola Berita <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Staff */}
        <div
          onClick={() => setActiveTab('STAFF')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guru & Staff</p>
            <h3 className="text-3xl font-extrabold text-emerald-950">{stats.staffCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Kelola Guru <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Galeri */}
        <div
          onClick={() => setActiveTab('GALERI')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Galeri Foto</p>
            <h3 className="text-3xl font-extrabold text-emerald-950">{stats.galleryCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Upload Foto <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Pesan Masuk */}
        <div
          onClick={() => setActiveTab('MESSAGES')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pesan Kontak</p>
              {stats.unreadMessages > 0 && (
                <span className="bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                  {stats.unreadMessages} Baru
                </span>
              )}
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-950">{stats.messagesCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Lihat Pesan Masuk <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 5: PPDB Online */}
        <div
          onClick={() => setActiveTab('PPDB')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendaftar PPDB</p>
            <h3 className="text-3xl font-extrabold text-emerald-950">{stats.ppdbCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Kelola Pendaftar <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 6: Edit Halaman Statis */}
        <div
          onClick={() => setActiveTab('PAGES')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Konten Statis</p>
            <h3 className="text-base font-bold text-emerald-950">Sejarah / Visi Misi</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Edit Sambutan & Visi <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 7: Media Sosial & Channel */}
        <div
          onClick={() => setActiveTab('SOSMED')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medsos & Channel</p>
            <h3 className="text-base font-bold text-emerald-950">FB, IG, YT, TikTok, WA</h3>
            <p className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
              Kelola Akun Medsos <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
            <Share2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
