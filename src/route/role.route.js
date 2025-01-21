import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
import { createRole, getRoles } from "../controller/role.controller.js"


const router = e.Router()

router.route("/roles").get(getRoles).post(createRole)


export default router