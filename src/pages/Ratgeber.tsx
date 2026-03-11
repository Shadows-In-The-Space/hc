import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  ArrowRight,
  Shield,
  AlertTriangle,
  Car,
  Smartphone,
  MapPin,
  Users,
  FileText,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

export const verkehrsrechtArticles = [
  {
    slug: 'bussgeldbescheid-anfechten',
    title: 'Bußgeldbescheid anfechten',
    excerpt: 'Wann sich ein Einspruch lohnt, welche Fristen gelten und wie Sie vorgehen sollten.',
    category: 'Bußgeldverfahren',
    readTime: '6 Min.',
    icon: FileText
  },
  {
    slug: 'geblitzt-innerorts',
    title: 'Geblitzt innerorts – Bußgelder & Fahrverbote',
    excerpt: 'Die Strafen bei Geschwindigkeitsüberschreitungen im Ort.',
    category: 'Geschwindigkeit',
    readTime: '5 Min.',
    icon: Car
  },
  {
    slug: 'bei-rot-geblitzt',
    title: 'Bei Rot geblitzt – So reagieren Sie richtig',
    excerpt: 'Was tun, wenn Sie bei Rot über die Ampel fahren?',
    category: 'Rotlicht',
    readTime: '4 Min.',
    icon: AlertTriangle
  },
  {
    slug: 'handy-am-steuer',
    title: 'Handy am Steuer – Welche Strafen drohen?',
    excerpt: 'Die Konsequenzen bei Nutzung des Mobiltelefons während der Fahrt.',
    category: 'Handy',
    readTime: '4 Min.',
    icon: Smartphone
  },
  {
    slug: 'fahrverbot-umgehen',
    title: 'Fahrverbot in Geldstrafe umwandeln',
    excerpt: 'So können Sie ein Fahrverbot unter bestimmten Voraussetzungen umgehen.',
    category: 'Fahrverbot',
    readTime: '5 Min.',
    icon: MapPin
  },
  {
    slug: 'geblitzt-probezeit',
    title: 'Geblitzt in der Probezeit',
    excerpt: 'Was Fahranfänger bei einem Blitzer in der Probezeit beachten müssen.',
    category: 'Probezeit',
    readTime: '4 Min.',
    icon: Users
  }
];

export const datenskandalArticles = [
  {
    slug: 'facebook-datenskandal',
    title: 'Facebook Datenskandal: Schadensersatz sichern',
    excerpt: 'Wie Sie von dem Datenleck betroffen sind und wie Sie Entschädigung erhalten.',
    category: 'Datenleck',
    readTime: '5 Min.',
    icon: Shield
  },
  {
    slug: 'linkedin-schadensersatz',
    title: 'LinkedIn Datenskandal: Entschädigung sichern',
    excerpt: 'Schadensersatz für vom LinkedIn Datenleck betroffene Nutzer.',
    category: 'Datenleck',
    readTime: '4 Min.',
    icon: Shield
  },
  {
    slug: 'deezer-schadensersatz',
    title: 'Deezer Datenskandal: Schadensersatz sichern',
    excerpt: 'Ihre Rechte nach dem Deezer Datenleck.',
    category: 'Datenleck',
    readTime: '4 Min.',
    icon: Shield
  },
  {
    slug: 'datenleck-schadensersatz',
    title: 'Datenleck Schadensersatz: So funktioniert es',
    excerpt: 'Allgemeine Informationen zu Schadensersatzansprüchen bei Datenlecks.',
    category: 'Datenleck',
    readTime: '5 Min.',
    icon: Shield
  },
  {
    slug: 'datenleck-checker',
    title: 'Datenleck Checker: Bin ich betroffen?',
    excerpt: 'Prüfen Sie, ob Ihre Daten in einem bekannten Datenleck kompromittiert wurden.',
    category: 'Checker',
    readTime: '3 Min.',
    icon: CheckCircle2
  },
  {
    slug: 'datenleck-rechtsschutzversicherung',
    title: 'Datenleck & Rechtsschutzversicherung',
    excerpt: 'Schadensersatzansprüche mit und ohne Rechtsschutzversicherung durchsetzen.',
    category: 'Versicherung',
    readTime: '5 Min.',
    icon: Shield
  },
  {
    slug: 'tesla-schadensersatz',
    title: 'Tesla Datenskandal: Schadensersatz sichern',
    excerpt: 'Wie Sie von dem Tesla Datenleck betroffen sind und Entschädigung erhalten.',
    category: 'Datenleck',
    readTime: '5 Min.',
    icon: Shield
  },
  {
    slug: 'twitter-schadensersatz',
    title: 'Twitter/X Datenskandal: Schadensersatz sichern',
    excerpt: 'Schadensersatz nach dem Twitter Datenleck fordern.',
    category: 'Datenleck',
    readTime: '5 Min.',
    icon: Shield
  },
  {
    slug: 'facebook-entschaedigung',
    title: 'Facebook Entschädigung: Schadensersatz sichern',
    excerpt: 'Wie Sie Ihre Entschädigung aus dem Facebook Datenleck erhalten.',
    category: 'Datenleck',
    readTime: '5 Min.',
    icon: Shield
  }
];

export default function Ratgeber() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-24 px-6 overflow-hidden">
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
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Ratgeber & <span className="text-teal-400">Wissen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Kompetente Informationen zu Ihren Rechten bei Bußgeldern, Datenlecks und mehr.
          </motion.p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-6 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ratgeber#verkehrsrecht"
              className="px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
            >
              Verkehrsrecht
            </Link>
            <Link
              to="/ratgeber#datenskandal"
              className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-full font-medium hover:bg-slate-50 transition-colors"
            >
              Datenskandal
            </Link>
          </div>
        </div>
      </section>

      {/* Verkehrsrecht Articles */}
      <section id="verkehrsrecht" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Verkehrsrecht</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Alles rund um Bußgeldbescheide, Fahrverbote und Ihre Rechte im Straßenverkehr.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verkehrsrechtArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ArticleCard
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  readTime={article.readTime}
                  icon={article.icon}
                  variant="teal"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Datenskandal Articles */}
      <section id="datenskandal" className="py-20 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Datenskandal</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Informationen zu Datenlecks und wie Sie Schadensersatzansprüche geltend machen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datenskandalArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ArticleCard
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  readTime={article.readTime}
                  icon={article.icon}
                  variant="blue"
                />
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
            <h2 className="text-3xl font-bold text-white mb-6">
              Noch Fragen?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Lassen Sie Ihren Fall kostenlos von unseren Experten prüfen.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
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
