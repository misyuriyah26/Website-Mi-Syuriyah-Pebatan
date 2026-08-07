import {
  NewsItem,
  StaffItem,
  GalleryItem,
  ContactMessage,
  StaticPagesContent,
  SchoolSettings,
  PpdbRegistration,
  Testimonial,
  Achievement,
  DownloadDocument,
  AdminUser,
  ActivityLog,
  VisitorStats,
} from './types';
import { supabase, isSupabaseConfigured } from './supabase';
import { db, isFirebaseConfigured } from './firebase';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebase-error';

const STORAGE_KEYS = {
  NEWS: 'misyuriyah_news',
  STAFF: 'misyuriyah_staff',
  GALLERY: 'misyuriyah_gallery',
  MESSAGES: 'misyuriyah_messages',
  PAGES: 'misyuriyah_pages',
  SETTINGS: 'misyuriyah_settings',
  PPDB: 'misyuriyah_ppdb',
  TESTIMONIALS: 'misyuriyah_testimonials',
  ACHIEVEMENTS: 'misyuriyah_achievements',
  DOCUMENTS: 'misyuriyah_documents',
  ADMIN_USERS: 'misyuriyah_admin_users',
  LOGS: 'misyuriyah_logs',
  STATS: 'misyuriyah_stats',
  AUTH: 'misyuriyah_admin_auth',
  CURRENT_USER: 'misyuriyah_current_admin',
};

// Initial Seed Data for MI Syuriyah Pebatan
export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pendaftaran Peserta Didik Baru (PPDB) MI Syuriyah Pebatan Tahun Ajaran 2026/2027 Resmi Dibuka',
    slug: 'ppdb-2026-2027-dibuka',
    excerpt: 'MI Syuriyah Pebatan membuka pendaftaran siswa baru gelombang 1 dengan berbagai program beasiswa dan fasilitas unggulan.',
    content: `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Kabar gembira untuk masyarakat Pebatan, Wanasari, Brebes dan sekitarnya! MI Syuriyah Pebatan secara resmi membuka Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027.

Sebagai Lembaga Pendidikan Islam Terpadu dan Berakreditasi A, MI Syuriyah Pebatan berkomitmen mencetak generasi yang hafal Al-Qur'an (Juz 30), mahir berbahasa Arab & Inggris dasar, berprestasi akademik, serta memiliki akhlaqul karimah.

**Fasilitas Unggulan:**
- Ruang Kelas Nyaman Ber-AC & Multimedia
- Laboratorium Komputer & Perpustakaan Digital
- Program Pembiasaan Sholat Dhuha & Dzuhur Berjamaah
- Program Tahfidz Al-Qur'an dengan Metode Yanbu'a
- Ekstrakurikuler: Robotik, Pramuka, Hadroh/Rebana, Pencak Silat, Math & Science Club

**Persyaratan Pendaftaran:**
1. Mengisi Formulir Pendaftaran (Online / Offline)
2. Fotokopi Akta Kelahiran & Kartu Keluarga (KK) (3 lembar)
3. Pas Photo Ukuran 3x4 (4 lembar)
4. Usia minimal 6 tahun per Juli 2026

Dapatkan diskon seragam & beasiswa khusus bagi pendaftar Gelombang 1 (Januari - April 2026)!`,
    category: 'PPDB',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
    author: 'Panitia PPDB',
    created_at: '2026-07-20T08:00:00Z',
    is_published: true,
    views: 342,
  },
  {
    id: 'news-2',
    title: 'Siswa MI Syuriyah Pebatan Raih Juara 1 Lomba Kaligrafi & Musabaqah Hifdzil Qur\'an Tingkat Kabupaten Brebes',
    slug: 'juara-kaligrafi-mhq-kab-brebes',
    excerpt: 'Prestasi membanggakan kembali diukir oleh ananda Ahmad Ziyad dan Siti Humaira pada ajang KSM & Porseni Madrasah 2026.',
    content: `Alhamdulillah Wa Syukurillah! MI Syuriyah Pebatan kembali menorehkan prestasi gemilang di tingkat Kabupaten Brebes.

Dalam ajang Pekan Olahraga dan Seni Madrasah (Porseni) & Kompetisi Sains Madrasah (KSM) tingkat Kabupaten Brebes yang diselenggarakan di Alun-Alun Brebes, dua perwakilan dari MI Syuriyah Pebatan berhasil meraih penghargaan tertinggi:

1. **Ahmad Ziyad Khairul Anam** (Siswa Kelas 5A) - **Juara 1 Lomba Kaligrafi Islam**
2. **Siti Humaira Az-Zahra** (Siswi Kelas 4B) - **Juara 1 Musabaqah Hifdzil Qur'an (MHQ) 1 Juz**

Kepala MI Syuriyah Pebatan, Ust. Ahmad Fauzi, S.Pd.I, menyampaikan rasa syukur dan apresiasi yang setinggi-tingginya kepada para siswa, guru pembimbing, serta orang tua murid.`,
    category: 'Prestasi',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    author: 'Humas Madrasah',
    created_at: '2026-07-15T10:30:00Z',
    is_published: true,
    views: 521,
  },
  {
    id: 'news-3',
    title: 'Kegiatan Pawai Ta\'aruf & Gebyar Peringatan Tahun Baru Islam 1448 Hijriyah di Desa Pebatan',
    slug: 'pawai-taaruf-tahun-baru-islam-1448h',
    excerpt: 'Ratusan siswa, guru, dan wali murid MI Syuriyah Pebatan memeriahkan pawai obor dan pembagian sembako untuk anak yatim.',
    content: `Dalam rangka menyambut Tahun Baru Islam 1448 H, MI Syuriyah Pebatan menyelenggarakan rangkaian kegiatan "Gebyar Muharram Berkah". 

Kegiatan diawali dengan Pawai Ta'aruf mengelilingi wilayah Desa Pebatan, Kecamatan Wanasari. Ratusan siswa tampil penuh semangat dengan busana muslim kreatif, memperagakan maskot miniatur Ka'bah, serta memainkan grup musik Rebana/Hadroh MI Syuriyah.`,
    category: 'Kegiatan',
    image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200',
    author: 'Panitia PHBI',
    created_at: '2026-07-02T14:00:00Z',
    is_published: true,
    views: 289,
  },
];

