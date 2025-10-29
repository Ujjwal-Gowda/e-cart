import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connection";
import cartRoutes from "./routes/cartRoute";
import productRoutes from "./routes/productRoute";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://e-cart-peach-psi.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  },
);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    console.log("API endpoints:");
    console.log("- GET  /api/product");
    console.log("- POST /api/product");
    console.log("- GET  /api/cart");
    console.log("- POST /api/cart");
    console.log("- DELETE /api/cart/:id");
    console.log("- POST /api/cart/checkout");
  });
});
