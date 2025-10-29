"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true,
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
        min: 1,
    },
}, { timestamps: true });
cartSchema.index({ sessionId: 1, productId: 1 }, { unique: true });
exports.default = mongoose_1.default.model("Cart", cartSchema);
