# HelpCheck Demo – Workspace Instructions

## Projektüberblick

Deutsche Legal-Tech-Webanwendung, die Nutzern bei der Durchsetzung von Rechtsansprüchen hilft (Verkehrsrecht, Datenlecks, Verbraucherrecht). KI-gestützter Chatbot für Ersteinschätzung und Lead-Erfassung.

## Architektur

```
helpcheck_demo/
├── hc-main/               # Frontend (React 19 + Vite)
│   ├── src/
│   │   ├── App.tsx         # Routing, Navbar, Footer, CookieBanner
│   │   ├── pages/          # Seitenkomponenten (Home, Verkehrsrecht, Datenskandal, etc.)
│   │   ├── components/     # Shared UI (ScrollReveal, AnimatedButton, ParallaxSection)
│   │   │   └── chatbot/    # KI-Chatbot-System (ChatContext, ChatInterface, LeadForm)
│   │   ├── hooks/          # useCountUp, useMediaQuery, useSmoothScroll
│   │   ├── services/       # API-Client (api.ts)
│   │   └── utils/          # SEO-Helfer (seo.ts)
│   ├── server/             # Standalone JS-Backend (Express + sqlite3 + JWT)
│   └── public/             # Statische Assets, sitemap.xml, robots.txt
├── backend/                # TypeScript-Backend (Express + better-sqlite3 + Zod)
│   └── src/
│       ├── server.ts       # Express-Server (Port 3002)
│       ├── routes/         # auth, email (HIBP), leads
│       └── db/             # SQLite-Schema (leads, email_checks, conversations)
└── data/                   # SQLite-Datenbank (helpcheck.db)
```

### Zwei Backends (bekannt)

Es existieren **zwei** Backend-Implementierungen:
- **`backend/`** – TypeScript mit `better-sqlite3` + Zod-Schema-Validierung (primär)
- **`hc-main/server/`** – Plain JS mit `sqlite3` + JWT + bcrypt + multer (älterer Standalone)

Beide laufen auf Port 3002. NICHT beide gleichzeitig starten.

## Tech Stack

| Bereich | Technologie |
|---------|-------------|
| Frontend | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS v4 (CSS-first via `@tailwindcss/vite`, **kein** `tailwind.config.js`) |
| Animation | `motion` (framer-motion Fork), `lenis` (Smooth Scroll) |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| AI | Google Gemini via `@google/genai` |
| Backend | Express, better-sqlite3, Zod |
| DB | SQLite (Datei: `data/helpcheck.db`) |

## Befehle

### Frontend (`hc-main/`)

```bash
npm install          # Dependencies installieren
npm run dev          # Vite Dev-Server (Port 3000, Host 0.0.0.0)
npm run build        # Production-Build
npm run preview      # Build-Vorschau
npm run lint         # TypeScript-Check (tsc --noEmit)
```

### Backend (`backend/`)

```bash
npm install          # Dependencies installieren
npm run dev          # tsx watch (Hot Reload)
npm run build        # TypeScript kompilieren
npm run start        # Production-Start
```

## Umgebungsvariablen

Datei: `hc-main/.env.local` (aus `.env.example`):

| Variable | Zweck |
|----------|-------|
| `GEMINI_API_KEY` | Google Gemini API-Schlüssel für den Chatbot |
| `APP_URL` | Anwendungs-URL für Callbacks |
| `VITE_API_URL` | Backend-URL (default: `http://localhost:3002`) |

## Konventionen & Patterns

### Tailwind CSS v4

- Konfiguration erfolgt CSS-first in [hc-main/src/index.css](hc-main/src/index.css) unter `@theme { }`
- Custom Animations (ken-burns, slide-up, fade-in, float, pulse-glow) sind dort definiert
- **Kein** `tailwind.config.js` verwenden

### Komponenten-Patterns

