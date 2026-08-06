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
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kelola Pendaftaran PPDB Online</h2>
          <p className="text-xs text-slate-500">
            Daftar calon siswa baru yang mendaftar secara online ({ppdbList.length} Pendaftar)
          </p>
        </div>
        {ppdbList.length > 0 && (
          <button
            onClick={handlePrintRekap}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" /> Cetak Rekap PPDB
          </button>
        )}
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
