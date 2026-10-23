# -*- coding: utf-8 -*-
import os

OUTPUT_DIR = r"D:\sieuthithangmaytoanquoc"

html_cad_tool = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kỹ Sư Auto-CAD & Dự Toán Giá Thang Máy Trực Tuyến - Siêu Thị Thang Máy Toàn Quốc</title>
  <meta name="description" content="Công cụ tự động vẽ bản vẽ kỹ thuật AutoCAD giếng thang máy (mặt bằng & mặt cắt đứng) và tính toán dự toán bóc tách giá thời gian thực theo thông số hố PIT, OH, số tầng và kích thước lọt lòng của gia chủ.">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gold: {
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309',
            },
            navy: {
              800: '#0f2766',
              900: '#0a1945',
              950: '#050c26',
            },
            cad: {
              bg: '#080d1e',
              grid: '#141f3d',
              cyan: '#00e5ff',
              green: '#00e676',
              yellow: '#ffd600',
              pink: '#ff4081',
              orange: '#ff9100'
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #1e293b;
    }
    .cad-canvas-container {
      background-color: #080d1e;
      background-image: 
        linear-gradient(to right, rgba(20, 31, 61, 0.6) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(20, 31, 61, 0.6) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .gold-gradient {
      background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #b45309 100%);
    }
    @keyframes marqueeMove {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: inline-flex;
      white-space: nowrap;
      animation: marqueeMove 32s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
    /* Slider custom styling */
    input[type=range] {
      accent-color: #d97706;
    }
  </style>
</head>
<body class="antialiased flex flex-col min-h-screen">

  <!-- ==================== DRAWER 320PX ==================== -->
  <div id="drawerOverlay" onclick="toggleDrawer(false)" class="fixed inset-0 bg-black/60 z-50 hidden transition-opacity"></div>
  
  <aside id="drawerSidebar" class="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform -translate-x-full transition-transform duration-300 flex flex-col">
    <div class="bg-navy-950 text-white p-4 flex items-center justify-between border-b border-gold-600/40">
      <div class="flex items-center gap-2">
        <span class="text-xl text-gold-400">☰</span>
        <span class="font-black text-xs uppercase tracking-wider text-gold-400">CÔNG CỤ KỸ SƯ CAD</span>
      </div>
      <button onclick="toggleDrawer(false)" class="text-white text-xl font-bold w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center">✕</button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
      <div class="space-y-1.5">
        <h3 class="font-black text-navy-950 uppercase tracking-wider text-xs border-b pb-1.5">
          📐 CÔNG CỤ THIẾT KẾ
        </h3>
        <div class="space-y-1 font-semibold text-slate-700">
          <a href="thiet-ke-cad.html" class="block py-2 px-2.5 rounded bg-amber-50 text-gold-700 font-bold">📐 Kỹ sư vẽ CAD & Báo giá tự động</a>
          <a href="index.html#bang-gia-nhanh" class="block py-2 px-2.5 rounded hover:bg-slate-100">💰 Bảng tra cứu giá nhanh 4 gói</a>
          <a href="tap-chi.html" class="block py-2 px-2.5 rounded hover:bg-slate-100">📰 Tạp Chí Thang Máy (Kiến thức Kỹ sư)</a>
          <a href="san-pham.html" class="block py-2 px-2.5 rounded hover:bg-slate-100">✨ Thang kính quan sát Panoramic</a>
          <a href="chiet-khau.html" class="block py-2 px-2.5 rounded hover:bg-slate-100">💎 Hoa hồng 10% KTS & Nhà Thầu</a>
        </div>
      </div>

      <div class="p-3.5 bg-navy-950 text-white rounded-xl border border-gold-500/40 space-y-1.5 shadow-lg">
        <div class="text-gold-400 font-black text-xs uppercase">Hotline Kỹ Sư Trưởng Toàn Quốc:</div>
        <a href="tel:0914587575" class="text-lg font-black text-white hover:text-gold-400 block tracking-wide">0914.587.575</a>
        <p class="text-[11px] text-slate-300">Nhận thẩm định file bản vẽ AutoCAD (.dwg) & Revit (.rfa) miễn phí tại 34 tỉnh thành.</p>
      </div>
    </div>
  </aside>

  <!-- ==================== TOP BAR ==================== -->
  <div class="bg-navy-950 text-white text-[11px] py-1.5 px-3 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="bg-gold-500 text-navy-950 px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider whitespace-nowrap flex-shrink-0">
          CÔNG CỤ ĐỘC QUYỀN
        </span>
        <span class="text-slate-200 font-semibold truncate text-[11px] whitespace-nowrap">
          📐 Kỹ Sư Auto-CAD Ảo • Nhập Thông Số Vẽ Bản Vẽ Kỹ Thuật & Tự Động Áp Giá Thang Máy • Phục Vụ 34 Tỉnh Thành
        </span>
      </div>
      <div class="flex items-center gap-4 text-slate-300 font-semibold whitespace-nowrap flex-shrink-0">
        <a href="index.html" class="hover:text-gold-400">Trang Chủ</a>
        <span>|</span>
        <a href="tap-chi.html" class="text-yellow-300 hover:underline">📰 Tạp Chí Thang Máy</a>
        <span>|</span>
        <a href="chiet-khau.html" class="hover:text-gold-400">💰 Hoa hồng 10% KTS</a>
        <span>|</span>
        <a href="tel:0914587575" class="text-white hover:text-gold-400 font-black flex items-center gap-1">
          <span>Hotline: <strong class="text-gold-400 font-black text-xs">0914.587.575</strong></span>
        </a>
      </div>
    </div>
  </div>

  <!-- ==================== HEADER ==================== -->
  <header class="bg-navy-900 text-white sticky top-0 z-40 shadow-lg border-b border-navy-800">
    <div class="max-w-7xl mx-auto px-3 py-2.5">
      <div class="flex items-center justify-between gap-3 sm:gap-6">
        
        <button onclick="toggleDrawer(true)" class="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded-lg text-xs font-black border border-gold-500/30 text-gold-400 shadow-sm flex-shrink-0 transition">
          <span class="text-lg leading-none">☰</span>
          <span class="hidden sm:inline uppercase tracking-wider text-[11px]">DANH MỤC</span>
        </button>

        <!-- LOGO SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC -->
        <a href="index.html" class="flex items-center gap-2.5 flex-shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-navy-950 text-xl shadow flex-shrink-0">
            🛗
          </div>
          <div class="whitespace-nowrap flex-shrink-0">
            <div class="text-[10px] font-bold text-gold-400 uppercase tracking-widest leading-none">SIÊU THỊ THƯƠNG MẠI</div>
            <div class="text-base sm:text-lg font-black text-white tracking-tight uppercase leading-snug">THANG MÁY TOÀN QUỐC</div>
          </div>
        </a>

        <!-- QUICK NAV -->
        <nav class="hidden md:flex items-center gap-5 text-xs font-bold whitespace-nowrap">
          <a href="index.html" class="hover:text-gold-400 transition">Trang Chủ</a>
          <a href="thiet-ke-cad.html" class="text-gold-400 transition font-black">📐 Kỹ Sư CAD & Báo Giá</a>
          <a href="tap-chi.html" class="hover:text-gold-400 transition">📰 Tạp Chí Thang Máy</a>
          <a href="index.html#bang-gia-nhanh" class="hover:text-gold-400 transition">Bảng Giá 34 Tỉnh</a>
          <a href="chiet-khau.html" class="hover:text-gold-400 transition">Hoa Hồng 10% KTS</a>
        </nav>

        <div class="flex items-center gap-2 flex-shrink-0">
          <a href="https://zalo.me/0914587575" target="_blank" class="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow whitespace-nowrap">
            Zalo Kỹ Sư: 0914.587.575
          </a>
          <a href="tel:0914587575" class="gold-gradient hover:opacity-95 text-navy-950 font-black px-4 py-2 rounded-lg text-xs shadow flex items-center gap-1.5 whitespace-nowrap">
            <span>📞 0914.587.575</span>
          </a>
        </div>

      </div>
    </div>
  </header>

  <!-- ==================== MARQUEE TICKER 10% ==================== -->
  <div class="bg-gradient-to-r from-red-900 via-amber-700 to-red-900 text-white text-xs font-bold py-2 overflow-hidden border-b border-gold-500/40 shadow-sm flex items-center">
    <div class="bg-navy-950 text-gold-400 px-3 py-1 font-black text-[10px] uppercase tracking-wider rounded-r-lg shadow flex items-center gap-1.5 flex-shrink-0 z-20 border-r border-gold-500/50">
      <span class="animate-pulse">🔥</span> CHÍNH SÁCH ĐỐI TÁC:
    </div>
    <div class="overflow-hidden flex-1 relative">
      <div class="animate-marquee flex items-center gap-8 pl-4">
        <span>⭐ <strong>CHIẾT KHẤU HOA HỒNG 10%</strong> DÀNH CHO KIẾN TRÚC SƯ, KỸ SƯ KẾT CẤU & TỔNG THẦU XÂY DỰNG TRÊN 34 TỈNH THÀNH TOÀN QUỐC</span>
        <span class="text-gold-300">•</span>
        <span>💰 <strong>QUYẾT TOÁN HOA HỒNG NGAY</strong> KHI KÝ HỢP ĐỒNG (TỪ 15.000.000 ₫ ĐẾN 40.000.000 ₫ / CÂY THANG)</span>
        <span class="text-gold-300">•</span>
        <span>📐 <strong>MIỄN PHÍ 100%</strong> TRỌN BỘ THƯ VIỆN CAD, REVIT BIM & PHỐI CẢNH 3D HỐ THANG CHO HỒ SƠ CẤP PHÉP XÂY DỰNG</span>
        <span class="text-gold-300">•</span>
        <span>🛡️ <strong>BẢO HÀNH CHÍNH HÃNG 36 THÁNG</strong> • CỨU HỘ KHẨN CẤP 24/7 TẠI 34 TỈNH THÀNH</span>
      </div>
    </div>
  </div>

  <!-- ==================== HERO INTRO CỦA CÔNG CỤ ==================== -->
  <section class="bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 text-white py-8 px-4 border-b border-gold-500/30">
    <div class="max-w-7xl mx-auto space-y-3">
      <div class="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/50 px-3 py-1 rounded-full text-gold-300 text-xs font-bold uppercase tracking-wider">
        <span>🤖 ĐỘT PHÁ CÔNG NGHỆ THANG MÁY 2027</span>
      </div>
      <h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase">
        Hệ Thống Auto-CAD & Dự Toán Giá Thang Máy Trực Tuyến
      </h1>
      <p class="max-w-3xl text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
        Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam. Chỉ cần nhập các kích thước thực tế của nhà bạn (Rộng, Sâu, Hố PIT, Tum OH, Số tầng), hệ thống sẽ mô phỏng bản vẽ kỹ thuật Auto-CAD 2D thời gian thực và tự động bóc tách chi phí tạm tính trọn gói.
      </p>
    </div>
  </section>

  <!-- ==================== KHÔNG GIAN LÀM VIỆC KỸ SƯ CAD ==================== -->
  <main class="max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full flex-1">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- CỘT 1 (4 CỘT): FORM NHẬP THÔNG SỐ CỦA KHÁCH HÀNG / KTS -->
      <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
        
        <div class="flex items-center justify-between border-b pb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg text-gold-600 font-black">⚙️</span>
            <h2 class="font-black text-sm uppercase text-navy-950">THÔNG SỐ CÔNG TRÌNH CỦA BẠN</h2>
          </div>
          <button onclick="resetDefaultSpecs()" class="text-[11px] text-blue-600 font-bold hover:underline">
            ↺ Mặc định
          </button>
        </div>

        <!-- 1. KÍCH THƯỚC HỐ THANG LỌT LÒNG -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="font-bold text-xs text-navy-950 flex items-center gap-1">
              <span>📏 Chiều rộng lọt lòng hố (W):</span>
            </label>
            <span class="text-xs font-black text-gold-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200" id="valWidth">1400 mm</span>
          </div>
          <input type="range" id="inputWidth" min="1000" max="2200" step="50" value="1400" oninput="updateCadDrawing()" class="w-full cursor-pointer">
          <div class="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>1000mm (Mini)</span>
            <span>1400mm (Chuẩn)</span>
            <span>2200mm (Lớn)</span>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="font-bold text-xs text-navy-950 flex items-center gap-1">
              <span>📏 Chiều sâu lọt lòng hố (D):</span>
            </label>
            <span class="text-xs font-black text-gold-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200" id="valDepth">1450 mm</span>
          </div>
          <input type="range" id="inputDepth" min="1000" max="2200" step="50" value="1450" oninput="updateCadDrawing()" class="w-full cursor-pointer">
          <div class="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>1000mm (Hẹp)</span>
            <span>1450mm (Biệt thự)</span>
            <span>2200mm (Tải hàng)</span>
          </div>
        </div>

        <!-- 2. HỐ PIT VÀ CHIỀU CAO TUM OH -->
        <div class="grid grid-cols-2 gap-3 pt-1 border-t">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="font-bold text-xs text-navy-950">Chiều sâu hố PIT:</label>
            </div>
            <select id="inputPit" onchange="updateCadDrawing()" class="w-full p-2 border rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="250">250 mm (Siêu nông - Đệm PU)</option>
              <option value="350" selected>350 mm (Homelift chuẩn)</option>
              <option value="500">500 mm (Nhà phố)</option>
              <option value="1000">1000 mm (Thang tải khách)</option>
              <option value="1400">1400 mm (Tiêu chuẩn công nghiệp)</option>
            </select>
            <span class="text-[10px] text-slate-500 block" id="pitNote">✓ Không cần đào sâu móng bè</span>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="font-bold text-xs text-navy-950">Chiều cao tầng tum (OH):</label>
            </div>
            <select id="inputOh" onchange="updateCadDrawing()" class="w-full p-2 border rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="2800">2800 mm (Tum thấp MRL)</option>
              <option value="3200" selected>3200 mm (Biệt thự chuẩn)</option>
              <option value="3600">3600 mm (Tiêu chuẩn thoải mái)</option>
              <option value="4200">4200 mm (Tải khách tốc độ cao)</option>
            </select>
            <span class="text-[10px] text-slate-500 block" id="ohNote">✓ Động cơ không phòng máy</span>
          </div>
        </div>

        <!-- 3. SỐ TẦNG VÀ CHIỀU CAO TẦNG -->
        <div class="grid grid-cols-2 gap-3 pt-1 border-t">
          <div class="space-y-2">
            <label class="font-bold text-xs text-navy-950">Số tầng (Điểm dừng):</label>
            <select id="inputStops" onchange="updateCadDrawing()" class="w-full p-2 border rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="3">3 Tầng (3 Điểm dừng)</option>
              <option value="4" selected>4 Tầng (4 Điểm dừng)</option>
              <option value="5">5 Tầng (5 Điểm dừng)</option>
              <option value="6">6 Tầng (6 Điểm dừng)</option>
              <option value="7">7 Tầng (7 Điểm dừng)</option>
              <option value="8">8 Tầng (8 Điểm dừng)</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-xs text-navy-950">Cao độ tầng TB:</label>
            <select id="inputFloorH" onchange="updateCadDrawing()" class="w-full p-2 border rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="3000">3.0 mét / tầng</option>
              <option value="3300" selected>3.3 mét / tầng (Chuẩn)</option>
              <option value="3600">3.6 mét / tầng (Biệt thự)</option>
              <option value="4000">4.0 mét / tầng (Shophouse)</option>
            </select>
          </div>
        </div>

        <!-- 4. DÒNG THANG & ĐỘNG CƠ MÁY KÉO -->
        <div class="space-y-3 pt-1 border-t">
          <div class="space-y-1.5">
            <label class="font-bold text-xs text-navy-950">Chủng loại thang & Kết cấu vách:</label>
            <select id="inputType" onchange="updateCadDrawing()" class="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="thang-kinh" selected>✨ Thang Kính Panoramic Biệt Thự (Khung Thép Chấn CNC)</option>
              <option value="homelift">🏡 Thang Gia Đình Homelift Mini (Inox 304 Hoàng Gia)</option>
              <option value="khach-san">🏨 Thang Tải Khách Tòa Nhà / Khách Sạn (Hố Bê Tông)</option>
              <option value="nhap-khau">👑 Thang Máy Nhập Khẩu Nguyên Chiếc Châu Âu</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-xs text-navy-950">Hãng động cơ máy kéo:</label>
            <select id="inputMotor" onchange="updateCadDrawing()" class="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="fuji" selected>Fuji Không Hộp Số (Công nghệ Nhật Bản - Siêu êm & Tiết kiệm)</option>
              <option value="montanari">Montanari Không Hộp Số (Made in Italy - Sang trọng Biệt thự)</option>
              <option value="ziehl">Ziehl-Abegg Nam Châm Vĩnh Cửu (Made in Germany - Cao cấp đỉnh cao)</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-xs text-navy-950">Kiểu mở cửa cabin & cửa tầng:</label>
            <select id="inputDoor" onchange="updateCadDrawing()" class="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:border-gold-500">
              <option value="CO" selected>Cửa Mở Tim 2 Cánh Tự Động (Center Opening - Chuẩn đẹp)</option>
              <option value="SO">Cửa Mở Lùa 2 Cánh Về 1 Phía (Side Opening - Tối ưu hố hẹp)</option>
              <option value="SW">Cửa Mở Tay Bán Tự Động (Swing Door - Cho Homelift siêu nhỏ)</option>
            </select>
          </div>
        </div>

        <!-- TÍNH TOÁN KỸ THUẬT NHANH TỰ ĐỘNG -->
        <div class="p-3.5 bg-slate-100 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200 font-mono">
          <div class="flex justify-between">
            <span>Cabin lọt lòng (CW x CD):</span>
            <strong id="calcCabinSize" class="text-navy-950 font-bold">1000 x 1150 mm</strong>
          </div>
          <div class="flex justify-between">
            <span>Cửa thông thủy (OP):</span>
            <strong id="calcDoorSize" class="text-navy-950 font-bold">700 x 2100 mm</strong>
          </div>
          <div class="flex justify-between">
            <span>Tải trọng thiết kế:</span>
            <strong id="calcCapacity" class="text-green-700 font-bold">350 kg (4 - 5 người)</strong>
          </div>
          <div class="flex justify-between">
            <span>Tổng chiều cao hành trình:</span>
            <strong id="calcTravel" class="text-blue-700 font-bold">13.20 mét</strong>
          </div>
        </div>

      </div>

      <!-- CỘT 2 (7 CỘT): MÀN HÌNH AUTOCAD BẢN VẼ 2D THỜI GIAN THỰC & BẢNG BÓC TÁCH GIÁ -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- KHUNG BẢN VẼ AUTOCAD CHUYÊN NGHIỆP -->
        <div class="bg-navy-950 rounded-2xl border-2 border-gold-500 shadow-2xl overflow-hidden flex flex-col">
          
          <!-- Thanh công cụ AutoCAD Toolbar -->
          <div class="bg-navy-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              <span class="font-mono text-gold-400 font-black ml-2 uppercase text-[11px] tracking-wider">
                AUTOCAD ELEVATOR ENGINE v2027
              </span>
            </div>

            <!-- Tab chuyển đổi Mặt bằng / Mặt cắt đứng -->
            <div class="flex items-center gap-1 bg-navy-950 p-1 rounded-lg border border-slate-700">
              <button id="tabPlanBtn" onclick="switchCadView('plan')" class="px-3 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition">
                📐 Mặt Bằng Hố (Plan)
              </button>
              <button id="tabSectionBtn" onclick="switchCadView('section')" class="px-3 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition">
                📏 Mặt Cắt Đứng (Section)
              </button>
            </div>
          </div>

          <!-- Màn hình Canvas CAD đen huyền thoại -->
          <div class="relative cad-canvas-container p-4 flex items-center justify-center min-h-[440px] overflow-hidden select-none">
            
            <!-- Chú giải Layers CAD (Góc trên trái) -->
            <div class="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 z-10 hidden sm:block">
              <div class="text-slate-400 font-bold mb-1">LAYERS KỸ THUẬT:</div>
              <div class="flex items-center gap-1.5 text-cyan-400">
                <span class="w-2.5 h-0.5 bg-cyan-400 inline-block"></span> Kích thước (Dim)
              </div>
              <div class="flex items-center gap-1.5 text-white">
                <span class="w-2.5 h-0.5 bg-white inline-block"></span> Khung hố (Shaft)
              </div>
              <div class="flex items-center gap-1.5 text-emerald-400">
                <span class="w-2.5 h-0.5 bg-emerald-400 inline-block"></span> Cabin (Car)
              </div>
              <div class="flex items-center gap-1.5 text-yellow-400">
                <span class="w-2.5 h-0.5 bg-yellow-400 inline-block"></span> Đối trọng (Cwt)
              </div>
              <div class="flex items-center gap-1.5 text-pink-400">
                <span class="w-2.5 h-0.5 bg-pink-400 inline-block"></span> Cửa tầng (Door)
              </div>
            </div>

            <!-- VIEW 1: MẶT BẰNG CẮT NGANG GIẾNG THANG (SVG PLAN) -->
            <div id="cadPlanView" class="w-full flex items-center justify-center">
              <svg id="svgPlan" viewBox="0 0 540 440" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>

            <!-- VIEW 2: MẶT CẮT ĐỨNG GIẾNG THANG (SVG SECTION) -->
            <div id="cadSectionView" class="w-full items-center justify-center hidden">
              <svg id="svgSection" viewBox="0 0 540 500" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>

            <!-- Khung tên bản vẽ chuẩn AutoCAD (Góc dưới phải) -->
            <div class="absolute bottom-3 right-3 bg-navy-950/90 backdrop-blur-md p-2.5 rounded-lg border border-gold-500/50 text-[10px] font-mono text-right text-slate-300 z-10">
              <div class="text-gold-400 font-bold uppercase">SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC</div>
              <div>Bản vẽ: <span id="drawingTitleTag" class="text-white font-bold">MẶT BẰNG THIẾT KẾ GIẾNG THANG</span></div>
              <div>Tỷ lệ: 1:25 • Đơn vị: mm • Tiêu chuẩn: QCVN 02:2019</div>
              <div class="text-green-400 font-bold">Kỹ Sư Trưởng: 0914.587.575 (Zalo 24/7)</div>
            </div>

          </div>

          <!-- Nút bấm tương tác bản vẽ -->
          <div class="bg-navy-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            <div class="text-xs text-slate-300 flex items-center gap-2">
              <span class="text-green-400 font-bold">✓</span>
              <span>Bản vẽ được tính toán tự động theo đúng kích thước thực tế bạn vừa nhập.</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="downloadCadSvg()" class="bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5">
                <span>📥</span> Tải Bản Vẽ (SVG/Ảnh)
              </button>
              <button onclick="sendToZaloEngineer()" class="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow">
                <span>💬</span> Gửi Zalo Kỹ Sư Trưởng
              </button>
            </div>
          </div>

        </div>

        <!-- ==================== BẢNG BÓC TÁCH DỰ TOÁN BÁO GIÁ THỜI GIAN THỰC ==================== -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div>
              <span class="bg-gold-500 text-navy-950 font-black text-[10px] px-2.5 py-0.5 rounded uppercase">
                BÁO GIÁ BÓC TÁCH TỰ ĐỘNG THEO BẢN VẼ
              </span>
              <h3 class="text-lg font-black text-navy-950 uppercase mt-1">
                DỰ TOÁN CHI PHÍ TRỌN GÓI CÔNG TRÌNH
              </h3>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-[11px] text-slate-400 uppercase font-bold">MỨC GIÁ TẠM TÍNH:</span>
              <div id="priceEstimateBig" class="text-2xl sm:text-3xl font-black text-gold-600">
                335.000.000 ₫ - 375.000.000 ₫
              </div>
            </div>
          </div>

          <!-- Bảng 4 Hạng mục chi phí bóc tách chi tiết -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead class="bg-navy-950 text-white font-bold">
                <tr>
                  <th class="p-3">Hạng Mục Kỹ Thuật (Bóc tách chi tiết)</th>
                  <th class="p-3">Quy Cách & Tiêu Chuẩn</th>
                  <th class="p-3 text-right">Tạm Tính (VNĐ)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700 bg-white">
                <tr class="hover:bg-amber-50/50">
                  <td class="p-3 font-bold text-navy-950">
                    1. Động cơ máy kéo & Tủ điện điều khiển
                  </td>
                  <td class="p-3" id="boqMotorDesc">
                    Máy kéo Fuji PMSM không hộp số (Made in Japan/Korea) + Biến tần Yaskawa VVVF
                  </td>
                  <td class="p-3 text-right font-bold text-slate-900" id="boqMotorPrice">
                    145.000.000 ₫
                  </td>
                </tr>
                <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                  <td class="p-3 font-bold text-navy-950">
                    2. Cabin cơ khí, Cửa tầng & An toàn ARD
                  </td>
                  <td class="p-3" id="boqCabinDesc">
                    Vách kính quan sát 10.38mm chống UV hoặc Inox gương hoa văn CNC + Cứu hộ ARD
                  </td>
                  <td class="p-3 text-right font-bold text-slate-900" id="boqCabinPrice">
                    95.000.000 ₫
                  </td>
                </tr>
                <tr class="hover:bg-amber-50/50">
                  <td class="p-3 font-bold text-navy-950">
                    3. Kết cấu giếng thang & Hệ thống ray cáp
                  </td>
                  <td class="p-3" id="boqShaftDesc">
                    Khung thép chấn định hình sơn tĩnh điện hoặc ray phay dẫn hướng T75/B theo số tầng
                  </td>
                  <td class="p-3 text-right font-bold text-slate-900" id="boqShaftPrice">
                    65.000.000 ₫
                  </td>
                </tr>
                <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                  <td class="p-3 font-bold text-navy-950">
                    4. Lắp đặt, kiểm định an toàn QCVN & Bảo hành
                  </td>
                  <td class="p-3">
                    Đội thợ kỹ sư lắp đặt tại 34 tỉnh thành + Cấp tem kiểm định nhà nước 3 năm + Bảo hành 36 tháng
                  </td>
                  <td class="p-3 text-right font-bold text-slate-900" id="boqInstallPrice">
                    40.000.000 ₫
                  </td>
                </tr>
                <tr class="bg-amber-50 font-black text-navy-950 text-xs">
                  <td class="p-3 text-sm uppercase">TỔNG DỰ TOÁN TRỌN GÓI</td>
                  <td class="p-3 text-slate-600 font-semibold" id="boqSummaryNote">
                    Bao gồm trọn gói thiết bị, kiểm định và lắp đặt tận nơi
                  </td>
                  <td class="p-3 text-right text-base text-gold-700" id="boqTotalPrice">
                    345.000.000 ₫
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Dòng hoa hồng 10% nếu là KTS -->
          <div class="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-red-950 font-bold">
              <span class="text-base">💎</span>
              <span>Dành cho Kiến Trúc Sư & Nhà Thầu: <strong>Hoa hồng chiết khấu 10%</strong></span>
            </div>
            <span class="font-black text-red-700 text-sm" id="boqCommissionText">
              ~ 34.500.000 ₫
            </span>
          </div>

          <!-- Nút hành động trực tiếp -->
          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="dat-hang.html" class="flex-1 bg-gradient-to-r from-accent-red to-orange-600 hover:opacity-95 text-white font-black py-3.5 px-4 rounded-xl text-xs uppercase text-center shadow transition whitespace-nowrap">
              📐 ĐẶT LỊCH KỸ SƯ KHẢO SÁT HỐ THANG MIỄN PHÍ
            </a>
            <button onclick="saveCurrentEstimate()" class="bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 font-bold py-3.5 px-5 rounded-xl text-xs text-center transition border border-gold-500 shadow whitespace-nowrap">
              📋 Lưu Bảng Dự Toán Này
            </button>
          </div>

        </div>

      </div>

    </div>

  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="bg-navy-950 text-slate-400 text-xs py-10 border-t border-slate-800 mt-10">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl text-gold-400">🛗</span>
          <span class="text-white font-black text-sm uppercase">Siêu thị Thang máy Toàn Quốc</span>
        </div>
        <p class="text-[11px] leading-relaxed text-slate-400">
          Hệ thống sàn thương mại điện tử chuyên ngành thang máy số 1 Việt Nam. Tích hợp công cụ vẽ CAD và dự toán tự động phục vụ chủ nhà và kiến trúc sư trên 34 tỉnh thành.
        </p>
        <div class="pt-1">
          <span class="text-white font-bold">Hotline Kỹ Sư Trưởng Toàn Quốc: </span>
          <a href="tel:0914587575" class="text-gold-400 font-black text-sm">0914.587.575</a>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Công Cụ Kỹ Thuật</h4>
        <ul class="space-y-1.5 text-slate-300">
          <li><a href="thiet-ke-cad.html" class="text-gold-400 font-bold hover:underline">Vẽ bản vẽ kỹ thuật CAD tự động</a></li>
          <li><a href="index.html#bang-gia-nhanh" class="hover:text-gold-400">Bảng tra cứu giá nhanh khách hàng</a></li>
          <li><a href="tap-chi.html" class="hover:text-gold-400">Tạp chí kiến thức an toàn QCVN</a></li>
          <li><a href="chiet-khau.html" class="hover:text-gold-400">Chính sách hoa hồng 10% KTS</a></li>
        </ul>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Chuyên Đề Tạp Chí</h4>
        <ul class="space-y-1.5 text-slate-300">
          <li><a href="bai-viet.html?id=1" class="hover:text-gold-400">Xử lý hố PIT siêu nông từ 250mm</a></li>
          <li><a href="bai-viet.html?id=2" class="hover:text-gold-400">So sánh động cơ Fuji vs Montanari</a></li>
          <li><a href="bai-viet.html?id=3" class="hover:text-gold-400">5 cấp độ cứu hộ tự động ARD</a></li>
          <li><a href="bai-viet.html?id=4" class="hover:text-gold-400">Cảnh báo cắt giảm linh kiện giá rẻ</a></li>
        </ul>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Phục Vụ 34 Tỉnh Thành</h4>
        <p class="text-[11px] leading-relaxed text-slate-400">
          Đội ngũ kỹ sư thường trực khảo sát, thẩm định bản vẽ và lắp ráp tại <strong>34 tỉnh thành</strong> trên toàn quốc: Hà Nội, TP.HCM, Hải Phòng, Đà Nẵng, Cần Thơ, Nghệ An, Hà Tĩnh, Thanh Hóa, Quảng Ninh, Bình Dương, Đồng Nai...
        </p>
        <div class="pt-2">
          <a href="tel:0914587575" class="inline-flex items-center gap-1.5 bg-gold-500 text-navy-950 font-black px-3 py-1.5 rounded-lg text-xs">
            <span>📞 0914.587.575 (Zalo 24/7)</span>
          </a>
        </div>
      </div>

    </div>

    <div class="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-slate-800 text-center text-slate-500 text-[11px]">
      © 2026 - 2027 Siêu Thị Thương Mại Thang Máy Toàn Quốc. Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam.
    </div>
  </footer>

  <!-- ==================== JAVASCRIPT AUTOCAD ENGINE ==================== -->
  <script>
    let currentCadView = 'plan'; // 'plan' or 'section'

    function toggleDrawer(open) {
      const drawer = document.getElementById('drawerSidebar');
      const overlay = document.getElementById('drawerOverlay');
      if (open) {
        drawer.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
      } else {
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
      }
    }

    function switchCadView(view) {
      currentCadView = view;
      const planView = document.getElementById('cadPlanView');
      const sectionView = document.getElementById('cadSectionView');
      const tabPlanBtn = document.getElementById('tabPlanBtn');
      const tabSectionBtn = document.getElementById('tabSectionBtn');
      const titleTag = document.getElementById('drawingTitleTag');

      if (view === 'plan') {
        planView.classList.remove('hidden');
        sectionView.classList.add('hidden');
        tabPlanBtn.className = "px-3 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition";
        tabSectionBtn.className = "px-3 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition";
        titleTag.innerText = "MẶT BẰNG THIẾT KẾ GIẾNG THANG (CROSS-SECTION)";
      } else {
        planView.classList.add('hidden');
        sectionView.classList.remove('hidden');
        tabSectionBtn.className = "px-3 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition";
        tabPlanBtn.className = "px-3 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition";
        titleTag.innerText = "MẶT CẮT ĐỨNG CAO ĐỘ GIẾNG THANG (VERTICAL SECTION)";
      }
      updateCadDrawing();
    }

    function resetDefaultSpecs() {
      document.getElementById('inputWidth').value = 1400;
      document.getElementById('inputDepth').value = 1450;
      document.getElementById('inputPit').value = 350;
      document.getElementById('inputOh').value = 3200;
      document.getElementById('inputStops').value = 4;
      document.getElementById('inputFloorH').value = 3300;
      document.getElementById('inputType').value = 'thang-kinh';
      document.getElementById('inputMotor').value = 'fuji';
      document.getElementById('inputDoor').value = 'CO';
      updateCadDrawing();
    }

    function updateCadDrawing() {
      const W = parseInt(document.getElementById('inputWidth').value, 10);
      const D = parseInt(document.getElementById('inputDepth').value, 10);
      const Pit = parseInt(document.getElementById('inputPit').value, 10);
      const Oh = parseInt(document.getElementById('inputOh').value, 10);
      const Stops = parseInt(document.getElementById('inputStops').value, 10);
      const FloorH = parseInt(document.getElementById('inputFloorH').value, 10);
      const Type = document.getElementById('inputType').value;
      const Motor = document.getElementById('inputMotor').value;
      const Door = document.getElementById('inputDoor').value;

      // Update labels
      document.getElementById('valWidth').innerText = W + ' mm';
      document.getElementById('valDepth').innerText = D + ' mm';

      // 1. CALCULATE DERIVED VALUES (ENGINEERING FORMULAS)
      // Cabin sizes
      let CW = Math.max(750, W - 380); // Width lọt lòng cabin
      let CD = Math.max(750, D - 320); // Depth lọt lòng cabin
      let DoorWidth = Math.min(800, Math.max(600, CW - 150));
      if (Door === 'SO') {
        DoorWidth = Math.min(900, Math.max(650, CW - 100));
      } else if (Door === 'SW') {
        DoorWidth = Math.max(650, CW - 80);
      }

      // Rated capacity in kg (EN 81-20 formula based on area)
      const area = (CW * CD) / 1000000; // m2
      let capKg = 300;
      let people = "2 - 3 người";
      if (area >= 1.4) {
        capKg = 630;
        people = "8 - 9 người";
      } else if (area >= 1.1) {
        capKg = 450;
        people = "6 người";
      } else if (area >= 0.85) {
        capKg = 350;
        people = "4 - 5 người";
      }

      // Total travel height
      const travelM = ((Stops - 1) * FloorH) / 1000;

      // Update Quick spec display
      document.getElementById('calcCabinSize').innerText = `${CW} x ${CD} mm`;
      document.getElementById('calcDoorSize').innerText = `${DoorWidth} x 2100 mm`;
      document.getElementById('calcCapacity').innerText = `${capKg} kg (${people})`;
      document.getElementById('calcTravel').innerText = `${travelM.toFixed(2)} mét (${Stops} tầng)`;

      // Notes
      if (Pit <= 300) {
        document.getElementById('pitNote').innerHTML = '<span class="text-green-600 font-bold">✓ Hố PIT siêu nông: Đệm PU đàn hồi</span>';
      } else {
        document.getElementById('pitNote').innerHTML = '<span>✓ Giảm chấn tiêu chuẩn EN 81</span>';
      }
      if (Oh <= 3000) {
        document.getElementById('ohNote').innerHTML = '<span class="text-blue-600 font-bold">✓ Tum thấp: Động cơ MRL tỉ lệ 2:1</span>';
      } else {
        document.getElementById('ohNote').innerHTML = '<span>✓ Chiều cao tum lý tưởng</span>';
      }

      // 2. RENDER CAD DRAWINGS
      renderCadPlanSvg(W, D, CW, CD, DoorWidth, Type, Door);
      renderCadSectionSvg(Pit, Oh, Stops, FloorH, travelM);

      // 3. CALCULATE BOQ PRICING (ÁP GIÁ BẢN VẼ)
      calculateBoq(W, D, Pit, Oh, Stops, Type, Motor, capKg);
    }

    // DRAW HORIZONTAL CROSS-SECTION (PLAN)
    function renderCadPlanSvg(W, D, CW, CD, DoorWidth, Type, Door) {
      const svg = document.getElementById('svgPlan');
      
      // Scaling into SVG coordinate box 540 x 440
      // Origin center: (270, 210)
      const scale = Math.min(260 / W, 240 / D);
      const sW = W * scale;
      const sD = D * scale;
      const sCW = CW * scale;
      const sCD = CD * scale;
      const sDoorW = DoorWidth * scale;

      const cx = 270;
      const cy = 200;

      const x0 = cx - sW / 2;
      const y0 = cy - sD / 2;
      const x1 = cx + sW / 2;
      const y1 = cy + sD / 2;

      // Cabin box
      const cx0 = cx - sCW / 2;
      const cy0 = (cy - sCD / 2) - 8;
      const cx1 = cx + sCW / 2;
      const cy1 = (cy + sCD / 2) - 8;

      // Counterweight (placed at rear or side)
      let cwtSvg = '';
      if (W >= D) {
        // Cwt at rear
        const cwtW = sCW * 0.75;
        const cwtH = 16;
        const cwtX = cx - cwtW / 2;
        const cwtY = y0 + 10;
        cwtSvg = `
          <!-- Counterweight Rear -->
          <rect x="${cwtX}" y="${cwtY}" width="${cwtW}" height="${cwtH}" fill="#ffd600" fill-opacity="0.25" stroke="#ffd600" stroke-width="2" />
          <line x1="${cwtX}" y1="${cwtY + cwtH/2}" x2="${cwtX + cwtW}" y2="${cwtY + cwtH/2}" stroke="#ffd600" stroke-dasharray="3,3" />
          <text x="${cx}" y="${cwtY + 11}" fill="#ffd600" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">ĐỐI TRỌNG (CWT)</text>
          <!-- Cwt rails -->
          <circle cx="${cwtX}" cy="${cwtY + cwtH/2}" r="3" fill="#00e5ff" />
          <circle cx="${cwtX + cwtW}" cy="${cwtY + cwtH/2}" r="3" fill="#00e5ff" />
        `;
      } else {
        // Cwt at side
        const cwtW = 16;
        const cwtH = sCD * 0.65;
        const cwtX = x0 + 10;
        const cwtY = cy - cwtH / 2;
        cwtSvg = `
          <!-- Counterweight Side -->
          <rect x="${cwtX}" y="${cwtY}" width="${cwtW}" height="${cwtH}" fill="#ffd600" fill-opacity="0.25" stroke="#ffd600" stroke-width="2" />
          <text x="${cwtX + 11}" y="${cy}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${cwtX+11} ${cy})" font-weight="bold">ĐỐI TRỌNG HÔNG</text>
          <circle cx="${cwtX + cwtW/2}" cy="${cwtY}" r="3" fill="#00e5ff" />
          <circle cx="${cwtX + cwtW/2}" cy="${cwtY + cwtH}" r="3" fill="#00e5ff" />
        `;
      }

      // Wall color and stroke
      const wallColor = (Type === 'thang-kinh') ? '#00e5ff' : '#ffffff';
      const wallFill = (Type === 'thang-kinh') ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255, 255, 255, 0.06)';
      const wallDash = (Type === 'thang-kinh') ? 'none' : 'none';

      // Dimension offsets
      const dimTopY = y0 - 32;
      const dimLeftX = x0 - 32;
      const dimBottomY = y1 + 32;
      const dimRightX = x1 + 32;

      svg.innerHTML = `
        <defs>
          <marker id="cadArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L2,3 Z" fill="#00e5ff" />
          </marker>
          <marker id="cadTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>

        <!-- 1. HỐ THANG BÊN NGOÀI (SHAFT OUTLINE) -->
        <rect x="${x0}" y="${y0}" width="${sW}" height="${sD}" fill="${wallFill}" stroke="${wallColor}" stroke-width="3" stroke-dasharray="${wallDash}" />

        <!-- 4 Cột góc chịu lực -->
        <rect x="${x0-6}" y="${y0-6}" width="12" height="12" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
        <rect x="${x1-6}" y="${y0-6}" width="12" height="12" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
        <rect x="${x0-6}" y="${y1-6}" width="12" height="12" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
        <rect x="${x1-6}" y="${y1-6}" width="12" height="12" fill="#ef4444" stroke="#ffffff" stroke-width="1" />

        <!-- Trục tim tâm giếng (Centerlines) -->
        <line x1="${cx}" y1="${y0 - 15}" x2="${cx}" y2="${y1 + 15}" stroke="#ef4444" stroke-dasharray="6,3,1,3" stroke-width="1" opacity="0.6" />
        <line x1="${x0 - 15}" y1="${cy}" x2="${x1 + 15}" y2="${cy}" stroke="#ef4444" stroke-dasharray="6,3,1,3" stroke-width="1" opacity="0.6" />

        <!-- 2. ĐỐI TRỌNG -->
        ${cwtSvg}

        <!-- 3. RAY DẪN HƯỚNG CABIN (T-RAILS) -->
        <!-- Ray Trái -->
        <path d="M ${x0+12} ${cy-8} L ${x0+24} ${cy-8} L ${x0+24} ${cy-4} L ${x0+18} ${cy-4} L ${x0+18} ${cy+4} L ${x0+24} ${cy+4} L ${x0+24} ${cy+8} L ${x0+12} ${cy+8} Z" fill="#00e5ff" stroke="#ffffff" stroke-width="1" />
        <!-- Ray Phải -->
        <path d="M ${x1-12} ${cy-8} L ${x1-24} ${cy-8} L ${x1-24} ${cy-4} L ${x1-18} ${cy-4} L ${x1-18} ${cy+4} L ${x1-24} ${cy+4} L ${x1-24} ${cy+8} L ${x1-12} ${cy+8} Z" fill="#00e5ff" stroke="#ffffff" stroke-width="1" />

        <!-- 4. KHUNG SÀN CABIN & VÁCH CABIN -->
        <rect x="${cx0}" y="${cy0}" width="${sCW}" height="${sCD}" fill="#0d241d" stroke="#00e676" stroke-width="2.5" />
        <line x1="${cx0}" y1="${cy0}" x2="${cx1}" y2="${cy1}" stroke="#00e676" stroke-width="0.5" stroke-opacity="0.3" />
        <line x1="${cx1}" y1="${cy0}" x2="${cx0}" y2="${cy1}" stroke="#00e676" stroke-width="0.5" stroke-opacity="0.3" />
        <text x="${cx}" y="${cy - 4}" fill="#00e676" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">CABIN (${CW}x${CD})</text>

        <!-- 5. HỆ CỬA MỞ CABIN & CỬA TẦNG (FRONT DOOR) -->
        <g>
          <!-- Cửa tầng -->
          <line x1="${cx - sDoorW/2}" y1="${y1}" x2="${cx + sDoorW/2}" y2="${y1}" stroke="#ff4081" stroke-width="5" />
          <!-- Cửa cabin -->
          <line x1="${cx - sDoorW/2}" y1="${cy1}" x2="${cx + sDoorW/2}" y2="${cy1}" stroke="#ff4081" stroke-width="4" stroke-dasharray="4,2" />
          <!-- Mũi tên hướng mở cửa -->
          <path d="M ${cx - sDoorW/4} ${y1 + 10} L ${cx - sDoorW/2 + 5} ${y1 + 10}" stroke="#ff4081" stroke-width="1.5" marker-end="url(#cadArrow)" />
          <path d="M ${cx + sDoorW/4} ${y1 + 10} L ${cx + sDoorW/2 - 5} ${y1 + 10}" stroke="#ff4081" stroke-width="1.5" marker-end="url(#cadArrow)" />
          <text x="${cx}" y="${y1 + 22}" fill="#ff4081" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">CỬA THÔNG THỦY OP=${DoorWidth}</text>
        </g>

        <!-- ==================== CÁC ĐƯỜNG DIMENSION KÍCH THƯỚC CHUẨN CAD ==================== -->
        <!-- Dim 1: Chiều rộng hố W (Top) -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${dimTopY - 6}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x1}" y1="${y0}" x2="${x1}" y2="${dimTopY - 6}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x0}" y1="${dimTopY}" x2="${x1}" y2="${dimTopY}" marker-start="url(#cadTick)" marker-end="url(#cadTick)" />
        </g>
        <text x="${cx}" y="${dimTopY - 6}" fill="#00e5ff" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">W = ${W} mm</text>

        <!-- Dim 2: Chiều sâu hố D (Left) -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${x0}" y1="${y0}" x2="${dimLeftX - 6}" y2="${y0}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x0}" y1="${y1}" x2="${dimLeftX - 6}" y2="${y1}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${dimLeftX}" y1="${y0}" x2="${dimLeftX}" y2="${y1}" marker-start="url(#cadTick)" marker-end="url(#cadTick)" />
        </g>
        <text x="${dimLeftX - 8}" y="${cy}" fill="#00e5ff" font-size="11" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${dimLeftX-8} ${cy})" font-weight="bold">D = ${D} mm</text>

        <!-- Dim 3: Chiều sâu cabin CD (Right) -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${cx1}" y1="${cy0}" x2="${dimRightX - 6}" y2="${cy0}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx1}" y1="${cy1}" x2="${dimRightX - 6}" y2="${cy1}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${dimRightX - 10}" y1="${cy0}" x2="${dimRightX - 10}" y2="${cy1}" marker-start="url(#cadTick)" marker-end="url(#cadTick)" />
        </g>
        <text x="${dimRightX - 2}" y="${cy - 4}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" transform="rotate(90 ${dimRightX-2} ${cy-4})" font-weight="bold">CD = ${CD} mm</text>

        <!-- Dim 4: Chiều rộng cabin CW (Bottom inside) -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${cx0}" y1="${cy1}" x2="${cx0}" y2="${cy1 + 18}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx1}" y1="${cy1}" x2="${cx1}" y2="${cy1 + 18}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx0}" y1="${cy1 + 14}" x2="${cx1}" y2="${cy1 + 14}" marker-start="url(#cadTick)" marker-end="url(#cadTick)" />
        </g>
        <text x="${cx}" y="${cy1 + 25}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">CW = ${CW} mm</text>
      `;
    }

    // DRAW VERTICAL ELEVATION PROFILE (SECTION)
    function renderCadSectionSvg(Pit, Oh, Stops, FloorH, travelM) {
      const svg = document.getElementById('svgSection');
      
      const shaftH = Pit + (FloorH * (Stops - 1)) + Oh;
      const scaleY = 380 / shaftH;
      const scaleX = 140 / 1600; // standard width

      const cx = 270;
      const topY = 50;
      const botY = topY + shaftH * scaleY;

      const pitHeightPx = Pit * scaleY;
      const ohHeightPx = Oh * scaleY;
      const floorDistPx = FloorH * scaleY;

      // Calculate floor levels Y
      const groundFloorY = botY - pitHeightPx;
      const topFloorY = topY + ohHeightPx;

      let floorsSvg = '';
      for (let i = 0; i < Stops; i++) {
        const fy = groundFloorY - i * floorDistPx;
        const elev = (i * FloorH / 1000).toFixed(3);
        const sign = (i === 0) ? '±0.000' : `+${elev}`;
        floorsSvg += `
          <!-- Tầng ${i + 1} -->
          <line x1="${cx - 120}" y1="${fy}" x2="${cx - 70}" y2="${fy}" stroke="#ffffff" stroke-width="3" />
          <!-- Ký hiệu cao độ trắc địa tam giác -->
          <path d="M ${cx - 135} ${fy} L ${cx - 125} ${fy - 6} L ${cx - 125} ${fy + 6} Z" fill="#00e5ff" />
          <text x="${cx - 140}" y="${fy + 4}" fill="#00e5ff" font-size="10" font-family="monospace" text-anchor="end" font-weight="bold">TẦNG ${i+1} [${sign}]</text>
        `;
      }

      svg.innerHTML = `
        <defs>
          <marker id="secTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>

        <!-- KHUNG THÀNH GIẾNG THANG (SHAFT VERTICAL WALLS) -->
        <rect x="${cx - 70}" y="${topY}" width="140" height="${shaftH * scaleY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="3" />

        <!-- ĐÁY HỐ PIT [-Pit] -->
        <rect x="${cx - 70}" y="${botY - 6}" width="140" height="6" fill="#ef4444" />
        <!-- Đệm giảm chấn cao su PU đáy PIT -->
        <rect x="${cx - 40}" y="${botY - 20}" width="25" height="14" fill="#ffd600" stroke="#ffffff" stroke-width="1" />
        <rect x="${cx + 15}" y="${botY - 20}" width="25" height="14" fill="#ffd600" stroke="#ffffff" stroke-width="1" />
        <text x="${cx}" y="${botY - 25}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle">ĐỆM PU (H=180)</text>

        <!-- CÁC TẦNG DỪNG VÀ CAO ĐỘ -->
        ${floorsSvg}

        <!-- CABIN VỊ TRÍ TẦNG 2 -->
        <g>
          <rect x="${cx - 50}" y="${groundFloorY - floorDistPx - 75}" width="100" height="75" fill="#0d241d" stroke="#00e676" stroke-width="2" />
          <text x="${cx}" y="${groundFloorY - floorDistPx - 35}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">CABIN</text>
        </g>

        <!-- ĐỘNG CƠ MÁY KÉO KHÔNG PHÒNG MÁY TRÊN ĐỈNH OH -->
        <g>
          <rect x="${cx - 45}" y="${topY + 10}" width="90" height="24" fill="#0f172a" stroke="#ffd600" stroke-width="2" />
          <!-- Puly kéo -->
          <circle cx="${cx - 20}" cy="${topY + 22}" r="12" fill="#d97706" stroke="#ffffff" stroke-width="1.5" />
          <circle cx="${cx + 20}" cy="${topY + 22}" r="9" fill="#94a3b8" />
          <text x="${cx}" y="${topY + 5}" fill="#ffd600" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">MÁY KÉO MRL</text>
          <!-- Cáp treo 2:1 -->
          <line x1="${cx - 32}" y1="${topY + 22}" x2="${cx - 32}" y2="${groundFloorY - floorDistPx - 75}" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
          <line x1="${cx + 29}" y1="${topY + 22}" x2="${cx + 29}" y2="${botY - 100}" stroke="#ffd600" stroke-width="1.5" stroke-dasharray="2,2" />
        </g>

        <!-- DIMENSIONS CỘT BÊN PHẢI -->
        <!-- Dim OH -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${cx + 70}" y1="${topY}" x2="${cx + 100}" y2="${topY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 70}" y1="${topFloorY}" x2="${cx + 100}" y2="${topFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 95}" y1="${topY}" x2="${cx + 95}" y2="${topFloorY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 105}" y="${topY + ohHeightPx/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">OH = ${Oh} mm</text>
        </g>

        <!-- Dim PIT -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${cx + 70}" y1="${groundFloorY}" x2="${cx + 100}" y2="${groundFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 70}" y1="${botY}" x2="${cx + 100}" y2="${botY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 95}" y1="${groundFloorY}" x2="${cx + 95}" y2="${botY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 105}" y="${groundFloorY + pitHeightPx/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">PIT = ${Pit} mm</text>
        </g>

        <!-- Dim Travel H -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${cx + 95}" y1="${topFloorY}" x2="${cx + 140}" y2="${topFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 95}" y1="${groundFloorY}" x2="${cx + 140}" y2="${groundFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 135}" y1="${topFloorY}" x2="${cx + 135}" y2="${groundFloorY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 145}" y="${groundFloorY - (groundFloorY - topFloorY)/2 + 4}" fill="#00e676" font-size="11" font-family="monospace" font-weight="bold">HÀNH TRÌNH = ${travelM.toFixed(2)} m</text>
        </g>
      `;
    }

    // CALCULATE BILL OF QUANTITIES & PRICING
    function calculateBoq(W, D, Pit, Oh, Stops, Type, Motor, capKg) {
      const formatVND = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

      // 1. Motor & Electronics Price
      let motorPrice = 135000000;
      let motorDesc = "Máy kéo Fuji PMSM (Công nghệ Nhật) + Tủ vi xử lý VVVF";
      if (Motor === 'montanari') {
        motorPrice = 165000000;
        motorDesc = "Máy kéo Montanari không hộp số (Made in Italy) + Tủ điều khiển nhập khẩu Ý";
      } else if (Motor === 'ziehl') {
        motorPrice = 195000000;
        motorDesc = "Máy kéo Ziehl-Abegg nam châm vĩnh cửu (Made in Germany) + Tủ vi xử lý Đức";
      }

      // Add stops to electrical system
      motorPrice += (Stops - 3) * 8000000;

      // 2. Cabin & Door Price
      let cabinPrice = 85000000;
      let cabinDesc = "Cabin Inox 304 sọc nhuyễn + Mành hồng ngoại 128 tia + Cứu hộ tự động ARD";
      if (Type === 'thang-kinh') {
        cabinPrice = 125000000;
        cabinDesc = "Vách kính an toàn 2 lớp Laminated 10.38mm chống tia UV + Khung mạ PVD Titan";
      } else if (Type === 'nhap-khau') {
        cabinPrice = 190000000;
        cabinDesc = "Cabin nhập khẩu nguyên chiếc hoàng gia châu Âu";
      }
      if (capKg >= 450) cabinPrice += 15000000;
      if (capKg >= 630) cabinPrice += 30000000;

      // 3. Shaft & Mechanics Price
      let shaftPrice = 60000000;
      let shaftDesc = "Khung thép dập định hình CNC + Ray dẫn hướng tiện tinh T75/B";
      if (Type === 'thang-kinh') {
        shaftPrice = 85000000 + (Stops - 3) * 12000000;
        shaftDesc = `Khung thép chấn định hình 4 mặt bọc kính (${Stops} tầng) + Sơn tĩnh điện cao cấp`;
      } else {
        shaftPrice = 55000000 + (Stops - 3) * 8000000;
        shaftDesc = `Hệ ray T75/T89 và khung chịu lực giếng thang cho ${Stops} điểm dừng`;
      }

      // 4. Installation & Safety Testing
      let installPrice = 35000000 + (Stops - 3) * 5000000;

      // Totals
      const total = motorPrice + cabinPrice + shaftPrice + installPrice;
      const minPrice = total - 15000000;
      const maxPrice = total + 25000000;

      // Update BOQ UI
      document.getElementById('boqMotorDesc').innerText = motorDesc;
      document.getElementById('boqMotorPrice').innerText = formatVND(motorPrice);

      document.getElementById('boqCabinDesc').innerText = cabinDesc;
      document.getElementById('boqCabinPrice').innerText = formatVND(cabinPrice);

      document.getElementById('boqShaftDesc').innerText = shaftDesc;
      document.getElementById('boqShaftPrice').innerText = formatVND(shaftPrice);

      document.getElementById('boqInstallPrice').innerText = formatVND(installPrice);

      document.getElementById('boqTotalPrice').innerText = formatVND(total);
      document.getElementById('priceEstimateBig').innerText = `${formatVND(minPrice)} - ${formatVND(maxPrice)}`;

      // 10% commission for Architects
      const commission = Math.round(total * 0.1);
      document.getElementById('boqCommissionText').innerText = `~ ${formatVND(commission)}`;
    }

    function downloadCadSvg() {
      const activeSvg = (currentCadView === 'plan') ? document.getElementById('svgPlan') : document.getElementById('svgSection');
      const svgData = new XMLSerializer().serializeToString(activeSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `Ban-Ve-Thang-May-${currentCadView.toUpperCase()}-0914587575.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      alert('Đã tải thành công bản vẽ kỹ thuật Auto-CAD về máy của bạn!');
    }

    function sendToZaloEngineer() {
      const W = document.getElementById('inputWidth').value;
      const D = document.getElementById('inputDepth').value;
      const Pit = document.getElementById('inputPit').value;
      const Oh = document.getElementById('inputOh').value;
      const Stops = document.getElementById('inputStops').value;
      const price = document.getElementById('priceEstimateBig').innerText;

      const message = `Chào Kỹ Sư Trưởng! Tôi vừa tạo bản vẽ thang máy trên web sieuthithangmaytoanquoc.com:
- Kích thước hố: Rộng ${W}mm x Sâu ${D}mm
- Hố PIT: ${Pit}mm | Tum OH: ${Oh}mm | Số tầng: ${Stops} tầng
- Dự toán web tính: ${price}
Nhờ Kỹ Sư Trưởng kiểm tra bản vẽ kết cấu và tư vấn phương án thi công giúp tôi!`;

      const encoded = encodeURIComponent(message);
      window.open(`https://zalo.me/0914587575?text=${encoded}`, '_blank');
    }

    function saveCurrentEstimate() {
      alert('Đã lưu cấu hình bản vẽ và dự toán thang máy vào hệ thống. Bạn có thể xem lại bất cứ lúc nào!');
    }

    window.addEventListener('DOMContentLoaded', () => {
      updateCadDrawing();
    });
  </script>

</body>
</html>
"""

with open(os.path.join(OUTPUT_DIR, "thiet-ke-cad.html"), "w", encoding="utf-8") as f:
    f.write(html_cad_tool)

print("Created thiet-ke-cad.html successfully.")
