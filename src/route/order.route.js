import e from "express";
import { createOrder, orderCancel, orderFail, orderSuccess } from "../controller/order.controller.js";
const router = e.Router();
router.route("/orders").get(createOrder);
router.route("/orders/success").post(orderSuccess);
router.route("/orders/fail").post(orderFail);
router.route("/orders/cancel").post(orderCancel);
export default router;
