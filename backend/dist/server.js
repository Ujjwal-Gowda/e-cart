"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./db/connection");
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use("/api/product", productRoute_1.default);
app.use("/api/cart", cartRoute_1.default);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        message: "Internal server error",
        error: err.message,
    });
});
const PORT = process.env.PORT || 5000;
(0, connection_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
        console.log("API endpoints:");
        console.log("- GET  /api/product");
        console.log("- POST /api/product");
        console.log("- GET  /api/cart");
        console.log("- POST /api/cart");
        console.log("- DELETE /api/cart/:id");
        console.log("- POST /api/cart/checkout");
    });
});
