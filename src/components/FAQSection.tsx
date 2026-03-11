import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  id?: string;
  title: string;
  faqs: FAQ[];
  className?: string;
}

export const verkehrsrechtFAQs: FAQ[] = [
  {
    question: "Wie lange kann ich Einspruch gegen einen Bußgeldbescheid einlegen?",
    answer: "Sie haben zwei Wochen nach Zustellung des Bescheids Zeit, Einspruch einzulegen. Diese Frist kann unter bestimmten Umständen verlängert werden."
  },
  {
    question: "Was kostet die Einspruch-Prüfung?",
    answer: "Die erste Prüfung Ihres Falls ist bei uns kostenlos. Sie zahlen nur im Erfolgsfall."
  },
  {
    question: "Wie hoch sind die Erfolgsaussichten?",
    answer: "Unsere Anwälte haben eine Erfolgsquote von über 95%. Jeder Fall wird jedoch individuell geprüft."
  },
  {
    question: "Was passiert nach einem erfolgreichen Einspruch?",
    answer: "Bei einem erfolgreichen Einspruch wird der Bescheid aufgehoben und Sie müssen keine Strafe zahlen."
  }
];

export const datenskandalFAQs: FAQ[] = [
  {
    question: "Wie erfahre ich, ob meine Daten betroffen sind?",
    answer: "Sie können dies kostenlos auf unserer Webseite prüfen lassen. Unsere Experten analysieren, ob Ihre Daten in bekannten Leaks auftauchen."
  },
  {
    question: "Welche Entschädigung kann ich fordern?",
    answer: "Die Höhe der Entschädigung hängt von verschiedenen Faktoren ab. Gerne prüfen wir Ihren individuellen Fall."
  },
  {
    question: "Was kostet die Durchsetzung meiner Ansprüche?",
    answer: "Wir arbeiten auf Erfolgsbasis. Sie zahlen nur, wenn wir erfolgreich Entschädigung für Sie durchsetzen."
  },
  {
    question: "Wie lange dauert ein Verfahren?",
    answer: "Die Dauer variesiert je nach Komplexität des Falls. In der Regel können Sie mit mehreren Monaten rechnen."
  }
];

export function FAQSection({ id, title, faqs, className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`py-24 px-6 bg-slate-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Hier beantworten wir die häufigsten Fragen.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <span className="shrink-0">
                  {openIndex === i ? (
                    <Minus className="text-teal-500" size={20} />
                  ) : (
                    <Plus className="text-teal-500" size={20} />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
