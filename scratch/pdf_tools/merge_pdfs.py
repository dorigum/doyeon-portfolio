import os
import glob
from pypdf import PdfWriter

artifact_dir = r"C:\Users\kkama\.gemini\antigravity\brain\8f04815f-65e6-41a9-b69e-e28f19d5e05e"
output_file = os.path.join(artifact_dir, "merged_document.pdf")

pdf_files = glob.glob(os.path.join(artifact_dir, "media__*.pdf"))
pdf_files = sorted(pdf_files)

writer = PdfWriter()

print("Merging the following PDFs using PdfWriter:")
for pdf in pdf_files:
    print(f"- {os.path.basename(pdf)}")
    writer.append(pdf)

with open(output_file, "wb") as out:
    writer.write(out)

writer.close()

print(f"Successfully merged into: {output_file}")
print(f"File size: {os.path.getsize(output_file)} bytes")
