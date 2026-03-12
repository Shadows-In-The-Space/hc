#!/usr/bin/env python3
"""Test chat widget functionality on handy-am-steuer page"""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigiere zu /handy-am-steuer...")
    page.goto('http://localhost:3004/handy-am-steuer')
    page.wait_for_load_state('networkidle')

    # Screenshot vor dem Klick
    page.screenshot(path='/tmp/handy_before.png', full_page=True)
    print("Screenshot vor Klick gespeichert: /tmp/handy_before.png")

    # Finde das Chat-Widget (Float Button)
    widget_selector = "button[aria-label='Chat öffnen']"

    if page.locator(widget_selector).is_visible():
        print("Chat-Widget gefunden! Klicke darauf...")
        page.locator(widget_selector).click()
        page.wait_for_timeout(1000)

        # Screenshot nach dem Klick
        page.screenshot(path='/tmp/handy_after.png', full_page=True)
        print("Screenshot nach Klick gespeichert: /tmp/handy_after.png")

        # Prüfe ob Chat oben im Hero erscheint
        chat_hero = page.locator("text=helpcheck Assistent").first
        if chat_hero.is_visible():
            print("✓ SUCCESS: Chat oben im Hero erscheint!")
        else:
            print("✗ FAIL: Chat erscheint nicht im Hero")
    else:
        print("Chat-Widget nicht gefunden!")
        # Nimm Screenshot um zu sehen was da ist
        page.screenshot(path='/tmp/handy_no_widget.png', full_page=True)

    browser.close()
    print("Test abgeschlossen.")
