import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Bot } from 'lucide-react';
import { useChat } from './ChatContext';

/**
 * Floating Chat Widget
 */
export const FloatingWidget: React.FC = () => {
  const { isOpen, toggleChat, isFloating } = useChat();

  if (isFloating) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          aria-label="Chat öffnen"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingWidget;
