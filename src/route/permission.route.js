import e from "express";
import { getPermissions } from "../controller/permission.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";

const router = e.Router();

router
  .route("/permissions")
  .get(auth, checkAccess(["view_users"]), getPermissions);

export default router;
