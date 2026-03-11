import React from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Upload,
  HelpCircle
} from 'lucide-react';
import { ChatInterface } from './Home';

export default function Verkehrsrecht() {
  const steps = [
    {
      title: "Bescheid hochladen oder Fragen beantworten",
      description: "Laden Sie Ihren Bescheid bequem online hoch oder beantworten Sie mit ein paar Klicks Fragen zu Ihrem Fall.",
      icon: Upload
    },
    {
      title: "Kostenlose Einschätzung erhalten",
      description: "Sie bekommen sofort Klarheit über Ihre Handlungsmöglichkeiten und Erfolgschancen.",
      icon: ShieldCheck
    },
    {
      title: "Schnell & einfach Strafe verhindern",
      description: "Unsere Partneranwälte helfen Ihnen, Bußgeld, Punkte oder ein drohendes Fahrverbot erfolgreich abzuwehren.",
      icon: CheckCircle2
    }
  ];

  const topics = [
    {
      title: "Geschwindigkeitsverstoß",
      description: "Je nach Höhe der Geschwindigkeitsüberschreitung drohen Bußgelder, Punkte oder ein Fahrverbot. Messungen sind oft fehlerhaft.",
      icon: Zap
    },
    {
      title: "Rotlichtverstoß",
      description: "Ein Rotlichtverstoß wird streng geahndet. Wir prüfen, ob die Ampelphase oder Messung korrekt war.",
      icon: AlertTriangle
    },
    {
      title: "Abstandsverstoß",
      description: "Abstandsmessungen sind technisch anspruchsvoll und häufig angreifbar. Wir prüfen die Videoaufzeichnungen.",
      icon: ArrowRight
    },
    {
      title: "Handy am Steuer",
      description: "Nicht jede Nutzung ist verboten. Unklare Beobachtungen sind oft die Grundlage für eine erfolgreiche Verteidigung.",
      icon: HelpCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold mb-6"
          >
            <Car size={14} /> VERKEHRSRECHT
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Bußgeldbescheid erhalten? <br />
            <span className="text-teal-300">Einspruch einlegen.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto mb-12"
          >
            Jeder dritte Bußgeldbescheid ist fehlerhaft. Lassen Sie Ihren Bescheid prüfen statt vorschnell zu bezahlen. Kostenfrei & unverbindlich.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">In 3 einfachen Schritten zu Ihrem Recht</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <step.icon size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Gut beraten bei verkehrsrechtlichen Anliegen</h2>
            <p className="text-gray-500">Wir helfen Ihnen bei allen gängigen Verstößen im Straßenverkehr.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topics.map((topic, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <topic.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{topic.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{topic.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Simplified) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Häufige Fragen zum Bußgeld</h2>
          <div className="space-y-8">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h4 className="font-bold text-lg mb-2">Wie lange habe ich Zeit für einen Einspruch?</h4>
              <p className="text-gray-600 text-sm">Nachdem Ihnen der Bußgeldbescheid zugestellt wurde, haben Sie 14 Tage Zeit, um Einspruch einzulegen. Die Frist beginnt ab dem Tag der postalen Zustellung.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h4 className="font-bold text-lg mb-2">Was kostet die Prüfung?</h4>
              <p className="text-gray-600 text-sm">Unser Service beginnt immer mit einem kostenlosen Bußgeldcheck. Wenn Sie eine Rechtsschutzversicherung haben, ist der komplette Service zu 100% kostenlos für Sie.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h4 className="font-bold text-lg mb-2">Wie funktioniert der Fotocheck?</h4>
              <p className="text-gray-600 text-sm">Unsere KI erkennt automatisch alle wichtigen Informationen wie Tatort, Messgerät oder Geschwindigkeit. Sie erhalten sofort eine Einschätzung, ob sich ein Einspruch lohnt.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Re-using Zap from Home if needed, but I'll import it or use a local one
const Zap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
