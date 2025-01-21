import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { applyCoupon, createCoupon, deleteCoupon, deleteSelectedCoupons, getCoupon, getCoupons, updateCoupon } from "../controller/coupon.controller.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
const router = e.Router()

router.route("/coupons").get(getCoupons).post(auth, checkAccess(["admin"]), createCoupon).delete(auth, checkAccess(["admin"]), deleteSelectedCoupons)
router.route("/coupons/:code").get(getCoupon).post(auth, applyCoupon).put(auth, checkAccess(["admin"]), updateCoupon).delete(auth, checkAccess(["admin"]), deleteCoupon)


export default router