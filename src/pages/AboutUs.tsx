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
  Star,
  Target,
  Heart,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const stats = [
    { number: "75 Mio. €", label: "Durchgesetzte Summe" },
    { number: "100.000+", label: "Bearbeitete Fälle" },
    { number: "2016", label: "Gegründet" },
    { number: "Düsseldorf", label: "Standort" }
  ];

  const values = [
    { title: "Service", desc: "Wir begleiten Sie persönlich und mit größter Sorgfalt – von der ersten Prüfung bis zum erfolgreichen Abschluss.", icon: Heart },
    { title: "Erfahrung", desc: "Unser Team vereint fundiertes Fachwissen mit jahrelanger Praxiserfahrung im Verbraucherrecht.", icon: Award },
    { title: "Komfort", desc: "Mit intuitiven Abläufen und klarer Kommunikation machen wir Ihren Rechtsweg so angenehm wie möglich.", icon: Zap }
  ];

  const team = [
    { name: "Dr. Frank Breitschwerdt", role: "Geschäftsführer", image: "/team-1.avif" },
    { name: "Marc-André Rödder", role: "Leiter Produktteam", image: "/team-2.avif" },
    { name: "Daniel Monjean", role: "Leiter Kundenservice", image: "/team-3.avif" },
    { name: "David Said", role: "Leiter Marketing", image: "/team-4.avif" },
    { name: "Robin Stock", role: "Leiter Produkt Verkehrsrecht", image: "/team-5.avif" },
    { name: "Nathalie von der Twer", role: "Leiterin Kundenservice Verkehrsrecht", image: "/team-6.avif" },
    { name: "Timo Schell", role: "Rechtsanwalt", image: "/team-7.webp" },
    { name: "Yağmur Özkan", role: "Rechtsanwältin", image: "/team-8.webp" },
    { name: "Dinah Bähr", role: "Rechtsanwältin", image: "/team-9.webp" }
  ];

  const press = [
    { date: "05.09.2025", source: "Express.de", title: "Nach den Sommerferien: Achtung! Wer jetzt Post bekommt" },
    { date: "11.07.2025", source: "Article", title: "Zu Unrecht geblitzt: In vielen Fällen sollten Sie das Bußgeld nicht sofort bezahlen" },
    { date: "30.06.2025", source: "Article", title: "Blitzer: Bußgeld-Bescheide oft fehlerhaft - Einspruch prüfen" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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
            Seit 2016 setzen wir gemeinsam mit spezialisierten Partneranwälten und modernster Technologie Ihre Ansprüche durch.
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
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <Shield size={16} className="text-teal-400" />
              <span>Legal Tech Deutschland</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 px-6 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Recht bekommen – so einfach wie noch nie</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Unsere Plattform kombiniert juristische Expertise mit KI-gestützter Analyse und automatisierten Prozessen.
              Ob fehlerhafte Bußgeldbescheide oder andere Rechtsfragen: Wir verbinden das Beste aus zwei Welten – anwaltliche Kompetenz und technologische Innovation.
            </p>
            <p className="text-lg text-slate-600 font-medium">
              Für Sie bedeutet das: maximale Erfolgschancen bei minimalem Aufwand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Unsere Werte</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Was uns auszeichnet.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Das Team hinter Ihrem Anspruch</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Erfahrene Experten an Ihrer Seite.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="text-center">
                <div className="relative mb-6 mx-auto w-36 h-36">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg" />
                  <div className="absolute inset-0 rounded-full ring-2 ring-teal-400/30" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">helpcheck in der Presse</h2>
          </motion.div>

          <div className="space-y-4">
            {press.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center gap-4">
                <div className="shrink-0">
                  <div className="text-xs text-slate-400 font-medium">{item.date}</div>
                  <div className="text-sm text-teal-600 font-bold">{item.source}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                </div>
                <ArrowRight className="text-teal-400 shrink-0" size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              <p className="text-slate-500 text-sm">+49 (0) 211 542413 0</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-6 bg-slate-50 rounded-2xl text-center">
              <MapPin className="mx-auto text-teal-500 mb-3" size={24} />
              <h3 className="font-bold text-slate-900 mb-1">Adresse</h3>
              <p className="text-slate-500 text-sm">Düsseldorf, Deutschland</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">Bereit, Ihr Recht durchzusetzen?</h2>
            <p className="text-slate-300 text-lg mb-8">Kostenlose Ersteinschätzung ohne Verpflichtung.</p>
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
