import os
import sys
import glob
from pypdf import PdfReader

# Reconfigure stdout to use utf-8 to prevent encoding errors on Windows terminal
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

artifact_dir = r"C:\Users\kkama\.gemini\antigravity\brain\8f04815f-65e6-41a9-b69e-e28f19d5e05e"
pdf_files = glob.glob(os.path.join(artifact_dir, "media__*.pdf"))

print(f"Found {len(pdf_files)} PDF files in {artifact_dir}")

for pdf_path in sorted(pdf_files):
    filename = os.path.basename(pdf_path)
    try:
        reader = PdfReader(pdf_path)
        num_pages = len(reader.pages)
        first_page_text = ""
        if num_pages > 0:
            first_page_text = reader.pages[0].extract_text()
            # Get first 100 characters, cleaned up
            first_page_text = " ".join(first_page_text.split())[:120]
        print(f"File: {filename} | Pages: {num_pages} | Preview: {first_page_text}")
    except Exception as e:
        print(f"File: {filename} | Error: {e}")
