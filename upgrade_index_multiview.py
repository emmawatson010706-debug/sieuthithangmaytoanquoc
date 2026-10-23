# -*- coding: utf-8 -*-
import os
import re

DIR = r"D:\sieuthithangmaytoanquoc"
index_file = os.path.join(DIR, "index.html")

with open(index_file, "r", encoding="utf-8") as f:
    index_html = f.read()

# 1. Update the tabs toolbar in index.html
old_home_tabs = '''            <!-- Switch buttons -->
            <div class="flex items-center gap-1 bg-navy-950 p-0.5 rounded border border-slate-700">
              <button id="homeTabPlan" onclick="homeSwitchCad('plan')" class="px-2.5 py-1 rounded text-[11px] font-bold bg-gold-500 text-navy-950 transition">
                📐 Mặt Bằng (Plan)
              </button>
              <button id="homeTabSec" onclick="homeSwitchCad('section')" class="px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 hover:text-white transition">
                📏 Mặt Cắt (Section)
              </button>
            </div>'''

new_home_tabs = '''            <!-- 4 Tab Mặt Cắt Kỹ Thuật Độc Quyền -->
            <div class="flex flex-wrap items-center gap-1 bg-navy-950 p-0.5 rounded border border-slate-700 overflow-x-auto">
              <button id="homeTabPlan" onclick="homeSwitchCad('plan')" class="px-2 py-1 rounded text-[10px] font-bold bg-gold-500 text-navy-950 transition whitespace-nowrap">
                📐 1. Mặt Bằng (Plan)
              </button>
              <button id="homeTabSec" onclick="homeSwitchCad('section')" class="px-2 py-1 rounded text-[10px] font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                📏 2. Các Tầng (Shaft)
              </button>
              <button id="homeTabCab" onclick="homeSwitchCad('cabin')" class="px-2 py-1 rounded text-[10px] font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                🚪 3. Cabin & Cửa
              </button>
              <button id="homeTabPit" onclick="homeSwitchCad('pit')" class="px-2 py-1 rounded text-[10px] font-bold text-slate-300 hover:text-white transition whitespace-nowrap">
                🧱 4. Đáy Hố PIT
              </button>
            </div>'''

index_html = index_html.replace(old_home_tabs, new_home_tabs)

# 2. Update the SVG containers in index.html
old_home_svgs = '''            <!-- Plan SVG -->
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
            </div>'''

new_home_svgs = '''            <!-- 1. Plan SVG -->
            <div id="homeCadPlanView" class="w-full flex items-center justify-center">
              <svg id="homeSvgPlan" viewBox="0 0 540 400" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>

            <!-- 2. Section SVG -->
            <div id="homeCadSecView" class="w-full items-center justify-center hidden">
              <svg id="homeSvgSec" viewBox="0 0 540 480" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>

            <!-- 3. Cabin SVG -->
            <div id="homeCadCabView" class="w-full items-center justify-center hidden">
              <svg id="homeSvgCab" viewBox="0 0 540 420" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>

            <!-- 4. Pit SVG -->
            <div id="homeCadPitView" class="w-full items-center justify-center hidden">
              <svg id="homeSvgPit" viewBox="0 0 540 400" class="w-full max-w-[460px] h-auto drop-shadow-md">
                <!-- Live SVG rendered by JS -->
              </svg>
            </div>'''

index_html = index_html.replace(old_home_svgs, new_home_svgs)

# 3. Update JavaScript functions in index.html
old_home_js = '''    let homeCurrentCadView = 'plan';

    function homeSwitchCad(view) {
      homeCurrentCadView = view;
      const planView = document.getElementById('homeCadPlanView');
      const secView = document.getElementById('homeCadSecView');
      const tabPlan = document.getElementById('homeTabPlan');
      const tabSec = document.getElementById('homeTabSec');

      if (view === 'plan') {
        planView.classList.remove('hidden');
        secView.classList.add('hidden');
        tabPlan.className = "px-2.5 py-1 rounded text-[11px] font-bold bg-gold-500 text-navy-950 transition";
        tabSec.className = "px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 hover:text-white transition";
      } else {
        planView.classList.add('hidden');
        secView.classList.remove('hidden');
        tabSec.className = "px-2.5 py-1 rounded text-[11px] font-bold bg-gold-500 text-navy-950 transition";
        tabPlan.className = "px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 hover:text-white transition";
      }
      homeUpdateCad();
    }'''

