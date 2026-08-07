/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { Plus, Trash2, Calendar, Tag, X } from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface GaleriManagerProps {
  galleryList: GalleryItem[];
  onSaveGallery: (newList: GalleryItem[]) => void;
}

export const GaleriManager: React.FC<GaleriManagerProps> = ({ galleryList, onSaveGallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Keagamaan' as GalleryItem['category'],
    image_url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1000',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto dari galeri?')) {
      const updated = galleryList.filter((g) => g.id !== id);
      onSaveGallery(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      alert('Mohon isi judul foto dan URL gambar.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      image_url: formData.image_url,
      date: formData.date,
      description: formData.description,
    };

    onSaveGallery([newItem, ...galleryList]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kelola Galeri Foto Kegiatan</h2>
          <p className="text-xs text-slate-500">Upload dan atur album foto dokumentasi madrasah</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-emerald-700"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Upload Foto Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryList.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 bg-slate-100">
              <img src={img.image_url || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'} alt={img.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-emerald-900 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded shadow uppercase">
                {img.category}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-emerald-950 line-clamp-2">{img.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{img.date}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="px-3 py-1.5 rounded bg-red-50 text-red-800 hover:bg-red-100 font-bold text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Foto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 my-6 animate-fadeIn">
            <div className="bg-emerald-950 text-white p-5 flex justify-between items-center border-b-2 border-amber-400">
              <h3 className="font-bold text-lg">Upload Foto Galeri Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full bg-emerald-900 text-emerald-200 hover:bg-emerald-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Foto / Kegiatan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lomba Sholawat Porseni Brebes"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori Album *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as GalleryItem['category'],
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="Keagamaan">Keagamaan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="PHBI">PHBI</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Foto Galeri *"
                value={formData.image_url}
                onChange={(val) => setFormData({ ...formData, image_url: val })}
                aspectRatio="video"
              />

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Keterangan / Deskripsi</label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan singkat foto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow hover:bg-emerald-700"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
