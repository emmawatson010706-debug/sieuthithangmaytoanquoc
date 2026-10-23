import os
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import fitz
from PIL import Image

output_dir = r"D:\sieuthithangmaytoanquoc\images"
os.makedirs(output_dir, exist_ok=True)

# 1. Copy direct cabin images from "D:\THANG MAY HDE"
src_folder = None
for root, dirs, files in os.walk(r"D:\THANG MAY HDE"):
    for d in dirs:
        if "cabin" in d.lower():
            cabin_path = os.path.join(root, d)
            for sub_root, sub_dirs, sub_files in os.walk(cabin_path):
                pngs = [f for f in sub_files if f.lower().endswith(('.png', '.jpg'))]
                if len(pngs) >= 5:
                    src_folder = sub_root
                    break

print("Found cabin source folder:", src_folder)
if src_folder:
    for f in os.listdir(src_folder):
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            src = os.path.join(src_folder, f)
            dst = os.path.join(output_dir, f"cabin_{f}")
            shutil.copy2(src, dst)
            print("Copied cabin:", f)

# 2. Find and extract pages from the PDF
pdf_path = None
for f in os.listdir(r"D:\sieuthithangmaytoanquoc"):
    if f.lower().endswith(".pdf") and "cattalo" in f.lower():
        pdf_path = os.path.join(r"D:\sieuthithangmaytoanquoc", f)
        break

print("Found PDF path:", pdf_path)
if pdf_path:
    doc = fitz.open(pdf_path)
    print("Total PDF pages:", len(doc))
    # Render pages as images (e.g. up to 25 pages)
    for page_num in range(min(25, len(doc))):
        page = doc[page_num]
        pix = page.get_pixmap(dpi=150)
        img_out = os.path.join(output_dir, f"catalog_page_{page_num+1}.jpg")
        pix.save(img_out)
        print(f"Rendered catalog page {page_num+1}")

print("Assets extraction completed!")
