-- seed.sql: Dữ liệu mẫu khởi tạo cho Siêu thị Thương Mại Thang Máy Toàn Quốc (sieuthithangmaytoanquoc.com)

-- 1. Cài đặt cửa hàng & Hotline Kỹ Sư Trưởng Toàn Quốc
update public.site_settings
set
  store_name = 'Siêu thị Thương Mại Thang Máy Toàn Quốc',
  phone = '0914.587.575',
  zalo_url = 'https://zalo.me/0914587575',
  address = 'Trụ sở & Chi nhánh kỹ thuật: Hà Nội • Đà Nẵng • TP.HCM • Nghệ An (Phục vụ 63 tỉnh thành)',
  contact_email = 'admin@sieuthithangmaytoanquoc.com',
  shipping_policy = 'Miễn phí khảo sát mặt bằng giếng thang, tư vấn bản vẽ móng và hố PIT tận nơi trên 63 tỉnh thành toàn quốc.',
  return_policy = 'Bảo hành chính hãng 24 - 36 tháng. 1 đổi 1 linh kiện lỗi kỹ thuật trong 12 tháng đầu.',
  warranty_policy = 'Miễn phí bảo trì định kỳ 01 tháng/lần trong năm đầu. Đội cứu hộ khẩn cấp thường trực 24/7.'
where id = 1;

-- 2. Danh mục chủng loại thang máy
insert into public.categories (id, name, slug, description, image_url, sort_order)
values
  ('c1111111-1111-1111-1111-111111111111', 'Thang máy gia đình Homelift', 'thang-may-gia-dinh-homelift', 'Dòng thang máy mini tải trọng 250kg - 450kg, không cần đào hố PIT sâu, tiết kiệm diện tích tối đa cho nhà phố', 'images/cabin_1.png', 1),
  ('c2222222-2222-2222-2222-222222222222', 'Thang máy vách kính biệt thự', 'thang-may-vach-kinh-panoramic', 'Thang máy lồng kính 4 mặt quan sát 360 độ, khung nhôm Anode / Thép mạ PVD vàng đồng sang trọng', 'images/cabin_2.png', 2),
  ('c3333333-3333-3333-3333-333333333333', 'Thang máy khách sạn & văn phòng', 'thang-may-khach-san-toa-nha', 'Tải trọng 630kg - 1000kg, tốc độ cao 1.5m/s - 1.75m/s cho khách sạn và tòa nhà toàn quốc', 'images/cabin_3.png', 3),
  ('c4444444-4444-4444-4444-444444444444', 'Thang máy tải hàng & Gara ô tô', 'thang-may-tai-hang-gara', 'Tải trọng 500kg - 3000kg phục vụ nhà hàng tiệc cưới, kho xưởng sản xuất, gara xe hơi', 'images/cabin_5.png', 4),
  ('c5555555-5555-5555-5555-555555555555', 'Linh kiện, Máy kéo & Tủ điện', 'linh-kien-may-keo-tu-dien', 'Máy kéo Fuji, Montanari, tủ điều khiển vi xử lý Step, Monarch NICE 3000+, ray cáp nhập khẩu', 'images/cabin_6.png', 5)
on conflict (id) do nothing;

-- 3. Hãng sản xuất động cơ & công nghệ
insert into public.brands (id, name, slug)
values
  ('b1111111-1111-1111-1111-111111111111', 'Fuji (Nhật Bản)', 'fuji-japan'),
  ('b2222222-2222-2222-2222-222222222222', 'Montanari (Ý / Italy)', 'montanari-italy'),
  ('b3333333-3333-3333-3333-333333333333', 'Mitsubishi (Nhật Bản)', 'mitsubishi'),
  ('b4444444-4444-4444-4444-444444444444', 'Ziehl-Abegg (Đức)', 'ziehl-abegg-germany'),
  ('b5555555-5555-5555-5555-555555555555', 'Torin Drive', 'torin-drive'),
  ('b6666666-6666-6666-6666-666666666666', 'Monarch / Step', 'monarch-step')
on conflict (id) do nothing;
