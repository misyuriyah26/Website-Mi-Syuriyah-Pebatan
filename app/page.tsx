'use client';

import React, { useState, useEffect } from 'react';
import {
  NewsItem,
  StaffItem,
  GalleryItem,
  ContactMessage,
  StaticPagesContent,
  SchoolSettings,
  PpdbRegistration,
  Achievement,
  Testimonial,
  DownloadDocument,
} from '@/lib/types';
import {
  DataStore,
  initialNews,
  initialStaff,
  initialGallery,
  initialMessages,
  initialPagesContent,
  initialSettings,
  initialPpdbList,
  initialAchievements,
  initialTestimonials,
  initialDocuments,
} from '@/lib/data-store';
import { ThemeProvider } from '@/lib/theme-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { HomeSection } from '@/components/pages/HomeSection';
import { ProfilSection } from '@/components/pages/ProfilSection';
import { ProgramSection } from '@/components/pages/ProgramSection';
import { BeritaSection } from '@/components/pages/BeritaSection';
import { GaleriSection } from '@/components/pages/GaleriSection';
import { KontakSection } from '@/components/pages/KontakSection';
import { PrestasiSection } from '@/components/pages/PrestasiSection';
import { TestimoniSection } from '@/components/pages/TestimoniSection';
import { DokumenSection } from '@/components/pages/DokumenSection';
import { PpdbModal } from '@/components/pages/PpdbModal';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Data States initialized with default seed data for server & initial client match
  const [newsList, setNewsList] = useState<NewsItem[]>(initialNews);
  const [staffList, setStaffList] = useState<StaffItem[]>(initialStaff);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGallery);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [pagesContent, setPagesContent] = useState<StaticPagesContent>(initialPagesContent);
  const [settings, setSettings] = useState<SchoolSettings>(initialSettings);
  const [ppdbList, setPpdbList] = useState<PpdbRegistration[]>(initialPpdbList);

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [documents, setDocuments] = useState<DownloadDocument[]>(initialDocuments);

  // Sync from localStorage after mounting on client
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAdminView(DataStore.isAdminLoggedIn());
      setNewsList(DataStore.getNews());
      setStaffList(DataStore.getStaff());
      setGalleryList(DataStore.getGallery());
      setMessages(DataStore.getMessages());
      setPagesContent(DataStore.getPagesContent());
      setSettings(DataStore.getSettings());
      setPpdbList(DataStore.getPpdbList());
      setAchievements(DataStore.getAchievements());
      setTestimonials(DataStore.getTestimonials());
      setDocuments(DataStore.getDocuments());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Modals state
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isPpdbOpen, setIsPpdbOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Sync Handlers
  const handleSaveNews = (newList: NewsItem[]) => {
    setNewsList(newList);
    DataStore.saveNews(newList);
  };

  const handleSaveStaff = (newList: StaffItem[]) => {
    setStaffList(newList);
    DataStore.saveStaff(newList);
  };

  const handleSaveGallery = (newList: GalleryItem[]) => {
    setGalleryList(newList);
    DataStore.saveGallery(newList);
  };

  const handleSaveMessages = (newMessages: ContactMessage[]) => {
    setMessages(newMessages);
    DataStore.saveMessages(newMessages);
  };

  const handleSavePagesContent = (newPages: StaticPagesContent) => {
    setPagesContent(newPages);
    DataStore.savePagesContent(newPages);
  };

  const handleSavePpdbList = (newList: PpdbRegistration[]) => {
    setPpdbList(newList);
    DataStore.savePpdbList(newList);
  };

  const handleSaveSettings = (newSettings: SchoolSettings) => {
    setSettings(newSettings);
    DataStore.saveSettings(newSettings);
  };

  return (
    <ThemeProvider>
      {isAdminView ? (
        <AdminLayout
          newsList={newsList}
          staffList={staffList}
          galleryList={galleryList}
          messages={messages}
          pagesContent={pagesContent}
          ppdbList={ppdbList}
          settings={settings}
          onSaveNews={handleSaveNews}
          onSaveStaff={handleSaveStaff}
          onSaveGallery={handleSaveGallery}
          onSaveMessages={handleSaveMessages}
          onSavePagesContent={handleSavePagesContent}
          onSavePpdbList={handleSavePpdbList}
          onSaveSettings={handleSaveSettings}
          onExitAdmin={() => setIsAdminView(false)}
        />
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors selection:bg-amber-400 selection:text-emerald-950">
          {/* Sticky Header Navigation */}
          <Navbar
            settings={settings}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onOpenPpdb={() => setIsPpdbOpen(true)}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            runningText={pagesContent.running_text}
          />

          {/* Main Content Render */}
          <main className="flex-1">
            {activeSection === 'beranda' && (
              <>
                <HomeSection
                  pages={pagesContent}
                  settings={settings}
                  latestNews={newsList.filter((n) => n.is_published)}
                  galleryItems={galleryList}
                  onOpenNewsDetail={(news) => {
                    setSelectedNews(news);
                    setActiveSection('berita');
                  }}
                  onOpenPpdb={() => setIsPpdbOpen(true)}
                  setActiveSection={setActiveSection}
                />
                <PrestasiSection achievements={achievements} />
                <TestimoniSection testimonials={testimonials} />
                <DokumenSection documents={documents} />
              </>
            )}

            {activeSection === 'profil' && (
              <ProfilSection
                pages={pagesContent}
                settings={settings}
                staffList={staffList}
              />
            )}

            {activeSection === 'program' && <ProgramSection />}

            {activeSection === 'prestasi' && <PrestasiSection achievements={achievements} />}

            {activeSection === 'berita' && (
              <BeritaSection
                newsList={newsList.filter((n) => n.is_published)}
                selectedNews={selectedNews}
                onOpenNewsDetail={(news) => setSelectedNews(news)}
                onCloseNewsDetail={() => setSelectedNews(null)}
              />
            )}

            {activeSection === 'galeri' && <GaleriSection galleryList={galleryList} />}

            {activeSection === 'dokumen' && <DokumenSection documents={documents} />}

            {activeSection === 'kontak' && (
              <KontakSection
                settings={settings}
                onMessageSubmitted={() => setMessages(DataStore.getMessages())}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            settings={settings}
            setActiveSection={setActiveSection}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onOpenPpdb={() => setIsPpdbOpen(true)}
          />

          {/* Floating WhatsApp Quick Contact Button */}
          <FloatingWhatsApp settings={settings} />

          {/* PPDB Registration Modal */}
          <PpdbModal
            settings={settings}
            pages={pagesContent}
            isOpen={isPpdbOpen}
            onClose={() => setIsPpdbOpen(false)}
            onRegisteredSuccess={() => setPpdbList(DataStore.getPpdbList())}
          />

          {/* Admin Operator Login Modal */}
          <AdminLoginModal
            settings={settings}
            isOpen={isAdminLoginOpen}
            onClose={() => setIsAdminLoginOpen(false)}
            onLoginSuccess={() => {
              setIsAdminLoginOpen(false);
              setIsAdminView(true);
            }}
          />
        </div>
      )}
    </ThemeProvider>
  );
}
