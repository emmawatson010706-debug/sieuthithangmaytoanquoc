# -*- coding: utf-8 -*-
import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"

# =========================================================================
# 1. UPGRADE THIET-KE-CAD.HTML
# =========================================================================
cad_file = os.path.join(DIR, "thiet-ke-cad.html")
with open(cad_file, "r", encoding="utf-8") as f:
    cad_html = f.read()

# Replace the toolbar buttons in thiet-ke-cad.html
old_tabs_toolbar = '''            <!-- Tab chuyển đổi Mặt bằng / Mặt cắt đứng -->
            <div class="flex items-center gap-1 bg-navy-950 p-1 rounded-lg border border-slate-700">
              <button id="tabPlanBtn" onclick="switchCadView('plan')" class="px-3 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition">
                📐 Mặt Bằng Hố (Plan)
              </button>
              <button id="tabSectionBtn" onclick="switchCadView('section')" class="px-3 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition">
                📏 Mặt Cắt Đứng (Section)
              </button>
            </div>'''

new_tabs_toolbar = '''            <!-- 4 TAB MẶT CẮT KỸ THUẬT CHUYÊN SÂU -->
            <div class="flex flex-wrap items-center gap-1 bg-navy-950 p-1 rounded-lg border border-slate-700 overflow-x-auto">
              <button id="tabPlanBtn" onclick="switchCadView('plan')" class="px-2.5 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition whitespace-nowrap">
                📐 1. Mặt Bằng Hố (Plan)
              </button>
              <button id="tabSectionBtn" onclick="switchCadView('section')" class="px-2.5 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                📏 2. Mặt Cắt Các Tầng (Shaft)
              </button>
              <button id="tabCabinBtn" onclick="switchCadView('cabin')" class="px-2.5 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                🚪 3. Mặt Cắt Cabin & Cửa (Cabin)
              </button>
              <button id="tabPitBtn" onclick="switchCadView('pit')" class="px-2.5 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                🧱 4. Chi Tiết Đáy Hố PIT (Pit)
              </button>
            </div>'''

cad_html = cad_html.replace(old_tabs_toolbar, new_tabs_toolbar)

# Replace the SVG containers in thiet-ke-cad.html
old_svg_containers = '''            <!-- VIEW 1: MẶT BẰNG CẮT NGANG GIẾNG THANG (SVG PLAN) -->
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
            </div>'''

new_svg_containers = '''            <!-- VIEW 1: MẶT BẰNG CẮT NGANG GIẾNG THANG (SVG PLAN) -->
            <div id="cadPlanView" class="w-full flex items-center justify-center">
              <svg id="svgPlan" viewBox="0 0 540 440" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>

            <!-- VIEW 2: MẶT CẮT ĐỨNG TỔNG THỂ CÁC TẦNG (SVG SECTION) -->
            <div id="cadSectionView" class="w-full items-center justify-center hidden">
              <svg id="svgSection" viewBox="0 0 540 520" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>

            <!-- VIEW 3: MẶT CẮT CHI TIẾT CABIN & CỬA TẦNG (SVG CABIN) -->
            <div id="cadCabinView" class="w-full items-center justify-center hidden">
              <svg id="svgCabin" viewBox="0 0 540 440" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>

            <!-- VIEW 4: CHI TIẾT ĐÁY HỐ PIT & MÓNG GIẢM CHẤN (SVG PIT) -->
            <div id="cadPitView" class="w-full items-center justify-center hidden">
              <svg id="svgPit" viewBox="0 0 540 420" class="w-full max-w-[500px] h-auto drop-shadow-lg">
                <!-- Dynamic SVG rendered by JavaScript -->
              </svg>
            </div>'''

cad_html = cad_html.replace(old_svg_containers, new_svg_containers)

# Replace the switchCadView function and add renderCadCabinSvg + renderCadPitSvg
old_switch_cad = '''    function switchCadView(view) {
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
    }'''

