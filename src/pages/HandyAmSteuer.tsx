import React from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Clock,
  Users,
  MapPin,
  Eye,
  Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';
import { useCountUp } from '../hooks/useCountUp';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';

export default function HandyAmSteuer() {
  const facts = [
    { number: 60, unit: "€", label: "Bußgeld" },
    { number: 1, unit: "Punkt", label: "im FAER" },
    { number: 2, unit: "Monate", label: "Fahrverbot" }
  ];

  const defensePoints = [
    "Fing das Smartphone zu diesem Zeitpunkt?",
    "Wurde das Gerät nur als Navigationsgerät genutzt?",
    "War das Fahrzeug in Bewegung?",
    "Wie eindeutig war die Beweisführung?"
  ];

  const penalties = [
    { range: "Ohne Bewegung", fine: "60 €", points: "1 Punkt", ban: "-" },
    { range: "Bis 3 Monate", fine: "100 €", points: "1 Punkt", ban: "1 Monat" },
    { range: "Über 3 Monate", fine: "200 €", points: "2 Punkte", ban: "3 Monate" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Real Image */}
      <section className="relative bg-gradient-to-b from-orange-950 via-orange-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/card-verkehr.jpeg"
            alt="Smartphone am Steuer"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/90 via-orange-900/70 to-slate-800/90" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs font-bold mb-8"
          >
            <Smartphone size={14} /> VERKEHRSRECHT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Handy am Steuer <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Bußgeld & Verteidigung
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto mb-10"
          >
            Nicht jeder Fall ist eindeutig. Lassen Sie Ihren Fall kostenlos prüfen.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Stats Banner with CountUp Animation */}
      <section className="py-12 px-6 relative -mt-16 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              {facts.map((fact, i) => {
                const { count, ref } = useCountUp({ end: parseInt(fact.number), duration: 1500 });
                return (
                  <div key={i}>
                    <div className="text-4xl font-bold text-orange-400 mb-2" ref={ref}>{count}<span className="text-xl">{fact.unit}</span></div>
                    <div className="text-sm text-orange-100">{fact.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Defense Points with Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mögliche Verteidigung</h2>
            <p className="text-slate-600">Diese Punkte sollten geprüft werden:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defensePoints.map((point, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1} className="w-full">
                <AnimatedCard className="flex items-center gap-3 p-6 bg-slate-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Eye className="text-orange-500" size={20} />
                  </div>
                  <span className="text-slate-700 font-medium">{point}</span>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties Table */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Strafen im Überblick</h2>
            <p className="text-slate-600">Bußgeldkatalog für Handy am Steuer:</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-50">
                <tr>
                  <th className="text-left p-4 font-bold text-slate-900">Tatbestand</th>
                  <th className="text-center p-4 font-bold text-slate-900">Bußgeld</th>
                  <th className="text-center p-4 font-bold text-slate-900">Punkte</th>
                  <th className="text-center p-4 font-bold text-slate-900">Fahrverbot</th>
                </tr>
              </thead>
              <tbody>
                {penalties.map((pen, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-4 text-slate-700">{pen.range}</td>
                    <td className="p-4 text-center font-bold text-orange-600">{pen.fine}</td>
                    <td className="p-4 text-center text-slate-700">{pen.points}</td>
                    <td className="p-4 text-center text-slate-700">{pen.ban}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bußgeldbescheid erhalten?</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">Lassen Sie Ihren Fall kostenlos prüfen.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
