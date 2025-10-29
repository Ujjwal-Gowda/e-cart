import { useState } from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product._id);
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
          : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        cursor: "pointer",
        border: "1px solid #e0e0e0",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: "100%",
          height: "280px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "72px",
              opacity: 0.2,
              color: "#000",
            }}
          >
            📦
          </div>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "20px",
            fontWeight: "600",
            color: "#000",
            lineHeight: "1.3",
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#000",
            }}
          >
            ${product.price.toFixed(2)}
          </div>
          <div
            style={{
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

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isAdding ? "#666" : "#000",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isAdding ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            opacity: isAdding ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isAdding) e.currentTarget.style.backgroundColor = "#333";
          }}
          onMouseLeave={(e) => {
            if (!isAdding) e.currentTarget.style.backgroundColor = "#000";
          }}
        >
          {isAdding ? (
            <>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Adding...
            </>
          ) : (
            <>Add to Cart</>
          )}
        </button>
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
