import React from 'react';
import { motion } from 'motion/react';
import {
  Database,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';

export default function DeezerDatenleck() {
  const facts = [
    { number: "200", unit: "Millionen", label: "Betroffene Nutzer" },
    { number: "2022", unit: "", label: "Jahr des Leaks" },
    { number: "E-Mail", unit: "", label: "Hauptdaten" },
    { number: "∞", unit: "", label: "Entschädigung möglich" }
  ];

  const leakedData = [
    { label: "E-Mail-Adresse", included: true },
    { label: "Benutzername", included: true },
    { label: "Vollständiger Name", included: true },
    { label: "Geburtsdatum", included: true },
    { label: "Land", included: true },
    { label: "Registrierungsdatum", included: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-b from-purple-950 via-purple-900 to-slate-800 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.4),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-300 text-xs font-bold mb-8"
          >
            <Database size={14} /> DATENLECK
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Deezer Datenleck <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              200+ Mio. Nutzer betroffen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto mb-10"
          >
            Ihre Musikdaten wurden geleakt? Prüfen Sie jetzt kostenlos Ihren Anspruch auf Schadensersatz.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6 relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {facts.map((fact, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{fact.number}<span className="text-2xl">{fact.unit}</span></div>
                  <div className="text-sm text-purple-100">{fact.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Welche Daten wurden geleakt?</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leakedData.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle2 className="text-purple-500 shrink-0" size={20} />
                <span className="text-slate-700">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sind Ihre Daten betroffen?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">Lassen Sie jetzt kostenlos prüfen.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