new_switch_cad = '''    function switchCadView(view) {
      currentCadView = view;
      const views = {
        'plan': document.getElementById('cadPlanView'),
        'section': document.getElementById('cadSectionView'),
        'cabin': document.getElementById('cadCabinView'),
        'pit': document.getElementById('cadPitView')
      };
      const btns = {
        'plan': document.getElementById('tabPlanBtn'),
        'section': document.getElementById('tabSectionBtn'),
        'cabin': document.getElementById('tabCabinBtn'),
        'pit': document.getElementById('tabPitBtn')
      };
      const titleTag = document.getElementById('drawingTitleTag');

      const titles = {
        'plan': 'MẶT BẰNG THIẾT KẾ GIẾNG THANG (CROSS-SECTION PLAN)',
        'section': 'MẶT CẮT ĐỨNG TỔNG THỂ CÁC TẦNG & HÀNH TRÌNH (SHAFT ELEVATION)',
        'cabin': 'MẶT CẮT CHI TIẾT CABIN & CỬA TẦNG (CABIN & ENTRANCE SECTION)',
        'pit': 'MẶT CẮT CHI TIẾT ĐÁY HỐ PIT & ĐỆM GIẢM CHẤN (PIT DETAIL)'
      };

      Object.keys(views).forEach(k => {
        if (views[k]) {
          if (k === view) {
            views[k].classList.remove('hidden');
            views[k].classList.add('flex');
            btns[k].className = "px-2.5 py-1 rounded text-xs font-bold bg-gold-500 text-navy-950 transition whitespace-nowrap";
          } else {
            views[k].classList.add('hidden');
            views[k].classList.remove('flex');
            btns[k].className = "px-2.5 py-1 rounded text-xs font-bold text-slate-300 hover:text-white transition whitespace-nowrap";
          }
        }
      });

      if (titleTag && titles[view]) {
        titleTag.innerText = titles[view];
      }
      updateCadDrawing();
    }'''

cad_html = cad_html.replace(old_switch_cad, new_switch_cad)

# Update render calls in updateCadDrawing()
old_render_calls = '''      // 2. RENDER CAD DRAWINGS
      renderCadPlanSvg(W, D, CW, CD, DoorWidth, Type, Door);
      renderCadSectionSvg(Pit, Oh, Stops, FloorH, travelM);'''

new_render_calls = '''      // 2. RENDER CAD DRAWINGS (TẤT CẢ 4 MẶT CẮT KỸ THUẬT)
      renderCadPlanSvg(W, D, CW, CD, DoorWidth, Type, Door);
      renderCadSectionSvg(Pit, Oh, Stops, FloorH, travelM, CW, CD);
      renderCadCabinSvg(CW, CD, DoorWidth, Type, Door);
      renderCadPitSvg(Pit, W, D, Type);'''

cad_html = cad_html.replace(old_render_calls, new_render_calls)

