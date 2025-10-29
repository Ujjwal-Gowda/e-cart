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
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.2)"
          : "0 10px 25px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: "100%",
          height: "280px",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {product.image ? (
          <img
            src={`../../public/images/${product.image}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "72px",
              opacity: 0.3,
            }}
          >
            📦
          </div>
        )}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              animation: "pulse 1s ease-in-out infinite",
            }}
          >
            ❤️
          </div>
        )}
      </div>

      <div style={{ padding: "24px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "22px",
            fontWeight: "700",
            color: "#1f2937",
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
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ${product.price.toFixed(2)}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#10b981",
              backgroundColor: "#d1fae5",
              padding: "4px 12px",
              borderRadius: "20px",
              fontWeight: "600",
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
            padding: "14px",
            background: isAdding
              ? "#9ca3af"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: isAdding ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "700",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow:
              isHovered && !isAdding
                ? "0 8px 20px rgba(102, 126, 234, 0.4)"
                : "none",
          }}
        >
          {isAdding ? (
            <>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Adding...
            </>
          ) : (
            <>🛒 Add to Cart</>
          )}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
