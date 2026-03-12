import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, ArrowRight, Users, Globe, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const benefits = [
    "Flexible Arbeitszeiten",
    "Remote-Work-Option",
    "Weiterbildungsbudget",
    "Modernes Arbeitsumfeld",
    "Versicherungspaket",
    "Team-Events"
  ];

  const openPositions = [
    { title: "Frontend-Entwickler (m/w/d)", type: "Vollzeit", location: "Berlin / Remote" },
    { title: "Backend-Entwickler (m/w/d)", type: "Vollzeit", location: "Berlin / Remote" },
    { title: "Rechtsanwalt (m/w/d)", type: "Vollzeit", location: "Berlin" },
    { title: "Customer Success Manager (m/w/d)", type: "Vollzeit", location: "Berlin" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.3),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
            <Briefcase size={14} /> KARRIERE
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Karriere bei <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              helpcheck
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
            Gestalten Sie die Zukunft des Rechts mit uns. Wir suchen Talente.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Offene Stellen</h2>
          </motion.div>

          <div className="space-y-4">
            {openPositions.map((position, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{position.title}</h3>
                  <p className="text-slate-500 text-sm">{position.location} · {position.type}</p>
                </div>
                <ArrowRight className="text-teal-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Was wir bieten</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 p-4 bg-white rounded-xl">
                <CheckCircle2 className="text-teal-500 shrink-0" size={20} />
                <span className="text-slate-700 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">Sie passen zu uns?</h2>
            <p className="text-slate-300 text-lg mb-8">Schicken Sie uns Ihre Bewerbung.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
              Bewerben <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
