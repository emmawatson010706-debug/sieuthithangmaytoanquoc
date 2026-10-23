# -*- coding: utf-8 -*-
import json

articles = {
  1: {
    "title": "Cẩm Nang Xử Lý Hố PIT Siêu Nông (Từ 250mm - 450mm) Và Chiều Cao OH Cho Nhà Phố Cải Tạo",
    "category": "KỸ THUẬT HỐ THANG",
    "category_slug": "ho-thang",
    "image": "images/cabin_2.png",
    "author": "Kỹ Sư Trưởng Nguyễn Văn An",
    "author_title": "Chuyên Gia Thẩm Định Giếng Thang 34 Tỉnh Thành",
    "date": "23/10/2026",
    "read_time": "9 phút đọc",
    "views": "3,420 lượt xem",
    "summary": "Hướng dẫn chi tiết giải pháp thi công giếng thang kết cấu thép chấn định hình, cơ chế treo động cơ không phòng máy MRL tỉ lệ 2:1 và đệm giảm chấn cao su PU chuyên dụng, giúp gia chủ lắp đặt thang máy gia đình mà không đục phá móng bè hay bể phốt ngầm.",
    "toc": [
      {"id": "phan-1", "title": "1. Bài toán hố móng trong nhà phố cải tạo tại Việt Nam"},
      {"id": "phan-2", "title": "2. Nguyên lý kỹ thuật cho phép giảm chiều sâu hố PIT xuống 250mm"},
      {"id": "phan-3", "title": "3. Xử lý chiều cao tầng trên cùng (OH - Overhead) từ 2800mm"},
      {"id": "phan-4", "title": "4. Kết cấu giếng thang khung thép chấn định hình CNC"},
      {"id": "phan-5", "title": "5. Bảng thông số kích thước hố thông thủy thực tế"},
      {"id": "phan-6", "title": "6. Khuyến nghị nghiệm thu và an toàn theo QCVN 02:2019"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Bài Toán Hố Móng Trong Nhà Phố Cải Tạo Tại Việt Nam
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Tại các đô thị lớn trên 34 tỉnh thành của Việt Nam, việc lắp đặt thang máy cho những ngôi nhà đã hoàn thiện từ 5 đến 15 năm trước luôn là thách thức sống còn đối với các kỹ sư kết cấu. Khi xây dựng ban đầu, hầu hết gia chủ không để dự phòng giếng thang. Đáy tầng trệt thường là hệ thống móng băng giao nhau, móng bè kiên cố, hoặc là vị trí của bể phốt, bể nước ngầm sinh hoạt.
        </p>
        <div class="bg-red-50 border-l-4 border-red-500 p-3.5 rounded-r-lg text-xs space-y-1">
          <div class="font-black text-red-900 uppercase">Cảnh Báo Kỹ Thuật Nghiêm Ngặt:</div>
          <p class="text-red-800">
            Tuyệt đối không được đục phá dầm móng chịu lực chính của ngôi nhà để đào hố PIT sâu 1.200mm - 1.400mm theo kiểu thang máy truyền thống. Việc cắt đứt thép dầm móng sẽ làm suy giảm mô men kháng uốn, gây lún lệch và nứt xé tường nhà xung quanh.
          </p>
        </div>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Nguyên Lý Kỹ Thuật Cho Phép Giảm Chiều Sâu Hố PIT Xuống 250mm
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Để giải quyết triệt để vấn đề mà không cần đào sâu xuống lòng đất, giải pháp kỹ thuật hiện đại áp dụng 3 cải tiến công nghệ cốt lõi:
        </p>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
          <li class="flex items-start gap-2">
            <span class="text-gold-600 font-bold">▶</span>
            <span><strong>Đệm giảm chấn Polyurethane (PU) đàn hồi cao:</strong> Thay thế piston thủy lực cồng kềnh bằng giảm chấn hợp chất PU đạt tiêu chuẩn kiểm định EN 81-20/50. Giảm chấn này chỉ chiếm chiều cao tĩnh 180mm nhưng triệt tiêu 100% động năng khi cabin hạ xuống điểm cuối.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-gold-600 font-bold">▶</span>
            <span><strong>Cơ cấu dầm sàn cabin siêu mỏng:</strong> Khung chịu lực đáy cabin (Under-car frame) được chế tạo bằng thép hợp kim dập nguội cường độ cao, tối ưu hóa khoảng hở móng mà vẫn đảm bảo độ võng nhỏ hơn 1/1000 nhịp.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-gold-600 font-bold">▶</span>
            <span><strong>Cơ chế khóa bảo trì an toàn điện tử:</strong> Tích hợp công tắc an toàn đa tầng (Pit Safety Barrier Switch). Khi kỹ thuật viên bước xuống đáy hố, hệ thống cơ khí tự động bật cữ chặn cơ học chống lún cabin, đảm bảo không gian sinh tồn tối thiểu 500mm theo quy chuẩn quốc tế.</span>
          </li>
        </ul>

        <!-- Sơ đồ CAD minh họa ASCII/Diagram -->
        <div class="bg-navy-950 text-emerald-400 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-700 shadow-inner">
+-------------------------------------------------------------------+
|               MẶT CẮT KỸ THUẬT HỐ PIT SIÊU NÔNG 250MM             |
+-------------------------------------------------------------------+
  Mặt sàn tầng 1 [±0.000] ========================================
                            |                                    |
                            |  [Khoảng tĩnh cửa tầng: 50mm]      |
                            |                                    |
  Đáy dầm sàn cabin ======> |====================================|
                            | [Đệm PU đàn hồi cao H=180mm]       |
  Đáy giếng thang [-0.250]  |====================================|
                            +------------------------------------+
                            | MÓNG BÈ / BÊ TÔNG HIỆN HỮU (NGUYÊN VẸN)|
        </div>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Xử Lý Chiều Cao Tầng Trên Cùng (OH - Overhead) Từ 2800mm
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Với các nhà phố bị khống chế chiều cao trần tầng tum chỉ 2.800mm - 3.000mm, không thể làm phòng máy tum cao 1.800mm bên trên. Giải pháp tối ưu là sử dụng <strong>Động cơ không phòng máy MRL (Machine Room Less)</strong> với tỉ lệ truyền cáp 2:1.
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Động cơ nam châm vĩnh cửu PMSM cực kỳ nhỏ gọn được treo trực tiếp lên đầu dầm ray dẫn hướng (Guide Rail), truyền lực trực tiếp xuống đáy móng qua hệ ray chịu lực thay vì đè lên trần nhà, giúp giải phóng hoàn toàn không gian mái.
        </p>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Kết Cấu Giếng Thang Khung Thép Chấn Định Hình CNC
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Thay vì đổ cột bê tông xây tường gạch dày 200mm chiếm dụng diện tích, giếng thang hiện đại sử dụng thép tấm cán nóng SS400 độ dày từ 3.0mm đến 5.0mm, chấn định hình CNC dạng thanh U, C, hoặc hộp liên kết ngàm bằng bulong cường độ cao cấp bền 8.8.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div class="font-bold text-navy-950 mb-1">Ưu điểm hố thép chấn CNC:</div>
            <ul class="space-y-1 text-slate-600 list-disc list-inside">
              <li>Tiết kiệm diện tích: Thành giếng chỉ dày 50mm (so với 150-220mm của tường gạch).</li>
              <li>Tải trọng nhẹ: Giảm 70% tải trọng tác động lên móng nhà.</li>
              <li>Lắp đặt siêu tốc: Chỉ mất 2 - 3 ngày hoàn thiện khung giếng.</li>
              <li>Thẩm mỹ đỉnh cao: Bọc kính cường lực quan sát 4 mặt.</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div class="font-bold text-navy-950 mb-1">Phương pháp liên kết móng:</div>
            <ul class="space-y-1 text-slate-600 list-disc list-inside">
              <li>Sử dụng keo cấy thép hóa chất Hilti HIT-RE 500 V3.</li>
              <li>Bulong nở chịu lực M16 - M20 mạ kẽm nhúng nóng.</li>
              <li>Kiểm tra lực nhổ pull-out test đạt tối thiểu 35kN/bulong.</li>
              <li>Sơn tĩnh điện bóng hoặc phủ mạ Titan PVD không gỉ.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Bảng Thông Số Kích Thước Hố Thông Thủy Thực Tế
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-navy-950 text-white font-bold">
              <tr>
                <th class="p-2.5">Tải Trọng (kg)</th>
                <th class="p-2.5">Số Người</th>
                <th class="p-2.5">Hố Thông Thủy (W x D)</th>
                <th class="p-2.5">Cabin Lọt Lòng</th>
                <th class="p-2.5">PIT Min (mm)</th>
                <th class="p-2.5">OH Min (mm)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700 bg-white">
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">300 kg</td>
                <td class="p-2.5">2 - 3 người</td>
                <td class="p-2.5 font-semibold text-gold-700">1250 x 1300 mm</td>
                <td class="p-2.5">850 x 900 mm</td>
                <td class="p-2.5 font-bold text-green-700">250 mm</td>
                <td class="p-2.5 font-bold text-blue-700">2800 mm</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">350 kg</td>
                <td class="p-2.5">4 - 5 người</td>
                <td class="p-2.5 font-semibold text-gold-700">1400 x 1400 mm</td>
                <td class="p-2.5">1000 x 950 mm</td>
                <td class="p-2.5 font-bold text-green-700">300 mm</td>
                <td class="p-2.5 font-bold text-blue-700">3000 mm</td>
              </tr>
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">450 kg</td>
                <td class="p-2.5">6 người</td>
                <td class="p-2.5 font-semibold text-gold-700">1600 x 1600 mm</td>
                <td class="p-2.5">1200 x 1050 mm</td>
                <td class="p-2.5 font-bold text-green-700">450 mm</td>
                <td class="p-2.5 font-bold text-blue-700">3400 mm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Khuyến Nghị Nghiệm Thu Và An Toàn Theo QCVN 02:2019
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khi lắp đặt thang máy hố PIT nông, bắt buộc phải có biên bản kiểm định kỹ thuật an toàn của đơn vị được Bộ Lao Động - Thương Binh & Xã Hội cấp phép. Kỹ sư trưởng Siêu Thị Thang Máy Toàn Quốc khuyến nghị gia chủ nghiệm thu kỹ 3 điều kiện:
        </p>
        <ol class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
          <li>Thử tải động 125% tải trọng danh định (ví dụ thang 350kg phải thử tải 437.5kg) để kiểm tra thắng cơ.</li>
          <li>Đo điện trở tiếp địa hệ thống chống sét và an toàn điện phải dưới 4.0 Ohm.</li>
          <li>Test ngắt điện lưới giả lập để kiểm tra bộ cứu hộ tự động ARD đưa cabin về tầng và mở cửa thoát hiểm.</li>
        </ol>
      </div>
    '''
  },
  2: {
    "title": "So Sánh Phân Tích Kỹ Thuật Động Cơ Không Hộp Số PMSM: Fuji (Nhật Bản) vs Montanari (Ý) vs Ziehl-Abegg (Đức)",
    "category": "CÔNG NGHỆ ĐỘNG CƠ",
    "category_slug": "dong-co",
    "image": "images/cabin_3.png",
    "author": "Chuyên Gia Cơ Điện Hoàng Long",
    "author_title": "Cố Vấn Kỹ Thuật Máy Kéo Thang Máy Quốc Tế",
    "date": "22/10/2026",
    "read_time": "11 phút đọc",
    "views": "2,890 lượt xem",
    "summary": "Mổ xẻ chi tiết 3 dòng động cơ không hộp số nam châm vĩnh cửu nổi tiếng nhất: Mức tiêu thụ điện năng kWh/tháng, độ ồn decibel (dB), độ êm ái khi dừng tầng và tuổi thọ nam châm Neodymium sau 10 năm vận hành thực tế.",
    "toc": [
      {"id": "phan-1", "title": "1. Cuộc cách mạng động cơ không hộp số PMSM"},
      {"id": "phan-2", "title": "2. Đánh giá động cơ Fuji (Công nghệ Nhật Bản)"},
      {"id": "phan-3", "title": "3. Đánh giá động cơ Montanari (Sản xuất tại Ý)"},
      {"id": "phan-4", "title": "4. Đánh giá động cơ Ziehl-Abegg (Tiêu chuẩn công nghiệp Đức)"},
      {"id": "phan-5", "title": "5. Bảng ma trận so sánh 10 tiêu chí kỹ thuật"},
      {"id": "phan-6", "title": "6. Lời khuyên lựa chọn từ chuyên gia cơ điện"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Cuộc Cách Mạng Động Cơ Không Hộp Số PMSM
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Trong kỹ thuật thang máy thế hệ mới, động cơ không hộp số nam châm vĩnh cửu (Permanent Magnet Synchronous Motor - PMSM) đã thay thế hoàn toàn động cơ có hộp số trục vít bánh vít kiểu cũ. Nhờ loại bỏ hộp giảm tốc cơ khí, động cơ PMSM đạt hiệu suất truyền động lên tới 92%, không tiêu hao dầu nhớt bôi trơn, không phát sinh nhiệt và vận hành gần như không có tiếng ồn.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Đánh Giá Động Cơ Fuji (Công Nghệ Nhật Bản)
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Động cơ Fuji là dòng máy kéo phổ biến và được tin dùng nhất tại thị trường Việt Nam nhờ sự bền bỉ, tính kinh tế và phụ tùng thay thế vô cùng phong phú.
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li><strong>Ưu điểm:</strong> Giá thành hợp lý, khả năng chịu quá tải tốt trong điều kiện khí hậu nóng ẩm tại 34 tỉnh thành Việt Nam. Phối ghép mượt mà với hầu hết biến tần phổ thông như Yaskawa, Monarch NICE3000+.</li>
          <li><strong>Độ ồn:</strong> Dao động từ 48dB đến 50dB, êm ái khi lắp đặt trong nhà phố.</li>
          <li><strong>Điểm cần lưu ý:</strong> Trên thị trường có rất nhiều hàng nhái, hàng Fuji giả mạo từ các xưởng gia công không chính hãng. Cần kiểm tra kỹ mã QR và chứng thư CO/CQ.</li>
        </ul>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Đánh Giá Động Cơ Montanari (Sản Xuất Tại Ý - Made in Italy)
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Montanari Giulio & C. là thương hiệu máy kéo thang máy danh tiếng châu Âu thành lập từ năm 1970 tại Modena, Ý.
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li><strong>Ưu điểm:</strong> Độ chính xác cơ khí cực cao. Cuộn dây đồng và phanh từ tính kép (Dual Electro-magnetic Brake) tiêu chuẩn châu Âu EN 81-20 giúp quá trình hãm tầng êm ru, triệt tiêu hiện tượng hẫng hay giật cục khi cabin dừng.</li>
          <li><strong>Độ ồn:</strong> Cực thấp, chỉ khoảng 46dB - 48dB.</li>
          <li><strong>Phù hợp:</strong> Rất được ưa chuộng cho các công trình biệt thự cao cấp, villa phong cách tân cổ điển hoặc hiện đại.</li>
        </ul>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Đánh Giá Động Cơ Ziehl-Abegg (Tiêu Chuẩn Công Nghiệp Đức)
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Được mệnh danh là "Mercedes-Benz" trong ngành động cơ điện thế giới, Ziehl-Abegg (Đức) đại diện cho đỉnh cao công nghệ và độ tin cậy cơ điện tử.
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li><strong>Ưu điểm vượt trội:</strong> Nam châm Neodymium đất hiếm cao cấp nhất, độ trôi từ trường gần như bằng 0 sau 20 năm. Độ ồn dưới 45dB - chỉ tương đương tiếng thì thầm trong thư viện.</li>
          <li><strong>Tiết kiệm điện:</strong> Đạt chuẩn hiệu suất năng lượng Class A (VDI 4707). Mức tiêu thụ điện chỉ từ 35 - 45 kWh/tháng cho gia đình 5 người.</li>
          <li><strong>Nhược điểm:</strong> Giá thành cao hơn 25% - 40% so với các dòng máy kéo châu Á.</li>
        </ul>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Bảng Ma Trận So Sánh 10 Tiêu Chí Kỹ Thuật
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-navy-950 text-white font-bold">
              <tr>
                <th class="p-2.5">Tiêu Chí Kỹ Thuật</th>
                <th class="p-2.5">Fuji (Nhật Bản/HQ)</th>
                <th class="p-2.5">Montanari (Ý)</th>
                <th class="p-2.5">Ziehl-Abegg (Đức)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700 bg-white">
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">Xuất xứ & Kiểm định</td>
                <td class="p-2.5">Japan tech (CO Korea/China)</td>
                <td class="p-2.5 font-semibold text-gold-700">Made in Italy 100%</td>
                <td class="p-2.5 font-semibold text-blue-700">Made in Germany 100%</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">Mức ồn vận hành (dB)</td>
                <td class="p-2.5">48 - 50 dB</td>
                <td class="p-2.5">46 - 48 dB</td>
                <td class="p-2.5 font-bold text-green-700">&lt; 45 dB (Êm tuyệt đối)</td>
              </tr>
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">Hiệu suất năng lượng</td>
                <td class="p-2.5">88% - 90%</td>
                <td class="p-2.5">91% - 93%</td>
                <td class="p-2.5 font-bold text-green-700">&gt; 94% (Class A VDI 4707)</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">Điện năng tiêu thụ/tháng</td>
                <td class="p-2.5">~45 - 55 kWh (~130k - 160k ₫)</td>
                <td class="p-2.5">~40 - 50 kWh (~120k - 145k ₫)</td>
                <td class="p-2.5 font-bold text-green-700">~35 - 45 kWh (~105k - 130k ₫)</td>
              </tr>
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">Hệ thống phanh hãm</td>
                <td class="p-2.5">Phanh điện từ kép</td>
                <td class="p-2.5">Phanh vi sai kép giảm chấn</td>
                <td class="p-2.5">Phanh an toàn kép siêu êm độc quyền</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">Chi phí đầu tư ban đầu</td>
                <td class="p-2.5 font-bold text-green-700">Tiết kiệm nhất (Tối ưu)</td>
                <td class="p-2.5">Hợp lý cho Biệt thự</td>
                <td class="p-2.5 text-red-700 font-bold">Cao cấp (Phân khúc sang)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Lời Khuyên Lựa Chọn Từ Chuyên Gia Cơ Điện
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Nếu gia chủ ưu tiên tính kinh tế, bền bỉ và dễ bảo trì tại mọi tỉnh thành, động cơ <strong>Fuji chính hãng</strong> là lựa chọn thông minh số 1. Nếu công trình là biệt thự đòi hỏi độ êm ái hoàn hảo chuẩn châu Âu, hãy cân nhắc <strong>Montanari (Ý)</strong> hoặc <strong>Ziehl-Abegg (Đức)</strong>. Hãy liên hệ Hotline 0914.587.575 để được soi mã CO/CQ gốc từ nhà máy.
        </p>
      </div>
    '''
  },
  3: {
    "title": "Quy Chuẩn An Toàn QCVN 02:2019/BLĐTBXH: 5 Cấp Độ Cứu Hộ Tự Động ARD Và Thiết Bị Thắng Cơ Bắt Buộc",
    "category": "QUY CHUẨN AN TOÀN",
    "category_slug": "an-toan",
    "image": "images/cabin_1.png",
    "author": "Ban Kỹ Thuật Siêu Thị Thang Máy",
    "author_title": "Chuyên Gia Kỹ Thuật Thang Máy",
    "date": "21/10/2026",
    "read_time": "10 phút đọc",
    "views": "3,110 lượt xem",
    "summary": "Giải mã quy chuẩn kỹ thuật quốc gia QCVN 02:2019/BLĐTBXH về an toàn lao động đối với thang máy: 5 cấp độ bảo vệ chống rơi tự do, hệ thống cứu hộ tự động ARD khi mất điện lưới và quy trình kiểm định cấp tem vận hành.",
    "toc": [
      {"id": "phan-1", "title": "1. Khái quát quy chuẩn QCVN 02:2019/BLĐTBXH"},
      {"id": "phan-2", "title": "2. Cấp độ 1: Thắng cơ ly tâm Governor chống rơi tự do"},
      {"id": "phan-3", "title": "3. Cấp độ 2: Hệ thống cứu hộ tự động ARD khi mất điện"},
      {"id": "phan-4", "title": "4. Cấp độ 3: Mành hồng ngoại Photocell đa điểm chống kẹt"},
      {"id": "phan-5", "title": "5. Cấp độ 4 & 5: Giới hạn hành trình kép & Đệm lò xo đáy hố"},
      {"id": "phan-6", "title": "6. Quy trình kiểm định và thời hạn cấp tem an toàn"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Khái Quát Quy Chuẩn QCVN 02:2019/BLĐTBXH
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Quy chuẩn kỹ thuật quốc gia <strong>QCVN 02:2019/BLĐTBXH</strong> do Bộ Lao Động - Thương Binh và Xã Hội ban hành là văn bản pháp lý tối cao quy định mọi yêu cầu an toàn đối với thang máy lắp đặt tại Việt Nam. Theo quy chuẩn này, thang máy là thiết bị có yêu cầu nghiêm ngặt về an toàn lao động, bắt buộc phải vượt qua quá trình kiểm định kỹ thuật thực địa trước khi đưa vào vận hành.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Cấp Độ 1: Thắng Cơ Ly Tâm Governor Chống Rơi Tự Do
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Nhiều người dùng lo sợ cabin thang máy sẽ bị rơi tự do khi đứt cáp. Trong thực tế kỹ thuật, điều này là <strong>hoàn toàn không thể xảy ra</strong> nhờ sự hiện diện của bộ khống chế vượt tốc (Governor) và bộ hãm bảo hiểm (Safety Gear).
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khi tốc độ cabin di chuyển xuống vượt quá 115% tốc độ định mức (ví dụ tốc độ thiết kế là 1.0 m/s nhưng tăng lên 1.15 m/s do bất kỳ sự cố nào), lực ly tâm sẽ đẩy má kẹp governor cắn chặt sợi cáp hãm. Qua hệ thống đòn bẩy cơ khí, hai hàm thép nêm cứng (Wedge Safety) dưới đáy cabin sẽ bập chặt vào sống ray dẫn hướng, ghì chặt toàn bộ khối lượng cabin đứng yên chỉ trong tích tắc 0.2 giây.
        </p>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Cấp Độ 2: Hệ Thống Cứu Hộ Tự Động ARD Khi Mất Điện Lưới
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Hệ thống cứu hộ tự động <strong>ARD (Automatic Rescue Device)</strong> sử dụng bộ lưu điện UPS hoặc dàn ắc quy khô chuyên dụng. Khi điện lưới đô thị bị cắt đột ngột:
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li>Mạch vi xử lý lập tức kích hoạt nguồn ắc quy phụ trong vòng 1.5 giây.</li>
          <li>Đèn chiếu sáng sự cố và quạt thông gió trong cabin vẫn hoạt động bình thường.</li>
          <li>Hệ thống tự động so sánh chiều nhẹ tải nhất giữa cabin và đối trọng, di chuyển cabin từ từ về tầng gần nhất, mở cửa tầng cho hành khách an toàn bước ra ngoài, rồi tự ngắt nguồn chờ có điện lưới trở lại.</li>
        </ul>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Cấp Độ 3: Mành Hồng Ngoại Photocell Đa Điểm Chống Kẹt Cửa
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Để bảo vệ tuyệt đối cho người già, trẻ nhỏ và vật nuôi, cửa cabin bắt buộc phải trang bị mành hồng ngoại đa điểm (Light Curtain) gồm từ 64 đến 128 tia quét vô hình phủ kín từ độ cao 20mm tới 1.800mm.
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Bất kỳ vật thể nào dù nhỏ như bàn tay hay chiếc gậy chống cắt ngang một trong các tia hồng ngoại, cửa thang máy sẽ lập tức dừng hành trình đóng và tự động mở bung ra ngay tức khắc mà không chạm vào người.
        </p>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Cấp Độ 4 & 5: Giới Hạn Hành Trình Kép & Đệm Lò Xo Đáy Hố
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          <strong>Công tắc giới hạn kép:</strong> Gồm công tắc giảm tốc, công tắc dừng tầng và công tắc ngắt khẩn cấp cuối hành trình (Final Limit Switch). Ngăn chặn 100% tình huống cabin vượt quá giới hạn đỉnh tầng hoặc chạm đáy giếng.
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          <strong>Đệm giảm chấn lò xo/thủy lực dưới đáy hố PIT:</strong> Được thiết kế chịu lực hấp thụ xung kích động học theo chuẩn TCVN 6395:2008, triệt tiêu mọi phản lực có thể gây chấn thương cho người ngồi trong cabin.
        </p>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Quy Trình Kiểm Định Và Thời Hạn Cấp Tem An Toàn
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Sau khi lắp đặt hoàn thiện, trung tâm kiểm định độc lập của Nhà nước sẽ tiến hành kiểm định kỹ thuật lần đầu:
        </p>
        <div class="bg-blue-50 border border-blue-200 p-3.5 rounded-lg text-xs space-y-1.5 text-blue-950">
          <div><strong>• Kiểm định lần đầu:</strong> Thời hạn hiệu lực tem an toàn là <strong>03 năm</strong> đối với thang máy mới 100%.</div>
          <div><strong>• Kiểm định định kỳ:</strong> Thời hạn hiệu lực là <strong>01 - 02 năm/lần</strong> tùy thuộc vào thâm niên vận hành của thiết bị.</div>
          <div><strong>• Hotline Kỹ Sư Trưởng hỗ trợ hồ sơ kiểm định 34 tỉnh thành:</strong> 0914.587.575.</div>
        </div>
      </div>
    '''
  },
  4: {
    "title": "Khuyến Cáo Chủ Đầu Tư: 7 Chiêu Trò Cắt Giảm Linh Kiện Thang Máy Giá Rẻ Và Cách Nhận Biết CO/CQ Chuẩn",
    "category": "CẢNH BÁO THỊ TRƯỜNG",
    "category_slug": "khuyen-cao",
    "image": "images/cabin_4.png",
    "author": "Kỹ Sư Trưởng Nguyễn Văn An",
    "author_title": "Chuyên Gia Thẩm Định Giếng Thang 34 Tỉnh Thành",
    "date": "20/10/2026",
    "read_time": "12 phút đọc",
    "views": "4,250 lượt xem",
    "summary": "Vạch trần 7 mánh khóe đánh tráo linh kiện của các cơ sở thang máy không uy tín: Tráo động cơ bãi tân trang, cắt giảm bình cứu hộ tự động, dùng thép mỏng gây rung lắc và hướng dẫn cách đọc tờ khai hải quan CO/CQ chính ngạch.",
    "toc": [
      {"id": "phan-1", "title": "1. Thực trạng cạnh tranh giá rẻ không lành mạnh"},
      {"id": "phan-2", "title": "2. Chiêu 1: Đánh tráo động cơ bãi tân trang sơn lại vỏ"},
      {"id": "phan-3", "title": "3. Chiêu 2: Cắt giảm bộ cứu hộ ARD thành bình ắc quy xe máy"},
      {"id": "phan-4", "title": "4. Chiêu 3: Sử dụng mành hồng ngoại 1 tia đơn điểm"},
      {"id": "phan-5", "title": "5. Chiêu 4: Dùng thép khung giếng mỏng dưới 2.5mm"},
      {"id": "phan-6", "title": "6. Chiêu 5: Đánh tráo ray dẫn hướng kéo nguội giá rẻ"},
      {"id": "phan-7", "title": "7. Bộ cẩm nang 5 bước tự kiểm tra CO/CQ chuẩn quốc tế"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Thực Trạng Cạnh Tranh Giá Rẻ Không Lành Mạnh
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Thang máy gia đình là thiết bị vận chuyển người liên quan trực tiếp đến tính mạng. Tuy nhiên trên thị trường hiện nay, nhiều đơn vị báo giá thang máy gia đình siêu rẻ chỉ 230 - 250 triệu đồng. Để có mức giá này mà vẫn có lãi, họ đã bí mật cắt giảm hoặc đánh tráo hàng loạt linh kiện cốt lõi mà người tiêu dùng thông thường không thể nhận biết bằng mắt thường.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Chiêu 1: Đánh Tráo Động Cơ Bãi Tân Trang Sơn Lại Vỏ
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Một số đơn vị thu mua máy kéo cũ đã qua sử dụng từ các tòa nhà giải tỏa bên nước ngoài, mang về sơn lại vỏ, dập lại tem nhãn Fuji hoặc Mitsubishi rồi bán cho khách hàng với danh nghĩa "hàng mới 100%".
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          <strong>Hậu quả:</strong> Nam châm vĩnh cửu của động cơ cũ đã bị suy thoái từ trường, sau 6 tháng chạy sẽ sinh nhiệt cao, tiêu tốn gấp đôi tiền điện và có tiếng rít khó chịu vào ban đêm.
        </p>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Chiêu 2: Cắt Giảm Bộ Cứu Hộ ARD Thành Bình Ắc Quy Xe Máy
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Thay vì sử dụng bộ lưu điện biến tần cứu hộ công nghiệp chính hãng (như ARD SOJI, UPS chuyên dụng cho thang máy), đơn vị giá rẻ đấu nối tạm bợ 2-3 bình ắc quy xe máy loại nhỏ.
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          <strong>Hậu quả:</strong> Ắc quy xe máy chỉ chịu được dòng xả tức thời, sau 3 - 6 tháng sẽ bị chai phù. Khi nhà mất điện thật, hệ thống cứu hộ không hoạt động, người thân bị nhốt kẹt trong cabin ngột ngạt.
        </p>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Chiêu 3: Sử Dụng Mành Hồng Ngoại 1 Tia Đơn Điểm
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Một bộ mành quang điện đa điểm 128 tia chính hãng có giá khoảng 2.5 - 3.5 triệu đồng. Để cắt giảm chi phí, họ lắp loại cảm biến 1 tia hoặc 2 tia mắt rùa giá chỉ 300.000 đồng. Nếu trẻ nhỏ thò tay hoặc chân ở khoảng trống giữa các tia, cửa thang máy vẫn tiếp tục nghiến lại gây tai nạn nghiêm trọng.
        </p>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Chiêu 4: Dùng Thép Khung Giếng Mỏng Dưới 2.5mm
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khung giếng thang tiêu chuẩn phải dùng thép định hình độ dày từ 3.5mm đến 5.0mm. Đơn vị làm ẩu sử dụng thép hộp mạ kẽm mỏng 1.8mm - 2.0mm. Sau 1 năm chịu tải trọng rung động của cabin, khung thép sẽ bị biến dạng, gây hiện tượng lắc lư và phát ra tiếng kêu cọt kẹt khi thang chạy tốc độ cao.
        </p>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Chiêu 5: Đánh Tráo Ray Dẫn Hướng Kéo Nguội Giá Rẻ
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Ray dẫn hướng cabin phải là <strong>Ray phay tiện tinh (Machined Guide Rail - ký hiệu T75/B, T89/B)</strong> có bề mặt bóng nhẵn hoàn hảo. Thang giá rẻ thường dùng ray kéo nguội (Cold-drawn) có độ cong vênh và độ nhám lớn, khiến guốc trượt mòn vẹt nhanh chóng và cabin bị rung giật khi chuyển động.
        </p>
      </div>

      <div id="phan-7" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">7.</span> Bộ Cẩm Nang 5 Bước Tự Kiểm Tra CO/CQ Chuẩn Quốc Tế
        </h2>
        <div class="p-4 bg-amber-50 rounded-xl border border-gold-400 space-y-2 text-xs text-slate-800">
          <div class="font-black text-navy-950 text-sm">Hướng dẫn chủ nhà kiểm tra khi bàn giao linh kiện:</div>
          <ol class="space-y-1.5 list-decimal list-inside font-semibold">
            <li><strong>Yêu cầu xem bản gốc tờ khai hải quan (Customs Declaration):</strong> Có dấu mộc đỏ chứng thực thông quan của cơ quan Hải quan Việt Nam.</li>
            <li><strong>Chứng chỉ xuất xứ CO (Certificate of Origin):</strong> Do Phòng Thương mại nước xuất khẩu (Nhật Bản, Hàn Quốc, Ý, Đức) cấp.</li>
            <li><strong>Chứng chỉ chất lượng CQ (Certificate of Quality):</strong> Có số Serial Number trùng khớp 100% với tem nhãn đúc chìm trên thân máy kéo.</li>
            <li><strong>Kiểm tra mã QR & Thước đo độ dày thép:</strong> Dùng thước kẹp panme đo độ dày khung giếng thép và vách cabin Inox trước khi sơn lắp.</li>
            <li><strong>Ký cam kết phạt vi phạm hợp đồng:</strong> Đưa điều khoản phạt 200% giá trị hợp đồng nếu phát hiện bất kỳ linh kiện nào bị đánh tráo hoặc giả mạo.</li>
          </ol>
        </div>
      </div>
    '''
  },
  5: {
    "title": "Xu Hướng Thang Máy Kính Quan Sát Panoramic Biệt Thự: Kết Cấu Khung Thép Định Hình & Kính Laminated Chống Nóng",
    "category": "KIẾN TRÚC & XU HƯỚNG",
    "category_slug": "xu-huong",
    "image": "images/cabin_5.png",
    "author": "KTS Trưởng Lê Trọng Đạt",
    "author_title": "Chủ Trì Thiết Kế Biệt Thự Cao Cấp 34 Tỉnh Thành",
    "date": "19/10/2026",
    "read_time": "8 phút đọc",
    "views": "2,450 lượt xem",
    "summary": "Phân tích xu hướng kiến trúc thang máy vách kính toàn cảnh 360 độ: Tiêu chuẩn kính cường lực dán an toàn 2 lớp 10.38mm - 12.38mm chống tia UV 99%, kết cấu khung thép chấn mạ PVD Titan và bố trí ánh sáng Ambient sang trọng.",
    "toc": [
      {"id": "phan-1", "title": "1. Sự lên ngôi của thang máy kính trong kiến trúc biệt thự"},
      {"id": "phan-2", "title": "2. Tiêu chuẩn vật liệu kính an toàn Laminated Glass"},
      {"id": "phan-3", "title": "3. Kết cấu khung thép định hình CNC và công nghệ mạ PVD Titan"},
      {"id": "phan-4", "title": "4. Giải pháp thông gió và triệt tiêu nhiệt bức xạ giếng trời"},
      {"id": "phan-5", "title": "5. Bố cục ánh sáng Ambient và sàn đá hoa cương CNC"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Sự Lên Ngôi Của Thang Máy Kính Trong Kiến Trúc Biệt Thự
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Thay vì những chiếc thang máy hộp kín mít bí bách, thang máy kính quan sát Panoramic đã trở thành điểm nhấn thị giác đẳng cấp nhất trong các căn biệt thự song lập, đơn lập và penthouse. Thang máy kính hòa quyện cùng không gian giếng trời, tạo cảm giác xuyên suốt, mở rộng tầm nhìn và tăng tính kết nối giữa các tầng trong dinh thự.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Tiêu Chuẩn Vật Liệu Kính An Toàn Laminated Glass
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Theo tiêu chuẩn an toàn châu Âu EN 81-20 và TCVN 6395, kính dùng làm vách cabin và giếng thang máy <strong>tuyệt đối không được dùng kính cường lực đơn 1 lớp</strong>.
        </p>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Bắt buộc phải sử dụng <strong>Kính dán an toàn 2 lớp cường lực (Laminated Tempered Glass)</strong> độ dày từ 10.38mm đến 12.38mm (kết cấu: Kính cường lực 5mm + Lớp phim dán PVB 0.76mm - 1.52mm + Kính cường lực 5mm). Lớp phim PVB chuyên dụng giữ chặt mọi mảnh vỡ nếu có va chạm mạnh, ngăn chặn 100% nguy cơ rơi vỡ hoặc thủng vách. Phim PVB còn cản tới 99% tia cực tím tử ngoại (UV), bảo vệ làn da người sử dụng và nội thất gỗ xung quanh.
        </p>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Kết Cấu Khung Thép Định Hình CNC Và Công Nghệ Mạ PVD Titan
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khung giếng thang được cấu thành từ các thanh thép chấn hình hộp CNC sắc nét, bề mặt được xử lý bắn cát tẩy gỉ và phủ lớp mạ Titan công nghệ PVD (Physical Vapor Deposition) trong buồng chân không cao tần. Bề mặt mạ có các tùy chọn sang trọng: Vàng gương hoàng gia (Mirror Gold), Vàng xước sâm panh (Champagne Brushed), Đen bóng Titan (Black Mirror) chống bám vân tay và không bao giờ oxy hóa.
        </p>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Giải Pháp Thông Gió Và Triệt Tiêu Nhiệt Bức Xạ Giếng Trời
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khi lắp thang máy kính dưới mái kính giếng trời, hiện tượng hiệu ứng nhà kính có thể làm nhiệt độ bên trong giếng thang tăng cao vào mùa hè. Giải pháp kỹ thuật đồng bộ gồm:
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li>Sử dụng kính Low-E hoặc kính phủ phim cách nhiệt nano gốm màu xám khói/màu trà.</li>
          <li>Bố trí quạt hút cưỡng bức lưu lượng lớn trên đỉnh OH và cửa chớp đối lưu không khí tự nhiên ở chân giếng.</li>
          <li>Trang bị điều hòa chuyên dụng gắn nóc cabin thang máy (Elevator Air Conditioner) tự động làm lạnh trong 30 giây.</li>
        </ul>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Bố Cục Ánh Sáng Ambient Và Sàn Đá Hoa Cương CNC
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Trần cabin được thiết kế hệ thống đèn LED hắt gián tiếp nhiệt độ màu ấm 3000K - 4000K, kết hợp mặt sàn đá hoa cương tự nhiên Granite hoặc Marble ghép hoa văn nghệ thuật cắt tia nước Waterjet CNC, mang lại trải nghiệm quý tộc như trong khách sạn 6 sao quốc tế.
        </p>
      </div>
    '''
  },
  6: {
    "title": "Bóc Tách Bài Toán Tài Chính: Chi Phí Điện Năng Tiêu Thụ, Thay Thế Linh Kiện Và Bảo Trì Định Kỳ 10 Năm Của Thang Máy Homelift",
    "category": "TÀI CHÍNH & VẬN HÀNH",
    "category_slug": "bao-gia",
    "image": "images/cabin_6.png",
    "author": "Ban Quản Trị Vận Hành Thang Máy",
    "author_title": "Chuyên Viên Phân Tích Tổng Chi Phí Sở Hữu (TCO)",
    "date": "18/10/2026",
    "read_time": "9 phút đọc",
    "views": "2,980 lượt xem",
    "summary": "Bảng dự toán chi tiết tất cả các khoản chi phí nuôi thang máy gia đình trong 10 năm: Tiền điện hàng tháng chỉ từ 100k - 180k, chi phí kiểm định nhà nước, ngân sách gói bảo trì và giá trị thặng dư tài sản khi bán nhà.",
    "toc": [
      {"id": "phan-1", "title": "1. Khái niệm Tổng Chi Phí Sở Hữu (TCO) thang máy gia đình"},
      {"id": "phan-2", "title": "2. Thang máy gia đình tốn bao nhiêu số điện mỗi tháng?"},
      {"id": "phan-3", "title": "3. Chi phí kiểm định an toàn kỹ thuật định kỳ"},
      {"id": "phan-4", "title": "4. Ngân sách hợp đồng bảo dưỡng, bảo trì hàng tháng"},
      {"id": "phan-5", "title": "5. Bảng tổng hợp dòng tiền chi phí trong vòng 10 năm"},
      {"id": "phan-6", "title": "6. Gia tăng giá trị bất động sản khi có thang máy"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Khái Niệm Tổng Chi Phí Sở Hữu (TCO) Thang Máy Gia Đình
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khi quyết định mua thang máy, đa số chủ nhà chỉ quan tâm đến giá mua ban đầu. Tuy nhiên trong kỹ thuật cơ điện, chi phí vận hành suốt vòng đời 10 - 15 năm (Total Cost of Ownership - TCO) mới là yếu tố quyết định thang máy đó là khoản đầu tư thông minh hay gánh nặng tài chính.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Thang Máy Gia Đình Tốn Bao Nhiêu Số Điện Mỗi Tháng?
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Khác với tủ lạnh hay máy lạnh phải chạy liên tục 24/24, thang máy gia đình chỉ tiêu thụ điện năng khi cabin thực sự chuyển động giữa các tầng.
        </p>
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 text-slate-700">
          <div>• Công suất động cơ không hộp số PMSM: <strong>2.2 kW - 3.2 kW</strong> (điện 1 pha 220V hoặc 3 pha 380V).</div>
          <div>• Số lần di chuyển trung bình một gia đình 5 người: <strong>35 - 45 lượt/ngày</strong>.</div>
          <div>• Thời gian chạy thực tế mỗi ngày: Khoảng 25 - 35 phút.</div>
          <div>• Điện năng tiêu thụ mỗi tháng: <strong>40 - 55 kWh (số điện)</strong>.</div>
          <div>• Tiền điện hàng tháng: Dao động chỉ từ <strong>110.000 ₫ đến 170.000 ₫/tháng</strong> (tương đương tiền điện một chiếc quạt cây).</div>
        </div>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Chi Phí Kiểm Định An Toàn Kỹ Thuật Định Kỳ
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Theo biểu phí nhà nước, chi phí kiểm định kỹ thuật an toàn cho thang máy dưới 10 tầng là khoảng <strong>1.500.000 ₫ - 2.000.000 ₫/lần</strong>. Ba năm đầu kiểm định 1 lần, sau đó định kỳ 2 năm/lần.
        </p>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Ngân Sách Hợp Đồng Bảo Dưỡng, Bảo Trì Hàng Tháng
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Năm đầu tiên sau khi lắp đặt được <strong>miễn phí 100%</strong> dịch vụ bảo trì định kỳ 01 tháng/lần bởi Siêu Thị Thang Máy Toàn Quốc. Từ năm thứ 2 trở đi, gia chủ có thể lựa chọn các gói dịch vụ:
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li><strong>Gói Tiêu Chuẩn (Bảo trì 2 tháng/lần):</strong> Khoảng 400.000 ₫/tháng (~4.8 triệu/năm).</li>
          <li><strong>Gói Cao Cấp VIP (Bảo trì 1 tháng/lần + Cứu hộ 24/7):</strong> Khoảng 600.000 ₫/tháng (~7.2 triệu/năm).</li>
        </ul>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Bảng Tổng Hợp Dòng Tiền Chi Phí Trong Vòng 10 Năm
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-navy-950 text-white font-bold">
              <tr>
                <th class="p-2.5">Khoản Mục Chi Phí</th>
                <th class="p-2.5">Trung Bình / Năm</th>
                <th class="p-2.5">Tổng Sau 10 Năm</th>
                <th class="p-2.5">Ghi Chú Kỹ Thuật</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700 bg-white">
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">1. Tiền điện tiêu thụ</td>
                <td class="p-2.5">1.600.000 ₫</td>
                <td class="p-2.5 font-bold text-green-700">16.000.000 ₫</td>
                <td class="p-2.5">Động cơ PMSM siêu tiết kiệm</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">2. Bảo trì định kỳ</td>
                <td class="p-2.5">6.000.000 ₫</td>
                <td class="p-2.5 font-bold text-blue-700">54.000.000 ₫</td>
                <td class="p-2.5">Miễn phí năm đầu tiên</td>
              </tr>
              <tr class="hover:bg-amber-50/50">
                <td class="p-2.5 font-bold text-navy-950">3. Phí kiểm định nhà nước</td>
                <td class="p-2.5">900.000 ₫</td>
                <td class="p-2.5">9.000.000 ₫</td>
                <td class="p-2.5">5 lần kiểm định trong 10 năm</td>
              </tr>
              <tr class="hover:bg-amber-50/50 bg-slate-50/50">
                <td class="p-2.5 font-bold text-navy-950">4. Thay hao mòn linh kiện</td>
                <td class="p-2.5">1.200.000 ₫</td>
                <td class="p-2.5">12.000.000 ₫</td>
                <td class="p-2.5">Thay ắc quy ARD & guốc trượt</td>
              </tr>
              <tr class="hover:bg-amber-50/50 font-bold bg-amber-50 text-navy-950">
                <td class="p-2.5">TỔNG CHI PHÍ VẬN HÀNH 10 NĂM</td>
                <td class="p-2.5">~9.100.000 ₫/năm</td>
                <td class="p-2.5 text-gold-700 text-sm">~91.000.000 ₫</td>
                <td class="p-2.5">Chỉ khoảng 750.000 ₫/tháng trọn gói</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Gia Tăng Giá Trị Bất Động Sản Khi Có Thang Máy
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Dữ liệu thống kê thị trường bất động sản tại 34 tỉnh thành cho thấy, một căn nhà phố 4 - 6 tầng có lắp thang máy chất lượng cao sẽ tăng thanh khoản lên 300% và tăng giá bán thực tế từ <strong>15% đến 25%</strong> so với nhà đi bộ cùng diện tích. Đây là khoản đầu tư sinh lời vượt trội cả về tiện ích sinh hoạt gia đình lẫn giá trị tài sản.
        </p>
      </div>
    '''
  },
  7: {
    "title": "12 Bước Tự Kiểm Tra Thang Máy Định Kỳ Hàng Tháng Cho Chủ Nhà: Cách Nhận Biết Sớm Dấu Hiệu Trượt Cáp & Lệch Ray",
    "category": "CẨM NANG GIA ĐÌNH",
    "category_slug": "an-toan",
    "image": "images/cabin_7.png",
    "author": "Đội Kỹ Thuật Bảo Trì Toàn Quốc",
    "author_title": "Đơn Vị Thường Trực Cứu Hộ 24/7",
    "date": "17/10/2026",
    "read_time": "7 phút đọc",
    "views": "2,150 lượt xem",
    "summary": "Checklist trực quan giúp mọi gia chủ có thể tự tay kiểm tra độ an toàn của thang máy trong 10 phút mỗi tháng: Thử độ bằng tầng, kiểm tra mành photocell, test chuông liên lạc cứu hộ và phát hiện tiếng rít bất thường.",
    "toc": [
      {"id": "phan-1", "title": "1. Vì sao chủ nhà nên chủ động tự kiểm tra?"},
      {"id": "phan-2", "title": "2. Nhóm 1: Kiểm tra độ êm ái và sai lệch bằng tầng"},
      {"id": "phan-3", "title": "3. Nhóm 2: Kiểm tra chức năng cửa và mành cảm biến an toàn"},
      {"id": "phan-4", "title": "4. Nhóm 3: Kiểm tra hệ thống liên lạc cứu hộ và điện sự cố"},
      {"id": "phan-5", "title": "5. Nhóm 4: Nhận biết dấu hiệu trượt cáp và mòn ray"},
      {"id": "phan-6", "title": "6. Kênh báo sự cố kỹ thuật 24/7 toàn quốc"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Vì Sao Chủ Nhà Nên Chủ Động Tự Kiểm Tra?
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Mặc dù thang máy luôn có lịch bảo trì định kỳ hàng tháng từ đơn vị chuyên nghiệp, nhưng gia đình bạn mới là người sử dụng hàng ngày. Dành ra 10 phút vào ngày đầu tháng để làm checklist 12 bước sau đây sẽ giúp bạn phát hiện sớm 95% nguy cơ tiềm ẩn trước khi chúng biến thành sự cố kỹ thuật.
        </p>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Nhóm 1: Kiểm Tra Độ Êm Ái Và Sai Lệch Bằng Tầng
        </h2>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Bước 1: Kiểm tra khởi động và hãm dừng:</strong> Khi cabin bắt đầu chuyển động hoặc chuẩn bị dừng, bạn có cảm thấy bị giật nhẹ hoặc hẫng lưng không? Thang chuẩn phải tăng/giảm tốc cực kỳ mượt mà.</li>
          <li><strong>Bước 2: Đo sai lệch bằng tầng (Leveling):</strong> Khi cửa mở ra, sàn cabin và sàn nhà có bằng phẳng tuyệt đối không? Sai lệch cho phép không vượt quá <strong>±5mm</strong>. Nếu chênh lệch cao hơn, có thể vấp ngã khi bước vào.</li>
          <li><strong>Bước 3: Lắng nghe tiếng chuyển động:</strong> Lắng nghe xem có tiếng rít kim loại hay tiếng gõ "cộc cộc" theo nhịp di chuyển hay không.</li>
        </ul>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Nhóm 2: Kiểm Tra Chức Năng Cửa Và Mành Cảm Biến An Toàn
        </h2>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Bước 4: Thử mành hồng ngoại Photocell:</strong> Khi cửa đang đóng, bạn khẽ vẫy một tờ báo hoặc cánh tay ngang qua khe cửa. Cửa phải ngay lập tức đảo chiều mở bung ra mà không cần chạm vào người.</li>
          <li><strong>Bước 5: Thử nút giữ cửa (DO - Door Open):</strong> Bấm và giữ nút mở cửa trên bảng điều khiển, cửa phải giữ nguyên trạng thái mở.</li>
          <li><strong>Bước 6: Vệ sinh rãnh dẫn hướng cửa (Sill cửa):</strong> Dùng chổi nhỏ hoặc máy hút bụi làm sạch cát sỏi nhỏ rơi vào rãnh sill tầng để tránh kẹt bánh xe treo cửa.</li>
        </ul>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Nhóm 3: Kiểm Tra Hệ Thống Liên Lạc Cứu Hộ Và Điện Sự Cố
        </h2>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Bước 7: Bấm nút chuông báo động (Alarm):</strong> Chuông bên ngoài giếng thang phải reo to, rõ ràng.</li>
          <li><strong>Bước 8: Test nút gọi điện thoại thoại nội bộ (Intercom):</strong> Bấm nút nghe gọi thử để đảm bảo đường truyền giữa cabin và phòng trực/phòng khách luôn thông suốt.</li>
          <li><strong>Bước 9: Thử mô phỏng mất điện:</strong> Ngắt aptomat cấp nguồn cho thang máy trong 2 phút để kiểm tra xem hệ thống ARD có tự động đưa cabin về tầng và mở cửa hay không.</li>
        </ul>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Nhóm 4: Nhận Biết Dấu Hiệu Trượt Cáp Và Mòn Ray
        </h2>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Bước 10: Quan sát bụi mạt sắt ở cửa tầng:</strong> Nếu thấy có bột mạt kim loại đen rụng xuống rãnh cửa hoặc đáy hố, đó là dấu hiệu mòn ray hoặc lệch puly dẫn cáp.</li>
          <li><strong>Bước 11: Kiểm tra độ rung lắc ngang:</strong> Đặt thử một chai nước nhỏ lên sàn cabin khi chạy từ tầng 1 lên tầng cao nhất. Nếu mặt nước sóng sánh mạnh hoặc chai nước bị đổ, ray dẫn hướng đã bị cong vênh nhẹ.</li>
          <li><strong>Bước 12: Kiểm tra tem kiểm định còn hiệu lực:</strong> Nhìn tem kiểm định dán trong cabin để chắc chắn thang chưa quá hạn kiểm định định kỳ.</li>
        </ul>
      </div>

      <div id="phan-6" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">6.</span> Kênh Báo Sự Cố Kỹ Thuật 24/7 Toàn Quốc
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Nếu phát hiện bất kỳ dấu hiệu bất thường nào trong 12 bước trên, gia chủ không nên tự ý can thiệp cơ khí mà hãy gọi ngay đến đường dây nóng thường trực kỹ thuật: <strong>0914.587.575</strong>. Đội cứu hộ và kỹ thuật viên trên 34 tỉnh thành sẽ có mặt xử lý ngay lập tức.
        </p>
      </div>
    '''
  },
  8: {
    "title": "Cẩm Nang Thiết Kế Giếng Thang Kết Hợp Cầu Thang Bộ: Kích Thước Lọt Lòng Tối Ưu & Giải Pháp Đón Ánh Sáng",
    "category": "THIẾT KẾ MẶT BẰNG",
    "category_slug": "ho-thang",
    "image": "images/cabin_8.png",
    "author": "KTS Trưởng Kết Cấu Phạm Hùng",
    "author_title": "Chuyên Gia Quy Hoạch Giao Thông Đứng Nhà Phố",
    "date": "16/10/2026",
    "read_time": "8 phút đọc",
    "views": "2,670 lượt xem",
    "summary": "Hướng dẫn chi tiết cách bố trí thang máy nằm gọn trong lòng cầu thang bộ: Kích thước lọt lòng từ 1300x1300mm, xử lý độ dốc bậc thang, kết cấu vách kính xuyên sáng và tiêu âm cho phòng ngủ liền kề.",
    "toc": [
      {"id": "phan-1", "title": "1. Ưu nhược điểm của việc đặt thang máy trong lòng thang bộ"},
      {"id": "phan-2", "title": "2. Kích thước lọt lòng tối thiểu cần có"},
      {"id": "phan-3", "title": "3. Cải tạo cầu thang bộ hiện hữu để cấy thang máy"},
      {"id": "phan-4", "title": "4. Giải pháp vách kính kết hợp chiếu sáng tự nhiên"},
      {"id": "phan-5", "title": "5. Bản vẽ mặt bằng bố trí tiêu biểu cho nhà phố 4m - 5m"}
    ],
    "content_html": '''
      <div id="phan-1" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">1.</span> Ưu Nhược Điểm Của Việc Đặt Thang Máy Trong Lòng Thang Bộ
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Bố trí giếng thang máy nằm giữa lòng khoảng giếng trời của cầu thang bộ (U-shape staircase) là giải pháp kinh điển và hiệu quả nhất cho các ngôi nhà phố có mặt tiền từ 4m đến 6m tại Việt Nam.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="font-bold text-green-950 mb-1">Ưu điểm vượt trội:</div>
            <ul class="space-y-1 text-slate-700 list-disc list-inside">
              <li>Tiết kiệm diện tích: Tận dụng hoàn toàn khoảng không gian chết giữa các vế thang bộ.</li>
              <li>Tay vịn thang bộ gắn trực tiếp vào khung giếng thang, tiết kiệm chi phí làm lan can kính.</li>
              <li>Hành lang giao thông gọn gàng, cửa thang máy đối diện thẳng lối đi các phòng.</li>
            </ul>
          </div>
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div class="font-bold text-amber-950 mb-1">Thách thức kỹ thuật:</div>
            <ul class="space-y-1 text-slate-700 list-disc list-inside">
              <li>Làm giảm bớt lượng ánh sáng trực tiếp chiếu từ giếng trời xuống tầng trệt.</li>
              <li>Yêu cầu bắt buộc phải dùng giếng thang bọc kính trong suốt để giải phóng tầm nhìn.</li>
              <li>Cần kiểm tra khả năng chịu lực của các dầm chiếu nghỉ thang bộ.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="phan-2" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">2.</span> Kích Thước Lọt Lòng Tối Thiểu Cần Có
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Để lắp đặt được một cây thang máy gia đình tiêu chuẩn 300kg - 350kg (chở được 3 - 5 người), khoảng lọt lòng thông thủy giữa hai vế thang bộ cần đạt tối thiểu:
        </p>
        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
          <li><strong>Rộng tối thiểu:</strong> 1.250 mm (chiều ngang mặt tiền thang).</li>
          <li><strong>Sâu tối thiểu:</strong> 1.300 mm (chiều sâu từ vách trước ra vách sau).</li>
          <li><strong>Chiều rộng vế thang bộ còn lại:</strong> Tối thiểu 750mm - 900mm để người đi bộ vẫn lên xuống thoải mái khi cần.</li>
        </ul>
      </div>

      <div id="phan-3" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">3.</span> Cải Tạo Cầu Thang Bộ Hiện Hữu Để Cấy Thang Máy
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Với các ngôi nhà cũ có giếng thang bộ hẹp (chỉ rộng khoảng 800mm - 900mm), kỹ sư Siêu Thị Thang Máy Toàn Quốc sẽ tiến hành giải pháp:
        </p>
        <ol class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
          <li>Cắt gọt bớt một phần mũi bậc thang bê tông (khoảng 150mm mỗi bên) bằng lưỡi cắt kim cương không rung chấn.</li>
          <li>Gia cố bản thang bằng dầm thép hình chữ I hoặc chữ U liên kết bulong hóa chất vào tường chịu lực.</li>
          <li>Thay thế lan can gạch cũ bằng lan can sắt mỹ thuật thanh mảnh để mở rộng lòng giếng thang.</li>
        </ol>
      </div>

      <div id="phan-4" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">4.</span> Giải Pháp Vách Kính Kết Hợp Chiếu Sáng Tự Nhiên
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Bốn mặt của giếng thang được ốp kính an toàn trong suốt hoặc kính gân sọc Fluted Glass. Khi ánh sáng từ mái kính tầng tum chiếu xuống, ánh sáng sẽ xuyên qua các vách kính thang máy, khúc xạ và lan tỏa đều khắp cầu thang bộ, giúp toàn bộ ngôi nhà luôn ngập tràn ánh sáng tự nhiên mà không cần bật điện ban ngày.
        </p>
      </div>

      <div id="phan-5" class="space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-navy-950 border-b pb-2 flex items-center gap-2">
          <span class="text-gold-600">5.</span> Bản Vẽ Mặt Bằng Bố Trí Tiêu Biểu Cho Nhà Phố 4m - 5m
        </h2>
        <p class="text-slate-700 leading-relaxed text-xs sm:text-sm">
          Kỹ sư trưởng sẵn sàng cung cấp trọn bộ file bản vẽ CAD mặt cắt, mặt đứng và chi tiết kết cấu hố thang nằm giữa lòng thang bộ hoàn toàn miễn phí. Hãy liên hệ Hotline <strong>0914.587.575</strong> hoặc gửi ảnh mặt bằng nhà bạn qua Zalo để nhận tư vấn bố trí tối ưu nhất!
        </p>
      </div>
    '''
  }
}
