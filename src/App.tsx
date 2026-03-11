import React, { useState } from 'react';
import {
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Bot
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChatProvider, FloatingWidget } from './components/chatbot';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Home from './pages/Home';
import Verkehrsrecht from './pages/Verkehrsrecht';
import Ratgeber from './pages/Ratgeber';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Datenskandal from './pages/Datenskandal';
import HandyAmSteuer from './pages/HandyAmSteuer';
import Geschwindigkeit from './pages/Geschwindigkeit';
import FacebookDatenleck from './pages/FacebookDatenleck';
import Rotlichtverstoss from './pages/Rotlichtverstoss';
import Fahrverbot from './pages/Fahrverbot';
import DSGVO from './pages/DSGVO';
import LinkedInDatenleck from './pages/LinkedInDatenleck';
import DeezerDatenleck from './pages/DeezerDatenleck';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Jobs from './pages/Jobs';
import Presse from './pages/Presse';
import Article from './pages/Article';

// --- Shared Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <Link to="/" className="text-blue-600 font-bold text-2xl flex items-center">
        helpcheck<span className="w-2 h-2 bg-teal-400 rounded-full ml-1"></span>
      </Link>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
      <div className="relative group">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          Services <ChevronDown size={14} />
        </div>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
          <Link to="/verkehrsrecht" className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">Verkehrsrecht</Link>
          <Link to="/datenskandal" className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">Datenleck</Link>
        </div>
      </div>
      <Link to="/ratgeber" className="hover:text-blue-600">Ratgeber</Link>
      <Link to="/about" className="hover:text-blue-600">Über uns</Link>
      <Link to="/contact" className="hover:text-blue-600">Hilfe & Kontakt</Link>
      <a href="#" className="text-gray-900 font-semibold hover:text-blue-600">Login</a>
      <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2">
        <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
        KUNDENPORTAL
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-blue-950 text-white py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="text-white font-bold text-2xl flex items-center">
            helpcheck<span className="w-2 h-2 bg-teal-400 rounded-full ml-1"></span>
          </Link>
          <div className="flex gap-4">
            <Facebook size={20} className="text-white/60 hover:text-white cursor-pointer" />
            <Instagram size={20} className="text-white/60 hover:text-white cursor-pointer" />
            <Twitter size={20} className="text-white/60 hover:text-white cursor-pointer" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Newsletter abonnieren</p>
            <div className="flex gap-2">
              <input type="email" placeholder="E-Mail" className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-teal-400" />
              <button className="bg-orange-500 text-white px-4 py-2 rounded text-xs font-bold hover:bg-orange-600 transition-colors">Abonnieren</button>
            </div>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-6">Service</h5>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/verkehrsrecht" className="hover:text-white cursor-pointer">Verkehrsrecht</Link></li>
            <li><Link to="/datenskandal" className="hover:text-white cursor-pointer">Datenleck</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Informationen</h5>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/verkehrsrecht#faq" className="hover:text-white cursor-pointer">Häufige Fragen</Link></li>
            <li><Link to="/ratgeber" className="hover:text-white cursor-pointer">Ratgeber</Link></li>
            <li><Link to="/presse" className="hover:text-white cursor-pointer">Presse</Link></li>
            <li><Link to="/contact" className="hover:text-white cursor-pointer">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">helpcheck</h5>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-white cursor-pointer">Über uns</Link></li>
            <li><Link to="/jobs" className="hover:text-white cursor-pointer">Jobs</Link></li>
            <li><Link to="/impressum" className="hover:text-white cursor-pointer">Impressum</Link></li>
            <li><Link to="/datenschutz" className="hover:text-white cursor-pointer">Datenschutz</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
        <p>© 2026 helpcheck. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">AGB</a>
          <a href="#" className="hover:text-white">Widerrufsbelehrung</a>
          <a href="#" className="hover:text-white">Cookie-Einstellungen</a>
        </div>
      </div>
    </div>
  </footer>
);

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 z-100 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">Diese Webseite verwendet Cookies</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Wir verwenden Cookies zu unterschiedlichen Zwecken, unter anderem um Inhalte und Anzeigen zu personalisieren. Sie geben Einwilligung zu unseren Cookies, wenn Sie unsere Webseite weiterhin nutzen.
          </p>
          <div className="flex gap-4 mt-2 text-[10px] font-medium text-gray-400">
            <a href="#" className="underline">Impressum</a>
            <a href="#" className="underline">Datenschutzerklärung</a>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button onClick={() => setIsVisible(false)} className="px-6 py-2 bg-blue-900 text-white rounded text-xs font-bold hover:bg-blue-800 transition-colors">
            Cookies zulassen
          </button>
          <button onClick={() => setIsVisible(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-xs font-bold hover:bg-gray-50 transition-colors">
            Auswahl ansehen
          </button>
          <button onClick={() => setIsVisible(false)} className="px-6 py-2 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors">
            Nur notwendige Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/' || location.pathname === '/verkehrsrecht';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-teal-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verkehrsrecht" element={<Verkehrsrecht />} />
        <Route path="/datenskandal" element={<Datenskandal />} />
        <Route path="/ratgeber" element={<Ratgeber />} />
        <Route path="/ratgeber/:slug" element={<Article />} />
        <Route path="/facebook-datenleck" element={<FacebookDatenleck />} />
        <Route path="/linkedin-datenleck" element={<LinkedInDatenleck />} />
        <Route path="/deezer-datenleck" element={<DeezerDatenleck />} />
        <Route path="/handy-am-steuer" element={<HandyAmSteuer />} />
        <Route path="/geschwindigkeit" element={<Geschwindigkeit />} />
        <Route path="/rotlichtverstoss" element={<Rotlichtverstoss />} />
        <Route path="/fahrverbot" element={<Fahrverbot />} />
        <Route path="/dsgvo" element={<DSGVO />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/presse" element={<Presse />} />
      </Routes>
      {!isSpecialPage && <FloatingWidget />}
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default function App() {
  useSmoothScroll();

  return (
    <ChatProvider>
      <Router>
        <AppContent />
      </Router>
    </ChatProvider>
  );
}
