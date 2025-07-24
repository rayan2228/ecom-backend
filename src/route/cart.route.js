import e from "express";
import { createCart, getCarts, updateCart } from "../controller/cart.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const router = e.Router();
router.route("/carts").get(auth, getCarts).post(auth, createCart).put(auth, updateCart);
export default router;
