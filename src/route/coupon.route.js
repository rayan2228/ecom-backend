import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { applyCoupon, createCoupon, deleteCoupon, deleteSelectedCoupons, getCoupon, getCoupons, updateCoupon } from "../controller/coupon.controller.js"
const router = e.Router()

router.route("/coupons").get(getCoupons).post(auth, admin, createCoupon).delete(auth, admin, deleteSelectedCoupons)
router.route("/coupons/:code").get(getCoupon).post(auth, applyCoupon).put(auth, admin, updateCoupon).delete(auth, admin, deleteCoupon)


export default router