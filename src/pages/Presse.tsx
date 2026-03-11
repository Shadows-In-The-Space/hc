import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, ArrowRight, ExternalLink, Quote, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Presse() {
  const pressCoverage = [
    { source: "Handelsblatt", date: "15.02.2026", title: "helpcheck revolutioniert den Zugang zum Recht" },
    { source: "Tagesspiegel", date: "10.02.2026", title: "Startup bietet kostenlose Rechtsberatung" },
    { source: "Gründerszene", date: "05.02.2026", title: "helpcheck sammelt 5 Millionen Euro ein" },
    { source: "WirtschaftsWoche", date: "28.01.2026", title: "Die Zukunft der Rechtsberatung" }
  ];

  const pressReleases = [
    { date: "20.02.2026", title: "helpcheck expands to Austria" },
    { date: "15.01.2026", title: "New partnership with leading law firms" },
    { date: "10.12.2025", title: "helpcheck reaches 50,000 users" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.3),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
            <Newspaper size={14} /> PRESSE
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Presse <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              & Medien
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
            Hier finden Sie alle Informationen für Journalisten und Medienvertreter.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Presseberichte</h2>
          </motion.div>

          <div className="space-y-4">
            {pressCoverage.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 font-bold text-sm">
                    {item.source.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.source} · {item.date}</p>
                  </div>
                </div>
                <ExternalLink className="text-teal-500" size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pressemitteilungen</h2>
          </motion.div>

          <div className="space-y-4">
            {pressReleases.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <Calendar className="text-teal-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm shrink-0 w-24">{item.date}</span>
                <span className="font-medium text-slate-900">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pressekontakt</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-slate-50 p-8 rounded-2xl text-center">
            <p className="text-slate-600 mb-4">Für Presseanfragen wenden Sie sich bitte an:</p>
            <p className="text-teal-600 font-medium">presse@helpcheck.de</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">Pressematerial herunterladen</h2>
            <p className="text-slate-300 text-lg mb-8">Logos, Bilder und Factsheets.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Herunterladen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
