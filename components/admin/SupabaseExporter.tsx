'use client';

import React, { useState } from 'react';
import { DataStore } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { Database, Copy, Check, Terminal, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export const SupabaseExporter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const sqlSchema = DataStore.generateSupabaseSqlSchema();

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    if (!isSupabaseConfigured() || !supabase) {
      setTestResult('Environment Variable NEXT_PUBLIC_SUPABASE_URL belum dikonfigurasi.');
      setIsTesting(false);
      return;
    }

    try {
      const { data, error } = await supabase.from('settings').select('*').limit(1);
      if (error) {
        setTestResult(`Gagal terhubung ke Supabase: ${error.message}`);
      } else {
        setTestResult('Alhamdulillah! Koneksi Supabase berhasil terhubung secara real-time!');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal tes koneksi';
      setTestResult(msg);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded font-bold text-[10px] uppercase">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>SUPABASE DATABASE SCHEMA EXPORTER</span>
            </div>
            <h2 className="text-xl font-bold text-emerald-950 mt-1">
              Skema SQL Database Supabase & Panduan Integrasi
            </h2>
          </div>

          <button
            onClick={handleCopySql}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-amber-300"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Berhasil Disalin!' : 'Salin Semua Kueri SQL'}</span>
          </button>
        </div>

        {/* Status Checker Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Status Supabase Environment Vars:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded ${
                isSupabaseConfigured()
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {isSupabaseConfigured() ? 'Terkonfigurasi' : 'Belum Dikonfigurasi'}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 text-xs"
            >
              {isTesting ? 'Menguji...' : 'Uji Koneksi Real-time Supabase'}
            </button>
            {testResult && (
              <span className="text-xs font-semibold text-emerald-800">{testResult}</span>
            )}
          </div>
        </div>
      </div>

      {/* SQL Script Display Code Box */}
      <div className="bg-slate-900 text-emerald-400 p-6 rounded-2xl shadow-xl border border-slate-800 space-y-3 font-mono text-xs overflow-hidden">
        <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-3 text-[11px]">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" /> supabase_schema.sql
          </span>
          <span>PostgreSQL / Supabase</span>
        </div>

        <pre className="overflow-x-auto max-h-96 leading-relaxed text-slate-200">
          {sqlSchema}
        </pre>
      </div>

      {/* Deployment Guide Steps */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-600" /> Panduan Langkah Menjalankan SQL di Supabase
        </h3>

        <ol className="space-y-3 text-xs sm:text-sm text-slate-700 list-decimal pl-5">
          <li>
            Buka dashboard Supabase Anda di{' '}
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 font-bold underline inline-flex items-center gap-1"
            >
              supabase.com/dashboard <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>Pilih project Supabase Anda atau buat project baru.</li>
          <li>Klik menu <strong>SQL Editor</strong> di panel sebelah kiri.</li>
          <li>Tempelkan (Paste) skema kueri SQL di atas yang sudah disalin.</li>
          <li>
            Klik tombol <strong>RUN</strong> di kanan bawah untuk mengeksekusi pembuatan tabel{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">settings</code>,{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">news</code>,{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">staff</code>,{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">gallery</code>,{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">messages</code>, dan{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">ppdb</code> beserta RLS Policies-nya.
          </li>
          <li>
            Tambahkan URL dan ANON KEY ke Environment Variables aplikasi:{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{' '}
            dan{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-900">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>.
          </li>
        </ol>
      </div>
    </div>
  );
};
