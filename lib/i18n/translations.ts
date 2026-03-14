/**
 * translations.ts
 * ---------------
 * Dictionary of all translatable strings in the app, organized by page/section.
 * Includes type definitions for language codes and translation keys.
 * This file is the single source of truth for all text content, making it easy to manage and extend translations.
 */

import { en } from './en/common';
import { id } from './id/common';
import { ar } from './ar/common';
import { fr } from './fr/common';
import { zh } from './zh/common';
import { es } from './es/common';

export type LangCode = 'en' | 'id' | 'ar' | 'fr' | 'zh' | 'es';

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
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'zh', label: '中文',     flag: '🇨🇳', dir: 'ltr' },
  { code: 'es', label: 'Español',  flag: '🇪🇸', dir: 'ltr' },
];

export type TranslationKeys = {
  // Navbar
  nav: {
    home: string;
    catalog: string;
    about: string;
    forum: string;
    threads: string;
    article: string;
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
  // Article
  article: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noArticles: string;
    noArticlesDesc: string;
    cardView: string;
    listView: string;
    readMore: string;
    lastUpdated: string;
    backToArticles: string;
    tableOfContents: string;
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
  en,
  id,
  ar,
  fr,
  zh,
  es,
};
