import React from 'react';
import { motion } from 'motion/react';
import { Shield, Mail, ArrowRight, Lock, User, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
            <Shield size={14} /> RECHTLICH
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6">
            Datenschutz
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ihre Daten sind bei uns sicher.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-8">

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-teal-500" /> Verantwortlicher
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>helpcheck GmbH</p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
                <p className="flex items-center gap-2 mt-2"><Mail size={16} className="text-teal-500" /> datenschutz@helpcheck.de</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-teal-500" /> Erhebung und Verarbeitung personenbezogener Daten
              </h2>
              <div className="text-slate-600 space-y-4 text-sm">
                <p>Wir erheben personenbezogene Daten, wenn Sie uns diese freiwillig mitteilen. Dies kann beispielsweise bei der Kontaktaufnahme, der Nutzung unseres Kontaktformulars oder der Registrierung für unseren Newsletter der Fall sein.</p>
                <p>Die von Ihnen angegebenen Daten werden ausschließlich zum jeweiligen Zweck verarbeitet und nicht ohne Ihre Einwilligung an Dritte weitergegeben.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-teal-500" /> Cookies
              </h2>
              <div className="text-slate-600 space-y-4 text-sm">
                <p>Unsere Website verwendet Cookies, um die Nutzung der Website zu analysieren und die Benutzerfreundlichkeit zu verbessern. Sie können die Verwendung von Cookies in Ihren Browsereinstellungen deaktivieren.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Ihre Rechte</h2>
              <div className="text-slate-600 space-y-2 text-sm">
                <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Zudem haben Sie das Recht auf Datenübertragbarkeit.</p>
                <p>Für die Ausübung Ihrer Rechte wenden Sie sich bitte an: datenschutz@helpcheck.de</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Widerspruchsrecht</h2>
              <div className="text-slate-600 space-y-2 text-sm">
                <p>Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen. Wir werden Ihre Daten dann nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Änderungen dieser Datenschutzerklärung</h2>
              <div className="text-slate-600 space-y-2 text-sm">
                <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die jeweils aktuelle Version finden Sie auf dieser Seite.</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300">
            <ArrowRight size={16} className="-rotate-90" /> Zurück zur Startseite
          </Link>
        </div>
      </section>
    </div>
  );
}
