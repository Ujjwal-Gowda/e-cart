import { Request, Response } from "express";
import cart from "../models/cart";
import product from "../models/product";

export const getCart = async (req: Request, res: Response) => {
  const carts = await cart.find().populate("productId");
  const total = carts.reduce(
    (sum, item: any) => sum + item.productId.price * item.quantity,
    0,
  );
  res.json({ carts, total });
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const item = await cart.create({ productId, quantity });
  res.status(200).json(item);
};

export const removeFromCart = async (req: Request, res: Response) => {
  await cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkOut = async (req: Request, res: Response) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );
  const receipt = { total, timestamp: new Date() };
  res.json(receipt);
};
