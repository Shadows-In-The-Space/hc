import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, X, Bot, User, Car, Shield, Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useChat, Message } from './ChatContext';
import { checkEmailBreach, formatBreachResultForChat } from './dataLeakService';
import { LeadForm, AppointmentBooking } from './LeadForm';

const QUICK_ACTIONS = [
  { id: 'verkehrsrecht', label: '🚗 Bußgeld / Verkehrsrecht', icon: Car },
  { id: 'datenleck', label: '🔒 Datenleck prüfen', icon: Shield },
  { id: 'beratung', label: '💬 Kostenlose Beratung', icon: Bot },
];

interface ChatInterfaceProps {
  isFloating?: boolean;
  position?: 'hero' | 'widget';
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isFloating = false,
  position = 'hero'
}) => {
  const {
    isOpen,
    closeChat,
    messages,
    addMessage,
    currentStep,
    setCurrentStep,
    setLead,
    isDataLeakCheck,
    setIsDataLeakCheck,
  } = useChat();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentStep]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const detectDataLeakQuery = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return lowerText.includes('datenleck') ||
           lowerText.includes('geleakt') ||
           lowerText.includes('email') && (lowerText.includes('prüfen') || lowerText.includes('check'));
  };

  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const handleAIResponse = useCallback(async (userMessage: string) => {
    setIsLoading(true);

    try {
      if (detectDataLeakQuery(userMessage)) {
        const email = extractEmail(userMessage);
        if (email) {
          setIsDataLeakCheck(true);
          addMessage({ role: 'assistant', content: '🔍 Ich prüfe, ob Ihre E-Mail-Adresse in einem Datenleck vorkommt...', timestamp: new Date() });
          const result = await checkEmailBreach(email);
          const response = formatBreachResultForChat(result);
          setTimeout(() => {
            addMessage({ role: 'assistant', content: response, timestamp: new Date() });
          }, 500);
          setIsLoading(false);
          return;
        } else {
          addMessage({ role: 'assistant', content: 'Um Ihre E-Mail-Adresse auf Datenlecks zu prüfen, benötige ich Ihre E-Mail-Adresse. Bitte geben Sie sie ein.', timestamp: new Date() });
          setIsLoading(false);
          return;
        }
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
      if (!apiKey) {
        addMessage({ role: 'assistant', content: 'Entschuldigung, die KI-Integration ist momentan nicht konfiguriert. Bitte kontaktieren Sie uns direkt.', timestamp: new Date() });
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Du bist der spezialisierte helpcheck KI-Assistent. FOKUS-THEMEN: 1. Verkehrsrecht: Bußgeldbescheide, Punkte, Fahrverbote. 2. Datenlecks: Schadensersatzansprüche. Sei professionell und führe zur Kontaktaufnahme.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [...messages, { role: 'user' as const, parts: [{ text: userMessage }] }],
        config: { systemInstruction, temperature: 0.7, maxOutputTokens: 500 }
      });

      const aiText = response.text || 'Entschuldigung, ich konnte keine Antwort generieren.';
      addMessage({ role: 'assistant', content: aiText, timestamp: new Date() });

      if (aiText.toLowerCase().includes('kontakt') || aiText.toLowerCase().includes('beratung')) {
        setCurrentStep('lead');
      }

    } catch (error) {
      console.error("Chat error:", error);
      addMessage({ role: 'assistant', content: 'Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.', timestamp: new Date() });
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage, setCurrentStep, setIsDataLeakCheck]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    addMessage(userMsg);
    setInput('');
    await handleAIResponse(text);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'verkehrsrecht':
        handleSend('Ich habe einen Bußgeldbescheid erhalten und möchte wissen, ob ich dagegen vorgehen kann.');
        break;
      case 'datenleck':
        handleSend('Ich möchte prüfen, ob meine Daten in einem Leak enthalten sind.');
        break;
      case 'beratung':
        setCurrentStep('lead');
        break;
    }
  };

  if (position === 'hero' && !isOpen) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Wie können wir Ihnen helfen?</h2>
          <p className="text-white/70">Wählen Sie ein Thema oder stellen Sie uns Ihre Frage</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map(action => (
            <button key={action.id} onClick={() => handleQuickAction(action.id)} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all group text-left">
              <action.icon className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium block">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFloating ? 'w-full h-full' : 'max-w-2xl mx-auto'} bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">helpcheck Assistent</h3>
            <p className="text-white/70 text-xs">Online • Schnelle Antwort</p>
          </div>
        </div>
        <button onClick={closeChat} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ maxHeight: '400px' }}>
        {messages.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100' : 'bg-teal-100'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-blue-600" /> : <Bot className="w-4 h-4 text-teal-600" />}
            </div>
            <div className={`max-w-[75%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-900 text-white rounded-br-md' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-600" />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-md">
              <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {currentStep === 'lead' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-100">
            <LeadForm />
          </motion.div>
        )}
        {currentStep === 'appointment' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-100">
            <AppointmentBooking />
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep !== 'lead' && currentStep !== 'appointment' && (
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Nachricht eingeben..." className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400" />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-800 disabled:opacity-50 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
