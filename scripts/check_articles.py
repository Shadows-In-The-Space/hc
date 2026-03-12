#!/usr/bin/env python3
"""Prüfe Article-Routen auf der HelpCheck-Seite"""

import asyncio
from playwright.async_api import async_playwright

async def check_articles():
    base_url = "http://localhost:3000"

    # Article-Slugs aus Ratgeber.tsx
    articles = [
        "/ratgeber/bussgeldbescheid-anfechten",
        "/ratgeber/geblitzt-innerorts",
        "/ratgeber/bei-rot-geblitzt",
        "/ratgeber/handy-am-steuer",
        "/ratgeber/fahrverbot-umgehen",
        "/ratgeber/geblitzt-probezeit",
        "/ratgeber/facebook-datenskandal",
        "/ratgeber/linkedin-schadensersatz",
        "/ratgeber/deezer-schadensersatz",
        "/ratgeber/datenleck-schadensersatz",
        "/ratgeber/datenleck-checker",
        "/ratgeber/datenleck-rechtsschutzversicherung",
        "/ratgeber/tesla-schadensersatz",
        "/ratgeber/twitter-schadensersatz",
        "/ratgeber/facebook-entschaedigung",
    ]

    results = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        for path in articles:
            url = base_url + path
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                content = await page.content()

                has_404 = "404" in content or "Page Not Found" in content or "Nicht gefunden" in content

                if has_404:
                    print(f"❌ 404: {path}")
                    results.append({"page": path, "status": "404"})
                else:
                    h1 = await page.query_selector("h1")
                    h1_text = await h1.text_content() if h1 else "Kein H1"
                    print(f"✅ {path}: {h1_text[:50]}...")
                    results.append({"page": path, "status": "ok"})
            except Exception as e:
                print(f"❌ ERROR {path}: {e}")
                results.append({"page": path, "status": "error", "error": str(e)})

        await browser.close()

    # Zusammenfassung
    errors = [r for r in results if r["status"] != "ok"]
    print(f"\n❌ Fehler: {len(errors)} von {len(articles)}")

    return results

if __name__ == "__main__":
    asyncio.run(check_articles())
