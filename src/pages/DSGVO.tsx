import React from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DSGVO() {
  const rights = [
    { title: "Auskunftsrecht", desc: "Sie können verlangen, welche Daten über Sie gespeichert sind" },
    { title: "Löschrecht", desc: "Sie können die Löschung Ihrer Daten verlangen" },
    { title: "Widerspruchsrecht", desc: "Sie können der Datenverarbeitung widersprechen" },
    { title: "Datenportabilität", desc: "Sie können Ihre Daten in einem maschinenlesbaren Format erhalten" }
  ];

  const scenarios = [
    { title: "Unrechtmäßige Werbung", desc: "Sie erhalten unerwünschte Werbung", icon: Mail },
    { title: "Datenleck", desc: "Ihre Daten wurden kompromittiert", icon: Lock },
    { title: "Keine Einwilligung", desc: "Daten wurden ohne Erlaubnis erhoben", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.4),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-xs font-bold mb-8">
            <Shield size={14} /> DATENSCHUTZ
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            DSGVO <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Ihre Rechte kennen
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Die Datenschutz-Grundverordnung gibt Ihnen starke Rechte. Wir helfen Ihnen, diese durchzusetzen.
          </motion.p>

          <Link to="/">
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
              Kostenlos prüfen <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ihre Rechte nach DSGVO</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-50 rounded-2xl">
                <CheckCircle2 className="text-indigo-500 mb-3" size={24} />
                <h3 className="font-bold text-slate-900 mb-2">{right.title}</h3>
                <p className="text-slate-500 text-sm">{right.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Wann helfen wir?</h2>
          </motion.div>

          <div className="space-y-4">
            {scenarios.map((scenario, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <scenario.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{scenario.title}</h3>
                  <p className="text-slate-500 text-sm">{scenario.desc}</p>
                </div>
                <ChevronRight className="text-indigo-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">DSGVO-Verletzung?</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">Wir setzen Ihre Rechte durch.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
