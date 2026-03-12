#!/usr/bin/env python3
"""Test helpcheck pages for missing images and content"""
from playwright.sync_api import sync_playwright

def test_ratgeber():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        print("=== Testing /ratgeber ===")
        page = browser.new_page()
        page.goto('http://localhost:3000/ratgeber')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # Scroll down to see the articles
        page.evaluate('window.scrollTo(0, 800)')
        page.wait_for_timeout(1000)

        # Get the visible content
        articles = page.locator('.grid.grid-cols-1').first
        if articles.count() > 0:
            print("Found article grid")
        else:
            print("No article grid found")

        # Check all h2 elements
        h2s = page.locator('h2').all()
        print(f"Found {len(h2s)} h2 elements:")
        for i, h2 in enumerate(h2s[:5]):
            text = h2.text_content()
            print(f"  {i+1}. {text}")

        page.screenshot(path='/tmp/ratgeber_scrolled.png', full_page=True)
        print("Screenshot saved")

        # Test clicking on an article
        print("\n=== Clicking on first article ===")
        first_link = page.locator('a[href*="/ratgeber/"]').first
        href = first_link.get_attribute('href')
        print(f"First article link: {href}")

        if href:
            page.goto(f'http://localhost:3000{href}')
            page.wait_for_load_state('networkidle')
            h1 = page.locator('h1').first.text_content() if page.locator('h1').count() > 0 else "No h1"
            print(f"Article page H1: {h1}")
            page.screenshot(path='/tmp/clicked_article.png', full_page=True)

        browser.close()

def test_about():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        print("\n=== Testing /ueber-uns ===")
        page = browser.new_page()
        page.goto('http://localhost:3000/ueber-uns')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(3000)

        # Scroll down
        page.evaluate('window.scrollTo(0, 600)')
        page.wait_for_timeout(1000)

        # Get team member names from page
        team_members = page.locator('h3').all()
        print(f"Found {len(team_members)} h3 elements:")
        for i, member in enumerate(team_members[:15]):
            text = member.text_content()
            print(f"  {i+1}. {text}")

        # Look for team images
        images = page.locator('img').all()
        print(f"\nFound {len(images)} images on AboutUs page:")
        for i, img in enumerate(images):
            src = img.get_attribute('src') or 'no src'
            print(f"  {i+1}. {src}")

        page.screenshot(path='/tmp/aboutus_scrolled.png', full_page=True)
        print("\nScreenshot saved")

        browser.close()

if __name__ == '__main__':
    test_ratgeber()
    test_about()
