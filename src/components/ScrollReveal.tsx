import { motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      case 'fade': return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom easing für sanfte Animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Varianten für verschiedene Animationstypen
export function ScrollFade({ children, delay = 0, duration = 0.6, className = '' }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="fade" delay={delay} duration={duration} className={className}>{children}</ScrollReveal>;
}

export function ScrollUp({ children, delay = 0, duration = 0.6, className = '' }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="up" delay={delay} duration={duration} className={className}>{children}</ScrollReveal>;
}

export function ScrollDown({ children, delay = 0, duration = 0.6, className = '' }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="down" delay={delay} duration={duration} className={className}>{children}</ScrollReveal>;
}

export function ScrollLeft({ children, delay = 0, duration = 0.6, className = '' }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="left" delay={delay} duration={duration} className={className}>{children}</ScrollReveal>;
}

export function ScrollRight({ children, delay = 0, duration = 0.6, className = '' }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="right" delay={delay} duration={duration} className={className}>{children}</ScrollReveal>;
}

// Card mit Hover-Effekt
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
}

export function AnimatedCard({ children, className = '', hoverScale = 1.02 }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
