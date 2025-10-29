import axios from "axios";
import type { Product, CartItem, CheckoutData, Receipt } from "./types";

const API_BASE = "http://localhost:5000/api";

let sessionId: string | null = null;

const getSessionId = (): string => {
  if (!sessionId) {
    sessionId = localStorage.getItem("cart_session_id");

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("cart_session_id", sessionId);
    }
  }

  return sessionId;
};

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.data.sessionId) {
    const newSessionId = response.data.sessionId;
    if (newSessionId !== sessionId) {
      sessionId = newSessionId;
      localStorage.setItem("cart_session_id", newSessionId);
    }
  }
  return response;
});

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const res = await axiosInstance.get("/product");
    return res.data;
  },
  getCart: async (): Promise<{ cart: CartItem[]; total: number }> => {
    const res = await axiosInstance.get("/cart");
    return res.data;
  },

  addToCart: async (productId: string, quantity: number): Promise<CartItem> => {
    const res = await axiosInstance.post("/cart", { productId, quantity });
    return res.data.item || res.data;
  },

  removeFromCart: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/cart/${id}`);
  },

  checkout: async (
    data: CheckoutData,
  ): Promise<{ message: string; receipt: Receipt }> => {
    const res = await axiosInstance.post("/cart/checkout", data);
    return res.data;
  },

  clearSession: () => {
    sessionId = null;
    localStorage.removeItem("cart_session_id");
  },
};
