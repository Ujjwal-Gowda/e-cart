import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  checkOut,
} from "../controllers/cartcontroller";
const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.post("/checkout", checkOut);
export default router;
