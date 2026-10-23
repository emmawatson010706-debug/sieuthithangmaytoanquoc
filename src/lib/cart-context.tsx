'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Khởi tạo từ localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('smdmna_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Không thể đọc giỏ hàng từ bộ nhớ trình duyệt', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Lưu vào localStorage khi có thay đổi
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('smdmna_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Không thể lưu giỏ hàng', e);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1): { success: boolean; message: string } => {
    // Quy tắc nghiệp vụ: Chỉ sản phẩm owned, sales_enabled và có giá mới được thêm vào giỏ hàng
    if (product.product_type !== 'owned') {
      return {
        success: false,
        message: 'Sản phẩm này là sản phẩm tham khảo hoặc đối tác, không hỗ trợ mua trực tiếp trên giỏ hàng.',
      };
    }

    if (!product.sales_enabled || !product.price) {
      return {
        success: false,
        message: 'Sản phẩm hiện đang tạm ngưng mở bán online. Vui lòng liên hệ hotline/Zalo.',
      };
    }

    if (product.stock_quantity <= 0) {
      return {
        success: false,
        message: 'Sản phẩm hiện đã hết hàng trong kho.',
      };
    }

    let resultMessage = 'Đã thêm sản phẩm vào giỏ hàng!';
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > product.stock_quantity) {
          resultMessage = `Kho chỉ còn ${product.stock_quantity} sản phẩm. Đã cập nhật số lượng tối đa.`;
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: product.stock_quantity } : item
          );
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: nextQty } : item
        );
      }
      const initialQty = Math.min(quantity, product.stock_quantity);
      return [...prev, { product, quantity: initialQty }];
    });

    return { success: true, message: resultMessage };
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock_quantity || 1;
          const validQty = Math.min(quantity, maxStock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }
  return context;
}
