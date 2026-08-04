'use client';

import React, { useState } from 'react';
import { StaticPagesContent, ProgramUnggulanItem } from '@/lib/types';
import { Save, CheckCircle2, FileText, Sparkles, BookOpen, Award, UserCheck, Plus, Trash2 } from 'lucide-react';
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

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPages: StaticPagesContent = {
      ...formData,
      visi_misi: {
        ...formData.visi_misi,
        misi: misiText.split('\n').map((s) => s.trim()).filter(Boolean),
        tujuan: tujuanText.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      ppdb_info: {
        judul: formData.ppdb_info?.judul || 'Informasi PPDB 2026/2027',
        deskripsi: formData.ppdb_info?.deskripsi || '',
        beasiswa_info: formData.ppdb_info?.beasiswa_info || '',
        persyaratan: ppdbPersyaratanText.split('\n').map((s) => s.trim()).filter(Boolean),
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

        {/* 4. PROGRAM UNGGULAN KARTU UTAMA */}
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
