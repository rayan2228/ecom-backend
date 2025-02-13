import e from "express";
import { createCart } from "../controller/cart.controller";
const router = e.Router();
router.route("/carts").get().post(createCart);
export default router;
