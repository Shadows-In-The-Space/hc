import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, X, Bot, User, Car, Shield, Loader2, Sparkles, Paperclip, FileText
} from 'lucide-react';
import { useChat, Message } from './ChatContext';
import { checkEmailBreach, formatBreachResultForChat } from './dataLeakService';
import { LeadForm, AppointmentBooking } from './LeadForm';
import { submitLead } from '../../services/api';

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
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  // State-basiertes Lead-Tracking: sammelt Daten inkrementell
  const collectedLeadRef = useRef<{ name?: string; email?: string; phone?: string; topic?: string }>({});
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
           lowerText.includes('daten leak') ||
           lowerText.includes('geleakt') ||
           lowerText.includes('leak') ||
           (lowerText.includes('email') && (lowerText.includes('prüfen') || lowerText.includes('check') || lowerText.includes('test')));
  };

  const isRelevantTopic = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    // Nur offensichtlich irrelevante Nachrichten blocken (Spam, einzelne Zeichen)
    // Gemini's System-Prompt handhabt Off-Topic-Themen selbst
    if (lowerText.trim().length < 2) return false;
    return true;
  };

  const getOffTopicMessage = () => {
    return 'Entschuldigung, bitte geben Sie mindestens zwei Zeichen ein.';
  };

  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const parseLeadFromResponse = (text: string): { name: string; email: string; phone: string; topic: string } | null => {
    // Try structured marker format (flexible)
    const markerMatch = text.match(/---\s*LEAD[_\s]DATA\s*---[\s\S]*?Name:\s*\**([^\n*]+)\**[\s\S]*?Email:\s*\**([^\n*]+)\**[\s\S]*?Telefon:\s*\**([^\n*]+)\**[\s\S]*?Thema:\s*\**([^\n*]+)\**[\s\S]*?---\s*END[_\s]LEAD\s*---/i);
    if (markerMatch) {
      const email = markerMatch[2].trim();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return {
          name: markerMatch[1].trim(),
          email,
          phone: markerMatch[3].trim().toLowerCase() === 'nicht angegeben' ? '' : markerMatch[3].trim(),
          topic: markerMatch[4].trim().toLowerCase(),
        };
      }
    }

    // Fallback: find name + email anywhere in text
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const nameMatch = text.match(/(?:Name|Vielen Dank)[:\s,]*\**([A-ZÄÖÜa-zäöüß][A-ZÄÖÜa-zäöüß\s.-]{1,40})\**/);
    if (emailMatch && nameMatch) {
      return {
        name: nameMatch[1].trim(),
        email: emailMatch[0].trim(),
        phone: '',
        topic: 'allgemein',
      };
    }
    return null;
  };

  // Erkennt welche Daten der Bot gerade fragt anhand der letzten Bot-Nachricht
  const detectWhatBotAsked = (botMessage: string): 'name' | 'email' | 'phone' | null => {
    const lower = botMessage.toLowerCase();
    if ((lower.includes('name') && (lower.includes('wie') || lower.includes('ihr') || lower.includes('verraten') || lower.includes('nennen'))) ||
        lower.includes('wie heißen') || lower.includes('ihren namen')) {
      return 'name';
    }
    if (lower.includes('e-mail') || lower.includes('email') || lower.includes('mail-adresse') || lower.includes('mailadresse')) {
      return 'email';
    }
    if (lower.includes('telefon') || lower.includes('nummer') || lower.includes('rückruf')) {
      return 'phone';
    }
    return null;
  };

  // Sammelt Lead-Daten inkrementell aus der User-Eingabe basierend auf der Bot-Frage
  const collectLeadField = (userMessage: string, lastBotMessage: string): void => {
    const asked = detectWhatBotAsked(lastBotMessage);
    if (asked === 'name' && !userMessage.includes('@') && userMessage.trim().length > 1 && userMessage.trim().length < 60) {
      collectedLeadRef.current.name = userMessage.trim();
    }
    if (asked === 'email' || (!asked && userMessage.includes('@'))) {
      const emailMatch = userMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        collectedLeadRef.current.email = emailMatch[0];
      }
    }
    if (asked === 'phone') {
      const digitsOnly = userMessage.replace(/[^0-9+]/g, '');
      if (digitsOnly.length >= 6) {
        collectedLeadRef.current.phone = userMessage.trim();
      }
    }
  };

  // Prüfe ob wir gerade im Lead-Erfassungsmodus sind
  const isCollectingLeadData = useCallback((): boolean => {
    const lastAssistantMsg = [...messages].reverse().find(m => m.role === 'assistant');
    if (!lastAssistantMsg) return false;
    return detectWhatBotAsked(lastAssistantMsg.content) !== null;
  }, [messages]);

  const handleAIResponse = useCallback(async (userMessage: string) => {
    setIsLoading(true);

    try {
      // LEAD-TRACKING: Sammle Daten aus User-Eingabe basierend auf letzter Bot-Frage
      const lastBotMsg = [...messages].reverse().find(m => m.role === 'assistant');
      if (lastBotMsg) {
        collectLeadField(userMessage, lastBotMsg.content);
      }

      // Wenn wir gerade Lead-Daten sammeln, IMMER an Gemini weiterleiten (kein Topic-Check)
      const collectingLead = isCollectingLeadData();

      // Prüfe ob das Thema relevant ist, bevor wir die API aufrufen
      if (!collectingLead && !isRelevantTopic(userMessage) && !detectDataLeakQuery(userMessage)) {
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

      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        addMessage({ role: 'assistant', content: 'Entschuldigung, die KI-Integration ist momentan nicht konfiguriert. Bitte kontaktieren Sie uns direkt.', timestamp: new Date() });
        setIsLoading(false);
        return;
      }

      const systemInstruction = `Du bist der helpcheck KI-Rechtsassistent für kostenlose Erstberatung im deutschen Recht.

═══ DEINE FACHGEBIETE ═══

1. VERKEHRSRECHT
2. DATENLECKS & DATENSCHUTZ (DSGVO)

Bei anderen Themen: Bedanke dich höflich, erkläre kurz deine Fachgebiete und biete Hilfe an.

═══ VERKEHRSRECHT – BERATUNGSWISSEN ═══

GESCHWINDIGKEIT (Bußgeld-Tabelle Innerorts):
- Bis 10 km/h: 30€, 0 Punkte
- 11-15 km/h: 50€, 1 Punkt
- 16-20 km/h: 70€, 1 Punkt
- 21-25 km/h: 115€, 2 Punkte, 1 Monat Fahrverbot
- 26-30 km/h: 180€, 2 Punkte, 2 Monate Fahrverbot
Außerorts sind die Strafen etwas geringer.
Wichtig: Ca. jeder 3. Bußgeldbescheid hat formale oder technische Fehler!

ROTLICHTVERSTOSS:
- Unter 1 Sekunde rot: 90€, 1 Punkt
- Über 1 Sekunde rot: 200€, 2 Punkte, 1 Monat Fahrverbot
- Mit Gefährdung/Unfall: 360€, 2 Punkte, 1 Monat Fahrverbot
Anfechtbar bei: unklarer Ampelphase, fehlerhafter Kamerainstallation, unklarer Fahrzeugidentifikation.

HANDY AM STEUER:
- Erstverstoß: 100€, 1 Punkt
- Wiederholungsfall: 200€, 2 Punkte, 1 Monat Fahrverbot
- Mit Gefährdung: 150€, 2 Punkte, 1 Monat Fahrverbot
Anfechtbar wenn: Foto uneindeutig, Navi-Nutzung, Fahrzeug stand.

FAHRVERBOT:
- Kann oft vermieden werden durch: Umwandlung in höhere Geldstrafe, Härtfallregelung (berufliche Notwendigkeit), Verkehrspsychologen-Kurs
- 100% der Fahrverbote können potenziell angefochten werden

EINSPRUCH-FRIST: 14 Tage ab Zustellung des Bußgeldbescheids!

ERFOLGSQUOTE: 95% bei Verkehrsrecht-Fällen

MÖGLICHE ANFECHTUNGSGRÜNDE (allgemein):
1. Messfehler (Blitzer, Radar, Laser)
2. Fehlende/fehlerhafte Toleranzabzüge
3. Unklare Beschilderung
4. Fahrzeug nicht eindeutig identifiziert
5. Formfehler im Bescheid
6. Eichung des Messgeräts abgelaufen

═══ DATENLECKS & DSGVO – BERATUNGSWISSEN ═══

FACEBOOK-DATENLECK:
- 533+ Millionen Nutzer betroffen weltweit, 106 Länder
- Geleakte Daten: Name, Telefonnummer, E-Mail, Standort, Geburtsdatum, Geschlecht, Beruf
- Schadensersatz möglich: Ja, nach Art. 82 DSGVO

LINKEDIN-DATENLECK:
- 700+ Millionen Datensätze betroffen
- Daten im Darknet verkauft

DEEZER-DATENLECK:
- 200+ Millionen Datensätze kompromittiert

SCHADENSERSATZ BEI DATENLECKS:
- Rechtsgrundlage: Art. 82 DSGVO – Recht auf Schadensersatz bei Datenschutzverletzungen
- Immaterieller Schaden (Kontrollverlust, Sorge, Belästigung) ist ersatzfähig
- Betroffene können 500-5000€ Entschädigung erhalten
- Kein Kostenrisiko bei helpcheck – Erfolgsabhängig

3-SCHRITTE-PROZESS:
1. PRÜFEN: Kostenlose E-Mail-Prüfung auf Datenlecks
2. DOKUMENTIEREN: Beweise für Anspruch sichern
3. ENTSCHÄDIGUNG: Schadensersatz durchsetzen

═══ HELPCHECK SERVICE-MODELL ═══

- Kostenlose Erstprüfung und Beratung
- Kein Kostenrisiko: Zahlung NUR bei Erfolg
- 50+ spezialisierte Partneranwälte deutschlandweit
- Prüfung innerhalb von 24 Stunden
- 95% Erfolgsquote im Verkehrsrecht

═══ BERATUNGSABLAUF ═══

1. Höre dem Nutzer zu und stelle gezielte Rückfragen
2. Gib eine fundierte Ersteinschätzung basierend auf dem Wissen oben
3. Erkläre die Erfolgschancen und nächsten Schritte
4. Empfehle helpcheck zur kostenfreien Prüfung
5. Leite zur Lead-Erfassung über

STIL:
- Professionell, empathisch, persönlich
- Kurze, klare Sätze (max 3-4 Sätze pro Absatz)
- Verwende Aufzählungen für Übersichtlichkeit
- Gib konkrete Zahlen und Fakten an
- Verweise NIEMALS auf ein Formular oder eine externe Seite
- Mache dem Nutzer Mut: "Die Chancen stehen gut"

═══ LEAD-ERFASSUNG (SEHR WICHTIG) ═══

Wenn der Nutzer Hilfe möchte, detaillierte Prüfung anfragt oder eine Beratung will:
1. Gib ZUERST die inhaltliche Beratung/Einschätzung
2. Sage: "Damit wir Ihren Fall kostenlos prüfen können, benötige ich kurz ein paar Angaben."
3. Frage nach dem NAMEN
4. Dann nach der E-MAIL-ADRESSE
5. Dann nach der TELEFONNUMMER (sage: "optional, für einen schnellen Rückruf")
6. Wenn Name UND E-Mail vorhanden, bestätige mit EXAKT diesem Format:

✅ **Vielen Dank, [Name]! Ihre Daten wurden erfasst.**
---LEAD_DATA---
Name: [Name]
Email: [E-Mail]
Telefon: [Telefonnummer oder "nicht angegeben"]
Thema: [verkehrsrecht oder datenleck oder allgemein]
---END_LEAD---
Unser Team meldet sich schnellstmöglich bei Ihnen für Ihre kostenlose Erstberatung!

WICHTIG: Frage die Daten IMMER einzeln und nacheinander ab. Schicke den ---LEAD_DATA--- Block NUR wenn du mindestens Name UND E-Mail hast.`;

      const openRouterMessages = messages
        .filter(m => m.content && !m.content.startsWith('📎'))
        .map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }));
      openRouterMessages.push({ role: 'user', content: userMessage });

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'HelpCheck'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            ...openRouterMessages
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';

      // Try to parse structured lead data from AI response
      const parsedLead = parseLeadFromResponse(aiText);
      if (parsedLead) {
        // AI lieferte strukturierten Block — nutze diese Daten
        collectedLeadRef.current = { ...collectedLeadRef.current, ...parsedLead };
      }

      // Also check if AI response text contains an email (e.g. the user's email echoed back)
      const emailInResponse = aiText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailInResponse && !collectedLeadRef.current.email) {
        collectedLeadRef.current.email = emailInResponse[0];
      }

      // Strip lead markers from displayed message
      const displayText = aiText.replace(/---\s*LEAD[_\s]DATA\s*---[\s\S]*?---\s*END[_\s]LEAD\s*---/gi, '').trim();
      addMessage({ role: 'assistant', content: displayText, timestamp: new Date() });

      // Determine topic from conversation
      const allText = messages.map(m => m.content).join(' ') + ' ' + userMessage;
      if (!collectedLeadRef.current.topic) {
        collectedLeadRef.current.topic =
          allText.toLowerCase().includes('verkehr') || allText.toLowerCase().includes('bußgeld') ? 'verkehrsrecht' :
          allText.toLowerCase().includes('datenleck') || allText.toLowerCase().includes('dsgvo') ? 'datenleck' : 'allgemein';
      }

      // AUTO-SUBMIT: Wenn Name + Email vorhanden, Lead absenden
      const lead = collectedLeadRef.current;
      if (lead.name && lead.email && !leadSubmitted) {
        console.log('[helpcheck] Submitting lead:', lead.name, lead.email);
        try {
          await submitLead({
            email: lead.email,
            name: lead.name,
            phone: lead.phone || undefined,
            topic: lead.topic || 'allgemein',
            message: `Chat-Beratungsanfrage: ${lead.topic || 'allgemein'}`,
            source: 'chatbot',
            chat_history: JSON.stringify([...messages, { role: 'user', content: userMessage }, { role: 'assistant', content: displayText }]),
          });
          setLeadSubmitted(true);
          setCurrentStep('done');
          console.log('[helpcheck] Lead submitted successfully');
        } catch (err) {
          console.error('[helpcheck] Lead submission error:', err);
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      addMessage({ role: 'assistant', content: 'Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.', timestamp: new Date() });
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage, setCurrentStep, setIsDataLeakCheck, isCollectingLeadData, leadSubmitted]);

  // Rate-Limit: Max 6 Nachrichten pro Minute
  const [messageTimestamps, setMessageTimestamps] = useState<number[]>([]);

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const recentMessages = messageTimestamps.filter(ts => now - ts < oneMinute);

    if (recentMessages.length >= 6) {
      return false; // Rate limit überschritten
    }

    setMessageTimestamps([...recentMessages, now]);
    return true;
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    // Rate-Limit Prüfung
    if (!checkRateLimit()) {
      addMessage({
        role: 'assistant',
        content: 'Entschuldigung, Sie haben zu viele Nachrichten gesendet. Bitte warten Sie eine Minute, bevor Sie weitere Nachrichten senden. Dies dient zum Schutz vor Missbrauch.',
        timestamp: new Date()
      });
      return;
    }

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    addMessage(userMsg);
    setInput('');
    await handleAIResponse(text);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'verkehrsrecht':
        handleSend('Ich habe einen Bußgeldbescheid erhalten und möchte wissen, ob ich dagegen Einspruch einlegen kann. Bußgeld');
        break;
      case 'datenleck':
        handleSend('Ich möchte meine E-Mail-Adresse auf Datenleck prüfen. Datenleck');
        break;
      case 'beratung':
        handleSend('Ich möchte eine kostenlose Erstberatung.');
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
