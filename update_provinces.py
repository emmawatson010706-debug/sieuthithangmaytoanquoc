import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"

# 1. Update existing files replacing 63/64 provinces with 34 provinces
target_files = ["chiet-khau.html", "dat-hang.html", "doi-tac.html", "gio-hang.html", "san-pham.html", "preview.html", "index.html"]

for fname in target_files:
    fpath = os.path.join(DIR, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace variations of 63 or 64 provinces
    content = re.sub(r'(?i)6[34]\s*tỉnh\s*thành', '34 tỉnh thành', content)
    content = re.sub(r'(?i)6[34]\s*tỉnh', '34 tỉnh thành', content)

    # In subpages, ensure tap-chi.html is present in nav if missing
    if fname in ["san-pham.html", "chiet-khau.html", "doi-tac.html", "dat-hang.html", "gio-hang.html"]:
        # Add tap-chi.html to top bar if not present
        if 'tap-chi.html' not in content:
            # Try to insert in header nav
            content = content.replace(
                '<a href="index.html" class="hover:text-gold-400 transition">Trang Chủ</a>',
                '<a href="index.html" class="hover:text-gold-400 transition">Trang Chủ</a>\n          <a href="tap-chi.html" class="text-sky-400 hover:text-gold-400 transition font-bold">📰 Tạp Chí Thang Máy</a>'
            )
            # Try to insert in top bar
            content = content.replace(
                '<a href="tel:0914587575"',
                '<a href="tap-chi.html" class="text-yellow-300 hover:underline">📰 Tạp Chí Thang Máy</a>\n        <span>|</span>\n        <a href="tel:0914587575"'
            )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {fname} successfully.")

print("Subpage updates complete.")
