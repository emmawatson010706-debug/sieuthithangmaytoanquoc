# -*- coding: utf-8 -*-
import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"

# Map of replacements
replacements = [
    # 1. Council & Inspection Board names
    ("Ban Kỹ Thuật Siêu Thị Thang Máy", "Ban Kỹ Thuật Siêu Thị Thang Máy"),
    ("Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu", "Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu"),
    ("Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam", "Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam"),
    ("Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam", "Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam"),
    ("BAN KỸ THUẬT SIÊU THỊ THANG MÁY", "BAN KỸ THUẬT SIÊU THỊ THANG MÁY"),
    ("Ban Kỹ Thuật Siêu Thị Thang Máy", "Ban Kỹ Thuật Siêu Thị Thang Máy"),
    ("Ban Kỹ Thuật Thang Máy", "Ban Kỹ Thuật Thang Máy"),
    ("Ban Kỹ Thuật Thang Máy", "Ban Kỹ Thuật Thang Máy"),
    ("Ban kỹ thuật thang máy", "Ban kỹ thuật thang máy"),
    ("Chuyên Gia Kỹ Thuật Thang Máy", "Chuyên Gia Kỹ Thuật Thang Máy"),

    # 2. Badges that sounded like state authority
    ("QUY CHUẨN AN TOÀN", "QUY CHUẨN AN TOÀN"),
    ("AN TOÀN KỸ THUẬT", "AN TOÀN KỸ THUẬT"),
    ("Quy chuẩn an toàn", "Quy chuẩn an toàn"),
    ("CHUYÊN TRANG KỸ THUẬT & CÔNG NGHỆ THANG MÁY", "CHUYÊN TRANG KỸ THUẬT & CÔNG NGHỆ THANG MÁY"),
    ("CHUYÊN TRANG KỸ THUẬT & CÔNG NGHỆ", "CHUYÊN TRANG KỸ THUẬT & CÔNG NGHỆ"),

    # 3. Top bar phrasing to be clear we comply with standards rather than representing them
    ("Tuân Thủ Quy Chuẩn QCVN 02:2019/BLĐTBXH", "Tuân Thủ Quy Chuẩn QCVN 02:2019/BLĐTBXH"),
    ("Quy chuẩn an toàn QCVN 02:2019", "Quy chuẩn an toàn QCVN 02:2019"),
    ("Quy chuẩn an toàn QCVN 02:2019", "Quy chuẩn an toàn QCVN 02:2019"),
]

# Files to update
all_files = [f for f in os.listdir(DIR) if f.endswith(('.html', '.py', '.md'))]

for fname in all_files:
    fpath = os.path.join(DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        text = f.read()

    changed = False
    for old, new in replacements:
        if old in text:
            text = text.replace(old, new)
            changed = True

    if changed:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Cleaned state impersonation titles in {fname}")

print("Sweep complete.")
