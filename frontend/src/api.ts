import axios from "axios";
import type { Product, CartItem, CheckoutData, Receipt } from "./types";

const API_BASE = "http://localhost:5000/api";

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const res = await axios.get(`${API_BASE}/product`);
    return res.data;
  },

  // Cart
  getCart: async (): Promise<{ cart: CartItem[]; total: number }> => {
    const res = await axios.get(`${API_BASE}/cart`);
    return res.data;
  },

  addToCart: async (productId: string, quantity: number): Promise<CartItem> => {
    const res = await axios.post(`${API_BASE}/cart`, { productId, quantity });
    return res.data;
  },

  removeFromCart: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/cart/${id}`);
  },

  checkout: async (
    data: CheckoutData,
  ): Promise<{ message: string; receipt: Receipt }> => {
    const res = await axios.post(`${API_BASE}/cart/checkout`, data);
    return res.data;
  },
};
