import os
import sys

print("Python version:", sys.version)

# Check for pdf libraries
for lib in ["pypdf", "PyPDF2", "fitz", "pdfplumber", "reportlab"]:
    try:
        __import__(lib)
        print(f"Library {lib} is installed")
    except ImportError:
        print(f"Library {lib} is NOT installed")
