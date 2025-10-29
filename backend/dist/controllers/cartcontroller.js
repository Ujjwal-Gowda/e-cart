"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOut = exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const product_1 = __importDefault(require("../models/product"));
const getSessionId = (req) => {
    let sessionId = req.headers["x-session-id"];
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    return sessionId;
};
const getCart = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const carts = await cart_1.default.find({ sessionId }).populate("productId");
        console.log("Session ID:", sessionId);
        console.log("Cart items found:", carts.length);
        if (!carts || carts.length === 0) {
            return res.status(200).json({
                cart: [],
                total: 0,
                sessionId,
            });
        }
        const total = carts.reduce((sum, item) => {
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
    }
    catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            message: "Failed to fetch cart",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const sessionId = getSessionId(req);
        console.log("Adding to cart - sessionId:", sessionId, "productId:", productId, "quantity:", quantity);
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
        const products = await product_1.default.findById(productId);
        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }
        const existingCartItem = await cart_1.default.findOne({
            sessionId,
            productId,
        });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            const populated = await cart_1.default
                .findById(existingCartItem._id)
                .populate("productId");
            console.log("Updated existing cart item:", populated);
            return res.status(200).json({
                item: populated,
                sessionId,
            });
        }
        else {
            const newCartItem = await cart_1.default.create({
                sessionId,
                productId,
                quantity,
            });
            const populated = await cart_1.default
                .findById(newCartItem._id)
                .populate("productId");
            console.log("Created new cart item:", populated);
            return res.status(201).json({
                item: populated,
                sessionId,
            });
        }
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            message: "Failed to add to cart",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.addToCart = addToCart;
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const sessionId = getSessionId(req);
        console.log("Removing cart item - sessionId:", sessionId, "itemId:", id);
        const deletedItem = await cart_1.default.findOneAndDelete({
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
    }
    catch (error) {
        console.error("Error removing cart item:", error);
        return res.status(500).json({
            message: "Failed to remove cart item",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.removeFromCart = removeFromCart;
const checkOut = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const sessionId = getSessionId(req);
        console.log("Checkout request - sessionId:", sessionId, "cartItems:", cartItems);
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart items are required for checkout",
            });
        }
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const receipt = {
            total,
            timestamp: new Date(),
            sessionId,
        };
        console.log("Checkout successful - receipt:", receipt);
        await cart_1.default.deleteMany({ sessionId });
        return res.status(200).json({
            message: "Checkout successful",
            receipt,
        });
    }
    catch (error) {
        console.error("Error during checkout:", error);
        return res.status(500).json({
            message: "Checkout failed",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.checkOut = checkOut;
