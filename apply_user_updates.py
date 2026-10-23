# -*- coding: utf-8 -*-
import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"

# 1. Update tap-chi.html
with open(os.path.join(DIR, "tap-chi.html"), "r", encoding="utf-8") as f:
    tap_chi = f.read()

# Replace the long description paragraph with just "Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam."
tap_chi = re.sub(
    r'<p class="max-w-3xl text-xs sm:text-sm text-slate-300 leading-relaxed">\s*Được biên soạn bởi đội ngũ Kỹ Sư Trưởng Cơ Điện & Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu.*?</p>',
    '<p class="max-w-3xl text-xs sm:text-sm text-gold-300 leading-relaxed font-semibold">Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam.</p>',
    tap_chi,
    flags=re.DOTALL
)

# Replace Xu Hướng 2026 with Xu Hướng 2027 (trend year 2027)
tap_chi = tap_chi.replace("Kho Tri Thức Kỹ Thuật, An Toàn & Xu Hướng 2026", "Kho Tri Thức Kỹ Thuật, An Toàn & Xu Hướng 2027")
tap_chi = tap_chi.replace("Cẩm Nang Kỹ Thuật, An Toàn & Xu Hướng 2026", "Cẩm Nang Kỹ Thuật, An Toàn & Xu Hướng 2027")
tap_chi = tap_chi.replace("Xu hướng thang kính biệt thự 2026", "Xu hướng thang kính biệt thự 2027")
tap_chi = tap_chi.replace("Xu Hướng Thang Kính Biệt Thự 2026", "Xu Hướng Thang Kính Biệt Thự 2027")
tap_chi = tap_chi.replace("hố thang chuẩn 2026", "hố thang chuẩn 2027")

with open(os.path.join(DIR, "tap-chi.html"), "w", encoding="utf-8") as f:
    f.write(tap_chi)

print("tap-chi.html updated successfully.")

# 2. Update index.html
with open(os.path.join(DIR, "index.html"), "r", encoding="utf-8") as f:
    idx = f.read()

idx = idx.replace("Tạp Chí Thang Máy • Kiến Thức & Xu Hướng 2026", "Tạp Chí Thang Máy • Kiến Thức & Xu Hướng 2027")
idx = idx.replace(
    "Tổng hợp các bài viết chuẩn SEO, phân tích chuyên sâu về an toàn, kỹ thuật thi công hố thang và cảnh báo thị trường từ Kỹ Sư Trưởng.",
    "Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam."
)
idx = idx.replace("HOT DEAL 2026", "HOT DEAL 2027")
idx = idx.replace("Bảng Tra Cứu Dự Toán Giá Nhanh Theo Mô Hình Nhà 2026", "Bảng Tra Cứu Dự Toán Giá Nhanh Theo Mô Hình Nhà 2027")
idx = idx.replace("BỘ SƯU TẬP MẪU CABIN 2026", "BỘ SƯU TẬP MẪU CABIN 2027")

with open(os.path.join(DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(idx)

print("index.html updated successfully.")

# 3. Update articles_data.py
with open(os.path.join(DIR, "articles_data.py"), "r", encoding="utf-8") as f:
    art_data = f.read()

art_data = art_data.replace("Xu Hướng Thang Máy Kính Quan Sát Panoramic Biệt Thự:", "Xu Hướng Thang Máy Kính Quan Sát Panoramic Biệt Thự 2027:")
art_data = art_data.replace("xu hướng thang kính", "xu hướng thang kính 2027")

with open(os.path.join(DIR, "articles_data.py"), "w", encoding="utf-8") as f:
    f.write(art_data)

print("articles_data.py updated successfully.")

# 4. Regenerate bai-viet.html and tap_chi generator
