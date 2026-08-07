/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  UserCheck,
  Database,
  LogOut,
  Home,
  Menu,
  X,
  Palette,
  ShieldCheck,
  Trophy,
  Quote,
  FileDown,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import {
  NewsItem,
  StaffItem,
  GalleryItem,
  ContactMessage,
  StaticPagesContent,
  PpdbRegistration,
  SchoolSettings,
  Achievement,
  Testimonial,
  DownloadDocument,
} from '@/lib/types';
import { DataStore } from '@/lib/data-store';
import { DashboardTab } from './DashboardTab';
import { BeritaManager } from './BeritaManager';
import { StaffManager } from './StaffManager';
import { GaleriManager } from './GaleriManager';
import { PagesManager } from './PagesManager';
import { MessagesManager } from './MessagesManager';
import { PpdbManager } from './PpdbManager';
import { SupabaseExporter } from './SupabaseExporter';
import { BrandingManager } from './BrandingManager';
import { UsersAndRolesManager } from './UsersAndRolesManager';
import { AchievementsManager } from './AchievementsManager';
import { TestimonialsManager } from './TestimonialsManager';
import { DocumentsManager } from './DocumentsManager';
import { SocialMediaManager } from './SocialMediaManager';
import { IslamicStarOrnament } from '../IslamicPattern';

