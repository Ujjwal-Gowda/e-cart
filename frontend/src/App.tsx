import { useState, useEffect } from "react";
import { api } from "./api";
import type { Product, CartItem } from "./types";
import ProductList from "./components/productlist.tsx";
import CartPage from "./components/cartpage.tsx";
import Navbar from "./components/navbar.tsx";

type Page = "products" | "cart";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      console.log("Products loaded:", data);
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      console.log("Cart data loaded:", data);
      setCartItems(data.cart || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setCartItems([]);
      setTotal(0);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      console.log("Adding to cart:", productId);
      await api.addToCart(productId, 1);
      await loadCart();
      showNotification("Item added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError("Failed to add item to cart");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveFromCart = async (id: string) => {
    try {
      await api.removeFromCart(id);
      await loadCart();
      showNotification("Item removed from cart");
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

      await api.checkout(checkoutData);

      for (const item of cartItems) {
        await api.removeFromCart(item._id);
      }
      await loadCart();
      showNotification("Order placed successfully!");
      setCurrentPage("products");
    } catch (err) {
      setError("Checkout failed");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#000",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e0e0e0",
              borderTop: "4px solid #000",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading...
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Navbar
        cartCount={cartItems.length}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {notification && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#000",
            color: "white",
            padding: "16px 24px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
            animation: "slideIn 0.3s ease-out",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          ✓ {notification}
        </div>
      )}

      {error && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#dc2626",
            color: "white",
            padding: "16px 24px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          <span>⚠ {error}</span>
          <button
            onClick={() => setError("")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
              padding: "0",
            }}
          >
            ×
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {currentPage === "products" ? (
        <ProductList products={products} onAddToCart={handleAddToCart} />
      ) : (
        <CartPage
          cartItems={cartItems}
          total={total}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}