# Enhanced renderCadSectionSvg with true floor heights and cabin height
new_section_svg_func = '''    // DRAW VERTICAL ELEVATION PROFILE (SECTION CÁC TẦNG & CHIỀU CAO TỔNG THỂ)
    function renderCadSectionSvg(Pit, Oh, Stops, FloorH, travelM, CW, CD) {
      const svg = document.getElementById('svgSection');
      const shaftH = Pit + (FloorH * (Stops - 1)) + Oh;
      const scaleY = 360 / shaftH;
      const cx = 260;
      const topY = 45;
      const botY = topY + shaftH * scaleY;

      const pitHeightPx = Pit * scaleY;
      const ohHeightPx = Oh * scaleY;
      const floorDistPx = FloorH * scaleY;

      const groundFloorY = botY - pitHeightPx;
      const topFloorY = topY + ohHeightPx;

      let floorsSvg = '';
      for (let i = 0; i < Stops; i++) {
        const fy = groundFloorY - i * floorDistPx;
        const elev = (i * FloorH / 1000).toFixed(3);
        const sign = (i === 0) ? '±0.000' : `+${elev}`;
        
        // Floor slab
        floorsSvg += `
          <!-- Tầng ${i + 1} -->
          <line x1="${cx - 140}" y1="${fy}" x2="${cx - 65}" y2="${fy}" stroke="#ffffff" stroke-width="3" />
          <line x1="${cx - 140}" y1="${fy + 10}" x2="${cx - 65}" y2="${fy + 10}" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,2" />
          <!-- Ký hiệu mốc cao độ trắc địa tam giác -->
          <path d="M ${cx - 150} ${fy} L ${cx - 140} ${fy - 6} L ${cx - 140} ${fy + 6} Z" fill="#00e5ff" />
          <text x="${cx - 155}" y="${fy + 4}" fill="#00e5ff" font-size="10" font-family="monospace" text-anchor="end" font-weight="bold">T${i+1} [${sign}]</text>
          <!-- Cửa tầng tại mỗi tầng -->
          <rect x="${cx - 65}" y="${fy - 32}" width="6" height="32" fill="#ff4081" stroke="#ffffff" stroke-width="0.5" />
        `;
      }

      // Cabin height in pixels (standard cabin clear height 2200mm)
      const cabinH = 2200;
      const cabinHPx = Math.max(45, cabinH * scaleY);
      const cabinY = groundFloorY - floorDistPx - cabinHPx;

      svg.innerHTML = `
        <defs>
          <marker id="secTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>

        <!-- KHUNG THÀNH GIẾNG THANG (SHAFT VERTICAL WALLS) -->
        <rect x="${cx - 65}" y="${topY}" width="130" height="${shaftH * scaleY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="2.5" />

        <!-- ĐÁY HỐ PIT & ĐỆM PU -->
        <rect x="${cx - 65}" y="${botY - 6}" width="130" height="6" fill="#ef4444" />
        <rect x="${cx - 35}" y="${botY - 18}" width="22" height="12" fill="#ffd600" stroke="#ffffff" stroke-width="1" />
        <rect x="${cx + 15}" y="${botY - 18}" width="22" height="12" fill="#ffd600" stroke="#ffffff" stroke-width="1" />
        <text x="${cx}" y="${botY - 22}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle">ĐỆM PU</text>

        <!-- CÁC MẶT SÀN TẦNG VÀ CỬA TẦNG -->
        ${floorsSvg}

        <!-- CABIN VỊ TRÍ TẦNG 2 ĐANG DI CHUYỂN -->
        <g>
          <rect x="${cx - 45}" y="${cabinY}" width="90" height="${cabinHPx}" fill="#0d241d" stroke="#00e676" stroke-width="2" />
          <!-- Vách kính / Inox -->
          <line x1="${cx - 45}" y1="${cabinY}" x2="${cx + 45}" y2="${cabinY + cabinHPx}" stroke="#00e676" stroke-width="0.5" stroke-opacity="0.3" />
          <text x="${cx}" y="${cabinY + cabinHPx/2 + 3}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">CABIN H=2200</text>
          <!-- Cửa cabin -->
          <rect x="${cx - 45}" y="${cabinY + cabinHPx - 30}" width="4" height="30" fill="#ff4081" />
        </g>

        <!-- ĐỘNG CƠ MÁY KÉO MRL TRÊN ĐỈNH OH -->
        <g>
          <!-- Dầm thép chịu lực máy kéo -->
          <rect x="${cx - 55}" y="${topY + 12}" width="110" height="8" fill="#475569" stroke="#ffffff" stroke-width="1" />
          <rect x="${cx - 35}" y="${topY + 2}" width="70" height="20" fill="#0f172a" stroke="#ffd600" stroke-width="1.5" />
          <!-- Puly kéo -->
          <circle cx="${cx - 15}" cy="${topY + 12}" r="10" fill="#d97706" stroke="#ffffff" stroke-width="1.5" />
          <circle cx="${cx + 15}" cy="${topY + 12}" r="7" fill="#94a3b8" />
          <text x="${cx}" y="${topY - 3}" fill="#ffd600" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">MÁY KÉO MRL</text>
          <!-- Cáp tải 2:1 -->
          <line x1="${cx - 25}" y1="${topY + 12}" x2="${cx - 25}" y2="${cabinY}" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
          <line x1="${cx + 22}" y1="${topY + 12}" x2="${cx + 22}" y2="${botY - 80}" stroke="#ffd600" stroke-width="1.5" stroke-dasharray="2,2" />
        </g>

        <!-- ĐỐI TRỌNG TREO ĐỐI XỨNG -->
        <g>
          <rect x="${cx + 15}" y="${botY - 110}" width="18" height="40" fill="#ffd600" fill-opacity="0.3" stroke="#ffd600" stroke-width="1.5" />
          <text x="${cx + 24}" y="${botY - 90}" fill="#ffd600" font-size="7" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${cx+24} ${botY-90})">CWT</text>
        </g>

        <!-- CỘT KÍCH THƯỚC BÊN PHẢI (DIMENSIONS) -->
        <!-- Dim OH -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${cx + 65}" y1="${topY}" x2="${cx + 90}" y2="${topY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 65}" y1="${topFloorY}" x2="${cx + 90}" y2="${topFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 85}" y1="${topY}" x2="${cx + 85}" y2="${topFloorY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 95}" y="${topY + ohHeightPx/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">OH = ${Oh} mm</text>
        </g>

        <!-- Dim Chiều cao tầng điển hình -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${cx + 65}" y1="${groundFloorY - floorDistPx}" x2="${cx + 90}" y2="${groundFloorY - floorDistPx}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 65}" y1="${groundFloorY}" x2="${cx + 90}" y2="${groundFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 85}" y1="${groundFloorY - floorDistPx}" x2="${cx + 85}" y2="${groundFloorY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 95}" y="${groundFloorY - floorDistPx/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">TẦNG = ${FloorH} mm</text>
        </g>

        <!-- Dim PIT -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${cx + 65}" y1="${groundFloorY}" x2="${cx + 90}" y2="${groundFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 65}" y1="${botY}" x2="${cx + 90}" y2="${botY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 85}" y1="${groundFloorY}" x2="${cx + 85}" y2="${botY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 95}" y="${groundFloorY + pitHeightPx/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">PIT = ${Pit} mm</text>
        </g>

        <!-- Dim Tổng Hành Trình Travel H -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${cx + 85}" y1="${topFloorY}" x2="${cx + 140}" y2="${topFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 85}" y1="${groundFloorY}" x2="${cx + 140}" y2="${groundFloorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx + 135}" y1="${topFloorY}" x2="${cx + 135}" y2="${groundFloorY}" marker-start="url(#secTick)" marker-end="url(#secTick)" />
          <text x="${cx + 145}" y="${groundFloorY - (groundFloorY - topFloorY)/2 + 4}" fill="#00e676" font-size="11" font-family="monospace" font-weight="bold">HÀNH TRÌNH = ${travelM.toFixed(2)} m</text>
        </g>
      `;
    }'''

