import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, X, Bot, User, Car, Shield, Loader2, Sparkles, Paperclip, FileText
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
    uploadedFiles,
    setUploadedFiles,
  } = useChat();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Auch im Context speichern für LeadForm
      setUploadedFiles([...uploadedFiles, file]);
      addMessage({
        role: 'user',
        content: `📎 Datei hochgeladen: ${file.name}`,
        timestamp: new Date()
      });
    }
  };

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

  const isRelevantTopic = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const verkehrsrechtKeywords = [
      'bußgeld', 'busgeld', 'strafzettel', 'geschwindigkeit', 'tempo',
      'fahrverbot', 'punkte', 'flensburg', 'rotlicht', 'ampel',
      'handy am steuer', 'handy', 'alkohol', 'trunkenheit',
      'unfall', 'verkehrsrecht', 'straße', 'parken', 'halteverbot',
      'überholen', 'vorfahrt', 'zeichen', 'ordnungwidrig',
      'einspruch', 'widerspruch', 'verfahren', 'bescheid'
    ];
    const datenleckKeywords = [
      'datenleck', 'datenleck', 'geleakt', 'ge Leak', 'dsgvo',
      'datenschutz', 'facebook', 'linkedin', 'deezer', 'datenskandal',
      'personenbezogen', 'datenbank', 'hack', 'compromised',
      'schadensersatz', 'haftung', 'datenschutzverletzung'
    ];
    return verkehrsrechtKeywords.some(k => lowerText.includes(k)) ||
           datenleckKeywords.some(k => lowerText.includes(k));
  };

  const getOffTopicMessage = () => {
    return `Vielen Dank für Ihre Nachricht!

Ich bin spezialisiert auf folgende Rechtsgebiete:

🚗 **Verkehrsrecht**
- Bußgeldbescheide & Einspruch
- Punkte in Flensburg
- Fahrverbote
- Geschwindigkeitsüberschreitungen
- Rotlichtverstöße

🔒 **Datenlecks & Datenschutz**
- Schadensersatz bei Datenlecks
- DSGVO-Verletzungen
- E-Mail auf Datenlecks prüfen

Für andere rechtliche Fragen kann ich Sie gerne mit unseren Partneranwälten verbinden. Möchten Sie eine kostenlose Erstberatung zu einem meiner Fachgebiete?`;
  };

  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const handleAIResponse = useCallback(async (userMessage: string) => {
    setIsLoading(true);

    try {
      // Prüfe ob das Thema relevant ist, bevor wir die API aufrufen
      if (!isRelevantTopic(userMessage) && !detectDataLeakQuery(userMessage)) {
        addMessage({ role: 'assistant', content: getOffTopicMessage(), timestamp: new Date() });
        setIsLoading(false);
        return;
      }

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
  const systemInstruction = `Du bist der spezialisierte helpcheck KI-Assistent für rechtliche Erstberatung.

Deine FACHGEBIETE (nur diese):
1. VERKEHRSRECHT: Bußgeldbescheide, Punkte in Flensburg, Fahrverbote, Geschwindigkeitsüberschreitungen, Rotlichtverstöße, Handy am Steuer, Alkohol im Verkehr
2. DATENLECKS: DSGVO-Verletzungen, Schadensersatz bei Datenlecks (Facebook, LinkedIn, Deezer, etc.), E-Mail-Prüfung auf Datenlecks

WICHTIGE REGELN:
- Beantworte NUR Fragen zu diesen beiden Fachgebieten
- Wenn der Nutzer ein anderes Thema anspricht: Bedanke dich höflich und verweise auf deine Fachgebiete
- Biete bei passenden Themen immer eine kostenlose Erstberatung an
- Sei professionell, aber persönlich
- Führe zur Kontaktaufnahme für detaillierte Beratung

Erwähne bei jeder Gelegenheit die kostenlose Erstberatung.`;

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

  // Hero Position - Modern Design mit intensivem Glassmorphism
  if (position === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Glassmorphism Container mit Glow-Effekt */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/50 via-cyan-400/50 to-blue-400/50 rounded-3xl blur-2xl opacity-80" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative bg-white/40 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
            style={{ maxHeight: '560px' }}
          >
            {/* Glass Header mit subtle Gradient */}
            <div className="p-5 flex items-center justify-between bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/40"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 shadow-lg shadow-green-400/50"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-wide">helpcheck Assistent</h3>
                  <p className="text-teal-300/90 text-xs flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                    </span>
                    Online - Wir helfen Ihnen gerne
                  </p>
                </div>
              </div>
              {/* Schließen Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeChat}
                className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

          {/* Messages Area mit Glassmorphism */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-transparent via-white/20 to-transparent backdrop-blur-sm"
            style={{ maxHeight: '360px' }}
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                    : 'bg-gradient-to-br from-teal-400 to-cyan-500'
                }`}>
                  {msg.role === 'user'
                    ? <User className="w-4 h-4 text-white" />
                    : <Sparkles className="w-4 h-4 text-white" />
                  }
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md shadow-lg shadow-blue-500/20'
                      : 'bg-white/80 backdrop-blur-sm border border-white/50 text-slate-800 rounded-bl-md shadow-lg shadow-black/5'
                  }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </motion.div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-teal-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
                      className="w-2 h-2 bg-teal-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                      className="w-2 h-2 bg-teal-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Glass Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/20 backdrop-blur-xl">
            {/* File Upload Preview */}
            {uploadedFile && (
              <div className="mb-3 flex items-center gap-2 p-2 bg-teal-50 rounded-lg">
                <FileText className="w-5 h-5 text-teal-600" />
                <span className="flex-1 text-sm text-teal-700 truncate">{uploadedFile.name}</span>
                <button onClick={() => setUploadedFile(null)} className="text-teal-500 hover:text-teal-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex gap-3">
              {/* Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center justify-center text-slate-600 transition-all"
              >
                <Paperclip className="w-5 h-5" />
              </motion.button>

              <motion.input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Nachricht eingeben..."
                whileFocus={{ scale: 1.01 }}
                className="flex-1 px-5 py-3.5 bg-white/30 backdrop-blur-lg border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/40 transition-all text-sm shadow-inner"
              />
              <motion.button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.08, boxShadow: "0 10px 40px -10px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {QUICK_ACTIONS.map((action, index) => (
                <motion.button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/40 text-slate-700 text-sm font-medium rounded-full hover:bg-teal-50/80 hover:border-teal-300/50 hover:text-teal-700 transition-all shadow-md shadow-black/5 whitespace-nowrap"
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Widget/Overlay Position mit Glassmorphism
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`${isFloating ? 'w-full h-full' : 'max-w-2xl mx-auto'} bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col`}
    >
      {/* Glass Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-800 shadow-lg shadow-green-400/50"
            />
          </div>
          <div>
            <h3 className="text-white font-bold">helpcheck Assistent</h3>
            <p className="text-teal-300/90 text-xs">Online • Schnelle Antwort</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={closeChat}
          className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Glass Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent backdrop-blur-sm" style={{ maxHeight: '400px' }}>
        {messages.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                : 'bg-gradient-to-br from-teal-400 to-cyan-500'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md shadow-lg shadow-blue-500/20'
                  : 'bg-white/80 backdrop-blur-sm border border-white/50 text-gray-800 rounded-bl-md shadow-md'
              }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </motion.div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-teal-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 bg-teal-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 bg-teal-500 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {currentStep === 'lead' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/20">
            <LeadForm />
          </motion.div>
        )}
        {currentStep === 'appointment' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/20">
            <AppointmentBooking />
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep !== 'lead' && currentStep !== 'appointment' && (
        <div className="p-4 border-t border-white/20 bg-white/40 backdrop-blur-md">
          <div className="flex gap-2">
            <motion.input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Nachricht eingeben..."
              whileFocus={{ scale: 1.01 }}
              className="flex-1 px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-inner"
            />
            <motion.button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              whileHover={{ scale: 1.08, boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatInterface;
