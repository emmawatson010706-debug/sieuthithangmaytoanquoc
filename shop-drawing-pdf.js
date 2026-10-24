// ==========================================================================================
// HỆ THỐNG XUẤT HỒ SƠ BẢN VẼ KỸ THUẬT SHOP DRAWING HỐ THANG BÊ TÔNG (KHỔ A3 & TẬP A4 8 TRANG)
// Thương hiệu độc quyền: SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
// Hotline Kỹ Sư Trưởng: 0914.587.575 - Website: sieuthithangmaytoanquoc.com
// Chuẩn hóa 07 Mặt Cắt Kỹ Thuật AutoCAD Thi Công Thực Tế & QCVN 02:2019/BLĐTBXH
// ==========================================================================================

(function () {
  'use strict';

  // 1. TÍNH TOÁN THÔNG SỐ ĐỘNG DỰA TRÊN KÍCH THƯỚC ĐẦU VÀO
  function calculateShopDrawingSpecs(W, D, Pit, Oh, Stops, Capacity) {
    W = parseInt(W) || 1800;
    D = parseInt(D) || 1500;
    Pit = parseInt(Pit) || 1400;
    Oh = parseInt(Oh) || 4500;
    Stops = parseInt(Stops) || 4;

    // Tải trọng ước tính theo diện tích nếu không truyền vào
    var cap = parseInt(Capacity) || (W < 1400 ? 350 : (W < 1700 ? 450 : (W < 1900 ? 630 : 800)));
    var speed = cap <= 450 ? 1.0 : 1.5; // m/s
    var persons = Math.floor(cap / 75) || (cap <= 450 ? 6 : 9);

    // Kích thước Cabin thông thủy (tỷ lệ chuẩn theo bản vẽ mẫu)
    var CW = Math.max(800, W - 400); // vd: 1800 - 400 = 1400
    var CD = Math.max(750, D - 550); // vd: 1500 - 550 = 950
    var CH = 2200;

    // Cửa mở tầng (Center Opening 2 cánh)
    var CO = Math.max(650, Math.min(900, Math.round((CW * 0.57) / 50) * 50)); // vd 800
    if (W >= 1800) CO = 800;
    var DH = 2100;
    var roughDoorW = CO + 400; // 800 + 400 = 1200
    var roughDoorH = 2400; // Lỗ chờ thô cao 2400
    var doorJamb = Math.max(250, Math.round((W - roughDoorW) / 2)); // Trụ gạch 2 bên = 300

    // Phản lực tính toán kết cấu (kN)
    var R1 = (cap * 0.08 + 15).toFixed(1); // Lực đáy ray cabin
    var R2 = (cap * 0.07 + 12).toFixed(1); // Lực đáy ray đối trọng
    var R3 = (cap * 0.12 + 25).toFixed(1); // Lực dầm bệ máy kéo
    var R4 = '20.0'; // Móc cẩu pa-lăng nóc giếng thang (2.0 Tấn)

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
      doorJamb: doorJamb,
      R1: R1,
      R2: R2,
      R3: R3,
      R4: R4
    };
  }

  // 2. KHAI BÁO CÁC MẪU HOA VĂN BÊ TÔNG, GẠCH VÀ KÍCH THƯỚC CHUẨN CAD
  function getCadDefs() {
    return `
      <defs>
        <!-- Hatch bê tông cốt thép -->
        <pattern id="cadConcrete" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#94a3b8" stroke-width="1.2"/>
          <circle cx="8" cy="8" r="1.2" fill="#64748b"/>
        </pattern>
        <!-- Hatch tường gạch xây -->
        <pattern id="cadBrick" width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="12" height="6" fill="#fef2f2"/>
          <line x1="0" y1="0" x2="12" y2="0" stroke="#dc2626" stroke-width="0.8"/>
          <line x1="0" y1="3" x2="12" y2="3" stroke="#dc2626" stroke-width="0.8"/>
          <line x1="0" y1="0" x2="0" y2="3" stroke="#dc2626" stroke-width="0.8"/>
          <line x1="6" y1="3" x2="6" y2="6" stroke="#dc2626" stroke-width="0.8"/>
        </pattern>
        <!-- Hatch kim loại / thép -->
        <pattern id="cadSteel" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#0284c7" stroke-width="1.2"/>
        </pattern>
        <!-- Mũi tên kích thước -->
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0f172a" />
        </marker>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#dc2626" />
        </marker>
      </defs>
    `;
  }

  // 3. KHUNG TÊN KỸ THUẬT TIÊU CHUẨN SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
  function renderCadTitleBlock(specs, drawingTitle, drawingNo, sheetSize) {
    var today = new Date().toLocaleDateString('vi-VN');
    sheetSize = sheetSize || 'A3';
    return `
      <g class="cad-title-block" transform="translate(0, 0)">
        <rect x="0" y="0" width="360" height="150" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
        
        <!-- Dòng Header Đơn Vị Thiết Kế -->
        <rect x="0" y="0" width="360" height="34" fill="#0f2766" stroke="#0f172a" stroke-width="1"/>
        <text x="180" y="16" fill="#fbbf24" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
        </text>
        <text x="180" y="28" fill="#93c5fd" font-size="8" font-weight="700" text-anchor="middle">
          HỒ SƠ THIẾT KẾ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP
        </text>

        <!-- Tên Bản Vẽ -->
        <rect x="0" y="34" width="360" height="30" fill="#f8fafc" stroke="#0f172a" stroke-width="0.8"/>
        <text x="180" y="47" fill="#dc2626" font-size="10.5" font-weight="900" text-anchor="middle">
          ${drawingTitle.toUpperCase()}
        </text>
        <text x="180" y="58" fill="#475569" font-size="8" font-weight="bold" text-anchor="middle">
          TẢI TRỌNG: ${specs.cap} KG • HW${specs.W} x HD${specs.D} mm • ${specs.Stops} STOPS
        </text>

        <!-- Thông Tin Dự Án -->
        <g transform="translate(0, 64)" font-size="8">
          <rect x="0" y="0" width="85" height="18" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="42" y="12" fill="#0f172a" font-weight="bold" text-anchor="middle">CÔNG TRÌNH</text>
          <rect x="85" y="0" width="275" height="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="95" y="12" fill="#0f172a" font-weight="bold">Nhà Phố / Biệt Thự / Văn Phòng (34 Tỉnh Thành)</text>

          <rect x="0" y="18" width="85" height="18" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="42" y="30" fill="#0f172a" font-weight="bold" text-anchor="middle">THIẾT KẾ</text>
          <rect x="85" y="18" width="95" height="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="132" y="30" fill="#0f172a" text-anchor="middle">Phòng Kỹ Thuật CAD</text>

          <rect x="180" y="18" width="85" height="18" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="222" y="30" fill="#dc2626" font-weight="bold" text-anchor="middle">PHÊ DUYỆT</text>
          <rect x="265" y="18" width="95" height="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="312" y="30" fill="#0f2766" font-weight="900" text-anchor="middle">0914.587.575</text>
        </g>

        <!-- Footer Khung Tên: Tỷ lệ, Khổ Giấy, Ngày, Mã Bản Vẽ -->
        <g transform="translate(0, 100)" font-size="8">
          <rect x="0" y="0" width="90" height="26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="45" y="11" fill="#64748b" text-anchor="middle">TỶ LỆ</text>
          <text x="45" y="21" fill="#0f172a" font-weight="bold" text-anchor="middle">1:25 / 1:50</text>

          <rect x="90" y="0" width="90" height="26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="135" y="11" fill="#64748b" text-anchor="middle">KHỔ GIẤY</text>
          <text x="135" y="21" fill="#0f172a" font-weight="bold" text-anchor="middle">${sheetSize}</text>

          <rect x="180" y="0" width="90" height="26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6"/>
          <text x="225" y="11" fill="#64748b" text-anchor="middle">NGÀY PHÁT HÀNH</text>
          <text x="225" y="21" fill="#0f172a" font-weight="bold" text-anchor="middle">${today}</text>

          <rect x="270" y="0" width="90" height="26" fill="#0f2766" stroke="#0f172a" stroke-width="0.6"/>
          <text x="315" y="11" fill="#fbbf24" font-weight="bold" text-anchor="middle">KÝ HIỆU</text>
          <text x="315" y="22" fill="#ffffff" font-weight="900" text-anchor="middle">${drawingNo}</text>
        </g>

        <!-- Hotline & Cam Kết Tiêu Chuẩn -->
        <rect x="0" y="126" width="360" height="24" fill="#fef3c7" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="180" y="142" fill="#b45309" font-size="8" font-weight="900" text-anchor="middle">
          HOTLINE KỸ SƯ TRƯỞNG: 0914.587.575 • TIÊU CHUẨN QCVN 02:2019
        </text>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 1: MẶT BẰNG HỐ THANG (TẦNG ĐIỂN HÌNH & VỊ TRÍ SÀN TẦNG)
  // Gồm: Cột góc 220, tường gạch 220, HW, HD, cửa mở 1200, trụ cửa 300/350, các mặt cắt A-A, B-B, C-C
  // ==========================================================================================
  function renderDrawing1_HoistwayPlan(specs, isStandalone) {
    var width = isStandalone ? 800 : 380;
    var scale = isStandalone ? 1.0 : 0.52;
    var halfW = Math.round(specs.W / 2);
    var halfD = Math.round(specs.D / 2);

    return `
      <g id="drawing1_hoistwayPlan" class="cad-drawing">
        <!-- TIÊU ĐỀ BẢN VẼ 1 -->
        <text x="190" y="20" fill="#0f172a" font-size="12" font-weight="900" text-anchor="middle" text-decoration="underline">
          1. MẶT BẰNG HỐ THANG (HOISTWAY PLAN)
        </text>

        <!-- SUB-DRAWING 1A: MẶT BẰNG HỐ THANG TẦNG ĐIỂN HÌNH -->
        <g id="planTypical" transform="translate(20, 35)">
          <text x="85" y="12" fill="#0f172a" font-size="9" font-weight="900" text-anchor="middle">
            MẶT BẰNG HỐ THANG TẦNG ĐIỂN HÌNH
          </text>

          <!-- Tường gạch & Cột góc 220x220 -->
          <!-- Khung ngoài (1800+440 x 1500+440) -> scaled -->
          <rect x="15" y="25" width="140" height="120" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="27" y="37" width="116" height="96" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- 4 Cột bê tông góc 220x220 -->
          <rect x="15" y="25" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="139" y="25" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="15" y="129" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="139" y="129" width="16" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ cửa mở 1200 ở vách trước -->
          <rect x="45" y="129" width="80" height="16" fill="#ffffff" stroke="#ffffff"/>
          <line x1="45" y1="129" x2="45" y2="145" stroke="#0f172a" stroke-width="1"/>
          <line x1="125" y1="129" x2="125" y2="145" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim C_L -->
          <line x1="85" y1="20" x2="85" y2="150" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>
          <line x1="10" y1="85" x2="160" y2="85" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>
          <text x="88" y="35" fill="#ef4444" font-size="7" font-weight="bold">CL</text>

          <!-- Ký hiệu mặt cắt A-A, B-B, C-C -->
          <line x1="35" y1="65" x2="55" y2="65" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="35" y1="65" x2="35" y2="58" stroke="#0f172a" stroke-width="1.5"/>
          <text x="45" y="62" fill="#0f172a" font-size="7.5" font-weight="900">A</text>

          <line x1="115" y1="65" x2="135" y2="65" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="135" y1="65" x2="135" y2="58" stroke="#0f172a" stroke-width="1.5"/>
          <text x="125" y="62" fill="#0f172a" font-size="7.5" font-weight="900">A</text>

          <line x1="35" y1="105" x2="55" y2="105" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="35" y1="105" x2="35" y2="112" stroke="#0f172a" stroke-width="1.5"/>
          <text x="45" y="114" fill="#0f172a" font-size="7.5" font-weight="900">B</text>

          <line x1="115" y1="105" x2="135" y2="105" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="135" y1="105" x2="135" y2="112" stroke="#0f172a" stroke-width="1.5"/>
          <text x="125" y="114" fill="#0f172a" font-size="7.5" font-weight="900">B</text>

          <!-- Thước kích thước HW & HD -->
          <!-- HW = 1800 (900 + 900) -->
          <line x1="27" y1="15" x2="143" y2="15" stroke="#0f172a" stroke-width="0.8"/>
          <text x="85" y="12" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HW=${specs.W} (${halfW}+${halfW})</text>
          
          <!-- HD = 1500 (750 + 750) -->
          <text x="156" y="88" fill="#0f172a" font-size="7" font-weight="bold">HD=${specs.D}</text>

          <!-- Mũi tên hướng cửa thang máy -->
          <path d="M 85 160 L 80 167 L 90 167 Z" fill="#0f172a"/>
          <text x="85" y="177" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>

        <!-- SUB-DRAWING 1B: MẶT BẰNG HỐ THANG VỊ TRÍ SÀN TẦNG -->
        <g id="planFloor" transform="translate(195, 35)">
          <text x="85" y="12" fill="#0f172a" font-size="9" font-weight="900" text-anchor="middle">
            MẶT BẰNG HỐ THANG VỊ TRÍ SÀN TẦNG
          </text>

          <!-- Dầm bê tông cốt thép dày 220 chạy quanh 3 mặt -->
          <rect x="15" y="25" width="140" height="120" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="27" y="37" width="116" height="96" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Trụ gạch 300/350 vị trí dầm sàn cửa -->
          <rect x="15" y="129" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="133" y="129" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ chừa cửa 1200 -->
          <rect x="37" y="129" width="96" height="16" fill="#ffffff" stroke="#ffffff"/>
          <line x1="37" y1="129" x2="37" y2="145" stroke="#0f172a" stroke-width="1"/>
          <line x1="133" y1="129" x2="133" y2="145" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim CL -->
          <line x1="85" y1="20" x2="85" y2="150" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>
          <line x1="10" y1="85" x2="160" y2="85" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>

          <!-- Ghi chú dầm bê tông cốt thép -->
          <text x="85" y="70" fill="#475569" font-size="7" font-weight="bold" text-anchor="middle">
            DẦM BTCT BAO 3 MẶT
          </text>
          <text x="85" y="82" fill="#475569" font-size="6.5" text-anchor="middle">
            TIẾT DIỆN 220 x 200 mm
          </text>

          <!-- Thước kích thước cửa & trụ -->
          <line x1="37" y1="155" x2="133" y2="155" stroke="#0f172a" stroke-width="0.8"/>
          <text x="85" y="152" fill="#0f172a" font-size="7" font-weight="bold" text-anchor="middle">CỬA CHỜ: ${specs.roughDoorW}</text>

          <!-- Mũi tên hướng cửa -->
          <path d="M 85 168 L 80 175 L 90 175 Z" fill="#0f172a"/>
          <text x="85" y="185" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 2: CHỜ THÔ CỬA TẦNG (MẶT ĐỨNG + CẮT 1-1 + CẮT 2-2)
  // Gồm: Lỗ chờ thô Open=1200 x Open=2400, lanh tô BTCT 200mm, trụ gạch 300, mặt cắt 1-1, cắt 2-2
  // ==========================================================================================
  function renderDrawing2_RoughDoorOpening(specs, isStandalone) {
    return `
      <g id="drawing2_roughDoorOpening" class="cad-drawing">
        <!-- ĐÁM MÂY TIÊU ĐỀ: CHỜ THÔ CỬA TẦNG -->
        <g transform="translate(190, 8)">
          <path d="M 0 10 Q 5 0 20 5 Q 35 -2 50 5 Q 65 0 70 10 Q 80 20 70 30 Q 60 40 45 35 Q 30 42 15 35 Q 0 35 0 20 Z" fill="#f8fafc" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4,2"/>
          <text x="35" y="22" fill="#dc2626" font-size="8.5" font-weight="900" text-anchor="middle">CHỜ THÔ CỬA TẦNG</text>
        </g>

        <!-- SUB 2A: MẶT ĐỨNG LỖ CHỜ THÔ CỬA TẦNG -->
        <g id="roughDoorElevation" transform="translate(30, 40)">
          <!-- Cột bê tông 2 bên (220mm) -->
          <rect x="0" y="20" width="16" height="150" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="134" y="20" width="16" height="150" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Trụ gạch xây 2 bên (300mm) -->
          <rect x="16" y="40" width="22" height="130" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="112" y="40" width="22" height="130" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Dầm lanh-tô bê tông cốt thép dày 200mm trên cửa -->
          <rect x="16" y="20" width="118" height="20" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <text x="75" y="33" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">LANH TÔ BTCT 200x200</text>

          <!-- Tường gạch phía trên lanh tô -->
          <rect x="16" y="0" width="118" height="20" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Lỗ chừa trống cửa tầng (Open = 1200 x Open = 2400) -->
          <rect x="38" y="40" width="74" height="130" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="38" y1="40" x2="112" y2="170" stroke="#cbd5e1" stroke-width="0.8"/>
          <line x1="112" y1="40" x2="38" y2="170" stroke="#cbd5e1" stroke-width="0.8"/>
          
          <text x="75" y="100" fill="#dc2626" font-size="9" font-weight="900" text-anchor="middle">OPEN = ${specs.roughDoorW}</text>
          
          <!-- Ký hiệu cốt FFL -->
          <line x1="30" y1="170" x2="120" y2="170" stroke="#0f172a" stroke-width="1.5"/>
          <path d="M 75 170 L 71 163 L 79 163 Z" fill="#0f172a"/>
          <text x="75" y="160" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">FFL</text>

          <!-- Dầm bê tông sàn tầng -->
          <rect x="0" y="170" width="150" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Thước đo dọc: Open = 2400 -->
          <line x1="-12" y1="40" x2="-12" y2="170" stroke="#0f172a" stroke-width="0.8"/>
          <line x1="-16" y1="40" x2="-8" y2="40" stroke="#0f172a" stroke-width="0.8"/>
          <line x1="-16" y1="170" x2="-8" y2="170" stroke="#0f172a" stroke-width="0.8"/>
          <text x="-16" y="110" fill="#0f172a" font-size="8.5" font-weight="900" transform="rotate(-90, -16, 110)" text-anchor="middle">
            OPEN = ${specs.roughDoorH}
          </text>

          <!-- Chú thích tiêu đề dưới -->
          <text x="75" y="200" fill="#0f172a" font-size="8.5" font-weight="900" text-anchor="middle">
            LỖ CHỜ THÔ CỬA TẦNG
          </text>
        </g>

        <!-- SUB 2B: MẶT CẮT 2-2 (CẮT NGANG QUA CỬA & TRỤ GẠCH) -->
        <g id="section2_2" transform="translate(200, 35)">
          <text x="60" y="10" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">MẶT CẮT 2-2</text>
          
          <rect x="0" y="15" width="20" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="20" y="15" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="42" y="15" width="40" height="16" fill="#ffffff" stroke="#ffffff"/>
          <rect x="82" y="15" width="22" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="104" y="15" width="20" height="16" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          
          <line x1="0" y1="31" x2="124" y2="31" stroke="#0f172a" stroke-width="1"/>
          <line x1="42" y1="15" x2="42" y2="31" stroke="#0f172a" stroke-width="1"/>
          <line x1="82" y1="15" x2="82" y2="31" stroke="#0f172a" stroke-width="1"/>

          <text x="62" y="26" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">${specs.roughDoorW}</text>
        </g>

        <!-- SUB 2C: MẶT CẮT 1-1 (CẮT DỌC QUA LANH TÔ) -->
        <g id="section1_1" transform="translate(215, 95)">
          <text x="45" y="0" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">MẶT CẮT 1-1</text>
          
          <!-- Tường gạch phía trên -->
          <rect x="30" y="8" width="16" height="24" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Dầm lanh-tô bê tông 200x200 -->
          <rect x="30" y="32" width="16" height="20" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="28" y1="42" x2="0" y2="28" stroke="#0f172a" stroke-width="0.8"/>
          <text x="-4" y="26" fill="#0f172a" font-size="6.5" font-weight="bold">DẦM BTCT 200</text>

          <!-- Khoảng trống cửa cao 2400 -->
          <line x1="30" y1="52" x2="30" y2="120" stroke="#cbd5e1" stroke-dasharray="4,2"/>
          <text x="50" y="88" fill="#475569" font-size="7" font-weight="bold" transform="rotate(90, 50, 88)" text-anchor="middle">
            Chừa trống cao: ${specs.roughDoorH}
          </text>

          <!-- Dầm sàn bê tông phía dưới -->
          <rect x="15" y="120" width="35" height="16" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <line x1="10" y1="120" x2="55" y2="120" stroke="#0f172a" stroke-width="1.2"/>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 3: CỬA TẦNG HOÀN THIỆN (MẶT CẮT NGANG & MẶT ĐỨNG CỬA HOÀN THIỆN)
  // Gồm: Cửa DW=800, chừa trống 1000, ốp đá 1100, DH=2100, nút bấm gọi tầng LOP cao 1200mm
  // ==========================================================================================
  function renderDrawing3_FinishedDoor(specs, isStandalone) {
    return `
      <g id="drawing3_finishedDoor" class="cad-drawing">
        <!-- TIÊU ĐỀ: CỬA TẦNG HOÀN THIỆN -->
        <text x="140" y="225" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle" text-decoration="underline">
          CỬA TẦNG HOÀN THIỆN
        </text>

        <!-- SUB 3A: MẶT CẮT NGANG CỬA TẦNG HOÀN THIỆN & ỐP ĐÁ -->
        <g id="doorPlanDetail" transform="translate(45, 10)">
          <!-- Tường gạch hố thang -->
          <rect x="0" y="10" width="190" height="14" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Chừa trống cửa tầng: 1000mm -->
          <rect x="35" y="10" width="120" height="14" fill="#ffffff" stroke="#ffffff"/>

          <!-- Đá ốp vát mép cửa (mỗi bên 100mm) -->
          <polygon points="35,10 45,24 55,24 50,10" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>
          <polygon points="155,10 145,24 135,24 140,10" fill="#fef3c7" stroke="#d97706" stroke-width="0.8"/>

          <!-- Khung bao cửa tầng inox -->
          <rect x="55" y="6" width="80" height="4" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <!-- Hai cánh cửa mở tim -->
          <rect x="56" y="2" width="38" height="3" fill="#64748b"/>
          <rect x="96" y="2" width="38" height="3" fill="#64748b"/>
          <!-- Mũi tên mở tim -->
          <path d="M 72 3.5 L 68 3.5" stroke="#ffffff" stroke-width="1"/>
          <path d="M 118 3.5 L 122 3.5" stroke="#ffffff" stroke-width="1"/>

          <!-- Ghi chú kích thước -->
          <text x="95" y="22" fill="#0f172a" font-size="6.5" font-weight="900" text-anchor="middle">
            C.rộng cửa tầng: ${specs.CO}
          </text>
          <text x="95" y="32" fill="#d97706" font-size="6" font-weight="bold" text-anchor="middle">
            Chừa trống cửa tầng: ${specs.CO + 200}
          </text>

          <!-- Mũi tên chỉ dẫn ốp đá sau lắp thang -->
          <path d="M 145 20 L 175 32" stroke="#d97706" stroke-width="0.8"/>
          <text x="175" y="32" fill="#d97706" font-size="5.8" font-weight="bold">
            Hoàn thiện ốp đá, xây chèn sau khi lắp xong khung (*)
          </text>
        </g>

        <!-- SUB 3B: MẶT ĐỨNG CỬA TẦNG HOÀN THIỆN -->
        <g id="doorFrontDetail" transform="translate(60, 50)">
          <!-- Khung ốp đá granite ngoài (rộng 1100, cao 2200) -->
          <rect x="15" y="8" width="130" height="152" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>

          <!-- Khung cửa tầng Inox tiêu chuẩn (DW=800, DH=2100) -->
          <rect x="25" y="16" width="110" height="144" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5"/>

          <!-- Hai cánh cửa mở tim với chỉ inox xước -->
          <rect x="27" y="18" width="52" height="142" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
          <rect x="81" y="18" width="52" height="142" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
          
          <!-- Họa tiết cửa hoa văn inox gương -->
          <line x1="53" y1="30" x2="53" y2="140" stroke="#cbd5e1" stroke-width="1"/>
          <line x1="107" y1="30" x2="107" y2="140" stroke="#cbd5e1" stroke-width="1"/>

          <!-- Mũi tên mở 2 cánh -->
          <path d="M 50 85 L 42 85" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arrow)"/>
          <path d="M 110 85 L 118 85" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arrow)"/>

          <text x="80" y="98" fill="#0f172a" font-size="9" font-weight="900" text-anchor="middle">
            DW = ${specs.CO}
          </text>

          <!-- Hộp nút bấm gọi tầng LOP (cao 1200mm từ FFL) -->
          <rect x="148" y="70" width="12" height="32" rx="3" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
          <circle cx="154" cy="78" r="2.5" fill="#38bdf8"/>
          <circle cx="154" cy="86" r="2" fill="#ef4444"/>
          <circle cx="154" cy="94" r="2" fill="#ef4444"/>
          <text x="165" y="88" fill="#0f172a" font-size="7" font-weight="bold">LOP</text>

          <!-- Cốt cao độ tâm nút bấm LOP = 1200mm -->
          <line x1="154" y1="88" x2="175" y2="88" stroke="#dc2626" stroke-width="0.8"/>
          <line x1="175" y1="88" x2="175" y2="160" stroke="#dc2626" stroke-width="0.8"/>
          <text x="180" y="125" fill="#dc2626" font-size="7.5" font-weight="bold">1200</text>

          <!-- Cốt sàn hoàn thiện FFL -->
          <line x1="0" y1="160" x2="175" y2="160" stroke="#0f172a" stroke-width="1.5"/>
          <path d="M 80 160 L 76 153 L 84 153 Z" fill="#0f172a"/>
          <text x="80" y="150" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">FFL</text>

          <!-- Thước chiều cao cửa DH = 2100 -->
          <line x1="195" y1="16" x2="195" y2="160" stroke="#0f172a" stroke-width="0.8"/>
          <text x="200" y="90" fill="#0f172a" font-size="8.5" font-weight="900" transform="rotate(90, 200, 90)" text-anchor="middle">
            DH = ${specs.DH}
          </text>

          <!-- Bề rộng hoàn thiện ngoài 1100 -->
          <line x1="15" y1="172" x2="145" y2="172" stroke="#0f172a" stroke-width="0.8"/>
          <text x="80" y="182" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">1100 (Ốp đá hoàn thiện)</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 4: MẶT BẰNG LẮP THANG (CABIN, ĐỐI TRỌNG SAU, RAY, BÁT RAY)
  // Gồm: Kích thước lọt lòng HWxHD, Cabin Wcar x Dcar, cửa CO=800, đối trọng sau, ray T78/T89, nút LOP
  // ==========================================================================================
  function renderDrawing4_ElevatorInstallationPlan(specs, isStandalone) {
    var halfW = Math.round(specs.W / 2);
    var halfD = Math.round(specs.D / 2);

    return `
      <g id="drawing4_installationPlan" class="cad-drawing">
        <!-- TIÊU ĐỀ: MẶT BẰNG LẮP THANG -->
        <text x="190" y="18" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle" text-decoration="underline">
          4. MẶT BẰNG LẮP THANG (CAR & CWT PLAN)
        </text>

        <g transform="translate(45, 30)">
          <!-- Khung tường bao giếng thang (220mm) -->
          <rect x="15" y="15" width="260" height="200" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.8"/>
          <rect x="35" y="35" width="220" height="160" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>

          <!-- Trục tim CL -->
          <line x1="145" y1="10" x2="145" y2="205" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>
          <line x1="25" y1="115" x2="265" y2="115" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>

          <!-- CẶP RAY CABIN (2 bên hông) & BÁT RAY (BRACKET) -->
          <!-- Ray trái -->
          <rect x="35" y="108" width="14" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <polygon points="49,115 57,110 57,120" fill="#dc2626"/>
          <!-- Ray phải -->
          <rect x="241" y="108" width="14" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <polygon points="241,115 233,110 233,120" fill="#dc2626"/>

          <!-- KHUNG ĐỐI TRỌNG (Phía sau Cabin) -->
          <rect x="80" y="42" width="130" height="18" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Cục tạ gang/bê tông đối trọng -->
          <line x1="100" y1="42" x2="100" y2="60" stroke="#64748b" stroke-width="1"/>
          <line x1="190" y1="42" x2="190" y2="60" stroke="#64748b" stroke-width="1"/>
          <!-- 2 Ray đối trọng & bracket tường sau -->
          <polygon points="76,51 80,47 80,55" fill="#d97706"/>
          <polygon points="214,51 210,47 210,55" fill="#d97706"/>
          <text x="145" y="54" fill="#ffffff" font-size="7.5" font-weight="bold" text-anchor="middle">ĐỐI TRỌNG (CWT)</text>

          <!-- CABIN THANG MÁY (Wcar x Dcar) -->
          <rect x="65" y="70" width="160" height="105" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Vách trong cabin -->
          <rect x="70" y="75" width="150" height="95" fill="#ffffff" stroke="#38bdf8" stroke-width="1"/>

          <!-- Cửa Cabin tự động 2 cánh mở tim -->
          <rect x="95" y="165" width="50" height="6" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="145" y="165" width="50" height="6" fill="#0284c7" stroke="#0f172a" stroke-width="0.8"/>
          <!-- Cửa Tầng tương ứng -->
          <rect x="95" y="175" width="50" height="6" fill="#64748b" stroke="#0f172a" stroke-width="0.8"/>
          <rect x="145" y="175" width="50" height="6" fill="#64748b" stroke="#0f172a" stroke-width="0.8"/>

          <!-- Trụ tường cửa 2 bên (400mm) -->
          <rect x="35" y="180" width="45" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="210" y="180" width="45" height="15" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Hộp nút bấm LOP ở góc phải cửa -->
          <rect x="202" y="182" width="6" height="10" fill="#1e293b" stroke="#fbbf24" stroke-width="0.8"/>

          <!-- Thông số Cabin Wcar x Dcar -->
          <text x="145" y="112" fill="#0369a1" font-size="9" font-weight="900" text-anchor="middle">
            Wcar: ${specs.CW} mm
          </text>
          <text x="145" y="125" fill="#0369a1" font-size="8.5" font-weight="900" text-anchor="middle">
            Dcar: ${specs.CD} mm
          </text>
          <text x="145" y="138" fill="#64748b" font-size="7" font-weight="bold" text-anchor="middle">
            ${specs.cap} KG - ${specs.persons} NGƯỜI
          </text>

          <!-- Thước kích thước Cửa CO = 800 -->
          <line x1="95" y1="195" x2="195" y2="195" stroke="#0f172a" stroke-width="0.8"/>
          <text x="145" y="205" fill="#dc2626" font-size="8" font-weight="900" text-anchor="middle">
            CO = ${specs.CO} mm
          </text>

          <!-- Thước kích thước lọt lòng HW & HD -->
          <!-- Ngang W -->
          <line x1="35" y1="222" x2="255" y2="222" stroke="#0f172a" stroke-width="1"/>
          <text x="145" y="233" fill="#0f172a" font-size="8.5" font-weight="900" text-anchor="middle">
            HW = ${specs.W} mm (${halfW} + ${halfW})
          </text>

          <!-- Dọc D -->
          <text x="275" y="118" fill="#0f172a" font-size="8.5" font-weight="900" transform="rotate(90, 275, 118)" text-anchor="middle">
            HD = ${specs.D} mm
          </text>

          <!-- Mũi tên hướng cửa -->
          <path d="M 145 240 L 140 248 L 150 248 Z" fill="#0f172a"/>
          <text x="145" y="258" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 5: MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ THANG (TUM KT / PHÒNG MÁY)
  // Gồm: Kích thước lọt lòng HWxHD, tường 110mm 4 mặt, cửa tum R800xC1000, dây nguồn Áttomát 3PHA 40A, móc H
  // ==========================================================================================
  function renderDrawing5_MachineBeamsPlan(specs, isStandalone) {
    var halfW = Math.round(specs.W / 2);
    var halfD = Math.round(specs.D / 2);

    return `
      <g id="drawing5_machineBeamsPlan" class="cad-drawing">
        <!-- TIÊU ĐỀ: MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ THANG -->
        <text x="190" y="18" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle" text-decoration="underline">
          5. MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ THANG
        </text>

        <g transform="translate(45, 28)">
          <!-- Xây tường 110 cả 04 mặt hố thang -->
          <text x="25" y="12" fill="#d97706" font-size="7.5" font-weight="bold">Xây tường 110 cả 04 mặt hố thang</text>
          <text x="190" y="12" fill="#d97706" font-size="7.5" font-weight="bold">Xây tường 110 cả 04 mặt hố thang</text>

          <!-- Tường bao 110mm & Cột bê tông 220 góc -->
          <rect x="25" y="20" width="240" height="190" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="37" y="32" width="216" height="166" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>

          <!-- 4 Cột bê tông góc 220x220 -->
          <rect x="25" y="20" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="247" y="20" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="25" y="192" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <rect x="247" y="192" width="18" height="18" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>

          <!-- Trục tim CL -->
          <line x1="145" y1="15" x2="145" y2="205" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>
          <line x1="20" y1="115" x2="265" y2="115" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="6,2"/>

          <!-- Tâm móc treo 'H' tại tim trục -->
          <circle cx="145" cy="115" r="4" fill="#dc2626"/>
          <line x1="145" y1="115" x2="185" y2="135" stroke="#dc2626" stroke-width="1"/>
          <line x1="185" y1="135" x2="215" y2="135" stroke="#dc2626" stroke-width="1"/>
          <text x="220" y="138" fill="#dc2626" font-size="9" font-weight="900">'H' (MÓC TREO)</text>

          <!-- Cửa vào phòng máy / tum KT: R800 x C1000 (Khách hàng thực hiện) -->
          <rect x="135" y="192" width="70" height="18" fill="#ffffff" stroke="#ffffff"/>
          <line x1="135" y1="192" x2="135" y2="210" stroke="#0f172a" stroke-width="1"/>
          <line x1="205" y1="192" x2="205" y2="210" stroke="#0f172a" stroke-width="1"/>
          <!-- Cánh cửa mở tum -->
          <line x1="135" y1="210" x2="185" y2="225" stroke="#0f172a" stroke-width="1.2"/>
          <path d="M 185 225 A 50 50 0 0 0 205 210" fill="none" stroke="#64748b" stroke-dasharray="2,2"/>
          
          <line x1="170" y1="220" x2="210" y2="245" stroke="#d97706" stroke-width="0.8"/>
          <text x="215" y="248" fill="#d97706" font-size="6.8" font-weight="bold">
            CỬA VÀO PHÒNG MÁY R800 x C1000 (KH THỰC HIỆN)
          </text>

          <!-- Dây điện nguồn & Áttomát 3PHA - 40A trên tum kỹ thuật -->
          <rect x="38" y="175" width="14" height="14" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
          <line x1="38" y1="175" x2="52" y2="189" stroke="#ca8a04"/>
          <line x1="45" y1="189" x2="25" y2="235" stroke="#0f172a" stroke-width="0.8"/>
          <text x="15" y="245" fill="#0f172a" font-size="7" font-weight="bold">
            DÂY NGUỒN & CB 3PHA - 40A TRÊN TUM KT (KH THỰC HIỆN)
          </text>

          <!-- Thước đo HW & HD -->
          <text x="145" y="218" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">
            HW = ${specs.W} mm
          </text>
          <text x="270" y="118" fill="#0f172a" font-size="8" font-weight="bold" transform="rotate(90, 270, 118)" text-anchor="middle">
            HD = ${specs.D} mm
          </text>

          <!-- Mũi tên hướng cửa -->
          <path d="M 145 255 L 140 262 L 150 262 Z" fill="#0f172a"/>
          <text x="145" y="270" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">HƯỚNG CỬA THANG MÁY</text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 6: MẶT CẮT ĐỨNG HỐ THANG (CẮT DỌC TỔNG THỂ TỪ PIT LÊN TUM KT)
  // Gồm: PIT 1400, lót đáy 300, các tầng 1F-3F, lanh tô 200x200, dầm giằng H/2 <= 1800, Tum OH=4500, móc H phi 20
  // ==========================================================================================
  function renderDrawing6_VerticalSection(specs, isStandalone) {
    return `
      <g id="drawing6_verticalSection" class="cad-drawing">
        <!-- TIÊU ĐỀ: MẶT CẮT ĐỨNG HỐ THANG -->
        <text x="190" y="18" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle" text-decoration="underline">
          6. MẶT CẮT ĐỨNG HỐ THANG (VERTICAL SHAFT SECTION)
        </text>

        <g transform="translate(60, 28)">
          <!-- Cột/vách giếng thang trái (phía cửa) và phải (phía sau) -->
          <!-- Trục cột trái -->
          <rect x="40" y="40" width="18" height="240" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Trục cột phải -->
          <rect x="180" y="40" width="18" height="240" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1.2"/>

          <!-- ĐÁY HỐ PIT (Sàn bê tông cốt thép dày 300mm chống thấm) -->
          <rect x="25" y="280" width="185" height="22" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.5"/>
          <text x="115" y="295" fill="#0f172a" font-size="7.5" font-weight="bold" text-anchor="middle">
            ĐÁY PIT BTCT CHỐNG THẤM (DÀY 300mm)
          </text>

          <!-- Giảm chấn buffer đáy PIT -->
          <rect x="90" y="265" width="18" height="15" fill="#ea580c" stroke="#0f172a" stroke-width="1"/>
          <rect x="135" y="265" width="14" height="15" fill="#ea580c" stroke="#0f172a" stroke-width="1"/>

          <!-- TẦNG 1F (Sàn FFL 1F) -->
          <rect x="15" y="240" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <line x1="10" y1="240" x2="60" y2="240" stroke="#0f172a" stroke-width="1.5"/>
          <text x="25" y="235" fill="#0f172a" font-size="7" font-weight="bold">1F</text>
          <!-- Cửa vào tầng 1F cao 2400 -->
          <text x="75" y="225" fill="#0f172a" font-size="7" font-weight="bold">CỬA VÀO 1F</text>
          <!-- Lanh tô BTCT 200x200 tầng 1F -->
          <rect x="40" y="195" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>

          <!-- DẦM GIẰNG BTCT GIỮA TẦNG (H/2 <= 1800mm, đổ 3 mặt hố) -->
          <rect x="180" y="215" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="180" y="150" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="180" y="85" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>

          <!-- TẦNG 2F & 3F -->
          <rect x="15" y="175" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <text x="25" y="170" fill="#0f172a" font-size="7" font-weight="bold">2F</text>
          <rect x="40" y="130" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>

          <rect x="15" y="110" width="43" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <text x="25" y="105" fill="#0f172a" font-size="7" font-weight="bold">3F</text>
          <rect x="40" y="65" width="18" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Cabin đang đỗ tầng trên cùng -->
          <rect x="75" y="65" width="85" height="75" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
          <text x="117" y="105" fill="#0284c7" font-size="8" font-weight="bold" text-anchor="middle">CABIN</text>
          
          <!-- Khung đối trọng phía sau -->
          <rect x="165" y="130" width="12" height="50" fill="#475569" stroke="#0f172a" stroke-width="1"/>

          <!-- TUM KỸ THUẬT / PHÒNG MÁY TRÊN CÙNG -->
          <!-- Dầm bệ máy I200 -->
          <rect x="40" y="38" width="158" height="10" fill="#334155" stroke="#0f172a" stroke-width="1"/>
          <!-- Động cơ máy kéo Fuji PMSM -->
          <rect x="90" y="18" width="35" height="20" fill="#0284c7" stroke="#0f172a" stroke-width="1"/>
          <circle cx="125" cy="28" r="10" fill="#0f2766" stroke="#fbbf24" stroke-width="1.2"/>

          <!-- Sàn mái tum & MÓC TREO PA-LĂNG (CHI TIẾT 'H') -->
          <rect x="40" y="0" width="158" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Móc cong thép phi 20 -->
          <path d="M 125 14 L 125 24 A 5 5 0 1 1 115 24" fill="none" stroke="#dc2626" stroke-width="2.5"/>

          <!-- Ghi chú móc 'H' phóng to -->
          <line x1="125" y1="8" x2="160" y2="-10" stroke="#dc2626" stroke-width="0.8"/>
          <line x1="160" y1="-10" x2="210" y2="-10" stroke="#dc2626" stroke-width="0.8"/>
          <text x="215" y="-7" fill="#dc2626" font-size="8" font-weight="bold">CHI TIẾT 'H' (Thép gai ∅20)</text>

          <!-- Khung phóng to chi tiết 'H' góc phải -->
          <g transform="translate(195, 10)">
            <rect x="0" y="0" width="85" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
            <rect x="5" y="8" width="75" height="12" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="0.8"/>
            <path d="M 42 12 L 42 28 A 6 6 0 1 1 30 28" fill="none" stroke="#dc2626" stroke-width="2.5"/>
            <text x="42" y="6" fill="#0f172a" font-size="6.5" font-weight="bold" text-anchor="middle">Thép gai ∅20</text>
            <text x="42" y="38" fill="#dc2626" font-size="6.5" font-weight="900" text-anchor="middle">CHI TIẾT 'H'</text>
          </g>

          <!-- Thước đo dọc giếng: PIT & OH -->
          <!-- PIT -->
          <line x1="10" y1="240" x2="10" y2="280" stroke="#dc2626" stroke-width="1"/>
          <text x="5" y="263" fill="#dc2626" font-size="8" font-weight="900" text-anchor="end">PIT = ${specs.Pit}</text>

          <!-- OH -->
          <line x1="10" y1="0" x2="10" y2="110" stroke="#dc2626" stroke-width="1"/>
          <text x="5" y="55" fill="#dc2626" font-size="8" font-weight="900" text-anchor="end">OH = ${specs.Oh}</text>

          <!-- Ghi chú dầm giằng BTCT 3 mặt -->
          <text x="200" y="180" fill="#475569" font-size="6.5" font-weight="bold">
            Dầm BTCT giữa các tầng
          </text>
          <text x="200" y="190" fill="#475569" font-size="6" font-weight="bold">
            Đổ 3 mặt hố (khoảng cách ≤ 1.8m)
          </text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // BẢN VẼ 7: MẶT CẮT ĐỈNH TUM KT / PHÒNG MÁY PHÓNG TO
  // Gồm: Chi tiết đỉnh tum, máy kéo, móc treo H, cửa vào tum R800xC1000, chiều cao tum 1300, đỉnh cabin
  // ==========================================================================================
  function renderDrawing7_MachineRoomDetail(specs, isStandalone) {
    return `
      <g id="drawing7_machineRoomDetail" class="cad-drawing">
        <!-- TIÊU ĐỀ: MẶT CẮT ĐỈNH TUM KT -->
        <text x="180" y="18" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle" text-decoration="underline">
          7. MẶT CẮT ĐỈNH TUM KT (MACHINE ROOM SECTION)
        </text>

        <g transform="translate(40, 30)">
          <!-- Khung tum kỹ thuật (chiều cao tum 1300mm) -->
          <!-- Tường xây 110mm cả 04 mặt -->
          <rect x="25" y="0" width="235" height="12" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="25" y="12" width="16" height="75" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>
          <rect x="244" y="12" width="16" height="75" fill="url(#cadBrick)" stroke="#0f172a" stroke-width="1"/>

          <!-- Móc treo pa lăng Chi tiết 'H' thẳng tim puly máy kéo -->
          <path d="M 160 12 L 160 26 A 6 6 0 1 1 148 26" fill="none" stroke="#dc2626" stroke-width="3"/>
          <text x="160" y="6" fill="#dc2626" font-size="7.5" font-weight="bold" text-anchor="middle">CHI TIẾT 'H'</text>

          <!-- Cửa vào tum KT: R800 x C1000 -->
          <rect x="25" y="30" width="16" height="50" fill="#ffffff" stroke="#ffffff"/>
          <line x1="25" y1="30" x2="41" y2="30" stroke="#0f172a" stroke-width="1"/>
          <line x1="25" y1="80" x2="41" y2="80" stroke="#0f172a" stroke-width="1"/>
          <text x="12" y="55" fill="#d97706" font-size="7" font-weight="bold" text-anchor="end">
            CỬA VÀO TUM R800 x C1000
          </text>

          <!-- Dầm thép bệ đỡ máy kéo I200 đặt trên dầm bê tông -->
          <rect x="41" y="80" width="203" height="12" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <text x="95" y="90" fill="#ffffff" font-size="7" font-weight="bold">DẦM THÉP ĐỠ MÁY I200</text>

          <!-- Máy kéo Fuji PMSM không hộp số & Puly kéo -->
          <rect x="125" y="45" width="45" height="35" rx="3" fill="#0284c7" stroke="#0f172a" stroke-width="1.2"/>
          <circle cx="160" cy="62" r="16" fill="#0f2766" stroke="#fbbf24" stroke-width="1.5"/>
          <circle cx="160" cy="62" r="6" fill="#fbbf24"/>
          <text x="145" y="40" fill="#0284c7" font-size="7.5" font-weight="bold">MÁY KÉO FUJI PMSM</text>

          <!-- Cáp tải dẫn xuống đầu cabin & đối trọng -->
          <line x1="150" y1="62" x2="150" y2="135" stroke="#475569" stroke-width="2"/>
          <line x1="170" y1="62" x2="170" y2="185" stroke="#475569" stroke-width="1.5"/>

          <!-- Đỉnh Cabin (Car Roof) & Puly nóc Cabin -->
          <rect x="75" y="135" width="115" height="90" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
          <!-- Khung an toàn nóc cabin (balustrade) -->
          <rect x="78" y="115" width="109" height="20" fill="none" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4,2"/>
          <text x="132" y="128" fill="#ea580c" font-size="6.5" font-weight="bold" text-anchor="middle">LAN CAN AN TOÀN NÓC</text>
          
          <text x="132" y="175" fill="#0284c7" font-size="9" font-weight="900" text-anchor="middle">CABIN TẦNG 3F</text>

          <!-- Đối trọng phía sau -->
          <rect x="200" y="125" width="16" height="70" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <text x="208" y="165" fill="#ffffff" font-size="7" font-weight="bold" transform="rotate(90, 208, 165)" text-anchor="middle">ĐỐI TRỌNG</text>

          <!-- Cửa vào tầng trên cùng (3F) -->
          <rect x="15" y="135" width="26" height="14" fill="url(#cadConcrete)" stroke="#0f172a" stroke-width="1"/>
          <text x="18" y="130" fill="#0f172a" font-size="7" font-weight="bold">3F</text>

          <!-- Thước đo Tum: OH = 4500 (hoặc 4600mm) -->
          <line x1="5" y1="0" x2="5" y2="135" stroke="#dc2626" stroke-width="1"/>
          <text x="0" y="70" fill="#dc2626" font-size="8.5" font-weight="900" text-anchor="end">
            OH = ${specs.Oh} mm
          </text>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // KHU VỰC THÔNG SỐ KỸ THUẬT, PHẢN LỰC KẾT CẤU & YÊU CẦU NGHIỆM THU
  // ==========================================================================================
  function renderSpecsAndReactions(specs) {
    return `
      <g id="specsAndReactionsSection">
        <!-- BẢNG PHẢN LỰC TÁC ĐỘNG KẾT CẤU (R1 - R4) -->
        <g id="reactionForcesTable" transform="translate(0, 0)">
          <rect x="0" y="0" width="360" height="20" fill="#0f172a" rx="3"/>
          <text x="180" y="14" fill="#fbbf24" font-size="9.5" font-weight="900" text-anchor="middle">
            BẢNG TÍNH LỰC TÁC ĐỘNG HỐ THANG (REACTIONS)
          </text>

          <g transform="translate(0, 24)" font-size="8">
            <!-- R1 -->
            <rect x="0" y="0" width="110" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="55" y="13" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R1 (Đáy ray Cabin)</text>
            <rect x="110" y="0" width="250" height="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="120" y="13" fill="#0f172a" font-weight="900">R1 = ${specs.R1} kN</text>
            <text x="195" y="13" fill="#64748b" font-size="7.5">(Tác động đáy hố PIT khi phanh gấp)</text>

            <!-- R2 -->
            <rect x="0" y="20" width="110" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="55" y="33" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R2 (Đáy ray Tạ)</text>
            <rect x="110" y="20" width="250" height="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="120" y="33" fill="#0f172a" font-weight="900">R2 = ${specs.R2} kN</text>
            <text x="195" y="33" fill="#64748b" font-size="7.5">(Tác động đáy PIT khi đối trọng chạm đệm)</text>

            <!-- R3 -->
            <rect x="0" y="40" width="110" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="55" y="53" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R3 (Bệ máy kéo)</text>
            <rect x="110" y="40" width="250" height="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="120" y="53" fill="#0f172a" font-weight="900">R3 = ${specs.R3} kN</text>
            <text x="195" y="53" fill="#64748b" font-size="7.5">(Tải trọng động lên dầm chịu lực bệ máy)</text>

            <!-- R4 -->
            <rect x="0" y="60" width="110" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="55" y="73" fill="#0f172a" font-weight="bold" text-anchor="middle">LỰC R4 (Móc Pa-lăng)</text>
            <rect x="110" y="60" width="250" height="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
            <text x="120" y="73" fill="#dc2626" font-weight="900">R4 = ${specs.R4} kN</text>
            <text x="195" y="73" fill="#dc2626" font-size="7.5">(Tải trọng kiểm định móc tum: 2.0 Tấn)</text>
          </g>
        </g>

        <!-- 6 YÊU CẦU KỸ THUẬT XÂY DỰNG & NGHIỆM THU (CIVIL NOTES) -->
        <g id="civilNotesBlock" transform="translate(0, 115)">
          <rect x="0" y="0" width="360" height="18" fill="#0f172a" rx="3"/>
          <text x="180" y="13" fill="#fbbf24" font-size="8.5" font-weight="900" text-anchor="middle">
            YÊU CẦU KỸ THUẬT XÂY DỰNG & NGHIỆM THU HỐ THANG
          </text>

          <rect x="0" y="22" width="360" height="115" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8" rx="3"/>
          <g transform="translate(8, 34)" font-size="7.5">
            <text x="0" y="0" fill="#0f172a" font-weight="bold">1. Sai lệch hố:</text>
            <text x="55" y="0" fill="#334155">Độ thẳng đứng giếng thang không lệch quá ±10mm toàn bộ chiều cao.</text>

            <text x="0" y="14" fill="#0f172a" font-weight="bold">2. Dầm giằng:</text>
            <text x="55" y="14" fill="#334155">Đổ đà giằng BTCT 200x200 ở 3 mặt hố, khoảng cách liên tiếp ≤ 1800mm.</text>

            <text x="0" y="28" fill="#0f172a" font-weight="bold">3. Lanh-tô cửa:</text>
            <text x="55" y="28" fill="#334155">Đổ dầm BTCT cao 2250mm từ cốt hoàn thiện để gắn ray treo cửa tầng.</text>

            <text x="0" y="42" fill="#0f172a" font-weight="bold">4. Chống thấm:</text>
            <text x="55" y="42" fill="#dc2626" font-weight="bold">Đáy và vách PIT dâng cao 1000mm phải chống thấm tuyệt đối không ngấm nước.</text>

            <text x="0" y="56" fill="#0f172a" font-weight="bold">5. Điện nguồn:</text>
            <text x="55" y="56" fill="#334155">Kéo điện nguồn 3 pha 380V (hoặc 1 pha 220V) + tiếp địa độc lập R ≤ 4Ω.</text>

            <text x="0" y="70" fill="#0f172a" font-weight="bold">6. Thông gió tum:</text>
            <text x="55" y="70" fill="#334155">Cửa thông gió/quạt hút đạt tối thiểu 1% diện tích mặt bằng để tản nhiệt máy.</text>
          </g>
        </g>
      </g>
    `;
  }

  // ==========================================================================================
  // MASTER SVG: BẢN VẼ TỔNG HỢP KHỔ A3 (CHUẨN 07 MẶT CẮT KỸ THUẬT TRÊN CÙNG 1 KHUNG BẢN VẼ)
  // ==========================================================================================
  function generateMasterShopDrawingSvgA3(specs) {
    return `
      <svg id="shopDrawingMainSvg" viewBox="0 0 1600 1100" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" class="bg-white font-sans text-slate-900 select-none">
        ${getCadDefs()}

        <!-- NỀN TRẮNG & LƯỚI TỌA ĐỘ BẢN VẼ -->
        <rect x="0" y="0" width="1600" height="1100" fill="#ffffff"/>

        <!-- KHUNG VIỀN BẢN VẼ A3 CHUẨN XÂY DỰNG -->
        <rect x="15" y="15" width="1570" height="1070" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="20" y="20" width="1560" height="1060" fill="none" stroke="#0f172a" stroke-width="1.2"/>

        <!-- BANNER HEADER CHÍNH -->
        <g id="headerBanner" transform="translate(20, 20)">
          <rect x="0" y="0" width="1560" height="50" fill="#0f2766" stroke="#0f172a" stroke-width="1"/>
          <text x="30" y="32" fill="#fbbf24" font-size="16" font-weight="900" letter-spacing="1">
            SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
          </text>
          <text x="460" y="32" fill="#93c5fd" font-size="11" font-weight="700">
            HỒ SƠ BẢN VẼ SHOP DRAWING THIẾT KẾ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP (07 MẶT CẮT TIÊU CHUẨN)
          </text>
          <text x="1330" y="32" fill="#fbbf24" font-size="11" font-weight="900">
            HOTLINE: 0914.587.575
          </text>
        </g>

        <!-- HÀNG TRÊN: BẢN VẼ 1 + BẢN VẼ 2 + BẢN VẼ 3 + BẢN VẼ 4 -->
        <!-- 1. Mặt bằng hố thang (Typical & Floor) -->
        <g transform="translate(30, 80)">
          <rect x="0" y="0" width="370" height="240" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing1_HoistwayPlan(specs, false)}
        </g>

        <!-- 2. Chờ thô cửa tầng -->
        <g transform="translate(415, 80)">
          <rect x="0" y="0" width="370" height="240" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing2_RoughDoorOpening(specs, false)}
        </g>

        <!-- 3. Cửa tầng hoàn thiện -->
        <g transform="translate(800, 80)">
          <rect x="0" y="0" width="370" height="240" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing3_FinishedDoor(specs, false)}
        </g>

        <!-- 4. Mặt bằng lắp thang -->
        <g transform="translate(1185, 80)">
          <rect x="0" y="0" width="385" height="280" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing4_ElevatorInstallationPlan(specs, false)}
        </g>

        <!-- HÀNG DƯỚI: BẢN VẼ 5 + BẢN VẼ 6 + BẢN VẼ 7 + KHUNG TÊN VÀ BẢNG LỰC -->
        <!-- 5. Mặt bằng dầm đặt máy kéo đỉnh hố thang -->
        <g transform="translate(30, 335)">
          <rect x="0" y="0" width="370" height="300" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing5_MachineBeamsPlan(specs, false)}
        </g>

        <!-- 6. Mặt cắt đứng hố thang -->
        <g transform="translate(415, 335)">
          <rect x="0" y="0" width="370" height="340" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing6_VerticalSection(specs, false)}
        </g>

        <!-- 7. Mặt cắt đỉnh Tum KT phóng to -->
        <g transform="translate(800, 335)">
          <rect x="0" y="0" width="370" height="340" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          ${renderDrawing7_MachineRoomDetail(specs, false)}
        </g>

        <!-- BẢNG LỰC PHẢN LỰC & QUY CHUẨN XÂY DỰNG -->
        <g transform="translate(1185, 375)">
          ${renderSpecsAndReactions(specs)}
        </g>

        <!-- KHUNG TÊN KỸ THUẬT TIÊU CHUẨN A3 (GÓC DƯỚI PHẢI) -->
        <g transform="translate(1185, 690)">
          ${renderCadTitleBlock(specs, "BẢN VẼ TỔNG HỢP 07 MẶT CẮT THI CÔNG HỐ THANG", "STTM-A3-FULL", "A3")}
        </g>

        <!-- THÔNG TIN PHỤ DƯỚI ĐÁY BẢN VẼ -->
        <g transform="translate(30, 650)">
          <rect x="0" y="0" width="755" height="190" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8" rx="4"/>
          <text x="20" y="24" fill="#0f172a" font-size="11" font-weight="900">
            HỆ THỐNG THÔNG SỐ ĐỒNG BỘ THIẾT BỊ THANG MÁY:
          </text>
          
          <g transform="translate(20, 35)" font-size="8.5" fill="#334155">
            <text x="0" y="16">• Tải trọng định mức: <tspan font-weight="900" fill="#0f172a">${specs.cap} KG (${specs.persons} người)</tspan></text>
            <text x="260" y="16">• Tốc độ vận hành: <tspan font-weight="900" fill="#0f172a">${specs.speed} m/s (60 m/phút)</tspan></text>
            <text x="510" y="16">• Số điểm dừng: <tspan font-weight="900" fill="#0f172a">${specs.Stops} Stops / ${specs.Stops} Doors</tspan></text>

            <text x="0" y="38">• Kích thước lọt lòng: <tspan font-weight="900" fill="#0f172a">W${specs.W} x D${specs.D} mm</tspan></text>
            <text x="260" y="38">• Kích thước Cabin: <tspan font-weight="900" fill="#0f172a">CW${specs.CW} x CD${specs.CD} x CH${specs.CH} mm</tspan></text>
            <text x="510" y="38">• Cửa tầng / Cabin: <tspan font-weight="900" fill="#0f172a">CO${specs.CO} x DH${specs.DH} mm (Mở tim)</tspan></text>

            <text x="0" y="60">• Chiều sâu PIT: <tspan font-weight="900" fill="#dc2626">${specs.Pit} mm</tspan> (Chống thấm 1.0m)</text>
            <text x="260" y="60">• Chiều cao OH tầng tum: <tspan font-weight="900" fill="#dc2626">${specs.Oh} mm</tspan></text>
            <text x="510" y="60">• Móc cẩu nóc Tum R4: <tspan font-weight="900" fill="#dc2626">2.0 Tấn (∅20 gai)</tspan></text>

            <text x="0" y="82">• Động cơ máy kéo: <tspan font-weight="900" fill="#0f172a">Fuji / Torin PMSM (Không hộp số)</tspan></text>
            <text x="260" y="82">• Nguồn điện động lực: <tspan font-weight="900" fill="#0f172a">3 Pha 380V 50Hz (Aptomat 40A)</tspan></text>
            <text x="510" y="82">• Hệ điều khiển: <tspan font-weight="900" fill="#0f172a">Biến tần VVVF Vi xử lý 32 Bit</tspan></text>

            <text x="0" y="104">• Ray dẫn hướng Cabin: <tspan font-weight="900" fill="#0f172a">Ray đặc T78 / T89</tspan></text>
            <text x="260" y="104">• Ray dẫn hướng Đối trọng: <tspan font-weight="900" fill="#0f172a">Ray đặc T50 / T75</tspan></text>
            <text x="510" y="104">• Tiếp địa an toàn: <tspan font-weight="900" fill="#0f172a">Hệ thống cọc tiếp địa R ≤ 4Ω</tspan></text>

            <text x="0" y="128" fill="#dc2626" font-weight="bold">
              LƯU Ý THI CÔNG: Chủ đầu tư và Nhà thầu xây dựng đối chiếu kích thước hố thực tế trước khi đổ dầm sàn và dầm giằng giữ ray.
            </text>
          </g>
        </g>
      </svg>
    `;
  }

  // ==========================================================================================
  // XUẤT TẬP HỒ SƠ 8 TRANG A4 ĐÓNG QUYỂN (PRINT BOOKLET)
  // Mỗi trang gồm 1 bản vẽ riêng biệt phóng to sắc nét + Khung tên A4 + Tiêu chuẩn thi công
  // ==========================================================================================
  function generateMultiPageA4Html(specs) {
    var defs = getCadDefs();

    function wrapA4Page(title, drawingNo, contentHtml) {
      return `
        <div class="a4-page">
          <div class="a4-header">
            <div class="brand">SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC</div>
            <div class="sub">HỒ SƠ BẢN VẼ KỸ THUẬT SHOP DRAWING • HOTLINE KỸ SƯ TRƯỞNG: 0914.587.575</div>
          </div>
          
          <div class="a4-drawing-content">
            ${contentHtml}
          </div>

          <div class="a4-footer">
            <svg viewBox="0 0 360 150" width="360" height="150" class="footer-title-block">
              ${defs}
              ${renderCadTitleBlock(specs, title, drawingNo, "A4")}
            </svg>
          </div>
        </div>
      `;
    }

    // Trang 1: Trang bìa & Bảng thông số chung + Bảng lực R1-R4
    var page1Content = `
      <div style="padding: 20px; font-family: sans-serif; color: #0f172a;">
        <div style="text-align: center; border-bottom: 2px solid #0f2766; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #0f2766; font-size: 20px; margin: 0 0 5px; font-weight: 900;">SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC</h1>
          <h2 style="color: #dc2626; font-size: 15px; margin: 0 0 5px; font-weight: 900;">HỒ SƠ THIẾT KẾ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP</h2>
          <p style="color: #64748b; font-size: 11px; margin: 0;">ÁP DỤNG QUY CHUẨN KỸ THUẬT QUỐC GIA QCVN 02:2019/BLĐTBXH</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-size: 11px; line-height: 1.8;">
            <div style="font-weight: 900; color: #0f2766; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px; padding-bottom: 4px;">
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
            <div>• Động cơ: <strong>Fuji / Torin PMSM không hộp số</strong></div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-size: 11px; line-height: 1.8;">
            <div style="font-weight: 900; color: #dc2626; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px; padding-bottom: 4px;">
              BẢNG PHẢN LỰC TÁC ĐỘNG KẾT CẤU (KN)
            </div>
            <div>• Lực đáy ray Cabin (R1): <strong style="color:#0f172a;">${specs.R1} kN</strong> (Khi phanh gấp)</div>
            <div>• Lực đáy ray Tạ (R2): <strong style="color:#0f172a;">${specs.R2} kN</strong> (Khi tạ chạm đệm)</div>
            <div>• Lực dầm bệ máy (R3): <strong style="color:#0f172a;">${specs.R3} kN</strong> (Tải trọng động sàn)</div>
            <div>• Móc pa-lăng tum (R4): <strong style="color:#dc2626;">${specs.R4} kN (2.0 Tấn)</strong></div>
            <div style="margin-top: 10px; font-style: italic; color: #64748b; font-size: 10px;">
              * Căn cứ để Kỹ sư kết cấu tính toán móng, đài cọc và dầm sàn đỡ thang máy.
            </div>
          </div>
        </div>

        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; font-size: 11px; line-height: 1.6;">
          <div style="font-weight: 900; color: #991b1b; margin-bottom: 6px;">DANH MỤC 07 MẶT CẮT KỸ THUẬT TRONG HỒ SƠ:</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 10.5px;">
            <div>1. Mặt bằng hố thang (Điển hình & Sàn tầng)</div>
            <div>5. Mặt bằng dầm đặt máy kéo đỉnh hố</div>
            <div>2. Chờ thô cửa tầng (Mặt đứng + Cắt 1-1, 2-2)</div>
            <div>6. Mặt cắt đứng giếng thang tổng thể</div>
            <div>3. Cửa tầng hoàn thiện & Hộp LOP</div>
            <div>7. Mặt cắt đỉnh Tum KT / Phòng máy phóng to</div>
            <div>4. Mặt bằng lắp thang (Cabin, Đối trọng, Ray)</div>
            <div>8. Khung tên kỹ thuật & Xác nhận Kỹ sư trưởng</div>
          </div>
        </div>
      </div>
    `;

    // Trang 2: Bản vẽ 1
    var page2Content = `<svg viewBox="0 0 380 250" width="100%" height="auto">${defs}${renderDrawing1_HoistwayPlan(specs, true)}</svg>`;

    // Trang 3: Bản vẽ 2
    var page3Content = `<svg viewBox="0 0 380 260" width="100%" height="auto">${defs}${renderDrawing2_RoughDoorOpening(specs, true)}</svg>`;

    // Trang 4: Bản vẽ 3
    var page4Content = `<svg viewBox="0 0 380 260" width="100%" height="auto">${defs}${renderDrawing3_FinishedDoor(specs, true)}</svg>`;

    // Trang 5: Bản vẽ 4
    var page5Content = `<svg viewBox="0 0 380 290" width="100%" height="auto">${defs}${renderDrawing4_ElevatorInstallationPlan(specs, true)}</svg>`;

    // Trang 6: Bản vẽ 5
    var page6Content = `<svg viewBox="0 0 380 300" width="100%" height="auto">${defs}${renderDrawing5_MachineBeamsPlan(specs, true)}</svg>`;

    // Trang 7: Bản vẽ 6
    var page7Content = `<svg viewBox="0 0 380 340" width="100%" height="auto">${defs}${renderDrawing6_VerticalSection(specs, true)}</svg>`;

    // Trang 8: Bản vẽ 7
    var page8Content = `<svg viewBox="0 0 380 330" width="100%" height="auto">${defs}${renderDrawing7_MachineRoomDetail(specs, true)}</svg>`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Hồ Sơ Bản Vẽ Shop Drawing (Tập A4 8 Trang) - Siêu Thị Thang Máy Toàn Quốc</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          @media print {
            body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .a4-page { page-break-after: always; width: 100%; height: 98vh; display: flex; flex-direction: column; justify-content: space-between; border: none !important; }
          }
          body {
            margin: 0;
            padding: 15px;
            background: #e2e8f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .a4-page {
            background: #fff;
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto 20px;
            padding: 10mm;
            box-sizing: border-box;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #cbd5e1;
          }
          .a4-header {
            border-bottom: 2px solid #0f2766;
            padding-bottom: 6px;
            margin-bottom: 10px;
          }
          .a4-header .brand {
            font-size: 13px;
            font-weight: 900;
            color: #0f2766;
          }
          .a4-header .sub {
            font-size: 9px;
            font-weight: bold;
            color: #64748b;
          }
          .a4-drawing-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .a4-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
          }
          .footer-title-block {
            max-width: 360px;
            height: auto;
          }
        </style>
      </head>
      <body>
        ${wrapA4Page("TỔNG QUAN HỒ SƠ & THÔNG SỐ KỸ THUẬT", "STTM-A4-01", page1Content)}
        ${wrapA4Page("MẶT BẰNG HỐ THANG (ĐIỂN HÌNH & SÀN TẦNG)", "STTM-A4-02", page2Content)}
        ${wrapA4Page("CHỜ THÔ CỬA TẦNG (OPEN 1200x2400 & CẮT 1-1, 2-2)", "STTM-A4-03", page3Content)}
        ${wrapA4Page("CỬA TẦNG HOÀN THIỆN & HỘP NÚT BẤM LOP 1200", "STTM-A4-04", page4Content)}
        ${wrapA4Page("MẶT BẰNG LẮP THANG (CABIN, ĐỐI TRỌNG & RAY)", "STTM-A4-05", page5Content)}
        ${wrapA4Page("MẶT BẰNG DẦM ĐẶT MÁY KÉO ĐỈNH HỐ THANG", "STTM-A4-06", page6Content)}
        ${wrapA4Page("MẶT CẮT ĐỨNG GIẾNG THANG (PIT, TẦNG, DẦM GIẰNG)", "STTM-A4-07", page7Content)}
        ${wrapA4Page("MẶT CẮT ĐỈNH TUM KT / PHÒNG MÁY PHÓNG TO", "STTM-A4-08", page8Content)}

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;
  }

  // ==========================================================================================
  // MODAL XEM TRƯỚC VÀ ĐIỀU HƯỚNG BẢN VẼ TRÊN GIAO DIỆN WEB
  // Cho phép: Xem Bản Tổng Hợp A3 HOẶC Xem từng mặt cắt riêng biệt (1 đến 7)
  // Nút In PDF A3, In Tập A4 (8 Trang), Tải SVG, Gửi Zalo
  // ==========================================================================================
  window.openShopDrawingPdfModal = function (customW, customD, customPit, customOh, customStops, customCap) {
    var W = customW || (document.getElementById('inputWidth') ? document.getElementById('inputWidth').value : (document.getElementById('homeInputW') ? document.getElementById('homeInputW').value : 1800));
    var D = customD || (document.getElementById('inputDepth') ? document.getElementById('inputDepth').value : (document.getElementById('homeInputD') ? document.getElementById('homeInputD').value : 1500));
    var Pit = customPit || (document.getElementById('inputPit') ? document.getElementById('inputPit').value : (document.getElementById('homeInputPit') ? document.getElementById('homeInputPit').value : 1400));
    var Oh = customOh || (document.getElementById('inputOh') ? document.getElementById('inputOh').value : (document.getElementById('homeInputOh') ? document.getElementById('homeInputOh').value : 4500));
    var Stops = customStops || (document.getElementById('inputStops') ? document.getElementById('inputStops').value : (document.getElementById('homeInputStops') ? document.getElementById('homeInputStops').value : 4));
    var Cap = customCap || (W < 1400 ? 350 : (W < 1700 ? 450 : 630));

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
              Chuẩn thẩm định kỹ thuật QCVN 02:2019 • Xuất PDF Khổ A3 Kỹ Sư & Tập Hồ Sơ A4 (8 Trang Đóng Quyển)
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
            <span>💬</span> Gửi Zalo Kỹ Sư Trưởng
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
          7. Mặt Cắt Đỉnh Tum KT
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

    // Lưu các biến toàn cục cho view switcher
    window._currentSpecs = specs;
    window._masterSvgA3 = masterSvgA3;
  };

  // CHUYỂN ĐỔI GÓC NHÌN XEM TRƯỚC TRONG MODAL
  window.switchDrawingView = function (viewId) {
    var specs = window._currentSpecs;
    if (!specs) return;

    // Reset styles nút tab
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
      container.innerHTML = window._masterSvgA3;
    } else if (viewId === 'mc1') {
      container.innerHTML = `
        <svg viewBox="0 0 400 240" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing1_HoistwayPlan(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc2') {
      container.innerHTML = `
        <svg viewBox="0 0 380 250" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing2_RoughDoorOpening(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc3') {
      container.innerHTML = `
        <svg viewBox="0 0 380 260" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing3_FinishedDoor(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc4') {
      container.innerHTML = `
        <svg viewBox="0 0 380 290" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing4_ElevatorInstallationPlan(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc5') {
      container.innerHTML = `
        <svg viewBox="0 0 380 300" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing5_MachineBeamsPlan(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc6') {
      container.innerHTML = `
        <svg viewBox="0 0 380 340" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing6_VerticalSection(specs, true)}
        </svg>
      `;
    } else if (viewId === 'mc7') {
      container.innerHTML = `
        <svg viewBox="0 0 380 330" width="100%" height="auto" class="bg-white p-4">
          ${defs}
          ${renderDrawing7_MachineRoomDetail(specs, true)}
        </svg>
      `;
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
        <style>
          @page {
            size: A3 landscape;
            margin: 5mm;
          }
          @media print {
            body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page-container { width: 100%; height: 98vh; display: flex; align-items: center; justify-content: center; }
            svg { width: 100%; height: 100%; max-height: 98vh; }
          }
          body { margin: 0; padding: 10px; background: #cbd5e1; font-family: sans-serif; }
          .page-container { background: #fff; max-width: 1600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        </style>
      </head>
      <body>
        <div class="page-container">
          ${masterSvg}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 400);
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

  // GỬI THÔNG TIN VÀ YÊU CẦU FILE BẢN VẼ QUA ZALO KỸ SƯ TRƯỞNG
  window.sendShopDrawingToZalo = function (W, D, Pit, Oh, Stops, Cap) {
    var details = 'Hồ sơ bản vẽ Shop Drawing 7 mặt cắt kỹ thuật: Hố lọt lòng ' + W + 'x' + D + 'mm • PIT: ' + Pit + 'mm • OH: ' + Oh + 'mm • ' + Stops + ' tầng • Tải trọng: ' + Cap + 'kg';
    if (window.openQuickLeadModal) {
      window.openQuickLeadModal('Gửi Trọn Bộ 7 Bản Vẽ Shop Drawing Qua Zalo', details);
    } else {
      var msg = 'Chào Kỹ Sư Trưởng 0914.587.575! Tôi cần nhận trọn bộ 7 bản vẽ Shop Drawing và hồ sơ tính toán hố thang: ' + details;
      window.open('https://zalo.me/0914587575?text=' + encodeURIComponent(msg), '_blank');
    }
  };

})();
