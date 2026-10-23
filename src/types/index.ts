export type ProductType = 'owned' | 'reference' | 'affiliate';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id?: string | null;
  brand_id?: string | null;
  name: string;
  slug: string;
  model?: string | null;
  sku?: string | null;
  short_description?: string | null;
  description?: string | null;
  specifications: Record<string, string>;
  product_type: ProductType;
  price?: number | null;
  reference_price?: number | null;
  stock_quantity: number;
  sales_enabled: boolean;
  is_best_seller: boolean;
  is_published: boolean;
  sort_order: number;
  affiliate_url?: string | null;
  warranty_text?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  // Join properties
  category?: Category | null;
  brand?: Brand | null;
  images?: ProductImage[];
  primary_image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string | null;
  product_name: string;
  product_model?: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'completed' | 'cancelled';
export type PaymentMethod = 'cod' | 'direct_confirmation';

export interface Order {
  id?: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  shipping_address: string;
  customer_note?: string | null;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

export interface SiteSettings {
  id: number;
  store_name: string;
  phone: string;
  zalo_url: string;
  address: string;
  contact_email: string;
  shipping_policy: string;
  return_policy: string;
  warranty_policy: string;
  updated_at: string;
}
