// PWA Installation & Service Worker Handler for Siêu Thị Thang Máy Toàn Quốc
(function () {
  'use strict';

  var basePath = window.location.pathname.startsWith('/sieuthithangmaytoanquoc') ? '/sieuthithangmaytoanquoc' : '';
  var icon192 = basePath + '/images/icons/icon-192.png';
  var swUrl = basePath + '/sw.js';

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(swUrl).then(function (reg) {
        console.log('PWA ServiceWorker registered with scope: ', reg.scope);
      }).catch(function (err) {
        console.warn('PWA ServiceWorker registration failed: ', err);
      });
    });
  }

  // 2. Check standalone (already installed)
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone === true || 
                     document.referrer.includes('android-app://');

  if (isStandalone) {
    console.log('App is running in Standalone PWA mode');
    return;
  }

  // Check if dismissed recently in session
  if (sessionStorage.getItem('pwa_dismissed') === 'true') {
    return;
  }

  var deferredPrompt = null;
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // 3. Create UI Banner & Modal HTML
  function injectPwaUI() {
    if (document.getElementById('pwa-install-banner')) return;

    // Floating Installation Banner
    var banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.className = 'fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:w-[420px] bg-slate-900/95 backdrop-blur-md text-white border-2 border-red-500/80 rounded-2xl p-3.5 shadow-2xl z-[9999] transition-all duration-300 transform translate-y-0 animate-fade-in';
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${icon192}" alt="App Icon" class="w-12 h-12 rounded-xl border border-amber-400 shadow-md flex-shrink-0 object-cover bg-slate-950">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="font-black text-sm text-white truncate">Cài App Thang Máy TQ</span>
            <span class="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Tiện ích</span>
          </div>
          <p class="text-[11px] text-slate-300 leading-tight mt-0.5">Mở trực tiếp trên màn hình chính, tra cứu CAD & báo giá siêu tốc!</p>
        </div>
        <button id="pwa-close-btn" class="text-slate-400 hover:text-white p-1 text-base leading-none focus:outline-none" title="Đóng">&times;</button>
      </div>
      <div class="mt-2.5 flex gap-2">
        <button id="pwa-install-action" class="flex-1 py-2 px-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          TẢI & CÀI ĐẶT APP NGAY
        </button>
      </div>
    `;
    document.body.appendChild(banner);

    // Modal Guide for iOS & Manual Android
    var modal = document.createElement('div');
    modal.id = 'pwa-guide-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] hidden items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-scale-up">
        <button id="pwa-modal-close" class="absolute top-3 right-3 text-slate-400 hover:text-white p-2 text-xl leading-none">&times;</button>
        <div class="text-center mb-4">
          <img src="${icon192}" alt="App Icon" class="w-16 h-16 rounded-2xl border-2 border-amber-400 shadow-xl mx-auto mb-2 object-cover">
          <h3 class="text-lg font-black text-white">Cài Đặt App Thang Máy</h3>
          <p class="text-xs text-slate-400 mt-1">Dùng như một ứng dụng cài trên điện thoại (không cần nhớ địa chỉ web)</p>
        </div>
        
        <div id="pwa-guide-content" class="bg-slate-800/80 rounded-xl p-3.5 text-xs text-slate-200 space-y-3">
        </div>

        <button id="pwa-modal-ok" class="mt-4 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition">
          ĐÃ HIỂU, ĐÓNG HƯỚNG DẪN
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('pwa-close-btn').addEventListener('click', function () {
      banner.style.display = 'none';
      sessionStorage.setItem('pwa_dismissed', 'true');
    });

    document.getElementById('pwa-modal-close').addEventListener('click', function () {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    document.getElementById('pwa-modal-ok').addEventListener('click', function () {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    document.getElementById('pwa-install-action').addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted PWA installation');
            banner.style.display = 'none';
          }
          deferredPrompt = null;
        });
      } else if (isIOS) {
        showGuide('ios');
      } else {
        showGuide('android');
      }
    });
  }

  function showGuide(platform) {
    var modal = document.getElementById('pwa-guide-modal');
    var content = document.getElementById('pwa-guide-content');
    if (!modal || !content) return;

    if (platform === 'ios') {
      content.innerHTML = `
        <div class="font-bold text-amber-400 text-sm mb-1 flex items-center gap-1.5">
          <span>🍎 Hướng dẫn trên iPhone / iPad:</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">1</span>
          <span>Bấm vào nút <b>Chia sẻ</b> (biểu tượng ô vuông có mũi tên trỏ lên <svg class="inline w-4 h-4 text-blue-400 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>) ở thanh dưới cùng Safari.</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">2</span>
          <span>Cuộn xuống và chọn dòng <b>"Thêm vào MH chính"</b> (Add to Home Screen).</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">3</span>
          <span>Bấm <b>"Thêm"</b> (Add) ở góc trên bên phải màn hình để hoàn tất!</span>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="font-bold text-emerald-400 text-sm mb-1 flex items-center gap-1.5">
          <span>🤖 Hướng dẫn trên Android / Chrome:</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">1</span>
          <span>Bấm vào biểu tượng <b>3 dấu chấm (⋮)</b> ở góc trên bên phải trình duyệt.</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">2</span>
          <span>Chọn dòng <b>"Cài đặt ứng dụng"</b> hoặc <b>"Thêm vào màn hình chính"</b>.</span>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">3</span>
          <span>Bấm xác nhận <b>"Cài đặt"</b>. Biểu tượng ứng dụng Thang Máy sẽ xuất hiện ngay trên màn hình điện thoại!</span>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // 4. Listen for beforeinstallprompt
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    injectPwaUI();
  });

  // Also auto inject after 1.5 seconds on mobile devices
  window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      if (/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent)) {
        injectPwaUI();
      }
    }, 1500);
  });

  // Expose global function to trigger install modal anytime
  window.triggerPwaInstall = function () {
    injectPwaUI();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          var b = document.getElementById('pwa-install-banner');
          if (b) b.style.display = 'none';
        }
        deferredPrompt = null;
      });
    } else if (isIOS) {
      showGuide('ios');
    } else {
      showGuide('android');
    }
  };

})();
