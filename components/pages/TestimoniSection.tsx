/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  Quote,
  Star,
  UserCheck,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Send,
  Search,
  Sparkles,
  User,
  Heart,
} from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { IslamicPattern, IslamicStarOrnament } from '../IslamicPattern';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface TestimoniSectionProps {
  testimonials: Testimonial[];
  onSaveTestimonials?: (newList: Testimonial[]) => void;
}

const AVATAR_PRESETS = [
  {
    label: 'Bapak / Wali Murid',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  {
    label: 'Ibu / Wali Murid',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
  {
    label: 'Alumni / Tokoh',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    label: 'Pengunjung Website',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    label: 'Masyarakat Umum',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
];

export const TestimoniSection: React.FC<TestimoniSectionProps> = ({
  testimonials,
  onSaveTestimonials,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    roleCategory: 'Wali Murid',
    customRole: '',
    year: String(new Date().getFullYear()),
    rating: 5,
    quote: '',
    avatar_url: AVATAR_PRESETS[0].url,
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const categories = ['Semua', 'Wali Murid', 'Alumni', 'Pengunjung Website', 'Masyarakat'];

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesFilter =
      selectedFilter === 'Semua' ||
      item.role.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      (selectedFilter === 'Pengunjung Website' && item.role.toLowerCase().includes('pengunjung'));

    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    const finalRole =
      formData.roleCategory === 'Lainnya' && formData.customRole.trim() !== ''
        ? formData.customRole
        : `${formData.roleCategory}`;

    const newTestimonial: Testimonial = {
      id: `testi-${Date.now()}`,
      name: formData.name.trim(),
      role: finalRole,
      avatar_url: formData.avatar_url || AVATAR_PRESETS[0].url,
      quote: formData.quote.trim(),
      rating: formData.rating,
      year: formData.year || String(new Date().getFullYear()),
    };

    const updatedList = [newTestimonial, ...testimonials];

    // Save
    DataStore.saveTestimonials(updatedList);
    if (onSaveTestimonials) {
      onSaveTestimonials(updatedList);
    }

    DataStore.addActivityLog(
      'Komentar Pengunjung Baru',
      'Testimoni',
      `Pengunjung ${formData.name} menulis komentar/testimoni baru.`
    );

    // Reset Form & Show Success Notification
    setSubmittedSuccess(true);
    setFormData({
      name: '',
      roleCategory: 'Wali Murid',
      customRole: '',
      year: String(new Date().getFullYear()),
      rating: 5,
      quote: '',
      avatar_url: AVATAR_PRESETS[0].url,
    });

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
    }, 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      <IslamicPattern className="opacity-20 text-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-800/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs tracking-wider uppercase shadow-md">
              <IslamicStarOrnament className="w-3.5 h-3.5 text-emerald-950" />
              <span>TESTIMONI & KOMENTAR PENGUNJUNG</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kesan, Pesan & Apresiasi Publik
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              Suara dan tanggapan dari alumni, wali murid, serta masyarakat Brebes mengenai kualitas pendidikan dan pelayanan di MI Syuriyah Pebatan.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 border border-amber-300 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-950" />
            <span>Tulis Komentar / Testimoni</span>
          </button>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-900/40 p-3.5 rounded-2xl border border-emerald-800/80 backdrop-blur-sm">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedFilter === cat
                    ? 'bg-amber-400 text-emerald-950 shadow-md'
                    : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800 hover:text-white border border-emerald-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Cari komentar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((item, idx) => (
            <div
              key={item.id}
              className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 p-6 rounded-3xl space-y-4 relative hover:border-amber-400/60 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
                  <div className="flex text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-800/60 flex items-center space-x-3">
                <img
                  src={
                    item.avatar_url && item.avatar_url.trim() !== ''
                      ? item.avatar_url
                      : AVATAR_PRESETS[0].url
                  }
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                      {item.name}
                    </h4>
                    {idx === 0 && (
                      <span className="bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        Terbaru
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-300 flex items-center gap-1 truncate">
                    <UserCheck className="w-3 h-3 text-amber-400 shrink-0" />
                    {item.role} ({item.year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12 bg-emerald-900/30 rounded-3xl border border-emerald-800/60 space-y-3">
            <MessageSquarePlus className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
            <p className="text-sm text-emerald-200">
              Belum ada komentar atau testimoni untuk kategori &ldquo;{selectedFilter}&rdquo;.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5"
            >
              Jadilah yang Pertama Menulis Komentar
            </button>
          </div>
        )}
      </div>

      {/* SUBMISSION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn my-6">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-6 relative flex items-center justify-between border-b-2 border-amber-400">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 text-[10px] font-black uppercase">
                  <Sparkles className="w-3 h-3" /> FORM KOMENTAR & TESTIMONI
                </div>
                <h3 className="text-xl font-bold text-white">Tulis Kesan, Pesan, atau Komentar</h3>
                <p className="text-xs text-emerald-200">
                  Apresiasi Anda sangat berharga bagi perkembangan MI Syuriyah Pebatan.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full bg-emerald-900 text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            {submittedSuccess ? (
              <div className="p-10 text-center space-y-4 text-slate-800 dark:text-slate-100">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-extrabold text-emerald-900 dark:text-emerald-300">
                  Jazakallah Khair!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Komentar dan testimoni Anda telah berhasil diterbitkan dan akan ditampilkan secara terbuka di website madrasah.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5 text-slate-800 dark:text-slate-100">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" /> Nama Lengkap Anda <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Slamet Riyadi / Alumni 2018"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                {/* Role / Category & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Status / Peran Anda
                    </label>
                    <select
                      value={formData.roleCategory}
                      onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Wali Murid">Wali Murid</option>
                      <option value="Alumni Madrasah">Alumni Madrasah</option>
                      <option value="Pengunjung Website">Pengunjung Website</option>
                      <option value="Masyarakat / Tokoh Brebes">Masyarakat / Tokoh Brebes</option>
                      <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tahun / Angkatan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 2026 atau Kelas 4"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {formData.roleCategory === 'Lainnya' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Ketik Peran / Keterangan Kategori
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Mahasiswa KKN / Pemerhati Pendidikan"
                      value={formData.customRole}
                      onChange={(e) => setFormData({ ...formData, customRole: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                )}

                {/* Rating Stars */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Penilaian / Rating Madrasah</span>
                    <span className="text-amber-500 font-extrabold text-xs">
                      {hoverRating || formData.rating} dari 5 Bintang
                    </span>
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none transform hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || formData.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pilih Foto / Icon Profil
                  </label>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar_url: preset.url })}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 transition-all ${
                          formData.avatar_url === preset.url
                            ? 'bg-emerald-800 text-amber-300 border-emerald-600 ring-2 ring-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-6 h-6 rounded-full object-cover border border-amber-400"
                        />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>

                  <ImageUploadInput
                    label="Atau Upload Foto Sendiri (Opsional)"
                    value={formData.avatar_url}
                    onChange={(url) => setFormData({ ...formData, avatar_url: url })}
                    placeholder="https://... atau klik upload"
                  />
                </div>

                {/* Quote / Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Isi Komentar, Kesan, atau Testimoni Anda</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pengalaman, harapan, atau kata-kata apresiasi Anda untuk MI Syuriyah Pebatan..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all border border-emerald-700"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Kirim Komentar Sekarang</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