# Replace old renderCadSectionSvg
cad_html = re.sub(
    r'// DRAW VERTICAL ELEVATION PROFILE \(SECTION\).*?function renderCadSectionSvg\(Pit, Oh, Stops, FloorH, travelM\) \{.*?^\s*\}',
    new_section_svg_func,
    cad_html,
    flags=re.DOTALL | re.MULTILINE
)

# Now add renderCadCabinSvg and renderCadPitSvg right before calculateBoq
new_cabin_and_pit_funcs = '''
    // DRAW CABIN & ENTRANCE DETAIL (MẶT CẮT CHI TIẾT CABIN & CỬA TẦNG)
    function renderCadCabinSvg(CW, CD, DoorWidth, Type, Door) {
      const svg = document.getElementById('svgCabin');
      if (!svg) return;
      const cx = 270;
      const cy = 210;

      const doorH = 2100;
      const cabinH = 2200;
      const scale = 0.13; // scale mm to px

      const sDoorW = DoorWidth * scale;
      const sDoorH = doorH * scale;
      const sCW = CW * scale;
      const sCH = cabinH * scale;

      const floorY = cy + sCH / 2;
      const ceilY = floorY - sCH;
      const doorTopY = floorY - sDoorH;

      const x0 = cx - sCW / 2;
      const x1 = cx + sCW / 2;

      svg.innerHTML = `
        <defs>
          <marker id="cabTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>

        <!-- SÀN HOÀN THIỆN ĐÓN KHÁCH TẠI SẢNH -->
        <line x1="30" y1="${floorY}" x2="510" y2="${floorY}" stroke="#ffffff" stroke-width="4" />
        <text x="50" y="${floorY + 16}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">MẶT SÀN TẦNG [±0.000]</text>

        <!-- VÁCH CABIN TRONG SUỐT HOẶC INOX -->
        <rect x="${x0}" y="${ceilY}" width="${sCW}" height="${sCH}" fill="#0d241d" stroke="#00e676" stroke-width="2.5" />

        <!-- TRẦN GIẢ LED AMBIENT & QUẠT THÔNG GIÓ -->
        <rect x="${x0}" y="${ceilY}" width="${sCW}" height="14" fill="#0f172a" stroke="#ffd600" stroke-width="1.5" />
        <circle cx="${cx - 25}" cy="${ceilY + 7}" r="4" fill="#ffd600" />
        <circle cx="${cx + 25}" cy="${ceilY + 7}" r="4" fill="#ffd600" />
        <text x="${cx}" y="${ceilY - 8}" fill="#ffd600" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">TRẦN LED CHIẾU SÁNG & QUẠT NÓC</text>

        <!-- KHUNG DẦM NÓC CABIN (UPPER BEAM) -->
        <rect x="${x0 - 8}" y="${ceilY - 14}" width="${sCW + 16}" height="8" fill="#475569" stroke="#ffffff" stroke-width="1" />

        <!-- TAY VỊN INOX TRÒN PHI 38 CAO +900MM -->
        <line x1="${x0 + 10}" y1="${floorY - 900*scale}" x2="${x1 - 10}" y2="${floorY - 900*scale}" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
        <text x="${x0 + 15}" y="${floorY - 900*scale - 6}" fill="#ffffff" font-size="8" font-family="monospace font-weight="bold">TAY VỊN (+900)</text>

        <!-- BẢNG ĐIỀU KHIỂN COP TRONG CABIN (NÚT BẤM CẢM ỨNG) -->
        <rect x="${x1 - 18}" y="${floorY - 1400*scale}" width="12" height="65" fill="#1e293b" stroke="#ffd600" stroke-width="1" />
        <circle cx="${x1 - 12}" cy="${floorY - 1400*scale + 12}" r="3" fill="#ff4081" />
        <circle cx="${x1 - 12}" cy="${floorY - 1400*scale + 24}" r="2" fill="#ffd600" />
        <circle cx="${x1 - 12}" cy="${floorY - 1400*scale + 36}" r="2" fill="#00e5ff" />
        <circle cx="${x1 - 12}" cy="${floorY - 1400*scale + 48}" r="2" fill="#00e676" />
        <text x="${x1 - 24}" y="${floorY - 1400*scale + 35}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="end">BẢNG COP</text>

        <!-- HỆ KHUNG CỬA TẦNG VÀ CỬA CABIN -->
        <rect x="${cx - sDoorW/2}" y="${doorTopY}" width="${sDoorW}" height="${sDoorH}" fill="rgba(255, 64, 129, 0.15)" stroke="#ff4081" stroke-width="2" />
        <line x1="${cx}" y1="${doorTopY}" x2="${cx}" y2="${floorY}" stroke="#ff4081" stroke-width="2" stroke-dasharray="3,3" />

        <!-- NÚT BẤM GỌI TẦNG BÊN NGOÀI SẢNH (LANDING CALL BOX +1050MM) -->
        <rect x="${x0 - 32}" y="${floorY - 1050*scale - 12}" width="14" height="26" fill="#1e293b" stroke="#00e5ff" stroke-width="1.5" />
        <circle cx="${x0 - 25}" cy="${floorY - 1050*scale - 4}" r="2.5" fill="#ff4081" />
        <circle cx="${x0 - 25}" cy="${floorY - 1050*scale + 5}" r="2.5" fill="#00e5ff" />
        <text x="${x0 - 38}" y="${floorY - 1050*scale}" fill="#00e5ff" font-size="8" font-family="monospace" text-anchor="end">NÚT GỌI (+1050)</text>

        <!-- SÀN ĐÁ HOA CƯƠNG NGHỆ THUẬT -->
        <rect x="${x0}" y="${floorY - 6}" width="${sCW}" height="6" fill="#d97706" />

        <!-- DIMS KÍCH THƯỚC CHI TIẾT -->
        <!-- Dim Chiều cao thông thủy Cabin CH -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${x1 + 10}" y1="${ceilY}" x2="${x1 + 35}" y2="${ceilY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x1 + 10}" y1="${floorY}" x2="${x1 + 35}" y2="${floorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x1 + 30}" y1="${ceilY}" x2="${x1 + 30}" y2="${floorY}" marker-start="url(#cabTick)" marker-end="url(#cabTick)" />
          <text x="${x1 + 40}" y="${(ceilY + floorY)/2 + 4}" fill="#00e676" font-size="10" font-family="monospace" font-weight="bold">CH = ${cabinH} mm</text>
        </g>

        <!-- Dim Chiều cao cửa tầng JH -->
        <g stroke="#ff4081" stroke-width="1">
          <line x1="${cx - sDoorW/2}" y1="${doorTopY}" x2="${cx - sDoorW/2 - 25}" y2="${doorTopY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx - sDoorW/2}" y1="${floorY}" x2="${cx - sDoorW/2 - 25}" y2="${floorY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${cx - sDoorW/2 - 20}" y1="${doorTopY}" x2="${cx - sDoorW/2 - 20}" y2="${floorY}" marker-start="url(#cabTick)" marker-end="url(#cabTick)" />
          <text x="${cx - sDoorW/2 - 28}" y="${(doorTopY + floorY)/2 + 4}" fill="#ff4081" font-size="9" font-family="monospace" text-anchor="end" font-weight="bold">JH = ${doorH} mm</text>
        </g>

        <!-- Dim Chiều rộng cửa mở OP -->
        <g stroke="#ff4081" stroke-width="1">
          <line x1="${cx - sDoorW/2}" y1="${floorY + 28}" x2="${cx + sDoorW/2}" y2="${floorY + 28}" marker-start="url(#cabTick)" marker-end="url(#cabTick)" />
          <text x="${cx}" y="${floorY + 42}" fill="#ff4081" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">ĐỘ MỞ CỬA OP = ${DoorWidth} mm</text>
        </g>

        <!-- Dim Chiều rộng cabin CW -->
        <g stroke="#00e676" stroke-width="1">
          <line x1="${x0}" y1="${floorY + 54}" x2="${x1}" y2="${floorY + 54}" marker-start="url(#cabTick)" marker-end="url(#cabTick)" />
          <text x="${cx}" y="${floorY + 68}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">RỘNG CABIN CW = ${CW} mm</text>
        </g>
      `;
    }

    // DRAW PIT & BUFFER DETAIL (CHI TIẾT MẶT CẮT ĐÁY HỐ PIT & ĐỆM GIẢM CHẤN)
    function renderCadPitSvg(Pit, W, D, Type) {
      const svg = document.getElementById('svgPit');
      if (!svg) return;
      const cx = 270;
      const groundY = 90;

      // Scale pit height
      const scale = 0.22;
      const pitPx = Math.max(70, Pit * scale);
      const pitBottomY = groundY + pitPx;

      const pitWidthPx = 340;
      const x0 = cx - pitWidthPx / 2;
      const x1 = cx + pitWidthPx / 2;

      svg.innerHTML = `
        <defs>
          <marker id="pitTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>

        <!-- MẶT SÀN TẦNG 1 [±0.000] -->
        <line x1="20" y1="${groundY}" x2="${x0}" y2="${groundY}" stroke="#ffffff" stroke-width="4" />
        <line x1="${x1}" y1="${groundY}" x2="520" y2="${groundY}" stroke="#ffffff" stroke-width="4" />
        <text x="30" y="${groundY - 8}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">SÀN TẦNG 1 [±0.000]</text>

        <!-- KẾT CẤU BÊ TÔNG / THÉP HỐ PIT -->
        <path d="M ${x0} ${groundY} L ${x0} ${pitBottomY} L ${x1} ${pitBottomY} L ${x1} ${groundY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="3" />
        <!-- Lớp bê tông lót đáy móng dày 150mm -->
        <rect x="${x0 - 20}" y="${pitBottomY}" width="${pitWidthPx + 40}" height="20" fill="#334155" stroke="#64748b" stroke-width="1" />
        <text x="${cx}" y="${pitBottomY + 14}" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">MÓNG BÊ TÔNG ĐÁY HỐ / CHỐNG THẤM ĐA TẦNG</text>

        <!-- BẢN MÃ THÉP LIÊN KẾT ĐÁY HỐ & BULONG HILTI -->
        <rect x="${cx - 95}" y="${pitBottomY - 6}" width="50" height="6" fill="#64748b" stroke="#ffffff" stroke-width="1" />
        <rect x="${cx + 45}" y="${pitBottomY - 6}" width="50" height="6" fill="#64748b" stroke="#ffffff" stroke-width="1" />
        <!-- Bulong Hilti neo sâu -->
        <line x1="${cx - 85}" y1="${pitBottomY - 6}" x2="${cx - 85}" y2="${pitBottomY + 12}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx - 55}" y1="${pitBottomY - 6}" x2="${cx - 55}" y2="${pitBottomY + 12}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx + 55}" y1="${pitBottomY - 6}" x2="${cx + 55}" y2="${pitBottomY + 12}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx + 85}" y1="${pitBottomY - 6}" x2="${cx + 85}" y2="${pitBottomY + 12}" stroke="#ffd600" stroke-width="2" />

        <!-- 2 ĐỆM GIẢM CHẤN CAO SU POLYURETHANE (PU) TIÊU CHUẨN EN 81-20/50 -->
        <!-- Đệm Trái (Dưới Cabin) -->
        <g>
          <rect x="${cx - 90}" y="${pitBottomY - 42}" width="40" height="36" rx="4" fill="#ffd600" stroke="#ffffff" stroke-width="1.5" />
          <line x1="${cx - 90}" y1="${pitBottomY - 30}" x2="${cx - 50}" y2="${pitBottomY - 30}" stroke="#ffffff" stroke-dasharray="2,2" />
          <line x1="${cx - 90}" y1="${pitBottomY - 18}" x2="${cx - 50}" y2="${pitBottomY - 18}" stroke="#ffffff" stroke-dasharray="2,2" />
          <text x="${cx - 70}" y="${pitBottomY - 48}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">ĐỆM PU CABIN</text>
        </g>

        <!-- Đệm Phải (Dưới Đối Trọng) -->
        <g>
          <rect x="${cx + 50}" y="${pitBottomY - 42}" width="40" height="36" rx="4" fill="#ffd600" stroke="#ffffff" stroke-width="1.5" />
          <line x1="${cx + 50}" y1="${pitBottomY - 30}" x2="${cx + 90}" y2="${pitBottomY - 30}" stroke="#ffffff" stroke-dasharray="2,2" />
          <line x1="${cx + 50}" y1="${pitBottomY - 18}" x2="${cx + 90}" y2="${pitBottomY - 18}" stroke="#ffffff" stroke-dasharray="2,2" />
          <text x="${cx + 70}" y="${pitBottomY - 48}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">ĐỆM PU CWT</text>
        </g>

        <!-- CHÂN RAY DẪN HƯỚNG T-RAILS NEO ĐÁY HỐ -->
        <rect x="${x0 + 12}" y="${groundY - 30}" width="10" height="${pitPx + 30}" fill="#00e5ff" stroke="#ffffff" stroke-width="1" />
        <rect x="${x1 - 22}" y="${groundY - 30}" width="10" height="${pitPx + 30}" fill="#00e5ff" stroke="#ffffff" stroke-width="1" />
        <text x="${x0 + 8}" y="${groundY + 30}" fill="#00e5ff" font-size="8" font-family="monospace" text-anchor="end">RAY T-RAIL</text>

        <!-- CÔNG TẮC AN TOÀN PIT STOP SWITCH & THANG BẢO TRÌ -->
        <g>
          <!-- Hộp công tắc Stop đáy hố -->
          <rect x="${x0 + 35}" y="${pitBottomY - 50}" width="18" height="26" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" />
          <circle cx="${x0 + 44}" cy="${pitBottomY - 37}" r="5" fill="#ef4444" />
          <text x="${x0 + 44}" y="${pitBottomY - 55}" fill="#ef4444" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">PIT STOP</text>
        </g>

        <!-- ĐÈN CHIẾU SÁNG HỐ THANG CHỐNG ẨM 24V -->
        <circle cx="${x1 - 40}" cy="${groundY + 35}" r="7" fill="#fbbf24" stroke="#ffffff" stroke-width="1" />
        <text x="${x1 - 40}" y="${groundY + 54}" fill="#fbbf24" font-size="7" font-family="monospace" text-anchor="middle">ĐÈN 24V</text>

        <!-- KHOẢNG KHÔNG GIAN SINH TỒN AN TOÀN >= 500MM -->
        <rect x="${cx - 40}" y="${pitBottomY - 55}" width="80" height="50" fill="rgba(0, 230, 118, 0.1)" stroke="#00e676" stroke-width="1" stroke-dasharray="3,3" />
        <text x="${cx}" y="${pitBottomY - 30}" fill="#00e676" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">KHÔNG GIAN AN TOÀN</text>
        <text x="${cx}" y="${pitBottomY - 18}" fill="#00e676" font-size="7" font-family="monospace" text-anchor="middle">QCVN 02:2019 (≥500mm)</text>

        <!-- DIMENSION CHIỀU SÂU HỐ PIT -->
        <g stroke="#00e5ff" stroke-width="1">
          <line x1="${x1}" y1="${groundY}" x2="${x1 + 35}" y2="${groundY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x1}" y1="${pitBottomY}" x2="${x1 + 35}" y2="${pitBottomY}" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${x1 + 28}" y1="${groundY}" x2="${x1 + 28}" y2="${pitBottomY}" marker-start="url(#pitTick)" marker-end="url(#pitTick)" />
          <text x="${x1 + 36}" y="${(groundY + pitBottomY)/2 + 4}" fill="#00e5ff" font-size="11" font-family="monospace" font-weight="bold">HỐ PIT = ${Pit} mm</text>
        </g>
      `;
    }
'''

# Insert new functions into thiet-ke-cad.html before calculateBoq
cad_html = cad_html.replace('    // CALCULATE BILL OF QUANTITIES & PRICING', new_cabin_and_pit_funcs + '\n    // CALCULATE BILL OF QUANTITIES & PRICING')

with open(cad_file, "w", encoding="utf-8") as f:
    f.write(cad_html)

print("Upgraded thiet-ke-cad.html with 4-View AutoCAD Engine successfully.")
