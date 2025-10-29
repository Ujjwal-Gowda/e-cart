import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      )}
      <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
        {product.name}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "bold",
          color: "#2563eb",
        }}
      >
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={() => onAddToCart(product._id)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
