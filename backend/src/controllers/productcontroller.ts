import product from "../models/product";
import Product from "../models/product";
import { Request, Response } from "express";
export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products for sale at the moment" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "failed fetching products", error: error });
  }
};
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { price, name, image } = req.body;

    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "All fields (name, price, image) are required." });
    }
    if (typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number." });
    }
    const newproduct = await Product.create({ name, price, image });
    res.status(200).json(newproduct);
  } catch (error) {
    res.status(500).json({ message: "failed to add product", error: error });
  }
};
