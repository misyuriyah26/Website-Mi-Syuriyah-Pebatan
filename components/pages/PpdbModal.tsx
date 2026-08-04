'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Gift,
  Search,
  Printer,
  Sparkles,
  Upload,
  AlertCircle,
  Clock,
  User,
  Phone,
  MapPin,
  Calendar,
  School,
  Download,
} from 'lucide-react';
import { PpdbRegistration, SchoolSettings, StaticPagesContent } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { IslamicStarOrnament } from '../IslamicPattern';

interface PpdbModalProps {
  settings: SchoolSettings;
  pages?: StaticPagesContent;
  isOpen: boolean;
  onClose: () => void;
  onRegisteredSuccess?: () => void;
}

export const PpdbModal: React.FC<PpdbModalProps> = ({
  settings,
  pages,
  isOpen,
  onClose,
  onRegisteredSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'FORM' | 'CEK_STATUS' | 'INFO'>('FORM');
  
  // Registration Form state
  const [formData, setFormData] = useState({
    student_name: '',
    nisn_nik: '',
    gender: 'L' as 'L' | 'P',
    birth_place: 'Brebes',
    birth_date: '2020-01-01',
    previous_school: '',
    hobby: '',
    cita_cita: '',
    parent_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    phone_number: '',
    address: '',
    doc_kk_url: '',
    doc_akta_url: '',
    doc_foto_url: '',
  });

  const [submittedReg, setSubmittedReg] = useState<PpdbRegistration | null>(null);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<PpdbRegistration[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Spam protection / rate limiting
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Rate-limiting check (at least 10s between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setSubmitError('Harap tunggu beberapa detik sebelum mengirim pendaftaran kembali untuk keamanan.');
      return;
    }

    if (!formData.student_name || !formData.parent_name || !formData.phone_number) {
      setSubmitError('Mohon isi nama calon siswa, nama orang tua, dan nomor WhatsApp aktif.');
      return;
    }

    setLastSubmitTime(now);

    const newReg = DataStore.addPpdbRegistration({
      student_name: formData.student_name,
      nisn_nik: formData.nisn_nik,
      gender: formData.gender,
      birth_place: formData.birth_place || 'Brebes',
      birth_date: formData.birth_date || '2020-01-01',
      previous_school: formData.previous_school || 'RA / TK / PAUD',
      hobby: formData.hobby,
      cita_cita: formData.cita_cita,
      parent_name: formData.parent_name,
      father_occupation: formData.father_occupation,
      mother_name: formData.mother_name,
      mother_occupation: formData.mother_occupation,
      phone_number: formData.phone_number,
      address: formData.address || 'Desa Pebatan Wanasari Brebes',
      doc_kk_url: formData.doc_kk_url,
      doc_akta_url: formData.doc_akta_url,
      doc_foto_url: formData.doc_foto_url,
    });

    setSubmittedReg(newReg);
    if (onRegisteredSuccess) {
      onRegisteredSuccess();
    }
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const results = DataStore.findPpdbByRegOrPhone(searchQuery);
      setSearchResult(results);
      setIsSearching(false);
    }, 300);
  };

  const getStatusBadge = (status: PpdbRegistration['status']) => {
    switch (status) {
      case 'Diterima':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> DITERIMA</span>;
      case 'Diproses':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-xs border border-blue-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> SEDANG DIPROSES</span>;
      case 'Perlu Perbaikan':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-300 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> PERLU PERBAIKAN</span>;
      case 'Ditolak':
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold text-xs border border-rose-300">DITOLAK</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-300">MENUNGGU VERIFIKASI</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 my-4 flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-5 sm:p-6 relative flex justify-between items-start border-b-2 border-amber-400 shrink-0">
          <div className="flex items-center gap-3.5 pr-8">
            {settings.logo_url && (
              <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-amber-400 p-0.5 overflow-hidden shrink-0 hidden sm:block">
                <img src={settings.logo_url} alt="Logo Sekolah" className="w-full h-full object-cover rounded-full" />
              </div>
            )}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-emerald-950 px-2.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider">
                <IslamicStarOrnament className="w-3 h-3 text-emerald-950" />
                <span>PPDB TA {settings.ppdb_year || '2026/2027'}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                Pendaftaran & Cek Status PPDB {settings.school_name}
              </h2>
              <p className="text-xs text-emerald-200">
                Sistem Pendaftaran Peserta Didik Baru Terpadu Online & Terverifikasi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-700 focus:outline-none shrink-0 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shrink-0">
          <button
            onClick={() => setActiveTab('FORM')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center transition-colors border-b-2 ${
              activeTab === 'FORM'
                ? 'border-emerald-800 dark:border-emerald-500 text-emerald-900 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Formulir Pendaftaran Online
          </button>
          <button
            onClick={() => setActiveTab('CEK_STATUS')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center transition-colors border-b-2 ${
              activeTab === 'CEK_STATUS'
                ? 'border-emerald-800 dark:border-emerald-500 text-emerald-900 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Cek Status Pendaftaran
          </button>
          <button
            onClick={() => setActiveTab('INFO')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center transition-colors border-b-2 ${
              activeTab === 'INFO'
                ? 'border-emerald-800 dark:border-emerald-500 text-emerald-900 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Syarat & Informasi
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {activeTab === 'FORM' && (
            submittedReg ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-extrabold text-sm rounded-lg mb-2 border border-amber-300">
                    NOMOR REGISTRASI: {submittedReg.reg_number}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Alhamdulillah! Pendaftaran Berhasil Dikirim
                  </h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs sm:text-sm max-w-lg mx-auto space-y-2">
                  <p className="flex justify-between border-b pb-1 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Nama Calon Siswa:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{submittedReg.student_name}</span>
                  </p>
                  <p className="flex justify-between border-b pb-1 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Nama Orang Tua:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{submittedReg.parent_name}</span>
                  </p>
                  <p className="flex justify-between border-b pb-1 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">WhatsApp Aktif:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{submittedReg.phone_number}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Status Pendaftaran:</span>
                    {getStatusBadge(submittedReg.status)}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Simpan Nomor Registrasi <strong>{submittedReg.reg_number}</strong> Anda. Panitia PPDB akan memverifikasi berkas dan menghubungi via WhatsApp.
                </p>

                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedReg(null);
                      setFormData({
                        student_name: '',
                        nisn_nik: '',
                        gender: 'L',
                        birth_place: 'Brebes',
                        birth_date: '2020-01-01',
                        previous_school: '',
                        hobby: '',
                        cita_cita: '',
                        parent_name: '',
                        father_occupation: '',
                        mother_name: '',
                        mother_occupation: '',
                        phone_number: '',
                        address: '',
                        doc_kk_url: '',
                        doc_akta_url: '',
                        doc_foto_url: '',
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Daftar Calon Siswa Lain
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('CEK_STATUS');
                      setSearchQuery(submittedReg.reg_number);
                      setSearchResult([submittedReg]);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-4 h-4" /> Cek Bukti Kartu Pendaftaran
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Dapatkan Beasiswa Bebas Biaya Pendaftaran & Diskon Seragam bagi pendaftar Gelombang 1!
                  </span>
                </div>

                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4" /> 1. DATA CALON SISWA
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap Calon Siswa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sesuai Akta Kelahiran"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      NISN / NIK Siswa (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="3329xxxxxxxxxxxx"
                      value={formData.nisn_nik}
                      onChange={(e) => setFormData({ ...formData, nisn_nik: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'L' | 'P' })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="L">Laki-Laki (L)</option>
                      <option value="P">Perempuan (P)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tempat Lahir</label>
                    <input
                      type="text"
                      value={formData.birth_place}
                      onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={formData.birth_date}
                      onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Asal TK / RA / PAUD
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: RA Muslimat NU Pebatan"
                      value={formData.previous_school}
                      onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Hobi & Cita-Cita
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Menggambar & Dokter"
                      value={formData.cita_cita}
                      onChange={(e) => setFormData({ ...formData, cita_cita: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border-b border-slate-200 dark:border-slate-800 pb-2 pt-2">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> 2. DATA ORANG TUA / WALI & ALAMAT
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Ayah Kandung / Wali *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Ayah"
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Pekerjaan Ayah
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Wiraswasta / Petani / PNS"
                      value={formData.father_occupation}
                      onChange={(e) => setFormData({ ...formData, father_occupation: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Ibu Kandung
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Ibu"
                      value={formData.mother_name}
                      onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Alamat Domisili Lengkap</label>
                  <textarea
                    rows={2}
                    placeholder="RT/RW, Dukuh/Desa Pebatan, Kec. Wanasari, Kab. Brebes"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="border-b border-slate-200 dark:border-slate-800 pb-2 pt-2">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> 3. LAMPIRAN DOKUMEN (LINK FOTO / KK / AKTA)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ImageUploadInput
                    label="Foto Kartu Keluarga (KK)"
                    value={formData.doc_kk_url || ''}
                    onChange={(val) => setFormData({ ...formData, doc_kk_url: val })}
                    aspectRatio="video"
                  />
                  <ImageUploadInput
                    label="Foto Akta Kelahiran"
                    value={formData.doc_akta_url || ''}
                    onChange={(val) => setFormData({ ...formData, doc_akta_url: val })}
                    aspectRatio="video"
                  />
                  <ImageUploadInput
                    label="Pas Photo 3x4 Calon Siswa"
                    value={formData.doc_foto_url || ''}
                    onChange={(val) => setFormData({ ...formData, doc_foto_url: val })}
                    aspectRatio="square"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-extrabold text-sm shadow-lg border border-amber-300 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-emerald-950" />
                  <span>KIRIM PENDAFTARAN PPDB ONLINE</span>
                </button>
              </form>
            )
          )}

          {activeTab === 'CEK_STATUS' && (
            <div className="space-y-5">
              <form onSubmit={handleSearchStatus} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan Nomor Registrasi (REG-2026-xxx) atau No. HP/WA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-4 h-4" /> Cari Status
                </button>
              </form>

              {searchResult && searchResult.length === 0 && (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
                  Data pendaftaran tidak ditemukan dengan kata kunci &quot;{searchQuery}&quot;. Pastikan nomor registrasi sesuai.
                </div>
              )}

              {searchResult && searchResult.length > 0 && (
                <div className="space-y-4">
                  {searchResult.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-emerald-500/40 shadow-lg space-y-4 relative"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                            BUKTI PENDAFTARAN PPDB ONLINE
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {item.student_name} ({item.gender === 'L' ? 'Laki-Laki' : 'Perempuan'})
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            No. Reg: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{item.reg_number}</strong>
                          </p>
                        </div>
                        <div>{getStatusBadge(item.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                        <p><strong>Orang Tua / Wali:</strong> {item.parent_name}</p>
                        <p><strong>No. WhatsApp:</strong> {item.phone_number}</p>
                        <p><strong>Asal Sekolah:</strong> {item.previous_school}</p>
                        <p><strong>Tanggal Daftar:</strong> {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="sm:col-span-2"><strong>Alamat:</strong> {item.address}</p>
                      </div>

                      {item.admin_notes && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                          <strong>Catatan Verifikasi Admin:</strong> {item.admin_notes}
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => window.print()}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" /> Cetak Kartu Pendaftaran
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'INFO' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" /> {pages?.ppdb_info?.judul || 'Persyaratan Berkas Pendaftaran'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {pages?.ppdb_info?.deskripsi || 'Silakan lengkapi berkas administrasi calon peserta didik baru.'}
                </p>
                <ul className="space-y-1.5 list-disc pl-5 font-medium pt-2">
                  {(pages?.ppdb_info?.persyaratan && pages.ppdb_info.persyaratan.length > 0
                    ? pages.ppdb_info.persyaratan
                    : [
                        'Mengisi Formulir Pendaftaran PPDB Online / Offline.',
                        'Fotokopi Akta Kelahiran calon siswa (3 lembar).',
                        'Fotokopi Kartu Keluarga / KK terbaru (3 lembar).',
                        'Fotokopi KTP Ayah & Ibu (1 lembar).',
                        'Pas Photo Berwarna ukuran 3x4 (4 lembar).',
                        'Usia minimal 6 tahun per 1 Juli 2026.',
                      ]
                  ).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" /> Gelombang 1 (Unggulan)
                  </h4>
                  <p className="text-xs">Tahun Ajaran {settings.ppdb_year}</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    * {pages?.ppdb_info?.beasiswa_info || 'Bebas Biaya Pendaftaran + Potongan Seragam Khusus 50 Pendaftar Pertama.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" /> Gelombang 2 (Reguler)
                  </h4>
                  <p className="text-xs">Mei - Juli 2026</p>
                  <p className="text-[11px] text-slate-500">
                    * Pembagian kelas & seragam sekolah.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 text-xs">Butuh Brosur Cetak PDF?</h4>
                  <p className="text-[11px] text-amber-800 dark:text-amber-200">Unduh brosur resmi PPDB MI Syuriyah Pebatan untuk disebarkan.</p>
                </div>
                <button
                  onClick={() => alert('Brosur PPDB 2026/2027 MI Syuriyah Pebatan diunduh.')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Brosur PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
