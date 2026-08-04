'use client';

import React, { useState } from 'react';
import { Lock, Mail, Key, X, AlertCircle, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { DataStore } from '@/lib/data-store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SchoolSettings } from '@/lib/types';
import { IslamicStarOrnament } from '../IslamicPattern';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  settings?: SchoolSettings;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  settings,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // 1. If Supabase is configured, attempt Supabase Auth first
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (!error) {
          DataStore.setAdminLoggedIn(true);
          onLoginSuccess();
          setIsLoading(false);
          return;
        }
      }

      // 2. Default fallback login verification
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === 'misyuriyah26@gmail.com' && password === 'syuriyah26') ||
        (cleanEmail === 'admin@misyuriyah.sch.id' && password === 'admin123')
      ) {
        DataStore.setAdminLoggedIn(true);
        onLoginSuccess();
      } else {
        setErrorMessage('Email atau Password operator tidak valid. Silakan periksa kembali.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal login operator.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-700/30 dark:border-slate-800 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 relative flex justify-between items-center border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800/80 text-amber-300 border border-amber-400/50 flex items-center justify-center font-bold shadow-inner overflow-hidden shrink-0">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo Sekolah" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span>Portal Operator</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-emerald-200/90 font-medium">
                MI Syuriyah Pebatan Wanasari Brebes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-emerald-800/60 text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors focus:outline-none"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email / Username Operator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="Masukkan email operator..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password Operator
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all border border-emerald-700 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Lock className="w-4 h-4 text-amber-300" />
              )}
              <span>{isLoading ? 'Memverifikasi Akses...' : 'Masuk Ke Panel Operator'}</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-500" />
              <span>Sistem Manajemen Informasi Madrasah (SIMM)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
