'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// ----------------------------------------------------------------
// Theme definitions
// ----------------------------------------------------------------
export type ThemeId =
  | 'theme-default'
  | 'theme-dark'
  | 'theme-ocean-light'
  | 'theme-ocean-dark'
  | 'theme-midnight'
  | 'theme-forest-light'
  | 'theme-forest-dark'
  | 'theme-rose-light';

export type ThemeMode = 'light' | 'dark';

export type ThemeDef = {
  id: ThemeId;
  label: string;
  mode: ThemeMode;
  preview: {
    bg: string;      // warna background card preview
    accent: string;  // warna accent dot
    text: string;    // warna teks preview
  };
};

export const THEMES: ThemeDef[] = [
  {
    id: 'theme-default',
    label: 'Classic',
    mode: 'light',
    preview: { bg: '#ffffff', accent: '#2e4f8e', text: '#11244d' },
  },
  {
    id: 'theme-dark',
    label: 'Dark',
    mode: 'dark',
    preview: { bg: '#1e293b', accent: '#4f7be8', text: '#cbddee' },
  },
  {
    id: 'theme-ocean-light',
    label: 'Ocean',
    mode: 'light',
    preview: { bg: '#f0fdff', accent: '#0891b2', text: '#083344' },
  },
  {
    id: 'theme-ocean-dark',
    label: 'Deep Sea',
    mode: 'dark',
    preview: { bg: '#073a4d', accent: '#22d3ee', text: '#cffafe' },
  },
  {
    id: 'theme-midnight',
    label: 'Midnight',
    mode: 'dark',
    preview: { bg: '#18181b', accent: '#818cf8', text: '#f4f4f5' },
  },
  {
    id: 'theme-forest-light',
    label: 'Forest',
    mode: 'light',
    preview: { bg: '#f0fdf4', accent: '#059669', text: '#052e16' },
  },
  {
    id: 'theme-forest-dark',
    label: 'Night Forest',
    mode: 'dark',
    preview: { bg: '#064e22', accent: '#34d399', text: '#d1fae5' },
  },
  {
    id: 'theme-rose-light',
    label: 'Rose',
    mode: 'light',
    preview: { bg: '#fff1f2', accent: '#e11d48', text: '#4c0519' },
  },
];

const ALL_THEME_CLASSES = THEMES.map((t) => t.id);

// ----------------------------------------------------------------
// Context
// ----------------------------------------------------------------
type ThemeContextType = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  currentDef: ThemeDef;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'theme-default',
  setTheme: () => {},
  currentDef: THEMES[0],
});

export function useTheme() {
  return useContext(ThemeContext);
}

// ----------------------------------------------------------------
// Helper: apply theme class ke <html>
// ----------------------------------------------------------------
function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  // Hapus semua theme class
  root.classList.remove(...ALL_THEME_CLASSES, 'dark');
  // Tambah theme baru
  root.classList.add(id);
  // Tambah 'dark' class jika tema dark (untuk Tailwind dark: utilities)
  const def = THEMES.find((t) => t.id === id);
  if (def?.mode === 'dark') root.classList.add('dark');
}

// ----------------------------------------------------------------
// Provider
// ----------------------------------------------------------------
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('theme-default');

  useEffect(() => {
    // Baca dari localStorage, fallback ke system preference
    const stored = localStorage.getItem('app-theme') as ThemeId | null;
    if (stored && ALL_THEME_CLASSES.includes(stored)) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      // Ikuti preferensi sistem
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme: ThemeId = prefersDark ? 'theme-dark' : 'theme-default';
      setThemeState(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, []);

  function setTheme(id: ThemeId) {
    setThemeState(id);
    applyTheme(id);
    localStorage.setItem('app-theme', id);
  }

  const currentDef = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentDef }}>
      {children}
    </ThemeContext.Provider>
  );
}