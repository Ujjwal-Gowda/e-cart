import mongoose from "mongoose";
import Product from "./product";

const cartSchema = new mongoose.Schema({
  product: {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
});

export default mongoose.model("Cart", cartSchema);
