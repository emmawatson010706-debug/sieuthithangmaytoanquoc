// Module Xuất Bản Vẽ Shop Drawing Kỹ Thuật Hố Bê Tông (Khổ A3/A4)
// Thương hiệu độc quyền: SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
(function () {
  'use strict';

  // 1. Hàm tính toán thông số kỹ thuật động dựa trên kích thước hố
  function calculateShopDrawingSpecs(W, D, Pit, Oh, Stops, Capacity) {
    W = parseInt(W) || 1400;
    D = parseInt(D) || 1450;
    Pit = parseInt(Pit) || 350;
    Oh = parseInt(Oh) || 3200;
    Stops = parseInt(Stops) || 4;

    // Tải trọng ước tính theo diện tích nếu không truyền vào
    var cap = parseInt(Capacity) || (W < 1300 ? 300 : (W < 1500 ? 450 : (W < 1700 ? 630 : 800)));
    var speed = cap <= 450 ? 1.0 : 1.5; // m/s
    var persons = Math.floor(cap / 75);

    // Kích thước Cabin thông thủy
    var CW = Math.max(700, W - 400);
    var CD = Math.max(700, D - 550);
    var CH = 2200;

    // Cửa mở tầng
    var doorW = Math.max(600, Math.min(900, Math.round(CW * 0.7 / 50) * 50));
    var doorH = 2100;

    // Phản lực tính toán kết cấu (kN)
    var R1 = (cap * 0.08 + 15).toFixed(1); // Lực đáy ray cabin
    var R2 = (cap * 0.07 + 12).toFixed(1); // Lực đáy ray đối trọng
    var R3 = (cap * 0.12 + 25).toFixed(1); // Lực dầm bệ máy
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
      doorW: doorW,
      doorH: doorH,
      R1: R1,
      R2: R2,
      R3: R3,
      R4: R4
    };
  }

  // 2. Tạo nội dung Vector SVG & Khung Bản Vẽ Kỹ Thuật A3 Chuẩn
  function generateShopDrawingSvg(specs) {
    var today = new Date().toLocaleDateString('vi-VN');

    // Toàn bộ bản vẽ thiết kế trên khung A3 tỷ lệ chuẩn 1190 x 842 px (hoặc 1200 x 850)
    return `
      <svg id="shopDrawingMainSvg" viewBox="0 0 1280 900" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" class="bg-white font-sans text-slate-900 select-none drop-shadow-2xl">
        <defs>
          <pattern id="concreteHatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="16" stroke="#cbd5e1" stroke-width="1.5"/>
            <circle cx="8" cy="8" r="1" fill="#94a3b8"/>
          </pattern>
          <pattern id="gridSub" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="#f1f5f9" stroke-width="0.5"/>
            <line x1="0" y1="0" x2="0" y2="20" stroke="#f1f5f9" stroke-width="0.5"/>
          </pattern>
        </defs>

        <!-- NỀN LƯỚI TỌA ĐỘ BẢN VẼ -->
        <rect x="0" y="0" width="1280" height="900" fill="#ffffff"/>
        <rect x="15" y="15" width="1250" height="870" fill="url(#gridSub)"/>

        <!-- KHUNG VIỀN NGOÀI BẢN VẼ (TIÊU CHUẨN XÂY DỰNG A3) -->
        <rect x="20" y="20" width="1240" height="860" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="25" y="25" width="1230" height="850" fill="none" stroke="#0f172a" stroke-width="1.2"/>

        <!-- HEADER BANNER CHÍNH CỦA BẢN VẼ -->
        <g id="headerBanner">
          <rect x="25" y="25" width="1230" height="60" fill="#0f2766" stroke="#0f172a" stroke-width="1"/>
          
          <text x="45" y="52" fill="#fbbf24" font-size="16" font-weight="900" letter-spacing="1.5">
            SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
          </text>
          <text x="45" y="70" fill="#93c5fd" font-size="11" font-weight="700">
            PHÒNG THẨM ĐỊNH KỸ THUẬT & HỒ SƠ THI CÔNG HỐ THANG BÊ TÔNG CỐT THÉP • CAN CỨ QCVN 02:2019/BLĐTBXH
          </text>

          <rect x="920" y="35" width="315" height="40" rx="6" fill="#1e3a8a" stroke="#fbbf24" stroke-width="1"/>
          <text x="935" y="52" fill="#fbbf24" font-size="11" font-weight="900">HOTLINE KỸ SƯ TRƯỞNG: 0914.587.575</text>
          <text x="935" y="66" fill="#ffffff" font-size="10" font-weight="600">Website: sieuthithangmaytoanquoc.com</text>
        </g>

        <!-- ==================== KHU VỰC 1: MẶT CẮT ĐỨNG TỔNG THỂ HỐ THANG (VERTICAL SECTION A-A) ==================== -->
        <g id="verticalSection" transform="translate(45, 105)">
          <!-- Tiêu đề mặt cắt -->
          <rect x="0" y="0" width="360" height="24" fill="#0f172a" rx="4"/>
          <text x="180" y="16" fill="#fbbf24" font-size="11" font-weight="900" text-anchor="middle">
            1. MẶT CẮT ĐỨNG GIẾNG THANG (VERTICAL SECTION A-A)
          </text>

          <!-- Trục cột hố bê tông -->
          <!-- Tường bê tông trái & phải -->
          <rect x="40" y="35" width="22" height="440" fill="url(#concreteHatch)" stroke="#0f172a" stroke-width="1.5"/>
          <rect x="298" y="35" width="22" height="440" fill="url(#concreteHatch)" stroke="#0f172a" stroke-width="1.5"/>

          <!-- Nóc giếng thang / Sàn phòng máy -->
          <rect x="40" y="35" width="280" height="20" fill="url(#concreteHatch)" stroke="#0f172a" stroke-width="1.5"/>
          <!-- Đáy hố PIT bê tông cốt thép -->
          <rect x="40" y="455" width="280" height="22" fill="url(#concreteHatch)" stroke="#0f172a" stroke-width="1.5"/>

          <!-- Móc treo Pa-lăng nóc giếng thang -->
          <path d="M 180 55 L 180 75 A 10 10 0 1 1 170 85" fill="none" stroke="#dc2626" stroke-width="3"/>
          <text x="195" y="75" fill="#dc2626" font-size="9" font-weight="800">Móc cẩu R4: ${specs.R4} kN (2.0 Tấn)</text>

          <!-- Dầm thép bệ máy kéo -->
          <rect x="80" y="90" width="200" height="14" fill="#334155" stroke="#0f172a" stroke-width="1"/>
          <!-- Động cơ Fuji PMSM -->
          <rect x="135" y="70" width="60" height="20" rx="3" fill="#0284c7" stroke="#0f172a" stroke-width="1"/>
          <circle cx="190" cy="80" r="16" fill="#0369a1" stroke="#fbbf24" stroke-width="1.5"/>
          <text x="165" y="64" fill="#0284c7" font-size="8" font-weight="bold" text-anchor="middle">ĐỘNG CƠ FUJI</text>

          <!-- Lòng giếng thang -->
          <!-- Ray cabin & Ray đối trọng -->
          <line x1="85" y1="104" x2="85" y2="445" stroke="#b45309" stroke-width="2.5"/>
          <line x1="275" y1="104" x2="275" y2="445" stroke="#b45309" stroke-width="2.5"/>

          <!-- Đà giằng bê tông giữ ray (mỗi khoảng 1.5m) -->
          <rect x="40" y="165" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="298" y="165" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="40" y="275" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="298" y="275" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="40" y="380" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="298" y="380" width="22" height="14" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <text x="325" y="285" fill="#475569" font-size="8" font-weight="bold">Đà giằng bê tông d=200mm (Khoảng cách ≤ 1.8m)</text>

          <!-- Dầm Lintel cửa tầng -->
          <rect x="40" y="210" width="22" height="12" fill="#d97706" stroke="#0f172a" stroke-width="1"/>
          <rect x="40" y="320" width="22" height="12" fill="#d97706" stroke="#0f172a" stroke-width="1"/>
          <text x="18" y="218" fill="#d97706" font-size="7.5" font-weight="bold" text-anchor="end">Lintel H: 2250mm</text>

          <!-- Khung Cabin đang treo ở giữa tầng -->
          <rect x="100" y="220" width="140" height="120" rx="4" fill="#f8fafc" stroke="#0284c7" stroke-width="2"/>
          <rect x="110" y="230" width="120" height="100" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1"/>
          <!-- Cáp treo -->
          <line x1="170" y1="96" x2="170" y2="220" stroke="#475569" stroke-width="2"/>
          <line x1="206" y1="96" x2="206" y2="300" stroke="#475569" stroke-width="1.5"/>
          <!-- Khung Đối Trọng -->
          <rect x="195" y="300" width="22" height="60" fill="#64748b" stroke="#0f172a" stroke-width="1"/>
          <text x="170" y="280" fill="#0369a1" font-size="10" font-weight="900" text-anchor="middle">CABIN (${specs.CW}x${specs.CD})</text>
          <text x="170" y="295" fill="#0284c7" font-size="8" font-weight="bold" text-anchor="middle">${specs.cap} KG - ${specs.persons} NGƯỜI</text>

          <!-- Hố PIT & Giảm chấn (Buffer) -->
          <rect x="120" y="435" width="28" height="20" fill="#ea580c" stroke="#0f172a" stroke-width="1"/>
          <rect x="210" y="435" width="20" height="20" fill="#ea580c" stroke="#0f172a" stroke-width="1"/>
          <path d="M 68 400 L 68 450 M 74 400 L 74 450 M 68 410 L 74 410 M 68 420 L 74 420 M 68 430 L 74 430 M 68 440 L 74 440" stroke="#64748b" stroke-width="1.5"/>
          <text x="170" y="448" fill="#ea580c" font-size="8.5" font-weight="bold" text-anchor="middle">ĐỆM GIẢM CHẤN BUFFER</text>

          <!-- Kích thước dọc (Dimensions) -->
          <!-- Kích thước Tum OH -->
          <line x1="15" y1="55" x2="15" y2="120" stroke="#0f172a" stroke-width="1"/>
          <text x="10" y="90" fill="#0f172a" font-size="9" font-weight="bold" text-anchor="end">OH = ${specs.Oh} mm</text>

          <!-- Kích thước Hố PIT -->
          <line x1="15" y1="420" x2="15" y2="475" stroke="#0f172a" stroke-width="1"/>
          <text x="10" y="450" fill="#dc2626" font-size="9" font-weight="900" text-anchor="end">PIT = ${specs.Pit} mm</text>

          <text x="180" y="495" fill="#475569" font-size="9" font-weight="bold" text-anchor="middle">
            Tổng chiều cao giếng: ${(specs.Pit + specs.Oh + (specs.Stops - 1) * 3300)} mm • ${specs.Stops} Điểm dừng
          </text>
        </g>

        <!-- ==================== KHU VỰC 2: MẶT CẮT NGANG HỐ THANG & CABIN (CROSS SECTION PLAN B-B) ==================== -->
        <g id="horizontalPlan" transform="translate(440, 105)">
          <rect x="0" y="0" width="390" height="24" fill="#0f172a" rx="4"/>
          <text x="195" y="16" fill="#fbbf24" font-size="11" font-weight="900" text-anchor="middle">
            2. MẶT CẮT NGANG GIẾNG THANG (HOISTWAY PLAN B-B)
          </text>

          <!-- Khung hố bê tông (Concrete Wall) -->
          <rect x="30" y="40" width="330" height="300" fill="url(#concreteHatch)" stroke="#0f172a" stroke-width="2"/>
          <rect x="52" y="62" width="286" height="256" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8"/>

          <!-- Trục tim giếng thang -->
          <line x1="195" y1="30" x2="195" y2="350" stroke="#ef4444" stroke-dasharray="6,3" stroke-width="1"/>
          <line x1="20" y1="190" x2="370" y2="190" stroke="#ef4444" stroke-dasharray="6,3" stroke-width="1"/>

          <!-- Cửa mở tầng (Phía trước hố thang) -->
          <rect x="135" y="52" width="120" height="15" fill="#f59e0b" stroke="#0f172a" stroke-width="1.5"/>
          <text x="195" y="44" fill="#b45309" font-size="9" font-weight="900" text-anchor="middle">CỬA TẦNG JJ = ${specs.doorW} mm</text>

          <!-- Cabin Thang Máy -->
          <rect x="85" y="115" width="220" height="180" rx="4" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <rect x="92" y="122" width="206" height="166" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.2"/>
          
          <!-- Cửa Cabin tự động -->
          <rect x="145" y="110" width="100" height="8" fill="#0284c7" stroke="#0f172a" stroke-width="1"/>
          
          <!-- Khung Đối Trọng (Bố trí phía sau cabin) -->
          <rect x="125" y="70" width="140" height="24" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
          <!-- Ray đối trọng -->
          <polygon points="120,82 125,78 125,86" fill="#b45309"/>
          <polygon points="270,82 265,78 265,86" fill="#b45309"/>
          <text x="195" y="85" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle">ĐỐI TRỌNG (T50/T75)</text>

          <!-- Cặp Ray Cabin (2 bên hông) -->
          <polygon points="80,195 85,188 85,202" fill="#d97706"/>
          <rect x="52" y="190" width="28" height="10" fill="#94a3b8" stroke="#0f172a" stroke-width="1"/>

          <polygon points="310,195 305,188 305,202" fill="#d97706"/>
          <rect x="310" y="190" width="28" height="10" fill="#94a3b8" stroke="#0f172a" stroke-width="1"/>
          <text x="45" y="185" fill="#b45309" font-size="8" font-weight="bold" text-anchor="end">RAY T78/T89</text>
          <text x="345" y="185" fill="#b45309" font-size="8" font-weight="bold">RAY T78/T89</text>

          <!-- Kích thước Cabin bên trong -->
          <text x="195" y="200" fill="#0369a1" font-size="11" font-weight="900" text-anchor="middle">CABIN LỌT LÒNG</text>
          <text x="195" y="215" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">CW: ${specs.CW} mm x CD: ${specs.CD} mm</text>
          <text x="195" y="230" fill="#64748b" font-size="8.5" text-anchor="middle">Chiều cao thông thủy CH: ${specs.CH} mm</text>

          <!-- Kích thước Hố Thang lọt lòng (W x D) -->
          <!-- Rộng W (Thước ngang) -->
          <line x1="52" y1="360" x2="338" y2="360" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="52" y1="353" x2="52" y2="367" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="338" y1="353" x2="338" y2="367" stroke="#0f172a" stroke-width="1.5"/>
          <text x="195" y="375" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">CHIỀU RỘNG HỐ (W) = ${specs.W} mm</text>

          <!-- Sâu D (Thước dọc) -->
          <line x1="380" y1="62" x2="380" y2="318" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="373" y1="62" x2="387" y2="62" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="373" y1="318" x2="387" y2="318" stroke="#0f172a" stroke-width="1.5"/>
          <text x="395" y="195" fill="#0f172a" font-size="11" font-weight="900" transform="rotate(90, 395, 195)" text-anchor="middle">CHIỀU SÂU HỐ (D) = ${specs.D} mm</text>
        </g>

        <!-- ==================== KHU VỰC 3: MẶT BẰNG PHÒNG MÁY / BỆ ĐỘNG CƠ (MACHINE ROOM PLAN C-C) ==================== -->
        <g id="machineRoomPlan" transform="translate(860, 105)">
          <rect x="0" y="0" width="375" height="24" fill="#0f172a" rx="4"/>
          <text x="187" y="16" fill="#fbbf24" font-size="11" font-weight="900" text-anchor="middle">
            3. MẶT BẰNG PHÒNG MÁY / ĐỈNH HỐ (PLAN C-C)
          </text>

          <rect x="25" y="38" width="325" height="175" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8"/>

          <!-- Dầm thép bệ máy I200 -->
          <rect x="50" y="60" width="275" height="18" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <rect x="50" y="125" width="275" height="18" fill="#475569" stroke="#0f172a" stroke-width="1"/>
          <text x="60" y="73" fill="#ffffff" font-size="8" font-weight="bold">DẦM THÉP I180 - I200</text>
          <text x="60" y="138" fill="#ffffff" font-size="8" font-weight="bold">DẦM THÉP I180 - I200</text>

          <!-- Máy kéo trung tâm -->
          <circle cx="187" cy="100" r="30" fill="#0284c7" stroke="#0f172a" stroke-width="1.5"/>
          <circle cx="187" cy="100" r="14" fill="#0f172a"/>
          <text x="187" y="104" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle">PULY KÉO</text>

          <!-- Các lỗ chờ kỹ thuật khoét sàn -->
          <rect x="135" y="90" width="18" height="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="120" y="85" fill="#dc2626" font-size="7.5" font-weight="bold">Lỗ cáp 150x150</text>

          <rect x="220" y="90" width="18" height="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="235" y="85" fill="#dc2626" font-size="7.5" font-weight="bold">Lỗ cáp 150x150</text>

          <rect x="90" y="160" width="15" height="15" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
          <text x="110" y="172" fill="#d97706" font-size="7.5" font-weight="bold">Lỗ Governor</text>

          <!-- Tủ điều khiển VVVF -->
          <rect x="250" y="160" width="80" height="30" fill="#0f2766" stroke="#fbbf24" stroke-width="1"/>
          <text x="290" y="178" fill="#fbbf24" font-size="8.5" font-weight="bold" text-anchor="middle">TỦ ĐIỆN VVVF</text>

          <text x="187" y="225" fill="#64748b" font-size="8" text-anchor="middle">Khoét sẵn 04 lỗ kỹ thuật • Cung cấp quạt thông gió & móc treo</text>
        </g>

        <!-- ==================== KHU VỰC 4: BẢNG TẢI TRỌNG & PHẢN LỰC KẾT CẤU (REACTION FORCES) ==================== -->
        <g id="reactionForcesTable" transform="translate(860, 350)">
          <rect x="0" y="0" width="375" height="24" fill="#0f172a" rx="4"/>
          <text x="187" y="16" fill="#fbbf24" font-size="11" font-weight="900" text-anchor="middle">
            4. BẢNG TÍNH LỰC TÁC ĐỘNG HỐ THANG (REACTIONS)
          </text>

          <!-- Bảng thông số lực -->
          <rect x="0" y="30" width="375" height="145" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          
          <!-- Hàng 1 -->
          <rect x="0" y="30" width="120" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="60" y="48" fill="#0f172a" font-size="9" font-weight="bold" text-anchor="middle">LỰC R1 (Đáy ray Cabin)</text>
          <rect x="120" y="30" width="255" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="135" y="48" fill="#0f172a" font-size="10" font-weight="900">R1 = ${specs.R1} kN</text>
          <text x="225" y="48" fill="#64748b" font-size="8.5">(Tác động lên đáy PIT khi phanh gấp)</text>

          <!-- Hàng 2 -->
          <rect x="0" y="58" width="120" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="60" y="76" fill="#0f172a" font-size="9" font-weight="bold" text-anchor="middle">LỰC R2 (Đáy ray Tạ)</text>
          <rect x="120" y="58" width="255" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="135" y="76" fill="#0f172a" font-size="10" font-weight="900">R2 = ${specs.R2} kN</text>
          <text x="225" y="76" fill="#64748b" font-size="8.5">(Tác động đáy PIT khi đối trọng chạm đệm)</text>

          <!-- Hàng 3 -->
          <rect x="0" y="86" width="120" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="60" y="104" fill="#0f172a" font-size="9" font-weight="bold" text-anchor="middle">LỰC R3 (Bệ máy kéo)</text>
          <rect x="120" y="86" width="255" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="135" y="104" fill="#0f172a" font-size="10" font-weight="900">R3 = ${specs.R3} kN</text>
          <text x="225" y="104" fill="#64748b" font-size="8.5">(Tải trọng động lên dầm chịu lực phòng máy)</text>

          <!-- Hàng 4 -->
          <rect x="0" y="114" width="120" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="60" y="132" fill="#0f172a" font-size="9" font-weight="bold" text-anchor="middle">LỰC R4 (Móc Pa-lăng)</text>
          <rect x="120" y="114" width="255" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <text x="135" y="132" fill="#dc2626" font-size="10" font-weight="900">R4 = ${specs.R4} kN</text>
          <text x="225" y="132" fill="#dc2626" font-size="8.5">(Tải trọng thử nghiệm móc nóc tum: 2 Tấn)</text>

          <!-- Ghi chú kết cấu -->
          <text x="187" y="160" fill="#475569" font-size="8" font-style="italic" text-anchor="middle">
            Căn cứ để Kỹ Sư Kết Cấu tính toán móng, đài cọc và dầm sàn đỡ thang máy.
          </text>
        </g>

        <!-- ==================== KHU VỰC 5: GHI CHÚ KỸ THUẬT THI CÔNG NGHIỆM THU (CIVIL NOTES) ==================== -->
        <g id="civilNotes" transform="translate(45, 620)">
          <rect x="0" y="0" width="785" height="22" fill="#0f172a" rx="4"/>
          <text x="392" y="15" fill="#fbbf24" font-size="10.5" font-weight="900" text-anchor="middle">
            5. YÊU CẦU KỸ THUẬT XÂY DỰNG & NGHIỆM THU HỐ THANG BÊ TÔNG (BẮT BUỘC)
          </text>

          <rect x="0" y="26" width="785" height="115" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="4"/>
          
          <text x="15" y="44" fill="#0f172a" font-size="9.5" font-weight="bold">1. Sai lệch kích thước hố thang:</text>
          <text x="175" y="44" fill="#334155" font-size="9">Độ thẳng đứng giếng thang không lệch quá ±10mm trên toàn bộ chiều cao. Kích thước không nhỏ hơn số đo thiết kế.</text>

          <text x="15" y="62" fill="#0f172a" font-size="9.5" font-weight="bold">2. Đà giằng giữ ray bê tông:</text>
          <text x="175" y="62" fill="#334155" font-size="9">Đổ đà giằng bê tông 200x200mm ở 3 mặt vách hố, khoảng cách giữa 2 đà giằng liên tiếp không vượt quá 1800mm.</text>

          <text x="15" y="80" fill="#0f172a" font-size="9.5" font-weight="bold">3. Dầm Lintel cửa tầng:</text>
          <text x="175" y="80" fill="#334155" font-size="9">Đổ dầm bê tông cao độ 2250mm tính từ sàn hoàn thiện để định vị cụm khóa và ray treo cánh cửa tầng.</text>

          <text x="15" y="98" fill="#0f172a" font-size="9.5" font-weight="bold">4. Chống thấm hố PIT:</text>
          <text x="175" y="98" fill="#dc2626" font-size="9" font-weight="bold">Đáy và thành hố PIT dâng cao 1000mm phải được xử lý chống thấm tuyệt đối (không có nước ngấm vào hố).</text>

          <text x="15" y="116" fill="#0f172a" font-size="9.5" font-weight="bold">5. Nguồn điện & Tiếp địa:</text>
          <text x="175" y="116" fill="#334155" font-size="9">Kéo nguồn điện 3 pha 380V (hoặc 1 pha 220V) tới phòng máy + cọc tiếp địa chống sét độc lập đạt R ≤ 4 Ohm.</text>

          <text x="15" y="132" fill="#0f172a" font-size="9.5" font-weight="bold">6. Thông thoáng phòng máy:</text>
          <text x="175" y="132" fill="#334155" font-size="9">Bố trí quạt thông gió hoặc cửa thông gió đạt tối thiểu 1% diện tích mặt bằng giếng thang để tản nhiệt động cơ.</text>
        </g>

        <!-- ==================== KHU VỰC 6: KHUNG TÊN BẢN VẼ TIÊU CHUẨN (ENGINEERING TITLE BLOCK) ==================== -->
        <g id="titleBlock" transform="translate(860, 550)">
          <!-- Khung tên chính -->
          <rect x="0" y="0" width="375" height="315" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>

          <!-- Logo & Tên đơn vị -->
          <rect x="0" y="0" width="375" height="50" fill="#0f2766" stroke="#0f172a" stroke-width="1.2"/>
          <text x="187" y="24" fill="#fbbf24" font-size="12" font-weight="900" text-anchor="middle">
            SIÊU THỊ THƯƠNG MẠI THANG MÁY TOÀN QUỐC
          </text>
          <text x="187" y="40" fill="#93c5fd" font-size="9.5" font-weight="700" text-anchor="middle">
            PHÒNG THẨM ĐỊNH KỸ THUẬT & HỒ SƠ THIẾT KẾ CÔNG TRÌNH
          </text>

          <!-- Tên bản vẽ -->
          <rect x="0" y="50" width="375" height="45" fill="#f8fafc" stroke="#0f172a" stroke-width="1"/>
          <text x="187" y="68" fill="#dc2626" font-size="12" font-weight="900" text-anchor="middle">
            BẢN VẼ SHOP DRAWING HỐ THANG BÊ TÔNG
          </text>
          <text x="187" y="84" fill="#475569" font-size="9" font-weight="bold" text-anchor="middle">
            HỆ THỐNG THANG MÁY GIA ĐÌNH & TẢI KHÁCH TIÊU CHUẨN
          </text>

          <!-- Bảng thông số chi tiết -->
          <g transform="translate(0, 95)" font-size="8.5">
            <!-- Hàng 1 -->
            <rect x="0" y="0" width="90" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="45" y="15" fill="#0f172a" font-weight="bold" text-anchor="middle">CÔNG TRÌNH</text>
            <rect x="90" y="0" width="285" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="100" y="15" fill="#0f172a" font-weight="bold">Công trình Nhà ở Dân Dụng / Biệt Thự / Tòa Nhà</text>

            <!-- Hàng 2 -->
            <rect x="0" y="22" width="90" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="45" y="37" fill="#0f172a" font-weight="bold" text-anchor="middle">ĐỊA ĐIỂM</text>
            <rect x="90" y="22" width="285" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="100" y="37" fill="#0f172a">Áp dụng trên 34 Tỉnh Thành Toàn Quốc</text>

            <!-- Hàng 3 -->
            <rect x="0" y="44" width="90" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="45" y="59" fill="#0f172a" font-weight="bold" text-anchor="middle">TẢI TRỌNG</text>
            <rect x="90" y="44" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="140" y="59" fill="#0f172a" font-weight="900" text-anchor="middle">${specs.cap} KG (${specs.persons} Người)</text>

            <rect x="190" y="44" width="85" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="232" y="59" fill="#0f172a" font-weight="bold" text-anchor="middle">TỐC ĐỘ</text>
            <rect x="275" y="44" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="325" y="59" fill="#0f172a" font-weight="900" text-anchor="middle">${specs.speed} m/s (60m/p)</text>

            <!-- Hàng 4 -->
            <rect x="0" y="66" width="90" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="45" y="81" fill="#0f172a" font-weight="bold" text-anchor="middle">HỐ THANG</text>
            <rect x="90" y="66" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="140" y="81" fill="#0f172a" font-weight="900" text-anchor="middle">W${specs.W} x D${specs.D} mm</text>

            <rect x="190" y="66" width="85" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="232" y="81" fill="#0f172a" font-weight="bold" text-anchor="middle">ĐIỂM DỪNG</text>
            <rect x="275" y="66" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="325" y="81" fill="#0f172a" font-weight="900" text-anchor="middle">${specs.Stops} Stops (Cửa CO/SO)</text>

            <!-- Hàng 5 -->
            <rect x="0" y="88" width="90" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="45" y="103" fill="#0f172a" font-weight="bold" text-anchor="middle">PIT / OH</text>
            <rect x="90" y="88" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="140" y="103" fill="#dc2626" font-weight="900" text-anchor="middle">${specs.Pit} / ${specs.Oh} mm</text>

            <rect x="190" y="88" width="85" height="22" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="232" y="103" fill="#0f172a" font-weight="bold" text-anchor="middle">ĐỘNG CƠ</text>
            <rect x="275" y="88" width="100" height="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="325" y="103" fill="#0f172a" font-weight="900" text-anchor="middle">Fuji PMSM</text>
          </g>

          <!-- Chữ ký & Phê duyệt -->
          <g transform="translate(0, 205)" font-size="8">
            <rect x="0" y="0" width="125" height="70" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="62" y="14" fill="#475569" font-weight="bold" text-anchor="middle">THIẾT KẾ</text>
            <text x="62" y="45" fill="#0f172a" font-weight="900" text-anchor="middle">Kỹ Sư Dự Toán</text>

            <rect x="125" y="0" width="125" height="70" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="187" y="14" fill="#475569" font-weight="bold" text-anchor="middle">KIỂM TRA</text>
            <text x="187" y="45" fill="#0f172a" font-weight="900" text-anchor="middle">Phòng Kết Cấu CAD</text>

            <rect x="250" y="0" width="125" height="70" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="312" y="14" fill="#dc2626" font-weight="900" text-anchor="middle">PHÊ DUYỆT</text>
            <text x="312" y="45" fill="#0f2766" font-weight="900" text-anchor="middle">KỸ SƯ TRƯỞNG</text>
            <text x="312" y="58" fill="#d97706" font-weight="bold" text-anchor="middle">0914.587.575</text>
          </g>

          <!-- Dòng chân khung tên -->
          <g transform="translate(0, 275)" font-size="8">
            <rect x="0" y="0" width="125" height="40" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="62" y="16" fill="#475569" text-anchor="middle">TỶ LỆ: 1:25 / 1:50</text>
            <text x="62" y="30" fill="#0f172a" font-weight="bold" text-anchor="middle">KHỔ GIẤY: A3</text>

            <rect x="125" y="0" width="125" height="40" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
            <text x="187" y="16" fill="#475569" text-anchor="middle">NGÀY PHÁT HÀNH</text>
            <text x="187" y="30" fill="#0f172a" font-weight="bold" text-anchor="middle">${today}</text>

            <rect x="250" y="0" width="125" height="40" fill="#0f2766" stroke="#0f172a" stroke-width="0.8"/>
            <text x="312" y="18" fill="#fbbf24" font-weight="900" text-anchor="middle">BẢN VẼ THI CÔNG</text>
            <text x="312" y="30" fill="#ffffff" font-size="7.5" text-anchor="middle">REV: 01 - CHÍNH THỨC</text>
          </g>
        </g>

        <!-- KÝ HIỆU TỌA ĐỘ BẢN VẼ XUNG QUANH VIỀN (A, B, C, D • 1, 2, 3, 4) -->
        <g font-size="9" font-weight="bold" fill="#64748b" text-anchor="middle">
          <text x="200" y="16">1</text>
          <text x="450" y="16">2</text>
          <text x="750" y="16">3</text>
          <text x="1050" y="16">4</text>
          <text x="12" y="250">A</text>
          <text x="12" y="500">B</text>
          <text x="12" y="750">C</text>
        </g>
      </svg>
    `;
  }

  // 3. Hiển thị Modal Xem Trước & Xuất File PDF A3 Chuyên Nghiệp
  window.openShopDrawingPdfModal = function (customW, customD, customPit, customOh, customStops, customCap) {
    // Tự động lấy giá trị từ trang hiện tại nếu không truyền vào
    var W = customW || (document.getElementById('inputWidth') ? document.getElementById('inputWidth').value : (document.getElementById('homeInputW') ? document.getElementById('homeInputW').value : 1400));
    var D = customD || (document.getElementById('inputDepth') ? document.getElementById('inputDepth').value : (document.getElementById('homeInputD') ? document.getElementById('homeInputD').value : 1450));
    var Pit = customPit || (document.getElementById('inputPit') ? document.getElementById('inputPit').value : (document.getElementById('homeInputPit') ? document.getElementById('homeInputPit').value : 350));
    var Oh = customOh || (document.getElementById('inputOh') ? document.getElementById('inputOh').value : (document.getElementById('homeInputOh') ? document.getElementById('homeInputOh').value : 3200));
    var Stops = customStops || (document.getElementById('inputStops') ? document.getElementById('inputStops').value : (document.getElementById('homeInputStops') ? document.getElementById('homeInputStops').value : 4));
    var Cap = customCap || (W < 1300 ? 300 : (W < 1500 ? 450 : 630));

    var specs = calculateShopDrawingSpecs(W, D, Pit, Oh, Stops, Cap);
    var svgContent = generateShopDrawingSvg(specs);

    var existingModal = document.getElementById('shop-drawing-modal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'shop-drawing-modal';
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-md z-[100000] flex flex-col p-2 sm:p-4 overflow-hidden animate-fade-in';
    modal.innerHTML = `
      <!-- TOP ACTION BAR TRONG MODAL -->
      <div class="bg-navy-950 border border-slate-700 text-white rounded-xl px-4 py-3 mb-2 flex items-center justify-between gap-3 shadow-xl">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="text-xl text-gold-400 flex-shrink-0">📐</span>
          <div class="min-w-0">
            <h3 class="font-black text-xs sm:text-sm text-gold-400 uppercase tracking-tight truncate">
              HỒ SƠ BẢN VẼ KỸ THUẬT SHOP DRAWING HỐ THANG BÊ TÔNG (KHỔ A3)
            </h3>
            <p class="text-[10px] text-slate-300 hidden sm:block">
              Chuẩn thẩm định kỹ thuật QCVN 02:2019 • Đầy đủ 4 mặt cắt, bảng phản lực kết cấu R1-R4 & Khung tên thi công
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button onclick="printShopDrawing()" class="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white px-3 sm:px-4 py-2 rounded-lg font-black text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span>IN / LƯU PDF A3</span>
          </button>
          
          <button onclick="downloadShopDrawingSvg()" class="bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 px-3 py-2 rounded-lg font-bold text-xs hidden sm:flex items-center gap-1.5 transition">
            <span>📥</span> Tải SVG Vector
          </button>

          <button onclick="sendShopDrawingToZalo('${specs.W}', '${specs.D}', '${specs.Pit}', '${specs.Oh}', '${specs.Stops}', '${specs.cap}')" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition">
            <span>💬</span> Gửi Zalo Kỹ Sư Trưởng
          </button>

          <button onclick="document.getElementById('shop-drawing-modal').remove()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white text-xl font-bold flex items-center justify-center transition leading-none">
            &times;
          </button>
        </div>
      </div>

      <!-- VÙNG HIỂN THỊ TRANG BẢN VẼ A3 (CÓ THỂ ZOOM / SCROLL) -->
      <div id="shopDrawingPrintArea" class="flex-1 overflow-auto bg-slate-800/80 rounded-xl p-2 sm:p-4 flex items-center justify-center border border-slate-700">
        <div class="bg-white max-w-[1280px] w-full rounded shadow-2xl p-1 overflow-hidden" id="shopDrawingContainer">
          ${svgContent}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  };

  // 4. In bản vẽ hoặc Lưu ra file PDF trực tiếp từ trình duyệt
  window.printShopDrawing = function () {
    var svgElement = document.getElementById('shopDrawingMainSvg');
    if (!svgElement) return;

    var printWindow = window.open('', '_blank');
    var svgHtml = svgElement.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bản Vẽ Kỹ Thuật Hố Thang Bê Tông - Siêu Thị Thang Máy Toàn Quốc</title>
        <style>
          @page {
            size: A3 landscape;
            margin: 5mm;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
              background: #fff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page-container {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            svg {
              width: 100%;
              height: 100%;
              max-height: 98vh;
            }
          }
          body {
            margin: 0;
            padding: 10px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #e2e8f0;
          }
          .page-container {
            background: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-width: 1280px;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          ${svgHtml}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // 5. Tải file SVG Vector bản vẽ
  window.downloadShopDrawingSvg = function () {
    var svg = document.getElementById('shopDrawingMainSvg');
    if (!svg) return;
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    var blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Ban_Ve_Shop_Drawing_Ho_Thang_' + Date.now() + '.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 6. Gửi Zalo thông số Shop Drawing
  window.sendShopDrawingToZalo = function (W, D, Pit, Oh, Stops, Cap) {
    var details = 'Hồ sơ bản vẽ Shop Drawing hố bê tông: Kích thước lọt lòng ' + W + 'x' + D + 'mm • PIT: ' + Pit + 'mm • OH: ' + Oh + 'mm • ' + Stops + ' tầng • Tải trọng: ' + Cap + 'kg';
    if (window.openQuickLeadModal) {
      window.openQuickLeadModal('Gửi File Bản Vẽ Shop Drawing Qua Zalo', details);
    } else {
      var msg = 'Chào Kỹ Sư Trưởng 0914.587.575! Tôi cần nhận trọn bộ File PDF bản vẽ thi công Shop Drawing: ' + details;
      window.open('https://zalo.me/0914587575?text=' + encodeURIComponent(msg), '_blank');
    }
  };

})();
