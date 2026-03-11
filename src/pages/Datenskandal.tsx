import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Users,
  Database,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ChatInterface } from '../components/chatbot';
import { FAQSection, datenskandalFAQs } from '../components/FAQSection';
import { generateOrganizationSchema, generateFAQSchema } from '../utils/seo';
import { Link } from 'react-router-dom';

export default function Datenskandal() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(datenskandalFAQs);

  const dataBreaches = [
    {
      title: "Facebook Datenleck",
      description: "Milliarden von Nutzerdaten wurden offengelegt. Prüfen Sie jetzt, ob Ihre Daten betroffen sind.",
      icon: Database,
      color: "from-blue-500 to-blue-700",
      link: "/facebook-datenleck",
      stats: "533M Nutzer betroffen"
    },
    {
      title: "LinkedIn Datenleck",
      description: "Persönliche Daten von LinkedIn-Nutzern wurden im Darknet verkauft.",
      icon: Users,
      color: "from-blue-600 to-blue-800",
      link: "/linkedin-datenleck",
      stats: "700M+ Datensätze"
    },
    {
      title: "Deezer Datenleck",
      description: "Millionen Deezer-Nutzerdaten wurden kompromittiert.",
      icon: Database,
      color: "from-purple-500 to-purple-700",
      link: "/deezer-datenleck",
      stats: "200M+ Datensätze"
    }
  ];

  const steps = [
    {
      title: "Prüfen",
      description: "Ermitteln Sie kostenlos, ob Ihre Daten betroffen sind.",
      icon: Shield
    },
    {
      title: "Dokumentieren",
      description: "Wir helfen Ihnen, den Schaden zu dokumentieren.",
      icon: FileText
    },
    {
      title: "Entschädigung",
      description: "Fordern Sie Ihre gerechte Entschädigung ein.",
      icon: Lock
    }
  ];

  const advantages = [
    {
      title: "Kostenlose Prüfung",
      description: "Erste Einschätzung ohne Kosten für Sie",
      icon: Shield,
      stat: "Kostenlos"
    },
    {
      title: "Erfahrene Anwälte",
      description: "Netzwerk aus Datenschutzexperten",
      icon: Users,
      stat: "50+"
    },
    {
      title: "Schnelle Abwicklung",
      description: "Effektive Bearbeitung Ihres Falls",
      icon: Clock,
      stat: "24h"
    },
    {
      title: "Erfolgsorientiert",
      description: "Sie zahlen nur im Erfolgsfall",
      icon: CheckCircle2,
      stat: "100%"
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-bold mb-8"
          >
            <Lock size={14} /> DATENSCHUTZ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Ihre Daten wurden geleakt? <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Jetzt wehren.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10"
          >
            Nutzerdaten werden täglich kompromittiert. Prüfen Sie, ob Sie betroffen sind und fordern Sie Entschädigung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12"
          >
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2">
              <img src="/tuev-siegel.webp" alt="TÜV" className="w-6 h-6" />
              <span className="text-slate-300 text-sm font-medium">TÜV geprüft</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <span className="bg-blue-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded">4,8</span>
              <span className="text-blue-400">★</span>
              <span>Trustpilot</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={16} className="text-blue-400" />
              <span>50.000+ Nutzer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Data Breaches Carousel */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Bekannte Datenlecks</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Diese großen Datenlecks haben Millionen von Nutzern betroffen.
            </p>
          </motion.div>

          <div className="flex justify-end gap-2 mb-6">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {dataBreaches.map((breach, i) => (
              <Link key={i} to={breach.link} className="shrink-0 snap-start">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer w-[400px] shrink-0"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${breach.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${breach.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}>
                      <breach.icon size={28} />
                    </div>
                    <div className="text-blue-400 text-sm font-bold mb-2">{breach.stats}</div>
                    <h3 className="font-bold text-xl text-white mb-3 group-hover:text-blue-300 transition-colors">{breach.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{breach.description}</p>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                      <span>Jetzt prüfen</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So funktioniert's</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              In drei Schritten zu Ihrem Recht.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                    <step.icon size={32} />
                  </div>
                  <div className="absolute top-6 right-8 text-6xl font-bold text-slate-100">{i + 1}</div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-blue-400" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Warum helpcheck?</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Ihre Vorteile auf einen Blick.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl font-bold text-blue-500 mb-3">{adv.stat}</div>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700 mx-auto mb-4">
                  <adv.icon size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{adv.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Datenleck entdeckt?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Lassen Sie jetzt kostenlos prüfen, ob Sie betroffen sind und Anspruch auf Entschädigung haben.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-400/25 hover:shadow-blue-400/40 transition-all inline-flex items-center gap-2"
              >
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection id="faq" title="Häufige Fragen zum Thema Datenleck" faqs={datenskandalFAQs} />
    </div>
    </>
  );
}
