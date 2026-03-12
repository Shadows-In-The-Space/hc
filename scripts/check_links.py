#!/usr/bin/env python3
"""Prüfe HelpCheck-Seiten auf fehlende Bilder und Content"""

import asyncio
from playwright.async_api import async_playwright

async def check_pages():
    base_url = "http://localhost:3000"
    pages_to_check = [
        "/",
        "/verkehrsrecht",
        "/datenskandal",
        "/ratgeber",
        "/about",
        "/contact",
        "/impressum",
        "/datenschutz",
    ]

    results = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        for path in pages_to_check:
            url = base_url + path
            print(f"\n{'='*60}")
            print(f"Prüfe: {url}")
            print('='*60)

            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)

                # Nach 404 oder Fehlerseiten suchen
                content = await page.content()
                has_404 = "404" in content or "Page Not Found" in content or "Nicht gefunden" in content

                if has_404:
                    print(f"❌ 404 FEHLER auf {path}")
                    results.append({"page": path, "status": "404", "issues": ["Seite nicht gefunden"]})
                    continue

                # Bilder finden
                images = await page.query_selector_all("img")
                print(f"   ✅ Bilder gefunden: {len(images)}")

                # Bilder die nicht laden (via src)
                broken_images = []
                for img in images:
                    src = await img.get_attribute("src")
                    if src and "data:image" not in src:
                        # Check if loaded
                        bounding = await img.bounding_box()
                        if bounding is None or bounding['width'] == 0:
                            broken_images.append(src)

                if broken_images:
                    print(f"   ❌ Fehlende Bilder: {broken_images}")

                # H1 finden
                hero = await page.query_selector("h1")
                hero_text = await hero.text_content() if hero else "Kein H1"

                print(f"   ✅ H1: {hero_text}")

                results.append({
                    "page": path,
                    "status": "ok" if not broken_images else "missing_images",
                    "issues": broken_images,
                    "h1": hero_text
                })

            except Exception as e:
                print(f"❌ FEHLER: {e}")
                results.append({"page": path, "status": "error", "issues": [str(e)]})

        await browser.close()

    # Zusammenfassung
    print("\n" + "="*60)
    print("ZUSAMMENFASSUNG")
    print("="*60)

    errors = [r for r in results if r["status"] != "ok"]
    if errors:
        print(f"\n❌ {len(errors)} Seiten mit Problemen:")
        for r in errors:
            print(f"   - {r['page']}: {r['issues']}")
    else:
        print("\n✅ Alle Seiten OK!")

    return results

if __name__ == "__main__":
    asyncio.run(check_pages())
