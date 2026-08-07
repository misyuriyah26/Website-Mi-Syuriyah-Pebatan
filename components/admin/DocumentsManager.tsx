'use client';

import React, { useState } from 'react';
import { FileDown, Plus, Trash2, Edit3, Download, FileText } from 'lucide-react';
import { DownloadDocument } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { FileUploadInput } from '@/components/ui/FileUploadInput';

interface DocumentsManagerProps {
  documents?: DownloadDocument[];
  onSaveDocuments?: (newList: DownloadDocument[]) => void;
}

export const DocumentsManager: React.FC<DocumentsManagerProps> = ({
  documents: initialPropsDocuments,
  onSaveDocuments,
}) => {
  const [documents, setDocuments] = useState<DownloadDocument[]>(
    () => initialPropsDocuments || DataStore.getDocuments()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DownloadDocument | null>(null);

  const [formData, setFormData] = useState<Omit<DownloadDocument, 'id' | 'download_count'>>({
    title: '',
    category: 'Brosur & PPDB',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_type: 'PDF',
    file_size: '1.2 MB',
    created_at: new Date().toISOString().split('T')[0],
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Brosur & PPDB',
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_type: 'PDF',
      file_size: '1.2 MB',
      created_at: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus dokumen ini?')) {
      const updated = documents.filter((d) => d.id !== id);
      setDocuments(updated);
      DataStore.saveDocuments(updated);
      if (onSaveDocuments) onSaveDocuments(updated);
      DataStore.addActivityLog('Hapus Dokumen', 'Pusat Unduhan', `Menghapus dokumen ID: ${id}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingItem) {
      const updated = documents.map((d) =>
        d.id === editingItem.id ? { ...d, ...formData } : d
      );
      setDocuments(updated);
      DataStore.saveDocuments(updated);
      if (onSaveDocuments) onSaveDocuments(updated);
      DataStore.addActivityLog('Edit Dokumen', 'Pusat Unduhan', `Memperbarui dokumen: ${formData.title}`);
    } else {
      const newItem: DownloadDocument = {
        id: `doc-${Date.now()}`,
        download_count: 0,
        ...formData,
      };
      const updated = [newItem, ...documents];
      setDocuments(updated);
      DataStore.saveDocuments(updated);
      if (onSaveDocuments) onSaveDocuments(updated);
      DataStore.addActivityLog('Tambah Dokumen', 'Pusat Unduhan', `Upload dokumen baru: ${formData.title}`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Kelola Pusat Unduhan (Download Center)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload brosur PPDB, kalender akademik, formulir, dan file PDF untuk diunduh publik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Upload Dokumen
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
              <th className="p-3">Judul Dokumen</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Tipe & Ukuran</th>
              <th className="p-3">Jumlah Unduhan</th>
              <th className="p-3">Tanggal Upload</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{doc.title}</span>
                </td>
                <td className="p-3 text-slate-600 dark:text-slate-400">{doc.category}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-bold text-[10px]">
                    {doc.file_type} ({doc.file_size})
                  </span>
                </td>
                <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">{doc.download_count}x</td>
                <td className="p-3 text-slate-500">{doc.created_at}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                    title="Hapus Dokumen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Upload / Tambah Dokumen Baru
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Judul Dokumen *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Brosur Resmi PPDB 2026/2027"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Dokumen</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                  >
                    <option value="Brosur & PPDB">Brosur & PPDB</option>
                    <option value="Kalender Akademik">Kalender Akademik</option>
                    <option value="Formulir">Formulir</option>
                    <option value="Kitab & Panduan">Kitab & Panduan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Ukuran File</label>
                  <input
                    type="text"
                    value={formData.file_size}
                    onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <FileUploadInput
                label="File Dokumen (Upload dari Perangkat / Drag & Drop / Link URL)"
                fileUrl={formData.file_url}
                fileSize={formData.file_size}
                fileType={formData.file_type}
                onFileSelect={({ fileUrl, fileSize, fileType, fileName }) => {
                  setFormData((prev) => ({
                    ...prev,
                    file_url: fileUrl,
                    file_size: fileSize || prev.file_size,
                    file_type: fileType || prev.file_type,
                    title: prev.title.trim() === '' && fileName ? fileName : prev.title,
                  }));
                }}
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
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
