'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Building,
} from 'lucide-react';
import { ContactMessage, SchoolSettings } from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { IslamicDivider, IslamicStarOrnament } from '../IslamicPattern';

interface KontakSectionProps {
  settings: SchoolSettings;
  onMessageSubmitted?: () => void;
}

export const KontakSection: React.FC<KontakSectionProps> = ({ settings, onMessageSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email_or_phone: '',
    subject: '',
    message: '',
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email_or_phone || !formData.message) {
      alert('Mohon lengkapi Nama, No. HP/Email, dan Pesan Anda.');
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email_or_phone: formData.email_or_phone,
      subject: formData.subject || 'Pertanyaan Umum',
      message: formData.message,
      created_at: new Date().toISOString(),
      is_read: false,
    };

    const currentMessages = DataStore.getMessages();
    DataStore.saveMessages([newMessage, ...currentMessages]);

    setSubmittedSuccess(true);
    setFormData({ name: '', email_or_phone: '', subject: '', message: '' });

    if (onMessageSubmitted) {
      onMessageSubmitted();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/40">
            <IslamicStarOrnament className="w-3.5 h-3.5 text-amber-400" />
            <span>LAYANAN INFORMASI SEKOLAH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hubungi MI Syuriyah Pebatan
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            Silakan kirimkan pertanyaan, kritik, saran, atau konsultasi pendaftaran PPDB kepada sekretariat madrasah kami.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Contact Info & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building className="w-5 h-5 text-amber-600" /> Informasi Kantor Madrasah
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">Alamat Lengkap:</div>
                  <div className="leading-relaxed mt-0.5">{settings.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">Telepon / WhatsApp:</div>
                  <div className="mt-0.5">{settings.phone} / {settings.whatsapp}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">Email Resmi:</div>
                  <div className="mt-0.5">{settings.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">Jam Pelayanan Kantor TU:</div>
                  <div className="mt-0.5">Senin - Sabtu: 07.00 - 13.30 WIB</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/62${settings.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all border border-emerald-600"
              >
                <MessageCircle className="w-5 h-5 text-amber-300" />
                <span>Chat WhatsApp Admin Madrasah</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Send className="w-5 h-5 text-amber-600" /> Kirim Pesan / Pertanyaan
            </h3>

            {submittedSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Alhamdulillah, Pesan Anda Berhasil Terkirim!</p>
                  <p className="mt-0.5 text-xs text-emerald-700">
                    Tim administrasi MI Syuriyah Pebatan akan segera merespons pertanyaan Anda.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Ahmad Wahyudi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. WhatsApp / Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0852-xxxx-xxxx"
                    value={formData.email_or_phone}
                    onChange={(e) => setFormData({ ...formData, email_or_phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subjek Pesan</label>
                <input
                  type="text"
                  placeholder="Contoh: Tanya Syarat Pendaftaran PPDB"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Isi Pesan Anda *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pertanyaan atau informasi yang Anda butuhkan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-700"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Kirimkan Pesan Ke Admin</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Google Maps Location */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" /> Peta Lokasi MI Syuriyah Pebatan Wanasari Brebes
        </h3>
        <p className="text-xs text-slate-600">
          Jl. Raya Pebatan No. 45, Desa Pebatan, Kec. Wanasari, Kab. Brebes, Jawa Tengah.
        </p>
        <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
          <iframe
            src={settings.maps_iframe_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer"
            title="Lokasi MI Syuriyah Pebatan"
          />
        </div>
      </section>
    </div>
  );
};
