#!/usr/bin/env python3
"""Test helpcheck pages for missing images and content"""
from playwright.sync_api import sync_playwright

def test_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Test AboutUs page
        print("=== Testing /ueber-uns ===")
        page = browser.new_page()
        page.goto('http://localhost:3000/ueber-uns')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # Check for broken images
        images = page.locator('img').all()
        print(f"Found {len(images)} images on AboutUs page:")
        for i, img in enumerate(images):
            src = img.get_attribute('src') or 'no src'
            natural_width = img.evaluate('el => el.naturalWidth') if img.count() > 0 else 0
            print(f"  {i+1}. {src} - naturalWidth: {natural_width}")

        page.screenshot(path='/tmp/aboutus.png', full_page=True)
        print("Screenshot saved to /tmp/aboutus.png")

        # Test Verkehrsrecht page
        print("\n=== Testing /verkehrsrecht ===")
        page2 = browser.new_page()
        page2.goto('http://localhost:3000/verkehrsrecht')
        page2.wait_for_load_state('networkidle')
        page2.wait_for_timeout(2000)

        images2 = page2.locator('img').all()
        print(f"Found {len(images2)} images on Verkehrsrecht page:")
        for i, img in enumerate(images2):
            src = img.get_attribute('src') or 'no src'
            print(f"  {i+1}. {src}")

        page2.screenshot(path='/tmp/verkehrsrecht.png', full_page=True)
        print("Screenshot saved to /tmp/verkehrsrecht.png")

        # Test Datenskandal page
        print("\n=== Testing /datenskandal ===")
        page3 = browser.new_page()
        page3.goto('http://localhost:3000/datenskandal')
        page3.wait_for_load_state('networkidle')
        page3.wait_for_timeout(2000)

        images3 = page3.locator('img').all()
        print(f"Found {len(images3)} images on Datenskandal page:")
        for i, img in enumerate(images3):
            src = img.get_attribute('src') or 'no src'
            print(f"  {i+1}. {src}")

        page3.screenshot(path='/tmp/datenskandal.png', full_page=True)
        print("Screenshot saved to /tmp/datenskandal.png")

        browser.close()
        print("\n=== Done ===")

if __name__ == '__main__':
    test_pages()