export const initialStaff: StaffItem[] = [
  {
    id: 'staff-1',
    name: 'Ahmad Fauzi, S.Pd.I',
    title: 'Kepala Madrasah & Pengajar Tahfidz',
    nip_ntp: '197805122005011003',
    subject: 'Ke-NU-an & Al-Qur\'an Hadits',
    education: 'S1 Pendidikan Agama Islam - UIN Walisongo Semarang',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    order_index: 1,
    phone: '081234567890',
  },
  {
    id: 'staff-2',
    name: 'Siti Maryam, S.Pd',
    title: 'Wakil Kepala Madrasah Bidang Kurikulum',
    nip_ntp: '198203152009022001',
    subject: 'Matematika & IPA',
    education: 'S1 Pendidikan Guru Madrasah Ibtidaiyah - IAIN Syekh Nurjati Cirebon',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    order_index: 2,
    phone: '085712345678',
  },
  {
    id: 'staff-3',
    name: 'Muhammad Ridwan, S.Ag',
    title: 'Koordinator Keagamaan & Pembina Hadroh',
    nip_ntp: '198509202012011005',
    subject: 'Bahasa Arab & Fiqih',
    education: 'S1 Bahasa & Sastra Arab - UIN Sunan Kalijaga Yogyakarta',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    order_index: 3,
    phone: '081987654321',
  },
  {
    id: 'staff-4',
    name: 'Nurul Hidayah, S.Pd.I',
    title: 'Wali Kelas 1 & Guru Pembiasaan Yanbu\'a',
    nip_ntp: '199011042015032002',
    subject: 'Tematik Kelas 1 & Akidah Akhlak',
    education: 'S1 PGMI - UNU Surakarta',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    order_index: 4,
    phone: '082345678901',
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pembiasaan Sholat Dhuha Berjamaah & Istighosah Jumat Pagi',
    category: 'Keagamaan',
    image_url: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-18',
    description: 'Kegiatan rutin setiap Jumat pagi untuk menanamkan kedisiplinan dan spiritualitas sejak dini.',
  },
  {
    id: 'gal-2',
    title: 'Pembelajaran Robotik & Coding Sederhana di Lab Komputer',
    category: 'Pembelajaran',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-10',
    description: 'Siswa kelas 5 berlatih merakit rangkaian sensor robotik dan dasar pemrograman visual.',
  },
  {
    id: 'gal-3',
    title: 'Atraksi Ekstrakurikuler Pencak Silat Pagar Nusa',
    category: 'Ekstrakurikuler',
    image_url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-25',
    description: 'Penampilan jurus seni Pencak Silat Pagar Nusa pada acara wisuda dan pelepasan siswa kelas VI.',
  },
  {
    id: 'gal-4',
    title: 'Penerimaan Piala Juara Umum Porseni Madrasah Wanasari',
    category: 'Prestasi',
    image_url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-12',
    description: 'Penyerahan piala oleh Kepala Kantor Kemenag Kabupaten Brebes kepada kontingen MI Syuriyah.',
  },
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Bapak Hendra Wijaya',
    email_or_phone: '081399887766',
    subject: 'Pertanyaan Syarat Pendaftaran PPDB Kelas 1',
    message: 'Assalamu\'alaikum. Mohon info apakah calon siswa lulusan RA dari luar kota Brebes bisa langsung mendaftar secara online?',
    created_at: '2026-07-25T09:15:00Z',
    is_read: false,
    replied: false,
  },
  {
    id: 'msg-2',
    name: 'Ibu Ratna Dewi',
    email_or_phone: 'ratnadewi@gmail.com',
    subject: 'Informasi Biaya & Beasiswa Tahfidz',
    message: 'Apakah ada potongan biaya masuk untuk anak yang sudah hafal Juz 30? Terima kasih.',
    created_at: '2026-07-22T14:30:00Z',
    is_read: true,
    replied: true,
  },
];

