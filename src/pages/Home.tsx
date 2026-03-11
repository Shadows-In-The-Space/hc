import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  MessageSquare, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Star,
  Facebook,
  Instagram,
  Twitter,
  Send,
  User,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';

// --- Types ---
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// --- Components (using imported ChatInterface from chatbot) ---

const OldChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Willkommen bei helpcheck! Ich helfe Ihnen, Ihre Ansprüche bei Verkehrsverstößen oder Datenlecks zu prüfen. Welches Anliegen haben Sie?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    if (text.toLowerCase().includes('@') || (text.match(/\d{5,}/) && text.length > 5)) {
      setTimeout(() => {
        setLeadCaptured(true);
      }, 1000);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMsg].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `Du bist der spezialisierte helpcheck KI-Assistent. Dein Ziel ist die Vorqualifizierung von Leads für Verkehrsrecht und Datenlecks.
          
          FOKUS-THEMEN:
          1. Verkehrsrecht: Bußgeldbescheide, Punkte, Fahrverbote, Geschwindigkeitsverstöße.
          2. Datenlecks: Schadensersatzansprüche gegen Unternehmen wie Facebook, Deezer, LinkedIn etc.
          
          DEINE STRATEGIE:
          - Sei professionell, empathisch und lösungsorientiert.
          - Erfrage im ersten Schritt kurz die Eckdaten des Falls (z.B. "Wann haben Sie den Bescheid erhalten?" oder "Welcher Dienst ist vom Datenleck betroffen?").
          - Erkläre den Vorteil: Kostenlose Ersteinschätzung, kein Kostenrisiko (Erfolgshonorar).
          - ZIEL: Sobald der Fall valide klingt, frage nach dem Namen und einer Kontaktmöglichkeit (E-Mail oder Telefon), damit unsere Experten den Fall final prüfen können.
          - WICHTIG: Keine Rechtsberatung geben. Du bist der Türöffner für die Anwälte.`,
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'Entschuldigung, ich konnte keine Antwort generieren.' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "Bußgeld erhalten",
    "Datenleck prüfen",
    "Wie hoch ist mein Anspruch?",
    "Kostenlose Beratung"
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-4 flex items-center justify-between border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-inner">
            <Bot size={20} />
          </div>
          <div className="text-left">
            <span className="text-white font-bold block leading-tight">helpcheck AI</span>
            <span className="text-teal-300 text-[10px] uppercase font-bold tracking-wider">Online • Vorqualifizierung</span>
          </div>
        </div>
        {leadCaptured && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-teal-400 text-blue-900 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
          >
            <CheckCircle2 size={10} /> ANFRAGE ERFASST
          </motion.div>
        )}
      </div>
      
      <div ref={scrollRef} className="h-[350px] overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-teal-400 text-white shadow-lg shadow-teal-400/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white text-gray-800 rounded-tl-none shadow-sm' : 'bg-blue-600 text-white rounded-tr-none shadow-sm'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-400 text-white flex items-center justify-center animate-pulse">
              <Bot size={16} />
            </div>
            <div className="bg-white/20 text-white p-3 rounded-2xl rounded-tl-none text-sm animate-pulse">
              Prüfe Details...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 bg-white/5">
        <AnimatePresence>
          {!leadCaptured && (
            <motion.div 
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {quickActions.map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(action)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white transition-all hover:scale-105 active:scale-95"
                >
                  {action}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={leadCaptured ? "Vielen Dank! Wir melden uns." : "Schildern Sie kurz Ihren Fall..."}
            disabled={leadCaptured}
            className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-6 pr-14 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all focus:bg-white/20"
          />
          <button 
            onClick={() => handleSend()}
            disabled={leadCaptured}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-400 text-blue-900 rounded-full flex items-center justify-center hover:bg-teal-300 transition-all shadow-lg shadow-teal-400/20 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-white/40 text-center">
          Durch die Nutzung stimmen Sie der kostenlosen Ersteinschätzung zu.
        </p>
      </div>
    </div>
  );
};

export const ServiceCard = ({ icon: Icon, title, description, link }: { icon: any, title: string, description: string, link?: string }) => {
  const content = (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 h-full"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }
  return content;
};

export const AdvantageItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <div className="text-teal-500">
      <Icon size={32} />
    </div>
    <h4 className="font-bold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-500 max-w-[200px]">{description}</p>
  </div>
);

export const TestimonialCard = ({ name, text, image }: { name: string, text: string, image: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" referrerPolicy="no-referrer" />
      <div>
        <div className="flex text-teal-400 gap-0.5">
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
        </div>
        <p className="text-xs text-gray-400 mt-1 font-medium">Trustpilot</p>
      </div>
    </div>
    <p className="text-sm italic text-gray-600">"{text}"</p>
    <p className="text-xs font-bold text-gray-900">— {name}</p>
  </div>
);

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-teal-500 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Ihr Recht. Unser Chat. <br />
            <span className="text-teal-300">Schadensersatz sichern.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12 text-white/80 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>TÜV geprüft</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>Über 20.000 zufriedene Kunden</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>Kostenlose Ersteinschätzung</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Unsere Leistungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <ServiceCard 
              icon={Car} 
              title="Verkehrsrecht" 
              description="Bußgeldbescheid prüfen, Fahrverbot abwenden und Punkte in Flensburg vermeiden." 
              link="/verkehrsrecht"
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="Datenleck" 
              description="Prüfen Sie, ob Sie von einem Datenleck (z.B. Facebook, Deezer) betroffen sind und sichern Sie sich Schadensersatz." 
            />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Vorteile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AdvantageItem 
              icon={ShieldCheck} 
              title="Kein Kostenrisiko" 
              description="Wir übernehmen alle Kosten. Sie zahlen nur bei Erfolg." 
            />
            <AdvantageItem 
              icon={CheckCircle2} 
              title="95% Erfolgsquote" 
              description="Unsere Erfolgsquote spricht für sich." 
            />
            <AdvantageItem 
              icon={Zap} 
              title="Express-Prüfung" 
              description="Schnelle Ersteinschätzung innerhalb von 24h." 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Referenzen</h2>
            <div className="flex items-center gap-2">
              <Star className="text-teal-400" size={20} fill="currentColor" />
              <span className="font-bold">Trustpilot</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-teal-400 rounded-sm"></div>)}
              </div>
              <span className="text-gray-500 font-medium">4,8</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard 
              name="Markus S." 
              text="Ich habe meinen Bußgeldbescheid wegen Handy am Steuer anfechten lassen und alles lief reibungslos. Die Erfahrung des Teams hat mir geholfen, das drohende Bußgeld abzuwenden." 
              image="https://picsum.photos/seed/user1/100/100" 
            />
            <TestimonialCard 
              name="Elena R." 
              text="Von den Datenlecks hört man ja ständig, aber alleine habe ich mir nicht zugetraut, was dagegen zu machen. Mit helpcheck war es super einfach und unkompliziert." 
              image="https://picsum.photos/seed/user4/100/100" 
            />
          </div>
        </div>
      </section>

      {/* Media Partners */}
      <section className="py-24 bg-white px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-xs mb-12">Presse & Partner — Bekannt aus den Medien</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-serif font-bold">FAZ</span>
            <span className="text-2xl font-sans font-extrabold">Handelsblatt</span>
            <span className="text-2xl font-sans font-black italic">FOCUS</span>
            <span className="text-xl font-serif">Süddeutsche Zeitung</span>
            <span className="text-2xl font-sans font-bold">DIE WELT</span>
          </div>
        </div>
      </section>
    </>
  );
}
