import React from 'react';
import { motion } from 'motion/react';
import { Database, ArrowRight, CheckCircle2, AlertTriangle, Shield, Clock, Users, Mail, Phone, ChevronRight, Lock, Eye, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';
import { useCountUp } from '../hooks/useCountUp';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';

export default function FacebookDatenleck() {
  const facts = [
    {
      number: 533,
      unit: "Millionen",
      label: "Betroffene Nutzer",
      suffix: '+'
    },
    {
      number: 106,
      unit: "Länder",
      label: "Betroffene Regionen",
      suffix: ''
    },
    {
      number: 2021,
      unit: "",
      label: "Jahr des Leaks",
      suffix: ''
    },
    {
      number: 100,
      unit: "%",
      label: "Entschädigung möglich",
      suffix: '+'
    }
  ];

  const leakedData = [
    { label: "Vollständiger Name", included: true },
    { label: "Telefonnummer", included: true },
    { label: "E-Mail-Adresse", included: true },
    { label: "Standort", included: true },
    { label: "Geburtsdatum", included: true },
    { label: "Geschlecht", included: true },
    { label: "Beruf", included: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.4),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-bold mb-8"
          >
            <Database size={14} /> DATENLECK
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Facebook Datenleck <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              533 Mio. Nutzer betroffen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Ihre Daten wurden geleakt? Sie haben Anspruch auf Schadensersatz. Prüfen Sie jetzt kostenlos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 px-6 relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {facts.map((fact, i) => {
                const { count, ref } = useCountUp({ end: fact.number, duration: 2000 });
                return (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2" ref={ref}>
                      {count}{fact.suffix}<span className="text-2xl">{fact.unit}</span>
                    </div>
                    <div className="text-sm text-blue-100">{fact.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What was leaked */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Welche Daten wurden geleakt?</h2>
            <p className="text-slate-600">Diese sensiblen Daten waren öffentlich zugänglich:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leakedData.map((item, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1}>
                <AnimatedCard className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                  <span className="text-slate-700">{item.label}</span>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Was können Sie tun?</h2>
            <p className="text-slate-600">So können Sie handeln:</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { title: "Prüfen lassen", desc: "Ermitteln Sie, ob Ihre Daten betroffen sind" },
              { title: "Dokumentieren", desc: "Sammeln Sie Beweise für den Schaden" },
              { title: "Entschädigung fordern", desc: "Sie haben Anspruch auf Schadensersatz" }
            ].map((item, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1}>
                <AnimatedCard className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sind Ihre Daten betroffen?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Lassen Sie jetzt kostenlos prüfen, ob Sie Anspruch auf Entschädigung haben.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
