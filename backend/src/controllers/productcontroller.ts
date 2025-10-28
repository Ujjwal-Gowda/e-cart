import product from "../models/product";
import Product from "../models/product";
import { Request, Response } from "express";
export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "failed fetching products", error: error });
  }
};
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { price, name, image } = req.body;
    const newproduct = await Product.create({ name, price, image });
    res.status(200).json(newproduct);
  } catch (error) {
    res.status(500).json({ message: "failed fetching products", error: error });
  }
};
