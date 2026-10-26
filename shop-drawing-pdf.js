// ==========================================================================================
// HỆ THỐNG XUẤT HỒ SƠ BẢN VẼ SHOP DRAWING KỸ THUẬT HỐ THANG BÊ TÔNG (CHUẨN AUTOCAD CHUYÊN NGHIỆP)
// Đơn vị thiết kế & bản quyền: SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
// Hotline Admin: 0914.587.575 - Website: sieuthithangmaytoanquoc.com
// Quy chuẩn thiết kế: QCVN 02:2019/BLĐTBXH • TCVN 6395:2008 • Khổ in: A3 Kỹ Sư & Tập A4 8 Trang
// ==========================================================================================

(function () {
  'use strict';

  // 1. TÍNH TOÁN THÔNG SỐ ĐỘNG DỰA TRÊN KÍCH THƯỚC ĐẦU VÀO
  function calculateShopDrawingSpecs(W, D, Pit, Oh, Stops, Capacity) {
    W = parseInt(W) || 1400;
    D = parseInt(D) || 1450;
    Pit = parseInt(Pit) || 350;
    Oh = parseInt(Oh) || 3200;
    Stops = parseInt(Stops) || 4;

    var cap = parseInt(Capacity) || (W < 1350 ? 300 : (W < 1550 ? 450 : (W < 1850 ? 630 : 800)));
    var speed = cap <= 450 ? 1.0 : 1.5; // m/s
    var persons = Math.floor(cap / 75) || (cap <= 450 ? 6 : 9);

    // Kích thước Cabin thông thủy (tỷ lệ chuẩn)
    var CW = Math.max(750, W - 400); 
    var CD = Math.max(750, D - 550);
    var CH = 2200;

    // Cửa mở tầng (Center Opening 2 cánh mở tim)
    var CO = Math.max(650, Math.min(900, Math.round((CW * 0.6) / 50) * 50));
    var DH = 2100;
    var roughDoorW = CO + 400; // Ví dụ 650 + 400 = 1050
    var roughDoorH = 2400;     // Lỗ chờ thô cao 2400 từ FFL

    // Phản lực tính toán kết cấu (kN)
    var R1 = (cap * 0.08 + 15).toFixed(1); // Lực đáy ray cabin khi phanh gấp
    var R2 = (cap * 0.07 + 12).toFixed(1); // Lực đáy ray đối trọng khi chạm đệm
    var R3 = (cap * 0.12 + 25).toFixed(1); // Lực dầm bệ máy kéo lên sàn tum
    var R4 = '20.0';                       // Móc cẩu pa-lăng nóc giếng (2.0 Tấn)

    return {
      W: W,
      D: D,
      Pit: Pit,
      Oh: Oh,
      Stops: Stops,
      cap: cap,
      speed: speed,
      persons: persons,
      CW: CW,
      CD: CD,
      CH: CH,
      CO: CO,
      DH: DH,
      roughDoorW: roughDoorW,
      roughDoorH: roughDoorH,
      R1: R1,
      R2: R2,
      R3: R3,
      R4: R4
    };
  }

  // 2. BỘ ĐỊNH NGHĨA HOA VĂN CAD, 2 PHÔNG CHỮ TIÊU CHUẨN & SYMBOL KỸ THUẬT
  function getCadDefs() {
    return `
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&amp;family=Roboto+Mono:wght@500;700&amp;display=swap');
          
          /* CHỈ SỬ DỤNG 2 FONT DUY NHẤT: ROBOTO CHO CHỮ VÀ ROBOTO MONO CHO SỐ KỸ THUẬT */
          text {
            font-family: 'Roboto', 'Segoe UI', Arial, sans-serif !important;
            text-rendering: geometricPrecision;
            -webkit-font-smoothing: antialiased;
          }
          .cad-num {
            font-family: 'Roboto Mono', 'Consolas', monospace !important;
            font-weight: 700;
          }
          
          /* KỸ THUẬT VIỀN TRẮNG BẢO VỆ CHỮ (WHITE HALO) CHỐNG BỊ NÉT VẼ ĐÈ LÊN CHỮ */
          .cad-halo-text {
            paint-order: stroke fill;
            stroke: #ffffff;
            stroke-width: 3.5px;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .cad-dim-text {
            font-family: 'Roboto Mono', monospace !important;
            font-weight: 700;
            paint-order: stroke fill;
            stroke: #ffffff;
            stroke-width: 3.5px;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        </style>
        
        <!-- Bê tông cốt thép chuẩn AutoCAD: gạch chéo 45 độ + chấm hạt -->
        <pattern id="cadConcrete" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#94a3b8" stroke-width="1"/>
          <circle cx="7" cy="7" r="1.1" fill="#64748b"/>
        </pattern>

        <!-- Tường gạch xây chuẩn AutoCAD: gạch đỏ nhạt so le -->
        <pattern id="cadBrick" width="14" height="7" patternUnits="userSpaceOnUse">
          <rect width="14" height="7" fill="#fff5f5"/>
          <line x1="0" y1="0" x2="14" y2="0" stroke="#f87171" stroke-width="0.6"/>
          <line x1="0" y1="3.5" x2="14" y2="3.5" stroke="#f87171" stroke-width="0.6"/>
          <line x1="0" y1="0" x2="0" y2="3.5" stroke="#f87171" stroke-width="0.6"/>
          <line x1="7" y1="3.5" x2="7" y2="7" stroke="#f87171" stroke-width="0.6"/>
        </pattern>

        <!-- Mũi tên CAD -->
        <marker id="arrowCAD" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#0f172a" />
        </marker>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#b91c1c" />
        </marker>
      </defs>
    `;
  }

  // 3. TIỆN ÍCH DỰNG KÍCH THƯỚC CHUẨN AUTOCAD (CÓ VIỀN TRẮNG CHỐNG TRÙNG NÉT)
  function cadDimH(x1, x2, y, val, color) {
    color = color || '#0f172a';
    var tick = 3;
    var minX = Math.min(x1, x2);
    var maxX = Math.max(x1, x2);
    var midX = (minX + maxX) / 2;
    return `
      <g class="cad-dim">
        <line x1="${minX}" y1="${y}" x2="${maxX}" y2="${y}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${minX - tick}" y1="${y + tick}" x2="${minX + tick}" y2="${y - tick}" stroke="${color}" stroke-width="1.3"/>
        <line x1="${maxX - tick}" y1="${y + tick}" x2="${maxX + tick}" y2="${y - tick}" stroke="${color}" stroke-width="1.3"/>
        <text x="${midX}" y="${y - 3.5}" fill="${color}" font-size="8.5" class="cad-dim-text" text-anchor="middle">${val}</text>
      </g>
    `;
  }

  function cadDimV(x, y1, y2, val, color) {
    color = color || '#0f172a';
    var tick = 3;
    var minY = Math.min(y1, y2);
    var maxY = Math.max(y1, y2);
    var midY = (minY + maxY) / 2;
    return `
      <g class="cad-dim">
        <line x1="${x}" y1="${minY}" x2="${x}" y2="${maxY}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x - tick}" y1="${minY + tick}" x2="${x + tick}" y2="${minY - tick}" stroke="${color}" stroke-width="1.3"/>
        <line x1="${x - tick}" y1="${maxY + tick}" x2="${x + tick}" y2="${maxY - tick}" stroke="${color}" stroke-width="1.3"/>
        <text x="${x - 4.5}" y="${midY + 3}" fill="${color}" font-size="8.5" class="cad-dim-text" text-anchor="end">${val}</text>
      </g>
    `;
  }

  // Tiêu đề chi tiết chuẩn AutoCAD (Vòng tròn số kỹ thuật + Tên + Tỷ lệ)
  function cadTitleBubble(x, y, num, title, scale) {
    scale = scale || '1/25';
    return `
      <g class="cad-title-bubble" transform="translate(${x}, ${y})">
        <circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
        <text x="12" y="16" fill="#0f172a" font-size="10.5" font-weight="900" class="cad-num" text-anchor="middle">${num}</text>
        <text x="30" y="12" fill="#0f172a" font-size="10" font-weight="900" letter-spacing="0.3">${title.toUpperCase()}</text>
        <line x1="30" y1="16" x2="330" y2="16" stroke="#0f172a" stroke-width="1.2"/>
        <line x1="30" y1="19" x2="280" y2="19" stroke="#64748b" stroke-width="0.5"/>
        <text x="30" y="29" fill="#475569" font-size="7.5" font-weight="700">TỶ LỆ: ${scale}</text>
      </g>
    `;
  }

  // Đường chỉ dẫn Leader Line
  function cadLeader(x1, y1, x2, y2, x3, text, color) {
    color = color || '#0f172a';
    return `
      <g class="cad-leader">
        <circle cx="${x1}" cy="${y1}" r="1.8" fill="${color}"/>
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x2}" y1="${y2}" x2="${x3}" y2="${y2}" stroke="${color}" stroke-width="0.9"/>
        <text x="${x2 + 3}" y="${y2 - 3}" fill="${color}" font-size="7.5" font-weight="700" class="cad-halo-text">${text}</text>
      </g>
    `;
  }

  // Cốt cao độ FFL (Tam giác AutoCAD)
  function cadLevelMark(x, y, label) {
    return `
      <g class="cad-level-mark" transform="translate(${x}, ${y})">
        <path d="M 0 0 L -5 -7 L 5 -7 Z" fill="#0f172a"/>
        <line x1="-12" y1="0" x2="18" y2="0" stroke="#0f172a" stroke-width="1"/>
        <text x="2" y="-9" fill="#0f172a" font-size="7.5" font-weight="900" class="cad-halo-text">${label}</text>
      </g>
    `;
  }

  // ==========================================================================================
  // KHUNG TÊN KỸ THUẬT TIÊU CHUẨN ISO/TCVN (ENGINEERING TITLE BLOCK - TRẮNG ĐEN, KHÔNG TÔ MÀU)
  // ==========================================================================================
  function renderCadTitleBlock(specs, drawingTitle, drawingNo, sheetSize) {
    var today = new Date().toLocaleDateString('vi-VN');
    sheetSize = sheetSize || 'A3';
    return `
      <g class="cad-title-block">
        <!-- NỀN TRẮNG TUYỆT ĐỐI, VIỀN ĐEN KỸ THUẬT CHUẨN ISO/TCVN -->
        <rect x="0" y="0" width="395" height="280" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
        
        <!-- Hàng 1: ĐƠN VỊ THIẾT KẾ -->
        <rect x="0" y="0" width="395" height="45" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
        <text x="197" y="19" fill="#0f172a" font-size="11.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
        </text>
        <text x="197" y="34" fill="#475569" font-size="8.5" font-weight="700" text-anchor="middle">
          HOTLINE ADMIN: 0914.587.575 • sieuthithangmaytoanquoc.com
        </text>

        <!-- Hàng 2: TÊN BẢN VẼ -->
        <rect x="0" y="45" width="395" height="45" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
        <text x="197" y="61" fill="#475569" font-size="8" font-weight="700" text-anchor="middle">
          TÊN HỒ SƠ BẢN VẼ:
        </text>
        <text x="197" y="78" fill="#0f172a" font-size="10.5" font-weight="900" text-anchor="middle">
          ${drawingTitle.toUpperCase()}
        </text>

        <!-- Hàng 3: CÔNG TRÌNH & TIÊU CHUẨN ÁP DỤNG -->
        <g transform="translate(0, 90)" font-size="8">
          <rect x="0" y="0" width="197" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="10" y="16" fill="#64748b" font-weight="bold">CÔNG TRÌNH:</text>
          <text x="10" y="32" fill="#0f172a" font-weight="900">NHÀ PHỐ / BIỆT THỰ / DỰ ÁN</text>

          <rect x="197" y="0" width="198" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="207" y="16" fill="#64748b" font-weight="bold">TIÊU CHUẨN THI CÔNG:</text>
          <text x="207" y="32" fill="#0f172a" font-weight="900">QCVN 02:2019 • TCVN 6395</text>
        </g>

        <!-- Hàng 4: TRÁCH NHIỆM KỸ THUẬT (4 Ô KÝ TÊN) -->
        <g transform="translate(0, 132)" font-size="8">
          <rect x="0" y="0" width="98" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="49" y="16" fill="#64748b" text-anchor="middle" font-weight="bold">THIẾT KẾ</text>
          <text x="49" y="36" fill="#0f172a" text-anchor="middle" font-weight="900">KS. CAD</text>

          <rect x="98" y="0" width="99" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="147" y="16" fill="#64748b" text-anchor="middle" font-weight="bold">KIỂM TRA</text>
          <text x="147" y="36" fill="#0f172a" text-anchor="middle" font-weight="900">KS. KẾT CẤU</text>

          <rect x="197" y="0" width="99" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="246" y="16" fill="#64748b" text-anchor="middle" font-weight="bold">PHÊ DUYỆT</text>
          <text x="246" y="36" fill="#0f172a" text-anchor="middle" font-weight="900">ADMIN</text>

          <rect x="296" y="0" width="99" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="345" y="16" fill="#64748b" text-anchor="middle" font-weight="bold">XÁC NHẬN CĐT</text>
          <text x="345" y="36" fill="#64748b" text-anchor="middle" font-style="italic">(Ký tên)</text>
        </g>

        <!-- Hàng 5: TỶ LỆ, KHỔ GIẤY, NGÀY VÀ KÝ HIỆU -->
        <g transform="translate(0, 182)" font-size="8">
          <rect x="0" y="0" width="98" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="49" y="17" fill="#64748b" text-anchor="middle" font-weight="bold">TỶ LỆ BẢN VẼ</text>
          <text x="49" y="35" fill="#0f172a" font-weight="900" class="cad-num" text-anchor="middle">1:25 / 1:50</text>

          <rect x="98" y="0" width="99" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="147" y="17" fill="#64748b" text-anchor="middle" font-weight="bold">KHỔ GIẤY</text>
          <text x="147" y="35" fill="#0f172a" font-weight="900" class="cad-num" text-anchor="middle">${sheetSize}</text>

          <rect x="197" y="0" width="99" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="246" y="17" fill="#64748b" text-anchor="middle" font-weight="bold">NGÀY PHÁT HÀNH</text>
          <text x="246" y="35" fill="#0f172a" font-weight="900" class="cad-num" text-anchor="middle">${today}</text>

          <rect x="296" y="0" width="99" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="345" y="17" fill="#64748b" text-anchor="middle" font-weight="bold">KÝ HIỆU</text>
          <text x="345" y="35" fill="#0f172a" font-weight="900" class="cad-num" text-anchor="middle">${drawingNo}</text>
        </g>

        <!-- Hàng 6: GHI CHÚ BẢN QUYỀN & LẦN SỬA ĐỔI -->
        <rect x="0" y="230" width="395" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
        <text x="12" y="248" fill="#475569" font-size="7.5" font-weight="bold">
          LẦN BAN HÀNH: REV 02 • BẢN VẼ PHÁT HÀNH CHÍNH THỨC ĐỂ THI CÔNG HỐ THANG
        </text>
        <text x="12" y="264" fill="#0f172a" font-size="7.5" font-weight="900">
          * ĐỐI CHIẾU THỰC TẾ TRƯỚC KHI ĐỔ BÊ TÔNG SÀN &amp; DẦM GIẰNG GIỮ RAY
        </text>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 01: MẶT BẰNG HỐ THANG (TẦNG ĐIỂN HÌNH & SÀN TẦNG)
  // ==========================================================================================
  function renderDrawing1_HoistwayPlan(specs) {
    return `
      <g id="drawing1_hoistwayPlan" class="cad-drawing">
        ${cadTitleBubble(15, 12, "01", "MẶT BẰNG HỐ THANG (HOISTWAY PLAN)", "1/30")}

        <!-- 1A: TẦNG ĐIỂN HÌNH -->
        <g id="planTypical" transform="translate(15, 50)">
          <text x="75" y="10" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">
            TẦNG ĐIỂN HÌNH
          </text>

          <!-- Tường gạch & 4 Cột bê tông 200x200 -->
          <rect x="10" y="24" width="130" height="120" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.3"/>
          <rect x="22" y="36" width="106" height="96" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- 4 Cột bê tông góc -->
          <rect x="10" y="24" width="15" height="15" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="125" y="24" width="15" height="15" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="10" y="129" width="15" height="15" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="125" y="129" width="15" height="15" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Cửa mở phía trước -->
          <rect x="38" y="129" width="74" height="15" fill="#ffffff" stroke="#ffffff"/>
          <line x1="38" y1="129" x2="38" y2="144" stroke="#0f172a" stroke-width="1"/>
          <line x1="112" y1="129" x2="112" y2="144" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim CL -->
          <line x1="75" y1="18" x2="75" y2="152" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="5" y1="84" x2="145" y2="84" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- Kích thước lọt lòng -->
          ${cadDimH(22, 128, 18, "HW=" + specs.W, "#b91c1c")}
          ${cadDimV(146, 36, 132, "HD=" + specs.D, "#b91c1c")}
          ${cadDimH(38, 112, 154, "1200", "#0f172a")}

          <!-- Mũi tên hướng cửa -->
          <path d="M 75 162 L 72 168 L 78 168 Z" fill="#0f172a"/>
          <text x="75" y="178" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA VÀO</text>
        </g>

        <!-- 1B: VỊ TRÍ DẦM SÀN TẦNG -->
        <g id="planFloor" transform="translate(195, 50)">
          <text x="75" y="10" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">
            VỊ TRÍ DẦM SÀN TẦNG
          </text>

          <!-- Dầm BTCT bao 3 mặt -->
          <rect x="10" y="24" width="130" height="120" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.3"/>
          <rect x="22" y="36" width="106" height="96" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Trụ gạch 2 bên cửa -->
          <rect x="10" y="129" width="22" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="118" y="129" width="22" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ cửa chờ -->
          <rect x="32" y="129" width="86" height="15" fill="#ffffff" stroke="#ffffff"/>
          <line x1="32" y1="129" x2="32" y2="144" stroke="#0f172a" stroke-width="1"/>
          <line x1="118" y1="129" x2="118" y2="144" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim CL -->
          <line x1="75" y1="18" x2="75" y2="152" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="5" y1="84" x2="145" y2="84" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          ${cadLeader(22, 60, -10, 45, -35, "DẦM BTCT 200x200", "#0f172a")}
          ${cadDimH(22, 128, 18, "HW=" + specs.W, "#b91c1c")}
          ${cadDimH(32, 118, 154, "CỬA CHỜ: " + specs.roughDoorW, "#0f172a")}

          <path d="M 75 162 L 72 168 L 78 168 Z" fill="#0f172a"/>
          <text x="75" y="178" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA VÀO</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 02: CHỜ THÔ CỬA TẦNG (ROUGH OPENING)
  // ==========================================================================================
  function renderDrawing2_RoughDoorOpening(specs) {
    return `
      <g id="drawing2_roughDoorOpening" class="cad-drawing">
        ${cadTitleBubble(15, 12, "02", "CHỜ THÔ CỬA TẦNG (ROUGH OPENING)", "1/30")}

        <!-- MẶT ĐỨNG LỖ CHỜ THÔ (KHÔNG CÓ CLOUD CHE CHỮ) -->
        <g id="roughDoorElevation" transform="translate(20, 50)">
          <!-- Cột bê tông 2 bên -->
          <rect x="0" y="18" width="16" height="150" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="134" y="18" width="16" height="150" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Trụ gạch 2 bên -->
          <rect x="16" y="38" width="20" height="130" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="114" y="38" width="20" height="130" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Dầm lanh-tô bê tông cốt thép dày 200mm -->
          <rect x="16" y="18" width="118" height="20" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <text x="75" y="31" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle" class="cad-halo-text">LANH TÔ BTCT 200x200</text>

          <!-- Tường gạch trên lanh tô -->
          <rect x="16" y="0" width="118" height="18" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ chừa trống cửa tầng -->
          <rect x="36" y="38" width="78" height="130" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="36" y1="38" x2="114" y2="168" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="4,2"/>
          <line x1="114" y1="38" x2="36" y2="168" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="4,2"/>
          
          <!-- Hộp thông số OPEN rõ nét, không bị gạch đè -->
          <rect x="22" y="92" width="106" height="18" fill="#ffffff" stroke="#0f172a" stroke-width="0.8" rx="2"/>
          <text x="75" y="105" fill="#b91c1c" font-size="8.5" font-weight="900" class="cad-num" text-anchor="middle">OPEN = ${specs.roughDoorW}</text>

          <!-- Cốt sàn FFL -->
          ${cadLevelMark(75, 168, "FFL [±0.000]")}

          <!-- Sàn bê tông tầng -->
          <rect x="0" y="168" width="150" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          ${cadDimV(-8, 38, 168, "OPEN = " + specs.roughDoorH, "#0f172a")}

          <text x="75" y="196" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">
            MẶT ĐỨNG LỖ CHỜ THÔ
          </text>
        </g>

        <!-- MẶT CẮT 2-2 & 1-1 GỌN GÀNG KHÔNG ĐÈ CHỮ -->
        <g id="sectionGroup" transform="translate(195, 50)">
          <!-- CẮT 2-2 -->
          <text x="60" y="8" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">MẶT CẮT 2-2 (NGANG)</text>
          
          <rect x="5" y="14" width="30" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="35" y="14" width="50" height="16" fill="#ffffff" stroke="#ffffff"/>
          <rect x="85" y="14" width="30" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.8"/>
          
          <line x1="5" y1="30" x2="115" y2="30" stroke="#0f172a" stroke-width="1"/>
          <line x1="35" y1="14" x2="35" y2="30" stroke="#0f172a" stroke-width="0.8"/>
          <line x1="85" y1="14" x2="85" y2="30" stroke="#0f172a" stroke-width="0.8"/>

          ${cadDimH(35, 85, 38, specs.roughDoorW, "#0f172a")}

          <!-- CẮT 1-1 -->
          <g transform="translate(10, 65)">
            <text x="50" y="0" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">MẶT CẮT 1-1 (DỌC)</text>
            
            <rect x="35" y="8" width="16" height="20" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.9"/>
            <rect x="35" y="28" width="16" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
            ${cadLeader(35, 38, 10, 25, -15, "LANH TÔ BTCT 200", "#0f172a")}

            <line x1="35" y1="46" x2="35" y2="105" stroke="#cbd5e1" stroke-dasharray="3,2"/>
            <text x="58" y="75" fill="#475569" font-size="7" font-weight="bold" transform="rotate(90, 58, 75)" text-anchor="middle">
              Chừa trống cao: ${specs.roughDoorH}
            </text>

            <rect x="20" y="105" width="45" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
            <line x1="15" y1="105" x2="65" y2="105" stroke="#0f172a" stroke-width="1.2"/>
          </g>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 03: CỬA TẦNG HOÀN THIỆN & HỘP NÚT BẤM LOP
  // ==========================================================================================
  function renderDrawing3_FinishedDoor(specs) {
    return `
      <g id="drawing3_finishedDoor" class="cad-drawing">
        ${cadTitleBubble(15, 12, "03", "CỬA TẦNG HOÀN THIỆN & HỘP LOP", "1/25")}

        <!-- CHI TIẾT MẶT CẮT NGANG ỐP ĐÁ -->
        <g id="doorPlanDetail" transform="translate(30, 48)">
          <rect x="0" y="8" width="190" height="14" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="35" y="8" width="120" height="14" fill="#ffffff" stroke="#ffffff"/>

          <!-- Khung đá granite -->
          <polygon points="35,8 45,22 55,22 50,8" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>
          <polygon points="155,8 145,22 135,22 140,8" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>

          <!-- Khung inox & cánh cửa -->
          <rect x="55" y="5" width="80" height="4" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="56" y="1" width="38" height="3" fill="#64748b"/>
          <rect x="96" y="1" width="38" height="3" fill="#64748b"/>

          ${cadDimH(55, 135, 27, "C.rộng cửa: " + specs.CO, "#0f172a")}
          ${cadDimH(35, 155, 38, "Chừa trống: " + (specs.CO + 200), "#b91c1c")}

          ${cadLeader(145, 15, 170, 15, 220, "Ốp đá sau khi lắp khung (*)", "#b91c1c")}
        </g>

        <!-- MẶT ĐỨNG CỬA TẦNG HOÀN THIỆN -->
        <g id="doorFrontDetail" transform="translate(45, 98)">
          <!-- Khung ốp đá granite ngoài (1100) -->
          <rect x="15" y="6" width="130" height="146" fill="#fffbeb" stroke="#d97706" stroke-width="1.3"/>
          <rect x="25" y="14" width="110" height="138" fill="#f8fafc" stroke="#0f172a" stroke-width="1.3"/>

          <!-- Cánh cửa inox mở tim -->
          <rect x="27" y="16" width="52" height="136" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          <rect x="81" y="16" width="52" height="136" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          
          <line x1="53" y1="28" x2="53" y2="135" stroke="#cbd5e1" stroke-width="0.8"/>
          <line x1="107" y1="28" x2="107" y2="135" stroke="#cbd5e1" stroke-width="0.8"/>

          <!-- Mũi tên mở 2 cánh -->
          <path d="M 50 80 L 42 80" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arrowCAD)"/>
          <path d="M 110 80 L 118 80" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arrowCAD)"/>

          <text x="80" y="92" fill="#0f172a" font-size="9" font-weight="900" class="cad-num" text-anchor="middle">
            DW = ${specs.CO}
          </text>

          <!-- Hộp nút bấm gọi tầng LOP -->
          <rect x="148" y="65" width="12" height="32" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="0.8"/>
          <circle cx="154" cy="73" r="2.2" fill="#38bdf8"/>
          <circle cx="154" cy="81" r="1.8" fill="#ef4444"/>
          <circle cx="154" cy="89" r="1.8" fill="#ef4444"/>
          <text x="164" y="83" fill="#0f172a" font-size="7.5" font-weight="bold">LOP</text>

          ${cadDimV(185, 83, 152, "1200", "#b91c1c")}

          ${cadLevelMark(80, 152, "FFL")}
          <line x1="0" y1="152" x2="175" y2="152" stroke="#0f172a" stroke-width="1.4"/>

          ${cadDimV(210, 14, 152, "DH = " + specs.DH, "#0f172a")}
          ${cadDimH(15, 145, 166, "1100 (ỐP ĐÁ HOÀN THIỆN)", "#0f172a")}
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 04: MẶT BẰNG LẮP ĐẶT THANG (CAR & CWT PLAN)
  // ==========================================================================================
  function renderDrawing4_ElevatorInstallationPlan(specs) {
    var halfW = Math.round(specs.W / 2);

    return `
      <g id="drawing4_installationPlan" class="cad-drawing">
        ${cadTitleBubble(15, 12, "04", "MẶT BẰNG LẮP THANG (CAR & CWT PLAN)", "1/20")}

        <g transform="translate(30, 48)">
          <!-- Khung giếng thang 200mm -->
          <rect x="15" y="15" width="260" height="200" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.6"/>
          <rect x="35" y="35" width="220" height="160" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>

          <!-- Trục tim CL -->
          <line x1="145" y1="10" x2="145" y2="205" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="25" y1="115" x2="265" y2="115" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- CẶP RAY CABIN (T78/T89) - LEADER KHÔNG TRÀN RA NGOÀI -->
          <rect x="35" y="108" width="12" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <polygon points="47,115 54,111 54,119" fill="#b91c1c"/>
          ${cadLeader(42, 115, 20, 85, -15, "RAY CABIN T78/T89", "#b91c1c")}

          <rect x="243" y="108" width="12" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <polygon points="243,115 236,111 236,119" fill="#b91c1c"/>
          ${cadLeader(248, 115, 270, 85, 340, "RAY CABIN T78/T89", "#b91c1c")}

          <!-- KHUNG ĐỐI TRỌNG (Phía sau Cabin) -->
          <rect x="80" y="42" width="130" height="18" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="100" y1="42" x2="100" y2="60" stroke="#64748b" stroke-width="0.8"/>
          <line x1="190" y1="42" x2="190" y2="60" stroke="#64748b" stroke-width="0.8"/>
          <polygon points="76,51 80,47 80,55" fill="#d97706"/>
          <polygon points="214,51 210,47 210,55" fill="#d97706"/>
          <text x="145" y="54" fill="#ffffff" font-size="7.5" font-weight="bold" text-anchor="middle">ĐỐI TRỌNG (CWT T50/T75)</text>

          <!-- CABIN THANG MÁY (Wcar x Dcar) -->
          <rect x="65" y="70" width="160" height="105" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>
          <rect x="70" y="75" width="150" height="95" fill="#ffffff" stroke="#38bdf8" stroke-width="0.9"/>

          <!-- Cửa Cabin & Cửa Tầng -->
          <rect x="95" y="165" width="50" height="5" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="145" y="165" width="50" height="5" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="95" y="174" width="50" height="5" fill="#64748b" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="145" y="174" width="50" height="5" fill="#64748b" stroke="#0f172a" stroke-width="0.8"/>

          <!-- Trụ tường 2 bên -->
          <rect x="35" y="180" width="45" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="210" y="180" width="45" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Thông số Cabin Wcar x Dcar có hộp trắng bảo vệ -->
          <rect x="85" y="100" width="120" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8" rx="3"/>
          <text x="145" y="113" fill="#0369a1" font-size="8.5" font-weight="900" class="cad-num" text-anchor="middle">
            Wcar: ${specs.CW} mm
          </text>
          <text x="145" y="125" fill="#0369a1" font-size="8" font-weight="900" class="cad-num" text-anchor="middle">
            Dcar: ${specs.CD} mm
          </text>
          <text x="145" y="137" fill="#64748b" font-size="7" font-weight="bold" text-anchor="middle">
            ${specs.cap} KG - ${specs.persons} NGƯỜI
          </text>

          ${cadDimH(95, 195, 196, "CO = " + specs.CO + " mm", "#b91c1c")}
          ${cadDimH(35, 255, 220, "HW = " + specs.W + " mm (" + halfW + "+" + halfW + ")", "#0f172a")}
          ${cadDimV(270, 35, 195, "HD = " + specs.D + " mm", "#0f172a")}

          <path d="M 145 234 L 140 242 L 150 242 Z" fill="#0f172a"/>
          <text x="145" y="252" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 05: MẶT BẰNG DẦM MÁY KÉO ĐỈNH HỐ THANG
  // ==========================================================================================
  function renderDrawing5_MachineBeamsPlan(specs) {
    return `
      <g id="drawing5_machineBeamsPlan" class="cad-drawing">
        ${cadTitleBubble(15, 12, "05", "MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ", "1/25")}

        <g transform="translate(30, 50)">
          <text x="25" y="12" fill="#b45309" font-size="7.5" font-weight="bold">Xây tường 110 cả 04 mặt hố thang</text>
          <text x="175" y="12" fill="#b45309" font-size="7.5" font-weight="bold">Xây tường 110 cả 04 mặt hố thang</text>

          <!-- Tường 110 & Cột góc -->
          <rect x="25" y="20" width="240" height="190" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="37" y="32" width="216" height="166" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- 4 Cột bê tông góc -->
          <rect x="25" y="20" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="247" y="20" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="25" y="192" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="247" y="192" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim CL -->
          <line x1="145" y1="15" x2="145" y2="205" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="20" y1="115" x2="265" y2="115" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- Tâm móc treo 'H' -->
          <circle cx="145" cy="115" r="4.5" fill="#dc2626"/>
          ${cadLeader(145, 115, 185, 135, 235, "TÂM MÓC TREO 'H'", "#b91c1c")}

          <!-- Cửa vào tum R800 x C1000 -->
          <rect x="135" y="192" width="70" height="18" fill="#ffffff" stroke="#ffffff"/>
          <line x1="135" y1="192" x2="135" y2="210" stroke="#0f172a" stroke-width="1"/>
          <line x1="205" y1="192" x2="205" y2="210" stroke="#0f172a" stroke-width="1"/>
          <line x1="135" y1="210" x2="185" y2="225" stroke="#0f172a" stroke-width="1.2"/>
          <path d="M 185 225 A 50 50 0 0 0 205 210" fill="none" stroke="#64748b" stroke-dasharray="2,2"/>
          
          ${cadLeader(170, 220, 205, 235, 290, "CỬA TUM R800xC1000 (KH THỰC HIỆN)", "#b45309")}

          <!-- Dây nguồn & CB 3P/16A-40A (Leader nằm trọn trong khung) -->
          <rect x="38" y="175" width="14" height="14" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
          <line x1="38" y1="175" x2="52" y2="189" stroke="#ca8a04"/>
          ${cadLeader(45, 185, 25, 235, 5, "CB NGUỒN 3P-40A", "#0f172a")}

          ${cadDimH(37, 253, 218, "HW = " + specs.W + " mm", "#0f172a")}
          ${cadDimV(270, 32, 198, "HD = " + specs.D + " mm", "#0f172a")}

          <path d="M 145 250 L 140 258 L 150 258 Z" fill="#0f172a"/>
          <text x="145" y="268" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 06: MẶT CẮT ĐỨNG GIẾNG THANG (SHAFT SECTION)
  // ==========================================================================================
  function renderDrawing6_VerticalSection(specs) {
    return `
      <g id="drawing6_verticalSection" class="cad-drawing">
        ${cadTitleBubble(15, 12, "06", "MẶT CẮT ĐỨNG GIẾNG THANG (SHAFT SECTION)", "1/40")}

        <g transform="translate(65, 45)">
          <!-- Cột/vách giếng trái và phải -->
          <rect x="40" y="40" width="18" height="240" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="180" y="40" width="18" height="240" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>

          <!-- ĐÁY HỐ PIT (Sàn BTCT 300mm chống thấm) -->
          <rect x="25" y="280" width="185" height="22" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.4"/>
          <text x="115" y="295" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle" class="cad-halo-text">
            ĐÁY PIT BTCT CHỐNG THẤM (DÀY 300mm)
          </text>

          <!-- Giảm chấn buffer -->
          <rect x="90" y="265" width="18" height="15" fill="#ea580c" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="135" y="265" width="14" height="15" fill="#ea580c" stroke="#0f172a" stroke-width="0.8"/>

          <!-- CỐT SÀN TẦNG 1F -->
          <rect x="15" y="240" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          ${cadLevelMark(25, 240, "1F [±0.000]")}
          <text x="75" y="225" fill="#0f172a" font-size="7" font-weight="bold">CỬA VÀO 1F</text>
          <!-- Lanh tô BTCT tầng 1F -->
          <rect x="40" y="195" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- DẦM GIẰNG BTCT GIỮA CÁC TẦNG (H/2 <= 1800) -->
          <rect x="180" y="215" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="180" y="150" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="180" y="85" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- TẦNG 2F & 3F -->
          <rect x="15" y="175" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          ${cadLevelMark(25, 175, "2F")}
          <rect x="40" y="130" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <rect x="15" y="110" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          ${cadLevelMark(25, 110, "3F")}
          <rect x="40" y="65" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Cabin đang đỗ tầng trên cùng -->
          <rect x="75" y="65" width="85" height="75" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
          <text x="117" y="105" fill="#0284c7" font-size="8" font-weight="bold" text-anchor="middle">CABIN</text>
          
          <!-- Khung đối trọng -->
          <rect x="165" y="130" width="12" height="50" fill="#475569" stroke="#0f172a" stroke-width="1"/>

          <!-- TUM KỸ THUẬT: Dầm bệ máy I200 & Động cơ -->
          <rect x="40" y="38" width="158" height="10" fill="#334155" stroke="#0f172a" stroke-width="1"/>
          <rect x="90" y="18" width="35" height="20" fill="#0284c7" stroke="#0f172a" stroke-width="1"/>
          <circle cx="125" cy="28" r="10" fill="#0f2766" stroke="#fbbf24" stroke-width="1"/>

          <!-- Sàn mái tum & MÓC TREO PA-LĂNG 'H' -->
          <rect x="40" y="0" width="158" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <path d="M 125 14 L 125 24 A 5 5 0 1 1 115 24" fill="none" stroke="#dc2626" stroke-width="2.5"/>

          <!-- Khung phóng to chi tiết 'H' (Nằm trọn trong box) -->
          <g transform="translate(195, 5)">
            <rect x="0" y="0" width="85" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
            <rect x="5" y="8" width="75" height="12" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="0.8"/>
            <path d="M 42 12 L 42 28 A 6 6 0 1 1 30 28" fill="none" stroke="#dc2626" stroke-width="2.5"/>
            <text x="42" y="6" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">Thép gai ∅20</text>
            <text x="42" y="38" fill="#b91c1c" font-size="6.5" font-weight="900" class="cad-halo-text" text-anchor="middle">MÓC 'H' (2.0 TẤN)</text>
          </g>

          ${cadDimV(10, 240, 280, "PIT=" + specs.Pit, "#b91c1c")}
          ${cadDimV(10, 0, 110, "OH=" + specs.Oh, "#b91c1c")}

          <text x="200" y="180" fill="#475569" font-size="6.5" font-weight="bold" class="cad-halo-text">Dầm BTCT 3 mặt hố</text>
          <text x="200" y="190" fill="#475569" font-size="6.5" font-weight="bold" class="cad-halo-text">khoảng cách ≤ 1.8m</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 07: MẶT CẮT ĐỈNH TUM KT PHÓNG TO
  // ==========================================================================================
  function renderDrawing7_MachineRoomDetail(specs) {
    return `
      <g id="drawing7_machineRoomDetail" class="cad-drawing">
        ${cadTitleBubble(15, 12, "07", "MẶT CẮT ĐỈNH TUM PHÓNG TO", "1/20")}

        <g transform="translate(30, 50)">
          <!-- Khung tum kỹ thuật -->
          <rect x="25" y="0" width="245" height="12" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="25" y="12" width="16" height="75" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="254" y="12" width="16" height="75" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Móc treo pa lăng Chi tiết 'H' -->
          <path d="M 160 12 L 160 26 A 6 6 0 1 1 148 26" fill="none" stroke="#dc2626" stroke-width="3"/>
          <text x="160" y="6" fill="#b91c1c" font-size="7.5" font-weight="bold" text-anchor="middle" class="cad-halo-text">CHI TIẾT 'H'</text>

          <!-- Cửa vào tum KT: R800 x C1000 -->
          <rect x="25" y="30" width="16" height="50" fill="#ffffff" stroke="#ffffff"/>
          <line x1="25" y1="30" x2="41" y2="30" stroke="#0f172a" stroke-width="1"/>
          <line x1="25" y1="80" x2="41" y2="80" stroke="#0f172a" stroke-width="1"/>
          <text x="12" y="55" fill="#b45309" font-size="7" font-weight="bold" text-anchor="end" class="cad-halo-text">
            CỬA VÀO TUM R800xC1000
          </text>

          <!-- Dầm thép bệ đỡ máy kéo I200 -->
          <rect x="41" y="80" width="213" height="12" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <text x="95" y="90" fill="#ffffff" font-size="7" font-weight="bold">DẦM THÉP ĐỠ MÁY I200</text>

          <!-- Động cơ máy kéo PMSM không hộp số & Puly kéo -->
          <rect x="125" y="45" width="45" height="35" rx="3" fill="#0284c7" stroke="#0f172a" stroke-width="1.2"/>
          <circle cx="160" cy="62" r="16" fill="#0f2766" stroke="#fbbf24" stroke-width="1.5"/>
          <circle cx="160" cy="62" r="6" fill="#fbbf24"/>
          <text x="145" y="40" fill="#0284c7" font-size="7.5" font-weight="bold" class="cad-halo-text">MÁY KÉO PMSM</text>

          <!-- Cáp tải -->
          <line x1="150" y1="62" x2="150" y2="135" stroke="#475569" stroke-width="2"/>
          <line x1="170" y1="62" x2="170" y2="185" stroke="#475569" stroke-width="1.5"/>

          <!-- Đỉnh Cabin & Lan can an toàn -->
          <rect x="75" y="135" width="115" height="90" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
          <rect x="78" y="115" width="109" height="20" fill="none" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4,2"/>
          <text x="132" y="128" fill="#ea580c" font-size="6.5" font-weight="bold" text-anchor="middle" class="cad-halo-text">LAN CAN AN TOÀN NÓC</text>
          
          <text x="132" y="175" fill="#0284c7" font-size="9" font-weight="900" text-anchor="middle">CABIN TẦNG TRÊN CÙNG</text>

          <!-- Đối trọng phía sau -->
          <rect x="200" y="125" width="16" height="70" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <text x="208" y="165" fill="#ffffff" font-size="7" font-weight="bold" transform="rotate(90, 208, 165)" text-anchor="middle">ĐỐI TRỌNG</text>

          <!-- Cửa vào tầng trên cùng -->
          <rect x="15" y="135" width="26" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <text x="18" y="130" fill="#0f172a" font-size="7" font-weight="bold">TOP</text>

          ${cadDimV(285, 0, 135, "OH = " + specs.Oh + " mm", "#b91c1c")}
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢNG PHẢN LỰC KẾT CẤU & YÊU CẦU KỸ THUẬT (TRẮNG ĐEN RÕ NÉT)
  // ==========================================================================================
  function renderSpecsAndReactions(specs) {
    return `
      <g id="specsAndReactionsSection">
        <!-- BẢNG PHẢN LỰC TÁC ĐỘNG HỐ THANG (R1 - R4) -->
        <g id="reactionForcesTable" transform="translate(0, 0)">
          <rect x="0" y="0" width="395" height="26" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" rx="2"/>
          <text x="197" y="18" fill="#0f172a" font-size="10" font-weight="900" text-anchor="middle" letter-spacing="0.4">
            BẢNG TÍNH LỰC TÁC ĐỘNG HỐ THANG (REACTIONS)
          </text>

          <g transform="translate(0, 30)" font-size="8.5">
            <!-- R1 -->
            <rect x="0" y="0" width="125" height="26" fill="#f8fafc" stroke="#0f172a" stroke-width="0.7"/>
            <text x="62" y="17" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R1 (Đáy ray Cabin)</text>
            <rect x="125" y="0" width="270" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="0.7"/>
            <text x="135" y="17" fill="#0f172a" font-weight="900" class="cad-num">R1 = ${specs.R1} kN</text>
            <text x="220" y="17" fill="#64748b" font-size="7.5">(Tác động đáy hố PIT khi phanh gấp)</text>

            <!-- R2 -->
            <rect x="0" y="26" width="125" height="26" fill="#f8fafc" stroke="#0f172a" stroke-width="0.7"/>
            <text x="62" y="43" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R2 (Đáy ray Tạ)</text>
            <rect x="125" y="26" width="270" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="0.7"/>
            <text x="135" y="43" fill="#0f172a" font-weight="900" class="cad-num">R2 = ${specs.R2} kN</text>
            <text x="220" y="43" fill="#64748b" font-size="7.5">(Tác động đáy PIT khi đối trọng chạm đệm)</text>

            <!-- R3 -->
            <rect x="0" y="52" width="125" height="26" fill="#f8fafc" stroke="#0f172a" stroke-width="0.7"/>
            <text x="62" y="69" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R3 (Bệ máy kéo)</text>
            <rect x="125" y="52" width="270" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="0.7"/>
            <text x="135" y="69" fill="#0f172a" font-weight="900" class="cad-num">R3 = ${specs.R3} kN</text>
            <text x="220" y="69" fill="#64748b" font-size="7.5">(Tải trọng động lên dầm chịu lực bệ máy)</text>

            <!-- R4 -->
            <rect x="0" y="78" width="125" height="26" fill="#f8fafc" stroke="#0f172a" stroke-width="0.7"/>
            <text x="62" y="95" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R4 (Móc Pa-lăng)</text>
            <rect x="125" y="78" width="270" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="0.7"/>
            <text x="135" y="95" fill="#b91c1c" font-weight="900" class="cad-num">R4 = ${specs.R4} kN</text>
            <text x="220" y="95" fill="#b91c1c" font-size="7.5" font-weight="bold">(Tải trọng kiểm định móc nóc tum: 2.0 Tấn)</text>
          </g>
        </g>

        <!-- 6 YÊU CẦU KỸ THUẬT XÂY DỰNG & NGHIỆM THU -->
        <g id="civilNotesBlock" transform="translate(0, 145)">
          <rect x="0" y="0" width="395" height="24" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" rx="2"/>
          <text x="197" y="17" fill="#0f172a" font-size="9" font-weight="900" text-anchor="middle" letter-spacing="0.3">
            YÊU CẦU KỸ THUẬT XÂY DỰNG &amp; NGHIỆM THU HỐ THANG
          </text>

          <rect x="0" y="28" width="395" height="175" fill="#ffffff" stroke="#0f172a" stroke-width="1" rx="2"/>
          <g transform="translate(12, 44)" font-size="8.5">
            <text x="0" y="0" fill="#0f172a" font-weight="900">1. Sai lệch hố:</text>
            <text x="75" y="0" fill="#334155">Độ thẳng đứng giếng thang không lệch quá ±10mm toàn bộ chiều cao.</text>

            <text x="0" y="22" fill="#0f172a" font-weight="900">2. Dầm giằng:</text>
            <text x="75" y="22" fill="#334155">Đổ đà giằng BTCT 200x200 ở 3 mặt hố, khoảng cách liên tiếp ≤ 1800mm.</text>

            <text x="0" y="44" fill="#0f172a" font-weight="900">3. Lanh-tô cửa:</text>
            <text x="75" y="44" fill="#334155">Đổ dầm BTCT cao 2250mm từ cốt hoàn thiện để gắn ray treo cửa tầng.</text>

            <text x="0" y="66" fill="#b91c1c" font-weight="900">4. Chống thấm:</text>
            <text x="75" y="66" fill="#b91c1c" font-weight="bold">Đáy và vách PIT dâng cao 1000mm phải chống thấm tuyệt đối không ngấm nước.</text>

            <text x="0" y="88" fill="#0f172a" font-weight="900">5. Điện nguồn:</text>
            <text x="75" y="88" fill="#334155">Kéo điện nguồn 3 pha 380V (hoặc 1 pha 220V) + tiếp địa độc lập R ≤ 4Ω.</text>

            <text x="0" y="110" fill="#0f172a" font-weight="900">6. Thông gió tum:</text>
            <text x="75" y="110" fill="#334155">Cửa thông gió/quạt hút đạt tối thiểu 1% diện tích mặt bằng để tản nhiệt máy.</text>
          </g>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // MASTER BẢN VẼ A3 TỔNG HỢP (TRÌNH BÀY SANG TRỌNG, KỸ THUẬT, KHÔNG CHỒNG CHÉO CHỮ)
  // ==========================================================================================
  function generateMasterShopDrawingSvgA3(specs) {
    return `
      <svg id="shopDrawingMainSvg" viewBox="0 0 1600 1130" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" class="bg-white select-none" style="font-family: 'Roboto', Arial, 'Segoe UI', sans-serif !important;">
        ${getCadDefs()}

        <!-- NỀN TRẮNG BẢN VẼ -->
        <rect x="0" y="0" width="1600" height="1130" fill="#ffffff"/>

        <!-- KHUNG VIỀN NGOÀI BẢN VẼ A3 CHUẨN XÂY DỰNG -->
        <rect x="15" y="15" width="1570" height="1100" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="20" y="20" width="1560" height="1090" fill="none" stroke="#0f172a" stroke-width="1.2"/>

        <!-- BANNER HEADER CHÍNH (TRẮNG ĐEN KỸ THUẬT, THANH LỊCH) -->
        <g id="headerBanner" transform="translate(20, 20)">
          <rect x="0" y="0" width="1560" height="46" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
          <text x="25" y="29" fill="#0f172a" font-size="15" font-weight="900" letter-spacing="0.8">
            SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
          </text>
          <line x1="430" y1="10" x2="430" y2="36" stroke="#cbd5e1" stroke-width="1"/>
          <text x="445" y="29" fill="#334155" font-size="11" font-weight="700">
            HỒ SƠ BẢN VẼ SHOP DRAWING THIẾT KẾ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP (07 MẶT CẮT TIÊU CHUẨN)
          </text>
          <line x1="1290" y1="10" x2="1290" y2="36" stroke="#cbd5e1" stroke-width="1"/>
          <text x="1310" y="29" fill="#0f172a" font-size="11.5" font-weight="900" class="cad-num">
            HOTLINE ADMIN: 0914.587.575
          </text>
        </g>

        <!-- HÀNG 1: BẢN VẼ 01 + BẢN VẼ 02 + BẢN VẼ 03 + BẢN VẼ 04 (Y=75 -> 365, CAO 290PX) -->
        <g transform="translate(25, 75)">
          <rect x="0" y="0" width="375" height="290" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing1_HoistwayPlan(specs)}
        </g>

        <g transform="translate(410, 75)">
          <rect x="0" y="0" width="375" height="290" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing2_RoughDoorOpening(specs)}
        </g>

        <g transform="translate(795, 75)">
          <rect x="0" y="0" width="375" height="290" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing3_FinishedDoor(specs)}
        </g>

        <g transform="translate(1180, 75)">
          <rect x="0" y="0" width="395" height="290" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing4_ElevatorInstallationPlan(specs)}
        </g>

        <!-- HÀNG 2: BẢN VẼ 05 + BẢN VẼ 06 + BẢN VẼ 07 + BẢNG PHẢN LỰC (Y=375 -> 785, CAO 410PX) -->
        <g transform="translate(25, 375)">
          <rect x="0" y="0" width="375" height="410" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing5_MachineBeamsPlan(specs)}
        </g>

        <g transform="translate(410, 375)">
          <rect x="0" y="0" width="375" height="410" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing6_VerticalSection(specs)}
        </g>

        <g transform="translate(795, 375)">
          <rect x="0" y="0" width="375" height="410" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing7_MachineRoomDetail(specs)}
        </g>

        <!-- BẢNG PHẢN LỰC R1-R4 & YÊU CẦU NGHIỆM THU -->
        <g transform="translate(1180, 375)">
          ${renderSpecsAndReactions(specs)}
        </g>

        <!-- HÀNG 3: BẢNG THÔNG SỐ ĐỒNG BỘ THIẾT BỊ (Y=795 -> 1085, CAO 280PX) -->
        <g transform="translate(25, 795)">
          <rect x="0" y="0" width="1145" height="280" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
          <text x="25" y="26" fill="#0f172a" font-size="11.5" font-weight="900" letter-spacing="0.4">
            HỆ THỐNG THÔNG SỐ ĐỒNG BỘ THIẾT BỊ THANG MÁY (TECHNICAL SPECIFICATIONS):
          </text>
          
          <g transform="translate(25, 42)" font-size="9" fill="#334155">
            <!-- Cột 1 -->
            <text x="0" y="20">• Tải trọng định mức: <tspan font-weight="900" fill="#0f172a" class="cad-num">${specs.cap} KG (${specs.persons} người)</tspan></text>
            <text x="0" y="48">• Kích thước lọt lòng hố: <tspan font-weight="900" fill="#0f172a" class="cad-num">W${specs.W} x D${specs.D} mm</tspan></text>
            <text x="0" y="76">• Chiều sâu hố PIT: <tspan font-weight="900" fill="#b91c1c" class="cad-num">${specs.Pit} mm</tspan> (Chống thấm 1.0m)</text>
            <text x="0" y="104">• Động cơ máy kéo: <tspan font-weight="900" fill="#0f172a">Fuji / Mitsubishi / Montanari PMSM</tspan></text>
            <text x="0" y="132">• Ray dẫn hướng Cabin: <tspan font-weight="900" fill="#0f172a">Ray đặc T78 / T89 chuyên dụng</tspan></text>

            <!-- Cột 2 -->
            <text x="390" y="20">• Tốc độ vận hành: <tspan font-weight="900" fill="#0f172a" class="cad-num">${specs.speed} m/s (60 m/phút)</tspan></text>
            <text x="390" y="48">• Kích thước Cabin: <tspan font-weight="900" fill="#0f172a" class="cad-num">CW${specs.CW} x CD${specs.CD} x CH${specs.CH} mm</tspan></text>
            <text x="390" y="76">• Chiều cao Tum OH: <tspan font-weight="900" fill="#b91c1c" class="cad-num">${specs.Oh} mm</tspan></text>
            <text x="390" y="104">• Nguồn điện động lực: <tspan font-weight="900" fill="#0f172a">3 Pha 380V 50Hz (Aptomat 40A)</tspan></text>
            <text x="390" y="132">• Ray dẫn hướng Đối trọng: <tspan font-weight="900" fill="#0f172a">Ray đặc T50 / T75 chuyên dụng</tspan></text>

            <!-- Cột 3 -->
            <text x="760" y="20">• Số điểm dừng: <tspan font-weight="900" fill="#0f172a" class="cad-num">${specs.Stops} Stops / ${specs.Stops} Doors</tspan></text>
            <text x="760" y="48">• Cửa tầng / Cabin: <tspan font-weight="900" fill="#0f172a" class="cad-num">CO${specs.CO} x DH${specs.DH} mm (Mở tim)</tspan></text>
            <text x="760" y="76">• Móc cẩu nóc Tum R4: <tspan font-weight="900" fill="#b91c1c" class="cad-num">2.0 Tấn (Thép gai ∅20)</tspan></text>
            <text x="760" y="104">• Hệ điều khiển: <tspan font-weight="900" fill="#0f172a">Biến tần VVVF vi xử lý 32 Bit</tspan></text>
            <text x="760" y="132">• Tiếp địa an toàn: <tspan font-weight="900" fill="#0f172a">Hệ thống cọc tiếp địa R ≤ 4Ω</tspan></text>

            <!-- Khung cảnh báo nghiệm thu đỏ thanh lịch -->
            <line x1="0" y1="160" x2="1100" y2="160" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="0" y="184" fill="#b91c1c" font-size="9" font-weight="900">
              LƯU Ý THI CÔNG &amp; NGHIỆM THU:
            </text>
            <text x="0" y="202" fill="#334155" font-size="8.5">
              Chủ đầu tư và Nhà thầu xây dựng đối chiếu kích thước lọt lòng thực tế hố thang trước khi đổ dầm sàn và dầm giằng giữ ray. Mọi phát sinh sai lệch cần thông báo ngay tới Hotline Admin: 0914.587.575 để được kỹ sư hướng dẫn điều chỉnh kịp thời.
            </text>
          </g>
        </g>

        <!-- KHUNG TÊN KỸ THUẬT TIÊU CHUẨN A3 (TRẮNG ĐEN, KHÔNG TÔ MÀU THEO YÊU CẦU) -->
        <g transform="translate(1180, 795)">
          ${renderCadTitleBlock(specs, "BẢN VẼ TỔNG HỢP 07 MẶT CẮT THI CÔNG HỐ THANG", "STTM-A3-FULL", "A3")}
        </g>
      </svg>
    `;
  }

  // ==========================================================================================
  // XUẤT TẬP HỒ SƠ 8 TRANG A4 ĐÓNG QUYỂN (PRINT BOOKLET)
  // ==========================================================================================
  function generateMultiPageA4Html(specs) {
    var defs = getCadDefs();

    function wrapA4Page(title, drawingNo, contentHtml, pageNum) {
      return `
        <div class="a4-page">
          <div class="a4-header">
            <div class="brand">SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC</div>
            <div class="sub">HỒ SƠ BẢN VẼ SHOP DRAWING KỸ THUẬT • HOTLINE: 0914.587.575 • TRANG ${pageNum}/8</div>
          </div>
          
          <div class="a4-drawing-content">
            ${contentHtml}
          </div>

          <div class="a4-footer">
            <svg viewBox="0 0 395 280" width="370" height="auto" class="footer-title-block">
              ${defs}
              ${renderCadTitleBlock(specs, title, drawingNo, "A4")}
            </svg>
          </div>
        </div>
      `;
    }

    // Trang 1: Trang bìa hồ sơ kỹ thuật & Bảng thông số chung
    var page1Content = `
      <div style="padding: 25px; font-family: 'Roboto', Arial, sans-serif; color: #0f172a;">
        <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 22px;">
          <h1 style="color: #0f172a; font-size: 20px; margin: 0 0 6px; font-weight: 900; letter-spacing: 0.5px;">SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC</h1>
          <h2 style="color: #b91c1c; font-size: 15px; margin: 0 0 6px; font-weight: 900;">HỒ SƠ THIẾT KẾ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP</h2>
          <p style="color: #64748b; font-size: 11px; margin: 0; font-weight: 700;">ÁP DỤNG QUY CHUẨN KỸ THUẬT QUỐC GIA QCVN 02:2019/BLĐTBXH & TCVN 6395:2008</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px;">
          <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 6px; padding: 14px; font-size: 11.5px; line-height: 1.8;">
            <div style="font-weight: 900; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; margin-bottom: 10px; padding-bottom: 5px;">
              THÔNG SỐ KỸ THUẬT HỆ THỐNG
            </div>
            <div>• Tải trọng định mức: <strong>${specs.cap} KG (${specs.persons} người)</strong></div>
            <div>• Vận tốc thiết kế: <strong>${specs.speed} m/s (60 m/p)</strong></div>
            <div>• Số điểm dừng: <strong>${specs.Stops} Tầng</strong></div>
            <div>• Kích thước giếng thang (W x D): <strong>${specs.W} x ${specs.D} mm</strong></div>
            <div>• Kích thước Cabin (CW x CD x CH): <strong>${specs.CW} x ${specs.CD} x ${specs.CH} mm</strong></div>
            <div>• Kích thước cửa tầng: <strong>${specs.CO} x ${specs.DH} mm (Mở tim)</strong></div>
            <div>• Chiều sâu hố PIT: <strong>${specs.Pit} mm</strong></div>
            <div>• Chiều cao tum OH: <strong>${specs.Oh} mm</strong></div>
            <div>• Động cơ: <strong>Fuji / Mitsubishi / Montanari PMSM</strong></div>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 6px; padding: 14px; font-size: 11.5px; line-height: 1.8;">
            <div style="font-weight: 900; color: #b91c1c; border-bottom: 1.5px solid #cbd5e1; margin-bottom: 10px; padding-bottom: 5px;">
              BẢNG PHẢN LỰC TÁC ĐỘNG KẾT CẤU (KN)
            </div>
            <div>• Lực đáy ray Cabin (R1): <strong style="color:#0f172a;">${specs.R1} kN</strong> (Khi phanh gấp)</div>
            <div>• Lực đáy ray Tạ (R2): <strong style="color:#0f172a;">${specs.R2} kN</strong> (Khi tạ chạm đệm)</div>
            <div>• Lực dầm bệ máy (R3): <strong style="color:#0f172a;">${specs.R3} kN</strong> (Tải trọng động sàn)</div>
            <div>• Móc pa-lăng tum (R4): <strong style="color:#b91c1c;">${specs.R4} kN (2.0 Tấn)</strong></div>
            <div style="margin-top: 12px; font-style: italic; color: #64748b; font-size: 10px;">
              * Căn cứ để Kỹ sư kết cấu tính toán móng, đài cọc và dầm sàn đỡ thang máy.
            </div>
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 11px; line-height: 1.7;">
          <div style="font-weight: 900; color: #0f172a; margin-bottom: 8px; font-size: 11.5px;">DANH MỤC 07 BẢN VẼ KỸ THUẬT TRONG HỒ SƠ:</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
            <div>1. Mặt bằng hố thang (Điển hình &amp; Sàn tầng)</div>
            <div>5. Mặt bằng dầm đặt máy kéo đỉnh hố</div>
            <div>2. Chờ thô cửa tầng (Mặt đứng + Cắt 1-1, 2-2)</div>
            <div>6. Mặt cắt đứng giếng thang tổng thể</div>
            <div>3. Cửa tầng hoàn thiện &amp; Hộp LOP</div>
            <div>7. Mặt cắt đỉnh Tum KT / Phòng máy phóng to</div>
            <div>4. Mặt bằng lắp thang (Cabin, Đối trọng, Ray)</div>
            <div>8. Khung tên kỹ thuật &amp; Xác nhận Admin</div>
          </div>
        </div>
      </div>
    `;

    var page2Content = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing1_HoistwayPlan(specs)}</svg>`;
    var page3Content = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing2_RoughDoorOpening(specs)}</svg>`;
    var page4Content = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing3_FinishedDoor(specs)}</svg>`;
    var page5Content = `<svg viewBox="0 0 395 290" width="100%" height="auto">${defs}${renderDrawing4_ElevatorInstallationPlan(specs)}</svg>`;
    var page6Content = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing5_MachineBeamsPlan(specs)}</svg>`;
    var page7Content = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing6_VerticalSection(specs)}</svg>`;
    var page8Content = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing7_MachineRoomDetail(specs)}</svg>`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Hồ Sơ Bản Vẽ Shop Drawing (Tập A4 8 Trang) - Siêu Thị Thang Máy Toàn Quốc</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
            font-family: 'Roboto', Arial, 'Segoe UI', sans-serif !important;
          }
          @page {
            size: A4 portrait;
            margin: 6mm;
          }
          @media print {
            body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .a4-page { page-break-after: always; width: 100%; height: 98vh; display: flex; flex-direction: column; justify-content: space-between; border: none !important; box-shadow: none !important; }
          }
          body {
            margin: 0;
            padding: 15px;
            background: #cbd5e1;
            font-family: 'Roboto', Arial, sans-serif;
          }
          .a4-page {
            background: #fff;
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto 20px;
            padding: 8mm;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #94a3b8;
          }
          .a4-header {
            border-bottom: 1.5px solid #0f172a;
            padding-bottom: 6px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .a4-header .brand {
            font-size: 11.5px;
            font-weight: 900;
            color: #0f172a;
          }
          .a4-header .sub {
            font-size: 8.5px;
            font-weight: bold;
            color: #64748b;
          }
          .a4-drawing-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 5px;
          }
          .a4-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
          }
          .footer-title-block {
            max-width: 370px;
            height: auto;
          }
        </style>
      </head>
      <body>
        ${wrapA4Page("TỔNG QUAN HỒ SƠ & THÔNG SỐ KỸ THUẬT", "STTM-A4-01", page1Content, 1)}
        ${wrapA4Page("MẶT BẰNG HỐ THANG (ĐIỂN HÌNH & SÀN TẦNG)", "STTM-A4-02", page2Content, 2)}
        ${wrapA4Page("CHỜ THÔ CỬA TẦNG (OPEN & MẶT CẮT)", "STTM-A4-03", page3Content, 3)}
        ${wrapA4Page("CỬA TẦNG HOÀN THIỆN & HỘP LOP 1200", "STTM-A4-04", page4Content, 4)}
        ${wrapA4Page("MẶT BẰNG LẮP THANG (CABIN, ĐỐI TRỌNG & RAY)", "STTM-A4-05", page5Content, 5)}
        ${wrapA4Page("MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ THANG", "STTM-A4-06", page6Content, 6)}
        ${wrapA4Page("MẶT CẮT ĐỨNG GIẾNG THANG (PIT, TẦNG, DẦM GIẰNG)", "STTM-A4-07", page7Content, 7)}
        ${wrapA4Page("MẶT CẮT ĐỈNH TUM PHÓNG TO", "STTM-A4-08", page8Content, 8)}

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
        </script>
      </body>
      </html>
    `;
  }

  // ==========================================================================================
  // MODAL XEM TRƯỚC VÀ ĐIỀU HƯỚNG BẢN VẼ TRÊN GIAO DIỆN WEB
  // ==========================================================================================
  window.openShopDrawingPdfModal = function (customW, customD, customPit, customOh, customStops, customCap) {
    var W = customW || (document.getElementById('inputWidth') ? document.getElementById('inputWidth').value : (document.getElementById('homeInputW') ? document.getElementById('homeInputW').value : 1400));
    var D = customD || (document.getElementById('inputDepth') ? document.getElementById('inputDepth').value : (document.getElementById('homeInputD') ? document.getElementById('homeInputD').value : 1450));
    var Pit = customPit || (document.getElementById('inputPit') ? document.getElementById('inputPit').value : (document.getElementById('homeInputPit') ? document.getElementById('homeInputPit').value : 350));
    var Oh = customOh || (document.getElementById('inputOh') ? document.getElementById('inputOh').value : (document.getElementById('homeInputOh') ? document.getElementById('homeInputOh').value : 3200));
    var Stops = customStops || (document.getElementById('inputStops') ? document.getElementById('inputStops').value : (document.getElementById('homeInputStops') ? document.getElementById('homeInputStops').value : 4));
    var Cap = customCap || (W < 1350 ? 300 : (W < 1550 ? 450 : 630));

    var specs = calculateShopDrawingSpecs(W, D, Pit, Oh, Stops, Cap);
    var masterSvgA3 = generateMasterShopDrawingSvgA3(specs);

    var existingModal = document.getElementById('shop-drawing-modal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'shop-drawing-modal';
    modal.className = 'fixed inset-0 bg-black/95 backdrop-blur-md z-[100000] flex flex-col p-2 sm:p-4 overflow-hidden animate-fade-in font-sans';
    modal.innerHTML = `
      <!-- TOP ACTION BAR TRONG MODAL -->
      <div class="bg-navy-950 border border-slate-700 text-white rounded-xl px-4 py-3 mb-2 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="text-xl text-gold-400 flex-shrink-0">📐</span>
          <div class="min-w-0">
            <h3 class="font-black text-xs sm:text-sm text-gold-400 uppercase tracking-tight truncate">
              HỒ SƠ BẢN VẼ SHOP DRAWING HỐ THANG BÊ TÔNG (07 MẶT CẮT KỸ THUẬT)
            </h3>
            <p class="text-[10px] text-slate-300 hidden sm:block">
              Chuẩn thẩm định kỹ thuật QCVN 02:2019 • Xuất PDF Khổ A3 Kỹ Sư &amp; Tập Hồ Sơ A4 (8 Trang Đóng Quyển)
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 flex-shrink-0">
          <!-- NÚT IN / XUẤT A3 KỸ SƯ -->
          <button onclick="printShopDrawingA3()" class="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white px-3 sm:px-4 py-2 rounded-lg font-black text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span>IN PDF A3 (KỸ SƯ)</span>
          </button>

          <!-- NÚT IN / XUẤT TẬP A4 8 TRANG -->
          <button onclick="printShopDrawingA4Booklet()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg font-black text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95">
            <span>📑</span>
            <span>IN TẬP A4 (8 TRANG)</span>
          </button>
          
          <!-- TẢI SVG VECTOR -->
          <button onclick="downloadShopDrawingSvg()" class="bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 px-3 py-2 rounded-lg font-bold text-xs hidden md:flex items-center gap-1.5 transition">
            <span>📥</span> Tải SVG
          </button>

          <!-- GỬI ZALO -->
          <button onclick="sendShopDrawingToZalo('${specs.W}', '${specs.D}', '${specs.Pit}', '${specs.Oh}', '${specs.Stops}', '${specs.cap}')" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition">
            <span>💬</span> Gửi Zalo Admin
          </button>

          <button onclick="document.getElementById('shop-drawing-modal').remove()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white text-xl font-bold flex items-center justify-center transition leading-none">
            &times;
          </button>
        </div>
      </div>

      <!-- THANH CHỌN TAB XEM TỪNG MẶT CẮT HOẶC XEM TOÀN BỘ A3 -->
      <div class="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg mb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
        <span class="text-slate-400 font-bold flex-shrink-0 text-[11px]">CHỌN GÓC NHÌN:</span>
        <button onclick="switchDrawingView('all')" id="btnTab_all" class="tab-view-btn px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black flex-shrink-0">
          📐 Toàn Bộ 07 Mặt Cắt (Khổ A3)
        </button>
        <button onclick="switchDrawingView('mc1')" id="btnTab_mc1" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          1. Mặt Bằng Hố Thang
        </button>
        <button onclick="switchDrawingView('mc2')" id="btnTab_mc2" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          2. Chờ Thô Cửa Tầng
        </button>
        <button onclick="switchDrawingView('mc3')" id="btnTab_mc3" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          3. Cửa Tầng Hoàn Thiện
        </button>
        <button onclick="switchDrawingView('mc4')" id="btnTab_mc4" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          4. Mặt Bằng Lắp Thang
        </button>
        <button onclick="switchDrawingView('mc5')" id="btnTab_mc5" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          5. Mặt Bằng Dầm Máy
        </button>
        <button onclick="switchDrawingView('mc6')" id="btnTab_mc6" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          6. Mặt Cắt Đứng Hố
        </button>
        <button onclick="switchDrawingView('mc7')" id="btnTab_mc7" class="tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0">
          7. Mặt Cắt Đỉnh Tum
        </button>
      </div>

      <!-- VÙNG HIỂN THỊ BẢN VẼ -->
      <div id="shopDrawingPrintArea" class="flex-1 overflow-auto bg-slate-900/90 rounded-xl p-2 sm:p-4 flex items-center justify-center border border-slate-800">
        <div class="bg-white max-w-[1600px] w-full rounded shadow-2xl p-1 overflow-hidden" id="shopDrawingContainer">
          ${masterSvgA3}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    window._currentSpecs = specs;
    window._masterSvgA3 = masterSvgA3;
  };

  // CHUYỂN ĐỔI GÓC NHÌN XEM TRƯỚC TRONG MODAL
  window.switchDrawingView = function (viewId) {
    var specs = window._currentSpecs;
    if (!specs) return;

    document.querySelectorAll('.tab-view-btn').forEach(function (btn) {
      btn.className = 'tab-view-btn px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white font-bold flex-shrink-0';
    });
    var activeBtn = document.getElementById('btnTab_' + viewId);
    if (activeBtn) {
      activeBtn.className = 'tab-view-btn px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black flex-shrink-0';
    }

    var container = document.getElementById('shopDrawingContainer');
    if (!container) return;

    var defs = getCadDefs();

    if (viewId === 'all') {
      container.innerHTML = generateMasterShopDrawingSvgA3(specs);
    } else if (viewId === 'mc1') {
      container.innerHTML = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing1_HoistwayPlan(specs)}</svg>`;
    } else if (viewId === 'mc2') {
      container.innerHTML = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing2_RoughDoorOpening(specs)}</svg>`;
    } else if (viewId === 'mc3') {
      container.innerHTML = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing3_FinishedDoor(specs)}</svg>`;
    } else if (viewId === 'mc4') {
      container.innerHTML = `<svg viewBox="0 0 395 290" width="100%" height="auto">${defs}${renderDrawing4_ElevatorInstallationPlan(specs)}</svg>`;
    } else if (viewId === 'mc5') {
      container.innerHTML = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing5_MachineBeamsPlan(specs)}</svg>`;
    } else if (viewId === 'mc6') {
      container.innerHTML = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing6_VerticalSection(specs)}</svg>`;
    } else if (viewId === 'mc7') {
      container.innerHTML = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing7_MachineRoomDetail(specs)}</svg>`;
    }
  };

  // IN BẢN VẼ A3 NGANG (BẢN KỸ SƯ / NHÀ THẦU)
  window.printShopDrawingA3 = function () {
    var specs = window._currentSpecs;
    if (!specs) return;
    var masterSvg = generateMasterShopDrawingSvgA3(specs);

    var printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Bản Vẽ Kỹ Thuật Shop Drawing A3 (07 Mặt Cắt) - Siêu Thị Thang Máy Toàn Quốc</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
            font-family: 'Roboto', Arial, 'Segoe UI', sans-serif !important;
          }
          @page {
            size: A3 landscape;
            margin: 4mm;
          }
          @media print {
            body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page-container { width: 100%; height: 98vh; display: flex; align-items: center; justify-content: center; }
            svg { width: 100%; height: 100%; max-height: 98vh; }
          }
          body { margin: 0; padding: 10px; background: #cbd5e1; font-family: 'Roboto', Arial, sans-serif; }
          .page-container { background: #fff; max-width: 1600px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        </style>
      </head>
      <body>
        <div class="page-container">
          ${masterSvg}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // IN TẬP HỒ SƠ 8 TRANG A4 ĐÓNG QUYỂN (DÀNH CHO CHỦ NHÀ / THẨM ĐỊNH)
  window.printShopDrawingA4Booklet = function () {
    var specs = window._currentSpecs;
    if (!specs) return;
    var printWindow = window.open('', '_blank');
    printWindow.document.write(generateMultiPageA4Html(specs));
    printWindow.document.close();
  };

  // TẢI FILE SVG VECTOR BẢN VẼ
  window.downloadShopDrawingSvg = function () {
    var svg = document.getElementById('shopDrawingMainSvg');
    if (!svg) return;
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    var blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Ban_Ve_Shop_Drawing_7_Mat_Cat_' + Date.now() + '.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // GỬI THÔNG TIN VÀ YÊU CẦU FILE BẢN VẼ QUA ZALO ADMIN
  window.sendShopDrawingToZalo = function (W, D, Pit, Oh, Stops, Cap) {
    var details = 'Hồ sơ bản vẽ Shop Drawing 7 mặt cắt kỹ thuật: Hố lọt lòng ' + W + 'x' + D + 'mm • PIT: ' + Pit + 'mm • OH: ' + Oh + 'mm • ' + Stops + ' tầng • Tải trọng: ' + Cap + 'kg';
    if (window.openQuickLeadModal) {
      window.openQuickLeadModal('Gửi Trọn Bộ 7 Bản Vẽ Shop Drawing Qua Zalo', details);
    } else {
      var msg = 'Chào Admin 0914.587.575! Tôi cần nhận trọn bộ 7 bản vẽ Shop Drawing và hồ sơ tính toán hố thang: ' + details;
      window.open('https://zalo.me/0914587575?text=' + encodeURIComponent(msg), '_blank');
    }
  };

})();
