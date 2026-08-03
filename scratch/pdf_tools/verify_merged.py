import os
from pypdf import PdfReader

merged_file = r"C:\Users\kkama\.gemini\antigravity\brain\8f04815f-65e6-41a9-b69e-e28f19d5e05e\merged_document.pdf"

if os.path.exists(merged_file):
    print("Merged file exists.")
    reader = PdfReader(merged_file)
    print(f"Total Pages in Merged PDF: {len(reader.pages)}")
    
    # Expected page count: 4 + 6 + 3 + 20 + 14 = 47 pages
    expected = 4 + 6 + 3 + 20 + 14
    print(f"Expected Pages: {expected}")
    if len(reader.pages) == expected:
        print("Verification SUCCESS: Page count matches expected count.")
    else:
        print("Verification FAILURE: Page count mismatch.")
else:
    print("Merged file does NOT exist.")
