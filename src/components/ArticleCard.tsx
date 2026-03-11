import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

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

  const colorClasses = variant === 'teal'
    ? 'from-teal-500/20 to-cyan-500/10 text-teal-400 border-teal-500/30'
    : 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30';

  return (
    <Link to={`/ratgeber/${slug}`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-white/20 transition-all duration-300 h-full"
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glow Effect on Hover */}
        <div className={`absolute -inset-px ${variant === 'teal' ? 'bg-teal-500/10' : 'bg-blue-500/10'} opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${variant === 'teal' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'}`}>
              <Icon size={22} />
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Category */}
          <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium mb-3 ${colorClasses} bg-gradient-to-r`}>
            {category}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
            {excerpt}
          </p>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-sm font-medium mt-auto ${variant === 'teal' ? 'text-teal-400' : 'text-blue-400'}`}>
            <span>Weiterlesen</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </div>

        {/* 3D Perspective Element */}
        <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
