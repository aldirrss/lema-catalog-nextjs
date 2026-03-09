/**
 * translations.ts
 * ---------------
 * Kamus terjemahan untuk semua teks di UI.
 * Tambah bahasa baru: tambah entry di LANGUAGES dan objek di translations.
 */

export type LangCode = 'en' | 'id' | 'ar';

export type LangDef = {
  code: LangCode;
  label: string;       // Nama bahasa dalam bahasa itu sendiri
  flag: string;        // Emoji bendera
  dir: 'ltr' | 'rtl'; // Text direction
};

export const LANGUAGES: LangDef[] = [
  { code: 'en', label: 'English',  flag: '🇺🇸', dir: 'ltr' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'ar', label: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
];

export type TranslationKeys = {
  // Navbar
  nav: {
    home: string;
    catalog: string;
    about: string;
    forum: string;
    contact: string;
    getInTouch: string;
  };
  // Homepage
  home: {
    featuredModules: string;
    featuredSubtitle: string;
    viewAll: string;
    latestModules: string;
    latestSubtitle: string;
    browseAll: string;
    seeAllModules: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  // Catalog
  catalog: {
    title: string;
    modulesAvailable: string;
    module: string;
    modules: string;
    noModulesFound: string;
    noModulesDesc: string;
    searchPlaceholder: string;
    allCategories: string;
    allVersions: string;
    filter: string;
  };
  // Module detail
  module: {
    screenshots: string;
    description: string;
    features: string;
    requestDemo: string;
    contactUs: string;
    documentation: string;
    price: string;
    free: string;
    oneTimePurchase: string;
    odooVersion: string;
    category: string;
    publishedOn: string;
    backToCatalog: string;
  };
  // Footer
  footer: {
    tagline: string;
    products: string;
    moduleCatalog: string;
    company: string;
    aboutUs: string;
    allRightsReserved: string;
  };
  // About
  about: {
    title: string;
    subtitle: string;
    ourMission: string;
    whatWeDo: string;
    meetTeam: string;
    workWithUs: string;
    readyToStart: string;
    readySubtitle: string;
    browseCatalog: string;
    yearsExp: string;
    happyClients: string;
    modulesPublished: string;
    avgRating: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    company: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successMsg: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    notFound: string;
    backHome: string;
    featured: string;
  };
};

export const translations: Record<LangCode, TranslationKeys> = {
  // ----------------------------------------------------------------
  // ENGLISH
  // ----------------------------------------------------------------
  en: {
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      about: 'About',
      forum: 'Forum',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    home: {
      featuredModules: 'Featured Modules',
      featuredSubtitle: 'Our most popular and highly-rated modules.',
      viewAll: 'View all →',
      latestModules: 'Latest Modules',
      latestSubtitle: 'Recently published modules ready to install.',
      browseAll: 'Browse all →',
      seeAllModules: 'See All Modules',
    },
    hero: {
      title: 'Lema Core Technologies',
      subtitle: 'Odoo Development Experts',
      cta: 'Discover premium Odoo modules crafted for Indonesian businesses. From accounting compliance to HR automation — we build it all.',
    },
    catalog: {
      title: 'Module Catalog',
      modulesAvailable: 'modules available',
      module: 'module',
      modules: 'modules',
      noModulesFound: 'No modules found',
      noModulesDesc: 'Try adjusting your search or filters.',
      searchPlaceholder: 'Search modules...',
      allCategories: 'All Categories',
      allVersions: 'All Versions',
      filter: 'Filter',
    },
    module: {
      screenshots: 'Screenshots',
      description: 'Description',
      features: 'Features',
      requestDemo: 'Request Demo',
      contactUs: 'Contact Us',
      documentation: 'Documentation',
      price: 'Price',
      free: 'Free',
      oneTimePurchase: 'One-time purchase',
      odooVersion: 'Odoo Version',
      category: 'Category',
      publishedOn: 'Published',
      backToCatalog: '← Back to Catalog',
    },
    footer: {
      tagline: 'Your trusted for Odoo development, customization, and ERP implementation.',
      products: 'Products',
      moduleCatalog: 'Module Catalog',
      company: 'Company',
      aboutUs: 'About Us',
      allRightsReserved: 'All rights reserved.',
    },
    about: {
      title: 'About Lema Core Technologies',
      subtitle: 'We are a technology company specializing in Odoo ERP solutions.',
      ourMission: 'Our Mission',
      whatWeDo: 'What We Do',
      meetTeam: 'Meet the Team',
      workWithUs: 'Work With Us',
      readyToStart: 'Ready to get started?',
      readySubtitle: 'Explore our module catalog or reach out to our team.',
      browseCatalog: 'Browse Catalog',
      yearsExp: 'Years of Experience',
      happyClients: 'Happy Clients',
      modulesPublished: 'Modules Published',
      avgRating: 'Average Rating',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Have a project in mind? We'd love to hear from you.",
      name: 'Full Name',
      email: 'Email Address',
      company: 'Company (optional)',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message sent!',
      successMsg: "We'll get back to you within 1–2 business days.",
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong.',
      notFound: 'Page not found.',
      backHome: 'Back to Home',
      featured: 'Featured',
    },
  },

  // ----------------------------------------------------------------
  // INDONESIA
  // ----------------------------------------------------------------
  id: {
    nav: {
      home: 'Beranda',
      catalog: 'Katalog',
      about: 'Tentang',
      forum: 'Forum',
      contact: 'Kontak',
      getInTouch: 'Hubungi Kami',
    },
    home: {
      featuredModules: 'Modul Unggulan',
      featuredSubtitle: 'Modul paling populer dan memiliki rating tertinggi.',
      viewAll: 'Lihat semua →',
      latestModules: 'Modul Terbaru',
      latestSubtitle: 'Modul yang baru diterbitkan dan siap diinstal.',
      browseAll: 'Lihat semua →',
      seeAllModules: 'Lihat Semua Modul',
    },
    hero: {
      title: 'Lema Core Technologies',
      subtitle: 'Ahli Pengembangan Odoo',
      cta: 'Temukan modul Odoo premium yang dibuat untuk bisnis Indonesia. Dari kepatuhan akuntansi hingga otomatisasi HR — kami membangun semuanya.',
    },
    catalog: {
      title: 'Katalog Modul',
      modulesAvailable: 'modul tersedia',
      module: 'modul',
      modules: 'modul',
      noModulesFound: 'Modul tidak ditemukan',
      noModulesDesc: 'Coba ubah kata kunci pencarian atau filter Anda.',
      searchPlaceholder: 'Cari modul...',
      allCategories: 'Semua Kategori',
      allVersions: 'Semua Versi',
      filter: 'Filter',
    },
    module: {
      screenshots: 'Tangkapan Layar',
      description: 'Deskripsi',
      features: 'Fitur',
      requestDemo: 'Minta Demo',
      contactUs: 'Hubungi Kami',
      documentation: 'Dokumentasi',
      price: 'Harga',
      free: 'Gratis',
      oneTimePurchase: 'Pembelian sekali bayar',
      odooVersion: 'Versi Odoo',
      category: 'Kategori',
      publishedOn: 'Diterbitkan',
      backToCatalog: '← Kembali ke Katalog',
    },
    footer: {
      tagline: 'Mitra terpercaya Anda untuk pengembangan, kustomisasi, dan implementasi Odoo ERP.',
      products: 'Produk',
      moduleCatalog: 'Katalog Modul',
      company: 'Perusahaan',
      aboutUs: 'Tentang Kami',
      allRightsReserved: 'Hak cipta dilindungi.',
    },
    about: {
      title: 'Tentang Lema Core Technologies',
      subtitle: 'Kami adalah perusahaan teknologi yang berspesialisasi dalam solusi Odoo ERP.',
      ourMission: 'Misi Kami',
      whatWeDo: 'Layanan Kami',
      meetTeam: 'Tim Kami',
      workWithUs: 'Bergabung Bersama Kami',
      readyToStart: 'Siap untuk memulai?',
      readySubtitle: 'Jelajahi katalog modul kami atau hubungi tim kami.',
      browseCatalog: 'Jelajahi Katalog',
      yearsExp: 'Tahun Pengalaman',
      happyClients: 'Klien Puas',
      modulesPublished: 'Modul Diterbitkan',
      avgRating: 'Rating Rata-rata',
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Punya proyek? Kami siap mendengarkan.',
      name: 'Nama Lengkap',
      email: 'Alamat Email',
      company: 'Perusahaan (opsional)',
      message: 'Pesan',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      successTitle: 'Pesan terkirim!',
      successMsg: 'Kami akan merespons dalam 1–2 hari kerja.',
    },
    common: {
      loading: 'Memuat...',
      error: 'Terjadi kesalahan.',
      notFound: 'Halaman tidak ditemukan.',
      backHome: 'Kembali ke Beranda',
      featured: 'Unggulan',
    },
  },

  // ----------------------------------------------------------------
  // ARABIC (RTL)
  // ----------------------------------------------------------------
  ar: {
    nav: {
      home: 'الرئيسية',
      catalog: 'الكتالوج',
      about: 'عن الشركة',
      forum: 'المنتدى',
      contact: 'تواصل',
      getInTouch: 'تواصل معنا',
    },
    home: {
      featuredModules: 'الوحدات المميزة',
      featuredSubtitle: 'أكثر وحداتنا شعبية وتقييماً.',
      viewAll: '← عرض الكل',
      latestModules: 'أحدث الوحدات',
      latestSubtitle: 'وحدات حديثة جاهزة للتثبيت.',
      browseAll: '← تصفح الكل',
      seeAllModules: 'عرض جميع الوحدات',
    },
    hero: {
      title: 'ليما كور تكنولوجيز',
      subtitle: 'خبراء تطوير أودو',
      cta: 'اكتشف وحدات أودو المميزة المصممة للأعمال في إندونيسيا. من الامتثال المحاسبي إلى أتمتة الموارد البشرية — نحن نبني كل شيء.',
    },
    catalog: {
      title: 'كتالوج الوحدات',
      modulesAvailable: 'وحدة متاحة',
      module: 'وحدة',
      modules: 'وحدات',
      noModulesFound: 'لا توجد وحدات',
      noModulesDesc: 'حاول تعديل بحثك أو المرشحات.',
      searchPlaceholder: 'ابحث عن وحدات...',
      allCategories: 'جميع الفئات',
      allVersions: 'جميع الإصدارات',
      filter: 'تصفية',
    },
    module: {
      screenshots: 'لقطات الشاشة',
      description: 'الوصف',
      features: 'المميزات',
      requestDemo: 'طلب عرض تجريبي',
      contactUs: 'تواصل معنا',
      documentation: 'التوثيق',
      price: 'السعر',
      free: 'مجاني',
      oneTimePurchase: 'دفعة واحدة',
      odooVersion: 'إصدار أودو',
      category: 'الفئة',
      publishedOn: 'نُشر في',
      backToCatalog: 'العودة إلى الكتالوج →',
    },
    footer: {
      tagline: 'شريكك الموثوق لتطوير وتخصيص وتطبيق أودو ERP.',
      products: 'المنتجات',
      moduleCatalog: 'كتالوج الوحدات',
      company: 'الشركة',
      aboutUs: 'من نحن',
      allRightsReserved: 'جميع الحقوق محفوظة.',
    },
    about: {
      title: 'عن ليما كور تكنولوجيز',
      subtitle: 'نحن شركة تقنية متخصصة في حلول أودو ERP.',
      ourMission: 'مهمتنا',
      whatWeDo: 'ما نقدمه',
      meetTeam: 'فريقنا',
      workWithUs: 'اعمل معنا',
      readyToStart: 'هل أنت مستعد للبدء؟',
      readySubtitle: 'استكشف كتالوج الوحدات أو تواصل مع فريقنا.',
      browseCatalog: 'تصفح الكتالوج',
      yearsExp: 'سنوات خبرة',
      happyClients: 'عميل سعيد',
      modulesPublished: 'وحدة منشورة',
      avgRating: 'متوسط التقييم',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'هل لديك مشروع؟ نحن نود سماع منك.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      company: 'الشركة (اختياري)',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      successTitle: 'تم إرسال الرسالة!',
      successMsg: 'سنرد عليك خلال 1–2 أيام عمل.',
    },
    common: {
      loading: 'جارٍ التحميل...',
      error: 'حدث خطأ ما.',
      notFound: 'الصفحة غير موجودة.',
      backHome: 'العودة إلى الرئيسية',
      featured: 'مميز',
    },
  },
};