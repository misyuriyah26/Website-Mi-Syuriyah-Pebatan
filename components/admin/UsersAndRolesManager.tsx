'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Trash2, Clock, CheckCircle2, Lock, UserX, FileText } from 'lucide-react';
import { AdminUser, ActivityLog, AdminRole } from '@/lib/types';
import { DataStore } from '@/lib/data-store';

export const UsersAndRolesManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'USERS' | 'LOGS'>('USERS');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => DataStore.getAdminUsers());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => DataStore.getActivityLogs());
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state for adding user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'operator_berita' as AdminRole,
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userObj: AdminUser = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      created_at: new Date().toISOString().split('T')[0],
    };

    const updated = [userObj, ...adminUsers];
    setAdminUsers(updated);
    DataStore.saveAdminUsers(updated);
    DataStore.addActivityLog('Tambah Operator', 'Manajemen Pengguna', `Menambahkan operator baru: ${userObj.email} (${userObj.role})`);
    
    setNewUser({ name: '', email: '', role: 'operator_berita' });
    setSuccessMsg(`Operator baru ${userObj.name} (${userObj.email}) berhasil ditambahkan!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Yakin ingin menghapus operator ini?')) {
      const updated = adminUsers.filter((u) => u.id !== id);
      setAdminUsers(updated);
      DataStore.saveAdminUsers(updated);
      DataStore.addActivityLog('Hapus Operator', 'Manajemen Pengguna', `Menghapus ID operator: ${id}`);
      setSuccessMsg('Operator berhasil dihapus!');
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      {/* Sub-tab Selector */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Manajemen Pengguna Admin & Role Akses</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Atur peran operator (Superadmin, Operator Berita, Operator PPDB) dan amati log aktivitas.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('USERS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'USERS'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Daftar Operator ({adminUsers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('LOGS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'LOGS'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Log Aktivitas ({activityLogs.length})
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeSubTab === 'USERS' ? (
        <div className="space-y-6">
          {/* Add Operator Form */}
          <form onSubmit={handleAddUser} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-emerald-600" /> Tambah Operator / Admin Baru
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Pengguna"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Email / Username *</label>
                <input
                  type="email"
                  required
                  placeholder="operator@misyuriyah..."
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Hak Akses Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminRole })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="superadmin">Superadmin (Akses Penuh)</option>
                  <option value="operator_berita">Operator Berita & Galeri</option>
                  <option value="operator_ppdb">Operator PPDB Online</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Simpan Operator
            </button>
          </form>

          {/* Table of Operators */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Nama</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Peran / Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Dibuat Pada</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {adminUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{user.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{user.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                        user.role === 'superadmin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : user.role === 'operator_ppdb'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{user.created_at}</td>
                    <td className="p-3 text-right">
                      {user.role !== 'superadmin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Hapus Operator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Riwayat Log Aktivitas Perubahan Data
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">[{log.module}]</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-400">oleh {log.user_email}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">{log.details}</p>
                </div>

                <div className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(log.timestamp).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
