import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
import { createPermission, getPermissions } from "../controller/permission.controller.js"

const router = e.Router()

router.route("/permissions").get(getPermissions).post(createPermission)


export default router