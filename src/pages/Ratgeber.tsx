import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  ChevronRight,
  Search,
  Calendar,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Ratgeber() {
  const categories = [
    {
      title: "Verkehrsrecht",
      description: "Alles rund um Bußgelder, Fahrverbote und Verkehrsverstöße",
      icon: Shield,
      color: "from-teal-500 to-cyan-500",
      articles: [
        "Bußgeldbescheid: Was tun?",
        "Fahrverbot umgehen",
        "Geschwindigkeitsmessung anzweifeln",
        "Rotlichtverstoß: Verteidigungsmöglichkeiten"
      ]
    },
    {
      title: "Datenschutz",
      description: "Ihre Rechte nach DSGVO und bei Datenlecks",
      icon: Shield,
      color: "from-blue-500 to-indigo-500",
      articles: [
        "DSGVO: Ihre Rechte",
        "Datenleck - was nun?",
        "Schadensersatz fordern",
        "Datenschutz-Grundverordnung einfach erklärt"
      ]
    },
    {
      title: "Verbraucherrecht",
      description: "Schutz für Verbraucher bei Problemen",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      articles: [
        "Rückgaberecht online",
        "Gewährleistung vs. Garantie",
        "Flugverspätung: Entschädigung",
        "Beschwerde richtig einreichen"
      ]
    }
  ];

  const articles = [
    {
      title: "Bußgeldbescheid erhalten: Die ersten Schritte",
      excerpt: "Was Sie tun sollten, wenn Sie einen Bußgeldbescheid bekommen haben.",
      category: "Verkehrsrecht",
      readTime: "5 min",
      date: "15.02.2026"
    },
    {
      title: "Wie Sie Ihren Bußgeldbescheid anfechten",
      excerpt: "Ein Widerspruch kann sich lohnen. Hier erfahren Sie, wie es geht.",
      category: "Verkehrsrecht",
      readTime: "8 min",
      date: "12.02.2026"
    },
    {
      title: "DSGVO: Das sind Ihre Rechte",
      excerpt: "Die Datenschutz-Grundverordnung gibt Ihnen starke Rechte.",
      category: "Datenschutz",
      readTime: "6 min",
      date: "10.02.2026"
    },
    {
      title: "Datenleck: Muss ich mir Sorgen machen?",
      excerpt: "Wenn Ihre Daten geleakt wurden, gibt es Schadensersatz.",
      category: "Datenschutz",
      readTime: "7 min",
      date: "08.02.2026"
    },
    {
      title: "Fahrverbot: Ausnahmen und Möglichkeiten",
      excerpt: "Unter bestimmten Umständen können Sie ein Fahrverbot abwenden.",
      category: "Verkehrsrecht",
      readTime: "10 min",
      date: "05.02.2026"
    },
    {
      title: "Was tun bei Flugverspätung?",
      excerpt: "Bis zu 600€ Entschädigung bei Flugverspätungen möglich.",
      category: "Verbraucherrecht",
      readTime: "5 min",
      date: "03.02.2026"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.3),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-bold mb-8"
          >
            <BookOpen size={14} /> RATGEBER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Ihr Ratgeber für <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              rechtliche Fragen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10"
          >
            Verständliche Informationen zu Ihren Rechten. Einfach erklärt.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Suchen Sie nach Themen..."
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Themenwelten</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Wählen Sie einen Bereich, der Sie interessiert.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}>
                  <category.icon size={28} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{category.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, j) => (
                    <li key={j}>
                      <Link to="/" className="flex items-center gap-2 text-teal-600 text-sm hover:text-teal-700">
                        <ChevronRight size={14} />
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Aktuelle Artikel</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Hilfreiche Informationen zu aktuellen Themen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Link to="/">
                  <div className="bg-slate-50 p-6 rounded-2xl hover:bg-slate-100 transition-colors h-full border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded">{article.category}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {article.date}
                      </span>
                      <span className="text-teal-600 font-medium flex items-center gap-1">
                        Weiterlesen <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Noch Fragen?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Lassen Sie Ihre Situation kostenlos von unseren Experten prüfen.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-teal-400/25 hover:shadow-teal-400/40 transition-all inline-flex items-center gap-2"
              >
                Kostenlos prüfen <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
