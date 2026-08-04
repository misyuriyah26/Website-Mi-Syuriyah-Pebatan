'use client';

import React from 'react';
import { PpdbRegistration } from '@/lib/types';
import { UserCheck, Phone, Trash2, CheckCircle2, Clock } from 'lucide-react';

interface PpdbManagerProps {
  ppdbList: PpdbRegistration[];
  onSavePpdbList: (newList: PpdbRegistration[]) => void;
}

export const PpdbManager: React.FC<PpdbManagerProps> = ({ ppdbList, onSavePpdbList }) => {
  const handleStatusChange = (id: string, status: PpdbRegistration['status']) => {
    const updated = ppdbList.map((item) => (item.id === id ? { ...item, status } : item));
    onSavePpdbList(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pendaftaran calon siswa ini?')) {
      const updated = ppdbList.filter((item) => item.id !== id);
      onSavePpdbList(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kelola Pendaftaran PPDB Online</h2>
          <p className="text-xs text-slate-500">
            Daftar calon siswa baru yang mendaftar secara online
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-emerald-900 text-amber-300 border-b border-emerald-800">
              <tr>
                <th className="p-3 font-bold">Nama Calon Siswa</th>
                <th className="p-3 font-bold">L/P</th>
                <th className="p-3 font-bold">Nama Orang Tua</th>
                <th className="p-3 font-bold">No. HP/WA</th>
                <th className="p-3 font-bold">Asal TK/RA</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ppdbList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-emerald-950">{item.student_name}</td>
                  <td className="p-3 font-bold">{item.gender}</td>
                  <td className="p-3 text-slate-700">{item.parent_name}</td>
                  <td className="p-3 font-mono text-xs">{item.phone_number}</td>
                  <td className="p-3 text-slate-600">{item.previous_school}</td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as PpdbRegistration['status'])
                      }
                      className="px-2 py-1 rounded border text-xs font-bold bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Proses">Proses</option>
                      <option value="Diterima">Diterima</option>
                    </select>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <a
                      href={`https://wa.me/62${item.phone_number.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 text-xs inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> WA
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2.5 py-1 rounded bg-red-50 text-red-800 font-bold hover:bg-red-100 text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {ppdbList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">Belum ada pendaftar PPDB online.</p>
        </div>
      )}
    </div>
  );
};
