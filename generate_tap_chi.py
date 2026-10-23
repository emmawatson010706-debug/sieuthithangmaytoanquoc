# -*- coding: utf-8 -*-
import os

OUTPUT_DIR = r"D:\sieuthithangmaytoanquoc"

# Generate tap-chi.html
tap_chi_html = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tạp Chí Thang Máy Toàn Quốc - Cẩm Nang Kỹ Thuật, An Toàn & Xu Hướng 2027</title>
  <meta name="description" content="Chuyên trang tạp chí kỹ thuật thang máy hàng đầu Việt Nam: Hướng dẫn xử lý hố PIT siêu nông, so sánh động cơ Fuji, Montanari, Ziehl-Abegg, quy chuẩn an toàn QCVN 02:2019 và cảnh báo thị trường từ Kỹ Sư Trưởng.">
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
            accent: {
              red: '#dc2626',
              orange: '#ea580c'
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
    }
    .lift-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.25s ease;
    }
    .lift-card:hover {
      box-shadow: 0 14px 28px -4px rgba(15, 39, 102, 0.18);
      transform: translateY(-4px);
      border-color: #d97706;
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
  </style>
</head>
<body class="antialiased flex flex-col min-h-screen">

  <!-- ==================== MENU 3 GẠCH (GỌN GÀNG 320PX) ==================== -->
  <div id="drawerOverlay" onclick="toggleDrawer(false)" class="fixed inset-0 bg-black/60 z-50 hidden transition-opacity"></div>
  
  <aside id="drawerSidebar" class="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform -translate-x-full transition-transform duration-300 flex flex-col">
    <div class="bg-navy-950 text-white p-4 flex items-center justify-between border-b border-gold-600/40">
      <div class="flex items-center gap-2">
        <span class="text-xl text-gold-400">☰</span>
        <span class="font-black text-xs uppercase tracking-wider text-gold-400">MỤC LỤC TẠP CHÍ & BẢNG GIÁ</span>
      </div>
      <button onclick="toggleDrawer(false)" class="text-white text-xl font-bold w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center">✕</button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
      <!-- 1. CHỦNG LOẠI THANG MÁY -->
      <div class="space-y-1.5">
        <h3 class="font-black text-navy-950 uppercase tracking-wider text-xs border-b pb-1.5">
          🏗️ DANH MỤC SẢN PHẨM
        </h3>
        <div class="space-y-1 font-semibold text-slate-700">
          <a href="index.html#san-pham" class="block py-2 px-2.5 rounded hover:bg-amber-50">★ Tất cả dòng thang máy</a>
          <a href="san-pham.html" class="block py-2 px-2.5 rounded hover:bg-amber-50">✨ Thang kính quan sát Panoramic</a>
          <a href="index.html#bang-gia-nhanh" class="block py-2 px-2.5 rounded bg-amber-50 text-amber-900 font-bold">📊 Bảng tra cứu giá nhanh</a>
          <a href="chiet-khau.html" class="block py-2 px-2.5 rounded hover:bg-amber-50">💎 Hoa hồng 10% KTS & Thầu</a>
          <a href="doi-tac.html" class="block py-2 px-2.5 rounded hover:bg-amber-50">🤝 Đăng ký đưa thang lên sàn</a>
        </div>
      </div>

      <!-- 2. CHUYÊN ĐỀ TẠP CHÍ -->
      <div class="space-y-1.5">
        <h3 class="font-black text-navy-950 uppercase tracking-wider text-xs border-b pb-1.5">
          📰 CHUYÊN ĐỀ KỸ THUẬT
        </h3>
        <div class="space-y-1 font-semibold text-slate-700">
          <button onclick="filterCategory('ho-thang')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">📐 Kỹ thuật hố PIT & OH nhà cải tạo</button>
          <button onclick="filterCategory('dong-co')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">⚙️ So sánh động cơ Fuji vs Montanari vs Ziehl</button>
          <button onclick="filterCategory('an-toan')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">🛡️ Tiêu chuẩn QCVN 02:2019 & ARD cứu hộ</button>
          <button onclick="filterCategory('khuyen-cao')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">⚠️ 7 cạm bẫy cắt giảm linh kiện giá rẻ</button>
          <button onclick="filterCategory('xu-huong')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">✨ Xu hướng thang kính biệt thự</button>
          <button onclick="filterCategory('bao-gia')" class="w-full text-left py-1.5 px-2.5 rounded hover:bg-slate-100">💰 Bóc tách chi phí điện & bảo trì 10 năm</button>
        </div>
      </div>

      <!-- Hotline Kỹ Sư Trưởng Toàn Quốc -->
      <div class="p-3.5 bg-navy-950 text-white rounded-xl border border-gold-500/40 space-y-1.5 shadow-lg">
        <div class="text-gold-400 font-black text-xs uppercase">Kỹ Sư Trưởng Toàn Quốc:</div>
        <a href="tel:0914587575" class="text-lg font-black text-white hover:text-gold-400 block tracking-wide">0914.587.575</a>
        <p class="text-[11px] text-slate-300">Tư vấn thẩm định bản vẽ móng, giếng thang và kết cấu khung thép tại 34 tỉnh thành.</p>
      </div>
    </div>
  </aside>

  <!-- ==================== TOP BAR GỌN GÀNG ==================== -->
  <div class="bg-navy-950 text-white text-[11px] py-1.5 px-3 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="bg-gold-500 text-navy-950 px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider whitespace-nowrap flex-shrink-0">
          TẠP CHÍ KỸ THUẬT
        </span>
        <span class="text-slate-200 font-semibold truncate text-[11px] whitespace-nowrap">
          📖 Kho Tri Thức Ngành Thang Máy • Tuân Thủ Quy Chuẩn QCVN 02:2019/BLĐTBXH • Phục Vụ 34 Tỉnh Thành
        </span>
      </div>
      <div class="flex items-center gap-4 text-slate-300 font-semibold whitespace-nowrap flex-shrink-0">
        <a href="index.html" class="hover:text-gold-400">Trang Chủ</a>
        <span>|</span>
        <a href="chiet-khau.html" class="hover:text-gold-400">💰 Hoa hồng 10% KTS</a>
        <span>|</span>
        <a href="doi-tac.html" class="hover:text-gold-400">🤝 Đưa thang lên sàn</a>
        <span>|</span>
        <a href="tel:0914587575" class="text-white hover:text-gold-400 font-black flex items-center gap-1">
          <span>Hotline: <strong class="text-gold-400 font-black text-xs">0914.587.575</strong></span>
        </a>
      </div>
    </div>
  </div>

  <!-- ==================== MAIN HEADER SANG TRỌNG ==================== -->
  <header class="bg-navy-900 text-white sticky top-0 z-40 shadow-lg border-b border-navy-800">
    <div class="max-w-7xl mx-auto px-3 py-2.5">
      <div class="flex items-center justify-between gap-3 sm:gap-6">
        
        <!-- NÚT 3 GẠCH -->
        <button onclick="toggleDrawer(true)" class="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded-lg text-xs font-black border border-gold-500/30 text-gold-400 shadow-sm flex-shrink-0 transition">
          <span class="text-lg leading-none">☰</span>
          <span class="hidden sm:inline uppercase tracking-wider text-[11px]">CHUYÊN MỤC</span>
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

        <!-- THANH TÌM KIẾM BÀI VIẾT -->
        <div class="flex-1 max-w-xl mx-2 hidden md:block">
          <div class="relative bg-white rounded-lg p-1 shadow flex items-center">
            <input
              id="articleSearchInput"
              type="text"
              placeholder="Tìm bài viết: Hố pit nông, động cơ Fuji, cứu hộ ARD, kính cường lực, chi phí bảo trì..."
              class="w-full px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              onkeyup="searchArticles()"
            />
            <button
              onclick="searchArticles()"
              class="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 text-navy-950 px-4 py-1.5 rounded-md text-xs font-black flex items-center gap-1.5 transition flex-shrink-0 shadow"
            >
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <a href="https://zalo.me/0914587575" target="_blank" class="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow whitespace-nowrap">
            Zalo Kỹ Sư: 0914.587.575
          </a>
          <a href="index.html#bang-gia-nhanh" class="bg-gradient-to-r from-accent-red to-orange-600 text-white px-3.5 py-2 rounded-lg text-xs font-black shadow hover:opacity-95 transition whitespace-nowrap">
            ⚡ BẢNG GIÁ 34 TỈNH
          </a>
        </div>

      </div>
    </div>

    <!-- NAVBAR NAVIGATION -->
    <nav class="bg-navy-950/90 text-xs border-t border-slate-800 overflow-x-auto">
      <div class="max-w-7xl mx-auto px-3 flex items-center gap-1 whitespace-nowrap py-1.5 font-bold">
        <a href="index.html" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">Trang Chủ</a>
        <a href="tap-chi.html" class="px-3 py-1 rounded text-white bg-navy-800 text-gold-400">📰 Tạp Chí Thang Máy (Hiện Tại)</a>
        <button onclick="filterCategory('ho-thang')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">📐 Kỹ Thuật Hố PIT & OH</button>
        <button onclick="filterCategory('dong-co')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">⚙️ Máy Kéo PMSM</button>
        <button onclick="filterCategory('an-toan')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">🛡️ Tiêu Chuẩn QCVN</button>
        <button onclick="filterCategory('khuyen-cao')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">⚠️ Khuyến Cáo Chủ Nhà</button>
        <button onclick="filterCategory('xu-huong')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">✨ Thang Máy Kính</button>
        <button onclick="filterCategory('bao-gia')" class="px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-navy-800">💰 Bóc Tách Chi Phí</button>
      </div>
    </nav>
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
        <span>🛡️ <strong>BẢO HÀNH CHÍNH HÃNG 36 THÁNG</strong> • ĐỘI CỨU HỘ KHẨN CẤP THƯỜNG TRỰC 24/7 TẠI 34 TỈNH THÀNH</span>
        <span class="text-gold-300">•</span>
        <span>📞 <strong>HOTLINE KỸ SƯ TRƯỞNG TOÀN QUỐC: 0914.587.575</strong></span>
      </div>
    </div>
  </div>

  <!-- ==================== HERO BANNER TẠP CHÍ ==================== -->
  <section class="bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 text-white py-10 px-4 border-b border-gold-500/30">
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/50 px-3 py-1 rounded-full text-gold-300 text-xs font-bold uppercase tracking-wider">
        <span>🏛️ CHUYÊN TRANG KỸ THUẬT & CÔNG NGHỆ THANG MÁY</span>
      </div>
      <h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase">
        Tạp Chí Thang Máy Toàn Quốc <br class="hidden sm:inline" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-yellow-100">
          Kho Tri Thức Kỹ Thuật, An Toàn & Xu Hướng 2027
        </span>
      </h1>
      <p class="max-w-3xl text-xs sm:text-sm text-gold-300 leading-relaxed font-semibold">
        Được biên soạn bởi các kỹ sư thang máy hàng đầu Việt Nam.
      </p>

      <!-- Category Filter Pills -->
      <div class="pt-3 flex flex-wrap gap-2 text-xs">
        <button onclick="filterCategory('all')" id="btn-all" class="category-btn bg-gold-500 text-navy-950 font-black px-3.5 py-1.5 rounded-full shadow transition">★ Tất Cả (8)</button>
        <button onclick="filterCategory('ho-thang')" id="btn-ho-thang" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">📐 Kỹ Thuật Hố PIT & OH</button>
        <button onclick="filterCategory('dong-co')" id="btn-dong-co" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">⚙️ Động Cơ Fuji / Montanari / Ziehl</button>
        <button onclick="filterCategory('an-toan')" id="btn-an-toan" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">🛡️ An Toàn & QCVN 02:2019</button>
        <button onclick="filterCategory('khuyen-cao')" id="btn-khuyen-cao" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">⚠️ Cảnh Báo Cắt Giảm Linh Kiện</button>
        <button onclick="filterCategory('xu-huong')" id="btn-xu-huong" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">✨ Xu Hướng Thang Kính Biệt Thự</button>
        <button onclick="filterCategory('bao-gia')" id="btn-bao-gia" class="category-btn bg-navy-800 text-slate-200 hover:text-white font-bold px-3.5 py-1.5 rounded-full border border-slate-700 transition">💰 Bóc Tách Chi Phí 10 Năm</button>
      </div>
    </div>
  </section>

  <!-- ==================== BÀI VIẾT NỔI BẬT SPOTLIGHT (CHIEF ENGINEER) ==================== -->
  <section class="max-w-7xl mx-auto px-4 py-8 w-full">
    <div class="bg-white rounded-2xl border-2 border-gold-500/60 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
      
      <!-- Cột ảnh bài nổi bật -->
      <div class="lg:col-span-5 relative bg-slate-950 overflow-hidden aspect-[16/10] lg:aspect-auto">
        <img src="images/cabin_2.png" alt="Đại phẫu thuật ngành thang máy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90">
        <div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent"></div>
        <div class="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
          🔥 BÀI VIẾT TÂM ĐIỂM NGÀNH THANG MÁY
        </div>
        <div class="absolute bottom-4 left-4 right-4 text-white text-xs">
          <div class="font-bold text-gold-400">Tác giả: Kỹ Sư Trưởng Nguyễn Văn An</div>
          <div class="text-[11px] text-slate-300">Cố vấn giải pháp kết cấu hố thang tại 34 tỉnh thành</div>
        </div>
      </div>

      <!-- Cột nội dung bài nổi bật -->
      <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span class="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded uppercase">Cảnh Báo Chủ Đầu Tư</span>
            <span>•</span>
            <span>23/10/2026</span>
            <span>•</span>
            <span class="text-slate-600 font-semibold">⏱️ 12 phút đọc chuyên sâu</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-navy-950 group-hover:text-gold-600 transition leading-snug">
            <a href="bai-viet.html?id=4">
              Khuyến Cáo Chủ Đầu Tư: 7 Chiêu Trò "Cắt Giảm Linh Kiện Thang Máy Giá Rẻ" Và Cách Nhận Biết CO/CQ Chuẩn Quốc Tế
            </a>
          </h2>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Phân tích chi tiết các mánh khóe tráo đổi động cơ cũ sơn lại vỏ, cắt giảm bình cứu hộ tự động ARD thành bình ắc quy xe máy, sử dụng mành hồng ngoại 1 tia và thép giếng thang mỏng dưới 2.5mm gây rung lắc. Bảng hướng dẫn quét mã QR, đọc tờ khai hải quan CO/CQ và hợp đồng ràng buộc bảo vệ quyền lợi gia chủ.
          </p>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs text-slate-600">
            <span class="text-green-600 font-bold">✓</span>
            <span>Căn cứ pháp lý QCVN 02:2019 • Biên soạn bởi Kỹ Sư Trưởng</span>
          </div>
          <a href="bai-viet.html?id=4" class="inline-flex items-center justify-center gap-1.5 bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 px-5 py-2.5 rounded-xl font-black text-xs transition shadow">
            <span>ĐỌC TOÀN BỘ BÀI PHÂN TÍCH</span>
            <span>→</span>
          </a>
        </div>
      </div>

    </div>
  </section>

  <!-- ==================== LƯỚI BÀI VIẾT & THANH BÊN ==================== -->
  <main class="max-w-7xl mx-auto px-4 pb-14 w-full flex-1">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- CỘT CHÍNH (8 CỘT): DANH SÁCH BÀI VIẾT -->
      <div class="lg:col-span-8 space-y-6">
        
        <div class="flex items-center justify-between border-b pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl text-gold-600">📚</span>
            <h2 id="currentCategoryTitle" class="text-lg font-black text-navy-950 uppercase">
              TẤT CẢ BÀI VIẾT KỸ THUẬT (8 BÀI CHUYÊN SÂU)
            </h2>
          </div>
          <span id="articleCountBadge" class="text-xs bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full">
            8 bài
          </span>
        </div>

        <div id="articlesGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Bài 1: Hố PIT siêu nông -->
          <article data-category="ho-thang" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_2.png" alt="Hố PIT siêu nông 250mm" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">KỸ THUẬT HỐ THANG</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">23/10/2026 • Bởi Kỹ Sư Trưởng • 9 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=1">
                    Cẩm Nang Xử Lý Hố PIT Siêu Nông (Từ 250mm - 450mm) Và Chiều Cao OH Hạn Chế Cho Nhà Phố Cải Tạo
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Giải pháp giếng thang khung thép chấn định hình, động cơ không phòng máy MRL và giảm chấn PU chuyên dụng giúp thi công thang máy mà không đụng chạm bể ngầm, móng bè nhà phố.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=1" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem chi tiết bản vẽ & thông số &gt;
              </a>
            </div>
          </article>

          <!-- Bài 2: So sánh động cơ -->
          <article data-category="dong-co" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_3.png" alt="So sánh động cơ Fuji vs Montanari vs Ziehl" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">CÔNG NGHỆ ĐỘNG CƠ</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">22/10/2026 • Chuyên Gia Cơ Điện • 11 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=2">
                    So Sánh Phân Tích Kỹ Thuật Động Cơ Không Hộp Số PMSM: Fuji (Nhật Bản) vs Montanari (Ý) vs Ziehl-Abegg (Đức)
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Đánh giá chi tiết về từ trường nam châm vĩnh cửu Neodymium, độ ồn dưới 48dB, độ bền phanh kép tự ngắt và bảng ma trận tiêu thụ điện thực tế hàng tháng.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=2" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem ma trận so sánh động cơ &gt;
              </a>
            </div>
          </article>

          <!-- Bài 3: QCVN 02:2019 và ARD -->
          <article data-category="an-toan" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_1.png" alt="QCVN 02:2019 và an toàn cứu hộ" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">QUY CHUẨN AN TOÀN</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">21/10/2026 • Ban Kỹ Thuật Thang Máy • 10 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=3">
                    Quy Chuẩn An Toàn QCVN 02:2019/BLĐTBXH: 5 Cấp Độ Cứu Hộ Tự Động ARD Và Thiết Bị Thắng Cơ Bắt Buộc
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Giải mã nguyên lý hoạt động của thắng cơ ly tâm Governor, mành quang điện đa điểm Photocell và bộ lưu điện cứu hộ tự động đưa cabin về tầng bằng khi mất điện.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=3" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem 5 lớp bảo vệ an toàn &gt;
              </a>
            </div>
          </article>

          <!-- Bài 4: Khuyến cáo cắt giảm linh kiện -->
          <article data-category="khuyen-cao" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_4.png" alt="Cảnh báo linh kiện thang máy" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">CẢNH BÁO THỊ TRƯỜNG</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">20/10/2026 • Kỹ Sư Trưởng • 12 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=4">
                    Khuyến Cáo Chủ Đầu Tư: 7 Chiêu Trò "Cắt Giảm Linh Kiện Thang Máy Giá Rẻ" Và Cách Nhận Biết CO/CQ Chuẩn
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Vạch trần chiêu trò tráo động cơ bãi, cắt giảm photocell đa điểm, dùng ray nguội thay ray tiện và hướng dẫn kiểm tra tờ khai hải quan chính ngạch.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=4" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem 7 cảnh báo linh kiện &gt;
              </a>
            </div>
          </article>

          <!-- Bài 5: Xu hướng thang máy kính -->
          <article data-category="xu-huong" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_5.png" alt="Thang máy kính quan sát Panoramic" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-teal-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">KIẾN TRÚC & XU HƯỚNG</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">19/10/2026 • KTS Trưởng Biệt Thự • 8 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=5">
                    Xu Hướng Thang Máy Kính Quan Sát Panoramic Biệt Thự: Kết Cấu Khung Thép Định Hình & Kính Laminated Chống Nóng
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Tiêu chuẩn kính an toàn 10.38mm - 12.38mm chống tia UV, giải pháp xử lý ánh sáng giếng trời và khung thép mạ PVD Titan sang trọng cho biệt thự cao cấp.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=5" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem xu hướng thang kính &gt;
              </a>
            </div>
          </article>

          <!-- Bài 6: Bóc tách chi phí 10 năm -->
          <article data-category="bao-gia" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_6.png" alt="Bóc tách chi phí thang máy" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">TÀI CHÍNH & VẬN HÀNH</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">18/10/2026 • Ban Quản Trị Vận Hành • 9 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=6">
                    Bóc Tách Bài Toán Tài Chính: Chi Phí Điện Năng Tiêu Thụ, Thay Thế Linh Kiện Và Bảo Trì Định Kỳ 10 Năm
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Tính toán chi tiết tiền điện hàng tháng (chỉ 100k - 180k), chi phí kiểm định định kỳ, ngân sách thay thế ắc quy UPS và giá trị gia tăng của ngôi nhà.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=6" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem bảng dự toán chi phí 10 năm &gt;
              </a>
            </div>
          </article>

          <!-- Bài 7: Hướng dẫn tự kiểm tra hàng tháng -->
          <article data-category="an-toan" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_7.png" alt="Tự kiểm tra thang máy định kỳ" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">CẨM NANG GIA ĐÌNH</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">17/10/2026 • Đội Kỹ Thuật Bảo Trì • 7 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=7">
                    12 Bước Tự Kiểm Tra Thang Máy Định Kỳ Hàng Tháng Cho Chủ Nhà: Cách Nhận Biết Sớm Dấu Hiệu Trượt Cáp & Lệch Ray
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Checklist đơn giản cho gia chủ: Test độ bằng tầng, kiểm tra photocell mành cửa, nút chuông khẩn cấp và lắng nghe tiếng động cơ để phòng ngừa sự cố.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=7" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem checklist 12 bước an toàn &gt;
              </a>
            </div>
          </article>

          <!-- Bài 8: Thiết kế giếng thang kết hợp thang bộ -->
          <article data-category="ho-thang" class="article-item lift-card flex flex-col justify-between">
            <div>
              <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img src="images/cabin_8.png" alt="Giếng thang trong lòng thang bộ" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">THIẾT KẾ MẶT BẰNG</span>
              </div>
              <div class="p-4 space-y-2">
                <div class="text-[11px] text-slate-400">16/10/2026 • KTS Trưởng Kết Cấu • 8 phút đọc</div>
                <h3 class="font-black text-sm text-navy-950 hover:text-gold-600 transition leading-snug">
                  <a href="bai-viet.html?id=8">
                    Cẩm Nang Thiết Kế Giếng Thang Kết Hợp Cầu Thang Bộ: Kích Thước Lọt Lòng Tối Ưu & Giải Pháp Đón Ánh Sáng
                  </a>
                </h3>
                <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  Bố trí thang máy trong lòng cầu thang bộ giúp tiết kiệm tối đa diện tích hành lang, kết hợp vách kính lấy sáng giếng trời và kết cấu tiêu âm hiệu quả.
                </p>
              </div>
            </div>
            <div class="p-4 pt-0">
              <a href="bai-viet.html?id=8" class="text-gold-600 font-bold text-xs hover:underline inline-flex items-center gap-1">
                Xem mặt bằng bố trí chi tiết &gt;
              </a>
            </div>
          </article>

        </div>

      </div>

      <!-- CỘT BÊN (4 CỘT): TRA CỨU NHANH & TƯ VẤN KỸ SƯ TRƯỞNG -->
      <aside class="lg:col-span-4 space-y-6">

        <!-- Widget 1: Hộp liên hệ Kỹ Sư Trưởng trực tiếp -->
        <div class="bg-navy-950 text-white rounded-2xl p-6 border-2 border-gold-500 shadow-xl space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-navy-950 font-black text-xl shadow">
              👨‍💼
            </div>
            <div>
              <div class="text-gold-400 font-black text-xs uppercase tracking-wider">BAN KỸ THUẬT SIÊU THỊ THANG MÁY</div>
              <div class="font-black text-base text-white">Kỹ Sư Trưởng Nguyễn Văn An</div>
            </div>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Bạn có bản vẽ mặt bằng hoặc đang phân vân về kết cấu hố thang? Gửi file CAD hoặc hình ảnh hiện trạng công trình qua Zalo để nhận phản hồi thẩm định trong vòng <strong>15 phút</strong>.
          </p>
          <div class="space-y-2 pt-1">
            <a href="tel:0914587575" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 text-navy-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow">
              <span>📞 GỌI TRỰC TIẾP: 0914.587.575</span>
            </a>
            <a href="https://zalo.me/0914587575" target="_blank" class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow">
              <span>💬 Kết nối Zalo gửi bản vẽ kỹ thuật</span>
            </a>
          </div>
          <div class="text-[11px] text-slate-400 text-center">
            ★ Phục vụ khảo sát thực địa miễn phí trên <strong>34 tỉnh thành</strong>
          </div>
        </div>

        <!-- Widget 2: Bảng thông số kích thước hố thang chuẩn 2026 -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div class="flex items-center gap-2 border-b pb-2">
            <span class="text-gold-600 text-lg">📐</span>
            <h3 class="font-black text-xs uppercase text-navy-950 tracking-wider">
              BẢNG THÔNG SỐ HỐ THANG CHUẨN
            </h3>
          </div>
          <p class="text-[11px] text-slate-500">Kích thước thông thủy hố xây dựng (Rộng x Sâu):</p>
          <div class="space-y-2 text-xs">
            <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div class="font-bold text-navy-950">Homelift Mini 300kg (2-3 người)</div>
                <div class="text-[10px] text-slate-500">Hố: 1250 x 1300mm • PIT: 300mm</div>
              </div>
              <span class="text-gold-600 font-black text-xs">OH 2800</span>
            </div>
            <div class="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200 flex justify-between items-center">
              <div>
                <div class="font-bold text-navy-950">Thang Kính Biệt Thự 350kg (4-5 người)</div>
                <div class="text-[10px] text-slate-500">Hố: 1400 x 1400mm • PIT: 350mm</div>
              </div>
              <span class="text-gold-600 font-black text-xs">OH 3200</span>
            </div>
            <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div class="font-bold text-navy-950">Thang Gia Đình 450kg (6 người)</div>
                <div class="text-[10px] text-slate-500">Hố: 1600 x 1600mm • PIT: 450mm</div>
              </div>
              <span class="text-gold-600 font-black text-xs">OH 3600</span>
            </div>
            <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div class="font-bold text-navy-950">Thang Tải Khách 630kg (9 người)</div>
                <div class="text-[10px] text-slate-500">Hố: 1800 x 1800mm • PIT: 1200mm</div>
              </div>
              <span class="text-gold-600 font-black text-xs">OH 4200</span>
            </div>
          </div>
          <div class="pt-1">
            <a href="index.html#bang-gia-nhanh" class="text-xs font-bold text-blue-600 hover:underline block text-center">
              Xem báo giá trọn gói 4 gói thang máy &gt;
            </a>
          </div>
        </div>

        <!-- Widget 3: Tải trọn bộ thư viện CAD/BIM cho KTS -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">📥</span>
            <h3 class="font-black text-xs uppercase text-amber-950">
              THƯ VIỆN CAD & REVIT CHO KTS
            </h3>
          </div>
          <p class="text-xs text-amber-900 leading-relaxed">
            Tải miễn phí trọn bộ file bản vẽ CAD giếng thang (.dwg), mô hình 3D Revit (.rfa) và tiêu chuẩn kỹ thuật phục vụ hồ sơ xin phép xây dựng.
          </p>
          <a href="https://zalo.me/0914587575?text=Toi%20la%20KTS%20can%20tai%20file%20CAD%20ho%20thang" target="_blank" class="block text-center bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow">
            Nhận Bộ File CAD Qua Zalo Ngay
          </a>
          <div class="text-[10px] text-amber-800 text-center font-semibold">
            ★ Kèm chính sách hoa hồng 10% cho KTS & Nhà Thầu
          </div>
        </div>

      </aside>

    </div>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="bg-navy-950 text-slate-400 text-xs py-10 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl text-gold-400">🛗</span>
          <span class="text-white font-black text-sm uppercase">Siêu thị Thang máy Toàn Quốc</span>
        </div>
        <p class="text-[11px] leading-relaxed text-slate-400">
          Chuyên trang tạp chí khoa học kỹ thuật & phân phối thang máy chính hãng hàng đầu Việt Nam. Phục vụ khách hàng trên 34 tỉnh thành với đội ngũ kỹ sư trưởng chuyên nghiệp.
        </p>
        <div class="pt-1">
          <span class="text-white font-bold">Hotline Kỹ Sư Trưởng Toàn Quốc: </span>
          <a href="tel:0914587575" class="text-gold-400 font-black text-sm">0914.587.575</a>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Chuyên Đề Tạp Chí</h4>
        <ul class="space-y-1.5 text-slate-300">
          <li><a href="bai-viet.html?id=1" class="hover:text-gold-400">Kỹ thuật hố PIT siêu nông từ 250mm</a></li>
          <li><a href="bai-viet.html?id=2" class="hover:text-gold-400">So sánh động cơ Fuji vs Montanari</a></li>
          <li><a href="bai-viet.html?id=3" class="hover:text-gold-400">Quy chuẩn an toàn QCVN 02:2019</a></li>
          <li><a href="bai-viet.html?id=4" class="hover:text-gold-400">Cảnh báo cắt giảm linh kiện giá rẻ</a></li>
          <li><a href="bai-viet.html?id=5" class="hover:text-gold-400">Xu hướng thang kính biệt thự 2027</a></li>
        </ul>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Chính Sách & Hợp Tác</h4>
        <ul class="space-y-1.5 text-slate-300">
          <li><a href="index.html#bang-gia-nhanh" class="hover:text-gold-400">Bảng tra cứu giá nhanh khách hàng</a></li>
          <li><a href="chiet-khau.html" class="hover:text-gold-400 text-gold-400 font-bold">Chính sách hoa hồng 10% KTS</a></li>
          <li><a href="doi-tac.html" class="hover:text-gold-400">Đăng ký nhà cung cấp đưa thang lên sàn</a></li>
          <li><a href="dat-hang.html" class="hover:text-gold-400">Đăng ký kỹ sư đo đạc hố thang miễn phí</a></li>
        </ul>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Phạm Vi Phục Vụ</h4>
        <p class="text-[11px] leading-relaxed text-slate-400">
          Đội kỹ sư thường trực khảo sát, thẩm định bản vẽ và lắp ráp tại <strong>34 tỉnh thành</strong> trên toàn quốc: Hà Nội, TP.HCM, Hải Phòng, Đà Nẵng, Cần Thơ, Nghệ An, Hà Tĩnh, Thanh Hóa, Quảng Ninh, Bình Dương, Đồng Nai...
        </p>
        <div class="pt-2">
          <a href="tel:0914587575" class="inline-flex items-center gap-1.5 bg-gold-500 text-navy-950 font-black px-3 py-1.5 rounded-lg text-xs">
            <span>📞 0914.587.575 (Zalo 24/7)</span>
          </a>
        </div>
      </div>

    </div>

    <div class="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-slate-800 text-center text-slate-500 text-[11px]">
      © 2026 Siêu Thị Thương Mại Thang Máy Toàn Quốc. Bản quyền tạp chí thuộc về Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam.
    </div>
  </footer>

  <!-- SCRIPT LỌC & TÌM KIẾM BÀI VIẾT -->
  <script>
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

    const categoryTitles = {
      'all': 'TẤT CẢ BÀI VIẾT KỸ THUẬT (8 BÀI CHUYÊN SÂU)',
      'ho-thang': 'CHUYÊN ĐỀ: KỸ THUẬT HỐ PIT & OH CHO NHÀ CẢI TẠO',
      'dong-co': 'CHUYÊN ĐỀ: CÔNG NGHỆ ĐỘNG CƠ KHÔNG HỘP SỐ PMSM',
      'an-toan': 'CHUYÊN ĐỀ: QUY CHUẨN AN TOÀN QCVN & HỆ THỐNG ARD',
      'khuyen-cao': 'CHUYÊN ĐỀ: CẢNH BÁO CẮT GIẢM LINH KIỆN GIÁ RẺ',
      'xu-huong': 'CHUYÊN ĐỀ: XU HƯỚNG THANG KÍNH PANORAMIC BIỆT THỰ',
      'bao-gia': 'CHUYÊN ĐỀ: BÓC TÁCH CHI PHÍ ĐIỆN NĂNG & BẢO TRÌ 10 NĂM'
    };

    function filterCategory(cat) {
      // update title
      document.getElementById('currentCategoryTitle').innerText = categoryTitles[cat] || categoryTitles['all'];
      
      // update buttons style
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-gold-500', 'text-navy-950', 'font-black');
        btn.classList.add('bg-navy-800', 'text-slate-200', 'font-bold');
      });
      const activeBtn = document.getElementById('btn-' + cat);
      if (activeBtn) {
        activeBtn.classList.remove('bg-navy-800', 'text-slate-200');
        activeBtn.classList.add('bg-gold-500', 'text-navy-950', 'font-black');
      }

      // filter items
      const items = document.querySelectorAll('.article-item');
      let count = 0;
      items.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = 'flex';
          count++;
        } else {
          item.style.display = 'none';
        }
      });
      document.getElementById('articleCountBadge').innerText = count + ' bài';
      toggleDrawer(false);
    }

    function searchArticles() {
      const q = document.getElementById('articleSearchInput').value.toLowerCase().trim();
      const items = document.querySelectorAll('.article-item');
      let count = 0;
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'flex';
          count++;
        } else {
          item.style.display = 'none';
        }
      });
      document.getElementById('articleCountBadge').innerText = count + ' bài khớp';
    }
  </script>

</body>
</html>
"""

with open(os.path.join(OUTPUT_DIR, "tap-chi.html"), "w", encoding="utf-8") as f:
    f.write(tap_chi_html)
print("Created tap-chi.html successfully.")
