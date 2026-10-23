# -*- coding: utf-8 -*-
import os

DIR = r"D:\sieuthithangmaytoanquoc"
subpages = ["tap-chi.html", "bai-viet.html", "san-pham.html", "chiet-khau.html", "doi-tac.html", "dat-hang.html", "gio-hang.html"]

for fname in subpages:
    fpath = os.path.join(DIR, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if "thiet-ke-cad.html" not in content:
        # Top bar insertion
        if '<a href="tap-chi.html"' in content:
            content = content.replace(
                '<a href="tap-chi.html"',
                '<a href="thiet-ke-cad.html" class="text-gold-400 font-bold hover:underline">📐 Kỹ Sư Vẽ CAD</a>\n        <span>|</span>\n        <a href="tap-chi.html"'
            )
        # Nav insertion
        if '<a href="tap-chi.html" class="text-gold-400' in content:
            content = content.replace(
                '<a href="tap-chi.html" class="text-gold-400',
                '<a href="thiet-ke-cad.html" class="hover:text-gold-400 transition">📐 Kỹ Sư CAD</a>\n          <a href="tap-chi.html" class="text-gold-400'
            )
        elif '<a href="tap-chi.html"' in content:
            content = content.replace(
                '<a href="tap-chi.html"',
                '<a href="thiet-ke-cad.html" class="text-gold-400 font-bold hover:underline">📐 Vẽ CAD & Giá</a>\n        <span>|</span>\n        <a href="tap-chi.html"'
            )
        # Subpage header nav
        if '<a href="chiet-khau.html" class="hover:text-gold-400 transition">Chính Sách KTS & Thầu</a>' in content:
            content = content.replace(
                '<a href="chiet-khau.html" class="hover:text-gold-400 transition">Chính Sách KTS & Thầu</a>',
                '<a href="thiet-ke-cad.html" class="text-gold-400 hover:underline transition">📐 Vẽ CAD & Báo Giá</a>\n          <a href="chiet-khau.html" class="hover:text-gold-400 transition">Chính Sách KTS & Thầu</a>'
            )

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added CAD links to {fname}")

print("CAD link updates complete.")
