/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Lock,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { SchoolSettings } from '@/lib/types';
import { IslamicStarOrnament } from './IslamicPattern';

interface FooterProps {
  settings: SchoolSettings;
  setActiveSection: (section: string) => void;
  onOpenAdminLogin: () => void;
  onOpenPpdb: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  setActiveSection,
  onOpenAdminLogin,
  onOpenPpdb,
}) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-white pt-16 pb-8 border-t-4 border-amber-500 relative overflow-hidden">
      {/* Background Islamic Pattern Accent */}
      <div className="absolute inset-0 bg-emerald-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/80">
          {/* Col 1: School Profile & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-amber-400 p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
                {settings.logo_url && settings.logo_url.trim() !== '' ? (
                  <img src={settings.logo_url} alt="Logo Sekolah" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <IslamicStarOrnament className="w-6 h-6 text-amber-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">{settings.school_name}</h3>
                <p className="text-xs text-amber-400 font-semibold">AKREDITASI {settings.akreditasi}</p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {settings.school_tagline}. Lembaga Pendidikan Dasar Islam unggulan yang berkomitmen mencetak generasi santri cerdas, hafal Al-Qur&apos;an, dan berakhlak mulia di Kabupaten Brebes.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenPpdb}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 text-emerald-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Info PPDB 2026/2027</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <IslamicStarOrnament className="w-3.5 h-3.5" />
              <span>Navigasi Madrasah</span>
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button
                  onClick={() => handleNavClick('beranda')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('profil')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Profil & Sejarah
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('profil')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Data Guru & Staff
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('program')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Program Tahfidz & Kurikulum
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('berita')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Berita & Pengumuman
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('galeri')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Galeri Foto Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('kontak')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Peta & Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <IslamicStarOrnament className="w-3.5 h-3.5" />
              <span>Sekretariat Madrasah</span>
            </h4>
            <ul className="space-y-3 text-xs text-emerald-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.phone} / WA: {settings.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="pt-4">
              <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">Ikuti Media Sosial:</p>
              <div className="flex items-center gap-2">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 4: Islamic Mutiara Kata / Quote & Location map snippet */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <IslamicStarOrnament className="w-3.5 h-3.5" />
              <span>Mutiara Al-Qur&apos;an</span>
            </h4>
            <div className="bg-emerald-900/70 p-4 rounded-xl border border-amber-500/30 text-xs italic text-emerald-100 leading-relaxed relative">
              <p className="mb-2 font-serif text-sm text-amber-300">
                &ldquo;طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ&rdquo;
              </p>
              <p>&ldquo;Menuntut ilmu itu wajib atas setiap muslim.&rdquo;</p>
              <p className="text-[10px] text-amber-400 font-sans font-semibold mt-1 text-right">— HR. Ibnu Majah</p>
            </div>

            <div className="text-[11px] text-emerald-300 bg-emerald-900/50 p-2.5 rounded-lg border border-emerald-800 flex items-center justify-between">
              <span>NPSN: <strong>{settings.npsn}</strong></span>
              <span>Madrasah Ibtidaiyah</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-400/80">
          <p>© {currentYear} {settings.school_name} - Pebatan, Brebes. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminLogin}
              className="text-amber-400 hover:underline flex items-center gap-1 font-medium text-xs"
            >
              <Lock className="w-3 h-3" /> Panel Operator Sekolah
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
