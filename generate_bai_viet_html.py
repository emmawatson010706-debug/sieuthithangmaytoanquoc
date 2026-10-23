# -*- coding: utf-8 -*-
import os
import json
import sys

OUTPUT_DIR = r"D:\sieuthithangmaytoanquoc"
sys.path.insert(0, OUTPUT_DIR)

# Import articles dictionary
from articles_data import articles

articles_json_str = json.dumps(articles, ensure_ascii=False)

# Let's build the HTML template
art1 = articles[1]

bai_viet_html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="pageTitle">{art1["title"]} - Tạp Chí Thang Máy Toàn Quốc</title>
  <meta id="metaDesc" name="description" content="{art1["summary"]}">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            gold: {{
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309',
            }},
            navy: {{
              800: '#0f2766',
              900: '#0a1945',
              950: '#050c26',
            }},
            accent: {{
              red: '#dc2626',
              orange: '#ea580c'
            }}
          }}
        }}
      }}
    }}
  </script>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
    }}
    .gold-gradient {{
      background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #b45309 100%);
    }}
    @keyframes marqueeMove {{
      0% {{ transform: translateX(0%); }}
      100% {{ transform: translateX(-50%); }}
    }}
    .animate-marquee {{
      display: inline-flex;
      white-space: nowrap;
      animation: marqueeMove 32s linear infinite;
    }}
    .animate-marquee:hover {{
      animation-play-state: paused;
    }}
    html {{
      scroll-behavior: smooth;
    }}
  </style>
