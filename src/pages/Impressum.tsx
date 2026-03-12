import React from 'react';
import { motion } from 'motion/react';
import { Shield, Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Impressum() {
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
            Impressum
          </motion.h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-8">

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="text-slate-600 space-y-2">
                <p>helpcheck GmbH</p>
                <p>Georg-Glock-Str. 8</p>
                <p>40474 Düsseldorf</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Vertreten durch</h2>
              <div className="text-slate-600 space-y-2">
                <p>Geschäftsführer: Phil Sokowicz</p>
                <p>Geschäftsführer: Dr. Frank Breitschwerdt</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Kontakt</h2>
              <div className="text-slate-600 space-y-2">
                <p className="flex items-center gap-2"><Mail size={16} className="text-teal-500" /> help@helpcheck.de</p>
                <p className="flex items-center gap-2"><Phone size={16} className="text-teal-500" /> 0211 33 99 66 00</p>
                <p className="flex items-center gap-2"><MapPin size={16} className="text-teal-500" /> Düsseldorf, Deutschland</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Registereintrag</h2>
              <div className="text-slate-600 space-y-2">
                <p>Handelsregister: Amtsgericht Düsseldorf</p>
                <p>Registernummer: HRB 123456</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Umsatzsteuer-ID</h2>
              <div className="text-slate-600 space-y-2">
                <p>DE 123 456 789</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Verantwortlich für den Inhalt</h2>
              <div className="text-slate-600 space-y-2">
                <p>helpcheck GmbH</p>
                <p>Georg-Glock-Str. 8</p>
                <p>40474 Düsseldorf</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Haftungsausschluss</h2>
              <div className="text-slate-600 space-y-4 text-sm">
                <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
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
