interface NavbarProps {
  cartCount: number;
  currentPage: "products" | "cart";
  onNavigate: (page: "products" | "cart") => void;
}

export default function Navbar({
  cartCount,
  currentPage,
  onNavigate,
}: NavbarProps) {
  return (
    <nav
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => onNavigate("products")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            🛍️
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vibe Commerce
          </h1>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button
            onClick={() => onNavigate("products")}
            style={{
              padding: "10px 24px",
              backgroundColor:
                currentPage === "products" ? "#667eea" : "transparent",
              color: currentPage === "products" ? "white" : "#667eea",
              border: currentPage === "products" ? "none" : "2px solid #667eea",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Products
          </button>

          <button
            onClick={() => onNavigate("cart")}
            style={{
              padding: "10px 24px",
              backgroundColor:
                currentPage === "cart" ? "#667eea" : "transparent",
              color: currentPage === "cart" ? "white" : "#667eea",
              border: currentPage === "cart" ? "none" : "2px solid #667eea",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
