"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProduct = async (req, res) => {
    try {
        const products = await product_1.default.find();
        if (!products || products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products for sale at the moment" });
        }
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "failed fetching products", error: error });
    }
};
exports.getProduct = getProduct;
const addProduct = async (req, res) => {
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
        const newproduct = await product_1.default.create({ name, price, image });
        res.status(200).json(newproduct);
    }
    catch (error) {
        res.status(500).json({ message: "failed to add product", error: error });
    }
};
exports.addProduct = addProduct;
