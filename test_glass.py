#!/usr/bin/env python3
from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test verkehrsrecht page
        page.goto('http://localhost:3000/verkehrsrecht')
        page.wait_for_load_state('networkidle')

        # Find and click the chat widget button
        widget = page.locator('button').filter(has_text='Online')
        if widget.count() > 0:
            widget.first.click()
            page.wait_for_timeout(500)
            page.screenshot(path='/tmp/chat_open.png', full_page=True)
            print("Chat opened")
        else:
            # Try alternative selector
            buttons = page.locator('button').all()
            for btn in buttons:
                print(f"Button: {btn.text_content()}")
            page.screenshot(path='/tmp/chat_closed.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    main()
