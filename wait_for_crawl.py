import json
import time
import urllib.request

JOB_URL = "http://localhost:3002/v2/crawl/019cdd12-fc9b-70b7-b769-faa4fc0577a9"
OUT_FILE = "helpcheck_full_crawl.json"

print(f"Polling {JOB_URL}...")
while True:
    try:
        response = urllib.request.urlopen(JOB_URL)
        data = json.loads(response.read().decode('utf-8'))
        status = data.get('status')
        pages = len(data.get('data', [])) if isinstance(data.get('data'), list) else 0
        
        print(f"Status: {status}, Pages scraped: {pages}")
        
        with open(OUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        if status == 'completed':
            print("Crawl completed successfully!")
            break
        elif status in ['failed', 'error']:
            print(f"Crawl failed with status: {status}")
            break
            
        time.sleep(10)
    except Exception as e:
        print(f"Error polling: {e}")
        time.sleep(10)
