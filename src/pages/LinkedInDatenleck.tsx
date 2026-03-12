import React from 'react';
import { motion } from 'motion/react';
import { Database, ArrowRight, CheckCircle2, Shield, Clock, Users, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot';
import { useCountUp } from '../hooks/useCountUp';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';

export default function LinkedInDatenleck() {
  const facts = [
    { number: 700, unit: "Millionen", label: "Betroffene Nutzer", suffix: '+' },
    { number: 2022, unit: "", label: "Jahr des Leaks", suffix: '' },
    { number: 90, unit: "%", label: "Daten echt", suffix: '' },
    { number: 100, unit: "%", label: "Entschädigung möglich", suffix: '+' }
  ];

  const leakedData = [
    { label: "Vollständiger Name", included: true, icon: Users },
    { label: "E-Mail-Adresse", included: true, icon: Mail },
    { label: "Telefonnummer", included: true, icon: Phone },
    { label: "Physische Adresse", included: true, icon: MapPin },
    { label: "Berufserfahrung", included: true, icon: Briefcase },
    { label: "LinkedIn Profile URL", included: true, icon: Database },
    { label: "Soziale Konten", included: true, icon: Shield }
  ];

  const steps = [
    { title: "Prüfen", description: "Ermitteln Sie, ob Ihre Daten betroffen sind" },
    { title: "Dokumentieren", description: "Sammeln Sie Beweise für den Schaden" },
    { title: "Entschädigung", description: "Sie haben Anspruch auf Schadensersatz" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Real Image */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_datenskandal.jpeg"
            alt="LinkedIn Datenleck"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/70 to-slate-800/90" />
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
            LinkedIn Datenleck <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              700+ Mio. Nutzer betroffen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Ihre beruflichen Daten wurden geleakt? Prüfen Sie jetzt kostenlos Ihren Anspruch auf Schadensersatz.
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

      {/* Stats Banner with CountUp Animation */}
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

      {/* Leaked Data with Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Welche Daten wurden geleakt?</h2>
            <p className="text-slate-600">Diese sensiblen Daten waren betroffen:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leakedData.map((item, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1}>
                <AnimatedCard className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="text-blue-500" size={20} />
                  </div>
                  <span className="text-slate-700 font-medium">{item.label}</span>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">So funktioniert's</h2>
            <p className="text-slate-600">In 3 Schritten zu Ihrem Recht:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                <AnimatedCard className="bg-white p-8 rounded-3xl shadow-lg text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sind Ihre Daten betroffen?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Lassen Sie jetzt kostenlos prüfen.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
