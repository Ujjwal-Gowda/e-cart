"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartcontroller_1 = require("../controllers/cartcontroller");
const router = express_1.default.Router();
router.get("/", cartcontroller_1.getCart);
router.post("/", cartcontroller_1.addToCart);
router.delete("/:id", cartcontroller_1.removeFromCart);
router.post("/checkout", cartcontroller_1.checkOut);
exports.default = router;
