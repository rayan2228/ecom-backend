import e from "express";
import { createInventory } from "../controller/inventory.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = e.Router();

router
  .route("/inventories")
  .post(auth, checkAccess(["publish_products"]), createInventory);

export default router;
