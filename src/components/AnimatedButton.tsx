import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const variants = {
  primary: {
    bg: 'bg-gradient-to-r from-teal-400 to-cyan-400',
    hover: 'hover:from-teal-300 hover:to-cyan-300',
    shadow: 'hover:shadow-lg hover:shadow-teal-500/25',
    text: 'text-slate-900',
    border: 'border-0'
  },
  secondary: {
    bg: 'bg-white/10',
    hover: 'hover:bg-white/20',
    shadow: '',
    text: 'text-white',
    border: 'border border-white/20'
  },
  glass: {
    bg: 'bg-white/5 backdrop-blur-md',
    hover: 'hover:bg-white/10 backdrop-blur-lg',
    shadow: '',
    text: 'text-white',
    border: 'border border-white/10 hover:border-white/30'
  }
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-full',
  md: 'px-6 py-3 text-base rounded-full',
  lg: 'px-8 py-4 text-lg rounded-full'
};

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon
}: AnimatedButtonProps) {
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  const buttonContent = (
    <>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
        {!icon && variant === 'primary' && (
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
          >
            <ArrowRight size={size === 'lg' ? 20 : 18} />
          </motion.span>
        )}
      </motion.span>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>
    </>
  );

  const baseClasses = `relative inline-flex items-center justify-center font-bold ${variantStyles.bg} ${variantStyles.hover} ${variantStyles.shadow} ${variantStyles.text} ${variantStyles.border} ${sizeStyles} transition-all duration-300 overflow-hidden ${className}`;

  if (to) {
    return (
      <Link to={to} className="group">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {buttonContent}
        </motion.div>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {buttonContent}
        </motion.div>
      </a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {buttonContent}
    </motion.button>
  );
}

// Icon-only variant for floating action buttons
export function AnimatedIconButton({
  children,
  onClick,
  className = ''
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}
