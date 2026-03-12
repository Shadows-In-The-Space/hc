import React from 'react';
import { motion } from 'motion/react';
import {
  Car,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Clock,
  TrendingDown,
  Briefcase,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';
import { useCountUp } from '../hooks/useCountUp';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';

export default function Fahrverbot() {
  const facts = [
    { number: 3, unit: "Monate", label: "Fahrverbot" },
    { number: 2, unit: "Punkte", label: "im FAER" },
    { number: 100, unit: "%", label: "Umgehung möglich" }
  ];

  const defensePoints = [
    "Ausnahmeregelungen möglich?",
    "Berufliche Notwendigkeit?",
    "Fahrverbot umwandeln?",
    "Antrag auf Stundung?"
  ];

  const waysToAvoid = [
    { title: "Geldstrafe statt Fahrverbot", description: "Anstatt 1 Monat Fahrverbot können 2 Geldstrafen verhängt werden" },
    { title: "Außergewöhnliche Härte", description: "Bei beruflicher Notwendigkeit kann Fahrverbot ausgesetzt werden" },
    { title: "Fahrtenbuch führen", description: "Alternative Nachweise können helfen" },
    { title: "Verkehrspsychologie", description: "Teilnahme kann strafmildernd wirken" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Real Image */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/card-verkehr.jpeg"
            alt="Fahrverbot"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-slate-800/90" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
            <Car size={14} /> VERKEHRSRECHT
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Fahrverbot <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Umgehen & Verteidigen
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
            Ein Fahrverbot kann oft verhindert oder umgangen werden. Lassen Sie Ihren Fall prüfen.
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
                const { count, ref } = useCountUp({ end: fact.number, duration: 1500 });
                return (
                  <div key={i}>
                    <div className="text-4xl font-bold text-teal-400 mb-2" ref={ref}>{count}{fact.unit === "%" ? "%" : ""}<span className="text-xl">{fact.unit !== "%" ? fact.unit : ""}</span></div>
                    <div className="text-sm text-teal-100">{fact.label}</div>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Fahrverbot verhindern</h2>
            <p className="text-slate-600">Mögliche Verteidigungsstrategien:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defensePoints.map((point, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1} className="w-full">
                <AnimatedCard className="flex items-center gap-3 p-6 bg-slate-50 rounded-2xl hover:bg-teal-50 transition-colors">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="text-teal-500" size={20} />
                  </div>
                  <span className="text-slate-700 font-medium">{point}</span>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Avoid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Fahrverbot umgehen</h2>
            <p className="text-slate-600">Diese Möglichkeiten gibt es:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {waysToAvoid.map((way, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} className="w-full">
                <AnimatedCard className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingDown className="text-teal-600" size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{way.title}</h3>
                  <p className="text-slate-600 text-sm">{way.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Fahrverbot droht?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Lassen Sie Ihren Fall kostenlos prüfen.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
