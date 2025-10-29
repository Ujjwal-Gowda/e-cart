"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productcontroller_1 = require("../controllers/productcontroller");
const router = express_1.default.Router();
router.get("/", productcontroller_1.getProduct);
router.post("/", productcontroller_1.addProduct);
exports.default = router;
