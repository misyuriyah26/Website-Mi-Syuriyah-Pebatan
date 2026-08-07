/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  UserCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Newspaper,
  PhoneCall,
  Home,
  ChevronRight,
  Lock,
  Sun,
  Moon,
  Trophy,
  FileDown,
} from 'lucide-react';
import { SchoolSettings } from '@/lib/types';
import { IslamicStarOrnament } from './IslamicPattern';
import { useTheme } from '@/lib/theme-context';

interface NavbarProps {
  settings: SchoolSettings;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenPpdb: () => void;
  onOpenAdminLogin: () => void;
  runningText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeSection,
  setActiveSection,
  onOpenPpdb,
  onOpenAdminLogin,
  runningText,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = mounted && theme === 'dark';

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'profil', label: 'Profil', icon: GraduationCap },
    { id: 'program', label: 'Program', icon: BookOpen },
    { id: 'prestasi', label: 'Prestasi', icon: Trophy },
    { id: 'berita', label: 'Berita', icon: Newspaper },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'dokumen', label: 'Unduhan', icon: FileDown },
    { id: 'kontak', label: 'Kontak', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 shadow-md bg-white dark:bg-slate-900 transition-colors border-b dark:border-slate-800">
      {/* Running Announcement Ticker */}
      {runningText && (
        <div className="bg-emerald-950 text-amber-300 text-xs py-1.5 px-3 overflow-hidden border-b border-amber-500/30 flex items-center gap-2.5 z-20">
          <span className="bg-amber-500 text-emerald-950 font-extrabold px-2 py-0.5 rounded text-[10px] shrink-0 uppercase tracking-wider flex items-center gap-1 shadow-sm z-10">
            <Sparkles className="w-3 h-3 text-emerald-950" /> PENTING
          </span>
          <div className="relative overflow-hidden w-full flex items-center">
            <div className="animate-marquee font-medium text-amber-200 text-xs tracking-wide">
              {runningText} &nbsp;&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;&nbsp; {runningText}
            </div>
          </div>
        </div>
      )}

      {/* Top Header Contact Bar */}
      <div className="bg-emerald-900 dark:bg-slate-950 text-emerald-100 dark:text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-800 dark:border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-emerald-100/90 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {settings.address}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-100/90 dark:text-slate-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {settings.phone} / {settings.whatsapp}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-800 dark:bg-slate-800 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-amber-500/30">
              Akreditasi {settings.akreditasi} | NPSN: {settings.npsn}
            </span>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-lg bg-emerald-800 dark:bg-slate-800 text-amber-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-semibold px-2"
              title="Ganti Mode Gelap/Terang"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isDark ? 'Terang' : 'Gelap'}</span>
            </button>

            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors text-xs font-medium pl-2 border-l border-emerald-700 dark:border-slate-800"
            >
              <Lock className="w-3 h-3 text-amber-400" /> Operator
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Emblem / Logo */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-950 p-0.5 shadow-md border-2 border-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
            {settings.logo_url && settings.logo_url.trim() !== '' ? (
              <img src={settings.logo_url} alt="Logo Sekolah" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-emerald-900 border border-amber-300/40 flex flex-col items-center justify-center text-amber-400">
                <IslamicStarOrnament className="w-5 h-5 text-amber-400" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-emerald-950 dark:text-white leading-tight">
              {settings.school_name}
            </h1>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold tracking-wide">
              BREBES • AKREDITASI {settings.akreditasi}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-800 dark:bg-emerald-700 text-amber-300 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-amber-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-emerald-700 dark:text-emerald-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden xl:flex items-center gap-2">
          <button
            onClick={onOpenPpdb}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-extrabold text-xs shadow-md transition-all border border-amber-300"
          >
            <UserCheck className="w-4 h-4" />
            <span>PPDB Online</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={onOpenPpdb}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-emerald-950 font-bold text-xs shadow-sm"
          >
            PPDB
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-emerald-950 dark:bg-slate-950 text-white border-t border-emerald-800 dark:border-slate-800 px-4 py-4 space-y-2 shadow-2xl animate-fadeIn">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2 pb-1 border-b border-emerald-800 dark:border-slate-800 flex justify-between items-center">
            <span>Menu Utama</span>
            <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-white">{settings.school_name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-emerald-950 font-bold shadow'
                      : 'text-emerald-100 hover:bg-emerald-900 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-800 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenPpdb();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-amber-500 text-emerald-950 font-bold text-xs text-center flex items-center justify-center gap-2 shadow"
            >
              <UserCheck className="w-4 h-4" /> Daftar PPDB Online
            </button>

            <button
              onClick={() => {
                onOpenAdminLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg bg-emerald-900 dark:bg-slate-900 text-emerald-200 text-xs text-center border border-emerald-700 dark:border-slate-800 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Login Admin Operator
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
