'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock } from 'lucide-react';
import { SchoolSettings } from '@/lib/types';

interface FloatingWhatsAppProps {
  settings: SchoolSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('PPDB 2026/2027');

  const waNumber = settings.whatsapp || '6281234567890';

  const handleSendWA = (textMessage?: string) => {
    const textToSend = textMessage || customMsg || `Assalamu'alaikum wr. wb. Saya ingin bertanya seputar ${selectedTopic} di MI Syuriyah Pebatan.`;
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
  };

  const quickTopics = [
    { label: 'Informasi PPDB 2026', text: `Assalamu'alaikum, saya ingin bertanya syarat dan alur Pendaftaran Siswa Baru (PPDB) TA 2026/2027.` },
    { label: 'Rincian Biaya & Seragam', text: `Assalamu'alaikum, saya hendak menanyakan rincian biaya pendaftaran dan seragam sekolah.` },
    { label: 'Jadwal & Program Tahfidz', text: `Assalamu'alaikum, saya ingin konsultasi mengenai program unggulan Tahfidz Al-Qur'an Yanbu'a.` },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Quick Chat Modal */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-emerald-100 dark:border-emerald-800/50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-amber-300 border border-amber-300/30">
                  MI
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-800 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Humas MI Syuriyah Pebatan</h4>
                <p className="text-xs text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-300" /> Respon Cepat (07:00 - 16:00 WIB)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-600 text-emerald-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-950/60 max-h-80 overflow-y-auto">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/40 text-xs text-slate-700 dark:text-emerald-200 space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Layanan Konsultasi Resmi
              </p>
              <p>Assalamu&apos;alaikum wr. wb. Ada yang bisa kami bantu mengenai pendidikan putra-putri Bapak/Ibu?</p>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
              Pilih Topik Cepat:
            </p>

            <div className="space-y-1.5">
              {quickTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWA(topic.text)}
                  className="w-full text-left text-xs bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between group transition-all"
                >
                  <span>{topic.label}</span>
                  <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Tulis Pesan Kustom:
              </label>
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Tulis pertanyaan Anda di sini..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSendWA()}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Buka WhatsApp Sekarang</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border-2 border-emerald-400/30"
        title="Chat WhatsApp Sekolah"
        aria-label="Chat WhatsApp Sekolah"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat WA Sekolah
        </span>
      </button>
    </div>
  );
};
