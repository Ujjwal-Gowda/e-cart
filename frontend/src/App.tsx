import { useState, useEffect } from "react";
import { api } from "./api";
import type { Product, CartItem, Receipt } from "./types";
import ProductCard from "./components/productCard.tsx";
import Cart from "./components/cart.tsx";
import CheckoutModal from "./components/checkoutmodal.tsx";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState<Receipt>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCartItems(data.cart || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await api.addToCart(productId, 1);
      await loadCart();
    } catch (err) {
      setError("Failed to add to cart");
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (id: string) => {
    try {
      await api.removeFromCart(id);
      await loadCart();
    } catch (err) {
      setError("Failed to remove from cart");
      console.error(err);
    }
  };

  const handleCheckout = async (name: string, email: string) => {
    try {
      const checkoutData = {
        name,
        email,
        cartItems: cartItems.map((item) => ({
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
        })),
      };

      const response = await api.checkout(checkoutData);
      setReceipt(response.receipt);

      // Clear cart after successful checkout
      for (const item of cartItems) {
        await api.removeFromCart(item._id);
      }
      await loadCart();
    } catch (err) {
      setError("Checkout failed");
      console.error(err);
    }
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setReceipt(undefined);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div style={{ fontSize: "18px", color: "#666" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 8px 0",
            }}
          >
            Vibe Commerce
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            Your one-stop shop for everything
          </p>
        </header>

        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #ef4444",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "6px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              style={{
                background: "none",
                border: "none",
                color: "#991b1b",
                cursor: "pointer",
                fontSize: "18px",
                padding: "0 4px",
              }}
            >
              ×
            </button>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <Cart
          cartItems={cartItems}
          total={total}
          onRemove={handleRemoveFromCart}
          onCheckout={() => setShowCheckout(true)}
        />

        {showCheckout && (
          <CheckoutModal
            onClose={handleCloseCheckout}
            onSubmit={handleCheckout}
            receipt={receipt}
          />
        )}
      </div>
    </div>
  );
}
