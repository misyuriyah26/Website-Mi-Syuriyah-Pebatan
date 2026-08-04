'use client';

import React, { useState } from 'react';
import { Quote, Plus, Trash2, Edit3, Star, CheckCircle2, UserCheck } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface TestimonialsManagerProps {
  testimonials?: Testimonial[];
  onSaveTestimonials?: (newList: Testimonial[]) => void;
}

export const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({
  testimonials: initialPropsTestimonials,
  onSaveTestimonials,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    () => initialPropsTestimonials || DataStore.getTestimonials()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar_url: '',
    quote: '',
    rating: 5,
    year: '2026',
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: 'Wali Murid Kelas 1',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      quote: '',
      rating: 5,
      year: '2026',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      avatar_url: item.avatar_url,
      quote: item.quote,
      rating: item.rating,
      year: item.year,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus testimoni ini?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      setTestimonials(updated);
      DataStore.saveTestimonials(updated);
      if (onSaveTestimonials) onSaveTestimonials(updated);
      DataStore.addActivityLog('Hapus Testimoni', 'Testimoni', `Menghapus testimoni ID: ${id}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    if (editingItem) {
      const updated = testimonials.map((t) =>
        t.id === editingItem.id ? { ...t, ...formData } : t
      );
      setTestimonials(updated);
      DataStore.saveTestimonials(updated);
      if (onSaveTestimonials) onSaveTestimonials(updated);
      DataStore.addActivityLog('Edit Testimoni', 'Testimoni', `Memperbarui testimoni oleh: ${formData.name}`);
    } else {
      const newItem: Testimonial = {
        id: `testi-${Date.now()}`,
        ...formData,
      };
      const updated = [newItem, ...testimonials];
      setTestimonials(updated);
      DataStore.saveTestimonials(updated);
      if (onSaveTestimonials) onSaveTestimonials(updated);
      DataStore.addActivityLog('Tambah Testimoni', 'Testimoni', `Menambahkan testimoni baru oleh: ${formData.name}`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Quote className="w-5 h-5 text-amber-500" />
            <span>Kelola Testimoni Wali Murid & Alumni</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftar testimoni yang ditampilkan di halaman beranda publik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Testimoni
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3 relative group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
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

              <p className="text-xs text-slate-700 dark:text-slate-200 italic">&ldquo;{item.quote}&rdquo;</p>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
              <img
                src={item.avatar_url}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover border border-amber-400"
              />
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</h4>
                <p className="text-[10px] text-slate-500">{item.role} ({item.year})</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {editingItem ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Tokoh / Wali Murid *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Jabatan / Status *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Wali Murid Kelas 3 / Alumni 2018"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <ImageUploadInput
                label="Foto Profil Avatar"
                value={formData.avatar_url}
                onChange={(val) => setFormData({ ...formData, avatar_url: val })}
                aspectRatio="square"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kutipan / Pesan Testimoni *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

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
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
