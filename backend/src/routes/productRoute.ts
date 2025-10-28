import express from "express";
import { getProduct } from "../controllers/productcontroller";
const router = express.Router();

router.get("/", getProduct);
router.post("/", getProduct);

export default router;
