'use client';

import React, { useState } from 'react';
import { StaffItem } from '@/lib/types';
import { Plus, Edit, Trash2, User, Phone, BookOpen, X } from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface StaffManagerProps {
  staffList: StaffItem[];
  onSaveStaff: (newList: StaffItem[]) => void;
}

export const StaffManager: React.FC<StaffManagerProps> = ({ staffList, onSaveStaff }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StaffItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    nip_ntp: '',
    subject: '',
    education: '',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    phone: '',
    order_index: 1,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      title: 'Guru Pengajar',
      nip_ntp: '',
      subject: '',
      education: 'S1 Pendidikan',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      phone: '',
      order_index: staffList.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StaffItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      title: item.title,
      nip_ntp: item.nip_ntp || '',
      subject: item.subject || '',
      education: item.education || '',
      image_url: item.image_url,
      phone: item.phone || '',
      order_index: item.order_index,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data staff ini?')) {
      const updated = staffList.filter((s) => s.id !== id);
      onSaveStaff(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title) {
      alert('Mohon isi nama lengkap dan jabatan.');
      return;
    }

    if (editingItem) {
      const updated = staffList.map((s) =>
        s.id === editingItem.id
          ? {
              ...s,
              name: formData.name,
              title: formData.title,
              nip_ntp: formData.nip_ntp,
              subject: formData.subject,
              education: formData.education,
              image_url: formData.image_url,
              phone: formData.phone,
              order_index: formData.order_index,
            }
          : s
      );
      onSaveStaff(updated);
    } else {
      const newStaff: StaffItem = {
        id: `staff-${Date.now()}`,
        name: formData.name,
        title: formData.title,
        nip_ntp: formData.nip_ntp,
        subject: formData.subject,
        education: formData.education,
        image_url: formData.image_url,
        phone: formData.phone,
        order_index: formData.order_index,
      };
      onSaveStaff([...staffList, newStaff]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kelola Data Guru & Staff</h2>
          <p className="text-xs text-slate-500">
            Tambah, edit, atau perbarui profil tenaga pendidik madrasah
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-emerald-700"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Guru/Staff Baru</span>
        </button>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex gap-4 items-center">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-emerald-800/20">
                <img
                  src={staff.image_url}
                  alt={staff.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 overflow-hidden">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                  {staff.title}
                </span>
                <h3 className="text-sm font-bold text-emerald-950 truncate">{staff.name}</h3>
                {staff.nip_ntp && (
                  <p className="text-[11px] text-slate-500 font-mono">NIP: {staff.nip_ntp}</p>
                )}
                {staff.subject && (
                  <p className="text-xs text-emerald-800 font-medium truncate">
                    Mapel: {staff.subject}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] font-mono">Urutan: #{staff.order_index}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(staff)}
                  className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staff.id)}
                  className="px-2.5 py-1 rounded bg-red-50 text-red-800 hover:bg-red-100 font-bold"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 my-6 animate-fadeIn">
            <div className="bg-emerald-950 text-white p-5 flex justify-between items-center border-b-2 border-amber-400">
              <h3 className="font-bold text-lg">
                {editingItem ? 'Edit Data Guru' : 'Tambah Guru/Staff Baru'}
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
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ust. Ahmad Fauzi, S.Pd.I"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Posisi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Guru Kelas 5 / Kepala TU"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIP / NTP (Opsional)</label>
                  <input
                    type="text"
                    placeholder="19820512..."
                    value={formData.nip_ntp}
                    onChange={(e) => setFormData({ ...formData, nip_ntp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran Utama</label>
                  <input
                    type="text"
                    placeholder="Contoh: Fiqih & Tahfidz"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pendidikan Terakhir</label>
                  <input
                    type="text"
                    placeholder="Contoh: S1 PAI UIN"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Foto Profil Guru / Staff"
                value={formData.image_url}
                onChange={(val) => setFormData({ ...formData, image_url: val })}
                aspectRatio="square"
              />

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
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
