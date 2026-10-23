# -*- coding: utf-8 -*-
path = r'D:\sieuthithangmaytoanquoc\index.html'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

target = '''          <div class="text-xs text-slate-300 flex items-center gap-2 justify-center md:justify-start">
            <span>✓ Kích thước hố khuyến nghị: <strong id="shaftSizeText" class="text-white">1300mm x 1300mm</strong></span>
            <span>•</span>
            <span>Hố PIT chỉ từ: <strong class="text-white">250mm - 400mm</strong></span>
          </div>'''

replacement = '''          <div class="text-xs text-slate-300 flex flex-wrap items-center gap-2 justify-center md:justify-start pt-1">
            <span class="inline-flex items-center gap-1.5 bg-navy-900 border border-slate-700/80 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
              <span class="text-green-400 font-bold">✓</span>
              <span>Kích thước hố: <strong id="shaftSizeText" class="text-white font-bold">1300mm x 1300mm</strong></span>
            </span>
            <span class="inline-flex items-center gap-1.5 bg-navy-900 border border-slate-700/80 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
              <span class="text-gold-400 font-bold">✓</span>
              <span>Hố PIT chỉ từ: <strong class="text-white font-bold">250mm - 400mm</strong></span>
            </span>
          </div>'''

# Normalize line breaks for matching
target_clean = target.replace('\r\n', '\n')
text_clean = text.replace('\r\n', '\n')

if target_clean in text_clean:
    new_text = text_clean.replace(target_clean, replacement.replace('\r\n', '\n'))
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Successfully replaced broken line with responsive badges in index.html")
else:
    print("Target string not matched exactly, trying regex...")
    import re
    new_text, n = re.subn(
        r'<div class="text-xs text-slate-300 flex items-center gap-2 justify-center md:justify-start">\s*<span>.*?Kích thước hố.*?</span>\s*<span>.*?</span>\s*<span>.*?Hố PIT chỉ từ.*?</span>\s*</div>',
        replacement.replace('\r\n', '\n'),
        text_clean,
        flags=re.DOTALL
    )
    if n > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Successfully replaced using regex ({n} match)")
    else:
        print("Regex match failed!")
