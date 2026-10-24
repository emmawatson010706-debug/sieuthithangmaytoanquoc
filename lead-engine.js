// Hệ thống Thu Thập & Chuyển Tiếp Khách Hàng (Lead Engine) - Siêu Thị Thang Máy Toàn Quốc
(function () {
  'use strict';

  var ADMIN_EMAIL = 'emma.watson010706@gmail.com';
  var ADMIN_PHONE = '0914587575';
  var STORAGE_KEY = 'sttm_leads_v1';

  // 1. Lưu Lead vào localStorage
  function saveLeadLocal(lead) {
    try {
      var existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift(lead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // 2. Gửi dữ liệu khách hàng về Email qua FormSubmit AJAX (Tối ưu tuyệt đối không ngắt dòng)
  function sendLeadToEmail(lead) {
    var subjectTitle = '🚨 [KHÁCH HÀNG MỚI] ' + (lead.name || 'Khách') + ' - ' + lead.phone + ' - ' + (lead.province || lead.address || '34 Tỉnh');
    
    var payload = {
      _subject: subjectTitle,
      _template: 'table',
      _captcha: 'false',
      'Họ và tên khách': lead.name || 'Chưa cung cấp',
      'Số điện thoại': lead.phone,
      'Khu vực công trình': lead.address || lead.province || 'Toàn quốc (34 tỉnh thành)',
      'Nhu cầu dịch vụ': lead.type || 'Tư vấn dự toán thang máy',
      'Thông số chi tiết': lead.details || 'Mặc định',
      'Thời gian gửi': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      'Nguồn': 'Sàn Siêu Thị Thang Máy Toàn Quốc'
    };

    return fetch('https://formsubmit.co/ajax/' + ADMIN_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json();
    }).catch(function (err) {
      console.warn('Gửi FormSubmit dự phòng:', err);
    });
  }

  // 3. Hàm gọi chính: Xử lý khi khách gửi thông tin
  window.sttmSubmitLead = function (leadData, onSuccess) {
    leadData.id = 'lead_' + Date.now();
    leadData.timestamp = new Date().toISOString();
    leadData.timeString = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // 3.1 Lưu local
    saveLeadLocal(leadData);

    // 3.2 Gửi ngầm về Email
    sendLeadToEmail(leadData);

    // 3.3 Hiển thị thông báo thành công & Tự động chuyển tiếp Zalo
    showSuccessLeadModal(leadData);

    if (typeof onSuccess === 'function') {
      onSuccess(leadData);
    }
  };

  // 4. Modal chúc mừng & Tự động kết nối Zalo Kỹ Sư Trưởng
  function showSuccessLeadModal(lead) {
    var existingModal = document.getElementById('sttm-success-modal');
    if (existingModal) existingModal.remove();

    var zaloMsg = 'Chào Kỹ Sư Trưởng, tôi là ' + (lead.name || 'Khách hàng') + ' (SĐT: ' + lead.phone + ') ở ' + (lead.province || lead.address || 'công trình') + '. Tôi vừa gửi yêu cầu: ' + (lead.details || lead.type) + '. Nhờ Kỹ Sư gửi giúp tôi bản vẽ CAD và bảng báo giá chi tiết nhé!';
    var zaloUrl = 'https://zalo.me/' + ADMIN_PHONE + '?text=' + encodeURIComponent(zaloMsg);

    var modal = document.createElement('div');
    modal.id = 'sttm-success-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[100000] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-slate-900 border-2 border-gold-500 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-scale-up text-center space-y-4">
        <div class="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✓
        </div>

        <div class="space-y-1.5">
          <h3 class="text-xl font-black text-gold-400 uppercase tracking-tight">Gửi Yêu Cầu Thành Công!</h3>
          <p class="text-xs text-slate-300">
            Hệ thống đã gửi dữ liệu về Email quản trị và đang chuyển tiếp tới <strong class="text-white">Zalo Kỹ Sư Trưởng (0914.587.575)</strong>...
          </p>
        </div>

        <div class="bg-navy-950 p-3.5 rounded-xl border border-slate-800 text-left text-xs space-y-1.5 text-slate-300">
          <div>👤 <b>Người gửi:</b> <span class="text-white">${lead.name || 'Khách hàng'}</span></div>
          <div>📞 <b>Số điện thoại:</b> <span class="text-gold-400 font-bold">${lead.phone}</span></div>
          <div>📍 <b>Khu vực:</b> <span class="text-white">${lead.province || lead.address || '34 Tỉnh thành'}</span></div>
          <div>📐 <b>Nội dung:</b> <span class="text-slate-400 line-clamp-2">${lead.details || lead.type}</span></div>
        </div>

        <div class="space-y-2 pt-2">
          <a id="sttm-zalo-auto-btn" href="${zaloUrl}" target="_blank" class="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform active:scale-95 animate-pulse">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.09-1.35C8.54 21.49 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
            BẤM ĐỂ MỞ ZALO NHẬN BÁO GIÁ NGAY
          </a>
          <button onclick="document.getElementById('sttm-success-modal').remove()" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold rounded-xl transition">
            Đóng cửa sổ
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Tự động chuyển tiếp sang Zalo sau 1.2 giây
    setTimeout(function () {
      try {
        var zaloBtn = document.getElementById('sttm-zalo-auto-btn');
        if (zaloBtn) {
          window.open(zaloUrl, '_blank');
        }
      } catch (err) {
        console.log('Popup auto blocked, user will click button');
      }
    }, 1200);
  }

  // 5. Popup Nhận Báo Giá Nhanh 30s (Quick Lead Modal)
  window.openQuickLeadModal = function (contextTitle, defaultDetails) {
    var existing = document.getElementById('sttm-quick-lead-modal');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'sttm-quick-lead-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-navy-950 border-2 border-gold-500 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-scale-up space-y-4">
        <button onclick="document.getElementById('sttm-quick-lead-modal').remove()" class="absolute top-3 right-3 text-slate-400 hover:text-white p-2 text-xl leading-none">&times;</button>

        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
            ⚡ Phản hồi trong 15 phút
          </div>
          <h3 class="text-lg font-black text-gold-400 uppercase tracking-tight">${contextTitle || 'Nhận Trọn Bộ Báo Giá & Bản Vẽ CAD'}</h3>
          <p class="text-xs text-slate-300">Kỹ Sư Trưởng sẽ gửi file CAD bóc tách chi tiết và bảng giá qua Zalo cho bạn.</p>
        </div>

        <form id="quickLeadForm" onsubmit="handleQuickLeadSubmit(event)" class="space-y-3.5 text-xs text-left">
          <input type="hidden" id="quickLeadDetails" value="${(defaultDetails || '').replace(/"/g, '&quot;')}">

          <div>
            <label class="block font-bold text-slate-300 mb-1">Số điện thoại (Có Zalo) *</label>
            <input required type="tel" id="quickLeadPhone" placeholder="Ví dụ: 0914xxxxxx" class="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 font-bold">
          </div>

          <div>
            <label class="block font-bold text-slate-300 mb-1">Họ tên của bạn *</label>
            <input required type="text" id="quickLeadName" placeholder="Ví dụ: Anh Tuấn / Chị Lan" class="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500">
          </div>

          <div>
            <label class="block font-bold text-slate-300 mb-1">Tỉnh / Thành phố công trình *</label>
            <input required type="text" id="quickLeadAddress" placeholder="Ví dụ: Nghệ An, Hà Nội, TP.HCM, Đà Nẵng..." class="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500">
          </div>

          <button type="submit" class="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-xl transition transform active:scale-95">
            🚀 GỬI YÊU CẦU CHO KỸ SƯ TRƯỞNG NGAY
          </button>
          
          <div class="text-[11px] text-center text-slate-400">
            Cam kết bảo mật 100% • Tư vấn khảo sát mặt bằng hoàn toàn miễn phí
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  };

  window.handleQuickLeadSubmit = function (e) {
    e.preventDefault();
    var phone = document.getElementById('quickLeadPhone').value.trim();
    var name = document.getElementById('quickLeadName').value.trim();
    var address = document.getElementById('quickLeadAddress').value.trim();
    var details = document.getElementById('quickLeadDetails').value.trim();

    if (!phone) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }

    var leadData = {
      type: 'Tư vấn dự toán nhanh & File CAD',
      name: name,
      phone: phone,
      address: address,
      details: details || 'Kích thước hố tiêu chuẩn từ công cụ tính giá'
    };

    var modal = document.getElementById('sttm-quick-lead-modal');
    if (modal) modal.remove();

    window.sttmSubmitLead(leadData);
  };

  // 6. Bảng Quản trị Lead nội bộ (Admin Dashboard)
  window.openAdminLeadManager = function () {
    var leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-[100001] flex items-center justify-center p-3 sm:p-6';
    modal.id = 'admin-lead-manager-modal';

    var rowsHtml = '';
    if (leads.length === 0) {
      rowsHtml = '<tr><td colspan="6" class="text-center py-8 text-slate-400">Chưa có khách hàng nào để lại thông tin trên thiết bị này.</td></tr>';
    } else {
      leads.forEach(function (l, i) {
        rowsHtml += `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40">
            <td class="p-2.5 font-mono text-slate-400">${i + 1}</td>
            <td class="p-2.5 text-slate-300 font-mono text-[11px]">${l.timeString || l.timestamp}</td>
            <td class="p-2.5 font-bold text-white">${l.name || 'Khách'}</td>
            <td class="p-2.5 font-bold text-gold-400"><a href="tel:${l.phone}" class="hover:underline">${l.phone}</a></td>
            <td class="p-2.5 text-slate-300">${l.address || l.province || 'Toàn quốc'}</td>
            <td class="p-2.5 text-slate-400 max-w-xs truncate">${l.details || l.type}</td>
          </tr>
        `;
      });
    }

    modal.innerHTML = `
      <div class="bg-slate-900 border border-gold-500/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-xs text-white">
        <div class="p-4 bg-navy-950 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg text-gold-400">💼</span>
            <h3 class="font-black text-sm text-white uppercase tracking-wider">HỘP THƯ KHÁCH HÀNG (LEAD MANAGER)</h3>
            <span class="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold text-[10px]">${leads.length} Khách</span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="exportLeadsCsv()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold transition">
              📊 Xuất Excel (CSV)
            </button>
            <button onclick="document.getElementById('admin-lead-manager-modal').remove()" class="text-slate-400 hover:text-white text-xl leading-none px-2">&times;</button>
          </div>
        </div>

        <div class="flex-1 overflow-auto p-4">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-navy-900 text-gold-400 border-b border-slate-800 uppercase text-[10px] font-black">
                <th class="p-2.5">STT</th>
                <th class="p-2.5">Thời Gian</th>
                <th class="p-2.5">Họ Tên</th>
                <th class="p-2.5">Số Điện Thoại</th>
                <th class="p-2.5">Địa Chỉ / Tỉnh</th>
                <th class="p-2.5">Nhu Cầu Kỹ Thuật</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <div class="p-3 bg-navy-950 border-t border-slate-800 text-right text-slate-400 text-[11px] flex justify-between items-center">
          <span>Thông báo tự động chuyển về Email: <strong class="text-white">${ADMIN_EMAIL}</strong> & Hotline <strong class="text-gold-400">${ADMIN_PHONE}</strong></span>
          <button onclick="document.getElementById('admin-lead-manager-modal').remove()" class="px-3 py-1 bg-slate-800 rounded font-bold hover:bg-slate-700 text-white">Đóng</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  };

  // 7. Xuất file CSV
  window.exportLeadsCsv = function () {
    var leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (leads.length === 0) {
      alert('Chưa có khách hàng nào để xuất file.');
      return;
    }

    var csvContent = 'data:text/csv;charset=utf-8,\uFEFFSTT,Thời Gian,Họ Tên,Số Điện Thoại,Địa Chỉ / Tỉnh,Nhu Cầu Kỹ Thuật\n';
    leads.forEach(function (l, i) {
      var row = [
        i + 1,
        '"' + (l.timeString || l.timestamp) + '"',
        '"' + (l.name || '') + '"',
        '"' + (l.phone || '') + '"',
        '"' + (l.address || l.province || '') + '"',
        '"' + (l.details || l.type || '').replace(/"/g, '""') + '"'
      ].join(',');
      csvContent += row + '\n';
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Danh_Sach_Khach_Thang_May_' + Date.now() + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Phím tắt bí mật: Ctrl + Shift + L
  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      window.openAdminLeadManager();
    }
  });

})();
