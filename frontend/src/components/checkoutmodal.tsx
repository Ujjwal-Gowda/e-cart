import { useState } from "react";

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "hidden",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {orderPlaced ? (
          <div
            style={{
              textAlign: "center",
              animation: "fadeIn 0.4s ease-out",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ marginBottom: "8px", fontSize: "28px" }}>
              Order Placed!
            </h2>
            <p style={{ color: "#666" }}>
              Thank you for shopping with us 💖 <br />
              Your order is being processed.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>💳</div>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#000",
                }}
              >
                Complete Your Order
              </h2>
              <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
                Enter your details to finalize the purchase
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#000")}
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e0e0e0")
                  }
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#000")}
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e0e0e0")
                  }
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: loading ? "#666" : "#000",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
