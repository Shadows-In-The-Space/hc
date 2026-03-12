import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';
import {
  Car,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Upload,
  HelpCircle,
  Zap,
  Gauge,
  Sparkles,
  FileText,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { ChatInterface } from '../components/chatbot';
import { FAQSection, verkehrsrechtFAQs } from '../components/FAQSection';
import { generateOrganizationSchema, generateFAQSchema } from '../utils/seo';
import { useCountUp } from '../hooks/useCountUp';

export default function Verkehrsrecht() {
  // Structured Data für SEO
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(verkehrsrechtFAQs);

  const steps = [
    {
      title: "Bescheid hochladen",
      description: "Laden Sie Ihren Bußgeldbescheid bequem online hoch oder beantworten Sie ein paar Fragen.",
      icon: Upload
    },
    {
      title: "Kostenlose Prüfung",
      description: "Unsere Experten prüfen Ihren Fall innerhalb von 24 Stunden.",
      icon: ShieldCheck
    },
    {
      title: "Erfolgreich wehren",
      description: "Wir setzen Ihre Rechte durch – ohne Kostenrisiko für Sie.",
      icon: CheckCircle2
    }
  ];

  const topics = [
    {
      title: "Geschwindigkeitsverstoß",
      description: "Blitzer, Lasermessung & Radarkontrollen. Häufig sind Messungen fehlerhaft.",
      icon: Gauge,
      color: "from-orange-500 to-red-500",
      link: "/geschwindigkeit"
    },
    {
      title: "Rotlichtverstoß",
      description: "Ampelphase und Messung prüfen lassen. Oft kann erfolgreich verteidigt werden.",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
      link: "/rotlichtverstoss"
    },
    {
      title: "Abstandsverstoß",
      description: "Videoaufzeichnungen analysieren. Abstandsmessungen sind oft angreifbar.",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-500",
      link: "/fahrverbot"
    },
    {
      title: "Handy am Steuer",
      description: "Nicht jeder Fall ist eindeutig. Wir prüfen die Beweislage.",
      icon: HelpCircle,
      color: "from-blue-500 to-cyan-500",
      link: "/handy-am-steuer"
    }
  ];

  const advantages = [
    {
      title: "Kein Kostenrisiko",
      description: "Sie zahlen nur im Erfolgsfall. Kein Vorabrisiko.",
      icon: ShieldCheck,
      stat: "100%"
    },
    {
      title: "Erfolgsquote",
      description: "Hohe Erfolgsquote bei der Verteidigung Ihrer Rechte.",
      icon: Award,
      stat: "95%"
    },
    {
      title: "Schnelle Prüfung",
      description: "Innerhalb von 24 Stunden wissen Sie, wie Ihre Chancen stehen.",
      icon: Clock,
      stat: "24h"
    },
    {
      title: "Erfahrene Anwälte",
      description: "Netzwerk aus spezialisierten Partneranwälten bundesweit.",
      icon: Users,
      stat: "50+"
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Dark Slate Theme */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/hero_verkehrsrecht.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-slate-800/90" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <ScrollReveal direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8">
              <Car size={14} /> VERKEHRSRECHT
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Bußgeldbescheid erhalten? <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Einspruch einlegen.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
              Jeder dritte Bußgeldbescheid ist fehlerhaft. Lassen Sie Ihren Bescheid kostenlos prüfen.
            </p>
          </ScrollReveal>

          {/* Trust Badges */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2">
                <img src="/tuev-siegel.webp" alt="TÜV" className="w-6 h-6" />
                <span className="text-slate-300 text-sm font-medium">TÜV geprüft</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <span className="bg-teal-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded">4,8</span>
                <span className="text-teal-400">★</span>
                <span>Trustpilot</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <CheckCircle2 size={16} className="text-teal-400" />
                <span>20.000+ Kunden</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Chat Interface */}
          <ScrollReveal direction="up" delay={0.25}>
            <ChatInterface />
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Banner - Glassmorphism */}
      <section className="py-8 px-6 relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {(() => {
                const { count: count95, ref: ref95 } = useCountUp({ end: 95, duration: 2000 });
                const { count: count24, ref: ref24 } = useCountUp({ end: 24, duration: 1500 });
                const { count: count50, ref: ref50 } = useCountUp({ end: 50, duration: 2000 });
                return (
                  <>
                    <div>
                      <div className="text-4xl font-bold text-teal-400 mb-2" ref={ref95}>{count95}%</div>
                      <div className="text-sm text-slate-400">Erfolgsquote</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-teal-400 mb-2" ref={ref24}>{count24}h</div>
                      <div className="text-sm text-slate-400">Prüfzeit</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-teal-400 mb-2" ref={ref50}>{count50}+</div>
                      <div className="text-sm text-slate-400">Anwälte</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-teal-400 mb-2">€0</div>
                      <div className="text-sm text-slate-400">Vorkosten</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - Modern Timeline Design */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/50 via-cyan-100/30 to-blue-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-sm font-semibold mb-6"
              >
                <Sparkles size={16} /> Sofort starten
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">In 3 Schritten zum Recht</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                So einfach funktioniert unsere kostenlose Prüfung.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline with connected nodes */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-teal-400 to-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.2}>
                  <div className="relative flex flex-col items-center">
                    {/* Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
                      className="relative z-10 w-20 h-20 mb-8"
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl ${
                        i === 1 ? 'bg-gradient-to-br from-teal-400 to-cyan-500' : 'bg-white border-4 border-slate-100'
                      }`}>
                        <step.icon size={32} className={i === 1 ? 'text-white' : 'text-slate-700'} />
                      </div>
                      {/* Glow for middle step */}
                      {i === 1 && (
                        <div className="absolute inset-0 rounded-full bg-teal-400 blur-xl opacity-50 animate-pulse" />
                      )}
                    </motion.div>

                    {/* Card - alle gleich groß */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`relative w-full p-8 rounded-3xl text-center h-[280px] flex flex-col ${
                        i === 1
                          ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-2xl shadow-teal-500/25'
                          : 'bg-white border border-slate-100 shadow-xl'
                      }`}
                    >
                      {/* Step number */}
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 1 ? 'bg-white text-teal-600' : 'bg-slate-900 text-white'
                      }`}>
                        {i + 1}
                      </div>

                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        i === 1 ? 'bg-white/20' : 'bg-slate-100'
                      }`}>
                        <step.icon size={28} className={i === 1 ? 'text-white' : 'text-slate-700'} />
                      </div>

                      <h3 className={`font-bold text-xl mb-3 ${i === 1 ? 'text-white' : 'text-slate-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`leading-relaxed ${i === 1 ? 'text-teal-100' : 'text-slate-500'}`}>
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid - Glassmorphism Cards */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Welche Verstöße wir behandeln</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Wir helfen Ihnen bei allen gängigen Verkehrsverstößen.
              </p>
            </div>
          </ScrollReveal>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, i) => (
              <Link key={i} to={topic.link}>
                <AnimatedCard className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer h-[220px] flex flex-col justify-between">
                  {/* Blurred background image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/card-verkehr.jpeg"
                      alt=""
                      className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent" />
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 z-10`} />

                  <div className="relative z-20 flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <topic.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-teal-300 transition-colors">{topic.title}</h3>
                    </div>
                  </div>

                  <div className="relative z-20">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{topic.description}</p>
                  </div>

                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowRight size={16} className="text-teal-400" />
                  </div>
                </AnimatedCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section - Parallax Style */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Warum helpcheck?</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Ihre Vorteile auf einen Blick.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <AnimatedCard className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-5xl font-bold text-teal-500 mb-3">{adv.stat}</div>
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700 mx-auto mb-4">
                    <adv.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{adv.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{adv.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bußgeldbescheid erhalten?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Lassen Sie jetzt kostenlos prüfen, ob Sie Einspruch einlegen können.
              Kein Risiko – Sie zahlen nur im Erfolgsfall.
            </p>
            <Link to="/">
              <AnimatedCard className="inline-block">
                <button className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-teal-400/25 hover:shadow-teal-400/40 transition-all inline-flex items-center gap-2">
                  Kostenlos prüfen <ArrowRight size={20} />
                </button>
              </AnimatedCard>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection id="faq" title="Häufige Fragen zum Verkehrsrecht" faqs={verkehrsrechtFAQs} />
    </div>
    </>
  );
}
