import type { Product } from "../types";
import ProductCard from "./productCard.tsx";

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

export default function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  return (
    <div
      style={{
        padding: "40px 24px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "#000",
              margin: "0 0 16px 0",
              letterSpacing: "-1px",
            }}
          >
            Discover Our Collection
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              margin: 0,
              fontWeight: "400",
            }}
          >
            Premium products curated just for you
          </p>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              border: "1px solid #e0e0e0",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
            <h3
              style={{
                fontSize: "24px",
                color: "#000",
                margin: "0 0 8px 0",
                fontWeight: "600",
              }}
            >
              No Products Available
            </h3>
            <p style={{ color: "#666", margin: 0 }}>
              Check back soon for new arrivals!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
