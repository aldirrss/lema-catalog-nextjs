'use client';

/**
 * PageTransitionProvider
 * ----------------------
 * Membungkus konten halaman dengan animasi slide-right (navigate forward)
 * dan slide-left (navigate back), menggunakan framer-motion.
 *
 * Cara kerja:
 * - Menyimpan urutan route yang sudah dikunjungi (history stack)
 * - Jika pathname baru ada di history → dianggap "back" → slide from left
 * - Jika pathname baru tidak ada di history → dianggap "forward" → slide from right
 */

import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Urutan halaman untuk menentukan arah
const PAGE_ORDER: Record<string, number> = {
  '/': 0,
  '/catalog': 1,
  '/about': 2,
  '/contact': 3,
};

function getPageOrder(pathname: string): number {
  // Cek exact match dulu
  if (PAGE_ORDER[pathname] !== undefined) return PAGE_ORDER[pathname];
  // Halaman detail modul dianggap lebih dalam dari catalog
  if (pathname.startsWith('/modules/')) return 10;
  return 5;
}

const SLIDE_DISTANCE = 68; // px — seberapa jauh slide masuk/keluar

const variants = {
  // Masuk dari kanan (forward)
  enterFromRight: {
    x: SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.985,
    filter: 'blur(10px)',
  },
  // Masuk dari kiri (back)
  enterFromLeft: {
    x: -SLIDE_DISTANCE,
    opacity: 0,
    scale: 0.985,
    filter: 'blur(10px)',
  },
  // Posisi normal
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  // Keluar ke kiri (forward)
  exitToLeft: {
    x: -SLIDE_DISTANCE,
    opacity: 0,
    scale: 1.01,
    filter: 'blur(8px)',
  },
  // Keluar ke kanan (back)
  exitToRight: {
    x: SLIDE_DISTANCE,
    opacity: 0,
    scale: 1.01,
    filter: 'blur(8px)',
  },
};

const transition = {
  duration: 0.36,
  ease: cubicBezier(0.25, 0.46, 0.45, 0.94), // custom ease — smooth & snappy
};

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  useEffect(() => {
    const prev = prevPathnameRef.current;
    if (prev === pathname) return;

    const prevOrder = getPageOrder(prev);
    const nextOrder = getPageOrder(pathname);

    // Bandingkan urutan halaman untuk tentukan arah
    if (nextOrder < prevOrder) {
      setDirection('back');
    } else {
      setDirection('forward');
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  const enterVariant = direction === 'forward' ? 'enterFromRight' : 'enterFromLeft';
  const exitVariant = direction === 'forward' ? 'exitToLeft' : 'exitToRight';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={enterVariant}
        animate="center"
        exit={exitVariant}
        variants={variants}
        transition={transition}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
