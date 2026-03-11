import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const stats = [
    { number: "50.000+", label: "Zufriedene Kunden" },
    { number: "95%", label: "Erfolgsquote" },
    { number: "24h", label: "Durchschnittliche Bearbeitung" },
    { number: "50+", label: "Partneranwälte" }
  ];

  const values = [
    { title: "Transparenz", desc: "Keine versteckten Kosten. Sie zahlen nur im Erfolgsfall.", icon: Shield },
    { title: "Schnelligkeit", desc: "Wir bearbeiten Ihre Anfrage innerhalb von 24 Stunden.", icon: Clock },
    { title: "Qualität", desc: "Erfahrene Anwälte mit Spezialisierung auf Ihr Recht.", icon: Award }
  ];

  const team = [
    { name: "Dr. Frank Breitschwerdt", role: "Geschäftsführer", image: "/team-1.avif" },
    { name: "Marc-André Rödder", role: "Leiter Produktteam", image: "/team-2.avif" },
    { name: "Daniel Monjean", role: "Leiter Kundenservice", image: "/team-3.avif" }
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
            <Users size={14} /> ÜBER UNS
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            helpcheck <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Ihr Partner für Recht
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
            Wir machen Recht einfach zugänglich. Kostenlose Prüfung. Kein Risiko. Nur Erfolg.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <span className="bg-teal-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded">4,8</span>
              <span className="text-teal-400">★</span>
              <span>Trustpilot</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>TÜV geprüft</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-teal-500 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Unsere Werte</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Unser Team</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Erfahrene Experten an Ihrer Seite.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="relative mb-6 mx-auto w-40 h-40">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg" />
                  <div className="absolute inset-0 rounded-full ring-2 ring-teal-400/30" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kontakt</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 bg-slate-50 rounded-2xl text-center">
              <Mail className="mx-auto text-teal-500 mb-3" size={24} />
              <h3 className="font-bold text-slate-900 mb-1">E-Mail</h3>
              <p className="text-slate-500 text-sm">kontakt@helpcheck.de</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-6 bg-slate-50 rounded-2xl text-center">
              <Phone className="mx-auto text-teal-500 mb-3" size={24} />
              <h3 className="font-bold text-slate-900 mb-1">Telefon</h3>
              <p className="text-slate-500 text-sm">+49 (0) 30 12345678</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-6 bg-slate-50 rounded-2xl text-center">
              <MapPin className="mx-auto text-teal-500 mb-3" size={24} />
              <h3 className="font-bold text-slate-900 mb-1">Adresse</h3>
              <p className="text-slate-500 text-sm">Berlin, Deutschland</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">Bereit, Ihr Recht durchzusetzen?</h2>
            <p className="text-slate-300 text-lg mb-8">Lassen Sie uns Ihren Fall kostenlos prüfen.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Kostenlos starten <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
