import { useState } from "react";
import type { CartItem } from "../types";
import CheckoutModal from "./checkoutmodal.tsx";

interface CartPageProps {
  cartItems: CartItem[];
  total: number;
  onRemove: (id: string) => void;
  onCheckout: (name: string, email: string) => Promise<void>;
}

export default function CartPage({
  cartItems,
  total,
  onRemove,
  onCheckout,
}: CartPageProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px 24px", minHeight: "calc(100vh - 72px)" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "24px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "120px",
                marginBottom: "24px",
                opacity: 0.7,
              }}
            >
              🛒
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#1f2937",
                margin: "0 0 16px 0",
              }}
            >
              Your Cart is Empty
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                margin: "0 0 32px 0",
              }}
            >
              Looks like you haven't added anything to your cart yet
            </p>
            <div
              style={{
                display: "inline-flex",
                padding: "14px 32px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 24px", minHeight: "calc(100vh - 72px)" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "white",
              margin: "0 0 12px 0",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Shopping Cart
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
            }}
          >
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "24px",
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "24px",
                alignItems: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {item.productId.image ? (
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: "48px", opacity: 0.3 }}>📦</div>
                )}
              </div>

              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#1f2937",
                  }}
                >
                  {item.productId.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    color: "#6b7280",
                    fontSize: "16px",
                  }}
                >
                  Quantity: {item.quantity} × ${item.productId.price.toFixed(2)}
                </p>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => onRemove(item._id)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  border: "2px solid #fecaca",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fee2e2";
                  e.currentTarget.style.color = "#dc2626";
                }}
              >
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "2px solid #e5e7eb",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1f2937",
              }}
            >
              Total Amount:
            </span>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            style={{
              width: "100%",
              padding: "18px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "700",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 15px rgba(16, 185, 129, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 6px rgba(16, 185, 129, 0.3)";
            }}
          >
            ✓ Proceed to Checkout
          </button>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onSubmit={async (name, email) => {
            await onCheckout(name, email);
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
}
