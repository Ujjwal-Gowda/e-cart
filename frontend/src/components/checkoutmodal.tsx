import { useState } from "react";
import type { Receipt } from "../types";

interface CheckoutModalProps {
  onClose: () => void;
  onSubmit: (name: string, email: string) => Promise<void>;
  receipt?: Receipt;
}

export default function CheckoutModal({
  onClose,
  onSubmit,
  receipt,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(name, email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        }}
      >
        {!receipt ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "24px", color: "#333" }}>
              Checkout
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: loading ? "#93c5fd" : "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {loading ? "Processing..." : "Complete Order"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                }}
              >
                ✓
              </div>
              <h2 style={{ margin: "0 0 8px 0", color: "#16a34a" }}>
                Order Successful!
              </h2>
              <p style={{ margin: 0, color: "#666" }}>
                Thank you for your purchase
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "16px",
                borderRadius: "6px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#666" }}>Total Amount:</span>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#2563eb",
                  }}
                >
                  ${receipt.total.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#666" }}>Date:</span>
                <span style={{ color: "#666" }}>
                  {new Date(receipt.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
