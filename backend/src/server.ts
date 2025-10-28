import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connection";
import cartRoutes from "./routes/cartRoute";
import productRoutes from "./routes/productRoute";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port http://localhost:" + 5000);
  });
});
