import React from 'react';
import { motion } from 'motion/react';
import { Car, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServicesSectionProps {
  variant?: 'default' | 'embedded';
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ variant = 'default' }) => {
  const services = [
    {
      icon: Car,
      title: 'Verkehrsrecht',
      description: 'Bußgeldbescheide prüfen, Fahrverbote abwenden und Punkte in Flensburg reduzieren.',
      link: '/verkehrsrecht',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Datenleck-Prüfung',
      description: 'Erstellen Sie einen kostenlosen Bericht zu Ihren Daten und erfassen Sie Schadensersatzansprüche.',
      link: '/datenskandal',
      color: 'from-teal-500 to-emerald-600'
    }
  ];

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {services.map((service, i) => (
        <Link key={i} to={service.link} onClick={() => window.scrollTo(0, 0)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 hover:border-teal-500/30 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
              <service.icon className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{service.description}</p>
            <div className="flex items-center gap-2 text-teal-400 text-sm font-medium">
              <span>Jetzt prüfen</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );

  if (variant === 'embedded') {
    return content;
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unsere Leistungen</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Wir setzen uns für Ihre Rechte ein – schnell, unkompliziert und kostenlos.
          </p>
        </motion.div>
        {content}
      </div>
    </section>
  );
};

export default ServicesSection;
