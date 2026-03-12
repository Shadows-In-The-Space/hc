import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0.1 = langsam, 0.5 = schnell
  className?: string;
}

export function ParallaxSection({ children, speed = 0.3, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Background mit langsamerer Parallax
interface ParallaxBackgroundProps {
  children: ReactNode;
  imageUrl?: string;
  className?: string;
}

export function ParallaxBackground({ children, imageUrl, className = '' }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {imageUrl && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img
            src={imageUrl}
            alt=""
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Floating Element
interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingElement({ children, delay = 0, className = '' }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
