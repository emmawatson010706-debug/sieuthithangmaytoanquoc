# -*- coding: utf-8 -*-
import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"
index_path = os.path.join(DIR, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Navigation links to add thiet-ke-cad.html
old_nav_item = '<a href="tap-chi.html" class="px-3 py-1 rounded text-sky-400 hover:bg-navy-800">📰 Tạp Chí Thang Máy</a>'
new_nav_item = '<a href="thiet-ke-cad.html" class="px-3 py-1 rounded text-gold-400 bg-navy-800 font-black hover:bg-gold-600 hover:text-navy-950 transition">📐 Kỹ Sư CAD & Dự Toán</a>\n        <a href="tap-chi.html" class="px-3 py-1 rounded text-sky-400 hover:bg-navy-800">📰 Tạp Chí Thang Máy</a>'
if old_nav_item in content and 'thiet-ke-cad.html' not in content:
    content = content.replace(old_nav_item, new_nav_item)

# Also in top bar
old_top_bar = '<a href="tap-chi.html" class="text-yellow-300 hover:underline">📰 Tạp Chí Thang Máy</a>'
new_top_bar = '<a href="thiet-ke-cad.html" class="text-gold-400 font-bold hover:underline">📐 Kỹ Sư Vẽ CAD & Báo Giá</a>\n        <span>|</span>\n        <a href="tap-chi.html" class="text-yellow-300 hover:underline">📰 Tạp Chí Thang Máy</a>'
if old_top_bar in content:
    content = content.replace(old_top_bar, new_top_bar, 1)

# Also in drawer menu
old_drawer_link = '<a href="tap-chi.html" class="block py-2 px-2.5 rounded bg-blue-50 text-blue-900 hover:bg-blue-100">📰 Tạp Chí Thang Máy (Kỹ Thuật & Xu Hướng)</a>'
new_drawer_link = '<a href="thiet-ke-cad.html" class="block py-2 px-2.5 rounded bg-amber-50 text-gold-800 font-bold hover:bg-amber-100">📐 Kỹ Sư Auto-CAD & Dự Toán Giá Tự Động</a>\n          <a href="tap-chi.html" class="block py-2 px-2.5 rounded bg-blue-50 text-blue-900 hover:bg-blue-100">📰 Tạp Chí Thang Máy (Kỹ Thuật & Xu Hướng)</a>'
if old_drawer_link in content:
    content = content.replace(old_drawer_link, new_drawer_link)

# 2. Upgrade the section #du-toan to include the Live AutoCAD Engine
new_section_du_toan = '''  <!-- ==================== HỆ THỐNG AUTO-CAD & DỰ TOÁN BÁO GIÁ THANG MÁY TỰ ĐỘNG ==================== -->
  <section id="du-toan" class="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4">
    <div class="relative bg-gradient-to-br from-navy-900 via-navy-950 to-slate-950 rounded-2xl p-4 sm:p-7 border-2 border-gold-500 shadow-2xl space-y-6 overflow-hidden">
      
      <!-- HÌNH ẢNH THANG MÁY MỜ LÀM NỀN TRUNG TÂM -->
      <div class="absolute inset-0 bg-cover bg-center opacity-30 scale-105 pointer-events-none" style="background-image: url('images/calc_blurred_elevator.jpg');"></div>
      <div class="absolute inset-0 bg-navy-950/80 z-0"></div>

      <!-- HEADER CỦA CÔNG CỤ -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-700/80 pb-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 bg-gold-500 text-navy-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
            <span>📐 ĐỘT PHÁ CÔNG NGHỆ 2027</span> • KỸ SƯ AUTOCAD ẢO
          </div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Kỹ Sư Auto-CAD & Dự Toán Giá Thang Máy Nhanh
          </h2>
          <p class="text-xs text-slate-300">
            Nhập kích thước hố thực tế của nhà bạn — Hệ thống tự động vẽ bản vẽ kỹ thuật CAD 2D thời gian thực và bóc tách dự toán trọn gói.
          </p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <a href="thiet-ke-cad.html" class="bg-navy-800 hover:bg-gold-600 text-gold-400 hover:text-navy-950 border border-gold-500/50 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow whitespace-nowrap">
            🔍 Mở Trình Vẽ CAD Toàn Màn Hình
          </a>
        </div>
      </div>

      <!-- GRID 2 CỘT: CỘT TRÁI (THÔNG SỐ) - CỘT PHẢI (MÀN HÌNH BẢN VẼ AUTOCAD) -->
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs">
        
        <!-- CỘT TRÁI (5 CỘT): FORM THÔNG SỐ -->
        <div class="lg:col-span-5 bg-navy-900/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-700 space-y-4">
          <div class="font-black text-gold-400 uppercase tracking-wider text-xs border-b border-slate-700 pb-2 flex items-center justify-between">
            <span>1. KÍCH THƯỚC HỐ THANG THỰC TẾ</span>
            <span class="text-[10px] text-slate-400 font-normal">Kéo thanh trượt để chỉnh</span>
          </div>

          <!-- Rộng W -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-slate-300 font-bold">Chiều rộng lọt lòng (W):</label>
              <span id="homeValW" class="font-mono font-black text-gold-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-700">1400 mm</span>
            </div>
            <input type="range" id="homeInputW" min="1000" max="2200" step="50" value="1400" oninput="homeUpdateCad()" class="w-full cursor-pointer accent-amber-500">
          </div>

          <!-- Sâu D -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-slate-300 font-bold">Chiều sâu lọt lòng (D):</label>
              <span id="homeValD" class="font-mono font-black text-gold-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-700">1450 mm</span>
            </div>
            <input type="range" id="homeInputD" min="1000" max="2200" step="50" value="1450" oninput="homeUpdateCad()" class="w-full cursor-pointer accent-amber-500">
          </div>

          <!-- Pit & OH -->
          <div class="grid grid-cols-2 gap-3 pt-1 border-t border-slate-700/60">
            <div class="space-y-1">
              <label class="text-slate-300 font-bold block">Hố PIT:</label>
              <select id="homeInputPit" onchange="homeUpdateCad()" class="w-full bg-navy-950 text-white border border-slate-600 rounded-lg p-2 font-bold focus:outline-none focus:border-gold-500">
                <option value="250">250 mm (Siêu nông)</option>
                <option value="350" selected>350 mm (Homelift)</option>
                <option value="500">500 mm (Nhà phố)</option>
                <option value="1200">1200 mm (Tiêu chuẩn)</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-slate-300 font-bold block">Tum OH:</label>
              <select id="homeInputOh" onchange="homeUpdateCad()" class="w-full bg-navy-950 text-white border border-slate-600 rounded-lg p-2 font-bold focus:outline-none focus:border-gold-500">
                <option value="2800">2800 mm (Tum thấp)</option>
                <option value="3200" selected>3200 mm (Biệt thự)</option>
                <option value="3600">3600 mm (Tiêu chuẩn)</option>
                <option value="4200">4200 mm (Cao tầng)</option>
              </select>
            </div>
          </div>

          <!-- Stops & Type -->
          <div class="grid grid-cols-2 gap-3 pt-1 border-t border-slate-700/60">
            <div class="space-y-1">
              <label class="text-slate-300 font-bold block">Số tầng (Stops):</label>
              <select id="homeInputStops" onchange="homeUpdateCad()" class="w-full bg-navy-950 text-white border border-slate-600 rounded-lg p-2 font-bold focus:outline-none focus:border-gold-500">
                <option value="3">3 Tầng</option>
                <option value="4" selected>4 Tầng</option>
                <option value="5">5 Tầng</option>
                <option value="6">6 Tầng</option>
                <option value="7">7 Tầng</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-slate-300 font-bold block">Động cơ:</label>
              <select id="homeInputMotor" onchange="homeUpdateCad()" class="w-full bg-navy-950 text-white border border-slate-600 rounded-lg p-2 font-bold focus:outline-none focus:border-gold-500">
                <option value="fuji" selected>Fuji Nhật Bản</option>
                <option value="montanari">Montanari Ý</option>
                <option value="ziehl">Ziehl-Abegg Đức</option>
              </select>
            </div>
          </div>

          <!-- Chủng loại thang -->
          <div class="space-y-1 pt-1 border-t border-slate-700/60">
            <label class="text-slate-300 font-bold block">Dòng thang & Kết cấu vách:</label>
            <select id="homeInputType" onchange="homeUpdateCad()" class="w-full bg-navy-950 text-white border border-slate-600 rounded-lg p-2 font-bold focus:outline-none focus:border-gold-500">
              <option value="thang-kinh" selected>✨ Thang Kính Panoramic Biệt Thự (Khung Thép CNC)</option>
              <option value="homelift">🏡 Thang Gia Đình Homelift Mini (Inox Hoàng Gia)</option>
              <option value="khach-san">🏨 Thang Tải Khách Khách Sạn (Hố Bê Tông)</option>
              <option value="nhap-khau">👑 Thang Nhập Khẩu Nguyên Chiếc Châu Âu</option>
            </select>
          </div>

          <!-- Thông số kỹ thuật cabin tính toán tự động -->
          <div class="p-3 bg-navy-950 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
            <div class="flex justify-between">
              <span>Cabin lọt lòng:</span>
              <strong id="homeCalcCabin" class="text-green-400 font-bold">1000 x 1150 mm</strong>
            </div>
            <div class="flex justify-between">
              <span>Cửa thông thủy OP:</span>
              <strong id="homeCalcDoor" class="text-pink-400 font-bold">700 x 2100 mm</strong>
            </div>
            <div class="flex justify-between">
              <span>Tải trọng thiết kế:</span>
              <strong id="homeCalcCap" class="text-gold-400 font-bold">350 kg (4 - 5 người)</strong>
            </div>
          </div>

        </div>

        <!-- CỘT PHẢI (7 CỘT): MÀN HÌNH AUTOCAD BẢN VẼ THỜI GIAN THỰC -->
        <div class="lg:col-span-7 bg-navy-950 rounded-xl border border-gold-500/60 overflow-hidden shadow-xl flex flex-col">
          
          <!-- AutoCAD Toolbar -->
          <div class="bg-navy-900 px-3 py-2 flex items-center justify-between border-b border-slate-800 text-[11px]">
            <div class="flex items-center gap-1.5 font-mono text-gold-400 font-bold">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>BẢN VẼ AUTOCAD THỜI GIAN THỰC</span>
            </div>
            <!-- Switch buttons -->
            <div class="flex items-center gap-1 bg-navy-950 p-0.5 rounded border border-slate-700">
              <button id="homeTabPlan" onclick="homeSwitchCad('plan')" class="px-2.5 py-1 rounded text-[11px] font-bold bg-gold-500 text-navy-950 transition">
                📐 Mặt Bằng (Plan)
              </button>
              <button id="homeTabSec" onclick="homeSwitchCad('section')" class="px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 hover:text-white transition">
                📏 Mặt Cắt (Section)
              </button>
            </div>
          </div>

          <!-- Màn hình bản vẽ -->
          <div class="cad-canvas-container p-3 flex items-center justify-center min-h-[340px] relative select-none">
            
            <!-- Plan SVG -->
            <div id="homeCadPlanView" class="w-full flex items-center justify-center">
              <svg id="homeSvgPlan" viewBox="0 0 540 400" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>

            <!-- Section SVG -->
            <div id="homeCadSecView" class="w-full items-center justify-center hidden">
              <svg id="homeSvgSec" viewBox="0 0 540 460" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>

            <!-- Ghi chú khung tên bản vẽ -->
            <div class="absolute bottom-2 right-2 bg-navy-950/85 p-1.5 rounded border border-slate-800 text-[9px] font-mono text-right text-slate-400">
              <div>Đơn vị: mm • Tỷ lệ: 1:25</div>
              <div class="text-gold-400 font-bold">Hotline: 0914.587.575</div>
            </div>

          </div>

          <!-- Nút tải & gửi Zalo -->
          <div class="bg-navy-900/95 p-2.5 flex items-center justify-between gap-2 border-t border-slate-800 text-xs">
            <span class="text-[11px] text-slate-400">Bản vẽ tự động co giãn theo số đo vừa nhập.</span>
            <div class="flex gap-2">
              <button onclick="homeDownloadCad()" class="bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 px-3 py-1 rounded-lg text-xs font-bold transition">
                📥 Tải Bản Vẽ (SVG)
              </button>
              <button onclick="homeSendZalo()" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold transition">
                💬 Gửi Zalo Kỹ Sư Trưởng
              </button>
            </div>
          </div>

        </div>

      </div>

      <!-- KẾT QUẢ DỰ TOÁN HIỂN THỊ TRỰC TIẾP (BÓC TÁCH CHI TIẾT) -->
      <div class="relative z-10 bg-navy-950/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-gold-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-1.5 text-center md:text-left">
          <span class="text-xs text-slate-400 uppercase tracking-widest font-bold">MỨC GIÁ DỰ TOÁN TRỌN GÓI THEO BẢN VẼ KỸ THUẬT:</span>
          <div class="text-3xl sm:text-4xl font-black text-gold-400" id="estimatedPriceText">
            335.000.000 ₫ - 375.000.000 ₫
          </div>
          <div class="text-xs text-slate-300 flex flex-wrap items-center gap-2 justify-center md:justify-start pt-1">
            <span class="inline-flex items-center gap-1.5 bg-navy-900 border border-slate-700/80 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
              <span class="text-green-400 font-bold">✓</span>
              <span>Kích thước hố: <strong id="shaftSizeText" class="text-white font-bold">1400mm x 1450mm</strong></span>
            </span>
            <span class="inline-flex items-center gap-1.5 bg-navy-900 border border-slate-700/80 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
              <span class="text-gold-400 font-bold">✓</span>
              <span id="homePitBadge">Hố PIT: <strong class="text-white font-bold">350mm (Đệm PU)</strong></span>
            </span>
            <span class="inline-flex items-center gap-1.5 bg-navy-900 border border-slate-700/80 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
              <span class="text-blue-400 font-bold">✓</span>
              <span>Động cơ: <strong id="homeMotorBadge" class="text-white font-bold">Fuji PMSM Nhật Bản</strong></span>
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a href="dat-hang.html" class="bg-gradient-to-r from-accent-red to-orange-600 hover:opacity-95 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center shadow-lg transition whitespace-nowrap">
            📐 ĐẶT LỊCH KỸ SƯ KHẢO SÁT HỐ THANG MIỄN PHÍ
          </a>
          <a href="thiet-ke-cad.html" class="bg-white/10 hover:bg-white/20 border border-gold-500/50 text-gold-400 font-bold px-5 py-3.5 rounded-xl text-xs text-center transition whitespace-nowrap">
            📋 Mở Bảng Bóc Tách BOQ Chi Tiết
          </a>
        </div>
      </div>

    </div>
  </section>'''

# Replace the old du-toan section
content = re.sub(
    r'<!-- ==================== BỘ TÍNH DỰ TOÁN BÁO GIÁ THANG MÁY.*?<!-- ==================== CÁC DÒNG THANG MÁY TIÊU BIỂU',
    new_section_du_toan + '\n\n  <!-- ==================== CÁC DÒNG THANG MÁY TIÊU BIỂU',
    content,
    flags=re.DOTALL
)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html upgraded with AutoCAD Engine section successfully.")
