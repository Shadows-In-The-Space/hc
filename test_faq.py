#!/usr/bin/env python3
from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        console_messages = []
        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: console_messages.append(f"[PAGE ERROR] {err}"))

        print("Navigiere zur FAQ-Seite...")
        page.goto('http://localhost:3002/faq')
        page.wait_for_timeout(3000)

        # Get content
        content = page.content()
        print(f"\nSeitenquelltext (erste 2000 Zeichen):")
        print(content[:2000])

        print(f"\n\nConsole-Nachrichten:")
        for msg in console_messages:
            print(msg)

        browser.close()

if __name__ == '__main__':
    main()
