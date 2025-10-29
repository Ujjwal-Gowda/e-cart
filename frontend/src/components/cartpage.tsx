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
      <div
        style={{
          padding: "40px 24px",
          minHeight: "calc(100vh - 72px)",
          backgroundColor: "#f5f5f5",
        }}
      >
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
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              width: "100%",
              border: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                fontSize: "120px",
                marginBottom: "24px",
                opacity: 0.3,
              }}
            >
              🛒
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#000",
                margin: "0 0 16px 0",
              }}
            >
              Your Cart is Empty
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                margin: "0 0 32px 0",
              }}
            >
              Looks like you haven't added anything to your cart yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 24px",
        minHeight: "calc(100vh - 72px)",
        backgroundColor: "#f5f5f5",
      }}
    >
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
              fontWeight: "700",
              color: "#000",
              margin: "0 0 12px 0",
              letterSpacing: "-1px",
            }}
          >
            Shopping Cart
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
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
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "20px",
                alignItems: "center",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                transition: "box-shadow 0.3s ease",
                border: "1px solid #e0e0e0",
              }}
              onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 14px 28px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.12)")
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)")
              }
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                {item.productId?.image ? (
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
                  <div style={{ fontSize: "48px", opacity: 0.2 }}>📦</div>
                )}
              </div>

              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {item.productId?.name || "Product"}
                </h3>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  Quantity: {item.quantity} × $
                  {item.productId?.price?.toFixed(2) || "0.00"}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    color: "#000",
                    backgroundColor: "#fff",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    fontWeight: "600",
                    border: "1px solid #000",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  In Stock
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: "12px",
                  }}
                >
                  ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => onRemove(item._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#000";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.color = "#000";
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            border: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "2px solid #e0e0e0",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              Total Amount:
            </span>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#000",
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
            }}
          >
            Proceed to Checkout
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
