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
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #e0e0e0",
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
              backgroundColor: "#000",
              borderRadius: "4px",
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
              fontWeight: "700",
              color: "#000",
              letterSpacing: "-0.5px",
            }}
          >
            Vibe Commerce
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => onNavigate("products")}
            style={{
              padding: "10px 24px",
              backgroundColor: currentPage === "products" ? "#000" : "#fff",
              color: currentPage === "products" ? "#fff" : "#000",
              border: "1px solid #000",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== "products") {
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== "products") {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#000";
              }
            }}
          >
            Products
          </button>

          <button
            onClick={() => onNavigate("cart")}
            style={{
              padding: "10px 24px",
              backgroundColor: currentPage === "cart" ? "#000" : "#fff",
              color: currentPage === "cart" ? "#fff" : "#000",
              border: "1px solid #000",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== "cart") {
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== "cart") {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#000";
              }
            }}
          >
            Cart
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "700",
                  border: "2px solid #fff",
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
