# -*- coding: utf-8 -*-
import re

path = r'D:\sieuthithangmaytoanquoc\index.html'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace magazine heading and description
text = re.sub(
    r'Tạp Chí Thang Máy • Kiến Thức & Xu Hướng 2026',
    'Tạp Chí Thang Máy • Kiến Thức & Xu Hướng 2027',
    text
)

text = re.sub(
    r'Tổng hợp các bài viết chuẩn SEO, phân tích chuyên sâu về an toàn, kỹ thuật thi công hố thang và cảnh báo thị trường từ Kỹ Sư Trưởng\.',
    'Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam.',
    text
)

text = text.replace('Bảng Tra Cứu Dự Toán Giá Nhanh Theo Mô Hình Nhà 2026', 'Bảng Tra Cứu Dự Toán Giá Nhanh Theo Mô Hình Nhà 2027')
text = text.replace('HOT DEAL 2026', 'HOT DEAL 2027')
text = text.replace('BỘ SƯU TẬP MẪU CABIN 2026', 'BỘ SƯU TẬP MẪU CABIN 2027')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated index.html successfully')
