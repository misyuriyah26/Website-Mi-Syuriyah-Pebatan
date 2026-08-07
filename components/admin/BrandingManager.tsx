'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Save, Upload, CheckCircle2, Image as ImageIcon, School, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { SchoolSettings } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface BrandingManagerProps {
  settings: SchoolSettings;
  onSaveSettings: (settings: SchoolSettings) => void;
}

export const BrandingManager: React.FC<BrandingManagerProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<SchoolSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    DataStore.saveSettings(formData);
    onSaveSettings(formData);
    DataStore.addActivityLog('Update Pengaturan', 'Branding', 'Memperbarui logo, banner, dan pengaturan sekolah.');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            <span>Manajemen Branding, Logo & Identitas Sekolah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pengaturan terpusat logo, favicon, banner utama, dan kontak resmi madrasah.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Pengaturan branding & identitas sekolah berhasil diperbarui di seluruh sistem!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo & Banner Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <ImageIcon className="w-4 h-4 text-amber-500" /> Gambar Logo & Banner
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageUploadInput
              label="Logo Utama Madrasah"
              value={formData.logo_url || ''}
              onChange={(val) => setFormData({ ...formData, logo_url: val })}
              aspectRatio="square"
            />

            <ImageUploadInput
              label="Favicon Browser Tab"
              value={formData.favicon_url || ''}
              onChange={(val) => setFormData({ ...formData, favicon_url: val })}
              aspectRatio="square"
            />

            <ImageUploadInput
              label="Hero Banner Utama"
              value={formData.hero_banner_url || ''}
              onChange={(val) => setFormData({ ...formData, hero_banner_url: val })}
              aspectRatio="banner"
            />
          </div>
        </div>

        {/* Basic School Info Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <School className="w-4 h-4 text-amber-500" /> Informasi Dasar & Tahun Ajaran
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lembaga *</label>
              <input
                type="text"
                required
                value={formData.school_name}
                onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline Sekolah</label>
              <input
                type="text"
                value={formData.school_tagline}
                onChange={(e) => setFormData({ ...formData, school_tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">NPSN</label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Akreditasi</label>
              <input
                type="text"
                value={formData.akreditasi}
                onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tahun Ajaran PPDB</label>
              <input
                type="text"
                value={formData.ppdb_year || '2026/2027'}
                onChange={(e) => setFormData({ ...formData, ppdb_year: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Kepala Madrasah</label>
              <input
                type="text"
                value={formData.headmaster_name}
                onChange={(e) => setFormData({ ...formData, headmaster_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* School Statistics Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <School className="w-4 h-4 text-amber-500" /> Statistik & Capaian Utama Sekolah
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Jumlah Siswa & Siswi Aktif
              </label>
              <input
                type="text"
                placeholder="Contoh: 350+ Santri"
                value={formData.total_siswa_aktif || ''}
                onChange={(e) => setFormData({ ...formData, total_siswa_aktif: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Ditampilkan di card statistik utama</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rincian Siswi & Siswa
              </label>
              <input
                type="text"
                placeholder="Contoh: 180 Siswi / 170 Siswa"
                value={formData.total_siswi_aktif || ''}
                onChange={(e) => setFormData({ ...formData, total_siswi_aktif: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Rincian siswa/siswi aktif</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Guru & Staf Kompeten
              </label>
              <input
                type="text"
                placeholder="Contoh: 24 Guru & Staf"
                value={formData.total_guru_staf || ''}
                onChange={(e) => setFormData({ ...formData, total_guru_staf: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Jumlah pengajar & staf</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tingkat Kelulusan (%)
              </label>
              <input
                type="text"
                placeholder="Contoh: 100%"
                value={formData.tingkat_kelulusan || ''}
                onChange={(e) => setFormData({ ...formData, tingkat_kelulusan: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Persentase kelulusan alumni</span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nilai Akreditasi BAN-S/M
              </label>
              <input
                type="text"
                placeholder="Contoh: A (Unggul - Nilai 94)"
                value={formData.nilai_akreditasi_bansm || ''}
                onChange={(e) => setFormData({ ...formData, nilai_akreditasi_bansm: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Nilai resmi dari BAN-S/M</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Phone className="w-4 h-4 text-amber-500" /> Kontak & Alamat Sekretariat
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telepon Kantor</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">No. WhatsApp Official</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Official</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>Link URL Embed Google Maps (Iframe)</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">URL dari Google Maps -&gt; Bagikan -&gt; Sematkan Peta (atribut src)</span>
            </label>
            <textarea
              rows={2}
              value={formData.maps_iframe_url || ''}
              onChange={(e) => setFormData({ ...formData, maps_iframe_url: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-5 h-5 text-amber-300" />
          <span>Simpan Seluruh Pengaturan Branding</span>
        </button>
      </form>
    </div>
  );
};
