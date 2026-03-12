import React from 'react';
import { ScrollReveal, AnimatedCard } from '../components/ScrollReveal';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const articles: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}> = {
  'bussgeldbescheid-anfechten': {
    title: 'Bußgeldbescheid anfechten: Überblick (Fristen & Ablauf)',
    author: 'Timo Schell – Rechtsanwalt, spezialisiert auf Verkehrsrecht',
    date: '01.12.2025',
    readTime: '6 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ein Bußgeldbescheid ahndet Ordnungswidrigkeiten im Straßenverkehr.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Sanktionen umfassen Bußgelder, Punkte in Flensburg und Fahrverbote.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Anfechtung möglich bei formellen Fehlern oder Verjährung.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Die Frist für Einspruch beträgt zwei Wochen ab Zustellung (§ 67 OWiG).</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Wann ist Anfechten sinnvoll?</h2>
        <p className="text-slate-600 mb-4">Ein Einspruch ist ratsam, wenn:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Der Bescheid formelle Fehler enthält.</li>
          <li>Eine fehlerhafte Messung (z.B. Blitzer) vorliegt.</li>
          <li>Ein Fahrverbot oder Entziehung der Fahrerlaubnis droht.</li>
          <li>Der Einspruch die Chancen auf niedrigere Strafen erhöht.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Formell falscher Bußgeldbescheid</h2>
        <p className="text-slate-600 mb-4">Mögliche formelle Fehler:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Fehlende Rechtsmittelbelehrung</li>
          <li>Falsche Personenangaben – persönliche Daten stimmen nicht</li>
          <li>Fehlerhafte Kennzeichen – falsches Kfz-Kennzeichen</li>
          <li>Unstimmigkeiten im Tatvorwurf – z.B. Tattag nach Ausfertigungsdatum</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Anfechtung wegen Verjährung</h2>
        <div className="bg-slate-50 p-6 rounded-xl mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Verfolgungsverjährung</h4>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>3 Monate für normale Verkehrsordnungswidrigkeiten</li>
                <li>12 Monate bei Alkoholdelikten</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Vollstreckungsverjährung</h4>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>Weniger als 1.000 €: 3 Jahre</li>
                <li>Mehr als 1.000 €: 5 Jahre</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Wie wird der Bußgeldbescheid angefochten?</h2>
        <ol className="list-decimal pl-6 text-slate-600 mb-6 space-y-2">
          <li>Schriftlich Einspruch erheben ODER</li>
          <li>Bei der zuständigen Bußgeldstelle Einspruch einlegen</li>
        </ol>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Wann muss ein Bußgeldbescheid spätestens angefochten werden?</h4>
            <p className="text-slate-600 text-sm">Die Frist beträgt zwei Wochen ab Zustellung (§ 67 OWiG). Verstreicht diese Frist, wird der Bescheid rechtskräftig.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Kann ein Führerscheinentzug durch Anfechtung verhindert werden?</h4>
            <p className="text-slate-600 text-sm">Die Anfechtung zielt oft darauf ab, einen Führerscheinentzug bei kritischer Punktzahl in Flensburg zu verhindern. Das Tattagprinzip im Verkehrsrecht erschwert dies jedoch.</p>
          </div>
        </div>
      </>
    )
  },
  'facebook-datenskandal': {
    title: 'Facebook Datenskandal: Schadensersatz sichern!',
    author: 'Stephanie Prinz',
    date: '03.11.2025',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Hacker nutzten "Scraping" um Nutzerdaten zu stehlen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Folgen: Spam-Anrufe und gefälschte Nachrichten.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Nach Art. 82 DSGVO haben Nutzer Anspruch auf Schadensersatz.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Was ist der Facebook Datenskandal?</h2>
        <p className="text-slate-600 mb-4">Der Facebook Datenskandal bezieht sich auf mehrere Hackerangriffe auf Nutzerdaten im August 2019. Hacker nutzten Scraping um Namen und Kontaktdaten von Millionen Nutzern zu extrahieren.</p>
        <p className="text-slate-600 mb-4"><strong>Betroffene Daten:</strong></p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Vollständiger Name</li>
          <li>Geburtsdatum</li>
          <li>E-Mail-Adresse und Handynummer</li>
          <li>Möglicherweise Ort, Beruf und Beziehungsstatus</li>
        </ul>
        <p className="text-slate-600 mb-6">Weltweit wurden etwa 530 Millionen Datensätze gestohlen, davon ca. 6 Millionen aus Deutschland.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Folgen des Facebook Datenskandals</h2>
        <p className="text-slate-600 mb-4">Die Folgen bestehen bis heute. Nutzer erhalten gefälschte Nachrichten, die von ihrer Bank zu stammen scheinen.</p>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <h4 className="font-bold text-yellow-800 mb-2">Tipps:</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Seien Sie vorsichtig bei gefälschten Nachrichten</li>
            <li>• Verifizieren Sie durch Anruf bei Ihrer Bank</li>
            <li>• Blockieren Sie bekannte Spam-Nummern</li>
            <li>• Erstatten Sie gegebenenfalls Anzeige</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Welche Ansprüche kann ich geltend machen?</h2>
        <p className="text-slate-600 mb-4">Unter der DSGVO, speziell Artikel 15, muss Facebook umfassende Informationen über den Vorfall bereitstellen.</p>
        <p className="text-slate-600 mb-4">Wenn Facebook nicht konform ist, bietet <strong>Artikel 82 DSGVO</strong> Grundlagen für Schadensersatzansprüche.</p>

        <div className="bg-slate-50 p-6 rounded-xl mb-6">
          <h4 className="font-bold text-slate-900 mb-4">Beispiel-Urteile:</h4>
          <ul className="text-slate-600 space-y-2">
            <li>• Landgericht Stuttgart (Az. 8 O 38/23): 400 EUR</li>
            <li>• Landgericht Stuttgart (Az. 3 O 220/22): 1.000 EUR</li>
            <li>• Landgericht München (Az. 15 O 4507/22): 600 EUR</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Was ist im Facebook Datenskandal passiert?</h4>
            <p className="text-slate-600 text-sm">Ein Hackerangriff legte über 530 Millionen Nutzerdatensätze frei. Hacker nutzten Scraping mit Zufallszahlengeneratoren.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Wie viel Schadensersatz kann ich erhalten?</h4>
            <p className="text-slate-600 text-sm">Das Minimum liegt typischerweise bei 100 EUR. Der Schadensersatz kann deutlich höher ausfallen, wenn die Privatsphäre stark verletzt wurde.</p>
          </div>
        </div>
      </>
    )
  },
  'geblitzt-innerorts': {
    title: 'Geblitzt & innerorts zu schnell – Bußgelder und Fahrverbote',
    author: 'Timo Schell, Rechtsanwalt',
    date: '15.12.2025',
    readTime: '5 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Innerorts gilt als Höchstgeschwindigkeit typically 50 km/h.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ab 21 km/h Überschreitung wird ein Punkt in Flensburg eingetragen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ab 26 km/h kann ein Fahrverbot drohen.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Bußgelder bei Geschwindigkeitsüberschreitung</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">km/h zu schnell</th>
                <th className="p-3 text-left">Bußgeld</th>
                <th className="p-3 text-left">Punkte</th>
                <th className="p-3 text-left">Fahrverbot</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3">bis 10 km/h</td><td className="p-3">30 €</td><td className="p-3">0</td><td className="p-3">-</td></tr>
              <tr><td className="p-3">11-15 km/h</td><td className="p-3">50 €</td><td className="p-3">0</td><td className="p-3">-</td></tr>
              <tr><td className="p-3">16-20 km/h</td><td className="p-3">70 €</td><td className="p-3">0</td><td className="p-3">-</td></tr>
              <tr><td className="p-3">21-25 km/h</td><td className="p-3">115 €</td><td className="p-3">1</td><td className="p-3">-</td></tr>
              <tr><td className="p-3">26-30 km/h</td><td className="p-3">180 €</td><td className="p-3">1</td><td className="p-3">1 Monat*</td></tr>
              <tr><td className="p-3">31-40 km/h</td><td className="p-3">260 €</td><td className="p-3">2</td><td className="p-3">1 Monat</td></tr>
              <tr><td className="p-3">über 70 km/h</td><td className="p-3">800 €</td><td className="p-3">2</td><td className="p-3">3 Monate</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mb-6">*Bei wiederholter Überschreitung innerhalb eines Jahres</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Punkte in Flensburg</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Ab 16 km/h über dem Limit werden Punkte eingetragen</li>
          <li>1-3 Punkte: Keine Konsequenzen</li>
          <li>4-5 Punkte: Verwarnung</li>
          <li>6-7 Punkte: Verwarnung und Seminarempfehlung</li>
          <li>8 Punkte: Führerscheinentzug</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Probezeit</h2>
        <p className="text-slate-600 mb-4">Für Fahranfänger (§ 2a StVG):</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Ab 21 km/h Überschreitung ist ein "A-Verstoß"</li>
          <li>Konsequenz: Pflicht zur Nachschulung</li>
          <li>Bei zweitem A-Verstoß: Verwarnung und Verkehrspsychologische Beratung</li>
          <li>Bei drittem A-Verstoß: Entziehung der Fahrerlaubnis</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Wie lange sind Punkte gültig?</h4>
            <p className="text-slate-600 text-sm">Punkte für Geschwindigkeitsverstöße haben eine Tilgungsfrist von 2,5 Jahren.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Wann muss ich ein Fahrverbot antreten?</h4>
            <p className="text-slate-600 text-sm">Ersttäter müssen das Fahrverbot innerhalb von 4 Monaten nach Rechtskraft antreten.</p>
          </div>
        </div>
      </>
    )
  },
  'bei-rot-geblitzt': {
    title: 'Bei Rot geblitzt: Wie Autofahrer jetzt reagieren',
    author: 'Timo Schell, Rechtsanwalt',
    date: '15.12.2025',
    readTime: '5 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Bei Rot geblitzt → schnell um Fahrverbote</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Haltelinienverstoß bei Nicht-Einfahren in Kreuzung</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Halter muss auf Bußgeldbescheid reagieren</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Bußgelder und Strafen</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Verstoß</th>
                <th className="text-left p-3">Bußgeld</th>
                <th className="text-left p-3">Punkte</th>
                <th className="text-left p-3 rounded-r-lg">Fahrverbot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">Einfacher Rotlichtverstoß (&lt; 1 Sek.)</td><td className="p-3">90 €</td><td className="p-3">1</td><td className="p-3">Nein</td></tr>
              <tr><td className="p-3">Qualifizierter Rotlichtverstoß (&gt; 1 Sek.)</td><td className="p-3">200 €</td><td className="p-3">2</td><td className="p-3">1 Monat</td></tr>
              <tr><td className="p-3">Mit Gefährdung</td><td className="p-3">200 €</td><td className="p-3">2</td><td className="p-3">1 Monat</td></tr>
              <tr><td className="p-3">Haltelinienverstoß</td><td className="p-3">10 €</td><td className="p-3">0</td><td className="p-3">Nein</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was passiert bei Gefährdung und Unfällen?</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Bußgeld bis 200 €</li>
          <li>2 Punkte in Flensburg</li>
          <li>1 Monat Fahrverbot</li>
          <li>Ab 8 Punkten: Führerscheinentzug</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Nicht gefahren, aber bei Rot geblitzt</h2>
        <p className="text-slate-600 mb-4">Fahrerhaftung gilt in Deutschland. Bußgeldstelle sendet Anhörungsbogen. Zeugnisverweigerungsrecht bei Ehe-/Lebenspartner.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Häufige Fragen</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Was erwartet mich, wenn es an der Ampel blitzt?</h4>
            <p className="text-slate-600 text-sm">Rotlichtblitzer löst zweimal aus: Haltelinie + Kreuzungsbereich. Bei einmal blitzen → Haltelinienverstoß (10 €). Bei Gefährdung: bis 85 € + 1 Punkt.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Wann muss ich das Fahrverbot antreten?</h4>
            <p className="text-slate-600 text-sm">Bei qualifiziertem Rotlichtverstoß: 1 Monat. Optionen: Einspruch mit Härtefall (Geldstrafe), oder innerhalb von 4 Monaten nach rechtskräftigem Bescheid antreten.</p>
          </div>
        </div>
      </>
    )
  },
  'handy-am-steuer': {
    title: 'Geblitzt mit Handy in der Hand: Welche Strafe droht?',
    author: 'Timo Schell, Rechtsanwalt',
    date: '15.12.2025',
    readTime: '5 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Wer geblitzt wird und das Handy in der Hand hält, begeht mehrere Ordnungswidrigkeiten.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Strafen werden nicht einfach addiert.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Durch das Prinzip der Tateinheit wird die schwerwiegendere Geldbuße erhoben.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Strafen für Handy am Steuer</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>100 Euro Bußgeld</strong> + <strong>1 Punkt in Flensburg</strong></li>
          <li>Bei Gefährdung: <strong>150 Euro</strong>, <strong>2 Punkte</strong>, <strong>1 Monat Fahrverbot</strong></li>
          <li>Geschwindigkeitsüberschreitung innerorts: bis zu 800 Euro</li>
          <li>Geschwindigkeitsüberschreitung außerorts: bis zu 700 Euro</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Tatmehrheit vs. Tateinheit</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Tatmehrheit:</strong> Verschiedene selbstständige Handlungen → mehrere Strafen möglich</li>
          <li><strong>Tateinheit:</strong> Mehrere Verstöße, die zeitlich und örtlich zusammenfallen → § 19 OWiG wird angewendet</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Bußgeld, Punkte und Fahrverbot</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Überschreitung (km/h)</th>
                <th className="text-left p-3">Bußgeld (Euro)</th>
                <th className="text-left p-3">Punkte</th>
                <th className="text-left p-3 rounded-r-lg">Fahrverbot (Monate)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">bis 10</td><td className="p-3">30</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">11 - 15</td><td className="p-3">50</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">16 - 20</td><td className="p-3">70</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">21 - 25</td><td className="p-3">115</td><td className="p-3">1</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">26 - 30</td><td className="p-3">180</td><td className="p-3">1</td><td className="p-3">1*</td></tr>
              <tr><td className="p-3">31 - 40</td><td className="p-3">260</td><td className="p-3">2</td><td className="p-3">1</td></tr>
              <tr><td className="p-3">über 70</td><td className="p-3">800</td><td className="p-3">2</td><td className="p-3">3</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Handy in der Probezeit</h2>
        <p className="text-slate-600 mb-4">Es handelt sich um einen <strong>A-Verstoß</strong>, der eine <strong>Verlängerung der Probezeit</strong> inklusive einer <strong>kostenpflichtigen Nachschulung</strong> nach sich zieht.</p>
      </>
    )
  },
  'fahrverbot-umgehen': {
    title: 'Fahrverbot in Geldstrafe umwandeln – So geht es',
    author: 'Timo Schell, Rechtsanwalt',
    date: '15.12.2025',
    readTime: '6 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ein Fahrverbot kann unter bestimmten Voraussetzungen durch ein höheres Bußgeld abgewendet werden.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Der Einspruch gegen den Bußgeldbescheid führt mitunter zur Einstellung des Verfahrens.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ein Fahrverbot durch falsche Angaben kann für den Halter zu erheblichen Schwierigkeiten führen.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Wann droht ein Fahrverbot?</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Erhebliche Geschwindigkeitsüberschreitungen (ab 26 km/h innerorts)</li>
          <li>Alkohol- oder Drogendelikte im Straßenverkehr</li>
          <li>Besonders rücksichtsloses Verhalten (z.B. Handy am Steuer bei Gefährdung)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Dauer des Fahrverbots</h2>
        <p className="text-slate-600 mb-4">Das Fahrverbot wird normalerweise für eine Dauer von <strong>einem bis drei Monaten</strong> verhängt.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Fahrverbot durch Geldstrafe abwenden</h2>
        <p className="text-slate-600 mb-4">In bestimmten Fällen kann ein gerichtlicher Beschluss das Fahrverbot gegen Zahlung einer deutlich höheren Geldstrafe aufheben. Diese Möglichkeit besteht vor allem bei sogenannten Härtefällen:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Die berufliche Existenz ist gefährdet</li>
          <li>Die tägliche Pflege eines Angehörigen hängt vom Autofahren ab</li>
          <li>Andere, die Existenz bedrohende Gründe liegen vor</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Erfolgschancen beim Einspruch</h2>
        <p className="text-slate-600 mb-4">Fahrverbote lassen sich durch die Umwandlung in eine Geldstrafe oder durch einen Einspruch abwenden. Der Einspruch kann sich auf folgende Gründe stützen:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Formfehler im Bußgeldbescheid (falsches Kennzeichen)</li>
          <li>Falsche Angaben zur Person des Tatverdächtigen</li>
          <li>Messfehler (Blitzerfoto nicht eindeutig)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Fristen für den Einspruch</h2>
        <p className="text-slate-600 mb-4">Nach der Zustellung des Bußgeldbescheids haben Autofahrer gemäß <strong>§ 67 OWiG</strong> <strong>zwei Wochen Zeit für den Einspruch</strong>.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Verjährung</h2>
        <p className="text-slate-600 mb-4">Die Verjährung von drei Monaten schließt nicht alle Tatbestände ein. Alkohol- und Drogendelikte verjähren erst nach sechs Monaten. Bei einer Straftat im Straßenverkehr läuft die Verjährungsfrist erst nach drei Jahren ab.</p>
      </>
    )
  },
  'geblitzt-probezeit': {
    title: 'Geblitzt in der Probezeit: Was droht Fahranfängern?',
    author: 'Timo Schell, Rechtsanwalt',
    date: '15.12.2025',
    readTime: '5 Min.',
    category: 'Verkehrsrecht',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Für Fahranfänger gelten besondere Anforderungen aufgrund des Gefährdungspotenzials.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Die Sonderregeln für A-Verstöße gelten unabhängig vom Lebensalter.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Bei drei schwerwiegenden Verstößen droht eine Entziehung des Führerscheins.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Rechtliche Grundlagen</h2>
        <p className="text-slate-600 mb-4">Die <strong>Probezeit</strong> beträgt regulär <strong>24 Monate</strong> ab Erteilung der Fahrerlaubnis. Rechtliche Grundlage ist <strong>§ 2a Abs. 1 StVG</strong>.</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Grunddauer: zwei Jahre</li>
          <li>Verlängerung um weitere zwei Jahre bei A-Verstößen oder zwei B-Verstößen</li>
          <li>Entzug der Fahrerlaubnis bei drei A-Verstößen</li>
          <li>Verpflichtende Teilnahme an Aufbauseminaren</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was sind A-Verstöße?</h2>
        <p className="text-slate-600 mb-4"><strong>A-Verstöße</strong> sind schwerwiegende Ordnungswidrigkeiten:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Geschwindigkeitsüberschreitungen von mehr als 20 km/h</li>
          <li>Qualifizierte Rotlichtverstöße (Ampel länger als 1 Sekunde rot)</li>
          <li>Verstöße gegen Abstandsregeln</li>
          <li>Alkohol am Steuer (0,0-Promille für Fahranfänger)</li>
          <li>Handy am Steuer</li>
          <li>Vorfahrtsmissachtung mit Gefährdung</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Strafen bei zu hoher Geschwindigkeit (innerorts)</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Überschreitung (km/h)</th>
                <th className="text-left p-3">Bußgeld (€)</th>
                <th className="text-left p-3">Punkte</th>
                <th className="text-left p-3 rounded-r-lg">Fahrverbot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">bis 10</td><td className="p-3">30</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">11-15</td><td className="p-3">50</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">16-20</td><td className="p-3">70</td><td className="p-3">0</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">21-25</td><td className="p-3">115</td><td className="p-3">1</td><td className="p-3">0</td></tr>
              <tr><td className="p-3">26-30</td><td className="p-3">180</td><td className="p-3">1</td><td className="p-3">1*</td></tr>
              <tr><td className="p-3">31-40</td><td className="p-3">260</td><td className="p-3">2</td><td className="p-3">1</td></tr>
              <tr><td className="p-3">über 70</td><td className="p-3">800</td><td className="p-3">2</td><td className="p-3">3</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Konsequenzen wiederholter Blitzer</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Ein A-Verstoß:</strong> Probezeitverlängerung + Aufbauseminar</li>
          <li><strong>Zwei A-Verstöße:</strong> Verwarnung + verkehrspsychologische Beratung</li>
          <li><strong>Drei A-Verstöße:</strong> Entziehung der Fahrerlaubnis</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Häufige Fragen</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Was kostet das Aufbauseminar?</h4>
            <p className="text-slate-600 text-sm">Das Aufbauseminar (ASF) kostet in der Regel 250-500 Euro.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Kann ich mich gegen einen Blitzer in der Probezeit wehren?</h4>
            <p className="text-slate-600 text-sm">Ja. Gegen den Bußgeldbescheid kann mit einer Frist von zwei Wochen nach Erhalt Einspruch erhoben werden.</p>
          </div>
        </div>
      </>
    )
  },
  'datenleck-rechtsschutzversicherung': {
    title: 'Datenleck und Rechtsschutzversicherung: Schadensersatz erhalten',
    author: 'Stephanie Prinz',
    date: '13.12.2024',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Nutzer verschiedenster Online-Plattformen wurden Opfer von Datenpannen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Schadensersatzansprüche lassen sich meist nur mit einer Rechtsschutzversicherung geltend machen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Bei helpcheck können Sie Ihre Ansprüche auch ohne Rechtsschutzversicherung einfordern.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Bekannte Datenpannen im Überblick</h2>
        <p className="text-slate-600 mb-4">In den letzten Jahren wurden zahlreiche Datenlecks bei großen, international tätigen Konzernen bekannt:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Facebook/Meta</strong> – April 2021, 530 Millionen Nutzerdaten veröffentlicht</li>
          <li><strong>Deezer</strong> – 2019, 230 Millionen Datensätze</li>
          <li><strong>LinkedIn</strong> – Juni 2021, 93 % aller Userdaten</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Warum Rechtsschutzversicherungen wichtig sind</h2>
        <p className="text-slate-600 mb-4">Schadensersatzforderungen fallen unter das allgemeine Zivilrecht. Die meisten Rechtsschutzversicherungen leisten bei einem Datenleck, müssen aber bereits zum Zeitpunkt des Vorfalls bestanden haben.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Aktuelle Urteile</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Gericht</th>
                <th className="text-left p-3">Jahr</th>
                <th className="text-left p-3 rounded-r-lg">Entscheidung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">LG Zwickau</td><td className="p-3">2022</td><td className="p-3">1.000 € Schadensersatz</td></tr>
              <tr><td className="p-3">LG Oldenburg</td><td className="p-3">2022</td><td className="p-3">3.000 € + Zinsen</td></tr>
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">2023</td><td className="p-3">500 € Schadensersatz</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  'tesla-schadensersatz': {
    title: 'Tesla Datenskandal: Schadensersatz sichern',
    author: 'Stephanie Prinz',
    date: '13.12.2024',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Rund 100 Gigabyte an vertraulichen Informationen gelangten in fremde Hände.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Betroffene könnten Schadensersatz nach der DSGVO geltend machen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Auch die Sozialversicherungsnummer von Elon Musk soll betroffen gewesen sein.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was ist passiert?</h2>
        <p className="text-slate-600 mb-4">Ende Mai 2023 geriet Tesla ins Visier deutscher und niederländischer Datenschutzbehörden. Rund 100 Gigabyte an vertraulichen Informationen über Fahrzeuge, Geschäftspartner und Mitarbeiter gelangten in fremde Hände.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Wie hoch könnten Forderungen ausfallen?</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>DSGVO sieht Strafen bis zu 4 % des weltweiten Jahresumsatzes vor</li>
          <li>Bei Tesla: Potenzielle Summe von rund 3,2 Milliarden US-Dollar</li>
          <li>Einzelne Mitarbeiter können zivilrechtlich gegen Tesla vorgehen</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Gerichtsurteile</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Gericht</th>
                <th className="text-left p-3">Jahr</th>
                <th className="text-left p-3 rounded-r-lg">Entscheidung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">LG Zwickau</td><td className="p-3">2022</td><td className="p-3">1.000 € Schadensersatz</td></tr>
              <tr><td className="p-3">LG Oldenburg</td><td className="p-3">2022</td><td className="p-3">3.000 € + 4,12 % Zinsen</td></tr>
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">2023</td><td className="p-3">500 € Schadensersatz</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  'twitter-schadensersatz': {
    title: 'Twitter Datenskandal: Schadensersatz sichern',
    author: 'Stephanie Prinz',
    date: '13.12.2024',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Mehrere hundert Millionen Userdaten wurden im Dezember 2022 entwendet.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Betroffene erhalten Spamanrufe, Werbemails und gefälschte Nachrichten.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Ansprüche auf Schadensersatz nach Artikel 82 DSGVO möglich.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was ist beim Twitter Datenleck passiert?</h2>
        <p className="text-slate-600 mb-4">Im Dezember 2022 verschafften sich Hacker unberechtigt Zugang zu zahlreichen Nutzerdaten Twitters. Die Daten wurden im Darknet zum Verkauf angeboten. Betroffene werden seither mit Spamnachrichten und Werbemails bombardiert.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Schadensersatz nach DSGVO</h2>
        <p className="text-slate-600 mb-4">Betroffene haben Ansprüche nach folgenden Artikeln der DSGVO:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Artikel 25 Abs. 1 DSGVO</strong> – Datenschutz durch Technikgestaltung</li>
          <li><strong>Artikel 82 Abs. 1 DSGVO</strong> – Schadensersatz</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Gerichtsurteile</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Gericht</th>
                <th className="text-left p-3">Aktenzeichen</th>
                <th className="text-left p-3 rounded-r-lg">Schadensersatz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">8 O 38/23</td><td className="p-3">400 €</td></tr>
              <tr><td className="p-3">LG München</td><td className="p-3">15 O 4507/22</td><td className="p-3">600 €</td></tr>
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">3 O 220/22</td><td className="p-3">1.000 €</td></tr>
              <tr><td className="p-3">LG Oldenburg</td><td className="p-3">–</td><td className="p-3">3.000 € + Zinsen</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  'facebook-entschaedigung': {
    title: 'Facebook Entschädigung: Schadensersatz sichern',
    author: 'Stephanie Prinz',
    date: '13.12.2024',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Beim Facebook Datenklau 2019 wurden persönliche Userdaten durch Hacker entwendet.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Über 500 Millionen Datensätze wurden abgerufen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Deutsche Gerichte haben Betroffenen zwischen 300 und 5.000 Euro zugesprochen.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was ist beim Facebook Datenleck passiert?</h2>
        <p className="text-slate-600 mb-4">Hacker nutzten eine Sicherheitslücke in der Facebook-Freundesuche. Mit einem Zufallsgenerator gaben sie unzählige Handynummern ein. Mehr als 500 Millionen Datensätze wurden abgerufen.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Ihre Ansprüche</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Artikel 15 DSGVO</strong> – Auskunftspflicht</li>
          <li><strong>Artikel 82 DSGVO</strong> – Schadensersatz</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Urteile im Überblick</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Gericht</th>
                <th className="text-left p-3">Aktenzeichen</th>
                <th className="text-left p-3 rounded-r-lg">Schadensersatz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">8 O 38/23</td><td className="p-3">400 €</td></tr>
              <tr><td className="p-3">LG München</td><td className="p-3">15 O 4507/22</td><td className="p-3">600 €</td></tr>
              <tr><td className="p-3">LG Stuttgart</td><td className="p-3">3 O 220/22</td><td className="p-3">1.000 €</td></tr>
              <tr><td className="p-3">LG Oldenburg</td><td className="p-3">–</td><td className="p-3">3.000 €</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  'linkedin-schadensersatz': {
    title: 'LinkedIn Datenskandal: Entschädigung sichern',
    author: 'Stephanie Prinz',
    date: '15.06.2024',
    readTime: '4 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Beim LinkedIn Datenleck 2021 wurden über 700 Millionen Datensätze gestohlen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Betroffen waren E-Mail-Adressen, Telefonnummern und berufliche Profile.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Sie können Schadensersatzansprüche geltend machen.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was ist beim LinkedIn Datenleck passiert?</h2>
        <p className="text-slate-600 mb-4">Im Juni 2021 wurden bei einem groß angelegten Hackerangriff die Daten von rund 700 Millionen LinkedIn-Nutzern gestohlen. Die Daten wurden im Darknet zum Verkauf angeboten.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Ihre Ansprüche</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>DSGVO Art. 15</strong> – Auskunft über verarbeitete Daten</li>
          <li><strong>DSGVO Art. 17</strong> – Löschung Ihrer Daten</li>
          <li><strong>DSGVO Art. 82</strong> – Schadensersatz bei Datenschutzverletzung</li>
        </ul>
      </>
    )
  },
  'deezer-schadensersatz': {
    title: 'Deezer Datenskandal: Schadensersatz sichern',
    author: 'Stephanie Prinz',
    date: '20.08.2024',
    readTime: '4 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Beim Deezer Datenleck wurden E-Mail-Adressen und Passwörter gestohlen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Betroffen sind Millionen von Nutzern weltweit.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Sie haben Anspruch auf Schadensersatz.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was ist beim Deezer Datenleck passiert?</h2>
        <p className="text-slate-600 mb-4">Deezer wurde Opfer eines Hackerangriffs, bei dem persönliche Daten von Nutzern entwendet wurden. Die gestohlenen Daten enthielten E-Mail-Adressen und verschlüsselte Passwörter.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Ihre Rechte</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Auskunftsrecht</strong> – Erfahren Sie welche Daten von Ihnen gespeichert wurden</li>
          <li><strong>Löschungsrecht</strong> – Fordern Sie die Löschung Ihrer Daten</li>
          <li><strong>Schadensersatz</strong> – Entschädigung für erlittene Schäden</li>
        </ul>
      </>
    )
  },
  'datenleck-schadensersatz': {
    title: 'Datenleck Schadensersatz: So funktioniert es',
    author: 'Stephanie Prinz',
    date: '10.01.2025',
    readTime: '5 Min.',
    category: 'Datenskandal',
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Nach DSGVO Art. 82 haben Sie Anspruch auf Schadensersatz.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Sie müssen nachweisen, dass Ihnen ein Schaden entstanden ist.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Gerichte haben bereits Schadensersatz zwischen 100 und 5.000 Euro zugesprochen.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Wann haben Sie Anspruch auf Schadensersatz?</h2>
        <p className="text-slate-600 mb-4">Nach Art. 82 DSGVO hat jede Person, der wegen einer Datenschutzverletzung ein materieller oder immaterieller Schaden entstanden ist, Anspruch auf Schadensersatz.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Welche Schäden können geltend gemacht werden?</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Materieller Schaden</strong> – z.B. finanzielle Verluste durch Identitätsdiebstahl</li>
          <li><strong>Imaterieller Schaden</strong> – z.B. psychische Belastung, Stress, Reputationsschäden</li>
          <li><strong>Verdoppelte Beweislast</strong> – Das Unternehmen muss beweisen, dass es nicht fahrlässig gehandelt hat</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">So setzen Sie Ihre Ansprüche durch</h2>
        <ol className="list-decimal pl-6 text-slate-600 mb-6 space-y-2">
          <li>Prüfen Sie, ob Sie von einem Datenleck betroffen sind</li>
          <li>Dokumentieren Sie den entstandenen Schaden</li>
          <li>Fordern Sie schriftlich Schadensersatz vom Unternehmen</li>
          <li>Gehen Sie notfalls den Rechtsweg</li>
        </ol>
      </>
    )
  },
  'datenleck-checker': {
    title: 'Datenleck Checker: Bin ich betroffen?',
    author: 'Support Team',
    date: '05.01.2025',
    readTime: '3 Min.',
    category: 'Checker',
    content: (
      <>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Das Wichtigste in Kürze</h3>
          <ul className="text-teal-800 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Überprüfen Sie hier, ob Ihre Daten in einem Datenleck auftauchen.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Geben Sie einfach Ihre E-Mail-Adresse ein.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /> Wir prüfen für Sie kostenlos.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Warum ist die Prüfung wichtig?</h2>
        <p className="text-slate-600 mb-4">Datenlecks kommen immer häufiger vor. Wenn Ihre Daten gestohlen wurden, können Kriminelle diese für Identitätsdiebstahl, Betrug oder Phishing-Angriffe nutzen.</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Was sollten Sie tun, wenn Sie betroffen sind?</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Passwort ändern</strong> – Ändern Sie umgehend Ihre Passwörter</li>
          <li><strong>Zwei-Faktor-Authentifizierung</strong> – Aktivieren Sie diese, wo möglich</li>
          <li><strong>Bankkonten überwachen</strong> – Achten Sie auf ungewöhnliche Transaktionen</li>
          <li><strong>Schadensersatz prüfen</strong> – Sie haben möglicherweise Anspruch auf Entschädigung</li>
        </ul>
      </>
    )
  }
};

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Artikel nicht gefunden</h1>
          <Link to="/ratgeber" className="text-teal-600 hover:underline">
            Zurück zum Ratgeber
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/ratgeber" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={18} /> Zurück zum Ratgeber
          </Link>

          <ScrollReveal direction="up" delay={0}>
            <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-medium rounded-full mb-4">
              {article.category}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {article.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime} Lesezeit</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0.3}>
            <div className="prose prose-lg max-w-none">
              {article.content}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Fragen zu Ihrem Fall?</h3>
            <p className="text-white/90 mb-6">Lassen Sie Ihren Fall kostenlos von unseren Experten prüfen.</p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Kostenlos prüfen
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
