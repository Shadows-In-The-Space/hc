# CLAUDE.md

Vollständige Workspace-Dokumentation: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## Kurzreferenz

**HelpCheck** – Deutsche Legal-Tech-Webapp (Verkehrsrecht, Datenlecks, Verbraucherrecht).

### Schnellstart

```bash
# Frontend (hc-main/)
cd hc-main && npm install && npm run dev    # Port 3000

# Backend (backend/)
cd backend && npm install && npm run dev    # Port 3002
```

### Tech Stack

React 19 + TypeScript + Vite 6 | Tailwind CSS v4 (CSS-first) | motion/react | React Router v7 | Express + SQLite

### Wichtige Regeln

- **Tailwind v4**: Konfiguration in `hc-main/src/index.css` unter `@theme`, KEIN `tailwind.config.js`
- **Motion**: Import von `motion/react`, NICHT `framer-motion`
- **Zwei Backends**: `backend/` (TS, primär) und `hc-main/server/` (JS, legacy) – nie gleichzeitig starten
- **DB**: `data/helpcheck.db` – nie ohne Backup löschen
- **Sprache**: Deutsch, beruflich-unterstützender Ton
