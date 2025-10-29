import type { CartItem } from "../types";

interface CartProps {
  cartItems: CartItem[];
  total: number;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  cartItems,
  total,
  onRemove,
  onCheckout,
}: CartProps) {
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <p style={{ color: "#666", fontSize: "16px" }}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #ddd",
        padding: "24px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
        Shopping Cart
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              backgroundColor: "#f9fafb",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                {item.productId.name}
              </h4>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                Quantity: {item.quantity} × ${item.productId.price.toFixed(2)}
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontWeight: "bold",
                  color: "#2563eb",
                }}
              >
                ${(item.productId.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item._id)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "2px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <span>Total:</span>
          <span style={{ color: "#2563eb" }}>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
