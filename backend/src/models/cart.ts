import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

cartSchema.index({ sessionId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
