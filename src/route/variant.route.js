import e from "express";
import { createVariant } from "../controller/productVariant.controller.js";
const router = e.Router();
router.route("/variants").get().post(createVariant);
export default router;