export const initialPagesContent: StaticPagesContent = {
  sambutan_kepala: {
    nama: 'Ahmad Fauzi, S.Pd.I',
    gelar: 'Kepala MI Syuriyah Pebatan',
    foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    judul: 'Mencetak Generasi Qur\'ani, Berkarakter, dan Unggul Teknologi',
    isi: `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Puji syukur kehadirat Allah SWT yang telah memberikan rahmat dan hidayah-Nya. Selamat datang di portal resmi MI Syuriyah Pebatan, Kecamatan Wanasari, Kabupaten Brebes.

Sebagai madrasah ibtidaiyah di bawah naungan Lembaga Pendidikan Ma'arif NU, kami berkomitmen untuk menyelenggarakan pendidikan islami terpadu yang memadukan Kurikulum Merdeka Kemendikbudristek dengan Kurikulum Kemenag dan Nilai-Nilai Ke-NU-an.

Kami percaya bahwa setiap anak memiliki potensi istimewa. Melalui pembiasaan ibadah harian, pembelajaran berbasis digital, program Tahfidz Al-Qur'an Yanbu'a, serta ragam ekstrakurikuler, kami siap mendampingi putra-putri Bapak/Ibu menjadi insan yang beriman, bertaqwa, cerdas, berakhlaq mulia, dan siap menghadapi tantangan zaman.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
  },
  sejarah: {
    judul: 'Sejarah Singkat MI Syuriyah Pebatan',
    isi: `MI Syuriyah Pebatan didirikan pada tahun 1968 oleh para alim ulama dan tokoh masyarakat Desa Pebatan sebagai wujud kepedulian terhadap pendidikan agama anak-anak di wilayah Wanasari Brebes. 

Berawal dari madrasah diniyah bersahaja, atas kegigihan para kyai dan dukungan warga, MI Syuriyah Pebatan berkembang pesat menjadi salah satu Madrasah Ibtidaiyah percontohan di Kabupaten Brebes dengan akreditasi nilai A.

Hingga saat ini, MI Syuriyah Pebatan telah meluluskan ribuan alumni yang berkiprah sebagai akademisi, pengusaha, pejabat pemerintah, ulama, dan profesional di berbagai penjuru tanah air.`,
    tahun_berdiri: '1968',
  },
  visi_misi: {
    visi: 'Terwujudnya Generasi Islam yang Unggul dalam Imtaq dan Iptek, Hafal Al-Qur\'an, Berakhlaqul Karimah, serta Berwawasan Lingkungan.',
    misi: [
      'Menyelenggarakan pembelajaran berbasis Kurikulum Merdeka terintegrasi nilai-nilai keislaman dan ke-NU-an.',
      'Melaksanakan program Tahfidz Al-Qur\'an Juz 30 dan pembiasaan Tartil Al-Qur\'an metode Yanbu\'a.',
      'Mengembangkan potensi sains, matematika, bahasa asing (Arab & Inggris), serta teknologi digital secara optimal.',
      'Membina karakter santri melalui pembiasaan sholat berjamaah, kedisiplinan, kepramukaan, dan seni budaya Islam.',
      'Menciptakan lingkungan madrasah yang berseri (Bersih, Sehat, Rindang, dan Indah) serta ramah anak.',
    ],
    tujuan: [
      'Lulusan hafal minimal Juz 30 Al-Qur\'an dan mahir membaca Al-Qur\'an dengan tajwid yang benar.',
      'Meraih prestasi tingkat kabupaten hingga nasional di bidang KSM, Porseni, dan O2SN.',
      'Menguasai kompetensi dasar literasi digital dan teknologi informasi untuk jenjang lanjutan.',
      'Memiliki sikap sopan santun, hormat kepada orang tua & guru, serta peduli sesama.',
    ],
    judul_tujuan: 'Target & Tujuan Capaian Lulusan',
  },
  program_unggulan: [
    {
      id: 'prog-1',
      title: 'Program Tahfidz Al-Qur\'an',
      description: 'Target hafalan Juz 30 dengan tajwid & makhroj yang benar menggunakan metode Yanbu\'a. Bimbingan intensif setiap pagi sebelum jam pelajaran.',
      icon_name: 'BookOpen',
    },
    {
      id: 'prog-2',
      title: 'Pembiasaan Akhlak & Karakter',
      description: 'Sholat Dhuha dan Dzuhur berjamaah di masjid madrasah, pembacaan Asmaul Husna, Mudarosah, serta budaya Senyum, Sapa, Salam, Sopan, Santun.',
      icon_name: 'ShieldCheck',
    },
    {
      id: 'prog-3',
      title: 'Smart Digital Classroom',
      description: 'Pembelajaran berbasis CBT online, laboratorium komputer multimedia, serta ujian asesmen berbasis tablet edukasi untuk kesiapan era 4.0.',
      icon_name: 'Lightbulb',
    },
    {
      id: 'prog-4',
      title: 'Seni Keagamaan Hadroh & Rebana',
      description: 'Ekstrakurikuler seni sholawat rebana modern yang aktif tampil di ajang Porseni madrasah dan perayaan keagamaan tingkat kabupaten.',
      icon_name: 'Star',
    },
    {
      id: 'prog-5',
      title: 'Prestasi Sains & Kaligrafi',
      description: 'Bimbingan intensif Kompetisi Sains Madrasah (KSM) Matematika & IPA, serta Sanggar Kaligrafi yang rutin menorehkan juara 1 tingkat kabupaten.',
      icon_name: 'Award',
    },
    {
      id: 'prog-6',
      title: 'Kepramukaan & Silat Pagar Nusa',
      description: 'Menggembleng kedisiplinan, jiwa kepemimpinan, kesehatan jasmani serta kemandirian santri melalui kegiatan Pramuka dan Pagar Nusa.',
      icon_name: 'Heart',
    },
  ],
  kurikulum_info: {
    badge_kurikulum: 'STANDAR NASIONAL & KEMENAG',
    judul_kurikulum: 'Kurikulum Terpadu Kurikulum Merdeka + KMA 183',
    deskripsi_kurikulum: 'MI Syuriyah Pebatan mengimplementasikan Kurikulum Merdeka yang disempurnakan dengan muatan lokal pendidikan keagamaan khas Nahdlatul Ulama.',
    matpel_agama: [
      'Al-Qur\'an Hadits (Membaca, Menghafal, Memahami)',
      'Aqidah Akhlaq (Pembentukan Karakter Terpuji)',
      'Fiqih & Praktek Ibadah Harian',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab Dasar & Muhadatsah',
    ],
    matpel_akademik: [
      'Pendidikan Pancasila & Kewarganegaraan',
      'Bahasa Indonesia & Literasi Digital',
      'Matematika Logis & Numerasi',
      'Ilmu Pengetahuan Alam & Sosial (IPAS)',
      'Bahasa Inggris & Muatan Lokal TIK/Komputer',
    ],
  },
  ekstrakurikuler: [
    { id: 'ekstra-1', name: 'Tahfidz Al-Qur\'an (Yanbu\'a)', desc: 'Bimbingan intensif hafalan Al-Qur\'an target Juz 30 dengan tartil.' },
    { id: 'ekstra-2', name: 'Seni Rebana & Hadroh', desc: 'Grup sholawat santri untuk melestarikan kebudayaan Islam.' },
    { id: 'ekstra-3', name: 'Seni Kaligrafi Islam', desc: 'Seni menulis ayat Al-Qur\'an indah, rutin meraih juara Porseni.' },
    { id: 'ekstra-4', name: 'Pramuka Penggalang & Siaga', desc: 'Membentuk kedisiplinan, kemandirian, dan kepemimpinan santri.' },
    { id: 'ekstra-5', name: 'Science & Math Club', desc: 'Persiapan Kompetisi Sains Madrasah (KSM) tingkat kabupaten.' },
    { id: 'ekstra-6', name: 'Pencak Silat Pagar Nusa', desc: 'Seni bela diri islami untuk kesehatan fisik dan kewaspadaan diri.' },
  ],
  jadwal_kbm: [
    { id: 'kbm-1', time: '07.00 - 07.30 WIB', activity: 'Sholat Dhuha Berjamaah, Mudarosah Al-Qur\'an & Asmaul Husna', type: 'Pembiasaan' },
    { id: 'kbm-2', time: '07.30 - 09.30 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 1 - 3', type: 'Akademik' },
    { id: 'kbm-3', time: '09.30 - 10.00 WIB', activity: 'Istirahat Pertama & Kantin Sehat', type: 'Istirahat' },
    { id: 'kbm-4', time: '10.00 - 12.00 WIB', activity: 'Kegiatan Belajar Mengajar (KBM) Jam ke 4 - 6', type: 'Akademik' },
    { id: 'kbm-5', time: '12.00 - 12.40 WIB', activity: 'Sholat Dzuhur Berjamaah & Kultum Santri', type: 'Pembiasaan' },
    { id: 'kbm-6', time: '12.40 - 13.30 WIB', activity: 'KBM Jam ke 7 / Bimbingan Tahfidz Ekstra', type: 'Akademik' },
    { id: 'kbm-7', time: '13.30 WIB - Selesai', activity: 'Pulang & Bimbingan Ekstrakurikuler (Senin - Sabtu)', type: 'Ekstra' },
  ],
  struktur_organisasi: {
    badge: 'PIMPINAN & PENGELOLA',
    judul: 'Struktur Organisasi Madrasah',
    subjudul: 'Bagan kepemimpinan dan manajerial MI Syuriyah Pebatan',
    pimpinan_utama: [
      { id: 'org-1', jabatan: 'Komite Madrasah', nama: 'KH. M. Syukron, S.Ag', keterangan: 'Perwakilan Tokoh & Wali Murid' },
      { id: 'org-2', jabatan: 'Kepala Madrasah', nama: 'Ahmad Fauzi, S.Pd.I', keterangan: 'Penanggung Jawab Utama' },
    ],
    pengelola_tambahan: [
      { id: 'org-3', jabatan: 'Waka Kurikulum', nama: 'Ustadzah Nurul Hidayah, S.Pd' },
      { id: 'org-4', jabatan: 'Koordinator Tahfidz', nama: 'Ust. M. Ridwan, S.Th.I' },
      { id: 'org-5', jabatan: 'Kepala Tata Usaha', nama: 'Ustadzah Khadijah, A.Md' },
    ],
  },
  kontak_info: {
    badge_kontak: 'LAYANAN INFORMASI SEKOLAH',
    judul_kontak: 'Hubungi MI Syuriyah Pebatan',
    deskripsi_kontak: 'Silakan kirimkan pertanyaan, kritik, saran, atau konsultasi pendaftaran PPDB kepada sekretariat madrasah kami.',
    judul_info_kantor: 'Informasi Kantor Madrasah',
    jam_pelayanan: 'Senin - Sabtu: 07.00 - 13.30 WIB',
    teks_tombol_wa: 'Chat WhatsApp Admin Madrasah',
    judul_form_pesan: 'Kirim Pesan / Pertanyaan',
    teks_tombol_kirim: 'Kirimkan Pesan Ke Admin',
    pesan_sukses: 'Alhamdulillah, Pesan Anda Berhasil Terkirim!',
    judul_peta: 'Peta Lokasi MI Syuriyah Pebatan Wanasari Brebes',
    deskripsi_peta: 'Jl. Raya Pebatan No. 45, Desa Pebatan, Kec. Wanasari, Kab. Brebes, Jawa Tengah.',
  },
  ppdb_info: {
    judul: 'Informasi & Ketentuan PPDB TA 2026/2027',
    deskripsi: 'Pendaftaran Peserta Didik Baru MI Syuriyah Pebatan dilaksanakan secara transparan, akuntabel, dan dapat diakses online maupun offline di sekretariat madrasah.',
    persyaratan: [
      'Usia minimal 6 tahun pada bulan Juli 2026',
      'Mengisi Formulir Pendaftaran (Online / Cetak)',
      'Fotokopi Akta Kelahiran & Kartu Keluarga (3 lembar)',
      'Pas Photo berwarna ukuran 3x4 (4 lembar)',
      'Fotokopi Ijazah / Surat Keterangan Lulus dari RA/TK/PAUD',
    ],
    beasiswa_info: 'Bebas Uang Gedung & Seragam Gratis bagi pendaftar Gelombang 1 serta anak yatim/piatu dan santri berprestasi hafalan Al-Qur\'an.',
  },
  running_text: 'Selamat Datang di Portal Resmi MI Syuriyah Pebatan Wanasari Brebes — PPDB Online TA 2026/2027 Resmi Dibuka! Dapatkan Beasiswa Khusus Pendaftar Gelombang 1.',
  tagline_hero: 'Unggul dalam Imtaq, Cerdas dalam Iptek, Anggun dalam Akhlak',
  status_ppdb: true,
};

export const initialSettings: SchoolSettings = {
  school_name: 'MI Syuriyah Pebatan',
  school_tagline: 'Madrasah Ibtidaiyah Terpadu Berakreditasi A — Wanasari Brebes',
  address: 'Jl. Raya Pebatan No. 45, Desa Pebatan, Kec. Wanasari, Kab. Brebes, Jawa Tengah 52252',
  phone: '(0283) 617-8890',
  whatsapp: '6281234567890',
  email: 'misyuriyah26@gmail.com',
  maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.75782976735!2d109.0205!3d-6.865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb1123456789%3A0x123456789abcdef!2sPebatan%2C%20Wanasari%2C%20Brebes!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  headmaster_name: 'Ahmad Fauzi, S.Pd.I',
  npsn: '60712345',
  akreditasi: 'A (Sangat Baik)',
  facebook_url: 'https://facebook.com/misyuriyahpebatan',
  instagram_url: 'https://instagram.com/misyuriyah_pebatan',
  youtube_url: 'https://youtube.com/@misyuriyahpebatanofficial',
  logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200',
  favicon_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=100',
  hero_banner_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600',
  ppdb_year: '2026/2027',
  primary_theme_color: 'emerald',
  total_siswa_aktif: '350+',
  total_siswi_aktif: '180 Siswi / 170 Siswa',
  tingkat_kelulusan: '100%',
  total_guru_staf: '24',
  nilai_akreditasi_bansm: 'A (Unggul 94)',
};

export const initialPpdbList: PpdbRegistration[] = [
  {
    id: 'ppdb-1',
    reg_number: 'REG-2026-001',
    student_name: 'Muhammad Azka Al-Farisi',
    nisn_nik: '3329011205190001',
    gender: 'L',
    birth_place: 'Brebes',
    birth_date: '2019-05-12',
    previous_school: 'RA Muslimat NU Pebatan',
    hobby: 'Membaca & Hadroh',
    cita_cita: 'Ustadz & Ilmuwan',
    parent_name: 'Bpk. Ahmad Subhan',
    father_occupation: 'Wiraswasta',
    mother_name: 'Ibu Nur Khasanah',
    mother_occupation: 'Guru',
    phone_number: '081234567890',
    address: 'RT 03 RW 02 Desa Pebatan, Kec. Wanasari, Kab. Brebes',
    doc_kk_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600',
    doc_akta_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600',
    doc_foto_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
    created_at: '2026-07-21T09:00:00Z',
    status: 'Diterima',
    admin_notes: 'Berkas lengkap dan lulus wawancara pemetaan minat.',
  },
  {
    id: 'ppdb-2',
    reg_number: 'REG-2026-002',
    student_name: 'Aisyah Aqila Humaira',
    nisn_nik: '3329014808190002',
    gender: 'P',
    birth_place: 'Brebes',
    birth_date: '2019-08-18',
    previous_school: 'TK Pertiwi Wanasari',
    hobby: 'Mewarnai & Kaligrafi',
    cita_cita: 'Dokter',
    parent_name: 'Bpk. Rizky Pratama',
    father_occupation: 'PNS',
    mother_name: 'Ibu Ratna Susanti',
    mother_occupation: 'Ibu Rumah Tangga',
    phone_number: '085712349988',
    address: 'Jl. Pemuda No. 12, Klampok, Wanasari, Brebes',
    created_at: '2026-07-23T11:20:00Z',
    status: 'Diproses',
    admin_notes: 'Menunggu konfirmasi pengambilan seragam.',
  },
  {
    id: 'ppdb-3',
    reg_number: 'REG-2026-003',
    student_name: 'Fathir Ahmad Hafidz',
    gender: 'L',
    birth_place: 'Tegal',
    birth_date: '2019-10-04',
    previous_school: 'PAUD Mutiara Hati',
    parent_name: 'Bpk. Herman Kautsar',
    mother_name: 'Ibu Siti Khadijah',
    phone_number: '081987654321',
    address: 'Gg. Masjid No. 5, Pebatan, Brebes',
    created_at: '2026-07-26T14:45:00Z',
    status: 'Pending',
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'H. Budi Santoso, S.E.',
    role: 'Wali Murid Ananda Zaky (Kelas 5)',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    quote: 'Alhamdulillah, sejak sekolah di MI Syuriyah Pebatan, bacaan Al-Qur\'an ananda Zaky makin fasih dan hafalan Juz 30 selesai dalam waktu 1 tahun. Guru-gurunya sangat sabar dan ke-NU-annya kental.',
    rating: 5,
    year: '2025/2026',
  },
  {
    id: 'testi-2',
    name: 'Dr. Hj. Anisa Rahmawati, M.Pd',
    role: 'Alumni MI Syuriyah (Tahun 2010) & Dosen UIN',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    quote: 'Fondasi kedisiplinan dan karakter islami yang diajarkan di MI Syuriyah Pebatan sangat terasa dampaknya hingga saya menempuh studi doktoral. Madrasah terbaik di Wanasari!',
    rating: 5,
    year: 'Alumni 2010',
  },
  {
    id: 'testi-3',
    name: 'Ibu Tri Wahyuni',
    role: 'Wali Murid Ananda Aisyah (Kelas 2)',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    quote: 'Fasilitas komputernya modern dan anak saya diajari coding dasar sejak kelas 2. Pembiasaan Sholat Dhuha berjamaah juga buat anak jadi lebih rajin di rumah.',
    rating: 5,
    year: '2026',
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 Musabaqah Hifdzil Qur\'an (MHQ) 1 Juz & Tilawah',
    category: 'Keagamaan',
    winner_name: 'Siti Humaira Az-Zahra (Kelas 4B)',
    level: 'Kabupaten',
    date: '2026-06-15',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    description: 'Poin tertinggi dalam kerapian makhraj, tajwid, dan kelancaran hafalan pada Porseni Kemenag Brebes.',
  },
  {
    id: 'ach-2',
    title: 'Juara 1 Lomba Seni Kaligrafi Islam Kontemporer',
    category: 'Seni & Olahraga',
    winner_name: 'Ahmad Ziyad Khairul Anam (Kelas 5A)',
    level: 'Kabupaten',
    date: '2026-06-16',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    description: 'Karya seni mushaf Al-Qur\'an dengan paduan hiasan ornamen nusantara.',
  },
  {
    id: 'ach-3',
    title: 'Juara 2 Kompetisi Sains Madrasah (KSM) Matematika Terintegrasi',
    category: 'Akademik',
    winner_name: 'Farhan Maulana (Kelas 6A)',
    level: 'Provinsi',
    date: '2025-11-10',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    description: 'Menyelesaikan soal matematika penalaran tinggi yang dipadukan dengan pemahaman ayat Al-Qur\'an.',
  },
];

export const initialDocuments: DownloadDocument[] = [
  {
    id: 'doc-1',
    title: 'Brosur & Panduan Pendaftaran PPDB 2026/2027',
    category: 'Brosur & PPDB',
    file_url: '#',
    file_type: 'PDF',
    file_size: '2.4 MB',
    download_count: 312,
    created_at: '2026-07-01',
  },
  {
    id: 'doc-2',
    title: 'Kalender Akademik Madrasah TA 2026/2027',
    category: 'Kalender Akademik',
    file_url: '#',
    file_type: 'PDF',
    file_size: '1.8 MB',
    download_count: 189,
    created_at: '2026-07-05',
  },
  {
    id: 'doc-3',
    title: 'Formulir Cetak Pendaftaran Offline PPDB',
    category: 'Formulir',
    file_url: '#',
    file_type: 'PDF',
    file_size: '850 KB',
    download_count: 245,
    created_at: '2026-07-02',
  },
  {
    id: 'doc-4',
    title: 'Modul Pembiasaan Doa Harian & Juz \'Amma Yanbu\'a',
    category: 'Kitab & Panduan',
    file_url: '#',
    file_type: 'PDF',
    file_size: '4.2 MB',
    download_count: 420,
    created_at: '2026-06-20',
  },
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Super Admin MI Syuriyah',
    email: 'misyuriyah26@gmail.com',
    role: 'superadmin',
    status: 'Active',
    created_at: '2026-01-01',
    last_login: '2026-07-28 13:00',
  },
  {
    id: 'user-2',
    name: 'Ustadz Ridwan (Operator Berita)',
    email: 'operator.berita@misyuriyahpebatan.sch.id',
    role: 'operator_berita',
    status: 'Active',
    created_at: '2026-03-10',
    last_login: '2026-07-27 10:15',
  },
  {
    id: 'user-3',
    name: 'Ibu Siti (Operator PPDB)',
    email: 'operator.ppdb@misyuriyahpebatan.sch.id',
    role: 'operator_ppdb',
    status: 'Active',
    created_at: '2026-03-12',
    last_login: '2026-07-28 09:30',
  },
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    user_email: 'admin@misyuriyahpebatan.sch.id',
    role: 'superadmin',
    action: 'Verifikasi PPDB',
    module: 'PPDB',
    details: 'Menerima pendaftaran REG-2026-001 (Muhammad Azka Al-Farisi)',
    timestamp: '2026-07-28T08:30:00Z',
  },
  {
    id: 'log-2',
    user_email: 'operator.berita@misyuriyahpebatan.sch.id',
    role: 'operator_berita',
    action: 'Tambah Berita',
    module: 'Berita',
    details: 'Menerbitkan berita PPDB TA 2026/2027 Dibuka',
    timestamp: '2026-07-27T10:20:00Z',
  },
];

export const initialVisitorStats: VisitorStats[] = [
  { date: '2026-07-22', page_views: 340, unique_visitors: 120, ppdb_views: 45 },
  { date: '2026-07-23', page_views: 410, unique_visitors: 155, ppdb_views: 62 },
  { date: '2026-07-24', page_views: 380, unique_visitors: 140, ppdb_views: 50 },
  { date: '2026-07-25', page_views: 520, unique_visitors: 210, ppdb_views: 88 },
  { date: '2026-07-26', page_views: 610, unique_visitors: 245, ppdb_views: 110 },
  { date: '2026-07-27', page_views: 590, unique_visitors: 230, ppdb_views: 95 },
  { date: '2026-07-28', page_views: 680, unique_visitors: 280, ppdb_views: 135 },
];

export class DataStore {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  // --- NEWS ---
  static getNews(): NewsItem[] {
    if (!this.isClient()) return initialNews;
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews));
      return initialNews;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialNews;
    }
  }

  static saveNews(news: NewsItem[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    }
    if (isSupabaseConfigured() && supabase) {
      if (news.length > 0) {
        supabase.from('news').upsert(news).then(undefined, () => {});
        const keepIds = news.map((n) => n.id);
        supabase.from('news').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('news').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(news.map((item) => item.id));
      for (const item of news) {
        setDoc(doc(db, 'news', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'news')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'news', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- STAFF ---
  static getStaff(): StaffItem[] {
    if (!this.isClient()) return initialStaff;
    const stored = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(initialStaff));
      return initialStaff;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialStaff;
    }
  }

  static saveStaff(staff: StaffItem[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    }
    if (isSupabaseConfigured() && supabase) {
      if (staff.length > 0) {
        supabase.from('staff').upsert(staff).then(undefined, () => {});
        const keepIds = staff.map((s) => s.id);
        supabase.from('staff').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('staff').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(staff.map((item) => item.id));
      for (const item of staff) {
        setDoc(doc(db, 'staff', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'staff')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'staff', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- GALLERY ---
  static getGallery(): GalleryItem[] {
    if (!this.isClient()) return initialGallery;
    const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery));
      return initialGallery;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialGallery;
    }
  }

  static saveGallery(gallery: GalleryItem[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    }
    if (isSupabaseConfigured() && supabase) {
      if (gallery.length > 0) {
        supabase.from('gallery').upsert(gallery).then(undefined, () => {});
        const keepIds = gallery.map((g) => g.id);
        supabase.from('gallery').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('gallery').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(gallery.map((item) => item.id));
      for (const item of gallery) {
        setDoc(doc(db, 'gallery', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'gallery')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'gallery', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- MESSAGES ---
  static getMessages(): ContactMessage[] {
    if (!this.isClient()) return initialMessages;
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMessages));
      return initialMessages;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialMessages;
    }
  }

  static saveMessages(messages: ContactMessage[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
    if (isSupabaseConfigured() && supabase) {
      if (messages.length > 0) {
        supabase.from('messages').upsert(messages).then(undefined, () => {});
        const keepIds = messages.map((m) => m.id);
        supabase.from('messages').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('messages').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(messages.map((item) => item.id));
      for (const item of messages) {
        setDoc(doc(db, 'messages', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'messages')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'messages', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- PAGES CONTENT ---
  static getPagesContent(): StaticPagesContent {
    if (!this.isClient()) return initialPagesContent;
    const stored = localStorage.getItem(STORAGE_KEYS.PAGES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(initialPagesContent));
      return initialPagesContent;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialPagesContent;
    }
  }

  static savePagesContent(pages: StaticPagesContent): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    }
    if (isSupabaseConfigured() && supabase) {
      supabase.from('pages').upsert({ id: 'main_pages', content: pages, updated_at: new Date().toISOString() }).then(undefined, () => {});
    }
    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'pages', 'main_pages'), { content: pages, updated_at: new Date().toISOString() }).catch(() => {});
    }
  }

  // --- SETTINGS ---
  static getSettings(): SchoolSettings {
    if (!this.isClient()) return initialSettings;
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
      return initialSettings;
    }
    try {
      return { ...initialSettings, ...JSON.parse(stored) };
    } catch {
      return initialSettings;
    }
  }

  static saveSettings(settings: SchoolSettings): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
    if (isSupabaseConfigured() && supabase) {
      supabase.from('settings').upsert({ id: 'main_settings', ...settings }).then(undefined, () => {});
    }
    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'settings', 'main_settings'), settings).catch(() => {});
    }
  }

  // --- PPDB REGISTRATIONS ---
  static getPpdbList(): PpdbRegistration[] {
    if (!this.isClient()) return initialPpdbList;
    const stored = localStorage.getItem(STORAGE_KEYS.PPDB);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(initialPpdbList));
      return initialPpdbList;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialPpdbList;
    }
  }

  static savePpdbList(list: PpdbRegistration[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(list));
    }
    if (isSupabaseConfigured() && supabase) {
      if (list.length > 0) {
        supabase.from('ppdb').upsert(list).then(undefined, () => {});
        const keepIds = list.map((item) => item.id);
        supabase.from('ppdb').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('ppdb').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(list.map((item) => item.id));
      for (const item of list) {
        setDoc(doc(db, 'ppdb', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'ppdb')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'ppdb', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  static addPpdbRegistration(regData: Omit<PpdbRegistration, 'id' | 'reg_number' | 'created_at' | 'status'>): PpdbRegistration {
    const list = this.getPpdbList();
    const regCount = list.length + 1;
    const reg_number = `REG-2026-${String(regCount).padStart(3, '0')}`;
    const newReg: PpdbRegistration = {
      ...regData,
      id: `ppdb-${Date.now()}`,
      reg_number,
      created_at: new Date().toISOString(),
      status: 'Pending',
    };

    const updated = [newReg, ...list];
    this.savePpdbList(updated);
    this.addActivityLog('Pendaftaran Baru', 'PPDB', `Pendaftaran online: ${newReg.student_name} (${newReg.reg_number})`);
    return newReg;
  }

  static findPpdbByRegOrPhone(query: string): PpdbRegistration[] {
    const list = this.getPpdbList();
    const cleanQuery = query.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.reg_number.toLowerCase().includes(cleanQuery) ||
        item.phone_number.includes(cleanQuery) ||
        item.student_name.toLowerCase().includes(cleanQuery)
    );
  }

  // --- TESTIMONIALS ---
  static getTestimonials(): Testimonial[] {
    if (!this.isClient()) return initialTestimonials;
    const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
      return initialTestimonials;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialTestimonials;
    }
  }

  static saveTestimonials(list: Testimonial[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    }
    if (isSupabaseConfigured() && supabase) {
      if (list.length > 0) {
        supabase.from('testimonials').upsert(list).then(undefined, () => {});
        const keepIds = list.map((item) => item.id);
        supabase.from('testimonials').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('testimonials').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(list.map((item) => item.id));
      for (const item of list) {
        setDoc(doc(db, 'testimonials', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'testimonials')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'testimonials', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- ACHIEVEMENTS (PRESTASI) ---
  static getAchievements(): Achievement[] {
    if (!this.isClient()) return initialAchievements;
    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(initialAchievements));
      return initialAchievements;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialAchievements;
    }
  }

  static saveAchievements(list: Achievement[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
    }
    if (isSupabaseConfigured() && supabase) {
      if (list.length > 0) {
        supabase.from('achievements').upsert(list).then(undefined, () => {});
        const keepIds = list.map((item) => item.id);
        supabase.from('achievements').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('achievements').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(list.map((item) => item.id));
      for (const item of list) {
        setDoc(doc(db, 'achievements', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'achievements')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'achievements', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  // --- DOWNLOAD DOCUMENTS ---
  static getDocuments(): DownloadDocument[] {
    if (!this.isClient()) return initialDocuments;
    const stored = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(initialDocuments));
      return initialDocuments;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialDocuments;
    }
  }

  static saveDocuments(list: DownloadDocument[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(list));
    }
    if (isSupabaseConfigured() && supabase) {
      if (list.length > 0) {
        supabase.from('documents').upsert(list).then(undefined, () => {});
        const keepIds = list.map((item) => item.id);
        supabase.from('documents').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('documents').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(list.map((item) => item.id));
      for (const item of list) {
        setDoc(doc(db, 'documents', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'documents')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'documents', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  static incrementDocumentDownload(id: string): void {
    const docs = this.getDocuments();
    const updated = docs.map((doc) =>
      doc.id === id ? { ...doc, download_count: doc.download_count + 1 } : doc
    );
    this.saveDocuments(updated);
  }

  // --- ADMIN USERS & AUTH ---
  static getAdminUsers(): AdminUser[] {
    if (!this.isClient()) return initialAdminUsers;
    const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_USERS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(initialAdminUsers));
      return initialAdminUsers;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialAdminUsers;
    }
  }

  static saveAdminUsers(list: AdminUser[]): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(list));
    }
    if (isSupabaseConfigured() && supabase) {
      if (list.length > 0) {
        supabase.from('admin_users').upsert(list).then(undefined, () => {});
        const keepIds = list.map((item) => item.id);
        supabase.from('admin_users').delete().not('id', 'in', `(${keepIds.map(id => `"${id}"`).join(',')})`).then(undefined, () => {});
      } else {
        supabase.from('admin_users').delete().neq('id', '___none___').then(undefined, () => {});
      }
    }
    if (isFirebaseConfigured()) {
      const keepIds = new Set(list.map((item) => item.id));
      for (const item of list) {
        setDoc(doc(db, 'admin_users', item.id), item).catch(() => {});
      }
      getDocs(collection(db, 'admin_users')).then((snap) => {
        snap.docs.forEach((d) => {
          if (!keepIds.has(d.id)) {
            deleteDoc(doc(db, 'admin_users', d.id)).catch(() => {});
          }
        });
      }).catch(() => {});
    }
  }

  static getCurrentUser(): AdminUser {
    if (!this.isClient()) return initialAdminUsers[0];
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) return initialAdminUsers[0];
    try {
      return JSON.parse(stored);
    } catch {
      return initialAdminUsers[0];
    }
  }

  static setCurrentUser(user: AdminUser): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  }

  static isAdminLoggedIn(): boolean {
    if (!this.isClient()) return false;
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  static setAdminLoggedIn(status: boolean): void {
    if (this.isClient()) {
      if (status) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      }
    }
  }

  // --- ACTIVITY LOGS ---
  static getActivityLogs(): ActivityLog[] {
    if (!this.isClient()) return initialActivityLogs;
    const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(initialActivityLogs));
      return initialActivityLogs;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialActivityLogs;
    }
  }

  static addActivityLog(action: string, module: string, details: string): void {
    const user = this.getCurrentUser();
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user_email: user.email || 'admin@misyuriyahpebatan.sch.id',
      role: user.role || 'superadmin',
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
    };
    const updated = [newLog, ...logs.slice(0, 99)]; // Keep last 100 logs
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    }
  }

  // --- VISITOR STATS ---
  static getVisitorStats(): VisitorStats[] {
    if (!this.isClient()) return initialVisitorStats;
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialVisitorStats));
      return initialVisitorStats;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialVisitorStats;
    }
  }

  static recordPageView(isPpdb = false): void {
    if (!this.isClient()) return;
    const stats = this.getVisitorStats();
    const todayStr = new Date().toISOString().split('T')[0];
    const todayIndex = stats.findIndex((s) => s.date === todayStr);

    if (todayIndex >= 0) {
      stats[todayIndex].page_views += 1;
      if (isPpdb) stats[todayIndex].ppdb_views += 1;
    } else {
      stats.push({
        date: todayStr,
        page_views: 1,
        unique_visitors: 1,
        ppdb_views: isPpdb ? 1 : 0,
      });
    }

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }

  // --- EXPORT / IMPORT BACKUP JSON ---
  static exportBackupJson(): string {
    const backupData = {
      version: '2.0',
      exported_at: new Date().toISOString(),
      news: this.getNews(),
      staff: this.getStaff(),
      gallery: this.getGallery(),
      messages: this.getMessages(),
      pages: this.getPagesContent(),
      settings: this.getSettings(),
      ppdb: this.getPpdbList(),
      testimonials: this.getTestimonials(),
      achievements: this.getAchievements(),
      documents: this.getDocuments(),
      admin_users: this.getAdminUsers(),
      activity_logs: this.getActivityLogs(),
      visitor_stats: this.getVisitorStats(),
    };
    return JSON.stringify(backupData, null, 2);
  }

  static importBackupJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.news) this.saveNews(data.news);
      if (data.staff) this.saveStaff(data.staff);
      if (data.gallery) this.saveGallery(data.gallery);
      if (data.messages) this.saveMessages(data.messages);
      if (data.pages) this.savePagesContent(data.pages);
      if (data.settings) this.saveSettings(data.settings);
      if (data.ppdb) this.savePpdbList(data.ppdb);
      if (data.testimonials) this.saveTestimonials(data.testimonials);
      if (data.achievements) this.saveAchievements(data.achievements);
      if (data.documents) this.saveDocuments(data.documents);
      if (data.admin_users) this.saveAdminUsers(data.admin_users);
      this.addActivityLog('Restorasi Backup', 'Sistem', 'Memulihkan database dari file JSON backup.');
      return true;
    } catch {
      return false;
    }
  }

  // --- REAL-TIME SUPABASE SYNC & HYDRATION ---
  static async syncAllToSupabase(): Promise<{ success: boolean; details: string[] }> {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        details: ['Database Supabase belum dikonfigurasi. Periksa environment variable.'],
      };
    }

    const logs: string[] = [];
    try {
      // 1. Settings
      const settings = this.getSettings();
      const { error: errSettings } = await supabase
        .from('settings')
        .upsert({ id: 'main_settings', ...settings });
      if (errSettings) logs.push(`❌ Settings: ${errSettings.message}`);
      else logs.push('✅ Settings: Berhasil diunggah ke Supabase');

      // 2. Pages
      const pages = this.getPagesContent();
      const { error: errPages } = await supabase
        .from('pages')
        .upsert({ id: 'main_pages', content: pages, updated_at: new Date().toISOString() });
      if (errPages) logs.push(`❌ Pages: ${errPages.message}`);
      else logs.push('✅ Pages Content: Berhasil diunggah ke Supabase');

      // 3. News
      const news = this.getNews();
      if (news.length > 0) {
        const { error: errNews } = await supabase.from('news').upsert(news);
        if (errNews) logs.push(`❌ News: ${errNews.message}`);
        else logs.push(`✅ News (${news.length} item): Berhasil diunggah ke Supabase`);
      }

      // 4. Staff
      const staff = this.getStaff();
      if (staff.length > 0) {
        const { error: errStaff } = await supabase.from('staff').upsert(staff);
        if (errStaff) logs.push(`❌ Staff: ${errStaff.message}`);
        else logs.push(`✅ Staff (${staff.length} orang): Berhasil diunggah ke Supabase`);
      }

      // 5. Gallery
      const gallery = this.getGallery();
      if (gallery.length > 0) {
        const { error: errGallery } = await supabase.from('gallery').upsert(gallery);
        if (errGallery) logs.push(`❌ Gallery: ${errGallery.message}`);
        else logs.push(`✅ Gallery (${gallery.length} foto): Berhasil diunggah ke Supabase`);
      }

      // 6. Messages
      const messages = this.getMessages();
      if (messages.length > 0) {
        const { error: errMsg } = await supabase.from('messages').upsert(messages);
        if (errMsg) logs.push(`❌ Messages: ${errMsg.message}`);
        else logs.push(`✅ Messages (${messages.length} pesan): Berhasil diunggah ke Supabase`);
      }

      // 7. PPDB
      const ppdb = this.getPpdbList();
      if (ppdb.length > 0) {
        const { error: errPpdb } = await supabase.from('ppdb').upsert(ppdb);
        if (errPpdb) logs.push(`❌ PPDB: ${errPpdb.message}`);
        else logs.push(`✅ PPDB (${ppdb.length} pendaftar): Berhasil diunggah ke Supabase`);
      }

      // 8. Testimonials
      const testimonials = this.getTestimonials();
      if (testimonials.length > 0) {
        const { error: errTesti } = await supabase.from('testimonials').upsert(testimonials);
        if (errTesti) logs.push(`❌ Testimonials: ${errTesti.message}`);
        else logs.push(`✅ Testimonials (${testimonials.length} ulasan): Berhasil diunggah ke Supabase`);
      }

      // 9. Achievements
      const achievements = this.getAchievements();
      if (achievements.length > 0) {
        const { error: errAch } = await supabase.from('achievements').upsert(achievements);
        if (errAch) logs.push(`❌ Achievements: ${errAch.message}`);
        else logs.push(`✅ Achievements (${achievements.length} prestasi): Berhasil diunggah ke Supabase`);
      }

      // 10. Documents
      const documents = this.getDocuments();
      if (documents.length > 0) {
        const { error: errDocs } = await supabase.from('documents').upsert(documents);
        if (errDocs) logs.push(`❌ Documents: ${errDocs.message}`);
        else logs.push(`✅ Documents (${documents.length} berkas): Berhasil diunggah ke Supabase`);
      }

      // 11. Admin Users
      const adminUsers = this.getAdminUsers();
      if (adminUsers.length > 0) {
        const { error: errUsers } = await supabase.from('admin_users').upsert(adminUsers);
        if (errUsers) logs.push(`❌ Admin Users: ${errUsers.message}`);
        else logs.push(`✅ Admin Users (${adminUsers.length} user): Berhasil diunggah ke Supabase`);
      }

      const hasError = logs.some((l) => l.startsWith('❌'));
      return { success: !hasError, details: logs };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, details: [...logs, `❌ Gagal sinkronisasi: ${msg}`] };
    }
  }

  static async fetchFromSupabase(): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { data: sData } = await supabase.from('settings').select('*').single();
      if (sData) {
        const { id, created_at, ...cleanSettings } = sData;
        this.saveSettings(cleanSettings as SchoolSettings);
      }

      const { data: pData } = await supabase.from('pages').select('content').single();
      if (pData?.content) {
        this.savePagesContent(pData.content as StaticPagesContent);
      }

      const { data: nData } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      if (nData && nData.length > 0) {
        this.saveNews(nData as NewsItem[]);
      }

      const { data: stData } = await supabase.from('staff').select('*').order('order_index', { ascending: true });
      if (stData && stData.length > 0) {
        this.saveStaff(stData as StaffItem[]);
      }

      const { data: gData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (gData && gData.length > 0) {
        this.saveGallery(gData as GalleryItem[]);
      }

      const { data: mData } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (mData && mData.length > 0) {
        this.saveMessages(mData as ContactMessage[]);
      }

      const { data: ppData } = await supabase.from('ppdb').select('*').order('created_at', { ascending: false });
      if (ppData && ppData.length > 0) {
        this.savePpdbList(ppData as PpdbRegistration[]);
      }

      const { data: tData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (tData && tData.length > 0) {
        this.saveTestimonials(tData as Testimonial[]);
      }

      const { data: aData } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
      if (aData && aData.length > 0) {
        this.saveAchievements(aData as Achievement[]);
      }

      const { data: dData } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
      if (dData && dData.length > 0) {
        this.saveDocuments(dData as DownloadDocument[]);
      }

      return true;
    } catch (e) {
      console.error('Failed fetching from Supabase:', e);
      return false;
    }
  }

  // --- REAL-TIME FIREBASE FIRESTORE SYNC & HYDRATION ---
  static async syncAllToFirebase(): Promise<{ success: boolean; details: string[] }> {
    if (!isFirebaseConfigured()) {
      return {
        success: false,
        details: ['Firebase belum dikonfigurasi.'],
      };
    }

    const logs: string[] = [];
    try {
      // 1. Settings
      try {
        const settings = this.getSettings();
        await setDoc(doc(db, 'settings', 'main_settings'), settings);
        logs.push('✅ Settings: Berhasil diunggah ke Firebase Firestore');
      } catch (err) {
        logs.push(`❌ Settings Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 2. Pages
      try {
        const pages = this.getPagesContent();
        await setDoc(doc(db, 'pages', 'main_pages'), { content: pages, updated_at: new Date().toISOString() });
        logs.push('✅ Pages: Berhasil diunggah ke Firebase Firestore');
      } catch (err) {
        logs.push(`❌ Pages Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 3. News
      try {
        const news = this.getNews();
        for (const item of news) {
          await setDoc(doc(db, 'news', item.id), item);
        }
        logs.push(`✅ News (${news.length} item): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ News Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 4. Staff
      try {
        const staff = this.getStaff();
        for (const item of staff) {
          await setDoc(doc(db, 'staff', item.id), item);
        }
        logs.push(`✅ Staff (${staff.length} orang): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Staff Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 5. Gallery
      try {
        const gallery = this.getGallery();
        for (const item of gallery) {
          await setDoc(doc(db, 'gallery', item.id), item);
        }
        logs.push(`✅ Gallery (${gallery.length} foto): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Gallery Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 6. Messages
      try {
        const messages = this.getMessages();
        for (const item of messages) {
          await setDoc(doc(db, 'messages', item.id), item);
        }
        logs.push(`✅ Messages (${messages.length} pesan): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Messages Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 7. PPDB
      try {
        const ppdb = this.getPpdbList();
        for (const item of ppdb) {
          await setDoc(doc(db, 'ppdb', item.id), item);
        }
        logs.push(`✅ PPDB (${ppdb.length} pendaftar): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ PPDB Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 8. Testimonials
      try {
        const testimonials = this.getTestimonials();
        for (const item of testimonials) {
          await setDoc(doc(db, 'testimonials', item.id), item);
        }
        logs.push(`✅ Testimonials (${testimonials.length} ulasan): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Testimonials Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 9. Achievements
      try {
        const achievements = this.getAchievements();
        for (const item of achievements) {
          await setDoc(doc(db, 'achievements', item.id), item);
        }
        logs.push(`✅ Achievements (${achievements.length} prestasi): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Achievements Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 10. Documents
      try {
        const documents = this.getDocuments();
        for (const item of documents) {
          await setDoc(doc(db, 'documents', item.id), item);
        }
        logs.push(`✅ Documents (${documents.length} berkas): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Documents Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      // 11. Admin Users
      try {
        const adminUsers = this.getAdminUsers();
        for (const item of adminUsers) {
          await setDoc(doc(db, 'admin_users', item.id), item);
        }
        logs.push(`✅ Admin Users (${adminUsers.length} user): Berhasil diunggah ke Firebase Firestore`);
      } catch (err) {
        logs.push(`❌ Admin Users Firebase: ${err instanceof Error ? err.message : String(err)}`);
      }

      const hasError = logs.some((l) => l.startsWith('❌'));
      return { success: !hasError, details: logs };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, details: [...logs, `❌ Gagal sinkronisasi Firebase: ${msg}`] };
    }
  }

  static async fetchFromFirebase(): Promise<boolean> {
    if (!isFirebaseConfigured()) return false;

    try {
      // 1. Settings
      try {
        const sSnap = await getDoc(doc(db, 'settings', 'main_settings'));
        if (sSnap.exists()) {
          this.saveSettings(sSnap.data() as SchoolSettings);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'settings');
      }

      // 2. Pages
      try {
        const pSnap = await getDoc(doc(db, 'pages', 'main_pages'));
        if (pSnap.exists() && pSnap.data()?.content) {
          this.savePagesContent(pSnap.data().content as StaticPagesContent);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'pages');
      }

      // 3. News
      try {
        const nSnap = await getDocs(collection(db, 'news'));
        if (!nSnap.empty) {
          const list = nSnap.docs.map(d => d.data() as NewsItem);
          this.saveNews(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'news');
      }

      // 4. Staff
      try {
        const stSnap = await getDocs(collection(db, 'staff'));
        if (!stSnap.empty) {
          const list = stSnap.docs.map(d => d.data() as StaffItem);
          this.saveStaff(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'staff');
      }

      // 5. Gallery
      try {
        const gSnap = await getDocs(collection(db, 'gallery'));
        if (!gSnap.empty) {
          const list = gSnap.docs.map(d => d.data() as GalleryItem);
          this.saveGallery(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'gallery');
      }

      // 6. Messages
      try {
        const mSnap = await getDocs(collection(db, 'messages'));
        if (!mSnap.empty) {
          const list = mSnap.docs.map(d => d.data() as ContactMessage);
          this.saveMessages(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'messages');
      }

      // 7. PPDB
      try {
        const ppSnap = await getDocs(collection(db, 'ppdb'));
        if (!ppSnap.empty) {
          const list = ppSnap.docs.map(d => d.data() as PpdbRegistration);
          this.savePpdbList(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'ppdb');
      }

      // 8. Testimonials
      try {
        const tSnap = await getDocs(collection(db, 'testimonials'));
        if (!tSnap.empty) {
          const list = tSnap.docs.map(d => d.data() as Testimonial);
          this.saveTestimonials(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'testimonials');
      }

      // 9. Achievements
      try {
        const aSnap = await getDocs(collection(db, 'achievements'));
        if (!aSnap.empty) {
          const list = aSnap.docs.map(d => d.data() as Achievement);
          this.saveAchievements(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'achievements');
      }

      // 10. Documents
      try {
        const dSnap = await getDocs(collection(db, 'documents'));
        if (!dSnap.empty) {
          const list = dSnap.docs.map(d => d.data() as DownloadDocument);
          this.saveDocuments(list);
        }
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'documents');
      }

      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.toLowerCase().includes('offline') && !msg.toLowerCase().includes("didn't respond")) {
        console.error('Failed fetching from Firebase Firestore:', e);
      } else {
        console.warn('Firebase Firestore is offline. Continuing with local storage cache.');
      }
      return false;
    }
  }

  // --- SUPABASE FULL SQL SCHEMA GENERATOR ---
  static generateSupabaseSqlSchema(): string {
    return `-- =========================================================
-- SKEMA DATABASE SUPABASE RESMI & AUTO-FIX RLS + MIGRATION
-- MI SYURIYAH PEBATAN (PERIODE 2026/2027)
-- =========================================================

-- 1. TABEL SETTINGS & ALTER COLUMN MIGRATION
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'main_settings',
  school_name TEXT NOT NULL,
  school_tagline TEXT,
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  maps_iframe_url TEXT,
  headmaster_name TEXT,
  npsn TEXT,
  akreditasi TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  hero_banner_url TEXT,
  ppdb_year TEXT,
  primary_theme_color TEXT,
  total_siswa_aktif TEXT,
  total_siswi_aktif TEXT,
  tingkat_kelulusan TEXT,
  total_guru_staf TEXT,
  nilai_akreditasi_bansm TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrasi Kolom Tambahan Jika Tabel Sudah Ada Sebelumnya
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS total_siswa_aktif TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS total_siswi_aktif TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS tingkat_kelulusan TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS total_guru_staf TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS nilai_akreditasi_bansm TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS maps_iframe_url TEXT;

-- 2. TABEL PAGES
CREATE TABLE IF NOT EXISTS public.pages (
  id TEXT PRIMARY KEY DEFAULT 'main_pages',
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL NEWS
CREATE TABLE IF NOT EXISTS public.news (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'Admin Sekolah',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  views INT DEFAULT 0
);

-- 4. TABEL STAFF
CREATE TABLE IF NOT EXISTS public.staff (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  nip_ntp TEXT,
  subject TEXT,
  education TEXT,
  image_url TEXT,
  order_index INT DEFAULT 1,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL GALLERY
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email_or_phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

-- 7. TABEL PPDB
CREATE TABLE IF NOT EXISTS public.ppdb (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reg_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  nisn_nik TEXT,
  gender CHAR(1),
  birth_place TEXT,
  birth_date DATE,
  previous_school TEXT,
  hobby TEXT,
  cita_cita TEXT,
  parent_name TEXT NOT NULL,
  father_occupation TEXT,
  mother_name TEXT,
  mother_occupation TEXT,
  phone_number TEXT NOT NULL,
  address TEXT,
  doc_kk_url TEXT,
  doc_akta_url TEXT,
  doc_foto_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Pending',
  admin_notes TEXT
);

-- 8. TABEL TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABEL ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  winner_name TEXT NOT NULL,
  level TEXT,
  date DATE DEFAULT CURRENT_DATE,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TABEL DOCUMENTS
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'PDF',
  file_size TEXT,
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABEL ADMIN_USERS & LOGS
CREATE TABLE IF NOT EXISTS public.admin_users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  password_hash TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_email TEXT NOT NULL,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (AKTIFKAN RLS DENGAN IZIN AKSES PUBLIK ANON & AUTHENTICATED)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ppdb ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- BUAT POLICY PERMISSIVE AGAR APLIKASI WEB BERJALAN LANCAR TANPA ERROR SECURITY
DROP POLICY IF EXISTS "Public access settings" ON public.settings;
CREATE POLICY "Public access settings" ON public.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access pages" ON public.pages;
CREATE POLICY "Public access pages" ON public.pages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access news" ON public.news;
CREATE POLICY "Public access news" ON public.news FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access staff" ON public.staff;
CREATE POLICY "Public access staff" ON public.staff FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access gallery" ON public.gallery;
CREATE POLICY "Public access gallery" ON public.gallery FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access messages" ON public.messages;
CREATE POLICY "Public access messages" ON public.messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access ppdb" ON public.ppdb;
CREATE POLICY "Public access ppdb" ON public.ppdb FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access testimonials" ON public.testimonials;
CREATE POLICY "Public access testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access achievements" ON public.achievements;
CREATE POLICY "Public access achievements" ON public.achievements FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access documents" ON public.documents;
CREATE POLICY "Public access documents" ON public.documents FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access admin_users" ON public.admin_users;
CREATE POLICY "Public access admin_users" ON public.admin_users FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access activity_logs" ON public.activity_logs;
CREATE POLICY "Public access activity_logs" ON public.activity_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- KELOLA HAK AKSES PERMISSIONS SCHEMA PUBLIC
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, postgres, service_role;

-- REFRESH SCHEMA CACHE SUPABASE
NOTIFY pgrst, 'reload schema';
`;
  }
}
