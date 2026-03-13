'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type RevealOnScrollProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 26,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
