import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Plus, Minus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

const faqCategories = [
  { id: 'service', label: 'Service', color: 'teal' },
  { id: 'arbeitsrecht', label: 'Arbeitsrecht', color: 'blue' },
  { id: 'verkehrsrecht', label: 'Verkehrsrecht', color: 'orange' },
  { id: 'versicherung', label: 'Lebensversicherung', color: 'purple' },
  { id: 'pkv', label: 'PKV-Rückerstattung', color: 'green' },
  { id: 'miete', label: 'Mietpreisbremse', color: 'pink' }
];

const faqData: Record<string, FAQ[]> = {
  service: [
    {
      question: "Wie kann ich meinen Rechtsanspruch prüfen lassen?",
      answer: "Die Eingabe aller für einen Rechtsanspruch relevanten Daten erfolgt online und per Formular auf www.helpcheck.de. Wählen Sie dazu einfach Ihren gewünschten Service aus. Sollten Sie Schwierigkeiten beim Ausfüllen der jeweiligen Formularfelder haben, kontaktieren Sie uns gerne über help@helpcheck.de."
    },
    {
      question: "Ich kann einige Fragen im Formular nicht sicher beantworten. Was kann ich tun?",
      answer: "Selbstverständlich möchten wir Sie in diesem Fall unterstützen. Da Ihre Angaben als Grundlage für die anwaltliche Tätigkeit dienen, ist es besonders wichtig, dass diese wahrheitsgemäß und möglichst detailliert übermittelt werden. Sofern Sie beim Ausfüllen der notwendigen Formularfelder Unterstützung benötigen, wenden Sie sich gerne an unseren Kundenservice unter 0211 33 99 66 00 (Mo - Fr 9:00 - 18:00 Uhr)."
    },
    {
      question: "Kann ich meine Unterlagen auch per Post senden?",
      answer: "Sie können uns Ihre Unterlagen gerne per Post zukommen lassen (idealerweise in Kopie). Wählen Sie dazu im Anmeldeprozess aus, dass Sie Ihre Unterlagen auf postalischem Wege einreichen möchten."
    },
    {
      question: "Was kostet helpcheck?",
      answer: "Egal, welchen unserer Services Sie nutzen: Wir erhalten nur dann ein Honorar, wenn wir erfolgreich sind. Je nach Finanzierungsmodell entstehen Ihnen nach Beauftragung unserer Partneranwälte maximal die Kosten eines möglichen Selbstbehaltes Ihrer Rechtsschutzversicherung."
    },
    {
      question: "Wo finde ich den aktuellen Stand meines Falles?",
      answer: "Sobald es Neuigkeiten bei der Durchsetzung Ihres Anspruches gibt, benachrichtigen wir Sie umgehend per E-Mail. Über den aktuellen Bearbeitungsstatus können Sie sich zudem jederzeit in Ihrem persönlichen helpcheck-Kundenbereich informieren."
    },
    {
      question: "Wie viel Zeit beansprucht die Durchsetzung meines Anspruchs?",
      answer: "Diese Frage kann pauschal nicht beantwortet werden, da jedes Verfahren unterschiedlich ist. Die Dauer hängt stark davon ab, welches Ziel Sie erreichen wollen sowie von der Gegenseite und dem zuständigen Gericht."
    },
    {
      question: "Ich habe Post zu meinem laufenden Verfahren erhalten. Was soll ich tun?",
      answer: 'Bitte laden Sie das Schreiben zur Bearbeitung unter dem Reiter "Unterlagen hinzufügen" in Ihrem helpcheck-Kundenbereich hoch. Wir werden bei Rückfragen selbstverständlich auf Sie zukommen.'
    }
  ],
  arbeitsrecht: [
    {
      question: "Was ist eine Abfindung?",
      answer: "Als Abfindung wird eine Abgeltung in Form einer Geldzahlung bezeichnet, die ein Arbeitnehmer von seinem Arbeitgeber als Entschädigung für den Verlust des Arbeitsplatzes erhält."
    },
    {
      question: "Habe ich Anspruch auf eine Abfindung?",
      answer: "Das deutsche Recht sieht keine Pflicht zur Zahlung einer Abfindung vor - dennoch werden regelmäßig Abfindungszahlungen geleistet. Oftmals wird damit eine Kündigungsschutzklage des Arbeitnehmers im Falle einer unrechtmäßigen Kündigung verhindert oder ein bereits eingeleitetes Gerichtsverfahren verkürzt."
    },
    {
      question: "Was ist der Unterschied zwischen einem Aufhebungsvertrag und einer Kündigung?",
      answer: "Während der Arbeitgeber oder der Arbeitnehmer im Falle einer Kündigung das Arbeitsverhältnis einseitig beendet, geschieht die Beendigung beim Aufhebungsvertrag einvernehmlich. Beide Parteien haben sich dementsprechend über die Auflösung des Arbeitsverhältnisses geeinigt."
    },
    {
      question: "Was bedeutet Kündigungsschutz?",
      answer: "Unter dem Begriff Kündigungsschutz werden im Arbeitsrecht gesetzliche Regelungen verstanden, welche die Kündigung eines Arbeitsvertrages erschweren bzw. ausschließen. Entsprechend des Kündigungsschutzgesetzes darf ein Arbeitsverhältnis nur auf Basis von Gründen beendet werden, die in der Person oder im Verhalten des Arbeitnehmers liegen. Darüber hinaus sind betriebsbedingte Gründe erlaubt."
    },
    {
      question: "Welche Frist muss ich beachten?",
      answer: "Innerhalb von drei Wochen nach Zugang muss gegen die Kündigung eine Kündigungsschutzklage beim Arbeitsgericht erhoben werden."
    },
    {
      question: "Welche Höhe hat eine Abfindung?",
      answer: "In § 1a KSchG wird eine Abfindung in Höhe eines halben Monatsverdienst pro Beschäftigungsjahr genannt. Es können aber auch höhere Summen vereinbart werden."
    },
    {
      question: "Ich habe vor kurzem eine Kündigung erhalten. Kann ich den Service von helpcheck nutzen?",
      answer: "Sollten Sie innerhalb der vergangenen drei Wochen eine Kündigung oder einen Aufhebungsvertrag erhalten haben, können Sie Ihren Fall bei helpcheck in wenigen Schritten einreichen. Voraussetzung ist jedoch, dass die Firma mehr als 10 Mitarbeiter in Vollzeit beschäftigt, Sie länger als 6 Monate angestellt waren und Ihnen ein Brutto-Gehalt von mindestens 1.000€ gezahlt wurde."
    },
    {
      question: "Was kostet dieser Service?",
      answer: "Die rechtliche Prüfung Ihrer Angelegenheit und die Berechnung einer möglichen Abfindung sind für Sie immer kostenlos und unverbindlich. Erst nach Erhalt des Prüfungsergebnisses entscheiden Sie über das weitere Vorgehen. Sollten Sie eine Rechtsschutzversicherung besitzen, können Sie diese zu Ihrem Fall hinzuziehen. Hier entstehen Ihnen nach Beauftragung unserer Partneranwälte maximal die Kosten eines möglichen Selbstbehaltes der Rechtsschutzversicherung. Sollten Sie keine Rechtsschutzversicherung besitzen und der Fall eintreten, dass Ihr Arbeitgeber außergerichtlich oder im Rahmen eines arbeitsgerichtlichen Klageverfahrens eine Abfindung leistet, erhalten wir im Erfolgsfall eine Beteiligung in Höhe von 29,75% (inkl. MwSt.) des geleisteten Betrages. Es entstehen Ihnen keine weiteren Kosten."
    }
  ],
  verkehrsrecht: [
    {
      question: "Warum sollte man einen Bußgeldbescheid überprüfen?",
      answer: "Ungefähr ein Drittel aller Bußgeldbescheide haben formale oder technische Fehler. Dadurch sind sie anfechtbar."
    },
    {
      question: "Welche Frist habe ich bei einem Einspruch zu beachten?",
      answer: "Sie haben 14 Tage Zeit, um bei der Behörde Einspruch gegen den Bußgeldbescheid einzulegen. Die Frist beginnt mit der Zustellung des Bußgeldbescheides."
    },
    {
      question: "Welche Gründe gibt es für einen Einspruch gegen einen Bußgeldbescheid?",
      answer: "1. Die Verjährungsfrist von 3 Monaten wird überschritten\n2. Fehlerhafter Aufbau bzw. Standort der Messgeräte und Messfehler\n3. Formfehler, wie z. B. fehlende Aktenzeichen, falsche Angaben im Bescheid oder fehlende Rechtsbehelfsbelehrung\n4. Unscharfes bzw. nicht eindeutiges Blitzerfoto, falsche Fristenberechnung bzw. mangelhafte Beweisführung"
    },
    {
      question: "Wann ist ein Einspruch sinnvoll?",
      answer: "Wenn Punkte in Flensburg oder ein Fahrverbot drohen, ist es wichtig, Ihren Bußgeldbescheid überprüfen zu lassen. Insbesondere, wenn der Führerschein beruflich genutzt wird. Generell ist eine Prüfung Ihres Bußgeldbescheides, sofern Zweifel bestehen, immer empfehlenswert."
    },
    {
      question: "Ich möchte meinen Bußgeldbescheid anfechten. Wie hoch sind meine Erfolgsaussichten?",
      answer: "Eine versierte Einschätzung Ihrer Erfolgsaussichten kann erst nach einer umfassenden rechtlichen Prüfung gegeben werden. Daher empfiehlt es sich, einen Anwalt für Verkehrsrecht hinzuzuziehen."
    },
    {
      question: "Muss die Behörde den Bußgeldbescheid händisch unterschreiben?",
      answer: "Ein Bußgeldbescheid muss nicht eigenhändig unterschrieben sein und ist auch ohne Unterschrift seitens der Behörde als maschinell erstelltes Dokument gültig."
    }
  ],
  versicherung: [
    {
      question: "Welche Renten- und Lebensversicherungen können widerrufen werden?",
      answer: "Zahlreiche Renten- und Lebensversicherungen aus dem Zeitraum 21.07.1994 - 31.12.2007 wurden unter einer unzureichenden Widerrufsbelehrung abgeschlossen und können daher heute noch widerrufen werden - egal, ob es sich um einen bestehenden, gekündigten oder ausgelaufenen Vertrag handelt. Auch fondsgebundene Verträge können widerrufen werden. Renten- und Lebensversicherungen, die außerhalb des genannten Zeitraums abgeschlossen wurden, sind leider von einem Widerruf mit helpcheck ausgeschlossen."
    },
    {
      question: "Wie kann ich prüfen, ob mein Versicherungsvertrag fehlerhaft ist?",
      answer: "Reichen Sie Ihre Unterlagen mit geringem Aufwand kostenlos und unverbindlich zur anwaltlichen Prüfung auf www.helpcheck.de ein. Innerhalb von wenigen Tagen erhalten Sie Ihr individuelles Prüfungsergebnis. Sofern sich Ihr Versicherungsvertrag für einen Widerruf mit helpcheck qualifiziert, informieren wir Sie über die Höhe Ihres möglichen finanziellen Mehrwerts. Erst im Anschluss entscheiden Sie darüber, ob Sie Ihren Vertrag mit helpcheck widerrufen möchten."
    },
    {
      question: "Welchen Vorteil hat ein Widerruf meiner Renten- oder Lebensversicherung?",
      answer: "Im Falle einer Kündigung behält der Versicherer alle während der Vertragslaufzeit entstandenen Kosten ein und beendet den Vertrag mit einem Rückkaufswert. Dieser liegt in den meisten Fällen weit unter den eingezahlten Beiträgen. Entscheiden Sie sich für einen Widerruf Ihrer Renten- oder Lebensversicherung, wird Ihr Vertrag so aufgehoben, als wäre er nie zustande gekommen. Somit ist der Versicherer dazu verpflichtet, den Großteil aller eingezahlten Beiträge zuzüglich einer Nutzungsentschädigung an Sie zurückzuzahlen."
    },
    {
      question: "Können ausgelaufene oder bereits gekündigte Verträge widerrufen werden?",
      answer: "Ja, auch Verträge die bereits ausgezahlt oder gekündigt wurden sind rückabwickelbar. Wurde Ihr gekündigter oder ausgelaufener Vertrag erfolgreich widerrufen, erhalten Sie eine nachträgliche Auszahlung."
    },
    {
      question: "Kann ein Widerruf Nachteile haben?",
      answer: "Im Falle eines Widerrufs verlieren Sie möglicherweise eine in Ihrem Versicherungsvertrag integrierte Berufsunfähigkeitsversicherung (BU), die in der Regel einen wichtigen Schutz bietet. Ist dies der Fall, sollte ein Widerruf nur in Ausnahmefällen in Betracht gezogen werden. Sind Sie jedoch der Meinung, dass Ihre BU nicht erforderlich ist, bieten wir Ihnen selbstverständlich die Möglichkeit, Ihren Vertrag zu prüfen."
    },
    {
      question: "Hat ein Widerruf auch ohne professionelle Hilfe Aussicht auf Erfolg?",
      answer: "Angesichts der erforderlichen rechtlichen Kenntnisse sowie der umfassenden Berechnung des Mehrwertes sind die Erfolgschancen für einen Widerruf ohne professionelle Unterstützung insgesamt sehr gering."
    },
    {
      question: "Was kostet mich ein Widerruf mit helpcheck?",
      answer: 'Erst wenn wir Ihren Widerruf erfolgreich durchsetzen konnten, erhält helpcheck ein Honorar zwischen 29,75% und 39,75% (je nach Service-Modell) auf den zusätzlich erzielten Mehrwert. Der Mehrwert ist der Betrag, den Sie über die reguläre Auszahlung bei Beendigung Ihres Vertrages hinaus erhalten, bzw. rückwirkend bei bereits gekündigten Verträgen erhalten.\n\nSollten Sie sich für das Service-Modell "helpcheck Kostenairbag" entscheiden, werden alle anfallenden Anwalts- und Gerichtskosten von helpcheck getragen. Hierfür erhalten wir im Erfolgsfall ein Honorar i.H.v. 39,75% auf den erzielten Mehrwert.\n\nVerfügen Sie über eine Rechtsschutzversicherung, erhalten wir im Erfolgsfall eine reduzierte Provision i.H.v. 29,75% auf den erzielten Mehrwert. In diesem Fall ist maximal ein möglicher Selbstbehalt Ihrer Rechtsschutzversicherung zu zahlen.'
    },
    {
      question: "Wie lange dauert das Verfahren eines Widerrufs?",
      answer: "Diese Frage kann nicht eindeutig beantwortet werden: Die Dauer eines Widerrufsverfahrens hängt stark von der Gegenseite sowie dem zuständigen Gericht ab. Erfahrungsgemäß dauert ein Widerrufsverfahren zwischen 3 und 18 Monaten."
    },
    {
      question: "Wie viel mehr erhalte ich durchschnittlich mit einem Widerruf?",
      answer: "Im Durchschnitt erhalten unsere Kunden durch einen erfolgreichen Widerruf 10.000 € zusätzlich zum jeweiligen Rückkaufswert, bzw. nachträglich bei bereits gekündigten oder ausgelaufenen Verträgen. Erfahrungsgemäß entspricht dies einem zusätzlichen Plus von 30 bis 50% der eingezahlten Beiträge."
    },
    {
      question: "Widerrufen Sie jede Renten- und Lebensversicherung aus dem genannten Zeitraum?",
      answer: "helpcheck ist ein erfolgsabhängiges Unternehmen. Das bedeutet auch, dass unser Interesse darin besteht, ausschließlich Verträge zu widerrufen, die erfolgsversprechend und wirtschaftlich für unsere Kunden sind."
    },
    {
      question: "Können auch betriebliche Altersvorsorgen oder reine Risikoversicherungen geprüft werden?",
      answer: "Leider ist eine Prüfung dieser Verträge derzeit ausgeschlossen."
    },
    {
      question: "Mein Vertrag hat einen Garantiezins – lohnt sich der Widerruf hier überhaupt?",
      answer: "Der garantierte Zins bezeichnet die Mindestverzinsung, welche ausschließlich auf den Sparanteil von Lebens- und Rentenversicherungen gewährt werden muss. Da sich alle eingezahlten Beiträge sowohl aus dem Sparanteil, den Verwaltungs- und Betriebskosten als auch den sogenannten Risikokosten zusammensetzen, werden in vielen Fällen lediglich 70-90% der Beiträge tatsächlich angelegt und entsprechend verzinst. Durch ein erfolgreiches Widerrufsverfahren können hingegen Verwaltungs- und Betriebskosten sowie alle Nutzungszinsen, die mit den eingezahlten Beiträgen erwirtschaftet wurden, zurückgefordert werden. Somit kann eine Rückabwicklung trotz hoher Garantieverzinsung für Sie lohnenswert sein."
    },
    {
      question: "Mir fehlt ein Teil der erforderlichen Dokumente. Kann ich meinen Vertrag trotzdem widerrufen?",
      answer: "Eine unvollständige Dokumentenlage ist für helpcheck kein direkter Ausschlussgrund, da wir über eine umfangreiche Datenbank von Dokumenten der Versicherer verfügen, die wir für die Argumentation in Ihrem Fall verwenden können. Generell gilt allerdings: Je mehr Vertragsdokumente, desto besser. Sie können sich darüber hinaus an Ihren Versicherer wenden und etwaige Versicherungsdokumente einfordern. Gerne stellen wir Ihnen dafür Musterschreiben unserer Partneranwälte zur Verfügung."
    }
  ],
  pkv: [
    {
      question: "Wann darf eine Versicherung den Beitrag anpassen?",
      answer: "Wenn die Leistungsausgaben um zehn Prozent von der ursprünglichen Vorabberechnung abweichen, ist eine Anpassung der Beiträge erlaubt."
    },
    {
      question: "Wann sind Beitragserhöhungen unwirksam?",
      answer: "Beitragserhöhungen sind unwirksam, wenn der Versicherer keine ausreichende Begründung für die Beitragserhöhung genannt hat. Die Versicherung verstößt damit gegen § 203 Abs. 5 VVG."
    },
    {
      question: "Welche privaten Krankenversicherungen sind betroffen?",
      answer: "Bisher sind folgenden Versicherungen betroffen: AXA, Barmenia, DKV, Allianz, ARAG und die Bayerische Beamtenkrankenkasse (BBKK). Ob Ihre Versicherung ebenfalls betroffen ist, muss im Einzelfall geprüft werden."
    },
    {
      question: "Gibt es eine Verjährungsfrist?",
      answer: "Die Verjährungsfrist beginnt, soweit nicht anders bestimmt, mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Kläger von den Anspruch begründenden Umständen und der Person des Schuldners Kenntnis erlangt hat oder ohne grobe Fahrlässigkeit erlangen musste (§ 199 Abs. 1 BGB)."
    },
    {
      question: "Welcher Aufwand ist für mich mit dem Widerruf verbunden?",
      answer: "Wir nehmen Ihnen zusammen mit unseren qualifizierten Partneranwälten jeglichen Aufwand ab. Sofern wir weitere Informationen benötigen, kommen wir auf Sie zu."
    },
    {
      question: "Wie groß ist die Chance der Beitragsrückerstattung?",
      answer: "Je weiter die Beitragsanpassung zurückliegt, desto höher sind die Chancen auf eine Rückerstattung, da die Erläuterungen der Beitragserhöhungen vor 2017 kaum begründet wurden."
    }
  ],
  miete: [
    {
      question: "Was versteht man unter der Mietpreisbremse?",
      answer: "Das Bürgerliche Gesetzbuch (BGB) beinhaltet die Vorschriften zur Regulierung des Mietanstiegs auf dem Wohnungsmarkt: Diese sogenannte Mietpreisbremse beschränkt die zulässige Miethöhe bei Mietbeginn und sieht vor, dass die Miete bei Eintritt in das Mietverhältnis höchstens zehn Prozent über der ortsüblichen Vergleichsmiete liegen darf."
    },
    {
      question: "In welchen Bundesländern gilt die Mietpreisbremse?",
      answer: "10 Bundesländer haben bisher eine entsprechende Verordnung eingeführt: Bayern, Baden-Württemberg, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und Schleswig-Holstein."
    },
    {
      question: "Wie erfahre ich die ortsübliche Miete?",
      answer: "Folgende Möglichkeiten bieten sich:\n1. Der örtliche Mietspiegel\n2. Miete von Vergleichswohnungen\n3. Das Gutachten eines Sachverständigen\n4. Auskunft einer Mietdatenbank der Stadt"
    },
    {
      question: "Gilt die Mietpreisbremse bei bestehenden Verträgen?",
      answer: "Die Mietpreisbremse bezieht sich ausschließlich auf Neuvermietungen nach Einführung der Mietpreisbremse in der jeweiligen Gemeinde oder Stadt."
    },
    {
      question: "Was versteht man unter einer Kappungsgrenze?",
      answer: "Eine Mieterhöhung darf innerhalb eines Zeitraums von drei Jahren nicht mehr als 20 Prozent betragen."
    },
    {
      question: "Welche Frist gilt für einen Widerspruch gegen eine Mieterhöhung?",
      answer: "Es gilt eine Frist von zwei vollen Monaten nach Erhalt der Mieterhöhung."
    },
    {
      question: "Kann das Sonderkündigungsrecht vertraglich ausgeschlossen werden?",
      answer: "Nein. Alle Klauseln, die sich nachteilig für den Mieter auswirken, sind gegenstandslos."
    },
    {
      question: "Ich bin vor dem Stichtag eingezogen. Gilt die Mietpreisbremse trotzdem?",
      answer: "In diesem Falle gilt die Mietpreisbremse leider nicht, da der Gesetzgeber Wohnungseigentümern einen Bestandsschutz gewährt."
    }
  ]
};

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  teal: { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-200', hover: 'hover:bg-teal-50' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-50' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:bg-orange-50' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-50' },
  green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-50' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:bg-pink-50' }
};

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('service');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentFAQs = faqData[activeTab] || [];
  const colors = colorClasses[faqCategories.find(c => c.id === activeTab)?.color || 'teal'];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-24 pb-40 px-6 overflow-hidden">
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
            <Shield size={14} /> FAQ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Häufige <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Fragen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto"
          >
            Hier finden Sie Antworten auf die wichtigsten Fragen zu unseren Services.
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-6 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setActiveTab(category.id); setOpenIndex(null); }}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === category.id
                    ? `${colors.bg} text-white shadow-lg shadow-${category.color === 'teal' ? 'teal' : category.color}-500/25`
                    : `bg-slate-100 text-slate-600 hover:bg-slate-200`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors.bg} text-white mb-4`}>
                {faqCategories.find(c => c.id === activeTab)?.label}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentFAQs.length} Fragen zu diesem Thema
              </h2>
            </div>

            <div className="space-y-4">
              {currentFAQs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border ${colors.border} transition-all duration-300`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className={`w-full flex items-center justify-between p-6 text-left ${colors.hover} transition-colors`}
                  >
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <span className="shrink-0">
                      {openIndex === i ? (
                        <Minus className={colors.text} size={20} />
                      ) : (
                        <Plus className={colors.text} size={20} />
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
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                Kostenlos starten <ChevronRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
