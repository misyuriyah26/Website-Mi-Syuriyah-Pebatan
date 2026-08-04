'use client';

import React, { useState } from 'react';
import { NewsItem } from '@/lib/types';
import { Plus, Edit, Trash2, Eye, Calendar, Tag, CheckCircle2, X } from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface BeritaManagerProps {
  newsList: NewsItem[];
  onSaveNews: (newList: NewsItem[]) => void;
}

export const BeritaManager: React.FC<BeritaManagerProps> = ({ newsList, onSaveNews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Berita' as NewsItem['category'],
    excerpt: '',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
    author: 'Admin Operator',
    is_published: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Berita',
      excerpt: '',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
      author: 'Humas Madrasah',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      image_url: item.image_url,
      author: item.author,
      is_published: item.is_published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      const updated = newsList.filter((n) => n.id !== id);
      onSaveNews(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Mohon isi judul dan konten berita.');
      return;
    }

    if (editingItem) {
      const updated = newsList.map((n) =>
        n.id === editingItem.id
          ? {
              ...n,
              title: formData.title,
              category: formData.category,
              excerpt: formData.excerpt || formData.content.slice(0, 120),
              content: formData.content,
              image_url: formData.image_url,
              author: formData.author,
              is_published: formData.is_published,
            }
          : n
      );
      onSaveNews(updated);
    } else {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: formData.excerpt || formData.content.slice(0, 120),
        content: formData.content,
        category: formData.category,
        image_url: formData.image_url,
        author: formData.author || 'Admin Operator',
        created_at: new Date().toISOString(),
        is_published: formData.is_published,
        views: 1,
      };
      onSaveNews([newItem, ...newsList]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kelola Berita & Pengumuman</h2>
          <p className="text-xs text-slate-500">
            Tambah, edit, atau hapus publikasi berita madrasah
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-emerald-700"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {/* List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-emerald-900 text-amber-300 border-b border-emerald-800">
              <tr>
                <th className="p-3 font-bold">Judul Berita</th>
                <th className="p-3 font-bold">Kategori</th>
                <th className="p-3 font-bold">Penulis</th>
                <th className="p-3 font-bold">Tanggal</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {newsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-emerald-950 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{item.author}</td>
                  <td className="p-3 font-mono text-slate-500 text-xs">
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-3">
                    {item.is_published ? (
                      <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded bg-red-50 text-red-800 hover:bg-red-100 font-bold"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 my-6 animate-fadeIn">
            <div className="bg-emerald-950 text-white p-5 flex justify-between items-center border-b-2 border-amber-400">
              <h3 className="font-bold text-lg">
                {editingItem ? 'Edit Berita' : 'Tambah Berita Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full bg-emerald-900 text-emerald-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as NewsItem['category'] })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="PPDB">PPDB</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Sumber</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Gambar Sampul Berita"
                value={formData.image_url}
                onChange={(val) => setFormData({ ...formData, image_url: val })}
                aspectRatio="video"
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Berita Lengkap *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 text-emerald-800 rounded"
                />
                <label htmlFor="published" className="text-xs font-bold text-slate-700">
                  Publikasikan Berita Ini Langsung (Published)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
