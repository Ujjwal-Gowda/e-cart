import { Request, Response } from "express";
import cart from "../models/cart";
import product from "../models/product";

const getSessionId = (req: Request): string => {
  let sessionId = req.headers["x-session-id"] as string;

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  return sessionId;
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);

    const carts = await cart.find({ sessionId }).populate("productId");

    console.log("Session ID:", sessionId);
    console.log("Cart items found:", carts.length);

    if (!carts || carts.length === 0) {
      return res.status(200).json({
        cart: [],
        total: 0,
        sessionId,
      });
    }

    const total = carts.reduce((sum, item: any) => {
      if (item.productId && item.productId.price) {
        return sum + item.productId.price * item.quantity;
      }
      return sum;
    }, 0);

    return res.status(200).json({
      cart: carts,
      total: total,
      sessionId,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      message: "Failed to fetch cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = getSessionId(req);

    console.log(
      "Adding to cart - sessionId:",
      sessionId,
      "productId:",
      productId,
      "quantity:",
      quantity,
    );

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive number",
      });
    }

    const products = await product.findById(productId);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await cart.findOne({
      sessionId,
      productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      const populated = await cart
        .findById(existingCartItem._id)
        .populate("productId");
      console.log("Updated existing cart item:", populated);

      return res.status(200).json({
        item: populated,
        sessionId,
      });
    } else {
      const newCartItem = await cart.create({
        sessionId,
        productId,
        quantity,
      });

      const populated = await cart
        .findById(newCartItem._id)
        .populate("productId");
      console.log("Created new cart item:", populated);

      return res.status(201).json({
        item: populated,
        sessionId,
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({
      message: "Failed to add to cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = getSessionId(req);

    console.log("Removing cart item - sessionId:", sessionId, "itemId:", id);

    const deletedItem = await cart.findOneAndDelete({
      _id: id,
      sessionId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found or doesn't belong to your session",
      });
    }

    console.log("Deleted cart item:", deletedItem);
    return res.status(200).json({
      message: "Item removed from cart",
      sessionId,
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return res.status(500).json({
      message: "Failed to remove cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const checkOut = async (req: Request, res: Response) => {
  try {
    const { cartItems } = req.body;
    const sessionId = getSessionId(req);

    console.log(
      "Checkout request - sessionId:",
      sessionId,
      "cartItems:",
      cartItems,
    );

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart items are required for checkout",
      });
    }

    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );

    const receipt = {
      total,
      timestamp: new Date(),
      sessionId,
    };

    console.log("Checkout successful - receipt:", receipt);

    await cart.deleteMany({ sessionId });

    return res.status(200).json({
      message: "Checkout successful",
      receipt,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    return res.status(500).json({
      message: "Checkout failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