interface AdminLayoutProps {
  newsList: NewsItem[];
  staffList: StaffItem[];
  galleryList: GalleryItem[];
  messages: ContactMessage[];
  pagesContent: StaticPagesContent;
  ppdbList: PpdbRegistration[];
  settings: SchoolSettings;
  achievements?: Achievement[];
  testimonials?: Testimonial[];
  documents?: DownloadDocument[];
  onSaveNews: (newList: NewsItem[]) => void;
  onSaveStaff: (newList: StaffItem[]) => void;
  onSaveGallery: (newList: GalleryItem[]) => void;
  onSaveMessages: (newMessages: ContactMessage[]) => void;
  onSavePagesContent: (newPages: StaticPagesContent) => void;
  onSavePpdbList: (newList: PpdbRegistration[]) => void;
  onSaveSettings: (newSettings: SchoolSettings) => void;
  onSaveAchievements?: (newList: Achievement[]) => void;
  onSaveTestimonials?: (newList: Testimonial[]) => void;
  onSaveDocuments?: (newList: DownloadDocument[]) => void;
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  newsList,
  staffList,
  galleryList,
  messages,
  pagesContent,
  ppdbList,
  settings,
  achievements,
  testimonials,
  documents,
  onSaveNews,
  onSaveStaff,
  onSaveGallery,
  onSaveMessages,
  onSavePagesContent,
  onSavePpdbList,
  onSaveSettings,
  onSaveAchievements,
  onSaveTestimonials,
  onSaveDocuments,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<string>('DASHBOARD');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; subtext?: string } | null>(null);

  const showToast = (message: string, subtext?: string) => {
    setToast({ message, subtext });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const handleSaveNews = (newList: NewsItem[]) => {
    onSaveNews(newList);
    showToast('Berhasil Menyimpan Berita!', 'Data berita madrasah diperbarui di website.');
  };

  const handleSaveStaff = (newList: StaffItem[]) => {
    onSaveStaff(newList);
    showToast('Berhasil Menyimpan Data Guru & Staff!', 'Daftar pendidik & tenaga kependidikan diperbarui.');
  };

  const handleSaveGallery = (newList: GalleryItem[]) => {
    onSaveGallery(newList);
    showToast('Berhasil Menyimpan Galeri Foto!', 'Foto & album kegiatan baru telah dipublikasikan.');
  };

  const handleSaveMessages = (newMessages: ContactMessage[]) => {
    onSaveMessages(newMessages);
    showToast('Berhasil Memperbarui Pesan Masuk!', 'Status balasan & pembacaan pesan disimpan.');
  };

  const handleSavePagesContent = (newPages: StaticPagesContent) => {
    onSavePagesContent(newPages);
    showToast('Berhasil Menyimpan Halaman Statis!', 'Profil, Visi Misi, & Kurikulum telah diperbarui.');
  };

  const handleSavePpdbList = (newList: PpdbRegistration[]) => {
    onSavePpdbList(newList);
    showToast('Berhasil Memperbarui Data PPDB!', 'Status verifikasi pendaftar calon siswa diperbarui.');
  };

  const handleSaveSettings = (newSettings: SchoolSettings) => {
    onSaveSettings(newSettings);
    showToast('Berhasil Menyimpan Pengaturan & Medsos!', 'Perubahan logo, kontak, & media sosial telah aktif.');
  };

  const handleSaveAchievements = (newList: Achievement[]) => {
    if (onSaveAchievements) onSaveAchievements(newList);
    showToast('Berhasil Menyimpan Prestasi Siswa!', 'Daftar kejuaraan & penghargaan siswa diperbarui.');
  };

  const handleSaveTestimonials = (newList: Testimonial[]) => {
    if (onSaveTestimonials) onSaveTestimonials(newList);
    showToast('Berhasil Menyimpan Testimoni Wali!', 'Ulasan & testimoni orang tua murid dipublikasikan.');
  };

  const handleSaveDocuments = (newList: DownloadDocument[]) => {
    if (onSaveDocuments) onSaveDocuments(newList);
    showToast('Berhasil Menyimpan Dokumen PDF!', 'Pusat unduhan berkas & brosur telah diperbarui.');
  };

  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'PPDB', label: 'PPDB Online Verifikasi', icon: UserCheck, count: ppdbList.length },
    { id: 'BERITA', label: 'Kelola Berita', icon: Newspaper, count: newsList.length },
    { id: 'STAFF', label: 'Guru & Staff', icon: Users, count: staffList.length },
    { id: 'GALERI', label: 'Galeri Foto', icon: ImageIcon, count: galleryList.length },
    { id: 'PRESTASI', label: 'Prestasi Siswa', icon: Trophy },
    { id: 'TESTIMONI', label: 'Testimoni Wali', icon: Quote },
    { id: 'DOCUMENTS', label: 'Pusat Unduhan PDF', icon: FileDown },
    { id: 'SOSMED', label: 'Media Sosial & Channel', icon: Share2 },
    { id: 'PAGES', label: 'Halaman Statis', icon: FileText },
    {
      id: 'MESSAGES',
      label: 'Pesan Masuk',
      icon: MessageSquare,
      count: messages.filter((m) => !m.is_read).length,
      badgeColor: 'bg-red-500',
    },
    { id: 'BRANDING', label: 'Branding & Logo', icon: Palette },
    { id: 'USERS_ROLES', label: 'Hak Akses Operator', icon: ShieldCheck },
    { id: 'DATABASE', label: 'Supabase & Backup', icon: Database },
  ];

  const handleLogout = () => {
    DataStore.setAdminLoggedIn(false);
    onExitAdmin();
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Admin Header Bar */}
      <header className="bg-emerald-950 dark:bg-slate-900 text-white border-b-2 border-amber-400 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-emerald-900 text-amber-300 md:hidden"
            aria-label="Toggle operator menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-900 border border-amber-400 flex items-center justify-center text-amber-400 font-bold shrink-0 overflow-hidden">
              {settings.logo_url && settings.logo_url.trim() !== '' ? (
                <img src={settings.logo_url} alt="Logo Operator" className="w-full h-full object-cover rounded-full" />
              ) : (
                <IslamicStarOrnament className="w-4 h-4" />
              )}
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight">
                PANEL OPERATOR - {settings.school_name.toUpperCase()}
              </h1>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                ADMINISTRASI SEKOLAH & SUPABASE BACKEND
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-900 text-emerald-100 hover:text-white border border-emerald-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Lihat Web Publik</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition-all flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Floating Global Success Toast Banner */}
      {toast && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 animate-bounce transition-all duration-300">
          <div className="bg-emerald-950 text-amber-300 border-2 border-amber-400 px-5 py-3.5 rounded-2xl shadow-2xl flex items-start gap-3.5 max-w-sm sm:max-w-md">
            <div className="p-2 bg-emerald-900/80 rounded-xl border border-amber-400/40 text-amber-300 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex-1 pr-2">
              <p className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>Notifikasi Sukses</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </p>
              <p className="text-xs font-extrabold text-white mt-0.5">{toast.message}</p>
              {toast.subtext && (
                <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">{toast.subtext}</p>
              )}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-emerald-300 hover:text-white text-xs font-bold p-1 rounded-lg hover:bg-emerald-900"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-2 sm:px-6 py-6 gap-6">
        {/* Sidebar Menu */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-2">
              Menu Navigasi Operator
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-amber-300 shadow border border-amber-400/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700 dark:text-emerald-400'}`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.badgeColor
                          ? `${item.badgeColor} text-white`
                          : isActive
                          ? 'bg-emerald-950 text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center">
            Operator v2.5 • Multi-Role Access
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'DASHBOARD' && (
            <DashboardTab
              stats={{
                newsCount: newsList.length,
                staffCount: staffList.length,
                galleryCount: galleryList.length,
                messagesCount: messages.length,
                unreadMessages: unreadCount,
                ppdbCount: ppdbList.length,
              }}
              setActiveTab={setActiveTab}
              onExitAdmin={onExitAdmin}
            />
          )}

          {activeTab === 'PPDB' && (
            <PpdbManager ppdbList={ppdbList} onSavePpdbList={handleSavePpdbList} />
          )}

          {activeTab === 'BERITA' && (
            <BeritaManager newsList={newsList} onSaveNews={handleSaveNews} />
          )}

          {activeTab === 'STAFF' && (
            <StaffManager staffList={staffList} onSaveStaff={handleSaveStaff} />
          )}

          {activeTab === 'GALERI' && (
            <GaleriManager galleryList={galleryList} onSaveGallery={handleSaveGallery} />
          )}

          {activeTab === 'PRESTASI' && (
            <AchievementsManager achievements={achievements} onSaveAchievements={handleSaveAchievements} />
          )}

          {activeTab === 'TESTIMONI' && (
            <TestimonialsManager testimonials={testimonials} onSaveTestimonials={handleSaveTestimonials} />
          )}

          {activeTab === 'DOCUMENTS' && (
            <DocumentsManager documents={documents} onSaveDocuments={handleSaveDocuments} />
          )}

          {activeTab === 'SOSMED' && (
            <SocialMediaManager settings={settings} onSaveSettings={handleSaveSettings} />
          )}

          {activeTab === 'PAGES' && (
            <PagesManager
              pagesContent={pagesContent}
              onSavePagesContent={handleSavePagesContent}
            />
          )}

          {activeTab === 'MESSAGES' && (
            <MessagesManager messages={messages} onSaveMessages={handleSaveMessages} />
          )}

          {activeTab === 'BRANDING' && (
            <BrandingManager settings={settings} onSaveSettings={handleSaveSettings} />
          )}

          {activeTab === 'USERS_ROLES' && <UsersAndRolesManager />}

          {activeTab === 'DATABASE' && <SupabaseExporter />}
        </main>
      </div>
    </div>
  );
};
