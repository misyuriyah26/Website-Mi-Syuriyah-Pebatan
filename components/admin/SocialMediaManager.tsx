'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Save,
  CheckCircle2,
  ExternalLink,
  Copy,
  Globe,
  Check,
  QrCode,
  Sparkles,
  Smartphone,
  Video,
  Send,
  Radio,
  Eye,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  EyeOff,
} from 'lucide-react';
import { SchoolSettings } from '@/lib/types';
import { DataStore } from '@/lib/data-store';

interface SocialMediaManagerProps {
  settings: SchoolSettings;
  onSaveSettings: (newSettings: SchoolSettings) => void;
}

export const SocialMediaManager: React.FC<SocialMediaManagerProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SchoolSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'LINKS' | 'PREVIEW' | 'SHARE'>('LINKS');

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    DataStore.saveSettings(formData);
    onSaveSettings(formData);
    DataStore.addActivityLog(
      'Update Sosial Media',
      'Sosmed',
      'Memperbarui tautan & pengaturan visibilitas media sosial madrasah.'
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleCopy = (key: string, url: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Helper to toggle visibility
  const toggleVisibility = (key: keyof SchoolSettings) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key] === false ? true : false,
    }));
  };

  // Enable / Disable all toggles
  const setAllVisibility = (visible: boolean) => {
    setFormData((prev) => ({
      ...prev,
      show_facebook: visible,
      show_instagram: visible,
      show_youtube: visible,
      show_tiktok: visible,
      show_whatsapp_channel: visible,
      show_telegram: visible,
      show_twitter: visible,
      show_threads: visible,
    }));
  };

  // Count active displayed platforms
  const activePlatforms = [
    { url: formData.facebook_url, show: formData.show_facebook },
    { url: formData.instagram_url, show: formData.show_instagram },
    { url: formData.youtube_url, show: formData.show_youtube },
    { url: formData.tiktok_url, show: formData.tiktok_url ? formData.show_tiktok : false },
    { url: formData.whatsapp_channel_url, show: formData.show_whatsapp_channel },
    { url: formData.twitter_url, show: formData.show_twitter },
    { url: formData.telegram_url, show: formData.show_telegram },
    { url: formData.threads_url, show: formData.show_threads },
  ].filter((p) => p.url && p.url.trim() !== '' && p.show !== false).length;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-xl">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Panel Admin & Pengaturan Pengaturan Sosial Media
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  {activePlatforms} Platform Ditampilkan
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur tautan akun dan pilih sosial media apa saja yang ingin ditampilkan di bagian footer dan kontak website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('LINKS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'LINKS'
                  ? 'bg-emerald-800 text-amber-300 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Kelola & Visibilitas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PREVIEW')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'PREVIEW'
                  ? 'bg-emerald-800 text-amber-300 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Pratinjau Web
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SHARE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'SHARE'
                  ? 'bg-emerald-800 text-amber-300 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              Quick Link
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Berhasil menyimpan pengaturan media sosial! Tampilan publik telah disesuaikan.</span>
          </div>
        )}
      </div>

      {activeTab === 'LINKS' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Social Platforms Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  Pilih Sosial Media Yang Ingin Ditampilkan
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Aktifkan toggle (ON) pada sosial media yang ingin dipublikasikan di halaman depan web madrasah.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setAllVisibility(true)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-300"
                >
                  Tampilkan Semua
                </button>
                <button
                  type="button"
                  onClick={() => setAllVisibility(false)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300"
                >
                  Sembunyikan Semua
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_facebook !== false
                  ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      f
                    </span>
                    Facebook Page
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_facebook !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_facebook')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                      title="Sembunyikan/Tampilkan"
                    >
                      {formData.show_facebook !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.facebook_url || ''}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/misyuriyahpebatan"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.facebook_url && (
                    <>
                      <a
                        href={formData.facebook_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('facebook', formData.facebook_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'facebook' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Instagram */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_instagram !== false
                  ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      IG
                    </span>
                    Instagram Official
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_instagram !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_instagram')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_instagram !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.instagram_url || ''}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/misyuriyah_pebatan"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.instagram_url && (
                    <>
                      <a
                        href={formData.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('instagram', formData.instagram_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'instagram' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* YouTube */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_youtube !== false
                  ? 'border-red-200 dark:border-red-900/50 bg-red-50/20 dark:bg-red-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                      <Video className="w-4 h-4" />
                    </span>
                    YouTube Channel
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_youtube !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_youtube')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_youtube !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.youtube_url || ''}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    placeholder="https://youtube.com/@misyuriyahpebatanofficial"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.youtube_url && (
                    <>
                      <a
                        href={formData.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('youtube', formData.youtube_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'youtube' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* TikTok */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_tiktok !== false
                  ? 'border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      TT
                    </span>
                    TikTok Official
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_tiktok !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_tiktok')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_tiktok !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.tiktok_url || ''}
                    onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
                    placeholder="https://tiktok.com/@misyuriyah_pebatan"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.tiktok_url && (
                    <>
                      <a
                        href={formData.tiktok_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('tiktok', formData.tiktok_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'tiktok' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* WhatsApp Channel */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_whatsapp_channel !== false
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      <Radio className="w-4 h-4" />
                    </span>
                    WhatsApp Channel (Saluran WA)
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_whatsapp_channel !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_whatsapp_channel')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_whatsapp_channel !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.whatsapp_channel_url || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp_channel_url: e.target.value })}
                    placeholder="https://whatsapp.com/channel/..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.whatsapp_channel_url && (
                    <>
                      <a
                        href={formData.whatsapp_channel_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('wa_channel', formData.whatsapp_channel_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'wa_channel' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Telegram */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_telegram !== false
                  ? 'border-sky-200 dark:border-sky-900/50 bg-sky-50/20 dark:bg-sky-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                      <Send className="w-4 h-4" />
                    </span>
                    Telegram Channel
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_telegram !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_telegram')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_telegram !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.telegram_url || ''}
                    onChange={(e) => setFormData({ ...formData, telegram_url: e.target.value })}
                    placeholder="https://t.me/misyuriyahpebatan"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.telegram_url && (
                    <>
                      <a
                        href={formData.telegram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('telegram', formData.telegram_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'telegram' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Twitter / X */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_twitter !== false
                  ? 'border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs">
                      X
                    </span>
                    Twitter / X
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_twitter !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_twitter')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_twitter !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.twitter_url || ''}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://x.com/misyuriyah"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.twitter_url && (
                    <>
                      <a
                        href={formData.twitter_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('twitter', formData.twitter_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'twitter' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Threads */}
              <div className={`p-4 rounded-xl border transition-all ${
                formData.show_threads !== false
                  ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-800/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold text-xs">
                      @
                    </span>
                    Threads
                  </label>

                  <div className="flex items-center gap-2">
                    {formData.show_threads !== false ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Tampil
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Sembunyi
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleVisibility('show_threads')}
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    >
                      {formData.show_threads !== false ? (
                        <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.threads_url || ''}
                    onChange={(e) => setFormData({ ...formData, threads_url: e.target.value })}
                    placeholder="https://threads.net/@misyuriyah_pebatan"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                  />
                  {formData.threads_url && (
                    <>
                      <a
                        href={formData.threads_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('threads', formData.threads_url || '')}
                        className="px-2 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs"
                      >
                        {copiedKey === 'threads' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Heading Banner Settings Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Pengaturan Judul & Pesan Tampilan Media Sosial
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Himbauan Media Sosial (Footer)
                </label>
                <input
                  type="text"
                  value={formData.social_media_title || ''}
                  onChange={(e) => setFormData({ ...formData, social_media_title: e.target.value })}
                  placeholder="IKUTI MEDIA SOSIAL RESMI MADRASAH:"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Hotline Chat WhatsApp Utama
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="6281234567890"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 font-semibold"
                  />
                  <a
                    href={`https://wa.me/${(formData.whatsapp || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Tes Chat
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi / Pesan Ajakkan Mengikuti Medsos
                </label>
                <textarea
                  rows={2}
                  value={formData.social_media_description || ''}
                  onChange={(e) => setFormData({ ...formData, social_media_description: e.target.value })}
                  placeholder="Ikuti akun media sosial resmi madrasah untuk mendapatkan liputan kegiatan, kabar prestasi..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Action Save Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-amber-400/40"
            >
              <Save className="w-4 h-4" />
              SIMPAN PENGATURAN MEDIA SOSIAL
            </button>
          </div>
        </form>
      )}

      {activeTab === 'PREVIEW' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Pratinjau Tampilan Media Sosial Publik
              </h3>
              <p className="text-xs text-slate-500">
                Memunculkan {activePlatforms} dari 8 media sosial yang diaktifkan (ON).
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold">
              Visual Real-time
            </span>
          </div>

          {/* Simulated Footer Block */}
          <div className="p-6 rounded-2xl bg-emerald-950 text-white space-y-6 border-2 border-amber-400 shadow-xl">
            <div className="text-center space-y-2">
              <h4 className="text-xs sm:text-sm font-black text-amber-400 tracking-wider uppercase">
                {formData.social_media_title || 'IKUTI MEDIA SOSIAL RESMI:'}
              </h4>
              <p className="text-xs text-emerald-100 max-w-lg mx-auto">
                {formData.social_media_description || 'Dapatkan berita dan informasi acara terkini.'}
              </p>
            </div>

            {/* Social Icons Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {formData.facebook_url && formData.show_facebook !== false && (
                <a
                  href={formData.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold transition-all shadow hover:scale-110"
                  title="Facebook"
                >
                  <span className="text-base font-bold">f</span>
                </a>
              )}

              {formData.instagram_url && formData.show_instagram !== false && (
                <a
                  href={formData.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold transition-all shadow hover:scale-110"
                  title="Instagram"
                >
                  <span className="text-xs font-bold">IG</span>
                </a>
              )}

              {formData.youtube_url && formData.show_youtube !== false && (
                <a
                  href={formData.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center transition-all shadow hover:scale-110"
                  title="YouTube"
                >
                  <Video className="w-5 h-5" />
                </a>
              )}

              {formData.tiktok_url && formData.show_tiktok !== false && (
                <a
                  href={formData.tiktok_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold text-xs transition-all shadow hover:scale-110"
                  title="TikTok"
                >
                  TT
                </a>
              )}

              {formData.whatsapp_channel_url && formData.show_whatsapp_channel !== false && (
                <a
                  href={formData.whatsapp_channel_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center transition-all shadow hover:scale-110"
                  title="WhatsApp Channel"
                >
                  <Radio className="w-5 h-5" />
                </a>
              )}

              {formData.telegram_url && formData.show_telegram !== false && (
                <a
                  href={formData.telegram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center transition-all shadow hover:scale-110"
                  title="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>
              )}

              {formData.twitter_url && formData.show_twitter !== false && (
                <a
                  href={formData.twitter_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold text-sm transition-all shadow hover:scale-110"
                  title="X"
                >
                  X
                </a>
              )}

              {formData.threads_url && formData.show_threads !== false && (
                <a
                  href={formData.threads_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold text-sm transition-all shadow hover:scale-110"
                  title="Threads"
                >
                  @
                </a>
              )}

              {activePlatforms === 0 && (
                <p className="text-xs text-amber-300 italic py-2">
                  Tidak ada sosial media yang diaktifkan untuk ditampilkan.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'SHARE' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-600" />
              Pusat Tautan Cepat & Kode QR Medsos Sekolah
            </h3>
            <p className="text-xs text-slate-500">
              Salin tautan langsung atau bagikan ke wali murid, guru, dan pengumuman sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Saluran Informasi WhatsApp Channel
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tautan resmi untuk wali murid bergabung ke saluran siaran pengumuman penting madrasah.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={formData.whatsapp_channel_url || 'Belum diatur'}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-800 dark:text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => handleCopy('wa_share', formData.whatsapp_channel_url || '')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-amber-300 font-bold text-xs hover:bg-emerald-800 shrink-0"
                >
                  {copiedKey === 'wa_share' ? 'Tersalin!' : 'Salin Tautan'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <Globe className="w-4 h-4 text-amber-600" />
                Instagram Profile Link
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Kirimkan link Instagram ke orang tua murid untuk mengikut foto kegiatan harian sekolah.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={formData.instagram_url || 'Belum diatur'}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-800 dark:text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => handleCopy('ig_share', formData.instagram_url || '')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shrink-0"
                >
                  {copiedKey === 'ig_share' ? 'Tersalin!' : 'Salin Tautan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
