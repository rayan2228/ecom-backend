import e from "express"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { createCoupon, deleteCoupon, deleteSelectedCoupons, getCoupon, getCoupons } from "../controller/coupon.controller.js"
const router = e.Router()

router.route("/coupons").get(getCoupons).post(auth,admin,createCoupon).delete(auth,admin,deleteSelectedCoupons)
router.route("/coupons/:code").get(getCoupon).delete(auth,admin,deleteCoupon)


export default router