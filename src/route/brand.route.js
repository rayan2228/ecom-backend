import e from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createBrand, getBrands, updateBrand, getBrand, deleteBrand, deleteManyBrands } from "../controller/brand.controller.js"
import { admin } from "../middleware/admin.middleware.js"
const router = e.Router()

router.route("/brands").get(getBrands).post(auth, admin, upload.single("thumbnail"), createBrand).delete(auth, admin, deleteManyBrands)
router.route("/brands/:name").get(getBrand).put(auth, admin, upload.single("thumbnail"), updateBrand).delete(auth, admin, deleteBrand)


export default router