</head>
<body class="antialiased flex flex-col min-h-screen">

  <!-- ==================== DRAWER 320PX ==================== -->
  <div id="drawerOverlay" onclick="toggleDrawer(false)" class="fixed inset-0 bg-black/60 z-50 hidden transition-opacity"></div>
  
  <aside id="drawerSidebar" class="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform -translate-x-full transition-transform duration-300 flex flex-col">
    <div class="bg-navy-950 text-white p-4 flex items-center justify-between border-b border-gold-600/40">
      <div class="flex items-center gap-2">
        <span class="text-xl text-gold-400">☰</span>
        <span class="font-black text-xs uppercase tracking-wider text-gold-400">DANH MỤC TẠP CHÍ</span>
      </div>
      <button onclick="toggleDrawer(false)" class="text-white text-xl font-bold w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center">✕</button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
      <div class="space-y-1.5">
        <h3 class="font-black text-navy-950 uppercase tracking-wider text-xs border-b pb-1.5">
          📚 TẤT CẢ BÀI VIẾT KỸ THUẬT
        </h3>
        <div class="space-y-1 font-semibold text-slate-700">
          <a href="bai-viet.html?id=1" class="block py-2 px-2.5 rounded hover:bg-amber-50">1. Xử lý hố PIT siêu nông từ 250mm</a>
          <a href="bai-viet.html?id=2" class="block py-2 px-2.5 rounded hover:bg-amber-50">2. So sánh động cơ Fuji vs Montanari</a>
          <a href="bai-viet.html?id=3" class="block py-2 px-2.5 rounded hover:bg-amber-50">3. Quy chuẩn an toàn QCVN 02:2019</a>
          <a href="bai-viet.html?id=4" class="block py-2 px-2.5 rounded hover:bg-amber-50 text-red-700 font-bold">4. Cảnh báo 7 chiêu cắt giảm linh kiện</a>
          <a href="bai-viet.html?id=5" class="block py-2 px-2.5 rounded hover:bg-amber-50">5. Xu hướng thang kính biệt thự 2027</a>
          <a href="bai-viet.html?id=6" class="block py-2 px-2.5 rounded hover:bg-amber-50">6. Bóc tách chi phí điện & bảo trì 10 năm</a>
          <a href="bai-viet.html?id=7" class="block py-2 px-2.5 rounded hover:bg-amber-50">7. 12 bước tự kiểm tra thang máy</a>
          <a href="bai-viet.html?id=8" class="block py-2 px-2.5 rounded hover:bg-amber-50">8. Thiết kế giếng thang trong lòng thang bộ</a>
        </div>
      </div>

      <div class="space-y-1.5 pt-2 border-t">
        <h3 class="font-black text-navy-950 uppercase tracking-wider text-xs pb-1">
          🔗 ĐIỀU HƯỚNG NHANH
        </h3>
        <div class="space-y-1 font-bold text-slate-700">
          <a href="tap-chi.html" class="block py-2 px-2.5 rounded bg-blue-50 text-blue-900">📰 Trang Chủ Tạp Chí</a>
          <a href="index.html#bang-gia-nhanh" class="block py-2 px-2.5 rounded bg-amber-50 text-amber-900">💰 Bảng Tra Cứu Giá Nhanh</a>
          <a href="chiet-khau.html" class="block py-2 px-2.5 rounded hover:bg-slate-100">💎 Hoa Hồng 10% KTS & Thầu</a>
          <a href="index.html" class="block py-2 px-2.5 rounded hover:bg-slate-100">🏠 Trang Chủ Siêu Thị</a>
        </div>
      </div>

      <div class="p-3.5 bg-navy-950 text-white rounded-xl border border-gold-500/40 space-y-1.5 shadow-lg">
        <div class="text-gold-400 font-black text-xs uppercase">Kỹ Sư Trưởng Toàn Quốc:</div>
        <a href="tel:0914587575" class="text-lg font-black text-white hover:text-gold-400 block tracking-wide">0914.587.575</a>
        <p class="text-[11px] text-slate-300">Khảo sát & tư vấn bản vẽ móng thang máy miễn phí tại 34 tỉnh thành.</p>
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
        <a href="tap-chi.html" class="text-yellow-300 hover:underline">📰 Tất Cả Bài Viết</a>
        <span>|</span>
        <a href="index.html" class="hover:text-gold-400">Trang Chủ</a>
        <span>|</span>
        <a href="chiet-khau.html" class="hover:text-gold-400">💰 Hoa hồng 10% KTS</a>
        <span>|</span>
        <a href="tel:0914587575" class="text-white hover:text-gold-400 font-black flex items-center gap-1">
          <span>Hotline: <strong class="text-gold-400 font-black text-xs">0914.587.575</strong></span>
        </a>
      </div>
    </div>
  </div>

  <!-- ==================== MAIN HEADER ==================== -->
  <header class="bg-navy-900 text-white sticky top-0 z-40 shadow-lg border-b border-navy-800">
    <div class="max-w-7xl mx-auto px-3 py-2.5">
      <div class="flex items-center justify-between gap-3 sm:gap-6">
        
        <!-- NÚT 3 GẠCH -->
        <button onclick="toggleDrawer(true)" class="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded-lg text-xs font-black border border-gold-500/30 text-gold-400 shadow-sm flex-shrink-0 transition">
          <span class="text-lg leading-none">☰</span>
          <span class="hidden sm:inline uppercase tracking-wider text-[11px]">MỤC LỤC</span>
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
          <a href="tap-chi.html" class="text-gold-400 transition font-black">📰 Tạp Chí Thang Máy</a>
          <a href="chiet-khau.html" class="hover:text-gold-400 transition">Chính Sách KTS (10%)</a>
          <a href="index.html#bang-gia-nhanh" class="hover:text-gold-400 transition">Bảng Giá Nhanh</a>
        </nav>

        <!-- ACTION -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <a href="https://zalo.me/0914587575" target="_blank" class="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow whitespace-nowrap">
            Zalo: 0914.587.575
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

  <!-- ==================== BREADCRUMB ==================== -->
  <div class="bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-2.5 text-xs text-slate-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
      <a href="index.html" class="hover:text-gold-600">Trang Chủ</a>
      <span>&gt;</span>
      <a href="tap-chi.html" class="hover:text-gold-600">Tạp Chí Thang Máy</a>
      <span>&gt;</span>
      <span id="breadcrumbCategory" class="text-gold-700 font-bold">{art1["category"]}</span>
      <span>&gt;</span>
      <span id="breadcrumbTitle" class="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">{art1["title"]}</span>
    </div>
  </div>

  <!-- ==================== MAIN CONTENT WRAPPER ==================== -->
  <main class="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- CỘT BÀI VIẾT CHÍNH (8 CỘT) -->
      <article class="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
        
        <!-- Header bài viết -->
        <div class="space-y-3 border-b pb-5">
          <div class="flex items-center gap-2">
            <span id="articleCategoryBadge" class="bg-gold-500 text-navy-950 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
              {art1["category"]}
            </span>
            <span class="text-xs text-slate-400">•</span>
            <span id="articleDate" class="text-xs text-slate-500">{art1["date"]}</span>
            <span class="text-xs text-slate-400">•</span>
            <span id="articleReadTime" class="text-xs text-slate-500 font-semibold">{art1["read_time"]}</span>
            <span class="text-xs text-slate-400">•</span>
            <span id="articleViews" class="text-xs text-blue-600 font-semibold">{art1["views"]}</span>
          </div>

          <h1 id="articleTitle" class="text-xl sm:text-3xl font-black text-navy-950 leading-tight">
            {art1["title"]}
          </h1>

          <!-- Thẻ tác giả Kỹ Sư Trưởng -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-navy-950 text-gold-400 font-black text-lg flex items-center justify-center flex-shrink-0 shadow">
                👨‍💼
              </div>
              <div>
                <div id="articleAuthor" class="font-black text-xs text-navy-950">{art1["author"]}</div>
                <div id="articleAuthorTitle" class="text-[11px] text-slate-500">{art1["author_title"]}</div>
              </div>
            </div>
            <a href="tel:0914587575" class="hidden sm:inline-flex items-center gap-1.5 bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">
              <span>📞 Kỹ Sư Trưởng: 0914.587.575</span>
            </a>
          </div>
        </div>

        <!-- Tóm tắt Sapo chuẩn SEO -->
        <div class="p-4 bg-amber-50/70 border-l-4 border-gold-500 rounded-r-xl">
          <p id="articleSummary" class="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
            "{art1["summary"]}"
          </p>
        </div>

        <!-- Ảnh bài viết -->
        <div class="rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-900 relative">
          <img id="articleImage" src="{art1["image"]}" alt="{art1["title"]}" class="w-full h-full object-cover">
        </div>

        <!-- Mục lục bài viết (Table of Contents) -->
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div class="font-black text-xs uppercase tracking-wider text-navy-950 flex items-center gap-2">
            <span>📑</span>
            <span>MỤC LỤC NỘI DUNG CHUYÊN SÂU:</span>
          </div>
          <ul id="articleToc" class="space-y-1.5 text-xs text-blue-700 font-semibold list-none pl-1">
            <!-- Dynamic TOC items -->
          </ul>
        </div>

        <!-- Nội dung chi tiết (HTML) -->
        <div id="articleContent" class="space-y-6 pt-2 leading-relaxed text-slate-700">
          {art1["content_html"]}
        </div>

        <!-- Banner Kỹ Sư Trưởng Thẩm Định Bản Vẽ Trực Tiếp -->
        <div class="mt-8 p-6 bg-navy-950 text-white rounded-2xl border-2 border-gold-500 shadow-xl space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">📐</span>
            <div>
              <h3 class="font-black text-sm sm:text-base text-gold-400 uppercase">
                BẠN CẦN THẨM ĐỊNH BẢN VẼ GIẾNG THANG HOẶC HIỆN TRẠNG MÓNG?
              </h3>
              <p class="text-xs text-slate-300">
                Gửi hình ảnh mặt bằng hoặc file CAD qua Zalo để Kỹ Sư Trưởng phản hồi tư vấn kết cấu & chi phí trong 15 phút.
              </p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            <a href="tel:0914587575" class="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 text-navy-950 font-black py-2.5 px-4 rounded-xl text-xs uppercase text-center shadow">
              📞 GỌI KỸ SƯ TRƯỞNG: 0914.587.575
            </a>
            <a href="https://zalo.me/0914587575?text=Toi%20can%20tham%20dinh%20ban%20ve%20ho%20thang" target="_blank" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center shadow">
              💬 Kết Nối Zalo Nhận Bản Vẽ CAD Miễn Phí
            </a>
          </div>
        </div>

        <!-- KHUNG HỎI ĐÁP & BÌNH LUẬN TRỰC TUYẾN CÙNG KỸ SƯ TRƯỞNG -->
        <div class="pt-6 border-t space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-black text-sm text-navy-950 uppercase flex items-center gap-2">
              <span>💬</span> HỎI ĐÁP KỸ THUẬT VỚI KỸ SƯ TRƯỞNG
            </h3>
            <span class="text-xs text-slate-500">Phản hồi trung bình: 10 phút</span>
          </div>

          <!-- Form gửi câu hỏi -->
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input id="commentName" type="text" placeholder="Họ và tên của bạn *" class="p-2 border rounded bg-white text-slate-800">
              <input id="commentPhone" type="text" placeholder="Số điện thoại / Zalo để nhận phản hồi *" class="p-2 border rounded bg-white text-slate-800">
            </div>
            <textarea id="commentContent" rows="3" placeholder="Nhập câu hỏi của bạn (ví dụ: Nhà tôi mặt tiền 4m, móng bè thì đào hố PIT sâu 300mm có được không?)..." class="w-full p-2 border rounded bg-white text-slate-800"></textarea>
            <div class="flex justify-between items-center">
              <span class="text-[11px] text-slate-400">Cam kết bảo mật thông tin 100%</span>
              <button onclick="submitComment()" class="bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 px-4 py-2 rounded-lg font-black transition">
                GỬI CÂU HỎI CHO KỸ SƯ TRƯỞNG
              </button>
            </div>
          </div>

          <!-- Danh sách câu hỏi đã được giải đáp mẫu -->
          <div id="commentsList" class="space-y-3 pt-2 text-xs">
            <div class="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-navy-950">Anh Trần Đức Thắng (Hà Nội)</span>
                <span class="text-[11px] text-slate-400">1 giờ trước</span>
              </div>
              <p class="text-slate-600">
                "Nhà tôi cao 5 tầng, diện tích 45m2, tầng 1 có bể phốt ngầm. Nhờ Kỹ Sư Trưởng tư vấn phương án giếng thang thép lồng kính 350kg."
              </p>
              <div class="p-2.5 bg-amber-50 rounded border-l-2 border-gold-600 text-slate-700 text-[11px] space-y-1">
                <div class="font-bold text-navy-950 flex items-center gap-1">
                  <span>👨‍💼</span> Kỹ Sư Trưởng Nguyễn Văn An trả lời:
                </div>
                <p>
                  "Chào anh Thắng! Trường hợp này anh dùng phương án khung thép chấn bọc kính, móng đặt nông 250mm bên trên nắp bể phốt, gia cố dầm thép chữ I chịu lực sang hai bên dầm chịu lực hiện hữu. Em đã nhắn qua Zalo bản vẽ chi tiết cho anh rồi nhé!"
                </p>
              </div>
            </div>
          </div>

        </div>

      </article>

      <!-- CỘT BÊN (4 CỘT) -->
      <aside class="lg:col-span-4 space-y-6">

        <!-- Widget Kỹ Sư Trưởng -->
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
            Hỗ trợ tư vấn kết cấu hố thang, giải pháp hố PIT siêu nông và tiêu chuẩn an toàn QCVN 02:2019 trực tiếp cho chủ nhà & KTS trên <strong>34 tỉnh thành</strong>.
          </p>
          <div class="space-y-2 pt-1">
            <a href="tel:0914587575" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 text-navy-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow">
              <span>📞 GỌI: 0914.587.575</span>
            </a>
            <a href="https://zalo.me/0914587575" target="_blank" class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow">
              <span>💬 Nhắn Zalo Kỹ Sư Trưởng</span>
            </a>
          </div>
        </div>

        <!-- Widget Các Bài Viết Đọc Nhiều Nhất -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div class="flex items-center gap-2 border-b pb-2">
            <span class="text-red-600 font-bold">🔥</span>
            <h3 class="font-black text-xs uppercase text-navy-950 tracking-wider">
              BÀI ĐỌC NHIỀU NHẤT
            </h3>
          </div>
          <div class="space-y-3 text-xs">
            <a href="bai-viet.html?id=4" class="block group">
              <div class="font-bold text-navy-950 group-hover:text-gold-600 transition leading-snug">
                7 chiêu trò cắt giảm linh kiện thang máy giá rẻ và cách nhận biết CO/CQ
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">4,250 lượt xem • Cảnh báo thị trường</div>
            </a>
            <a href="bai-viet.html?id=1" class="block group border-t pt-2">
              <div class="font-bold text-navy-950 group-hover:text-gold-600 transition leading-snug">
                Cẩm nang xử lý hố PIT siêu nông (từ 250mm) cho nhà phố cải tạo
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">3,420 lượt xem • Kỹ thuật hố thang</div>
            </a>
            <a href="bai-viet.html?id=3" class="block group border-t pt-2">
              <div class="font-bold text-navy-950 group-hover:text-gold-600 transition leading-snug">
                Quy chuẩn an toàn QCVN 02:2019 và cơ chế cứu hộ tự động 5 cấp độ
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">3,110 lượt xem • Quy chuẩn an toàn</div>
            </a>
            <a href="bai-viet.html?id=2" class="block group border-t pt-2">
              <div class="font-bold text-navy-950 group-hover:text-gold-600 transition leading-snug">
                So sánh động cơ PMSM: Fuji vs Montanari vs Ziehl-Abegg
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">2,890 lượt xem • Công nghệ động cơ</div>
            </a>
          </div>
        </div>

        <!-- Widget Thư viện CAD -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">📐</span>
            <h3 class="font-black text-xs uppercase text-amber-950">
              THƯ VIỆN BẢN VẼ HỐ THANG
            </h3>
          </div>
          <p class="text-xs text-amber-900 leading-relaxed">
            Dành cho Kiến Trúc Sư và Kỹ Sư Kết Cấu: Tải trọn bộ bản vẽ mặt cắt hố thang máy (.dwg) & thư viện Revit 3D.
          </p>
          <a href="https://zalo.me/0914587575?text=Toi%20can%20file%20CAD%20ho%20thang" target="_blank" class="block text-center bg-navy-950 hover:bg-gold-600 text-white hover:text-navy-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow">
            Tải Bản Vẽ CAD Qua Zalo
          </a>
        </div>

      </aside>

    </div>

    <!-- BÀI VIẾT LIÊN QUAN -->
    <section class="mt-12 border-t pt-8 space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-base sm:text-lg font-black text-navy-950 uppercase flex items-center gap-2">
          <span>📰</span> BÀI VIẾT KỸ THUẬT LIÊN QUAN
        </h3>
        <a href="tap-chi.html" class="text-xs font-bold text-gold-600 hover:underline">Xem tất cả bài viết &gt;</a>
      </div>
      <div id="relatedGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <!-- Rendered by JS -->
      </div>
    </section>

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
          Chuyên trang tạp chí khoa học kỹ thuật & sàn giao dịch phân phối thang máy chính hãng hàng đầu Việt Nam. Phục vụ trên 34 tỉnh thành với đội ngũ kỹ sư trưởng chuyên nghiệp.
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
        <h4 class="text-white font-bold uppercase text-xs tracking-wider">Chính Sách & Bảng Giá</h4>
        <ul class="space-y-1.5 text-slate-300">
          <li><a href="index.html#bang-gia-nhanh" class="hover:text-gold-400">Bảng tra cứu giá nhanh khách hàng</a></li>
          <li><a href="chiet-khau.html" class="hover:text-gold-400 text-gold-400 font-bold">Chính sách hoa hồng 10% KTS</a></li>
          <li><a href="doi-tac.html" class="hover:text-gold-400">Đăng ký đưa thang lên sàn</a></li>
          <li><a href="dat-hang.html" class="hover:text-gold-400">Đăng ký khảo sát thực tế miễn phí</a></li>
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
      © 2026 Siêu Thị Thương Mại Thang Máy Toàn Quốc. Bản quyền tạp chí thuộc về Đội Ngũ Kỹ Sư Thang Máy Hàng Đầu Việt Nam.
    </div>
  </footer>

  <!-- ==================== JAVASCRIPT RENDERER ==================== -->
  <script>
    const articlesData = {articles_json_str};

    function toggleDrawer(open) {{
      const drawer = document.getElementById('drawerSidebar');
      const overlay = document.getElementById('drawerOverlay');
      if (open) {{
        drawer.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
      }} else {{
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
      }}
    }}

    function getArticleId() {{
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get('id'), 10);
      if (id && articlesData[id]) {{
        return id;
      }}
      return 1; // Mặc định bài 1
    }}

    function renderArticle() {{
      const id = getArticleId();
      const art = articlesData[id];
      if (!art) return;

      // Update meta & title
      document.title = art.title + " - Tạp Chí Thang Máy Toàn Quốc";
      document.getElementById('pageTitle').innerText = art.title + " - Tạp Chí Thang Máy Toàn Quốc";
      document.getElementById('metaDesc').setAttribute('content', art.summary);

      // Breadcrumb
      document.getElementById('breadcrumbCategory').innerText = art.category;
      document.getElementById('breadcrumbTitle').innerText = art.title;

      // Meta info
      document.getElementById('articleCategoryBadge').innerText = art.category;
      document.getElementById('articleDate').innerText = art.date;
      document.getElementById('articleReadTime').innerText = art.read_time;
      document.getElementById('articleViews').innerText = art.views;
      document.getElementById('articleTitle').innerText = art.title;
      document.getElementById('articleAuthor').innerText = art.author;
      document.getElementById('articleAuthorTitle').innerText = art.author_title;
      document.getElementById('articleSummary').innerText = `"${{art.summary}}"`;
      document.getElementById('articleImage').setAttribute('src', art.image);
      document.getElementById('articleImage').setAttribute('alt', art.title);

      // TOC
      const tocUl = document.getElementById('articleToc');
      tocUl.innerHTML = '';
      art.toc.forEach(item => {{
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${{item.id}}" class="hover:text-gold-600 hover:underline flex items-center gap-1.5">
          <span class="text-gold-600">▶</span> ${{item.title}}
        </a>`;
        tocUl.appendChild(li);
      }});

      // Content
      document.getElementById('articleContent').innerHTML = art.content_html;

      // Render Related Articles (3 other articles)
      renderRelated(id);
    }}

    function renderRelated(currentId) {{
      const relatedGrid = document.getElementById('relatedGrid');
      relatedGrid.innerHTML = '';
      
      const allIds = Object.keys(articlesData).map(Number);
      const otherIds = allIds.filter(i => i !== currentId);
      const pick3 = otherIds.slice(0, 3);

      pick3.forEach(oid => {{
        const a = articlesData[oid];
        const card = document.createElement('article');
        card.className = "bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-gold-500 transition flex flex-col justify-between shadow-sm group";
        card.innerHTML = `
          <div>
            <div class="aspect-[16/10] bg-slate-900 overflow-hidden relative">
              <img src="${{a.image}}" alt="${{a.title}}" class="w-full h-full object-cover group-hover:scale-105 transition">
              <span class="absolute top-2 left-2 bg-navy-950 text-gold-400 text-[10px] font-black px-2 py-0.5 rounded uppercase">${{a.category}}</span>
            </div>
            <div class="p-4 space-y-1.5">
              <div class="text-[11px] text-slate-400">${{a.date}} • ${{a.read_time}}</div>
              <h4 class="font-black text-sm text-navy-950 group-hover:text-gold-600 transition line-clamp-2">
                <a href="bai-viet.html?id=${{oid}}">${{a.title}}</a>
              </h4>
              <p class="text-slate-600 text-xs line-clamp-2">${{a.summary}}</p>
            </div>
          </div>
          <div class="p-4 pt-0">
            <a href="bai-viet.html?id=${{oid}}" class="text-gold-600 font-bold hover:underline">Đọc bài viết &gt;</a>
          </div>
        `;
        relatedGrid.appendChild(card);
      }});
    }}

    function submitComment() {{
      const name = document.getElementById('commentName').value.trim();
      const phone = document.getElementById('commentPhone').value.trim();
      const content = document.getElementById('commentContent').value.trim();

      if (!name || !content) {{
        alert("Vui lòng điền Họ tên và Nội dung câu hỏi!");
        return;
      }}

      const commentsList = document.getElementById('commentsList');
      const newComment = document.createElement('div');
      newComment.className = "p-3 bg-white border border-slate-200 rounded-lg space-y-2 animate-pulse";
      newComment.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-bold text-navy-950">${{name}} (${{phone || 'Chủ nhà'}})</span>
          <span class="text-[11px] text-green-600 font-bold">Vừa gửi</span>
        </div>
        <p class="text-slate-700">"${{content}}"</p>
        <div class="p-2.5 bg-amber-50 rounded border-l-2 border-gold-600 text-slate-700 text-[11px] space-y-1">
          <div class="font-bold text-navy-950 flex items-center gap-1">
            <span>👨‍💼</span> Kỹ Sư Trưởng Nguyễn Văn An (0914.587.575):
          </div>
          <p>
            "Cảm ơn ${{name}}! Câu hỏi kỹ thuật của bạn đã được chuyển thẳng tới máy Kỹ Sư Trưởng. Đội ngũ kỹ sư sẽ gọi điện hoặc kết nối Zalo qua số điện thoại để gửi phương án giải quyết cụ thể nhé!"
          </p>
        </div>
      `;
      commentsList.prepend(newComment);

      document.getElementById('commentName').value = '';
      document.getElementById('commentPhone').value = '';
      document.getElementById('commentContent').value = '';
      alert("Câu hỏi của bạn đã được gửi thành công đến Kỹ Sư Trưởng 0914.587.575!");
    }}

    window.addEventListener('DOMContentLoaded', renderArticle);
  </script>

</body>
</html>
"""

with open(os.path.join(OUTPUT_DIR, "bai-viet.html"), "w", encoding="utf-8") as f:
    f.write(bai_viet_html)
print("Created bai-viet.html successfully.")
