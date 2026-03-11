import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, title: "E-Mail", content: "kontakt@helpcheck.de", desc: "Wir antworten innerhalb von 24h" },
    { icon: Phone, title: "Telefon", content: "+49 (0) 30 12345678", desc: "Mo-Fr 9-18 Uhr" },
    { icon: MapPin, title: "Adresse", content: "Berlin, Deutschland", desc: "Bundesweit tätig" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-32 px-6 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/Loop_scale_pans_book_flip_3f093c618a.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-slate-800/90" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
            <Mail size={14} /> KONTAKT
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Kontakt <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Wir sind für Sie da
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
            Haben Sie Fragen? Wir helfen Ihnen gerne weiter. Kostenlos und unverbindlich.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-2xl text-center">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4">
                  <info.icon size={28} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                <p className="text-teal-600 font-medium">{info.content}</p>
                <p className="text-slate-500 text-sm mt-2">{info.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Nachricht senden</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <CheckCircle2 className="mx-auto text-teal-500 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Vielen Dank!</h3>
                  <p className="text-slate-500">Wir melden uns in Kürze bei Ihnen.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Vorname" required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                    <input type="text" placeholder="Nachname" required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <input type="email" placeholder="E-Mail-Adresse" required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                  <input type="tel" placeholder="Telefonnummer"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                  <textarea placeholder="Ihre Nachricht..." rows={5} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" />
                  <button type="submit"
                    className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Send size={20} /> Nachricht senden
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">Noch Fragen?</h2>
            <p className="text-slate-300 text-lg mb-8">Unser Team ist für Sie da.</p>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Zur Startseite <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
