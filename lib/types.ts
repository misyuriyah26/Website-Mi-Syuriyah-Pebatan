export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Pengumuman' | 'Berita' | 'Prestasi' | 'PPDB' | 'Kegiatan';
  image_url: string;
  author: string;
  created_at: string;
  is_published: boolean;
  views?: number;
}

export interface StaffItem {
  id: string;
  name: string;
  title: string; // e.g., "Guru Kelas 1", "Kepala Madrasah", "Guru PAI & Tahfidz"
  nip_ntp?: string;
  subject?: string;
  education?: string;
  image_url: string;
  order_index: number;
  phone?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Keagamaan' | 'Prestasi' | 'Pembelajaran' | 'Ekstrakurikuler' | 'Fasilitas' | 'PHBI';
  image_url: string;
  date: string;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email_or_phone: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
  replied?: boolean;
}

export interface ProgramUnggulanItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
}

export interface StaticPagesContent {
  sambutan_kepala: {
    nama: string;
    gelar: string;
    foto_url: string;
    judul: string;
    isi: string;
  };
  sejarah: {
    judul: string;
    isi: string;
    tahun_berdiri: string;
  };
  visi_misi: {
    visi: string;
    misi: string[];
    tujuan: string[];
  };
  program_unggulan?: ProgramUnggulanItem[];
  ppdb_info?: {
    judul: string;
    deskripsi: string;
    persyaratan: string[];
    beasiswa_info: string;
  };
  running_text: string;
  tagline_hero: string;
  status_ppdb: boolean; // Open / Closed
}

export interface SchoolSettings {
  school_name: string;
  school_tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  maps_iframe_url: string;
  headmaster_name: string;
  npsn: string;
  akreditasi: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  logo_url: string;
  favicon_url: string;
  hero_banner_url: string;
  ppdb_year: string;
  primary_theme_color: string;
  total_siswa_aktif?: string;
  total_siswi_aktif?: string;
  tingkat_kelulusan?: string;
  total_guru_staf?: string;
  nilai_akreditasi_bansm?: string;
}

export interface PpdbRegistration {
  id: string;
  reg_number: string;
  student_name: string;
  nisn_nik?: string;
  gender: 'L' | 'P';
  birth_place: string;
  birth_date: string;
  previous_school: string; // e.g. RA / TK / Paud
  hobby?: string;
  cita_cita?: string;
  parent_name: string;
  father_occupation?: string;
  mother_name: string;
  mother_occupation?: string;
  phone_number: string;
  address: string;
  doc_kk_url?: string;
  doc_akta_url?: string;
  doc_foto_url?: string;
  created_at: string;
  status: 'Pending' | 'Diproses' | 'Diterima' | 'Perlu Perbaikan' | 'Ditolak';
  admin_notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Wali Murid Kelas 4", "Alumni 2020 - Mahasiswa UI"
  avatar_url: string;
  quote: string;
  rating: number; // 1 - 5
  year: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Akademik' | 'Keagamaan' | 'Seni & Olahraga' | 'Pramuka';
  winner_name: string;
  level: 'Kecamatan' | 'Kabupaten' | 'Provinsi' | 'Nasional';
  date: string;
  image_url: string;
  description?: string;
}

export interface DownloadDocument {
  id: string;
  title: string;
  category: 'Brosur & PPDB' | 'Kalender Akademik' | 'Formulir' | 'Kurikulum & Modul' | 'Kitab & Panduan';
  file_url: string;
  file_type: 'PDF' | 'DOCX' | 'ZIP' | 'XLSX';
  file_size: string;
  download_count: number;
  created_at: string;
}

export type AdminRole = 'superadmin' | 'operator_berita' | 'operator_ppdb';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'Active' | 'Inactive';
  created_at: string;
  last_login?: string;
}

export interface ActivityLog {
  id: string;
  user_email: string;
  role: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface VisitorStats {
  date: string;
  page_views: number;
  unique_visitors: number;
  ppdb_views: number;
}
