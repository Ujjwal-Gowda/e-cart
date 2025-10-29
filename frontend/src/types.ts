export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  email: string;
  cartItems: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface Receipt {
  total: number;
  timestamp: string;
}
