'use client';

import React, { useState } from 'react';
import {
  StaticPagesContent,
  ProgramUnggulanItem,
  EkstrakurikulerItem,
  ScheduleItem,
  OrgMemberItem,
} from '@/lib/types';
import {
  Save,
  CheckCircle2,
  FileText,
  Sparkles,
  BookOpen,
  Award,
  UserCheck,
  Plus,
  Trash2,
  GraduationCap,
  Clock,
  Layers,
  Users,
} from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface PagesManagerProps {
  pagesContent: StaticPagesContent;
  onSavePagesContent: (newPages: StaticPagesContent) => void;
}

export const PagesManager: React.FC<PagesManagerProps> = ({
  pagesContent,
  onSavePagesContent,
}) => {
  const [formData, setFormData] = useState<StaticPagesContent>(pagesContent);
  const [misiText, setMisiText] = useState<string>(
    (pagesContent.visi_misi?.misi || []).join('\n')
  );
  const [tujuanText, setTujuanText] = useState<string>(
    (pagesContent.visi_misi?.tujuan || []).join('\n')
  );
  const [ppdbPersyaratanText, setPpdbPersyaratanText] = useState<string>(
    (pagesContent.ppdb_info?.persyaratan || []).join('\n')
  );

  const [matpelAgamaText, setMatpelAgamaText] = useState<string>(
    (pagesContent.kurikulum_info?.matpel_agama || [
      'Al-Qur\'an Hadits (Membaca, Menghafal, Memahami)',
      'Aqidah Akhlaq (Pembentukan Karakter Terpuji)',
      'Fiqih & Praktek Ibadah Harian',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab Dasar & Muhadatsah',
    ]).join('\n')
  );

  const [matpelAkademikText, setMatpelAkademikText] = useState<string>(
    (pagesContent.kurikulum_info?.matpel_akademik || [
      'Pendidikan Pancasila & Kewarganegaraan',
      'Bahasa Indonesia & Literasi Digital',
      'Matematika Logis & Numerasi',
      'Ilmu Pengetahuan Alam & Sosial (IPAS)',
      'Bahasa Inggris & Muatan Lokal TIK/Komputer',
    ]).join('\n')
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPages: StaticPagesContent = {
      ...formData,
      visi_misi: {
        ...formData.visi_misi,
        judul_tujuan:
          formData.visi_misi?.judul_tujuan || 'Target & Tujuan Capaian Lulusan',
        misi: misiText.split('\n').map((s) => s.trim()).filter(Boolean),
        tujuan: tujuanText.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      kurikulum_info: {
        badge_kurikulum:
          formData.kurikulum_info?.badge_kurikulum ||
          'STANDAR NASIONAL & KEMENAG',
        judul_kurikulum:
          formData.kurikulum_info?.judul_kurikulum ||
          'Kurikulum Terpadu Kurikulum Merdeka + KMA 183',
        deskripsi_kurikulum:
          formData.kurikulum_info?.deskripsi_kurikulum ||
          'MI Syuriyah Pebatan mengimplementasikan Kurikulum Merdeka yang disempurnakan dengan muatan lokal pendidikan keagamaan khas Nahdlatul Ulama.',
        matpel_agama: matpelAgamaText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        matpel_akademik: matpelAkademikText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      },
      ppdb_info: {
        judul: formData.ppdb_info?.judul || 'Informasi PPDB 2026/2027',
        deskripsi: formData.ppdb_info?.deskripsi || '',
        beasiswa_info: formData.ppdb_info?.beasiswa_info || '',
        persyaratan: ppdbPersyaratanText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      },
      struktur_organisasi: {
        badge: formData.struktur_organisasi?.badge || 'PIMPINAN & PENGELOLA',
        judul: formData.struktur_organisasi?.judul || 'Struktur Organisasi Madrasah',
        subjudul: formData.struktur_organisasi?.subjudul || 'Bagan kepemimpinan dan manajerial MI Syuriyah Pebatan',
        pimpinan_utama: formData.struktur_organisasi?.pimpinan_utama || [
          { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
          { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
        ],
        pengelola_tambahan: formData.struktur_organisasi?.pengelola_tambahan || [
          { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
          { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
          { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
        ],
      },
    };

    onSavePagesContent(updatedPages);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdateProgram = (index: number, field: keyof ProgramUnggulanItem, value: string) => {
    const list = [...(formData.program_unggulan || [])];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      setFormData({ ...formData, program_unggulan: list });
    }
  };

  const handleAddProgram = () => {
    const list = [...(formData.program_unggulan || [])];
    list.push({
      id: `prog-${Date.now()}`,
      title: 'Program Baru',
      description: 'Deskripsi program unggulan baru.',
      icon_name: 'BookOpen',
    });
    setFormData({ ...formData, program_unggulan: list });
  };

  const handleDeleteProgram = (index: number) => {
    const list = [...(formData.program_unggulan || [])];
    list.splice(index, 1);
    setFormData({ ...formData, program_unggulan: list });
  };

  // Handlers for Ekstrakurikuler
  const handleAddEkskul = () => {
    const list = [
      ...(formData.ekstrakurikuler || [
        { id: 'ekstra-1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
        { id: 'ekstra-2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
        { id: 'ekstra-3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
        { id: 'ekstra-4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
        { id: 'ekstra-5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
        { id: 'ekstra-6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
      ]),
    ];
    list.push({
      id: `ekstra-${Date.now()}`,
      name: 'Ekstrakurikuler Baru',
      desc: 'Deskripsi kegiatan ekstrakurikuler.',
    });
    setFormData({ ...formData, ekstrakurikuler: list });
  };

  const handleUpdateEkskul = (index: number, field: keyof EkstrakurikulerItem, value: string) => {
    const list = [
      ...(formData.ekstrakurikuler || [
        { id: 'ekstra-1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
        { id: 'ekstra-2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
        { id: 'ekstra-3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
        { id: 'ekstra-4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
        { id: 'ekstra-5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
        { id: 'ekstra-6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
      ]),
    ];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      setFormData({ ...formData, ekstrakurikuler: list });
    }
  };

  const handleDeleteEkskul = (index: number) => {
    const list = [
      ...(formData.ekstrakurikuler || [
        { id: 'ekstra-1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
        { id: 'ekstra-2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
        { id: 'ekstra-3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
        { id: 'ekstra-4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
        { id: 'ekstra-5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
        { id: 'ekstra-6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
      ]),
    ];
    list.splice(index, 1);
    setFormData({ ...formData, ekstrakurikuler: list });
  };

  // Handlers for Jadwal KBM
  const handleAddJadwal = () => {
    const list = [
      ...(formData.jadwal_kbm || [
        { id: 'kbm-1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' as const },
        { id: 'kbm-2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' as const },
        { id: 'kbm-3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' as const },
        { id: 'kbm-4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' as const },
        { id: 'kbm-5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' as const },
        { id: 'kbm-6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' as const },
        { id: 'kbm-7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' as const },
      ]),
    ];
    list.push({
      id: `kbm-${Date.now()}`,
      time: '14.00 - 15.00 WIB',
      activity: 'Kegiatan Tambahan',
      type: 'Ekstra',
    });
    setFormData({ ...formData, jadwal_kbm: list });
  };

  const handleUpdateJadwal = (index: number, field: keyof ScheduleItem, value: any) => {
    const list = [
      ...(formData.jadwal_kbm || [
        { id: 'kbm-1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' as const },
        { id: 'kbm-2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' as const },
        { id: 'kbm-3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' as const },
        { id: 'kbm-4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' as const },
        { id: 'kbm-5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' as const },
        { id: 'kbm-6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' as const },
        { id: 'kbm-7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' as const },
      ]),
    ];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      setFormData({ ...formData, jadwal_kbm: list });
    }
  };

  const handleDeleteJadwal = (index: number) => {
    const list = [
      ...(formData.jadwal_kbm || [
        { id: 'kbm-1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' as const },
        { id: 'kbm-2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' as const },
        { id: 'kbm-3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' as const },
        { id: 'kbm-4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' as const },
        { id: 'kbm-5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' as const },
        { id: 'kbm-6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' as const },
        { id: 'kbm-7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' as const },
      ]),
    ];
    list.splice(index, 1);
    setFormData({ ...formData, jadwal_kbm: list });
  };

  // Handlers for Struktur Organisasi
  const handleAddPimpinanUtama = () => {
    const current = formData.struktur_organisasi?.pimpinan_utama || [
      { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
      { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
    ];
    const updated = [
      ...current,
      { id: `org-${Date.now()}`, jabatan: 'Jabatan Pimpinan', nama: 'Nama Pimpinan', keterangan: 'Keterangan Tambahan' },
    ];
    setFormData({
      ...formData,
      struktur_organisasi: {
        ...(formData.struktur_organisasi || {}),
        pimpinan_utama: updated,
      },
    });
  };

  const handleUpdatePimpinanUtama = (index: number, field: keyof OrgMemberItem, value: string) => {
    const current = [
      ...(formData.struktur_organisasi?.pimpinan_utama || [
        { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
        { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
      ]),
    ];
    if (current[index]) {
      current[index] = { ...current[index], [field]: value };
      setFormData({
        ...formData,
        struktur_organisasi: {
          ...(formData.struktur_organisasi || {}),
          pimpinan_utama: current,
        },
      });
    }
  };

  const handleDeletePimpinanUtama = (index: number) => {
    const current = [
      ...(formData.struktur_organisasi?.pimpinan_utama || [
        { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
        { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
      ]),
    ];
    current.splice(index, 1);
    setFormData({
      ...formData,
      struktur_organisasi: {
        ...(formData.struktur_organisasi || {}),
        pimpinan_utama: current,
      },
    });
  };

  const handleAddPengelola = () => {
    const current = formData.struktur_organisasi?.pengelola_tambahan || [
      { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
      { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
      { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
    ];
    const updated = [
      ...current,
      { id: `org-${Date.now()}`, jabatan: 'Jabatan Pengelola', nama: 'Nama Pengelola' },
    ];
    setFormData({
      ...formData,
      struktur_organisasi: {
        ...(formData.struktur_organisasi || {}),
        pengelola_tambahan: updated,
      },
    });
  };

  const handleUpdatePengelola = (index: number, field: keyof OrgMemberItem, value: string) => {
    const current = [
      ...(formData.struktur_organisasi?.pengelola_tambahan || [
        { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
        { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
        { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
      ]),
    ];
    if (current[index]) {
      current[index] = { ...current[index], [field]: value };
      setFormData({
        ...formData,
        struktur_organisasi: {
          ...(formData.struktur_organisasi || {}),
          pengelola_tambahan: current,
        },
      });
    }
  };

  const handleDeletePengelola = (index: number) => {
    const current = [
      ...(formData.struktur_organisasi?.pengelola_tambahan || [
        { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
        { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
        { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
      ]),
    ];
    current.splice(index, 1);
    setFormData({
      ...formData,
      struktur_organisasi: {
        ...(formData.struktur_organisasi || {}),
        pengelola_tambahan: current,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-400">Kelola Halaman Statis & Teks Konten Website</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Edit seluruh teks yang tampil di website: Sambutan, Visi Misi, Program Unggulan, Sejarah, Ticker, dan Info PPDB.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-emerald-700"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>Simpan Perubahan Teks</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-bold">Seluruh teks website berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs sm:text-sm">
        {/* 1. RUNNING TEXT TICKER, TAGLINE HERO & STATUS PPDB */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> Running Text Ticker, Tagline & Status PPDB
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Running Text Announcement Ticker</label>
                <input
                  type="text"
                  value={formData.running_text}
                  onChange={(e) => setFormData({ ...formData, running_text: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline Utama Hero Banner</label>
                <input
                  type="text"
                  value={formData.tagline_hero}
                  onChange={(e) => setFormData({ ...formData, tagline_hero: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Status Pendaftaran PPDB</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  Mengontrol tombol dan spanduk pendaftaran PPDB di website publik.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status_ppdb: true })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.status_ppdb
                      ? 'bg-emerald-700 text-white shadow'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  DIBUKA
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status_ppdb: false })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    !formData.status_ppdb
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  DITUTUP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SAMBUTAN KEPALA MADRASAH */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600" /> Sambutan Kepala Madrasah
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Kepala Madrasah</label>
              <input
                type="text"
                value={formData.sambutan_kepala.nama}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sambutan_kepala: { ...formData.sambutan_kepala, nama: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Gelar / Jabatan</label>
              <input
                type="text"
                value={formData.sambutan_kepala.gelar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sambutan_kepala: { ...formData.sambutan_kepala, gelar: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <ImageUploadInput
            label="Foto Kepala Madrasah"
            value={formData.sambutan_kepala.foto_url}
            onChange={(val) =>
              setFormData({
                ...formData,
                sambutan_kepala: { ...formData.sambutan_kepala, foto_url: val },
              })
            }
            aspectRatio="square"
          />

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Sambutan</label>
            <input
              type="text"
              value={formData.sambutan_kepala.judul}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sambutan_kepala: { ...formData.sambutan_kepala, judul: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Isi Pidato Sambutan Lengkap</label>
            <textarea
              rows={8}
              value={formData.sambutan_kepala.isi}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sambutan_kepala: { ...formData.sambutan_kepala, isi: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* 3. SEJARAH SINGKAT & VISI MISI */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" /> Sejarah Singkat & Visi, Misi, Tujuan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Halaman Sejarah</label>
              <input
                type="text"
                value={formData.sejarah.judul}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sejarah: { ...formData.sejarah, judul: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tahun Berdiri</label>
              <input
                type="text"
                value={formData.sejarah.tahun_berdiri}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sejarah: { ...formData.sejarah, tahun_berdiri: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sejarah Singkat Madrasah</label>
            <textarea
              rows={6}
              value={formData.sejarah.isi}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sejarah: { ...formData.sejarah, isi: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Teks Visi Utama Madrasah</label>
            <input
              type="text"
              value={formData.visi_misi.visi}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visi_misi: { ...formData.visi_misi, visi: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Seksi Target & Tujuan Capaian</label>
            <input
              type="text"
              value={formData.visi_misi?.judul_tujuan || ''}
              placeholder="Target & Tujuan Capaian Lulusan"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visi_misi: { ...formData.visi_misi, judul_tujuan: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Poin Misi Utama (Pisahkan per baris baru)
              </label>
              <textarea
                rows={6}
                value={misiText}
                onChange={(e) => setMisiText(e.target.value)}
                placeholder="1 baris = 1 poin misi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Poin Target & Tujuan Capaian (Pisahkan per baris baru)
              </label>
              <textarea
                rows={6}
                value={tujuanText}
                onChange={(e) => setTujuanText(e.target.value)}
                placeholder="1 baris = 1 poin tujuan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3.5 STRUKTUR ORGANISASI MADRASAH */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" /> Struktur Organisasi Madrasah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Kelola bagan pimpinan, komite, wakasek, dan pengelola madrasah.
            </p>
          </div>

          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Badge / Tagline Seksi
              </label>
              <input
                type="text"
                value={formData.struktur_organisasi?.badge || ''}
                placeholder="PIMPINAN & PENGELOLA"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    struktur_organisasi: {
                      ...(formData.struktur_organisasi || {}),
                      badge: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Judul Utama
              </label>
              <input
                type="text"
                value={formData.struktur_organisasi?.judul || ''}
                placeholder="Struktur Organisasi Madrasah"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    struktur_organisasi: {
                      ...(formData.struktur_organisasi || {}),
                      judul: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subjudul / Deskripsi
              </label>
              <input
                type="text"
                value={formData.struktur_organisasi?.subjudul || ''}
                placeholder="Bagan kepemimpinan dan manajerial MI Syuriyah Pebatan"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    struktur_organisasi: {
                      ...(formData.struktur_organisasi || {}),
                      subjudul: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Block A: Pimpinan Utama */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Pimpinan Utama (Level Atas / Kartu Bergaris Emas)
              </span>
              <button
                type="button"
                onClick={handleAddPimpinanUtama}
                className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-900"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Tambah Pimpinan Utama</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                formData.struktur_organisasi?.pimpinan_utama || [
                  { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
                  { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
                ]
              ).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 bg-emerald-50/60 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700 space-y-2 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[11px] text-emerald-800 dark:text-emerald-400">
                      Pimpinan #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeletePimpinanUtama(idx)}
                      className="p-1 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:text-red-800"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                        Jabatan / Posisi
                      </label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => handleUpdatePimpinanUtama(idx, 'jabatan', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => handleUpdatePimpinanUtama(idx, 'nama', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                      Keterangan / Peran
                    </label>
                    <input
                      type="text"
                      value={item.keterangan || ''}
                      placeholder="Contoh: Penanggung Jawab Utama"
                      onChange={(e) => handleUpdatePimpinanUtama(idx, 'keterangan', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block B: Pengelola & Koordinator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Pengelola, Wakasek & Koordinator (Level Kedua)
              </span>
              <button
                type="button"
                onClick={handleAddPengelola}
                className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-900"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Tambah Pengelola</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(
                formData.struktur_organisasi?.pengelola_tambahan || [
                  { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
                  { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
                  { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
                ]
              ).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[11px] text-amber-700 dark:text-amber-400">
                      Pengelola #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeletePengelola(idx)}
                      className="p-1 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:text-red-800"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                      Jabatan / Posisi
                    </label>
                    <input
                      type="text"
                      value={item.jabatan}
                      onChange={(e) => handleUpdatePengelola(idx, 'jabatan', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-0.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => handleUpdatePengelola(idx, 'nama', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" /> Keunggulan & Program Utama
            </h3>
            <button
              type="button"
              onClick={handleAddProgram}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Tambah Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.program_unggulan || []).map((prog, idx) => (
              <div
                key={prog.id || idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-amber-700 dark:text-amber-400">
                    Kartu Program #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteProgram(idx)}
                    className="p-1 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:text-red-800"
                    title="Hapus Program"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Program</label>
                  <input
                    type="text"
                    value={prog.title}
                    onChange={(e) => handleUpdateProgram(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Ringkas</label>
                  <textarea
                    rows={2}
                    value={prog.description}
                    onChange={(e) => handleUpdateProgram(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4.1 KURIKULUM & MATAPELAJARAN */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-600" /> Kurikulum & Struktur Mata Pelajaran
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Badge / Tagline Kurikulum
              </label>
              <input
                type="text"
                value={formData.kurikulum_info?.badge_kurikulum || ''}
                placeholder="STANDAR NASIONAL & KEMENAG"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kurikulum_info: {
                      ...(formData.kurikulum_info || {}),
                      badge_kurikulum: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Judul Utama Kurikulum
              </label>
              <input
                type="text"
                value={formData.kurikulum_info?.judul_kurikulum || ''}
                placeholder="Kurikulum Terpadu Kurikulum Merdeka + KMA 183"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kurikulum_info: {
                      ...(formData.kurikulum_info || {}),
                      judul_kurikulum: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Deskripsi Singkat Kurikulum
            </label>
            <textarea
              rows={2}
              value={formData.kurikulum_info?.deskripsi_kurikulum || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  kurikulum_info: {
                    ...(formData.kurikulum_info || {}),
                    deskripsi_kurikulum: e.target.value,
                  },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kelompok Mata Pelajaran Agama Islam (KMA 183) — 1 baris = 1 poin
              </label>
              <textarea
                rows={5}
                value={matpelAgamaText}
                onChange={(e) => setMatpelAgamaText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kelompok Mata Pelajaran Akademik & Sains — 1 baris = 1 poin
              </label>
              <textarea
                rows={5}
                value={matpelAkademikText}
                onChange={(e) => setMatpelAkademikText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4.2 EKSTRAKURIKULER & PENGEMBANGAN BAKAT */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" /> Ekstrakurikuler & Pengembangan Bakat
            </h3>
            <button
              type="button"
              onClick={handleAddEkskul}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Tambah Ekskul</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(formData.ekstrakurikuler || [
              { id: 'ekstra-1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
              { id: 'ekstra-2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
              { id: 'ekstra-3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
              { id: 'ekstra-4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
              { id: 'ekstra-5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
              { id: 'ekstra-6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
            ]).map((eks, idx) => (
              <div
                key={eks.id || idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-amber-700 dark:text-amber-400">
                    Ekskul #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEkskul(idx)}
                    className="p-1 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:text-red-800"
                    title="Hapus Ekskul"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Kegiatan
                  </label>
                  <input
                    type="text"
                    value={eks.name}
                    onChange={(e) => handleUpdateEkskul(idx, 'name', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Deskripsi Ringkas
                  </label>
                  <textarea
                    rows={2}
                    value={eks.desc}
                    onChange={(e) => handleUpdateEkskul(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4.3 JADWAL KBM & AKTIVITAS HARIAN */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Jadwal Kegiatan Belajar Mengajar (KBM)
            </h3>
            <button
              type="button"
              onClick={handleAddJadwal}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Tambah Jadwal</span>
            </button>
          </div>

          <div className="space-y-3">
            {(formData.jadwal_kbm || [
              { id: 'kbm-1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' as const },
              { id: 'kbm-2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' as const },
              { id: 'kbm-3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' as const },
              { id: 'kbm-4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' as const },
              { id: 'kbm-5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' as const },
              { id: 'kbm-6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' as const },
              { id: 'kbm-7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' as const },
            ]).map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <div className="w-full sm:w-1/4">
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Waktu</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => handleUpdateJadwal(idx, 'time', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Aktivitas / Kegiatan</label>
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => handleUpdateJadwal(idx, 'activity', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div className="w-full sm:w-1/4">
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Kategori</label>
                  <select
                    value={item.type}
                    onChange={(e) => handleUpdateJadwal(idx, 'type', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  >
                    <option value="Pembiasaan">Pembiasaan</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Istirahat">Istirahat</option>
                    <option value="Ekstra">Ekstra</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteJadwal(idx)}
                  className="p-2 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:text-red-800 self-end sm:self-center shrink-0"
                  title="Hapus Jadwal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. INFORMASI & PERSYARATAN PPDB */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-600" /> Teks Informasi & Ketentuan PPDB
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Informasi PPDB</label>
              <input
                type="text"
                value={formData.ppdb_info?.judul || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ppdb_info: {
                      judul: e.target.value,
                      deskripsi: formData.ppdb_info?.deskripsi || '',
                      beasiswa_info: formData.ppdb_info?.beasiswa_info || '',
                      persyaratan: formData.ppdb_info?.persyaratan || [],
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Info Beasiswa & Diskon</label>
              <input
                type="text"
                value={formData.ppdb_info?.beasiswa_info || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ppdb_info: {
                      judul: formData.ppdb_info?.judul || '',
                      deskripsi: formData.ppdb_info?.deskripsi || '',
                      beasiswa_info: e.target.value,
                      persyaratan: formData.ppdb_info?.persyaratan || [],
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat PPDB</label>
            <textarea
              rows={3}
              value={formData.ppdb_info?.deskripsi || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ppdb_info: {
                    judul: formData.ppdb_info?.judul || '',
                    deskripsi: e.target.value,
                    beasiswa_info: formData.ppdb_info?.beasiswa_info || '',
                    persyaratan: formData.ppdb_info?.persyaratan || [],
                  },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Daftar Syarat Pendaftaran (1 poin per baris)
            </label>
            <textarea
              rows={5}
              value={ppdbPersyaratanText}
              onChange={(e) => setPpdbPersyaratanText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-xl transition-all flex items-center gap-2 border border-emerald-700"
          >
            <Save className="w-5 h-5 text-amber-300" />
            <span>Simpan Seluruh Perubahan Teks Website</span>
          </button>
        </div>
      </form>
    </div>
  );
};
