// ==========================================================================================
// HỆ THỐNG XUẤT HỒ SƠ BẢN VẼ SHOP DRAWING KỸ THUẬT HỐ THANG BÊ TÔNG (CHUẨN AUTOCAD KỸ SƯ GIỎI)
// Đơn vị thiết kế & phát hành: SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
// Hotline Admin: 0914.587.575 - Website: sieuthithangmaytoanquoc.com
// Quy chuẩn áp dụng: QCVN 02:2019/BLĐTBXH • TCVN 6395:2008 • Bản vẽ Rev 03
// Khổ in: Master A3 Kỹ Sư & Tập Hồ Sơ A4 (8 Trang Đóng Quyển)
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

    // Kích thước Cabin thông thủy chuẩn
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

  // 2. BỘ ĐỊNH NGHĨA HOA VĂN CAD, ĐÚNG 2 FONT CHỮ VÀ BẢO VỆ CHỮ KHÔNG BỊ NÉT VẼ ĐÈ
  function getCadDefs() {
    return `
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&amp;family=Roboto+Mono:wght@500;700&amp;display=swap');
          
          /* QUY TẮC 2 PHÔNG CHỮ TIÊU CHUẨN:
             1. Roboto: Toàn bộ chữ tiếng Việt, tiêu đề, ghi chú, tên bản vẽ.
             2. Roboto Mono: Toàn bộ số đo kích thước, đơn vị, tải trọng, mã hiệu. */
          text {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Arial, sans-serif !important;
            text-rendering: geometricPrecision;
            -webkit-font-smoothing: antialiased;
          }
          .cad-num {
            font-family: 'Roboto Mono', Consolas, monospace !important;
            font-weight: 700;
          }
          
          /* LỚP BẢO VỆ WHITE HALO (3.5px VIỀN TRẮNG):
             Tuyệt đối không để bất kỳ nét vẽ, nét dầm, nét trục tim đè lên chữ */
          .cad-halo-text {
            paint-order: stroke fill;
            stroke: #ffffff;
            stroke-width: 3.5px;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .cad-dim-text {
            font-family: 'Roboto Mono', Consolas, monospace !important;
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
          <line x1="0" y1="0" x2="0" y2="14" stroke="#94a3b8" stroke-width="0.9"/>
          <circle cx="7" cy="7" r="1.1" fill="#64748b"/>
        </pattern>

        <!-- Tường gạch xây chuẩn AutoCAD: gạch hồng nhạt so le -->
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

  // 3. TIỆN ÍCH DỰNG KÍCH THƯỚC VÀ CHỈ DẪN CHUẨN AUTOCAD
  function cadDimH(x1, x2, y, val, color) {
    color = color || '#0f172a';
    var tick = 3;
    var minX = Math.min(x1, x2);
    var maxX = Math.max(x1, x2);
    var midX = (minX + maxX) / 2;
    return `
      <g class="cad-dim">
        <line x1="${minX}" y1="${y - 3}" x2="${minX}" y2="${y + 3}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${maxX}" y1="${y - 3}" x2="${maxX}" y2="${y + 3}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${minX}" y1="${y}" x2="${maxX}" y2="${y}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${minX - tick}" y1="${y + tick}" x2="${minX + tick}" y2="${y - tick}" stroke="${color}" stroke-width="1.2"/>
        <line x1="${maxX - tick}" y1="${y + tick}" x2="${maxX + tick}" y2="${y - tick}" stroke="${color}" stroke-width="1.2"/>
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
        <line x1="${x - 3}" y1="${minY}" x2="${x + 3}" y2="${minY}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x - 3}" y1="${maxY}" x2="${x + 3}" y2="${maxY}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x}" y1="${minY}" x2="${x}" y2="${maxY}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x - tick}" y1="${minY + tick}" x2="${x + tick}" y2="${minY - tick}" stroke="${color}" stroke-width="1.2"/>
        <line x1="${x - tick}" y1="${maxY + tick}" x2="${x + tick}" y2="${maxY - tick}" stroke="${color}" stroke-width="1.2"/>
        <text x="${x - 4}" y="${midY + 3}" fill="${color}" font-size="8.5" class="cad-dim-text" text-anchor="end">${val}</text>
      </g>
    `;
  }

  // Tiêu đề chi tiết chuẩn AutoCAD (Bong bóng số + Tiêu đề + Tỷ lệ)
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

  // Đường chỉ dẫn Leader Line thông minh (tự động căn lề start/end)
  function cadLeader(x1, y1, x2, y2, x3, text, color) {
    color = color || '#0f172a';
    var textAnchor = x3 >= x2 ? 'start' : 'end';
    var textX = x3 >= x2 ? (x2 + 4) : (x2 - 4);
    return `
      <g class="cad-leader">
        <circle cx="${x1}" cy="${y1}" r="1.8" fill="${color}"/>
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="0.8"/>
        <line x1="${x2}" y1="${y2}" x2="${x3}" y2="${y2}" stroke="${color}" stroke-width="0.9"/>
        <text x="${textX}" y="${y2 - 3}" fill="${color}" font-size="7.5" font-weight="700" text-anchor="${textAnchor}" class="cad-halo-text">${text}</text>
      </g>
    `;
  }

  // Cốt cao độ FFL (Tam giác chuẩn kiến trúc)
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
    drawingTitle = drawingTitle || 'HỒ SƠ BẢN VẼ SHOP DRAWING THIẾT KẾ THI CÔNG HỐ THANG';
    drawingNo = drawingNo || 'SHOP-01/07';

    return `
      <g class="cad-title-block">
        <!-- NỀN TRẮNG TUYỆT ĐỐI, LƯỚI ĐEN KỸ THUẬT CHUẨN ISO/TCVN (KHÔNG MÀU MÈ) -->
        <rect x="0" y="0" width="395" height="280" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
        
        <!-- Hàng 1: ĐƠN VỊ THIẾT KẾ & PHÁT HÀNH -->
        <rect x="0" y="0" width="395" height="46" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
        <text x="197" y="20" fill="#0f172a" font-size="11.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
        </text>
        <text x="197" y="35" fill="#475569" font-size="8.5" font-weight="700" text-anchor="middle">
          HOTLINE ADMIN: 0914.587.575 • sieuthithangmaytoanquoc.com
        </text>

        <!-- Hàng 2: TÊN BẢN VẼ -->
        <rect x="0" y="46" width="395" height="44" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
        <text x="197" y="62" fill="#475569" font-size="8" font-weight="700" text-anchor="middle">HỒ SƠ BẢN VẼ THIẾT KẾ THI CÔNG</text>
        <text x="197" y="79" fill="#0f172a" font-size="10" font-weight="900" text-anchor="middle">
          ${drawingTitle}
        </text>

        <!-- Hàng 3: THÔNG TIN DỰ ÁN & TIÊU CHUẨN ÁP DỤNG -->
        <g transform="translate(0, 90)" font-size="8">
          <rect x="0" y="0" width="197" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="10" y="16" fill="#64748b" font-weight="bold">CÔNG TRÌNH:</text>
          <text x="10" y="32" fill="#0f172a" font-weight="900">NHÀ PHỐ / BIỆT THỰ / DỰ ÁN</text>

          <rect x="197" y="0" width="198" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
          <text x="207" y="16" fill="#64748b" font-weight="bold">TIÊU CHUẨN THI CÔNG:</text>
          <text x="207" y="32" fill="#0f172a" font-weight="900">QCVN 02:2019 • TCVN 6395</text>
        </g>

        <!-- Hàng 4: TRÁCH NHIỆM KỸ THUẬT (4 Ô KÝ TÊN CHUYÊN NGHIỆP) -->
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
          LẦN BAN HÀNH: REV 03 • BẢN VẼ PHÁT HÀNH CHÍNH THỨC ĐỂ THI CÔNG HỐ THANG
        </text>
        <text x="12" y="264" fill="#0f172a" font-size="7.5" font-weight="900">
          * ĐỐI CHIẾU THỰC TẾ TRƯỚC KHI ĐỔ BÊ TÔNG SÀN &amp; DẦM GIẰNG GIỮ RAY
        </text>
      </g>
    `;
  }

  // ==========================================================================================
  // CHI TIẾT 01: MẶT BẰNG HỐ THANG (TẦNG ĐIỂN HÌNH & SÀN TẦNG) - TUYỆT ĐỐI KHÔNG CHỒNG NÉT
  // ==========================================================================================
  function renderDrawing1_HoistwayPlan(specs) {
    return `
      <g id="drawing1_hoistwayPlan" class="cad-drawing">
        ${cadTitleBubble(15, 12, "01", "MẶT BẰNG HỐ THANG (HOISTWAY PLAN)", "1/30")}

        <!-- 1A: TẦNG ĐIỂN HÌNH (RỘNG RÃI, THOÁNG ĐÃNG, KHÔNG VA CHẠM KÍCH THƯỚC) -->
        <g id="planTypical" transform="translate(15, 45)">
          <!-- Tiêu đề phân mục ở y=10, cách xa kích thước -->
          <text x="75" y="10" fill="#0f172a" font-size="8.5" font-weight="900" text-anchor="middle">
            1A. TẦNG ĐIỂN HÌNH
          </text>

          <!-- Kích thước lọt lòng HW đặt ở y=28 (text y=24.5 có viền trắng, cách tiêu đề 14px) -->
          ${cadDimH(22, 128, 28, "HW=" + specs.W, "#b91c1c")}

          <!-- Tường gạch bắt đầu từ y=38 đến y=152 (Cao 114px) -->
          <rect x="10" y="38" width="130" height="114" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.3"/>
          <rect x="22" y="48" width="106" height="94" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- 4 Cột bê tông góc 200x200 -->
          <rect x="10" y="38" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="124" y="38" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="10" y="136" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="124" y="136" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Cửa mở phía trước -->
          <rect x="38" y="136" width="74" height="16" fill="#ffffff" stroke="#ffffff"/>
          <line x1="38" y1="136" x2="38" y2="152" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="112" y1="136" x2="112" y2="152" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Trục tim CL (Bắt đầu từ y=42 bên trong tường, KHÔNG chạm vào kích thước HW hay tiêu đề) -->
          <line x1="75" y1="42" x2="75" y2="158" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="4" y1="95" x2="146" y2="95" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- Kích thước lọt lòng chiều sâu HD bên phải (x=148) -->
          ${cadDimV(148, 48, 142, "HD=" + specs.D, "#b91c1c")}

          <!-- Kích thước cửa tầng ở y=166 -->
          ${cadDimH(38, 112, 166, "CO=" + specs.CO, "#0f172a")}

          <!-- Mũi tên hướng cửa vào ở y=180..195 -->
          <path d="M 75 176 L 71 183 L 79 183 Z" fill="#0f172a"/>
          <text x="75" y="194" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA VÀO</text>
        </g>

        <!-- 1B: VỊ TRÍ DẦM SÀN TẦNG -->
        <g id="planFloor" transform="translate(195, 45)">
          <text x="75" y="10" fill="#0f172a" font-size="8.5" font-weight="900" text-anchor="middle">
            1B. VỊ TRÍ DẦM SÀN TẦNG
          </text>

          <!-- Kích thước lọt lòng HW đặt ở y=28 -->
          ${cadDimH(22, 128, 28, "HW=" + specs.W, "#b91c1c")}

          <!-- Dầm BTCT bao 3 mặt hố -->
          <rect x="10" y="38" width="130" height="114" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.3"/>
          <rect x="22" y="48" width="106" height="94" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Trụ gạch 2 bên cửa -->
          <rect x="10" y="136" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="118" y="136" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ cửa chờ -->
          <rect x="32" y="136" width="86" height="16" fill="#ffffff" stroke="#ffffff"/>
          <line x1="32" y1="136" x2="32" y2="152" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="118" y1="136" x2="118" y2="152" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Trục tim CL -->
          <line x1="75" y1="42" x2="75" y2="158" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="4" y1="95" x2="146" y2="95" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- Chỉ dẫn DẦM BTCT đưa sang trái vào khoảng trống giữa 2 hình, không đè tim trục -->
          ${cadLeader(16, 75, -8, 75, -35, "DẦM BTCT 200x200", "#0f172a")}

          <!-- Kích thước HD bên phải -->
          ${cadDimV(148, 48, 142, "HD=" + specs.D, "#b91c1c")}

          <!-- Kích thước lỗ chờ cửa ở y=166 -->
          ${cadDimH(32, 118, 166, "CỬA CHỜ: " + specs.roughDoorW, "#0f172a")}

          <path d="M 75 176 L 71 183 L 79 183 Z" fill="#0f172a"/>
          <text x="75" y="194" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA VÀO</text>
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

        <!-- MẶT ĐỨNG LỖ CHỜ THÔ -->
        <g id="roughDoorElevation" transform="translate(25, 45)">
          <!-- Cột bê tông 2 bên -->
          <rect x="0" y="20" width="16" height="148" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="134" y="20" width="16" height="148" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Trụ gạch 2 bên -->
          <rect x="16" y="40" width="20" height="128" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="114" y="40" width="20" height="128" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Dầm lanh-tô bê tông cốt thép dày 200mm -->
          <rect x="16" y="20" width="118" height="20" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <text x="75" y="33" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle" class="cad-halo-text">LANH TÔ BTCT 200x200</text>

          <!-- Tường gạch trên lanh tô -->
          <rect x="16" y="2" width="118" height="18" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ chừa trống cửa tầng -->
          <rect x="36" y="40" width="78" height="128" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="36" y1="40" x2="114" y2="168" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="4,2"/>
          <line x1="114" y1="40" x2="36" y2="168" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="4,2"/>
          
          <!-- Hộp thông số OPEN rõ nét -->
          <rect x="22" y="94" width="106" height="20" fill="#ffffff" stroke="#0f172a" stroke-width="0.8" rx="2"/>
          <text x="75" y="108" fill="#b91c1c" font-size="8.5" font-weight="900" class="cad-num" text-anchor="middle">OPEN = ${specs.roughDoorW}</text>

          <!-- Cốt sàn FFL -->
          ${cadLevelMark(75, 168, "FFL [±0.000]")}

          <!-- Sàn bê tông tầng -->
          <rect x="0" y="168" width="150" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          ${cadDimV(-8, 40, 168, "OPEN = " + specs.roughDoorH, "#0f172a")}

          <text x="75" y="196" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">
            MẶT ĐỨNG LỖ CHỜ THÔ
          </text>
        </g>

        <!-- MẶT CẮT 2-2 & 1-1 -->
        <g id="sectionGroup" transform="translate(195, 45)">
          <!-- CẮT 2-2 -->
          <text x="60" y="10" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">MẶT CẮT 2-2 (NGANG)</text>
          
          <rect x="5" y="16" width="30" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="35" y="16" width="50" height="16" fill="#ffffff" stroke="#ffffff"/>
          <rect x="85" y="16" width="30" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.8"/>
          
          <line x1="5" y1="32" x2="115" y2="32" stroke="#0f172a" stroke-width="1"/>
          <line x1="35" y1="16" x2="35" y2="32" stroke="#0f172a" stroke-width="0.8"/>
          <line x1="85" y1="16" x2="85" y2="32" stroke="#0f172a" stroke-width="0.8"/>

          ${cadDimH(35, 85, 42, specs.roughDoorW, "#0f172a")}

          <!-- CẮT 1-1 -->
          <g transform="translate(10, 65)">
            <text x="50" y="4" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">MẶT CẮT 1-1 (DỌC)</text>
            
            <rect x="35" y="12" width="16" height="20" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="0.9"/>
            <rect x="35" y="32" width="16" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
            ${cadLeader(35, 42, 10, 30, -15, "LANH TÔ 200", "#0f172a")}

            <line x1="35" y1="50" x2="35" y2="108" stroke="#cbd5e1" stroke-dasharray="3,2"/>
            <text x="58" y="78" fill="#475569" font-size="7" font-weight="bold" transform="rotate(90, 58, 78)" text-anchor="middle">
              Chừa trống: ${specs.roughDoorH}
            </text>

            <rect x="20" y="108" width="45" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
            <line x1="15" y1="108" x2="65" y2="108" stroke="#0f172a" stroke-width="1.2"/>
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
        <g id="doorPlanDetail" transform="translate(25, 45)">
          <rect x="0" y="10" width="190" height="14" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="35" y="10" width="120" height="14" fill="#ffffff" stroke="#ffffff"/>

          <!-- Khung đá granite -->
          <polygon points="35,10 45,24 55,24 50,10" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>
          <polygon points="155,10 145,24 135,24 140,10" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>

          <!-- Khung inox & cánh cửa -->
          <rect x="55" y="7" width="80" height="4" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="56" y="3" width="38" height="3" fill="#64748b"/>
          <rect x="96" y="3" width="38" height="3" fill="#64748b"/>

          ${cadDimH(55, 135, 30, "Rộng cửa: " + specs.CO, "#0f172a")}
          ${cadDimH(35, 155, 42, "Chừa trống: " + (specs.CO + 200), "#b91c1c")}

          ${cadLeader(145, 17, 170, 17, 215, "Ốp đá sau khi lắp khung (*)", "#b91c1c")}
        </g>

        <!-- MẶT ĐỨNG CỬA TẦNG HOÀN THIỆN -->
        <g id="doorFrontDetail" transform="translate(45, 102)">
          <!-- Khung ốp đá granite ngoài (1100) -->
          <rect x="15" y="6" width="130" height="144" fill="#fffbeb" stroke="#d97706" stroke-width="1.3"/>
          <rect x="25" y="14" width="110" height="136" fill="#f8fafc" stroke="#0f172a" stroke-width="1.3"/>

          <!-- Cánh cửa inox mở tim -->
          <rect x="27" y="16" width="52" height="134" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          <rect x="81" y="16" width="52" height="134" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          
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

          ${cadDimV(185, 83, 150, "1200", "#b91c1c")}

          ${cadLevelMark(80, 150, "FFL")}
          <line x1="0" y1="150" x2="175" y2="150" stroke="#0f172a" stroke-width="1.4"/>

          ${cadDimV(210, 14, 150, "DH = " + specs.DH, "#0f172a")}
          ${cadDimH(15, 145, 165, "1100 (ỐP ĐÁ HOÀN THIỆN)", "#0f172a")}
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

        <g transform="translate(30, 45)">
          <!-- Khung giếng thang 200mm -->
          <rect x="15" y="15" width="260" height="200" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.6"/>
          <rect x="35" y="35" width="220" height="160" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>

          <!-- Trục tim CL -->
          <line x1="145" y1="10" x2="145" y2="205" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>
          <line x1="25" y1="115" x2="265" y2="115" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="6,2,2,2"/>

          <!-- CẶP RAY CABIN (T78/T89) -->
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
          ${cadDimH(35, 255, 218, "HW = " + specs.W + " mm (" + halfW + "+" + halfW + ")", "#0f172a")}
          ${cadDimV(270, 35, 195, "HD = " + specs.D + " mm", "#0f172a")}

          <path d="M 145 232 L 140 240 L 150 240 Z" fill="#0f172a"/>
          <text x="145" y="250" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
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

        <g transform="translate(30, 48)">
          <text x="140" y="12" fill="#475569" font-size="7.5" font-weight="bold" text-anchor="middle">
            TƯỜNG VÀ DẦM BTCT 4 MẶT HỐ THANG ĐỈNH TUM
          </text>

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
          
          ${cadLeader(170, 220, 205, 235, 290, "CỬA TUM R800xC1000", "#b45309")}

          <!-- Dây nguồn & CB 3P/40A -->
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

          <!-- Khung phóng to chi tiết 'H' -->
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
  // CHI TIẾT 07: MẶT CẮT ĐỈNH TUM PHÓNG TO
  // ==========================================================================================
  function renderDrawing7_MachineRoomDetail(specs) {
    return `
      <g id="drawing7_machineRoomDetail" class="cad-drawing">
        ${cadTitleBubble(15, 12, "07", "MẶT CẮT ĐỈNH TUM PHÓNG TO", "1/20")}

        <g transform="translate(30, 48)">
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
          </g>

          <!-- KHỐI GHI CHÚ BÊ TÔNG & CỐT THÉP (TRẮNG ĐEN) -->
          <g transform="translate(25, 205)">
            <rect x="0" y="0" width="1095" height="58" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8" rx="2"/>
            <text x="15" y="20" fill="#0f172a" font-size="8.5" font-weight="900">
              GHI CHÚ VẬT LIỆU &amp; KỸ THUẬT THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP:
            </text>
            <text x="15" y="36" fill="#334155" font-size="8">
              1. Bê tông lót hố PIT mác M100 dày 100mm. Bê tông đáy hố, vách giếng và đà giằng dầm máy sử dụng bê tông cấp độ bền B20 (Mác 250) hoặc B22.5 (Mác 300).
            </text>
            <text x="15" y="50" fill="#334155" font-size="8">
              2. Cốt thép chịu lực nhóm CB300-V / CB400-V. Khoảng cách giữa các tầng dầm giằng giữ ray không được vượt quá 1800mm theo đúng QCVN 02:2019/BLĐTBXH.
            </text>
          </g>
        </g>

        <!-- KHUNG TÊN KỸ THUẬT TIÊU CHUẨN ISO/TCVN (ROW 3, GÓC DƯỚI PHẢI - TRẮNG ĐEN THUẦN TÚY) -->
        <g transform="translate(1180, 795)">
          ${renderCadTitleBlock(specs, "HỒ SƠ BẢN VẼ SHOP DRAWING THIẾT KẾ THI CÔNG HỐ THANG", "SHOP-01/07", "A3")}
        </g>
      </svg>
    `;
  }

  // ==========================================================================================
  // XUẤT TẬP HỒ SƠ A4 ĐÓNG QUYỂN (08 TRANG - KHUNG TÊN TRẮNG ĐEN CHUẨN KỸ SƯ)
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
          <p style="color: #64748b; font-size: 11px; margin: 0; font-weight: 700;">ÁP DỤNG QUY CHUẨN KỸ THUẬT QUỐC GIA QCVN 02:2019/BLĐTBXH &amp; TCVN 6395:2008</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px;">
          <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 6px; padding: 14px; font-size: 11.5px; line-height: 1.8;">
            <div style="font-weight: 900; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">
              THÔNG SỐ HỐ THANG BÊ TÔNG:
            </div>
            <div>• Kích thước lọt lòng: <strong>W${specs.W} x D${specs.D} mm</strong></div>
            <div>• Chiều sâu hố PIT: <strong style="color: #b91c1c;">${specs.Pit} mm</strong> (Chống thấm 1.0m)</div>
            <div>• Chiều cao tầng trên cùng (OH): <strong style="color: #b91c1c;">${specs.Oh} mm</strong></div>
            <div>• Số điểm dừng: <strong>${specs.Stops} Stops / ${specs.Stops} Doors</strong></div>
            <div>• Tốc độ định mức: <strong>${specs.speed} m/s (60 m/phút)</strong></div>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 6px; padding: 14px; font-size: 11.5px; line-height: 1.8;">
            <div style="font-weight: 900; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">
              THÔNG SỐ CABIN &amp; THIẾT BỊ ĐỒNG BỘ:
            </div>
            <div>• Tải trọng định mức: <strong>${specs.cap} KG (${specs.persons} người)</strong></div>
            <div>• Kích thước Cabin: <strong>CW${specs.CW} x CD${specs.CD} x CH${specs.CH} mm</strong></div>
            <div>• Cửa tầng / Cabin: <strong>CO${specs.CO} x DH${specs.DH} mm (Mở tim)</strong></div>
            <div>• Động cơ máy kéo: <strong>Fuji / Mitsubishi / Montanari PMSM</strong></div>
            <div>• Nguồn điện: <strong>3 Pha 380V hoặc 1 Pha 220V (Aptomat 40A)</strong></div>
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 11px; line-height: 1.7; color: #334155;">
          <strong style="color: #0f172a;">LƯU Ý QUAN TRỌNG KHI THI CÔNG XÂY DỰNG:</strong><br>
          1. Giếng thang phải đảm bảo dung sai độ thẳng đứng không vượt quá ±10mm trên toàn bộ chiều cao hành trình.<br>
          2. Tại các vị trí sàn tầng và giữa các tầng (bước ≤ 1800mm) phải đổ đà dầm giằng BTCT 200x200mm ở 3 mặt hố để cố định ray dẫn hướng.<br>
          3. Hố PIT phải được xử lý chống thấm ngược tuyệt đối 5 mặt dâng cao 1000mm.<br>
          4. Đỉnh tum hố thang chừa cửa thông gió/quạt hút và bố trí móc cẩu pa-lăng chịu tải trọng tối thiểu 2.0 Tấn (Thép gai ∅20).
        </div>
      </div>
    `;

    // 7 Bản vẽ chi tiết kỹ thuật
    var p2Svg = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing1_HoistwayPlan(specs)}</svg>`;
    var p3Svg = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing2_RoughDoorOpening(specs)}</svg>`;
    var p4Svg = `<svg viewBox="0 0 375 290" width="100%" height="auto">${defs}${renderDrawing3_FinishedDoor(specs)}</svg>`;
    var p5Svg = `<svg viewBox="0 0 395 290" width="100%" height="auto">${defs}${renderDrawing4_ElevatorInstallationPlan(specs)}</svg>`;
    var p6Svg = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing5_MachineBeamsPlan(specs)}</svg>`;
    var p7Svg = `<svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing7_MachineRoomDetail(specs)}</svg>`;
    
    // Trang 8: Mặt cắt đứng giếng thang & Bảng tính phản lực kết cấu
    var p8Content = `
      <div style="display: flex; gap: 15px; align-items: flex-start; justify-content: center; height: 100%;">
        <div style="flex: 1; max-width: 420px;">
          <svg viewBox="0 0 375 410" width="100%" height="auto">${defs}${renderDrawing6_VerticalSection(specs)}</svg>
        </div>
        <div style="flex: 1; max-width: 420px;">
          <svg viewBox="0 0 395 410" width="100%" height="auto">${defs}${renderSpecsAndReactions(specs)}</svg>
        </div>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8">
        <title>Tập Hồ Sơ Bản Vẽ Shop Drawing Hố Thang A4 (8 Trang) - 0914.587.575</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 10px;
            background: #e2e8f0;
            font-family: 'Roboto', Arial, sans-serif !important;
            color: #0f172a;
          }
          .a4-page {
            width: 210mm;
            min-height: 297mm;
            height: 297mm;
            padding: 10mm 12mm;
            margin: 0 auto 15px;
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            position: relative;
            overflow: hidden;
            border: 1px solid #cbd5e1;
          }
          .a4-header {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 6px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .a4-header .brand {
            font-size: 12px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: 0.5px;
          }
          .a4-header .sub {
            font-size: 8.5px;
            font-weight: 700;
            color: #475569;
          }
          .a4-drawing-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
          }
          .a4-drawing-content svg {
            max-width: 100%;
            max-height: 185mm;
          }
          .a4-footer {
            border-top: 1px solid #0f172a;
            padding-top: 6px;
            display: flex;
            justify-content: flex-end;
          }
          .footer-title-block {
            max-width: 100%;
            height: auto;
          }
          @media print {
            body { background: #fff; padding: 0; }
            .a4-page {
              margin: 0;
              box-shadow: none;
              border: none;
              width: 100%;
              height: 100%;
              page-break-after: always;
            }
            @page {
              size: A4 portrait;
              margin: 5mm;
            }
          }
        </style>
      </head>
      <body>
        ${wrapA4Page("BÌA HỒ SƠ & BẢNG TỔNG HỢP KỸ THUẬT", "SHOP-00/07", page1Content, 1)}
        ${wrapA4Page("MẶT BẰNG HỐ THANG TẦNG ĐIỂN HÌNH & SÀN TẦNG", "SHOP-01/07", p2Svg, 2)}
        ${wrapA4Page("CHI TIẾT CHỜ THÔ CỬA TẦNG & MẶT CẮT LANH TÔ", "SHOP-02/07", p3Svg, 3)}
        ${wrapA4Page("CHI TIẾT CỬA TẦNG HOÀN THIỆN & HỘP NÚT BẤM LOP", "SHOP-03/07", p4Svg, 4)}
        ${wrapA4Page("MẶT BẰNG LẮP ĐẶT CABIN, ĐỐI TRỌNG & RAY DẪN HƯỚNG", "SHOP-04/07", p5Svg, 5)}
        ${wrapA4Page("MẶT BẰNG DẦM ĐẶT MÁY KÉO & LỖ THÔNG TUM", "SHOP-05/07", p6Svg, 6)}
        ${wrapA4Page("MẶT CẮT CHI TIẾT ĐỈNH TUM PHÒNG MÁY & MÁY KÉO PMSM", "SHOP-07/07", p7Svg, 7)}
        ${wrapA4Page("MẶT CẮT ĐỨNG HỐ THANG & BẢNG PHẢN LỰC KẾT CẤU", "SHOP-06/07", p8Content, 8)}

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 600);
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
              HỒ SƠ BẢN VẼ SHOP DRAWING HỐ THANG BÊ TÔNG (07 MẶT CẮT KỸ THUẬT REV 03)
            </h3>
            <p class="text-[10px] text-slate-300 hidden sm:block">
              Chuẩn thẩm định kỹ thuật QCVN 02:2019 • Khổ A3 Kỹ Sư &amp; Tập A4 Đóng Quyển 8 Trang • 0914.587.575
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

  // Xuất API toàn cục để trang độc lập preview-cad.html có thể dùng trực tiếp
  window.generateMasterShopDrawingSvgA3 = generateMasterShopDrawingSvgA3;
  window.generateMultiPageA4Html = generateMultiPageA4Html;
  window.calculateShopDrawingSpecs = calculateShopDrawingSpecs;

})();
