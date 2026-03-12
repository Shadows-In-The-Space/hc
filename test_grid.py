#!/usr/bin/env python3
"""Test grid layout on pages"""
from playwright.sync_api import sync_playwright

def test_grids():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        print("=== Testing /verkehrsrecht grid ===")
        page = browser.new_page()
        page.goto('http://localhost:3000/verkehrsrecht')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)
        page.evaluate('window.scrollTo(0, 800)')
        page.wait_for_timeout(1000)
        page.screenshot(path='/tmp/verkehr_grid.png', full_page=True)
        print("Saved: /tmp/verkehr_grid.png")

        print("\n=== Testing /datenskandal grid ===")
        page2 = browser.new_page()
        page2.goto('http://localhost:3000/datenskandal')
        page2.wait_for_load_state('networkidle')
        page2.wait_for_timeout(2000)
        page2.evaluate('window.scrollTo(0, 600)')
        page2.wait_for_timeout(1000)
        page2.screenshot(path='/tmp/datensk_grid.png', full_page=True)
        print("Saved: /tmp/datensk_grid.png")

        browser.close()

if __name__ == '__main__':
    test_grids()
