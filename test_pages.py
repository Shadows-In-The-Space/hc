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

        # Test Ratgeber page
        print("\n=== Testing /ratgeber ===")
        page4 = browser.new_page()
        page4.goto('http://localhost:3000/ratgeber')
        page4.wait_for_load_state('networkidle')
        page4.wait_for_timeout(2000)

        images4 = page4.locator('img').all()
        print(f"Found {len(images4)} images on Ratgeber page:")
        for i, img in enumerate(images4):
            src = img.get_attribute('src') or 'no src'
            print(f"  {i+1}. {src}")

        # Check for article links
        links = page4.locator('a').all()
        print(f"Found {len(links)} links on Ratgeber page")

        page4.screenshot(path='/tmp/ratgeber.png', full_page=True)
        print("Screenshot saved to /tmp/ratgeber.png")

        # Test Article page
        print("\n=== Testing /ratgeber/bussgeldbescheid-anfechten ===")
        page5 = browser.new_page()
        page5.goto('http://localhost:3000/ratgeber/bussgeldbescheid-anfechten')
        page5.wait_for_load_state('networkidle')
        page5.wait_for_timeout(2000)

        h1 = page5.locator('h1').first.text_content() if page5.locator('h1').count() > 0 else "No h1"
        print(f"H1: {h1}")

        images5 = page5.locator('img').all()
        print(f"Found {len(images5)} images on Article page:")
        for i, img in enumerate(images5):
            src = img.get_attribute('src') or 'no src'
            print(f"  {i+1}. {src}")

        page5.screenshot(path='/tmp/article.png', full_page=True)
        print("Screenshot saved to /tmp/article.png")

        browser.close()
        print("\n=== Done ===")

if __name__ == '__main__':
    test_pages()
