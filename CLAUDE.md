# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a **HelpCheck** demo project - a German legal information web application that helps users understand their rights in various legal situations (traffic law, data privacy, consumer rights).

The main application is in **`hc-main`** which contains:
- All pages: Home, Verkehrsrecht, AboutUs, Contact, DSGVO, Datenskandal, FacebookDatenleck, Fahrverbot, Geschwindigkeit, HandyAmSteuer, Ratgeber, Rotlichtverstoss
- Custom components (ScrollReveal) and hooks (useCountUp)

## Common Commands

```bash
# Install dependencies
npm install

# Run development server (Vite on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint TypeScript
npm run lint
```

## Environment Variables

Create `.env.local` from `.env.example`:
- `GEMINI_API_KEY`: Required for Gemini AI API calls
- `APP_URL`: Application URL for callbacks

## Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite
- **Animation**: Motion (framer-motion alternative)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI**: Google Gemini API via @google/genai

## Key Implementation Details

- Uses Tailwind CSS v4 (CSS-first configuration, no tailwind.config.js)
- React Router for page navigation
- Components in `src/components/`, pages in `src/pages/`
- Custom hooks in `src/hooks/`
- Both hc-dev and hc-main have identical structure - hc-dev is the dev branch with more content
