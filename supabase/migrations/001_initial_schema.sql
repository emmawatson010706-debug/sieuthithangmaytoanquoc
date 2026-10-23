-- 001_initial_schema.sql
-- Siêu thị Điện máy Nghệ An (sieuthidienmaynghean.com)

create extension if not exists pgcrypto;

-- 1. Quản trị viên
create table public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Hàm kiểm tra quyền, tránh phụ thuộc policy đệ quy.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.app_admins a
    where a.user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Trigger cập nhật updated_at tự động
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2. Danh mục và thương hiệu
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. Sản phẩm
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id)
    on delete set null,
  brand_id uuid references public.brands(id)
    on delete set null,

  name text not null,
  slug text not null unique,
  model text,
  sku text unique,
  short_description text,
  description text,
  specifications jsonb not null default '{}'::jsonb,

  product_type text not null
    check (product_type in ('owned', 'reference', 'affiliate')),

  price numeric(14,2)
    check (price is null or price >= 0),
  reference_price numeric(14,2)
    check (reference_price is null or reference_price >= 0),

  stock_quantity integer not null default 0
    check (stock_quantity >= 0),

  sales_enabled boolean not null default false,
  is_best_seller boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,

  affiliate_url text,
  warranty_text text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint products_sales_rules check (
    (
      product_type = 'owned'
      and (not sales_enabled or price is not null)
    )
    or
    (
      product_type in ('reference', 'affiliate')
      and not sales_enabled
      and not is_best_seller
    )
  ),

  constraint products_affiliate_rules check (
    product_type <> 'affiliate'
    or affiliate_url is not null
  )
);

create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

create index products_category_idx
  on public.products(category_id);

create index products_brand_idx
  on public.products(brand_id);

create index products_catalog_idx
  on public.products(is_published, sort_order);

create index products_best_seller_idx
  on public.products(is_best_seller, sort_order)
  where is_published = true;

-- 4. Hình ảnh
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null
    references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 5. Nguồn dữ liệu
create table public.product_sources (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null
    references public.products(id) on delete cascade,
  source_name text not null,
  source_url text not null,
  usage_permission text not null default 'pending'
    check (usage_permission in (
      'pending', 'permitted', 'restricted'
    )),
  last_checked_at timestamptz,
  source_price numeric(14,2)
    check (source_price is null or source_price >= 0),
  notes text,
  created_at timestamptz not null default now()
);

-- 6. Đơn hàng
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  phone text not null,
  email text,
  shipping_address text,
  customer_note text,

  subtotal numeric(14,2) not null
    check (subtotal >= 0),
  shipping_fee numeric(14,2) not null default 0
    check (shipping_fee >= 0),
  total numeric(14,2) not null
    check (total >= 0),

  payment_method text not null default 'cod'
    check (payment_method in ('cod', 'direct_confirmation')),

  status text not null default 'pending'
    check (status in (
      'pending', 'confirmed', 'processing',
      'shipping', 'completed', 'cancelled'
    )),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();

create index orders_created_idx
  on public.orders(created_at desc);

create index orders_status_idx
  on public.orders(status, created_at desc);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null
    references public.orders(id) on delete cascade,
  product_id uuid
    references public.products(id) on delete set null,

  product_name text not null,
  product_model text,
  unit_price numeric(14,2) not null
    check (unit_price >= 0),
  quantity integer not null
    check (quantity > 0),
  line_total numeric(14,2) not null
    check (line_total >= 0)
);

create index order_items_order_idx
  on public.order_items(order_id);

-- 7. Cài đặt cửa hàng
create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null
    default 'Siêu thị Điện máy Nghệ An',
  phone text,
  zalo_url text,
  address text,
  contact_email text,
  shipping_policy text,
  return_policy text,
  warranty_policy text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.handle_updated_at();

-- 8. Bật RLS cho toàn bộ bảng
alter table public.app_admins enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_sources enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.site_settings enable row level security;

-- 9. Quản trị viên chỉ đọc được thông tin quyền của mình
create policy "admin_read_own"
on public.app_admins for select
to authenticated
using (user_id = (select auth.uid()));

-- 10. Danh mục và thương hiệu công khai
create policy "public_read_active_categories"
on public.categories for select
to anon, authenticated
using (is_active or (select public.is_admin()));

create policy "admin_manage_categories"
on public.categories for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "public_read_active_brands"
on public.brands for select
to anon, authenticated
using (is_active or (select public.is_admin()));

create policy "admin_manage_brands"
on public.brands for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 11. Chỉ công khai sản phẩm đã xuất bản
create policy "public_read_published_products"
on public.products for select
to anon, authenticated
using (
  (is_published and published_at is not null
    and published_at <= now())
  or (select public.is_admin())
);

create policy "admin_manage_products"
on public.products for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "public_read_images_of_published_products"
on public.product_images for select
to anon, authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id
      and p.is_published
      and p.published_at is not null
      and p.published_at <= now()
  )
  or (select public.is_admin())
);

create policy "admin_manage_product_images"
on public.product_images for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 12. Nguồn sản phẩm chỉ dành cho quản trị
create policy "admin_manage_sources"
on public.product_sources for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 13. Đơn hàng chỉ đọc/điều chỉnh bởi quản trị
create policy "admin_manage_orders"
on public.orders for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "admin_manage_order_items"
on public.order_items for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 14. Cài đặt cửa hàng
create policy "public_read_site_settings"
on public.site_settings for select
to anon, authenticated
using (true);

create policy "admin_manage_site_settings"
on public.site_settings for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));
