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
} from 'lucide-react';
import {
  NewsItem,
  StaffItem,
  GalleryItem,
  ContactMessage,
  StaticPagesContent,
  PpdbRegistration,
  SchoolSettings,
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
import { IslamicStarOrnament } from '../IslamicPattern';

interface AdminLayoutProps {
  newsList: NewsItem[];
  staffList: StaffItem[];
  galleryList: GalleryItem[];
  messages: ContactMessage[];
  pagesContent: StaticPagesContent;
  ppdbList: PpdbRegistration[];
  settings: SchoolSettings;
  onSaveNews: (newList: NewsItem[]) => void;
  onSaveStaff: (newList: StaffItem[]) => void;
  onSaveGallery: (newList: GalleryItem[]) => void;
  onSaveMessages: (newMessages: ContactMessage[]) => void;
  onSavePagesContent: (newPages: StaticPagesContent) => void;
  onSavePpdbList: (newList: PpdbRegistration[]) => void;
  onSaveSettings: (newSettings: SchoolSettings) => void;
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
  onSaveNews,
  onSaveStaff,
  onSaveGallery,
  onSaveMessages,
  onSavePagesContent,
  onSavePpdbList,
  onSaveSettings,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<string>('DASHBOARD');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'PPDB', label: 'PPDB Online Verifikasi', icon: UserCheck, count: ppdbList.length },
    { id: 'BERITA', label: 'Kelola Berita', icon: Newspaper, count: newsList.length },
    { id: 'STAFF', label: 'Guru & Staff', icon: Users, count: staffList.length },
    { id: 'GALERI', label: 'Galeri Foto', icon: ImageIcon, count: galleryList.length },
    { id: 'PRESTASI', label: 'Prestasi Siswa', icon: Trophy },
    { id: 'TESTIMONI', label: 'Testimoni Wali', icon: Quote },
    { id: 'DOCUMENTS', label: 'Pusat Unduhan PDF', icon: FileDown },
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
            <div className="w-9 h-9 rounded-full bg-emerald-900 border border-amber-400 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <IslamicStarOrnament className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight">
                PANEL OPERATOR - {settings.school_name.toUpperCase()}
              </h1>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                ADMINISTRASI SEKOAH & SUPABASE BACKEND
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
            <PpdbManager ppdbList={ppdbList} onSavePpdbList={onSavePpdbList} />
          )}

          {activeTab === 'BERITA' && (
            <BeritaManager newsList={newsList} onSaveNews={onSaveNews} />
          )}

          {activeTab === 'STAFF' && (
            <StaffManager staffList={staffList} onSaveStaff={onSaveStaff} />
          )}

          {activeTab === 'GALERI' && (
            <GaleriManager galleryList={galleryList} onSaveGallery={onSaveGallery} />
          )}

          {activeTab === 'PRESTASI' && <AchievementsManager />}

          {activeTab === 'TESTIMONI' && <TestimonialsManager />}

          {activeTab === 'DOCUMENTS' && <DocumentsManager />}

          {activeTab === 'PAGES' && (
            <PagesManager
              pagesContent={pagesContent}
              onSavePagesContent={onSavePagesContent}
            />
          )}

          {activeTab === 'MESSAGES' && (
            <MessagesManager messages={messages} onSaveMessages={onSaveMessages} />
          )}

          {activeTab === 'BRANDING' && (
            <BrandingManager settings={settings} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'USERS_ROLES' && <UsersAndRolesManager />}

          {activeTab === 'DATABASE' && <SupabaseExporter />}
        </main>
      </div>
    </div>
  );
};
