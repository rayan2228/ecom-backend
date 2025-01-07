import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { createSubcategory, getSubcategories, updateSubcategory,getSubcategory } from "../controller/subcategory.controller.js"

const router = express.Router()

router.route("/subcategories").get(getSubcategories).post(auth, admin, upload.single("thumbnail"), createSubcategory)
router.route("/subcategories/:name").get(getSubcategory).put(auth, admin, upload.single("thumbnail"), updateSubcategory)


export default router