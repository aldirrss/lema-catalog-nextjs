/**
 * translations.ts
 * ---------------
 * Dictionary of all translatable strings in the app, organized by page/section.
 * Includes type definitions for language codes and translation keys.
 * This file is the single source of truth for all text content, making it easy to manage and extend translations.
 */

export type LangCode = 'en' | 'id' | 'ar';

export type LangDef = {
  code: LangCode;
  label: string;       // Name of the language in the language itself
  flag: string;        // Flag emoji
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
    buttonBrowse: string;
    buttonContact: string;
    published: string;
    clients: string;
    experience: string;
    avgRating: string;
    trustBadge: string;
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
    filterLabels: {
      search: string;
      category: string;
      version: string;
      price: string;
      sortBy: string;
    };
    sortOptions: {
      newest: string;
      oldest: string;
      nameAsc: string;
      nameDesc: string;
      priceAsc: string;
      priceDesc: string;
      ratingDesc: string;
      topPurchase: string;
    };
    priceOptions: {
      all: string;
      free: string;
      paid: string;
    };
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
    prev: string;
    next: string;
    selectVersion: string;
    downloadTitle: string;
    downloadSubtitle: string;
    buyNow: string;
    getDownloadLink: string;
    noScreenshots: string;
    noFeatures: string;
    noDescription: string;
    downloads: string;
    purchases: string;
    technicalName: string;
    comingSoon: string;
    purchase: {
      title: string;
      subtitle: string;
      formName: string;
      formEmail: string;
      formEmailDesc: string;
      confirm: string;
      processing: string;
      success: string;
      error: string;
      total: string;
      chatWhatsApp: string;
      sendEmail: string;
      cancel: string;
      waMessage: string;
      emailSubject: string;
      emailBody: string;
    };
    review: {
      title: string;
      noReviews: string;
      beFirst: string;
      reviews: string;
      review: string;
      showing: string;
      of: string;
      leaveReview: string;
      yourRating: string;
      name: string;
      emailOptional: string;
      comment: string;
      commentPlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      errorFields: string;
    };
    faq: {
      title: string;
      noFaq: string;
    };
    otherModules: string;
    license: string;
    noLicense: string;
    overview: string;
    releaseNotes: string;
    noReleaseNotes: string;
    aboutModule: string;
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
    missionDescription1: string;
    missionDescription2: string;
    missionDescription3: string;
    whatWeDo: string;
    meetTeam: string;
    team: {
      aldi: { role: string };
      herul: { role: string };
    };
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
    getInTouch: string;
    getInTouchDesc: string;
    email: string;
    whatsapp: string;
    location: string;
    locationValue: string;
    responseTime: string;
    responseTimeDesc: string;
    sendMessage: string;
    name: string;
    emailLabel: string;
    company: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successMsg: string;
  };
  // Forum
  forum: {
    title: string;
    subtitle: string;
    startDiscussion: string;
    placeholder: string;
    post: string;
    reply: string;
    replies: string;
    noDiscussions: string;
    noDiscussionsDesc: string;
    identity: {
      postingAs: string;
      change: string;
      updateIdentity: string;
      whoAreYou: string;
      yourName: string;
      emailOptional: string;
      save: string;
    };
    newThread: {
      title: string;
      body: string;
      posting: string;
    };
    thread: {
      pinned: string;
      closed: string;
      closedMessage: string;
      writeReply: string;
      setIdentityToReply: string;
    };
  };
  // Common
  common: {
    loading: string;
    error: string;
    notFound: string;
    backHome: string;
    featured: string;
  };
  // Services
  services: {
    title: string;
    subtitle: string;
    items: {
      development: { title: string; description: string };
      customization: { title: string; description: string };
      integration: { title: string; description: string };
      implementation: { title: string; description: string };
    };
  };
  // CTA
  cta: {
    title: string;
    subtitle: string;
    buttonExplore: string;
    buttonContact: string;
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
      buttonBrowse: 'Browse Catalog',
      buttonContact: 'Talk to an Expert',
      published: 'Modules Published',
      clients: 'Happy Clients',
      experience: 'Years of Experience',
      avgRating: 'Average Rating',
      trustBadge: 'Trust your business system to us ❤️',
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
      filterLabels: {
        search: 'Search modules...',
        category: 'All Categories',
        version: 'All Versions',
        price: 'All Prices',
        sortBy: 'Sort By',
      },
      sortOptions: {
        newest: 'Newest',
        oldest: 'Oldest',
        nameAsc: 'Name A → Z',
        nameDesc: 'Name Z → A',
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        ratingDesc: 'Top Rated',
        topPurchase: 'Top Purchase',
      },
      priceOptions: {
        all: 'All Prices',
        free: 'Free',
        paid: 'Paid',
      },
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
      backToCatalog: 'Back to Catalog',
      prev: 'Previous',
      next: 'Next',
      selectVersion: 'Select Odoo Version',
      downloadTitle: 'Download Module',
      downloadSubtitle: 'Get the latest source code for your Odoo version.',
      buyNow: 'Buy Now',
      getDownloadLink: 'Get Download Link',
      noScreenshots: 'No screenshots available.',
      noFeatures: 'No features listed.',
      noDescription: 'No description available.',
      downloads: 'Downloads',
      purchases: 'Purchases',
      technicalName: 'Technical Name',
      comingSoon: 'Coming Soon',
      purchase: {
        title: 'Purchase Module',
        subtitle: 'Enter your details to receive the download link and invoice.',
        formName: 'Full Name',
        formEmail: 'Email Address',
        formEmailDesc: 'We\'ll send the module zip to this address.',
        confirm: 'Confirm Purchase',
        processing: 'Processing...',
        success: 'Thank you! Check your email for the download link.',
        error: 'Something went wrong. Please try again or contact support.',
        total: 'Total',
        chatWhatsApp: 'Chat on WhatsApp',
        sendEmail: 'Send Email',
        cancel: 'Cancel',
        waMessage: 'Hi, I\'m interested in purchasing the module *{name}* ({version}).\nPrice: {price}\nPlease assist me with the purchase.',
        emailSubject: 'Purchase Inquiry: {name} ({version})',
        emailBody: 'Hello,\n\nI\'m interested in purchasing the following module:\n\nModule: {name}\nVersion: {version}\nPrice: {price}\n\nPlease provide more information on how to proceed.\n\nThank you.',
      },
      review: {
        title: 'Reviews & Feedback',
        noReviews: 'No reviews yet.',
        beFirst: 'Be the first to share your feedback on this module!',
        reviews: 'reviews',
        review: 'review',
        showing: 'Showing',
        of: 'of',
        leaveReview: 'Leave a Review',
        yourRating: 'Your Rating',
        name: 'Name',
        emailOptional: 'Email (optional)',
        comment: 'Comment',
        commentPlaceholder: 'Share your experience with this module...',
        submit: 'Submit',
        submitting: 'Submitting...',
        success: 'Thank you for your feedback!',
        errorFields: 'Please fill in your name, a comment, and a rating.',
      },
      faq: {
        title: 'FAQ',
        noFaq: 'No FAQs available.',
      },
      otherModules: '🧩 Other Modules',
      license: 'License',
      noLicense: 'No license information available.',
      overview: 'Overview',
      releaseNotes: 'Release Notes',
      noReleaseNotes: 'No release notes available.',
      aboutModule: 'About this module',
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
      subtitle: 'We are a technology company specializing in Odoo ERP solutions for Indonesian and global businesses.',
      ourMission: 'Our Mission',
      missionDescription1: 'Lema Core Technologies was founded with a clear mission: to make powerful ERP technology accessible and practical for businesses of all sizes in Indonesia and beyond.',
      missionDescription2: 'We believe that Odoo, when properly implemented and customized, can transform how businesses operate. Our team of certified Odoo developers brings years of hands-on experience across industries including retail, manufacturing, logistics, and professional services.',
      missionDescription3: 'Every module we publish in this catalog is the result of real client feedback and battle-tested in production environments — so you can deploy with confidence.',
      whatWeDo: 'What We Do',
      meetTeam: 'Our Team',
      team: {
        aldi: { role: 'Odoo Software Engineer' },
        herul: { role: 'Odoo Software Engineer' },
      },
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
      title: 'Contact Us',
      subtitle: 'Have a question or project in mind? We\'d love to hear from you.',
      getInTouch: 'Get in Touch',
      getInTouchDesc: 'Whether you need a custom Odoo module, have questions about our catalog, or want to discuss a full ERP implementation. Our team is here to help.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      location: 'Location',
      locationValue: 'South Jakarta, Jakarta, Indonesia',
      responseTime: 'Response Time',
      responseTimeDesc: 'We typically respond within 1 business day. For urgent inquiries, please reach us via WhatsApp.',
      sendMessage: 'Send a Message',
      name: 'Full Name',
      emailLabel: 'Email Address',
      company: 'Company (optional)',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message sent!',
      successMsg: "We'll get back to you within 1–2 business days.",
    },
    forum: {
      title: 'Community Forum',
      subtitle: 'Ask questions, share ideas, and discuss Lema Core Odoo modules.',
      startDiscussion: 'Start a Discussion',
      placeholder: "What's on your mind? Share ideas or ask questions about Lema Core modules...",
      post: 'Post Discussion',
      reply: 'Reply',
      replies: 'Replies',
      noDiscussions: 'No discussions yet',
      noDiscussionsDesc: 'Be the first to start a conversation!',
      identity: {
        postingAs: 'Posting as',
        change: 'Change',
        updateIdentity: 'Update your identity',
        whoAreYou: '👋 Who are you? (saved for this session)',
        yourName: 'Your name *',
        emailOptional: 'Email (optional)',
        save: 'Save',
      },
      newThread: {
        title: 'Title *',
        body: "What's on your mind? *",
        posting: 'Posting...',
      },
      thread: {
        pinned: 'Pinned',
        closed: 'Closed',
        closedMessage: 'This thread is closed.',
        writeReply: 'Write a reply...',
        setIdentityToReply: 'Set your name above to reply',
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong.',
      notFound: 'Page not found.',
      backHome: 'Back to Home',
      featured: 'Featured',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Odoo services to help your business grow and operate efficiently.',
      items: {
        development: {
          title: 'Odoo Development',
          description: 'Custom module development tailored to your business processes.',
        },
        customization: {
          title: 'Odoo Customization',
          description: 'Modify existing Odoo modules to perfectly match your workflow.',
        },
        integration: {
          title: 'Odoo Integration',
          description: 'Connect Odoo with external systems — e-commerce, payment gateways, and more.',
        },
        implementation: {
          title: 'ERP Implementation',
          description: 'End-to-end Odoo implementation with data migration and training.',
        },
      },
    },
    cta: {
      title: 'Ready to supercharge your Odoo?',
      subtitle: 'Let our experts build the perfect Odoo solution for your business.',
      buttonExplore: 'Explore Modules',
      buttonContact: 'Contact Us',
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
      buttonBrowse: 'Jelajahi Katalog',
      buttonContact: 'Hubungi Ahli',
      published: 'Modul Diterbitkan',
      clients: 'Klien Puas',
      experience: 'Tahun Pengalaman',
      avgRating: 'Rating Rata-rata',
      trustBadge: 'Percayakan sistem bisnis Anda kepada kami ❤️',
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
      filterLabels: {
        search: 'Cari modul...',
        category: 'Semua Kategori',
        version: 'Semua Versi',
        price: 'Semua Harga',
        sortBy: 'Urutkan Berdasarkan',
      },
      sortOptions: {
        newest: 'Terbaru',
        oldest: 'Terlama',
        nameAsc: 'Nama A → Z',
        nameDesc: 'Nama Z → A',
        priceAsc: 'Harga: Rendah ke Tinggi',
        priceDesc: 'Harga: Tinggi ke Rendah',
        ratingDesc: 'Rating Tertinggi',
        topPurchase: 'Pembelian Terbanyak',
      },
      priceOptions: {
        all: 'Semua Harga',
        free: 'Gratis',
        paid: 'Berbayar',
      },
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
      backToCatalog: 'Kembali ke Katalog',
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
      selectVersion: 'Pilih Versi Odoo',
      downloadTitle: 'Unduh Modul',
      downloadSubtitle: 'Dapatkan kode sumber terbaru untuk versi Odoo Anda.',
      buyNow: 'Beli Sekarang',
      getDownloadLink: 'Dapatkan Link Unduh',
      noScreenshots: 'Tidak ada tangkapan layar tersedia.',
      noFeatures: 'Tidak ada fitur yang tercantum.',
      noDescription: 'Tidak ada deskripsi tersedia.',
      downloads: 'Unduhan',
      purchases: 'Pembelian',
      technicalName: 'Nama Teknis',
      comingSoon: 'Segera Hadir',
      purchase: {
        title: 'Beli Modul',
        subtitle: 'Masukkan detail Anda untuk menerima link unduhan dan faktur.',
        formName: 'Nama Lengkap',
        formEmail: 'Alamat Email',
        formEmailDesc: 'Kami akan mengirimkan file zip modul ke alamat ini.',
        confirm: 'Konfirmasi Pembelian',
        processing: 'Memproses...',
        success: 'Terima kasih! Periksa email Anda untuk link unduhan.',
        error: 'Terjadi kesalahan. Silakan coba lagi atau hubungi dukungan.',
        total: 'Total',
        chatWhatsApp: 'Chat di WhatsApp',
        sendEmail: 'Kirim Email',
        cancel: 'Batal',
        waMessage: 'Halo, saya tertarik untuk membeli modul *{name}* ({version}).\nHarga: {price}\nMohon bantuannya untuk proses pembelian.',
        emailSubject: 'Pertanyaan Pembelian: {name} ({version})',
        emailBody: 'Halo,\n\nSaya tertarik untuk membeli modul berikut:\n\nModul: {name}\nVersi: {version}\nHarga: {price}\n\nMohon berikan informasi lebih lanjut tentang cara melanjutkan.\n\nTerima kasih.',
      },
      review: {
        title: 'Ulasan & Umpan Balik',
        noReviews: 'Belum ada ulasan.',
        beFirst: 'Jadilah yang pertama membagikan ulasan Anda untuk modul ini!',
        reviews: 'ulasan',
        review: 'ulasan',
        showing: 'Menampilkan',
        of: 'dari',
        leaveReview: 'Tulis Ulasan',
        yourRating: 'Rating Anda',
        name: 'Nama',
        emailOptional: 'Email (opsional)',
        comment: 'Komentar',
        commentPlaceholder: 'Bagikan pengalaman Anda menggunakan modul ini...',
        submit: 'Kirim',
        submitting: 'Mengirim...',
        success: 'Terima kasih atas ulasan Anda!',
        errorFields: 'Silakan isi nama, komentar, dan rating Anda.',
      },
      faq: {
        title: 'FAQ',
        noFaq: 'Tidak ada FAQ tersedia.',
      },
      otherModules: '🧩 Modul Lainnya',
      license: 'Lisensi',
      noLicense: 'Informasi lisensi tidak tersedia.',
      overview: 'Ikhtisar',
      releaseNotes: 'Catatan Rilis',
      noReleaseNotes: 'Catatan rilis tidak tersedia.',
      aboutModule: 'Tentang modul ini',
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
      subtitle: 'Kami adalah perusahaan teknologi yang berspesialisasi dalam solusi Odoo ERP untuk bisnis Indonesia dan global.',
      ourMission: 'Misi Kami',
      missionDescription1: 'Lema Core Technologies didirikan dengan misi yang jelas: untuk membuat teknologi ERP yang kuat dapat diakses dan praktis bagi bisnis dari semua ukuran di Indonesia dan sekitarnya.',
      missionDescription2: 'Kami percaya bahwa Odoo, jika diimplementasikan dan dikustomisasi dengan benar, dapat mentransformasi cara bisnis beroperasi. Tim pengembang Odoo bersertifikat kami membawa pengalaman praktis bertahun-tahun di berbagai industri termasuk ritel, manufaktur, logistik, dan layanan profesional.',
      missionDescription3: 'Setiap modul yang kami terbitkan dalam katalog ini adalah hasil dari umpan balik klien nyata dan telah teruji di lingkungan produksi — sehingga Anda dapat menerapkannya dengan percaya diri.',
      whatWeDo: 'Layanan Kami',
      meetTeam: 'Tim Kami',
      team: {
        aldi: { role: 'Odoo Software Engineer' },
        herul: { role: 'Odoo Software Engineer' },
      },
      workWithUs: 'Bekerja Bersama Kami',
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
      subtitle: 'Punya pertanyaan atau proyek? Kami senang mendengar dari Anda.',
      getInTouch: 'Hubungi Kami',
      getInTouchDesc: 'Apakah Anda memerlukan modul Odoo kustom, memiliki pertanyaan tentang katalog kami, atau ingin mendiskusikan implementasi ERP lengkap. Tim kami siap membantu.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      location: 'Lokasi',
      locationValue: 'Jakarta Selatan, Jakarta, Indonesia',
      responseTime: 'Waktu Respon',
      responseTimeDesc: 'Kami biasanya merespon dalam 1 hari kerja. Untuk pertanyaan mendesak, silakan hubungi kami via WhatsApp.',
      sendMessage: 'Kirim Pesan',
      name: 'Nama Lengkap',
      emailLabel: 'Alamat Email',
      company: 'Perusahaan (opsional)',
      message: 'Pesan',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      successTitle: 'Pesan terkirim!',
      successMsg: 'Kami akan merespons dalam 1–2 hari kerja.',
    },
    forum: {
      title: 'Forum Komunitas',
      subtitle: 'Ajukan pertanyaan, bagikan ide, dan diskusikan modul Odoo Lema Core.',
      startDiscussion: 'Mulai Diskusi',
      placeholder: 'Apa yang sedang Anda pikirkan? Bagikan ide atau ajukan pertanyaan tentang modul Lema Core...',
      post: 'Kirim Diskusi',
      reply: 'Balas',
      replies: 'Balasan',
      noDiscussions: 'Belum ada diskusi',
      noDiscussionsDesc: 'Jadilah yang pertama untuk memulai percakapan!',
      identity: {
        postingAs: 'Posting sebagai',
        change: 'Ubah',
        updateIdentity: 'Perbarui identitas Anda',
        whoAreYou: '👋 Siapa Anda? (disimpan untuk sesi ini)',
        yourName: 'Nama Anda *',
        emailOptional: 'Email (opsional)',
        save: 'Simpan',
      },
      newThread: {
        title: 'Judul *',
        body: 'Apa yang sedang Anda pikirkan? *',
        posting: 'Mengirim...',
      },
      thread: {
        pinned: 'Disematkan',
        closed: 'Ditutup',
        closedMessage: 'Diskusi ini telah ditutup.',
        writeReply: 'Tulis balasan...',
        setIdentityToReply: 'Atur nama Anda di atas untuk membalas',
      },
    },
    common: {
      loading: 'Memuat...',
      error: 'Terjadi kesalahan.',
      notFound: 'Halaman tidak ditemukan.',
      backHome: 'Kembali ke Beranda',
      featured: 'Unggulan',
    },
    services: {
      title: 'Layanan Kami',
      subtitle: 'Layanan Odoo komprehensif untuk membantu bisnis Anda tumbuh dan beroperasi secara efisien.',
      items: {
        development: {
          title: 'Pengembangan Odoo',
          description: 'Pengembangan modul kustom yang disesuaikan dengan proses bisnis Anda.',
        },
        customization: {
          title: 'Kustomisasi Odoo',
          description: 'Memodifikasi modul Odoo yang ada agar sesuai dengan alur kerja Anda.',
        },
        integration: {
          title: 'Integrasi Odoo',
          description: 'Menghubungkan Odoo dengan sistem eksternal — e-commerce, payment gateway, dan lainnya.',
        },
        implementation: {
          title: 'Implementasi ERP',
          description: 'Implementasi Odoo ujung-ke-ujung dengan migrasi data dan pelatihan.',
        },
      },
    },
    cta: {
      title: 'Siap untuk meningkatkan Odoo Anda?',
      subtitle: 'Biarkan ahli kami membangun solusi Odoo yang sempurna untuk bisnis Anda.',
      buttonExplore: 'Jelajahi Modul',
      buttonContact: 'Hubungi Kami',
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
      buttonBrowse: 'تصفح الكتالوج',
      buttonContact: 'تواصل مع خبير',
      published: 'الوحدات المنشورة',
      clients: 'عملاء سعداء',
      experience: 'سنوات الخبرة',
      avgRating: 'متوسط التقييم',
      trustBadge: 'ثق بنظام عملك معنا ❤️',
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
      filterLabels: {
        search: 'ابحث عن وحدات...',
        category: 'جميع الفئات',
        version: 'جميع الإصدارات',
        price: 'جميع الأسعار',
        sortBy: 'ترتيب حسب',
      },
      sortOptions: {
        newest: 'الأحدث',
        oldest: 'الأقدم',
        nameAsc: 'الاسم أ ← ي',
        nameDesc: 'الاسم ي ← أ',
        priceAsc: 'السعر: من الأقل للأعلى',
        priceDesc: 'السعر: من الأعلى للأقل',
        ratingDesc: 'الأعلى تقييماً',
        topPurchase: 'الأكثر شراءً',
      },
      priceOptions: {
        all: 'جميع الأسعار',
        free: 'مجاني',
        paid: 'مدفوع',
      },
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
      backToCatalog: 'العودة إلى الكتالوج',
      prev: 'السابق',
      next: 'التالي',
      selectVersion: 'اختر إصدار أودو',
      downloadTitle: 'تنزيل الوحدة',
      downloadSubtitle: 'احصل على أحدث كود مصدري لإصدار أودو الخاص بك.',
      buyNow: 'اشتري الآن',
      getDownloadLink: 'احصل على رابط التنزيل',
      noScreenshots: 'لا توجد لقطات شاشة متاحة.',
      noFeatures: 'لا توجد مميزات مدرجة.',
      noDescription: 'لا يوجد وصف متاح.',
      downloads: 'التنزيلات',
      purchases: 'المشتريات',
      technicalName: 'الاسم التقني',
      comingSoon: 'قريباً',
      purchase: {
        title: 'شراء الوحدة',
        subtitle: 'أدخل بياناتك لتلقي رابط التنزيل والفاتورة.',
        formName: 'الاسم الكامل',
        formEmail: 'البريد الإلكتروني',
        formEmailDesc: 'سنرسل ملف الوحدة المضغوط إلى هذا العنوان.',
        confirm: 'تأكيد الشراء',
        processing: 'جاري المعالجة...',
        success: 'شكراً لك! تحقق من بريدك الإلكتروني للحصول على رابط التنزيل.',
        error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بالدعم.',
        total: 'الإجمالي',
        chatWhatsApp: 'تحدث عبر واتساب',
        sendEmail: 'إرسال بريد إلكتروني',
        cancel: 'إلغاء',
        waMessage: 'مرحباً، أنا مهتم بشراء الوحدة *{name}* ({version}).\nالسعر: {price}\nيرجى مساعدتي في عملية الشراء.',
        emailSubject: 'استفسار عن شراء: {name} ({version})',
        emailBody: 'مرحباً،\n\nأنا مهتم بشراء الوحدة التالية:\n\nالوحدة: {name}\nالإصدار: {version}\nالسعر: {price}\n\nيرجى تقديم مزيد من المعلومات حول كيفية المتابعة.\n\nشكراً لك.',
      },
      review: {
        title: 'المراجعات والتعليقات',
        noReviews: 'لا توجد مراجعات بعد.',
        beFirst: 'كن أول من يشارك تعليقاته حول هذه الوحدة!',
        reviews: 'مراجعات',
        review: 'مراجعة',
        showing: 'عرض',
        of: 'من',
        leaveReview: 'اترك مراجعة',
        yourRating: 'تقييمك',
        name: 'الاسم',
        emailOptional: 'البريد الإلكتروني (اختياري)',
        comment: 'التعليق',
        commentPlaceholder: 'شارك تجربتك مع هذه الوحدة...',
        submit: 'إرسال',
        submitting: 'جاري الإرسال...',
        success: 'شكراً لك على تعليقك!',
        errorFields: 'يرجى ملء الاسم والتعليق والتقييم.',
      },
      faq: {
        title: 'الأسئلة الشائعة',
        noFaq: 'لا توجد أسئلة شائعة متاحة.',
      },
      otherModules: '🧩 وحدات أخرى',
      license: 'الترخيص',
      noLicense: 'معلومات الترخيص غير متاحة.',
      overview: 'نظرة عامة',
      releaseNotes: 'ملاحظات الإصدار',
      noReleaseNotes: 'ملاحظات الإصدار غير متاحة.',
      aboutModule: 'حول هذه الوحدة',
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
      subtitle: 'نحن شركة تقنية متخصصة في حلول أودو ERP للأعمال في إندونيسيا والعالم.',
      ourMission: 'مهمتنا',
      missionDescription1: 'تأسست ليما كور تكنولوجيز بمهمة واضحة: جعل تقنية ERP القوية سهلة الوصول وعملية للشركات بجميع أحجامها في إندونيسيا وخارجها.',
      missionDescription2: 'نحن نؤمن بأن أودو، عندما يتم تنفيذه وتخصيصه بشكل صحيح، يمكنه تحويل كيفية عمل الشركات. يقدم فريقنا من مطوري أودو المعتمدين سنوات من الخبرة العملية في مختلف الصناعات بما في ذلك التجزئة والتصنيع والخدمات اللوجستية والخدمات المهنية.',
      missionDescription3: 'كل وحدة ننشرها في هذا الكتالوج هي نتيجة لتعليقات العملاء الحقيقية وتم اختبارها في بيئات الإنتاج — لذا يمكنك التنفيذ بثقة.',
      whatWeDo: 'ما نقدمه',
      meetTeam: 'فريقنا',
      team: {
        aldi: { role: 'مهندس برمجيات أودو' },
        herul: { role: 'مهندس برمجيات أودو' },
      },
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
      subtitle: 'هل لديك سؤال أو مشروع؟ يسعدنا سماع منك.',
      getInTouch: 'ابق على تواصل',
      getInTouchDesc: 'سواء كنت بحاجة إلى وحدة أودو مخصصة، أو لديك أسئلة حول الكتالوج الخاص بنا، أو ترغب في مناقشة تنفيذ ERP كامل. فريقنا هنا للمساعدة.',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب',
      location: 'الموقع',
      locationValue: 'جنوب جاكرتا، جاكرتا، إندونيسيا',
      responseTime: 'وقت الاستجابة',
      responseTimeDesc: 'نرد عادةً خلال يوم عمل واحد. للاستفسارات العاجلة، يرجى التواصل معنا عبر واتساب.',
      sendMessage: 'أرسل رسالة',
      name: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      company: 'الشركة (اختياري)',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      successTitle: 'تم إرسال الرسالة!',
      successMsg: 'سنرد عليك خلال 1–2 أيام عمل.',
    },
    forum: {
      title: 'منتدى المجتمع',
      subtitle: 'اطرح الأسئلة وشارك الأفكار وناقش وحدات ليما كور أودو.',
      startDiscussion: 'ابدأ مناقشة',
      placeholder: 'ما الذي يدور في ذهنك؟ شارك الأفكار أو اطرح أسئلة حول وحدات ليما كور...',
      post: 'نشر المناقشة',
      reply: 'رد',
      replies: 'ردود',
      noDiscussions: 'لا توجد مناقشات بعد',
      noDiscussionsDesc: 'كن أول من يبدأ المحادثة!',
      identity: {
        postingAs: 'النشر باسم',
        change: 'تغيير',
        updateIdentity: 'تحديث هويتك',
        whoAreYou: '👋 من أنت؟ (محفوظ لهذه الجلسة)',
        yourName: 'اسمك *',
        emailOptional: 'البريد الإلكتروني (اختياري)',
        save: 'حفظ',
      },
      newThread: {
        title: 'العنوان *',
        body: 'ما الذي يدور في ذهنك؟ *',
        posting: 'جاري النشر...',
      },
      thread: {
        pinned: 'مثبت',
        closed: 'مغلق',
        closedMessage: 'هذا الموضوع مغلق.',
        writeReply: 'اكتب رداً...',
        setIdentityToReply: 'قم بتعيين اسمك أعلاه للرد',
      },
    },
    common: {
      loading: 'جارٍ التحميل...',
      error: 'حدث خطأ ما.',
      notFound: 'الصفحة غير موجودة.',
      backHome: 'العودة إلى الرئيسية',
      featured: 'مميز',
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'خدمات أودو شاملة لمساعدة عملك على النمو والعمل بكفاءة.',
      items: {
        development: {
          title: 'تطوير أودو',
          description: 'تطوير وحدات مخصصة مصممة خصيصاً لعمليات عملك.',
        },
        customization: {
          title: 'تخصيص أودو',
          description: 'تعديل وحدات أودو الحالية لتناسب سير عملك تماماً.',
        },
        integration: {
          title: 'تكامل أودو',
          description: 'ربط أودو بالأنظمة الخارجية — التجارة الإلكترونية، بوابات الدفع، والمزيد.',
        },
        implementation: {
          title: 'تنفيذ ERP',
          description: 'تنفيذ أودو من البداية إلى النهاية مع ترحيل البيانات والتدريب.',
        },
      },
    },
    cta: {
      title: 'جاهز لتعزيز نظام أودو الخاص بك؟',
      subtitle: 'دع خبراءنا يبنون الحل الأمثل لنظام أودو لعملك.',
      buttonExplore: 'استكشف الوحدات',
      buttonContact: 'تواصل معنا',
    },
  },
};
