import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Logo Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold text-white">
                  help<span className="text-teal-400">check</span>
                </h1>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress Text */}
              <motion.p
                className="text-slate-400 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