new_home_js = '''    let homeCurrentCadView = 'plan';

    function homeSwitchCad(view) {
      homeCurrentCadView = view;
      const views = {
        'plan': document.getElementById('homeCadPlanView'),
        'section': document.getElementById('homeCadSecView'),
        'cabin': document.getElementById('homeCadCabView'),
        'pit': document.getElementById('homeCadPitView')
      };
      const tabs = {
        'plan': document.getElementById('homeTabPlan'),
        'section': document.getElementById('homeTabSec'),
        'cabin': document.getElementById('homeTabCab'),
        'pit': document.getElementById('homeTabPit')
      };

      Object.keys(views).forEach(k => {
        if (views[k]) {
          if (k === view) {
            views[k].classList.remove('hidden');
            views[k].classList.add('flex');
            tabs[k].className = "px-2 py-1 rounded text-[10px] font-bold bg-gold-500 text-navy-950 transition whitespace-nowrap";
          } else {
            views[k].classList.add('hidden');
            views[k].classList.remove('flex');
            tabs[k].className = "px-2 py-1 rounded text-[10px] font-bold text-slate-300 hover:text-white transition whitespace-nowrap";
          }
        }
      });
      homeUpdateCad();
    }'''

index_html = index_html.replace(old_home_js, new_home_js)

# Update homeUpdateCad render calls to render all 4 views
old_home_renders = '''      // Render Plan SVG
      renderHomePlanSvg(W, D, CW, CD, DoorWidth, Type);
      // Render Section SVG
      renderHomeSecSvg(Pit, Oh, Stops, 3300);'''

new_home_renders = '''      // Render all 4 CAD Views
      renderHomePlanSvg(W, D, CW, CD, DoorWidth, Type);
      renderHomeSecSvg(Pit, Oh, Stops, 3300, travelM, CW, CD);
      renderHomeCabSvg(CW, CD, DoorWidth, Type);
      renderHomePitSvg(Pit, W, D, Type);'''

index_html = index_html.replace(old_home_renders, new_home_renders)

