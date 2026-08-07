/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Edit3, Award, Calendar } from 'lucide-react';
import { Achievement } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface AchievementsManagerProps {
  achievements?: Achievement[];
  onSaveAchievements?: (newList: Achievement[]) => void;
}

export const AchievementsManager: React.FC<AchievementsManagerProps> = ({
  achievements: initialPropsAchievements,
  onSaveAchievements,
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    () => initialPropsAchievements || DataStore.getAchievements()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);

  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    category: 'Keagamaan',
    winner_name: '',
    level: 'Kabupaten',
    date: new Date().toISOString().split('T')[0],
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    description: '',
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Keagamaan',
      winner_name: '',
      level: 'Kabupaten',
      date: new Date().toISOString().split('T')[0],
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Achievement) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      winner_name: item.winner_name,
      level: item.level,
      date: item.date,
      image_url: item.image_url,
      description: item.description || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data prestasi ini?')) {
      const updated = achievements.filter((a) => a.id !== id);
      setAchievements(updated);
      DataStore.saveAchievements(updated);
      if (onSaveAchievements) onSaveAchievements(updated);
      DataStore.addActivityLog('Hapus Prestasi', 'Prestasi', `Menghapus prestasi ID: ${id}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.winner_name) return;

    if (editingItem) {
      const updated = achievements.map((a) =>
        a.id === editingItem.id ? { ...a, ...formData } : a
      );
      setAchievements(updated);
      DataStore.saveAchievements(updated);
      if (onSaveAchievements) onSaveAchievements(updated);
      DataStore.addActivityLog('Edit Prestasi', 'Prestasi', `Memperbarui prestasi: ${formData.title}`);
    } else {
      const newItem: Achievement = {
        id: `ach-${Date.now()}`,
        ...formData,
      };
      const updated = [newItem, ...achievements];
      setAchievements(updated);
      DataStore.saveAchievements(updated);
      if (onSaveAchievements) onSaveAchievements(updated);
      DataStore.addActivityLog('Tambah Prestasi', 'Prestasi', `Menambahkan prestasi baru: ${formData.title}`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Kelola Daftar Prestasi & Piagam Penghargaan</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftar kejuaraan dan pencapaian santri/madrasah yang tampil di publik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Prestasi
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="relative h-36 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img src={item.image_url || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-emerald-950 text-amber-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  {item.level}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  {item.category} • {item.winner_name}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">{item.title}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
              <span>{item.date}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1 text-slate-500 hover:text-emerald-600 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-slate-500 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {editingItem ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Judul Kejuaraan / Prestasi *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                  >
                    <option value="Keagamaan">Keagamaan</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Seni & Olahraga">Seni & Olahraga</option>
                    <option value="Pramuka">Pramuka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tingkat *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                  >
                    <option value="Kecamatan">Kecamatan</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Pemenang / Kontingen *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Ziyad (Kelas 5A)"
                  value={formData.winner_name}
                  onChange={(e) => setFormData({ ...formData, winner_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <ImageUploadInput
                label="Foto Piagam / Dokumentasi Prestasi"
                value={formData.image_url}
                onChange={(val) => setFormData({ ...formData, image_url: val })}
                aspectRatio="video"
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
