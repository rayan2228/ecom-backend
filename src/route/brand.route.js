import e from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createBrand, getBrands, updateBrand, getBrand, deleteBrand, deleteManyBrands } from "../controller/brand.controller.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"

const router = e.Router()

router.route("/brands").get(getBrands).post(auth, checkAccess(["admin"]), upload.single("thumbnail"), createBrand).delete(auth, checkAccess(["admin"]), deleteManyBrands)
router.route("/brands/:name").get(getBrand).put(auth, checkAccess(["admin"]), upload.single("thumbnail"), updateBrand).delete(auth, checkAccess(["admin"]), deleteBrand)


export default router