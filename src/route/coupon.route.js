import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { createCoupon } from "../controller/coupon.controller.js"
const router = e.Router()

router.route("/coupons").post(auth,admin,createCoupon)


export default router