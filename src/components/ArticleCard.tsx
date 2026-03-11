import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useMediaQuery';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: React.ElementType;
  variant?: 'teal' | 'blue';
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
  icon: Icon,
  variant = 'teal'
}: ArticleCardProps) {
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isTeal = variant === 'teal';
  const gradientColors = isTeal
    ? 'from-teal-500/30 via-teal-500/15 to-transparent'
    : 'from-blue-500/30 via-blue-500/15 to-transparent';
  const iconBg = isTeal
    ? 'bg-gradient-to-br from-teal-500/30 to-teal-600/20 text-teal-300'
    : 'bg-gradient-to-br from-blue-500/30 to-blue-600/20 text-blue-300';
  const hoverText = isTeal ? 'group-hover:text-teal-300' : 'group-hover:text-blue-300';
  const borderColor = isTeal ? 'border-teal-500/20' : 'border-blue-500/20';
  const hoverBorder = isTeal ? 'group-hover:border-teal-500/40' : 'group-hover:border-blue-500/40';

  return (
    <Link to={`/ratgeber/${slug}`}>
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: isMobile ? "flat" : "preserve-3d"
        }}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          hover: { duration: 0.2 }
        }}
        className={`group relative bg-slate-900/80 backdrop-blur-2xl border ${borderColor} ${hoverBorder} rounded-2xl p-6 overflow-hidden transition-all duration-300 h-full shadow-xl shadow-black/20`}
      >
        {/* Dark blurred background layers */}
        <div className="absolute inset-0 z-0">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-50`} />

          {/* Animated blur orbs */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${isTeal ? 'from-teal-500' : 'from-blue-500'} to-transparent rounded-full blur-3xl opacity-40`}
          />
          <motion.div
            animate={{
              x: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr ${isTeal ? 'from-cyan-500' : 'from-indigo-500'} to-transparent rounded-full blur-3xl opacity-30`}
          />

          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} border border-white/10 shadow-lg`}
            >
              <Icon size={22} />
            </motion.div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm bg-white/5 px-2 py-1 rounded-full">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 ${isTeal ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}
          >
            <Sparkles size={12} />
            {category}
          </motion.div>

          {/* Title */}
          <h3 className={`text-lg font-bold text-white mb-2 ${hoverText} transition-colors duration-300 leading-tight`}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
            {excerpt}
          </p>

          {/* CTA */}
          <motion.div
            className={`flex items-center gap-2 text-sm font-medium mt-auto ${hoverText}`}
          >
            <span>Weiterlesen</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.div>
        </div>

        {/* 3D Perspective Element */}
        <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
