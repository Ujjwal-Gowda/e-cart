import { Request, Response } from "express";
import cart from "../models/cart";
import product from "../models/product";

export const getCart = async (req: Request, res: Response) => {
  try {
    const carts = await cart.find().populate("productId");

    if (!cart || carts.length === 0) {
      return res.status(404).json({ message: "Your cart is empty" });
    }

    const total = carts.reduce(
      (sum, item: any) => sum + item.productId.price * item.quantity,
      0,
    );

    return res.status(200).json({ cart, total });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity are required" });
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    const products = await product.findById(productId);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCartItem = await cart.create({ productId, quantity });
    return res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Failed to add to cart", error });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove cart item", error });
  }
};

export const checkOut = async (req: Request, res: Response) => {
  try {
    const { cartItems } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart items are required for checkout" });
    }

    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );

    const receipt = { total, timestamp: new Date() };
    return res.status(200).json({ message: "Checkout successful", receipt });
  } catch (error) {
    console.error("Error during checkout:", error);
    return res.status(500).json({ message: "Checkout failed", error });
  }
};