# Add renderHomeCabSvg and renderHomePitSvg and enhanced renderHomeSecSvg
new_home_svg_code = '''    function renderHomeSecSvg(Pit, Oh, Stops, FloorH, travelM, CW, CD) {
      const svg = document.getElementById('homeSvgSec');
      if (!svg) return;
      const shaftH = Pit + (FloorH * (Stops - 1)) + Oh;
      const scaleY = 320 / shaftH;
      const cx = 270;
      const topY = 40;
      const botY = topY + shaftH * scaleY;
      const pitHeightPx = Pit * scaleY;
      const floorDistPx = FloorH * scaleY;
      const groundFloorY = botY - pitHeightPx;
      const cabinH = 2200;
      const cabinHPx = Math.max(40, cabinH * scaleY);

      let floorsSvg = '';
      for (let i = 0; i < Stops; i++) {
        const fy = groundFloorY - i * floorDistPx;
        const elev = (i * FloorH / 1000).toFixed(1);
        floorsSvg += `
          <line x1="${cx - 110}" y1="${fy}" x2="${cx - 50}" y2="${fy}" stroke="#ffffff" stroke-width="2.5" />
          <text x="${cx - 115}" y="${fy + 4}" fill="#00e5ff" font-size="9" font-family="monospace" text-anchor="end">T${i+1} [${i===0 ? '±0.0' : '+'+elev+'m'}]</text>
          <rect x="${cx - 50}" y="${fy - 25}" width="4" height="25" fill="#ff4081" />
        `;
      }

      svg.innerHTML = `
        <rect x="${cx - 50}" y="${topY}" width="100" height="${shaftH * scaleY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="2.5" />
        <rect x="${cx - 50}" y="${botY - 4}" width="100" height="4" fill="#ef4444" />
        <rect x="${cx - 25}" y="${botY - 14}" width="18" height="10" fill="#ffd600" />
        <rect x="${cx + 7}" y="${botY - 14}" width="18" height="10" fill="#ffd600" />
        <text x="${cx}" y="${botY - 16}" fill="#ffd600" font-size="7" font-family="monospace" text-anchor="middle">ĐỆM PU</text>
        ${floorsSvg}
        <!-- Cabin -->
        <rect x="${cx - 35}" y="${groundFloorY - floorDistPx - cabinHPx}" width="70" height="${cabinHPx}" fill="#0d241d" stroke="#00e676" stroke-width="1.5" />
        <text x="${cx}" y="${groundFloorY - floorDistPx - cabinHPx/2 + 3}" fill="#00e676" font-size="9" font-family="monospace" text-anchor="middle">CABIN H=2200</text>
        <!-- Motor MRL -->
        <rect x="${cx - 35}" y="${topY + 8}" width="70" height="18" fill="#0f172a" stroke="#ffd600" stroke-width="1.5" />
        <circle cx="${cx - 15}" cy="${topY + 17}" r="8" fill="#d97706" />
        <text x="${cx}" y="${topY + 4}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle">MÁY KÉO MRL</text>
        <!-- Dims -->
        <text x="${cx + 56}" y="${topY + 20}" fill="#00e5ff" font-size="9" font-family="monospace">OH=${Oh}</text>
        <text x="${cx + 56}" y="${groundFloorY - floorDistPx/2}" fill="#00e5ff" font-size="9" font-family="monospace">H=${FloorH}</text>
        <text x="${cx + 56}" y="${groundFloorY + pitHeightPx/2}" fill="#00e5ff" font-size="9" font-family="monospace">PIT=${Pit}</text>
      `;
    }

    function renderHomeCabSvg(CW, CD, DoorWidth, Type) {
      const svg = document.getElementById('homeSvgCab');
      if (!svg) return;
      const cx = 270;
      const floorY = 320;
      const sCW = CW * 0.12;
      const sCH = 2200 * 0.12;
      const sDoorW = DoorWidth * 0.12;
      const sDoorH = 2100 * 0.12;
      const ceilY = floorY - sCH;
      const doorTopY = floorY - sDoorH;
      const x0 = cx - sCW / 2;
      const x1 = cx + sCW / 2;

      svg.innerHTML = `
        <line x1="40" y1="${floorY}" x2="500" y2="${floorY}" stroke="#ffffff" stroke-width="3" />
        <text x="50" y="${floorY + 14}" fill="#00e5ff" font-size="9" font-family="monospace">SÀN TẦNG [±0.000]</text>
        <rect x="${x0}" y="${ceilY}" width="${sCW}" height="${sCH}" fill="#0d241d" stroke="#00e676" stroke-width="2" />
        <!-- Trần LED -->
        <rect x="${x0}" y="${ceilY}" width="${sCW}" height="12" fill="#0f172a" stroke="#ffd600" />
        <circle cx="${cx - 20}" cy="${ceilY + 6}" r="3" fill="#ffd600" />
        <circle cx="${cx + 20}" cy="${ceilY + 6}" r="3" fill="#ffd600" />
        <text x="${cx}" y="${ceilY - 6}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle">TRẦN CHIẾU SÁNG LED</text>
        <!-- Tay vịn -->
        <line x1="${x0 + 8}" y1="${floorY - 900*0.12}" x2="${x1 - 8}" y2="${floorY - 900*0.12}" stroke="#ffffff" stroke-width="2.5" />
        <!-- Cửa -->
        <rect x="${cx - sDoorW/2}" y="${doorTopY}" width="${sDoorW}" height="${sDoorH}" fill="rgba(255, 64, 129, 0.15)" stroke="#ff4081" stroke-width="1.5" />
        <line x1="${cx}" y1="${doorTopY}" x2="${cx}" y2="${floorY}" stroke="#ff4081" stroke-dasharray="2,2" />
        <text x="${cx}" y="${doorTopY - 6}" fill="#ff4081" font-size="8" font-family="monospace" text-anchor="middle">CỬA TẦNG JH=2100</text>
        <!-- COP -->
        <rect x="${x1 - 14}" y="${floorY - 140}" width="8" height="50" fill="#1e293b" stroke="#ffd600" />
        <!-- Nút gọi -->
        <rect x="${x0 - 24}" y="${floorY - 120}" width="10" height="20" fill="#1e293b" stroke="#00e5ff" />
        <text x="${x0 - 28}" y="${floorY - 105}" fill="#00e5ff" font-size="7" font-family="monospace" text-anchor="end">GỌI (+1050)</text>
        <!-- Dims -->
        <text x="${x1 + 10}" y="${(ceilY + floorY)/2}" fill="#00e676" font-size="9" font-family="monospace">CH=2200mm</text>
        <text x="${cx}" y="${floorY + 28}" fill="#00e676" font-size="9" font-family="monospace" text-anchor="middle">CW=${CW}mm (RỘNG CABIN)</text>
      `;
    }

    function renderHomePitSvg(Pit, W, D, Type) {
      const svg = document.getElementById('homeSvgPit');
      if (!svg) return;
      const cx = 270;
      const groundY = 80;
      const scale = 0.2;
      const pitPx = Math.max(65, Pit * scale);
      const pitBottomY = groundY + pitPx;
      const x0 = cx - 150;
      const x1 = cx + 150;

      svg.innerHTML = `
        <line x1="30" y1="${groundY}" x2="${x0}" y2="${groundY}" stroke="#ffffff" stroke-width="3" />
        <line x1="${x1}" y1="${groundY}" x2="510" y2="${groundY}" stroke="#ffffff" stroke-width="3" />
        <text x="40" y="${groundY - 8}" fill="#00e5ff" font-size="9" font-family="monospace">SÀN TẦNG 1 [±0.000]</text>
        <path d="M ${x0} ${groundY} L ${x0} ${pitBottomY} L ${x1} ${pitBottomY} L ${x1} ${groundY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="2.5" />
        <!-- Lót bê tông -->
        <rect x="${x0 - 15}" y="${pitBottomY}" width="330" height="18" fill="#334155" />
        <text x="${cx}" y="${pitBottomY + 12}" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">BÊ TÔNG MÓNG ĐÁY HỐ / CHỐNG THẤM</text>
        <!-- Đệm PU -->
        <rect x="${cx - 70}" y="${pitBottomY - 32}" width="32" height="28" rx="3" fill="#ffd600" stroke="#ffffff" />
        <rect x="${cx + 38}" y="${pitBottomY - 32}" width="32" height="28" rx="3" fill="#ffd600" stroke="#ffffff" />
        <text x="${cx - 54}" y="${pitBottomY - 36}" fill="#ffd600" font-size="7" font-family="monospace" text-anchor="middle">ĐỆM PU CABIN</text>
        <text x="${cx + 54}" y="${pitBottomY - 36}" fill="#ffd600" font-size="7" font-family="monospace" text-anchor="middle">ĐỆM PU CWT</text>
        <!-- Bulong Hilti -->
        <line x1="${cx - 65}" y1="${pitBottomY - 4}" x2="${cx - 65}" y2="${pitBottomY + 10}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx - 43}" y1="${pitBottomY - 4}" x2="${cx - 43}" y2="${pitBottomY + 10}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx + 43}" y1="${pitBottomY - 4}" x2="${cx + 43}" y2="${pitBottomY + 10}" stroke="#ffd600" stroke-width="2" />
        <line x1="${cx + 65}" y1="${pitBottomY - 4}" x2="${cx + 65}" y2="${pitBottomY + 10}" stroke="#ffd600" stroke-width="2" />
        <!-- Ray T -->
        <rect x="${x0 + 10}" y="${groundY - 20}" width="8" height="${pitPx + 20}" fill="#00e5ff" />
        <rect x="${x1 - 18}" y="${groundY - 20}" width="8" height="${pitPx + 20}" fill="#00e5ff" />
        <!-- Công tắc an toàn -->
        <rect x="${x0 + 26}" y="${pitBottomY - 40}" width="14" height="20" fill="#1e293b" stroke="#ef4444" />
        <circle cx="${x0 + 33}" cy="${pitBottomY - 30}" r="4" fill="#ef4444" />
        <text x="${x0 + 33}" y="${pitBottomY - 44}" fill="#ef4444" font-size="6" font-family="monospace" text-anchor="middle">STOP</text>
        <!-- Dim Pit -->
        <text x="${x1 + 10}" y="${(groundY + pitBottomY)/2 + 4}" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">PIT = ${Pit} mm</text>
      `;
    }'''

# Replace old renderHomeSecSvg with the new functions
index_html = re.sub(
    r'function renderHomeSecSvg\(Pit, Oh, Stops, FloorH\) \{.*?^\s*\}',
    new_home_svg_code,
    index_html,
    flags=re.DOTALL | re.MULTILINE
)

# Update homeDownloadCad to support all 4 views
old_home_dl = '''    function homeDownloadCad() {
      const activeSvg = (homeCurrentCadView === 'plan') ? document.getElementById('homeSvgPlan') : document.getElementById('homeSvgSec');'''

new_home_dl = '''    function homeDownloadCad() {
      const svgMap = {
        'plan': document.getElementById('homeSvgPlan'),
        'section': document.getElementById('homeSvgSec'),
        'cabin': document.getElementById('homeSvgCab'),
        'pit': document.getElementById('homeSvgPit')
      };
      const activeSvg = svgMap[homeCurrentCadView] || document.getElementById('homeSvgPlan');'''

index_html = index_html.replace(old_home_dl, new_home_dl)

with open(index_file, "w", encoding="utf-8") as f:
    f.write(index_html)

print("Upgraded index.html with 4-View AutoCAD Engine successfully.")