- **ScrollReveal**: `<ScrollReveal direction="up" delay={0.2}>` für Scroll-basierte Einblend-Animationen. Varianten: `ScrollFade`, `ScrollUp`, `ScrollDown`, `ScrollLeft`, `ScrollRight`, `AnimatedCard`
- **Motion**: Verwende `motion/react` (nicht `framer-motion`) für Animationen
- **ChatBot**: Context-basiert über `ChatProvider` → `useChat()` Hook. Chatbot in `pages/` eingebettet oder als `FloatingWidget`
- **SEO**: Jede Seite mit `generateOrganizationSchema()` und `generateFAQSchema()` aus `utils/seo.ts`
- **ParallaxSection**: Scroll-basierter Parallax-Effekt mit `motion/react`

### Seiten-Architektur

Jede Seite in `src/pages/` ist self-contained mit:
1. Strukturierten Daten für SEO (JSON-LD)
2. Hero-Section mit optionalem ChatInterface
3. Content-Abschnitte mit ScrollReveal-Animationen
4. FAQSection mit vordefinierten FAQs

### Routing

Routen sind zentral in `App.tsx` definiert (kein File-based Routing):
- `/` → Home
- `/verkehrsrecht` → Verkehrsrecht
- `/datenskandal` → Datenskandal
- `/facebook-datenleck`, `/linkedin-datenleck`, `/deezer-datenleck` → Datenleck-Seiten
- `/handy-am-steuer`, `/geschwindigkeit`, `/rotlichtverstoss`, `/fahrverbot` → Verkehrsrecht-Unterseiten
- `/ratgeber`, `/ratgeber/:slug` → Ratgeber + Artikel
- `/admin` → Admin-Panel (Login: admin/helpcheck2024)
- `/faq`, `/about`, `/contact`, `/impressum`, `/datenschutz`, `/jobs`, `/presse`

### API-Endpunkte (Backend)

| Methode | Pfad | Beschreibung |
|---------|------|-------------|
| POST | `/api/leads` | Lead erstellen/aktualisieren |
| GET | `/api/leads` | Alle Leads (Auth) |
| GET | `/api/leads/:email` | Lead per Email (Auth) |
| PATCH | `/api/leads/:id/status` | Lead-Status ändern (Auth) |
| POST | `/api/check-email` | Email auf Datenlecks prüfen (HIBP) |
| POST | `/api/auth/login` | Admin-Login |
| GET | `/api/auth/verify` | Token verifizieren |
| GET | `/api/health` | Health-Check |

### Datenbank-Tabellen

- **leads**: id, email, name, phone, topic, message, status, source, timestamps
- **email_checks**: id, email, breach_count, breaches (JSON), checked_at
- **conversations**: id, lead_id, messages (JSON), created_at

## Tests

Tests sind Playwright-basierte Python-Scripts:
- `hc-main/test_pages.py` – Seitentest für Bilder und Content
- `hc-main/test_pages2.py` – Ratgeber- und About-Seite
- `hc-main/test_glass.py` – Chat-Widget Test
- `hc-main/test_grid.py` – Grid-Layout Tests
- `hc-main/test_faq.py` – FAQ-Seite Test
- `hc-main/scripts/test_chat_widget.py` – Chat-Widget Funktionstest

Ausführung: `python3 hc-main/test_pages.py` (Dev-Server muss laufen)

## Häufige Fallstricke

1. **Zwei Backends**: Nicht beide gleichzeitig starten (Port 3002 Konflikt)
2. **Tailwind v4**: Keine `tailwind.config.js`-Datei – alles in `index.css` unter `@theme`
3. **Motion statt Framer**: Import von `motion/react`, NICHT `framer-motion`
4. **Gemini API Key**: Muss in `.env.local` gesetzt sein, sonst Chatbot-Fehler
5. **SQLite-DB**: Liegt in `data/helpcheck.db` – niemals ohne Backup löschen
6. **Brand**: Sprache ist Deutsch; beruflich-unterstützend; Farben: blue-900/950 + teal-400/cyan-400

## Brand DNA

Aus `dna.json`:
- **Ton**: Professional, Accessible, Supportive, Empowering
- **Font**: Work Sans
- **Werte**: Digital Efficiency, No Cost Risk, Juridical Expertise, Transparency, Customer Centricity
- **Ästhetik**: human-centric, authoritative, transparent, geometric, modern
