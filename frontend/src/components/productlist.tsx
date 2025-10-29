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
    <div style={{ padding: "40px 24px" }}>
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
              fontWeight: "800",
              color: "white",
              margin: "0 0 16px 0",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Discover Our Collection
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.9)",
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
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
            <h3
              style={{ fontSize: "24px", color: "#333", margin: "0 0 8px 0" }}
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
