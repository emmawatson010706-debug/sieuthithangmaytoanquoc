# -*- coding: utf-8 -*-
import os

DIR = r"D:\sieuthithangmaytoanquoc"
index_path = os.path.join(DIR, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the calculateEstimate and selectPackage section with full home AutoCAD logic
old_calc_block = """    function calculateEstimate() {
      const type = document.getElementById('estType').value;
      const stops = parseInt(document.getElementById('estStops').value);
      const cap = parseInt(document.getElementById('estCapacity').value);
      const motor = document.getElementById('estMotor').value;

      let basePrice = 250000000;
      let shaftSize = '1300mm x 1300mm';

      if (type === 'homelift') {
        basePrice = 250000000;
        shaftSize = '1200mm x 1200mm';
      } else if (type === 'thang-kinh') {
        basePrice = 330000000;
        shaftSize = '1500mm x 1500mm (Khung kính)';
      } else if (type === 'khach-san') {
        basePrice = 360000000;
        shaftSize = '1800mm x 1800mm';
      } else if (type === 'nhap-khau') {
        basePrice = 550000000;
        shaftSize = '1400mm x 1400mm';
      }

      const stopAddon = (stops - 3) * 15000000;

      let capAddon = 0;
      if (cap === 350) capAddon = 15000000;
      if (cap === 450) { capAddon = 30000000; shaftSize = '1600mm x 1600mm'; }
      if (cap === 630) { capAddon = 60000000; shaftSize = '1800mm x 1900mm'; }

      let motorAddon = 0;
      if (motor === 'montanari') motorAddon = 25000000;
      if (motor === 'mitsubishi') motorAddon = 15000000;

      const totalMin = basePrice + stopAddon + capAddon + motorAddon;
      const totalMax = totalMin + 45000000;

      const formatVND = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

      document.getElementById('estimatedPriceText').textContent = `${formatVND(totalMin)} - ${formatVND(totalMax)}`;
      document.getElementById('shaftSizeText').textContent = shaftSize;
    }

    function selectPackage(type, stops, cap, motor) {
      document.getElementById('estType').value = type;
      document.getElementById('estStops').value = stops;
      document.getElementById('estCapacity').value = cap;
      document.getElementById('estMotor').value = motor;
      calculateEstimate();
      document.getElementById('du-toan').scrollIntoView({ behavior: 'smooth' });
    }"""

new_calc_block = """    let homeCurrentCadView = 'plan';

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
    }

    function homeUpdateCad() {
      const W = parseInt(document.getElementById('homeInputW').value, 10);
      const D = parseInt(document.getElementById('homeInputD').value, 10);
      const Pit = parseInt(document.getElementById('homeInputPit').value, 10);
      const Oh = parseInt(document.getElementById('homeInputOh').value, 10);
      const Stops = parseInt(document.getElementById('homeInputStops').value, 10);
      const Type = document.getElementById('homeInputType').value;
      const Motor = document.getElementById('homeInputMotor').value;

      document.getElementById('homeValW').innerText = W + ' mm';
      document.getElementById('homeValD').innerText = D + ' mm';

      let CW = Math.max(750, W - 380);
      let CD = Math.max(750, D - 320);
      let DoorWidth = Math.min(800, Math.max(600, CW - 150));

      const area = (CW * CD) / 1000000;
      let capKg = 350;
      let people = "4 - 5 người";
      if (area >= 1.4) {
        capKg = 630;
        people = "8 - 9 người";
      } else if (area >= 1.1) {
        capKg = 450;
        people = "6 người";
      } else if (area < 0.85) {
        capKg = 300;
        people = "2 - 3 người";
      }

      document.getElementById('homeCalcCabin').innerText = `${CW} x ${CD} mm`;
      document.getElementById('homeCalcDoor').innerText = `${DoorWidth} x 2100 mm`;
      document.getElementById('homeCalcCap').innerText = `${capKg} kg (${people})`;

      // Render Plan SVG
      renderHomePlanSvg(W, D, CW, CD, DoorWidth, Type);
      // Render Section SVG
      renderHomeSecSvg(Pit, Oh, Stops, 3300);

      // BOQ Calculation
      const formatVND = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
      let basePrice = 250000000;
      if (Type === 'thang-kinh') basePrice = 330000000;
      if (Type === 'khach-san') basePrice = 360000000;
      if (Type === 'nhap-khau') basePrice = 550000000;

      const stopAddon = (Stops - 3) * 16000000;
      let capAddon = (capKg >= 450) ? 25000000 : 0;
      let motorAddon = (Motor === 'montanari') ? 25000000 : ((Motor === 'ziehl') ? 45000000 : 0);

      const totalMin = basePrice + stopAddon + capAddon + motorAddon;
      const totalMax = totalMin + 40000000;

      document.getElementById('estimatedPriceText').innerText = `${formatVND(totalMin)} - ${formatVND(totalMax)}`;
      document.getElementById('shaftSizeText').innerText = `${W}mm x ${D}mm`;
      
      const motorNames = { 'fuji': 'Fuji PMSM Nhật Bản', 'montanari': 'Montanari Made in Italy', 'ziehl': 'Ziehl-Abegg Đức' };
      document.getElementById('homeMotorBadge').innerText = motorNames[Motor] || 'Fuji Nhật Bản';
      document.getElementById('homePitBadge').innerHTML = `Hố PIT: <strong class="text-white font-bold">${Pit}mm (${Pit <= 300 ? 'Đệm PU' : 'Chuẩn'})</strong>`;
    }

    function renderHomePlanSvg(W, D, CW, CD, DoorWidth, Type) {
      const svg = document.getElementById('homeSvgPlan');
      const scale = Math.min(240 / W, 220 / D);
      const sW = W * scale;
      const sD = D * scale;
      const sCW = CW * scale;
      const sCD = CD * scale;
      const sDoorW = DoorWidth * scale;
      const cx = 270;
      const cy = 190;
      const x0 = cx - sW / 2;
      const y0 = cy - sD / 2;
      const x1 = cx + sW / 2;
      const y1 = cy + sD / 2;

      const cx0 = cx - sCW / 2;
      const cy0 = (cy - sCD / 2) - 6;
      const cx1 = cx + sCW / 2;
      const cy1 = (cy + sCD / 2) - 6;

      const wallColor = (Type === 'thang-kinh') ? '#00e5ff' : '#ffffff';
      const cwtW = sCW * 0.75;
      const cwtX = cx - cwtW / 2;
      const cwtY = y0 + 8;

      svg.innerHTML = `
        <defs>
          <marker id="hTick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <line x1="0" y1="6" x2="6" y2="0" stroke="#00e5ff" stroke-width="1.5" />
          </marker>
        </defs>
        <!-- Hố thang ngoài -->
        <rect x="${x0}" y="${y0}" width="${sW}" height="${sD}" fill="rgba(0, 229, 255, 0.05)" stroke="${wallColor}" stroke-width="2.5" />
        <rect x="${x0-5}" y="${y0-5}" width="10" height="10" fill="#ef4444" />
        <rect x="${x1-5}" y="${y0-5}" width="10" height="10" fill="#ef4444" />
        <rect x="${x0-5}" y="${y1-5}" width="10" height="10" fill="#ef4444" />
        <rect x="${x1-5}" y="${y1-5}" width="10" height="10" fill="#ef4444" />
        <!-- Đối trọng -->
        <rect x="${cwtX}" y="${cwtY}" width="${cwtW}" height="14" fill="#ffd600" fill-opacity="0.3" stroke="#ffd600" stroke-width="1.5" />
        <text x="${cx}" y="${cwtY + 10}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">ĐỐI TRỌNG (CWT)</text>
        <!-- Ray cabin -->
        <circle cx="${x0+8}" cy="${cy}" r="3.5" fill="#00e5ff" />
        <circle cx="${x1-8}" cy="${cy}" r="3.5" fill="#00e5ff" />
        <!-- Cabin -->
        <rect x="${cx0}" y="${cy0}" width="${sCW}" height="${sCD}" fill="#0d241d" stroke="#00e676" stroke-width="2" />
        <text x="${cx}" y="${cy - 4}" fill="#00e676" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">CABIN (${CW}x${CD})</text>
        <!-- Cửa -->
        <line x1="${cx - sDoorW/2}" y1="${y1}" x2="${cx + sDoorW/2}" y2="${y1}" stroke="#ff4081" stroke-width="4" />
        <text x="${cx}" y="${y1 + 18}" fill="#ff4081" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">CỬA OP=${DoorWidth}</text>
        <!-- Dims -->
        <line x1="${x0}" y1="${y0 - 20}" x2="${x1}" y2="${y0 - 20}" stroke="#00e5ff" stroke-width="1" marker-start="url(#hTick)" marker-end="url(#hTick)" />
        <text x="${cx}" y="${y0 - 25}" fill="#00e5ff" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">W = ${W} mm</text>
        <line x1="${x0 - 20}" y1="${y0}" x2="${x0 - 20}" y2="${y1}" stroke="#00e5ff" stroke-width="1" marker-start="url(#hTick)" marker-end="url(#hTick)" />
        <text x="${x0 - 26}" y="${cy}" fill="#00e5ff" font-size="10" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${x0-26} ${cy})" font-weight="bold">D = ${D} mm</text>
      `;
    }

    function renderHomeSecSvg(Pit, Oh, Stops, FloorH) {
      const svg = document.getElementById('homeSvgSec');
      const shaftH = Pit + (FloorH * (Stops - 1)) + Oh;
      const scaleY = 320 / shaftH;
      const cx = 270;
      const topY = 40;
      const botY = topY + shaftH * scaleY;
      const pitHeightPx = Pit * scaleY;
      const floorDistPx = FloorH * scaleY;
      const groundFloorY = botY - pitHeightPx;

      let floorsSvg = '';
      for (let i = 0; i < Stops; i++) {
        const fy = groundFloorY - i * floorDistPx;
        const elev = (i * FloorH / 1000).toFixed(1);
        floorsSvg += `
          <line x1="${cx - 100}" y1="${fy}" x2="${cx - 50}" y2="${fy}" stroke="#ffffff" stroke-width="2.5" />
          <text x="${cx - 105}" y="${fy + 4}" fill="#00e5ff" font-size="9" font-family="monospace" text-anchor="end">T${i+1} [${i===0 ? '±0.0' : '+'+elev+'m'}]</text>
        `;
      }

      svg.innerHTML = `
        <rect x="${cx - 50}" y="${topY}" width="100" height="${shaftH * scaleY}" fill="rgba(0, 229, 255, 0.04)" stroke="#00e5ff" stroke-width="2.5" />
        <rect x="${cx - 50}" y="${botY - 4}" width="100" height="4" fill="#ef4444" />
        <rect x="${cx - 25}" y="${botY - 14}" width="18" height="10" fill="#ffd600" />
        <rect x="${cx + 7}" y="${botY - 14}" width="18" height="10" fill="#ffd600" />
        ${floorsSvg}
        <rect x="${cx - 35}" y="${groundFloorY - floorDistPx - 55}" width="70" height="55" fill="#0d241d" stroke="#00e676" stroke-width="1.5" />
        <text x="${cx}" y="${groundFloorY - floorDistPx - 25}" fill="#00e676" font-size="9" font-family="monospace" text-anchor="middle">CABIN</text>
        <!-- Motor MRL -->
        <rect x="${cx - 35}" y="${topY + 8}" width="70" height="18" fill="#0f172a" stroke="#ffd600" stroke-width="1.5" />
        <circle cx="${cx - 15}" cy="${topY + 17}" r="8" fill="#d97706" />
        <text x="${cx}" y="${topY + 4}" fill="#ffd600" font-size="8" font-family="monospace" text-anchor="middle">MÁY KÉO MRL</text>
      `;
    }

    function homeDownloadCad() {
      const activeSvg = (homeCurrentCadView === 'plan') ? document.getElementById('homeSvgPlan') : document.getElementById('homeSvgSec');
      const svgData = new XMLSerializer().serializeToString(activeSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `Ban-Ve-Thang-May-0914587575.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      alert('Đã tải thành công bản vẽ kỹ thuật Auto-CAD về máy!');
    }

    function homeSendZalo() {
      const W = document.getElementById('homeInputW').value;
      const D = document.getElementById('homeInputD').value;
      const Pit = document.getElementById('homeInputPit').value;
      const Oh = document.getElementById('homeInputOh').value;
      const Stops = document.getElementById('homeInputStops').value;
      const price = document.getElementById('estimatedPriceText').innerText;

      const message = `Chào Kỹ Sư Trưởng 0914.587.575! Tôi vừa cấu hình bản vẽ thang máy trên trang chủ sieuthithangmaytoanquoc.com:
- Kích thước lọt lòng: Rộng ${W}mm x Sâu ${D}mm
- Hố PIT: ${Pit}mm | Tum OH: ${Oh}mm | Số tầng: ${Stops} tầng
- Dự toán web tính: ${price}
Nhờ Kỹ Sư Trưởng kiểm tra bản vẽ kết cấu và tư vấn giúp tôi!`;

      window.open(`https://zalo.me/0914587575?text=${encodeURIComponent(message)}`, '_blank');
    }

    function selectPackage(type, stops, cap, motor) {
      if (document.getElementById('homeInputType')) {
        document.getElementById('homeInputType').value = type;
        document.getElementById('homeInputStops').value = stops;
        if (cap === 250 || cap === 350) {
          document.getElementById('homeInputW').value = 1350;
          document.getElementById('homeInputD').value = 1350;
        } else if (cap === 450) {
          document.getElementById('homeInputW').value = 1550;
          document.getElementById('homeInputD').value = 1550;
        } else if (cap >= 630) {
          document.getElementById('homeInputW').value = 1800;
          document.getElementById('homeInputD').value = 1850;
        }
        if (motor) document.getElementById('homeInputMotor').value = motor;
        homeUpdateCad();
      }
      document.getElementById('du-toan').scrollIntoView({ behavior: 'smooth' });
    }"""

# Normalize and replace
content = content.replace(old_calc_block.replace('\r\n', '\n'), new_calc_block.replace('\r\n', '\n'))
content = content.replace('calculateEstimate();', 'homeUpdateCad();')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html JS engine successfully.")
