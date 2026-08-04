'use client';

import React, { useState } from 'react';
import { Lock, Mail, Key, X, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { DataStore } from '@/lib/data-store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { IslamicStarOrnament } from '../IslamicPattern';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('misyuriyah26@gmail.com');
  const [password, setPassword] = useState('syuriyah26');
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
          email,
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
      if (
        (email === 'misyuriyah26@gmail.com' && password === 'syuriyah26') ||
        (email === 'admin@misyuriyah.sch.id' && password === 'admin123')
      ) {
        DataStore.setAdminLoggedIn(true);
        onLoginSuccess();
      } else {
        setErrorMessage('Email atau Password operator tidak valid.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal login operator.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 relative flex justify-between items-center border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 border border-amber-400 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Login Panel Operator</h3>
              <p className="text-[11px] text-emerald-200">MI Syuriyah Pebatan Brebes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-800 text-emerald-200 hover:text-white focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Operator</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password Operator</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all border border-emerald-700 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk Ke Panel Operator'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
