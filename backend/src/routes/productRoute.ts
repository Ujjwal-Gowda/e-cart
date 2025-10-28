import express from "express";
import { addProduct, getProduct } from "../controllers/productcontroller";
const router = express.Router();

router.get("/", getProduct);
router.post("/", addProduct);

export default router;
