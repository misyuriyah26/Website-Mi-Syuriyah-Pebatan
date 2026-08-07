'use client';

import React from 'react';
import { PpdbRegistration } from '@/lib/types';
import { UserCheck, Phone, Trash2, CheckCircle2, Clock, Printer } from 'lucide-react';

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

  const handlePrintRekap = () => {
    const existing = document.getElementById('ppdb-printable-area');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'ppdb-printable-area';
    container.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #0f172a;">
        <div style="text-align: center; border-bottom: 2px solid #065f46; padding-bottom: 10px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 14pt; color: #065f46; font-weight: bold;">MIS MISYURIYAH PEBATAN BREBES</h2>
          <h3 style="margin: 4px 0 0 0; font-size: 12pt; text-transform: uppercase;">REKAPITULASI PENDAFTARAN PPDB ONLINE 2026/2027</h3>
          <p style="margin: 4px 0 0 0; font-size: 9pt; color: #64748b;">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} WIB</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
          <thead>
            <tr style="background-color: #065f46; color: #ffffff;">
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">No.</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">No. Reg</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Nama Calon Siswa</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">L/P</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Orang Tua / Wali</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">No. WA</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Asal Sekolah</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${ppdbList
              .map(
                (item, idx) => `
              <tr style="background-color: ${idx % 2 === 0 ? '#f8fafc' : '#ffffff'};">
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">${idx + 1}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-family: monospace;">${item.reg_number}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: bold;">${item.student_name}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">${item.gender}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${item.parent_name}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-family: monospace;">${item.phone_number}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${item.previous_school || '-'}</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${item.status}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
          <div style="text-align: center; width: 220px; font-size: 9pt;">
            <p style="margin: 0;">Brebes, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p style="margin: 2px 0 0 0; font-weight: bold;">Ketua Panitia PPDB,</p>
            <div style="height: 50px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">( Tim Panitia PPDB MIS Misyuriyah )</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Kelola Pendaftaran PPDB Online</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Daftar calon siswa baru yang mendaftar secara online ({ppdbList.length} Pendaftar)
          </p>
        </div>
        {ppdbList.length > 0 && (
          <button
            onClick={handlePrintRekap}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors border border-emerald-700"
          >
            <Printer className="w-4 h-4 text-amber-300" /> Cetak Rekap PPDB
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-emerald-950 text-amber-300 border-b border-emerald-800">
              <tr>
                <th className="p-3.5 font-bold">Nama Calon Siswa</th>
                <th className="p-3.5 font-bold">L/P</th>
                <th className="p-3.5 font-bold">Nama Orang Tua</th>
                <th className="p-3.5 font-bold">No. HP/WA</th>
                <th className="p-3.5 font-bold">Asal TK/RA</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ppdbList.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/40 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="p-3.5 font-extrabold text-slate-900 dark:text-slate-100">{item.student_name}</td>
                  <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{item.gender}</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">{item.parent_name}</td>
                  <td className="p-3.5 font-mono text-xs font-bold text-slate-900 dark:text-slate-100">{item.phone_number}</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">{item.previous_school || '-'}</td>
                  <td className="p-3.5">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as PpdbRegistration['status'])
                      }
                      className={`px-3 py-1.5 rounded-lg border text-xs font-extrabold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm ${
                        item.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-400 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700'
                          : item.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-950 border-blue-400 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700'
                          : item.status === 'Ditolak'
                          ? 'bg-red-100 text-red-950 border-red-400 dark:bg-red-950/80 dark:text-red-200 dark:border-red-700'
                          : 'bg-amber-100 text-amber-950 border-amber-400 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                        Pending
                      </option>
                      <option value="Diproses" className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                        Diproses
                      </option>
                      <option value="Diterima" className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                        Diterima
                      </option>
                      <option value="Perlu Perbaikan" className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                        Perlu Perbaikan
                      </option>
                      <option value="Ditolak" className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                        Ditolak
                      </option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <a
                      href={`https://wa.me/62${item.phone_number.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" /> WA
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900 text-red-700 dark:text-red-300 font-bold text-xs border border-red-200 dark:border-red-900 transition-all"
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
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Belum ada pendaftar PPDB online.</p>
        </div>
      )}
    </div>
  );
};
