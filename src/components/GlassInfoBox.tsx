import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, Lightbulb } from 'lucide-react';

interface GlassInfoBoxProps {
  type?: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  info: {
    gradient: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400'
  },
  warning: {
    gradient: 'from-amber-500/10 to-orange-500/5',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-400'
  },
  success: {
    gradient: 'from-teal-500/10 to-cyan-500/5',
    border: 'border-teal-500/30',
    icon: CheckCircle2,
    iconColor: 'text-teal-400',
    titleColor: 'text-teal-400'
  },
  tip: {
    gradient: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/30',
    icon: Lightbulb,
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-400'
  }
};

const defaultTitles = {
  info: 'Hinweis',
  warning: 'Warnung',
  success: 'Wichtig',
  tip: 'Tipp'
};

export default function GlassInfoBox({
  type = 'info',
  title,
  children,
  className = ''
}: GlassInfoBoxProps) {
  const variant = variants[type];
  const Icon = variant.icon;
  const displayTitle = title || defaultTitles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl my-8 ${className}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${variant.gradient} backdrop-blur-sm`} />

      {/* Border */}
      <div className={`absolute inset-0 border-l-4 ${variant.border} rounded-r-xl`} />

      {/* Glow Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${variant.gradient} opacity-50 blur-2xl`} />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${variant.gradient} border ${variant.border}`}>
            <Icon className={variant.iconColor} size={20} />
          </div>

          <div className="flex-1">
            <h4 className={`font-bold ${variant.titleColor} mb-3`}>
              {displayTitle}
            </h4>
            <div className="text-slate-300 space-y-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Component for Lists inside the box
export function GlassList({ items, icon: ListIcon = CheckCircle2 }: { items: string[]; icon?: React.ElementType }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-2"
        >
          <ListIcon className="shrink-0 mt-1 text-teal-400" size={16} />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
